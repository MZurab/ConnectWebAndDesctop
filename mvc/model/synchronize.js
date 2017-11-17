define(['jquery','m_user','m_app','m_firebase'],function( $, USER, M_APP, FIREBASE ) {
	//'m_moment','m_user','m_app' ++ MOMENT,USER,M_APP
	const _ = {}; // 'view':VIEW
	// const MESSAGING = FIREBASE.messaging();
	const CONST 	= {};
		CONST['flagUserSignIn'] 	= '@connectFlagForSync_UserSignIn';
		CONST['flagReloadPage'] 	= '@connectFlagForSync_reload';


	const DOMAIN 	= "https://ramman.net";




	var lastCopyLocalStorage = '';
	function listenerForRunInSubdomain (event) {
		if (event.origin != DOMAIN) {
		  return;
		}
		var inputObj = event.data;
		if(typeof inputObj != 'object') return false;
		// restart interval
		startIntervalForSubDomain(event);

		console.log('listenerForRunInSubdomain inputObj',inputObj);
		if (inputObj['command'] == 'mainDomainSignedOut' ) {
			// our main domain signed outed -> we open sign in page
			M_APP.getGlobalVar('engine').passToApp ( 
				{ 
					'app'	: 'page', 
					'page'	: 'fullWindow', 
					'user'	: 'anonym', 
					'data'	: 'id=sign&uid=@system' 
				} 
			);

		} else if ( inputObj['command'] == 'getLocalStorage' ) {
		  /* DISABLE 

		  let lStorage = getLocalStorage();
		  // save last copy
		  setLastSentLocalStorage(lStorage);
		  // send message to DOMAIN
		  event.source.postMessage( {'command':'saveLocalStorage','content':lStorage} , event.origin);
		  // start interval spy for changing funciton

		  */
		} else if  (inputObj['command'] == 'saveLocalStorage' && inputObj['content']) {

		  // save change in local storage
		  writeLocalStorage(inputObj['content']);
	  	  setLastSentLocalStorage(inputObj['content']);


	      //of other reload functions
	  	  clearInterval(window.connectTimeoutIdSunchronizelistenerForRunInSubdomain);
	  	  if ( USER.getMyId() != USER.getMyIdFromObj(inputObj['content']) ) {
	  	  	 // create new function
	  	  	 var funcForSync = () => {
	  	  	 	 window.connectTimeoutIdSunchronizelistenerForRunInSubdomain = setTimeout (
		  			() => { 
			  	  		if ( USER.getMyId() != USER.getMyIdFromObj(inputObj['content']) ) {
						  	location.reload(true) 
					    }
				  	},
		  			500
				  );
	  	  	 }
	  	  	 // if our subdomain user signIn we signOut and then add new user 
	  	  	 if ( USER.getMyId() ) {
	  	  	 	FIREBASE.auth().signOut().then( 
					() =>  {
					// invoke success function
						funcForSync();
					}, (error) => {
						console.warn('listenerForRunInSubdomain $error',error);
					}
				);
	  	  	 } else {
				// invoke success function
	  	  	 	funcForSync();
	  	  	 }


	  		 
	  	  }
		}
	}








	//
	//
	//
		function synchronizeFile_getSubDomain () {
			return CONST['subdomainForSynchronizeFile'];
		}

		function synchronizeFile_setSubDomain (subDomain) {
			CONST['subdomainForSynchronizeFile'] = subDomain;
		}

		function synchronizeFile_listener (event) {

			var subDomain = synchronizeFile_getSubDomain();

			if (event.origin != subDomain) {
			return;
			}
			var inputObj = event.data;
			if(typeof inputObj != 'object') return false;


			console.log ('synchronizeFile_listener inputObj',inputObj);
			if ( inputObj['command'] == 'signOut' ) {
				console.log ('synchronizeFile_listener signOut');
				FIREBASE.auth().signOut().then( 
					() =>  {
						// clear local storage
						M_APP.clear();
						// for reload main domain
						M_APP.saveLocalStorage ( CONST['flagReloadPage'], true );
						// send to sub domain command that main domain signed out
						synchronizeFile_sendDataToSubDomain({'command':'mainDomainSignedOut'});
						// funcOnSuccess();
					}, (error) => {
						console.warn('synchronizeFile_listener $error',error);
					}
				);
			} else if (inputObj['command'] == 'getLocalStorage') {
				//
				let lStorage = M_APP.getStringOfLocalStorage();
				// save last copy
				setLastSentLocalStorage(lStorage);
				// send message to subdomain
				event.source.postMessage({'command':'saveLocalStorage','content':lStorage}, event.origin);

			} else if  (inputObj['command'] == 'saveLocalStorage' && inputObj['content']) {

				var funcOnSuccess = (iNadditionaFunction) => {
					// save change in local storage
					setLastSentLocalStorage(inputObj['content']);
					writeLocalStorage(inputObj['content'],false);
					if(typeof iNadditionaFunction == 'function') iNadditionaFunction();
				}
				//check flags
					//flag
					var inputObjectOfStringContent = JSON.parse(inputObj['content']);
					if( typeof inputObjectOfStringContent[ CONST['flagUserSignIn'] ] != 'undefined' ) {
						//if user signIned in subdomain -> we add reload flag
							// del flag
							delete inputObjectOfStringContent[ CONST['flagUserSignIn'] ];
							// save for add to local storage later
							inputObj['content'] =  JSON.stringify(inputObjectOfStringContent);
							if ( USER.getMyId() ) {
					  	  	 	FIREBASE.auth().signOut().then( 
									() =>  {
										// invoke success function with post add reload flag for main domain NOT in synchronize file
										funcOnSuccess(
											() => {
												M_APP.saveLocalStorage ( CONST['flagReloadPage'], true );
											}
										);
									}, (error) => {
										console.warn('synchronizeFile_listener $error',error);
									}
								);
					  	  	} else {
								// invoke success function with post add reload flag for main domain NOT in synchronize file
					  	  	 	funcOnSuccess(
									() => {
										M_APP.saveLocalStorage ( CONST['flagReloadPage'], true );
									}
								);
					  	  	}

					} else {
						// if usual data
						funcOnSuccess();
					}
			}
		}

		function synchronizeFile_sendDataToSubDomain (iNdata) {
			let subdomain = synchronizeFile_getSubDomain();
			parent.postMessage( iNdata, subdomain );
		}

		function synchronizeFile_startInterval () {
			/*
				@discr
					send to parent window localstorage when we change
				@inputs
			*/
		    clearInterval ( synchronizeFile_getIntervalId() );
			let intervalId = setInterval (
			  () => {
			    // spy for changing local storage -> for send to subDomain
			    let lStorage    = getLastSentLocalStorage();
			    let realStorage = M_APP.getStringOfLocalStorage();
			    if ( lStorage != realStorage ) {
			      //save last localstorage
			      setLastSentLocalStorage(realStorage);
			      //send to subdomain our local storage
			      synchronizeFile_sendDataToSubDomain ( { 'command': 'saveLocalStorage', 'content': realStorage } );
			    }
			  }
			  ,
			  250
			);
			synchronizeFile_setIntervalId(intervalId);
		}

		function synchronizeFile_getIntervalId () {
		    return CONST['intervalIdForSynchronizeFile']||false;
		}

		function synchronizeFile_setIntervalId (iNdata) {
	        CONST['intervalIdForSynchronizeFile'] = iNdata;
	    }

	    function synchronizeFile_initListener () {
	       if (window.addEventListener) {
	        window.addEventListener("message", synchronizeFile_listener);
	      } else {
	        // IE8
	        window.attachEvent("onmessage", synchronizeFile_listener);
	      }
	    }

		function synchronizeFile_run (iNsubdomain) {
			// set subdomain
			synchronizeFile_setSubDomain(iNsubdomain);

	    	//when this frame ready
	    	synchronizeFile_startInterval();


			// init listener
			synchronizeFile_initListener();

	    }
	    _['synchronizeFile_run'] = synchronizeFile_run;
	//
	//
	//


	function attachForEventOnMessage (iNlistenerForRunInSubdomain) {
		if ( window.addEventListener ) 
			window.addEventListener("message", iNlistenerForRunInSubdomain);
		else // IE8
			window.attachEvent("onmessage", iNlistenerForRunInSubdomain);
		
	}

	function attachMessageOnEvent () {
		attachForEventOnMessage(listenerForRunInSubdomain);
	}



	function getLastSentLocalStorage () {
		return lastCopyLocalStorage||'';
	}
	function setLastSentLocalStorage (iNstring) {
		return lastCopyLocalStorage = iNstring;
	}

	function writeLocalStorage(data, iNclear) {
		// defaul we enabe clear
		if(typeof iNclear != 'boolean') iNclear = true;
		// clear local storage -> creating new storage what get from  origin domain ramman.net
		if( iNclear ) {
			// clear local storage for full update
			M_APP.clearLocalStorage();
		}

		// get sage object
		if(typeof data == 'string')
			var o = JSON.parse(data);
		else
			var o = data;

		// creating new localstorage
		for (var property in o) {
		  if (o.hasOwnProperty(property)) {
		      localStorage.setItem(property, o[property]);
		  }
		}


	}
	function isEquilWithLocalStorage (data) {
		var o;
		if(typeof data == 'string')
		    o = JSON.parse(data);
		  else
		    o = data;
		  for (var property in o) {
		      if (o.hasOwnProperty(property)) {
		          if( localStorage.getItem(property) != o[property] ) {
		            return false;
		          }
		      }
		  }
		  return true;
	}
	function sendMessageToFrame (iNobject) {
		$('#frameSynchronize').get(0).contentWindow.postMessage(iNobject, "https://ramman.net");
	}
	_['sendMessageToFrame'] = sendMessageToFrame;
	// function setOnEventLoadFrameFunc (iNfunction) {
	// 	$('#frameSynchronize').on('load',iNfunction);
	// }


	function getLocalStorageFromFrame () {
		var objForSendToFrame = { 'command' : 'getLocalStorage'};
		sendMessageToFrame( objForSendToFrame );
	}

	function runForSubDomain () {
		// attach events
		attachMessageOnEvent ();
		// get local storage for start interval function at him when fram loaded
		// setOnEventLoadFrameFunc (
		// 	() => {
		// 		getLocalStorageFromFrame ();
		// 	}
		// );
		// start interval
		startIntervalForSubDomain();
	}
	_['runForSubDomain'] = runForSubDomain;

	function runForMainDomain () {
		// if we have flag () in our local storage we reload

		// star interval func for main domain
		clearInterval(CONST['intervalIdForMainDomain']);
	    CONST['intervalIdForMainDomain'] = setInterval (
	      () => {
	      	// need flag name
			let flagForReloadName = CONST['flagReloadPage'];

			// if we have this flag in our local storage -> we have to reload our page
			if ( M_APP.getFromLocalStorageByKey(flagForReloadName) ) {
				//del flag from local storage
				M_APP.del(flagForReloadName) 
				//reload
				location.reload(true);
			}
	      },
	      500
        );
	}
	_['runForMainDomain'] = runForMainDomain;

	function subDomain_synchronizeLocalStorage () {
		var tempStorage = M_APP.getTempStorage();
        if( typeof tempStorage == 'object' && Object.keys(tempStorage).length > 0 ) {
          //send
          // setLastSentLocalStorage(realStorage);
          sendMessageToFrame( { 'command':'saveLocalStorage', 'content': JSON.stringify(tempStorage) });

          // clear temp storage
          M_APP.clearTempStorage();
        }
	}
	_['subDomain_synchronizeLocalStorage'] = subDomain_synchronizeLocalStorage;

	function subDomain_sendCommandForSignOut () {
		/*
			@discr
				Send to synchronize file signOut command
		*/
		console.log('subDomain_sendCommandForSignOut start');
		sendMessageToFrame ( { 'command':'signOut' } );
	}
	_['subDomain_sendCommandForSignOut'] = subDomain_sendCommandForSignOut;

	function startIntervalForSubDomain () {
		// attach listenerForRunInSubdomain to on message

		subDomain_clearIntervalFunction();

	    CONST['intervalIdForSubdomain'] = setInterval (
	      () => {
	        // spy for changing local storage -> for send to subDomain
	        // var lStorage    = getLastSentLocalStorage();
	        subDomain_synchronizeLocalStorage();
	      }
	    ,
	    500
	    );
	}

	function subDomain_clearIntervalFunction () {
		clearInterval(CONST['intervalIdForSubdomain']);
		// body...
	}
	_['subDomain_clearIntervalFunction'] = subDomain_clearIntervalFunction;

	return _;
});