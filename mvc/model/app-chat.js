define(
	['v_app-chat', 'm_app','m_view','m_message','m_user','m_firebase','m_record','m_category','url'],
	function( VIEW, M_APP, M_VIEW, M_MESSAGE, USER, FIREBASE, M_RECORD, M_CATEGORY, URL) {
	//@< init
		// init from app view templates
	  const _ = {}; M_APP.setGlobalVar('m_app-chat',_);
	  const CONST = {};
	  const name = 'chat'; _['name'] = name;
	  const pages = {};
	    
	  _['options'] = {
	  	// 'attr' : {
	  	// 	'id' : 'leftBlockInViewWindow'
	  	// }
	  }



	   var STORAGE = FIREBASE.storage().ref();

	  var thisPageName; 

	 




	function pageIndex_getChatByUid () {

	}
	function pageIndex_sendMsg () {

	}
	
//@<CONTROLLER VIEW or NO defined chat (chat view now status)
	CONST['chatViewPrefix'] = 'connectPrefixChatViewStatus-';

	function runController_thisChatWatching (iNchatId) {
		// onDisconectSetChatOffline(iNchatId);
		// safeSetChatViewOnline(iNchatId);
	}
	function runController_thisChatWatchingWhenChatDownloadMessage (iNchatId) {
		// safeSetChatViewOnline(iNchatId);
	}

	function safeSetChatViewOnline (iNchatId) {
		// let chatStatus = getChatViewStatus(iNchatId);
		// if(chatStatus != 1) {
		// 	setChatViewOnline(iNchatId);
		// 	return true;
		// }
		// return false;
	}
		function setChatViewOnline (iNchatId) {
			// setChatViewStatus(iNchatId,1);

			// let uid = USER.getMyId();
			// let path = "chats/"+iNchatId+"/member/"+uid+"/online";
			// let updateArray = {};
			// 	updateArray[path] = 1

	  //   	FIREBASE.database().ref().update(updateArray);

		}

	function safeSetChatViewOffline (iNchatId) {
		// let chatStatus = getChatViewStatus(iNchatId);
		// if(chatStatus != 0) {
		// 	setChatViewOffline(iNchatId);
		// 	return true;
		// }
		// return false;
	}
		function setChatViewOffline (iNchatId) {
			// setChatViewStatus(iNchatId,0);

			// let uid = USER.getMyId();
			// let path = "chats/"+iNchatId+"/member/"+uid+"/online";
			// let updateArray = {};
			// 	updateArray[path] = FIREBASE.database.ServerValue.TIMESTAMP;
	  //   	FIREBASE.database().ref().update(updateArray);
		}
			function setChatViewStatus (iNchatId,iNstatus) {
				// let varPath = CONST['chatViewPrefix'] + iNchatId;
				// M_APP.save(varPath,iNstatus);
			}
			function getChatViewStatus (iNchatId) {
				// let varPath = CONST['chatViewPrefix'] + iNchatId;
				// return parseInt(M_APP.get(varPath))||0;
			}

	function onDisconectSetChatOffline (iNchatId) {
		// let uid = USER.getMyId();
		// let path = "chats/"+iNchatId+"/member/"+uid+"/online";
		// let chatTime = FIREBASE.database.ServerValue.TIMESTAMP;
		// let ref = FIREBASE.database().ref(path);
		// ref.on(
		// 	'value',
		// 	(iNdata) => {
		// 		if(iNdata.val() != 1 && getCurrentChatId() == iNchatId) {
		// 			setChatViewOnline (iNchatId);
		// 		}
		// 		ref.onDisconnect().set(chatTime);
		// 	}
		// );
	}
//@>CONTROLLER VIEW or NO defined chat (chat view now status)






	function getChatIconByType (iNchaType,iNobject) {
        /*
        	@discr 
        		get chat icon for private and group chats
            @inputs
                iNchatType -> number
                iNobject
                    uid -> string
                    chatId -> string
        */
        var chatType = parseInt(iNchaType), result;
        console.log('getChatIconByType - iNchaType,iNobject',iNchaType,iNobject);
        if (chatType == 1) {
            // private chat

            result =  URL.getUserIconByUid(iNobject['userId']);

        } else if(chatType == 2) {
            // group chat
            result = URL.getChatIconByChatId(iNobject['chatId']);
        }
        return result;
    } _.getChatIconByType = getChatIconByType;



	function pageIndex_openChatByChatId (iNobject) {
		/*
			@inputs
				@required
					iNobject -> object
						chatId
						userId
						chatName
						chatType


						userLogin


						chatIcon

						userLogin
						online
						servise
						chatType

		*/

		console.log('pageIndex_openChatByChatId start - iNobject',iNobject);

		iNobject['chatName']	= iNobject['chatName'];//'SharePay';
		iNobject['login']	 	= iNobject['userLogin'];// 'sharepay';
		iNobject['servise'] 	= (iNobject['userType'] == 2)?true:false;//true;

		var chatId  		= iNobject['chatId'];
			uid 			= iNobject['uid'],
			login 			= iNobject['login'],
			servise 		= iNobject['servise'],
			stateOnline 	= iNobject['online'],
			chatName  		= iNobject['chatName'];

		// get chatIcon
		var chatType 	= iNobject['chatType']||1,
			chatIcon  	= getChatIconByType(chatType,iNobject);
			iNobject['chatIcon'] = chatIcon;


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
		// runController_thisChatWatching (chatId); -> disable

        



        setCurrentChatUserId(iNobject['uid']);
        setCurrentChatType('private');

        // 'https://cdn.ramman.net/images/icons/apps/app_sharepay.png'
        // chatId, userId, userName, userIcon, userLogin, online, servise
        VIEW.addUserHeaderInChief({'chatId':chatId, 'uid':uid, 'name': chatName,'icon': chatIcon,'login':login,'online':stateOnline,'servise':servise});



		M_MESSAGE.setLastMsgTimeByChatId(chatId,0);
		
        if ( VIEW.getCountsOfChatContainers(chatId) == 0 ) {
            // need chat isset open it
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
    } _.pageIndex_openChatByChatId = pageIndex_openChatByChatId;

    
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