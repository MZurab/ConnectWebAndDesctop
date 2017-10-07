define(['v_app-chat', 'm_app','m_view','m_message','m_user','m_firebase','m_record','Howl'],function( VIEW, M_APP, M_VIEW, M_MESSAGE, USER, FIREBASE, M_RECORD,Howl) {
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



	   var STORAGE = FIREBASE.storage().ref();

	  var thisPageName; 

	  //< init pages const
		    //< page fullWindow
		    	thisPageName = 'index';
		        pages[thisPageName]  = {'attr':{'id' : 'leftBlockInViewWindow'},'menus':{}};
		          pages[thisPageName]['functions'] = {
		            // 'isPage'  : function () {    return true;},
		            'getTemplate' : function (iNdata) {

		            },
		            'onOut'  : function () {   return true;},
		            // 'onView'  : function () {
		            //   addPageToFullWindow({'id':'sign','uid':'@system'});
		            //   // V_APP_PAGE.addFullWindowByTemplate({'content':'Hellow World!!!'}); 
		            //   return true;
		            // },
		            // 'onHide'  : function () { return true;},
		            // 'setPage' : function () {return true;},
		            'onInit' 		: function () {

	        			M_APP.getGlobalVar('engine').passToApp({'app':'base','page':'index'});
		            	M_MESSAGE.view.initApp( { 'onClickSendMesg' : M_MESSAGE.onClickSendMesg , 'onKeyDownPrintingMsg' : M_MESSAGE.startSendingFlashMsg } );


		            	//
		            	

		            	M_MESSAGE.controller_msgLiveVideo_run ();
		            	M_MESSAGE.controller_msgLiveAudio_run ();

		            	//
		            	//
		            	//
		         		//set on
							// M_MESSAGE.view.onceMouseDownForAudioLiveRecord(
							// 	() => {
							// 		M_RECORD.audio3( 
							// 			{
							// 				'onSuccess': (stream,recorderObject,dataInner) => {
							// 			        // console.log('M_RECORD onSuccess',stream,recorderObject,dataInner);
							// 			        var sendThisFile = false;
												
							// 					console.log("dataInner['onGetBlob'] 1",dataInner);
							// 					dataInner['getGlob'] = (error, blob) => {

							// 				        console.log('mediaRecorder .onGetBlob start ',sendThisFile);

							// 				        console.log('mediaRecorder .onGetBlob blob ', blob);
							// 				        // console.log('mediaRecorder .onGetBlob file ',file);
							// 		        		var blobURL = URL.createObjectURL(blob);

							// 				        console.log('mediaRecorder .onGetBlob blobURL ', blobURL);


							// 				        var nM = {
							// 						  contentType: 'audio/ogg; codecs=opus'
							// 				        }

							// 						var uploadTask = STORAGE.child('public/12.ogg').put( blob , nM );//metadata
							// 						uploadTask.on(
							// 							firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
							// 							function(snapshot) {
							// 								// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
							// 								var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
							// 								console.log('Upload is ' + progress + '% done');
							// 							}, 
							// 							function(error) {
							// 							  console.log('uploadTask error',error);
							// 							  // A full list of error codes is available at
							// 							  // https://firebase.google.com/docs/storage/web/handle-errors
							// 							  switch (error.code) {
							// 							    case 'storage/unauthorized':
							// 							      // User doesn't have permission to access the object
							// 							    break;

							// 							    case 'storage/canceled':
							// 							      // User canceled the upload
							// 							    break;


							// 							    case 'storage/unknown':
							// 							      // Unknown error occurred, inspect error.serverResponse
							// 							    break;
							// 							  }
							// 							}, 
							// 							function() {
							// 							  	// Upload completed successfully, now we can get the download URL
							// 							  	var downloadURL = uploadTask.snapshot.downloadURL;
							// 							  	console.log('downloadURL',downloadURL);
							// 								var sound = new Howl.Howl({
							// 								  src: [ downloadURL ],
							// 								  format: ['ogg'],
							// 								  onseek: function(e){
							// 								  	console.log('onseek e',e);
							// 								  	console.log('onseek sound.seek()',sound.seek());
							// 								  }

							// 								});

							// 								// Clear listener after first call.
							// 								sound.once('load', function(){
							// 								  sound.play();
							// 								  console.log('Howl LOAD !');
							// 								  console.log('Howl sound.duration',sound.duration());
							// 								});

							// 								// Fires when the sound finishes playing.
							// 								sound.on('end', function(){
							// 								  console.log('Howl Finished!');
							// 								});

							// 								sound.play()
							// 							}
							// 						);
							// 					}
							// 					M_MESSAGE.view.onSpecialClickForSendLiveAudioOrVideo(
							// 						'audio',
							// 						{
							// 							'onStart': () => {

							// 								console.log('recorderObject.isRecording() 1',recorderObject);// audio 3
							// 								// recorderObject.setFileType('audio/webm');
							// 								// recorderObject.start(600000);
							// 								// console.log('recorderObject.isRecording() 1',recorderObject.isRecording());// audio 2

							// 								// recorderObject.startRecording(); // audio 2
							// 								recorderObject.start(); // audio 3
							// 								// console.log('recorderObject.isRecording() 2',recorderObject.isRecording());// audio 2
							// 							},
							// 							'onDelete': () => {
							// 								sendThisFile = true;
							// 								// recorderObject.stop();//  audio 1
							// 								// recorderObject.cancelRecording();//  audio 2
							// 								recorderObject.clearStream();//  audio 3
							// 								recorderObject.initStream(); // audio 3

							// 							},
							// 							'onSend' : () => {
							// 								// recorderObject.finishRecording(); //  audio 2
							// 								recorderObject.stop(); //  audio 3
							// 								recorderObject.initStream(); // audio 3
							// 								// recorderObject.get(getGlob);//save(); //  audio 1
							// 								// recorderObject.stop(); //  audio 1
							// 								// recorderObject.save(); //  audio 1
							// 							},
														
							// 						}
							// 					);
							// 				}
							// 			}
							// 		)
							// 	}
							// );
		         		//
		         		//
		         		//


		            	return true;
		            },
		            'onAppear' 		: function (d1,d2) {
		            	// M_MESSAGE.view.startAppearObserver();
		            	pageIndex_openChatByChatId(d1);
 						return true;
 					},
		            'onDisappear' 	: function () { return true;},
		          };
		    //> page fullWindow

	  //> init pages const
	_['pages'] = pages; 

	//@<<< APP BLOCK
		//@override
		function getTemplate (iNdata) {
			iNdata['other'] = VIEW.getChatSenderBlock();
		}
		_['getTemplate'] = getTemplate; 

		//@required
		function onInit () {

		}
		_['onInit'] = onInit; 
		
			//@optional	
			function onIn () {

			}
			_['onIn'] = onIn; 
				//@required
				function onAppear () {
					M_VIEW.closeLoader();

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

				}
			_['onDisappear'] = onDisappear; 

			//@optional	
			function onOut () {
				// here must be page onOut functions

			}
			_['onOut'] = onOut; 
		//@required
		function onDeinit () {

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
		iNobject['servise'] = (iNobject['userType'] == 2)?true:false;//true;

		var chatId  = iNobject['chatId'];
		var uid 	= iNobject['uid'];
		var login 	= iNobject['login'];
		var servise = iNobject['servise'];
		var stateOnline 	= iNobject['online'];
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