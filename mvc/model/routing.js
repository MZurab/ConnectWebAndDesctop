define(['jquery','m_user'],function($,USER){
	//@<<< URL FUNCTIONS
		const _ = {};
		if( typeof window['ConnectUrlObject'] != 'object' )
			window['ConnectUrlObject'] = {
				'userDomain' 	: false,
				'user' 			: false,
				'app' 			: false,
				'page' 			: false,
				'data' 			: false
			}
		const chiefDomain = 'ramman.net/';
		const protocol = 'https://';


		function getUrlObjectByDomEl (iNobj) {
			var r = {};
			r['app']  = $(iNobj).attr('c-app');
			r['user'] = $(iNobj).attr('c-user');
			r['page'] = $(iNobj).attr('c-page');
			r['data'] = $(iNobj).attr('c-data');
			return r;
		} _['getUrlObjectByDomEl'] = getUrlObjectByDomEl;

		/*?<<< APP PATCH */
			if( typeof window['connectAppPath'] != 'object' ) window['connectAppPath'] = [];
			if( typeof window['connectAppPathNumber'] != 'number' ) window['connectAppPathNumber'] = -1;

			

		    function addAppToPath (iNdata) {
		    	window['connectAppPathNumber']++;
		    	window['connectAppPath'][window['connectAppPathNumber']] = iNdata;
		    } _['addAppToPath'] = addAppToPath;

		/*?<<< APP PATCH  */

		function prepareUrl (iNobj) {
			var r, userDomain  = getUserDomain();



			if( window['ConnectDeviseType'] == '@browser') {
				// ser url if browser
				var newUrl;
				if(userDomain != false && iNobj['user'] != userDomain) { 
					// we is in user account by subdomain
					// we want to pass to another user, open by full reloading
					newUrl = protocol + chiefDomain + '/' + iNobj['user'];
					if( typeof iNobj['app'] == 'string' ) 	newUrl += '/' + iNobj['app'];
					if( typeof iNobj['page'] == 'string') 	newUrl += '/' + iNobj['page'];
					if( typeof iNobj['data'] == 'string') 	newUrl += '/?' + iNobj['data'];
					goToUrl(newUrl);
					return false;
				}
				// we want to pass in this user field
				newUrl = '/' + iNobj['user'];
				if( typeof iNobj['app'] == 'string' ) 	newUrl += '/' + iNobj['app'];
				if( typeof iNobj['page'] == 'string') 	newUrl += '/' + iNobj['page'];
				if( typeof iNobj['data'] == 'string') 	newUrl += '/?' + iNobj['data'];
				urlSet(newUrl);				
			} else {
				setUser(iNobj['user']);
				setApp(iNobj['app']);
				setPage(iNobj['page']);
				setData(iNobj['data']);
				console.log('desktop prepareUrl');
			}
			return true;
		} _['prepareUrl'] = prepareUrl;

		function startUrl (iNengine,iNpathType) {
			console.log('startUrl iNengine',iNengine);
			var objectForEngine = {};
			objectForEngine['user'] = getUser();
			objectForEngine['app'] 	= getApp();
			objectForEngine['page'] = getPage();
			var dataForApp 			= getData();
			objectForEngine['data'] = dataForApp;

			if ( typeof iNpathType != 'string' ) {
				// if we dont back or top in app path
				addAppToPath(objectForEngine);
			}
            iNengine.openApp(objectForEngine,dataForApp);
		} _['startUrl'] = startUrl;

		function goToUrl (iNurl) {
			/*
				@inputs
				@example
					goToUrl('/zurab')
			*/
			 if(navigator.userAgent.match(/Android/i)) 
			    document.location=iNurl;      
			  else
			    window.top.location.replace(iNurl);
		} _['goToUrl'] = goToUrl;
		function urlSet (iNurl) {
			/*
				@inputs
				@example
					urlSet('/zurab')
			*/
		    try {
		      history.pushState(null, null, iNurl);
		      return;
		    } catch(e) {}
		    location.hash = '#' + iNurl;
		} _['setUrl'] = urlSet;

		function getUserDomain () {
			var r = false;
			if( window['ConnectDeviseType'] == '@browser') {
				var firstD = urlGetDomain(1);
				if(firstD != false && firstD != 'ramman' && firstD != 'www')
					r = firstD;
			} else if ( typeof window['ConnectUrlObject']['userDomain'] != 'undefined')
				r = window['ConnectUrlObject']['userDomain'];

			return r;
		} _['getUserDomain'] = getUserDomain;

			function urlGetDomain (iNnumber) {
				/*
					@inputs
					@example
						urlGetDomain(1)
				*/
				var loc 	= location.host;

				if(typeof(iNnumber) != 'number') return loc;
				var locArr 	= loc.split('.'); iNnumber--;
				if(typeof(locArr[iNnumber]) != 'undefined')
					return locArr[iNnumber];
				else 
					return null;
			}  _['getDomain'] = urlGetDomain;
		function getUser () {
			var r = false;
			if( window['ConnectDeviseType'] == '@browser') {
				var r = getUserDomain(), numberPath=1;
				if(firstD == false) 
					r = urlGetPath(r);
				else
					r = firstD;
			} else if (typeof(window['ConnectUrlObject']['user']) == 'string')
				r = window['ConnectUrlObject']['user'];

			return r;
		} _['getUser'] = getUser;
			function setUser (iNuser) {
				window['ConnectUrlObject']['user'] = iNuser;
			}  _['setUser'] = setUser;
		function getApp () {
			var r = false;
			if( window['ConnectDeviseType'] == '@browser') {
				var firstD = getUserDomain(), numberPath=2;
				if(firstD != false) numberPath--;
				r = urlGetPath(r);
			} else if (typeof(window['ConnectUrlObject']['app']) != 'undefined')
				r = window['ConnectUrlObject']['app'];
			return r;
		}  _['getApp'] = getApp;

			function setApp (iNapp) {
				window['ConnectUrlObject']['app'] = iNapp;
			}   _['setApp'] = setApp;

		function getPage () {
			var r = false;
			if( window['ConnectDeviseType'] == '@browser') {
				var firstD = getUserDomain(), r=3;
				if(firstD != false) r--;
				r = urlGetPath(r);
			} else if (typeof window['ConnectUrlObject']['page'] != 'undefined')
				r = window['ConnectUrlObject']['page'];
			return r;
		}   _['getPage'] = getPage;

			function setPage (iNpage) {
				window['ConnectUrlObject']['page'] = iNpage;
			}   _['setPage'] = setPage;

		function getData () {
			var r = false;
			if( window['ConnectDeviseType'] == '@browser') {
				var url = location.href.split('?');
				r = url[1];
			} else if (typeof(window['ConnectUrlObject']['data']) != 'undefined')
				r = window['ConnectUrlObject']['data'];
			return r;
		}  _['getData'] = getData;
			function setData (iNdata) {
				window['ConnectUrlObject']['data'] = iNdata;
			}  _['setData'] = setData;

			function urlGetPath (iNnumber) {
				/*
					@inputs
					@example
						urlGetPath(1)
				*/
				var loc 	= location.pathname;
				if(typeof(iNnumber) != 'number') return loc; iNnumber--;
				var locArr 	= loc.split('/').splice(1);
				if(iNnumber <= 0) return locArr[0];
				if(typeof(locArr[iNnumber]) != 'undefined')
					if(typeof(locArr[iNnumber]) == 'string' && locArr[iNnumber].length > 0)
						return locArr[iNnumber];
				return false;
			}  _['getUrlPath'] = urlGetPath;

		function urlGetLength () {
			/*
				@inputs
				@example
					urlGetLength(1)
			*/
			var loc 	= location.pathname;
			var locArr 	= loc.split('/').splice(1),
				count   = 0;
			for(var iKey in locArr) {
				if(locArr[iKey].length > 0 )count ++
			}
			return count;
		}  _['getUrlLength'] = urlGetLength;

		function getObjectFromString (iNstr) {
			/*
				@disc
					get json object from string with url get type
				@inputs
					iNstr -> string
				@example
					getObjectFromString('key=value&key2=value2')
						@return -> { key : 'value', key2 : value2 }
			*/
		  var result = {};
		  let res = iNstr.split('&');
		  if(res.length > 0 ) {
		    for(var i in res){
		      var keyAndValue = res[i];
		      var arrayWithKeyAndValue = keyAndValue.split('=');
		      var key = arrayWithKeyAndValue[0];
		      var val = decodeURI(arrayWithKeyAndValue[1]);
		      result[key]=val;
		    }
		  }
		  return result;
		}  _['getObjectFromString'] = getObjectFromString;

		return _;
	//@>>> URL FUNCTIONS
});