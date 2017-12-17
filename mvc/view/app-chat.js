define([ 'jquery', 'template7', 'v_app','dictionary','m_moment', 'jquery.appear'], function ( $, Template7, V_APP , DICTIONARY, MOMENT ) {
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
		  <video class="aCpI_videoStreamElement" muted></video>
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

			objForAddHeader['withReplace'] = 1;
			
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



	//@< COLOR FOR USER IN CHAT
		const userColor_array = 
["#9A12B3","#005031","#205E3B","#3C1362","#3B0053","#AA0000","#B11030","#552F00","#2A5547","#00008B","#114C2A","#0000B5","#4B6A88","#000036","#804600","#804028","#522032","#34385E","#5A4586","#550000","#600060","#294429","#552A1B","#345A5E","#002A15","#1E824C","#2A150D","#332533","#634806","#545454","#123622","#007A7C","#7659B6","#004055","#591D77","#8B0000","#5A440D","#3E3E3E","#0000E0","#483C0C","#360000","#4D6066","#22313F","#5D1212","#34495E","#4B5555","#555555","#32050E","#0C2231","#D50000","#2B0000","#8E44AD","#8D6708","#16405B","#4F5A65","#2E456D","#406098","#34515E","#152A23","#886288","#E00000","#2C3E50","#34415E","#0A3055","#923026","#A74165","#2A2A22","#00552A","#1F3A93","#555344","#2A002A","#600000","#856514","#320A0A","#360036","#C0392B","#336E7B","#002A2A","#002A00","#3A539B","#382903","#9932CC","#1C2833","#554800","#008040","#006060","#552118","#BC3E31","#806C00","#00202A","#561B8D","#913D88","#3A4D13","#20603C","#765AB0","#1460AA","#726012","#3D2F5B","#39134C","#1C2A43","#252A2A","#80503D","#58007E","#674172","#663399","#4A321D","#77448B","#B22222","#003636","#292929","#7600A8","#1D0029","#2B390E","#800000","#2E1B36","#1B7742","#2E343B","#CF000F","#134D13","#7023B7","#7928A1","#008000","#67221B","#002627","#2B2B2B","#3455DB","#3C2109","#871A1A","#006080","#005051","#002517","#4B6319","#5E50B5","#870C25","#8859B6","#1C1836","#8B008B","#800080","#AA2E00","#005555","#D91E18","#7D314C","#082213","#744E2E","#696969","#802200","#000060","#9400D3","#315131","#AA5535","#436E43","#172617","#3D1410","#803224","#96281B","#1A2309","#220B38","#2D383C","#05182A","#8A2BE2","#0F4880","#66380F","#1D781D","#2574A9","#005500","#205D86","#550055","#007a4b","#2A2A2A","#113321","#5D445D","#AA422F","#B50000","#483D8B","#AA00AA","#B500B5","#211931","#322A60","#5C0819","#532F61"];


		
		function userColor_getByNumber (iNumber) {
			/*
				@discr
					safe get color by number for user from collorArray
				@inputs
					@required
						iNumber -> number
			*/
			iNumber = Math.abs(iNumber)

			if ( iNumber >= userColor_array.length ) {
				var exceedCount = Math.floor ( iNumber / userColor_array.length )

				iNumber = iNumber - (userColor_array.length * exceedCount);
			}

			return userColor_array[iNumber];//
		} _.userColor_getByNumber = userColor_getByNumber;
	//@> COLOR FOR USER IN CHAT

	return _;
});