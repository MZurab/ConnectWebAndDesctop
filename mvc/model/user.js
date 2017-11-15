define(['jquery','m_firebase','dictionary','m_view','m_app','jquery.countdown'], function ($,FIREBASE,DICTIONARY,M_VIEW,M_APP) {
  	const _ = {};
	//@@@<<< USER
		function getUserCountry() {
			return M_APP.get('ConnectUserCountry');
		}
    	_['getUserCountry'] = getUserCountry;

		function saveUserCountry(iNcountry) {
			return M_APP.save('ConnectUserCountry',iNcountry);
		}
    	_['saveUserCountry'] = saveUserCountry;

		function getUserLang () {
			return M_APP.get('ConnectUserLang');
		}
    	_['getUserLang'] = getUserLang;

		function saveUserLang (iNlang) {
			return M_APP.save('ConnectUserLang',iNlang);
		}
    	_['saveUserLang'] = saveUserLang;
	//@@@>>> USER
	function signOut (inSuccess,iNerror){
		// sign out from fb auth
	    FIREBASE.auth().signOut().then( 
    	() =>  {
    		// invoke global function for deleted note from fb db 
			M_APP.globalFunctions_invoke('devise_removeNoteFromDatabase');
			// clear local storage
		    M_APP.clear();

		    // if we are in subdomain we also have sign out from main domain
		    var ROUTING = M_APP.getGlobalVar('m_routing');
	    	if ( ROUTING.getUserDomain() ) {
				//add flag @connectFlagForSyncUserOuted -> with this flag we pass signOut command to main domain from this subdomain in synchronize.js
				M_APP.saveTempStorage ( '@connectFlagForSync_UserSignOut', 1 );
			}
	    	if (typeof (inSuccess) == 'function') inSuccess();
	    }, (error) => {
	    	if (typeof (iNerror) == 'function') iNerror(error);
	    });
	}
    _['signOut'] = signOut;

	function signIn (token,iNfuntion) {
    	console.log('signIn start');
	    FIREBASE.auth().signInWithCustomToken(token).then( 
	    (user) => {
	    	// save new user id
	        M_APP.save('uid', FIREBASE.auth().currentUser.uid );
	        
	        // if we are in subdomain we also have sign in main domain
	    	var ROUTING = M_APP.getGlobalVar('m_routing');
	    	if ( ROUTING.getUserDomain() ) {
				//we are in subdomain -> we copy local storage to temp for sync with main domanin our subdomain
				M_APP.storage_copyLocalToTemp();
				//add flag @connectFlagForSyncUserChanged -> with this flag we pass out signIn user to main domain from this subdomain in synchronize.js
				M_APP.saveTempStorage ( '@connectFlagForSync_UserSignIn', 1 );
			}

			// invoke passed success func or pass to base app by default
	        if(typeof(iNfuntion) != 'undefined') {
	        	iNfuntion(); 
	        } else {
	        	// pass to index page
	        	M_APP.getGlobalVar('engine').passToApp({'app':'base','page':'index','user': getMyLogin(),'data':''});
	        }


	    	
		}).catch(function(error) {
	      var errorCode = error.code;
	      var errorMessage = error.message;
	    });
	}
    _['signIn'] = signIn;

	function getMyId () {
    	var uidType = M_APP.get('uidType'), r;
    	if(uidType != null) {
    		if (uidType == '?' ) {
    			r = M_APP.get('aUid');
    		} else {
    			r = M_APP.get('uid');
			}
    	}
    	if (r != getMyFirebaseUid() ) {
			return false;
    	}
    	return r;
    }
    _['getMyId'] = getMyId;

    function getMyIdFromObj (iNdata) {
    	var r = false;
    	if ( typeof iNdata == 'string' ) iNdata = JSON.parse(iNdata);
    	if ( typeof iNdata == 'object' ) {
    		var uidType = iNdata['uidType'];
    		if( typeof uidType == 'string'  && uidType == '?') {
    			r = iNdata['aUid'];
    		} else {
				r = iNdata['uid'];
			}
    	}
    	return r;
    }
    _['getMyIdFromObj'] = getMyIdFromObj;

    function getMyFirebaseUid () {
		var result = checkSignIn();
    	console.log(' getMyFirebaseUid result checkSignIn',result);
    	if(result){
    		result = FIREBASE.auth().currentUser.uid;
    		console.log(' getMyFirebaseUid result firabase.auth().currentUser.uid',result);
    	}
        return result;
    }

    function getMyToken () {
    	return M_APP.get('token');
    }
    _['getMyToken'] = getMyToken;

    function getMyLogin () {
    	var uidType = M_APP.get('uidType');
    	if(uidType != null) {
    		if (uidType == '?' ) {
    			console.log('getMyLogin anonym');
    			return 'anonym';
    		} else if( getMyId() ){
    			console.log("getMyLogin M_APP.get('user')",M_APP.get('user'));
    			return M_APP.get('user');
			}
    	}
    }
    _['getMyLogin'] = getMyLogin;

    	function  checkSignIn () {
    		return FIREBASE.auth().currentUser;
    	}
		_['checkSignIn'] = checkSignIn;



	function  authByAnonym( iNfuntion,iNloader ) {
		if ( typeof ( iNloader ) == 'undefined' ) iNloader=true;
		if ( iNloader == true  ) M_VIEW.showLoader ();
	    $.ajax(
	    {
	        url: 'https://ramman.net/api/web/sign',
	        type: 'POST',
	        data: JSON.stringify({'type':'signInByAnonim'}),
	        beforeSend: function(request) {
	            request.setRequestHeader("Content-Type", 'application/json');
	        },
	        dataType: 'json',
	        success: function(iNdate2) {
	            var status = iNdate2.status;
	            if(status == 1) {           
	                var fkey 	= iNdate2['fkey']; 
	                 	uid 	= iNdate2['uid'];  
	                 	token 	= iNdate2['token'];      
	                M_APP.save('uidCreated',M_APP.getTime());
	                M_APP.save('uidType',"?");
	                M_APP.save('aUid',uid);
	                M_APP.save('aToken',token);
	                M_APP.save('fkey',fkey);
	                M_APP.del('sentConfirmedTime');
	                M_APP.del('sentSmsTime');
	                M_APP.del('user');
	                signIn(fkey,iNfuntion);
	            } else {                                        
	                M_VIEW.error ( DICTIONARY.get('error-wrongLogin') );
	            }
	            if( iNloader==true ) M_VIEW.closeLoader();
	        },
	        error: function () {
	        	if( iNloader==true ) M_VIEW.closeLoader();
	        }

	    });
	}
	_['authByAnonym'] = authByAnonym;

	function authByUserAndPswd (iNdata) {
	    $.ajax({
	        url: 'https://ramman.net/api/web/sign',
	        type: 'POST',
	        data: JSON.stringify(iNdata),
	        beforeSend: function(request) {
	            request.setRequestHeader("Content-Type", 'application/json');
	        },
	        dataType: 'json',
	        success: function(iNdate2) {
	            console.log(iNdate2);
	            var status = iNdate2.status;
	            if(status == 1) {
	                setMyIcon(iNdate2.info.icon);
	                setMyToken(iNdate2.token);
	                setMyLogin(iNdate2.user);
	                setMyDisplayName(iNdate2.displayName);
	                
	                M_APP.save('sentSmsTime',M_APP.getTime());
	                startSmsTimer ('signin');
	            } else {                                        // Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð²Ñ…Ð¾Ð´Ð° Ð½Ðµ Ð²ÐµÑ€Ð½Ñ‹
	                M_VIEW.error(DICTIONARY.get('error-wrongLogin'));
	            }
	        }
	    });
	}
	_['authByUserAndPswd'] = authByUserAndPswd;

	function checkSmsCode (Obj) {
	    if( typeof(M_APP.get('token')) != 'undefined' &&  typeof(M_APP.get('user')) != 'undefined'){
	        var iNdata 		= {};
	        var formBlock 	= $(Obj).serializeObject();
	        iNdata['token'] = M_APP.get('token');
	        iNdata['user'] 	= M_APP.get('user');
	        iNdata['aToken']= M_APP.get('aToken');
	        iNdata['lang']	= getUserLang('aToken');
	        iNdata['country']= getUserCountry();
	        iNdata['aUid']		= getMyId();

	        var formBlockSignIn = $('.formSignIn').serializeObject();
	        var formBlockCheckCode = $('.formSmsCode').serializeObject();
	        if ( typeof(formBlockSignIn['moveType']) != 'undefined' ) iNdata['aType'] = 1;
	        iNdata.type 		= 'checkCode';
	        iNdata.code 		= formBlock.code;
	        iNdata['codeType'] 	= formBlock['codeType'];
	        M_VIEW.showLoader ();
	        $.ajax({
	            url: 'https://ramman.net/api/web/sign',
	            type: 'POST',
	            data: JSON.stringify(iNdata),
	            beforeSend: function(request) {
	                request.setRequestHeader("Content-Type", 'application/json');
	            },
	            dataType: 'json',
	            success: function(iNdate2) {
	                var status = iNdate2.status;
	                if(status == 1) {
	                    var fkey 	= iNdate2.fkey;
	                    M_APP.save('confirmed',1);
	                    M_APP.save('sentConfirmedTime',M_APP.getTime());
	                    M_APP.save('uidType','@');
	                    signIn(fkey);
	                } else {                                        // Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð²Ñ…Ð¾Ð´Ð° Ð½Ðµ Ð²ÐµÑ€Ð½Ñ‹
	                	M_VIEW.closeLoader(); 
	                    M_VIEW.error(DICTIONARY.get('error-wrongCode'));
	                }
	            },
	            error: function (){M_VIEW.closeLoader(); }
	        });
	        return false;
	    }
	    
	}
    _['checkSmsCode'] = checkSmsCode;

	function checkToken (iNfuntion,iNloader) {
		// checkSignIn
		var checkSign  		= getMyId();
		if ( checkSign == null ) {
			// if not signed
			authByAnonym(iNfuntion,iNloader);
		} else 
			if(typeof(iNfuntion)=='function')iNfuntion(); 
	}
    _['checkToken'] = checkToken;

	function  signUpByUserAndPswd (Obj) {
		M_VIEW.showLoader();
	    var formBlock = $(Obj).serializeObject();
	    $.ajax({
	        url: 'https://ramman.net/api/web/sign',
	        type: 'POST',
	        data: JSON.stringify(formBlock),
	        beforeSend: function(request) {
	            request.setRequestHeader("Content-Type", 'application/json');
	        },
	        dataType: 'json',
	        success: function(iNdate2) {
	            console.log(iNdate2);
	            var status = iNdate2.status;
	            if(status == 1) {
	                setMyIcon(iNdate2.info.icon);
	                setMyToken(iNdate2.token);
	                setMyLogin(iNdate2.user);
	                setMyDisplayName(iNdate2.displayName);
	                M_APP.saveUserCountry(formBlock['country']);
	                M_APP.saveUserLang(formBlock['lang']);
	                M_APP.save('sentSmsTime',M_APP.getTime());
	                startSmsTimer('signup');
	            } else {                                        // Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð²Ñ…Ð¾Ð´Ð° Ð½Ðµ Ð²ÐµÑ€Ð½Ñ‹
	                M_VIEW.error(DICTIONARY.get('error-issetUser'));
	            }
	            M_VIEW.closeLoader();
	        },
	        error: function () {
	        	M_VIEW.closeLoader();
	        }
	    });
	    return false;
	}
    _['signUpByUserAndPswd'] = signUpByUserAndPswd;


    
	function setMyDisplayName (iNname) {
	    M_APP.save('userDisplayName',iNname);
    }
    function getMyDisplayName (iNname) {
	    return M_APP.get('userDisplayName');
	}
    _['getMyDisplayName'] = getMyDisplayName;
    


    function setMyIcon (iNurl) {
	    M_APP.save('userIcon',iNurl);
    }
    function getMyIcon () {
    	return M_APP.get('userIcon');
	}
    _['getMyIcon'] = getMyIcon;

    function setMyLogin (iNlogin) {
	    M_APP.save('user',iNlogin);
	}
 //    function getMyLogin () {
	//     return M_APP.get('user');
	// }
 //    _['getMyLogin'] = getMyLogin;

	function setMyToken (iNtoken) {
	    M_APP.save('token',iNtoken);
	}
    function getMyToken (iNlogin) {
	    return M_APP.get('token');
	}
    _['getMyToken'] = getMyToken;

	function startTimer (iNid,iNendTime,enfFunction){
	    // $(iNid)
	    // .countdown(iNendTime)
	    // .on('update.countdown', function(event) {
	    //   var format = '%M:%S';//%H:
	    //   if(event.offset.totalDays > 0) {
	    //     format = '%-d day%!d ' + format;
	    //   }
	    //   if(event.offset.totalDays > 0) {
	    //     format = '%-d day%!d ' + format;
	    //   }
	    //   if(event.offset.weeks > 0) {
	    //     format = '%-w week%!w ' + format;
	    //   }
	    //   $(this).html(event.strftime(format));
	    // }).on('finish.countdown', 
	    //     function(event) {
	    //         if ( typeof(enfFunction) != 'undefined' ) enfFunction();
	    //     }
	    // );
	    console.log('startTimer iNendTime',iNendTime);
	    
	    $(iNid).countdown ( 'destroy' );
	    $(iNid)
	    .countdown (
			{
				until: iNendTime, // second
				description: '',
				onExpiry: function () { 
					// $(this).hide();
        			if ( typeof(enfFunction) != 'undefined' ) enfFunction();
				}, 
				layout: '{mnn}:{snn}' // NOT 03 to 3
			}
		);
	}
    _['startTimer'] = startTimer;

	function startSmsTimer (iNtype) {
	    var sentSmsTime = parseInt(M_APP.get('sentSmsTime'));
	    var nowSec = M_APP.getTime();
	    if( typeof(sentSmsTime) != 'undefined' & (sentSmsTime + 300000) > nowSec ) {
	        $('.page-reSendSms').hide();
	        $('.page-LastTimeForExpireSms').show();
	        $('.page-formSignIn,.formSignUp').hide();
	        $('.page-formSmsCode').show();
	        if(typeof(iNtype) == 'string') $('#codeType').val(iNtype);
	        startTimer('.page-LastTimeForExpireSms',300/*sentSmsTime + 300000*/,function (){$('.reSendSms').show();$('.LastTimeForExpireSms').hide()});
	    }
	}
    _['startSmsTimer'] = startSmsTimer;

	//to other file
	function sendForm (iNform) {
	    authByUserAndPswd(
	        $(iNform).serializeObject()
	    );
	    return false;
	}
    _['sendForm'] = sendForm;

	$.fn.serializeObject = function()
	{
	   var o = {};
	   var a = this.serializeArray();
	   $.each(a, function() {
	       if (o[this.name]) {
	           if (!o[this.name].push) {
	               o[this.name] = [o[this.name]];
	           }
	           o[this.name].push(this.value || '');
	       } else {
	           o[this.name] = this.value || '';
	       }
	   });
	   return o;
	};


	function reSendSms () {
	    var iNdata = {'type':'reSendSms','user':M_APP.get('user'),'token':M_APP.get('token')};
	    var st = parseInt( M_APP.get('sentSmsTime') )+ 300000;
	    var nowSec = M_APP.getTime();
	    if(st<nowSec) {
	    	M_VIEW.showLoader();
	        $.ajax({
	            url: 'https://ramman.net/api/web/sign',
	            type: 'POST',
	            data: JSON.stringify(iNdata),
	            beforeSend: function(request) {
	                request.setRequestHeader("Content-Type", 'application/json');
	            },
	            dataType: 'json',
	            success: function(iNdate2) {
	                var status = iNdate2.status;
	                if(status == 1) {                               // Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð²Ñ…Ð¾Ð´Ð° Ð²ÐµÑ€Ð½Ñ‹, ÑÐ¼Ñ ÐºÐ¾Ð´ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½
	                    M_APP.save('sentSmsTime',M_APP.getTime());
	                    startSmsTimer();
	                } else if(status == 0){                                     // Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð²Ñ…Ð¾Ð´Ð° Ð½Ðµ Ð²ÐµÑ€Ð½Ñ‹
	                    M_VIEW.error(DICTIONARY.get('error-wrongCode'));
	                }else {
	                    M_VIEW.error(DICTIONARY.get('error-needUpdatePage'));
	                }
	                M_VIEW.closeLoader();
	            },
	            error: function () {
	            	M_VIEW.closeLoader();
	            }
	        });
	    } else M_VIEW.error(DICTIONARY.get('error-smsCodeIsNotExpired'));
	    return false;
	}
    _['reSendSms'] = reSendSms;






	return _;
});