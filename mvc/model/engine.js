define(['jquery','m_routing','v_view','m_app','m_app-chat','m_app-base','APP_PAGE','m_user'], function ($,ROUTING,V_VIEW,M_APP,APP_CHAT,APP_BASE,APP_PAGE, USER) {

	function _startUrl () {
		ROUTING.startUrl(this);
	}
	var THIS = this;
	var setInitEvents = () => {
		$('body').on( "click", ".connect_href", function () {
					console.log(".connect_href .appHref click 1 ");
			if ( $(this).hasClass('appHref') == true ) {
				var app 	= $(this).attr('app-name'),
					page 	= $(this).attr('page-name'),
					data 	= $(this).attr('data');
					console.log(".connect_href .appHref click 2 ");
		        	M_APP.getGlobalVar('engine').passToApp({'app': app ,'page': page ,'data': data });
			} 
		});

		$('body').on( "click", ".connect_system_href", function (event)  {
			var thisDom = event.currentTarget;
			var code_href = $(thisDom).attr('code_href');
			switch (code_href) {
				case "signOut":
					systemHrefSignOut();
				break;

				case "signIn":
					systemHrefSignIn();
				break;

				case "toHome":
					systemHrefToHome();
				break;
			}
		});
	}
		function systemHrefSignIn () {
			let user = USER.getMyLogin();
			
          	M_APP.getGlobalVar('engine').passToApp ( 
				{ 
					'app'	: 'page', 
					'page'	: 'fullWindow', 
					'user'	: user, 
					'data'	: 'id=sign&uid=@system' 
				} 
			);
		}

		function systemHrefSignOut () {
			// sign out if we in main domain
			// if ( !ROUTING.getUserDomain () ) {
				USER.signOut(
					() => {
						M_APP.getGlobalVar('engine').passToApp ( 
							{ 
								'app'	: 'page', 
								'page'	: 'fullWindow', 
								'user'	: 'anonym', 
								'data'	: 'id=sign&uid=@system' 
							} 
						);
					}
				);
			// }
		}

		function systemHrefToHome () {
			var user = USER.getMyLogin(), obj;
			if ( !ROUTING.getUserDomain () ) {
				// if main domain
				obj = {'app':'base', 'page':'index', 'user': user, 'data': '' } ;
			} else {
				// if subdomain
				obj = {'app':'base', 'page':'index', 'data': '' } ;

			}

			M_APP.getGlobalVar('engine').passToApp(obj);
		}

	var init = () => {
		setInitEvents();
	}

	/*?<<< APP PATCH */
		function _toBackApp () {
			if( window['connectAppPath'].length > 1 && window['connectAppPathNumber'] > 0) {
				window['connectAppPathNumber']--;
				var thisObject = window['connectAppPath'][window['connectAppPathNumber']];

				ROUTING.prepareUrl(thisObject);
				ROUTING.startUrl(this,'toBackApp');

	    		return true;
	    	}
	    	return false;
		} 

	    function _toUpApp () {
	    	if( window['connectAppPath'].length > (window['connectAppPathNumber'] + 1) && window['connectAppPathNumber'] > -1) {
				window['connectAppPathNumber']++;
				var thisObject = window['connectAppPath'][window['connectAppPathNumber']];

				ROUTING.prepareUrl(thisObject);
				ROUTING.startUrl(this,'toUpApp');

	    		return true;
	    	}
	    	return false;
	    } 
	/*?>>> APP PATCH */


	/*?<<< APP */
		function _passToApp (iNdata, iNthis) {
			/*
				@inputs
				@required
					iNdata -> object
						@required
							app
							page
						@optional
							data
							user
			*/
			// if we are in subdomain and subdomain == user we delete it
			if ( 
				ROUTING.isBrowser() && (
					( typeof iNdata['user'] != 'undefined' && ROUTING.getUserDomain () == iNdata['user']) || 
					( typeof iNdata['user'] == 'string' && iNdata['user'] == 'anonym'  && ROUTING.getUserDomain ()) 
				)
			) {
				console.log('_passToApp isBrowser del user');
	        	// delete user
	        	delete iNdata['user'];
			}

			console.log('_passToApp iNdata',iNdata);
			let thisObject = this;
			if (typeof iNthis != 'undefined') thisObject = iNthis;
			ROUTING.prepareUrl(iNdata);
        	ROUTING.startUrl(thisObject);
		}
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
			var app, page, objForOpenApp = iNdata, appName = objForOpenApp['app'], pageName = objForOpenApp['page'];
			app = getAppByName(appName);
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

		var APP_PAGE_INSTANCE;
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
					if(typeof APP_PAGE_INSTANCE != 'object') {
						APP_PAGE_INSTANCE = APP_PAGE.init();
					}
					return APP_PAGE_INSTANCE;
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
		//aps
		openApp  		: _openApp,
		closeApp  		: _closeApp,
		passToApp  		: _passToApp,
		// routing
		startUrl		: _startUrl,
		prepareUrl 		: ROUTING.prepareUrl,

		toUpApp 		: _toUpApp,
		toBackApp 		: _toBackApp,
		init 			: init,



	}
});
/*
	@schema
		time
		localStorage 
*/