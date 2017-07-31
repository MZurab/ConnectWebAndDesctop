define(['jquery','template7','v_view'],function($,Template7,v_view){
	let CONSTANTS = {
		'pathAppHeader' 	  : '#block #viewBlock .topBlockInViewBlock',
		'nameInAppHeader' 	  : 'appHeaderInChiefBlock', // class
		'pageNameInAppHeader' : 'appPage',// class

		'pathMenuHeader' 	  : '#block #menusBlock .topBlockInMenusBlock',
		'nameInMenuHeader' 	  : 'menuHeaderInMenusBlock', // class
		'pageNameInMenuHeader': 'appPage', // class


	};
	// appName -> String, views -> array of objects {viewName,viewContent}
	var templates = {};
		
		templates['chiefForAppInList'] = `
			<div class='app' app-name='{{app}}'>
			  {{#if page}}
		          <div class='view' view-name='{{page}}'>
		          	{{content}}
		          </div>
	          {/if}
	          {{other}}
	        </div>
	    `;
	    templates['pageForAppInList'] = `
	    		{{before}}
	    		<div class='view {{class}}' view-name='{{page}}' {{attr}}>
		          	{{content}}
		        </div>
		        {{after}}
	    `;

	    //< templates for header
		    templates['appContentChiefHeader'] = `
				<div class="`+ CONSTANTS['nameInAppHeader'] +`" app-name="{{app}}">
					{{#if page}}
						<div class='`+ CONSTANTS['pageNameInAppHeader'] +`' page-name="{{page}}">
							{{content}}
						</div>
					{{else}}
						{{content}}
					{{/if}}
				</div>
		    `;
			    templates['pageContentChiefHeader'] = `
					<div class='`+ CONSTANTS['pageNameInAppHeader'] +`' page-name="{{page}}">
						{{content}}
					</div>
			    `;
		    templates['appContentMenuHeader'] = `
				<div class="`+ CONSTANTS['nameInMenuHeader'] +`" app-name="{{app}}">
					{{#if page}}
						<div class='`+ CONSTANTS['pageNameInMenuHeader'] +`' page-name="{{page}}">
							{{content}}
						</div>
					{{else}}
						{{content}}
					{{/if}}
				</div>
		    `;
			    templates['pageContentMenuHeader'] = `
					<div class='`+ CONSTANTS['pageNameInMenuHeader'] +`'  page-name="{{page}}">
					    {{content}}
					</div>
			    `;
	    //> templates for header

	    
	    //< template for modal window

	   
    function _getListApp (iNdata) {
    	/*
    		@inputs
    			@required
        			iNdata -> object
        				app  -> String
						@optional
							page 	-> String {chain #1}
							content -> String {chain #1}
							after 	-> String 
							before 	-> String 
							class 	-> String 

			@deps
				View_listViews : var
    	*/
    	getAttrAndClassForAppAndPage(iNdata);
    	var temp = Template7.compile(View_listViews);
    	return temp(iNdata);
    };
    function _getPageForListApp (iNdata) {
    	/*
			@discr
				get page for list app by object (iNdata)
			@inputs
				@required
					iNdata -> object
						page 		-> string
						content 	-> string
						@optional
							after 	-> String 
							before 	-> String 
							class 	-> String 
				@optional
		*/
		getAttrAndClassForAppAndPage(iNdata);
		var temp = Template7.compile(templates['pageForAppInList']);
		return temp(iNdata);
    }

    function _d_updatePageInListApp (iNdata) {
    	/*
			@discr
				update page in list app by object (iNdata)
			@inputs
				@required
					iNdata -> object
						app 		-> string
						page 		-> string
						content 	-> string
						html 		-> string
						@optional
							extra		-> string
				@optional
		*/
		var selector = '.usersBlockContainerInMenusBlock .app[app-name="'+iNdata['app']+'"] .view[view-name="'+iNdata['page']+'"]';
		if(typeof(iNdata['extra']) == 'string') selector += ' ' + iNdata['extra'];
    	$(selector).html(iNdata['html']);
    }
    function _d_clearPageInListApp (iNdata) {
    	/*
			@discr
				clear page in list app by object (iNdata)
			@inputs
				@required
					iNdata -> object
						app 		-> string
						page 		-> string
						content 	-> string
						@optional
							extra		-> string
				@optional
			@deps
				function : _d_updatePageInListApp
		*/
		iNdata['html'] = '';
		_d_updatePageInListApp(iNdata);
    }

    function _d_checkPageInListApp (iNdata) {
    	/*
			@discr
				update isset page in list app by object (iNdata)
			@inputs
				@required
					iNdata -> object
						page 		-> string
						app 	-> string
						@optional
							extra		-> string
				@optional
			@return
				int : 0 - false, 0< true
		*/
		var selector = '.usersBlockContainerInMenusBlock .app[app-name="'+iNdata['app']+'"] .view[view-name="'+iNdata['page']+'"]';
		if(typeof(iNdata['extra']) == 'string') selector += ' ' + iNdata['extra'];
    	return $(selector).length;
    }

    function _d_checkListApp (iNdata) {
    	/*
			@discr
				check isset list app by object (iNdata)
			@inputs
				@required
					iNdata -> object
						app 	-> string
						@optional
							extra		-> string
				@optional
			@return
				int : 0 - false, 0< true
		*/
		var selector = '.usersBlockContainerInMenusBlock .app[app-name="'+iNdata['app']+'"]';
		if(typeof(iNdata['extra']) == 'string') selector += ' ' + iNdata['extra'];
    	return $(selector).length;
    }
	
	function _d_createPageInListApp (iNdata) {
    	/*
			@discr
				create page for list app
			@inputs
				@required
					iNdata -> object
						app 		-> string
						page 		-> string
						content 	-> string
						@optional
							attr		-> string
							extra		-> string 
				@optional
			@return
				int : 0 - false, 0< true
		*/
		// if we have app

		
		var selector = '.usersBlockContainerInMenusBlock .app[app-name="'+iNdata['app']+'"] ';
		if(typeof(iNdata['extra']) == 'string') selector += ' ' + iNdata['extra'];
    	v_view.addDataToViewEl(selector, _getPageForListApp(iNdata) ,'change')
    }

    function _d_createListApp (iNdata) {
    	/*
			@discr
				create list app [@optional - with page]
			@inputs
				@required
					iNdata -> object
						app 		-> string
						@optional
							page 		-> string
							content 	-> string
							attr		-> object
								class		-> string
							before		-> string 
							after		-> string 

							extra		-> string 
				@optional
			@return
				int : 0 - false, 0< true
		*/
		var selector = '.usersBlockContainerInMenusBlock'; 
		if(typeof(iNdata['extra']) == 'string') selector += ' ' + iNdata['extra'];
		getAttrAndClassForAppAndPage(iNdata);
    	v_view.addDataToViewEl(selector, _getListApp(iNdata) ,'change')
    }



    var View_chiefForAppInChief = `
			<div class="viewesInWindow app {{class}}" app-name="{{app}}" {{attr}}>
			   {{other}}
	        </div>
        `;
        /*
	        {{#if page}}
	           <div class="view" view-name="{{page}}" {{attr}}>
	        		{{content}}
	        	</div>
	    	{{/if}}
    	*/
        var View_pageForAppInChief = `
	        <div class="view {{class}}" view-name="{{page}}" {{attr}}>
	        	{{content}}
	        </div>
        `;//id="leftBlockInViewWindow"
		function _getChiefApp (iNdata) {
			/*
				@discr
					get app template by object (iNdata) [with page] [with other] [withoout content]
					if isset page create with page
					else if isset other created with data
					else simple create app container
				@inputs
					@required
						iNdata -> object
							@required
								app -> string
							@optional
								content -> string
								page 	-> string
								other 	-> string
								attr 	-> object
									class 	-> string OR array
					@optional
				@deps
					function: getAttrAndClassForAppAndPage
					object: Template7
				*/
			getAttrAndClassForAppAndPage(iNdata);
			var temp = Template7.compile(View_chiefForAppInChief);
			return temp(iNdata);
		}
		function _getPageForChiefApp (iNdata) {
			/*
				@discr
					get page for app by object (iNdata)
				@inputs
					@required
						iNdata -> object
							page 		-> string
							content 	-> string
							@otional
								attr 	-> object
									class 	-> string OR array
					@optional
				@deps
					function: getAttrAndClassForAppAndPage
					object: Template7
			*/

			getAttrAndClassForAppAndPage(iNdata);
			var temp = Template7.compile(View_pageForAppInChief);
			return temp(iNdata);
		}
			function getAttrAndClassForAppAndPage (iNdata) {
				/*
					@example
						getAttrAndClassForAppAndPage({
							attr: { 
								'class' : ['myNewClass'],
								'attrName' : 'attrValue'
							}
						});
					@discr
						get page for app by object (iNdata)
					@inputs
						@required
						@optional
							iNdata -> object
								attr 		-> string
						@optional
					@return 
						void [result = to iNdata right date]
				*/
				var attrString = '',classString = '', attrArray = iNdata['attr'],thisValue;
				if( typeof(iNdata['attr']) == 'object' ) {
					for (var iKey in attrArray ) {
						if( iKey == 'class' ) {
							// add class 
							if( typeof(attrArray[iKey]) == 'string') 
								attrArray[iKey] = [attrArray[iKey]];
							classString += ' ' + attrArray[iKey].join(' ');
						} else {
							//add attr
							attrString +=  iKey + "='" + attrArray[iKey] + "'";
						}
					}
				}
				iNdata['class'] = classString; iNdata['attr'] = attrString;
			}
		function _d_updatePageInChiefApp (iNdata) {
        	/*
				@discr
					update page in chieft app by object (iNdata)
				@inputs
					@required
						iNdata -> object
							app 		-> string
							page 		-> string
							content 	-> string
							@optional
								extra		-> string
					@optional
			*/
			var selector = '#viewWindow .app[app-name="'+iNdata['app']+'"] .view[view-name="'+iNdata['page']+'"]';
			if(typeof(iNdata['extra']) == 'string') 	selector += ' ' + iNdata['extra'];
        	$(selector).html(iNdata['content']);
        	console.log('_d_updatePageInChiefApp selector',selector);

        }
        function _d_clearPageInChiefApp (iNdata) {
        	/*
				@discr
					clear page for chief app by object (iNdata)
				@inputs
					@required
						iNdata -> object
							app 		-> string
							page 		-> string
							content 	-> string
							@optional
								extra		-> string
					@optional
				@deps
					function : _d_updatePageInChiefApp
			*/
        	iNdata['content'] = '';
			_d_updatePageInChiefApp(iNdata);
        }

        function _d_checkPageInChiefApp (iNdata) {
        	/*
				@discr
					get isset page lengthin chief app by object (iNdata)
				@inputs
					@required
						iNdata -> object
							page 		-> string
							app 		-> string
							@optional
								extra		-> string
					@optional
				@return
					int : 0 - false, 0< true
			*/
			var selector = '#viewWindow .app[app-name="'+iNdata['app']+'"] .view[view-name="'+iNdata['page']+'"]';
			if(typeof(iNdata['extra']) == 'string') selector += ' ' + iNdata['extra'];
			console.log('_d_checkPageInChiefApp selector',selector);
			console.log('_d_checkPageInChiefApp selector length',$(selector).length);
        	return $(selector).length;
        }

        function _d_checkChiefApp (iNdata) {
        	/*
				@discr
					check isset chief app by object (iNdata)
				@inputs
					@required
						iNdata -> object
							app 	-> string
							@optional
								extra		-> string
					@optional
				@return
					int : 0 - false, 0< true
			*/
			var selector = '#viewWindow .app[app-name="'+iNdata['app']+'"]';
			if(typeof(iNdata['extra']) == 'string') selector += ' ' + iNdata['extra'];
        	return $(selector).length;
        }
		
		function _d_createPageInChiefApp (iNdata ) {
        	/*
				@discr
					create page for chief app
				@inputs
					@required
						iNdata -> object
							app 		-> string
							page 		-> string
							content 	-> string
							@optional
								attr	-> object
									class	-> 
									attrKey : attrBalue
								extra	-> string 
					@optional
				@deps
					function : _getPageForChiefApp
				@return
					int : 0 - false, 0< true
			*/
			var selector = '#viewWindow .app[app-name="'+iNdata['app']+'"] ';
			if(typeof(iNdata['extra']) == 'string') selector += ' ' + iNdata['extra'];
        	v_view.d_addDataToViewEl(selector, _getPageForChiefApp(iNdata) ,'end')
        }
        
        function _d_createChiefApp (iNdata) {
        	/*
				@discr
					create chief app [@optional - with page]
				@inputs
					@required
						iNdata -> object
							app 		-> string
							@optional
								page 		-> string
								content 	-> string

								attr		-> string
								extra		-> string

								other
					@optional
				@return
					int : 0 - false, 0< true
			*/
			var selector = '#viewWindow'; 
			if(typeof(iNdata['extra']) == 'string') selector += ' ' + iNdata['extra'];
        	v_view.d_addDataToViewEl(selector, _getChiefApp(iNdata) ,'change')
        }
        //< app headers
	        
        	function _d_hideAppHeader (iNdata) {
	        	/*
	        		@discr
	        			hide app page of header
	        		@inputs
	        			iNdata -> object
	        				app  -> string
	        	*/
	        	$( 
	        		CONSTANTS['pathAppHeader'] + ' ' 	+ 
	        		'.'+CONSTANTS['nameInAppHeader'] 	+
        			'[app-name="' + iNdata['app'] + '"]'
        		).hide();
	        }
		        function _d_hideAppPagesHeader (iNdata) {
		        	/*
		        		@discr
		        			hide app page of header
		        		@inputs
		        			iNdata -> object
		        				app  -> string
		        	*/
		        	$( 
		        		CONSTANTS['pathAppHeader'] + ' ' 		+ 
		        		'.'+CONSTANTS['nameInAppHeader'] 		+
	        			'[app-name="' + iNdata['app'] + '"] '	+
	        			'.'+CONSTANTS['pageNameInAppHeader']
	        		).hide();
		        }
	        function _d_showAppHeader (iNdata) {
	        	/*
	        		@discr
	        			show app of header
	        		@inputs
	        			iNdata -> object
	        				app  -> string
	        	*/
	        	$( 
	        		CONSTANTS['pathAppHeader'] + ' ' 		+ 
	        		'.'+CONSTANTS['nameInAppHeader']  		+
	        		'[app-name="'+ iNdata['app'] +'"]' 
        		).show();
	        }
		        function _d_showAppPageHeader (iNdata) {
		        	/*
		        		@discr
		        			show app of header
		        		@inputs
		        			iNdata -> object
		        				app  -> string
		        				page -> string
		        	*/
		        	$(
		        		CONSTANTS['pathAppHeader'] + ' ' 		+ 
		        		'.'+CONSTANTS['nameInAppHeader']  		+
		        		'[app-name="'+ iNdata['app'] +'"]' + ' '+ 
		        		'.'+CONSTANTS['pageNameInAppHeader']  +
		        		'[page-name="'+ iNdata['page'] +'"]' 
	        		).show();
		        }
            function _d_viewAppPageHeader (iNdata) {
	        	/*
	        		@discr
	        			wathc app page of header
	        		@inputs
	        			iNdata -> object
	        				app  -> string
	        				page -> string
	        	*/
	        	// hide apps
	        	_d_hideAppHeader(iNdata);

	        	// show this app
	        	_d_showAppHeader(iNdata); 

				// hide other pages app
	        	_d_hideAppPagesHeader(iNdata);

	        	// show this page
	        	_d_showAppPageHeader(iNdata); 
	        }
	        function _d_setAppHeader (iNcontent) {
	        	/*
	        		@discr
	        			set content for app into header block
	        		@inputs
	        			iNcontent -> string
	        	*/
	        	$( CONSTANTS['pathAppHeader'] + ' .topBlockInViewBlock' ).html(iNcontent);
	        }
	       	function _getAppHeader (iNdata) {
	        	/*
	        		@discr
	        			get content for app headery by template
	        		@inputs
	        			iNdata -> object
	        				@required
	        					app
	        				@optional
	        					page
	        					content
	        					attr
				*/
        		var temp = Template7.compile(templates['appContentChiefHeader']);
        		return temp(iNdata)
        	}

        	function _getPageAppHeader (iNdata) {
	        	/*
	        		@discr
	        			get content for app menu headery by template
	        		@inputs
	        			iNdata -> object
	        				@required
	        					page
	        					content
	        				@optional
				*/
        		var temp = Template7.compile(templates['pageContentChiefHeader']);
        		return temp(iNdata)
        	}
        function _d_addAppHeaderByTemplate (iNdata) {
        	/*
        		@discr
        			add content for app into  header block by template
        		@inputs
        			iNdata -> object
        	*/
        	var selector = CONSTANTS['pathAppHeader'],
        		content = _getAppHeader(iNdata);
			v_view.addDataToViewEl(selector, _getPageForListApp(content) ,'end');
        }
        function _d_addPageAppHeaderByTemplate (iNdata) {
        	/*
        		@discr
        			add content with page for app into  header block by template
        		@inputs
        			iNdata -> object
        				app
        				page
        				content
        	*/
        	var selector = CONSTANTS['pathAppHeader'] + ' .' + CONSTANTS['nameInAppHeader']+'[app-name="'+iNdata['app']+'"]',
        		content = _getPageAppHeader(iNdata);
			v_view.addDataToViewEl(selector, _getPageForListApp(content) ,'end');
        }


	        function _d_hideMenuHeader (iNdata) {
	        	/*
	        		@discr
	        			hide app page of header
	        		@inputs
	        			iNdata -> object
	        				app  -> string
	        	*/
	        	$( 
	        		CONSTANTS['pathMenuHeader'] + ' ' 	+ 
	        		'.'+CONSTANTS['nameInMenuHeader'] 	+
        			'[app-name="' + iNdata['app'] + '"]'
        		).hide();
	        }
		        function _d_hideMenuPagesHeader (iNdata) {
		        	/*
		        		@discr
		        			hide app page of header
		        		@inputs
		        			iNdata -> object
		        				app  -> string
		        	*/
		        	$( 
		        		CONSTANTS['pathMenuHeader'] + ' ' 		+ 
		        		'.'+CONSTANTS['nameInMenuHeader'] 			+
	        			'[app-name="' + iNdata['app'] + '"] '	+
	        			'.'+CONSTANTS['pageNameInMenuHeader']
	        		).hide();
		        }
	        function _d_showMenuHeader (iNdata) {
	        	/*
	        		@discr
	        			show app of menu header
	        		@inputs
	        			iNdata -> object
	        				app  -> string
	        	*/
	        	$( 
	        		CONSTANTS['pathMenuHeader'] + ' ' 		+ 
	        		'.'+CONSTANTS['nameInMenuHeader']  		+
	        		'[app-name="'+ iNdata['app'] +'"]' 
        		).show();
	        }
		        function _d_showMenuPageHeader (iNdata) {
		        	/*
		        		@discr
		        			show app of menu header
		        		@inputs
		        			iNdata -> object
		        				app  -> string
		        				page -> string
		        	*/
		        	$(
		        		CONSTANTS['pathMenuHeader'] + ' ' 		+ 
		        		'.'+CONSTANTS['nameInMenuHeader']  		+
		        		'[app-name="'+ iNdata['app'] +'"]' + ' '+ 
		        		'.'+CONSTANTS['pageNameInMenuHeader']  +
		        		'[page-name="'+ iNdata['page'] +'"]' 
	        		).show();
		        }
            function _d_viewMenuPageHeader (iNdata) {
	        	/*
	        		@discr
	        			wathc app page of menu header
	        		@inputs
	        			iNdata -> object
	        				app  -> string
	        				page -> string
	        	*/
	        	// hide apps
	        	_d_hideMenuHeader(iNdata);

	        	// show this app
	        	_d_showMenuHeader(iNdata); 

				// hide other pages app
	        	_d_hideMenuPagesHeader(iNdata);

	        	// show this page
	        	_d_showMenuPageHeader(iNdata); 
	        }
	        function _d_setMenuHeader (iNcontent) {
	        	/*
	        		@discr
	        			set content for app into menu header block
	        		@inputs
	        			iNcontent -> string
				*/
	        	$( CONSTANTS['pathMenuHeader']).html(iNcontent);
	        }
	        	function _getAppMenuHeader (iNdata) {
		        	/*
		        		@discr
		        			get content for app menu headery by template
		        		@inputs
		        			iNdata -> object
		        				@required
		        					app
		        				@optional
		        					page
		        					content
		        					attr
					*/
	        		var temp = Template7.compile(templates['appContentMenuHeader']);
	        		return temp(iNdata)
	        	}

	        	function _getPageMenuHeader (iNdata) {
		        	/*
		        		@discr
		        			get content for app menu headery by template
		        		@inputs
		        			iNdata -> object
		        				@required
		        					page
		        					content
		        				@optional
					*/
	        		var temp = Template7.compile(templates['pageContentMenuHeader']);
	        		return temp(iNdata)
	        	}
	        function _d_addAppMenuHeaderByTemplate (iNdata) {
	        	/*
	        		@discr
	        			add content for app into menu header block by template
	        		@inputs
	        			iNdata -> object
	        	*/
	        	var selector = CONSTANTS['pathMenuHeader'],
	        		content = _getAppMenuHeader(iNdata);
				v_view.addDataToViewEl(selector, _getPageForListApp(content) ,'end');
	        }
	        function _d_addPageMenuHeaderByTemplate (iNdata) {
	        	/*
	        		@discr
	        			add content with page for app into menu header block by template
	        		@inputs
	        			iNdata -> object
	        				app
	        				page
	        				content
	        	*/
	        	var selector = CONSTANTS['pathMenuHeader'] + ' .' + CONSTANTS['nameInMenuHeader']+'[app-name="'+iNdata['app']+'"]',
	        		content = _getPageMenuHeader(iNdata);
				v_view.addDataToViewEl(selector, _getPageForListApp(content) ,'end');
	        }
        //> app headers

        function _d_showApps (iNarray,iNtypeApp) {
        	/*
        		@example
        			d_showApps(['chat'],'chief')
        			d_showApps('chat') == d_showApps('chat','chief')
        		@disc
					did show apps in passed by 1st argument as string or array (multu effect) and by 2nd argument in Chief (default) or List container
        		@input
        			@required
	        			iNarray -> array || string
	        				(array)
	        					namesOfApp
	    					(stirng)
	    						nameOfApp
					@optional
						iNtypeApp -> string [chief || list]
							{DEFAULT - chief}
				@return
				@deps
        	*/
        	var selector, appNameForIletiral;

        	if( typeof(iNtypeApp) != 'string' || iNtypeApp == 'chief') selector = '#viewWindow .app'
        	else selector = '.usersBlockContainerInMenusBlock .app'
    		if(typeof(iNarray) !=  'object' || Array.isArray(iNarray) != true) iNarray = [iNarray];
    		for (var iKey in iNarray) {
    			appNameForIletiral = iNarray[iKey];
    			$(selector + '[app-name="' + appNameForIletiral + '"]').show();
    		}
        }
        function _d_hideApps (iNarray,iNtypeApp) {
        	/*
        		@example
        			_d_hideApps(['chat'],'chief')
        			_d_hideApps('chat') == d_showApps('chat','chief')
        			_d_hideApps() 		== d_showApps('all','chief')
        		@disc
					did show apps in passed by 1st argument as string or array (multu effect) and by 2nd argument in Chief (default) or List container
        		@input
        			@required
	        			iNarray -> array || string
	        				(array)
	        					namesOfApp
	    					(stirng)
	    						nameOfApp
    						Default [all]
					@optional
						iNtypeApp -> string [chief || list]
							{DEFAULT - chief}
				@return
				@deps
        	*/
        	var selector, appNameForIletiral,thisSelector;

        	if( typeof(iNtypeApp) != 'string' || iNtypeApp == 'chief') selector = '#viewWindow .app';
        	if( typeof(iNarray) != 'string' && typeof(iNarray) != 'object' ) iNarray = 'all';
        	else selector = '.usersBlockContainerInMenusBlock .app'
    		if(typeof(iNarray) !=  'object' || Array.isArray(iNarray) != true) iNarray = [iNarray];
    		for (var iKey in iNarray) {
    			thisSelector = selector
    			appNameForIletiral = iNarray[iKey];
    			if(appNameForIletiral != 'all') {
    				thisSelector += '[app-name="' + appNameForIletiral + '"]';
    			}
    			$(thisSelector).hide();
    		}
        }
		function _d_showPages (iNapp,iNarray,iNtypeApp) {
			/*
        		@example
        			_d_showPages('chat',['private'],'chief')
        			d_showPages('chat','private') == _d_showPages('chat','chief')
        		@disc
					did show page of apps in passed by 1nd argument as string name of app, by 2nd argument as string or array (multu effect) and by 3d argument in Chief (default) or List container
        		@input
        			@required
        				iNapp -> string
	        			iNarray -> array || string
	        				(array)
	        					namesOfApp
	    					(stirng)
	    						nameOfApp
					@optional
						iNtypeApp -> string [chief || list]
							{DEFAULT - chief}
				@return
				@deps
					function : d_showApps
        	*/
        	var selector, appName, pageNameForIletiral;
        	// show app
        	_d_showApps(iNapp,iNtypeApp)
        	// choose list of chief container
        	if( typeof(iNtypeApp) != 'string' || iNtypeApp == 'chief') selector = '#viewWindow .app'
        	else selector = '.usersBlockContainerInMenusBlock .app'
    		// create array if need with page names for show
    		if(typeof(iNarray) !=  'object' || Array.isArray(iNarray) != true) iNarray = [iNarray];
    		for (var iKey in iNarray) {
    			pageNameForIletiral = iNarray[iKey];
    			$(selector + '[app-name="' + appName + '"] .view[view-name="'+pageNameForIletiral+'"]').show();
    		}
    	}
    	function _d_viewPage (iNdata) {
    		/*
        		@example
        			_d_openPage('chat','index')
        		@disc
					open page with hide all other app and other pages in this app
				@input
        			@required
        				iNdata -> object
	        				app -> string
	        				page -> string
							@optional
								type -> string
									by default 'chief' OR 'list'

				@return
				@algoritm
					#0 set default values if need
					#1 hide all pages in this app
					#2 show this page in this app
				@deps
					function : _d_showPages
					function : _d_hidePages
        	*/
        	if(typeof(iNdata['type']) != 'string' || iNdata['type'] != 'list') iNdata['type'] = 'chief'
        	// _d_hidePages(iNdata['app'],'all',iNdata['type']);
        	_d_showPages(iNdata['app'],iNdata['page'],iNdata['type']);
		}
		function _d_viewApp (iNdata) {
    		/*
        		@example
        			_d_viewApp('chat','index','chief')
        			_d_viewApp('chat','index')
        		@disc
					open page with hide all other app and other pages in this app
				@input
        			@required
        				iNdata
	        				app -> string
						@optional
							type -> string
								by default 'chief' OR 'list'

				@return
				@algoritm
					#0 set default values if need
					#1 hide all apps
					#2 show this app
				@deps
					function : _d_hideApps
					function : _d_showApps
        	*/
        	if(typeof(iNdata['type']) != 'string' || iNdata['type'] != 'list') iNdata['type'] = 'chief'
        	// _d_hideApps('all',iNdata['type']);
        	_d_showApps(iNdata['app'],iNdata['type']);
		}
        function _d_hidePages (iNapp,iNarray,iNtypeApp) {
        	/*
        		@example
        			_d_hidePages('chat',['private'],'chief')
        			_d_hidePages('chat','private') == _d_hidePages('chat','chief')
        			_d_hidePages('chat') == _d_hidePages('chat','all')
        		@disc
					did hide page of apps in passed by 1nd argument as string name of app, by 2nd argument as string or array (multu effect) and by 3d argument in Chief (default) or List container
        		@input
        			@required
        				iNapp -> string
	        			iNarray -> array || string
	        				(array)
	        					namesOfApp
	    					(stirng)
	    						nameOfApp
					@optional
						iNtypeApp -> string [chief || list]
							{DEFAULT - chief}
				@return
				@deps
					function : _d_hideApps
        	*/
        	var selector, appName, pageNameForIletiral, thisSelector;
        	// show app
        	_d_hideApps(iNapp,iNtypeApp)
        	// choose list of chief container
        	if( typeof(iNtypeApp) != 'string' || iNtypeApp == 'chief') selector = '#viewWindow .app';
        	if( typeof(iNarray) != 'string' || typeof(iNarray) == 'object') iNarray = 'all';
        	else selector = '.usersBlockContainerInMenusBlock .app'
    		// create array if need with page names for show
    		if(typeof(iNarray) !=  'object' || Array.isArray(iNarray) != true) iNarray = [iNarray];

    		selector += '[app-name="' + appName + '"] .view';
    		for (var iKey in iNarray) {
    			thisSelector = selector;
    			pageNameForIletiral = iNarray[iKey];
    			if(pageNameForIletiral != 'all') {
    				thisSelector += '[view-name="'+pageNameForIletiral+'"]';
    			}
    			$(thisSelector).hide();
    		}
    			
        }

		

		//@> work with templates from app
	 		function getTemplate (iNapp) {
				if(typeof(iNapp.templates) == 'object')
					return iNapp.templates;
				return false;
			}
			function getPageTemplate (iNapp) {
				var template = getTemplate(iNapp);
				if(typeof(template['page']) == 'object')
					return template['page'];
				return false;
			}
			
			function _getPageMenuTemplate (iNapp,iName) {
				var pageTemplate = getPageTemplate(iNapp);
				if( typeof pageTemplate['menu'] == 'object' && typeof pageTemplate['menu'][iName] != 'undefined')
					return pageTemplate['menu'][iName];
				return false;
			}
			function _getPageViewTemplate (iNapp,iName) {
				var pageTemplate = getPageTemplate(iNapp);
				if(typeof(pageTemplate['view']) == 'object' && typeof(pageTemplate['view'][iName]) != 'undefined')
					return pageTemplate['view'][iName];
				return false;
			}
			function _getAppTemplate (iNapp,iName) {
				var template = getTemplate(iNapp);
				if(typeof(template['app']) == 'object' && typeof(pageTemplate['app'][iName]) != 'undefined')
					return template['app'];
				return false;
			}
		//@>  work with templates  from app



		


		//@< work with header
			function _d_loadCSS (filename,iNclass){ 
				var file = document.createElement("link");
			   file.setAttribute("rel", "stylesheet");
			   file.setAttribute("type", "text/css");
			   file.setAttribute("href", filename);
			  fileref.setAttribute("class", iNclass);
			   document.head.appendChild(file);
			}
			function _d_loadJS (filename,iNclass) { 
			  var fileref=document.createElement('script');
			  fileref.setAttribute("type","text/javascript");
			  fileref.setAttribute("src", filename);
			  fileref.setAttribute("class", iNclass);
			  document.getElementsByTagName("head")[0].appendChild(fileref);

			}
			function _d_removeByClass (iNclass) {
				$('.'+iNclass).remove();
			}
		//@> work with header
        return {
    	  // functions for work with template
    	  	'getAppTemplate'		: _getAppTemplate,
    	  	'getPageViewTemplate'	: _getPageViewTemplate,
    	  	'getPageMenuTemplate'	: _getPageMenuTemplate,

		  // functions for list app
		    'getListApp'            : _getListApp,
		    'getPageForListApp'     : _getPageForListApp,
		    'd_updatePageInListApp' : _d_updatePageInListApp,
		    'd_clearPageInListApp'  : _d_clearPageInListApp,
		    'd_checkPageInListApp'  : _d_checkPageInListApp,
		    'd_checkListApp'        : _d_checkListApp,
		    'd_createPageInListApp' : _d_createPageInListApp,
		    'd_createListApp'       : _d_createListApp,

		  // functions for chief app
		    'getChiefApp'           : _getChiefApp,
		    'getPageForChiefApp'    : _getPageForChiefApp,
		    'd_updatePageInChiefApp': _d_updatePageInChiefApp,
		    'd_clearPageInChiefApp' : _d_clearPageInChiefApp,
		    'd_checkPageInChiefApp' : _d_checkPageInChiefApp,
		    'd_checkChiefApp'       : _d_checkChiefApp,
		    'd_createPageInChiefApp': _d_createPageInChiefApp,
		    'd_createChiefApp'      : _d_createChiefApp,

		   // effect functions for chief and list apps
		    'd_showApps'            : _d_showApps,
		    'd_hideApps'            : _d_hideApps,
		    'd_showPages'           : _d_showPages,
		    'd_hidePages'           : _d_hidePages,
		    'd_viewPage'            : _d_viewPage,
		    'd_viewApp'             : _d_viewApp,


	       //< functions for headers
		    	//app menu header
				    'd_addPageMenuHeaderByTemplate'		: _d_addPageMenuHeaderByTemplate,
				    'd_addAppMenuHeaderByTemplate'		: _d_addAppMenuHeaderByTemplate,
				    'getPageMenuHeader'           		: _getPageMenuHeader,
				    'getAppMenuHeader'           		: _getAppMenuHeader,
				    'd_setMenuHeader'            		: _d_setMenuHeader,
				    'd_viewMenuPageHeader' 				: _d_viewMenuPageHeader,
				    'd_showMenuPageHeader' 				: _d_showMenuPageHeader,
				    'd_showMenuHeader'            		: _d_showMenuHeader,
				    'd_hideMenuPagesHeader'           	: _d_hideMenuPagesHeader,
				    'd_hideMenuHeader'          		: _d_hideMenuHeader,

		    	//app header
				    'd_addPageAppHeaderByTemplate'		: _d_addPageAppHeaderByTemplate,
				    'd_addAppHeaderByTemplate'			: _d_addAppHeaderByTemplate,
				    'getPageAppHeader'           		: _getPageAppHeader,
				    'getAppHeader'           			: _getAppHeader,
				    'd_setAppHeader'            		: _d_setAppHeader,
				    'd_viewAppPageHeader' 				: _d_viewAppPageHeader,
				    'd_showAppPageHeader' 				: _d_showAppPageHeader,
				    'd_showAppHeader'            		: _d_showAppHeader,
				    'd_hideAppPagesHeader'           	: _d_hideAppPagesHeader,
				    'd_hideAppHeader'          			: _d_hideAppHeader,
	       //> functions for headers

			//work with header
				'd_loadCSS' 		: _d_loadCSS,
				'd_loadJS' 			: _d_loadJS,
				'd_removeByClass' 	: _d_removeByClass,

		}

});