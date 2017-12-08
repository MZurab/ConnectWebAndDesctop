define( ['jquery','dictionary','m_view','v_app-page','m_app','m_user','mediaStreamRecorder', 'url'] , function ($,DICTIONARY, M_VIEW,VIEW,M_APP,M_USER,MEDIA, URL) {

  // init result const
  const _ = {};

 





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
        if ( typeof obj['css']  == 'object' && obj['css'].length > 0 ) {
          // add css
          for ( var i in obj['css'] ) {
            M_APP.view.d_loadCSS (obj['css'][i],c);
          }
        }
        if ( typeof obj['js']   == 'object' && obj['js'].length > 0 ) {
          // add js
          for ( var i in obj['js'] ) {
            M_APP.view.d_loadJS (obj['js'][i],c);
          }
        }
      }
    }; 

    function addPageToFullWindow (iNdata) {
        getPage ( 
          iNdata,
          function (iNresult){ 
            // translate content
            var content = DICTIONARY.withLanguageObject(iNresult['content']);
            //add content
            VIEW.addFullWindowByTemplate( { 'content' : content } );
            //add headers
            processingData(iNresult);
            //add events default pages
            addActionForEvents(iNdata['id']);
            //hide loader
            M_VIEW.view.closeLoader(); 
          }
        );
    } _.addPageToFullWindow = addPageToFullWindow;



    function addMiniPageToAppView (iNdata) {
        getPage ( 
          iNdata,
          function (iNresult){ 
            //add content head
            var head = iNresult['head'];
            if(typeof head == 'object')
              var objForAddHeader = {
                'title' : DICTIONARY.withLanguageObject(head['title']),
                'text'  : DICTIONARY.withLanguageObject(head['text']),
                'icon'  : DICTIONARY.withLanguageObject(head['icon'])
              }
            M_APP.view.safeViewAppHeaderWithContent (
              {
                app       : 'page',
                page      : 'miniPage',
                content   : VIEW.getMiniPageHeader(objForAddHeader)
              },
              'change'
            );

            //@< add content body 
            M_APP.view.d_createChiefApp(
              {
                app       : 'page'
              }
            );

            // translate content
            var content = DICTIONARY.withLanguageObject(iNresult['content']);

            M_APP.view.d_createPageInChiefApp(
              {
                app       : 'page',
                page      : 'miniPage',
                content   : content
              }
            );
            //@> add content body 

            //add headers
            processingData(iNresult);

            //add events default pages
            //hide loader
            M_VIEW.view.closeLoader(); 
          }
        );
    } _.addMiniPageToAppView = addMiniPageToAppView;

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
  } _.clearFullWindow = clearFullWindow;

  
  // _['init'] = function () {
  //   M_APP.setGlobalApp(this);
  //   return this;
  // }

  // ever
    function addActionForEvents (iNid) {
      if(iNid == 'sign')
        addActionsForEventsPageSign();
    }

      function addActionsForEventsPageSign () {
        $('.appPageCloseButton').click(function(){
          M_APP.getGlobalVar('engine').passToApp({'app':'base', 'page':'index', 'data': '' }); // 'user':'',
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