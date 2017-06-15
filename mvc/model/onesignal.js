define(['OneSignal'],function() {
		var OneSignal = window.OneSignal || [];
		OneSignal.push(["init", {
		  appId: "336c52be-43cd-46fa-b189-56317f877d93",
		  autoRegister: true,
		  notifyButton: {
		    enable: false, /* Set to false to hide */
		    modalPrompt:true,
		  },
		  safari_web_id: 'web.onesignal.auto.477dedc8-8bcf-40fd-b64c-238033111672'
		}]);

		function Connect_pushGetUserId (iNsuccessFunc, iNerrorFunc) {
		    try{
		        OneSignal.push(function() {
		          OneSignal.isPushNotificationsEnabled(function(isEnabled) {
		            if (isEnabled){
		                  OneSignal.getUserId().then(function(userId) {
		                    if( typeof(iNsuccessFunc) == 'function')iNsuccessFunc(userId);
		                  });
		            }
		            else
		              if( typeof(iNerrorFunc) == 'function')iNerrorFunc();
		          });
		        });
		    }catch(e){

		    }
		}
		function Connect_pushRegister() {
		    OneSignal.push(function() {
		      OneSignal.registerForPushNotifications();
		    });
		}

		return {
			getLocale 		: Connect_getLocale,
			autoChange		: Connect_dictionaryAutoChange,
			changeLang 		: Connect_changeLang,
			start 			: Connect_startDictionary,
			get 			: Connect_getFromDictionary
		}
	//@>>> URL FUNCTIONS
});
/*
	@schema
		url
*/