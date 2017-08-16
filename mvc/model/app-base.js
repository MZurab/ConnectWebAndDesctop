define( ['jquery','m_firebase','m_category','m_app','m_view'] , function ($ , FIREBASE , M_CATEGORY , M_APP , M_VIEW ) {

  const _ = {}; _['name'] = 'base';
  // init pages const
  const pages = {}; _['pages'] = pages;
    //< page menu
        pages['index']  = {'attr':{},'menus':{},'functions':{}};
          pages['index']['attr'] = {
            'id2' : '2',
            'id3' : '3',
          };
          pages['index']['menus'] = {
            'attr' : {
              'id1' : 'id2',
              'id3' : 'id4'
            }
          };
          pages['index']['functions'] = {
            'isPage'  : function () { 
              let i =  ( M_APP.view.d_checkPageInListApp({app:'base','page':'index'}) > 0 ) ? true : false; 
              console.log('app base page index','isPage',i);
              return i;
            },
            'onView'  : function (d,d1) { 
              console.log('app-base page index','onView',d,d1);
              M_APP.view.d_hideApps('all','list');
              M_APP.view.d_showApps('base','list');
              // V_APP_PAGE.addFullWindowByTemplate({'content':'Hellow World!!!'}); 
              getMyChats();

                console.log('connectAppPath', window['connectAppPath']);
                console.log('connectAppPathNumber', window['connectAppPathNumber']);
              // setTimeout(function () {

              //   M_APP.getGlobalVar('engine').toBackApp();
              //   setTimeout( () => { M_APP.getGlobalVar('engine').toUpApp(); },10000);
              // } ,10000);
              return true;
            },
            'onAppear'  : function () {
              console.log('app-base index','onAppear');
              M_VIEW.closeLoader(); 
            },
            'onHide'  : function () {console.log('app-base private','onHide'); return true;},
            // 'setPage' : function () {console.log('app private','setPage'); return true;},
            'onCreate' : function (d,d1) { 
              console.log('app-base page index','onCreate',d,d1);
              M_APP.view.d_createPageInListApp({app:'base','page':'index','content': '<div class="scrolBlockForChat" style="" id="MixItUp81681F"></div>'}); 
            },
          };
    //> page full window

  const options = {
    
  };

  // function onCreate
  function onCreate (iNstring,iNobject) {
    console.log('app-base','onCreate');
    M_APP.view.d_createListApp({app:'base'}); 

  }
  _['onCreate'] = onCreate;

  // function isApp
  function isApp (iNstring,iNobject) {
    console.log('app-base','isApp');
    
    return (M_APP.view.d_checkListApp({app:'base'}) > 0) ? true : false;
  }
  _['isApp'] = isApp;


  // function onInit
  function onInit (iNstring,iNobject) {
    console.log('app-base','onInit');

  }
  _['onInit'] = onInit;

    // function onIn
    function onIn (iNstring,iNobject) {
    console.log('app-base','onIn');
      
    }
    _['onIn'] = onIn;

      //@overide
      function onAppear (iNstring,iNobject) {
    console.log('app-base','onAppear');

      }
      _['onAppear'] = onAppear;

      //@overide
      function onDisappear (iNstring,iNobject) {
        console.log('app-base','onDisappear');

      }
      _['onDisappear'] = onDisappear;

    //@overide
    function onOut (iNstring,iNobject) {
      console.log('app-base','onOut');

    }
    _['onOut'] = onOut;

  //@overide
  function onDeinit (iNstring,iNobject) {
    console.log('app-base','onDeinit');

  }
  _['onDeinit'] = onDeinit;







  const baseSite  = 'https://ramman.net/';
    const url_getPage   = baseSite + 'api/service/page';
  function openPage (iNuid,iNid) {
    /*
      @discr
        open page by iNuid and iNid
      @inputs
        iNuid -> string
        iNid  -> string
      @return
      @algoritm
        1 - get page object from server
        2 - safe add js and css
        3 - view page fullwindow
    */
  }

  function getPage (iNdata,iNfunction) {
    /*
      @example
        getPage ({'uid':'@system','id':'sign'}, function (_) { console.log('_',_)})
      @discr
        get page by iNuid and iNid from server
      @inputs
        iNuid -> string
        iNid  -> string
      @return
      @algoritm
        1 - get page object from server 
    */
    $.get (
      url_getPage, 
      iNdata, 
      function (_) {
        iNfunction(_);
      },
      'json'
    );
  };
    function processingData (iNdata,iNid) {
      /*
        @example
          add scrips and styles vire
        @discr
          get page by iNuid and iNid from server
        @inputs
          iNuid -> string
          iNid  -> string
        @return
        @algoritm
          1 - get page object from server 
      */
      var c = 'pageId' + iNid;
      if(typeof iNdata == 'object') {
        var obj = iNdata;
        if ( typeof obj['css']  == 'object' && obj['css'].length > 0 ) {
          // add css
          for ( var i in obj['css'] ) {
            m_app.d_loadCSS(obj['css'][i],c);
          }
        }
        if ( typeof obj['js']   == 'object' && obj['js'].length > 0 ) {
          // add js
          for ( var i in obj['js'] ) {
            m_app.d_loadJS(obj['js'][i],c);
          }
        }
      }
    }; 

  function closePage () {
    /*
      @example
      @discr
        get page by iNuid and iNid from server
      @inputs
        @required
      @return
      @algoritm
        1 - clear page
    */
  }


  function getMyChats () {
    /*
        ovbserver for user chats list
        @depends
            domSortChatsBlock() - for create sort or check
    */
    console.log('start getMyChats');
    M_CATEGORY.view.startEffSortChats();
    var myUid       = M_APP.get('uid'),
    membersRef      = FIREBASE.database().ref('members/'+myUid);
    console.log('getMyChats myUid',myUid);
    membersRef.on('child_added', function(memberData) { 
          console.log('getMyChats child_added memberData',memberData);
          var memberBlock   = memberData.val();
          var chatId    = memberData.key;
          var user2     = M_APP.getJsonKey(memberBlock);
          M_CATEGORY.userForPrivateChat(chatId,user2);
                var chatsRef = FIREBASE.database().ref('chats/'+chatId);
          console.log('getMyChats chatId',chatId);
                chatsRef.once('value', function(chatData) {
                  console.log('getMyChats chatId chatData',chatData);

                      var   chatId    = chatData.key,
                          chatBlock = chatData.val(),
                          chatType  = chatBlock.type;

                      var   changeObject = M_CATEGORY.getObjectForUpdateChatBlock ( chatBlock );
                            changeObject.chatType       = chatType;
                            changeObject.chatId         = chatId;
                            changeObject.UserName       = '';


                      // create chat
                        delete changeObject.liveData; // 
                        M_CATEGORY.safeUpdateChatBlock(changeObject);
                      //@< private chat
                      if(chatType == 1) {
                            activeUserChangeInChatBlock(chatId,chatType);
                      }
                      //@>private chat
                });
                chatsRef.on('child_changed', function(chatData) {
                    var chatId = chatData.ref.parent.key;
                    var chatKey = chatData.ref.key;
                    var chatDataVale = chatData.val();
                    var chatObject = {}; 
                    chatObject[chatKey] = chatDataVale;
                      var chatBlock = chatData.val();
                      var chatType  = chatBlock.type;
                      var changeObject = M_CATEGORY.getObjectForUpdateChatBlock ( chatObject );
                            changeObject.chatType       = chatType;
                            changeObject.chatId         = chatId;
                      // change chat
                      M_CATEGORY.safeUpdateChatBlock(changeObject,0);
                });
    });
  }
  _['getMyChats'] = getMyChats;

  function activeUserChangeInChatBlock (chatId) {
      // Ð¿Ð¾Ð»ÑƒÑ‡Ð°ÐµÐ¼ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ 2Ð³Ð¾ Ð¿Ð¾ Ð¸Ð´Ñƒ Ð¿Ñ€Ð¸Ð²Ð°Ñ‚Ð½Ð¾Ð³Ð¾ Ñ‡Ð°Ñ‚Ð°
      var user2       = M_CATEGORY.userForPrivateChat(chatId);
      var usersRef    = firebase.database().ref('users/'+user2);
      usersRef.on('value', function(usersData) { 
          // change date if change userDate
          var user2id     = usersData.key;
          var user2Object = usersData.val();
          var user2Phone  = user2Object.info.data.phone;
          var user2Icon   = user2Object.info.data.icon;

          M_CATEGORY.safeUpdateChatBlock(
              {
                  'uuid'      : user2id,
                  'userName'  : user2Phone,
                  'icon'      : user2Icon,
              },1//CHANGE IT
          );

          // Ð¿Ñ€Ð¸Ð²ÑÐ·ÐºÐ° Ð½Ð¾Ð¼ÐµÑ€Ð° ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ð°Ð¼
          activeContactChangeInChatBlock(user2Phone);
      });
  }
  function activeContactChangeInChatBlock (user2Phone){
      var myUid       = firebase.auth().currentUser.uid;
      var contactsRef = firebase.database().ref('contacts/' + myUid + '/' + user2Phone);
      contactsRef.on('value', function(contactData) {
          console.log('activeContactChangeInChatBlock contactData',contactData);
          var contactBlock    = contactData.val();
          console.log('activeContactChangeInChatBlock contactBlock',contactBlock,typeof contactBlock);
          if( typeof contactBlock != 'object' || contactBlock == null) return false;
          var userName        = contactBlock.name;
          var user2id         = contactBlock.uid;
          M_CATEGORY.safeUpdateChatBlock(
              {
                  'uuid'      : user2id,
                  'userName'  : userName
              },1//CHANGE IT
          );
      });
  }

  return _;

});