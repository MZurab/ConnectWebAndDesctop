define(['jquery', 'mediaStreamRecorder','WebAudioRecorder', 'Recorder' ],function(  $, RECORDER,WebAudioRecorder, Recorder ) {
	console.log('Recorder init ',Recorder)
	const _ = {'library': RECORDER};
	const CONST = {};

	function video (iNdata) {
		/*
			@discr
				for record audion
			@inputs
				iNdata -> object
					onSuccess -> function
					onError -> function
		*/
		//
		getPermissionForLiveVideoRecord (
			// success function
			(stream) => {
				var dataInner = {};
				 var mediaRecorder = new MediaStreamRecorder(stream);
				 // mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
				 mediaRecorder.mimeType = 'video/webm';
				 // mediaRecorder.canvas = {
				 //    width: 320,
				 //    height: 320
				 // };
				 // mediaRecorder.videoWidth  = 320;
				 // mediaRecorder.videoHeight = 320;
				 console.log('getPermissionForLiveVideoRecord stream',stream);
				 // mediaRecorder.recorderType = MediaRecorderWrapper;
				 // console.log('MediaRecorderWrapper',MediaRecorderWrapper)
				 console.log('video',mediaRecorder)

				 mediaRecorder.ondataavailable =  function (blob) {
			        // POST/PUT "Blob" using FormData/XHR2
			        console.log('video.ondataavailable blob ',blob);
			        // var blobURL = URL.createObjectURL(blob);
			        if(typeof dataInner['getGlob'] == 'function') dataInner['getGlob'](blob,mediaRecorder);
			        // mediaRecorder.save(blob,'1.ogg');
			     };
			     if( typeof iNdata['onSuccess']  == 'function' ) iNdata['onSuccess']( stream, mediaRecorder , dataInner);
		    	 // mediaRecorder.start();
			}, 
			// error funciton
			(e) => {
			     if(typeof iNdata['onError']  == 'function') iNdata['onError'](e);
				
			}
		);
	}
	_['video'] = video;


	function stopRecordingByStream (iNstream) {
		var tracks = iNstream.getTracks();
		for(var iKey in tracks) {
			console.log('stopRecordingByStream tracks[iKey]',tracks[iKey]);
			tracks[iKey].stop();
		}
	}
	_['stopRecordingByStream'] = stopRecordingByStream;


	function audioOld (iNdata) {
		/*
			@discr
				for record audion
			@inputs
				iNdata -> object
					onSuccess -> function
					onError -> function
		*/
		//
		getPermissionForAudioRecord (
			// success function
			(stream) => {
				var dataInner = {};
				 var mediaRecorder = new MediaStreamRecorder(stream);
				 // mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
				 mediaRecorder.mimeType = 'audio/ogg';
				 // mediaRecorder.recorderType = MediaRecorderWrapper;
				 // console.log('MediaRecorderWrapper',MediaRecorderWrapper)
				 console.log('mediaRecorder',mediaRecorder)

				 mediaRecorder.ondataavailable =  function (blob) {
			        // POST/PUT "Blob" using FormData/XHR2
			        console.log('mediaRecorder.ondataavailable blob ',blob);
			        // var blobURL = URL.createObjectURL(blob);
			        if(typeof dataInner['getGlob'] == 'function') dataInner['getGlob'](blob,mediaRecorder);
			        // mediaRecorder.save(blob,'1.ogg');
			     };
			     if( typeof iNdata['onSuccess']  == 'function' ) iNdata['onSuccess']( stream, mediaRecorder , dataInner);
		    	 // mediaRecorder.start();
			}, 
			// error funciton
			(e) => {
			     if(typeof iNdata['onError']  == 'function') iNdata['onError'](e);
				
			}
		);
	}
	_['audioOld'] = audioOld;


	function audio2 (iNdata) {
		/*
			@discr
				for record audion
			@inputs
				iNdata -> object
					onSuccess -> function
					onError -> function
		*/
		//
		getPermissionForAudioRecord (
			// success function
			(stream) => {
				var dataInner = {};
				var configs = {
					'encoding' : 'ogg',
					'workerDir' : 'res/js/recorder/webAudioRecorder/lib/',
					'numChannels': 2 // Default 2
				};
				// var sourseNOde = 
				var audioCtx = new AudioContext();
				var source = audioCtx.createMediaStreamSource(stream);
				var webRecorder = new WebAudioRecorder(source, configs);
				webRecorder.setOptions({
					// 'encodeAfterRecord' : true,
					'timeLimit' : 600, // recording time limit (second) (default = 300)
					'ogg': {
						'quality': -0.1,
						'mimeType' : 'audio/ogg; codecs=opus',
						// webRecorder.onComplete blob  Blob {size: 386598, type: "audio/ogg"} sound.duration 9.798820861678005 - 1.0
						// webRecorder.onComplete blob  Blob {size: 136878, type: "audio/ogg"} sound.duration 9.798820861678005 - 0.5
						// webRecorder.onComplete blob  Blob {size: 96909, type: "audio/ogg"} sound.duration 9.798820861678005 - 0.2
						// webRecorder.onComplete blob  Blob {size: 49576, type: "audio/ogg"} sound.duration 10.518662131519275 - -0.1
					}
				})

				webRecorder.onEncoderLoaded = function(recorder, encoding) { 	console.log('webRecorder.onEncoderLoaded - recorder, encoding',recorder, encoding); }
				webRecorder.onEncodingCanceled = function(recorder, encoding) { console.log('webRecorder.onEncodingCanceled - recorder, encoding',recorder, encoding); }
				webRecorder.onEncodingProgress = function(recorder, progress) { console.log('webRecorder.onEncodingProgress - recorder, progress',recorder, progress); }
				webRecorder.onEncoderLoading = function(recorder, encoding) { 	console.log('webRecorder.onEncoderLoading - recorder, encoding',recorder, encoding); }


				webRecorder.onError =  function (recorder, blob) {
				};
				webRecorder.onComplete =   (recorder, blob) =>{
			        // POST/PUT "Blob" using FormData/XHR2
			        // var blobURL = URL.createObjectURL(blob);
			        if(typeof dataInner['getGlob'] == 'function') dataInner['getGlob'](false,blob);
			        // mediaRecorder.save(blob,'1.ogg');
			    };

			    setTimeout (
					() => {
						if( typeof iNdata['onSuccess']  == 'function' ) iNdata['onSuccess']( stream, recorder);
					},
					500
				);
			    if( typeof iNdata['onSuccess']  == 'function' ) iNdata['onSuccess']( stream, webRecorder , dataInner);
		    	 // mediaRecorder.start();
			}, 
			// error funciton
			(e) => {
			     if(typeof iNdata['onError']  == 'function') iNdata['onError'](e);
				
			}
		);
	}
	_['audio2'] = audio2;



	function liveAudioRecord (iNdata) {
		/*
			@discr
				for record audion
				https://github.com/chris-rudmin/opus-recorder
			@inputs
				iNdata -> object
					onSuccess 		-> function
					onError 		-> function
					onDataAvailable -> function
		*/
		//
		getPermissionForAudioRecord (
			// success function
			(stream) => {
				 var recorder = new Recorder({
			        // monitorGain: parseInt(monitorGain.value, 10),
			        // numberOfChannels: parseInt(numberOfChannels.value, 10),
			        // bitRate: parseInt(bitRate.value,10),
			        // encoderSampleRate: parseInt(encoderSampleRate.value,10),

			        // leaveStreamOpen : true,
			        encoderSampleRate : 16000,//1 = mono, 2 = stereo. Defaults to 1. 
			        // numberOfChannels : 1,//1
			        originalSampleRateOverride : 16000,
			        // resampleQuality: 10,
			        encoderPath: "res/js/recorder/OggOpusRecorder/dist/encoderWorker.min.js", ///Users/zurab/Мои работы/ConnectWeb/ConnectWebAndDesctop/res/js/recorder/OggOpusRecorder/src/encoderWorker.js
			      });

				 recorder.onStart ( 
				 	() => {
				 		// console.log('recorder.onStart');
				 	}
				 );
				 recorder.onStop ( 
				 	() => {
				 		// console.log('recorder.onStop');
				 	}
				 );
				 recorder.onPause ( 
				 	() => {
				 		// console.log('recorder.onPause');
				 	}
				 );
				 recorder.onSave (
					(e) => {
			        	var blob = new Blob( [e.detail], { type: 'audio/ogg' } );
			        	if ( typeof iNdata['onDataAvailable'] == 'function' ) iNdata['onDataAvailable'](false,blob);

					}
				 );

				 // recorder.delete();
				 
		    	 recorder.initStream(
					{
						onSuccess : () => {
							if( typeof iNdata['onSuccess']  == 'function' ) iNdata['onSuccess']( stream, recorder );

						}
					}
				 );
			}, 
			// error funciton
			(e) => {
			     if(typeof iNdata['onError']  == 'function') iNdata['onError'](e);
				
			}
		);
	}
	_['liveAudioRecord'] = liveAudioRecord;

	function getUserMedia (iNmediaConstraints, iNMediaSuccess, iNMediaError) {
		navigator.getUserMedia(iNmediaConstraints, iNMediaSuccess, iNMediaError);
	}
	_['getUserMedia'] = getUserMedia;

	function getPermissionForAudioRecord (onSuccess, onError) {
		//prepared options for start audio
		var audioMediaConstraints = {
		    audio: true
		};
		navigator.getUserMedia(audioMediaConstraints, onSuccess, onError);
	}
	_['getPermissionForAudioRecord'] = getPermissionForAudioRecord;

	function getPermissionForVideoRecord (onSuccess, onError) {
		//prepared options for start audio
		var audioMediaConstraints = {
		    video: true,
		};
		navigator.getUserMedia(audioMediaConstraints, onSuccess, onError);
	}
	_['getPermissionForVideoRecord'] = getPermissionForVideoRecord;

	function getPermissionForLiveVideoRecord (onSuccess, onError) {
		//prepared options for start audio
		var constrainedWidth = 200,
			constrainedHeight = 200;
		 var video_constraints = {
		    "mandatory": {
		       maxHeight: constrainedHeight + 120,
		       maxWidth: constrainedWidth + 120,
		      "minWidth": constrainedWidth,
		      "minHeight": constrainedHeight,
		      // "minFrameRate": "30"
		    },
		    "optional": []
		  }
		// var vid_constraints = {
		//     mandatory: {
		//         maxHeight: 320,
		//         maxWidth: 320
		//     },
		//     width: { min: 240, ideal: 320, max: 380 },
  		//     height: { min: 240, ideal: 320, max: 380 },
		// }
		var audioMediaConstraints = {
		    video: video_constraints,
		    audio: true
		};
		navigator.getUserMedia(audioMediaConstraints, onSuccess, onError);
	}
	_['getPermissionForLiveVideoRecord'] = getPermissionForLiveVideoRecord;

	return _;
});