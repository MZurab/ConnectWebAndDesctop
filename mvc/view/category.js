define(
	['m_app','v_message','v_view','jquery','mixitup','dictionary','m_moment','jquery.textillate','jquery.lettering'], 
	function( M_APP,V_MESSAGE, V_VIEW, $, mixitup, DICTIONARY , MOMENT ) 
{//'m_view','m_app'
	const _ = {};
	const templates = {}; _['templates'] = templates;
	templates['UserMenuChildN'] = `
  	<li menuid='{{id}}' menuparent='{{parent}}'  appName='{{app}}' pageName='{{page}}' class='appUserMenu {{#if children}}flagMenuHasChildren{{/if}}  flagSubMenu {{#if thisSubMenu}}flagMenuLevelN{{else}}flagMenuLevel2{{/if}}{{#if parentBox}} {{join parentBox delimiter=" "}}{{/if}}' >
      <a href="{{data}}">{{name}}</a>
      {{#if children}}
    		<div class="userMenuParentButton"></div>
      {{/if}}
    </li>
  `;
  	templates['UserMenuChildOne'] = `
  	<li menuid='{{id}}' class='appUserMenu {{#if sub}}flagMenuHasChildren{{/if}} flagMenuLevel1' appName='{{app}}' pageName='{{page}}'>
        <a href="{{data}}" class='menuLink flagMenuLevel1'>{{name}}</a>
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
		<div class="mix usersBlockInMenusBlock" connect_uid="{{userId}}" connect_chatid="{{chatId}}" data-lastmsgtime="{{lmsgTime}}" connect_userType='{{userType}}' connect_userLogin='{{login}}'>
			<div class='chatDataInUsersBlock'>
				<div class="iconBlockInUserBlock">
			      <div class="iconInUserBlock">
			      	<img class="lazy" data-original="{{icon}}" src="{{icon}}">
			      </div>
			      <div class="typeInUserBlock"></div>
			    </div>

		   		<div class="firstLineInUserBlock">
			      <div class="usersNameInUserBlock">
			         <div class="userNameInChatList">{{chatName}}</div>
			      </div>
			      <div class="toCallBlockInUserNameBlock">
			         <div class="btnToVoiceCallInFirstLine"></div>
			         <div class="btnToVideoCallInFirstLine"></div>
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






	function onClickToChatList (iNchatId,iNfunction) {
		var pathToThisChat = getPathToDomElByChatId(iNchatId);
		$(pathToThisChat + ' .iconInUserBlock img, ' + pathToThisChat + ' .userNameInChatList').off();
		$(pathToThisChat + ' .iconInUserBlock img, ' + pathToThisChat + ' .userNameInChatList').click(function(e) {
			e.preventDefault();
			var obj = {};
			let chatId 		= iNchatId;//$(this).attr('connect_chatid');
				obj['chatId'] 	= chatId;
				obj['userType'] = $(this).closest('.mix.usersBlockInMenusBlock').attr('connect_userType');;
				obj['login'] 	= $(this).closest('.mix.usersBlockInMenusBlock').attr('connect_userLogin');
				obj['uid'] 		= $(this).closest('.mix.usersBlockInMenusBlock').attr('connect_uid');;
				obj['chatIcon'] = getChatIcon(chatId);
				obj['chatName'] = getChatName(chatId);
				if(typeof iNfunction == 'function')iNfunction(obj,this);

		});
	}
	_['onClickToChatList'] = onClickToChatList;




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
	    }
		_['activeActionsForMenuEvents'] = activeActionsForMenuEvents;

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
    	for(var appKey in data) {
    		var dataBlock2 = [];
	    	for(var mKey in data[appKey]){
    			var thisMenu =  data[appKey][mKey];
				addUserMenuChildOne(thisMenu,dataBlock2);
			}
   			data[appKey]['sub'] = dataBlock2.join(' ');
	    }
	  	return getUserMenuContainerFromTemplate(iNmenu).replace(/[  \n\t\r]+/g,' ');
	}
	_['getUserMenuContainerByCats'] = getUserMenuContainerByCats;
  
		function getUserMenuContainerFromTemplate (iNdata) {
	    	var temp = Template7.compile(templates['UserMenuContainer']);
	    	return temp(iNdata);
		}
		// _['getUserMenuContainerFromTemplate'] = getUserMenuContainerFromTemplate;



	function createChatList (iNdata) {
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
		var content = getUserListTemplate ( iNdata );
		$(vars['pathToChatList']).prepend( content );
	}
	_['createChatList'] = createChatList;

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
            @return 
            	string: coung of chat list element
        */
        var lengthChatList = findChatBlock(iNdata['chatId']);
        if(lengthChatList < 1) {
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
		_['getPathToDomElByChatId'] = getPathToDomElByChatId;
	//chat
		function findChatBlock (iNchatId) {
			return $( getPathToDomElByChatId(iNchatId) ).length;
		}
		_['findChatBlock'] = findChatBlock;
			function getPathToDomElByChatId (iNchatId) {
				return '.usersBlockInMenusBlock[connect_chatid="'+iNchatId+'"]';
			}
			_['getPathToDomElByChatId'] = getPathToDomElByChatId;
		

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
				var pathToIcon = getPathToDomElByChatId(iNchatId) + ' .iconBlockInUserBlock img';
				return $(pathToIcon).attr('src');
			}
			_['getChatIcon'] = getChatIcon;

			function getChatName (iNchatId) {
				var pathToIcon = getPathToDomElByChatId(iNchatId) + ' .userNameInChatList';
				return $(pathToIcon).text();
			}
			_['getChatName'] = getChatName;

			function getUserLoginFromPrivateChat (iNchatId) {
				var pathTo = getPathToDomElByChatId(iNchatId);
				return $(pathToIcon).attr('connect_userLogin');
			}
			_['getUserLoginFromPrivateChat'] = getUserLoginFromPrivateChat;

			function getUserTypeFromPrivateChat (iNchatId) {
				var pathTo = getPathToDomElByChatId(iNchatId);
				return $(pathToIcon).attr('connect_userType');
			}
			_['getUserTypeFromPrivateChat'] = getUserTypeFromPrivateChat;

	//effects
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

		    if(typeof(output['sortMixitUpObject']) != 'undefined') output['sortMixitUpObject'].destroy();

		    output['sortMixitUpObject'] = mixitup(vars['pathToChatList']);
		    var block = {};
		    
		    if( typeof(iNdata) == 'undefined' )         	iNdata={};
		    if( typeof(iNdata.filter) == 'undefined' )      block.filter 	=  '.usersBlockInMenusBlock';
		    if( typeof(iNdata.sort) == 'undefined' )        block.sort 		=  'lastmsgtime:desc';
		    output['sortMixitUpObject'].multimix(block);
		}
		_['startEffSortChats'] = startEffSortChats;

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
            var chatObject = getPathToDomElByChatId(iNchatId);
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
            var chatObject = getPathToDomElByChatId(iNchatId);
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
            var chatObject = getPathToDomElByChatId(iNchatId);
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
            var chatObject = getPathToDomElByChatId(iNchatId);
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
            	var chatObject = getPathToDomElByChatId(iNchatId);
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
                    getPathToDomElByChatId
            */
            var chatObject = getPathToDomElByChatId(iNchatId);
            $(chatObject + ' .newMsgInSecondLine').html(iNnumber);
		}
		_['domChangeCountMessages'] = domChangeCountMessages;

		// function domPlusCountMessages ( iNchatId, newMsg ) {
  //           /*
  //               increase new msg count by $newMsg variable
  //               1 - chatObject (String)
  //                   defined chat object
  //               2 - newMsg (int)
  //               @depends
  //                   domShowNewMsgCountInChatBlock
  //           */
  //           var chatObject = getPathToDomElByChatId(iNchatId);
  //           if(typeof(newMsg) == 'undefined') newMsg = 1;
  //           var count_msg = parseInt($(chatObject + ' .newMsgInSecondLine').text()) + newMsg;
  //           $(chatObject + ' .newMsgInSecondLine').change(count_msg);
  //           domShowNewMsgCountInChatBlock(chatObject);
  //       }
		// _['domPlusCountMessages'] = domPlusCountMessages;

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
                var chatObject = getPathToDomElByChatId(iNchatId);
                $(chatObject + ' .newMsgInSecondLine').html(iNnumber);
            }
			_['domChangeNewMsgCountInChatBlock'] = domChangeNewMsgCountInChatBlock;

            function domShowNewMsgCountInChatBlock (iNchatId) {
                /*
                    show block what show new msg count in chatBLock
                    1 - chatObject (String)
                        defined chat object
                */
                var chatObject = getPathToDomElByChatId(iNchatId);
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
                var chatObject = getPathToDomElByChatId(iNchatId);
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
            var chatObject = getPathToDomElByChatId(iNchatId);
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
            var chatObject = getPathToDomElByChatId(iNchatId) + ' .chatDataInUsersBlock';
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
            var chatObject = getPathToDomElByChatId(iNchatId);
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
            var chatObject = getPathToDomElByChatId(iNchatId);
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
            var chatObject = getPathToDomElByChatId(iNchatId);
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
            var chatObject = getPathToDomElByChatId(iNchatId);
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
            var chatObject = getPathToDomElByChatId(iNchatId);
			$(chatObject + ' .aCpAll_flashBLocks').hide();
		}

        function flash_msgSimpleText_activeFlashEffect (iNchatId, iNdata) {
            /*
                invoke chat animation printing simple text
                1 - chatObject
                    defined chat object
                2 - iNdata with liveData and liveStatus

            */

            var chatObject = getPathToDomElByChatId(iNchatId);
            var currentValue = $(chatObject + ' .aCpAll_msgSimpleText_animateContainer .current').text();
            if(currentValue != iNdata.liveData){

            	flash_hideAllFlashBlocks(iNchatId);

                if(iNdata.liveType == 1) {
                    // 
                    $(chatObject + ' .aCpAll_msgSimpleText_flashBlock').show();
                    console.log("$(chatObject + ' .aCpAll_msgSimpleText_flashBlock')",$(chatObject + ' .aCpAll_msgSimpleText_flashBlock'));
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

            var chatObject = getPathToDomElByChatId(iNchatId);
            var currentValue = $(chatObject + ' .aCpAll_msgLiveAudio_animateContainer .current').text();
            if(currentValue != iNdata.liveData){
	            console.log('flash_msgLiveAudio_activeFlashEffect iNdata',iNdata);
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
            
            var chatObject = getPathToDomElByChatId(iNchatId);
            var currentValue = $(chatObject + ' .aCpAll_msgLiveVideo_animateContainer .current').text();
            if(currentValue != iNdata.liveData){
	            console.log('flash_msgLiveVideo_activeFlashEffect iNdata',iNdata);
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
        }
		_['domAddVerificateStatusToChatBlock'] = domAddVerificateStatusToChatBlock;
	//> effects
	return _;
});