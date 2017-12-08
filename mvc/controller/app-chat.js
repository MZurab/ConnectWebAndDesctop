define( ['m_app-chat', 'v_app-chat', 'm_view', 'm_message', 'm_app'], function ( MODEL, VIEW, M_VIEW, M_MESSAGE, M_APP) {

	console.log('c_app-chat - MODEL',MODEL);
	console.log('c_app-chat - VIEW',VIEW);
  // init result const
  const _ = {};
	  const name = 'chat'; _['name'] = name;
	  const pages = {};

  // 
  _['options'] = {}

  
  var thisPageName;
   //< init pages const
		    //@< page 'index'
		    	thisPageName = 'index';
		        pages[thisPageName]  = {'attr':{'id' : 'leftBlockInViewWindow'},'menus':{}};
		          pages[thisPageName]['functions'] = {
		            // 'isPage'  : function () {    return true;},
		            'getTemplate' : function (iNdata) {

		            },
		            'onOut'  : function () {   return true;},
		            // 'onView'  : function () {
		            //   addPageToFullWindow({'id':'sign','uid':'@system'});
		            //   // V_APP_PAGE.addFullWindowByTemplate({'content':'Hellow World!!!'}); 
		            //   return true;
		            // },
		            // 'onHide'  : function () { return true;},
		            // 'setPage' : function () {return true;},
		            'onInit' 		: function () {
		            	
		            	console.log("M_APP.getAppFromStoryLog('base')",M_APP.getAppFromStoryLog('base'));
		            	if( !M_APP.getAppFromStoryLog('base') ) {
		            		console.log("getAppFromStoryLog",'loa');
		            		// if app base not open yet -> we load
	        				M_APP.getGlobalVar('engine').passToApp( {'app':'base','page':'index'} );
		            	}


		            	M_MESSAGE.view.initApp( { 
		            		// for send simpleTextMessage when click
		            		'simpleMsgText_onClickSendBtn' : M_MESSAGE.simpleMsgText_onClickSendBtn , 
		            		// for send flash data for simpleTextMessage
		            		'simpleMsgText_printing' : M_MESSAGE.msgSimpleText_flashSending } 
	            		);


		            	//
		            	M_MESSAGE.controller_msgLiveVideo_record_run ();
		            	M_MESSAGE.controller_msgLiveAudio_record_run ();

		            	return true;
		            },
		            'onAppear' 		: function (d1,d2) {
		            	console.log('app chat page index onAppear - d1,d2',d1,d2);
		            	MODEL.pageIndex_openChatByChatId(d1);
 						return true;
 					},
		            'onDisappear' 	: function () { return true;},
		          };
		    //@> page 'index'

		    //@< page 'createPrivateChat'
		    	thisPageName = 'createPrivateChat';
		        pages[thisPageName]  = {'attr':{'id' : 'leftBlockInViewWindow'},'menus':{}};
		          pages[thisPageName]['functions'] = {
		            // 'isPage'  : function () {    return true;},
		            'getTemplate' : function (iNdata) {

		            },
		            'onOut'  : function () {   return true;},
		            // 'onView'  : function () {
		            //   addPageToFullWindow({'id':'sign','uid':'@system'});
		            //   // V_APP_PAGE.addFullWindowByTemplate({'content':'Hellow World!!!'}); 
		            //   return true;
		            // },
		            // 'onHide'  : function () { return true;},
		            // 'setPage' : function () {return true;},
		            'onInit' 		: function () {
		            	
	        			M_APP.getGlobalVar('engine').passToApp( {'app':'base','page':'index','data':''} );
		            	M_MESSAGE.view.initApp( { 
		            		// for send simpleTextMessage when click
		            		'simpleMsgText_onClickSendBtn' : M_MESSAGE.simpleMsgText_onClickSendBtn , 
		            		// for send flash data for simpleTextMessage
		            		'simpleMsgText_printing' : M_MESSAGE.msgSimpleText_flashSending } 
	            		);


		            	//
		            	M_MESSAGE.controller_msgLiveVideo_record_run ();
		            	M_MESSAGE.controller_msgLiveAudio_record_run ();

		            	return true;
		            },
		            'onAppear' 		: function (d1,d2) {
		            	// M_MESSAGE.view.startAppearObserver();
		            	MODEL.pageIndex_openChatByChatId(d1);
 						return true;
 					},
		            'onDisappear' 	: function () { return true;},
		          };
		    //@> page 'createPrivateChat'

	  //> init pages const
	_['pages'] = pages; 

	//@<<< APP BLOCK
		//@override
		function getTemplate (iNdata) {
			iNdata['other'] = VIEW.getChatSenderBlock();
		}
		_['getTemplate'] = getTemplate; 

		//@required
		function onInit () {

		}
		_['onInit'] = onInit; 
		
			//@optional	
			function onIn () {

			}
			_['onIn'] = onIn; 
				//@required
				function onAppear () {
					M_VIEW.view.closeLoader();

				}
				_['onAppear'] = onAppear; 
				//@required
				function onDisappear () {
					// here must be page disapear functions
					/*
						безопасно берем pages если есть
						безопасно узнаем название открывшегося сейчась page +getPageName +setPageName
						безопасно вызываем pages[openedPageName][onDisapear] функцию

					*/

				}
			_['onDisappear'] = onDisappear; 

			//@optional	
			function onOut () {
				// here must be page onOut functions

			}
			_['onOut'] = onOut; 
		//@required
		function onDeinit () {

		}
		_['onDeinit'] = onDeinit; 
	//@>>> APP BLOCK



  return  _;
});