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
			      $(selector).unbind('mousedown').mousedown( ()=>{
			      	state = true;
			        if ( typeof funcs.down == 'function')funcs.down(state);
			        initFuntions();
			      
			      }
		        );
			}
	    /* EXTENCION */
	});




	templates['centerMsgSimpleText'] = `
		<div class="centerMsgInChatView">{{content}}</div>
	`;

	templates['msgSimpleTextFrom'] = `
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

	templates['msgSimpleTextTo'] = `
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
        var r = $(iNel).parent().attr('connect_chatid');
        return r;
	}
	_['getFromMessageAttrChatId'] = getFromMessageAttrChatId;

	function getFromMessageAttrMsgId (iNel) {
        var r = $(iNel).attr('connect_msg');
        return r;
	}
	_['getFromMessageAttrMsgId'] = getFromMessageAttrMsgId;



	function getFromMessageAttrTimeSent (iNel) {
		//time-sent
        var r = parseInt($(iNel).attr('time-sent'));
        if(typeof r != 'number') r = 0;
        return r;
	}
	_['getFromMessageAttrTimeSent'] = getFromMessageAttrTimeSent;

	function getFromMessageAttrTimeRead (iNel) {
		//time-read
        var r = parseInt($(iNel).attr('time-read'));
        if(typeof r != 'number') r = 0;
        return r;
	}
	_['getFromMessageAttrTimeRead'] = getFromMessageAttrTimeRead;

	function getFromMessageAttrTimeDelivered (iNel) {
		//time-delivered
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
			var temp = Template7.compile(templates['centerMsgSimpleText']);
			return temp(iNdata);
		}
		_['getCenterSimleTextBlock'] = getCenterSimleTextBlock;

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

    function getLengthOfMsg ( iNdata, iNchatId ) {
        var iNneedView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        var fullPath = iNneedView + " .messagesInChatView[connect_msg='"+iNdata['msgId']+"']";
        return $( fullPath ).length;
	}
    _['getLengthOfMsg'] = getLengthOfMsg;

    function createMsgSimpleTextToChatPage ( iNdata, iNmyUid, iNchatId ) {
        var iNneedView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        $( iNneedView ).append( getMsgSimple ( iNdata, iNmyUid ) );
	}
    _['createMsgSimpleTextToChatPage'] = createMsgSimpleTextToChatPage;


	function safeReplaceMsgSimpleTextToChatPage ( iNdata, iNmyUid, iNchatId ) {
        var thisIssetLength = getLengthOfMsg(iNdata, iNchatId);
        if (thisIssetLength > 0) {
        	// create message
        	replaceMsgSimpleTextToChatPage ( iNdata, iNmyUid, iNchatId );
        }
	}
    _['safeReplaceMsgSimpleTextToChatPage'] = safeReplaceMsgSimpleTextToChatPage;
    
	    function replaceMsgSimpleTextToChatPage ( iNdata, iNmyUid, iNchatId ) {
	        var iNneedView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
	        var fullPath = iNneedView + " .messagesInChatView[connect_msg='"+iNdata['msgId']+"']";
	        var content = getMsgSimple ( iNdata, iNmyUid );
	        $( fullPath ).replaceWith( content );
		}
	    _['replaceMsgSimpleTextToChatPage'] = replaceMsgSimpleTextToChatPage;



  	function initApp (iNdata) {
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

		    	// hide/show live msg video&audio button / simple text send btn
		    	var lengthInSimpleMsgTextarea = getContentLengthFromMsgSenderBlock ();
				if( lengthInSimpleMsgTextarea > 0) {
			    	// view send simple text btn HIDE other
			    	smartShowLiveBtnTextMsg();

			    } else {
			    	// view live send button for msg video AND audio HIDE other
			    	smartShowLiveBtnsAudioVideoMsg();
			    }

		    	iNdata['onKeyDownPrintingMsg'](e);
		    }
		});

  		setJsHoverEffectsForCancelBtnForLiveMsgAtMsgSendBlock();
  	}
    _['initApp'] = initApp;



    //@< msg canceling buttons & effects
    	function setJsHoverEffectsForCancelBtnForLiveMsgAtMsgSendBlock () {
    		$('.cancelBtnInMsgSenderButton').hover(
    			function () {
    				$(this).addClass('hover');
    			},
    			function () {
    				$(this).removeClass('hover');
				}
			);
    	}

    	function smartShowCancelBlockForLiveMsgAtMsgSenderBlock (iNtype) {
    		hideEffCancelingAllAnimationsSendingAtMsgSenderBlock();

    		showEffCancelingBlockSendingForLiveMsgAtMsgSenderBlock();


    		if(iNtype == 'audio')
    			showEffCancelingAudioAnimationSendingForLiveMsgAtMsgSenderBlock();
    		else if (iNtype == 'video') 
    			showEffCancelingVideoAnimationSendingForLiveMsgAtMsgSenderBlock();
    		// hide after view
    		setTimeout(
			()=>{
    			if(iNtype == 'audio')
    				hideEffCancelingAudioAnimationSendingForLiveMsgAtMsgSenderBlock();
    			else if (iNtype == 'video') 
    				hideEffCancelingVideoAnimationSendingForLiveMsgAtMsgSenderBlock();
    		},750);
    	}






    	function showEffCancelingBlockSendingForLiveMsgAtMsgSenderBlock () {
    		$('.chatBlockInViewBlock .effectsForCancelling').show();
    	}
    	function hideEffCancelingBlockSendingForLiveMsgAtMsgSenderBlock () {
    		$('.chatBlockInViewBlock .effectsForCancelling').hide();
    	}
	    	function hideEffCancelingAllAnimationsSendingAtMsgSenderBlock () {
	    		$('.effectsForCancelling .effectsFlag').hide();
	    	}
	    	// audio
	    	function showEffCancelingAudioAnimationSendingForLiveMsgAtMsgSenderBlock () {
	    		$('.effectsForCancelling .cancellingAudio').show();
	    	}
	    	function hideEffCancelingAudioAnimationSendingForLiveMsgAtMsgSenderBlock () {
	    		$('.effectsForCancelling .cancellingAudio').hide();
	    	}
	    	// video
	    	function showEffCancelingVideoAnimationSendingForLiveMsgAtMsgSenderBlock () {
	    		$('.effectsForCancelling .cancellingVideo').show();
	    	}
	    	function hideEffCancelingVideoAnimationSendingForLiveMsgAtMsgSenderBlock () {
	    		$('.effectsForCancelling .cancellingVideo').hide();
	    	}

    	function showEffCancelSendingForLiveMsgAtMsgSenderBlock () {
    		$('.chatBlockInViewBlock .cancelBtnInMsgSenderButton').show();
    	}
    	function hideEffCancelSendingForLiveMsgAtMsgSenderBlock () {
    		$('.chatBlockInViewBlock .cancelBtnInMsgSenderButton').hide();
    	}
    //@> msg canceling buttons  & effects

    //@< msg send buttons
    	function onSpecialClickForSendLiveAudioOrVideo (iNeffectType,iNdata) {
    		/*
    			@discr
    				btn for send live audio and video effects
    			@inputs
    				iNeffectType -> string (audio|video)
    				iNdata -> object
    					onStart 	-> function
    					onDelete 	-> function
    					onSend 		-> function
			*/
    		var effType = iNeffectType;
    		var objForSpecialClick = {};
    			// click
    			var startMsgRecoding = false;
    			var intervalId = null;
    			var deleteThisMsg = true;
    			var timerFromStartRecordingMessage = 0;
    			objForSpecialClick['down']= () => {
    				startMsgRecoding = false;
    				deleteThisMsg = true;
    				intervalId = setTimeout(()=>{
    					startMsgRecoding = true;
    					// show timer
    					if(effType == 'audio') {
    						smartStartRecodingTimerAtMsgButton('audio');
    					} else if (effType == 'video') {
    						smartStartRecodingTimerAtMsgButton('video');
						}
						
    					timerFromStartRecordingMessage = MOMENT().getNowTime(); //

	    				if(typeof iNdata['onStart'] == 'function') iNdata['onStart']();
    				},150);
    			}

    			$('.cancelBtnInMsgSenderButton').mouseup(()=>{
    				deleteThisMsg = false;
    			});

    			objForSpecialClick['up'] = (state) => {
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
	    					if(typeof iNdata['onSend'] == 'function') iNdata['onSend']();
    					}else {
    						// we delete message
    						// show caceling audion effects
    						if(effType == 'audio') {
	    						smartShowCancelBlockForLiveMsgAtMsgSenderBlock(effType);
	    					} else if (effType == 'video') {
	    						smartShowCancelBlockForLiveMsgAtMsgSenderBlock(effType);
							}
	    					if(typeof iNdata['onDelete'] == 'function') iNdata['onDelete']();
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
    	_['onSpecialClickForSendLiveAudioOrVideo'] = onSpecialClickForSendLiveAudioOrVideo;
    		
    	function onceMouseDownForAudioLiveRecord (iNfunction) {
    		$('#sendLiveAudioButtonInSenderBlock').mousedown(iNfunction);
    	}
    	_['onceMouseDownForAudioLiveRecord'] = onceMouseDownForAudioLiveRecord;
    	
    	function onceMouseDownForVideoLiveRecord (iNfunction) {
    		$('#sendLiveVideoButtonInSenderBlock').mousedown(iNfunction);
    	}
    	_['onceMouseDownForVideoLiveRecord'] = onceMouseDownForVideoLiveRecord;


    	function smartSwitchLiveAudioVideoMsgButtons () {
    		if($('#sendLiveVideoButtonInSenderBlock').hasClass('hideHalfSendMsgButton')) {
    			showOnlyHalfLiveAudioMsgButton();
    		}else {
    			showOnlyHalfLiveVideoMsgButton();
    		}
    	}
    	function smartShowLiveBtnsAudioVideoMsg () {
    		hideLiveBtnTextMsg();
    		showLiveVideoMsgButton();
    		showLiveAudioMsgButton();
    		// showLiveAllIconAtMsgSenderBlock();
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
    		

    		function hideAllBtnMsgSender () {
    			$('.sendMsgButtons').hide();
    		}	
    	function smartShowLiveBtnTextMsg () {
    		hideAllBtnMsgSender();
    		// hideLiveVideoMsgButton();
    		// hideLiveAudioMsgButton();
    		showLiveBtnTextMsg();
    	}
	    	function showLiveBtnTextMsg () {
	    		$('#sendTextButtonInSenderBlock').show();
	    	}
	    	function hideLiveBtnTextMsg () {
	    		$('#sendTextButtonInSenderBlock').hide();
	    	}
    //@> msg send buttons¸¸¸

    //@< msg timer in sender buttons 
    	function smartStartRecodingTimerAtMsgButton (iNtype) {
    		/*
    			@inputs
    				@required
    					iNtype -> string (audio|video) 
    		*/
    		showTimerBlockAtMsgSendButton();
    		hideLiveAllIconAtMsgSenderBlock();

    		if(iNtype == 'audio')
    			showAudioLiveIconAtMsgSenderBlock();
    		else if(iNtype == 'video')
    			showVideoLiveIconAtMsgSenderBlock();

    		//cancel buttons&effect
    		showEffCancelSendingForLiveMsgAtMsgSenderBlock();

    		$('.timerInMsgSenderBlock span').countdown('destroy');
    		$('.timerInMsgSenderBlock span').countdown({since: 0, compact: true, format: 'MS', description: ''});
    	}




    	function smartHideTimerBlockAtMsgSendButton () {
    		//hide timer block
    		hideTimerBlockAtMsgSendButton();
    		// hide cacell button
    		hideEffCancelSendingForLiveMsgAtMsgSenderBlock();
    	}

    	function showTimerBlockAtMsgSendButton () {
    		$('.timerInMsgSenderBlock').show();
    	}
    	function hideTimerBlockAtMsgSendButton () {
    		// hide time
    		$('.timerInMsgSenderBlock').hide();
    		// hide cance btn
    		hideEffCancelSendingForLiveMsgAtMsgSenderBlock();
    	}

    		function hideLiveAllIconAtMsgSenderBlock  () {
	    		$('.timerInMsgSenderBlock div').hide();
	    	}
	    	function showLiveAllIconAtMsgSenderBlock  () {
	    		$('.timerInMsgSenderBlock div').show();
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



	function getMsgSimple (iNdata,iNmyUid) {
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
            iNdata['boxContent'] = getMsgSimpleTextFrom(iNdata);
		}
        else {
            iNdata['toMe'] = 1;
            iNdata['boxContent'] = getMsgSimpleTextTo(iNdata);
        }
        return getBoxForMsg(iNdata);
	}
    _['getMsgSimple'] = getMsgSimple;

    	function getBoxForMsg (iNdata) {
			let temp = Template7.compile(templates['msgBox']);
			return temp(iNdata);
		}
    	_['getMsgSimpleTextFrom'] = getMsgSimpleTextFrom;

		function getMsgSimpleTextFrom (iNdata) {
			let temp = Template7.compile(templates['msgSimpleTextFrom']);
			return temp(iNdata);
		}
    	_['getMsgSimpleTextFrom'] = getMsgSimpleTextFrom;

		function getMsgSimpleTextTo (iNdata) {
			let temp = Template7.compile(templates['msgSimpleTextTo']);
			return temp(iNdata);
		}
    	_['getMsgSimpleTextTo'] = getMsgSimpleTextTo;





    		function setObserverForViewMsgInVisualScrollByChatId (iNchatId, iNdata ) {
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
			_['setObserverForViewMsgInVisualScrollByChatId'] = setObserverForViewMsgInVisualScrollByChatId;



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