define( ['m_app-page','v_app-page',] , function ( MODEL, VIEW ) {

  // init result const
  const _ = {};
  const name = 'page';
  _['name'] = name;  


  
  var thisPageName;

  // init pages const
  const pages = {}; _['pages'] = pages;
    //< page fullWindow
        pages['fullWindow']  = {'attr':{},'menus':{},'functions':{}};
          pages['fullWindow']['attr'] = {
            'id2' : '2',
            'id3' : '3',
          };
          pages['fullWindow']['menus'] = {
            'attr' : {
              'id1' : 'id2',
              'id3' : 'id4'
            }
          };
          pages['fullWindow']['functions'] = {
            'isPage'  : function () {return true;},
            'onOut'  : function () { return true;},
            'onView'  : function (inputData,inputApp) {
              MODEL.addPageToFullWindow({'id':inputData['id'],'uid':inputData['uid']});
              // VIEW.addFullWindowByTemplate({'content':'Hellow World!!!'}); 
              return true;
            },
            'onHide'  : function () {  return true;},
            // 'setPage' : function () { return true;},
            'onCreate' : function () {  return true;},
            'onDisappear' : function () {return true;},
          };
    //> page fullWindow

    //< page miniPage
        thisPageName = 'miniPage';
        pages[thisPageName]  = {'attr':{},'menus':{},'functions':{}};
          pages[thisPageName]['attr'] = {};
          pages[thisPageName]['menus'] = {};
          pages[thisPageName]['functions'] = {
            'onInit' : () => {

                if( !M_APP.getAppFromStoryLog('base') ) {
                      // if app base not open yet -> we load
                    M_APP.getGlobalVar('engine').passToApp( {'app':'base','page':'index'} );
                }

            },
            'isPage'  : function () {
              return true;
            },
            'onOut'  : function () {
              return true;
            },
            'onView'  : function (iNdata, iNobject) {
              /*
                getPage -> checkData
                create app view with page 
                create header view with page
              */
              MODEL.addMiniPageToAppView({'id':iNdata['id'],'uid':iNdata['uid']});
              return true;
            },
            'onHide'  : function () {
              return true;
            },
            'onCreate' : function () {

              return true;
            },
            'onDisappear' : function () { return true;},
          };
    //> page miniPage
  

  const options = {
    'attr'  : {
      'attr' : {
        'id2' : '2',
        'id3' : '3',
      }
    },
    // options for list app menus
    'menus': {
      'attr' : {
        'id2' : '2',
        'id3' : '3',
      }
    }
  };
  _['options'] = options;


  // function setApp
  // function setApp (iNstring,iNobject) {

  // }
  // _['setApp'] = setApp;

  //@overide
  function onHide (iNstring,iNobject) {
    MODEL.clearFullWindow();

  }
  _['onHide'] = onHide;


    //@overide
  function onView (iNstring,iNobject) {

  }
  _['onView'] = onView;


  // function onCreate
  function onCreate (iNstring,iNobject) {

  }
  _['onCreate'] = onCreate;

  // function isApp
  function isApp (iNstring,iNobject) {
    return true;
  }
  _['isApp'] = isApp;


  // function onInit
  function onInit (iNstring,iNobject) {

  }
  _['onInit'] = onInit;

    // function onIn
    function onIn (iNstring,iNobject) {
    }
    _['onIn'] = onIn;

      // function onAppear
      function onAppear (iNstring,iNobject) {

      }
      _['onAppear'] = onAppear;

      // function onDisappear
      function onDisappear (iNstring,iNobject) {
      }
      _['onDisappear'] = onDisappear;

    // function onOut
    function onOut (iNstring,iNobject) {
    }
    _['onOut'] = onOut;

  // function onDeinit
  function onDeinit (iNstring,iNobject) {

  }
  _['onDeinit'] = onDeinit;


  return  _;

});