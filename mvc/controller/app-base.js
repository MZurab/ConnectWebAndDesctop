define ( 
  [
    'm_app-base' , 'v_app-base', 'm_app', 'm_view', 'm_user', 'm_category'
  ] , 
  function (MODEL, VIEW,  M_APP , M_VIEW, USER, M_CATEGORY ) {

  const _ = {}; _['name'] = 'base';
  const CONST = {};
  // init pages const
  const pages = {}; _['pages'] = pages;
    //< page menu

        //< page index
          var thisPageName      = 'index';
          pages[thisPageName]   = {'attr':{},'menus':{},'functions':{}};
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
              // 'onCreate': function (iNojbectData,iNojbectApp) {
              //   console.log('page index onCreate -iNojbectData,iNojbectApp',iNojbectData,iNojbectApp)

              //   // show loader
              //   M_VIEW.view.showLoader('#menusBlock','forMenuListKey', 'indexCodeOfLoader' ); 

              //   // get chat list
              //   if ( USER.getMyId() ) {
              //     MODEL.getAllMyChats();
              //   }
              // },
              'onView'  : function (iNojbectData,iNojbectApp) { 
                console.log('onView index iNojbectData,iNojbectApp',iNojbectData,iNojbectApp);

                

                // close loader from first html page
                M_VIEW.view.closeLoader(); 

                if(iNojbectData['back']) {
                  // add header with back btn for this list app - if we from page 'one'

                  // hide all menus 
                  M_CATEGORY.view.chat_offSelectEffects();

                } else {
                  // clear user menus if we come from 'one' page by click btn
                  // $('.usersBlockContainerInMenusBlock .app[app-name="base"] .view[view-name="index"] .scrolBlockForChat').html('');
                  
                  // view loader
                  // M_VIEW.view.showLoader('#menusBlock','forMenuListKey', 'indexCodeOfLoader' ); 
                }

                if ( iNojbectData['forUserId'] ) {
                  // set header chose user
                  VIEW.menuPseudoUser_switchUserInHeaderByUid(iNojbectData['forUserId']);
                  // hide pseudo menu
                  VIEW.menuPseudoUser_hideMenu();
                  // if we choose user we set for older filter
                  USER.setActiveUserId(iNojbectData['forUserId']);
                }


                if ( iNojbectData['filter'] ) {
                  // add userId
                  if ( USER.getMyId() ){
                    // if we is auth user 
                    iNojbectData['toUserId']  = USER.getMyId();
                    iNojbectData['owner']     = '@system';
                  }

                  // if clicked side buttons - setGlobalSetFilterForGetChats
                  M_APP.view.sideButtons_addSelectedEffectsByFilter(iNojbectData['filter']);

                  // set global filter for sort
                  M_CATEGORY.view.chat_setGlobalFilter(iNojbectData['filter']);

                  //create service chat list and move position to top
                  MODEL.chat_openChatWithCreateIfNotExist(iNojbectData);
                }


                // sort all chats
                M_CATEGORY.view.startEffSortChats();

                // add standart header for this list app
                MODEL.addStandartHeaderForListView();

                // hide user of menus (we open in page 'one')
                M_CATEGORY.view.chat_hideUserMenus();

                // hide all app in list
                M_APP.view.d_hideApps('all','list');

                // show this app in list
                M_APP.view.d_showApps('base','list');
                

                return true;
              },
              'onHide'  : function () { 
                  console.log('onHide index');
                  return true;
               },
              'onAppear'  : function () {
                  console.log('onAppear index');
                //ddd
                // MODEL.checkFunction();
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
                    console.log('onView one d,d1',d,d1);
                  // hide all app in list
                  M_APP.view.d_hideApps('all','list');

                  // show this app in list
                  M_APP.view.d_showApps('base','list');

                  // create chat
                  MODEL.request_getUserMenuByLogin(d['uid']);
                  return true;
                },
                'onAppear'  : function () {
                    console.log('onAppear one');
                    M_VIEW.view.closeLoader(); 
                    M_VIEW.view.showLoader('#menusBlock','forMenuListKey', 'indexCodeOfLoader'); 
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
  // function overided getTemplate
  /* 
  function getTemplate (iNdata) {
     iNdata['other'] = VIEW.getAppContent();
   }
   _['getTemplate'] = getTemplate; 
   */

  // function overided onInit
  function onInit (iNstring,iNobject) {
    console.log('onInit - iNstring,iNobject',iNstring,iNobject);
    M_CATEGORY.view.initSort();
    //ddd
    MODEL.controller_devise_run();
    // get chat list
    if ( USER.getMyId() ) {
      MODEL.getAllMyChats();
    }
  }
  _['onInit'] = onInit;

  // function overided onCreate
  function onCreate (iNstring,iNobject) {
    // init global filter for sort
    M_CATEGORY.view.chat_initGlobalFilter();


    // create app block in list
    M_APP.view.d_createListApp({app:'base','other':VIEW.getAppContent()} ); 

    // init search input autocomplete
    MODEL.initForAutocompleteForSearch();

  }
  _['onCreate'] = onCreate;

  // function overided isApp
  function isApp (iNstring,iNobject) {
    
    return (M_APP.view.d_checkListApp({app:'base'}) > 0) ? true : false;
  }
  _['isApp'] = isApp;


  // function overided onInit
  // function onInit (iNstring,iNobject) {
    
  //   //

  // }
  // _['onInit'] = onInit;

    // function onIn
    function onIn (iNstring,iNobject) {
      
    }
    _['onIn'] = onIn;

      //@overide
      function onAppear (iNstring,iNobject) {
        // hide app header
        M_APP.view.d_hideAppHeaders();

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



  return _;
});