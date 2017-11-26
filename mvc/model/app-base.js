define( 
  [
    'jquery','m_firebase','m_category','m_app','m_view', 'm_user','dictionary','v_app-base','m_routing', 'm_database', 'sweetalert2',
    'jquery.autocomplete'
  ] , 
  function ($ , FIREBASE , M_CATEGORY , M_APP , M_VIEW,USER, DICTIONARY, VIEW , ROUTING, M_DATABASE,SWEETALERT) {

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
              'onView'  : function (iNojbectData,iNojbectApp) { 
                  console.log('onView index iNojbectData,iNojbectApp',iNojbectData,iNojbectApp);
                if(iNojbectData['back']) {
                  // add header with back btn for this list app
                  // addHeaderWithBackBtnInListView();
                } else {
                  // clear user menus if we come from 'one' page by click btn
                  $('.usersBlockContainerInMenusBlock .app[app-name="base"] .view[view-name="index"] .scrolBlockForChat').html('');
                  // add standart header for this list app
                  addStandartHeaderForListView();
                  if ( USER.getMyId() ) {
                    getMyChats();
                  }
                }

                // hide all app in list
                M_APP.view.d_hideApps('all','list');

                // show this app in list
                M_APP.view.d_showApps('base','list');


                // getMyChats();

                // get chat if we auth user
                

                return true;
              },
              'onHide'  : function () { 
                  console.log('onHide index');
                  return true;
               },
              'onAppear'  : function () {
                  console.log('onAppear index');
                  M_VIEW.view.closeLoader(); 


                  M_VIEW.view.showLoader('#menusBlock','forMenuListKey', 'indexCodeOfLoader' ); 
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
                  // addHeaderWithBackBtnInListView();

                  //clear other chats
                  $('.mix.usersBlockInMenusBlock').remove();
                  

                  createChatByGetUrlUserInfo(d['uid']);
                  return true;
                },
                'onAppear'  : function () {
                    console.log('onAppear one');
                    M_VIEW.view.closeLoader(); 
                    M_VIEW.view.showLoader('#menusBlock','forMenuListKey', 'indexCodeOfLoader' ); 
                },
                'onDisappear'  : function () {
                    console.log('onDisappear one');
                },
                'onHide'  : function () { 
                  console.log('onHide one');

                  

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

    // init search input autocomplete
    initForAutocompleteForSearch();

    // get chat if we auth user
    if ( USER.getMyId() ) {
      // getMyChats();
    }

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






  function initForAutocompleteForSearch () {
    var index = M_DATABASE.algolia.initIndex('connect-search');
    $('.searchInputInSearchBlock').autocomplete({ hint: false }, [
      {
        source: $.fn.autocomplete.sources.hits(index, { hitsPerPage: 25 }),
        displayKey: 'name',
        templates: {
          suggestion: function(suggestion) {
            var type  = DICTIONARY.withString ('[dictionary-' + suggestion._highlightResult.type.value + ']');
            return `
              <div class="autocompleteIconBlock">
                 <img src="https://cdn.ramman.net/images/icons/apps/app_onepay.png">
              </div>
              <div class="autocompleteTextBlock">
                 <div class="autocompleteOptionName">${suggestion._highlightResult.name.value}</div>
                 <div class="autocompleteOptionType">${type}</div>
              </div>
              <div class="autocompleteLoginBlock">${suggestion._highlightResult.login.value}</div>
            `;
          }
        }
      }
    ]).on('autocomplete:selected', function(event, suggestion, dataset) {
      console.log(suggestion, dataset);
    });
  }


  function addStandartHeaderForListView () {
    if ( USER.getMyId() ) {
      VIEW.addUserHeaderInList ( {
        'icon' : USER.getMyIcon(),
        'name' : USER.getMyDisplayName(),
        'login': USER.getMyLogin(),
      },'change');
    } else {
      // add header for non auth user
      VIEW.addUserHeaderInList ( 
        {
          'icon' : 'https://cdn.ramman.net/web/res/images/icons/user/noPhoto.png',
          'name' : DICTIONARY.withString('[system-signIn]/[system-signUp]'),
        },
        'change'
      );

    }
  }

  function addHeaderWithBackBtnInListView (iNicon,iNname,iNlogin) {
    VIEW.addUserHeaderInList({
      'icon'  : iNicon,//USER.getMyIcon()
      'name'  : iNname,//USER.getMyDisplayName()
      'login' : iNlogin,//USER.getMyLogin()
      'back'  : true,
    },'change');

    // attach for back btn this func by click for  open index page 
    $('.appBase_backButton').click(
      function(){
        M_APP.getGlobalVar('engine').passToApp({'app':'base','page':'index','data':'back=1'});
      }
    );
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

        M_VIEW.view.closeLoaderByTimeout(5000, '#menusBlock','forMenuListKey', 'indexCodeOfLoader' ); 
        const objectForAjax = {};
              objectForAjax['userId']     = USER.getMyId();
              objectForAjax['token']      = USER.getMyToken();
              objectForAjax['uid']        = iNlogin;
        getByGetRequest_userInfo(objectForAjax,
          function (resultOfAjax) {

            M_VIEW.view.closeLoaderByTimeout(2500, '#menusBlock','forMenuListKey', 'indexCodeOfLoader' ); 


            var icon        = 'https://cdn.ramman.net/images/icons/apps/app_sharepay.png';
            var userName    = resultOfAjax['user']['name'];
            var userLogin    = resultOfAjax['user']['login'];
            
            // add header with back btn for this list app
            addHeaderWithBackBtnInListView(icon,userName,userLogin);

            if (resultOfAjax['chat'] == false ) {
              if ( USER.getMyLogin() ) {
                // if we signed -> create chat
                createPrivateChat( iNlogin , resultOfAjax );

              } else {
                // if we does not signed
                var objForCreateChat = {};
                  objForCreateChat['chatId']      = resultOfAjax['user']['login']; //because we dont have chat
                  objForCreateChat['userId']      = resultOfAjax['user']['uid'];
                  objForCreateChat['login']       = userLogin;//resultOfAjax['user']['login'];
                  objForCreateChat['icon']        = icon;//'https://cdn.ramman.net/images/icons/apps/app_sharepay.png';
                  objForCreateChat['chatName']    = userName;//resultOfAjax['user']['name'];
                  console.log('createChatByGetUrlUserInfo objForCreateChat',objForCreateChat);

                  // created chat
                  M_CATEGORY.view.createChatList(objForCreateChat);

                  // add user menu  
                  addServiceMenu (objForCreateChat,resultOfAjax);
              }
            } else {
              // create chat static
              console.log('createChatByGetUrlUserInfo viewThisChatFromFDB');
              M_VIEW.view.closeLoaderByTimeout(2500, '#menusBlock','forMenuListKey', 'indexCodeOfLoader' ); 
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
      function createPrivateChat (iNuid,iNuserData) {
        const objectForAjax = {};
              objectForAjax['uid']     = USER.getMyId();
              objectForAjax['token']   = USER.getMyToken();
              objectForAjax['userUrl'] = iNuid;
        getByGetRequest_ChatDataBySafeCreate(objectForAjax,
          function (resultOfAjax) {
            if(typeof resultOfAjax == 'object' && resultOfAjax['status'] == 1 ) {
              //SUCCESS we  created chat
              // create chat if it did not exist
              viewThisChatFromFDB(resultOfAjax['chat'],iNuserData);
            }else {
              //ERROR we cannpt create chats

            }
          }
        );
      }
       
        function viewThisChatFromFDB (iNchat,iNuserData) {
            console.log('viewThisChatFromFDB iNchat,iNuserData',iNchat,iNuserData);
            const objForCreatChat = {};
            objForCreatChat['chatId']   = iNchat || ('noneChat_'+iNuserData['user']['uid']);
            objForCreatChat['userId']   = iNuserData['user']['uid'];
            objForCreatChat['chatName'] = iNuserData['user']['name'];
            objForCreatChat['icon_min'] = iNuserData['user']['icon'];
            // if(iNchat) {
              console.log('viewThisChatFromFDB objForCreatChat',objForCreatChat);
              M_CATEGORY.userForPrivateChat(objForCreatChat['chatId'],objForCreatChat['userId']);

              // M_CATEGORY.view.safeAddChatList(objForCreatChat);
              // attach link with chat db
              safeAttachLiveLinkToChatElement(objForCreatChat['chatId'], 
                () => {
                  console.log('safeAttachLiveLinkToChatElement callbackobjForCreatChat - objForCreatChat , iNuserData',objForCreatChat , iNuserData);
                  // add service category
                  addServiceMenu (objForCreatChat,iNuserData);

                }
              );
            // hide all chat list
            M_CATEGORY.view.effHideChatLists();
            // show this chat list
            M_CATEGORY.view.effShowChatList(objForCreatChat['chatId']);
        }
          function addServiceMenu ( objForCreatChat, iNuserData ) {
              M_VIEW.view.closeLoaderByTimeout(2500, '#menusBlock','forMenuListKey', 'indexCodeOfLoader' ); 
            // add chat if we has chat
            var chatId = VIEW.getRealChatIdByUid(objForCreatChat['userId']);
            if ( chatId ) {
              // we has chatId
              M_CATEGORY.addChatBlockToCategory (iNuserData,chatId,objForCreatChat['userId']);

            } else {
              // we has not chatId -> we disable chat btn link
              M_CATEGORY.addDisabledChatBlockToCategory (iNuserData,objForCreatChat['userId']);

            }

            // add menu to user chat
            M_CATEGORY.view.addMenuByCategoryList ( iNuserData, objForCreatChat['userId'] );
            // translated all menu dictionary
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
            var type = 'createPrivateChat';
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
              //cloase loader after 2.5 second
              M_VIEW.view.closeLoaderByTimeout(2500, '#menusBlock','forMenuListKey', 'indexCodeOfLoader' ); 

              var memberBlock   = memberData.data();
              var chatId        = memberData.id;
              console.log('M_DATABASE.getRealtimeDataFromFirestoreDb chatId, memberBlock',chatId, memberBlock);
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

    let number = 
(typeof iNdata == 'object') ? ( (typeof iNdata['member'] == 'object') ? ( (typeof iNdata['member'][iNmyUid] == 'object' ) ? iNdata['member'][iNmyUid]['newMsg']||0 : 0) : 0  ) : 0;
    ////// let number =  iNdata['member'][iNmyUid]['newMsg']||0;
    
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
                    console.log('safeAttachLiveLinkToChatElement functionOnChangeFromServer - chatId, chatDataValue',chatId, chatDataValue);
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
                    //cloase loader after 2.5 second
                    M_VIEW.view.closeLoaderByTimeout(2500, '#menusBlock','forMenuListKey', 'indexCodeOfLoader' ); 

                   var  chatId    = chatData.id,
                        chatBlock = chatData.data(),
                        chatType  = chatBlock.type;

                    console.log('safeAttachLiveLinkToChatElement functionOnAdd - chatId, chatBlock',chatId, chatBlock);

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
  function checkUserForHasMenuForMe (iNoptions) {
    /*
      @discr
        check user for has menu
      @inputs
        @optional
          iNoptions -> object
            @enum
              hasMenuForAuth -> number
              hasMenuForNoneAuth -> number
              hasMenuForAll -> number
    */
    console.log('checkUserForHasMenuForMe - iNoptions',iNoptions);
    if(typeof iNoptions == 'object') {
      // check menu for all
      if( typeof iNoptions.hasMenuForAll == 'number' && iNoptions.hasMenuForAll > 0) {
        return true;
      } else {
        // check menu for authUser (@) or nonAuth (-) or anonym (?)
        if( USER.getMyId() ) {
          // if we authed user
          if( typeof iNoptions.hasMenuForAuth == 'number' && iNoptions.hasMenuForAuth > 0) return true;
        } else {
          // if we non authed user
          if( typeof iNoptions.hasMenuForNoneAuth == 'number' && iNoptions.hasMenuForNoneAuth > 0) return true;

        }

      }
    }
    return false;
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

      var usersRef    = firebase.database().ref( 'users/' + user2 );

      console.log('safeUpdatePrivateChatBlockFromUserDb - user2', user2);
      console.log('safeUpdatePrivateChatBlockFromUserDb - path', 'users/'+user2);
      console.log('safeUpdatePrivateChatBlockFromUserDb - iNchatId,iNobject,iNchatType',iNchatId,iNobject,iNchatType);

      function functWhenGet (usersData) {
          var objForCreate  = {};
          var user2id       = usersData.id;
          var user2Object   = usersData.data();

          var chatId = iNchatId; // M_CATEGORY.view.getChatIdByUid(user2id);

          var chatName    = user2Object.info.data.name;
          var login       = user2Object.info.data.login;
          var user2Phone  = user2Object.info.data.phone;
          var user2Icon   = user2Object.info.data.icon;
          var userType    = user2Object.info.data.type;
          var userOnline  = user2Object.info.live.online;

          
          // create object for create chat
          var objForCreateChat = {}; // objForCreate;
              objForCreateChat['uuid']      = user2id,
              objForCreateChat['chatId']    = chatId,
              objForCreateChat['chatName']  = chatName,
              objForCreateChat['userPhone'] = user2Phone,
              objForCreateChat['icon']      = user2Icon,
              objForCreateChat['login']     = login;
              // user type (business (2) or user(1) or app of system (3) )
              objForCreateChat['userType']  = userType;
              objForCreateChat['userOnline']  = userOnline;

          // add user options
          if(typeof user2Object.info.options == 'object') {
            // check has menu
            var userHasMenu = checkUserForHasMenuForMe(user2Object.info.options);
            console.log('safeUpdatePrivateChatBlockFromUserDb userHasMenu',userHasMenu);
            if(userHasMenu) {
              // add
              objForCreateChat['userHasMenu'] = 1;
            }
          }

          console.log('safeUpdatePrivateChatBlockFromUserDb objForCreateChat',objForCreateChat);
          delete objForCreateChat.liveData;
          M_CATEGORY.safeUpdateChatBlock (objForCreateChat,iNchatType);
          //getContatct 
          activeContactChangeInChatBlock(user2Phone);

          // safe invoke once iNsuccessFunction just one
          if (typeof iNsuccessFunction == 'function') {
            iNsuccessFunction();
            iNsuccessFunction = false;
          }
      }

      M_DATABASE.getRealtimeDataFromFirestoreDb (
            'users',
            user2,
            {
              'functionOnOther' : () => {

              },
              
              'functionOnChangeFromServer' : (dataFromDb) => {
                functWhenGet (dataFromDb);
              
              },
              
              'functionOnAdd' : (dataFromDb) => {
                functWhenGet (dataFromDb);
              }
            }
      );

      // usersRef.on('value', function(usersData) { 
          // change date if change userDate 
          // var objForCreate  = {};
          // var user2id       = usersData.key;
          // var user2Object   = usersData.val();

          // var chatId = iNchatId; // M_CATEGORY.view.getChatIdByUid(user2id);

          // var chatName    = user2Object.info.data.name;
          // var login       = user2Object.info.data.login;
          // var user2Phone  = user2Object.info.data.phone;
          // var user2Icon   = user2Object.info.data.icon;
          // var userType    = user2Object.info.data.type;
          // var userOnline  = user2Object.info.live.online;

          // var objForCreateChat = {}; // objForCreate;
          //     objForCreateChat['uuid']      = user2id,
          //     objForCreateChat['chatId']    = chatId,
          //     objForCreateChat['chatName']  = chatName,
          //     objForCreateChat['userPhone'] = user2Phone,
          //     objForCreateChat['icon']      = user2Icon,
          //     objForCreateChat['login']     = login;
          //     objForCreateChat['userType']  = userType;
          //     objForCreateChat['userOnline']  = userOnline;



          // delete objForCreateChat.liveData;
          // M_CATEGORY.safeUpdateChatBlock (objForCreateChat,iNchatType);
          // activeContactChangeInChatBlock(user2Phone);

          // // safe invoke once iNsuccessFunction just one
          // if (typeof iNsuccessFunction == 'function') {
          //   iNsuccessFunction();
          //   iNsuccessFunction = false;
          // }
      // });
  }

  function activeContactChangeInChatBlock (user2Phone){
      var myUid       = firebase.auth().currentUser.uid;
    // var contactsRef = firebase.database().ref('contacts/' + myUid + '/' + user2Phone);

      var functWhenGet = function function_name(argument) {
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
      }
      // get contact by phone
      M_DATABASE.getRealtimeDataFromFirestoreDb (
            'users' , myUid  + '/contacts'  ,
            {
              'whereEquilTo' : {
                'phone' : user2Phone
              },
              'functionOnOther' : () => {

              },
              
              'functionOnChangeFromServer' : (dataFromDb) => {
                functWhenGet (dataFromDb);
              
              },
              
              'functionOnAdd' : (dataFromDb) => {
                functWhenGet (dataFromDb);
              }
            }
      );

      // contactsRef.on('value', function(contactData) {
          
      // });
  }


//@<CONTROLLER MY ONLINE STATUS

  CONST['myOnlineStatusSpy']    = 'connectTimeoutId-spyMyOnlineStatus';
  CONST['myOnlineStatusState']  = 'connectMyOnlineStatusState';

  function controller_devise_run () {
    console.log('controller_devise_run run USER.getMyId()',USER.getMyId() );
    if ( USER.getMyId() ) {

      devise_onDisconectController();
      // set mousemove event for control my online status
      $( "html" ).off('mousemove');
      $( "html" ).mousemove( function( event ) {
        onEvent_devise_MousemoveController();
      });
    }
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

    function devise_setStateOnline (iNsuccessFunction) {
        // set online status
        let path      = devise_getPathToDeviseTable();
        if(path === false) return false;
        let ref       = FIREBASE.database().ref(path);
        var onlineState   = devise_getObjectForWriteToDbBySetState(1);
        ref.update(onlineState).then(function(dataSnapshot) {
          if(typeof iNsuccessFunction == 'function') iNsuccessFunction();
        });
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
        FIREBASE.database().ref(path).remove().then(function() {
          console.log("devise_removeNoteFromDatabase Remove succeeded.")
        })
        .catch(function(error) {
          console.log("devise_removeNoteFromDatabase Remove failed: " + error.message)
        });;

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
        // update online state then begin spy for disconect 
        devise_setStateOnline (
          () => {
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
        )


        // ref.once('value')
        // .then(function(dataSnapshot) {
        //   // handle read data.
        //     console.log('devise_onDisconectController once dataSnapshot.val()',dataSnapshot.val());
            
        // });


        
    }
  //
  //

  function onEvent_devise_MousemoveController () {
    // set my status online safe (with check it already isset) DISABLE
    // devise_setStateIOnline();

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