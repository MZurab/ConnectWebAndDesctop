define( ['jquery'] , function ($) {

  const result = {};
  const pages = {

  };
  const options = {
    
  };

  // function onCreate
  function onCreate (iNstring,iNobject) {
    console.log('app-page','onCreate');

  }
  result['onCreate'] = onCreate;

  // function isApp
  function isApp (iNstring,iNobject) {
    console.log('app-page','isApp');
    return true;
  }
  result['isApp'] = isApp;


  // function onInit
  function onInit (iNstring,iNobject) {
    console.log('app-page','onInit');

  }
  result['onInit'] = onInit;

    // function onIn
    function onIn (iNstring,iNobject) {
    console.log('app-page','onIn');
      
    }
    result['onIn'] = onIn;

      //@overide
      function onAppear (iNstring,iNobject) {
    console.log('app-page','onAppear');

      }
      result['onAppear'] = onAppear;

      //@overide
      function onDisappear (iNstring,iNobject) {
        console.log('app-page','onDisappear');

      }
      result['onDisappear'] = onDisappear;

    //@overide
    function onOut (iNstring,iNobject) {
      console.log('app-page','onOut');

    }
    result['onOut'] = onOut;

  //@overide
  function onDeinit (iNstring,iNobject) {
    console.log('app-page','onDeinit');

  }
  result['onDeinit'] = onDeinit;







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
        getPage ({'uid':'@system','id':'sign'}, function (result) { console.log('result',result)})
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
      function (result) {
        iNfunction(result);
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






  return result;

});