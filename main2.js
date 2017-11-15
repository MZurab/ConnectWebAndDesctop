require2.config({
    baseUrl: 'https://ramman.net/files/', //https://cdn.ramman.net/web/',
    
    // packages: [{
    //     name: 'moment',
    //     // This location is relative to baseUrl. Choose bower_components
    //     // or node_modules, depending on how moment was installed.
    //     location: 'res/js/moment',
    //     main: 'moment'
    // }],
    paths: {
    	'firebase'             : ['https://www.gstatic.com/firebasejs/4.6.0/firebase'             ], // , 'res/js/firebase/firebase' https://www.gstatic.com/firebasejs/4.2.0/firebase
        'firestore'            : ['https://www.gstatic.com/firebasejs/4.6.0/firebase-firestore' ], // , 'res/js/firebase/firestore' https://www.gstatic.com/firebasejs/4.2.0/firestore
        'template7'            : 'res/js/template7/template7',
        //algolia service
        'algolia'              : ["https://cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min", "res/js/algolia/algoliasearch.min"],

        "yametrika"            : ["//mc.yandex.ru/metrika/watch","res/js/analytics/yandex/metrika"],
        // A BEAUTIFUL, RESPONSIVE, CUSTOMIZABLE, ACCESSIBLE (WAI-ARIA) REPLACEMENT FOR JAVASCRIPT'S POPUP BOXES
        "sweetalert2"          : "res/js/sweetalert2/sweetalert2",
        // A high-performance, dependency-free library for animated filtering, sorting, insertion, removal and more
        "mixitup"              : 'res/js/mixitup/mixitup.min',
        
        //@< jquery
            //sourse library
            'jquery'               : 'res/js/jquery/jquery',
            // for algolia autocomplete
            "jquery.autocomplete"  : ["https://cdn.jsdelivr.net/autocomplete.js/0/autocomplete.jquery.min","res/js/algolia/autocomplete.jquery.min"],

            //timer block
            'jquery.countdown'     : 'res/js/jquery/countdown/jquery.countdown.min',
            'jquery.plugin'        : 'res/js/jquery/countdown/jquery.plugin.min',

            //text effects
            'jquery.appear'        : 'res/js/jquery/jquery.appear',
            "jquery.textillate"    : "res/js/jquery/jquery.textillate",
            "jquery.lettering"     : "res/js/jquery/jquery.lettering",
        //@> jquery
        'lazyload'             : 'res/js/lazyload/lazyload',
        'rx'                   : 'res/js/rxjs/rx.min',
        // Parse, validate, manipulate, and display dates and times in JavaScript.
        'moment'               : 'res/js/moment/moment',
        // A platform detection library
        'platform'             : 'res/js/platform/platform',
        // A audio player
        // 'Howl'              : 'res/js/players/audio/howler/howler.min',

        // A progresbar library
        'progressbar'         : 'res/js/progressbar/progressbar.min',



        // Audio and Video recorder
        'mediaStreamRecorder'  : 'res/js/recorder/mediaStreamRecorder/MediaStreamRecorder',
        'WebAudioRecorder'     : 'res/js/recorder/webAudioRecorder/lib/WebAudioRecorder',
        // 'WebAudioRecorder'     : 'res/js/recorder/webAudioRecorder/lib/WebAudioRecorder',
        'Recorder'             : 'res/js/recorder/OggOpusRecorder/dist/recorder.min',

        // 'MediaRecorderWrapper' : 'res/js/recorder/mediaStreamRecorder/MediaRecorderWrapper',

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
            'm_routing'       : 'mvc/model/routing',
            'm_moment'         : 'mvc/model/moment',
            'dictionary'       : 'mvc/model/dictionary',
            'log'              : 'mvc/model/log',

            'm_call'           : 'mvc/model/call',
            'm_message'        : 'mvc/model/message',
            'm_contact'        : 'mvc/model/contact',
            'm_push'           : 'mvc/model/push',
            'm_synchronize'    : 'mvc/model/synchronize',
            'm_record'         : 'mvc/model/record',
            'm_storage'        : 'mvc/model/storage',
            'm_database'       : 'mvc/model/database',

            'm_progressbar'    : 'mvc/model/progressbar', // deps 'progressbar'


        /*>! models */
    },
    shim: {
        /* <? jquery modules */

            // for algolia autocomplete
            'jquery.autocomplete': {
                deps: ['jquery'],
                exports: 'jQuery.fn.autocomplete'
            },
            'jquery.countdown': {
                deps: ['jquery','jquery.plugin'],
                exports: 'jQuery.fn.countdown'
            },
            'jquery.plugin': {
                deps: ['jquery'],
                exports: 'JQClass'
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

        /* <? progressbar modules */
            // 'progressbar': {
            //     exports: 'progressbar',
            // },
        /* >! progressbar modules */
        


        /* <? mediaStreamRecorder modules for push */
            'mediaStreamRecorder': {
                // deps: 'MediaRecorderWrapper',
                exports: 'mediaStreamRecorder'
            },

            'WebAudioRecorder': {
                // deps: 'MediaRecorderWrapper',
                exports: 'WebAudioRecorder'
            },
            // 'Recorder': {
            //     exports: 'Recorder'
            // },
        /* >! mediaStreamRecorder modules for push */

        /* <? mixitup modules*/
            'mixitup': {
                exports: 'Mixitup',
            },
        /* >! mixitup modules */

        /* <? google modules*/
            'firebase': {
                exports: 'firebase',
            },
            'firestore': {
                deps: ['firebase'],
                exports: 'firebase.firestore'
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

require2(
    ['jquery','dictionary','m_engine','m_routing','m_app','m_push','m_synchronize','m_user'], 
    function( $, DICTIONARY, ENGINE, ROUTING, M_APP, PUSH, SYNCHRONIZE, USER) {
    $(function() {
        console.log('start! 2');
        // set global routing for use in m_app
        M_APP.setGlobalVar('m_routing',ROUTING)

        // set browser || desktop
            ROUTING.setBrowser(); //#if browser
            // ROUTING.setDesktop(); //#if desktop
            // ROUTING.setDeviseName('Apple Mac');
        ENGINE.init();
        // PUSH.getPermission ( PUSH.getToken( ()=>console.log('PUSH.getToken') ) );

        // start synchronize func for use common localstorage, common user at sub and main domain
        if( ROUTING.isBrowser() ) {
                console.log('SYNCHRONIZE start');
            if( ROUTING.getUserDomain() ) {
                // if it is subdomain && it is browser -> we run syncronize for use common local storage
                SYNCHRONIZE.runForSubDomain();
                console.log('SYNCHRONIZE.runForSubDomain');
            } else {
                // if it is maindomain && it is browser -> we run syncronize for use same user at one time
                SYNCHRONIZE.runForMainDomain();
                console.log('SYNCHRONIZE.runForMainDomain');
            }
        }

        DICTIONARY.autoChange(function () {
            if( ROUTING.isBrowser() ) {
                if( ROUTING.getUrlLength() > 0 ) {
                    console.log('ROUTING.getUrlLength isBrowser 1', ROUTING.getUrlLength() );
                    ENGINE.startUrl();

                } else {
                    var userDomain  = ROUTING.getUserDomain();
                    var userLogin   = USER.getMyLogin()||'anonym';
                    var user        = userDomain||userLogin;
                    var data        = [];
                    console.log('ROUTING.getUrlLength isBrowser 2', ROUTING.getUrlLength() , userDomain );
                    if( userDomain ) {
                        if ( userDomain )   data.push ('uid='+userDomain);
                                            data.push ('login='+userLogin);

                        var dataString = data.join('&');
                        console.log( 'ROUTING.getUrlLength isBrowser dataString, userDomain 3', dataString , userDomain );
                        ENGINE.passToApp({'app':'base','page':'one','user':userDomain, 'data': dataString});
                    } else {
                        if ( userLogin == 'anonym' )
                            ENGINE.passToApp({'app':'page','page':'fullWindow', 'data':'id=sign&uid=@system'});
                        else
                            ENGINE.passToApp({'app':'base','page':'index', 'data':''});
                    }
                }
                
            } else if( ROUTING.isDesktop() ) {
                var user = USER.getMyLogin()||'anonym';
                console.log('ROUTING.getUrlLength isDesktop,user 0', ROUTING.getUrlLength(), user );
                if( user != 'anonym' ) {
                    console.log('ROUTING.getUrlLength isDesktop,user 1',  user );
                    ENGINE.passToApp({'app':'base','page':'index', 'user':user,'data':''});
                }
                else{
                    console.log('ROUTING.getUrlLength isDesktop,user 2',  user );
                    ENGINE.passToApp({'app':'page','page':'fullWindow','data':'id=sign&uid=@system'});
                }

            }
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