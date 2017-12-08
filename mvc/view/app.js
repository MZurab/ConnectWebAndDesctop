define(['jquery','template7','v_view'],function($,Template7,V_VIEW){
	const CONST = {
		'pathAppHeader' 	  : '#block #viewBlock .topBlockInViewBlock',
		'pathAppView' 	  	  : '#block #viewBlock #viewAndChatBlockInViewBlock.appChiefWindow',
		'nameInAppHeader' 	  : 'appHeaderInChiefBlock', // class
		'pageNameInAppHeader' : 'appPage',// class

		'pathMenuHeader' 	  : '#block #menusBlock .topBlockInMenusBlock',
		'nameInMenuHeader' 	  : 'menuHeaderInMenusBlock', // class
		'pageNameInMenuHeader': 'appPage', // class


	};
	const _ = {};
	// appName -> String, views -> array of objects {viewName,viewContent}
	const templates = {};
		
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

	   
    function getListApp (iNdata) {
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
    } _.getListApp = getListApp;

    function getPageForListApp (iNdata) {
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
    } _.getPageForListApp = getPageForListApp

    function d_updatePageInListApp (iNdata) {
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
    } _.d_updatePageInListApp = d_updatePageInListApp;

    function d_clearPageInListApp (iNdata) {
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
				function : d_updatePageInListApp
		*/
		iNdata['html'] = '';
		d_updatePageInListApp(iNdata);
    } _.d_clearPageInListApp = d_clearPageInListApp;

    function d_checkPageInListApp (iNdata) {
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
    } _.d_checkPageInListApp = d_checkPageInListApp;

    function d_checkListApp (iNdata) {
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
    } _.d_checkListApp = d_checkListApp;
	
	function d_createPageInListApp (iNdata) {
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
    	V_VIEW.d_addDataToViewEl(selector, getPageForListApp(iNdata) ,'change');
    } _.d_createPageInListApp = d_createPageInListApp;
    
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
    } _.addContentToChiefApp = addContentToChiefApp;

    function d_createListApp (iNdata) {
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
    	V_VIEW.d_addDataToViewEl(selector, getListApp(iNdata) ,'end');
    } _.d_createListApp = d_createListApp;



    
		function getChiefApp (iNdata) {
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
		} _.getChiefApp = getChiefApp;

		function getPageForChiefApp (iNdata) {
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
		} _.getPageForChiefApp = getPageForChiefApp;

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
		function d_updatePageInChiefApp (iNdata) {
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

        } _.d_updatePageInChiefApp = d_updatePageInChiefApp;

        function d_clearPageInChiefApp (iNdata) {
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
					function : d_updatePageInChiefApp
			*/
        	iNdata['content'] = '';
			d_updatePageInChiefApp(iNdata);
        } _.d_clearPageInChiefApp = d_clearPageInChiefApp;

        function d_checkPageInChiefApp (iNdata) {
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
        } _.d_checkPageInChiefApp = d_checkPageInChiefApp;

        function d_checkChiefApp (iNdata) {
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
        } _.d_checkChiefApp = d_checkChiefApp;
		
		function d_createPageInChiefApp (iNdata ) {
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
					function : getPageForChiefApp
				@return
					int : 0 - false, 0< true
			*/
			var selector = CONST['pathAppView'] + ' .app[app-name="'+iNdata['app']+'"] ';
			if(typeof(iNdata['extra']) == 'string') selector += ' ' + iNdata['extra'];
        	V_VIEW.d_addDataToViewEl(selector, getPageForChiefApp(iNdata) ,'end')
        } _.d_createPageInChiefApp = d_createPageInChiefApp;
        
        function d_createChiefApp (iNdata) {
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
        	V_VIEW.d_addDataToViewEl(selector, getChiefApp(iNdata) ,'change')
        } _.d_createChiefApp = d_createChiefApp;

        //< app headers
	        
        	function d_hideAppHeader (iNdata) {
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
	        } _.d_hideAppHeader = d_hideAppHeader;

	        function d_hideAppHeaders (iNdata) {
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
	        function d_removeAppHeader (iNdata) {
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
	        } _.d_removeAppHeader = d_removeAppHeader;

		        function d_hideAppPagesHeader (iNdata) {
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
		        } _.d_hideAppPagesHeader = d_hideAppPagesHeader;

	        function d_showAppHeader (iNdata) {
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
	        } _.d_showAppHeader = d_showAppHeader;

		        function d_showAppPageHeader (iNdata) {
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
		        } _.d_showAppPageHeader = d_showAppPageHeader;

            function d_viewAppPageHeader (iNdata) {
	        	/*
	        		@discr
	        			wathc app page of header
	        		@inputs
	        			iNdata -> object
	        				app  -> string
	        				page -> string
	        	*/
	        	// hide apps
	        	d_hideAppHeaders(iNdata);

	        	// show this app
	        	d_showAppHeader(iNdata); 

				// hide other pages app
	        	d_hideAppPagesHeader(iNdata);

	        	// show this page
	        	d_showAppPageHeader(iNdata); 
	        } _.d_viewAppPageHeader = d_viewAppPageHeader;

	        function d_setAppHeader (iNcontent) {
	        	/*
	        		@discr
	        			set content for app into header block
	        		@inputs
	        			iNcontent -> string
	        	*/
	        	$( CONST['pathAppHeader'] + ' .topBlockInViewBlock' ).html(iNcontent);
	        } _.d_setAppHeader = d_setAppHeader;

	        function d_getLengthAppHeader (iNdata) {
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
	        } _.d_getLengthAppHeader = d_getLengthAppHeader;


	       	function getAppHeader (iNdata) {
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
        	} _.getAppHeader = getAppHeader;

        	function getPageAppHeader (iNdata) {
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
        	} _.getPageAppHeader = getPageAppHeader;

        function d_addAppHeaderByTemplate (iNdata,iNtype) {
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
        		content = getAppHeader(iNdata);
			V_VIEW.d_addDataToViewEl(selector, content ,iNtype);
        } _.d_addAppHeaderByTemplate = d_addAppHeaderByTemplate;

        function safeViewAppHeaderWithContent (iNdata,iNtype) {
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
			safeAddAppHeader(iNdata,iNtype);
			//view this menu 
			d_viewAppPageHeader(iNdata);
		} _.safeViewAppHeaderWithContent = safeViewAppHeaderWithContent;

		function safeAddAppHeader (iNdata,iNtype) {
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
			if( d_getLengthAppHeader ({'app':iNdata['app']}) < 1 ) {
				// check app container
				d_addAppHeaderByTemplate(iNdata,iNtype);
			} else if ( typeof iNdata['page'] == 'string' && d_getLengthAppHeader(iNdata) < 1 ) {
				d_addPageAppHeaderByTemplate( iNdata,iNtype);
			}

		} _.safeAddAppHeader =safeAddAppHeader;

        function d_addPageAppHeaderByTemplate (iNdata,iNtype) {
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
        		content = getPageAppHeader(iNdata);
			V_VIEW.d_addDataToViewEl(selector, content /* getPageForListApp(content) */, iNtype); 
        } _.d_addPageAppHeaderByTemplate = d_addPageAppHeaderByTemplate;


	        function d_hideMenuHeader (iNdata) {
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
	        } _.d_hideMenuHeader = d_hideMenuHeader;



	        function d_checkMenuHeader (iNdata) {
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
				var selector = '#menusBlock .topBlockInMenusBlock .menuHeaderInMenusBlock[app-name="'+iNdata['app']+'"] .appPage[view-name="'+iNdata['page']+'"]';
				if(typeof(iNdata['extra']) == 'string') selector += ' ' + iNdata['extra'];
		    	return $(selector).length;
		    } _.d_checkMenuHeader = d_checkMenuHeader;



	        function d_removeMenuHeader (iNdata) {
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
	        } _.d_removeMenuHeader = d_removeMenuHeader;

		        function d_hideMenuPagesHeader (iNdata) {
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
		        } _.d_hideMenuPagesHeader = d_hideMenuPagesHeader;

	        function d_showMenuHeader (iNdata) {
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
	        } _.d_showMenuHeader = d_showMenuHeader;

		        function d_showMenuPageHeader (iNdata) {
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
		        } _.d_showMenuPageHeader = d_showMenuPageHeader;

            function d_viewMenuPageHeader (iNdata) {
	        	/*
	        		@discr
	        			wathc app page of menu header
	        		@inputs
	        			iNdata -> object
	        				app  -> string
	        				page -> string
	        	*/
	        	// hide apps
	        	d_hideMenuHeader(iNdata);

	        	// show this app
	        	d_showMenuHeader(iNdata); 

				// hide other pages app
	        	d_hideMenuPagesHeader(iNdata);

	        	// show this page
	        	d_showMenuPageHeader(iNdata); 
	        } _.d_viewMenuPageHeader = d_viewMenuPageHeader;

	        function d_setMenuHeader (iNcontent) {
	        	/*
	        		@discr
	        			set content for app into menu header block
	        		@inputs
	        			iNcontent -> string
				*/
	        	$( CONST['pathMenuHeader']).html(iNcontent);
	        } _.d_setMenuHeader = d_setMenuHeader;

	        function safeViewMenuHeaderWithContent (iNdata,iNtype) {
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
				safeAddAppMenuHeader(iNdata,iNtype);
				//view this menu 
				d_viewMenuPageHeader(iNdata);
			} _.safeViewMenuHeaderWithContent = safeViewMenuHeaderWithContent;

			function safeAddAppMenuHeader (iNdata,iNtype) {
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
				if( d_getLengthMenuHeader ({'app':iNdata['app']}) < 1 ) {
					// check app container
					d_addAppMenuHeaderByTemplate(iNdata,iNtype);
				} else if ( typeof iNdata['page'] == 'string' && d_getLengthMenuHeader(iNdata) < 1 ) {
					// check page container
					d_addPageMenuHeaderByTemplate( iNdata,iNtype);
				}
			} _.safeAddAppMenuHeader = safeAddAppMenuHeader;

	        	function getAppMenuHeader (iNdata) {
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
	        	} _.getAppMenuHeader = getAppMenuHeader;

	        	function d_getLengthMenuHeader (iNdata) {
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

	        	function getPageMenuHeader (iNdata) {
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
	        	} _.getPageMenuHeader = getPageMenuHeader;

	        function d_addAppMenuHeaderByTemplate (iNdata,iNtype) {
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
	        		content = getAppMenuHeader(iNdata);
	        	// d_addAppHeaderByTemplate(iNdata,iNtype);
				V_VIEW.d_addDataToViewEl(selector, content ,iNtype);//getPageForListApp(content)
	        } _.d_addAppMenuHeaderByTemplate = d_addAppMenuHeaderByTemplate;
	        


	        function d_addPageMenuHeaderByTemplate (iNdata,iNtype) {
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
	        		content = getPageMenuHeader(iNdata);
				V_VIEW.d_addDataToViewEl(selector, content ,iNtype);
	        } _.d_addPageMenuHeaderByTemplate = d_addPageMenuHeaderByTemplate
        //> app headers

        function d_showApps (iNarray,iNtypeApp) {
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
        } _.d_showApps = d_showApps;

        function d_hideApps (iNarray,iNtypeApp) {
        	/*
        		@example
        			d_hideApps(['chat'],'chief')
        			d_hideApps('chat') == d_showApps('chat','chief')
        			d_hideApps() 		== d_showApps('all','chief')
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
        } _.d_hideApps = d_hideApps;

        function d_removeApps (iNarray,iNtypeApp) {
        	/*
        		@example
        			d_hideApps(['chat'],'chief')
        			d_hideApps('chat') == d_showApps('chat','chief')
        			d_hideApps() 		== d_showApps('all','chief')
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
        } _.d_removeApps =d_removeApps;

		function d_showPages (iNapp,iNarray,iNtypeApp) {
			/*
        		@example
        			d_showPages('chat',['private'],'chief')
        			d_showPages('chat','private') == d_showPages('chat','chief')
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
        	d_showApps(iNapp,iNtypeApp)
        	// choose list of chief container
        	if( typeof(iNtypeApp) != 'string' || iNtypeApp == 'chief') selector = '#viewWindow .app'
        	else selector = '.usersBlockContainerInMenusBlock .app'
    		// create array if need with page names for show
    		if(typeof(iNarray) !=  'object' || Array.isArray(iNarray) != true) iNarray = [iNarray];
    		for (var iKey in iNarray) {
    			pageNameForIletiral = iNarray[iKey];
    			$(selector + '[app-name="' + appName + '"] .view[view-name="'+pageNameForIletiral+'"]').show();
    		}
    	} _.d_showPages = d_showPages;

    	function d_viewPage (iNdata) {
    		/*
        		@example
        			d_openPage('chat','index')
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
					function : d_showPages
					function : d_hidePages
        	*/
        	if(typeof(iNdata['type']) != 'string' || iNdata['type'] != 'list') iNdata['type'] = 'chief'
        	// d_hidePages(iNdata['app'],'all',iNdata['type']);
        	d_showPages(iNdata['app'],iNdata['page'],iNdata['type']);
		} _.d_viewPage = d_viewPage;

		function d_viewApp (iNdata) {
    		/*
        		@example
        			d_viewApp('chat','index','chief')
        			d_viewApp('chat','index')
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
					function : d_hideApps
					function : d_showApps
        	*/
        	if(typeof(iNdata['type']) != 'string' || iNdata['type'] != 'list') iNdata['type'] = 'chief'
        	// d_hideApps('all',iNdata['type']);
        	d_showApps(iNdata['app'],iNdata['type']);
		} _.d_viewApp = d_viewApp;

        function d_hidePages (iNapp,iNarray,iNtypeApp) {
        	/*
        		@example
        			d_hidePages('chat',['private'],'chief')
        			d_hidePages('chat','private') == d_hidePages('chat','chief')
        			d_hidePages('chat') == d_hidePages('chat','all')
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
					function : d_hideApps
        	*/
        	var selector, appName, pageNameForIletiral, thisSelector;
        	// show app
        	d_hideApps(iNapp,iNtypeApp)
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
    			
        } _.d_hidePages = d_hidePages;

		

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
			
			function getPageMenuTemplate (iNapp,iName) {
				var pageTemplate = getPageTemplate(iNapp);
				if( typeof pageTemplate['menu'] == 'object' && typeof pageTemplate['menu'][iName] != 'undefined')
					return pageTemplate['menu'][iName];
				return false;
			} _.getPageMenuTemplate = getPageMenuTemplate;

			function getPageViewTemplate (iNapp,iName) {
				var pageTemplate = getPageTemplate(iNapp);
				if(typeof(pageTemplate['view']) == 'object' && typeof(pageTemplate['view'][iName]) != 'undefined')
					return pageTemplate['view'][iName];
				return false;
			} _.getPageViewTemplate = getPageViewTemplate;

			function getAppTemplate (iNapp,iName) {
				var template = getTemplate(iNapp);
				if(typeof(template['app']) == 'object' && typeof(pageTemplate['app'][iName]) != 'undefined')
					return template['app'];
				return false;
			} _.getAppTemplate = getAppTemplate;
		//@>  work with templates  from app



		


		//@< work with header
			function d_loadCSS (filename,iNclass){ 
				var file = document.createElement("link");
				   file.setAttribute("rel", "stylesheet");
				   file.setAttribute("type", "text/css");
				   file.setAttribute("href", filename);
				   file.setAttribute("class", iNclass);
			   document.head.appendChild(file);
			} _.d_loadCSS = d_loadCSS;

			function d_loadJS (filename,iNclass) { 
			  var fileref = document.createElement('script');
				  fileref.setAttribute("type","text/javascript");
				  fileref.setAttribute("src", filename);
				  fileref.setAttribute("class", iNclass);
			  document.getElementsByTagName("head")[0].appendChild(fileref);

			} _.d_loadJS = d_loadJS;

			function d_removeByClass (iNclass) {
				$('.'+iNclass).remove();
			} _.d_removeByClass = d_removeByClass;

		//@> work with header

		//@< effects animation
		function effScrollToButtom(el,iNspeed){
	        if(typeof(iNspeed) == 'undefined') iNspeed ='slow';
	        $(el).animate({ scrollTop: $(el)[0].scrollHeight }, iNspeed);
	    } _.effScrollToButtom = effScrollToButtom;
		//@> effects animation


		//@< LINKS work with href.links
			function convertDomElementToLink (iNthis) {
				/*
					@disct
						we create link from dom element
					@inputs
						@required
						iNthis -> object (dom selector)
					@return : Void
				*/
	        	$(iNthis).addClass('appHref');
	        	$(iNthis).addClass('connect_href');
			} _ ['convertDomElementToLink'] = convertDomElementToLink;

			function convertDomElementToAppLink (iNthis,iNdata) {
				/*
					@disct
						we create link to app from dom element
					@inputs
						@required
						iNthis -> object (dom selector)
						@optional
							iNdata -> object 
								@optional
									app 	-> string (@default 'base')
									page 	-> string (@default 'index')
									data 	-> string (@default '')
					@return : Void

				*/
				if(typeof iNdata != 'object') iNdata = {};
				// create values for open app OR set default values for them
				var appName 	= iNdata['appName']||'base',
					pageName 	= iNdata['pageName']||'index',
					data 		= iNdata['data']||'';

				// create link
				convertDomElementToLink(iNthis);

	        	// then we add app name and page name
	        	$(iNthis).attr('app-name',appName);
	        	$(iNthis).attr('page-name',pageName);

	        	// add data to this links
	        	$(iNthis).attr('data',data);

			} _ ['convertDomElementToAppLink'] = convertDomElementToAppLink;

		//@> LINKS work with href.links

		//@< LODADER
			function createLoaderInAppView () {
				V_VIEW.showLoader('#viewBlock');
			}
			_.createLoaderInAppView = createLoaderInAppView;

			function delLoaderInAppView () {
				V_VIEW.closeLoader('#viewBlock');
			}
			_.delLoaderInAppView = delLoaderInAppView;

			function createLoaderInMenuView () {
				V_VIEW.showLoader('#menusBlock');
			}
			_.createLoaderInMenuView = createLoaderInMenuView;
			
			function delLoaderInMenuView () {
				V_VIEW.closeLoader('#menusBlock');
			}
			_.delLoaderInMenuView = delLoaderInMenuView;


			_.delLoader 	= V_VIEW.closeLoader;
			_.createLoader 	= V_VIEW.showLoader;

		//@> LODADER

		//@< SIDE BUTTONS
			function sideButtons_disableSelectedEffects () {
				/*
					@discr
						deleted selected class from all side buttons
					@inputs
						@required
				*/
				$('.appsBpxInAppBlock').removeClass('selected');
			} _.sideButtons_disableSelectedEffects = sideButtons_disableSelectedEffects;

			function sideButtons_addSelectedEffectsByFilter (iNfilter) {
				/*
					@discr
						add select class for show effects by filter (service id)
					@inputs
						@required
						@optional
							iNfilter -> string
				*/
				
				// remove selected class from all btn
				sideButtons_disableSelectedEffects();

				var baseClass = '.appsBpxInAppBlock';

				switch(iNfilter) {

					case "market":
						$(baseClass + '.filterMarket').addClass('selected');
					break;
					
					case "onepay":
						$(baseClass + '.filterOnepay').addClass('selected');
					break;
					
					case "sharepay":
						$(baseClass + '.filterSharepay').addClass('selected');
					break;
					
					case "edocument":
						$(baseClass + '.filterEdocument').addClass('selected');
					break;

					default :
						$(baseClass + '.filterAll').addClass('selected');
					break;
				}
			} _.sideButtons_addSelectedEffectsByFilter = sideButtons_addSelectedEffectsByFilter;
		//@> SIDE BUTTONS

		function clear () {
			// right header
			$('#menusBlock .topBlockInMenusBlock').html('');
			// right body
	        $('#menusBlock .usersBlockContainerInMenusBlock').html('');

			// left header
	        $('#viewBlock .topBlockInViewBlock').html('');
			// left body
	        $('#viewBlock #viewAndChatBlockInViewBlock').html('');
		} _.clear = clear;

		return _;
  //       return {
		//   // loader
		//   	delLoaderInMenuView 	: delLoaderInMenuView,
		//   	createLoaderInMenuView 	: createLoaderInMenuView,
		//   	delLoaderInAppView 		: delLoaderInAppView,
		//   	createLoaderInAppView 	: createLoaderInAppView,
		//   	delLoader 				: V_VIEW.closeLoader,
		//   	createLoader 			: V_VIEW.showLoader,

  //   	  // functions for work with template
  //   	  	'getAppTemplate'		: getAppTemplate,
  //   	  	'getPageViewTemplate'	: getPageViewTemplate,
  //   	  	'getPageMenuTemplate'	: getPageMenuTemplate,

		//   // functions for list app
		//     'getListApp'            : getListApp,
		//     'getPageForListApp'     : getPageForListApp,
		//     'd_updatePageInListApp' : d_updatePageInListApp,
		//     'd_clearPageInListApp'  : d_clearPageInListApp,
		//     'd_checkPageInListApp'  : d_checkPageInListApp,
		//     'd_checkListApp'        : d_checkListApp,
		//     'd_createPageInListApp' : d_createPageInListApp,
		//     'd_createListApp'       : d_createListApp,

		//   // functions for chief app
		//     'getChiefApp'           : getChiefApp,
		//     'getPageForChiefApp'    : getPageForChiefApp,
		//     'd_updatePageInChiefApp': d_updatePageInChiefApp,
		//     'd_clearPageInChiefApp' : d_clearPageInChiefApp,
		//     'd_checkPageInChiefApp' : d_checkPageInChiefApp,
		//     'd_checkChiefApp'       : d_checkChiefApp,
		//     'd_createPageInChiefApp': d_createPageInChiefApp,
		//     'd_createChiefApp'      : d_createChiefApp,
		//     'addContentToChiefApp'	: addContentToChiefApp,

		//    // effect functions for chief and list apps
		//     'd_showApps'            : d_showApps,
		//     'd_hideApps'            : d_hideApps,
		//     'd_removeApps'          : d_removeApps,
		//     'd_showPages'           : d_showPages,
		//     'd_hidePages'           : d_hidePages,
		//     'd_viewPage'            : d_viewPage,
		//     'd_viewApp'             : d_viewApp,


	 //       //< functions for headers
		//     	//app menu header
		// 		    'd_addPageMenuHeaderByTemplate'		: d_addPageMenuHeaderByTemplate,
		// 		    'd_addAppMenuHeaderByTemplate'		: d_addAppMenuHeaderByTemplate,
		// 		    'safeViewAppHeaderWithContent'		: safeViewAppHeaderWithContent, // @new of 24 08 2017
		// 		    'safeAddAppHeader'					: safeAddAppHeader, // @new of 24 08 2017
		// 		    'getPageMenuHeader'           		: getPageMenuHeader,
		// 		    'getAppMenuHeader'           		: getAppMenuHeader,
		// 		    'd_setMenuHeader'            		: d_setMenuHeader,
		// 		    'd_viewMenuPageHeader' 				: d_viewMenuPageHeader,
		// 		    'd_showMenuPageHeader' 				: d_showMenuPageHeader,
		// 		    'd_showMenuHeader'            		: d_showMenuHeader,
		// 		    'd_hideMenuPagesHeader'           	: d_hideMenuPagesHeader,
		// 		    'd_hideMenuHeader'          		: d_hideMenuHeader,
		// 		    'd_removeMenuHeader'          		: d_removeMenuHeader,
		// 		    'd_checkMenuHeader'				: d_checkMenuHeader,

		//     	//app header
		// 		    'd_addPageAppHeaderByTemplate'		: d_addPageAppHeaderByTemplate,
		// 		    'd_addAppHeaderByTemplate'			: d_addAppHeaderByTemplate,
		// 		    'safeViewMenuHeaderWithContent'		: safeViewMenuHeaderWithContent, // @new of 24 08 2017
		// 		    'safeAddAppMenuHeader'				: safeAddAppMenuHeader, // @new of 24 08 2017
		// 		    'getPageAppHeader'           		: getPageAppHeader,
		// 		    'getAppHeader'           			: getAppHeader,
		// 		    'd_setAppHeader'            		: d_setAppHeader,
		// 		    'd_viewAppPageHeader' 				: d_viewAppPageHeader,
		// 		    'd_showAppPageHeader' 				: d_showAppPageHeader,
		// 		    'd_showAppHeader'            		: d_showAppHeader,
		// 		    'd_hideAppPagesHeader'           	: d_hideAppPagesHeader,
		// 		    'd_hideAppHeader'          			: d_hideAppHeader,
		// 		    'd_removeAppHeader'          		: d_removeAppHeader,
	 //       //> functions for headers

		// 	//work with header
		// 		'd_loadCSS' 		: d_loadCSS,
		// 		'd_loadJS' 			: d_loadJS,
		// 		'd_removeByClass' 	: d_removeByClass,

		// 	//effects
		// 		'effScrollToButtom' 		: effScrollToButtom,

		// }

});