define([ 'jquery', 'template7'],function( $, Template7){
	const _ = {};
	const CONST = {};
		CONST['']
	const templates = {
		// 'page' : {
		// 	'menus' : {
		// 		'pageName': {
		// 			'index': "template",
		// 			'other': 'otherTemplate'
		// 		},
		// 		'*' : { // принадлежи к app
		// 			'index': 'template',
		// 			'other': 'otherTemplate'
		// 		}	
		// 	},
			

		// },
		// 'apps' : {
		// 	'someName': '',
		// }

	};

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

	templates['msgFrom'] = `
		<div class="fromMeMessageInChatView" connect_msg="{{msgId}}">
		   <div class="lineInFromMeMessage">
		      <div class="lineInBoxInLine">
		         <div class="topCircleInMessages"></div>
		         <div class="botCircleInMessages"></div>
		         <div class="timeTopInMessages">{{timeSent}}</div>
		         <div class="timeBotInMessages">{{timeRead}}</div>
		      </div>
		   </div>
		   <div class="contentTextInFromMeMessage">{{content}}</div>
		</div>
	`;

	templates['msgTo'] = `
		<div class="toMeMessageInChatView" connect_msg="{{msgId}}">
		   <div class="lineInToMeMessage">
		      <div class="lineInBoxInLine">
		         <div class="topCircleInMessages"></div>
		         <div class="botCircleInMessages"></div>
		         <div class="timeTopInMessages">{{timeSent}}</div>
		         <div class="timeBotInMessages">{{timeRead}}</div>
		      </div>
		   </div>
		   <div class="contentTextInToMeMessage">{{content}}</div>
		</div>
	`;

	templates['chatContainer'] = `
		<div class='ChatViewInAppWindow' connect_chatid='{{chatId}}'>{{content}}</div>
	`;


	_['templates'] = templates;

	function addMessageToChatPage ( iNdata, iNmyUid, iNchatId ) {
        var iNneedView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        $( iNneedView ).append( getMessage ( iNdata, iNmyUid ) );
	}
    _['addMessageToChatPage'] = addMessageToChatPage;

	function getMessage (iNdata,iNmyUid) {
		/*
			@discr

			@inputs
				iNdata -> object
					msgId 		-> string
					timeSent 	-> string
					timeRead 	-> string
					content 	-> string

					@optional
						type		-> string

		*/
		var el;
		if ( iNdata.user == iNmyUid )
            el = getMsgFrom(iNdata);
        else 
            el = getMsgTo(iNdata);
        return el;
	}
    _['getMessage'] = getMessage;

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