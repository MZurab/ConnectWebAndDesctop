define(['m_firebase'],function( FIREBASE ) {
	const _ = {};
	const CONST = {};


	// set firebase framework
    const STORAGE = FIREBASE.storage().ref();

    function getDownloadURL (iNpatch, iNfunction) {
    	STORAGE.child(iNpatch).getDownloadURL().then(function(url) {
		  // `url` is the download URL for 'images/stars.jpg'
		  iNfunction(null,url);
		 
		}).catch(function(error) {
		  // Handle any errors
		  iNfunction(error,null);
		});
    } _.getDownloadURL = getDownloadURL;

	function upload ( iNdata , iNfunctions) { 
		/*
			@examplae
				upload (
					{
						'file' 				: file
						'pathForSaveFile'	: 'public/v3.webm'
						'mimeType' 			: 'video/webm'
					}
					,
					{
						
					}
				)
			@discr
				for uploadfile
			@inputs
				iNdata -> object
					file
					pathForSaveFile
					mimeType -> tring
				iNfunctions -> object
					onProgress (progress : int)
					onError ( error : object )
					onSuccess (downloadURL: string)
		*/

		var metadataForPassToStorage = {},
			mimeType;

		var file = iNdata['file'];
		var pathForSaveFile = iNdata['pathForSaveFile'];

		if ( typeof iNdata['mimeType'] == 'string' ) {
			mimeType = iNdata['mimeType'];
			metadataForPassToStorage = {
				  contentType: mimeType
	        }
		} 
		 	
		var uploadTask = STORAGE.child(pathForSaveFile).put( file , metadataForPassToStorage );//metadata
				uploadTask.on(
					firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
					function(snapshot) {
						// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
						var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;


						console.log('storage.js upload - Upload is ' + progress + '% done');
						if (typeof iNfunctions['onProgress'] == 'function') iNfunctions['onProgress'](progress);
					}, 
					function(error) {
					  // A full list of error codes is available at
					  // https://firebase.google.com/docs/storage/web/handle-errors

					  if (typeof iNfunctions['onError'] == 'function') iNfunctions['onError'](error);
					  console.log('storage.js upload - uploadTask error',error);
					  // switch (error.code) {
					  //   case 'storage/unauthorized':
					  //     // User doesn't have permission to access the object
					  //   break;

					  //   case 'storage/canceled':
					  //     // User canceled the upload
					  //   break;


					  //   case 'storage/unknown':
					  //     // Unknown error occurred, inspect error.serverResponse
					  //   break;
					  // }
					}, 
					function() {
					  	// Upload completed successfully, now we can get the download URL
					  	var downloadURL = uploadTask.snapshot.downloadURL;
						if (typeof iNfunctions['onSuccess'] == 'function') iNfunctions['onSuccess'](downloadURL);
					}
				);
		
	}
	_['upload'] = upload;

	function uploadBlob (iNblob, iNdata , iNfunctions) {
		iNdata['file'] = iNblob;
		upload (iNdata , iNfunctions);
	}
	_['uploadBlob'] = uploadBlob;

	return _;
});