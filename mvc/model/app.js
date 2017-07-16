define(['v_app','jquery','v_view'],function(v_app,$,v_view) {
	function _setApp (iNapp) {
		/*
			@discr
				save open app in global window
			@input
				@required
					iNapp -> string
		*/
		window.thisRammanApp = iNapp;
	}
	function _setPage (iNapp,iNpage) {
		/*
			@discr
				save open app and page in global window
			@input
				@required
					iNapp -> string
					iNpage -> string
		*/
		_setApp(iNapp);
		window.thisRammanPage = iNpage;
	}
	function _thisPage () {
		/*
			@discr
				get open page or false
			@input
				@required
					iNapp -> string
					iNpage -> string
		*/
		var thisPage = window.thisRammanPage||false;
		return thisPage;
	}
	function _thisApp () {
		/*
			@discr
				get open app or false
			@input
				@required
					iNapp -> string
					iNpage -> string
		*/
		var thisApp = window.thisRammanApp||false;
		return thisApp;
	}
	//<? transactors
		function _td_hidePages (iNapp,iNarray,iNtypeApp) {
			v_view.d_hidePages (iNapp,iNarray,iNtypeApp)
		}
		function _td_showPages (iNapp,iNarray,iNtypeApp) {
			v_view.d_showPages (iNapp,iNarray,iNtypeApp)
		}
		function _td_showApps (iNarray,iNtypeApp) {
			v_view.d_showApps (iNarray,iNtypeApp)
		}
		function _td_hideApps (iNarray,iNtypeApp) {
			v_view.d_hideApps (iNarray,iNtypeApp)
		}
		function _td_openPage (iNapp,iNpage,iNtype) {
			v_app.d_openPage (iNapp,iNpage,iNtype);
		}
		
	//>! transactors

	function _readyChiefApp (iNdata,iNapp,iNfunction) {
		/*
			@discr
			@input
				@required
					iNdata -> object
						app
						@optional
							other
							page
							content

							extra
				@optional
					iNapp 		-> app object
					iNfunction  -> function
			@deps
			@return
			@algorithm
				#1 check for isset app
				#2 [- create app] [with page] -> [did function] -> end
				#2 if (isset app) $page 
					#3 check for isset page	in view
					#4 [- create page] [with $content if isset] -> [did function] -> end
				#2 [did function] -> end
		*/
		var dataForCheckApp, issetApps, objectForCreateAppOrPage,intIssetPages,objectForCreatePage;
		// create obj for check for isset app
		dataForCheckApp = {'app':iNdata['app']};
		if(typeof(iNdata['extra']) == 'string') dataForCheckApp['extra'] = iNdata['extra'];
		// get count this apps
		issetApps = v_app.d_checkChiefApp(dataForCheckApp);
		// create app if is not isset
		objectForCreateAppOrPage = dataForCheckApp;
		// prepare obj
			if(typeof(iNdata['attr']) 		== 'string') 	objectForCreateAppOrPage['attr'] 		= iNdata['attr'];
			if(typeof(iNdata['other']) 		== 'string') 	objectForCreateAppOrPage['other'] 	= iNdata['other'];
			if(typeof(iNdata['content']) 	== 'string') 	objectForCreateAppOrPage['content'] 	= iNdata['content'];
			if(typeof(iNdata['page']) 		== 'string') 	objectForCreateAppOrPage['page'] 		= iNdata['page'];
		if (issetApps < 1) {
			// create app and invoke app init method
			v_app._d_createChiefApp(objectForCreateAppOrPage);
			iNapp.onInit();
		}

		// if we open this app from another 
		if ( iNdata['app'] != _thisApp() )
			// did safe invoke app.onIn in
			if ( typeof(iNapp.onIn) == 'function' )iNapp.onIn(); 
		
		// did app appear
		iNapp.onAppear(); 
		setApp(iNdata['app']);
		
		// did show this app + show if need and invoke onEnter if need ADD
		v_app._d_viewApp(objectForCreateAppOrPage);

		if( typeof(iNdata['page'] ) == 'string' ) {
			intIssetPages = v_app.d_checkPageInChiefApp(objectForCreateAppOrPage);
			if(intIssetPages < 1) {
				// page is not isset - create page
				// create page and invoke page init method
				v_app.d_createPageInChiefApp(objectForCreatePage);
				if(typeof(iNapp.pages[objectForCreateApp['page']].onInit) == 'function') iNapp.pages[objectForCreateApp['page']].onInit();
			} else {
				// page isset - change content page because if already isset
				// safe invoke page init method
				v_app.d_updatePageInChiefApp(objectForCreatePage)
				if(typeof(iNapp.pages[objectForCreateApp['page']].onUpdate) == 'function') iNapp.pages[objectForCreateApp['page']].onUpdate();
			}
		}

		// safe did appear function for page
		if(typeof(iNapp.pages[objectForCreateApp['page']].onAppear) == 'function') iNapp.pages[objectForCreateApp['page']].onAppear();
		// did show this app + show if need and invoke onEnter if need ADD
		v_app._d_viewPage(objectForCreateAppOrPage);

		// safe invoke passed function
		if (typeof(iNfunction) == 'function')iNfunction();
	}

	function _readyListApp (iNdata,iNfunction) {
		/*
			@discr
			@input
				@required
					iNdata -> object
						app
						@optional
							other
							page
							content

							extra
				@optional
					iNfunction -> object
						createApp  : function
						createPage : function
						createPage : function
			@deps
			@return
			@algorithm
				#1 check for isset app
				#2 [- create app] [with page] -> [did function] -> end
				#2 if (isset app) $page 
					#3 check for isset page	in view
					#4 [- create page] [with $content if isset] -> [did function] -> end
				#2 [did function] -> end
		*/
		var dataForCheckApp, issetApps, objectForCreateApp,intIssetPages,objectForCreatePage;
		// create obj for check for isset app
		dataForCheckApp = {'app':iNdata['app']};
		if(typeof(iNdata['extra']) == 'string') dataForCheckApp['extra'] = iNdata['extra'];
		// get count this apps
		issetApps = v_app.d_checkListApp(dataForCheckApp);
		// create app if it is not isset
		if (issetApps < 1) {
			// prepare obj
			objectForCreateApp = dataForCheckApp;
			if(typeof(iNdata['attr']) == 'string') 		objectForCreateApp['attr'] 		= iNdata['attr'];
			if(typeof(iNdata['other']) == 'string') 	objectForCreateApp['other'] 	= iNdata['other'];
			if(typeof(iNdata['content']) == 'string') 	objectForCreateApp['content'] 	= iNdata['content'];
			if(typeof(iNdata['page']) == 'string') 		objectForCreateApp['page'] 		= iNdata['page'];
			v_app.d_createPageInListApp(objectForCreateApp);

		} else if( typeof(iNdata['page'] ) == 'string' ) {
			objectForCreatePage = {'page':iNdata['page'],'app':iNdata['app']};
			if(typeof(iNdata['content']) == 'string') 	objectForCreatePage['content'] 	= iNdata['content'];
			intIssetPages = v_app.d_checkPageInListApp(objectForCreatePage);
			if(intIssetPages < 1) {
				//if page is not isset
				v_app.d_createPageInListApp(objectForCreatePage);
			} else {
				// page isset - change content if isset
				v_app.d_updatePageInListApp(objectForCreatePage)
			}
		}
		if (typeof(iNfunction) == 'function')iNfunction();
	}

	function _openChiefApp (iNdata,iNfunction) {
		/*
			@discr
			@example
				_openChiefApp({'app':'chat'}
			@input
				@required
					iNdata -> object
						app
						@optional
							other
							page
							content

							extra
				@optional
					iNfunction -> function
			@deps
				function : _readyApp
			@return
			@algorithm
				#1 show loader
				#2 invoke func ready app
				#3 close loader
		*/
		console.log('open chief app from app model funciton _openChiefApp started')
		v_view.d_showLoader();
		_readyChiefApp (iNdata,function () {
			if(typeof(iNfunction) == 'function') iNfunction();
			// v_view.d_showLoader();
		});
	}

	function _openListApp (iNdata,iNfunction) {
		/*
			@discr
			@input
				@required
					iNdata -> object
						app
						@optional
							other
							page
							content

							extra
				@optional
					iNfunction -> function
			@deps
				function : _readyApp
			@return
			@algorithm
				#1 show loader
				#2 invoke func ready app
				#3 close loader
		*/
		v_view.d_showLoader();
		_readyListApp (iNdata,function () {
			if(typeof(iNfunction) == 'function') iNfunction();
			v_view.d_showLoader();
		});
	}
	

	function _openApp ( iNdata, iNapp,iNtype) {
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
				function : getAppByName 
		*/

		//get module name by app name
		console.log('_openApp from engine started');
		var page, objForOpenApp = iNdata, appName = objForOpenApp['app'], pageName = objForOpenApp['page'];
		// iNapp = getAppByName(appName);
		if ( typeof(iNapp.pages) != 'object' || typeof(iNapp.pages[pageName]) != 'object' ) return false;
		//get attr from pages
		page = iNapp.pages[pageName];



		console.log('_openApp app from engine',iNapp);
		openChiefApp ( objForOpenApp , function () {
			if( typeof(iNapp['onStart']) == 'function' ) iNapp.onStart();
			iNapp.onInit();
			iNapp.onCreate();
			iNapp.onLoad();
			if ( typeof(iNapp['openPage']) != 'function' )
				d_openPage(appName,pageName, iNtype);
			else
				iNapp.openPage( appName, pageName, iNtype);
			iNapp.onAppear();
			if( typeof(iNapp['onFinish']) == 'function' ) iNapp.onFinish();
		});
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


	return {
	    'openChiefApp'  : _openChiefApp,
	    'openListApp'   : _openListApp,
	    'readyListApp'  : _readyListApp,
	    'readyChiefApp' : _readyChiefApp,

	    'setApp' 		: _setApp,
	    'setPage' 		: _setPage,
	    'thisApp' 		: _thisApp,
	    'thisPage' 		: _thisPage, 

	    'd_hidePages'   : _td_hidePages,
	    'd_showPages'   : _td_showPages,
	    'd_hideApps'    : _td_hideApps,
	    'd_showApps'    : _td_showApps,
	    'd_openPage'    : _td_openPage,
	}
});