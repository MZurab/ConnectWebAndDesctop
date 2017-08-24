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
					<div class="appBase_ListHeader_login">@{{login}}</div>
			   </div>
			</div>
			<div class="appBase_listHeaderButtonsBlock">
				<div class="appBase_buttonOptions"><img src="https://cdn.ramman.net/web/res/images/buttons/options.png"></div>
				<div class="appBase_buttonSignOut"><img src="https://cdn.ramman.net/web/res/images/buttons/signOut.png"></div>
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

	function addUserHeaderInList (iNdata) {
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
		*/
		var objForAddHeader = {'app':CONST['name'],page: CONST['pageIndex']};
			objForAddHeader['content'] = getListHeaderForIndexPage (iNdata);
		V_APP.d_addAppMenuHeaderByTemplate(objForAddHeader);
	}
	_['addUserHeaderInList'] = addUserHeaderInList;
	

	


	return _;
});