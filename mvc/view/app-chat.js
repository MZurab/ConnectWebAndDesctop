define([ 'jquery', 'template7', 'v_app', 'jquery.appear'],function( $, Template7, V_APP ) {
	const _ = {};
	const CONST = {'name':'base','pageIndex':'index'};
	const templates = {};

	templates['app'] = `
		<div id="subViewInViewAndChatBlock">
		   <div id="menuWindowInSubView"></div>
		   <div id="viewWindow" class="appChiefWindow">
		      <div>
		         <div id="leftBlockInViewWindow"></div>
		      </div>
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
	`;

	templates['chatContainer'] = `
		<div class='ChatViewInAppWindow' connect_chatid='{{chatId}}'>{{content}}</div>
	`;

	templates['chiefHeader_user'] = `
		    <div class="appBase_pIndexLeftBlockInChiefHeader">
		       {{#if back}}
			   <div class="appBase_backButton"></div>
			   {{/if}}
			   <div class="appBase_iconChief">
			      <a href="#"><img src="{{icon}}" class="appBase_pIndexUserImg"></a>
			      {{#if servise}}
			      <div class="appBase_userTypeBlock"><a href="#" class="CML" cmlk="[dictionary-servise]">Сервис</a></div>
			      {{/if}}
			   </div>
			   <div class="appBase_infoBlock">
			      <div class="appBase_userNameBlock">
			         <a href="#" class="CML" cmlk="[dictionary-name]">{{name}}</a>
			      	 {{#if verified}}
			         <div class="appBase_iconUserVerified"></div>
			         {{/if}}
			      </div>
			      <div class="appBase_userStateBlock">
					{{#if online}}
			        	<span class="appBase_userStateOnline">онлайн</span>
			        {{/if}}

					{{#if offlineTime}}
			        <span class="appBase_userStateOffline">был(-а) {{offlineTime}}</span>
			        {{/if}}
			      </div>
			      <div class="appBase_chiefHeaderThirdLine">
					{{#if watchNow}}
			         <div class="appBase_onlineEyeIcon"></div>
			        {{/if}}
			      </div>
			   </div>
			</div>
			<div class="appBase_pIndexRightBlockInChiefHeader"></div>
		`;

	templates['chatSenderBlock'] = `
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
	`;
	_['templates'] = templates;


	function getChatSenderBlock (iNdata) {
		/*
			@inputs
				@required
					iNdata
						@required
							name
							icon
							id
						@optional
							online -> bool
							back -а-> bool
							offlineTime -> int
							watchNow -> bool
		*/
		var temp = Template7.compile(templates['chatSenderBlock']);
		return temp(iNdata);
	}
	_['getChatSenderBlock'] = getChatSenderBlock;

	function getAppHeaderForIndexPage (iNdata) {
		/*
			@inputs
				@required
					iNdata
						@required
							name
							icon
							id
						@optional
							online -> bool
							back -а-> bool
							offlineTime -> int
							watchNow -> bool
		*/
		var temp = Template7.compile(templates['chiefHeader_user']);
		return temp(iNdata);
	}
	function addUserHeaderInChief (iNdata,iNtype) {
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
		var objForAddHeader = {'app':CONST['name'],page: CONST['pageIndex']};
			objForAddHeader['content'] = getAppHeaderForIndexPage (iNdata);
		V_APP.safeViewAppHeaderWithContent(objForAddHeader,iNtype);
	}
	_['addUserHeaderInChief'] = addUserHeaderInChief;



    	function effChatViewScrollToBot () {
			V_APP.effScrollToButtom('#leftBlockInViewWindow',300);

    	}
    	_['effChatViewScrollToBot'] = effChatViewScrollToBot;


	function getApp (iNdata) {
		var temp = Template7.compile(templates['app']);
		return temp(iNdata);
	}
	_['getApp'] = getApp;

	// 
    function createChatContainer (iNchatId) {
        var viewParent = "#leftBlockInViewWindow ";
        $(viewParent).prepend ( getChatContainer({'chatId':iNchatId}) );
    }
    _['createChatContainer'] = createChatContainer;

    function hideChatContainers () {
        $("#leftBlockInViewWindow .ChatViewInAppWindow").hide();
    }
    _['hideChatContainers'] = hideChatContainers;

    function showChatContainerByChatId (iNchatId) {
        $("#leftBlockInViewWindow .ChatViewInAppWindow" + "[connect_chatid='"+iNchatId+"']" ).show();
    }
    _['showChatContainerByChatId'] = showChatContainerByChatId;

    function getCountsOfChatContainers (iNchatId) {
        var needView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        return $(needView).length;
    }
    _['getCountsOfChatContainers'] = getCountsOfChatContainers;

    	function getChatContainer (iNdata) {
			/*
				@discr

				@inputs
					@required
					iNdata -> object
						chatId 		-> string
						@optional
							content -> string


			*/
			var temp = Template7.compile(templates['chatContainer']);
			return temp(iNdata);
    	}





	return _;
});