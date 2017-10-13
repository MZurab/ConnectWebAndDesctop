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

	
	//@< chief msg container
		templates['msg_boxForMessage'] = `
			<div id='msgId{{msgId}}' class="messagesInChatView {{class}} {{#if appearClass}}connect-appear{{/if}} {{#if fromMe}}fromMeMessageInChatView{{/if}}{{#if toMe}}toMeMessageInChatView{{/if}} {{#if note}}noteMessage{{/if}}"  {{#if timeSent}}time-sent="{{timeSent}}"{{/if}}  {{#if timeRead}}time-read="{{timeRead}}"{{/if}} {{#if timeDelivered}}time-delivered="{{timeDelivered}}"{{/if}}  connect_msg="{{msgId}}" connect-appear-scroll-parent='#leftBlockInViewWindow' connect-appear-my-parent='.ChatViewInAppWindow'>
				{{boxContent}}
			</div>
		`;
		function msg_getTemplateByNameBoxForMsg (iNdata) {
    		/*
    			@inputs
    				iNdata -> object
    					class
    		*/
			let temp = Template7.compile(templates['msg_boxForMessage']);
			return temp(iNdata);
		}
    	_['msg_getTemplateByNameBoxForMsg'] = msg_getTemplateByNameBoxForMsg;

    	function msg_getPathToDomForMsg (  iNchatId, iNmsgId ) {
    		/*
    			@discr
    				get selector (path to dom message element)
    			@inputs
    				iNchatId -> string
    				iNmsgId -> string
    		*/
	        var iNneedView = msg_getPathToDomForChat(iNchatId);
	        var fullPath = iNneedView + " .messagesInChatView[connect_msg='"+iNmsgId+"']";
	        return fullPath;
		}
	    _['msg_getPathToDomForMsg'] = msg_getPathToDomForMsg;

    	function msg_getPathToDomForChat (  iNchatId ) {
    		/*
    			@discr
    				get selector (path to dom message element)
    			@inputs
    				iNchatId -> string
    				iNmsgId -> string
    		*/
	        var fullPath = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
	        return fullPath;
		}
	    _['msg_getPathToDomForMsg'] = msg_getPathToDomForMsg;
	//@> chief msg container

	//@<SECTION  'msg simpleText' type = 1  ------------------------------------------------------------------------------------------------------------------------------------------------
		
		//@< msgSimpleText_center 
			templates['msgSimpleText_center'] = `
				<div class="centerMsgInChatView">{{content}}</div>
			`;
			function msgSimpleText_addCenter ( iNdata, iNchatId ) {
		        var iNneedView = msg_getPathToDomForChat(iNchatId);//"#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
		        $( iNneedView ).append( msgSimpleText_getTemplateByNameCenter ( iNdata ) );
			}
			_['msgSimpleText_addCenter'] = msgSimpleText_addCenter;

				function msgSimpleText_getTemplateByNameCenter (iNdata) {
					/*
						@inputs
							@required
								iNdata
									@required
										content
									@optional
					*/
					var temp = Template7.compile(templates['msgSimpleText_center']);
					return temp(iNdata);
				}
				_['msgSimpleText_getTemplateByNameCenter'] = msgSimpleText_getTemplateByNameCenter;
		//@> msgSimpleText_center

		templates['msgSimpleText_from'] = `
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

		templates['msgSimpleText_to'] = `
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

		function msgSimpleText_getMsg (iNdata,iNmyUid) {
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
	            iNdata['boxContent'] = msgSimpleText_getTemplateByNameFrom(iNdata);
			}
	        else {
	            iNdata['toMe'] = 1;
	            iNdata['boxContent'] = msgSimpleText_getTemplateByNameTo(iNdata);
	        }
	        return msg_getTemplateByNameBoxForMsg(iNdata);
		}
	    _['msgSimpleText_getMsg'] = msgSimpleText_getMsg;

	    	

			function msgSimpleText_getTemplateByNameFrom (iNdata) {
				let temp = Template7.compile(templates['msgSimpleText_from']);
				return temp(iNdata);
			}
	    	_['msgSimpleText_getTemplateByNameFrom'] = msgSimpleText_getTemplateByNameFrom;

			function msgSimpleText_getTemplateByNameTo (iNdata) {
				let temp = Template7.compile(templates['msgSimpleText_to']);
				return temp(iNdata);
			}
	    	_['msgSimpleText_getTemplateByNameTo'] = msgSimpleText_getTemplateByNameTo;

	 	function msgSimpleText_createMsg ( iNdata, iNmyUid, iNchatId ) {
	        var iNneedView = msg_getPathToDomForChat(iNchatId);// "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
	        $( iNneedView ).append( msgSimpleText_getMsg ( iNdata, iNmyUid ) );
		}
	    _['msgSimpleText_createMsg'] = msgSimpleText_createMsg;


		function msgSimpleText_safeReplace ( iNdata, iNmyUid, iNchatId ) {
	        var thisIssetLength = msg_getLength(iNdata, iNchatId);
	        if (thisIssetLength > 0) {
	        	// create message
	        	msgSimpleText_replace ( iNdata, iNmyUid, iNchatId );
	        }
		}
	    _['msgSimpleText_safeReplace'] = msgSimpleText_safeReplace;
	    
		    function msgSimpleText_replace ( iNdata, iNmyUid, iNchatId ) {
		        var fullPath = msg_getPathToDomForMsg (  iNchatId, iNdata['msgId'] )
		        var content = msgSimpleText_getMsg ( iNdata, iNmyUid );
		        $( fullPath ).replaceWith( content );
			}
		    _['msgSimpleText_replace'] = msgSimpleText_replace;
	//@>SECTION  'msg simpleText' type = 1  ------------------------------------------------------------------------------------------------------------------------------------------------

	

	//@<SECTION  'msg live audio' type = 20 ------------------------------------------------------------------------------------------------------------------------------------------------
		templates['msgLiveAudio_from'] = `
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
		   <div class="aCpI_msgLiveAudio_contentAudioInFromMeMessage aCpI_msgLiveAudio_contentOfAudioMessage" onmousemove="aCpI_msgLiveAudio_onHover(event, this)" onmouseout="aCpI_msgLiveAudio_onMouseOut(this)" onclick="aCpI_msgLiveAudio_onClick(event,this)">
		      <div class="aCpI_msgLiveAudio_audioMsgPlayedBlock">
		         <div class="aCpI_msgLiveAudio_playedSpritesInAudioMsg"></div>
		      </div>
		      <div class="aCpI_msgLiveAudio_backgroundForAudioMsg aCpI_msgLiveAudio_backgroundForAudioMsgFromMe"></div>
		      <div class="aCpI_msgLiveAudio_backgroundForAudioMsgOnHover"></div>
		      <div class="aCpI_msgLiveAudio_blockInAudioMsg">
		         <div class="aCpI_msgLiveAudio_iconInAudioMessage"></div>
		         <div class="aCpI_msgLiveAudio_viewWhenUploadingLiveAudioMsg"></div>
		         <div class="aCpI_msgLiveAudio_viewWhenLoadingLiveAudioMsg"></div>
		         <div class="aCpI_msgLiveAudio_controllPlayInAudioMessage" onclick="aCpI_msgLiveAudio_playAudioOnClickBtnPlay(this,event)"></div>
		         <div class="aCpI_msgLiveAudio_controllPauseInAudioMessage" onclick="aCpI_msgLiveAudio_pauseAudioOnClickBtnPause(this,event)"></div>
		         <div class="aCpI_msgLiveAudio_hideAudioBlock">
		            <audio class="audioSrc flagAudioOrVideoElement" onplay="aCpI_msgLiveAudio_onEventPlay(this)" onpause="aCpI_msgLiveAudio_onEventPause(this)" preload="auto" src="{{content}}" onloadeddata="aCpI_msgLiveAudio_onEventLoadedAudio(this)" ontimeupdate="aCpI_msgLiveAudio_onEventTimeUpdateForAuidioEl(this)"></audio>
		         </div>
		         <div class="aCpI_msgLiveAudio_timeNowInAudioMessage aCpI_msgLiveAudio_timeInAudioMsg"></div>
		         <div class="aCpI_msgLiveAudio_timeAllInAudioMessage aCpI_msgLiveAudio_timeInAudioMsg"></div>
		      </div>
		   </div>
		`;

		templates['msgLiveAudio_to'] = `
	   		<div class="lineInBoxInLine">
				 {{#if timeSentText}}
			         <div class="topCircleInMessages"></div>
			         <div class="timeTopInMessages">{{timeSentText}}</div>
		         {{/if}}
		         
		         <div class="botCircleInMessages" {{#if timeDeliveredText}}{{else}}style="display:none;"{{/if}}  {{#if timeDeliveredText}}title="{{timeDeliveredText}}"{{/if}}></div>
	         	 <div class="timeBotInMessages" {{#if timeReadText}}{{else}}style="display:none;"{{/if}}>{{#if timeReadText}}{{timeReadText}}{{/if}}</div>
		  	</div>
			<div class="aCpI_msgLiveAudio_contentAudioInToMeMessage aCpI_msgLiveAudio_contentOfAudioMessage" onmousemove="aCpI_msgLiveAudio_onHover(event, this)" onmouseout="aCpI_msgLiveAudio_onMouseOut(this)" onclick="aCpI_msgLiveAudio_onClick(event,this)">
		      <div class="aCpI_msgLiveAudio_audioMsgPlayedBlock">
		         <div class="aCpI_msgLiveAudio_playedSpritesInAudioMsg"></div>
		      </div>
		      <div class="aCpI_msgLiveAudio_backgroundForAudioMsg aCpI_msgLiveAudio_backgroundForAudioMsgToMe"></div>
		      <div class="aCpI_msgLiveAudio_backgroundForAudioMsgOnHover"></div>
		      <div class="aCpI_msgLiveAudio_blockInAudioMsg">
		         <div class="aCpI_msgLiveAudio_iconInAudioMessage"></div>
				 <div class="aCpI_msgLiveAudio_viewWhenUploadingLiveAudioMsg"></div>
		         <div class="aCpI_msgLiveAudio_viewWhenLoadingLiveAudioMsg"></div>
		         <div class="aCpI_msgLiveAudio_controllPlayInAudioMessage" onclick="aCpI_msgLiveAudio_playAudioOnClickBtnPlay(this,event)"></div>
		         <div class="aCpI_msgLiveAudio_controllPauseInAudioMessage" onclick="aCpI_msgLiveAudio_pauseAudioOnClickBtnPause(this,event)"></div>
		         <div class="aCpI_msgLiveAudio_hideAudioBlock">
		            <audio class="audioSrc flagAudioOrVideoElement" onplay="aCpI_msgLiveAudio_onEventPlay(this)" onpause="aCpI_msgLiveAudio_onEventPause(this)" preload="auto" src="{{content}}" onloadeddata="aCpI_msgLiveAudio_onEventLoadedAudio(this)" ontimeupdate="aCpI_msgLiveAudio_onEventTimeUpdateForAuidioEl(this)"></audio>
		         </div>
		         <div class="aCpI_msgLiveAudio_timeNowInAudioMessage aCpI_msgLiveAudio_timeInAudioMsg"></div>
		         <div class="aCpI_msgLiveAudio_timeAllInAudioMessage aCpI_msgLiveAudio_timeInAudioMsg"></div>
		      </div>
		    </div>
		`;

		function  msgLiveAudio_createMsg ( iNdata, iNmyUid, iNchatId ) {
	        var iNneedView = msg_getPathToDomForChat(iNchatId);//"#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
	        $( iNneedView ).append( msgLiveAudio_getMsg ( iNdata, iNmyUid ) );
		}
	    _['msgLiveAudio_createMsg'] = msgLiveAudio_createMsg;

			function msgLiveAudio_getMsg (iNdata,iNmyUid) {
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
				iNdata['class'] = 'msgTypeLiveAudio';
				if ( iNdata.uid == iNmyUid ) {
					iNdata['fromMe'] = 1;
		            iNdata['boxContent'] = msgLiveAudio_getTemplateByNameFrom(iNdata);
				}
		        else {
		            iNdata['toMe'] = 1;
		            iNdata['boxContent'] = msgLiveAudio_getTemplateByNameTo(iNdata);
		        }
		        return msg_getTemplateByNameBoxForMsg(iNdata);
			}
		    _['msgLiveAudio_getMsg'] = msgLiveAudio_getMsg;

		    	function msgLiveAudio_getTemplateByNameFrom (iNdata) {
					let temp = Template7.compile(templates['msgLiveAudio_from']);
					return temp(iNdata);
				}
		    	_['msgLiveAudio_getTemplateByNameFrom'] = msgLiveAudio_getTemplateByNameFrom;

				function msgLiveAudio_getTemplateByNameTo (iNdata) {
					let temp = Template7.compile(templates['msgLiveAudio_to']);
					return temp(iNdata);
				}
		    	_['msgLiveAudio_getTemplateByNameTo'] = msgLiveAudio_getTemplateByNameTo;

    		function msgLiveAudio_safeReplace ( iNdata, iNmyUid, iNchatId ) {
		        var thisIssetLength = msg_getLength(iNdata, iNchatId);
		        if (thisIssetLength > 0) {
		        	// create message
		        	msgLiveAudio_replace ( iNdata, iNmyUid, iNchatId );
		        }
			}
		    _['msgLiveAudio_safeReplace'] = msgLiveAudio_safeReplace;
		    
			    function msgLiveAudio_replace ( iNdata, iNmyUid, iNchatId ) {
			        var iNneedView = msg_getPathToDomForChat(iNchatId);//"#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
			        var fullPath = iNneedView + " .messagesInChatView[connect_msg='"+iNdata['msgId']+"']";
			        var content = msgLiveAudio_getMsg ( iNdata, iNmyUid );
			        $( fullPath ).replaceWith( content );
				}
			    _['msgLiveAudio_replace'] = msgLiveAudio_replace;

		    function msgLiveAudio_showUploadBlock (argument) {
				/*
					@discr
					@inputs
						@required
						@optional

				*/
		    }
		    function msgLiveAudio_showLoader (argument) {
				/*
					@discr
					@inputs
						@required
						@optional

				*/
		    }
		    function msgLiveAudio_showUploadBtn (argument) {
				/*
					@discr
					@inputs
						@required
						@optional

				*/
		    }
	//@SECTION> 'msg live audio' type = 20

	//@<SECTION 'msg live video' type = 21
		//@< controller 'record' msgLiveAudio 
			function msgLiveVideo_record_showStreamVideoViewer () {
				$('.aCpI_streamVideo').css('display','flex');
			}
			_['msgLiveVideo_record_showStreamVideoViewer'] = msgLiveVideo_record_showStreamVideoViewer;

			function msgLiveVideo_record_startStreamVideoCountdownTimer (iNcallbackFunction) {
				$('.aCpI_videoStreamTimeCounter').show();
				msgLiveVideo_record_clearStreamVideoCountdownTimer();
				$('.aCpI_videoStreamTimeCounter').countdown (
					{
						until: 3, // second
						description: '',
						onExpiry: function () { 
							$(this).hide();
							if(typeof iNcallbackFunction == 'function' ) iNcallbackFunction (); 
						}, 
						layout: '{sn}' // NOT 03 to 3
					}
				);

			}
			_['msgLiveVideo_record_startStreamVideoCountdownTimer'] = msgLiveVideo_record_startStreamVideoCountdownTimer;


			function msgLiveVideo_record_clearStreamVideoCountdownTimer (iNcallbackFunction) {
				$('.aCpI_videoStreamTimeCounter').countdown ( 'destroy' );

			}
			_['msgLiveVideo_record_clearStreamVideoCountdownTimer'] = msgLiveVideo_record_clearStreamVideoCountdownTimer;


			function msgLiveVideo_record_hideStreamVideoViewer () {
				$('.aCpI_streamVideo').css('display','none');
			}
			_['msgLiveVideo_record_hideStreamVideoViewer'] = msgLiveVideo_record_hideStreamVideoViewer;

			function msgLiveVideo_record_removeStreamVideoElement () {
				$('.aCpI_streamVideo > video').remove();
			}
			function msgLiveVideo_record_setStreamVideoElement (iNstream) {
				msgLiveVideo_record_removeStreamVideoElement();

				var video = document.createElement('video'),
					videosContainer = $('.aCpI_streamVideo').get(0);

	                video = msgLiveVideo_record_mergeProps(video, {
	                    // controls: true,
	                    class: 'aCpI_videoStreamElement',
	                    muted: true
	                });
	                video.srcObject = iNstream;
	                video.play();
	                videosContainer.appendChild(video);
			}
			_['msgLiveVideo_record_setStreamVideoElement'] = msgLiveVideo_record_setStreamVideoElement;

				
				//@< copy from res/js/recorder/mediaStreamRecorder/MediaStreamRecorder.js
					// Merge all other data-types except "function"
					function msgLiveVideo_record_mergeProps(mergein, mergeto) {
						// create video el
					    for (var t in mergeto) {
					        if (typeof mergeto[t] !== 'function') {
					            mergein[t] = mergeto[t];
					        }
					    }
					    return mergein;
					}
				//@> copy from res/js/recorder/mediaStreamRecorder/MediaStreamRecorder.js
		//@> controller 'record' msgLiveVideo ------------------------------------------------------------------------------------------------------------------------------------------------ 

	//@SECTION> 'msg live video' type = 21

	





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

	

	function msg_getPathToDomForMessages (iNchatId) {
        return msg_getPathToDomForChat(iNchatId) + " .messagesInChatView";

    }
    _['msg_getPathToDomForMessages'] = msg_getPathToDomForMessages;

    function getMessagesDomObjectByChatId (iNchatId,iNextra) {
    	var msgPath = msg_getPathToDomForMessages(iNchatId);
    	if (typeof iNextra == 'string')  msgPath = msgPath + iNextra;
        return $( msgPath );
	}
    _['getMessagesDomObjectByChatId'] = getMessagesDomObjectByChatId;


    function msg_getDomElForChat (iNchatId) {
        return $( msg_getPathToDomForChat(iNchatId) );

    }
    _['msg_getDomElForChat'] = msg_getDomElForChat;

    function msg_getLength ( iNdata, iNchatId ) {
        // var iNneedView = msg_getPathToDomForChat(iNchatId);
        //"#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        var fullPath = msg_getPathToDomForChat(iNchatId,iNdata['msgId']);//iNneedView + " .messagesInChatView[connect_msg='"+iNdata['msgId']+"']";
        return $( fullPath ).length;
	}
    _['msg_getLength'] = msg_getLength;

   



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
    					onOff 		-> function
    					defaultState -> bool
			*/
    		var effType = iNeffectType;
    		var objForSpecialClick = {};
    			//@< active effects
    			var flagDefaultWork = true;
				if ( typeof iNdata['defaultState'] == 'boolean' ) {
    				flagDefaultWork = iNdata['defaultState'];
    			}
    			//@> active effects
    			// click
    			var startMsgRecoding = false;
    			var intervalId 		= null;
    			var deleteThisMsg 	= true;
    			var timerFromStartRecordingMessage = 0;

    			objForSpecialClick['down'] = () => {
				// we mouse btn down insed element
					if(!flagDefaultWork)  {
						if(typeof iNdata['onOff'] == 'function') iNdata['onOff']();
						return;
					}
    				startMsgRecoding = false;
    				deleteThisMsg = true;
    				intervalId = setTimeout(()=>{
    					startMsgRecoding = true;
    					// show timer
    					if(effType == 'audio') {
    						smartStartRecodingTimerAtMsgButton('audio');
						
	    					timerFromStartRecordingMessage = MOMENT().getNowTime(); //

		    				if(typeof iNdata['onStart'] == 'function') iNdata['onStart']();
    					} else if (effType == 'video') {

    						msgLiveVideo_record_startStreamVideoCountdownTimer (
    							() => {
    								smartStartRecodingTimerAtMsgButton('video');
    								timerFromStartRecordingMessage = MOMENT().getNowTime(); //
									if(typeof iNdata['onStartVideoRecord'] == 'function') iNdata['onStartVideoRecord']();
								}
							);
							if(typeof iNdata['onStart'] == 'function') iNdata['onStart']();
							return;
						}
    				},150);
    			}

    			$('.cancelBtnInMsgSenderButton').mouseup( () => {
    				if(!flagDefaultWork)  {
						if(typeof iNdata['onOff'] == 'function') iNdata['onOff']();
						return;
					}
    				deleteThisMsg = false;
    			});

    			objForSpecialClick['up'] = (state) => {
    				if(!flagDefaultWork)  {
						if(typeof iNdata['onOff'] == 'function') iNdata['onOff']();
						return;
					}
					clearTimeout (intervalId);
					msgLiveVideo_record_clearStreamVideoCountdownTimer ();
    				if(startMsgRecoding !== true) {
    					// if does not 150 ms since first click -> we swiftch buttons 
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

			var off = () => {
				flagDefaultWork = false;
			}

			var on = ()  => {
				flagDefaultWork = true;
			} 

			return {on:on, off:off};
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


    //@> msg timer in sender buttons 



    function getContentFromMsgSenderBlock () {
		return $('#forTextInputInSenderBlock textarea').val()
	}
	_['getContentFromMsgSenderBlock'] = getContentFromMsgSenderBlock;

	function getContentLengthFromMsgSenderBlock () {
		return $('#forTextInputInSenderBlock textarea').val().length;
	}
	_['getContentLengthFromMsgSenderBlock'] = getContentLengthFromMsgSenderBlock;



	function setObserverForViewMsgInVisualScrollByChatId (iNchatId, iNdata ) {
		let object = getMessagesDomObjectByChatId(iNchatId,'.toMeMessageInChatView');

		object.appearByEach(
			iNdata['success'],
			{
				'scroll-window'		:'#leftBlockInViewWindow',
				'my-filter-window'	: msg_getPathToDomForChat(iNchatId),
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