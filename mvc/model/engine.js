define(['jquery','v_view','m_app','m_app-chat','m_app-base','m_app-page'], function ($,V_VIEW,M_APP,APP_CHAT,APP_BASE,APP_PAGE) {








	//@<<< TIME FUNCTIONS
		function Connect_getSec () {
		    return new Date().getTime()/1000;
		}
		function Connect_getTime () {
		    return new Date().getTime();
		}
	//@>>> TIME FUNCTIONS

	//@<<< LOCAL STORAGE
		function Connect_save ( name, value ) {
		    return localStorage.setItem( name , value );
		}
		function Connect_get (name){
		    return localStorage.getItem(name);
		}
		function Connect_del (name){
		    localStorage.removeItem(name);
		}
		function Connect_clear (){
		    localStorage.clear();
		}
	//@>>> LOCAL STORAGE

	//@@@<<< IMPORTS
		function Connect_addScript (iNhref,iNfuntion) {
			$.getScript(iNhref, iNfuntion );//( data, textStatus, jqxhr )
		}
	//@@@>>> IMPORTS

	function Connect_forEach(data, callback){
	  for(var key in data){
	    if(data.hasOwnProperty(key)){
	      callback(key, data[key]);
	    }
	  }
	}

	/*?<<< json object  */
		function Connect_getJsonKey (ObjectThis){
		    return Object.keys(ObjectThis)[0];
		}
		function Connect_getJsonKeys (ObjectThis){
		    return Object.keys(ObjectThis);
		}
	/*!>>> json object  */

	/*?<<< SOUND */
		function addSource(elem, path) {
		  $('<source>').attr('src', path).appendTo(elem);
		}
		    function Connect_playSendMsgSound(){
		        var audio = $('<audio />', {
		           autoPlay : 'autoplay'
		         });
		         addSource(audio, "https://cdn.ramman.net/audio/effects/sendMessage.mp3");
		         // addSource(audio, 'audio/'+Math.ceil(Math.random() * 5)+'.ogg');
		         audio.appendTo('body');
		    }
	/*?<<< SOUND  */


	/*?<<< APP */
		function _openApp ( iNdata, iNstring,iNfunction) {
			/*
				@disc
					open app
						check funcitons optional
						check apps
						check pages
						
				@input
					@input
						@required
							iNdata
								@required
									app
									page
								@optional
									extra
									content
									other
						@optional
							iNtype

				@deps
					function : M_APP
			*/
			// M_APP.openChiefApp (iNdata,iNapp,iNfunction); 
			// get module name by app name
			console.log('_openApp from engine started');
			var app, page, objForOpenApp = iNdata, appName = objForOpenApp['app'], pageName = objForOpenApp['page'];
			console.log('appName',appName);
			app = getAppByName(appName);
			console.log('app',app);
			M_APP.openChiefApp (iNdata,app,iNstring,iNfunction);
		}

		function _closeApp (iName,iNpage) {
			/*
				@disc
				@deps
					function : getAppByName
			*/

			//get module name by app name
			var app = getAppByName(iName);
			app.onDisappear();
			app.onClose();
		}
		function getAppByName(iName){
			/*
				@disc
				@ipputs
					iName -> string
				@return
					+: object
					-: false -> bool 
			*/
			switch (iName) {
				case "chat":
					return APP_CHAT;
				break;

				case "onepay":
					return APP_ONEPAY;
				break;

				case "market":
					return APP_MARKET;
				break;

				case "page":
					return APP_PAGE;
				break;

				case "base":
					return APP_BASE;
				break;

				default:
					return false;
				break;

			}
		}

		function getAppBySafe () {

		}
			function getGlobalAppRef () {

			}
	/*?>>> APP */

	return {
		// apps

		// local storage
		clearStorage 	: Connect_clear,
		delStorage  	: Connect_del,
		getStorage 		: Connect_get,
		saveStorage 	: Connect_save,

		// time functions
		getTime 		: Connect_getTime,
		getTimeSec 		: Connect_getSec,

		// add script to dom
		addScript 		: Connect_addScript,
		
		// Cycles
		foreach			: Connect_forEach,

		//json
		getJsonKeys 	: Connect_getJsonKeys,
		getJsonKey 		: Connect_getJsonKey,
		
		//audio
		playSendMsgSound: Connect_playSendMsgSound,
		addSource 		: addSource,

		//aps
		openApp  		: _openApp,
		closeApp  		: _closeApp,


	}
});
/*
	@schema
		time
		localStorage 
*/