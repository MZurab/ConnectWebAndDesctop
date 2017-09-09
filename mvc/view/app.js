define(['jquery','template7','v_view'],function($,Template7,V_VIEW){
	let CONST = {
		'pathAppHeader' 	  : '#block #viewBlock .topBlockInViewBlock',
		'pathAppView' 	  	  : '#block #viewBlock #viewAndChatBlockInViewBlock.appChiefWindow',
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
	          {{/if}}
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
				<div class="`+ CONST['nameInAppHeader'] +`" app-name="{{app}}">
					{{#if page}}
						<div class='`+ CONST['pageNameInAppHeader'] +`' page-name="{{page}}">
							{{content}}
						</div>
					{{else}}
						{{other}}
					{{/if}}
				</div>
		    `;
			    templates['pageContentChiefHeader'] = `
					<div class='`+ CONST['pageNameInAppHeader'] +`' page-name="{{page}}">
						{{content}}
					</div>
			    `;
		    templates['appContentMenuHeader'] = `
				<div class="`+ CONST['nameInMenuHeader'] +`" app-name="{{app}}">
					{{#if page}}
						<div class='`+ CONST['pageNameInMenuHeader'] +`' page-name="{{page}}">
							{{content}}
						</div>
					{{else}}
						{{other}}
					{{/if}}
				</div>
		    `;
			    templates['pageContentMenuHeader'] = `
					<div class='`+ CONST['pageNameInMenuHeader'] +`'  page-name="{{page}}">
					    {{content}}
					</div>
			    `;

	    templates['chiefForAppInView'] = `
			<div class='viewesInWindow app {{class}}' app-name='{{app}}' {{attr}}>
				  {{other}}
			</div>
		`;
		/* DELETED because this twart for auto add page attr when app not exist
			{{#if page1}}
				  {{if content}}
			    <div class='view' view-name='{{page}}'>{{content}}</div>
			  {{/if}}
			{{/if}}
	  	*/
	    templates['pageForAppInView'] = `
	          <div class='view {{class}}' view-name='{{page}}' {{attr}}>
	          	{{content}}{{other}}
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
				templates['chiefForAppInList'] : var
    	*/
    	getAttrAndClassForAppAndPage(iNdata);
    	var temp = Template7.compile(templates['chiefForAppInList']);
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
						@optional
							extra		-> string
				@optional
		*/
		var selector = '.usersBlockContainerInMenusBlock .app[app-name="'+iNdata['app']+'"] .view[view-name="'+iNdata['page']+'"]';
		if(typeof(iNdata['extra']) == 'string') selector += ' ' + iNdata['extra'];
    	$(selector).html(iNdata['content']);
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
    	V_VIEW.d_addDataToViewEl(selector, _getPageForListApp(iNdata) ,'change');
    }
    
    function addContentToChiefApp (iNdata,iNcontent) {
    	/*
			@discr
				add content to isset in DOM app and page
			@inputs
				@required
					iNdata -> object
						app 		-> string
						page 		-> string
						content 	-> string
						@optional
							type		-> string
				@optional
			@return
		*/
    	var selector = '#viewAndChatBlockInViewBlock .viewesInWindow.app[app-name="'+iNdata['app']+'"] .view[view-name="'+ iNdata['page']+ '"]';
    	if (typeof iNdata['type'] != 'string') iNdata['type']='begin';
    	V_VIEW.d_addDataToViewEl(selector, iNcontent,iNdata['type']);
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
    	V_VIEW.d_addDataToViewEl(selector, _getListApp(iNdata) ,'end');
    }



    
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
			var temp = Template7.compile(templates['chiefForAppInView']);
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
			var temp = Template7.compile(templates['pageForAppInView']);
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
			var selector = CONST['pathAppView'] + ' .app[app-name="'+iNdata['app']+'"] .view[view-name="'+iNdata['page']+'"]';
			if(typeof(iNdata['extra']) == 'string') 	selector += ' ' + iNdata['extra'];
        	$(selector).html(iNdata['content']);

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
			var selector = CONST['pathAppView'] + ' .app[app-name="'+iNdata['app']+'"] .view[view-name="'+iNdata['page']+'"]';
			if(typeof(iNdata['extra']) == 'string') selector += ' ' + iNdata['extra'];
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
			var selector = CONST['pathAppView'] + ' .app[app-name="'+iNdata['app']+'"]';
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
			var selector = CONST['pathAppView'] + ' .app[app-name="'+iNdata['app']+'"] ';
			if(typeof(iNdata['extra']) == 'string') selector += ' ' + iNdata['extra'];
        	V_VIEW.d_addDataToViewEl(selector, _getPageForChiefApp(iNdata) ,'end')
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

								other -		> string
					@optional
				@return
					int : 0 - false, 0< true
			*/
			var selector = CONST['pathAppView']; 
			if(typeof(iNdata['extra']) == 'string') selector += ' ' + iNdata['extra'];
        	V_VIEW.d_addDataToViewEl(selector, _getChiefApp(iNdata) ,'change')
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
	        		CONST['pathAppHeader'] + ' ' 	+ 
	        		'.'+CONST['nameInAppHeader'] 	+
        			'[app-name="' + iNdata['app'] + '"]'
        		).hide();
	        }
	        function _d_hideAppHeaders (iNdata) {
	        	/*
	        		@discr
	        			hide app page of header
	        		@inputs
	        			iNdata -> object
	        				app  -> string
	        	*/
	        	$( 
	        		CONST['pathAppHeader'] + ' ' 	+ 
	        		'.'+CONST['nameInAppHeader']
        		).hide();
	        }
	        function _d_removeAppHeader (iNdata) {
	        	/*
	        		@discr
	        			hide app page of header
	        		@inputs
	        			iNdata -> object
	        				app  -> string
	        	*/
	        	$( 
	        		CONST['pathAppHeader'] + ' ' 	+ 
	        		'.'+CONST['nameInAppHeader'] 	+
        			'[app-name="' + iNdata['app'] + '"]'
        		).remove();
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
		        		CONST['pathAppHeader'] + ' ' 		+ 
		        		'.'+CONST['nameInAppHeader'] 		+
	        			'[app-name="' + iNdata['app'] + '"] '	+
	        			'.'+CONST['pageNameInAppHeader']
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
	        		CONST['pathAppHeader'] + ' ' 		+ 
	        		'.'+CONST['nameInAppHeader']  		+
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
		        		CONST['pathAppHeader'] + ' ' 		+ 
		        		'.'+CONST['nameInAppHeader']  		+
		        		'[app-name="'+ iNdata['app'] +'"]' + ' '+ 
		        		'.'+CONST['pageNameInAppHeader']  +
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
	        	_d_hideAppHeaders(iNdata);

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
	        	$( CONST['pathAppHeader'] + ' .topBlockInViewBlock' ).html(iNcontent);
	        }
	        function _d_getLengthAppHeader (iNdata) {
	        	/*
	        		@discr
	        			set content for app into header block
	        		@inputs
	        			iNdata -> string
	        				app
        					@optional
	        					page
	        	*/
	        	var selector = CONST['pathAppHeader'] + ' .topBlockInViewBlock .' + CONST['nameInAppHeader'] + '[app-name="'+iNdata['app']+'"]';
	        	if ( typeof iNdata['page'] == 'string' )
	        		selector += '.' + CONST['pageNameInAppHeader'] + '[page-name="'+ iNdata['page'] +'"]';
	        	return $(selector).length;
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
        function _d_addAppHeaderByTemplate (iNdata,iNtype) {
        	/*
        		@discr
        			add content for app into  header block by template
        		@inputs
        			iNdata -> object
        				app 
        				page
        				content
    				iNtype -> string
    					in [end,begin, after, before, change]

        	*/
        	if( typeof iNtype != 'string' ) iNtype = 'end';
        	var selector = CONST['pathAppHeader'],
        		content = _getAppHeader(iNdata);
			V_VIEW.d_addDataToViewEl(selector, content ,iNtype);
        }
        function _d_safeViewAppHeaderWithContent (iNdata,iNtype) {
			/*
				@discr
					add safe content to chief app header and view this
				@inputs
					iNdata -> object
						app
						page
						content
					@optional
					iNtype -> string 
						in [end,begin, after, before, change]
			*/
			if( typeof iNtype != 'string' ) iNtype = 'end';
			_d_safeAddAppHeader(iNdata,iNtype);
			//view this menu 
			_d_viewAppPageHeader(iNdata);
		}
		function _d_safeAddAppHeader (iNdata,iNtype) {
			/*
				@discr
					add safe content to chief app header
				@inputs
					iNdata -> object
						app
						page
						content
					@optional
					iNtype -> string 
						in [end,begin, after, before, change]
			*/
			if( typeof iNtype != 'string' ) iNtype = 'end';
			if( _d_getLengthAppHeader ({'app':iNdata['app']}) < 1 ) {
				// check app container
				_d_addAppHeaderByTemplate(iNdata,iNtype);
			} else if ( typeof iNdata['page'] == 'string' && _d_getLengthAppHeader(iNdata) < 1 ) {
				_d_addPageAppHeaderByTemplate( iNdata,iNtype);
			}

		}
        function _d_addPageAppHeaderByTemplate (iNdata,iNtype) {
        	/*
        		@discr
        			add content with page for app into  header block by template
        		@inputs
        			iNdata -> object
        				app
        				page
        				content
    				@optional
					iNtype -> string 
						in [end,begin, after, before, change]

        	*/
        	if( typeof iNtype != 'string') iNtype = 'end';
        	var selector = CONST['pathAppHeader'] + ' .' + CONST['nameInAppHeader']+'[app-name="'+iNdata['app']+'"]',
        		content = _getPageAppHeader(iNdata);
			V_VIEW.d_addDataToViewEl(selector, _getPageForListApp(content) , iNtype);
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
	        		CONST['pathMenuHeader'] + ' ' 	+ 
	        		'.'+CONST['nameInMenuHeader'] 	+
        			'[app-name="' + iNdata['app'] + '"]'
        		).hide();
	        }
	        function _d_removeMenuHeader (iNdata) {
	        	/*
	        		@discr
	        			hide app page of header
	        		@inputs
	        			iNdata -> object
	        				app  -> string
	        	*/
	        	$( 
	        		CONST['pathMenuHeader'] + ' ' 	+ 
	        		'.'+CONST['nameInMenuHeader'] 	+
        			'[app-name="' + iNdata['app'] + '"]'
        		).remove();
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
		        		CONST['pathMenuHeader'] + ' ' 		+ 
		        		'.'+CONST['nameInMenuHeader'] 			+
	        			'[app-name="' + iNdata['app'] + '"] '	+
	        			'.'+CONST['pageNameInMenuHeader']
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
	        		CONST['pathMenuHeader'] + ' ' 		+ 
	        		'.'+CONST['nameInMenuHeader']  		+
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
		        		CONST['pathMenuHeader'] + ' ' 		+ 
		        		'.'+CONST['nameInMenuHeader']  		+
		        		'[app-name="'+ iNdata['app'] +'"]' + ' '+ 
		        		'.'+CONST['pageNameInMenuHeader']  +
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
	        	$( CONST['pathMenuHeader']).html(iNcontent);
	        }
	        function _d_safeViewMenuHeaderWithContent (iNdata,iNtype) {
				/*
					@discr
						add safe content to menu header and view this
					@inputs
						iNdata -> object
							app
							page
							content
						@optional
						iNtype -> string 
							in [end,begin, after, before, change]
				*/
				if( typeof iNtype != 'string' ) iNtype = 'end';
				_d_safeAddAppMenuHeader(iNdata,iNtype);
				//view this menu 
				_d_viewMenuPageHeader(iNdata);
			}
			function _d_safeAddAppMenuHeader (iNdata,iNtype) {
				/*
					@discr
						add safe content to menu app header
					@inputs
						iNdata -> object
							app
							page
							content
						@optional
						iNtype -> string 
							in [end,begin, after, before, change]
				*/
				if( typeof iNtype != 'string' ) iNtype = 'end';
				if( _d_getLengthMenuHeader ({'app':iNdata['app']}) < 1 ) {
					// check app container
					_d_addAppMenuHeaderByTemplate(iNdata,iNtype);
				} else if ( typeof iNdata['page'] == 'string' && _d_getLengthMenuHeader(iNdata) < 1 ) {
					_d_addPageMenuHeaderByTemplate( iNdata,iNtype);
				}
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
	        	function _d_getLengthMenuHeader (iNdata) {
	        	/*
	        		@discr
	        			get length of elements or 0
	        		@inputs
	        			iNdata -> string
	        				app
        					@optional
	        					page
	        	*/
	        	var selector = CONST['pathMenuHeader'] + ' .' + CONST['nameInMenuHeader'] + '[app-name="'+iNdata['app']+'"]';
	        	if ( typeof iNdata['page'] == 'string' )
	        		selector += '.' + CONST['pageNameInMenuHeader'] + '[page-name="'+ iNdata['page'] +'"]';
	        	return $(selector).length;
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
	        function _d_addAppMenuHeaderByTemplate (iNdata,iNtype) {
	        	/*
	        		@discr
	        			add content for app into menu header block by template
	        		@inputs
	        			iNdata -> object
	        				app
	        				page
	        				content
	        				@optional
	        					other
	    				iNtype -> string
	    					in [end,begin, after, before, change]
	        	*/
				if( typeof iNtype != 'string' ) iNtype = 'end';
	        	var selector = CONST['pathMenuHeader'],
	        		content = _getAppMenuHeader(iNdata);
	        	// _d_addAppHeaderByTemplate(iNdata,iNtype);
				V_VIEW.d_addDataToViewEl(selector, content ,iNtype);//_getPageForListApp(content)
	        }
	        


	        function _d_addPageMenuHeaderByTemplate (iNdata,iNtype) {
	        	/*
	        		@discr
	        			add content with page for app into menu header block by template
	        		@inputs
	        			iNdata -> object
	        				app
	        				page
	        				content
	        				@optional
	        					other
    					iNtype -> string
    						in [end,begin, after, before, change]
	        	*/
	    		
				if( typeof iNtype != 'string' ) iNtype = 'end';		
	        	var selector = CONST['pathMenuHeader'] + ' .' + CONST['nameInMenuHeader']+'[app-name="'+iNdata['app']+'"]',
	        		content = _getPageMenuHeader(iNdata);
				V_VIEW.d_addDataToViewEl(selector, _getPageForListApp(content) ,iNtype);
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
        function _d_removeApps (iNarray,iNtypeApp) {
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
    			$(thisSelector).remove();
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
				   file.setAttribute("class", iNclass);
			   document.head.appendChild(file);
			}
			function _d_loadJS (filename,iNclass) { 
			  var fileref = document.createElement('script');
				  fileref.setAttribute("type","text/javascript");
				  fileref.setAttribute("src", filename);
				  fileref.setAttribute("class", iNclass);
			  document.getElementsByTagName("head")[0].appendChild(fileref);

			}
			function _d_removeByClass (iNclass) {
				$('.'+iNclass).remove();
			}
		//@> work with header

		//@< effects animation
		function effScrollToButtom(el,iNspeed){
	        if(typeof(iNspeed) == 'undefined') iNspeed ='slow';
	        $(el).animate({ scrollTop: $(el)[0].scrollHeight }, iNspeed);
	    }
		//@> effects animation


		//@< LODADER
			function _createLoaderInAppView () {
				V_VIEW.d_showLoader('#viewBlock');
			}

			function _delLoaderInAppView () {
				V_VIEW.d_closeLoader('#viewBlock');
			}

			function _createLoaderInMenuView () {
				V_VIEW.d_showLoader('#menusBlock');
			}
			
			function _delLoaderInMenuView () {
				V_VIEW.d_closeLoader('#menusBlock');
			}

		//@> LODADER

        return {
		  // loader
		  	delLoaderInMenuView 	: _delLoaderInMenuView,
		  	createLoaderInMenuView 	: _createLoaderInMenuView,
		  	delLoaderInAppView 		: _delLoaderInAppView,
		  	createLoaderInAppView 	: _createLoaderInAppView,
		  	delLoader 				: V_VIEW.d_closeLoader,
		  	createLoader 			: V_VIEW.d_showLoader,

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
		    'addContentToChiefApp'	: addContentToChiefApp,

		   // effect functions for chief and list apps
		    'd_showApps'            : _d_showApps,
		    'd_hideApps'            : _d_hideApps,
		    'd_removeApps'          : _d_removeApps,
		    'd_showPages'           : _d_showPages,
		    'd_hidePages'           : _d_hidePages,
		    'd_viewPage'            : _d_viewPage,
		    'd_viewApp'             : _d_viewApp,


	       //< functions for headers
		    	//app menu header
				    'd_addPageMenuHeaderByTemplate'		: _d_addPageMenuHeaderByTemplate,
				    'd_addAppMenuHeaderByTemplate'		: _d_addAppMenuHeaderByTemplate,
				    'safeViewAppHeaderWithContent'		: _d_safeViewAppHeaderWithContent, // @new of 24 08 2017
				    'safeAddAppHeader'					: _d_safeAddAppHeader, // @new of 24 08 2017
				    'getPageMenuHeader'           		: _getPageMenuHeader,
				    'getAppMenuHeader'           		: _getAppMenuHeader,
				    'd_setMenuHeader'            		: _d_setMenuHeader,
				    'd_viewMenuPageHeader' 				: _d_viewMenuPageHeader,
				    'd_showMenuPageHeader' 				: _d_showMenuPageHeader,
				    'd_showMenuHeader'            		: _d_showMenuHeader,
				    'd_hideMenuPagesHeader'           	: _d_hideMenuPagesHeader,
				    'd_hideMenuHeader'          		: _d_hideMenuHeader,
				    'd_removeMenuHeader'          		: _d_removeMenuHeader,

		    	//app header
				    'd_addPageAppHeaderByTemplate'		: _d_addPageAppHeaderByTemplate,
				    'd_addAppHeaderByTemplate'			: _d_addAppHeaderByTemplate,
				    'safeViewMenuHeaderWithContent'		: _d_safeViewMenuHeaderWithContent, // @new of 24 08 2017
				    'safeAddAppMenuHeader'				: _d_safeAddAppMenuHeader, // @new of 24 08 2017
				    'getPageAppHeader'           		: _getPageAppHeader,
				    'getAppHeader'           			: _getAppHeader,
				    'd_setAppHeader'            		: _d_setAppHeader,
				    'd_viewAppPageHeader' 				: _d_viewAppPageHeader,
				    'd_showAppPageHeader' 				: _d_showAppPageHeader,
				    'd_showAppHeader'            		: _d_showAppHeader,
				    'd_hideAppPagesHeader'           	: _d_hideAppPagesHeader,
				    'd_hideAppHeader'          			: _d_hideAppHeader,
				    'd_removeAppHeader'          		: _d_removeAppHeader,
	       //> functions for headers

			//work with header
				'd_loadCSS' 		: _d_loadCSS,
				'd_loadJS' 			: _d_loadJS,
				'd_removeByClass' 	: _d_removeByClass,

			//effects
				'effScrollToButtom' 		: effScrollToButtom,

		}

});