define(['jquery','v_push','m_firebase','platform'],function($,VIEW,FIREBASE,PLATFOTM) {
	//'m_moment','m_user','m_app' ++ MOMENT,USER,M_APP
	const _ = {'view':VIEW};
	const MESSAGING = FIREBASE.messaging();
	const CONST = {};

	function getPermission (iNsuccessFunction) {
		MESSAGING.requestPermission()
		.then(function() {
		  console.log('getPermission()','Notification permission granted.');
		  // TODO(developer): Retrieve an Instance ID token for use with FCM.
		  // ...
		  if ( typeof iNsuccessFunction == 'function') iNsuccessFunction();
		})
		.catch(function(err) {
		  console.log('getPermission() err','Unable to get permission to notify.', err);
		});
	}
	_['getPermission'] = getPermission;


	function getToken (iNsuccessFunction) {
		MESSAGING.getToken()
		  .then(function(currentToken) {
		    if (currentToken) {
		      // sendTokenToServer(currentToken);
		      // updateUIForPushEnabled(currentToken);
		      console.log('MESSAGING.getToken() currentToken',currentToken);
		 	  if ( typeof iNsuccessFunction == 'function') iNsuccessFunction(currentToken);

		    } else {
		      // Show permission request.
		      console.log('MESSAGING.getToken() !currentToken','No Instance ID token available. Request permission to generate one.');
		      // Show permission UI.
		      // updateUIForPushPermissionRequired();
		      // setTokenSentToServer(false);
		    }
		  })
		  .catch(
	  		function(err) {
			    console.log('MESSAGING.getToken() err','An error occurred while retrieving token. ', err);
			    // showToken('Error retrieving Instance ID token. ', err);
			    // setTokenSentToServer(false);
		  	}
  		  );
	}
	_['getToken'] = getToken;


	function startObservering () {
		MESSAGING.onMessage(function(payload) {
		  console.log("MESSAGING.onMessage Message received. - payload", payload);
		});
	}
	_['startObservering'] = startObservering;


	function addPushTokenToFirebase (iNtoken) {
		/*
			@discr
				add to firebase db push token
	      	@inputs
		        @required
			        1 - iNtoken : string
	        @return
	        	result form Firebse update

	      */
	      // create array for add to db
	      let objForAddToFirebase = {};
	      	objForAddToFirebase['name'] 	= PLATFOTM.name;
	      	objForAddToFirebase['os'] 		= PLATFOTM.os;
	      	objForAddToFirebase['product'] 	= PLATFOTM.product;
	      	objForAddToFirebase['time'] 	= FIREBASE.database.ServerValue.TIMESTAMP;
	      	objForAddToFirebase['status'] 	= 1;
	      	objForAddToFirebase['type'] 	= 1;
      	  // get this user id
      	  let myUid 		= FIREBASE.auth().currentUser.uid;
      	  // get token 
      	  let pushToken = iNtoken;
      	  // create Key for updates array
	      var keyForUpdateMsg = 'push/' + myUid + '/' + pushToken;
	      var updates = {};  updates[keyForUpdateMsg] = objForAddToFirebase;
	      // add to firebase
		  return FIREBASE.database().ref().update(updates);
	}
	_['addPushTokenToFirebase'] = addPushTokenToFirebase;

	return _;
});