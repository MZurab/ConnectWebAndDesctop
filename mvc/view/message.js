define(['jquery', 'template7','v_app', 'jquery.appear'],function( $, Template7, V_APP){
	const _ = {};
	const CONST = {};
	const templates = {};






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
  			$('#sendButtonInSenderBlock').off();

  			$('#sendButtonInSenderBlock').click(function (e) {
  				var value =  $('#forTextInputInSenderBlock textarea').val();
  				if(value == '') return true;
			    iNdata['onClickSendMesg'](e);
			    $('#forTextInputInSenderBlock textarea').val('');
			    effChatViewScrollToBotSafe();
  			});

  			$('.buttonChatToBottom').click( 
  				function () {
  					$('#leftBlockInViewWindow').scrollBot(0);
  				} 
  			);

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