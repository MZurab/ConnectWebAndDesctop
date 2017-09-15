require2.config({
    baseUrl: 'https://ramman.net/files/',//https://cdn.ramman.net/web/',
    // packages: [{
    //     name: 'moment',
    //     // This location is relative to baseUrl. Choose bower_components
    //     // or node_modules, depending on how moment was installed.
    //     location: 'res/js/moment',
    //     main: 'moment'
    // }],
    paths: {
    	'firebase'             : ['https://www.gstatic.com/firebasejs/4.2.0/firebase','res/js/firebase/firebase'],
        'template7'            : 'res/js/template7/template7',
        "yametrika"            : ["//mc.yandex.ru/metrika/watch","res/js/analytics/yandex/metrika"],
        // A BEAUTIFUL, RESPONSIVE, CUSTOMIZABLE, ACCESSIBLE (WAI-ARIA) REPLACEMENT FOR JAVASCRIPT'S POPUP BOXES
        "sweetalert2"          : "res/js/sweetalert2/sweetalert2",
        // A high-performance, dependency-free library for animated filtering, sorting, insertion, removal and more
        "mixitup"              : 'res/js/mixitup/mixitup.min',
        
        'jquery'               : 'res/js/jquery/jquery',
        "jquery.lettering"     : "res/js/jquery/jquery.lettering",
        "jquery.textillate"    : "res/js/jquery/jquery.textillate",
        'jquery.countdown'     : 'res/js/jquery/jquery.countdown',
        'jquery.appear'        : 'res/js/jquery/jquery.appear',

        'lazyload'             : 'res/js/lazyload/lazyload',
        'rx'                   : 'res/js/rxjs/rx.min',
        // Parse, validate, manipulate, and display dates and times in JavaScript.
        'moment'               : 'res/js/moment/moment',
        // A platform detection library
        'platform'             : 'res/js/platform/platform',

        /*<? views */
            'v_view'           : 'mvc/view/view',
            'v_app-chat'       : 'mvc/view/app-chat',
            'v_app'            : 'mvc/view/app',
            'v_app-page'       : 'mvc/view/app-page',
            'v_app-base'       : 'mvc/view/app-base',
            'v_category'       : 'mvc/view/category',

            'v_call'           : 'mvc/view/call',
            'v_message'        : 'mvc/view/message',
            'v_contact'        : 'mvc/view/contact',
            'v_push'           : 'mvc/view/push',

        /*>! views */

         /*<? models */
            'm_view'           : 'mvc/model/view',
            'm_app-chat'       : 'mvc/model/app-chat',
            'm_app'            : 'mvc/model/app',
            'APP_PAGE'         : 'mvc/model/app-page',
            'm_app-base'       : 'mvc/model/app-base',

            'm_engine'         : 'mvc/model/engine',
            'm_category'       : 'mvc/model/category',
            'm_firebase'       : 'mvc/model/firebase', // https://ramman.net/res/
            'm_user'           : 'mvc/model/user',
            'm_routing'        : 'mvc/model/routing',
            'm_moment'         : 'mvc/model/moment',
            'dictionary'       : 'mvc/model/dictionary',

            'm_call'           : 'mvc/model/call',
            'm_message'        : 'mvc/model/message',
            'm_contact'        : 'mvc/model/contact',
            'm_push'           : 'mvc/model/push',
            'm_synchronize'    : 'mvc/model/synchronize',


        /*>! models */
    },
    shim: {
        /* <? jquery modules */
            'jquery.countdown': {
                deps: ['jquery'],
                exports: 'jQuery.fn.countdown'
            },
            'jquery.lettering': {
                deps: ['jquery'],
                exports: 'jQuery.fn.lettering'
            },
            'jquery.textillate': {
                deps: ['jquery'],
                exports: 'jQuery.fn.textillate'
            },
            'jquery.appear' : {
                deps: ['jquery'],
                exports: 'jQuery.fn.appear'
            },
        /* >! jquery modules */


        /* <? onesignal modules for push */
            'moment': {
                exports: 'moment',
            },
        /* >! onesignal modules for push */

        /* <? mixitup modules*/
            'mixitup': {
                exports: 'Mixitup',
            },
        /* >! mixitup modules */

        /* <? google modules*/
            'firebase': {
                exports: 'Firebase',
            },
        /* >! google modules */

        /* <? framework7.io modules*/
            'template7': {
                exports: 'Template7',
            }
        /* >! framework7.io modules*/
    },
    map: {
      '*': {
        'css': 'require-css/css' // or whatever the path to require-css is
      }
    }
});

require2(['jquery','dictionary','m_engine','m_routing','m_app','m_push','m_synchronize'], function( $, DICTIONARY, ENGINE, ROUTING, M_APP, PUSH, SYNCHRONIZE) {
    $(function() {
        console.log('start!');
        // set browser || desktop
        ROUTING.setBrowser();

        ENGINE.init();
        PUSH.getPermission ( PUSH.getToken( ()=>console.log('PUSH.getToken') ) );

        console.log('main ROUTING.isBrowser()',ROUTING.isBrowser());
        console.log('main ROUTING.getUserDomain()',ROUTING.getUserDomain());
        if( ROUTING.isBrowser() && ROUTING.getUserDomain() ) {
            // if it is subdomain && it is browser -> y
            // SYNCHRONIZE.view.safeAddFrameSynchronize(ROUTING.getUserDomain());
            SYNCHRONIZE.run();
        }

        DICTIONARY.autoChange(function () {
            // ENGINE.prepareUrl({'app':'base','page':'index','user':'zurab','data':'data'});
            if(ROUTING.getUrlLength() > 0) {
                // 
                console.log('ROUTING.getUrlLength 1',ROUTING.getUrlLength() );
                ENGINE.startUrl();
            } else {
                console.log('ROUTING.getUrlLength 2', ROUTING.getUrlLength() );
                ENGINE.passToApp({'app':'page','page':'fullWindow', 'data':'data'});
            }
            
            // ENGINE.prepareUrl({'app':'page','page':'miniPage','user':'zurab','data':'data'});
            
            // ENGINE.startUrl();
        });

        M_APP.setGlobalVar('engine',ENGINE);
    });
});

/*

    view -
    `http://etp.kartoteka.ru/trade/view/purchase/general.html?id=100791615

    <noscript><div><img src="https://mc.yandex.ru/watch/44940067" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->


      "pack:osx":   "electron-packager . $npm_package_productName --out=dist/osx --platform=darwin --arch=x64 --icon=assets/build/osx/icon.icns && npm run codesign",
  "pack:win32": "electron-packager . $npm_package_productName --out=dist/win --platform=win32 --arch=ia32",
  "pack:win64": "electron-packager . $npm_package_productName --out=dist/win --platform=win32 --arch=x64 --version=0.36.2 app-version=1.0 --icon=assets/build/win/icon.ico",
  "build": "npm run pack:osx && npm run pack:win32 && npm run pack:win64"
  https://stackoverflow.com/questions/36941605/electron-packager-set-app-icons-for-osx-windows
  https://www.christianengvall.se/electron-packager-tutorial/
  https://www.christianengvall.se/electron-app-icons/

*/