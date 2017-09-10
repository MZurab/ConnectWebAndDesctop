define(['jquery','m_routing','v_view','m_app','m_app-chat','m_app-base','APP_PAGE'], function ($,ROUTING,V_VIEW,M_APP,APP_CHAT,APP_BASE,APP_PAGE) {

	function _startUrl () {
		ROUTING.startUrl(this);
	}

	function setInitEvents () {
		$('.connect_href').on( "click", "body", function() {
			if ( $(this).hasClass('appHref') == true ) {
				var app 	= $(this).attr('app-name'),
					page 	= $(this).attr('page-name'),
					data 	= $(this).attr('data');
				prepareUrl({'app':app,'page':page,'data':data});
	            startUrl();
			} 
		});
	}

	function init () {
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
		function _passToApp (iNdata) {
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
			ROUTING.prepareUrl(iNdata);
        	ROUTING.startUrl(this);
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