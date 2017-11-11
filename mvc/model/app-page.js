define( 'APP_PAGE',['jquery','m_view','v_app-page','m_app','m_user','mediaStreamRecorder'] , function ($,M_VIEW,VIEW,M_APP,M_USER,MEDIA) {

  // init result const
  const _ = {};
  const name = 'page';
  _['name'] = name;  


  
  var thisPageName;
  //
  // function _ () {

  // }

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
              console.log('app-page  fullWindow onView', inputData, inputApp);
              addPageToFullWindow(inputData);
              console.log('MEDIA',MEDIA);
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
              addMiniPageToAppView({'id':'sign','uid':'@system'});
              return true;
            },
            'onHide'  : function () {
              return true;
            },
            'onOut'  : function () {
              // dell app header
              // dell app view
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
    clearFullWindow();

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
    console.log( 'getPage  iNdata', iNdata );
    console.log( 'getPage  url_getPage', url_getPage );
    $.get (
      url_getPage, 
      iNdata,
      function (iNcontent) {
        console.log('getPage  iNcontent',iNcontent);
        iNfunction(iNcontent);
      },
      'json'
    );
  };
    function processingData (iNdata) {
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
      var c = 'pageId' + iNdata['id'] + ' headerFromPage';
      if(typeof iNdata == 'object') {
        var obj = iNdata['header'];
        if ( typeof obj['css']  == 'object' && obj['css'].length > 0 ) {
          // add css
          for ( var i in obj['css'] ) {
            M_APP.d_loadCSS(obj['css'][i],c);
          }
        }
        if ( typeof obj['js']   == 'object' && obj['js'].length > 0 ) {
          // add js
          for ( var i in obj['js'] ) {
            M_APP.d_loadJS(obj['js'][i],c);
          }
        }
      }
    }; 
    function addPageToFullWindow (iNdata) {
        getPage ( 
          iNdata,
          function (iNresult){ 
            //add content
            VIEW.addFullWindowByTemplate( { 'content' : iNresult['content'] } );
            //add headers
            console.log('addFullWindowByTemplate  iNresult[content]',iNresult['content']);
            processingData(iNresult);
            console.log('addFullWindowByTemplate  iNresult',iNresult);
            //add events default pages
            addActionForEvents(iNdata['id']);
            //hide loader
            M_VIEW.closeLoader(); 
          }
        );
    }
    function addMiniPageToAppView (iNdata) {
        getPage ( 
          iNdata,
          function (iNresult){ 
            //add content head
            M_APP.view.safeViewAppHeaderWithContent ({
              app : 'page',
              page : 'miniPage',
              content : VIEW.getMiniPageHeader(iNresult['head'])
            },'change');
            console.log('addMiniPageToAppView iNresult[head]',iNresult['head']);

            //@< add content body 
            M_APP.view.d_createChiefApp({
              app : 'page'
            });

            M_APP.view.d_createPageInChiefApp({
              app : 'page',
              page : 'miniPage',
              content : iNresult['content']
            });
            console.log('addMiniPageToAppView iNresult[content]',iNresult['content']);
            //@> add content body 

            //add headers
            processingData(iNresult);
            console.log('addMiniPageToAppView processingData iNresult',iNresult);

            //add events default pages
            //hide loader
            M_VIEW.closeLoader(); 
          }
        );
    }
    function clearMiniPage () {
      deleteHeaders();
      M_APP.view.d_removeAppHeader({'app':'page'});
      M_APP.view.d_removeApps('page');
    }

  function deleteHeaders () {
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
    $('.headerFromPage').remove();
  }
  function clearFullWindow () {
    deleteHeaders();
    $('.appModalFullWindow').remove();
  }

  
  _['init'] = function () {
    M_APP.setGlobalApp(this);
    return this;
  }

  // ever
    function addActionForEvents (iNid) {
      if(iNid == 'sign')
        addActionsForEventsPageSign();
    }

      function addActionsForEventsPageSign () {
        $('.appPageCloseButton').click(function(){
          M_APP.getGlobalVar('engine').passToApp({'app':'base','page':'index','data':''}); // 'user':'',
        });
      }

      function addActionsForEventsPageSign () {
        $('.page-formSignIn').submit(function(e){
          e.preventDefault();
          return M_USER.sendForm('.page-formSignIn');
        });
        $('.page-formSmsCode').submit(function(e){
          e.preventDefault();
          return M_USER.checkSmsCode(this);
        });
        $('.page-formSignUp').submit(function(e){
          e.preventDefault();
          return M_USER.signUpByUserAndPswd(this);
        });
        $('.page-reSendSms').click(function(){
          return M_USER.reSendSms()
        });
      }
  // ever


  return _;

});