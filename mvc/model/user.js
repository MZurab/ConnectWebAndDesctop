define([], function () {
	//@@@<<< USER
		function Connect_getUserCountry () {
			return Connect_get('ConnectUserCountry');
		}
		function Connect_saveUserCountry (iNcountry) {
			return Connect_save('ConnectUserCountry',iNcountry);
		}
		function Connect_getUserLang () {
			return Connect_get('ConnectUserLang');
		}
		function Connect_saveUserLang (iNlang) {
			return Connect_save('ConnectUserLang',iNlang);
		}
	//@@@>>> USER
	function Connect_signOut(){
	    localStorage.clear();
	    firebase.auth().signOut().then(function() {
	    }, function(error) {
	    });
	}
	function Connect_signIn(token,iNfuntion) {
	    firebase.auth().signInWithCustomToken(token).then(function(user) {
	       // user signed in
	        Connect_save('uid', firebase.auth().currentUser.uid );
	        if(typeof(iNfuntion) != 'undefined')
	        	iNfuntion(); 
	        else Connect_goToUrl('https://ramman.net/');
		}).catch(function(error) {
	      var errorCode = error.code;
	      var errorMessage = error.message;
	    });
	}
	function Connect_getMyId() {
    	var uidType = Connect_get('uidType');
    	if(uidType != null) {
    		if (uidType == '?' ) {
    			return Connect_get('aUid');
    		} else {
    			return Connect_get('uid');
			}
    	}
		//old CHANGE
    	var result = Connect_checkSignIn();
    	if(result){
    		result = firebase.auth().currentUser.uid;
    	}
        return result;
    }
    	function Connect_checkSignIn () {
    		return firebase.auth().currentUser;
    	}



	function Connect_authByAnonym  ( iNfuntion,iNloader ) {
		if ( typeof ( iNloader ) == 'undefined' ) iNloader=true;
		if ( iNloader == true  ) Connect_vLoader ();
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
	                Connect_save('uidCreated',Connect_getTime());
	                Connect_save('uidType',"?");
	                Connect_save('aUid',uid);
	                Connect_save('aToken',token);
	                Connect_save('fkey',fkey);
	                Connect_del('sentConfirmedTime');
	                Connect_del('sentSmsTime');
	                Connect_del('user');
	                Connect_signIn(fkey,iNfuntion);
	            } else {                                        
	                Connect_error ( Connect_getFromDictionary('error-wrongLogin') );
	            }
	            if( iNloader==true ) Connect_hLoader();
	        },
	        error: function () {
	        	if( iNloader==true ) Connect_hLoader();
	        }

	    });
	}

	function Connect_authByUserAndPswd (iNdata) {
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
	                Connect_save('token',tokenObject);
	                Connect_save('user',user);
	                Connect_save('sentSmsTime',Connect_getTime());
	                Connect_startSmsTimer ('signin');
	            } else {                                        // Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð²Ñ…Ð¾Ð´Ð° Ð½Ðµ Ð²ÐµÑ€Ð½Ñ‹
	                Connect_error(Connect_getFromDictionary('error-wrongLogin'));
	            }
	        }
	    });
	}
	function Connect_checkSmsCode (Obj) {
	    if( typeof(Connect_get('token')) != 'undefined' &&  typeof(Connect_get('user')) != 'undefined'){
	        var iNdata 		= {};
	        var formBlock 	= $(Obj).serializeObject();
	        iNdata['token'] = Connect_get('token');
	        iNdata['user'] 	= Connect_get('user');
	        iNdata['aToken']= Connect_get('aToken');
	        iNdata['lang']	= Connect_getUserLang('aToken');
	        iNdata['country']= Connect_getUserCountry();
	        iNdata['aUid']		= Connect_getMyId();

	        var formBlockSignIn = $('.formSignIn').serializeObject();
	        var formBlockCheckCode = $('.formSmsCode').serializeObject();
	        if ( typeof(formBlockSignIn['moveType']) != 'undefined' ) iNdata['aType'] = 1;
	        iNdata.type 		= 'checkCode';
	        iNdata.code 		= formBlock.code;
	        iNdata['codeType'] 	= formBlock['codeType'];
	        Connect_vLoader ();
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
	                    Connect_save('confirmed',1);
	                    Connect_save('sentConfirmedTime',Connect_getTime());
	                    Connect_save('uidType','@');
	                    Connect_signIn(fkey);
	                } else {                                        // Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð²Ñ…Ð¾Ð´Ð° Ð½Ðµ Ð²ÐµÑ€Ð½Ñ‹
	                	Connect_hLoader(); 
	                    Connect_error(Connect_getFromDictionary('error-wrongCode'));
	                }
	            },
	            error: function (){Connect_hLoader(); }
	        });
	        return false;
	    }
	    
	}
	function Connect_checkToken (iNfuntion,iNloader) {
		// checkSignIn
		var checkSign  		= Connect_getMyId();
		if ( checkSign == null ) {
			// if not signed
			Connect_authByAnonym(iNfuntion,iNloader);
		} else 
			if(typeof(iNfuntion)=='function')iNfuntion(); 
	}
	function Connect_signUpByUserAndPswd (Obj) {
		Connect_vLoader();
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
	                Connect_save('token',tokenObject);
	                Connect_save('user',user);
	                Connect_saveUserCountry(formBlock['country']);
	                Connect_saveUserLang(formBlock['lang']);
	                Connect_save('sentSmsTime',Connect_getTime());
	                Connect_startSmsTimer('signup');
	            } else {                                        // Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð²Ñ…Ð¾Ð´Ð° Ð½Ðµ Ð²ÐµÑ€Ð½Ñ‹
	                Connect_error(Connect_getFromDictionary('error-issetUser'));
	            }
	            Connect_hLoader();
	        },
	        error: function () {
	        	Connect_hLoader();
	        }
	    });
	    return false;
	}
	function Connect_startTimer(iNid,iNendTime,enfFunction){
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

	function Connect_startSmsTimer (iNtype) {
	    var sentSmsTime = parseInt(Connect_get('sentSmsTime'));
	    var nowSec = Connect_getTime();
	    if( typeof(sentSmsTime) != 'undefined' & (sentSmsTime + 300000) > nowSec ) {
	        $('.reSendSms').hide();
	        $('.LastTimeForExpireSms').show();
	        $('.formSignIn,.formSignUp').hide();
	        $('.formSmsCode').show();
	        if(typeof(iNtype) == 'string') $('#codeType').val(iNtype);
	        Connect_startTimer('.LastTimeForExpireSms',sentSmsTime + 300000,function (){$('.reSendSms').show();$('.LastTimeForExpireSms').hide()});
	    }
	}
	//to other file
	function Connect_sendForm (iNform) {
	    Connect_authByUserAndPswd(
	        $(iNform).serializeObject()
	    );
	    return false;
	}
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


	function Connect_reSendSms () {
	    var iNdata = {'type':'reSendSms','user':Connect_get('user'),'token':Connect_get('token')};
	    var st = parseInt( Connect_get('sentSmsTime') )+ 300000;
	    var nowSec = Connect_getTime();
	    if(st<nowSec) {
	    	Connect_vLoader();
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
	                    Connect_save('sentSmsTime',Connect_getTime());
	                    Connect_startSmsTimer();
	                } else if(status == 0){                                     // Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð²Ñ…Ð¾Ð´Ð° Ð½Ðµ Ð²ÐµÑ€Ð½Ñ‹
	                    Connect_error(Connect_getFromDictionary('error-wrongCode'));
	                }else {
	                    Connect_error(Connect_getFromDictionary('error-needUpdatePage'));
	                }
	                Connect_hLoader();
	            },
	            error: function () {
	            	Connect_hLoader();
	            }
	        });
	    } else Connect_error(Connect_getFromDictionary('error-smsCodeIsNotExpired'));
	    return false;
	}

	return {
		getCountry 		: Connect_getUserCountry,
		setCountry		: Connect_saveUserCountry,
		getLang 		: Connect_getUserLang,
		setLang 		: Connect_saveUserLang,
	}
});