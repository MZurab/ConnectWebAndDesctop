define( 
  [
    'jquery','m_firebase','m_category','m_app','m_view', 'm_user','dictionary','v_app-base','m_routing', 'm_database', 'url', 'sweetalert2', 'localdb',
    'jquery.autocomplete'
  ] , 
  function ($ , FIREBASE , M_CATEGORY , M_APP , M_VIEW,USER, DICTIONARY, VIEW , ROUTING, M_DATABASE,URL,SWEETALERT, LOCALDB) {

  const _ = {};
  const CONST = {};
  


  // function checkFunction () {
  //   VIEW.menuPseudoUser_addItem (
  //     {
  //       'name'        : 'Тестовый пользователь',
  //       'icon'        : 'Тестовый пользователь',
  //       'ownerLogin'  : 'Тестовый пользователь',
  //     }
  //   );

  //   VIEW.menuPseudoUser_addItem (
  //     {
  //       'name'        : 'Тестовый пользователь',
  //       'icon'        : 'Тестовый пользователь',
  //       'ownerLogin'  : 'Тестовый пользователь',
  //     }
  //   );
  //   VIEW.menuPseudoUser_attachOnClickEventForShowMenu();
  // } _.checkFunction = checkFunction;


  //CHANGE move to view
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
  } _.initForAutocompleteForSearch = initForAutocompleteForSearch;


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
          'icon' : USER.getIconNonePhoto(),//URL.db.userNonePhoto,
          'name' : DICTIONARY.withString('[system-signIn]/[system-signUp]'),
        },
        'change'
      );

    }
  } _.addStandartHeaderForListView = addStandartHeaderForListView;


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
  } _.addHeaderWithBackBtnInListView = addHeaderWithBackBtnInListView;


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
      URL.db.api.page.get, 
      iNdata, 
      function (_) {
        iNfunction(_);
      },
      'json'
    );
  }

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
    }


    CONST['url_getUser']    = 'https://ramman.net/api/user';



    function chat_openChatWithCreateIfNotExist (iNobjectForCreateChat) {
      // body...
      var objForCreateChat = iNobjectForCreateChat;

      // created chat
      M_CATEGORY.view.createChatListIfNotExist(objForCreateChat);

      // set select effects for this chat
      M_CATEGORY.view.chat_setSelectOnlyThisChat(objForCreateChat['chatId'],1); 

      //resort this chat (up this to top)
      M_CATEGORY.view.chatPosition_annihilateForSort ();
      M_CATEGORY.view.chatPosition_setByChatIdForSort (objForCreateChat['chatId'],1); 
      // M_CATEGORY.view.startEffSortChats ();

      // show only this chat
      if(!iNobjectForCreateChat['filter']) M_CATEGORY.view.chat_showChatByChatId(objForCreateChat['chatId']);
      // add on click for this chat event
      M_CATEGORY.view.addOnClickActionForChatList ( objForCreateChat['chatId']);
    } _.chat_openChatWithCreateIfNotExist = chat_openChatWithCreateIfNotExist;


    /*< USER INFO */



      function request_getUserMenuByLogin (iNlogin, iNfunction) {

        M_VIEW.view.closeLoaderByTimeout(10000, '#menusBlock','forMenuListKey', 'indexCodeOfLoader' ); 

        const objectForAjax = {};
              objectForAjax['userId']     = USER.getMyId();
              objectForAjax['token']      = USER.getMyToken();
              objectForAjax['uid']        = iNlogin;
        getByGetRequest_userInfo(objectForAjax,
          (resultOfAjax) => {



            var icon          = URL.getUserIconByUid(resultOfAjax['user']['uid']),//'https://gstorage.ramman.net/users/'+resultOfAjax['user']['uid']+'/public/icons/1.jpg', //https://cdn.ramman.net/images/icons/apps/app_sharepay.png',
                userName      = resultOfAjax['user']['name'],
                userLogin     = resultOfAjax['user']['login'],
                userId        = resultOfAjax['user']['uid'],
                chatType      = 1; // private chat
            
            // add header with back btn for this list app
            addHeaderWithBackBtnInListView (icon,userName,userLogin);

           // if we does not signed
            var objForCreateChat = {};
              // get chatId if we has chat with this user
              objForCreateChat['chatId']      = resultOfAjax['chat']||userLogin; //because we dont have chat
              objForCreateChat['userId']      = userId;
              // objForCreateChat['userHasMenu'] = 1;
              objForCreateChat['login']       = userLogin;//resultOfAjax['user']['login'];
              objForCreateChat['icon']        = icon;//'https://cdn.ramman.net/images/icons/apps/app_sharepay.png';
              objForCreateChat['chatName']    = userName;//resultOfAjax['user']['name'];
              objForCreateChat['chatType']    = chatType;//resultOfAjax['user']['name'];

              // check for has menu
              if(typeof resultOfAjax['categories'] == 'object') {
                // if this user has categories we add userHasMenuFlag
                objForCreateChat['userHasMenu']    = 1;
              }

              // created chat
              M_CATEGORY.view.createChatListIfNotExist(objForCreateChat);

              // set select effects for this chat
              M_CATEGORY.view.chat_setSelectOnlyThisChat(objForCreateChat['userId'],1); 

              //resort this chat (up this to top)
              M_CATEGORY.view.chatPosition_annihilateForSort ();
              M_CATEGORY.view.chatPosition_setByUserIdForSort (objForCreateChat['userId'],1); 
              M_CATEGORY.view.startEffSortChats ();

              // show only this chat
              M_CATEGORY.view.chat_showChatByUserId(objForCreateChat['userId']);

              // add user menu  
              addServiceMenu (objForCreateChat,resultOfAjax);

              // show this chat menu
              M_CATEGORY.view.chat_showOnlyThisChatMenu(objForCreateChat['userId']);

              // M_VIEW.view.closeLoaderByTimeout(2500, '#menusBlock','forMenuListKey', 'indexCodeOfLoader' ); 


              if(typeof iNfunction == 'function') iNfunction();
          }
        );
      } _.request_getUserMenuByLogin = request_getUserMenuByLogin;

        function getByGetRequest_userInfo (iNdata,iNfunction) {
          /*
            @example
              request_getUserMenuByLogin({'uid': '769b72df-6e67-465c-9334-b1a8bfb95a1a2' ,'userId': 'bac255e1-6a59-4181-bfb9-61139e38630e' , 'token' : '1bf92fd8-fe97-44bc-a223-9b7af3019392'},(result) => {console.log(result);})
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

      CONST['url_createChat'] = URL.db.api.chat.create;// 'https://ramman.net/api/chat';
      function createPrivateChat (iNuid,/*iNuserData,*/ iNsuccessFunction, iNerrorFunction) {
        const objectForAjax = {};
              objectForAjax['uid']     = USER.getMyId();
              objectForAjax['token']   = USER.getMyToken();
              objectForAjax['userUrl'] = iNuid;
        getByGetRequest_ChatDataBySafeCreate(objectForAjax,
          (resultOfAjax) => {
            if (typeof resultOfAjax == 'object' && resultOfAjax['status'] == 1 ) {
              // SUCCESS we  created chat
              if(typeof iNsuccessFunction == 'function') iNsuccessFunction(resultOfAjax);
            } else {
              // ERROR we cannpt create chats
              if(typeof iNerrorFunction == 'function') iNerrorFunction(resultOfAjax);
            }
          }
        );
      }

        function getByGetRequest_ChatDataBySafeCreate (iNdata,iNfunction) {
          /*
            @example
              request_getUserMenuByLogin({'uid': '769b72df-6e67-465c-9334-b1a8bfb95a1a2' ,'userId': 'bac255e1-6a59-4181-bfb9-61139e38630e' , 'token' : '1bf92fd8-fe97-44bc-a223-9b7af3019392'},(result) => {console.log(result);})
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

       
        // function viewThisChatFromFDB (iNchat,iNuserData) {
        //     //LATER DEL
        //     const objForCreatChat = {};
        //     objForCreatChat['chatId']   = iNchat || ('noneChat_'+iNuserData['user']['uid']);
        //     objForCreatChat['userId']   = iNuserData['user']['uid'];
        //     objForCreatChat['userLogin']   = iNuserData['user']['login'];
        //     objForCreatChat['chatName'] = iNuserData['user']['name'];
        //     objForCreatChat['icon_min'] = iNuserData['user']['icon'];
        //     // if(iNchat) {
        //       M_CATEGORY.userForPrivateChat(objForCreatChat['chatId'],objForCreatChat['userId']);

        //       // M_CATEGORY.view.safeAddChatList(objForCreatChat);
        //       // attach link with chat db
        //       safeAttachLiveLinkToChatElement(
        //         objForCreatChat['chatId'], 
        //         () => {
        //           // add service category
        //           addServiceMenu (objForCreatChat,iNuserData);

        //         }
        //       );
        //     // hide all chat list
        //     M_CATEGORY.view.effHideChatLists();
        //     // show this chat list
        //     M_CATEGORY.view.effShowChatList(objForCreatChat['chatId']);
        // }




          function addServiceMenu ( objForCreatChat, iNuserData ) {
              M_VIEW.view.closeLoaderByTimeout(2500, '#menusBlock','forMenuListKey', 'indexCodeOfLoader' ); 
            // add chat if we has chat
            var chatId = M_CATEGORY.view.getChatIdByUid(objForCreatChat['userId']) || objForCreatChat['chatId'];//  objForCreatChat['chatId']||VIEW.getRealChatIdByUid(objForCreatChat['userId']);


            if ( chatId && objForCreatChat['userId'] != chatId) {
              // we has chatId
              M_CATEGORY.addChatBlockToCategory (iNuserData,chatId,objForCreatChat['userId']);

            } else {

              // we has not chatId -> we disable chat btn link
              M_CATEGORY.addDisabledChatBlockToCategory (iNuserData,objForCreatChat['userId'],objForCreatChat['login']);

            }

            // add menu to user chat (creating menu in dom)
            M_CATEGORY.view.addMenuByCategoryList ( iNuserData, objForCreatChat['userId'] );
            
            // attach onclick to 'chat' menu for create chat if it need
            M_CATEGORY.view.onClickCategoryForCreateChat (
              (userId, userLogin) => {
                // SUCCESS -> will do requiest for create chat
                // show loader
                M_APP.view.showLoader
                createPrivateChat (
                  userId,
                  ( iNchatObject ) => {
                    console.log ( 'request_getUserMenuByLogin userLogin', userLogin );
                    // we created chat -> we update menu && we open chat

                    M_CATEGORY.view.removeChatListByUserId(
                      userId,
                      () => {
                        // get menu -> show menu
                        request_getUserMenuByLogin ( userLogin , 
                          () => {
                            // open chat after reload menu
                            var chatLinkSelector = M_CATEGORY.view.getPathToChatByUserId(userId);
                            // trigger click for chat btn for view chat
                            $(chatLinkSelector + ' .privateChatBtn').trigger('click');
                          }
                        );
                      }
                    );



                    //


                  }  , 
                  () => {
                    // we CANNOT created chat

                  }
                )
                console.log('category success');

              },
              (userId, userLogin) => {
                // ERROR
                console.log('category error');

              }
            );

            // translated all menu dictionary
            DICTIONARY.start('.menuListForUsers');

            //close loader
            M_VIEW.view.closeLoader ('#menusBlock','forMenuListKey', 'indexCodeOfLoader' ); 

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


  function getAllMyChats () {
    // start effects for chats
    M_CATEGORY.view.startEffSortChats();

    // get my chats
    var myUid       = M_APP.get('uid');
    getChatsByUserId(myUid);

    // get chat for pseudouser
    getPseudoUsersByUserId(myUid);

  }_.getAllMyChats = getAllMyChats;


  function getPseudoUsersByUserId (iNuserId) {
    // body...
    console.log('getPseudoUsersByUserId - INVOKE2',iNuserId);
    var uid = iNuserId;
    // get data from DB
    M_DATABASE.getRealtimeDataFromFirestoreDb (
          'users',
          uid + '/subusers',
          {
            'functionOnOther' : () => {

            },
            
            'functionOnChangeFromServer' : (memberData) => {
            
            },
            'functionOnAdd' : (pseudoUserData) => {
              var pseudoUserBlock   = pseudoUserData.data(),
                  pseudoUserid      = pseudoUserData.id,
                  refStatus         = pseudoUserBlock.status,
                  ref               = pseudoUserBlock.ref;

              // if menu no exist
              if ( !VIEW.menuPseudoUser_getCountMenu() ) {
                  // active on click for view menu
                  VIEW.menuPseudoUser_addFlagToAttachOnClickEventForShowMenu();
                  // create container if not exist
                  VIEW.menuPseudoUser_safeAddBox();
                  // attach onclick event 
                  VIEW.menuPseudoUser_attachOnClickEventForShowMenu();
                  // add my user to menu
                  VIEW.menuPseudoUser_addItem(
                    {
                      'uid'     : USER.getMyId(),
                      'icon'    : URL.getUserIconByUid( USER.getMyId() ),
                      'login'   : USER.getMyLogin(),
                      'name'    : USER.getMyDisplayName()
                    }
                  );
              }

              //get pseudo user 
              ref.get().then(
                (userData) => {
                  // get user data from db
                  var userBlock       = userData.data(),
                      objForAddToMenu = {};

                  // get user id from db
                  objForAddToMenu['uid']    = userData.id;
                  objForAddToMenu['owner']  = userBlock.owner;
                  objForAddToMenu['login']  = userBlock.info.data.login;
                  objForAddToMenu['icon']   = URL.getUserIconByUid(objForAddToMenu['uid']);
                  objForAddToMenu['name']   = userBlock.info.data.name;

                  // delete owner if this user owner is system
                  if ( objForAddToMenu['owner'] == LOCALDB.db.val.systemUser ) delete objForAddToMenu['owner'];

                  // add menu
                  VIEW.menuPseudoUser_addItem(objForAddToMenu );

                  // get chats for pseudouserid   
                  getChatsByUserId(objForAddToMenu['uid']);

                }
              );
            }
          }
    );
  } _.getPseudoUsersByUserId = getPseudoUsersByUserId;

  function getChatsByUserId (iNuserId) {
    /*
        ovbserver for user chats list
        @depends
            domSortChatsBlock() - for create sort or check
    */

    console.log('getChatsByUserId - INVOKE',iNuserId);

    // get my user id
    var thisUserId       = iNuserId;//M_APP.get('uid');

    // get data from DB
    M_DATABASE.getRealtimeDataFromFirestoreDb (
          'users',
          thisUserId + '/members',
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
              var user2         = memberBlock['with'];
              M_CATEGORY.userForPrivateChat(chatId,user2);
                   
              safeAttachLiveLinkToChatElement(
                chatId,
                thisUserId
              );
            }
          }
    );
  }
  _['getChatsByUserId'] = getChatsByUserId;




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
  }


  function offAllLinkWithChatDbByChatId () {
    // body...
  }

  function safeAttachLiveLinkToChatElement (iNchatId,iNtoUserId,iNfunction) {
      /*
        @inputs
          iNchatId -> string
          iNuserId -> string
          iNfunction -> function
      */
       console.log('safeAttachLiveLinkToChatElement - INVOKE',iNchatId,iNtoUserId)
      // of all link with chat db
      offAllLinkWithChatDbByChatId(iNchatId);
      //check chat list for exist
      var  chatId           = iNchatId,
           myUid            = USER.getMyId(),
           toUserId         = iNtoUserId;

       console.log('safeAttachLiveLinkToChatElement - toUserId',iNchatId,toUserId)
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

                        chatBlock['info']['toUserId'] = toUserId;

                    console.log('safeAttachLiveLinkToChatElement functionOnAdd - toUserId',toUserId);
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
          /*
            @inputs
              @required

          */
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
          var owner  = user2Object.owner||'@system';

          console.log('safeUpdatePrivateChatBlockFromUserDb  functWhenGet - iNobject',iNobject);
          var toUserId    = iNobject.toUserId;

          
          // create object for create chat
          var objForCreateChat = {}; // objForCreate;
              objForCreateChat['uuid']      = user2id,
              objForCreateChat['chatId']    = chatId,
              objForCreateChat['chatName']  = chatName,
              objForCreateChat['userPhone'] = user2Phone,
              objForCreateChat['icon']      = user2Icon,
              objForCreateChat['login']     = login;
              // user type (business (2) or user(1) or app of system (3) )
              objForCreateChat['userType']    = userType;
              objForCreateChat['userOnline']  = userOnline;
              
              objForCreateChat['owner']  = owner;
              objForCreateChat['toUserId']    = toUserId;

          // add user options
          if(typeof user2Object.info.options == 'object') {
            // check has menu
            var userHasMenu = checkUserForHasMenuForMe(user2Object.info.options);
            if(userHasMenu) {
              // add
              objForCreateChat['userHasMenu'] = 1;
            }
          } else {
            user2Object.info.options = {};
          }
          // add app for filter by side buttons
          if (typeof user2Object.info.options.apps == 'object') {
            // add user apps for filter
            objForCreateChat['appsForFilter'] = user2Object.info.options.apps.join(' ');
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
  } _.controller_devise_run = controller_devise_run;
  

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