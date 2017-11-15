define(['jquery','m_user','template7','v_view','v_app'],function($,USER,Template7,V_VIEW,V_APP) {
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
				{{#if login}}
					<div class="appBase_buttonSignOut connect_system_href" 	code_href="signOut"></div>
				{{else}}
					<div class="appBase_buttonSignIn connect_system_href" 	code_href="signIn"></div>
				{{/if}}
			</div>
			<div class="ChoosePlaceInMenusBlock"></div>
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

	function addUserHeaderInList (iNdata,iNtype) {
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
		console.log('addUserHeaderInList iNdata,iNtype',iNdata,iNtype);
		if( typeof iNtype != 'string' ) iNtype = 'end';
		var objForAddHeader = {'app':CONST['name'],'page': CONST['pageIndex']};
		// add user flag
		objForAddHeader['content'] = getListHeaderForIndexPage (iNdata);


		V_APP.safeViewMenuHeaderWithContent(objForAddHeader,iNtype);
	}
	_['addUserHeaderInList'] = addUserHeaderInList;


	function getRealChatIdByUid (iNuid) {
		// body...
		var path 		= ".usersBlockContainerInMenusBlock .scrolBlockForChat .mix.usersBlockInMenusBlock[connect_uid='"+iNuid+"']";
		var el 			= $(path);
		console.log('getRealChatIdByUid path,el',path,el);
		var chatId 		= el.attr('connect_chatid');
		var userLogin 	= el.attr('connect_userlogin');
		console.log('getRealChatIdByUid chatId,userLogin',chatId,userLogin);
		if ( el && userLogin != chatId ) {
			// 
			return chatId;
		}
		return false;
	}
	_['getRealChatIdByUid'] = getRealChatIdByUid;
	




	return _;
});