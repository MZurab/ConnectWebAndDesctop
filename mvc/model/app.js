define(['v_app','jquery','v_view'],function(VIEW,$,V_VIEW) {
	const _ = {'view':VIEW};
	// create temp local storage for works 
	window.connectTempLocalStorage = {};

	//@<<< TIME FUNCTIONS
		function _getSec () {
		    return new Date().getTime()/1000;
		}
		_['getSec'] = _getSec;

		function _getTime () {
		    return new Date().getTime();
		}
		_['getTime'] = _getTime;
	//@>>> TIME FUNCTIONS

	//@<<< LOCAL STORAGE
		// function _getValidStorage () {
		// 	if ( getGlobalVar('m_routing').getUserDomain() ) {
		// 		//if we are in subdomain
		// 		return window.connectTempLocalStorage;
		// 	} else {
		// 		//if we are in chief site
		//     	return localStorage;

		// 	}
		// }
		// _['getValidStorage'] = _getValidStorage;

			function _getLocalStorage () {
		    	return localStorage;
			}
			_['getLocalStorage'] = _getLocalStorage;

			function getStringOfLocalStorage() {
	          var a = {}, lstorage = _getLocalStorage();
	          for (var i = 0; i < lstorage.length; i++) {
	              var k = lstorage.key(i);
	              var v = lstorage.getItem(k);
	              a[k] = v;
	          }
	          var s = JSON.stringify(a);
	          return s;
	      }
	      _['getStringOfLocalStorage'] = getStringOfLocalStorage;

			function _getTempStorage (argument) {
		    	return window.connectTempLocalStorage;
			}
			_['getTempStorage'] = _getTempStorage;

			function _storage_copyLocalToTemp () {
				window.connectTempLocalStorage = _getLocalStorage()||{};
			}
			_['storage_copyLocalToTemp'] = _storage_copyLocalToTemp;

		function _save ( name, value ) {
			if ( getGlobalVar('m_routing').getUserDomain() ) {
				//if we are in subdomain
				 _saveTempStorage( name, value );
			} 
				//if we are in chief site
		    	return _saveLocalStorage ( name , value );

			
			// 		_saveLocalStorage ( name , value );
			// return _saveTempStorage( name, value );
		}
		_['save'] = _save;

			function _saveTempStorage ( name, value ) {
				return window.connectTempLocalStorage[name] = value;
			}
			_['saveTempStorage'] = _saveTempStorage;

			function _saveLocalStorage ( name, value ) {
				return localStorage.setItem( name , value );
			}
			_['saveLocalStorage'] = _saveLocalStorage;

		function _get (name) {
	    	return _getFromLocalStorageByKey( name );

			// if ( getGlobalVar('m_routing').getUserDomain() ) {
			// 	//if we are in subdomain
			// 	return _getFromTempStorageByKey ( name );
			// } else {
			// 	//if we are in chief site
		 //    	return _getFromLocalStorageByKey( name ); 
			// }
		}
		_['get'] = _get;

			function _getFromTempStorageByKey (name) {
			    return window.connectTempLocalStorage[name];
			}
			_['getFromTempStorageByKey'] = _getFromTempStorageByKey;

			function _getFromLocalStorageByKey (name) {
			    return localStorage.getItem(name);
			}
			_['getFromLocalStorageByKey'] = _getFromLocalStorageByKey;

		function _del (name) {
		    localStorage.removeItem(name);
		}
		_['del'] = _del;

		function _clear () {
			// clear temp storage
			_clearTempStorage (  );
			// clear local storage
			_clearLocalStorage(); 
		}
		_['clear'] = _clear;

			function _clearLocalStorage (argument) {
		    	localStorage.clear();
			}
			_['clearLocalStorage'] = _clearLocalStorage;

			function _clearTempStorage (argument) {
		    	window.connectTempLocalStorage = {};
			}
			_['clearTempStorage'] = _clearTempStorage;
			
	//@>>> LOCAL STORAGE

	//@@@<<< IMPORTS
		function _addScript (iNhref,iNfuntion) {
			$.getScript(iNhref, iNfuntion );//( data, textStatus, jqxhr )
		}
		_['addScript'] = _addScript;
	//@@@>>> IMPORTS

	function _forEach (data, callback){
	  for(var key in data){
	    if(data.hasOwnProperty(key)){
	      callback(key, data[key]);
	    }
	  }
	}
	_['forEach'] = _forEach;

	/*?<<< json object  */
		function _getJsonKey (ObjectThis){
		    return Object.keys(ObjectThis)[0];
		}
		_['getJsonKey'] = _getJsonKey;

		function _getJsonKeys (ObjectThis){
		    return Object.keys(ObjectThis);
		}
		_['getJsonKeys'] = _getJsonKeys;
	/*!>>> json object  */

	/*?<<< SOUND */
		function _addSource (elem, path) {
		  $('<source>').attr('src', path).appendTo(elem);
		}
		_['addSource'] = _addSource;

		    function _playSound(iNsrc){
		        var audio = $('<audio />', {
		           autoPlay : 'autoplay'
		         });
		         _addSource(audio, iNsrc);
		         audio.appendTo('body');
		    }
			_['playSound'] = _playSound;
	/*?<<< SOUND  */

	

	//@< private vars
		const globalPrefix = 'global-';
		const prefixForApp_ = 'rammanApp-';
		const prefixForGlobalApp_ = globalPrefix + prefixForApp_;
		const prefixForGlobalVar = globalPrefix + 'var-';
		const openPageName_ = 'openPage';
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
	_['setApp'] = _setApp;

	function _setPage (iNapp,iNpage) {
		/*
			@discr
				save open app and page in global window
			@input
				@required
					iNapp -> string
					iNpage -> string
		*/
		// _setApp(iNapp);
		window[this.prefixForApp_ + '-' + iNapp+'-'+this.openPageName_] = iNpage;
	}
	_['setPage'] = _setPage;

	function _thisPage (iNapp) {
		/*
			@discr
				get open page or false
			@input
				@required
					iNapp -> string
		*/
		return window[this.prefixForApp_ + '-' + iNapp + '-' + this.openPageName_ ] || false;
	}
	_['thisPage'] = _thisPage;

	function _thisApp () {
		/*
			@discr
				get open app or false
			@input
				@required
					iNapp -> string
					iNpage -> string
			@return
				object: app
		*/
		var thisApp = window.rammanNowOpenedApp||false;
		return thisApp;
	}
	_['thisApp'] = _thisApp;

	function _invokeOpenedApp (iNmethodName) {
		/*
			@discr
				invoke Method For Open App
			@input
				@required
				@optional
					iNmethodName -> string
		*/
		if ( typeof iNmethodName == 'string' && _thisApp() != false && typeof _thisApp()[iNmethodName] == 'function') {
			let thisFunc =  _thisApp()[iNmethodName];	
			thisFunc();
		}
		return _thisApp();
	}
	_['invokeOpenedApp'] = _invokeOpenedApp;

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
	_['invokeApp'] = _invokeApp;

	//<? transactors
		function _td_hidePages (iNapp,iNarray,iNtypeApp) {
			V_VIEW.d_hidePages (iNapp,iNarray,iNtypeApp)
		}
		_['d_hidePages'] = _td_hidePages;

		function _td_showPages (iNapp,iNarray,iNtypeApp) {
			V_VIEW.d_showPages (iNapp,iNarray,iNtypeApp)
		}
		_['d_showPages'] = _td_showPages;

		function _td_showApps (iNarray,iNtypeApp) {
			V_VIEW.d_showApps (iNarray,iNtypeApp)
		}
		_['d_showApps'] = _td_showApps;

		function _td_hideApps (iNarray,iNtypeApp) {
			V_VIEW.d_hideApps (iNarray,iNtypeApp)
		}
		_['d_hideApps'] = _td_hideApps;

		function _td_openPage (iNapp,iNpage,iNtype) {
			VIEW.d_openPage (iNapp,iNpage,iNtype);
		}
		_['d_openPage'] = _td_openPage;
	//>! transactors

	//< lambda funtions
		var initFunction = (iNapp) => {

		}
	//> lambda function
	function createOrUpdateApp (objectForCreateApp,iNapp,iNdataForApp) {
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
					iNdataForApp -> string
				@optional
			@deps
				funciton : VIEW.d_checkChiefApp,
				funciton : VIEW.d_createChiefApp,
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
		// know about isset app
		if ( !isApp(iNapp) ) {
				// create app if its has not custom onCreate method 
				if ( typeof iNapp.onCreate != 'function' ) {
					// safe add attributes if it exists 
					var appAttr = getAppAttr(iNapp);
					if( appAttr != false) objectForCreateApp['attr'] = appAttr;

					if( typeof iNapp.getTemplate == 'function' ) 
						iNapp.getTemplate(objectForCreateApp);
					VIEW.d_createChiefApp(objectForCreateApp);
				} else {
					iNapp.onCreate ( iNdataForApp, objectForCreateApp );
				}

				//then invoke app init method
				iNapp.onInit(iNdataForApp);
		} else if ( _thisPage(objectForCreateApp['app']) != objectForCreateApp['page']) {
			// we safe invoke app onUpdate method
			if ( typeof(iNapp['onUpdate']) == 'function' ) iNapp.onUpdate(iNdataForApp);
		}
	}

		function isApp (iNapp) {
			/*
			 	@discr
			 		know isset app with default or custom method
		 		@input
		 			@required
		 				iNapp -> object of app
		 		@return BOOL
			*/
			if( typeof iNapp['isApp'] != 'function' )
				 return (VIEW.d_checkChiefApp ( {'app': iNapp.name } ) > 0) ? true : false;
			else 
				return iNapp['isApp']();
		}

		function isPage (iNapp,iNpage) {
			/*
			 	@discr
			 		know isset page of app  with default or custom method
		 		@input
		 			@required
		 				iNapp 	-> object of  app
		 				iNpage 	-> string
		 		@return BOOL
			*/
			var thisPage = getPageFuncitons(iNapp,iNpage);
			var objectForGetPage = {'app': iNapp.name, 'page' : iNpage };
			if( typeof thisPage['isPage'] != 'function' ) 
				 return (VIEW.d_checkPageInChiefApp ( objectForGetPage ) > 0) ? true : false;
			else
				return thisPage['isPage']();
			
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
		if ( iNdata['app'] != _thisApp().name ) {
			// did safe invoke onDisappear, onOut methods for app is opening now
			var pagesFunctionsFromAnotherApp =  getPageFuncitons(_thisApp(),_thisPage( _thisApp().name ) );//  _invokeApp(_thisApp(),'pages');
			// did safe invoke for pages from another app onDisappear, onOut
			if ( pagesFunctionsFromAnotherApp != false) {
				// invoke onDesappear for page 
					if ( typeof(pagesFunctionsFromAnotherApp['onDisappear']) == 'function' )
						pagesFunctionsFromAnotherApp['onDisappear']();

				// invoke onOut for page
					if ( typeof(pagesFunctionsFromAnotherApp['onOut']) == 'function' )
						pagesFunctionsFromAnotherApp['onOut']();

				// hide another app page with custom or default mehtods
					if ( typeof(pagesFunctionsFromAnotherApp['onHide']) == 'function' )
						pagesFunctionsFromAnotherApp['onHide']();
					else 
						VIEW.d_hidePages(_thisApp().name, _thisPage( _thisApp().name ));
			}


			// did safe close last open app
			_invokeOpenedApp('onDisappear');
			_invokeOpenedApp('onOut');

			// hide another app with custom or defatult methods
			if( typeof _thisApp()['onHide'] == 'function' ) {
				_thisApp()['onHide']();
			} else {
				VIEW.d_hideApps( _thisApp().name );
			}

			// did safe invoke thisApp.onIn in
			if ( typeof(iNapp.onIn) == 'function' ) iNapp.onIn(); 

			//did app appear functions and 
			iNapp.onAppear();
		} else if( _thisPage(iNdata['app']) != iNdata['page']) {
			// if this app now open and this page does not open we have to invoke page open page on onDisappear
			// did safe invoke onDisappear  methods for this app
			var pagesFunctionsFromThisApp = getPageFuncitons( iNapp , _thisPage( _thisApp().name ) );// _invokeApp(_thisApp(),'pages');

			if (pagesFunctionsFromThisApp != false) {
				// invoke safe onDesappear for page 
					if ( typeof(pagesFunctionsFromThisApp['onDisappear']) == 'function' )
						pagesFunctionsFromThisApp['onDisappear']();
			}

			// hide  app last page with custom or default mehtods
				if ( typeof(pagesFunctionsFromThisApp['onHide']) == 'function' )
					pagesFunctionsFromThisApp['onHide']();
				else 
					VIEW.d_hidePages( iNdata['app'], _thisPage( iNdata['app'] ));		
		}
	}
	function rightInvokePageFunctions (iNapp,iNdata,objectForCreatePage,iNdataForApp) {
		/*
			@discr
			@input
				@required
					iNapp -> app object
					objectForCreatePage -> object
						app
						page
						@optional
					iNdataForApp -> string
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

		// get this page functions
		var pageFunctions = getPageFuncitons(iNapp,objectForCreatePage['page']);
		if( !isPage(iNapp,objectForCreatePage['page']) ) {
			// page is not isset - create page
			// create page and invoke page init method
			// safe add attributes if it exists 
			var pageAttr = getPageAttr(iNapp,iNdata['page']);
			if( pageAttr != false) objectForCreatePage['attr'] = pageAttr;

			if( typeof pageFunctions.getTemplate == 'function' ) 
				pageFunctions.getTemplate(objectForCreatePage);
			// 
			if(typeof pageFunctions['onCreate'] == 'function')
				pageFunctions['onCreate']();
			else
				VIEW.d_createPageInChiefApp(objectForCreatePage);

			if( typeof pageFunctions.onInit == 'function') 
				pageFunctions.onInit(iNdataForApp,objectForCreatePage);

		} else {
			// page isset - change content page because if already isset
			// safe invoke page init method
			if( typeof (pageFunctions.onUpdate) == 'function') 
				pageFunctions.onUpdate(iNdataForApp,objectForCreatePage);
			else
				VIEW.d_updatePageInChiefApp(objectForCreatePage)
		}

		// set this page as openinig
		if( typeof pageFunctions['setPage'] != 'function' )
			_setPage(iNdata['app'],iNdata['page']);
		else
			pageFunctions['setPage'](iNdataForApp,objectForCreatePage);

		// invoke safe page appear functions
		if( typeof(pageFunctions['onAppear']) == 'function' ){
			pageFunctions ['onAppear'](iNdataForApp,objectForCreatePage);
		}

		// if we have not onView functions for pages we need invoke default viewPage functions
		if( typeof(pageFunctions['onView']) != 'function')
			VIEW.d_viewPage(objectForCreatePage);
		else // if we have override function onView for page we invoke it
			pageFunctions['onView'](iNdataForApp,objectForCreatePage);
	}
	function _readyChiefApp (iNdata,iNapp,iNdataForApp,iNfunction) {
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
		if ( typeof iNapp != 'object' ) {
			return false;
		}

		if( typeof(iNapp['onLoader']) != 'function')
			VIEW.createLoader();
		else
			iNapp['onLoader'](iNdataForApp,objectForCreateApp);

		if(iNapp['name'] != iNdata['app'] || typeof iNapp['pages'][ iNdata['page'] ] != 'object') {
			return false;
		}
		if( typeof(iNapp['onAccess']) == 'function' && !iNapp['onAccess'](iNdataForApp,objectForCreateApp) ) {
			return false;
		}

		var dataForCheckApp, issetApps, objectForCreateApp,intIssetPages,objectForCreatePage;
		// create obj for check for isset app
		dataForCheckApp = {'app':iNdata['app'],'page':iNdata['page']};
		if ( typeof(iNdata['extra']) == 'string' ) dataForCheckApp['extra'] = iNdata['extra'];
		// create app if is not isset
		objectForCreateApp  = _clone(dataForCheckApp);
		objectForCreatePage = _clone(dataForCheckApp);
		// prepare obj for create app 
		if(typeof(iNdata['other']) 		== 'string') 	objectForCreateApp['other'] 	= iNdata['other'];
		if(typeof(iNdata['content']) 	== 'string') 	objectForCreateApp['content'] 	= iNdata['content'];
		if(typeof(iNdata['page']) 		== 'string') 	objectForCreateApp['page'] 		= iNdata['page'];

		//creating app or invoke on update
		createOrUpdateApp ( objectForCreateApp, iNapp, iNdataForApp );

		// safe right closed app another app what is opening now or close open page
		rightCloseLastAppOrAnotherPageFromThisApp (iNapp,iNdata);

		// set this app and page as opening now 
		
		// if we have not onViewApp functions we need invoke default viewApp functions
		if( typeof(iNapp['onView']) != 'function')
			VIEW.d_viewApp(objectForCreateApp);
		else // if we have override function we invoke it
			iNapp['onView'](iNdataForApp,objectForCreateApp);

		// set this app as openinig if this app inited
		if ( typeof iNapp['setApp'] != 'function' )
			_setApp ( iNapp );
		else
			iNapp['setApp']( iNdataForApp , iNdata );


		// invoke app on appear functions
		iNapp['onAppear'] ( iNdataForApp , iNdataForApp );

		// right functions OnInit OnUpdate OnDisappear
		rightInvokePageFunctions (iNapp,iNdata,objectForCreatePage,iNdataForApp);


		// safe did appear function for page
		// if(typeof(iNapp.pages[objectForCreateApp['page']].onAppear) == 'function') iNapp.pages[objectForCreateApp['page']].onAppear();
		// did show this app + show if need and invoke onEnter if need ADD
		// VIEW._d_viewPage(objectForCreateApp);

		// safe invoke passed function
		if (typeof(iNfunction) == 'function')iNfunction();
	}
	_['readyChiefApp'] = _readyChiefApp;

	
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
		issetApps = VIEW.d_checkListApp(dataForCheckApp);
		// create app if it is not isset

		// prepare obj
		objectForCreateApp = {'app':iNdata['app']};
		// if(typeof(iNdata['attr']) == 'string') 		objectForCreateApp['attr'] 		= iNdata['attr'];
		if(typeof(iNdata['other']) == 'string') 	objectForCreateApp['other'] 	= iNdata['other'];
		// if(typeof(iNdata['content']) == 'string') 	objectForCreateApp['content'] 	= iNdata['content'];
		if(typeof(iNdata['page']) == 'string') 		objectForCreateApp['page'] 		= iNdata['page'];

		if (issetApps < 1) {
			VIEW.d_createPageInListApp(objectForCreateApp);
		} 

		if( typeof(iNdata['page'] ) == 'string' ) {
			objectForCreatePage = {'page':iNdata['page'],'app':iNdata['app']};

			// get page menus attr for list app
			pagesMenusAttr = getPageMenusAttr(iNapp,iNdata['page']);
			if( pagesMenusAttr != false) 	objectForCreatePage['attr'] 	= pagesMenusAttr;

			if( typeof(iNdata['content']) == 'string') 	objectForCreatePage['content'] 	= iNdata['content'];

			intIssetPages = VIEW.d_checkPageInListApp(objectForCreatePage);
			if(intIssetPages < 1) {
				//if page is not isset
				VIEW.d_createPageInListApp(objectForCreatePage);
			} else {
				// page isset - change content if isset
				// VIEW.d_updatePageInListApp(objectForCreatePage)
			}
		}
		if (typeof(iNfunction) == 'function')iNfunction();
	}
	_['readyListApp'] = _readyListApp;


	//@< getter for pages from app funcitons
		function getPageMenus (iNapp,iName) {
			var page = getPage(iNapp,iName);
			if( 
				page != false && 
				typeof page['menus'] == 'object'  
			) {
				return page['menus'];
			}
			return false;
		}

		function getPageFuncitons (iNapp,iName) {
			var page = getPage(iNapp,iName);
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
			var pages = getPages(iNapp);
			if( 
				pages != false && 
				typeof pages[ iName ] == 'object'  
			) {
				return pages[ iName ];
			}
			return false;

		}
		function getPageAttr (iNapp,iName) {
			var page = getPage(iNapp,iName);
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
			var options = getAppOptions(iNapp);
			if( 
				options != false && 
				typeof options['attr'] == 'object'  
			) {
				return options['attr'];
			}
			return false;
		}
		function getAppMenus (iNapp) {
			var options = getAppOptions(iNapp);
			if( 
				options != false && 
				typeof options['menus'] == 'object'  
			) {
				return options['menus'];
			}
			return false;
		}
		function getAppMenusAttr (iNapp) {
			var menus = getAppMenus(iNapp);
			if( 
				menus != false && 
				typeof menus['attr'] == 'object'  
			) {
				return menus['attr'];
			}
			return false;
		}

	//@> getter for  options from app funcitons



	function _openChiefApp (iNdata,iNapp,iNstring,iNfunction) {
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
		
		_readyChiefApp (iNdata,iNapp,iNstring,function () {
			if(typeof(iNfunction) == 'function') iNfunction();
			// VIEW.createLoader();
		});
	}
	_['openChiefApp'] = _openChiefApp;

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
		VIEW.createLoader();
		_readyListApp (iNdata,function () {
			if(typeof(iNfunction) == 'function') iNfunction();
			VIEW.createLoader();
		});
	}
	_['openListApp'] = _openListApp;
	

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
	// 	var page, objForOpenApp = iNdata, appName = objForOpenApp['app'], pageName = objForOpenApp['page'];
	// 	// iNapp = getAppByName(appName);
	// 	if ( typeof(iNapp.pages) != 'object' || typeof(iNapp.pages[pageName]) != 'object' ) return false;
	// 	//get data from pages
	// 	page = iNapp.pages[pageName];



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
	_['closeApp'] = _closeApp;

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
	_['clone'] = _clone;




	function getGlobalApp(iNname){
		if( typeof window[prefixForGlobalApp_+iNname] == 'undefined' )
			return false;
		return window[prefixForGlobalApp_+iNname];
	}
	_['getGlobalApp'] = getGlobalApp;

	function setGlobalApp(iNapp){

		if( typeof window[prefixForGlobalVar+iNapp.name] == 'undefined' && typeof iNapp == 'object' && typeof iNapp.name == 'string') {
			window[prefixForGlobalApp_+iNapp.name] = iNapp;
		}
	}
	_['setGlobalApp'] = setGlobalApp;

	function getGlobalVar (iNname) {
		if( typeof window[prefixForGlobalVar+iNname] == 'undefined' )
			return false;
		return window[prefixForGlobalVar+iNname];
	}
	_['getGlobalVar'] = getGlobalVar;

	function setGlobalVar(iNname,iNobject){
		if( typeof window[prefixForGlobalVar+iNname] == 'undefined' && typeof iNobject == 'object' && typeof iNname == 'string') {
			window[prefixForGlobalVar+iNname] = iNobject;
		}
	}
	_['setGlobalVar'] = setGlobalVar;


	//@< work with header
		// var _td_loadCSS  		= VIEW.d_loadCSS;
		// var _td_removeByClass  	= VIEW.d_removeByClass;
		// var _td_loadJS  		= VIEW.d_loadJS;
		// _['d_loadCSS'] = _td_loadCSS;
	//@< work with header


	//@< work with global functions
	function globalFunctions_invoke (iName) {
		if(typeof window.GF == 'object' && typeof window.GF[iName] == 'function') {
			window.GF[iName]();
			return true;
		}
		return false;
	}
	_['globalFunctions_invoke'] = globalFunctions_invoke;

	function globalFunctions_create (iName, iNfunction) {
		if(typeof window.GF != 'object') window.GF = {};
		window.GF[iName] = iNfunction;
		return true;
	}
	_['globalFunctions_create'] = globalFunctions_create;
	//@> work with global functions

	return _;
	// {
	// 	'globalFunctions_invoke' : globalFunctions_invoke,
	// 	'globalFunctions_create' : globalFunctions_create,

	//     'openChiefApp'  : _openChiefApp,
	//     'openListApp'   : _openListApp,
	//     'readyListApp'  : _readyListApp,
	//     'readyChiefApp' : _readyChiefApp,
	//     'invokeOpenApp' : _invokeOpenedApp,
	//     'invokeApp' 	: _invokeApp,
	//     'clone' 		: _clone,

	//     'setApp' 		: _setApp,
	//     'setPage' 		: _setPage,
	//     'thisApp' 		: _thisApp,
	//     'thisPage' 		: _thisPage, 

	//     'd_hidePages'   : _td_hidePages,
	//     'd_showPages'   : _td_showPages,
	//     'd_hideApps'    : _td_hideApps,
	//     'd_showApps'    : _td_showApps,
	//     'd_openPage'    : _td_openPage,

	//     //work with header
	//     'd_loadCSS' 		: _td_loadCSS,
	//     'd_loadJS' 			: _td_loadJS,
	//     'd_removeByClass' 	: _td_removeByClass,
	// 	'addScript' 		: _addScript,

	//     //  time functions
	//     'getSec' : _getSec,
	// 	'getTime' : _getTime,

	// 	//  local storage
	// 	'save' : _save,
	// 	'get' : _get,
	// 	'del' : _del,
	// 	'clear' : _clear,

	// 	//  object functions
	// 	'getJsonKey' : _getJsonKey,
	// 	'getJsonKeys' : _getJsonKeys,
	// 	'forEach' : _forEach,

	// 	//  audio functions
	// 	'playSound' : _playSound,
	// 		'addSource' : addSource,


	// 	//  global resourse
	// 	'setGlobalApp' : setGlobalApp,
	// 	'setGlobalVar' : setGlobalVar,
	// 	'getGlobalVar' : getGlobalVar,
	// 	'getGlobalApp' : getGlobalApp,

	// 	'view' : VIEW
	// }
});