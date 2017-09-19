define(['template7','v_app', 'm_moment','jquery',  'jquery.appear', 'jquery.countdown'],function(  Template7, V_APP, MOMENT, $){
	const _ = {};
	const CONST = {};
	const templates = {};

  $.fn.extend({
		/* EXTENCION */
			'specialClick': function (iNdata) {
				  /*
				  	@inputs
				  		@optional
				  		iNdata -> object
				  			@optional
				  				enter -> function
			  					out -> function
			  					down -> function
			  					up -> function

				  */
			      var selector = this.selector || this;
			      var state = false;
			      var funcs = iNdata;
			      var initFuntions = () => {
			      	$(window).unbind('mouseup').mouseup( ()=>{
			            if ( typeof funcs.up == 'function')funcs.up(state);
			            $(window).unbind('mouseup');
			            $(this).unbind('mouseout');
			            $(this).unbind('mouseenter');

			        });
			        $(selector).mouseout( ()=>{
			          state = false;
			          if ( typeof funcs.out == 'function')funcs.out(state);
			        });
			        $(selector).mouseenter( ()=>{
			          state = true;
			          if ( typeof funcs.enter == 'function')funcs.enter(state);

			        });
			      }
			      console.log('selector',selector);
			      console.log('$(selector)',$(selector));
			      $(selector).mousedown( ()=>{
			      	state = true;
			        if ( typeof funcs.down == 'function')funcs.down(state);
			        initFuntions();
			      
			      }
		        );
			}
	    /* EXTENCION */
	});




	templates['msgCenterSimpleText'] = `
		<div class="centerMsgInChatView">{{content}}</div>
	`;

	templates['msgFrom'] = `
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
	`;

	templates['msgTo'] = `
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
	`;

	//del appearClass
	templates['msgBox'] = `
		<div id='msgId{{msgId}}' class="messagesInChatView {{#if appearClass}}connect-appear{{/if}} {{#if fromMe}}fromMeMessageInChatView{{/if}}{{#if toMe}}toMeMessageInChatView{{/if}} {{#if note}}noteMessage{{/if}}"  {{#if timeSent}}time-sent="{{timeSent}}"{{/if}}  {{#if timeRead}}time-read="{{timeRead}}"{{/if}} {{#if timeDelivered}}time-delivered="{{timeDelivered}}"{{/if}}  connect_msg="{{msgId}}" connect-appear-scroll-parent='#leftBlockInViewWindow'  connect-appear-my-parent='.ChatViewInAppWindow'>
			{{boxContent}}
		</div>
	`;
	//ChatViewInAppWindow connect_chatid


	CONST['domPathToMsgCounter'] = '#senderBlockInViewBlock .counterInChatId';


	function plusNewMsgCounter (iNchatId,iNnumber) {
		/*
			@discr
				plus number (by default 1) from new msg counter block
			@inputs
				@required
					iNchatId -> string

		*/
		if(typeof iNnumber != 'number') iNnumber = 1;
		let msgCountNumber = getNewMsgCounter(iNchatId) + iNnumber;
		changeNewMsgCounter (iNchatId,msgCountNumber);
		return msgCountNumber;
	}
	_['plusNewMsgCounter'] = plusNewMsgCounter;

	function getNewMsgCounter (iNchatId) {
		/*
			@discr
				get number from new msg counter block
			@inputs
				@required
					iNchatId -> string

		*/
		let path = CONST['domPathToMsgCounter'];
		let intFrom = parseInt($(path).html())||0
		return intFrom;
	}
	_['getNewMsgCounter'] = getNewMsgCounter;

	function changeNewMsgCounter (iNchatId,iNnumber) {
		/*
			@discr
				change content in new msg counter block
			@inputs
				@required
					iNchatId -> string
					iNnumber -> int

		*/
		let path = CONST['domPathToMsgCounter'];
		$(path).attr('connect_chatid',iNchatId);
		$(path).html(iNnumber)
	}
	_['changeNewMsgCounter'] = changeNewMsgCounter;

	function showNewMsgCounter () {
		/*
			@discr
				show new msg counter block
			@inputs
				@required

		*/
		let path = CONST['domPathToMsgCounter'];
		$(path).fadeIn (500);
	}
	_['showNewMsgCounter'] 	= showNewMsgCounter;

	function hideNewMsgCounter () {
		/*
			@discr
				hide nem msg counter block
			@inputs
				@required

		*/
		let path = CONST['domPathToMsgCounter'];
		$(path).hide();
	}
	_['hideNewMsgCounter'] 	= hideNewMsgCounter;



	function getFromMessageAttrChatId (iNel) {
        // var iNneedView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        // var fullPath = iNneedView + " .messagesInChatView[connect_msg='"+iNdata['msgId']+"']";
        var r = $(iNel).parent().attr('connect_chatid');
        return r;
	}
	_['getFromMessageAttrChatId'] = getFromMessageAttrChatId;

	function getFromMessageAttrMsgId (iNel) {
        // var iNneedView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        // var fullPath = iNneedView + " .messagesInChatView[connect_msg='"+iNdata['msgId']+"']";
        var r = $(iNel).attr('connect_msg');
        return r;
	}
	_['getFromMessageAttrMsgId'] = getFromMessageAttrMsgId;



	function getFromMessageAttrTimeSent (iNel) {
		//time-sent
        // var iNneedView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        // var fullPath = iNneedView + " .messagesInChatView[connect_msg='"+iNdata['msgId']+"']";
        var r = parseInt($(iNel).attr('time-sent'));
        if(typeof r != 'number') r = 0;
        return r;
	}
	_['getFromMessageAttrTimeSent'] = getFromMessageAttrTimeSent;

	function getFromMessageAttrTimeRead (iNel) {
		//time-read
        // var iNneedView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        // var fullPath = iNneedView + " .messagesInChatView[connect_msg='"+iNdata['msgId']+"']";
        var r = parseInt($(iNel).attr('time-read'));
        if(typeof r != 'number') r = 0;
        return r;
	}
	_['getFromMessageAttrTimeRead'] = getFromMessageAttrTimeRead;

	function getFromMessageAttrTimeDelivered (iNel) {
		//time-delivered
        // var iNneedView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        // var fullPath = iNneedView + " .messagesInChatView[connect_msg='"+iNdata['msgId']+"']";
        var r = parseInt($(iNel).attr('time-delivered'));
        if(typeof r != 'number') r = 0;
        return r;
	}
	_['getFromMessageAttrTimeDelivered'] = getFromMessageAttrTimeDelivered;

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

	function safeReplaceMessageToChatPage ( iNdata, iNmyUid, iNchatId ) {
        var thisIssetLength = getLengthMessages(iNdata, iNmyUid, iNchatId);
        if (thisIssetLength > 0) {
        	// create message
        	replaceMessageToChatPage ( iNdata, iNmyUid, iNchatId );
        }
	}
    _['safeReplaceMessageToChatPage'] = safeReplaceMessageToChatPage;


    function getMessagesDomPathByChatId (iNchatId) {
        return getChatDomPathByChatId(iNchatId) + " .messagesInChatView";

    }
    _['getMessagesDomPathByChatId'] = getMessagesDomPathByChatId;

    function getMessagesDomObjectByChatId (iNchatId,iNextra) {
    	var msgPath = getMessagesDomPathByChatId(iNchatId);
    	if (typeof iNextra == 'string')  msgPath = msgPath + iNextra;
        return $( msgPath );
	}
    _['getMessagesDomObjectByChatId'] = getMessagesDomObjectByChatId;

    function getChatDomPathByChatId (iNchatId) {
        return "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";

    }
    _['getChatDomPathByChatId'] = getChatDomPathByChatId;

    function getChatDomObjectByChatId (iNchatId) {
        return $( getChatDomPathByChatId(iNchatId) );

    }
    _['getChatDomObjectByChatId'] = getChatDomObjectByChatId;

    function getLengthMessages ( iNdata, iNmyUid, iNchatId ) {
        var iNneedView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        var fullPath = iNneedView + " .messagesInChatView[connect_msg='"+iNdata['msgId']+"']";
        return $( fullPath ).length;
	}
    _['getLengthMessages'] = getLengthMessages;

    function createMessageToChatPage ( iNdata, iNmyUid, iNchatId ) {
        var iNneedView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        $( iNneedView ).append( getMessage ( iNdata, iNmyUid ) );
	}
    _['createMessageToChatPage'] = createMessageToChatPage;

    function replaceMessageToChatPage ( iNdata, iNmyUid, iNchatId ) {
        var iNneedView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        var fullPath = iNneedView + " .messagesInChatView[connect_msg='"+iNdata['msgId']+"']";
        var content = getMessage ( iNdata, iNmyUid );
        $( fullPath ).replaceWith( content );
	}
    _['replaceMessageToChatPage'] = replaceMessageToChatPage;



  	function activeAppEvent (iNdata) {
  		/*
  			@disct
  				active acrtions for click events (send button, keyup for flesh msg)
			@inputs
				@required
					iNdata
						onClickSendMesg -> function
						onKeyDownPrintingMsg -> function

  		*/
  		if ( typeof iNdata['onClickSendMesg'] == 'function') {
  			// if value is empty
  			$('#sendTextButtonInSenderBlock').off();

  			$('#sendTextButtonInSenderBlock').click(function (e) {
  				var value =  $('#forTextInputInSenderBlock textarea').val();
  				if(value == '') return true;
			    iNdata['onClickSendMesg'](e);
			    $('#forTextInputInSenderBlock textarea').val('');
			    effChatViewScrollToBotSafe();
  			});

  			

  		}
  		$('.buttonChatToBottom').click( 
			function () {
				$('#leftBlockInViewWindow').scrollBot(0);
			} 
		);

		$("#forTextInputInSenderBlock textarea").keydown( function(e) { 
	    var code = e.which; // recommended to use e.which, it's normalized across browsers
	    if (code==13) {
	    	e.preventDefault();
	    	$('#sendTextButtonInSenderBlock').trigger('click');
	    }
		}).keyup(function (e) {
			var code = e.which; // recommended to use e.which, it's normalized across browsers
		    if (code==13) {
		    	e.preventDefault();
		    } else {
		    	iNdata['onKeyDownPrintingMsg'](e);
		    }
		});

  		setJsHoverEffectsForCancelBtnAtMsgSendBlock();

  		onSpecialClickForLiveMessages('audio');
  		onSpecialClickForLiveMessages('video');
  	}
    _['activeAppEvent'] = activeAppEvent;



    //@< msg canceling buttons & effects
    	function setJsHoverEffectsForCancelBtnAtMsgSendBlock () {
    		$('.cancelBtnInMsgSenderButton').hover(
    			function () {
    				$(this).addClass('hover');
    			},
    			function () {
    				$(this).removeClass('hover');
				}
			);
    	}

    	function smartShowCancelBlockAudioSendingAtMsgSenderBlock () {
    		hideEffCancelingAllAnimationsSendingAtMsgSenderBlock();

    		showEffCancelingBlockSendingAtMsgSenderBlock();
    		showEffCancelingAudioAnimationSendingAtMsgSenderBlock();
    		// hide after view
    		setTimeout(
			()=>{
    			hideEffCancelingAudioAnimationSendingAtMsgSenderBlock();
    		},750);
    	}

    	function showEffCancelingBlockSendingAtMsgSenderBlock () {
    		$('.chatBlockInViewBlock .effectsForCancelling').show();
    	}
    	function hideEffCancelingBlockSendingAtMsgSenderBlock () {
    		$('.chatBlockInViewBlock .effectsForCancelling').hide();
    	}
	    	function hideEffCancelingAllAnimationsSendingAtMsgSenderBlock () {
	    		$('.effectsForCancelling .effectsFlag').hide();
	    	}
	    	function showEffCancelingAudioAnimationSendingAtMsgSenderBlock () {
	    		$('.effectsForCancelling .cancellingAudio').show();
	    	}
	    	function hideEffCancelingAudioAnimationSendingAtMsgSenderBlock () {
	    		$('.effectsForCancelling .cancellingAudio').hide();
	    	}

    	function showEffCancelSendingAtMsgSenderBlock () {
    		$('.chatBlockInViewBlock .cancelBtnInMsgSenderButton').show();
    	}
    	function hideEffCancelSendingAtMsgSenderBlock () {
    		$('.chatBlockInViewBlock .cancelBtnInMsgSenderButton').hide();
    	}
    //@> msg canceling buttons  & effects

    //@< msg send buttons
    	// function onEventsForLiveAudioMsgButton () {
    	// 	var objForSpecialClick = {};
    	// 		// click
    	// 		var startMsgRecoding = false;
    	// 		var intervalId = null;
    	// 		var timerFromStartRecordingMessage = 0;
    	// 		objForSpecialClick['down']= () => {
					// console.log('onEventsForLiveAudioMsgButton down');
    	// 			startMsgRecoding = false;
    	// 			intervalId = setTimeout(()=>{
    	// 				startMsgRecoding = true;
    	// 				// show timer
    	// 				smartStartAudioRecodingTimeAtMsgButton();
    	// 				timerFromStartRecordingMessage = MOMENT().getNowTime(); //
    	// 			},150);
    	// 		}
    	// 		objForSpecialClick['up'] = (state) => {
					// console.log('onEventsForLiveAudioMsgButton up startMsgRecoding',startMsgRecoding);
					// clearTimeout(intervalId);
    	// 			if(startMsgRecoding !== true) {
    	// 				// if does not 150 ms since first click
    	// 				// we swiftch buttons 
    	// 				smartSwitchLiveAudioVideoMsgButtons();
    	// 			} else {
    	// 				var timeWhenMouseUp = MOMENT().getNowTime(); //
    	// 				var passedTimeFromStartRecordToMouseUp = timeWhenMouseUp - timerFromStartRecordingMessage; //
    	// 				// we send msg if 
    	// 				if (timerFromStartRecordingMessage != 0 && passedTimeFromStartRecordToMouseUp > 500 ) {
    	// 					// we send message
    	// 					console.log('onEventsForLiveAudioMsgButton send message');
    	// 				}else {
    	// 					// we delete message
    	// 					console.log('onEventsForLiveAudioMsgButton delete message');
    	// 					// show caceling audion effects
    	// 					smartShowCancelBlockAudioSendingAtMsgSenderBlock();
    	// 				}
    	// 				smartHideTimerBlockAtMsgSendButton();
					// }
    				
    	// 		}
    	// 	$('#sendLiveAudioButtonInSenderBlock').specialClick(objForSpecialClick);
    	// }

    	function onSpecialClickForLiveMessages (iNeffectType) {
    		/*
    			@inputs
    				iNeffectType -> string 

    		*/
    		var effType = iNeffectType;
    		var objForSpecialClick = {};
    			// click
    			var startMsgRecoding = false;
    			var intervalId = null;
    			var deleteThisMsg = true;
    			var timerFromStartRecordingMessage = 0;
    			objForSpecialClick['down']= () => {
					console.log('onSpecialClickForLiveMessages down');
    				startMsgRecoding = false;
    				deleteThisMsg = true;
    				intervalId = setTimeout(()=>{
    					startMsgRecoding = true;
    					// show timer
    					if(effType == 'audio') {
    						smartStartAudioRecodingTimeAtMsgButton();
    					} else if (effType == 'video') {

    					}
    					timerFromStartRecordingMessage = MOMENT().getNowTime(); //
    				},150);
    			}

    			$('.cancelBtnInMsgSenderButton').mouseup(()=>{
    				deleteThisMsg = false;
    			});

    			objForSpecialClick['up'] = (state) => {
					console.log('onSpecialClickForLiveMessages up startMsgRecoding',startMsgRecoding);
					clearTimeout(intervalId);
    				if(startMsgRecoding !== true) {
    					// if does not 150 ms since first click
    					// we swiftch buttons 
    					smartSwitchLiveAudioVideoMsgButtons();
    				} else {
    					var timeWhenMouseUp = MOMENT().getNowTime(); //
    					var passedTimeFromStartRecordToMouseUp = timeWhenMouseUp - timerFromStartRecordingMessage; //
    					// we send msg if 
    					if (timerFromStartRecordingMessage != 0 && passedTimeFromStartRecordToMouseUp > 500 && deleteThisMsg) {
    						// we send message
    						console.log('onSpecialClickForLiveMessages send message');
    					}else {
    						// we delete message
    						console.log('onSpecialClickForLiveMessages delete message');
    						// show caceling audion effects
    						if(effType == 'audio') {
	    						smartShowCancelBlockAudioSendingAtMsgSenderBlock();
	    					} else if (effType == 'video') {

	    					}
    					}
    					smartHideTimerBlockAtMsgSendButton();
					}
    				
    			}
			if(effType == 'audio') {
    			$('#sendLiveAudioButtonInSenderBlock').specialClick(objForSpecialClick);
			} else if (effType == 'video') {
    			$('#sendLiveVideoButtonInSenderBlock').specialClick(objForSpecialClick);
			}
    	}
    		



    	function smartSwitchLiveAudioVideoMsgButtons () {
    		if($('#sendLiveVideoButtonInSenderBlock').hasClass('hideHalfSendMsgButton')) {
    			console.log('!smartSwitchLiveAudioVideoMsgButtons start showOnlyHalfLiveAudioMsgButton');
    			showOnlyHalfLiveAudioMsgButton();
    		}else {
    			console.log('smartSwitchLiveAudioVideoMsgButtons start showOnlyHalfLiveVideoMsgButton');
    			showOnlyHalfLiveVideoMsgButton();
    		}
    	}
    	function smartShowLiveAudioVideoMsgButtons () {
    		hideLiveTextMsgButton();
    		showLiveVideoMsgButton();
    		showLiveAudioMsgButton();
    	}
	    	function showLiveVideoMsgButton () {
	    		$('#sendLiveVideoButtonInSenderBlock').show();
	    	}
	    	function hideLiveVideoMsgButton () {
	    		$('#sendLiveVideoButtonInSenderBlock').hide();
	    	}
	    	function showOnlyHalfLiveVideoMsgButton () {
	    		removeClass_hideHalf();
	    		$('#sendLiveVideoButtonInSenderBlock').addClass('hideHalfSendMsgButton');
	    	}

	    	function showLiveAudioMsgButton () {
	    		$('#sendLiveAudioButtonInSenderBlock').show();
	    	}
	    	function hideLiveAudioMsgButton () {
	    		$('#sendLiveAudioButtonInSenderBlock').hide();
	    	}
	    	function showOnlyHalfLiveAudioMsgButton () {
	    		removeClass_hideHalf();
	    		$('#sendLiveAudioButtonInSenderBlock').addClass('hideHalfSendMsgButton');
	    	}
	    		function removeClass_hideHalf () {
		    		$('.sendMsgButtons').removeClass('hideHalfSendMsgButton');
		    	}
	    	
    	function smartShowLiveTextMsgButton () {
    		hideLiveVideoMsgButton();
    		hideLiveAudioMsgButton();
    		showLiveTextMsgButton();
    	}
	    	function showLiveTextMsgButton () {
	    		$('#sendTextButtonInSenderBlock').show();
	    	}
	    	function hideLiveTextMsgButton () {
	    		$('#sendTextButtonInSenderBlock').hide();
	    	}
    //@> msg send buttons

    //@< msg timer in sender buttons 
    	function smartStartAudioRecodingTimeAtMsgButton () {
    		showTimerBlockAtMsgSendButton();
    		hideVideoLiveIconAtMsgSenderBlock();
    		showAudioLiveIconAtMsgSenderBlock();
    		//cancel buttons&effect
    		showEffCancelSendingAtMsgSenderBlock();

    		$('.timerInMsgSenderBlock span').countdown('destroy');
    		$('.timerInMsgSenderBlock span').countdown({since: 0, compact: true, format: 'MS', description: ''});
    	}
    	function smartHideTimerBlockAtMsgSendButton () {
    		//hide timer block
    		hideTimerBlockAtMsgSendButton();
    		// hide cacell button
    		hideEffCancelSendingAtMsgSenderBlock();
    	}

    	function showTimerBlockAtMsgSendButton () {
    		$('.timerInMsgSenderBlock').show();
    	}
    	function hideTimerBlockAtMsgSendButton () {
    		// hide time
    		$('.timerInMsgSenderBlock').hide();
    		// hide cance btn
    		hideEffCancelSendingAtMsgSenderBlock();
    	}

	    	function showAudioLiveIconAtMsgSenderBlock  () {
	    		$('.audioTimerInMsgSenderBlock').show();
	    	}
	    	function hideAudioLiveIconAtMsgSenderBlock  () {
	    		$('.audioTimerInMsgSenderBlock').hide();
	    	}

	    	function showVideoLiveIconAtMsgSenderBlock  () {
	    		$('.videoTimerInMsgSenderBlock').show();
	    	}
	    	function hideVideoLiveIconAtMsgSenderBlock  () {
	    		$('.videoTimerInMsgSenderBlock').hide();
	    	}
    //@>



    function getContentFromMsgSenderBlock () {
		return $('#forTextInputInSenderBlock textarea').val()
	}
	_['getContentFromMsgSenderBlock'] = getContentFromMsgSenderBlock;

	function getContentLengthFromMsgSenderBlock () {
		return $('#forTextInputInSenderBlock textarea').val().length;
	}
	_['getContentLengthFromMsgSenderBlock'] = getContentLengthFromMsgSenderBlock;



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
			let temp = Template7.compile(templates['msgBox']);
			return temp(iNdata);
		}
    	_['getMsgFrom'] = getMsgFrom;

		function getMsgFrom (iNdata) {
			let temp = Template7.compile(templates['msgFrom']);
			return temp(iNdata);
		}
    	_['getMsgFrom'] = getMsgFrom;

		function getMsgTo (iNdata) {
			let temp = Template7.compile(templates['msgTo']);
			return temp(iNdata);
		}
    	_['getMsgTo'] = getMsgTo;





    		function setObserverForViewInVisualScrollByChatId (iNchatId, iNdata ) {
				let object = getMessagesDomObjectByChatId(iNchatId,'.toMeMessageInChatView');

				object.appearByEach(
					iNdata['success'],
					{
						'scroll-window'		:'#leftBlockInViewWindow',
						'my-filter-window'	: getChatDomPathByChatId(iNchatId),
						'checkForAddClass'	: (iNobject) => {
							return !$(iNobject).attr('time-read');
						},
						'checkForRemoveClass'	: (iNobject) => {
							return $(iNobject).attr('time-read');
						},
						'onScrollParent'	: (iNobject) => {
							if( $(iNobject).scrollBot() > $(iNobject).height() / 2 ) {
							 	// show button if not button
								$('.buttonChatToBottom').show();
								if(typeof iNdata['onScrollParentTrue'] == 'function')  iNdata['onScrollParentTrue']();
							} else {
								// show button if not button
								$('.buttonChatToBottom').hide();
								if(typeof iNdata['onScrollParentFalse'] == 'function') iNdata['onScrollParentFalse'](iNchatId);
							}
						}
					}
				);//'.ChatViewInAppWindow'


    		}
			_['setObserverForViewInVisualScrollByChatId'] = setObserverForViewInVisualScrollByChatId;



	//<CHAT VIEW DUPLICATE
		function effChatViewScrollToBotWithTimeOut (iNfunctionSuccess, iNfunctionError) {
			clearTimeout(window['connectVarMenuScrollInMenuView']);
			window['connectVarMenuScrollInMenuView'] = setTimeout(  () => {
			 	effChatViewScrollToBotSafe (iNfunctionSuccess,iNfunctionError);
			},10);
		}
		_['effChatViewScrollToBotWithTimeOut'] = effChatViewScrollToBotWithTimeOut;


		function effChatViewScrollToBotSafe (iNfunctionSuccess,iNfunctionError) {
			// if we don'see this chat block
			if( $('.ChatViewInAppWindow:visible').length < 1 ) return false;
			if (  
				!( $('#leftBlockInViewWindow').scrollBot() >  ( $('#leftBlockInViewWindow').height() / 2 )  ) ||
				$('#leftBlockInViewWindow').scrollTop() == 0
			) {
				V_APP.delLoaderInAppView()
			 	// show button if not button
			 	V_APP.effScrollToButtom ('#leftBlockInViewWindow',0);
			 	if ( typeof iNfunctionSuccess == 'function' ) 	iNfunctionSuccess ();
			} else {
				if ( typeof iNfunctionError == 'function' ) 	iNfunctionError ();
			}
		}
		_['effChatViewScrollToBotSafe'] = effChatViewScrollToBotSafe;
	//<CHAT VIEW DUPLICATE

	return _;

});