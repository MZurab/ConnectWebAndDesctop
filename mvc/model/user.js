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
	function signOut (){
	    M_APP.clear();
	    FIREBASE.auth().signOut().then(function() {
	    }, function(error) {
	    });
	}
    _['signOut'] = signOut;

	function signIn (token,iNfuntion) {
	        	console.log('signIn start');
	    FIREBASE.auth().signInWithCustomToken(token).then(function(user) {
	        	console.log('signIn in');
	       // user signed in
	        M_APP.save('uid', FIREBASE.auth().currentUser.uid );
	        if(typeof(iNfuntion) != 'undefined') {
	        	iNfuntion(); 
	        	console.log('signIn !getGlobalVar iNfuntion -',iNfuntion);
	        }
	        else {
	        	console.log("M_APP.getGlobalVar('engine')",M_APP.getGlobalVar('engine'));

	        	M_APP.getGlobalVar('engine').prepareUrl({'app':'base','page':'one','user':'Zurab','data':'uid=769b72df-6e67-465c-9334-b1a8bfb95a1a2'});
            	M_APP.getGlobalVar('engine').startUrl();
	        	console.log('signIn getGlobalVar');
	        }
		}).catch(function(error) {
	      var errorCode = error.code;
	      var errorMessage = error.message;
	      console.log('signIn errorMessage',errorMessage);
	      console.log('signIn errorCode',errorCode);
	    });
	}
    _['signIn'] = signIn;

	function getMyId () {
    	var uidType = M_APP.get('uidType');
    	if(uidType != null) {
    		if (uidType == '?' ) {
    			return M_APP.get('aUid');
    		} else {
    			return M_APP.get('uid');
			}
    	}
		//old CHANGE
    	var result = checkSignIn();
    	if(result){
    		result = FIREBASE.auth().currentUser.uid;
    	}
        return result;
    }
    _['getMyId'] = getMyId;

    function getMyToken () {
    	return M_APP.get('token');
    }
    _['getMyToken'] = getMyToken;

    function getMyLogin () {
    	var uidType = M_APP.get('uidType');
    	if(uidType != null) {
    		if (uidType == '?' ) {
    			return '@anonym';
    		} else {
    			return M_APP.get('user');
			}
    	}
		//old CHANGE
    	var result = checkSignIn();
    	if(result){
    		result = FIREBASE.auth().currentUser.uid;
    	}
        return result;
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
	            if(status == 1) {                               // Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð²Ñ…Ð¾Ð´Ð° Ð²ÐµÑ€Ð½Ñ‹, ÑÐ¼Ñ ÐºÐ¾Ð´ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½
	                var tokenObject = iNdate2.token;
	                var user = iNdate2.user;
	                M_APP.save('token',tokenObject);
	                M_APP.save('user',user);
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
	_['signUpByUserAndPswd'] = function  (Obj) {
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
	            if(status == 1) {                               // Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð²Ñ…Ð¾Ð´Ð° Ð²ÐµÑ€Ð½Ñ‹, ÑÐ¼Ñ ÐºÐ¾Ð´ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½
	                var tokenObject = iNdate2.token;
	                var user = iNdate2.user;
	                M_APP.save('token',tokenObject);
	                M_APP.save('user',user);
	                M_APP.saveUserCountry(formBlock['country']);
	                M_APP.saveUserLang(formBlock['lang']);
	                M_APP.save('sentSmsTime',M_APP.getTime());
	                _startSmsTimer('signup');
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
    _['checkToken'] = checkToken;

	function startTimer (iNid,iNendTime,enfFunction){
	    $(iNid).countdown(iNendTime)
	    .on('update.countdown', function(event) {
	      var format = '%M:%S';//%H:
	      if(event.offset.totalDays > 0) {
	        format = '%-d day%!d ' + format;
	      }
	      if(event.offset.totalDays > 0) {
	        format = '%-d day%!d ' + format;
	      }
	      if(event.offset.weeks > 0) {
	        format = '%-w week%!w ' + format;
	      }
	      $(this).html(event.strftime(format));
	    }).on('finish.countdown', 
	        function(event) {
	            if ( typeof(enfFunction) != 'undefined' ) enfFunction();
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
	        startTimer('.page-LastTimeForExpireSms',sentSmsTime + 300000,function (){$('.reSendSms').show();$('.LastTimeForExpireSms').hide()});
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