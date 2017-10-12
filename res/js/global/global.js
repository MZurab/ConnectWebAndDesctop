//@< global
	function aCpI_msg_pauseAllOtherPlayingAudioOrVideoEl () {
		$('.flagForSearchPlayingAudioOrVideo').each(
			function (i,thisEl)  {
				$(this).get(0).pause()
			}
		);
	}
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
	}

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
  	}
			function aCpI_msgLiveAudio_onEventPlay (iNobject) {
	  		//@GLOBAL pause all other audio & video is now playin
	  		aCpI_msg_pauseAllOtherPlayingAudioOrVideoEl();

	  		// add playing flags
	  		aCpI_msgLiveAudio_addPlayingFlags(iNobject);

	  		// view pause brn & hide play btn
  			var parent = $(iNobject).closest('.aCpI_msgLiveAudio_blockInAudioMsg');
  			aCpI_msgLiveAudio_smartViewBtnPauseAudio(parent);
			}

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
			}

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
  	}
		
		function aCpI_msgLiveAudio_onEventPause (iNobject) {
			// del flag
			aCpI_msgLiveAudio_delPlayingFlags(iNobject);

				var parent = $(iNobject).closest('.aCpI_msgLiveAudio_blockInAudioMsg');
			aCpI_msgLiveAudio_smartViewBtnPlayAudio(parent)
			}
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
	}
	function aCpI_msgLiveVideo_onEventMouseLeave (iNthis) {
		/*
  			@discr
  				for '.aCpI_msgLiveVideo_videoMsgContent' event mouser leave -> we hide pause/play btn block
  			@inputs
  				@required
  					iNthis -> object (this)
  		*/
  		$(iNthis).children('.aCpI_msgLiveVideo_backgroundVideoOnHover').hide();
	}

	function aCpI_msgLiveVideo_onEventPlayVideo (iNthis) {
		/*
  			@discr
  				for video '.liveVideoSrc' event onplay video -> we change btn pause TO play (adding class)
  			@inputs
  				@required
  					iNthis -> object (this)
  		*/
		// pause all other now playing video and audio 
  		aCpI_msg_pauseAllOtherPlayingAudioOrVideoEl();

  		let backElement = $(iNthis).closest('.aCpI_msgLiveVideo_videoMsgContent').find('.aCpI_msgLiveVideo_backgroundVideoOnHover');
  		//del
  		$(backElement).removeClass('aCpI_msgLiveVideo_backgroundPlayVideoOnHover').addClass('aCpI_msgLiveVideo_backgroundPauseVideoOnHover')

  		// add flag by addClass 'flagForSearchPlayingAudioOrVideo' && 'flagForSearchPlayingLiveVideo'
  		aCpI_msgLiveVideo_addPlayingFlags(iNthis);
	}

		
		function aCpI_msgLiveVideo_addPlayingFlags (iNthis) {
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
		}

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
	}
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
	}

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
	}


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
	}

//@> codeKey = appChatPageIndex - aCpI 'videoLiveMsg'




