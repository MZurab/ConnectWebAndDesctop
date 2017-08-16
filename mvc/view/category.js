define(['jquery','mixitup','jquery.textillate','jquery.lettering'], function($,mixitup) {//'m_view','m_app'
	const _ = {};
	const templates = {}; _['templates'] = templates;
	templates['UserMenuChildN'] = `
  	<li menuid='{{id}}' menuparent='{{parent}}' class='appUserMenu flagSubMenu{{#if thisSubMenu}} userMenuSubFlag{{/if}}{{#if parentBox}} {{join parentBox delimiter=" "}}{{/if}}' >
      <a href="{{data}}">{{name}}</a>
      {{#if children.length}}
    		<div class="userMenuParentButton"></div>
      {{/if}}
    </li>
  `;
  	templates['UserMenuChildOne'] = `
  	<li menuid='{{id}}' class='appUserMenu'>
        <a href="{{data}}">{{name}}</a>
		{{#if sub}}
			<div class="userMenuParentButton"></div>
			<ul class="subMenusForUid">
				 {{sub}}
			</ul>
		{{/if}}
	</li>
    `;
    templates['UserMenuContainer'] = `
     {{#each data}}
		  	<div class="menuListForUsers">
		  		<div class="appMenusForUsers"  app-name="{{@key}}">
					<div class="appNameInMenuList app-{{@key}}">
					  <span class='CMLK'>[[app-{{@key}}]]</span>
					</div>
          
					{{#if ../sub}}
					  <ul class="menusForUid">
							{{../../sub}}
						  </ul>
					{{/if}}
					</div>
		  	</div>
	  	{{/each}}
    `;
    templates['UserList'] = `
		<div class="mix usersBlockInMenusBlock" connect_uid="{{userId}}" connect_chatid="{{chatId}}" data-lastmsgtime="{{lastMsgTime}}">
		   <div class="iconBlockInUserBlock">
		      <div class="iconInUserBlock">
		      	<img class="lazy" data-original="{{icon_big}}" src="{{icon_mini}}">
		      </div>
		      <div class="typeInUserBlock"></div>
		   </div>
		   
		   <div class="firstLineInUserBlock">
		      <div class="usersNameInUserBlock">
		         <div class="userNameInChatList">{{userName}}</div>
		      </div>
		      <div class="toCallBlockInUserNameBlock">
		         <div class="btnToVoiceCallInFirstLine"></div>
		         <div class="btnToVideoCallInFirstLine"></div>
		      </div>
		   </div>

		   <div class="secondLineInUserBlock">
		      <div class="leftBlockInSecondLine">
		         <div class="liveStatusTextBlock liveBlocks">
		            <div class="liveStatusTextWriting"></div>
		            <div class="valueInLiveBlocks">
		               {{printing}}... 
		               <span class="printingAmount">
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
		         <div class="lastMessageInThirdLine"></div>
		      </div>
		      <div class="rightBlockInThirdLine">
		         <div class="timelastMsgInThirdLine">{{lastMsgTimeText}}</div>
		      </div>
		   </div>
		</div>
	`;
	const vars = {}; _['vars'] = vars;
	vars['pathToChatList'] 				= '.usersBlockContainerInMenusBlock .app[app-name="base"] .view[view-name="index"] .scrolBlockForChat';
	vars['pathForEffectsTestPrinting'] 	= '.valueInLiveBlocks .printingAmount';
	vars['pathForEffectsLastMsg'] 		= '.lastMessageInThirdLine';
	const output = {}; _['output'] = output;

	function addUserMenuChildN (iNmenu,iNdataBlockN) {
	   	var newData = getUserMenuChildN(iNmenu);
     	iNdataBlockN.push(newData);
	  	if(iNmenu.children.length > 0) {
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
	  	var childrenMenu2 = iNmenu.children;
	  	if(childrenMenu2.length > 0) {
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
	


	function addMenuByContentAndUid (iNcontent,iNuserId) {
		var path = ".usersBlockInMenusBlock[connect_uid='"+iNuserId+"']";
		V_VIEW.d_addDataToViewEl(path,iNcontent,'after');
	}
	_['addMenuByContentAndUid'] = addMenuByContentAndUid;

	function getUserMenuContainerByCats (iNmenu) {
	  	var data = iNmenu.data;
    	var dataBlock2 = [];
	    for(var appKey in data) {
	    	for(var mKey in data[appKey]){
    			var thisMenu =  data[appKey][mKey];
				addUserMenuChildOne(thisMenu,dataBlock2);
			}
	    }
   		iNmenu['sub'] = dataBlock2.join(' ');
	  	return getUserMenuContainerFromTemplate(iNmenu).replace(/[  \n\t\r]+/g,' ');
	}
	_['getUserMenuContainerByCats'] = getUserMenuContainerByCats;
  
		function getUserMenuContainerFromTemplate (iNdata) {
	    	var temp = Template7.compile(templates['UserMenuContainer']);
	    	return temp(iNdata);
		}
		// _['getUserMenuContainerFromTemplate'] = getUserMenuContainerFromTemplate;



	function addChatList (iNdata) {
		/*
			@inputs
				@required
					iNdata -> object
						chatId
						userId
						icon_big
						icon_min
						userName
						printing
						lastMsgTimeText
						lastMsgTime
		*/
		console.log('addChatList iNdata',iNdata);
		var content = getUserListTemplate ( iNdata );
		$(vars['pathToChatList']).prepend( content );
		console.log('addChatList pathToChatList',vars['pathToChatList']);
		console.log('addChatList content',content);
	}
	_['addChatList'] = addChatList;

	function setEffectsForChatList (iNchatId) {
		/*
			@discr
				set base effect for last msg and live block in chat list container
			@inputs
				@required
					iNchatId -> string
		*/
		startEffPrintingByChatId( iNchatId );
		startEffLastMsgByChatId( iNchatId );
	}
	_['setEffectsForChatList'] = setEffectsForChatList;

	function findChatBlock (iNdata) {
        /*
        	@discr
            	find chat by chatId or uid
            @return 
            	string: dom path to block OR false
            @required
                1 - iNdata -> object
                    chatId OR uid
        */
        var chatId, uidObject, chatObject = false;
        if( typeof (iNdata.chatId) != 'undefined' ){
            chatId = iNdata.chatId;
        }else if ( typeof(iNdata.uuid) != 'undefined' ){
            uidObject = ".usersBlockInMenusBlock[connect_uid='"+iNdata.uuid +"']";
            chatId = $(uidObject).attr('connect_chatid');

        }
        chatObject = ".usersBlockInMenusBlock[connect_chatId='"+chatId +"']";
        return chatObject;
    }
	_['findChatBlock'] = findChatBlock;


		function getUserListTemplate (iNdata) {
	    	var temp = Template7.compile(templates['UserList']);
	    	return temp(iNdata);
		}

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

		function startEffPrintingByChatId (iNchatId) {
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
	    	$(iNchatId +' '+ vars['pathForEffectsTestPrinting']).textillate({ autoStart:false, in: {effect: 'wobble',delay:10 } });
		}
		_['startEffPrintingByChatId'] = startEffPrintingByChatId;

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
			$(iNchatId +' '+ vars['pathForEffectsLastMsg']).textillate({ autoStart:false, in: {effect: 'fadeInLeftBig',delay:30 },out: {effect: 'fadeOutRightBig', delay:15, callback: function () { $(iNchatId + ' .lastMessageInThirdLine').textillate('start');} }, minDisplayTime:150 }).textillate('start');
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
		    if( typeof(iNtime) != 'undefined' ) iNtime = 2500; 
		    if( typeof(output['objectTimeoutForHideLiveInChatsList']) != 'undefined') clearTimeout(output['objectTimeoutForHideLiveInChatsList'])
		    output['objectTimeoutForHideLiveInChatsList'] = setTimeout(function () {
		        $(iNchatId + ' .liveBlocks').hide();
		    }, iNtime);
		}
		_['startEffHideLiveInChatsList'] = startEffHideLiveInChatsList;



		function domPlusCountMessages ( chatObject, newMsg ) {
            /*
                increase new msg count by $newMsg variable
                1 - chatObject (String)
                    defined chat object
                2 - newMsg (int)
                @depends
                    domShowNewMsgCountInChatBlock
            */
            if(typeof(newMsg) == 'undefined') newMsg = 1;
            var count_msg = parseInt($(chatObject + ' .newMsgInSecondLine').text()) + newMsg;
            $(chatObject + ' .newMsgInSecondLine').change(count_msg);
            domShowNewMsgCountInChatBlock(chatObject);
        }
		_['domPlusCountMessages'] = domPlusCountMessages;

            function domShowNewMsgCountInChatBlock (chatObject) {
                /*
                    show block what show new msg count in chatBLock
                    1 - chatObject (String)
                        defined chat object
                */
                $(chatObject + ' .newMsgInSecondLine').show();
            }
			_['domShowNewMsgCountInChatBlock'] = domShowNewMsgCountInChatBlock;

            function domHideNewMsgCountInChatBlock (chatObject) {
                /*
                    hide block what show new msg count in chatBLock
                    1 - chatObject (String)
                        defined chat object
                    @depends
                        domClearNewMsgCountInChatBloc()
                */
                $(chatObject + ' .newMsgInSecondLine').hide();
            }
			_['domHideNewMsgCountInChatBlock'] = domHideNewMsgCountInChatBlock;

                function domClearNewMsgCountInChatBloc (chatObject) {
                    /*
                        set to zero block what show new msg count in chatBLock
                        1 - chatObject (String)
                            defined chat object
                    */
                    $(chatObject + ' .newMsgInSecondLine').text('');
                }
				_['domClearNewMsgCountInChatBloc'] = domClearNewMsgCountInChatBloc;

        function domChangeIconInChatBlock (chatObject,icon) {
            /*
                change icon in ChatBlock by ChatBlockId and icon
                1 - chatObject (String)
                    defined chat object
                2 - icon (String)
                    new icon src
            */
            console.log('domChangeIconInChatBlock chatObject',chatObject);
            console.log('domChangeIconInChatBlock icon',icon);
            $(chatObject+" .iconInUserBlock img").attr('src',icon);
        }
		_['domChangeIconInChatBlock'] = domChangeIconInChatBlock;

        function domChangeUserNameInChatBlock (chatObject,userName) {
            /*
                change userName in ChatBlock by ChatBlockId and UserName
                1 - chatObject (String)
                    defined chat object
                2 - userName (String)
                    new user Name

            */
            console.log('domChangeUserNameInChatBlock chatObject',chatObject);
            console.log('domChangeUserNameInChatBlock userName',userName);
            $(chatObject+" .userNameInChatList").text(userName);
        }
		_['domChangeUserNameInChatBlock'] = domChangeUserNameInChatBlock;

        function domChangeLastMsgTextAndTimeInChatBlock(chatObject,iNdata){
            /*
                change last message data in Chat Block
                1 - chatObject (String)
                    defined chat object
                2 - iNdata (Object)
                    lmsgText (String)
                    lmsgTime (String)
            */
            if($(chatObject + ' .lastMessageInThirdLine .current').text() != iNdata.lmsgText) {
                var NowTime = getTodayTime( iNdata.lmsgTime );
                $(chatObject + ' .lastMessageInThirdLine').find('.texts li:first').text(iNdata.lmsgText);
                $(chatObject + ' .lastMessageInThirdLine').textillate('out');
                $(chatObject+ " .timelastMsgInThirdLine").text( NowTime );
                $(chatObject).attr('data-lastmsgtime', iNdata.lmsgTime );
                startEffSortChats();
            }
        }
		_['domChangeLastMsgTextAndTimeInChatBlock'] = domChangeLastMsgTextAndTimeInChatBlock;


		function getTodayTime (iNtime) {
		    return new Date(iNtime).getHours() + ':' + new Date(iNtime).getMinutes();
		}  
		_['getTodayTime'] = getTodayTime;

        function domLiveSimpleTextAnimation (chatObject, iNdata) {
            /*
                invoke chat animation printing simple text
                1 - chatObject
                    defined chat object
                2 - iNdata with liveData and liveStatus

            */
            var currentValue = $(chatObject + ' .printingAmount .current').text();
            if(currentValue != iNdata.liveData){
                if(iNdata.liveStatus == 1){
                    // 
                    $(chatObject + ' .liveStatusTextBlock').show();
                    $(chatObject + ' .liveStatusTextWriting').show();
                }else{
                    // del this later
                }
                $(chatObject + ' .printingAmount').find('.texts li:first').text(iNdata.liveData);
                $(chatObject + ' .printingAmount').textillate('start');
            }
        }
		_['domLiveSimpleTextAnimation'] = domLiveSimpleTextAnimation;

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