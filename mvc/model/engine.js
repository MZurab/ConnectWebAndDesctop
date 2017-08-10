define(['jquery','m_routing','v_view','m_app','m_app-chat','m_app-base','APP_PAGE'], function ($,ROUTING,V_VIEW,M_APP,APP_CHAT,APP_BASE,APP_PAGE) {

	function _startUrl () {
		ROUTING.startUrl(this);
	} 

	


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
			console.log('_openApp from engine started iNdata',iNdata);
			console.log('_openApp from engine started iNstring',iNstring)
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
						console.log('APP_PAGE_INSTANCE before',typeof APP_PAGE_INSTANCE);
						APP_PAGE_INSTANCE = APP_PAGE.init();
						console.log('APP_PAGE_INSTANCE after',typeof APP_PAGE_INSTANCE );
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
		// routing
		startUrl		: _startUrl,
		prepareUrl 		: ROUTING.prepareUrl
	}
});
/*
	@schema
		time
		localStorage 
*/