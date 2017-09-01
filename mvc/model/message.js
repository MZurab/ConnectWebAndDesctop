define(['jquery','v_message','m_firebase','m_moment','m_user','m_app'],function($,VIEW,FIREBASE,MOMENT,USER,M_APP) {
	const _ = {'view':VIEW};
	const CONST = {};



	 	function synchronizeWithMessageDb (iNchatId) {
			startChildFromMessages(iNchatId,'child_added');
			setTimeout(function(){
				startChildFromMessages(iNchatId,'child_changed');
			},500); 
	    }
	    _['synchronizeWithMessageDb'] = synchronizeWithMessageDb;

		    function startChildFromMessages (iNchatId,iNtype) {
		        var messagesRef = FIREBASE.database().ref('messages/'+iNchatId);
		        messagesRef.orderByChild("time").limitToLast(100).on(iNtype, function(messagesData) { 
		        	callbackAddOrChangeMessageFromFirebase(messagesData,iNchatId,iNtype);
				});
		    }	
			    function callbackAddOrChangeMessageFromFirebase (iNdataFromFB, iNchatId, iNtype) {
			    	var messagesData = iNdataFromFB;
			    	var myUID = USER.getMyId();
			    	var fullData 		   = messagesData.val()
			    	var objectForCreateMessage = fullData['info'];
			    	objectForCreateMessage['msgId'] = messagesData.key;

			    	
			    	getTimeTextForAllMessages(objectForCreateMessage,fullData,iNchatId,myUID);

			    	if(iNtype == 'child_changed') {
			    		// replace message in chat container
						VIEW.safeReplaceMessageToChatPage( objectForCreateMessage, myUID, iNchatId  );

			    	} else {
						VIEW.createMessageToChatPage( objectForCreateMessage, myUID, iNchatId  );
					}
					// ser observer for income non read message to me

					if( iNtype != 'child_changed' && objectForCreateMessage['uid'] != myUID &&  objectForCreateMessage['type'] == 1 ) {
						// if message to me -> status only sent -> this text message
						var myStateRead = getMyStateReadFromMsg(fullData,myUID);
						// var myStateDelivered = getMyStateDeliveredFromMsg(fullData,myUID);
						console.log('myStateRead',myStateRead);
						if( (myStateRead  == 0) ) {
							VIEW.setObserverForViewInVisualScroll(objectForCreateMessage['msgId'],function (e) {
								console.log('myStateRead setReadStateForMsg',objectForCreateMessage['msgId'],iNchatId,myUID);
								setReadStateForMsg(objectForCreateMessage['msgId'],iNchatId,myUID);
								VIEW.delObserverForViewInVisualScroll(objectForCreateMessage['msgId']);
							});
							$.force_appear();
						}
					}
			    }

    	function getTimeTextForAllMessages (iNobject,iNfullBlock,iNchatId,iNmyUid) {
    		if(iNfullBlock.time > 0) {
				iNobject.timeSentText = MOMENT().getTimeMiniText(iNfullBlock.time);
				safeCreateCenterDateText ( iNchatId, iNfullBlock.time );
			}
    		if( iNobject['uid'] != iNmyUid ) {
        		// this is message to me
        		getTimeForToMeMessages(iNobject,iNfullBlock,iNchatId,iNmyUid)
        	} else {
        		// this is message from me
        		getTimeForFromMeMessages (iNobject)
        	}
    	} 
	    	function getTimeForToMeMessages (iNobject,iNfullBlock,iNchatId,iNmyUid) {
	    		//get status by timestamp read,delivered,sent
	    		var myState = getMyStateFromMessages(iNfullBlock,iNmyUid);
	    		if ( typeof myState == 'object' ) {
	    			var states = myState;
	    			if(states.read > 0)
	    				iNobject.timeReadText = MOMENT().getTimeMiniText(states.read);
	    			if(states.delivered > 0)
	    				iNobject.timeDeliveredText = MOMENT().getTimeMiniText(states.delivered);
	    			else {
	    				setDeliveredStateForMsg(iNobject['msgId'],iNchatId,iNmyUid);
	    			}
	    		}
	    	}
	    	function getTimeForFromMeMessages (iNobject) {
	    		//get status by timestamp read,delivered,sent
	    		if ( typeof iNobject.state == 'object' ) {
	    			var states = iNobject.state;
	    			if(states.read > 0)
	    				iNobject.timeReadText = MOMENT().getTimeMiniText(states.read);
	    			if(states.delivered > 0)
	    				iNobject.timeDeliveredText = MOMENT().getTimeMiniText(states.delivered);
	    		}
	    	}


    	function getFirebaseTimeStamp () {
    		return FIREBASE.database.ServerValue.TIMESTAMP ;
    	}
    	function getMySateStatusFromMsg (iNobject,myUID) {
    		var thisStateObject = getMyStateFromMessages(iNobject,myUID);
			if (typeof thisStateObject['status'] == 'number')
				return thisStateObject['status'];
			console.log('getMySateStatusFromMsg false');
			return 0;
		}
		function getMyStateReadFromMsg (iNobject,myUID) {
    		var thisStateObject = getMyStateFromMessages(iNobject,myUID);
			if (typeof thisStateObject['read'] == 'number')
				return thisStateObject['read'];
			console.log('getMyStateReadFromMsg false');
			return 0;
		}
		function getMyStateDeliveredFromMsg (iNobject,myUID) {
    		var thisStateObject = getMyStateFromMessages(iNobject,myUID);
			if (typeof thisStateObject['delivered'] == 'number')
				return thisStateObject['delivered'];
			console.log('getMyStateDeliveredFromMsg false');
			return 0;
		}
		function getMyStateFromMessages (iNobject,myUID) {
    		if ( typeof iNobject == 'object' )
    			if ( typeof iNobject['member'] == 'object')
    				if (typeof iNobject['member'][myUID] == 'object')
    					if (typeof iNobject['member'][myUID]['state'] == 'object')
	    						return iNobject['member'][myUID]['state'];
			return false;
		}
		function startSendingFlashMsg (iNdata,iNchatId) {
			/*
				@disrc
					start sendidng flesh msg to firebase db
				@inputs
					@required
						iNdata -> object
							type
							data
			*/
			var chatId = getCurrentChatId();
			var myUID = USER.getMyId();
    		var baseKey = 'chats/'+chatId + '/info/live';
    		//change delete fixed type
    		var objForSendToDb = {'data':VIEW.getContentLengthFromMsgSenderBlock(),'uid':myUID,'time':getFirebaseTimeStamp(),'type':1}


    		var updateArray = {};
    			updateArray[baseKey] = objForSendToDb;
    		console.log('startSendingFlashMsg updateArray',updateArray);
        	FIREBASE.database().ref().update(updateArray);
		}
		_['startSendingFlashMsg'] = startSendingFlashMsg;

    	function setReadStateForMsg (iNmsgId,iNchatId,myUID) {
    		var baseKey = 'messages/'+iNchatId + '/' +iNmsgId + '/member/'+myUID + '/state';

    		var keyRead 	= baseKey+'/read';

    		var updateArray = {};
    			updateArray[keyRead] = getFirebaseTimeStamp();;
    			console.log('setReadStateForMsg',updateArray);
        	FIREBASE.database().ref().update(updateArray);
		}

    	function setDeliveredStateForMsg (iNmsgId,iNchatId,myUID) {
    		var baseKey = 'messages/'+iNchatId + '/' +iNmsgId + '/member/'+myUID + '/state';

    		var keyDelivered 	= baseKey+'/delivered';

    		var updateArray = {};
    			updateArray[keyDelivered] = getFirebaseTimeStamp();
    			console.log('setDeliveredStateForMsg',updateArray);
        	FIREBASE.database().ref().update(updateArray);
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
	  return FIREBASE.database().ref().update(updates);
	}
	_['sendMessageToDb'] = sendMessageToDb;

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
		var nowTime			= MOMENT().getNowTime();
		console.log('<<<<safeCreateCenterDateText START>>>>');
		console.log('safeCreateCenterDateText input',iNchatId,iNtime);
		console.log('safeCreateCenterDateText lastMsgTime',lastMsgTime);
		console.log('safeCreateCenterDateText isThisDay',isThisDay);
		console.log('safeCreateCenterDateText nowTime',nowTime);
		console.log('safeCreateCenterDateText MOMENT().getDayNumberByTime(lastMsgTime)',MOMENT().getDayNumberByTime(lastMsgTime));
		console.log('safeCreateCenterDateText MOMENT().getDayNumberByTime(iNtime)', MOMENT().getDayNumberByTime(iNtime));
		if( !lastMsgTimeText || ( MOMENT().getDayNumberByTime(lastMsgTime) != MOMENT().getDayNumberByTime(iNtime)  ) ) {
			// if first && if is not this day || or new date && if is not this day 
			setLastMsgTimeByChatId(iNchatId,iNtime);
			var objForChat = {};

			if(isThisDay) {
				//change set today from dictionary
				objForChat['content'] = MOMENT().getWeekDayText(iNtime);
			} else if ( MOMENT().isThisWeek(iNtime) ) {
				objForChat['content'] = MOMENT().getWeekDayText(iNtime);
			}else {
				objForChat['content'] = MOMENT().getFullText(iNtime);
			}
			VIEW.addCenterSimpleTextToChatPage(objForChat, iNchatId);
		}
	}
	function setLastMsgTimeByChatId (iNchatId,iNtime) {
            return M_APP.save('connectLastMsgChatId_'+iNchatId,iNtime);
    }
    function getLastMsgTimeByChatId (iNchatId) {
        return M_APP.get('connectLastMsgChatId_'+iNchatId);
    }

	//onClick events
		onClickSendMesg = function (e) {
			var chatId = getCurrentChatId();
			var data = {'content':VIEW.getContentFromMsgSenderBlock()};
			console.log('onClickSendMesg chatId',chatId);
			console.log('onClickSendMesg data',data);
			M_APP.playSound('https://cdn.ramman.net/audio/effects/sendMessage.mp3');//CHANGE do Const
			sendMessageToDb (data,chatId);
		}
		_['onClickSendMesg'] = onClickSendMesg;
	//



	//<CHAT MODEL DUPLICATE
	    function getCurrentChatId () {
	        return M_APP.get('connectThisOpenChatId');
	    }
	//>CHAT MODEL DUPLICATE

    return _;
});