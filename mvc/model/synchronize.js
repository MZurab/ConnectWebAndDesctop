define(['jquery','m_user'],function( $, USER ) {
	//'m_moment','m_user','m_app' ++ MOMENT,USER,M_APP
	const _ = {}; // 'view':VIEW
	// const MESSAGING = FIREBASE.messaging();
	const CONST 	= {};
	const DOMAIN 	= "https://ramman.net";




	var lastCopyLocalStorage = '';
	function listener (event) {
		if (event.origin != DOMAIN) {
		  return;
		}
		var inputObj = event.data;
		if(typeof inputObj != 'object') return false;
		// restart interval
		startInterval(event);

		if ( inputObj['command'] == 'getLocalStorage' ) {
		  //
		  let lStorage = getLocalStorage();
		  // save last copy
		  setLastSentLocalStorage(lStorage);
		  // send message to DOMAIN
		  event.source.postMessage( {'command':'saveLocalStorage','content':lStorage} , event.origin);
		  // start interval spy for changing funciton


		} else if  (inputObj['command'] == 'saveLocalStorage' && inputObj['content']) {
		  // save change in local storage
		  if ( USER.getMyId() != USER.getMyIdFromObj(inputObj['content']) ) {
		  	writeLocalStorage(inputObj['content']);
		  	setLastSentLocalStorage(inputObj['content']);
		  	location.reload();
		  } else {
		  	writeLocalStorage(inputObj['content']);
		  	setLastSentLocalStorage(inputObj['content']);
		  }
		}
	}

	function attachForEventOnMessage (iNlistener) {
		if ( window.addEventListener ) 
			window.addEventListener("message", iNlistener);
		else // IE8
			window.attachEvent("onmessage", iNlistener);
		
	}

	function attachMessageOnEvent () {
		attachForEventOnMessage(listener);
	}



	function getLastSentLocalStorage () {
		return lastCopyLocalStorage||'';
	}
	function setLastSentLocalStorage (iNstring) {
		return lastCopyLocalStorage = iNstring;
	}
	function getLocalStorage() {
		var a = {};
		for (var i = 0; i < localStorage.length; i++) {
		  var k = localStorage.key(i);
		  var v = localStorage.getItem(k);
		  a[k] = v;
		}
		var s = JSON.stringify(a);
		return s;
	}

	function writeLocalStorage(data) {
		if(typeof data == 'string')
			var o = JSON.parse(data);
		else
			var o = data;

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
	function getLocalStorageFromFrame () {
		var objForSendToFrame = { 'command' : 'getLocalStorage'};
		sendMessageToFrame( objForSendToFrame );
	}

	function run () {
		// attach events
		attachMessageOnEvent ();
		// get local storage
		getLocalStorageFromFrame ();
		// start interval
		startInterval();
	}
	_['run'] = run;

	function startInterval () {
		// attach listener to on message
		clearInterval(CONST['intervalId']);
	    CONST['intervalId'] = setInterval (
	      () => {
	        // spy for changing local storage -> for send to subDomain
	        let lStorage    = getLastSentLocalStorage();
	        let realStorage = getLocalStorage();
	        if(lStorage != realStorage) {
	          //send
	          setLastSentLocalStorage(realStorage);
	          sendMessageToFrame({'command':'saveLocalStorage','content':realStorage});
	        }
	      }
	    ,
	    250
	    );
	}

	return _;
});