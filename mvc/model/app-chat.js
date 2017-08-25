define(['v_app-chat', 'm_app','m_firebase','m_user','m_view'],function( VIEW, M_APP, FIREBASE, USER, M_VIEW ) {
	//@< init
		// init from app view templates
	  const _ = {};
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
		            	console.log('getTemplate APP-CHAT PAGE INDEX iNdata start',iNdata);
						console.log('getTemplate APP-CHAT PAGE INDEX iNdata end',iNdata);

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
		            'onInit' 		: function () {console.log('app-page '+thisPageName,'onInit'); return true;},
		            'onAppear' 		: function (d1,d2) {
		            	console.log('d1,d2',d1,d2);
		            	pageIndex_openChatByChatId(d1['chatId'],d1['userId']);
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
			console.log('onInit');
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
					console.log('onAppear');

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
	function pageIndex_createChatByUid () {

	}




	function pageIndex_openChatByChatId (iNchatId,iNuserId) {
        // var chatView = "#leftBlockInViewWindow .ChatViewInAppWindow";
        // var needView = chatView + "[connect_chatid='"+iNchatId+"']";

        setCurrentChatId(iNchatId);
        setCurrentChatUserId(iNuserId);
        setCurrentChatType('private');



        VIEW.addUserHeaderInChief({'name':'SharePay','icon':'https://cdn.ramman.net/images/icons/apps/app_sharepay.png','login':'sharepay','online':true,'servise':true});

        if ( VIEW.getCountsOfChatContainers(iNchatId) == 0 ) {
            // need chat isset open it
            VIEW.createChatContainer(iNchatId);
        	getChatDataByChatId(iNchatId);
        }
        VIEW.hideChatContainers();
        VIEW.showChatContainerByChatId(iNchatId);
		// M_APP.view.effScrollToButtom('#leftBlockInViewWindow',0);
    }
    function getChatDataByChatId (iNchatId) {
        var messagesRef = FIREBASE.database().ref('messages/'+iNchatId);
        messagesRef.on('child_added', function(messagesData) { 
        	var objectForCreateMessage = messagesData.val();
        	console.log('getChatDataByChatId messagesData.val()',objectForCreateMessage);
        	objectForCreateMessage['msgId'] = messagesData.key;
        	console.log('getChatDataByChatId objectForCreateMessage',objectForCreateMessage);

        	for(var i = 0; i < 15; i++){
        		VIEW.addMessageToChatPage( objectForCreateMessage, USER.getMyId(), iNchatId  );
        	}
        });
    }

	function addMessageToDb (iNdata,iNchatId) {
      /*
        1 - iNdata
            @required
                data
            @optional
                type
                block
                fire
                group

      */
      // A post entry.
      // if(typeof(firebase.auth().currentUser.uid)  == 'undefined') {
      //    console.log('signOut');
      //    Connect_signOut();
      // }
      var myUid         = FIREBASE.auth().currentUser.uid;
      var timeStamp     = FIREBASE.database.ServerValue.TIMESTAMP;
      

      // Get a key for a new Post.
      if( typeof(iNdata.type)   == 'undefined')     iNdata.type = 1;    // default text key
      if( typeof(iNdata.block)  == 'undefined')     iNdata.block = 0;   // default block disable
      if( typeof(iNdata.fire)   == 'undefined')     iNdata.fire = 0;    // default fire disable
      if( typeof(iNdata.group)  == 'undefined')     iNdata.group = 0;   // default group dissable
      if( typeof(iNdata.user)   == 'undefined')     iNdata.user = myUid;    // default group dissable
      iNdata.time = timeStamp; 
      if( typeof(iNchatId)      == 'undefined') 	iNchatId = FIREBASE.database().ref().child('chats').push().key;
      
      // if( typeof(iNuuid)         != 'undefined') Connect_joinUserToChatId(iNuuid,iNchatId); // add user to chat if its a new chat

      var msgid = FIREBASE.database().ref().child('messages/'+iNchatId).push().key;
      var updates = {}; 
          updates['messages/' + iNchatId + '/' + msgid] = iNdata;

          //add to last msg block
      var lastMessage = {
            content 	: iNdata.data,
            time 		: timeStamp,
            type 		: iNdata.type,
            user 		: myUid
        };
      updates['/chats/' + iNchatId + '/msg'] = lastMessage;

      

      return FIREBASE.database().ref().update(updates);
	}

	function setCurrentChatId (iNchatId) {
            return M_APP.get('connectThisOpenChatId');
    }
    function getCurrentChatId (iNchatId) {
        return M_APP.get('connectThisOpenChatId');
    }

    function setCurrentChatType (iNchatId) {
            return M_APP.get('connectThisOpenChatType');
    }
    function getCurrentChatType (iNchatId) {
        return M_APP.get('connectThisOpenChatType');
    }

    function setCurrentChatUserId (iNchatId) {
            return M_APP.get('connectThisOpenChatUserId');
    }
    function getCurrentChatUserId (iNchatId) {
        return M_APP.get('connectThisOpenChatUserId');
    }

    function getTodayTime (iNtime) {
	    return new Date(iNtime).getHours() + ':' + new Date(iNtime).getMinutes();
	} 

	return _;
});