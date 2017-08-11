define( 'APP_PAGE',['jquery','m_view','v_app-page','m_app','m_user'] , function ($,M_VIEW,V_APP_PAGE,M_APP,M_USER) {

  // init result const
  const _ = {};
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
          pages['fullWindow']['menus'] ={
            'attr' : {
              'id1' : 'id2',
              'id3' : 'id4'
            }
          };
          pages['fullWindow']['functions'] = {
            'isPage'  : function () {console.log('app-page fullWindow','isPage'); return true;},
            'onOut'  : function () {console.log('app-page fullWindow','onOut'); return true;},
            'onView'  : function () {
              addPageToFullWindow({'id':'sign','uid':'@system'});
              // V_APP_PAGE.addFullWindowByTemplate({'content':'Hellow World!!!'}); 
              // console.log('app private','onView');
              return true;
            },
            'onHide'  : function () {console.log('app-page fullWindow','onHide'); return true;},
            // 'setPage' : function () {console.log('app-page fullWindow','setPage'); return true;},
            'onCreate' : function () {console.log('app-page fullWindow','onCreate'); return true;},
            'onDisappear' : function () {console.log('app-page fullWindow','onDisappear'); return true;},
          };
    //> page fullWindow

    //< page miniPage
        thisPageName = 'miniPage';
        pages[thisPageName]  = {'attr':{},'menus':{},'functions':{}};
          pages[thisPageName]['attr'] = {};
          pages[thisPageName]['menus'] = {};
          pages[thisPageName]['functions'] = {
            'isPage'  : function () {
              console.log('app-page '+thisPageName,'isPage'); 
              return true;
            },
            'onOut'  : function () {
              console.log('app-page '+thisPageName,'onOut'); 
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
              console.log('app-page '+thisPageName,'onHide'); 
              return true;
            },
            'onOut'  : function () {
              console.log('app-page '+thisPageName,'onOut'); 
              // dell app header
              // dell app view
              return true;
            },
            'onCreate' : function () {
              console.log('app-page '+thisPageName,'onCreate'); 

              return true;
            },
            'onDisappear' : function () {console.log('app-page '+thisPageName,'onDisappear'); return true;},
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

  const name = 'page';
  _['name'] = name;  

  // function setApp
  // function setApp (iNstring,iNobject) {
  //   console.log('app-page','setApp',iNstring);

  // }
  // _['setApp'] = setApp;

  //@overide
  function onHide (iNstring,iNobject) {
    clearFullWindow();
    console.log('app-page','onHide',iNstring);

  }
  _['onHide'] = onHide;


    //@overide
  function onView (iNstring,iNobject) {
    console.log('app-page','onView',iNstring);

  }
  _['onView'] = onView;


  // function onCreate
  function onCreate (iNstring,iNobject) {
    console.log('app-page','onCreate',iNstring);

  }
  _['onCreate'] = onCreate;

  // function isApp
  function isApp (iNstring,iNobject) {
    console.log('app-page','isApp');
    return true;
  }
  _['isApp'] = isApp;


  // function onInit
  function onInit (iNstring,iNobject) {
    console.log('app-page','onInit');

  }
  _['onInit'] = onInit;

    // function onIn
    function onIn (iNstring,iNobject) {
      console.log('app-page','onIn');
    }
    _['onIn'] = onIn;

      // function onAppear
      function onAppear (iNstring,iNobject) {
        console.log('app-page','onAppear');

      }
      _['onAppear'] = onAppear;

      // function onDisappear
      function onDisappear (iNstring,iNobject) {
        console.log('app-page','onDisappear');
      }
      _['onDisappear'] = onDisappear;

    // function onOut
    function onOut (iNstring,iNobject) {
      console.log('app-page','onOut');
    }
    _['onOut'] = onOut;

  // function onDeinit
  function onDeinit (iNstring,iNobject) {
    console.log('app-page','onDeinit');

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
      function (iNcontent) {
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
        console.log('processingData obj',obj);
        console.log('processingData obj css',obj['css']);
        if ( typeof obj['css']  == 'object' && obj['css'].length > 0 ) {
          // add css
          for ( var i in obj['css'] ) {
            console.log('processingData css i - '+i,obj['css'][i]);
            M_APP.d_loadCSS(obj['css'][i],c);
          }
        }
        console.log('processingData obj js',obj['js']);
        if ( typeof obj['js']   == 'object' && obj['js'].length > 0 ) {
          // add js
          for ( var i in obj['js'] ) {
            console.log('processingData js i - '+i,obj['js'][i]);
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
            V_APP_PAGE.addFullWindowByTemplate( { 'content' : iNresult['content'] } );
            //add headers
            processingData(iNresult);
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
            //add content
            M_APP.view.d_addAppHeaderByTemplate ({
              app : 'page',
              page : 'miniPage',
              content : V_APP_PAGE.getMiniPageHeader(iNresult['head'])
            });
            console.log("V_APP_PAGE.getMiniPageHeader(iNresult['head'])",V_APP_PAGE.getMiniPageHeader(iNresult['head']));
            console.log("iNresult['head'])",iNresult['head']);
            M_APP.view.d_createChiefApp({
              app : 'page',
              page : 'miniPage',
              content : iNresult['content']
            });

            //add headers
            processingData(iNresult);
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

  console.log('this.name',this.name)
  
  _['init'] = function () {
    console.log('appPage init',this.name);
    console.log('init this',this);
    M_APP.setGlobalApp(this);
    return this;
  }

  // ever
    function addActionForEvents (iNid) {
      console.log('addActionForEvents iNid - ',iNid);
      if(iNid == 'sign')
        addActionsForEventsPageSign();
    }
      function addActionsForEventsPageSign () {
        $('.page-formSignIn').submit(function(e){
          e.preventDefault();
          console.log('page-formSignIn submit');
          console.log('M_USER',M_USER);
          return M_USER.sendForm('.page-formSignIn');
        });
        $('.page-formSmsCode').submit(function(e){
          e.preventDefault();
          console.log('page-formSmsCode submit');
          return M_USER.checkSmsCode(this);
        });
        $('.page-formSignUp').submit(function(e){
          e.preventDefault();
          console.log('page-formSignUp submit');
          return M_USER.signUpByUserAndPswd(this);
        });
        $('.page-reSendSms').click(function(){
          return M_USER.reSendSms()
        });
      }
  // ever


  return _;

});