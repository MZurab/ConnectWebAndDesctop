// monitor js crash service - https://sentry.io/

require.config({
        // baseUrl: 'https://ramman.net/files/', //',
        waitSeconds: 59,



        // packages: [{
        //     name: 'moment',
        //     // This location is relative to baseUrl. Choose bower_components
        //     // or node_modules, depending on how moment was installed.
        //     location: 'res/js/moment',
        //     main: 'moment'
        // }],
        paths: {
            'firebase'             : 'res/js/firebase/firebase', //['https://www.gstatic.com/firebasejs/4.6.0/firebase'             ], // , 'res/js/firebase/firebase' https://www.gstatic.com/firebasejs/4.2.0/firebase
            'firestore'            : 'res/js/firebase/firestore', //['https://www.gstatic.com/firebasejs/4.6.0/firebase-firestore' ], // , 'res/js/firebase/firestore' https://www.gstatic.com/firebasejs/4.2.0/firestore
            'template7'            : 'res/js/template7/template7',
            //algolia service
            'algolia'              : "res/js/algolia/algoliasearch.min",//["https://cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min"],

            // "yametrika"            : 'res/js/analytics/yandex/metrika',//["//mc.yandex.ru/metrika/watch","res/js/analytics/yandex/metrika"],
            // A BEAUTIFUL, RESPONSIVE, CUSTOMIZABLE, ACCESSIBLE (WAI-ARIA) REPLACEMENT FOR JAVASCRIPT'S POPUP BOXES
            "sweetalert2"          : "res/js/sweetalert2/sweetalert2",
            // A high-performance, dependency-free library for animated filtering, sorting, insertion, removal and more
            "mixitup"              : 'res/js/mixitup/mixitup.min',
            // JS error monitor 
            // 'Raven'                : "https://cdn.ravenjs.com/3.20.1/raven.min.js";
            
            //@< jquery
                //sourse library
                'jquery'               : 'res/js/jquery/jquery',
                // for algolia autocomplete
                "jquery.autocomplete"  : "res/js/algolia/autocomplete.jquery.min",//"https://cdn.jsdelivr.net/autocomplete.js/0/autocomplete.jquery.min",

                //timer block
                'jquery.countdown'     : 'res/js/jquery/countdown/jquery.countdown.min',
                'jquery.plugin'        : 'res/js/jquery/countdown/jquery.plugin.min',

                //text effects
                'jquery.appear'        : 'res/js/jquery/jquery.appear',
                "jquery.textillate"    : "res/js/jquery/jquery.textillate",
                "jquery.lettering"     : "res/js/jquery/jquery.lettering",
            //@> jquery
            'lazyload'             : 'res/js/lazyload/lazyload',
            // 'rx'                   : 'res/js/rxjs/rx.min',
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
                'v_app'            : 'mvc/view/app',
                'v_category'       : 'mvc/view/category',

                'v_call'           : 'mvc/view/call',
                'v_message'        : 'mvc/view/message',
                'v_contact'        : 'mvc/view/contact',
                'v_push'           : 'https://ramman.net/files/mvc/view/push',


            /*>! views */


            //@< APPS
                // app base
                    'v_app-base'       : 'mvc/view/app-base',
                    'm_app-base'       : 'mvc/model/app-base',
                    'c_app-base'       : 'mvc/controller/app-base',

                // app page
                    'v_app-page'       : 'mvc/view/app-page',
                    'm_app-page'       : 'mvc/model/app-page',
                    'c_app-page'       : 'mvc/controller/app-page',

                // app chat
                    'v_app-chat'       : 'mvc/view/app-chat',
                    'm_app-chat'       : 'mvc/model/app-chat',
                    'c_app-chat'       : 'mvc/controller/app-chat',
            //@> APPS


             /*<? models */
                'm_view'           : 'mvc/model/view',
                'm_app'            : 'mvc/model/app',

                'm_engine'         : 'mvc/model/engine',
                'm_category'       : 'mvc/model/category',
                'm_firebase'       : 'mvc/model/firebase', // https://ramman.net/res/
                'm_user'           : 'mvc/model/user',
                'm_routing'        : 'mvc/model/routing',
                'm_moment'         : 'mvc/model/moment',
                'dictionary'       : 'mvc/model/dictionary',
                'log'              : 'mvc/model/log',

                'm_call'           : 'mvc/model/call',
                'm_message'        : 'mvc/model/message',
                'm_contact'        : 'mvc/model/contact',
                'm_push'           : 'https://ramman.net/files/mvc/model/push',
                'm_synchronize'    : 'mvc/model/synchronize',
                'm_record'         : 'mvc/model/record',
                'm_storage'        : 'mvc/model/storage',
                'm_database'       : 'mvc/model/database',

                'm_progressbar'    : 'mvc/model/progressbar', // deps 'progressbar'

                //url db
                'url'              : 'mvc/model/url',
                'selector'         : 'mvc/model/selector',
                'localdb'          : 'mvc/model/localdb',


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
                // 'firestore': {
                //     deps: ['firebase'],
                //     exports: 'firebase.firestore'
                // },

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


require(
    ['jquery','dictionary','m_engine','m_routing','m_app','m_synchronize','m_user', 'm_push'], 
    function( $, DICTIONARY, ENGINE, ROUTING, M_APP, SYNCHRONIZE, USER , PUSH) {

    //start js crash log for google analytics && yandex metrika
    ROUTING.errorJsHandlerForGoogleAnalyticsAndYandexMetric();



    // do Jquery global
    window['$'] = $;

    console.log('window.isSynchronizeFile',window.isSynchronizeFile)
    if ( window.isSynchronizeFile ) {
        console.log('window.isSynchronizeFile is true');
      // set global routing for use in m_app
      M_APP.setGlobalVar('m_routing',ROUTING)


      ROUTING.setBrowser(); //#if browser

      
      SYNCHRONIZE.synchronizeFile_run('https://sharepay.ramman.net');
      
      M_APP.setGlobalVar('engine',ENGINE);

      return;
    } else {
        console.log('window.isSynchronizeFile is false');
        $(document).ready( function() {
                setTimeout( () => {
                // set global routing for use in m_app
                M_APP.setGlobalVar('m_routing',ROUTING)

                // set browser || desktop
                    // ROUTING.setBrowser(); //#if browser
                    ROUTING.setDesktop(); //#if desktop
                    ROUTING.setDeviseName('Apple Mac');
                    
                // PUSH.getPermission ( PUSH.getToken( ()=>console.log('PUSH.getToken') ) );

                // start synchronize func for use common localstorage, common user at sub and main domain
                if( ROUTING.isBrowser() ) {
                    if( ROUTING.getUserDomain() ) {
                        
                        // set global m_synchronize for 
                        M_APP.setGlobalVar('m_synchronize',SYNCHRONIZE);

                        // if it is subdomain && it is browser -> we run syncronize for use common local storage
                        SYNCHRONIZE.runForSubDomain();
                    } else {
                        // if it is maindomain && it is browser -> we run syncronize for use same user at one time
                        SYNCHRONIZE.runForMainDomain();
                    }
                }

                ENGINE.init();
                DICTIONARY.autoChange(function () {
                    if( ROUTING.isBrowser() ) {
                        if( ROUTING.getUrlLength() > 0 ) {
                            // if we are in main domain
                            if ( ROUTING.getUser() == 'sign' ) {
                                // if ramman.net/sign -> reload to 
                                ENGINE.passToApp({'app':'page', 'user': userLogin, 'page':'fullWindow', 'data':'id=sign&uid=@system'});
                            } else {
                                ENGINE.startUrl();
                            }

                        } else {
                            // if we are open only domain (without path)
                            var userDomain  = ROUTING.getUserDomain();
                            var userLogin   = USER.getMyLogin()||'anonym';
                            var user        = userDomain||userLogin;
                            var data        = [];
                            if( userDomain ) {
                                // if we are in subdomain
                                if ( userDomain )   data.push ('uid='+userDomain);
                                                    data.push ('login='+userLogin);

                                var dataString = data.join('&');
                                ENGINE.passToApp({'app':'base','page':'one','user':userDomain, 'data': dataString});
                            } else {
                                if ( userLogin && userLogin == 'anonym' ) {
                                    // if ramman.net/sign
                                    ENGINE.passToApp({'app':'page', 'user':'anonym', 'page':'fullWindow', 'data':'id=sign&uid=@system'});
                                } else {

                                    ENGINE.passToApp({'app':'base', 'user': userLogin, 'page':'index', 'data':''});
                                }
                            }
                        }
                        
                    } else if( ROUTING.isDesktop() ) {
                        var user = USER.getMyLogin()||'anonym';
                        if( user != 'anonym' ) {
                            ENGINE.passToApp({'app':'base','page':'index', 'user':user,'data':''});
                        }
                        else{
                            ENGINE.passToApp({'app':'page','page':'fullWindow','data':'id=sign&uid=@system'});
                        }

                    }
                });

                M_APP.setGlobalVar('engine',ENGINE);
            },3000)
        });
    }    
});



