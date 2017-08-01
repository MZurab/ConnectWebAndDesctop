define( ['jquery','m_view','v_app-page','m_app'] , function ($,M_VIEW,V_APP_PAGE,M_APP) {

  const _ = {};
  const pages = {
    'index'   : '',
    'private'   : {
      'attr' : {
        'id2' : '2',
        'id3' : '3',
      },
      'menus': {
        'attr' : {
          'id1' : 'id2',
          'id3' : 'id4'
        }
      },
      'functions': {
        'isPage'  : function () {console.log('app private','isPage'); return true;},
        'onView'  : function () { 
          console.log('app private','onView');
          addPageToFullWindow({'id':'sign','uid':'@system'});
          M_VIEW.closeLoader(); 
          // V_APP_PAGE.addFullWindowByTemplate({'content':'Hellow World!!!'}); 
          // console.log('app private','onView');
          return true;
        },
        'onHide'  : function () {console.log('app private','onHide'); return true;},
        'setPage' : function () {console.log('app private','setPage'); return true;},
        'onCreate' : function () {console.log('app private','onCreate'); return true;},

      }
    }
  };
  _['pages'] = pages;

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
  function setApp (iNstring,iNobject) {
    console.log('app-page','setApp',iNstring);

  }
  _['setApp'] = setApp;

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
            V_APP_PAGE.addFullWindowByTemplate( { 'content' : iNresult['content'] } );
            processingData(iNresult);
          }
        );
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
    $('.appModalFullWindow').rempove();
  }






  return _;

});