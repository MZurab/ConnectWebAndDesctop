define(['jquery'],function($) {
		//@@@<<< DICTIONARY 

			function getFromDictionary (iNval) {
				/*
					@discr
						get value (stirng) from dictionary object by key
					@inputs
						@required
							iNval -> string
								@expamle (iNval = country-mexico+code)
					@return
						string : emptry string or string with value from dictianary
				*/
			var DICTIONARY = window.CONNECT_DICTIONARY;
			  if(typeof(DICTIONARY) != 'object') return '';
			  var val = iNval,languageCode,result,body,field=null,header,key,fieldKey,keyBlock,blockName,lang;
			  t = val.split('-');
			  blockName = t[0];
			  keyBlock 	= t[1].split('+');
			  key 			= keyBlock[0];
			  
			  header 	= DICTIONARY[blockName]['header'];
			  body 		= DICTIONARY[blockName]['body'];
			  if ( keyBlock.length > 1 ) 
			    fieldKey = keyBlock[1];
			  else 
			    fieldKey = 'val';
			  
			  field = header[fieldKey];
			  result = body[key][field];
			  if(!result) result = '';

			  return result;
			}


			function _startDictionary (iNparentElement) {
				/*
					@discr
						change [[keys]] to world from Dictionary [by dom path]
					@input
						@required
						@optional
							iNparentElement -> string
					@deps
						function : _transByString
					@return void
				*/
				  if(typeof(iNparentElement)=='undefined')iNparentElement = 'html';
				  var parentEl = iNparentElement;
				  var val;
				  $(iNparentElement + " .CML").each(function (item) {
				  	// get mask from attr || or text (if first invoke)
				  	if( $(this).attr('CMLK') ) {
				    	val = $(this).attr('CMLK');
				    } else {
				     	val = $(this).html();
				    	$(this).attr('CMLK',val);
				    }
				    $(this).html( _transByString(val) );
				  });
			}

			function _transByString (iNstring) {
				/*
					@discr
						convert input string var (iNstring) to value from dictionary array by function
						get array with masks from text
					@input
						iNstring -> string
					@return
						string: data with replacement

				*/
				 	var val = iNstring;
				    var arrayWithKeys = val.match(/\[[a-zA-Z0-9\-\+]*\]/g);
				    for(var iKey in arrayWithKeys) {
				    	var thisValue = arrayWithKeys[iKey].replace(/[\[\]]+/g,'');
				      var newValue = getFromDictionary(thisValue);
				      val = val.replace(arrayWithKeys[iKey],newValue);
				    }
				    return val;
			}

			function addScript (iNhref,iNfuntion) {
				/*
					@discr
						load js script by url to dom
					@input
						@required
							iNhref -> string (url)
						@optional
							iNfuntion -> function what invoking in finishing
					@return void
				*/
				$.getScript(iNhref, iNfuntion );//( data, textStatus, jqxhr )
			}
			function changeLang (iNlang,iNpath,iNfuntion) {
				/*
					@discr
						change language 
					@input
						@required
							saveUserLang -> string (url)
						@optional
							iNpath  -> string (path to dom element) passed to function (_startDictionary)
							iNfuntion -> function what invoking in finishing
					@deps
						function : addScript
						function : _startDictionary
						function : saveUserLang
					@return void
				*/
				var path =iNpath;
				var langHref = 'https://ramman.net/res/web/js/getdictionary.js?'+'lang='+iNlang;
				$('.CMLSourse').remove();
				addScript(langHref,function(){
					$('script[src="' + langHref +'"]').addClass('CMLSourse');
					_startDictionary(path);
					saveUserLang(iNlang);
					if(typeof(iNfuntion)=='function')iNfuntion();
				});
			}


			function _dictionaryAutoChange (iNfuntion) {
				/*
					@discr
						starting proces to get dictionary and replace 
					@input
						@required
						@optional
							iNfuntion -> function what invoking in finishing
					@deps
						function : changeLang
						function : getLocale
					@return void
				*/
				changeLang(getLocale(),'html',iNfuntion);
			}


			function getLocale () {
				/*
					@discr
						know user language
					@input
						@required
						@optional
					@deps
					@return void
				*/
				var userLang = navigator.language || navigator.userLanguage; 
				return userLang;
			}


			function getUserCountry () {
				return localStorage.getItem('ConnectUserCountry');
			}
			function saveUserCountry (iNcountry) {
				return localStorage.setItem('ConnectUserCountry',iNcountry);
			}
			function getUserLang () {
				return localStorage.getItem('ConnectUserLang');
			}
			function saveUserLang (iNlang) {
				return localStorage.setItem('ConnectUserLang',iNlang);
			}
		//@@@>>> DICTIONARY 

		return {
			getLocale 		: getLocale,
			autoChange		: _dictionaryAutoChange,
			changeLang 		: changeLang,
			start 			: _startDictionary,
			get 			: getFromDictionary,
			withString      : _transByString,
		}
	//@>>> URL FUNCTIONS
});
/*
	@schema
		url
*/