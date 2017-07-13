define(['v_app','jquery','v_view'],function(v_app,$,v_view) {
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
	//>! transactors

	function _readyChiefApp (iNdata,iNfunction) {
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
		issetApps = v_app.d_checkChiefApp(dataForCheckApp);
		// create app if is not isset
		if (issetApps < 1) {
			// prepare obj
			objectForCreateApp = dataForCheckApp;
			if(typeof(iNdata['attr']) == 'string') 		objectForCreateApp['attr'] 		= iNdata['attr'];
			if(typeof(iNdata['other']) == 'string') 	objectForCreateApp['other'] 	= iNdata['other'];
			if(typeof(iNdata['content']) == 'string') 	objectForCreateApp['content'] 	= iNdata['content'];
			if(typeof(iNdata['page']) == 'string') 		objectForCreateApp['page'] 		= iNdata['page'];
			v_app.d_createPageInChiefApp(objectForCreateApp);

		} else if( typeof(iNdata['page'] ) == 'string' ) {
			objectForCreatePage = {'page':iNdata['page'],'app':iNdata['app']};
			if(typeof(iNdata['content']) == 'string') 	objectForCreatePage['content'] 	= iNdata['content'];
			intIssetPages = v_app.d_checkPageInChiefApp(objectForCreatePage);
			if(intIssetPages < 1) {
				//if page is not isset
				v_app.d_createPageInChiefApp(objectForCreatePage);
			} else {
				// page isset - change content if isset
				v_app.d_updatePageInChiefApp(objectForCreatePage)
			}
		}
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
			v_view.d_showLoader();
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
	




	return {
	    'openChiefApp'  : _openChiefApp,
	    'openListApp'   : _openListApp,
	    'readyListApp'  : _readyListApp,
	    'readyChiefApp' : _readyChiefApp,

	    'd_hidePages'   : _td_hidePages,
	    'd_showPages'   : _td_showPages,
	    'd_hideApps'    : _td_hideApps,
	    'd_showApps'    : _td_showApps,
	}
});