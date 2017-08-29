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
	templates['msgCenterSimpleText'] = `
		<div class="centerMsgInChatView">{{content}}</div>
	`;
	templates['msgFrom'] = `
		<!--<div class="messagesInChatView fromMeMessageInChatView {{#if note}}noteMessage{{/if}}" connect_msg="{{msgId}}" appear-parent='#leftBlockInViewWindow'>-->
		   <div class="lineInFromMeMessage">
		      <div class="lineInBoxInLine">
		         {{#if timeSentText}}
			         <div class="topCircleInMessages"></div>
			         <div class="timeTopInMessages">{{timeSentText}}</div>
		         {{/if}}

		         
	         	<div class="botCircleInMessages" {{#if timeDeliveredText}}{{else}}style="display:none;"{{/if}}  {{#if timeDeliveredText}}title="{{timeDeliveredText}}"{{/if}}></div>
	         	<div class="timeBotInMessages" {{#if timeReadText}}{{else}}style="display:none;"{{/if}}>{{#if timeReadText}}{{timeReadText}}{{/if}}</div>

		      </div>
		   </div>
		   <div class="contentTextInFromMeMessage">{{content}}</div>
		<!--</div>-->
	`;

	templates['msgTo'] = `
		<!--<div class="messagesInChatView toMeMessageInChatView {{#if note}}noteMessage{{/if}}" connect_msg="{{msgId}}" appear-parent='#leftBlockInViewWindow'>-->
		   <div class="lineInToMeMessage">
		      <div class="lineInBoxInLine">
				 {{#if timeSentText}}
			         <div class="topCircleInMessages"></div>
			         <div class="timeTopInMessages">{{timeSentText}}</div>
		         {{/if}}
		         
		         <div class="botCircleInMessages" {{#if timeDeliveredText}}{{else}}style="display:none;"{{/if}}  {{#if timeDeliveredText}}title="{{timeDeliveredText}}"{{/if}}></div>
	         	<div class="timeBotInMessages" {{#if timeReadText}}{{else}}style="display:none;"{{/if}}>{{#if timeReadText}}{{timeReadText}}{{/if}}</div>

		      </div>
		   </div>
		   <div class="contentTextInToMeMessage">{{content}}</div>

		<!--</div>-->
	`;
	templates['msgBox'] = `
		<div class="messagesInChatView {{#if fromMe}}fromMeMessageInChatView{{/if}}{{#if toMe}}toMeMessageInChatView{{/if}} {{#if note}}noteMessage{{/if}}" connect_msg="{{msgId}}" appear-parent='#leftBlockInViewWindow'>
			{{boxContent}}
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

	function addCenterSimpleTextToChatPage ( iNdata, iNchatId ) {
        var iNneedView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        $( iNneedView ).append( getCenterSimleTextBlock ( iNdata ) );
	}
	_['addCenterSimpleTextToChatPage'] = addCenterSimpleTextToChatPage;

		function getCenterSimleTextBlock (iNdata) {
			/*
				@inputs
					@required
						iNdata
							@required
								content
							@optional
			*/
			var temp = Template7.compile(templates['msgCenterSimpleText']);
			return temp(iNdata);
		}
		_['getCenterSimleTextBlock'] = getCenterSimleTextBlock;
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

	function addMessageToChatPage ( iNdata, iNmyUid, iNchatId ) {
        var thisIssetLength = getLengthMessages(iNdata, iNmyUid, iNchatId);
        if(thisIssetLength < 1) {
        	// create message
        	createMessageToChatPage ( iNdata, iNmyUid, iNchatId )
        } else {
        	replaceMessageToChatPage ( iNdata, iNmyUid, iNchatId );
        }
	}
    _['addMessageToChatPage'] = addMessageToChatPage;

    function getLengthMessages ( iNdata, iNmyUid, iNchatId ) {
        var iNneedView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        var fullPath = " .messagesInChatView[connect_msg='"+iNdata['msgId']+"']";
        return $( fullPath ).length;
	}
    _['getLengthMessages'] = getLengthMessages;

    function createMessageToChatPage ( iNdata, iNmyUid, iNchatId ) {
        var iNneedView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        $( iNneedView ).append( getMessage ( iNdata, iNmyUid ) );
	}
    _['createMessageToChatPage'] = createMessageToChatPage;

    function replaceMessageToChatPage ( iNdata, iNmyUid, iNchatId ) {
        console.log('replaceMessageToChatPage start');
        var iNneedView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        var fullPath = " .messagesInChatView[connect_msg='"+iNdata['msgId']+"']";
        $( fullPath ).replaceWith( getMessage ( iNdata, iNmyUid ) );
	}
    _['createMessageToChatPage'] = createMessageToChatPage;

	    function setMessageDeliveryTime (iNchatId,iNmsgId,iNtime) {
        	var iNneedView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        	var thisMessageView = iNneedView + ' .messagesInChatView[connect_msg="'+iNmsgId+'"] .lineInBoxInLine';
        	$(thisMessageView + ' .botCircleInMessages').show().attr('title',iNtime);
		}
    	_['setMessageDeliveryTime'] = setMessageDeliveryTime;

		function setMessageReadTime (iNchatId,iNmsgId,iNtime) {
        	var iNneedView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        	var thisMessageView = iNneedView + ' .messagesInChatView[connect_msg="'+iNmsgId+'"] .lineInBoxInLine';
        	$(thisMessageView + ' .botCircleInMessages').show();
        	$(thisMessageView + ' .timeBotInMessages').show().text(iNtime);
		}
    	_['setMessageReadTime'] = setMessageReadTime;

	function getMessage (iNdata,iNmyUid) {
		/*
			@discr

			@inputs
				iNdata -> object
					msgId 		-> string
					state 	    -> object
						sent      -> timestamp
						delivered -> timestamp
						time      -> timestamp
					timeRead 	-> string
					content 	-> string

					@optional
						type		-> string

		*/
		var el = {}, result;
		if ( iNdata.uid == iNmyUid ) {

            iNdata['fromMe'] = 1;
            iNdata['boxContent'] = getMsgFrom(iNdata);
		}
        else {
            iNdata['toMe'] = 1;
            iNdata['boxContent'] = getMsgTo(iNdata);
        }
        return getMsgBox(iNdata);
	}
    _['getMessage'] = getMessage;

    	function getMsgBox (iNdata) {
			var temp = Template7.compile(templates['msgBox']);
			return temp(iNdata);
		}
    	_['getMsgFrom'] = getMsgFrom;

		function getMsgFrom (iNdata) {
			var temp = Template7.compile(templates['msgFrom']);
			return temp(iNdata);
		}
    	_['getMsgFrom'] = getMsgFrom;

		function getMsgTo (iNdata) {
			var temp = Template7.compile(templates['msgTo']);
			return temp(iNdata);
		}
    	_['getMsgTo'] = getMsgTo;

    		function setObserverForViewInVisualScroll (iNmsgId,iNfunctionSuccess) {
				console.log('setObserverForViewInVisualScroll ' + iNmsgId);
    			var selector = '.messagesInChatView[connect_msg="'+iNmsgId+'"]';
    			$(selector).appear();
    			$(selector).on('appear', iNfunctionSuccess);
    		}
			_['setObserverForViewInVisualScroll'] = setObserverForViewInVisualScroll;
			function delObserverForViewInVisualScroll (iNmsgId) {
				console.log('delObserverForViewInVisualScroll ' + iNmsgId);
    			var selector = '.messagesInChatView[connect_msg="'+iNmsgId+'"]';
    			$(selector).off('appear');
    		}
			_['delObserverForViewInVisualScroll'] = delObserverForViewInVisualScroll;
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