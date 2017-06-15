define([], function () {
	//@@@<<< USER
		function Connect_getUserCountry () {
			return Connect_get('ConnectUserCountry');
		}
		function Connect_saveUserCountry (iNcountry) {
			return Connect_save('ConnectUserCountry',iNcountry);
		}
		function Connect_getUserLang () {
			return Connect_get('ConnectUserLang');
		}
		function Connect_saveUserLang (iNlang) {
			return Connect_save('ConnectUserLang',iNlang);
		}
	//@@@>>> USER

	return {
		getCountry 		: Connect_getUserCountry,
		setCountry		: Connect_saveUserCountry,
		getLang 		: Connect_getUserLang,
		setLang 		: Connect_saveUserLang,
	}
});