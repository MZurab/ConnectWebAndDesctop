define(['v_app-chat', 'm_app','m_view','m_message','m_user','m_firebase'],function( VIEW, M_APP, M_VIEW, M_MESSAGE, USER, FIREBASE) {
	//@< init
		// init from app view templates
	  const _ = {};
	  const CONST = {};
	  const name = 'chat'; _['name'] = name;
	  const pages = {};
	    
	  _['options'] = {
	  	// 'attr' : {
	  	// 	'id' : 'leftBlockInViewWindow'
	  	// }
	  }
	  var thisPageName; 

	  //< init pages const
		    //< page fullWindow
		    	thisPageName = 'index';
		        pages[thisPageName]  = {'attr':{'id' : 'leftBlockInViewWindow'},'menus':{}};
		          pages[thisPageName]['functions'] = {
		            // 'isPage'  : function () {console.log('app-page fullWindow','isPage'); return true;},
		            'getTemplate' : function (iNdata) {

		            },
		            'onOut'  : function () {console.log('app-page '+thisPageName,'onOut'); return true;},
		            // 'onView'  : function () {
		            //   addPageToFullWindow({'id':'sign','uid':'@system'});
		            //   // V_APP_PAGE.addFullWindowByTemplate({'content':'Hellow World!!!'}); 
		            //   // console.log('app private','onView');
		            //   return true;
		            // },
		            // 'onHide'  : function () {console.log('app-page fullWindow','onHide'); return true;},
		            // 'setPage' : function () {console.log('app-page fullWindow','setPage'); return true;},
		            'onInit' 		: function () {
		            	console.log('app-page '+thisPageName,'onInit'); 
		            	M_MESSAGE.view.activeAppEvent({'onClickSendMesg':M_MESSAGE.onClickSendMesg,'onKeyDownPrintingMsg':M_MESSAGE.startSendingFlashMsg});
		            	return true;
		            },
		            'onAppear' 		: function (d1,d2) {
		            	console.log('d1,d2',d1,d2);
		            	// M_MESSAGE.view.startAppearObserver();
		            	pageIndex_openChatByChatId(d1);

		            	// M_APP.view.addContentToChiefApp({'app':name,'page':thisPageName},'<div>#1</div>');
		            	// M_APP.view.addContentToChiefApp({'app':name,'page':thisPageName},'<div>#2</div>');
		            	// M_APP.view.addContentToChiefApp({'app':name,'page':thisPageName},'<div>#3</div>');

		            	console.log('app-page '+thisPageName,'onAppear'); return true;},
		            'onDisappear' 	: function () {console.log('app-page '+thisPageName,'onDisappear'); return true;},
		          };
		    //> page fullWindow

	  //> init pages const
	_['pages'] = pages; 

	//@<<< APP BLOCK
		//@override
		function getTemplate (iNdata) {
			console.log('getTemplate APP-CHAT iNdata start',iNdata);
			iNdata['other'] = VIEW.getChatSenderBlock();
			console.log('getTemplate APP-CHAT  iNdata end',iNdata);
		}
		_['getTemplate'] = getTemplate; 

		//@required
		function onInit () {
			console.log('appBase onInit');

		}
		_['onInit'] = onInit; 
		
			//@optional	
			function onIn () {
				console.log('onIn');

			}
			_['onIn'] = onIn; 
				//@required
				function onAppear () {
					M_VIEW.closeLoader();
					console.log('appBase onAppear');

				}
				_['onAppear'] = onAppear; 
				//@required
				function onDisappear () {
					// here must be page disapear functions
					/*
						безопасно берем pages если есть
						безопасно узнаем название открывшегося сейчась page +getPageName +setPageName
						безопасно вызываем pages[openedPageName][onDisapear] функцию

					*/
					console.log('onDisappear');

				}
			_['onDisappear'] = onDisappear; 

			//@optional	
			function onOut () {
				// here must be page onOut functions
				console.log('onOut');

			}
			_['onOut'] = onOut; 
		//@required
		function onDeinit () {
			console.log('onDeinit');

		}
		_['onDeinit'] = onDeinit; 
	//@>>> APP BLOCK




	function pageIndex_getChatByUid () {

	}
	function pageIndex_sendMsg () {

	}
	
//@<CONTROLLER VIEW or NO defined chat (chat view now status)
	CONST['chatViewPrefix'] = 'connectPrefixChatViewStatus-';

	function runController_thisChatWatching (iNchatId) {
		onDisconectSetChatOffline(iNchatId);
		safeSetChatViewOnline(iNchatId);
	}
	function runController_thisChatWatchingWhenChatDownloadMessage (iNchatId) {
		safeSetChatViewOnline(iNchatId);
	}

	function safeSetChatViewOnline (iNchatId) {
		let chatStatus = getChatViewStatus(iNchatId);
		if(chatStatus != 1) {
			setChatViewOnline(iNchatId);
			return true;
		}
		return false;
	}
		function setChatViewOnline (iNchatId) {
			setChatViewStatus(iNchatId,1);

			let uid = USER.getMyId();
			let path = "chats/"+iNchatId+"/member/"+uid+"/online";
			let updateArray = {};
				updateArray[path] = 1

	    	FIREBASE.database().ref().update(updateArray);

		}

	function safeSetChatViewOffline (iNchatId) {
		let chatStatus = getChatViewStatus(iNchatId);
		if(chatStatus != 0) {
			setChatViewOffline(iNchatId);
			return true;
		}
		return false;
	}
		function setChatViewOffline (iNchatId) {
			setChatViewStatus(iNchatId,0);

			let uid = USER.getMyId();
			let path = "chats/"+iNchatId+"/member/"+uid+"/online";
			let updateArray = {};
				updateArray[path] = FIREBASE.database.ServerValue.TIMESTAMP;
	    	FIREBASE.database().ref().update(updateArray);
		}
			function setChatViewStatus (iNchatId,iNstatus) {
				let varPath = CONST['chatViewPrefix'] + iNchatId;
				M_APP.save(varPath,iNstatus);
			}
			function getChatViewStatus (iNchatId) {
				let varPath = CONST['chatViewPrefix'] + iNchatId;
				return parseInt(M_APP.get(varPath))||0;
			}

	function onDisconectSetChatOffline (iNchatId) {
		let uid = USER.getMyId();
		let path = "chats/"+iNchatId+"/member/"+uid+"/online";
		let chatTime = FIREBASE.database.ServerValue.TIMESTAMP;
		let ref = FIREBASE.database().ref(path);
		ref.on(
			'value',
			(iNdata) => {
				if(iNdata.val() != 1 && getCurrentChatId() == iNchatId) {
					setChatViewOnline (iNchatId);
				}
				ref.onDisconnect().set(chatTime);
			}
		);
	}
//@>CONTROLLER VIEW or NO defined chat (chat view now status)










	function pageIndex_openChatByChatId (iNobject) {
		/*
			@inputs
				@required
					iNobject -> object
						chatId
						uid
						chatName
						chatIcon

						userLogin
						online
						servise

		*/



		iNobject['chatIcon'] 	= iNobject['chatIcon'];//https://cdn.ramman.net/images/icons/apps/app_sharepay.png';
		iNobject['chatName']	= iNobject['chatName'];//'SharePay';
		iNobject['login']	 	= iNobject['userLogin'];// 'sharepay';
		iNobject['stateOnline'] = true;
		iNobject['servise'] = (iNobject['userType'] == 2)?true:false;//true;

		var chatId  = iNobject['chatId'];
		var uid 	= iNobject['uid'];
		var login 	= iNobject['login'];
		var servise = iNobject['servise'];
		var stateOnline 	= iNobject['stateOnline'];
		var chatIcon  = iNobject['chatIcon'];
		var chatName  = iNobject['chatName'];


		// setPreviusChat 
			let previusChat = getCurrentChatId();
			if ( previusChat != chatId ) {
				// if last chat != this chat
				// we close this chat
				safeSetChatViewOffline(previusChat);

			}

		// set actions when connection will be disconected
        setCurrentChatId(iNobject['chatId']);
        // controller for wathching i view now this chat or no
		runController_thisChatWatching (chatId);

        



        setCurrentChatUserId(iNobject['uid']);
        setCurrentChatType('private');

        // 'https://cdn.ramman.net/images/icons/apps/app_sharepay.png'
        // chatId, userId, userName, userIcon, userLogin, online, servise
        VIEW.addUserHeaderInChief({'name': chatName,'icon': chatIcon,'login':login,'online':stateOnline,'servise':servise});



		M_MESSAGE.setLastMsgTimeByChatId(chatId,0);
        if ( VIEW.getCountsOfChatContainers(chatId) == 0 ) {
            // need chat isset open it
        	// console.log('M_MESSAGE.synchronizeWithMessageDb(chatId)', M_MESSAGE.synchronizeWithMessageDb(chatId));
            VIEW.createChatContainer(chatId);
        	M_MESSAGE.synchronizeWithMessageDb(chatId
        		, 
        		{
	        		'functionOnChild' : (iN2ChatId) => {
	        			runController_thisChatWatchingWhenChatDownloadMessage(iN2ChatId);
	        		}
        		}
        	);
        }
        VIEW.hideChatContainers();
        VIEW.showChatContainerByChatId(chatId);
        VIEW.effChatViewScrollToBot();
        // M_MESSAGE.setObserverForAppearMessageInVisualScrollByChatId(chatId);
    }

    
	//    

	function setCurrentChatId (iNchatId) {
            return M_APP.save('connectThisOpenChatId',iNchatId);
    }
    function getCurrentChatId () {
        return M_APP.get('connectThisOpenChatId');
    }

    function setCurrentChatType (iNchatId) {
            return M_APP.save('connectThisOpenChatType',iNchatId);
    }
    function getCurrentChatType () {
        return M_APP.get('connectThisOpenChatType');
    }

    function setCurrentChatUserId (iNchatId) {
            return M_APP.save('connectThisOpenChatUserId',iNchatId);
    }
    function getCurrentChatUserId () {
        return M_APP.get('connectThisOpenChatUserId');
    }

    
	

	return _;
});