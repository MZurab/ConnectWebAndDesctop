define(
	['sweetalert2','m_user', 'm_app','v_message','v_view','jquery','mixitup','dictionary','m_moment','jquery.textillate','jquery.lettering'], 
	function(swal, USER,  M_APP,V_MESSAGE, V_VIEW, $, mixitup, DICTIONARY , MOMENT ) 
{//'m_view','m_app'
				
	const _ = {};
	const templates = {}; _['templates'] = templates;
	templates['UserMenuChildN'] = `
  	<li menuid='{{id}}' menuparent='{{parent}}' {{a}} appName='{{app}}' pageName='{{page}}' class='appUserMenu {{#if children}}flagMenuHasChildren{{/if}}  flagSubMenu {{#if thisSubMenu}}flagMenuLevelN{{else}}flagMenuLevel2{{/if}}{{#if parentBox}} {{join parentBox delimiter=" "}}{{/if}}' >
      <a href="{{data}}" class='{{classForATeg}}' {{attrForATeg}} >{{name}}</a>
      {{#if children}}
    		<div class="userMenuParentButton"></div>
      {{/if}}
    </li>
  `;
  	templates['UserMenuChildOne'] = `
  	<li menuid='{{id}}' class='appUserMenu {{#if sub}}flagMenuHasChildren{{/if}} flagMenuLevel1' appName='{{app}}' pageName='{{page}}'>
        <a href="{{data}}" class='menuLink flagMenuLevel1 {{classForATeg}}' {{attrForATeg}}>{{name}}</a>
		{{#if sub}}
			<div class="userMenuParentButton"></div>
			<ul class="subMenusForUid">
				 {{sub}}
			</ul>
		{{/if}}
	</li>
    `;
    templates['UserMenuContainer'] = `
     {{#each categories}}
		  	<div class="menuListForUsers">
		  		<div class="appMenusForUsers"  app-name="{{@key}}">
					<div class="appNameInMenuList app-{{@key}}">
					  <span class='CML'>[app-{{@key}}]</span>
					</div>
          
					{{#if sub}}
					  <ul class="menusForUid">
							{{sub}}
						  </ul>
					{{/if}}
					</div>
		  	</div>
	  	{{/each}}
    `;
    templates['UserList'] = `
		<div class="mix usersBlockInMenusBlock {{appsForFilter}} {{class}}" connect_uid="{{userId}}" {{#if userHasMenu}}connect_userHasMenu = '1' {{/if}} connect_chatid="{{chatId}}" data-lastmsgtime="{{lmsgTime}}" data-sortable="1" data-position-of-chat='{{chatPosition}}' connect_toUserId='{{toUserId}}' connect_owner='{{owner}}' connect_userType='{{userType}}' connect_chatType='{{chatType}}' connect_userLogin='{{login}}'>
			<div class='chatDataInUsersBlock'>
				<div class="iconBlockInUserBlock">
			      <div class="iconInUserBlock">
			      	<img class="lazy" data-original="{{icon}}" src="{{icon}}">
			      </div>
			      	
			      	{{#js_compare "this.userType == 2"}}
			      		<div class="typeInUserBlock typeBusiness">[dictionary-business]</div>
			      	{{/js_compare}}

			      	{{#js_compare "this.userType == 3"}}
			      		<div class="typeInUserBlock typeService">[dictionary-service]</div>
			      	{{/js_compare}}
			    </div>

		   		<div class="firstLineInUserBlock">
			      <div class="usersNameInUserBlock">
			         <div class="userNameInChatList">{{chatName}}</div>
			      </div>
			      <div class="toCallBlockInUserNameBlock">
			      	 <div class="btnToCallInFirstLine"><i class="fas fa-phone-square"></i></div>
			         <!-- 
			         	<div class="btnToVoiceCallInFirstLine"></div>
			         	<div class="btnToVideoCallInFirstLine"></div>
		         	 -->
			      </div>
			    </div>

			    <div class="secondLineInUserBlock">
			      <div class="leftBlockInSecondLine">
			         <div class="aCpAll_msgSimpleText_flashBlock aCpAll_flashBLocks">
			            <div class="aCpAll_msgSimpleText_flashIcon aCpAll_flashBLocks_icon"></div>
			            <div class="valueInLiveBlocks">
			               <span class="aCpAll_msgSimpleText_animateContainer">
			                  <span style="visibility: visible;"></span>
			                  <ul class="texts" style="display: none;">
			                     <li></li>
			                  </ul>
			               </span>
			            </div>
			         </div>
			         <div class="aCpAll_msgLiveAudio_flashBlock aCpAll_flashBLocks">
			            <div class="aCpAll_msgLiveAudio_flashIcon aCpAll_flashBLocks_icon"></div>
			            <div class="valueInLiveBlocks">
			               <span class="aCpAll_msgLiveAudio_animateContainer">
			                  <span style="visibility: visible;"></span>
			                  <ul class="texts" style="display: none;">
			                     <li></li>
			                  </ul>
			               </span>
			            </div>
			         </div>
			         <div class="aCpAll_msgLiveVideo_flashBlock aCpAll_flashBLocks">
			            <div class="aCpAll_msgLiveVideo_flashIcon aCpAll_flashBLocks_icon"></div>
			            <div class="valueInLiveBlocks">
			               <span class="aCpAll_msgLiveVideo_animateContainer">
			                  <span style="visibility: visible;"></span>
			                  <ul class="texts" style="display: none;">
			                     <li></li>
			                  </ul>
			               </span>
			            </div>
			         </div>

			      </div>
			      <div class="rightBlockInSecondLine"> <span class="newMsgInSecondLine"></span> </div>
			    </div>

			    <div class="thirdLineInUserBlock">
			      <div class="leftBlockInThirdLine">
			         <div class="lastMessageInThirdLine">{{lmsgText}}</div>
			      </div>
			      <div class="rightBlockInThirdLine">
			         <div class="timelastMsgInThirdLine">{{lmsgText}}</div>
			      </div>
			    </div>

			</div>  
			<div class='menusInUsersBlock'></div> 
		</div>
	`;
	const vars = {}; _['vars'] = vars;
	vars['pathToChatList'] 				= '.usersBlockContainerInMenusBlock .app[app-name="base"] .view[view-name="index"] .scrolBlockForChat';
	vars['pathForFlashMsgSimpleText'] 	= '.valueInLiveBlocks .aCpAll_msgSimpleText_animateContainer';
	vars['pathForFlashMsgLiveVideo'] 	= '.valueInLiveBlocks .aCpAll_msgLiveVideo_animateContainer';
	vars['pathForFlashMsgLiveAudio'] 	= '.valueInLiveBlocks .aCpAll_msgLiveAudio_animateContainer';
	vars['pathForEffectsLastMsg'] 		= '.lastMessageInThirdLine';
	const output = {}; _['output'] = output;






	function chat_initGlobalFilter (iNfilter) {
		/*
			@discr
				init global filter for chat sort
			@inputs
				@optional
					iNfilter -> string

		*/
		let filter = iNfilter||'ramman';
		chat_setGlobalFilter(filter);
	} _['chat_initGlobalFilter'] = chat_initGlobalFilter;

	function chat_getGlobalFilter () {
		/*
			@discr
				get global filter for chat sort
			@inputs
				@required

		*/
		var filter = window['connect_globalFilterForUserSort'];
		switch (filter) {
			case 'market':
				return '.' + filter;
			break; 
			case 'sharepay':
				return '.' + filter;
			break; 
			case 'onepay':
				return '.' + filter;
			break; 
			case 'edocument':
				return '.' + filter;
			break; 
			default:
				return 'all';
			break; 
		}
	} _['chat_getGlobalFilter'] = chat_getGlobalFilter;

	function chat_setGlobalFilter (iNfilter) {
		/*
			@discr
				set global filter for chat sort
			@inputs
				@optional
					iNfilter -> string

		*/
		switch (iNfilter) {
			case 'sharepay':
			break; 
			case 'market':
			break; 
			case 'onepay':
			break; 
			case 'edocument':
			break; 
			default:
				iNfilter = 'all';
			break; 
		}
		window['connect_globalFilterForUserSort'] = iNfilter;
	} _['chat_setGlobalFilter'] = chat_setGlobalFilter;
	

	function chat_offSelectEffects () {
		/*
			@discr
				del select effects from all chats
			@inputs
				@required

		*/
		$('.chatDataInUsersBlock').removeClass('selected');
	} _.chat_offSelectEffects = chat_offSelectEffects;

	function chat_addSelectEffectsByChatId (iNchatId) {
		/*
			@discr
				set select effects for this chat
			@inputs
				@required
					iNchatId -> string

		*/
		let pathToThisChat = getPathToChatByChatId(iNchatId);
		$(pathToThisChat).find('.chatDataInUsersBlock').addClass('selected');

	} _.chat_addSelectEffectsByChatId = chat_addSelectEffectsByChatId;

	function chat_setSelectOnlyThisChat (iNchatId) {
		/*
			@discr
				set select effects ONLY for this chat 
			@inputs
				@required
					iNchatId -> string

		*/
		chat_offSelectEffects();
		chat_addSelectEffectsByUserId(iNchatId);

	} _.chat_setSelectOnlyThisChat = chat_setSelectOnlyThisChat;

	function chat_addSelectEffectsByUserId (iNchatId) {
		/*
			@discr
				add select effects by chatId
			@inputs
				@required
					iNchatId -> string

		*/
		let pathToThisChat = getPathToChatByUserId(iNchatId);
		$(pathToThisChat).find('.chatDataInUsersBlock').addClass('selected');

	} _.chat_addSelectEffectsByUserId = chat_addSelectEffectsByUserId;
	
	function chat_hideAllChats () {
		/*
			@discr
				show all chats
			@inputs
				@required
		*/
		let mixer = output['sortMixitUpObject'];
		if(typeof mixer == 'object') mixer.filter("none");

	} _['chat_hideAllChats'] = chat_hideAllChats;

	function chat_showAllChats () {
		/*
			@discr
				show all chats
			@inputs
				@required
		*/
		// $('.mix.usersBlockInMenusBlock').show();
		let mixer = output['sortMixitUpObject'];
		if(typeof mixer == 'object') mixer.filter("all");
	} _['chat_showAllChats'] = chat_showAllChats;

	function chat_showChatByUserId (iNuserId) {
		/*
			@discr
				show chat by his userId
			@inputs
				@required
					iNuserId -> string
		*/

		let mixer = output['sortMixitUpObject'];
		if(typeof mixer == 'object') mixer.filter("[connect_uid='"+iNuserId+"']");
	} _['chat_showChatByUserId'] = chat_showChatByUserId;


	function chat_showChatByChatId (iNchatId) {
		/*
			@discr
				show chat by his chatId
			@inputs
				@required
					iNchatId -> string
		*/

		let mixer = output['sortMixitUpObject'];
		if(typeof mixer == 'object') mixer.filter("[connect_chatid='"+iNchatId+"']");
	} _['chat_showChatByChatId'] = chat_showChatByChatId;


	function chat_hideUserMenus () {
		/*
			@discr
				hide all chat menus
			@inputs
				@required
		*/
		var selector = '#menusBlock .menusInUsersBlock';
		$(selector).hide();
	}
	_['chat_hideUserMenus'] = chat_hideUserMenus;

	function chat_showOnlyThisChatMenu (iNuserId) {
		/*
			@discr
				show only this chat menu by chatId
			@inputs
				@required
					iNchatId -> string
		*/

		// hide all menus
		chat_hideUserMenus();

		//show this chat menu
		chat_showChatMenuByUserId(iNuserId);

	} _['chat_showOnlyThisChatMenu'] = chat_showOnlyThisChatMenu;

	function chat_showChatMenuByUserId (iNchatId) {
		/*
			@discr
				show chat menu by chatId
			@inputs
				@required
					iNchatId -> string

		*/
		var pathToThisChat = getPathToChatByUserId(iNchatId);
		$(pathToThisChat + ' .menusInUsersBlock').show();
	} _['chat_showChatMenuByUserId'] = chat_showChatMenuByUserId;


	function addOnClickActionForChatList (iNchatId) {
		/*
			@discr
				add action for open chat by click to this chat
			@inputs
				@required
					iNchatId -> string

		*/
		var pathToThisChat = getPathToChatByChatId(iNchatId);
		console.log('addOnClickActionForChatList - iNchatId, pathToThisChat',iNchatId, pathToThisChat);

		// selected thi chat -> we remove selected class from all
		chat_setSelectOnlyThisChat(iNchatId);


		//prepare object
		var obj = {};
			var chatId 		= iNchatId;//$(pathToThisChat).attr('connect_chatid');
				obj['chatId'] 	= chatId;
				obj['userType'] = $(pathToThisChat).attr('connect_userType');
				obj['chatType'] = $(pathToThisChat).attr('connect_chatType');
				obj['login'] 	= $(pathToThisChat).attr('connect_userlogin');
				obj['uid'] 		= $(pathToThisChat).attr('connect_uid');
				obj['chatIcon'] = getChatIcon(chatId);
				obj['chatName'] = getChatName(chatId);


		//resort this chat (up this to top)
		// chatPosition_annihilateForSort ();
		// chatPosition_setByChatIdForSort (iNchatId,1); 
		// startEffSortChats ();

		// check has menu
		var attrHasMenu = $(pathToThisChat).attr('connect_userhasmenu');
		if(attrHasMenu){
			// if this chat hasmenu -> open app 'chat' page 'index'
			var dataForOpenApp = 'uid='+obj['login']+'&login='+USER.getMyLogin();

        	// convert to link for open app -> we add need classes
        	var selector = pathToThisChat + ' .iconInUserBlock img, ' + pathToThisChat + ' .userNameInChatList',
        		objForCreateLink = {
        			'appName' 	: 'base',
        			'pageName' 	: 'one',
        			'data' 		: dataForOpenApp
        		};
        	M_APP.view.convertDomElementToAppLink (selector,objForCreateLink);
		} else {
			// if this has not menu -> open app 'chat' page 'index'
			var dataForOpenApp = 'chatName='+obj['chatName']+'&chatId='+obj['chatId']+'&chatIcon='+obj['chatIcon']+'&userLogin='+obj['login']+'&uid='+obj['uid']+'&chatType=' + obj['chatType'];

        	//< safe add online
            	let thisOnline 			= $(pathToThisChat).attr('connect_online');
            	if (typeof thisOnline == 'string' && thisOnline.length > 0) {
        			dataForOpenApp += '&online='+thisOnline
            	}
        	//> safe add online

        	// convert to link for open app -> we add need classes
        	var selector = pathToThisChat + ' .iconInUserBlock img, ' + pathToThisChat + ' .userNameInChatList',
        		objForCreateLink = {
        			'appName' 	: 'chat',
        			'pageName' 	: 'index',
        			'data' 		: dataForOpenApp
        		};
        	M_APP.view.convertDomElementToAppLink (selector,objForCreateLink);
		}
	}
	_['addOnClickActionForChatList'] = addOnClickActionForChatList;

	

	function addUserMenuChildN (iNmenu,iNdataBlockN) {
	   	var newData = getUserMenuChildN(iNmenu);
     	iNdataBlockN.push(newData);
	  	if(typeof iNmenu.children == 'object' && Array.isArray(iNmenu.children) && iNmenu.children.length > 0) {
			for(var menu3SubKey in iNmenu.children) {
		  		iNmenu.children[menu3SubKey]['thisSubMenu'] = 1;
		    	iNmenu.children[menu3SubKey]['parent'] = iNmenu.id;
          
	          if(typeof(iNmenu['parentBox']) == 'object') 
	          	iNmenu.children[menu3SubKey]['parentBox'] = iNmenu['parentBox'].concat([ 'UMP' + iNmenu.id ]);
	          else 
	    		iNmenu.children[menu3SubKey]['parentBox'] = ['UMP' + iNmenu.id];
	          
	            addUserMenuChildN(iNmenu.children[menu3SubKey],iNdataBlockN);
           
         
		    }
	  	}
	}
	_['addUserMenuChildN'] = addUserMenuChildN;

		function getUserMenuChildN (iNdata) {
	    	var temp = Template7.compile(templates['UserMenuChildN']);
	    	return temp(iNdata);
		}

	function addUserMenuChildOne (iNmenu,iNdataBlock2) {
  		var dataBlockN = [];
	  	if(typeof iNmenu.children == 'object' && Array.isArray(iNmenu.children) &&  iNmenu.children.length > 0) {
	  		var childrenMenu2 = iNmenu.children;
	    	for(var menu3Key in childrenMenu2) {
      			childrenMenu2[menu3Key]['parent'] = iNmenu.id;
      			childrenMenu2[menu3Key]['parentBox'] = ['UMP'+iNmenu.id];
	      		addUserMenuChildN(childrenMenu2[menu3Key],dataBlockN);
	    	}
    		iNmenu['sub'] = dataBlockN.join(' ');
	  	}
    	iNdataBlock2.push(getUserMenuChildOne(iNmenu));
	}
	_['addUserMenuChildOne'] = addUserMenuChildOne;

		function getUserMenuChildOne (iNdata) {
	    	var temp = Template7.compile(templates['UserMenuChildOne']);
    		return temp(iNdata);
		}
	

	function addMenuByCategoryList (iNcategory,iNuid) {
		var content = getUserMenuContainerByCats(iNcategory);
		addMenuByContentAndUid(content,iNuid);
		// active actiond for click events by href
		activeActionsForMenuEvents();
	}
	_['addMenuByCategoryList'] = addMenuByCategoryList;

		function activeActionsForMenuEvents () {
	    	$('.appUserMenu.flagMenuLevel1 > a, .appUserMenu.flagMenuLevel1 > div.userMenuParentButton').click(clickToMenuFirstLevel);
	    	$('.appUserMenu.flagMenuLevel2 > a, .appUserMenu.flagMenuLevel2 > div.userMenuParentButton').click(clickToMenuSecondLevel);
	    	$('.appUserMenu.flagMenuLevelN > a, .appUserMenu.flagMenuLevelN > div.userMenuParentButton').click(clickToMenuLevelN);

    		//desable app open by link -> we need off other actions then view error 
	    	$('.appUserMenu.flagMenuLevel1 > a.viewError, .appUserMenu.flagMenuLevel2 > a.viewError, .appUserMenu.flagMenuLevelN > a.viewError').off('click');
	    	$('.appUserMenu.flagMenuLevel1 > a.viewError, .appUserMenu.flagMenuLevel2 > a.viewError, .appUserMenu.flagMenuLevelN > a.viewError').click(clickToMenuForViewError);
	    }
		_['activeActionsForMenuEvents'] = activeActionsForMenuEvents;

			function clickToMenuForViewError (e) {
				e.preventDefault();
				var errorCode = $(this).attr('errorText');
				swal(
				  DICTIONARY.withString('[error-value]') + '!',
				  DICTIONARY.withString(errorCode),
				  'error'
				)
			}

			function clickToMenuFirstLevel (e) {
				e.preventDefault();
				var thisMenuId = $(this).parent().attr('menuid');

				// delete menuButtons and flagMenuNoOffset
				removeMenuButtonAndFlag();
				//hide all submenus of 2level
				$('li.appUserMenu.flagMenuLevelN').hide(150);

				$('ul.subMenusForUid').hide(250);
				if ( $(this).parent().hasClass('flagMenuHasChildren') ) {
					// menu has children
					$(this).parent().children('ul.subMenusForUid').show(350).children('li.flagMenuLevel2[menuparent="'+thisMenuId+'"]').show();
					
				}

				const hrefData = $(this).attr('href');
				if ($(this).is('a') && hrefData) {
					// open app
					const appName = $(this).parent().attr('appName');
					const pageName = $(this).parent().attr('pageName');
	        		M_APP.getGlobalVar('engine').passToApp({'app':appName,'page':pageName,'data':hrefData});
				}
			}
			_['clickToMenuFirstLevel'] = clickToMenuFirstLevel;

			function clickToMenuSecondLevel (e) {
				e.preventDefault();
				var thisMenuId = $(this).parent().attr('menuid');
				var thisParentMenuId = $(this).parent().attr('menuparent');

				// delete menuButtons and flagMenuNoOffset
				removeMenuButtonAndFlag();



				$('li.appUserMenu.flagMenuLevelN').hide(250);
				if ( $(this).parent().hasClass('flagMenuHasChildren') ) {
					//add menu button with actions
					addBackMenuButtonWithActions(thisParentMenuId,this);
					// menu has children
					$(this).closest('ul.subMenusForUid').children('li.appUserMenu.flagMenuLevelN[menuparent="'+thisMenuId+'"]').show(350);
				}
				var hrefData = $(this).attr('href');
				if ($(this).is('a') && hrefData) {
					// open app
					var appName 	= $(this).parent().attr('appName');
					var pageName 	= $(this).parent().attr('pageName');
	        		M_APP.getGlobalVar('engine').passToApp({'app':appName,'page':pageName,'data':hrefData});
				}
			}
			_['clickToMenuFirstLevel'] = clickToMenuFirstLevel;

			function clickToMenuLevelN (e) {
				e.preventDefault();
				var thisMenuId = $(this).parent().attr('menuid');
				var thisParentMenuId = $(this).parent().attr('menuparent');
				//hide all sub menus
				$('li.appUserMenu.flagMenuLevelN, li.appUserMenu.flagMenuLevel2').hide(150);
				// delete menuButtons and flagMenuNoOffset
				removeMenuButtonAndFlag();
				if ( $(this).parent().hasClass('flagMenuHasChildren') ) {
					//remove offset margin left
					$(this).parent().addClass('flagMenuNoOffset');
					//add menu button with actions
					addBackMenuButtonWithActions(thisParentMenuId,this);
					$(this).parent().show(150);
					$(this).closest('ul.subMenusForUid').children('li.appUserMenu.flagMenuLevelN[menuparent="'+thisMenuId+'"]').show(250);
				}
				var hrefData = $(this).attr('href');
				if ($(this).is('a') && hrefData) {
					// open app
					var appName 	= $(this).parent().attr('appName');
					var pageName 	= $(this).parent().attr('pageName');
	        		M_APP.getGlobalVar('engine').passToApp({'app':appName,'page':pageName,'data':hrefData});
				}
			}
				function removeMenuButtonAndFlag () {
					$('.userMenuBackButton').remove();
					$('li.appUserMenu.flagMenuLevelN').removeClass('flagMenuNoOffset');
				}
				function addBackMenuButtonWithActions (iNparentMenuId,thisObject) {
					//this parent el li object show
					$(thisObject).parent().show();
					//add menu button with parent id
					$(thisObject).parent().prepend("<div class='userMenuBackButton' menuparent='"+iNparentMenuId+"'></div>");
					// add colback
					$('.userMenuBackButton[menuparent="'+iNparentMenuId+'"]').click(clickToMenuBackButton);
				}
				function clickToMenuBackButton (e) {
					e.preventDefault();
					var parentId = $(this).attr('menuparent');
					var parentPath = 'li.appUserMenu[menuid="'+parentId+'"]';
					$(parentPath + ' > div.userMenuParentButton').trigger('click');
				}

	function addMenuByContentAndUid (iNcontent,iNuserId) {
		var path = ".usersBlockInMenusBlock[connect_uid='"+iNuserId+"'] .menusInUsersBlock";
		V_VIEW.d_addDataToViewEl(path,iNcontent,'change');
	}
	_['addMenuByContentAndUid'] = addMenuByContentAndUid;

	function getUserMenuContainerByCats (iNmenu) {
	  	var data = iNmenu.categories;
	  	var updatedCategories = {};
	  	var updatedMenu = {'categories':updatedCategories};
	  	// ser order 
	  	var orderList = ['chat','market','dock','sharepay','onepay','page']; // chat menu program create

    	for(var iKey in orderList) {
    		var appKey = orderList[iKey];
    		if(!data[appKey])continue;
    		updatedCategories[appKey] = data[appKey];
    		var dataBlock2 = [];
	    	for(var mKey in updatedCategories[appKey]){
    			var thisMenu =  updatedCategories[appKey][mKey];
				addUserMenuChildOne(thisMenu,dataBlock2);
			}
   			updatedCategories[appKey]['sub'] = dataBlock2.join(' ');
	    }
	  	return getUserMenuContainerFromTemplate(updatedMenu).replace(/[  \n\t\r]+/g,' ');
	}
	_['getUserMenuContainerByCats'] = getUserMenuContainerByCats;
  
		function getUserMenuContainerFromTemplate (iNdata) {
	    	var temp = Template7.compile(templates['UserMenuContainer']);
	    	return temp(iNdata);
		}
		// _['getUserMenuContainerFromTemplate'] = getUserMenuContainerFromTemplate;



	function createChatListIfNotExist (iNdata,iNfunction) {
		/*
			@inputs
				@required
					iNdata -> object
						@required
							chatId
							userId
							icon (icon_big,icon_min)
							chatName
							login
							userType
							chatType
							chatPosition
						@optional
							userHasMenu -> boolean
							printing
							lastMsgTimeText
							lastMsgTime
		*/
		if(typeof iNdata != 'object') iNdata = {};

		var chatType = iNdata.chatType ? parseInt(iNdata.chatType) : 2;
		if( chatType == 1 ) {
			// if private chat
			var chatSelector = getPathToChatByUserId (iNdata['userId']);
		} else {
			// if group chat
			var chatSelector = getPathToChatByChatId (iNdata['chatId']);

		}
		
		if($(chatSelector).length < 1) {
			createChatList(iNdata,iNfunction);
		}

		// create if not exist
	} _.createChatListIfNotExist = createChatListIfNotExist;

	function createPrivateChatListIfNotExist (iNdata) {
		/*
			@inputs
				@required
					iNdata -> object
						@required
							chatId
							userId
							icon (icon_big,icon_min)
							chatName
							login
							userType
							chatType
							chatPosition
						@optional
							userHasMenu -> boolean
							printing
							lastMsgTimeText
							lastMsgTime
		*/
		if(typeof iNdata != 'object') iNdata = {};
		let chatSelector = getPathToChatByUserId(iNdata['userId']);
		// create if not exist
		if($(chatSelector).length < 1) createChatList(iNdata);

	} _.createPrivateChatListIfNotExist = createPrivateChatListIfNotExist;

	function createChatList (iNdata, iNfunction) {
		/*
			@inputs
				@required
					iNdata -> object
						chatId
						userId
						icon_big
						icon_min
						chatName
						printing
						lastMsgTimeText
						lastMsgTime
		*/
		if(typeof iNdata['chatPosition'] != 'number') iNdata['chatPosition'] = 999;
		var content = DICTIONARY.withString ( getUserListTemplate ( iNdata ) );
		let mixer = output['sortMixitUpObject'];

		mixer.insert($(content)).then(function(state) {
	        if(typeof iNfunction == 'function') iNfunction();
	    });
		// $(vars['pathToChatList']).prepend( content );
	}
	_['createChatList'] = createChatList;

	function removeChatListByUserId (iNuserId, iNfunction) {
		/*
			@inputs
				@required
					iNuserId -> string
		*/
		var selectorForDel = getPathToChatByUserId (iNuserId);
		let mixer = output['sortMixitUpObject'];

		mixer.remove(selectorForDel).then(function(state) {
	        if(typeof iNfunction == 'function') iNfunction();
	    });
		// $(vars['pathToChatList']).prepend( content );
	}
	_['removeChatListByUserId'] = removeChatListByUserId;

	


		function getUserListTemplate (iNdata) {
	    	var temp = Template7.compile(templates['UserList']);
	    	return temp(iNdata);
		}
	function setEffectsForChatList (iNchatId) {
		/*
			@discr
				set base effect for last msg and live block in chat list container
			@inputs
				@required
					iNchatId -> string
		*/
		flash_msgSimpleText_init( iNchatId );
		flash_msgLiveAudio_init( iNchatId );
		flash_msgLiveVideo_init( iNchatId );
		startEffLastMsgByChatId( iNchatId );
	}
	_['setEffectsForChatList'] = setEffectsForChatList;

	function safeAddChatList (iNdata) {
        /*
        	@discr
            	safe create chat list el if it did not isset
			
			@inputs
				@required
					iNdata -> object
						chatId
						userId
						icon_big
						icon_min
						chatName
						printing
						lastMsgTimeText
						lastMsgTime

						type
            @return 
            	string: coung of chat list element
        */
        var lengthChatList = findChatBlock(iNdata['chatId']);
        if (lengthChatList < 1) {
        	createChatList(iNdata);
        	// add effect for last msg and live flash messages
        	setEffectsForChatList(iNdata['chatId']);
        }
       
    }
	_['safeAddChatList'] = safeAddChatList;
	//chat
		function getPathToDomChatHeader (iNchatId) {
			return '.appBase_pIndexLeftBlockInChiefHeader[connect_chatid="'+iNchatId+'"]';
		}
		_['getPathToDomChatHeader'] = getPathToDomChatHeader;
	//chat
		function findChatBlock (iNchatId) {
			return $( getPathToChatByChatId(iNchatId) ).length;
		}
		_['findChatBlock'] = findChatBlock;

			function getPathToChatByChatId (iNchatId) {
				return '.usersBlockInMenusBlock[connect_chatid="'+iNchatId+'"]';//[chatType="2"]
			}
			_['getPathToChatByChatId'] = getPathToChatByChatId;

			function getPathToChatByUserId (iNuserId) {
				return '.usersBlockInMenusBlock[connect_uid="'+iNuserId+'"]';
			}
			_['getPathToChatByUserId'] = getPathToChatByUserId;

		function getChatIdByUid (iNuid) {
			return $('.usersBlockInMenusBlock[connect_uid="'+iNuid+'"]').attr('connect_chatid');;
		}
		_['getChatIdByUid'] = getChatIdByUid;

		function effHideChatLists () {
			$('.usersBlockInMenusBlock').hide();
		}
		_['effHideChatLists'] = effHideChatLists;

		function effShowChatList (iNchatId) {
			$('.usersBlockInMenusBlock[connect_chatid="'+iNchatId+'"]').show();
		}
		_['effShowChatList'] = effShowChatList;

			function getChatIcon (iNchatId) {
				var pathToIcon = getPathToChatByChatId(iNchatId) + ' .iconBlockInUserBlock img';
				return $(pathToIcon).attr('src');
			}
			_['getChatIcon'] = getChatIcon;

			function getChatName (iNchatId) {
				var pathToIcon = getPathToChatByChatId(iNchatId) + ' .userNameInChatList';
				return $(pathToIcon).text();
			}
			_['getChatName'] = getChatName;

			function getUserLoginFromPrivateChat (iNchatId) {
				var pathTo = getPathToChatByChatId(iNchatId);
				return $(pathToIcon).attr('connect_userLogin');
			}
			_['getUserLoginFromPrivateChat'] = getUserLoginFromPrivateChat;

			function getUserTypeFromPrivateChat (iNchatId) {
				var pathTo = getPathToChatByChatId(iNchatId);
				return $(pathToIcon).attr('connect_userType');
			}
			_['getUserTypeFromPrivateChat'] = getUserTypeFromPrivateChat;

	//effects
		function initSort () {
		    /*
		    	@discr
		        	create object for sort chats block
		        @inputs
					@required
					@optional
		    */
			 if(typeof(output['sortMixitUpObject']) != 'undefined') output['sortMixitUpObject'].destroy();

		    output['sortMixitUpObject'] = mixitup (
		    	vars['pathToChatList'],
		    	{
		    		load: {
		    			'sort' : 'position-of-chat:asc lastmsgtime:desc',
		    		}
		    	}
	    	);
		} _['initSort'] = initSort;

		function startEffSortChats (iNdata) {
		    /*
		    	@discr
		        	sort chats block
		        @inputs
					@required
					@optional
						iNdata -> object
							filter
							sort
		    */

		    if(typeof(output['sortMixitUpObject']) != 'undefined') {
		    	var mixer = output['sortMixitUpObject'],block = {};
		    	if( typeof(iNdata) != 'object' ) iNdata = {};
		    		var sort, sortdefault, filter;
				    if( typeof(iNdata.filter) == 'string' )      
				    	filter 		=  iNdata.filter;
				    else {
				    	filter 		=  chat_getGlobalFilter();
				    }

				    if( typeof(iNdata.sort)  == 'string' )       
				    	sort 		=  iNdata.sort;
				    else {
				    	sort 		=  'position-of-chat:asc lastmsgtime:desc';
				    	sortdefault 		= 'sortable position-of-chat:asc lastmsgtime:desc';
					    mixer.sort(sortdefault);
				    	mixer.sort(sort);
				    }

			    	mixer.filter(filter);
			}
		}
		_['startEffSortChats'] = startEffSortChats;

		function chatPosition_annihilateForSort () {
			/*
				@discr 
					annihilate chat position for sort
				@inputs : Void

			*/
			$('.mix.usersBlockInMenusBlock').attr('data-position-of-chat',999);
		} _.chatPosition_annihilateForSort = chatPosition_annihilateForSort;

		function chatPosition_setByChatIdForSort (iNchatId,iNnumber) {
			/*
				@discr 
					set chat position for sort
				@inputs
					@required
						iNchatId -> string
					@optoinal
						iNnumber -> number

			*/
			if (typeof iNnumber != 'number') iNnumber = 1;
			$(getPathToChatByChatId(iNchatId)).attr('data-position-of-chat',iNnumber);
		} _.chatPosition_setByChatIdForSort = chatPosition_setByChatIdForSort;

		function chatPosition_setByUserIdForSort (iNchatId,iNnumber) {
			/*
				@discr 
					set chat position for sort
				@inputs
					@required
						iNchatId -> string
					@optoinal
						iNnumber -> number

			*/
			if (typeof iNnumber != 'number') iNnumber = 1;
			$(getPathToChatByUserId(iNchatId)).attr('data-position-of-chat',iNnumber);
		} _.chatPosition_setByUserIdForSort = chatPosition_setByUserIdForSort;

		function flash_msgSimpleText_init (iNchatId) {
		    /*
		    	@discr
		        	sort chats block
		        @inputs
					@required
					@optional
						iNdata -> object
							filter
							sort
		    */
            var chatObject = getPathToChatByChatId(iNchatId);
	    	$(chatObject +' '+ vars['pathForFlashMsgSimpleText']).textillate({ autoStart:false, in: {effect: 'wobble',delay:10 } });
		}
		_['flash_msgSimpleText_init'] = flash_msgSimpleText_init;

		function flash_msgLiveAudio_init (iNchatId) {
		    /*
		    	@discr
		        	sort chats block
		        @inputs
					@required
					@optional
						iNdata -> object
							filter
							sort
		    */
            var chatObject = getPathToChatByChatId(iNchatId);
	    	$(chatObject +' '+ vars['pathForFlashMsgLiveAudio']).textillate({ autoStart:false, in: {effect: 'wobble',delay:10 } });
		}
		_['flash_msgLiveAudio_init'] = flash_msgLiveAudio_init;

		function flash_msgLiveVideo_init (iNchatId) {
		    /*
		    	@discr
		        	sort chats block
		        @inputs
					@required
					@optional
						iNdata -> object
							filter
							sort
		    */
            var chatObject = getPathToChatByChatId(iNchatId);
	    	$(chatObject +' '+ vars['pathForFlashMsgLiveVideo']).textillate({ autoStart:false, in: {effect: 'wobble',delay:10 } });
		}
		_['flash_msgLiveVideo_init'] = flash_msgLiveVideo_init;

		function startEffLastMsgByChatId (iNchatId) {
		    /*
		    	@discr
		        	sort chats block
		        @inputs
					@required
					@optional
						iNdata -> object
							filter
							sort
		    */
            var chatObject = getPathToChatByChatId(iNchatId);
			$(chatObject +' '+ vars['pathForEffectsLastMsg']).textillate({ autoStart:false, in: {effect: 'fadeInLeftBig',delay:30 }, out: {effect: 'fadeOutRightBig', delay:15, callback: function () { $(chatObject + ' .lastMessageInThirdLine').textillate('start');} }, minDisplayTime:150 }).textillate('start');
		}
		_['startEffLastMsgByChatId'] = startEffLastMsgByChatId;

		function startEffHideLiveInChatsList (iNchatId,iNtime) {
		    /*
		    	@discr
		        	hide live msg block after iNtime ms
		        @inputs
					@required
					@optional
						iNdata -> object
							filter
							sort
		    */
		    if( typeof(iNtime) != 'number' ) iNtime = 2500; 
		    if( typeof(output['objectTimeoutForHideLiveInChatsList']) != 'undefined') clearTimeout(output['objectTimeoutForHideLiveInChatsList'])
		    output['objectTimeoutForHideLiveInChatsList'] = setTimeout(function () {
            	var chatObject = getPathToChatByChatId(iNchatId);
		        $(chatObject + ' .aCpAll_flashBLocks').hide();
		    }, iNtime);
		}
		_['startEffHideLiveInChatsList'] = startEffHideLiveInChatsList;


		function domChangeCountMessages (iNchatId,iNnumber) {
            /*
                change new msg count by $newMsg variable
                1 - iNchatId (String)
                    defined chat object
                2 - iNnumber (int)
                @depends
                    getPathToChatByChatId
            */
            var chatObject = getPathToChatByChatId(iNchatId);
            $(chatObject + ' .newMsgInSecondLine').html(iNnumber);
		}
		_['domChangeCountMessages'] = domChangeCountMessages;

			function domSafeShowNewMsgCountInChatBlock (iNchatId,iNnumber) {
                /*
                    show block what show new msg count in chatBLock
                    1 - chatObject (String)
                        defined chat object
                */
				domChangeNewMsgCountInChatBlock(iNchatId,iNnumber);
				domShowNewMsgCountInChatBlock(iNchatId);
			}
			_['domSafeShowNewMsgCountInChatBlock'] = domSafeShowNewMsgCountInChatBlock;

			function domChangeNewMsgCountInChatBlock (iNchatId,iNnumber) {
                /*
                    show block what show new msg count in chatBLock
                    1 - chatObject (String)
                        defined chat object
                */
                var chatObject = getPathToChatByChatId(iNchatId);
                $(chatObject + ' .newMsgInSecondLine').html(iNnumber);
            }
			_['domChangeNewMsgCountInChatBlock'] = domChangeNewMsgCountInChatBlock;

            function domShowNewMsgCountInChatBlock (iNchatId) {
                /*
                    show block what show new msg count in chatBLock
                    1 - chatObject (String)
                        defined chat object
                */
                var chatObject = getPathToChatByChatId(iNchatId);
                $(chatObject + ' .newMsgInSecondLine').css('display','inline-block');
            }
			_['domShowNewMsgCountInChatBlock'] = domShowNewMsgCountInChatBlock;

            function domHideNewMsgCountInChatBlock (iNchatId) {
                /*
                    hide block what show new msg count in chatBLock
                    1 - chatObject (String)
                        defined chat object
                    @depends
                        domClearNewMsgCountInChatBloc()
                */
                var chatObject = getPathToChatByChatId(iNchatId);
                $(chatObject + ' .newMsgInSecondLine').hide();
            }
			_['domHideNewMsgCountInChatBlock'] = domHideNewMsgCountInChatBlock;

		function domChangeDidOnlineChatHeader (iNchatId) {
            /*
            	@discr
                	change chat-header did show
            	@inputs
	                iNchatId -> stirng
            */
            var chatObject = getPathToDomChatHeader(iNchatId);
            $(chatObject + ' .appBase_userStateOffline').hide();
            $(chatObject + ' .appBase_userStateOnline').fadeIn(500);
        }
		_['domChangeDidOnlineChatHeader'] = domChangeDidOnlineChatHeader;

		function domChangeDidOfflineChatHeader (iNchatId,iNtime) {
            /*
            	@discr
                	change chat-header did show
            	@inputs
	                iNchatId -> stirng
            */
            var chatObject = getPathToDomChatHeader(iNchatId);
            $(chatObject + ' .appBase_userStateOffline').fadeIn().html( DICTIONARY.withString('[dictionary-was] ' + MOMENT(iNtime).calendar()) );
            $(chatObject + ' .appBase_userStateOnline').hide(500);
        }
		_['domChangeDidOfflineChatHeader'] = domChangeDidOfflineChatHeader;

		function domChangeAddUserOnlineFlag (iNchatId) {
            /*
            	@discr
                	add css .flagUserOnline class 
            	@inputs
	                iNchatId -> stirng
            */
            var chatObject = getPathToChatByChatId(iNchatId) + ' .chatDataInUsersBlock';
            $(chatObject).addClass('flagUserOnline');
            $(chatObject).attr('connect_online',1);
        }
		_['domChangeAddUserOnlineFlag'] = domChangeAddUserOnlineFlag;

		function domChangeRemoveUserOnlineFlag (iNchatId,iNtime) {
            /*
            	@discr
                	add css .flagUserOnline class 
            	@inputs
	                iNchatId -> stirng
            */
            var chatObject = getPathToChatByChatId(iNchatId) + ' .chatDataInUsersBlock';
            $(chatObject).removeClass('flagUserOnline');
            $(chatObject).attr('connect_online',iNtime);
        }
		_['domChangeRemoveUserOnlineFlag'] = domChangeRemoveUserOnlineFlag;

        function domChangeIconInChatBlock (iNchatId,icon) {
            /*
                change icon in ChatBlock by ChatBlockId and icon
                1 - chatObject (String)
                    defined chat object
                2 - icon (String)
                    new icon src
            */
            var chatObject = getPathToChatByChatId(iNchatId);
            $(chatObject+" .iconInUserBlock img").attr('src',icon);
        }
		_['domChangeIconInChatBlock'] = domChangeIconInChatBlock;

        function domChangeChatNameInChatBlock (iNchatId,chatName) {
            /*
                change chatName in ChatBlock by ChatBlockId and chatName
                1 - chatObject (String)
                    defined chat object
                2 - chatName (String)
                    new user Name

            */
            var chatObject = getPathToChatByChatId(iNchatId);
            $(chatObject+" .userNameInChatList").text(chatName);
        }
		_['domChangeChatNameInChatBlock'] = domChangeChatNameInChatBlock;


        function domChangeLoginInChatBlock (iNchatId,userLogin) {
            /*
                change chatName in ChatBlock by ChatBlockId and chatName
                1 - chatObject (String)
                    defined chat object
                2 - chatName (String)
                    new user Name

            */
            var chatObject = getPathToChatByChatId(iNchatId);
            $(chatObject).attr('cLogin',userLogin);
        }
		_['domChangeLoginInChatBlock'] = domChangeLoginInChatBlock;

        function domChangeLastMsgTextAndTimeInChatBlock(iNchatId,iNdata){
            /*
                change last message data in Chat Block
                1 - chatObject (String)
                    defined chat object
                2 - iNdata (Object)
                    lmsgText (String)
                    lmsgTime (String)
            */
            var chatObject = getPathToChatByChatId(iNchatId);
            var lastMsgText = V_MESSAGE.msg_getLastMsg (iNdata);
            if($(chatObject + ' .lastMessageInThirdLine .current').text() != lastMsgText) {
                var NowTime = getTodayTime( iNdata.lmsgTime );
                $(chatObject + ' .lastMessageInThirdLine').find('.texts li:first').text(lastMsgText);
                $(chatObject + ' .lastMessageInThirdLine').textillate( 'out' );
                $(chatObject + " .timelastMsgInThirdLine").text( NowTime );
                $(chatObject).attr('data-lastmsgtime', iNdata.lmsgTime );
                startEffSortChats();
            }
        }
		_['domChangeLastMsgTextAndTimeInChatBlock'] = domChangeLastMsgTextAndTimeInChatBlock;


		function getTodayTime (iNtime) {
		    return new Date(iNtime).getHours() + ':' + new Date(iNtime).getMinutes();
		}  
		_['getTodayTime'] = getTodayTime;


		function flash_hideAllFlashBlocks (iNchatId) {
			// body...
            var chatObject = getPathToChatByChatId(iNchatId);
			$(chatObject + ' .aCpAll_flashBLocks').hide();
		}

        function flash_msgSimpleText_activeFlashEffect (iNchatId, iNdata) {
            /*
                invoke chat animation printing simple text
                1 - chatObject
                    defined chat object
                2 - iNdata with liveData and liveStatus

            */

            var chatObject = getPathToChatByChatId(iNchatId);
            var currentValue = $(chatObject + ' .aCpAll_msgSimpleText_animateContainer .current').text();
            if(currentValue != iNdata.liveData){

            	flash_hideAllFlashBlocks(iNchatId);

                if(iNdata.liveType == 1) {
                    // 
                    $(chatObject + ' .aCpAll_msgSimpleText_flashBlock').show();
                    // $(chatObject + ' .aCpAll_msgSimpleText_flashIcon').show();
                }else{
                    // del this later
                }
                $(chatObject + ' .aCpAll_msgSimpleText_animateContainer').find('.texts li:first').text(iNdata.liveData);
                $(chatObject + ' .aCpAll_msgSimpleText_animateContainer').textillate('start');
            }
        }
		_['flash_msgSimpleText_activeFlashEffect'] = flash_msgSimpleText_activeFlashEffect;


		function flash_msgLiveAudio_activeFlashEffect (iNchatId, iNdata) {
            /*
                invoke chat animation printing simple text
                1 - chatObject
                    defined chat object
                2 - iNdata with liveData and liveStatus

            */

            var chatObject = getPathToChatByChatId(iNchatId);
            var currentValue = $(chatObject + ' .aCpAll_msgLiveAudio_animateContainer .current').text();
            if(currentValue != iNdata.liveData){
	            flash_hideAllFlashBlocks(iNchatId);
                if(iNdata.liveType == 20){
                    // 
                    $(chatObject + ' .aCpAll_msgLiveAudio_flashBlock').show();
                    $(chatObject + ' .aCpAll_msgLiveAudio_flashIcon').show();
                }else{
                    // del this later
                }
                $(chatObject + ' .aCpAll_msgLiveAudio_animateContainer').find('.texts li:first').text(iNdata.liveData);
                $(chatObject + ' .aCpAll_msgLiveAudio_animateContainer').textillate('start');
            }
        }
		_['flash_msgLiveAudio_activeFlashEffect'] = flash_msgLiveAudio_activeFlashEffect;

		function flash_msgLiveVideo_activeFlashEffect (iNchatId, iNdata) {
            /*
                invoke chat animation printing simple text
                1 - chatObject
                    defined chat object
                2 - iNdata with liveData and liveStatus

            */
            
            var chatObject = getPathToChatByChatId(iNchatId);
            var currentValue = $(chatObject + ' .aCpAll_msgLiveVideo_animateContainer .current').text();
            if(currentValue != iNdata.liveData){
	            flash_hideAllFlashBlocks(iNchatId);

                if(iNdata.liveType == 21) {
                    // 
                    $(chatObject + ' .aCpAll_msgLiveVideo_flashBlock').show();
                    $(chatObject + ' .aCpAll_msgLiveVideo_flashIcon').show();
                }else{
                    // del this later
                }
                $(chatObject + ' .aCpAll_msgLiveVideo_animateContainer').find('.texts li:first').text(iNdata.liveData);
                $(chatObject + ' .aCpAll_msgLiveVideo_animateContainer').textillate('start');
            }
        }
		_['flash_msgLiveVideo_activeFlashEffect'] = flash_msgLiveVideo_activeFlashEffect;

		function domAddVerificateStatusToChatBlock (chatObject) {
            /*
                add verificate status to chatBlock
                1 - chatObject (String)
                    defined chat object
            */
            $(chatObject + ' .usersNameInUserBlock').append("<span class=\"isVerificateinUserBlock\"></span>");
        } _['domAddVerificateStatusToChatBlock'] = domAddVerificateStatusToChatBlock;
	//> effects


	function onClickCategoryForCreateChat (iNsuccessFunc, iNerrorFunc) {
        /*
            @inputs
                @required
        */
        var iNsuccessFunc = iNsuccessFunc;
        var iNerrorFunc = iNerrorFunc;
        (
        	()=>{
	        	$('.viewCategoryPrompt').click( 
	        		(event) =>  {
			            var thisUserId          = $(event.target).attr('categoryUserId'),
			                thisUserLogin       = $(event.target).attr('categoryUserLogin');

			            if( thisUserId && thisUserLogin ) {
			                // SUCCESS we has login and uid for create chat
			                showPromptQuestionForCreateChat ( iNsuccessFunc, iNerrorFunc, thisUserId , thisUserLogin);
			            } else {
			                // ERROR we has NOT  login and uid
			                if (typeof iNerrorFunc == 'function') iNerrorFunc ();

			            }
	        		}
	        	);
	        }
        )()
        
    } _['onClickCategoryForCreateChat'] = onClickCategoryForCreateChat;


    function showPromptQuestionForCreateChat ( iNsuccessFunc, iNerrorFunc, iNuid, iNulogin) {
        (()=>{

        	swal({
	          title: 'Создать чат с этим пользователем?',
	          text: "Чат необходим для общения!",
	          type: 'warning',
	          showCancelButton: true,
	          confirmButtonColor: '#3085d6',
	          cancelButtonColor: '#d33',
	          confirmButtonText: 'Да, создать чат!',
	          cancelButtonText: 'Нет, отмена!',
	          confirmButtonClass: 'btn btn-success',
	          cancelButtonClass: 'btn btn-danger',
	          buttonsStyling: false
	        }).then(
		        (result) => {
		          if (result.value) {
		            if (typeof iNsuccessFunc == 'function') iNsuccessFunc(iNuid,iNulogin);
		            // result.dismiss can be 'cancel', 'overlay',
		            // 'close', and 'timer'
		          } else if (result.dismiss === 'cancel') {
		            if (typeof iNerrorFunc == 'function') iNerrorFunc(iNuid,iNulogin);
		          }
		        }
	        )
        })()
        
    } // _['showPromptQuestionForCreateChat'] = showPromptQuestionForCreateChat;

	return _;
});