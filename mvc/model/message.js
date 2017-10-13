define(['jquery', 'v_message', 'm_firebase', 'm_moment', 'm_user', 'm_app', 'm_category' , 'm_storage','m_record','m_progressbar'],function($, VIEW, FIREBASE, MOMENT, USER, M_APP, M_CATEGORY, M_STORAGE, M_RECORD,M_PROGRESSBAR) {
	const _ = {'view':VIEW};
	const CONST = {
		'var_prefixNewMessageCount' : 'connectNewMsgCountInChat-'
	};
	//@< copied functions from app-chat module
		function getCurrentChatId () {
	        return M_APP.get('connectThisOpenChatId');
	    }
    //@> copied functions from app-chat module
		function annihilateNewMsgCounterFDB (iNchatId) {
			var chatId = iNchatId;//getCurrentChatId();
			var myUID  = USER.getMyId();
    		var baseKey = 'chats/' + chatId + '/member/' + myUID + '/newMsg';
			var updateArray = {};
    			updateArray[baseKey] = 0;
        	FIREBASE.database().ref().update(updateArray);
		}

		function safeHideMessagesCountByChatId (iNchatId) {
			var msgCountFromLocaleStorage = getMyNewMessagesCountByChatId(iNchatId);
			if ( msgCountFromLocaleStorage > 0 ) {
				// send query for firebase db for annihilate newMsgCount in chats/$chatId/member/#myUid/newMsgCount
				setMyNewMessagesCountByChatId ( iNchatId, 0 );
				annihilateNewMsgCounterFDB(iNchatId);
			}
			VIEW.changeNewMsgCounter(iNchatId,0);
			VIEW.hideNewMsgCounter ();
			M_CATEGORY.view.domHideNewMsgCountInChatBlock(iNchatId);
		}
		

		function safeViewMessagesCountByChatId (iNchatId) {
			VIEW.plusNewMsgCounter ( iNchatId, 1 );

			let numberNewMsgFromDom = VIEW.getNewMsgCounter(iNchatId);
			M_CATEGORY.view.domChangeNewMsgCountInChatBlock (iNchatId,numberNewMsgFromDom);


			M_CATEGORY.view.domShowNewMsgCountInChatBlock (iNchatId);
			VIEW.showNewMsgCounter();
		}



			function getMyNewMessagesCountByChatId (iNchatId) {
				return parseInt(M_APP.get(CONST['var_prefixNewMessageCount']+iNchatId))||0;
			}
			_['getMyNewMessagesCountByChatId'] = getMyNewMessagesCountByChatId;

			function plusMyNewMessagesCountByChatId (iNchatId) {
				let number = getMyNewMessagesCountByChatId(iNchatId) + 1;
				setMyNewMessagesCountByChatId(iNchatId,number);
			}
			_['plusMyNewMessagesCountByChatId'] = plusMyNewMessagesCountByChatId;

			function setMyNewMessagesCountByChatId (iNchatId,iNnumber) {
				let path = CONST['var_prefixNewMessageCount']+iNchatId;
				M_APP.save(path,iNnumber);
			}
			_['setMyNewMessagesCountByChatId'] = setMyNewMessagesCountByChatId;



	 	function synchronizeWithMessageDb (iNchatId,iNobject) {
		    	/*
		    		@inputs
		    			@required
		    				iNchatId -> string
    					@optional
    						iNobject -> object
								functionOnChildChanged
								functionOnChildAdded
								functionOnChild
		    	*/
    		if(typeof iNobject != 'object') iNobject = {};
			M_APP.view.createLoaderInAppView();

			getMessagesFromDb(iNchatId,'child_added',iNobject);

			setTimeout (
				() => {
					let chatId = iNchatId;
					getMessagesFromDb(chatId,'child_changed',iNobject);
				},
				5000
			); 
	    }
	    _['synchronizeWithMessageDb'] = synchronizeWithMessageDb;

		    function getMessagesFromDb (iNchatId, iNtype, iNobject) {
		    	/*
		    		@inputs
		    			@required
		    				iNchatId -> string
		    				iNtype -> string
		    					child_changed || child_added
    					@optional
    						iNobject -> object
								functionOnChildChanged
								functionOnChildAdded
								functionOnChild
		    	*/

	    		if(typeof iNobject != 'object') iNobject = {};

		        var messagesRef = FIREBASE.database().ref('messages/'+iNchatId);
		        messagesRef.orderByChild("time").limitToLast(40).on(iNtype, (messagesData) =>  { 
		        	callbackAddOrChangeMessageForDb( messagesData, iNchatId, iNtype, iNobject);
				});
		    }
		    
			    function callbackAddOrChangeMessageForDb (iNdataFromFB, iNchatId, iNtype,iNobject) {
			    	/*
			    		@inputs
			    			@required
			    				iNdataFromFB (result from firebase db)
			    				iNchatId -> string
			    				iNtype -> number
	    						iNobject -> object
	    							@optional
										functionOnChildChanged
										functionOnChildAdded
			    	*/
			    	var messagesData = iNdataFromFB;
			    	var myUID = USER.getMyId();
			    	var fullData 		   = messagesData.val()
			    	var objectForCreateMessage = fullData['info'];
			    	objectForCreateMessage['msgId'] = messagesData.key;

			    	// if(typeof())
			    	if ( objectForCreateMessage['uid'] != myUID &&  objectForCreateMessage['type'] == 1 ) {
		    			let myStateRead = getMyStateReadFromMsg(fullData,myUID);
		    			if( myStateRead  == 0 ) {
		    				objectForCreateMessage['appearClass'] = true;
		    			}
		    		}

			    	if(typeof iNobject['functionOnChild'] == 'function') iNobject['functionOnChild'](iNchatId);
			    	
			    	getTimeTextForAllMessages(objectForCreateMessage,fullData,iNchatId,myUID);


			    	if(iNtype == 'child_changed') {
			    		// replace message in chat container

			    		if(typeof iNobject['functionOnChildChanged'] == 'function') iNobject['functionOnChildAdded'](iNchatId);

						VIEW.msgSimpleText_safeReplace( objectForCreateMessage, myUID, iNchatId  );

			    	} else {
			    		if(typeof iNobject['functionOnChildAdded'] == 'function') iNobject['functionOnChildAdded'](iNchatId);
			    		msgSimpleText_safeCreateMessageByPassedTime(objectForCreateMessage,fullData,iNchatId,myUID);

			    		

						VIEW.msgSimpleText_createMsg( objectForCreateMessage, myUID, iNchatId  );

						VIEW.effChatViewScrollToBotWithTimeOut (
							() => {
								if(getCurrentChatId() == iNchatId)
									safeHideMessagesCountByChatId ( iNchatId);
							},
							() => {
								if(getCurrentChatId() == iNchatId)
									if ( objectForCreateMessage['uid'] != myUID) 
										safeViewMessagesCountByChatId ( iNchatId);
							}
						);
						setObserverForAppearMessageInVisualScrollByChatId (iNchatId);
					}
					// ser observer for income non read message to me
			    }

	    function setObserverForAppearMessageInVisualScrollByChatId (iNchatId) {
	    	let thisSuccessFunction = (iNel) => {
    			let element = iNel;
    			const chatId 	= iNchatId;
	    		//таймер что бы успело создаться в сообщении counter блок
	    		setTimeout ( () => {
	    			let thisElement = element;
			    	var myUID = USER.getMyId();
		    		let msgId = VIEW.getFromMessageAttrMsgId(thisElement);
					setReadStateForMsg(msgId,chatId,myUID);
	    		}, 1200 );
			};
			VIEW.setObserverForViewMsgInVisualScrollByChatId(iNchatId, 
				{
					'success' : thisSuccessFunction,
					'onScrollParentFalse': safeHideMessagesCountByChatId
				}
			);
	    }
	    _['setObserverForAppearMessageInVisualScrollByChatId'] = setObserverForAppearMessageInVisualScrollByChatId;

	    function msgSimpleText_safeCreateMessageByPassedTime (iNobject,iNfullBlock,iNchatId,iNmyUid) {
    		if(iNfullBlock.time > 0) {
				msgSimpleText_createCenterDateText ( iNchatId, iNfullBlock.time );
			}

	    }
    	function getTimeTextForAllMessages (iNobject,iNfullBlock,iNchatId,iNmyUid) {

    		if(iNfullBlock.time > 0) {
				iNobject.timeSentText 	= MOMENT().getTimeMiniText(iNfullBlock.time);
				iNobject.timeSent 		= iNfullBlock.time;
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
	    			if(states.read > 0) {
	    				iNobject.timeReadText = MOMENT().getTimeMiniText(states.read);
	    				iNobject.timeRead 	  = states.read;
	    			}
	    			if(states.delivered > 0) {
	    				iNobject.timeDeliveredText = MOMENT().getTimeMiniText(states.delivered);
	    				iNobject.timeDelivered = states.delivered;
	    			 } else {
	    			 	setTimeout(  () =>  {
	    			 		let thisObj = iNobject;
	    			 		// delay for stock
	    					setDeliveredStateForMsg(thisObj['msgId'],iNchatId,iNmyUid);
						},1000);
	    			}
	    		}
	    	}
	    	function getTimeForFromMeMessages (iNobject) {
	    		//get status by timestamp read,delivered,sent
	    		if ( typeof iNobject.state == 'object' ) {
	    			var states = iNobject.state;
	    			if(states.read > 0) {
	    				iNobject.timeReadText = MOMENT().getTimeMiniText(states.read);
	    				iNobject.timeRead 	  = states.read;
	    			}
	    			if(states.delivered > 0) {
	    				iNobject.timeDeliveredText = MOMENT().getTimeMiniText(states.delivered);
	    				iNobject.timeDelivered = states.delivered;
	    			}
	    		}
	    	}


    	function getFirebaseTimeStamp () {
    		return FIREBASE.database.ServerValue.TIMESTAMP ;
    	}
    	function getMySateStatusFromMsg (iNobject,myUID) {
    		var thisStateObject = getMyStateFromMessages(iNobject,myUID);
			if (typeof thisStateObject['status'] == 'number')
				return thisStateObject['status'];
			return 0;
		}
		function getMyStateReadFromMsg (iNobject,myUID) {
    		var thisStateObject = getMyStateFromMessages(iNobject,myUID);
			if (typeof thisStateObject['read'] == 'number')
				return thisStateObject['read'];
			return 0;
		}
		function getMyStateDeliveredFromMsg (iNobject,myUID) {
    		var thisStateObject = getMyStateFromMessages(iNobject,myUID);
			if (typeof thisStateObject['delivered'] == 'number')
				return thisStateObject['delivered'];
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
        	FIREBASE.database().ref().update(updateArray);
		}
		_['startSendingFlashMsg'] = startSendingFlashMsg;

    	function setReadStateForMsg (iNmsgId,iNchatId,myUID) {
    		var baseKey = 'messages/'+iNchatId + '/' +iNmsgId + '/member/'+myUID + '/state';

    		var keyRead 	= baseKey+'/read';

    		var updateArray = {};
    			updateArray[keyRead] = getFirebaseTimeStamp();;
        	var result = FIREBASE.database().ref().update(updateArray);
		}

    	function setDeliveredStateForMsg (iNmsgId,iNchatId,myUID) {
    		var baseKey = 'messages/'+iNchatId + '/' +iNmsgId + '/member/'+myUID + '/state';

    		var keyDelivered 	= baseKey+'/delivered';

    		var updateArray = {};
    			updateArray[keyDelivered] = getFirebaseTimeStamp();
        	var result = FIREBASE.database().ref().update(updateArray);
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
			var timeStamp = getFirebaseTimeStamp();
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
     		var timeStamp     = getFirebaseTimeStamp();
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

	function msgSimpleText_createCenterDateText (iNchatId,iNtime) {
		var lastMsgTimeText = getLastMsgTimeByChatId(iNchatId);
		var lastMsgTime 	= parseInt(lastMsgTimeText);
		var isThisDay		= MOMENT().isThisDay(iNtime);
		var nowTime			= MOMENT().getNowTime();
		if( (typeof lastMsgTime != 'number' || lastMsgTime < 1) || ( MOMENT().getDayNumberByTime(lastMsgTime) != MOMENT().getDayNumberByTime(iNtime)  ) ) {
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
			VIEW.msgSimpleText_addCenter(objForChat, iNchatId);
		}
	}
	function setLastMsgTimeByChatId (iNchatId,iNtime) {
            return M_APP.save('connectLastMsgChatId_'+iNchatId,iNtime);
    }
    _['setLastMsgTimeByChatId'] = setLastMsgTimeByChatId;


    function getLastMsgTimeByChatId (iNchatId) {
        return M_APP.get('connectLastMsgChatId_'+iNchatId);
    }
    // _['getLastMsgTimeByChatId'] = getLastMsgTimeByChatId;

	//onClick events
		onClickSendMesg = function (e) {
			var chatId = getCurrentChatId();
			var data = {'content':VIEW.getContentFromMsgSenderBlock()};
			M_APP.playSound('https://cdn.ramman.net/audio/effects/sendMessage.mp3');//CHANGE do Const
			sendMessageToDb (data,chatId);
		}
		_['onClickSendMesg'] = onClickSendMesg;
	//




//@< COTROLLER msgLiveVideo
	function controller_msgLiveVideo_record_sendVideoToStorage (error, blob) {
		M_STORAGE.uploadBlob  (
			blob,
			{
				'pathForSaveFile'	: 'public/v4.webm',
				'mimeType' 			: 'video/webm'
			},
			{}
		);
	}

	function controller_msgLiveVideo_record_run () {
		var flagPermissionForLiveVideoRecord 		= false,
			flagBoolStartedLoaded 					= false,
			mediationObjectLiveVideoRecorderObject,
			mediationObjectLiveVideoStreamObject;

		var specialClickObject = VIEW.onSpecialClickForSendLiveAudioOrVideo (
			'video',
			{	
				// defaultState : false,
				'onStartVideoRecord': () => {
				// when timer finished (we give time for browser to get stream from camera)
					if ( flagPermissionForLiveVideoRecord == true ) {
						// set flag true -> we stared recording
						flagBoolStartedLoaded = true;
						// start recording
						mediationObjectLiveVideoRecorderObject.start(600000);
					} else {
						// set flag false -> we don't stared recording
						flagBoolStartedLoaded = false;
					}

				},
				'onStart': () => {
				// when mouse up from btn for live recording
					M_RECORD.video ( 
						{
							'onSuccess': (stream,recorderObject,mediationObjectForPassToVideoRecord) => {
								console.log ( 'specialClickObject video mediationObjectLiveVideoRecorderObject ',mediationObjectLiveVideoRecorderObject );
								if ( typeof mediationObjectLiveVideoRecorderObject != 'undefined' ) {
									// stop recording object (delete tracks from stream)
									M_RECORD.stopRecordingByStream(mediationObjectLiveVideoStreamObject);
									// stop recording stream
									mediationObjectLiveVideoRecorderObject.stop();
									// delete stream
									mediationObjectLiveVideoStreamObject.stop();
								}
								// set stream for global access in function
								mediationObjectLiveVideoStreamObject 	= stream;
								// set recorder for global access in function
								mediationObjectLiveVideoRecorderObject 	= recorderObject;
								// we get perimision for browser -> set true
								flagPermissionForLiveVideoRecord = true;
								// set for view element (video tag) our stream as src
								VIEW.msgLiveVideo_record_setStreamVideoElement(mediationObjectLiveVideoStreamObject);
								// show stream view box
								VIEW.msgLiveVideo_record_showStreamVideoViewer();

								// active special click object
								// specialClickObject.on();
							},
							'onError' : (e) => {
								// deactive special click object
								// specialClickObject.off();

								// we don't get perimision for browser -> set false
								flagPermissionForLiveVideoRecord = false;
							}
						}
					)
					
					
				},
				'onDelete': () => {
				// when mouse up from outside btn || from cancel btn 

					// hide stream recorder view
					VIEW.msgLiveVideo_record_hideStreamVideoViewer();
					// stop recording object (delete tracks from stream)
					M_RECORD.stopRecordingByStream(mediationObjectLiveVideoStreamObject);
					// stop recording stream
					mediationObjectLiveVideoRecorderObject.stop();
					// delete stream
					mediationObjectLiveVideoStreamObject.stop();

					// annihilate loading because we send
					flagBoolStartedLoaded = false;

				},
				'onSend' : () => {
				// when mouse up from inside btn for live recording
					
					// is recording started
					if ( flagBoolStartedLoaded == true ) {
						// hide stream recorder view
						VIEW.msgLiveVideo_record_hideStreamVideoViewer();
						// stop recording stream
						mediationObjectLiveVideoRecorderObject.stop();
						// upload video to storage
						mediationObjectLiveVideoRecorderObject.get( controller_msgLiveVideo_record_sendVideoToStorage );
						// stop recording object (delete tracks from stream)
						M_RECORD.stopRecordingByStream(mediationObjectLiveVideoStreamObject);
						// delete stream
						mediationObjectLiveVideoStreamObject.stop();
					}
						// annihilate loading because we send
						flagBoolStartedLoaded = false;
				},
				
			}
		);
	}
	_['controller_msgLiveVideo_record_run'] = controller_msgLiveVideo_record_run;

//@> COTROLLER record_msgLiveVideo 




// msg live video 
	function createMsg () {

	}
	function uploadMsg () {

	}
	function replaceMsg () {

	}
	
//

//@< COTROLLER msgLiveAudio record
	function controller_msgLiveAudio_record_sendAudioToStorage (error, blob) {
		M_STORAGE.uploadBlob  (
			blob,
			{
				'pathForSaveFile'	: 'public/a1.ogg',
				'mimeType' 			: 'audio/ogg; codecs=opus'
			},
			{}
		);
	}

	function controller_msgLiveAudio_record_run () {
		var permissionForLiveAudioRecord = false;
		var mediationObjectLiveAudioRecorderObject;
		var mediationObjectLiveAudioStreamObject;

		var specialClickObject = VIEW.onSpecialClickForSendLiveAudioOrVideo (
			'audio',
			{
				// defaultState : false,
				'onStart': () => {
				// when mouse up from btn for live recording
					// if ( permissionForLiveAudioRecord == false ) {
						M_RECORD.liveAudioRecord ( 
							{
								'onSuccess': (stream,recorderObject) => {
									if ( typeof mediationObjectLiveAudioStreamObject != 'undefined' ) {
										M_RECORD.stopRecordingByStream(mediationObjectLiveAudioStreamObject);
										mediationObjectLiveAudioRecorderObject.delete();
										mediationObjectLiveAudioStreamObject.stop();
									}
									// set stream
									mediationObjectLiveAudioStreamObject 	= stream;
									// set record object
									mediationObjectLiveAudioRecorderObject 	= recorderObject;
									permissionForLiveAudioRecord = true;

									if ( permissionForLiveAudioRecord == true )
										mediationObjectLiveAudioRecorderObject.start();


									// active special click object
									// specialClickObject.on();
									
								},
								'onError' : (e) => {
									// deactive special click object
									// specialClickObject.off();
									permissionForLiveAudioRecord = false;
								},
								'onDataAvailable' : controller_msgLiveAudio_record_sendAudioToStorage
							}
						);
					
				},
				'onDelete': () => {
				// when mouse up from outside btn || from cancel btn 
					console.log('onDelete permissionForLiveAudioRecord', permissionForLiveAudioRecord);
					if ( permissionForLiveAudioRecord == true ) {
						M_RECORD.stopRecordingByStream(mediationObjectLiveAudioStreamObject);
						mediationObjectLiveAudioRecorderObject.delete();
						mediationObjectLiveAudioStreamObject.stop();

						// mediationObjectLiveAudioRecorderObject.initStream();
					}

				},
				'onSend' : () => {
				// when mouse up from inside btn for live recording
					if ( permissionForLiveAudioRecord == true ) {
						mediationObjectLiveAudioRecorderObject.save();
						M_RECORD.stopRecordingByStream ( mediationObjectLiveAudioStreamObject );

						mediationObjectLiveAudioStreamObject.stop();
					}
				},
				
			}
		);
	}
	_['controller_msgLiveAudio_record_run'] = controller_msgLiveAudio_record_run;

//@> COTROLLER msgLiveVideo




//<CHAT MODEL DUPLICATE
    function getCurrentChatId () {
        return M_APP.get('connectThisOpenChatId');
    }
//>CHAT MODEL DUPLICATE

return _;
});