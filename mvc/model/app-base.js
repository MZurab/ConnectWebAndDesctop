define( ['jquery','m_firebase','m_category','m_app','m_view', 'm_user','dictionary','v_app-base','m_user'] , function ($ , FIREBASE , M_CATEGORY , M_APP , M_VIEW,USER, DICTIONARY, VIEW , USER) {

  const _ = {}; _['name'] = 'base';
  const CONST = {};
  // init pages const
  const pages = {}; _['pages'] = pages; var thisPageName;
    //< page menu

        //< page index
          thisPageName = 'index';
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
                let i =  ( M_APP.view.d_checkPageInListApp({app:'base','page':thisPageName}) > 0 ) ? true : false; 
                console.log('app base page '+thisPageName,'isPage',i);
                return i;
              },
              'onView'  : function (d,d1) { 
                console.log('app-base page '+thisPageName,'onView',d,d1);
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
                console.log('app-base '+thisPageName,'onAppear');
                M_VIEW.closeLoader(); 
              },
              'onHide'  : function () {console.log('app-base '+thisPageName,'onHide'); return true;},
              // 'setPage' : function () {console.log('app private','setPage'); return true;},
              'onCreate' : function (d,d1) { 
                console.log('app-base page '+thisPageName,'onCreate',d,d1);
                M_APP.view.d_createPageInListApp({app:'base','page':thisPageName,'content': '<div class="scrolBlockForChat" style="" id="MixItUp81681F"></div>'}); 
              },
            };
          //>page index

          //< page one
            thisPageName = 'one';
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
                  console.log('app base page '+thisPageName,'isPage',i);
                  return i;
                },
                'onView'  : function (d,d1) { 
                  console.log('app-base page '+thisPageName,'onView',d,d1);
                  M_APP.view.d_hideApps('all','list');
                  M_APP.view.d_showApps('base','list');

                  var uid = d['uid'];
                  getUserInfo(uid);
                  return true;
                },
                'onAppear'  : function () {
                  console.log('app-base '+thisPageName,'onAppear');
                  M_VIEW.closeLoader(); 
                },
                'onHide'  : function () {console.log('app-base '+thisPageName,'onHide'); return true;},
                // 'setPage' : function () {console.log('app private','setPage'); return true;},
                'onCreate' : function (d,d1) { 
                  console.log('app-base page '+thisPageName,'onCreate',d,d1);
                  M_APP.view.d_createPageInListApp({app:'base','page':'index','content': '<div class="scrolBlockForChat" style="" id="MixItUp81681F"></div>'}); 
                },
              };
          //>page one



    //> page full window

  const options = {
    
  };

  // function onCreate
  function onCreate (iNstring,iNobject) {
    console.log('app-base','onCreate');
    M_APP.view.d_createListApp({app:'base'}); 
    d_addMyHeader();

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


  function onHide () {
    return true;
  }
  _['onHide'] = onHide;







  function d_addMyHeader () {
    VIEW.addUserHeaderInList({
      'icon' : USER.getMyIcon(),
      'name' : USER.getMyDisplayName(),
      'login': USER.getMyLogin(),
    },'change')
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
    console.log('start getMyChats');
    M_CATEGORY.view.startEffSortChats();
    var myUid       = M_APP.get('uid'),
        chatsRef = FIREBASE.database().ref('chats/'+chatId);
    chatsRef.once('value', function(chatData) {

    });
  }


  function pageOne_getUserInfo (iNuid) {
    const objectForAjax = {};
          objectForAjax['userId'] = USER.getMyId();
          objectForAjax['token']  = USER.getMyToken();
          objectForAjax['uid']    = iNuid;
    getUserInfo(objectForAjax,
      function (resultOfAjax) {

      }
    );
  }
    CONST['url_getUser']    = 'https://ramman.net/api/user';
    CONST['url_createChat'] = 'https://ramman.net/api/chat';



    /*< USER INFO */
      function getUserInfo (iNuid) {
        console.log('getUserInfo',iNuid);
        const objectForAjax = {};
              objectForAjax['userId']     = USER.getMyId();
              objectForAjax['token']      = USER.getMyToken();
              objectForAjax['uid']        = iNuid;
        getByGetRequest_userInfo(objectForAjax,
          function (resultOfAjax) {
            if(resultOfAjax['chat'] == false){
              // create chat
              console.log('getUserInfo chat isFalse',resultOfAjax['chat']);
              createChat(iNuid,resultOfAjax);
            }else{
              console.log('getUserInfo chat isTrue',resultOfAjax['chat']);
              viewThisChat(resultOfAjax['chat'],resultOfAjax);
            }
          }
        );
      }
        function getByGetRequest_userInfo (iNdata,iNfunction) {
          /*
            @example
              getUserInfo({'uid': '769b72df-6e67-465c-9334-b1a8bfb95a1a2' ,'userId': 'bac255e1-6a59-4181-bfb9-61139e38630e' , 'token' : '1bf92fd8-fe97-44bc-a223-9b7af3019392'},(result) => {console.log(result);})
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
            if(resultOfAjax['status']==1) {
              // create chat if it did not exist
              viewThisChat(resultOfAjax['chat'],iNuserData);
            }
          }
        );
      }
       
        function viewThisChat (iNchat,iNuserData) {
            const objForCreatChat = {};
            objForCreatChat['chatId']   = iNchat;
            objForCreatChat['userId']   = iNuserData['user']['uid'];
            objForCreatChat['chatName'] = iNuserData['user']['name'];
            objForCreatChat['icon_min'] = iNuserData['user']['icon'];

            M_CATEGORY.userForPrivateChat(objForCreatChat['chatId'],objForCreatChat['userId']);

            M_CATEGORY.view.safeAddChatList(objForCreatChat);
            // attach link with chat db
            attachLiveLinkToChatElement(iNchat);
            // hide all chat list
            M_CATEGORY.view.effHideChatLists();
            // show this chat list
            M_CATEGORY.view.effShowChatList(iNchat);
            // add category
            M_CATEGORY.view.addMenuByCategoryList (iNuserData,objForCreatChat['userId']);
            // dictionary
            DICTIONARY.start('.menuListForUsers');
        }
        function getByGetRequest_ChatDataBySafeCreate (iNdata,iNfunction) {
          /*
            @example
              getUserInfo({'uid': '769b72df-6e67-465c-9334-b1a8bfb95a1a2' ,'userId': 'bac255e1-6a59-4181-bfb9-61139e38630e' , 'token' : '1bf92fd8-fe97-44bc-a223-9b7af3019392'},(result) => {console.log(result);})
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
    console.log('start getMyChats');
    M_CATEGORY.view.startEffSortChats();
    var myUid       = M_APP.get('uid'),
    membersRef      = FIREBASE.database().ref('members/'+myUid);
    membersRef.on('child_added', function(memberData) { 
          var memberBlock   = memberData.val();
          var chatId    = memberData.key;
          var user2     = M_APP.getJsonKey(memberBlock);
          M_CATEGORY.userForPrivateChat(chatId,user2);
               
          attachLiveLinkToChatElement(chatId);
    });
  }
  _['getMyChats'] = getMyChats;


  function attachLiveLinkToChatElement (iNchatId) {
      // of all link with chat db
      offAllLinkWithChatDbByChatId(iNchatId);
      //check chat list for exist
      var  chatId   = iNchatId,
           chatsRef = FIREBASE.database().ref('chats/' + chatId + '/info');

      chatsRef.once ( 'value', function (chatData) {
            var chatId    = chatData.ref.parent.key,
                chatBlock = chatData.val(),
                chatType  = chatBlock.chat.type;
                console.log('attachLiveLinkToChatElement value chatBlock' , chatBlock);
                console.log('attachLiveLinkToChatElement value chatId'    , chatId);
                console.log('attachLiveLinkToChatElement value chatType'  , chatType);

            var   changeObject = M_CATEGORY.getObjectForUpdateChatBlock ( chatBlock );
                  changeObject['chatType']       = chatType;
                  changeObject['chatId']         = chatId;
                  changeObject['chatName']       = '';

                console.log('attachLiveLinkToChatElement value changeObject',changeObject);

            // create chat
              delete changeObject.liveData; // 
              M_CATEGORY.safeUpdateChatBlock(changeObject);
            //@< private chat
              if (chatType == 1) {
                    activeUserChangeInChatBlock(chatId,chatType);
              }
            //@>private chat
      });
      console.log('attachLiveLinkToChatElement FIREBASE ref child_changed','chats/'+chatId);
      chatsRef.on ( 'child_changed' , function (chatData) {
          console.log('attachLiveLinkToChatElement child_changed chatData',chatData);
          var chatId          = chatData.ref.parent.key;
          var chatKey         = chatData.ref.key;
          var chatDataValue    = chatData.val();
          console.log('attachLiveLinkToChatElement child_changed chatId',chatId);
          console.log('attachLiveLinkToChatElement child_changed chatKey',chatKey);
          console.log('attachLiveLinkToChatElement child_changed chatDataValue',chatDataValue);
          var chatObject      = {}; 
            chatObject[chatKey] = chatDataValue;
            var chatBlock     = chatData.val();
            var chatType      = chatBlock.type;
            var changeObject  = M_CATEGORY.getObjectForUpdateChatBlock ( chatObject );
                  console.log('attachLiveLinkToChatElement child_changed changeObject',changeObject);
                  changeObject['chatType'] = chatType;
                  changeObject['chatId']   = chatId;
            // change chat
            M_CATEGORY.safeUpdateChatBlock(changeObject,0);
      });
  }

  function offAllLinkWithChatDbByChatId (iNchatId) {
     // var chatsRef = FIREBASE.database().ref('chats/'+iNchatId);
     // chatsRef.off('value');
     // chatsRef.off('child_changed');

  }


  function activeUserChangeInChatBlock (chatId,iNchatType) {
      console.log('activeUserChangeInChatBlock chatId', chatId);
      var user2       = M_CATEGORY.userForPrivateChat(chatId);
      console.log('activeUserChangeInChatBlock ref','users/'+user2);
      var usersRef    = firebase.database().ref('users/'+user2);
      usersRef.on('value', function(usersData) { 
          // change date if change userDate
          var user2id     = usersData.key;
          console.log('activeUserChangeInChatBlock user2id',user2id);
          var user2Object = usersData.val();
          console.log('activeUserChangeInChatBlock user2Object',user2Object);
          var user2Phone  = user2Object.info.phone;
          console.log('activeUserChangeInChatBlock user2Phone',user2Phone);
          var user2Icon   = user2Object.info.icon;
          console.log('activeUserChangeInChatBlock user2Icon',user2Icon);

          var chatId = M_CATEGORY.view.getChatIdByUid(user2id);
          console.log('activeUserChangeInChatBlock chatId',chatId);
          M_CATEGORY.safeUpdateChatBlock (
              {
                  'uuid'      : user2id,
                  'chatId'    : chatId,
                  'chatName'  : user2Phone,
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
          if(contactBlock != null && typeof contactBlock == 'object') {
            console.log('activeContactChangeInChatBlock contactBlock',contactBlock,typeof contactBlock);
            if( typeof contactBlock != 'object' || contactBlock == null) return false;
            var chatName        = contactBlock.name;
            var user2id         = contactBlock.uid;
            console.log('activeContactChangeInChatBlock chatName',chatName);
            console.log('activeContactChangeInChatBlock user2id',user2id);
          var chatId = M_CATEGORY.view.getChatIdByUid(user2id);
            console.log('activeContactChangeInChatBlock chatId',chatId);
            M_CATEGORY.safeUpdateChatBlock(
                {
                    'uuid'      : user2id,
                    'chatId'    : chatId,
                    'chatName'  : chatName
                },1//CHANGE IT
            );
        }
      });
  }

  return _;

});