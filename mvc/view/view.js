define(['jquery','template7','dictionary'], function ($,Template7, DICTIONARY) {






	function _d_issetDomEl (iNdomElement) {
		/*
			@discr
				check dom element for isset
			@inputs
				@required
					iNdomElement -> string
			@return 
				bool
		*/
		if($(iNdomElement).length >0) return true;
		return false;
	}
	function _d_addDataToViewEl (iNdomElement,iNaddedData,iNwhere) {
		/*
			@inputs
				@required
					iNdomElement -> string
					iNaddedData -> string | object of dom
				@optional
					iNwhere -> string [default = begin] [begin, end, before, after]
		*/
		switch(iNwhere){
			case "change":
				$(iNdomElement).html(iNaddedData);
			break;

			case "end":
				$(iNdomElement).append(iNaddedData);
			break;

			case "before":
				$(iNdomElement).before(iNaddedData);
			break;

			case "after":
				$(iNdomElement).after(iNaddedData);
			break;

			default: // start
				$(iNdomElement).prepend(iNaddedData);
			break;
		}
	}	
	// chief container for body
		var html_cont = `
			<div id='container'>

		      <div class='backTopLineInContainer'></div>
		      <div id='block'>

		      	<div id='appsBlock'>
		      		{{View_listApps}}
		      	</div>
				<div id='menusBlock'>
		            {{View_listViews}}
		        </div>
				<div id="viewBlock">
				   {{View_chiefView}}
				</div>

			  </div>

			</div>
		`;
		function _initWithObj (iNdata) {
			/*
				@discr
					get canvas with object (iNdata)
				@input
					iNdata -> Object
						arrListApps -> array (array with objects by data for list apps)
				@return
					canvas (template)
				@deps
					html_cont 		: var
					View_listViews 	: var
					View_chiefView 	: var
					Template7 		: Object
			*/
			var temp = Template7.compile(html_cont);
        	return temp (
        		{
        			'View_listApps'  : _getViewListApps( iNdata['arrListApps']),
        			'View_listViews' : View_listViews,
        			'View_chiefView' : View_chiefView,
        		}
        	);
		}



	// list view for output categories, menus, lists, chats 
		var View_listViews = `
			<div class='topBlockInMenusBlock'>
                <div id='IconUserInMenusBlock'>
                  <a href='#'><img src='https://cdn.ramman.net/images/icons/users/noPhoto.png'></a>
                </div>
                <div id='UserNameInMenusBlock'>
                  <a href='/sign' class='CML'>[system-signIn]/[system-signUp]</a>
                </div>
                <div class='ChoosePlaceInMenusBlock'></div>
            </div>
            <div class='searchBlockInMenusBlock'>
                <form class='searchContainerInSearchBlock' class='CML'>
                  <input type="text" class='searchInputInSearchBlock' placeholder="Поиск...">
                  <input type="submit" class='submitInputInSearchBlock' value="">
                </form>
            </div>
            <div class='usersBlockContainerInMenusBlock appLeftMenuWindow'>
                
            </div>
		`;
		

        

	// chief biggest view for output chief information
		var View_chiefView = `
			<div class="topBlockInViewBlock">
			   <div class="viewesInTopViewBlock">
			      <div id="IconUserInViewBlock"><a href="#"><img src="https://cdn.ramman.net/images/icons/apps/app_market.png"></a></div>
			      <div id="UserNameInViewBlock"><a href="#" class="CML" cmlk="[dictionary-name]">Название</a></div>
			      <div id="UserTypeInViewBlock"><a href="#" class="CML" cmlk="[dictionary-service]">Сервис</a></div>
			   </div>
			</div>
			<div id="viewAndChatBlockInViewBlock" class="appChiefWindow">
			</div>
		`;
		/* in viewAndChatBlockInViewBlock for chat app
			<div id="subViewInViewAndChatBlock">
			  <div id="menuWindowInSubView"></div>
			  <div id="viewWindow" class="appChiefWindow">
			  </div>
			  <div class="chatBlockInViewBlock">
			     <div class="viewesFooterUnderWindow">
			        <div id="senderBlockInViewBlock">
			           <div id="bottomViewInMsgBlock">
			              <ul class="rawBlockInBottomView">
			                 <li class="LineInBottomViewRawBlock">1</li>
			                 <li class="LineInBottomViewRawBlock">2</li>
			              </ul>
			           </div>
			           <div id="forTextInputInSenderBlock">
			              <textarea></textarea>
			           </div>
			           <div id="sendButtonInSenderBlock" class="sendTextMsgButton"></div>
			           <img src="https://cdn.ramman.net/images/icons/miniConnectWebIcon.png" id="ConnectButtonInFuncButtons">
			        </div>
			     </div>
			  </div>
			</div>
	    */
		

	//<? View_listApps 
		// for output apps icon with name for chosing
			var View_listApps = `
				<div class='bTopInAppsBlock'>
		            <img src='https://cdn.ramman.net/images/buttons/bTopInAppsBlock.png'>
		        </div>
		        <div class='AppsContainerInAppBlock'>{{listApps}}</div>
		        <div class='bBottomInAppsBlock'>
		            <img src='https://cdn.ramman.net/images/buttons/bBottomInAppsBlock.png'>
		        </div>
	        `;
	        // icon, name, dictionaryKey  {listApps} -> View_listApps
		        var Template_listApps_apps = `
		        	{{#each apps}}
		        	<div class='appBlockInAppBlock'>
			        	<div class="appsInAppBlock">
						  <img src="{{icon}}">
						  <div class="appsNameInAppsBlock CML" cmlk="{{dc}}">{{name}}</div>
						</div>
					</div>
					{{/each}}
		        `;
        //methods
        	function getListApps (iNarrayApps) {
				var temp = Template7.compile(Template_listApps_apps);
        		return temp({'apps':iNarrayApps});
			}
			function _getViewListApps(iNarrayApps) {
				var temp = Template7.compile(View_listApps);
        		return temp( { 'listApps':getListApps(iNarrayApps) });
			}	

    //>! View_listApps 
	
    //<? work with loader
    		const loader_timeoutid = {};
    		function loader_clearTimeout ( iNloaderKey, iNloaderCode ) {
    			if ( typeof loader_timeoutid[iNloaderKey] == 'object' && typeof loader_timeoutid[iNloaderKey][iNloaderCode] != 'undefined' )
					clearTimeout ( loader_timeoutid[iNloaderKey][iNloaderCode]);
    		}

    		function loader_saveTimeout  ( iNloaderKey, iNloaderCode , iNtimeout ) {
    			// create object if its not
    			if ( typeof loader_timeoutid[iNloaderKey] != 'object' ) loader_timeoutid[iNloaderKey] = {};
    			// save timeout to object 
    			loader_timeoutid[iNloaderKey][iNloaderCode] = iNtimeout;
    		}




    		const loader_templates = {}; // var _v_html_loader 
			loader_templates ['default'] = `
				<div class="rcontent_loader rConnectLoaderKey_{{loader_key}}" rconnect_loader_code="{{loader_code}}" style="width: 100%; height: 100%;">
					<div class="connect_centerPosition">
						<img id="rcontent_loader_image" src="https://cdn.ramman.net/images/gif/loader.min.gif">
						<div class ="CML operationName" style=" font-size: 1.5rem;">[system-load]</div>
					</div>
				</div>
			`;
			loader_templates ['forMenuListKey'] = `
				<div class="rcontent_loader rConnectLoaderKey_{{loader_key}}" rconnect_loader_code="{{loader_code}}" style="width: 100%; height: 100%; background: #f2f2f2; color: rgba(0, 0, 0, 0.75); border: 1px dashed rgba(0, 179, 211, 0.5);">
				   <div class="connect_centerPosition">
				      <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
				      <div class="CML operationName" style=" font-size: 1.5rem;">Загрузка</div>
				   </div>
				</div>
			`;


			function setTextInLoader (iNtext) {
				/*
					@discr
						set text in loader
					@inputs
						@required
							iNtext -> string

				*/
				$('.rcontent_loader .operationName').text(iNtext);
			}

			function setTextInLoaderWithDictionary (iNtext) {
				/*
					@discr
						set text in loader
					@inputs
						@required
							iNtext -> string

				*/
				$('.rcontent_loader .operationName').text( DICTIONARY.withString(iNtext) );
			}
			
			function showLoader ( iNid, iNloaderKey, iNloaderCode ) {
				console.log('showLoader - iNid, iNloaderKey, iNloaderCode',iNid, iNloaderKey, iNloaderCode);
				// get loader key for get template from object {$loader_templates}
				if ( typeof iNloaderKey != 'string' )  iNloaderKey = loader_getDefaultKey();
				// get loader code for get template from object {$loader_templates}
				if ( typeof iNloaderCode != 'string' )  iNloaderCode = loader_getDefaultCode();
				// get loader container
				if ( typeof(iNid) != 'string' ) 		iNid = loader_getDefaultSelector();

				// closer other loader if they isset
				closeLoader(iNid, iNloaderKey, iNloaderCode);
				// get loader template by its key
				let loaderContent = loader_getContentByTemplate (iNloaderKey, iNloaderCode);// loader_templates[iNloaderKey];
				// add to dom our loader
				$(iNid).append( loaderContent );
			}

			function closeLoader (iNid, iNloaderKey, iNloaderCode) {
				console.log('closeLoader - iNid, iNloaderKey, iNloaderCode',iNid, iNloaderKey, iNloaderCode);
				// get dom path to loader
				let loaderPathToDom = loader_getPathToLoader (iNid, iNloaderKey, iNloaderCode);
				console.log('closeLoader - loaderPathToDom - ',loaderPathToDom);
				// remove loader
				$(loaderPathToDom).remove();
			}

			function closeLoaderByTimeout (iNms, iNid, iNloaderKey, iNloaderCode) {
				// clear timeout if its isset
				loader_clearTimeout ( iNloaderKey, iNloaderCode );

              	// get time
				let second = iNms || 1000;
				
				// get timeout id
				let timeout = setTimeout(
					() => {
						closeLoader (iNid, iNloaderKey, iNloaderCode)
					}, 
					second
				);

				// save timeout
				loader_saveTimeout  ( iNloaderKey, iNloaderCode , timeout );
			}



			function loader_getPathToLoader (iNid, iNloaderKey, iNloaderCode ) {
				//loader key
				if(typeof iNloaderKey != 'string') 	iNloaderKey 	= loader_getDefaultKey();
				//loader code
				if(typeof iNloaderCode != 'string') iNloaderCode 	= loader_getDefaultCode();
				//loader selector
				if(typeof iNid != 'string') 		iNid 			= loader_getDefaultSelector();

				let baseSelectorForLoaders = loader_getBaseClassForLoaders();

				let loaderPathToDom = `${iNid} ${baseSelectorForLoaders}.rConnectLoaderKey_${iNloaderKey}[rconnect_loader_code='${iNloaderCode}']`;
				// loaderPathToDom @example "body .rcontent_loader.rConnectLoaderKey_default[rconnect_loader_code='default']"

				return loaderPathToDom;
			}

			function loader_getContentByTemplate (iNloaderKey, iNloaderCode) {
				//loader key
				let loader_key = iNloaderKey;
				//loader code
				let loader_code = iNloaderCode;


				// get loader template by its key
				let loaderTemplate = loader_templates[loader_key];

				// get loader box
				let loaderTemplateBox = Template7.compile( loaderTemplate );
				let objForGetBox = {
					'loader_key' 		: loader_key,
					'loader_code' 		: loader_code
				};
				let loaderBox = loaderTemplateBox(objForGetBox);

				return DICTIONARY.withString ( loaderBox );

			}
			function loader_getBaseClassForLoaders () {
				let defaultSelector = '.rcontent_loader';
				return defaultSelector;
			}
			function loader_getDefaultKey () {
				let defaultKey = 'default';
				return defaultKey;//loader_templates[defaultKey] 
			}
			function loader_getDefaultCode () {
				let defaultCode = 'default';
				return defaultCode; 
			}
			function loader_getDefaultSelector () {
				let defaultSelector = 'body';
				return defaultSelector; 
			}
	//>! work with loader
	
	


	return {
	  // common base functions
	    'd_issetDomEl'          : _d_issetDomEl,
	    'd_addDataToViewEl'     : _d_addDataToViewEl,

	  // constructors functions
	    'initWithObj'           : _initWithObj,

	  //p 'getListApps'            : 'getListApps',
	    '_getViewListApps'      : _getViewListApps,

	  // functions for loader
	    'showLoader'          			: showLoader,
	    'closeLoader'         			: closeLoader,
	    'setTextInLoaderWithDictionary' : setTextInLoaderWithDictionary,
	    'loader_clearTimeout' 			: loader_clearTimeout,
    	'loader_saveTimeout' 			: loader_saveTimeout,
    	'closeLoaderByTimeout' 			: closeLoaderByTimeout

	}
});