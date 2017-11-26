define([ 'jquery', 'm_user', 'platform' ],function( $, USER, PLATFORM){
	//@<<< URL FUNCTIONS
		const _ = {};
		const USER_DOMAIN = [ // CHANGE
			'sharepay',
			'onepay',
			'market',
			'eskrow'
		];
		if( typeof window['ConnectUrlObject'] != 'object' )
			window['ConnectUrlObject'] = {
				'userDomain' 	: false,
				'user' 			: false,
				'app' 			: false,
				'page' 			: false,
				'data' 			: false
			}
		const chiefDomain = 'ramman.net';
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


		function yandexMetrika_fixOpenPage (iNurl) {
			console.log('yandexMetrika_fixOpenPage start',iNurl);
			const ycounter = window.yaCounter46784811;
			if(  ycounter ) {
				const extraParamsForWriteEvent = {};
				if( !isBrowser()) {
					extraParamsForWriteEvent['device'] 		= 'desktop';
					extraParamsForWriteEvent['deviceName'] 	= getDeviseName;
				} else {
					extraParamsForWriteEvent['device'] 		= 'browser';
				}
				// get start domain (host)
				if( getUserDomain() ) {
					var host = 'https://'+getUserDomain()+'.ramman.net';
				} else {
					var host = 'https://ramman.net';
				}
				var thisUrl = host + iNurl;
				console.log('yandexMetrika_fixOpenPage - thisUrl',thisUrl);
				ycounter.hit(thisUrl, {params: extraParamsForWriteEvent});//'Контакты', referer: 'http://example.com/#main'
			}
		} _['yandexMetrika_fixOpenPage'] = yandexMetrika_fixOpenPage;

		function googleAnalytics_fixOpenPage (iNurl) {
			console.log('googleAnalytics_fixOpenPage start',iNurl);
			const gcounter = window.ga;
			if(  gcounter ) {
				// const extraParamsForWriteEvent = {};
				// if( !isBrowser()) {
				// 	extraParamsForWriteEvent['device'] 		= 'desktop';
				// 	extraParamsForWriteEvent['deviceName'] 	= getDeviseName;
				// } else {
				// 	extraParamsForWriteEvent['device'] 		= 'browser';
				// }
				// get start domain (host)
				if( getUserDomain() ) {
					var host = 'https://'+getUserDomain()+'.ramman.net';
				} else {
					var host = 'https://ramman.net';
				}
				var thisUrl = host + iNurl;
				console.log('googleAnalytics_fixOpenPage - thisUrl',thisUrl);
				gcounter('set', 'page', thisUrl);//'/new-page.html'
			}
		} _['googleAnalytics_fixOpenPage'] = googleAnalytics_fixOpenPage;

		function writeForAnalytics (iNurl) {
			yandexMetrika_fixOpenPage (iNurl);
			googleAnalytics_fixOpenPage (iNurl);
		} _['writeForAnalytics'] = writeForAnalytics;

		function prepareUrl (iNobj) {
			var r, userDomain  = getUserDomain();
			if(typeof iNobj != 'object') iNobj= {}; 
			
			setUser(iNobj['user']);
			setApp(iNobj['app']);
			setPage(iNobj['page']);
			setData(iNobj['data']);

			if( isBrowser()) {
				// ser url if browser
				var newUrl = '';
				iNobj['user'] = iNobj['user']||getUser();

				if(userDomain != false && iNobj['user'] && iNobj['user'] != userDomain) { 
					// we is in user account by subdomain
					// we want to pass to another user, open by full reloading
					newUrl = protocol + chiefDomain;
					newUrl += getUrl(iNobj);
					goToUrl(newUrl);
					return false;
				}
				// we want to pass in this user field
				newUrl = getUrl(iNobj);
				// set this url
				urlSet(newUrl);
				// write for analytics google && yandex
				writeForAnalytics(newUrl);				
			} else {
			}
			return true;
		} _['prepareUrl'] = prepareUrl;

			function getUrl (iNobject) {
				if ( typeof iNobject != 'object') iNobject ={};
				var user 	= iNobject['user']||getUser(),
					app 	= iNobject['app']||getApp(),
					page 	= iNobject['page']||getPage(),
					data 	= iNobject['data']||getData(),
					newUrl  = '';

				if ( typeof user == 'string' && !getUserDomain() || iNobject['user'] &&  getUserDomain() != iNobject['user'] ) {
					//   && !getUserDomain() || getUserDomain() != user
					newUrl += '/' + user;
				}
				if( typeof app == 'string') {
					newUrl += '/' + app;
				}
				if( typeof page == 'string' ) {
					newUrl += '/' + page;
				}
				if( typeof data == 'string') {
					newUrl += '/?' + data;
				}
				return newUrl;
			}

		function startUrl (iNengine,iNpathType) {
			var objectForEngine = {};
			objectForEngine['user'] = getUser();
			objectForEngine['app'] 	= getApp();
			objectForEngine['page'] = getPage();
			var dataForApp 			= getObjectFromString(getData());
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
			var urlDomain = getUserDomain();
			if(urlDomain) {
				iNurl = protocol + urlDomain + '.' + chiefDomain  + iNurl;
			} else {
				iNurl = protocol + chiefDomain  + iNurl;
			}			

		    try {
		      history.pushState(null, null, iNurl);
		      return;
		    } catch(e) {
		    	console.warn('urlSet e',e , iNurl);
		    }
		    // location.hash = '#' + iNurl;
		} _['setUrl'] = urlSet;

		function getUserDomain () {
			var r = false;
			if( isBrowser() ) {
				var firstD = urlGetDomain(1);
				if(firstD != false && firstD != 'ramman' && firstD != 'www')
					r = firstD;
			} else if ( typeof window['ConnectUrlObject']['userDomain'] != 'undefined')
				r = window['ConnectUrlObject']['userDomain'];
			return r;
		} _['getUserDomain'] = getUserDomain;

			function setUserDomain (iNuserDomain) {
				window['ConnectUrlObject']['userDomain'] = iNuserDomain;
			}  _['setUserDomain'] = setUserDomain;

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
			if ( isBrowser() ) {
				var firstD = getUserDomain();
				var length = getUrlLength();
				if(firstD) 
					r = firstD;
				else if (length >= 1)
					r = urlGetPath(1);
			} else if (typeof(window['ConnectUrlObject']['user']) == 'string')
				r = window['ConnectUrlObject']['user'];
			if( typeof r == 'string' && r.length < 2 )	r = false;
			return r||USER.getMyLogin();
		} _['getUser'] = getUser;

			function setUser (iNuser) {
				if( typeof iNuser == 'string' )
					window['ConnectUrlObject']['user'] = iNuser;
				else
					window['ConnectUrlObject']['user'] = false;
			}  _['setUser'] = setUser;

		function getApp () {
			var r = 'base'; // default value
			if( window['ConnectDeviseType'] == '@browser') {
				var firstD = getUserDomain();
				var length = getUrlLength();
				if(firstD) {
					// if isset user domain by 
					if(length > 0)
						r =  urlGetPath(1);
				} else if(length >= 2) {
					r =  urlGetPath(2);
				}
			} else if (typeof(window['ConnectUrlObject']['app']) != 'undefined')
			r = window['ConnectUrlObject']['app']||r;
			return r;
		}  _['getApp'] = getApp;

			function setApp (iNapp) {
				if( typeof iNapp == 'string' )
					window['ConnectUrlObject']['app'] = iNapp;
				else
					window['ConnectUrlObject']['app'] = false;
			}   _['setApp'] = setApp;

		function getPage () {
			var r = 'index'; // default value
			if( window['ConnectDeviseType'] == '@browser') {
				var firstD = getUserDomain();
				var length = getUrlLength();
				if(firstD) {
					if( length >= 2) 
						r =  urlGetPath(2);
				} else if(length >= 3) {
					r = urlGetPath(3);
				}
			} else if (typeof window['ConnectUrlObject']['page'] != 'undefined')
				r = window['ConnectUrlObject']['page']||r ;
			return r;
		}   _['getPage'] = getPage;

			function setPage (iNpage) {
				if( typeof iNpage == 'string' )
					window['ConnectUrlObject']['page'] = iNpage;
				else
					window['ConnectUrlObject']['page'] = false;
			}   _['setPage'] = setPage;

		function getData () {
			var r = false, data = false;
			if( window['ConnectDeviseType'] == '@browser') {
				data = location.search; //location.href.split('?');
				if ( typeof data == 'string' ) {
					data = data.split('?');
					data = data[data.length-1]; // last elem
				}
			}
			r = window['ConnectUrlObject']['data']||data;
			return r;
		}  _['getData'] = getData;

			function setData (iNdata) {
				if( typeof iNdata == 'string' && iNdata.length > 2 )
					window['ConnectUrlObject']['data'] = iNdata;
				else 
					window['ConnectUrlObject']['data'] = false;
				
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

		function getUrlLength () {
			/*
				@inputs
				@example
					getUrlLength(1)
			*/
			var loc 	= location.pathname,
			 	locArr 	= loc.split('/').splice(1),
				count   = 0;
			// if ( location.search.length < 1) count--;  
			for(var iKey in locArr) {
				if(locArr[iKey].length > 0 )count ++
			}
			return count;
		}  _['getUrlLength'] = getUrlLength;

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
		  if ( typeof iNstr != 'string' ) iNstr ='';
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

		function isBrowser () {
			if ( window['ConnectDeviseType'] == '@browser' ) {
				return true;
			}
			return false;
		}  _['isBrowser'] = isBrowser;

			function setBrowser () {
				window['ConnectDeviseType'] = '@browser';
			} _['setBrowser'] = setBrowser;

			function setDeviseName (iNname) {
				window['ConnectDeviseName'] = iNname;
			} _['setDeviseName'] = setDeviseName;

			function getDeviseName () {
				if ( typeof window['ConnectDeviseName'] != 'string' || window['ConnectDeviseName'].length < 1 ) {
					return PLATFORM.name + ' ' + PLATFORM.os.toString();
				}
				return window['ConnectDeviseName'] + ' ' + PLATFORM.os.toString();
			} _['getDeviseName'] = getDeviseName;

			function getUserAgent () {
				return navigator.userAgent||'';
			} _['getUserAgent'] = getUserAgent;

		function isDesktop () {
			if ( window['ConnectDeviseType'] == '@desktop' ) {
				return true;
			}
			return false;
		}  _['isDesktop'] = isDesktop;

			function setDesktop () {
				window['ConnectDeviseType'] = '@desktop';
			} _['setDesktop'] = setDesktop;


		return _;
	//@>>> URL FUNCTIONS
});