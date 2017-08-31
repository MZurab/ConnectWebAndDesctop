define(['jquery', 'template7','v_app', 'jquery.appear'],function( $, Template7, V_APP){
	const _ = {};
	const CONST = {};
	const templates = {};

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
  		console.log('activeAppEvent iNdata',iNdata);
  		if ( typeof iNdata['onClickSendMesg'] == 'function') {
  			// if value is empty
  			$('#sendButtonInSenderBlock').off();

  			$('#sendButtonInSenderBlock').click(function (e) {
  				var value =  $('#forTextInputInSenderBlock textarea').val();
  				if(value == '') return true;
			    iNdata['onClickSendMesg'](e);
			    $('#forTextInputInSenderBlock textarea').val('');
			    effChatViewScrollToBot();
  			});

  			$("#forTextInputInSenderBlock textarea").keydown( function(e) { 
			    var code = e.which; // recommended to use e.which, it's normalized across browsers
			    if (code==13) {
			    	e.preventDefault();
			    	$('#sendButtonInSenderBlock').trigger('click');
			    }
	  		}).keyup(function (e) {
	  			var code = e.which; // recommended to use e.which, it's normalized across browsers
			    if (code==13) {
			    	e.preventDefault();
			    } else {
			    	iNdata['onKeyDownPrintingMsg'](e);
			    }
	  		});
  		}
  	}
    _['activeAppEvent'] = activeAppEvent;

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



	//<CHAT VIEW DUPLICATE
		function effChatViewScrollToBot () {
			V_APP.effScrollToButtom('#leftBlockInViewWindow',300);

		}
		_['effChatViewScrollToBot'] = effChatViewScrollToBot;
	//<CHAT VIEW DUPLICATE

	return _;

});