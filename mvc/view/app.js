define(['jquery','template7','v_view'],function($,Template7,'v_view'){
	// appName -> String, views -> array of objects {viewName,viewContent}
	var View_chiefForAppInList = `
		<div class='app' app-name='{{app}}'>
		  {{#if page}}
	          <div class='view' view-name='{{page}}'>
	          	{{content}}
	          </div>
          {/if}
          {{other}}
        </div>
    `;
    var View_pageForAppInList = `
          <div class='view' view-name='{{page}} {{attr}}'>
          	{{content}}
          </div>
    `;
    function _getListApp (iNdata) {
    	/*
    		@inputs
    			@required
        			iNdata -> object
        				app  -> String
						@optional
							page 	-> String {chain #1}
							content -> String {chain #1}
							other 	-> String 

			@deps
				View_listViews : var
    	*/
    	var temp = Template7.compile(View_listViews);
    	return temp(iNdata);
    }
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
							attr 		-> string
				@optional
		*/
		var temp = Template7.compile(View_pageForAppInList);
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
							attr		-> string

							extra		-> string 
				@optional
			@return
				int : 0 - false, 0< true
		*/
		var selector = '.usersBlockContainerInMenusBlock'; 
		if(typeof(iNdata['extra']) == 'string') selector += ' ' + iNdata['extra'];
    	v_view.addDataToViewEl(selector, _getListApp(iNdata) ,'change')
    }



    var View_chiefForAppInChief = `
			<div class="viewesInWindow app" app-name="{{app}}">
			   {{#if page}}
		           <div class="view" view-name="{{page}}" {{attr}}>
		        		{{content}}
		        	</div>
	        	{{/if}}
	           {{other}}
	        </div>
        `;
        var View_pageForAppInChief = `
	        <div class="view" view-name="{{page}}" {{attr}}>
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
								content 	-> string
								page 	-> string
								other 	-> string
					@optional
			*/
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
								attr 		-> string
					@optional
			*/
			var temp = Template7.compile(View_pageForAppInChief);
			return temp(iNdata);
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
					update isset page in chief app by object (iNdata)
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
		
		function _d_createPageInChiefApp (iNdata) {
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
								attr		-> string
								extra		-> string 
					@optional
				@return
					int : 0 - false, 0< true
			*/
			var selector = '#viewWindow .app[app-name="'+iNdata['app']+'"] ';
			if(typeof(iNdata['extra']) == 'string') selector += ' ' + iNdata['extra'];
        	v_view.addDataToViewEl(selector, _getPageForChiefApp(iNdata) ,'change')
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
        	v_view.addDataToViewEl(selector, _getChiefApp(iNdata) ,'change')
        }

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
    			$(selector + ' [app-name="' + appNameForIletiral + '"]').show();
    		}
        }
        function _d_hideApps (iNarray,iNtypeApp) {
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
    			$(selector + ' [app-name="' + appNameForIletiral + '"]').hide();
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
        	d_showApps(iNapp,iNtypeApp)
        	// choose list of chief container
        	if( typeof(iNtypeApp) != 'string' || iNtypeApp == 'chief') selector = '#viewWindow .app'
        	else selector = '.usersBlockContainerInMenusBlock .app'
    		// create array if need with page names for show
    		if(typeof(iNarray) !=  'object' || Array.isArray(iNarray) != true) iNarray = [iNarray];
    		for (var iKey in iNarray) {
    			pageNameForIletiral = iNarray[iKey];
    			$(selector + ' [app-name="' + appName + '"] .view[view-name="'+pageNameForIletiral+'"]').show();
    		}
    	}
        function _d_hidePages (iNapp,iNarray,iNtypeApp) {
        	/*
        		@example
        			_d_hidePages('chat',['private'],'chief')
        			_d_hidePages('chat','private') == _d_hidePages('chat','chief')
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
        	var selector, appName, pageNameForIletiral;
        	// show app
        	_d_hideApps(iNapp,iNtypeApp)
        	// choose list of chief container
        	if( typeof(iNtypeApp) != 'string' || iNtypeApp == 'chief') selector = '#viewWindow .app'
        	else selector = '.usersBlockContainerInMenusBlock .app'
    		// create array if need with page names for show
    		if(typeof(iNarray) !=  'object' || Array.isArray(iNarray) != true) iNarray = [iNarray];
    		for (var iKey in iNarray) {
    			pageNameForIletiral = iNarray[iKey];
    			$(selector + ' [app-name="' + appName + '"] .view[view-name="'+pageNameForIletiral+'"]').hide();
    		}
    			
        }


        return {
		  // functions for list app
		    'getListApp'            : '_getListApp',
		    'getPageForListApp'     : '_getPageForListApp',
		    'd_updatePageInListApp' : '_d_updatePageInListApp',
		    'd_clearPageInListApp'  : '_d_clearPageInListApp',
		    'd_checkPageInListApp'  : '_d_checkPageInListApp',
		    'd_checkListApp'        : '_d_checkListApp',
		    'd_createPageInListApp' : '_d_createPageInListApp',
		    'd_createListApp'       : '_d_createListApp',

		  // functions for chief app
		    'getChiefApp'           : '_getChiefApp',
		    'getPageForChiefApp'    : '_getPageForChiefApp',
		    'd_updatePageInChiefApp': '_d_updatePageInChiefApp',
		    'd_clearPageInChiefApp' : '_d_clearPageInChiefApp',
		    'd_checkPageInChiefApp' : '_d_checkPageInChiefApp',
		    'd_checkChiefApp'       : '_d_checkChiefApp',
		    'd_createPageInChiefApp': '_d_createPageInChiefApp',
		    'd_createChiefApp'      : '_d_createChiefApp',

		   // effect functions for chief and list apps
		    'd_showApps'            : '_d_showApps',
		    'd_hideApps'            : '_d_hideApps',
		    'd_showPages'           : '_d_showPages',
		    'd_hidePages'           : '_d_hidePages'
		}

});