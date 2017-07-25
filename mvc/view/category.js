define(['jquery','v_chat','m_view','m_app'],function() {
	var templates = {};
	/*
		templates['appMenuForUser'] =  `
			<div class="menuListForUsers">
			   {{#each apps}}
				   <div class="appMenusForUsers"  app-name="{{code}}">
					      <div class="appNameInMenuList app-{{code}}">
						      <span>{{name}}</span>
					      </div>
						      <ul class="menusForUid">
						         <li>
						            <a href="#">Компьютеры</a>

						            <div class="menuButtonInTheMenu"></div>
						            <ul class="subMenusForUid">
						               <li>
						                  <div class="backButtonInTheMenu"></div>
						                  <a href="#">Asus</a>
						                  <div class="menuButtonInTheMenu"></div>
						               </li>
						               <li class="backType"><a href="#">Apple</a></li>
						               <li class=""><a href="#">Apple</a></li>
						            </ul>

						         </li>
						         <li><a href="#">Телевизоры</a></li>
						         <li><a href="#">Мебель</a></li>
						         <li><a href="#">Люстры</a></li>
						      </ul>
				   </div>
			   {{/each}}
			</div>
		`;
	*/
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
		function getUserMenuChildOne (iNdata) {
	    	var temp = Template7.compile(templates['UserMenuChildOne']);
    		return temp(iNdata);
		}
	function addUserMenuContainer (iNmenu) {
	  	var data = iNmenu.data;
    	var dataBlock2 = [];
	    for(var appKey in data) {
	    	for(var mKey in data[appKey]){
    			var thisMenu =  data[appKey][mKey];
				addUserMenuChildOne(thisMenu,dataBlock2);
			}
	    }
   		iNmenu['sub'] = dataBlock2.join(' ');
	  	return getUserMenuContainer(iNmenu).replace(/[  \n\t\r]+/g,' ');
	}
  
		function getUserMenuContainer (iNdata) {
	    	var temp = Template7.compile(templates['UserMenuContainer']);
	    	return temp(iNdata);
		}

	return {
    	'addUserMenuContainer' : addUserMenuContainer
    }
});