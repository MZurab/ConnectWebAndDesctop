define(['jquery', 'mediaStreamRecorder'],function($, RECORDER) {
	const _ = {'library': RECORDER};
	const CONST = {};


	function audio (iNdata) {
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
				 mediaRecorder.mimeType = 'audio/webm';
				 // mediaRecorder.recorderType = MediaRecorderWrapper;
				 // console.log('MediaRecorderWrapper',MediaRecorderWrapper)
				 console.log('mediaRecorder',mediaRecorder)

				 mediaRecorder.ondataavailable =  function (blob) {
			        // POST/PUT "Blob" using FormData/XHR2
			        console.log('mediaRecorder.ondataavailable blob ',blob);
			        // var blobURL = URL.createObjectURL(blob);
			        if(typeof dataInner['onGetBlob'] == 'function') dataInner['onGetBlob'](blob,mediaRecorder);
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
	_['audio'] = audio;



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

	function getPermissionForVideoAndAudioRecord (onSuccess, onError) {
		//prepared options for start audio
		var audioMediaConstraints = {
		    video: true,
		    audio: true
		};
		navigator.getUserMedia(audioMediaConstraints, onSuccess, onError);
	}
	_['getPermissionForVideoAndAudioRecord'] = getPermissionForVideoAndAudioRecord;

	return _;
});