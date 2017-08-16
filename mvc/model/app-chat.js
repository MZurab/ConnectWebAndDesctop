define(['v_app-chat', 'm_app','m_firebase','user'],function( V_APP_CHAT, M_APP, FIREBASE, USER ) {
	//@< init
		// init from app view templates
	  const _ = {};
	  const name = 'chat';
	  _['name'] = name;  

	  //< init pages const
		  const pages = {}; _['pages'] = pages;
		    //< page fullWindow
		        pages['fullWindow']  = {'attr':{},'menus':{},'functions':{}};
		          pages['fullWindow']['functions'] = {
		            // 'isPage'  : function () {console.log('app-page fullWindow','isPage'); return true;},
		            'onOut'  : function () {console.log('app-page fullWindow','onOut'); return true;},
		            // 'onView'  : function () {
		            //   addPageToFullWindow({'id':'sign','uid':'@system'});
		            //   // V_APP_PAGE.addFullWindowByTemplate({'content':'Hellow World!!!'}); 
		            //   // console.log('app private','onView');
		            //   return true;
		            // },
		            // 'onHide'  : function () {console.log('app-page fullWindow','onHide'); return true;},
		            // 'setPage' : function () {console.log('app-page fullWindow','setPage'); return true;},
		            'onInit' : function () {console.log('app-page fullWindow','onInit'); return true;},
		            'onAppear' : function () {console.log('app-page fullWindow','onAppear'); return true;},
		            'onDisappear' : function () {console.log('app-page fullWindow','onDisappear'); return true;},
		          };
		    //> page fullWindow

	  //> init pages const


	//@<<< APP BLOCK
		//@required
		function onInit () {
			console.log('onInit');
		}
		
			//@optional	
			function onIn () {
				console.log('onIn');

			}
				//@required
				function onAppear () {
					m_view.closeLoader();
					console.log('onAppear');

				}
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

			//@optional	
			function onOut () {
				// here must be page onOut functions
				console.log('onOut');

			}
		//@required
		function onDeinit () {
			console.log('onDeinit');

		}
	//@>>> APP BLOCK








	function pageIndex_openChatByChatId (iNchatId) {
        var chatView = "#leftBlockInViewWindow .ChatViewInAppWindow";
        var needView = chatView + "[connect_chatid='"+iNchatId+"']";
        setCurrentChatId (iNchatId);
        V_APP_CHAT.hideChatContainers();
        if ( V_APP_CHAT.getCountsOfChatContainers == 0 ) {
            // need chat isset open it
            V_APP_CHAT.createChatContainer(iNchatId);
        }
        V_APP_CHAT.showChatContainerByChatId(iNchatId);

        getChatDataByChatId(iNchatId);
        M_APP.view.effScrollToButtom('#leftBlockInViewWindow',0);
    }
    function getChatDataByChatId (iNchatId) {
        var messagesRef = FIREBASE.database().ref('messages/'+iNchatId);
        messagesRef.on('child_added', function(messagesData) { 
        	var objectForCreateMessage = messagesData.val();
        	console.log('getChatDataByChatId messagesData.val()',objectForCreateMessage);
        	objectForCreateMessage['msgId'] = messagesData.key;
        	console.log('getChatDataByChatId objectForCreateMessage',objectForCreateMessage);
            V_APP_CHAT.addMessageToChatPage( objectForCreateMessage, USER.getMyId(), iNchatId  );
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
            return M_APP.get('connect_currentChatId');
    }
    function getCurrentChatId (iNchatId) {
        return M_APP.get('connect_currentChatId');
        
    }

    function getTodayTime (iNtime) {
	    return new Date(iNtime).getHours() + ':' + new Date(iNtime).getMinutes();
	} 

	return {
		// vars
		'name' 			: name,
		'pages' 		: pages,

		// app functions
		'onInit' 		: onInit,
		'onIn' 			: onIn,
		'onAppear' 		: onAppear,
		'onDisappear' 	: onDisappear,
		'onOut' 		: onOut,
		'onDeinit' 		: onDeinit,
	}
});