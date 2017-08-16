define(['jquery','template7'], function ($,Template7) {

	function _d_showLoader (iNid) {
		if(typeof(iNid) == 'undefined')
			iNid = 'body';
		_d_closeLoader(iNid);
		$(iNid).append(_v_html_loader);
		console.log(iNid + ' .rcontent_loader view');
	}

	function _d_closeLoader(iNid) {
		if(typeof(iNid) == 'undefined') 
			iNid = 'body';
		$(iNid + ' .rcontent_loader').remove();
		console.log(iNid + ' .rcontent_loader hide');
	}

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
		// if( typeof(iNwhere) != 'string')iNwhere='begin';
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
			var _v_html_loader = `
			<div class="rcontent_loader" style="width: 100%; height: 100%;">
				<div class="connect_centerPosition">
					<img id="rcontent_loader_image" src="https://cdn.ramman.net/images/gif/loader.min.gif">
					<div class ="CML operationName" style=" font-size: 1.5rem;">[system-load]</div>
				</div> 
			</div>`;
			function setTextInLoader (iNtext) {
				/*
					@discr
						set text in loader
					@inputs
						@required
							iNtext -> string

				*/
				$('.rcontent_loader operationName').iNtext();
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
	    'v_html_loader'         : _v_html_loader,

	  // functions for loader
	    'd_showLoader'          : _d_showLoader,
	    'd_closeLoader'         : _d_closeLoader,

	}
});