define(['jquery','template7'], function ($,Template7) {
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
		// appName -> String, views -> array of objects {viewName,viewContent}
		var View_appsBlocklistViews = `
			<div class='app' app-name='{{appName}}'>
			  {{#each views}}
		          <div class='view' view-name='{{viewName}}'>
		          	{{viewContent}}
		          </div>
	          {{/each}}
	        </div>
        `;
        function getListViewForApp (iNdata) {
        	/*
        		@inputs
        			iNdata -> object
        				appName  -> String
        				views 	 -> Array
							view-name 	-> String
							viewContent -> String
				@deps
					View_listViews : var
        	*/
        	var temp = Template7.compile(View_listViews);
        	return temp(iNdata);
        }

	// chief biggest view for output chief information
		var View_chiefView = `
			<div class="topBlockInViewBlock">
			      <div class="viewesInTopViewBlock">
			         <div id="IconUserInViewBlock"><a href="#"><img src="https://cdn.ramman.net/images/icons/apps/app_market.png"></a></div>
			         <div id="UserNameInViewBlock"><a href="#" class="CML" cmlk="[dictionary-name]">Название</a></div>
			         <div id="UserTypeInViewBlock"><a href="#" class="CML" cmlk="[dictionary-service]">Сервис</a></div>
			      </div>
			   </div>
			   <div id="viewAndChatBlockInViewBlock">
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
			   </div>
		`;
		var View_appForChiefView = `
			<div class="viewesInWindow app" app-name="{{app}}">
	           {{pageContent}}
	        </div>
        `;
        var View_pageForApp = `
	        <div class="view" view-name="{{page}}" id="leftBlockInViewWindow">
	        	{{content}}
	        </div>
        `;
		function _getChiefApp (iNdata) {
			/*
				@discr
					get app template by object (iNdata) with page
				@inputs
					@required
						iNdata -> object
							app 	-> string
							page 	-> string
							content -> string
					@optional
			*/
			var temp = Template7.compile(View_appForChiefView);
			iNdata['pageContent'] = _getPageForApp(iNdata);
			return temp(iNdata);
		}
		function _getPageForApp (iNdata) {
			/*
				@discr
					get page for app by object (iNdata)
				@inputs
					@required
						iNdata -> object
							pageName -> string
							content -> string
					@optional
			*/
			var temp = Template7.compile(View_pageForApp);
			return temp(iNdata);
		}

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
		        	<div class="appsInAppBlock">
					  <img src="{{icon}}">
					  <div class="appsNameInAppsBlock CML" cmlk="{{dc}}">{{name}}</div>
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
			var html_loader = `
			<div class="rcontent_loader" style="width: 100%; height: 100%;">
				<div class="connect_centerPosition">
					<img id="rcontent_loader_image" src="https://cdn.ramman.net/images/gif/loader.min.gif">
					<div class ="CML" style=" font-size: 1.5rem;">[system-load]</div>
				</div> 
			</div>`;
	//>! work with loader

	


	return {
		getViewListApps	: _getViewListApps,
		initWithObj 	: _initWithObj,
		html_loader		: html_loader,

		getPage 		: _getPageForApp,
		getApp 			: _getChiefApp,
	}
});