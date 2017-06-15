define([], function () {
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
	return {

		clearStorage 	: Connect_clear,
		delStorage  	: Connect_del,
		getStorage 		: Connect_get,
		saveStorage 	: Connect_save,

		getTime 		: Connect_getTime,
		getTimeSec 		: Connect_getSec,

		addScript 		: Connect_addScript,

		'foreach'		: Connect_forEach

		getJsonKeys 	: Connect_getJsonKeys,
		getJsonKey 		: Connect_getJsonKey
		
		playSendMsgSound: Connect_playSendMsgSound,
		addSource 		: addSource,

	}
});
/*
	@schema
		time
		localStorage 
*/