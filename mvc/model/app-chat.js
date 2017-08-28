define(['v_app-chat', 'm_app','m_firebase','m_user','m_view','m_moment'],function( VIEW, M_APP, FIREBASE, USER, M_VIEW, MOMENT) {
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


    	sendMessageToDb({'content':'test'},iNchatId);

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
        messagesRef.orderByChild("time").limitToLast(100).on('child_added', function(messagesData) { 
        	var fullMessage 		   = messagesData.val()
        	var objectForCreateMessage = fullMessage['info'];
        	console.log('getChatDataByChatId messagesData.val()',objectForCreateMessage);
        	objectForCreateMessage['msgId'] = messagesData.key;
        	console.log('getChatDataByChatId objectForCreateMessage',objectForCreateMessage);



    		if ( typeof objectForCreateMessage.state == 'object' ) {
    			var states = objectForCreateMessage.state;
    			if(fullMessage.time > '0') {
    				objectForCreateMessage.timeSentText = MOMENT().getTimeMiniText(fullMessage.time);
    				safeCreateCenterDateText ( iNchatId, fullMessage.time );
    			}
    			if(states.read > '0')
    				objectForCreateMessage.timeReadText = MOMENT().getTimeMiniText(states.read);
    			if(states.delivered > '0')
    				objectForCreateMessage.timeDeliveredText = MOMENT().getTimeMiniText(states.delivered);
    		}

    		VIEW.addMessageToChatPage( objectForCreateMessage, USER.getMyId(), iNchatId  );
        });
    }
	function sendMessageToDb (iNdata,iNchatId) {
      /*
		@discr
			send msg to firebase realtime db
      	@inputs
	        @required
		        1 - iNdata
		            @required
		                content
		            @optional
		                block
		                fire
		                group
		                type
		        2 - iNchatId
        @return
        	result form Firebse update

      */
      // get my user id
      iNdata.type = 1;
      var myUid         	= FIREBASE.auth().currentUser.uid;
      // get right object for add to msg db
      var objForSentToDb 	= prepareObjectForSentToMsgBase(iNdata,myUid);
      // get msg id for send
      var msgId = FIREBASE.database().ref().child('messages/'+iNchatId).push().key;
      // buidl update object for sent to msg
      var keyForUpdateMsg = 'messages/' + iNchatId + '/' + msgId;
      var updates = {};  updates[keyForUpdateMsg] = objForSentToDb;
      // update last msg block in chat db for show in list menus for all users 
 	  // updateChatLastMsgObject(objForSentToDb,iNchatId); 
 	  // send to msg for add and return result of firebase
 	  console.log('sendMessageToDb updates',updates);
	  return FIREBASE.database().ref().update(updates);
	}
		function prepareObjectForSentToMsgBase (iNdata,iNmyUid) {
			/*
				@discr
					return object for base
				@inputs
			    @required
			        1 - iNdata
			            @required
			                content
			            @optional
			                block
			                fire
			                group
			                type
			        2 - iNmyUid
			*/
			var timeStamp = FIREBASE.database.ServerValue.TIMESTAMP ;
			var objForSentToDb = {
				'info'	: { 
					'options'	: {'base':{}},
					'state'		: {'sent':timeStamp},
					'content'	: iNdata['content'],
				},
				'time'  : timeStamp,
				'status': 1,
				'type'	: iNdata.type,
				'uid'	: iNmyUid
			};

			if( typeof(iNdata.type)   != 'undefined')     objForSentToDb['info']['type'] = iNdata.type;    // default text key
			if( typeof(iNdata.block)  == 'undefined')     objForSentToDb['info']['options']['base']['block'] = 0;   // default block disable
			if( typeof(iNdata.fire)   == 'undefined')     objForSentToDb['info']['options']['base']['fire']  = 0;    // default fire disable
			if( typeof(iNdata.group)  == 'undefined')     objForSentToDb['info']['options']['base']['group'] = 0;   // default group dissable
			if( typeof(iNmyUid)    != 'undefined')     {
				objForSentToDb['uid'] = iNmyUid;    // default group dissable
				objForSentToDb['info']['uid'] = iNmyUid;
			}
			return objForSentToDb;
		}
		function updateChatLastMsgObject (iNobject,iNchatId) {
			/*
				@discr
					update last msg block in chat db for show in list menus for all users 
				@inputs
					@required
						iNobject
							info
								content
								typw
							uid
			*/
     		var timeStamp     = FIREBASE.database.ServerValue.TIMESTAMP;
     		var updates = {};
			var lastMessage = {
			    content 	: iNobject['info']['content'],
			    time 		: timeStamp,
			    type 		: iNobject['info']['type'],
			    uid 		: iNobject['uid']
			};
			updates['/chats/info/' + iNchatId + '/msg'] = lastMessage;
	  		return FIREBASE.database().ref().update(updates);
		}

	function safeCreateCenterDateText (iNchatId,iNtime) {
		var lastMsgTimeText = getLastMsgTimeByChatId(iNchatId);
		var lastMsgTime 	= parseInt(lastMsgTimeText);
		var isThisDay		= MOMENT().isThisDay(iNtime);
		var nowTime		= MOMENT().getNowTime();
		if( (!lastMsgTimeText && !isThisDay) || ( MOMENT().getDayNumberByTime(lastMsgTime) != MOMENT().getDayNumberByTime(iNtime) && !isThisDay ) ) {
			// if first && if is not this day || or new date && if is not this day 
			var objForChat = {};
			if ( MOMENT().isThisWeek(iNtime) ) {
				console.log('safeCreateCenterDateText week isThisDay',isThisDay,lastMsgTime,iNtime,nowTime);
				console.log('safeCreateCenterDateText week isThisDay',MOMENT().getDayNumberByTime(lastMsgTime) , MOMENT().getDayNumberByTime(nowTime)  );
				objForChat['content'] = MOMENT().getWeekDayText(iNtime);
			}else {
				console.log('safeCreateCenterDateText fulltext isThisDay',isThisDay,lastMsgTime,iNtime);
				objForChat['content'] = MOMENT().getFullText(iNtime);
			}
			VIEW.addCenterSimpleTextToChatPage(objForChat, iNchatId);
			setLastMsgTimeByChatId(iNchatId,iNtime);
		}
	}
	function setLastMsgTimeByChatId (iNchatId,iNtime) {
            return M_APP.save('connectLastMsgChatId_'+iNchatId,iNtime);
    }
    function getLastMsgTimeByChatId (iNchatId) {
        return M_APP.get('connectLastMsgChatId_'+iNchatId);
    }

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