define([ 'jquery', 'template7', 'v_app','dictionary','m_moment', 'jquery.appear'],function( $, Template7,V_APP ,DICTIONARY,MOMENT) {
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
		</div>
	`;

	templates['chatContainer'] = `
		<div class='ChatViewInAppWindow' connect_chatid='{{chatId}}'>{{content}}</div>
	`;

	templates['chiefHeader_user'] = `
		    <div class="appBase_pIndexLeftBlockInChiefHeader" connect_chatid="{{chatId}}"  connect_uid="{{uid}}">
		       {{#if back}}
			   <div class="appBase_backButton"></div>
			   {{/if}}
			   <div class="appBase_iconChief">
			      <a href="#"><img src="{{icon}}" class="appBase_pIndexUserImg"></a>
			      {{#if servise}}
			      <div class="appBase_userTypeBlock"><a href="#" class="CML" cmlk="[dictionary-servise]">[dictionary-service]</a></div>
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
		        	<span class="appBase_userStateOnline CML" cmlk="[dictionary-servise]" {{#if online}}{{else}}style='display:none'{{/if}}>[dictionary-online]</span>

					
			        <span class="appBase_userStateOffline CML" {{#if online}}style='display:none'{{/if}}>{{offlineTime}}</span>
			        {{#if offlineTime}}{{/if}}
			      </div>
			      <div class="appBase_chiefHeaderThirdLine">
					
			        <div class="appBase_onlineEyeIcon"></div>
			        {{#if watchNow}}{{/if}}
			      </div>
			   </div>
			</div>
			<div class="appBase_pIndexRightBlockInChiefHeader"></div>
		`;

	templates['appTemplate'] = `
		<div class="aCpI_streamVideo">
		  <video class="aCpI_videoStreamElement"></video>
		  <div class="aCpI_videoStreamTimeCounter"></div>
		</div>
		<div class="chatBlockInViewBlock">
		   <div class="viewesFooterUnderWindow">
		      <div id="senderBlockInViewBlock">
		         <div class="boxInMessageSenderBlock">
		            <div class="counterInChatId"></div>
		            <div class="buttonChatToBottom"></div>
		         </div>
		         
		         <div class="effectsForCancelling _noneSelect">
		         	<div class="cancellingAudio effectsFlag"></div>
		         	<div class="cancellingVideo effectsFlag"></div>
		         </div>

		         <div class="cancelBtnInMsgSenderButton"></div>


		         <div class="timerInMsgSenderBlock">
		         	<div class='audioTimerInMsgSenderBlock'></div>
		         	<div class='videoTimerInMsgSenderBlock'></div>
		         	<span></span>
		         </div>
		         <div id="bottomViewInMsgBlock">
		            <ul class="rawBlockInBottomView">
		               <li class="LineInBottomViewRawBlock">1</li>
		               <li class="LineInBottomViewRawBlock">2</li>
		            </ul>
		         </div>
		         <div id="sendTextButtonInSenderBlock" class="sendMsgButtons _noneSelect"></div>
		         <div id="sendLiveAudioButtonInSenderBlock" class="sendMsgButtons _noneSelect"></div>
		         <div id="sendLiveVideoButtonInSenderBlock" class="sendMsgButtons hideHalfSendMsgButton _noneSelect"></div>
		         <div id="forTextInputInSenderBlock">
		            <textarea ></textarea>
		         </div>
		         <div class="connectButtonInMsgSenderBlock"></div>
		      </div>
		   </div>
		</div>
	`;
	_['templates'] = templates;


	// function showStreamVideoViewer () {
	// 	$('.aCpI_streamVideo').css('display','flex');
	// }
	// _['showStreamVideoViewer'] = showStreamVideoViewer;

	// function hideStreamVideoViewer () {
	// 	$('.aCpI_streamVideo').css('display','none');
	// }
	// _['hideStreamVideoViewer'] = hideStreamVideoViewer;


	// function setStreamVideoElement (iNstream) {
	// 	// $('.aCpI_videoStreamElement')[0].src = URL.createObjectURL(iNstream);
	// 	$('.aCpI_videoStreamElement')[0].srcObject = iNstream;
	// }
	// _['setStreamVideoElement'] = setStreamVideoElement;

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
		var temp = Template7.compile(templates['appTemplate']);
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
							chatId
						@optional
							online -> bool
							back -а-> bool
							offlineTime -> int
							watchNow -> bool
		*/
		var temp = Template7.compile(templates['chiefHeader_user']);
		return DICTIONARY.withString(temp(iNdata));
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
							online -> number
				@optional
					iNtype -> string 
						in [end,begin, after, before, change]
		*/
		if( typeof iNtype != 'string' ) iNtype = 'end';
		//add online/ofline status
		if( typeof iNdata['online'] != 'undefined' ) {
			var onlineTime = parseInt(iNdata['online'])||0;
			if( onlineTime == 0) {
				// de
				delete iNdata['online'];
			} else if ( onlineTime > 1 ){
				// set online status
				delete iNdata['online'];
				iNdata['offlineTime'] = DICTIONARY.withString('[dictionary-was] ' + MOMENT(onlineTime).calendar());
			}
		}
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