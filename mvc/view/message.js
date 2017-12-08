define(
	['dictionary', 'm_progressbar','template7','v_app', 'm_moment','jquery',  'jquery.appear', 'jquery.countdown'],
	function ( DICTIONARY, M_PROGRESSBAR, Template7, V_APP, MOMENT, $) {
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

  	// tagForTracking
  	// 	templates['tag_forTracking'] = `
  	// 		<div id='tagId{{tagId}}' class='tagForTracking'></div>
  	// 	`;
  	// 	function getTagForTracking () {
  	// 		let temp 		= Template7.compile(templates['tag_forTracking']);
			// let domElement 	=  temp(iNdata);
  	// 	} _.getTagForTracking = getTagForTracking;
	
	//@< chief msg container
		templates['msg_boxForMessage'] = `
			<div id='msgId{{msgId}}' class="messagesInChatView {{class}} {{#if hide}}hide{{/if}}{{#if appearClass}}connect-appear{{/if}} {{#if fromMe}}fromMeMessageInChatView{{/if}}{{#if toMe}}toMeMessageInChatView{{/if}} {{#if note}}noteMessage{{/if}}"  {{#if timeSent}}time-sent="{{timeSent}}"{{/if}}  {{#if timeRead}}time-read="{{timeRead}}"{{/if}} {{#if timeDelivered}}time-delivered="{{timeDelivered}}"{{/if}}  connect_msg="{{msgId}}" connect-appear-scroll-parent='#leftBlockInViewWindow' connect-appear-my-parent='.ChatViewInAppWindow'>
				{{boxContent}}
			</div>
		`;
		//@<SECTION common time
		  	templates['msg_commonTimeFromMeBlock'] = `
				<div class="lineInFromMeMessage">
			      <div class="lineInBoxInLine">
			         
				         <div class="topCircleInMessages" {{#if timeSentText}}{{else}}{{/if}}></div>
				         <div class="timeTopInMessages">{{timeSentText}}</div>
			         

			        <div class="botCircleInMessages" {{#if timeDeliveredText}}{{else}}style="display:none;"{{/if}}  {{#if timeDeliveredText}}title="{{timeDeliveredText}}"{{/if}}></div>
		         	<div class="timeBotInMessages" {{#if timeReadText}}{{else}}style="display:none;"{{/if}}>{{#if timeReadText}}{{timeReadText}}{{/if}}</div>

			      </div>
			   </div>
		  	`;
		  		function msg_getTemplateByNameCommonTimeFromMeBlock (iNdata) {
		  			/*
		    			@inputs
		    				iNdata -> object
		    					class
		    		*/
					let temp = Template7.compile(templates['msg_commonTimeFromMeBlock']);
					return temp(iNdata);
		  		}

			templates['msg_commonTimeToMeBlock'] = `
				<div class="lineInToMeMessage">
			   		<div class="lineInBoxInLine">
						 
						<div class="topCircleInMessages" {{#if timeSentText}}{{else}}style="display:none;"{{/if}}></div>
						<div class="timeTopInMessages" {{#if timeSentText}}{{else}}style="display:none;"{{/if}}>{{timeSentText}}</div>
				         
				        <div class="botCircleInMessages" {{#if timeDeliveredText}}{{else}}style="display:none;"{{/if}}  {{#if timeDeliveredText}}title="{{timeDeliveredText}}"{{/if}}></div>
			         	<div class="timeBotInMessages" {{#if timeReadText}}{{else}}style="display:none;"{{/if}}>{{#if timeReadText}}{{timeReadText}}{{/if}}</div>
				  	</div>
			  	</div>
		  	`;
		  		function msg_getTemplateByNameCommonTimeToMeBlock (iNdata) {
		  			/*
		    			@inputs
		    				iNdata -> object
		    					class
		    		*/
					let temp = Template7.compile(templates['msg_commonTimeToMeBlock']);
					return temp(iNdata);
		  		}
		  			
		  			function msg_updateDomCommonTimeBlock (iNchatId,iNmsgId,iNdata) {
							/*
								@inputs
									@required
										iNdata -> object
											timeSent 		-> int
											timeSentText 	-> string

											timeRead 		-> int
											timeReadText 	-> string

											timeDelivered 		-> int
											timeDeliveredText 	-> string
							*/
						console.log('msg_updateDomCommonTimeBlock iNchatId,iNmsgId,iNdata',iNchatId,iNmsgId,iNdata); 

		  				if ( iNdata['timeSentText'] && iNdata['timeSent'])
		  					msg_updateDomTimeSent (iNchatId,iNmsgId,iNdata);

		  				if ( iNdata['timeReadText'] && iNdata['timeRead'])
		  					msg_updateDomTimeRead (iNchatId,iNmsgId,iNdata);

		  				if ( iNdata['timeDeliveredText'] && iNdata['timeDelivered'])
		  					msg_updateDomTimeDelivered (iNchatId,iNmsgId,iNdata);
		  			}
						function msg_updateDomTimeSent (iNchatId,iNmsgId,iNdata) {
							/*
								@inputs
									@required
										iNdata -> object
											timeSent 		-> int
											timeSentText 	-> string
							*/
							console.log('msg_updateDomTimeSent iNchatId,iNmsgId,iNdata',iNchatId,iNmsgId,iNdata);
							let msgSelector 	= msg_getPathToDomForMsg(iNchatId,iNmsgId);
							console.log('msg_updateDomTimeSent msgSelector', msgSelector);
							// set timeSent -> update dom attr time
							$(msgSelector).attr('time-sent', iNdata['timeSent'] );
							// show dom el top circle
							$(msgSelector + ' .topCircleInMessages').show();
							// set new val -> show dom el top circle
							$(msgSelector + ' .timeTopInMessages').html( iNdata['timeSentText'] ).show();
						}
						function msg_updateDomTimeRead (iNchatId,iNmsgId,iNdata) {
							/*
								@inputs
									@required
										iNdata -> object
											timeRead 		-> int
											timeReadText 	-> string
							*/
							let msgSelector 	= msg_getPathToDomForMsg(iNchatId,iNmsgId);
							// set timeSent -> update dom attr time
							$(msgSelector).attr('time-read', iNdata['timeRead'] );
							// set new val -> show dom el top circle
							$(msgSelector + ' .timeBotInMessages').html( iNdata['timeReadText'] ).show();
						}
						function msg_updateDomTimeDelivered (iNchatId,iNmsgId,iNdata) {
							/*
								@inputs
									@required
										iNdata -> object
											timeDelivered 		-> int
											timeDeliveredText 	-> string
							*/
							let msgSelector 	= msg_getPathToDomForMsg(iNchatId,iNmsgId);
							// set timeSent -> update dom attr time
							$(msgSelector).attr('time-delivered', iNdata['timeDelivered'] );
							// set new attr title -> show dom el top circle
							$(msgSelector + ' .botCircleInMessages').attr('title', iNdata['timeDeliveredText'] ).show();
						}

			  		function msg_getDomAttrByNameChatId (iNel) {
				        var r = $(iNel).parent().attr('connect_chatid');
				        return r;
					}
					_['msg_getDomAttrByNameChatId'] = msg_getDomAttrByNameChatId;

					function msg_getDomAttrByNameMsgId (iNel) {
				        var r = $(iNel).attr('connect_msg');
				        return r;
					}
					_['msg_getDomAttrByNameMsgId'] = msg_getDomAttrByNameMsgId;

					function msg_getDomAttrByNameMessageTimeSent (iNel) {
						//time-sent
				        var r = parseInt($(iNel).attr('time-sent'));
				        if(typeof r != 'number' || !isFinite(r) ) r = 0;
				        return r;
					}
					_['msg_getDomAttrByNameMessageTimeSent'] = msg_getDomAttrByNameMessageTimeSent;

					function msg_getDomAttrByNameMessageTimeRead (iNel) {
						//time-read
				        var r = parseInt($(iNel).attr('time-read'));
				        if(typeof r != 'number' || !isFinite(r) ) r = 0;
				        return r;
					}
					_['msg_getDomAttrByNameMessageTimeRead'] = msg_getDomAttrByNameMessageTimeRead;

					function msg_getDomAttrByNameMessageTimeDelivered (iNel) {
						//time-delivered
				        var r = parseInt($(iNel).attr('time-delivered'));
				        if(typeof r != 'number' || !isFinite(r) ) r = 0;
				        return r;
					}
					_['msg_getDomAttrByNameMessageTimeDelivered'] = msg_getDomAttrByNameMessageTimeDelivered;
		//@SECTION> common time


		function msg_dellHideClassByMsgId (iNmsgId) {
			var id = '#msgId' + iNmsgId;
			$(id+'.messagesInChatView').removeClass('hide');
		} _.msg_dellHideClassByMsgId = msg_dellHideClassByMsgId;



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

	    function msg_getNameOfTypeByType (iNtype) {
	    	switch(iNtype) {
    			//@< text messages
    			case 1: 	// simpleText 
					return 'simpleText';
    			break;
    			//@> text messages

    			//@< live messages
	    			case 20: 	// liveAudio 
						return 'liveAudio';
	    			break;

	    			case 21: 	// liveVideo
						return 'liveVideo';
	    			break;
    			//@> live messages

				//@< file messages
    			//@< file messages

				//@< documents messages
    			//@< documents messages
    		}
    		return false;
	    } _.msg_getNameOfTypeByType = msg_getNameOfTypeByType;

	    function msg_replaceMsgByItsType ( iNtype, iNobjectForCreateMessage, iNmyUID, iNchatId ) {
	    	console.log('msg_replaceMsgByItsType' , iNtype, iNobjectForCreateMessage, iNmyUID, iNchatId);
    		switch(iNtype) {
    			//@< text messages
    			case 1: 	// simpleText 
					msgSimpleText_safeReplace( iNobjectForCreateMessage, iNmyUID, iNchatId  );
    			break;
    			//@> text messages

    			//@< live messages
	    			case 20: 	// liveAudio 
						msgLiveAudio_safeReplace( iNobjectForCreateMessage, iNmyUID, iNchatId  );
	    			break;

	    			case 21: 	// liveAudio
						msgLiveVideo_safeReplace( iNobjectForCreateMessage, iNmyUID, iNchatId  );
	    			break;
    			//@> live messages

				//@< file messages
    			//@< file messages

				//@< documents messages
    			//@< documents messages
    		}
		}
	    _['msg_replaceMsgByItsType'] = msg_replaceMsgByItsType;


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
		   {{commonTimeBlock}}
		   <div class="contentTextInFromMeMessage">{{content}}</div>
		`;

		templates['msgSimpleText_to'] = `
		   {{commonTimeBlock}}
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

			iNdata['class'] = 'msgTypeSimpleText';
			if ( iNdata.uid == iNmyUid ) {
				iNdata['fromMe'] 			= 1;
	            iNdata['commonTimeBlock'] 	= msg_getTemplateByNameCommonTimeFromMeBlock(iNdata);
	            iNdata['boxContent'] 		= msgSimpleText_getTemplateByNameFrom(iNdata);
			}
	        else {
	            iNdata['toMe'] 				= 1;
	            iNdata['commonTimeBlock'] 	= msg_getTemplateByNameCommonTimeToMeBlock(iNdata);
				iNdata['boxContent'] 		= msgSimpleText_getTemplateByNameTo(iNdata);
	        }
	        return msg_getTemplateByNameBoxForMsg(iNdata);
		}
	    _['msgSimpleText_getMsg'] = msgSimpleText_getMsg;

	    function msgSimpleText_updateContent (iNchatId, iNdata,iNmyUid) {
			/*
				@discr
				@inputs
					iNchatId -> string
					iNdata -> object
						msgId 		-> string
						content 	-> string
					iNmyUid -> string
			*/
			var msgPath = msg_getPathToDomForMsg(iNchatId,iNdata['msgId']);
			if ( iNdata.uid == iNmyUid )
				$(msgPath + ' .contentTextInFromMeMessage').html(iNdata['content']);
			else
				$(msgPath + ' .contentTextInToMeMessage').html(iNdata['content']);
		}

	    	

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
	        	msgSimpleText_replace ( iNdata, iNmyUid, iNchatId );
	        }

		}
	    _['msgSimpleText_safeReplace'] = msgSimpleText_safeReplace;
	    
		    function msgSimpleText_replace ( iNdata, iNmyUid, iNchatId ) {

	        	// update common time
	        	msg_updateDomCommonTimeBlock (iNchatId,iNdata['msgId'],iNdata);

	        	// update content
	        	msgSimpleText_updateContent (iNchatId, iNdata, iNmyUid);
			}
		    _['msgSimpleText_replace'] = msgSimpleText_replace;
	//@>SECTION  'msg simpleText' type = 1  ------------------------------------------------------------------------------------------------------------------------------------------------

	

	//@<SECTION  'msg live audio' type = 20 ------------------------------------------------------------------------------------------------------------------------------------------------
		templates['msgLiveAudio_from'] = `
		   {{commonTimeBlock}}
		   <div class="aCpI_msgLiveAudio_contentAudioInFromMeMessage aCpI_msgLiveAudio_contentOfAudioMessage" onmousemove="aCpI_msgLiveAudio_onHover(event, this)" onmouseout="aCpI_msgLiveAudio_onMouseOut(this)" onclick="aCpI_msgLiveAudio_onClick(event,this)">
		      <div class="aCpI_msgLiveAudio_audioMsgPlayedBlock">
		         <div class="aCpI_msgLiveAudio_playedSpritesInAudioMsg"></div>
		      </div>
		      <div class="aCpI_msgLiveAudio_backgroundForAudioMsg aCpI_msgLiveAudio_backgroundForAudioMsgFromMe"></div>
		      <div class="aCpI_msgLiveAudio_backgroundForAudioMsgOnHover"></div>
		      <div class="aCpI_msgLiveAudio_blockInAudioMsg">
		         <div class="aCpI_msgLiveAudio_iconInAudioMessage"></div>
		         <div class="aCpI_msgLiveAudio_viewWhenUploadingLiveAudioMsg aCpI_fromMeMessage"></div>
		         <div class="aCpI_msgLiveAudio_viewWhenLoadingLiveAudioMsg"></div>
		         <div class="aCpI_msgLiveAudio_controllPlayInAudioMessage" onclick="aCpI_msgLiveAudio_playAudioOnClickBtnPlay(this,event)"></div>
		         <div class="aCpI_msgLiveAudio_controllPauseInAudioMessage" onclick="aCpI_msgLiveAudio_pauseAudioOnClickBtnPause(this,event)"></div>
		         <div class="aCpI_msgLiveAudio_hideAudioBlock">
		            <audio class="audioSrc flagAudioOrVideoElement" onplay="aCpI_msgLiveAudio_onEventPlay(this)" onpause="aCpI_msgLiveAudio_onEventPause(this)" preload="metadata" src="{{url}}" onloadeddata="aCpI_msgLiveAudio_onEventLoadedAudio(this)" ontimeupdate="aCpI_msgLiveAudio_onEventTimeUpdateForAuidioEl(this)"></audio>
		         </div>
		         <div class="aCpI_msgLiveAudio_timeNowInAudioMessage aCpI_msgLiveAudio_timeInAudioMsg"></div>
		         <div class="aCpI_msgLiveAudio_timeAllInAudioMessage aCpI_msgLiveAudio_timeInAudioMsg"></div>
		      </div>
		   </div>
		`;

		templates['msgLiveAudio_to'] = `
			{{commonTimeBlock}}
			<div class="aCpI_msgLiveAudio_contentAudioInToMeMessage aCpI_msgLiveAudio_contentOfAudioMessage" onmousemove="aCpI_msgLiveAudio_onHover(event, this)" onmouseout="aCpI_msgLiveAudio_onMouseOut(this)" onclick="aCpI_msgLiveAudio_onClick(event,this)">
		      <div class="aCpI_msgLiveAudio_audioMsgPlayedBlock">
		         <div class="aCpI_msgLiveAudio_playedSpritesInAudioMsg"></div>
		      </div>
		      <div class="aCpI_msgLiveAudio_backgroundForAudioMsg aCpI_msgLiveAudio_backgroundForAudioMsgToMe"></div>
		      <div class="aCpI_msgLiveAudio_backgroundForAudioMsgOnHover"></div>
		      <div class="aCpI_msgLiveAudio_blockInAudioMsg">
		         <div class="aCpI_msgLiveAudio_iconInAudioMessage"></div>
				 <div class="aCpI_msgLiveAudio_viewWhenUploadingLiveAudioMsg aCpI_toMeMessage"></div>
		         <div class="aCpI_msgLiveAudio_viewWhenLoadingLiveAudioMsg"></div>
		         <div class="aCpI_msgLiveAudio_controllPlayInAudioMessage" onclick="aCpI_msgLiveAudio_playAudioOnClickBtnPlay(this,event)"></div>
		         <div class="aCpI_msgLiveAudio_controllPauseInAudioMessage" onclick="aCpI_msgLiveAudio_pauseAudioOnClickBtnPause(this,event)"></div>
		         <div class="aCpI_msgLiveAudio_hideAudioBlock">
		            <audio class="audioSrc flagAudioOrVideoElement" onplay="aCpI_msgLiveAudio_onEventPlay(this)" onpause="aCpI_msgLiveAudio_onEventPause(this)" preload="metadata" src="{{url}}" onloadeddata="aCpI_msgLiveAudio_onEventLoadedAudio(this)" ontimeupdate="aCpI_msgLiveAudio_onEventTimeUpdateForAuidioEl(this)"></audio>
		         </div>
		         <div class="aCpI_msgLiveAudio_timeNowInAudioMessage aCpI_msgLiveAudio_timeInAudioMsg"></div>
		         <div class="aCpI_msgLiveAudio_timeAllInAudioMessage aCpI_msgLiveAudio_timeInAudioMsg"></div>
		      </div>
		    </div>
		`;

		function  msgLiveAudio_createMsg ( iNdata, iNmyUid, iNchatId ) {
	        var iNneedView = msg_getPathToDomForChat(iNchatId);

	        // add hide class if we has no url
	        if(iNdata['url'])iNdata['hide'] = 1;

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
					iNdata['fromMe'] 			= 1;
		            iNdata['commonTimeBlock'] 	= msg_getTemplateByNameCommonTimeFromMeBlock(iNdata);
		            iNdata['boxContent'] 		= msgLiveAudio_getTemplateByNameFrom(iNdata);
				}
		        else {
		            iNdata['toMe'] 				= 1;
		            iNdata['commonTimeBlock'] 	= msg_getTemplateByNameCommonTimeToMeBlock(iNdata);
					iNdata['boxContent'] 		= msgLiveAudio_getTemplateByNameTo(iNdata);
		        }
		        return msg_getTemplateByNameBoxForMsg(iNdata);
			}
		    _['msgLiveAudio_getMsg'] = msgLiveAudio_getMsg;

		    function msgLiveAudio_updateContent (iNchatId, iNdata,iNmyUid) {
				/*
					@discr
					@inputs
						iNchatId -> string
						iNdata -> object
							msgId 		-> string
							content 	-> string
						iNmyUid -> string
				*/
				var msgPath = msg_getPathToDomForMsg(iNchatId,iNdata['msgId']);
				$(msgPath + ' .aCpI_msgLiveAudio_hideAudioBlock audio').attr('src', iNdata['content']);
			}

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
		        console.log('msgLiveAudio_safeReplace thisIssetLength',thisIssetLength);
		        console.log('msgLiveAudio_safeReplace iNdata, iNmyUid, iNchatId',iNdata, iNmyUid, iNchatId);
		        if (thisIssetLength > 0) {
		        	// create message
		        	msgLiveAudio_replace ( iNdata, iNmyUid, iNchatId );
		        } else {
		        	msgLiveAudio_createMsg ( iNdata, iNmyUid, iNchatId );
		        }
			}
		    _['msgLiveAudio_safeReplace'] = msgLiveAudio_safeReplace;
		    
			    function msgLiveAudio_replace ( iNdata, iNmyUid, iNchatId ) {
			    	/*
			    		если нет src то не видимый

			    		первый раз мы добавляем без url - мы должны скрыть
			    		потом при добавление url мы показываем
			    	*/
		        	// update common time
		        	msg_updateDomCommonTimeBlock (iNchatId,iNdata['msgId'],iNdata);

		        	if ( iNdata['url'] ) {
		        		//if we has url we show 
		        		msg_dellHideClassByMsgId(iNdata['msgId'])

		        		//if we have not url => we add
		        		if ( !msgLiveAudio_getUrl(iNchatId, iNdata['msgId']) ) {
		        			msgLiveAudio_setUrl(iNchatId, iNdata['msgId'], iNdata['url'] );
		        		}
		        	}
				}
			    _['msgLiveAudio_replace'] = msgLiveAudio_replace;

			    	function msgLiveAudio_getUrl ( iNchatId, iNmsgId ) {
			        	var fullPath = msg_getPathToDomForMsg(iNchatId, iNmsgId);
			        	return $(fullPath + ' audio').attr('src');
			    	}

			    	function msgLiveAudio_setUrl ( iNchatId, iNmsgId, iNurl ) {
			        	var fullPath = msg_getPathToDomForMsg(iNchatId, iNmsgId);
			        	return $(fullPath + ' audio').attr('src',iNurl);
			    	}


		    function msgLiveAudio_showUploadBlock (iNchatId,iNmsgId) {
	    		let selector = msgLiveAudio_getPathToDomForUploadBlock(iNchatId,iNmsgId);
				$(selector).show();
		    }
		    _['msgLiveAudio_showUploadBlock'] = msgLiveAudio_showUploadBlock;

	    	function msgLiveAudio_hideUploadBlock (iNchatId,iNmsgId) {
	    		let selector = msgLiveAudio_getPathToDomForUploadBlock(iNchatId,iNmsgId);
				$(selector).hide();
		    }
		    _['msgLiveAudio_hideUploadBlock'] = msgLiveAudio_hideUploadBlock;

			    	function msgLiveAudio_getPathToDomForUploadBlock (iNchatId,iNmsgId) {
			    		let msgPath = msg_getPathToDomForMsg(iNchatId,iNmsgId);
						return msgPath + ' .aCpI_msgLiveAudio_viewWhenUploadingLiveAudioMsg';
				    }

		    function msgLiveAudio_clearUploadBlock (iNchatId,iNmsgId) {
	    		let selector = msgLiveAudio_getPathToDomForUploadBlock(iNchatId,iNmsgId);
				$(selector).html();
		    }
		    function msgLiveAudio_initLoader (iNchatId, iNmsgId) {
				/*
					@discr
					@inputs
						@required
						@optional

				*/
				msgLiveAudio_showUploadBlock(iNchatId, iNmsgId)
				
				let selector = msgLiveAudio_getPathToDomForUploadBlock(iNchatId, iNmsgId);

				msgLiveAudio_hideUploadBtn(iNchatId, iNmsgId);

		    	return M_PROGRESSBAR.init (selector, 0, 
		    		{
		    			'color' : '#000',
		    		}
	    		);
			}
		    _['msgLiveAudio_initLoader'] = msgLiveAudio_initLoader;

		    function msgLiveAudio_showUploadBtn (iNchatId, iNmsgId) {
				let path = msgLiveAudio_getPathToDomForUploadBlock (iNchatId,iNmsgId);

				msgLiveAudio_clearUploadBlock();

				msgLiveAudio_showUploadBlock();
				$(path).addClass('aCpI_msg_iconUpload');

		    }
		    _['msgLiveAudio_showUploadBtn'] = msgLiveAudio_showUploadBtn;

	    	function msgLiveAudio_hideUploadBtn (iNchatId,iNmsgId) {
				let path = msgLiveAudio_getPathToDomForUploadBlock (iNchatId,iNmsgId);
				$(path).removeClass('aCpI_msg_iconUpload');
		    }

		    function msgLiveAudio_setObserverForUploadBtn (iNchatId,iNmsgId,iNfunctionUploadFile) {
				let path = msgLiveAudio_getPathToDomForUploadBlock (iNchatId,iNmsgId);
				$(path).click(function () {
					if( $(this).hasClass('aCpI_msg_iconUpload') ) {
						// if this is a upload btn
						if(typeof(iNfunctionUploadFile) == 'function') iNfunctionUploadFile();
					}
				});
			}
		    _['msgLiveAudio_setObserverForUploadBtn'] = msgLiveAudio_setObserverForUploadBtn;
	//@SECTION> 'msg live audio' type = 20

	//@<SECTION 'msg live video' type = 21
		templates['msgLiveVideo_from'] = `
		   {{commonTimeBlock}}
		   <div class="aCpI_msgLiveVideo_contentLiveVideoInFromMeMessage">
		      <div class="aCpI_msgLiveVideo_videoMsgContent" onmouseenter="aCpI_msgLiveVideo_onEventMouseEnter(this)" onmouseleave="aCpI_msgLiveVideo_onEventMouseLeave(this)">
		      	 <div class="aCpI_msgLiveVideo_viewWhenUploadingVideoLiveMsg aCpI_fromMeMessage aCpI_msg_iconUpload"></div>
		      	 <div class='aCpI_msgLiveVideo_viewWhenLoadingVideoLiveMsg'></div>
		      	 <div class='aCpI_msgLiveVideo_msgNowVideoTime'></div>
		         <div class="aCpI_msgLiveVideo_backgroundPlayVideoOnHover aCpI_msgLiveVideo_backgroundVideoOnHover" onclick='aCpI_msgLiveVideo_onEventClickForBackground(this)'></div>
		         <!-- <div class="aCpI_msgLiveVideo_backgroundPauseVideoOnHover aCpI_msgLiveVideo_backgroundVideoOnHover"></div> -->
		         <video preload="metadata" ontimeupdate='aCpI_msgLiveVideo_onEventTimeUpdateVideo(this)' onloadeddata='aCpI_msgLiveVideo_onEventLoadedDataVideo(this)' onplay='aCpI_msgLiveVideo_onEventPlayVideo(this)' onpause='aCpI_msgLiveVideo_onEventPauseVideo(this)' src="{{url}}" class="liveVideoSrc"></video>
		      </div>
		   </div>
		`;

		templates['msgLiveVideo_to'] = `
		   {{commonTimeBlock}}
		   <div class="aCpI_msgLiveVideo_contentLiveVideoInToMeMessage">
		      <div class="aCpI_msgLiveVideo_videoMsgContent" onmouseenter="aCpI_msgLiveVideo_onEventMouseEnter(this)" onmouseleave="aCpI_msgLiveVideo_onEventMouseLeave(this)">
		      	 <div class="aCpI_msgLiveVideo_viewWhenUploadingVideoLiveMsg aCpI_toMeMessage aCpI_msg_iconUpload"></div>
		      	 <div class='aCpI_msgLiveVideo_viewWhenLoadingVideoLiveMsg'></div>
		      	 <div class='aCpI_msgLiveVideo_msgNowVideoTime'></div>
		         <div class="aCpI_msgLiveVideo_backgroundPlayVideoOnHover aCpI_msgLiveVideo_backgroundVideoOnHover" onclick='aCpI_msgLiveVideo_onEventClickForBackground(this)'></div>
		         <!-- <div class="aCpI_msgLiveVideo_backgroundPauseVideoOnHover aCpI_msgLiveVideo_backgroundVideoOnHover"></div> -->
		         <video preload="metadata" ontimeupdate='aCpI_msgLiveVideo_onEventTimeUpdateVideo(this)' onloadeddata='aCpI_msgLiveVideo_onEventLoadedDataVideo(this)' onplay='aCpI_msgLiveVideo_onEventPlayVideo(this)' onpause='aCpI_msgLiveVideo_onEventPauseVideo(this)' src="{{url}}" class="liveVideoSrc"></video>
		      </div>
		   </div>
		`;

		function  msgLiveVideo_createMsg ( iNdata, iNmyUid, iNchatId ) {
	        var iNneedView = msg_getPathToDomForChat(iNchatId);

	        // add hide class if we has no url
	        if(iNdata['url'])iNdata['hide'] = 1;

	        $( iNneedView ).append( msgLiveVideo_getMsg ( iNdata, iNmyUid ) );
		}
	    _['msgLiveVideo_createMsg'] = msgLiveVideo_createMsg;

    		function msgLiveVideo_getMsg (iNdata,iNmyUid) {
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
				iNdata['class'] = 'msgTypeLiveVideo';
				if ( iNdata.uid == iNmyUid ) {
					iNdata['fromMe'] 			= 1;
		            iNdata['commonTimeBlock'] 	= msg_getTemplateByNameCommonTimeFromMeBlock(iNdata);
		            iNdata['boxContent'] 		= msgLiveVideo_getTemplateByNameFrom(iNdata);
				}
		        else {
		            iNdata['toMe'] 				= 1;
		            iNdata['commonTimeBlock'] 	= msg_getTemplateByNameCommonTimeToMeBlock(iNdata);
					iNdata['boxContent'] 		= msgLiveVideo_getTemplateByNameTo(iNdata);
		        }
		        return msg_getTemplateByNameBoxForMsg(iNdata);
			}
		    _['msgLiveVideo_getMsg'] = msgLiveVideo_getMsg;

		    function msgLiveVideo_updateContent (iNchatId, iNdata,iNmyUid) {
				/*
					@discr
					@inputs
						iNchatId -> string
						iNdata -> object
							msgId 		-> string
							content 	-> string
						iNmyUid -> string
				*/
				var msgPath = msg_getPathToDomForMsg(iNchatId,iNdata['msgId']);
				$(msgPath + ' .aCpI_msgLiveVideo_videoMsgContent video').attr('src', iNdata['content']);
			}

		    	function msgLiveVideo_getTemplateByNameFrom (iNdata) {
					let temp = Template7.compile(templates['msgLiveVideo_from']);
					return temp(iNdata);
				}
		    	_['msgLiveVideo_getTemplateByNameFrom'] = msgLiveVideo_getTemplateByNameFrom;

				function msgLiveVideo_getTemplateByNameTo (iNdata) {
					let temp = Template7.compile(templates['msgLiveVideo_to']);
					return temp(iNdata);
				}
		    	_['msgLiveVideo_getTemplateByNameTo'] = msgLiveVideo_getTemplateByNameTo;

    		function msgLiveVideo_safeReplace ( iNdata, iNmyUid, iNchatId ) {
		        var thisIssetLength = msg_getLength(iNdata, iNchatId);
		        if (thisIssetLength > 0) {
		        	// create message
		        	msgLiveVideo_replace ( iNdata, iNmyUid, iNchatId );
		        } else {
		        	msgLiveVideo_createMsg ( iNdata, iNmyUid, iNchatId );
		        }
			}
		    _['msgLiveVideo_safeReplace'] = msgLiveVideo_safeReplace;
		    
			    function msgLiveVideo_replace ( iNdata, iNmyUid, iNchatId ) {
		        	// update common time
		        	msg_updateDomCommonTimeBlock (iNchatId, iNdata['msgId'], iNdata);


					console.log("msgLiveVideo_replace - iNdata['url']", iNdata['url'] );
		        	if ( iNdata['url'] ) {
						//if we has url we show 
						msg_dellHideClassByMsgId(iNdata['msgId'])

						//if we have not url => we add
						console.log("msgLiveVideo_replace - msgLiveVideo_getUrl(iNchatId, iNdata['msgId'])",msgLiveVideo_getUrl(iNchatId, iNdata['msgId']));
						if ( !msgLiveVideo_getUrl(iNchatId, iNdata['msgId']) ) {
							msgLiveVideo_setUrl(iNchatId, iNdata['msgId'], iNdata['url'] );
						}
					}

		        	// update content NOT NEED -> we never change src of video el
		        	// msgLivVideo_updateContent (iNchatId, iNdata, iNmyUid);
				}
			    _['msgLiveVideo_replace'] = msgLiveVideo_replace;

			    	function msgLiveVideo_getUrl (iNchatId, iNmsgId) {
			        	var fullPath = msg_getPathToDomForMsg(iNchatId, iNmsgId);
			        	return $(fullPath + ' video').attr('src');
			    	}
			    	function msgLiveVideo_setUrl (iNchatId, iNmsgId, iNurl) {
						var fullPath = msg_getPathToDomForMsg(iNchatId, iNmsgId);
						return $(fullPath + ' video').attr('src',iNurl);
					}


		    function msgLiveVideo_showUploadBlock (iNchatId,iNmsgId) {
	    		let selector = msgLiveVideo_getPathToDomForUploadBlock(iNchatId,iNmsgId);
				$(selector).show();
		    }
		    _['msgLiveVideo_showUploadBlock'] = msgLiveVideo_showUploadBlock;

	    	function msgLiveVideo_hideUploadBlock (iNchatId,iNmsgId) {
	    		let selector = msgLiveVideo_getPathToDomForUploadBlock(iNchatId,iNmsgId);
				$(selector).hide();
		    }
		    _['msgLiveVideo_hideUploadBlock'] = msgLiveVideo_hideUploadBlock;

			    	function msgLiveVideo_getPathToDomForUploadBlock (iNchatId,iNmsgId) {
			    		let msgPath = msg_getPathToDomForMsg(iNchatId,iNmsgId);
						return msgPath + ' .aCpI_msgLiveVideo_viewWhenUploadingVideoLiveMsg';
				    }

		    function msgLiveVideo_clearUploadBlock (iNchatId,iNmsgId) {
	    		let selector = msgLiveVideo_getPathToDomForUploadBlock(iNchatId,iNmsgId);
				$(selector).html();
		    }
		    function msgLiveVideo_initLoader (iNchatId, iNmsgId) {
				/*
					@discr
					@inputs
						@required
						@optional

				*/
				msgLiveVideo_showUploadBlock(iNchatId, iNmsgId)
				
				let selector = msgLiveVideo_getPathToDomForUploadBlock(iNchatId, iNmsgId);

				msgLiveVideo_hideUploadBtn(iNchatId, iNmsgId);

		    	return M_PROGRESSBAR.init (selector, 0, 
		    		{
		    			'color' : '#000',
		    		}
	    		);
			}
		    _['msgLiveVideo_initLoader'] = msgLiveVideo_initLoader;

		    function msgLiveVideo_showUploadBtn (iNchatId, iNmsgId) {
				let path = msgLiveVideo_getPathToDomForUploadBlock (iNchatId,iNmsgId);

				msgLiveVideo_clearUploadBlock();

				msgLiveVideo_showUploadBlock();
				$(path).addClass('aCpI_msg_iconUpload');

		    }
		    _['msgLiveVideo_showUploadBtn'] = msgLiveVideo_showUploadBtn;

	    	function msgLiveVideo_hideUploadBtn (iNchatId,iNmsgId) {
				let path = msgLiveVideo_getPathToDomForUploadBlock (iNchatId,iNmsgId);
				$(path).removeClass('aCpI_msg_iconUpload');
			}

			function msgLiveVideo_setObserverForUploadBtn (iNchatId,iNmsgId,iNfunctionUploadFile) {
				let path = msgLiveVideo_getPathToDomForUploadBlock (iNchatId,iNmsgId);
				$(path).click(function () {
					if( $(this).hasClass('aCpI_msg_iconUpload') ) {
						// if this is a upload btn
						if(typeof(iNfunctionUploadFile) == 'function') iNfunctionUploadFile();
					}
				});
			}
		    _['msgLiveVideo_setObserverForUploadBtn'] = msgLiveVideo_setObserverForUploadBtn;

		//@< controller 'record' msgLiveVideo 
			function msgLiveVideo_record_showStreamVideoViewer () {
				$('.aCpI_streamVideo').css('display','flex');
			}
			_['msgLiveVideo_record_showStreamVideoViewer'] = msgLiveVideo_record_showStreamVideoViewer;

			function msgLiveVideo_record_startStreamVideoCountdownTimer (iNcallbackFunction) {
				$('.aCpI_videoStreamTimeCounter').show();
				msgLiveVideo_record_clearStreamVideoCountdownTimer();
				$('.aCpI_videoStreamTimeCounter').countdown (
					{
						until: 5, // second
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



	

	function msg_getLastMsg (iNdata) {
		/*
			@discr
				hide nem msg counter block
			@inputs
				@required
					iNdata
						lmsgType
						lmsgText
						lmsgTime
						lmsgUid

						chatId
						chatType

		*/
		var lmsgType 	= iNdata['lmsgType'],
			lmsgText 	= iNdata['lmsgText'],
			lmsgTime 	= iNdata['lmsgTime'],
			lmsgUid 	= iNdata['lmsgUid'],
			result;

		switch (lmsgType) {
			case 1: // simple text
				result =  lmsgText;
			break;

			case 20: // liveAudio
				result = DICTIONARY.withString('[dictionary-audio]');
			break;

			case 21: // liveVideo
				result = DICTIONARY.withString('[dictionary-video]');
			break;
		}
		return result;
	}
	_['msg_getLastMsg'] 	= msg_getLastMsg;

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
        var fullPath = msg_getPathToDomForMsg (iNchatId,iNdata['msgId']);//iNneedView + " .messagesInChatView[connect_msg='"+iNdata['msgId']+"']";
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
						simpleMsgText_onClickSendBtn -> function
						simpleMsgText_printing -> function

  		*/
  		if ( typeof iNdata['simpleMsgText_onClickSendBtn'] == 'function') {
  			// if value is empty
  			$('#sendTextButtonInSenderBlock').off();

  			$('#sendTextButtonInSenderBlock').click(function (e) {
  				var value =  $('#forTextInputInSenderBlock textarea').val();
  				if(value == '') return true;
			    iNdata['simpleMsgText_onClickSendBtn'](e);
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
			    // send flash message when printing simpe msg text
		    	iNdata['simpleMsgText_printing']();
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
    					onTimerTick -> function 
    						onTimerTick (iNperiod)
    							iNperiod - > array
    								iNperiod[6] -> seconds
    								iNperiod[5] -> minutes
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
    						smartStartRecodingTimerAtMsgButton('audio',iNdata.onTimerTick);
						
	    					timerFromStartRecordingMessage = MOMENT().getNowTime(); //

		    				if(typeof iNdata['onStart'] == 'function') iNdata['onStart']();
    					} else if (effType == 'video') {

    						msgLiveVideo_record_startStreamVideoCountdownTimer (
    							() => {
    								smartStartRecodingTimerAtMsgButton('video',iNdata.onTimerTick);
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
    					var passedTimeFromStartRecordToMouseUp = timeWhenMouseUp - timerFromStartRecordingMessage;
    					// stop timer
						stopRecordingTimer();

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
    	function smartStartRecodingTimerAtMsgButton (iNtype,oNtick) {
    		/*
    			@inputs
    				@required
    					iNtype -> string (audio|video) 
    					oNtick -> function
    						oNtick(periods)
    							periods -> array
    								periods[6]
    		*/
    		showTimerBlockAtMsgSendButton();
    		hideLiveAllIconAtMsgSenderBlock();

    		if(iNtype == 'audio')
    			showAudioLiveIconAtMsgSenderBlock();
    		else if(iNtype == 'video')
    			showVideoLiveIconAtMsgSenderBlock();

    		//cancel buttons&effect
    		showEffCancelSendingForLiveMsgAtMsgSenderBlock();
    		// stop previos time if it work
			stopRecordingTimer();
    		$('.timerInMsgSenderBlock span').countdown({since: 0, compact: true, format: 'MS', description: '', onTick: oNtick});
    	}

    	function stopRecordingTimer () {
    		$('.timerInMsgSenderBlock span').countdown('destroy');
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



	function msgSimpleText_setObserverForViewMsgInVisualScrollByChatId (iNchatId, iNdata ) {
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
	_['msgSimpleText_setObserverForViewMsgInVisualScrollByChatId'] = msgSimpleText_setObserverForViewMsgInVisualScrollByChatId;



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
			var scrollHeightSize =  $('#leftBlockInViewWindow').height() / 2 + 200
			if (  
				!( $('#leftBlockInViewWindow').scrollBot() >  scrollHeightSize  ) ||
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













	///
	///
		//@< global
			function msg_pauseAllOtherPlayingAudioOrVideoEl () {
				$('.flagForSearchPlayingAudioOrVideo').each(
					function (i,thisEl)  {
						$(this).get(0).pause()
					}
				);
			}
			window.aCpI_msg_pauseAllOtherPlayingAudioOrVideoEl = msg_pauseAllOtherPlayingAudioOrVideoEl;
			_['msg_pauseAllOtherPlayingAudioOrVideoEl'] = msg_pauseAllOtherPlayingAudioOrVideoEl;
		//@> global

		//@< codeKey = appChatPageIndex - aCpI 'audioLiveMsg'
			function aCpI_msgLiveAudio_onEventLoadedAudio (iNthis) {

				// parent blockInAudioMsg
				let parentBlockInAudioMsg = $(iNthis).closest('.aCpI_msgLiveAudio_blockInAudioMsg');
				// hide loader
				parentBlockInAudioMsg.find('.aCpI_msgLiveAudio_viewWhenLoadingLiveAudioMsg').hide();
				// view play btn
				parentBlockInAudioMsg.find('.aCpI_msgLiveAudio_controllPlayInAudioMessage').show();

				// set now time
				aCpI_msgLiveAudio_setNowTextTimeForAudioNow (iNthis);

				// set duration
				aCpI_msgLiveAudio_setDurationTextTimeForAudioNow (iNthis);
			}
			window.aCpI_msgLiveAudio_onEventLoadedAudio = aCpI_msgLiveAudio_onEventLoadedAudio;

				function aCpI_msgLiveAudio_setNowTextTimeForAudioNow (iNthis) {
					var nowTextTime = moment( (iNthis.currentTime * 1000) || 0).format('mm:ss');
					$(iNthis).closest('.aCpI_msgLiveAudio_blockInAudioMsg').find('.aCpI_msgLiveAudio_timeNowInAudioMessage').html( nowTextTime );
				}
				function aCpI_msgLiveAudio_setDurationTextTimeForAudioNow (iNthis) {
					var durationTextTime = moment( (iNthis.duration * 1000) || 0 ).format('mm:ss');
					$(iNthis).closest('.aCpI_msgLiveAudio_blockInAudioMsg').find('.aCpI_msgLiveAudio_timeAllInAudioMessage').html( durationTextTime );
				}
				function aCpI_msgLiveAudio_setNowTextTimeForAudioNowBySecond (iNthis,iNsecond) {
					var nowTextTime = moment( (iNsecond * 1000) || 0 ).format('mm:ss');
					$(iNthis).closest('.aCpI_msgLiveAudio_blockInAudioMsg').find('.aCpI_msgLiveAudio_timeNowInAudioMessage').html( nowTextTime );
				}
			function aCpI_msgLiveAudio_onHover (iNevent, iNobject) { 
		  		/*
		  			@discr
		  				mouse move on audio msg for moving audio 
		  			@inputs
		  				@required
		  					iNevent -> object (event)
		  					iNobject -> object (this)
		  		*/
			    var e = iNevent;
			    var thisObject = iNobject;

			    // get mouse position by percent
			    var mousePositionObject = global_getMousePositionByEvent(iNevent,iNobject);
			    var XinnerPercent 	= mousePositionObject['xPercent'];

			    // set progress bar
				var element = $(iNobject).children('.aCpI_msgLiveAudio_backgroundForAudioMsgOnHover');
			    aCpI_msgLiveAudio_setProgressBar (element,XinnerPercent,0);

				// get children audio element
			    var audioEl = $(iNobject).find('.aCpI_msgLiveAudio_hideAudioBlock audio').get(0);

		  		// get audio secund position by pass persent mouse x positoin
			    var audioTime = aCpI_msgLiveAudio_getCurrentTimeByPrecent (audioEl, XinnerPercent);

			    // set second text when mouse moving
			    aCpI_msgLiveAudio_setNowTextTimeForAudioNowBySecond (audioEl,audioTime);
		  	}
			window.aCpI_msgLiveAudio_onHover = aCpI_msgLiveAudio_onHover;

		  	function aCpI_msgLiveAudio_onClick (iNevent, iNobject) {
		  		/*
		  			@discr
		  				click audio msg fir start play
		  			@inputs
		  				@required
		  					iNevent -> object (event)
		  					iNobject -> object (this)
		  		*/
		  		// get children btnPlay element
			    var playBtn = $(iNobject).find('.aCpI_msgLiveAudio_blockInAudioMsg .aCpI_msgLiveAudio_controllPlayInAudioMessage')

		  		// get mouse position
			    var mousePositionObject = global_getMousePositionByEvent(iNevent,iNobject);


		  		// get mouse x position percent
			    var XinnerPercent 		= mousePositionObject['xPercent'];

		  		// get children audio element
			    var audioEl = $(iNobject).find('.aCpI_msgLiveAudio_hideAudioBlock audio').get(0);

		  		// get audio secund position by pass persent mouse x positoin
			    var audioTime = aCpI_msgLiveAudio_getCurrentTimeByPrecent (audioEl, XinnerPercent);

			    // set children audio need secund for start
			    aCpI_msgLiveAudio_setCurrentTimeByAudioEl (audioEl,audioTime);

			    // play children audio
			    aCpI_msgLiveAudio_playAudioOnClickBtnPlay (playBtn,iNevent);
		  	}
			window.aCpI_msgLiveAudio_onClick = aCpI_msgLiveAudio_onClick;

		  	function global_getMousePositionByEvent (iNevent,iNobject) {
		  		/*
		  			@discr
		  				GLOBAL FUNCTION get mouse position by Event, This
		  			@inputs
		  				@required
		  					iNevent -> object (event)
		  					iNobject -> object (this)
		  		*/
				// position of element
			    var e 				= iNevent,
			     	thisObject = iNobject,
			    	resultObject	= {},
			    	pos 			= $(thisObject).offset(),
			    	width 			= $(thisObject).width(),
			    	height 			= $(thisObject).height();
			    var	elem_left 		= pos.left,
			    	elem_top 		= pos.top;
			    // position of cursor in this element
			    	resultObject['xPx']			= e.pageX - elem_left;
			    	resultObject['yPx'] 		= e.pageY - elem_top,
			    	resultObject['xPercent'] 	= resultObject['xPx']/width * 100,
			    	resultObject['yPercent'] 	= resultObject['yPx']/height * 100;

		    	return resultObject;
		  	}

		  	function aCpI_msgLiveAudio_onMouseOut (iNobject) {
		  		/*
		  			@discr
		  				when mouse out from audio msg element, set onHover progress bar
		  			@inputs
		  				@required
		  					iNevent -> object (event)
		  					iNobject -> object (this)
		  		*/
				var element = $(iNobject).children('.aCpI_msgLiveAudio_backgroundForAudioMsgOnHover');
			    aCpI_msgLiveAudio_setProgressBar (element,0,500);
			}
			window.aCpI_msgLiveAudio_onMouseOut = aCpI_msgLiveAudio_onMouseOut;

			function aCpI_msgLiveAudio_getCurrentTimeByPrecent (iNaudioEl, iNpercent) {
		  		/*
		  			@discr
		  				get current audio time by passed percent
		  			@inputs
		  				@required
		  					iNevent -> object (event)
		  					iNobject -> object (this)
		  		*/
				var element = iNaudioEl;
				var second = iNpercent * element.duration/100
				return second;
			}
			function aCpI_msgLiveAudio_setCurrentTimeByAudioEl (iNobject,iNcurentTime) {
				/*
		  			@discr
		  				set current time for audio element (iNobject)
		  			@inputs
		  				@required
		  					iNobject -> object (this)
		  					iNcurentTime -> int (second)
		  		*/
				if ( typeof(iNcurentTime) == 'number' && isFinite(iNcurentTime)) {
		  			iNobject.currentTime = iNcurentTime;
		  		}
			}

			function aCpI_msgLiveAudio_onEventTimeUpdateForAuidioEl (thisAudioEl) {
		  		/*
		  			@discr
		  				attach time update
		  			@inputs
		  				@required
		  					thisAudioEl -> object (domElement)
		  		*/
		  		var parent 					= $(thisAudioEl).closest('.aCpI_msgLiveAudio_blockInAudioMsg');
		  		var onHoverBackgrounEl 		= $(thisAudioEl).closest('.aCpI_msgLiveAudio_contentOfAudioMessage').find('.aCpI_msgLiveAudio_backgroundForAudioMsgOnHover');
		  		var thisBackgroundEl 		= $(thisAudioEl).closest('.aCpI_msgLiveAudio_contentOfAudioMessage').find('.aCpI_msgLiveAudio_backgroundForAudioMsg');

		  		var percent = thisAudioEl.currentTime / thisAudioEl.duration * 100;

			  	let cssWidthBackgroundEl = parseInt($(onHoverBackgrounEl).css('width'));
			  	if(cssWidthBackgroundEl == 0)
					aCpI_msgLiveAudio_setNowTextTimeForAudioNow (thisAudioEl);

				aCpI_msgLiveAudio_setDurationTextTimeForAudioNow (thisAudioEl);


		    	aCpI_msgLiveAudio_setProgressBar (thisBackgroundEl,percent)
		    	if(percent >= 100){
		    		setTimeout(()=>{
				    	aCpI_msgLiveAudio_setProgressBar (thisBackgroundEl,0)
				    	aCpI_msgLiveAudio_smartViewBtnPlayAudio(parent);
		    			
		    		},500);
		    	}
			} window.aCpI_msgLiveAudio_onEventTimeUpdateForAuidioEl = aCpI_msgLiveAudio_onEventTimeUpdateForAuidioEl;

		  	function aCpI_msgLiveAudio_playAudioOnClickBtnPlay (iNobject,iNevent) {
		  		/*
		  			@discr
		  				onClick action for audio msg play btn
		  			@inputs
		  				@required
		  					iNobject -> object (this)
		  					iNevent -> object (event)
		  		*/
		  		// stop parent callback for click event
		  		if (iNevent) {
			  		var e = iNevent;
			  		e.stopPropagation();
		  		}
		  		var thisPlayBtn = $(iNobject);
		  		var thisAudioEl = thisPlayBtn.nextAll('.aCpI_msgLiveAudio_hideAudioBlock').children('audio').get(0);

		  		thisAudioEl.play();
		  	} window.aCpI_msgLiveAudio_playAudioOnClickBtnPlay = aCpI_msgLiveAudio_playAudioOnClickBtnPlay;

					

					function aCpI_msgLiveAudio_addPlayingFlags (iNthis) {
						/*
				  			@discr
				  				add flag by addClass 'flagForSearchPlayingAudioOrVideo' && 'flagForSearchPlayingLiveAudio'
				  			@inputs
				  				@required
				  					iNthis -> object (this video el)
				  		*/
				  		$(iNthis)
				  			.addClass('flagForSearchPlayingAudioOrVideo')
				  			.addClass('flagForSearchPlayingLiveAudio');
					} _['msgLiveAudio_addPlayingFlags'] = aCpI_msgLiveAudio_addPlayingFlags;

		  	function aCpI_msgLiveAudio_pauseAudioOnClickBtnPause (iNobject,iNevent) {
		  		/*
		  			@discr
		  				onClick action for audio msg pause btn
		  			@inputs
		  				@required
		  					iNobject -> object (this)
		  					iNevent -> object (event)
		  		*/
		  		// stop parent callback for click event
		  		if (iNevent) {
			  		var e = iNevent;
			  		e.stopPropagation();
		  		}
		  		var thisPauseBtn = $(iNobject);
		  		var thisAudio = thisPauseBtn.nextAll('.aCpI_msgLiveAudio_hideAudioBlock').children('audio').get(0);

		  		thisAudio.pause();
		  	} window.aCpI_msgLiveAudio_pauseAudioOnClickBtnPause = aCpI_msgLiveAudio_pauseAudioOnClickBtnPause;
				
				function aCpI_msgLiveAudio_onEventPause (iNobject) {
					// del flag
					aCpI_msgLiveAudio_delPlayingFlags(iNobject);

						var parent = $(iNobject).closest('.aCpI_msgLiveAudio_blockInAudioMsg');
					aCpI_msgLiveAudio_smartViewBtnPlayAudio(parent)
				} window.aCpI_msgLiveAudio_onEventPause = aCpI_msgLiveAudio_onEventPause;

					function aCpI_msgLiveAudio_delPlayingFlags (iNthis) {
						/*
				  			@discr
				  				delete flag by removeClass 'flagForSearchPlayingAudioOrVideo' && 'flagForSearchPlayingLiveAudio'
				  			@inputs
				  				@required
				  					iNthis -> object (this video el)
				  		*/
			  			$(iNthis)
				  			.removeClass('flagForSearchPlayingAudioOrVideo')
				  			.removeClass('flagForSearchPlayingLiveAudio');
					}

		  	function aCpI_msgLiveAudio_setProgressBar (iNel,iNpercent,iNtime) {
		  		/*
		  			@discr
		  				set css width for progress bar element (iNel) 
		  			@inputs
		  				@required
		  					iNel -> object (this)
		  					iNpercent -> int ()
		  					iNtime -> int (@animations length ms) 
		  		*/
		  		var time = iNtime || 500;
			    let percent = iNpercent.toFixed(2)+'%';
					iNel.clearQueue().stop();
				if( iNtime == 0 )
					iNel.css('width',percent);
				else
				    iNel.animate(
				    	{
			    			'width':percent
			    		},
			    		time
					);
		  	}

			function aCpI_msgLiveAudio_smartViewBtnPauseAudio(iNparent) {
		  			$(iNparent).children('.aCpI_msgLiveAudio_controllPlayInAudioMessage').hide();
		  			$(iNparent).children('.aCpI_msgLiveAudio_controllPauseInAudioMessage').show();
			}
			_['msgLiveAudio_smartViewBtnPauseAudio'] = aCpI_msgLiveAudio_smartViewBtnPauseAudio;

			function aCpI_msgLiveAudio_smartViewBtnPlayAudio(iNparent) {
		  			$(iNparent).children('.aCpI_msgLiveAudio_controllPauseInAudioMessage').hide();
		  			$(iNparent).children('.aCpI_msgLiveAudio_controllPlayInAudioMessage').show();
			}
		//@> codeKey = appChatPageIndex - aCpI 'audioLiveMsg'

		//@< codeKey = appChatPageIndex - aCpI 'videoLiveMsg'
			function aCpI_msgLiveVideo_onEventMouseEnter (iNthis) {
				/*
		  			@discr
		  				for '.aCpI_msgLiveVideo_videoMsgContent' event mouser enter -> we show pause/play btn block
		  			@inputs
		  				@required
		  					iNthis -> object (this)
		  		*/
		  		$(iNthis).children('.aCpI_msgLiveVideo_backgroundVideoOnHover').show();
			} window.aCpI_msgLiveVideo_onEventMouseEnter = aCpI_msgLiveVideo_onEventMouseEnter;	

			function aCpI_msgLiveVideo_onEventMouseLeave (iNthis) {
				/*
		  			@discr
		  				for '.aCpI_msgLiveVideo_videoMsgContent' event mouser leave -> we hide pause/play btn block
		  			@inputs
		  				@required
		  					iNthis -> object (this)
		  		*/
		  		$(iNthis).children('.aCpI_msgLiveVideo_backgroundVideoOnHover').hide();
			} window.aCpI_msgLiveVideo_onEventMouseLeave = aCpI_msgLiveVideo_onEventMouseLeave;	

			

				
				function msgLiveVideo_addPlayingFlags (iNthis) {
					/*
			  			@discr
			  				add flag by addClass 'flagForSearchPlayingAudioOrVideo' && 'flagForSearchPlayingLiveVideo'
			  			@inputs
			  				@required
			  					iNthis -> object (this video el)
			  		*/
			  		$(iNthis)
			  			.addClass('flagForSearchPlayingAudioOrVideo')
			  			.addClass('flagForSearchPlayingLiveVideo');
				} _['msgLiveVideo_addPlayingFlags'] = msgLiveVideo_addPlayingFlags;

			function aCpI_msgLiveVideo_onEventPauseVideo (iNthis) {
				/*
		  			@discr
		  				for video '.liveVideoSrc' event onpause video -> we change btn play TO pause (adding class)
		  			@inputs
		  				@required
		  					iNthis -> object (this)
		  		*/
		  		let backElement = $(iNthis).closest('.aCpI_msgLiveVideo_videoMsgContent').find('.aCpI_msgLiveVideo_backgroundVideoOnHover');
		  		//del
		  		$(backElement)
		  			.removeClass('aCpI_msgLiveVideo_backgroundPauseVideoOnHover')
		  			.addClass('aCpI_msgLiveVideo_backgroundPlayVideoOnHover');


		  		// dell flag by removeClass 'flagForSearchPlayingAudioOrVideo' && 'flagForSearchPlayingLiveVideo'
		  		aCpI_msgLiveVideo_delPlayingFlags(iNthis);
			} window.aCpI_msgLiveVideo_onEventPauseVideo = aCpI_msgLiveVideo_onEventPauseVideo;	

				function aCpI_msgLiveVideo_delPlayingFlags (iNthis) {
					/*
			  			@discr
			  				delete flag by removeClass 'flagForSearchPlayingAudioOrVideo' && 'flagForSearchPlayingLiveVideo'
			  			@inputs
			  				@required
			  					iNthis -> object (this video el)
			  		*/
		  			$(iNthis)
			  			.removeClass('flagForSearchPlayingAudioOrVideo')
			  			.removeClass('flagForSearchPlayingLiveVideo');
				}

			function aCpI_msgLiveVideo_onEventLoadedDataVideo (iNthis) {
				/*
		  			@discr
		  				for video '.liveVideoSrc' event onpause video -> we change btn play TO pause (adding class)
		  			@inputs
		  				@required
		  					iNthis -> object (this)
		  		*/
		  		let loadingEl = $(iNthis).closest('.aCpI_msgLiveVideo_videoMsgContent').find('.aCpI_msgLiveVideo_viewWhenLoadingVideoLiveMsg').hide();
			} window.aCpI_msgLiveVideo_onEventLoadedDataVideo = aCpI_msgLiveVideo_onEventLoadedDataVideo;	

			function aCpI_msgLiveVideo_onEventTimeUpdateVideo (iNthis) {
				/*
		  			@discr
		  				for video '.liveVideoSrc' event onpause video -> we change btn play TO pause (adding class)
		  			@inputs
		  				@required
		  					iNthis -> object (this)
		  		*/

		  		// set current time for this video
		  		var currentTime 	= (iNthis.currentTime * 1000) || 0;
		  		var textCurrentTime = moment(currentTime).format('mm:ss');
		  		let parent = $(iNthis).closest('.aCpI_msgLiveVideo_videoMsgContent').find('.aCpI_msgLiveVideo_msgNowVideoTime').html(textCurrentTime);
			} window.aCpI_msgLiveVideo_onEventTimeUpdateVideo = aCpI_msgLiveVideo_onEventTimeUpdateVideo;	


			function aCpI_msgLiveVideo_onEventClickForBackground (iNthis) {
				/*
		  			@discr
		  				for video '.liveVideoSrc' event onpause video -> we change btn play TO pause (adding class)
		  			@inputs
		  				@required
		  					iNthis -> object (this)
		  		*/
		  		var isPauseBtn = $(iNthis).hasClass('aCpI_msgLiveVideo_backgroundPauseVideoOnHover');
		  		var videoEl = $(iNthis).next().get(0);
		  		if( isPauseBtn ) {
		  			// pause this video
		  			videoEl.pause()
		  		} else {
		  			// play this video
		  			videoEl.play()

		  		}
			} window.aCpI_msgLiveVideo_onEventClickForBackground = aCpI_msgLiveVideo_onEventClickForBackground;	

		//@> codeKey = appChatPageIndex - aCpI 'videoLiveMsg'

	return _;

});