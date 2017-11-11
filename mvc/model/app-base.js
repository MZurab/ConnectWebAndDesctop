define( 
  ['jquery','m_firebase','m_category','m_app','m_view', 'm_user','dictionary','v_app-base','m_user','m_routing', 'm_database', 'sweetalert2'] , 
  function ($ , FIREBASE , M_CATEGORY , M_APP , M_VIEW,USER, DICTIONARY, VIEW , USER, ROUTING, M_DATABASE,SWEETALERT) {

  const _ = {}; _['name'] = 'base';
  const CONST = {};
  // init pages const
  const pages = {}; _['pages'] = pages;
    //< page menu

        //< page index
          var thisPageName = 'index';
          pages[thisPageName]  = {'attr':{},'menus':{},'functions':{}};
            pages[thisPageName]['attr'] = {
              'id2' : '2',
              'id3' : '3',
            };
            pages[thisPageName]['menus'] = {
              'attr' : {
                'id1' : 'id2',
                'id3' : 'id4'
              }
            };
            pages[thisPageName]['functions'] = {
              'isPage'  : function () { 
                let i =  ( M_APP.view.d_checkPageInListApp({app:'base','page':'index'}) > 0 ) ? true : false;
                console.log('isPage index i',i); 
                return i;
              },
              'onView'  : function (d,d1) { 
                  console.log('onView index');
                // hide all app in list
                M_APP.view.d_hideApps('all','list');

                // show this app in list
                M_APP.view.d_showApps('base','list');

                // add standart header for this list app
                addStandartHeaderInListView();

                console.log('app-bae index onView',d,d1);

                getMyChats();

                return true;
              },
              'onHide'  : function () { 
                  console.log('onHide index');
                  return true;
               },
              'onAppear'  : function () {
                  console.log('onAppear index');
                  M_VIEW.closeLoader(); 
              },
              'onDisappear'  : function () {
                  console.log('onDisappear index');
              },
              // 'setPage' : function () {console.log('app private','setPage'); return true;},
              'onCreate' : function (d,d1) { 
                M_APP.view.d_createPageInListApp({app:'base','page':'index','content': '<div class="scrolBlockForChat" style="" id="MixItUp81681F"></div>'}); 
              },
            };
          //>page index

          //< page one
            var thisPageName = 'one';
            pages[thisPageName]  = {'attr':{},'menus':{},'functions':{}};
              pages[thisPageName]['attr'] = {
                // 'id2' : '2',
                // 'id3' : '3',
              };
              pages[thisPageName]['menus'] = {
                'attr' : {
                  // 'id1' : 'id2',
                  // 'id3' : 'id4'
                }
              };
              pages[thisPageName]['functions'] = {
                'isPage'  : function () { 
                  let i =  ( M_APP.view.d_checkPageInListApp({app:'base','page':'index'}) > 0 ) ? true : false; 
                  console.log('isPage one i',i); 
                  return i;
                },
                'onView'  : function (d,d1) { 
                    console.log('onView one');
                  // hide all app in list
                  M_APP.view.d_hideApps('all','list');

                  // show this app in list
                  M_APP.view.d_showApps('base','list');

                  // add header with back btn for this list app
                  addHeaderWithBackBtnInListView();

                  // attach for back btn this func by click for  open index page 
                  $('.appBase_backButton').click(
                    function(){
                      M_APP.getGlobalVar('engine').passToApp({'app':'base','page':'index','data':''});
                    }
                  );

                  var uid = d['uid'];
                  createChatByGetUrlUserInfo(uid);
                  return true;
                },
                'onAppear'  : function () {
                    console.log('onAppear one');
                  M_VIEW.closeLoader(); 
                },
                'onDisappear'  : function () {
                    console.log('onDisappear one');
                },
                'onHide'  : function () { 
                  console.log('onHide one');

                  // clear user menus 
                  $('.usersBlockContainerInMenusBlock .app[app-name="base"] .view[view-name="index"] .scrolBlockForChat').html('');
                  
                  return true;
                },
                // 'setPage' : function () {    return true;},
                'onCreate' : function (d,d1) { 
                  M_APP.view.d_createPageInListApp({app:'base','page':'index','content': '<div class="scrolBlockForChat" style="" id="MixItUp81681F"></div>'}); 
                },
              };
          //>page one



    //> page full window

  const options = {
    
  };

  // function onCreate
  function onCreate (iNstring,iNobject) {
    // create app block in list
    M_APP.view.d_createListApp({app:'base'}); 

  }
  _['onCreate'] = onCreate;

  // function isApp
  function isApp (iNstring,iNobject) {
    
    return (M_APP.view.d_checkListApp({app:'base'}) > 0) ? true : false;
  }
  _['isApp'] = isApp;


  // function onInit
  function onInit (iNstring,iNobject) {
    controller_devise_run();
    
    //

  }
  _['onInit'] = onInit;

    // function onIn
    function onIn (iNstring,iNobject) {
      
    }
    _['onIn'] = onIn;

      //@overide
      function onAppear (iNstring,iNobject) {


      }
      _['onAppear'] = onAppear;

      //@overide
      function onDisappear (iNstring,iNobject) {

      }
      _['onDisappear'] = onDisappear;

    //@overide
    function onOut (iNstring,iNobject) {

    }
    _['onOut'] = onOut;

  //@overide
  function onDeinit (iNstring,iNobject) {

  }
  _['onDeinit'] = onDeinit;


  function onHide () {
    return true;
  }
  _['onHide'] = onHide;









  function addStandartHeaderInListView () {
    VIEW.addUserHeaderInList( {
      'icon' : USER.getMyIcon(),
      'name' : USER.getMyDisplayName(),
      'login': USER.getMyLogin(),
    },'change');
  }

  function addHeaderWithBackBtnInListView () {
    VIEW.addUserHeaderInList({
      'icon'  : USER.getMyIcon(),
      'name'  : USER.getMyDisplayName(),
      'login' : USER.getMyLogin(),
      'back'  : true,
    },'change');
  }


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

  function getMessagesByChatId () {
    // M_CATEGORY.view.startEffSortChats();
    // var myUid       = M_APP.get('uid'),
    //     chatsRef = FIREBASE.database().ref('chats/'+chatId);
    // chatsRef.once('value', function(chatData) {

    // });
  }


  function pageOne_getUserInfo (iNuid) {
    const objectForAjax = {};
          objectForAjax['userId'] = USER.getMyId();
          objectForAjax['token']  = USER.getMyToken();
          objectForAjax['uid']    = iNuid;
    createChatByGetUrlUserInfo(objectForAjax,
      function (resultOfAjax) {

      }
    );
  }
    CONST['url_getUser']    = 'https://ramman.net/api/user';
    CONST['url_createChat'] = 'https://ramman.net/api/chat';



    /*< USER INFO */
      function createChatByGetUrlUserInfo (iNlogin) {
        const objectForAjax = {};
              objectForAjax['userId']     = USER.getMyId();
              objectForAjax['token']      = USER.getMyToken();
              objectForAjax['uid']        = iNlogin;
        getByGetRequest_userInfo(objectForAjax,
          function (resultOfAjax) {
            console.log('app-base.js createChatByGetUrlUserInfo',USER.getMyLogin() );
            if(resultOfAjax['chat'] == false && USER.getMyLogin() ){
              // create chat
              createChat( iNlogin , resultOfAjax );
            }else{
              // create chat static
              var objForCreateChat = {};
                  objForCreateChat['chatId']  = resultOfAjax['chat'];//resultOfAjax['user']['login'];
                  objForCreateChat['userId']  = resultOfAjax['user']['uid'];
                  objForCreateChat['login']   = resultOfAjax['user']['login'];
              M_CATEGORY.view.createChatList(objForCreateChat);

              console.log('createChatByGetUrlUserInfo viewThisChatFromFDB');
              viewThisChatFromFDB (resultOfAjax['chat'],resultOfAjax);
            }
          }
        );
      }
        function getByGetRequest_userInfo (iNdata,iNfunction) {
          /*
            @example
              createChatByGetUrlUserInfo({'uid': '769b72df-6e67-465c-9334-b1a8bfb95a1a2' ,'userId': 'bac255e1-6a59-4181-bfb9-61139e38630e' , 'token' : '1bf92fd8-fe97-44bc-a223-9b7af3019392'},(result) => {console.log(result);})
            @discr
              get categories, chatId of UID
            @inputs
              @required
                iNuid -> string
                  uid    -> string
                  userId -> string (my)
                  token   -> string (my)
            @return
            @algoritm
              1 - get page object from server 
          */
          var url = getUrl_userInfo(iNdata['uid']); delete iNdata['uid'];
          $.get (
            url, 
            iNdata,
            function (iNcontent) {
              iNfunction(iNcontent);
            },
            'json'
          );
        };
          function getUrl_userInfo (iNuid) {
            var type = 'info';
            return CONST['url_getUser'] +'/' + iNuid +'/' + type;
          }
    /*> USER INFO */

    /*< CHAT */
      function createChat (iNuid,iNuserData) {
        const objectForAjax = {};
              objectForAjax['uid']     = USER.getMyId();
              objectForAjax['token']   = USER.getMyToken();
              objectForAjax['userUrl'] = iNuid;
        getByGetRequest_ChatDataBySafeCreate(objectForAjax,
          function (resultOfAjax) {
            if(typeof resultOfAjax == 'object' && resultOfAjax['status'] == 1 ) {
              // create chat if it did not exist
              console.log('createChat viewThisChatFromFDB');
              viewThisChatFromFDB(resultOfAjax['chat'],iNuserData);
            }
          }
        );
      }
       
        function viewThisChatFromFDB (iNchat,iNuserData) {
            const objForCreatChat = {};
            objForCreatChat['chatId']   = iNchat || ('noneChat_'+iNuserData['user']['uid']);
            objForCreatChat['userId']   = iNuserData['user']['uid'];
            objForCreatChat['chatName'] = iNuserData['user']['name'];
            objForCreatChat['icon_min'] = iNuserData['user']['icon'];
            // if(iNchat) {
              M_CATEGORY.userForPrivateChat(objForCreatChat['chatId'],objForCreatChat['userId']);

              // M_CATEGORY.view.safeAddChatList(objForCreatChat);
              // attach link with chat db
              safeAttachLiveLinkToChatElement(objForCreatChat['chatId'], 
                () => {
                  // add category
                 viewServiceMenu (objForCreatChat,iNuserData);

                }
              );
            // hide all chat list
            M_CATEGORY.view.effHideChatLists();
            // show this chat list
            M_CATEGORY.view.effShowChatList(objForCreatChat['chatId']);
        }
          function viewServiceMenu (objForCreatChat,iNuserData) {
                console.log('viewServiceMenu',iNuserData,objForCreatChat);
                M_CATEGORY.view.addMenuByCategoryList (iNuserData,objForCreatChat['userId']);
                // dictionary
                DICTIONARY.start('.menuListForUsers');
          }

        function getByGetRequest_ChatDataBySafeCreate (iNdata,iNfunction) {
          /*
            @example
              createChatByGetUrlUserInfo({'uid': '769b72df-6e67-465c-9334-b1a8bfb95a1a2' ,'userId': 'bac255e1-6a59-4181-bfb9-61139e38630e' , 'token' : '1bf92fd8-fe97-44bc-a223-9b7af3019392'},(result) => {console.log(result);})
            @discr
              get categories, chatId of UID
            @inputs
              @required
                iNuid -> string
                  uid    -> string
                  userId -> string (my)
                  token   -> string (my)
            @return
            @algoritm
              1 - get page object from server 
          */
          var url = getUrl_createChat(iNdata['userUrl']); delete iNdata['userUrl'];
          $.get (
            url, 
            iNdata,
            function (iNcontent) {
              iNfunction(iNcontent);
            },
            'json'
          );
        };
          function getUrl_createChat (iNuid) {
            var type = 'createChat';
            return CONST['url_createChat'] +'/' + iNuid +'/' + type;
          }
    /*> CHAT */

  function pageOne_addChatByChatId() {


  }
  function pageOne_addMenuByUserId () {

  }
  function pageOne_showPage () {
    /*
    */
    M_CATEGORY.view.effHideChatLists();
    M_CATEGORY.view.effShowChatList(chatId);
  }



  function getMyChats () {
    /*
        ovbserver for user chats list
        @depends
            domSortChatsBlock() - for create sort or check
    */
    M_CATEGORY.view.startEffSortChats();
    var myUid       = M_APP.get('uid');
    // membersRef      = FIREBASE.database().ref('members/'+myUid);


    M_DATABASE.getRealtimeDataFromFirestoreDb (
          'users',
          myUid + '/members',
          {
            'functionOnOther' : () => {

            },
            
            'functionOnChangeFromServer' : (memberData) => {
            
            },
            
            'functionOnAdd' : (memberData) => {
              var memberBlock   = memberData.data();
              var chatId        = memberData.id;
              var user2         = M_APP.getJsonKey(memberBlock);
              M_CATEGORY.userForPrivateChat(chatId,user2);
                   
              safeAttachLiveLinkToChatElement(chatId);
            }
          }
    );



    // membersRef.on('child_added', function(memberData) { 
    //       var memberBlock   = memberData.val();
    //       var chatId    = memberData.key;
    //       var user2     = M_APP.getJsonKey(memberBlock);
    //       M_CATEGORY.userForPrivateChat(chatId,user2);
               
    //       safeAttachLiveLinkToChatElement(chatId);
    // });
  }
  _['getMyChats'] = getMyChats;




  //@< copy funcitons from message.js model
    CONST['var_prefixNewMessageCount'] = 'connectNewMsgCountInChat-';

    function setMyNewMessagesCountByChatId (iNchatId,iNnumber) {
      let path = CONST['var_prefixNewMessageCount']+iNchatId;
      M_APP.save(path,iNnumber);
    }
    _['setMyNewMessagesCountByChatId'] = setMyNewMessagesCountByChatId;
  //@> copy funcitons from message.js model

  function startNewMsgCounter (iNdata, iNchatId,iNmyUid) {

    let number = iNdata['member'][iNmyUid]['newMsg']||0;
    // save in local storage in db
    if(number == 0) return false; 
    setMyNewMessagesCountByChatId(iNchatId,number);
    M_CATEGORY.view.domSafeShowNewMsgCountInChatBlock( iNchatId, number );



    // let chatsMyNewMsgRef = FIREBASE.database().ref('chats/' + iNchatId + '/member/' + iNmyUid + '/newMsg');
    // chatsMyNewMsgRef.on('value', 
    //   (iNdata) => {
    //     let number = iNdata.val()||0;
    //     // save in local storage in db
    //     if(number == 0) return false; 
    //     setMyNewMessagesCountByChatId(iNchatId,number);
    //     M_CATEGORY.view.domSafeShowNewMsgCountInChatBlock( iNchatId, number );
    //   }
    // );
  }


  function safeAttachLiveLinkToChatElement (iNchatId,iNfunction) {
      // of all link with chat db
      offAllLinkWithChatDbByChatId(iNchatId);
      //check chat list for exist
      var  chatId           = iNchatId,
           myUid            = USER.getMyId();
           // chatsRef         = FIREBASE.database().ref('chats/' + chatId + '/info');
      
       console.log('safeAttachLiveLinkToChatElement myUid, chatId',myUid, chatId);

       M_DATABASE.getRealtimeDataFromFirestoreDb (
          'chats',
          chatId,
          {
            'functionOnOther' : () => {

            },
            'functionOnChangeFromServer' : (chatData) => {
                    var chatId           = chatData.id;
                    var chatKey          = 'info'; //chatData.id;
                    var chatDataValue    = chatData.data();
                    var chatObject      = {}; 
                      chatObject[chatKey] = chatDataValue.info;
                      var chatBlock     = chatDataValue.info;
                      var chatType      = chatDataValue.type;
                      var changeObject  = M_CATEGORY.getObjectForUpdateChatBlock ( chatObject );
                            changeObject['chatType'] = chatType;
                            changeObject['chatId']   = chatId;
                      // change chat
                      M_CATEGORY.safeUpdateChatBlock(changeObject,chatType);

            },
            'functionOnAdd' : (chatData) => {
                   var  chatId    = chatData.id,
                        chatBlock = chatData.data(),
                        chatType  = chatBlock.type;

                        console.log('safeAttachLiveLinkToChatElement functionOnAdd chatId,chatBlock',chatId,chatBlock);

                   //@< creating chat
                      if (chatType == 1) {
                          //create "private" chat
                          safeUpdatePrivateChatBlockFromUserDb( chatId, chatBlock.info, chatType , iNfunction); // changeObject
                      } else if (chatType == 2) {
                          //create "common" chat
                          safeUpdateCommonChatBlockFromUserDb ( chatId, chatBlock.info, chatType , iNfunction);
                      }
                  //@> creating chat
                  startNewMsgCounter(chatBlock,chatId,myUid);
            }
          }
       );
       
      // chatsRef.once ( 'value', (chatData) => {
      //   var chatId    = chatData.ref.parent.key,
      //       chatBlock = chatData.val(),
      //       chatType  = chatBlock.chat.type;
      //   //@< creating chat
      //     if (chatType == 1) {
      //         //create "private" chat
      //         safeUpdatePrivateChatBlockFromUserDb( chatId,chatBlock, chatType ,iNfunction); // changeObject
      //     } else if (chatType == 2) {
      //         //create "common" chat
      //         safeUpdateCommonChatBlockFromUserDb ( chatId, chatBlock, chatType ,iNfunction);
      //     }
      //   //@> creating chat

      //   startNewMsgCounter(chatId,myUid);
      // });
      // chatsRef.on ( 'child_changed' , function (chatData) {
      //     var chatId           = chatData.ref.parent.parent.key;
      //     var chatKey          = chatData.ref.key;
      //     var chatDataValue    = chatData.val();
      //     var chatObject      = {}; 
      //       chatObject[chatKey] = chatDataValue;
      //       var chatBlock     = chatData.val();
      //       var chatType      = chatBlock.type;
      //       var changeObject  = M_CATEGORY.getObjectForUpdateChatBlock ( chatObject );
      //             changeObject['chatType'] = chatType;
      //             changeObject['chatId']   = chatId;
      //       // change chat
      //       M_CATEGORY.safeUpdateChatBlock(changeObject,chatType);
      // });
  }

  function offAllLinkWithChatDbByChatId (iNchatId) {
  }

  function safeUpdateCommonChatBlockFromUserDb (iNchatId,iNobject,iNchatType) {
    /*
        @discr
          create common chat 
        @inputs
          iNdata
              @required
                  iNchatId
                  iNobject
                      chatId || uuid 
                      userName
                      lmsgText
                      lmsgTime
                    @optional
                        uuid
                        newMsgCount
                        chatType (default 1 private)
                  iNchatType
          @depends
            findChatBlock - for find chatId object
    */
    var changeObject = {};
    var changeObject = M_CATEGORY.getObjectForUpdateChatBlock ( iNobject );

    changeObject['chatType'] = iNchatType;
    changeObject['chatId']   = iNchatId;

    if ( typeof iNobject != 'object' )          iNobject = {};
    if ( typeof iNobject['chat'] != 'object' )  iNobject['chat'] = {};

    if ( typeof iNobject['chat']['icon'] == 'string' ) 
        changeObject['icon'] = iNobject['chat']['icon'] ;

    if ( typeof iNobject['chat']['name'] == 'string' ) 
        changeObject['chatName'] = iNobject['chat']['name'] ;
    
    M_CATEGORY.safeUpdateChatBlock(changeObject);
  }

  function safeUpdatePrivateChatBlockFromUserDb (iNchatId,iNobject,iNchatType,iNsuccessFunction) {
      /*
          @inputs
            iNdata
                @required
                    iNchatId
                    iNobject from chat firebase db
                        chatId || uuid 
                        userName
                        lmsgText
                        lmsgTime
                      @optional
                          uuid
                          newMsgCount
                          chatType (default 1 private)
                    iNchatType
            @depends
              findChatBlock - for find chatId object
      */

      var user2       = M_CATEGORY.userForPrivateChat(iNchatId);

      var usersRef    = firebase.database().ref('users/'+user2);


      usersRef.on('value', function(usersData) { 
          // change date if change userDate
          var objForCreate  = {};
          var user2id       = usersData.key;
          var user2Object   = usersData.val();

          var chatId = iNchatId; // M_CATEGORY.view.getChatIdByUid(user2id);

          var chatName    = user2Object.info.data.name;
          var login       = user2Object.info.data.login;
          var user2Phone  = user2Object.info.data.phone;
          var user2Icon   = user2Object.info.data.icon;
          var userType    = user2Object.info.data.type;
          var userOnline  = user2Object.info.live.online;

          var objForCreateChat = {}; // objForCreate;
              objForCreateChat['uuid']      = user2id,
              objForCreateChat['chatId']    = chatId,
              objForCreateChat['chatName']  = chatName,
              objForCreateChat['userPhone'] = user2Phone,
              objForCreateChat['icon']      = user2Icon,
              objForCreateChat['login']     = login;
              objForCreateChat['userType']  = userType;
              objForCreateChat['userOnline']  = userOnline;



          delete objForCreateChat.liveData;
          M_CATEGORY.safeUpdateChatBlock (objForCreateChat,iNchatType);
          activeContactChangeInChatBlock(user2Phone);

          // safe invoke once iNsuccessFunction just one
          if (typeof iNsuccessFunction == 'function') {
            iNsuccessFunction();
            iNsuccessFunction = false;
          }
      });
  }

  function activeContactChangeInChatBlock (user2Phone){
      var myUid       = firebase.auth().currentUser.uid;
      var contactsRef = firebase.database().ref('contacts/' + myUid + '/' + user2Phone);
      contactsRef.on('value', function(contactData) {
          var contactBlock    = contactData.val();
          if(contactBlock != null && typeof contactBlock == 'object') {
            var chatName        = contactBlock.name;
            var userPhone       = contactBlock.phone;
            var user2id         = contactBlock.uid;
            if( typeof chatName != 'string' || chatName.length > 0) return false;
          var chatId = M_CATEGORY.view.getChatIdByUid(user2id);
            M_CATEGORY.safeUpdateChatBlock(
                {
                    'uuid'      : user2id,
                    'chatId'    : chatId,
                    'chatName'  : chatName,
                    'userPhone' : userPhone
                },1//CHANGE IT
            );
        }
      });
  }


//@<CONTROLLER MY ONLINE STATUS

  CONST['myOnlineStatusSpy']    = 'connectTimeoutId-spyMyOnlineStatus';
  CONST['myOnlineStatusState']  = 'connectMyOnlineStatusState';

  function controller_devise_run () {
    devise_onDisconectController();
    // set mousemove event for control my online status
    $( "html" ).off('mousemove');
    $( "html" ).mousemove( function( event ) {
      onEvent_devise_MousemoveController();
    });
  } 
  

  function devise_setStateIOnline () {
    let myOnlineState = devise_getMyOnlineState();
    if(myOnlineState != 1) {
      devise_setStateOnline();
    }
  }
    
    function devise_setStateOffline () {
        // set online status
        let path      = devise_getPathToDeviseTable();
        if(path === false) return false;
        let ref       = FIREBASE.database().ref(path);
        let onffineState   = devise_getObjectForWriteToDbBySetState(0);
        ref.update(onffineState);
    }
      
      
    function devise_getMyOnlineState () {
        /*
            @discr
              get online(@return 1)/onffine(@return 0)
            @inputs
            @return
              @type enumint 
              1 - online
              0 - offline
       */
      return parseInt(M_APP.get(CONST['myOnlineStatusState']))||0;
    }

    function devise_setMyOnlineState (iNstate) {
        /*
            @discr
              set online(@return 1)/onffine(@return 0)
            @inputs
              iNstate -> int
                @type enumint 
                  1 - online
                  0 - offline
            @return
       */
      M_APP.save(CONST['myOnlineStatusState'], iNstate);
    }

    function devise_setStateOnline () {
        // set online status
        let path      = devise_getPathToDeviseTable();
        if(path === false) return false;
        let ref       = FIREBASE.database().ref(path);
        var onlineState   = devise_getObjectForWriteToDbBySetState(1);
        ref.update(onlineState);
    }
      function devise_getObjectForWriteToDbBySetState (iNval) {
        /*
            @discr
            @inputs
              iNvalue
       */
        const path          = devise_getPathToDeviseTable();
        if(path === false) return false;
        const onlineState   = iNval;
              // set online/offline state
              devise_setMyOnlineState(onlineState);
        const objectForAdd  = { 'online' : onlineState };
              // get user agent
              objectForAdd['uagent']  = ROUTING.getUserAgent();
              // get devise name
              objectForAdd['name']    = ROUTING.getDeviseName();
              objectForAdd['time'] = FIREBASE.database.ServerValue.TIMESTAMP;

              // if ( onlineState < 1) {
              //   //is offline flag

              // } else {
              //   //is online flag
              //   objectForAdd['timeout'] = FIREBASE.database.ServerValue.TIMESTAMP;
              // }

        var isDesktop =  ROUTING.isDesktop(); //#if desktop
        if( ROUTING.isDesktop() ) {
          // is desctop
          objectForAdd['type'] = 2;
        } else {
          // is browser
          objectForAdd['type'] = 1;
        }
        return objectForAdd;
      }

    function devise_getPathToDeviseTable () {
        let uid = USER.getMyId();
        let token     = USER.getMyToken();
        if(!uid || !token) return false;
        let path = "devises/" + uid + '/' + token;
        return path;
    }
    function devise_removeNoteFromDatabase () {
        /*
          @discr
            deleted note from firebase datebase for deleted from firestore by cloud functions
        */
        let path      = devise_getPathToDeviseTable();
        console.log('devise_removeNoteFromDatabase path',path);
        if(path === false) return false;
        FIREBASE.database().ref(path).remove();

    }
    // did global function
    M_APP.globalFunctions_create('devise_removeNoteFromDatabase',devise_removeNoteFromDatabase);
    _['devise_removeNoteFromDatabase'] = devise_removeNoteFromDatabase;

    function devise_onDisconectController () {
        let path      = devise_getPathToDeviseTable();
        if(path === false) return false;
        let ref           = FIREBASE.database().ref(path);
        var onlineState   = devise_getObjectForWriteToDbBySetState(1);
        var offlineState  = devise_getObjectForWriteToDbBySetState(0);
        ref.off();
        console.log('devise_onDisconectController path',path);
        ref.on(
          'value',
          (iNdata) => {
            var value = iNdata.val();
            console.log('devise_onDisconectController value, iNdata',iNdata);
            console.log('devise_onDisconectController value, path',value, path);
            //if deleted this -> we signout from this account
            if(value === null) {
            console.log('devise_onDisconectController NULL value, path',value, path);
              // return;
              USER.signOut(
                () => {
                  // we've signed out successfull -> we open page for sign in
                  M_APP.getGlobalVar('engine').passToApp({'app':'page','page':'fullWindow','data':'id=sign&uid=@system'});
                  // SWEETALERT.swal(
                  //   'Выход',
                  //   '?',
                  //   'question'
                  // );

                },
                () => {
                  // error
                  // SWEETALERT.swal();
                  
                }
              );
              return;
            }
            // if i am not in online and my othere devise change my state
            if(value.online != 1 && devise_getMyOnlineState() == 1) {
              // devise_setStateOnline ();
              ref.update(onlineState);
            }
            ref.onDisconnect().set(offlineState);
          }
        );
    }
  //
  //

  function onEvent_devise_MousemoveController () {
    // set my status online safe (with check it already isset)
    devise_setStateIOnline();
    // clear previous timeout id
    clearTimeout(getMyStatusTimeoutId());
    // save time out and passed there function
    let timeOutId = setTimeout(
      () => {
        devise_setStateOffline();
      },
      300000 // 5 m (300 sc) 300000 ms
    );
    // sace timeout id
    setMyStatusTimeoutId(timeOutId);
  }
    function getMyStatusTimeoutId () {
      return M_APP.get(CONST['myOnlineStatusSpy']);
    }
    function setMyStatusTimeoutId (iNtimeOutId) {
      M_APP.save(CONST['myOnlineStatusSpy'],iNtimeOutId);
    }

//@>CONTROLLER MY ONLINE STATUS

  return _;

});