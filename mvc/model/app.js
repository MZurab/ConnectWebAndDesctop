define(['v_app','jquery','v_view'],function(v_app,$,v_view) {
	//@< private vars
		var prefixForApp_ = 'rammanApp';
		var openPageName_ = 'openPage';
	//@> private vars

	function _setApp (iNapp) {
		/*
			@discr
				save open app in global window
			@input
				@required
					iNapp -> string
		*/
		window.rammanNowOpenedApp = iNapp;
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
		window[this.prefixForApp_ + '-' + iNapp+'-'+this.openPageName_] = iNpage;
	}
	function _thisPage (iNapp) {
		/*
			@discr
				get open page or false
			@input
				@required
					iNapp -> string
		*/
		return window[this.refixForApp_ + '-' + iNapp + '-' + this.openPageName_ ] || false;
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
		var thisApp = window.rammanNowOpenedApp||false;
		return thisApp;
	}
	function _invokeOpenedApp () {
		/*
			@discr
				invoke Method For Open App
			@input
				@required
				@optional
					iNmethodName -> string
		*/
		return _invokeApp(_thisApp());
	}
	function _invokeApp (iNappName,iNmethodName) {
		/*
			@example
				invo
				_invokeApp('chat','onAppear')
				_invokeApp('chat','name')

			@discr
				invoke Method of Var from global App
			@input
				@required
				@optional
					iNmethodName -> string
			@return
				false OR 
		*/
		var appName = iNappName,appPrefix = this.prefixForApp_+'-',method=iNmethodName;
		if( typeof(window[appPrefix+ appName]) == 'object' && typeof(window[appPrefix+ appName][method]) != 'undefined')
				switch( typeof(window[appPrefix+ appName][method]) ){
					case 'function':
						var result =  window[appPrefix+ appName][method]();
						if( typeof(result) != 'undefined' ) return result;
						return true;
					break;
					default:
						return window[appPrefix+ appName][method];
					break;
				}
		return false;
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
	function createOrUpdateApp (objectForCreateApp,iNapp) {
		/*
			@discr
				create app with app init or invoke app update functions
			@input
				@required
					objectForCreateApp -> object
						app
						@optional
							other
							page
							content

							extra
					iNapp -> app object
				@optional
			@deps
				funciton : v_app.d_checkChiefApp,
				funciton : v_app.d_createChiefApp,
				funciton : _thisPage
			@return
			@algorithm
				#1 check for isset app
				#2 [- create app] [with page] -> [did function] -> end
				#2 if (isset app) $page 
					#3 check for isset page	in view
					#4 [- create page] [with $content if isset] -> [did function] -> end
				#2 [did function] -> end
		*/
		// get count this apps
	  var issetApps = v_app.d_checkChiefApp( {'app':iNdata['app']} );
		if (issetApps < 1) {
				// create app and invoke app init method
				// safe add attributes if it exists 
					var appAttr = getAppAttr(iNapp);
					if( appAttr != false)
						objectForCreateApp['attr'] = appAttr;
				v_app.d_createChiefApp(objectForCreateApp);
				iNapp.onInit();
			} else if ( _thisPage(iNdata['app']) != iNdata['page']) {
				// we safe invoke app onUpdate method
				if ( typeof(iNapp['onUpdate']) == 'function' ) iNapp.onUpdate();
			}
	}




	function rightCloseLastAppOrAnotherPageFromThisApp (iNapp,iNdata) {
		/*
			@discr
				right closed last app with OnDisappear
			@input
				@required
					iNapp 		-> app object
					iNdata -> object
						app
						@optional
							other
							page
							content

							extra
				@optional
			@deps
			@return
			@algorithmh 
		*/
		// if we open this app from another this.appName != nowOpenedApp
		if ( iNdata['app'] != _thisApp() ) {
			// did safe invoke onDisappear, onOut methods for app is opening now
			var pagesFunctionsFromAnotherApp =  getPageFuncitons(_thisApp(),_thisPage( _thisApp() ) );//  _invokeApp(_thisApp(),'pages');
			// did safe invoke for pages from another app onDisappear, onOut
			if ( pagesFunctionsFromAnotherApp != false) {
				// invoke onDesappear for page 
					if ( typeof(pagesFunctionsFromAnotherApp['onDisappear']) == 'function' )
						pagesFunctionsFromAnotherApp['onDisappear']();

				// invoke onOut for page
					if ( typeof(pagesFunctionsFromAnotherApp['onOut']) == 'function' )
						pagesFunctionsFromAnotherApp['onOut']();
			}

			// did safe close last open app
			_invokeOpenedApp('onDisappear');
			_invokeOpenedApp('onOut');

			// did safe invoke thisApp.onIn in
			if ( typeof(iNapp.onIn) == 'function' )iNapp.onIn(); 

			//did app appear functions and 
			iNapp.onAppear();
		} else if( _thisPage(iNdata['app']) != iNdata['page']) {
			// if this app now open and this page does not open we have to invoke page open page on onDisappear
			// did safe invoke onDisappear  methods for this app
			var pagesFunctionsFromThisApp = getPageFuncitons( iNapp , _thisPage( _thisApp() ) );// _invokeApp(_thisApp(),'pages');

			if (pagesFunctionsFromThisApp != false) {
				// invoke safe onDesappear for page 
					if ( typeof(pagesFunctionsFromThisApp['onDisappear']) == 'function' )
						pagesFunctionsFromThisApp['onDisappear']();
			}
		}
	}
	function rightInvokePageFunctions (iNapp,iNdata,objectForCreatePage) {
		/*
			@discr
			@input
				@required
					iNapp -> app object
					objectForCreatePage -> object
						app
						@optional
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
		// we invoke onInit or onUpate for page functions if it need
		var intIssetPages = v_app.d_checkPageInChiefApp(objectForCreatePage);
		// get this page functions
		var pageFunctions = getPageFuncitons(iNapp,objectForCreateApp['page']);
		if(intIssetPages < 1) {
			// page is not isset - create page
			// create page and invoke page init method
			// safe add attributes if it exists 
				var pageAttr = getPageAttr(iNapp,iNdata['page']);
				if( pageAttr != false)
					objectForCreatePage['attr'] = pageAttr;

			v_app.d_createPageInChiefApp(objectForCreatePage);
			if(typeof(pageFunctions.onInit) == 'function') pageFunctions.onInit();

		} else {
			// page isset - change content page because if already isset
			// safe invoke page init method
			v_app.d_updatePageInChiefApp(objectForCreatePage)
			if( typeof (pageFunctions.onUpdate) == 'function') pageFunctions.onUpdate();
		}

		// if we have not onView functions for pages we need invoke default viewPage functions
		if( typeof(pageFunctions['onView']) != 'function')
			v_app.d_viewPage(objectForCreateApp);
		else // if we have override function onView for page we invoke it
			pageFunctions['onView'](objectForCreateApp);

		// set this page as openinig
		_setPage(iNdata['app'],iNdata['page']);

		// invoke safe page appear functions
		if( typeof(pageFunctions['onAppear']) == 'function' ){
			pageFunctions ['onAppear']();
		}
	}
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
		var dataForCheckApp, issetApps, objectForCreateApp,intIssetPages,objectForCreatePage;
		// create obj for check for isset app
		dataForCheckApp = {'app':iNdata['app']};
		if(typeof(iNdata['extra']) == 'string') dataForCheckApp['extra'] = iNdata['extra'];
		// create app if is not isset
		objectForCreateApp  = _clone(dataForCheckApp);
		objectForCreatePage = _clone(dataForCheckApp);
		// prepare obj for create app 
		if(typeof(iNdata['other']) 		== 'string') 	objectForCreateApp['other'] 	= iNdata['other'];
		if(typeof(iNdata['content']) 	== 'string') 	objectForCreateApp['content'] 	= iNdata['content'];
		if(typeof(iNdata['page']) 		== 'string') 	objectForCreateApp['page'] 		= iNdata['page'];

		//creating app or invoke on update
		createOrUpdateApp (objectForCreateApp,iNapp);

		// safe right closed app another app what is opening now or close open page
		rightCloseLastAppOrAnotherPageFromThisApp (iNapp,iNdata);

		// set this app and page as opening now 
		
		// if we have not onViewApp functions we need invoke default viewApp functions
		if( typeof(iNapp['onView']) != 'function')
			v_app.d_viewApp(objectForCreateApp);
		else // if we have override function we invoke it
			iNapp['onView'](objectForCreateApp);

		// set this app as openinig
		_setApp(iNdata['app']);

		// invoke app on appear functions
		iNapp['onAppear']();

		// right functions OnInit OnUpdate OnDisappear
		rightInvokePageFunctions (iNapp,iNdata,objectForCreatePage);


		// safe did appear function for page
		if(typeof(iNapp.pages[objectForCreateApp['page']].onAppear) == 'function') iNapp.pages[objectForCreateApp['page']].onAppear();
		// did show this app + show if need and invoke onEnter if need ADD
		v_app._d_viewPage(objectForCreateApp);

		// safe invoke passed function
		if (typeof(iNfunction) == 'function')iNfunction();
	}

	function _readyListApp (iNdata, iNapp,iNfunction) {
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
		var dataForCheckApp, issetApps, objectForCreateApp,intIssetPages,objectForCreatePage,pagesAttr;
		// create obj for check for isset app
		// dataForCheckApp = {'app':iNdata['app']};
		if(typeof(iNdata['extra']) == 'string') dataForCheckApp['extra'] = iNdata['extra'];
		// get count this apps
		issetApps = v_app.d_checkListApp(dataForCheckApp);
		// create app if it is not isset

		// prepare obj
		objectForCreateApp = {'app':iNdata['app']};
		// if(typeof(iNdata['attr']) == 'string') 		objectForCreateApp['attr'] 		= iNdata['attr'];
		if(typeof(iNdata['other']) == 'string') 	objectForCreateApp['other'] 	= iNdata['other'];
		// if(typeof(iNdata['content']) == 'string') 	objectForCreateApp['content'] 	= iNdata['content'];
		if(typeof(iNdata['page']) == 'string') 		objectForCreateApp['page'] 		= iNdata['page'];

		if (issetApps < 1) {
			v_app.d_createPageInListApp(objectForCreateApp);
		} 

		if( typeof(iNdata['page'] ) == 'string' ) {
			objectForCreatePage = {'page':iNdata['page'],'app':iNdata['app']};

			// get page menus attr for list app
			pagesMenusAttr = getPageMenusAttr(iNapp,iNdata['page']);
			if( pagesMenusAttr != false) 	objectForCreatePage['attr'] 	= pagesMenusAttr;

			if( typeof(iNdata['content']) == 'string') 	objectForCreatePage['content'] 	= iNdata['content'];

			intIssetPages = v_app.d_checkPageInListApp(objectForCreatePage);
			if(intIssetPages < 1) {
				//if page is not isset
				v_app.d_createPageInListApp(objectForCreatePage);
			} else {
				// page isset - change content if isset
				// v_app.d_updatePageInListApp(objectForCreatePage)
			}
		}
		if (typeof(iNfunction) == 'function')iNfunction();
	}


	//@< getter for pages from app funcitons
		function getPageMenus (iNapp,iName) {
			var page = getPage(iNapp,iName)
			if( 
				page != false && 
				typeof page['menus'] == 'object'  
			) {
				return page['menus'];
			}
			return false;
		}
		function getPageFuncitons (iNapp,iName) {
			var page = getPage(iNapp,iName)
			if( 
				page != false && 
				typeof page['functions'] == 'object'  
			) {
				return page['functions'];
			}
			return false;
		}
		function getPageMenusAttr (iNapp,iName) {
			var menus = getPageMenus(iNapp,iName);
			if( 
				menus != false  && 
				typeof menus['attr'] == 'object' 
			) {
				return iNapp['pages'][ iName ]['menus']['attr'];
			}
			return false;
		}
		function getPages (iNapp) {
			if( 
				typeof(iNapp) == 'object' && 
				typeof iNapp['pages'] == 'object' 
			) {
				return iNapp['pages'];
			}
			return false;
		}
		function getPage (iNapp,iName) {
			var pages = getPages(iNapp)
			if( 
				pages != false && 
				typeof pages[ iName ] == 'object'  
			) {
				return pages[ iName ];
			}
			return false;

		}
		function getPageAttr (iNapp,iName) {
			var page = getPage(iNapp,iName)
			if( 
				page != false && 
				typeof page['attr'] == 'object'  
			) {
				return page['attr'];
			}
			return false;
		}
	//@> getter for pages from app funcitons

	//@< getter for  options from app funcitons
		function getAppOptions (iNapp) {
			if( 
				typeof(iNapp) == 'object' && 
				typeof iNapp['options'] == 'object' 
			) {
				return iNapp['options'];
			}
			return false;
		}
		function getAppAttr (iNapp) {
			var options = getAppOptions(iNapp)
			if( 
				options != false && 
				typeof options['attr'] == 'object'  
			) {
				return options['attr'];
			}
			return false;
		}
		function getAppMenus (iNapp) {
			var options = getAppOptions(iNapp)
			if( 
				options != false && 
				typeof options['menus'] == 'object'  
			) {
				return options['menus'];
			}
			return false;
		}
		function getAppMenusAttr (iNapp) {
			var menus = getAppMenus(iNapp)
			if( 
				menus != false && 
				typeof menus['attr'] == 'object'  
			) {
				return menus['attr'];
			}
			return false;
		}

	//@> getter for  options from app funcitons



	function _openChiefApp (iNdata,iNapp,iNfunction) {
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
		_readyChiefApp (iNdata,iNapp,function () {
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
	

	// function _openApp ( iNdata, iNapp,iNtype) {
	// 	/*
	// 		@disc
	// 			open app
	// 				check funcitons optional
	// 				check apps
	// 				check pages
					
	// 		@input
	// 			@input
	// 				@required
	// 					iNdata
	// 						@required
	// 							app
	// 							page
	// 						@optional
	// 							extra
	// 							content
	// 							other
	// 					iNapp -> app object
	// 				@optional
	// 					iNtype

	// 		@deps
	// 			function : getAppByName 
	// 	*/

	// 	//get module name by app name
	// 	console.log('_openApp from engine started');
	// 	var page, objForOpenApp = iNdata, appName = objForOpenApp['app'], pageName = objForOpenApp['page'];
	// 	// iNapp = getAppByName(appName);
	// 	if ( typeof(iNapp.pages) != 'object' || typeof(iNapp.pages[pageName]) != 'object' ) return false;
	// 	//get data from pages
	// 	page = iNapp.pages[pageName];



	// 	console.log('_openApp app from engine',iNapp);
	// 	_openChiefApp ( objForOpenApp ,iNapp, function () {
	// 		if( typeof(iNapp['onStart']) == 'function' ) iNapp.onStart();
	// 		// iNapp.onInit();

	// 		if ( typeof(iNapp['openPage']) != 'function' )
	// 			d_openPage(appName,pageName, iNtype);
	// 		else
	// 			iNapp.openPage( appName, pageName, iNtype);
	// 		iNapp.onAppear();
	// 		if( typeof(iNapp['onFinish']) == 'function' ) iNapp.onFinish();
	// 	});
	// }

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

	function _clone(obj) {
	    if (null == obj || ( "object" != typeof obj && "array" != typeof obj )) return obj;
	    if(Array.isArray(obj) == true) {
	    	return obj.slice();
	    }
	    var copy = obj.constructor();
	    for (var attr in obj) {
	        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	    }
	    return copy;
	}

	return {
	    'openChiefApp'  : _openChiefApp,
	    'openListApp'   : _openListApp,
	    'readyListApp'  : _readyListApp,
	    'readyChiefApp' : _readyChiefApp,
	    'invokeOpenApp' : _invokeOpenedApp,
	    'invokeApp' 	: _invokeApp,
	    'clone' 		: _clone,

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