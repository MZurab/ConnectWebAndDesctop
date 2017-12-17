define(['jquery','m_user','template7','v_view','v_app','selector', 'localdb'],function($,USER,Template7,V_VIEW,V_APP, SELECTOR, LOCALDB) {
	const _ = {};
	const CONST = {'name':'base','pageIndex':'index'};
	const templates = {};
		templates['appHeaderForIndexPage'] = `
			<div class="appBase_userListHeaderContainer">
			   	{{#if back}}
			   		<div class="appBase_backButton"></div>
			   	{{/if}}
			   	<div class="appBase_userIcon"><a href="#"><img src="{{icon}}"></a></div>
			   	<div class="UserNameInMenusBlock">
					<div class="appBase_ListHeader_dName">
					 <a href="{{href}}" class="CML" {{#if nameDictionaryCode}}cmlk="{{nameDictionaryCode}}"{{/if}}>{{name}}</a>
					</div>
					{{if login}}<div class="appBase_ListHeader_login">@{{login}}</div>{{/if}}
			   </div>
			</div>
			<div class="appBase_listHeaderButtonsBlock">
				<div class="appBase_buttonOptions"></div>
				<div class="appBase_buttonToHome connect_system_href" 		code_href="toHome"></div>
				{{#if myLogin}}
					<div class="appBase_buttonSignOut connect_system_href" 	code_href="signOut"></div>
				{{else}}
					<div class="appBase_buttonSignIn connect_system_href" 	code_href="signIn"></div>
				{{/if}}
			</div>
			<div class="ChoosePlaceInMenusBlock"></div>
		`;
	    templates[''] = `
	    	<div class="appBase_userListHeaderContainer">
			   	{{#if back}}
			   		<div class="appBase_backButton"></div>
			   	{{/if}}
			   	<div class="appBase_userIcon"><a href="#"><img src="{{icon}}"></a></div>
			   	<div class="UserNameInMenusBlock">
					<div class="appBase_ListHeader_dName">
					 <a href="{{href}}" class="CML" {{#if nameDictionaryCode}}cmlk="{{nameDictionaryCode}}"{{/if}}>{{name}}</a>
					</div>
					{{if login}}<div class="appBase_ListHeader_login">@{{login}}</div>{{/if}}
			   </div>
			</div>
		`;
	  //https://cdn.ramman.net/images/icons/users/noPhoto.png
	_['templates'] = templates;

	function getListHeaderForIndexPage (iNdata) {
		/*
			@inputs
				@required
					iNdata
						@required
							nameDictionaryCode OR name
							icon
							login
						@optional
							nameDictionaryCode OR name
							back -> bool
							href -> string
		*/
		var temp = Template7.compile(templates['appHeaderForIndexPage']);
		return temp(iNdata);
	}

	

	function getAppContent (iNdata) {
		return `
		<div class="view " view-name="index">
		  	<div class="scrolBlockForChat" style="" id="MixItUp81681F"></div>
		</div>
		`;
	}
	_['getAppContent'] = getAppContent; 

	function addUserHeaderInList (iNdata,iNtype,iNpage) {
		/*
			@inputs
				@required
					iNdata
						@required
							nameDictionaryCode OR name
							icon
							login
						@optional
							nameDictionaryCode OR name
							back -> bool
				@optional
					iNtype -> string 
						in [end,begin, after, before, change]
		*/
		if( typeof iNtype != 'string' ) iNtype = 'end';


		// if i am anonym user del him and del back btn
		var myLogin = USER.getMyLogin(), page = iNpage||CONST['pageIndex'];
		if( !myLogin ) {
			delete iNdata['myLogin'];
			// delete back btn
			delete iNdata['back'];
		} else {
			iNdata['myLogin'] = myLogin;
		}

		var objForAddHeader = {'app':CONST['name'],'page': page};
		// add user flag
		objForAddHeader['content'] = getListHeaderForIndexPage (iNdata);


		V_APP.safeViewMenuHeaderWithContent(objForAddHeader,iNtype);
	}
	_['addUserHeaderInList'] = addUserHeaderInList;


	function getRealChatIdByUid (iNuid) {
		// body...

		var path 		= SELECTOR.db.main.blocks.second.body.toChat + "[connect_uid='"+iNuid+"']";
		var el 			= $(path);
		var chatId 		= el.attr('connect_chatid');
		var userLogin 	= el.attr('connect_userlogin');
		if ( el && userLogin != chatId ) {
			// 
			return chatId;
		}
		return false;
	}
	_['getRealChatIdByUid'] = getRealChatIdByUid;
	


	//@< PSEUDO USER MENU

		templates['menuPseudoUser_box'] = `
			<div class="appBase_userSelectMenuContainer">
   				<ul>
   					{{content}}
   				</ul>
			</div>
		`;

		templates['menuPseudoUser_item'] = `
			<li class='switchActiveUser appHref connect_href' app-name='base' page-name='index' data='forUserId={{uid}}' connect_uid='{{uid}}' connect_owner='{{owner}}'>
		         <div class="appBase_userListHeaderContainer">
		            <div class="appBase_userIcon">
		            	<img src="{{icon}}">
	            	</div>
		            <div class="UserNameInMenusBlock">
		               <div class="appBase_ListHeader_dName">
		                  <a class="CML">{{name}}</a>
		               </div>
		               {{#if owner}}
		               		<div class="appBase_ListHeader_owner">@{{owner}}</div>
	               	   {{else}}
		               		<div class="appBase_ListHeader_login">@{{login}}</div>
	               	   {{/if}}
		            </div>
		         </div>
		    </li>
		`;

		function menuPseudoUser_getBox (iNdata) {
			/*
				@inputs
					@required
						iNdata
							@required
							@optional
								content -> string
			*/
			var temp = Template7.compile(templates['menuPseudoUser_box']);
			return temp(iNdata);
		}
		_['menuPseudoUser_getBox'] = menuPseudoUser_getBox;

		function menuPseudoUser_getCountMenu () {

			var path = SELECTOR.db.main.blocks.second.header.base.index.menuSwitchUserBox.val;
			return $(path).length;
		} _.menuPseudoUser_getCountMenu = menuPseudoUser_getCountMenu;

		function menuPseudoUser_addBox (iNdata) {
			/*
				@inputs
					@required
						iNdata
							@required
							@optional
								content -> string
			*/
			var path 		= SELECTOR.db.main.blocks.second.header.base.index.val,// '.topBlockInMenusBlock .menuHeaderInMenusBlock[app-name="base"] .appPage[page-name="index"]',
				content 	= menuPseudoUser_getBox(iNdata);
				V_VIEW.d_addDataToViewEl ( path, content, 'start' );


		}

		function menuPseudoUser_safeAddBox (iNdata) {
			/*
				@inputs
					@required
						iNdata
							@required
							@optional
								content -> string
			*/
			if(typeof iNdata != 'object') iNdata = {};
			if ( menuPseudoUser_getCountMenu() < 1 ) {
				menuPseudoUser_addBox(iNdata);
			}
		} _.menuPseudoUser_safeAddBox = menuPseudoUser_safeAddBox;

		function menuPseudoUser_getItem (iNdata) {
			/*
				@inputs
					@required
						iNdata
							@required
								name -> string
								icon -> string
								ownerLogin -> string
			*/
			var temp = Template7.compile(templates['menuPseudoUser_item']);
			return temp(iNdata);
		}
		_['menuPseudoUser_getItem'] = menuPseudoUser_getItem;


		function menuPseudoUser_addItem (iNdata) {
			/*
				@inputs
					@required
						iNdata
							@required
								name -> string
								icon -> string
								ownerLogin -> string
			*/

			// add box if not exist
			menuPseudoUser_safeAddBox();

			// add item
			var path 	= SELECTOR.db.main.blocks.second.header.base.index.menuSwitchUserBox.item.val,
				content = menuPseudoUser_getItem(iNdata);
				V_VIEW.d_addDataToViewEl (path,content,'start');

		}
		_['menuPseudoUser_addItem'] = menuPseudoUser_addItem;

		function menuPseudoUser_switchUserInHeaderByUid (iNuid) {
			/*
				@discr
					set choosen pseudo user block to header
				@inputs
					@required
						iNuid -> string
			*/
			// body...
			var pathToMyNameBlok			= SELECTOR.db.main.blocks.second.header.base.index.menuSwitchUserBox.item.val + ' li[connect_uid="'+iNuid+'"] .UserNameInMenusBlock',
				pathToMyIconBlok    		= SELECTOR.db.main.blocks.second.header.base.index.menuSwitchUserBox.item.val + ' li[connect_uid="'+iNuid+'"] .appBase_userIcon',
				pathToHeaderNameBlok    	= SELECTOR.db.main.blocks.second.header.base.index.userHeaderBox.val + ' .UserNameInMenusBlock',
				pathToHeaderIconBlok    	= SELECTOR.db.main.blocks.second.header.base.index.userHeaderBox.val + ' .appBase_userIcon';

				// add name to header
				$(pathToHeaderNameBlok).replaceWith( $(pathToMyNameBlok).clone() );
				// add icon to header
				$(pathToHeaderIconBlok).replaceWith( $(pathToMyIconBlok).clone() );
		} _.menuPseudoUser_switchUserInHeaderByUid = menuPseudoUser_switchUserInHeaderByUid;

		function menuPseudoUser_attachOnClickEventForShowMenu () {
			// when click to icon OR to name
			var 
				// pathToIcon 	= SELECTOR.db.main.blocks.second.header.base.index.userHeaderBox.val,//'.appPage > .appBase_userListHeaderContainer.flagHasPseudoUsers .appBase_userIcon',
				// pathToName 	= SELECTOR.db.main.blocks.second.header.base.index.userNameWihPseudoFlag.val,//'.appPage > .appBase_userListHeaderContainer.flagHasPseudoUsers .appBase_ListHeader_dName',
				path 		= SELECTOR.db.main.blocks.second.header.base.index.userHeaderBox.val;//pathToIcon + ', ' + pathToName;
				// clear of any onclick actions
				$(path).off('click');
				// attach action to on click event for view menu
				$(path).click(
					function (e) {
						e.preventDefault();
						menuPseudoUser_showMenu();
					}	
				);
		} _.menuPseudoUser_attachOnClickEventForShowMenu  = menuPseudoUser_attachOnClickEventForShowMenu;

		function menuPseudoUser_hideMenu() {
			//hide curtain
			V_APP.hideBackgroundCurtain();
			//hide menu box
			$(SELECTOR.db.main.blocks.second.header.base.index.menuSwitchUserBox.val).hide();
		} _.menuPseudoUser_hideMenu = menuPseudoUser_hideMenu;

		function menuPseudoUser_showMenu() {
			// open menu
			$(SELECTOR.db.main.blocks.second.header.base.index.menuSwitchUserBox.val).show();

			// show curtain
			V_APP.showBackgroundCurtainWithFunction (
				() => {
					// hide menus
					$(SELECTOR.db.main.blocks.second.header.base.index.menuSwitchUserBox.val).hide();

				}
			);
		}

		

		function menuPseudoUser_addFlagToAttachOnClickEventForShowMenu () {
			var flag = LOCALDB.db.main.blocks.second.header.base.index.flags.hasPseudoUser,//'flagHasPseudoUsers',
				path = SELECTOR.db.main.blocks.second.header.base.index.baseHeader.val;
			$(path).addClass(flag);
		} _.menuPseudoUser_addFlagToAttachOnClickEventForShowMenu = menuPseudoUser_addFlagToAttachOnClickEventForShowMenu;

		function menuPseudoUser_removeFlagToAttachOnClickEventForShowMenu() {
			var flag = LOCALDB.db.main.blocks.second.header.base.index.flags.hasPseudoUser,//'flagHasPseudoUsers',
				path = SELECTOR.db.main.blocks.second.header.base.index.baseHeader.val;
			$(path).removeClass(flag);
		} _.menuPseudoUser_removeFlagToAttachOnClickEventForShowMenu = menuPseudoUser_removeFlagToAttachOnClickEventForShowMenu;
	//@> PSEUDO USER MENU

	return _;
});