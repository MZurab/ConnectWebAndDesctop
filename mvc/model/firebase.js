define(['firebase'],function() {
		var config = {
		    apiKey: "AIzaSyB48o8PHd85LMeQYMkYd4hR8Gu1-d8gJYs",
		    authDomain: "connect-9109d.firebaseapp.com",
		    databaseURL: "https://connect-9109d.firebaseio.com",
		    storageBucket: "connect-9109d.appspot.com",
		    messagingSenderId: "737839044422"
		};

		firebase.initializeApp(config);
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