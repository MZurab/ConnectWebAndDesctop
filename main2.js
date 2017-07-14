require2.config({
    // baseUrl: 'https://cdn.ramman.net/web/',
    paths: {
    	'firebase'             : 'https://www.gstatic.com/firebasejs/3.6.10/firebase',
        'template7'            : 'res/js/template7/template7',
        "yametrika"            : ["//mc.yandex.ru/metrika/watch","res/js/analytics/yandex/metrika"],
        "sweetalert2"          : "res/js/sweetalert2/sweetalert2",
        "onesignal"            : "https://cdn.onesignal.com/sdks/OneSignalSDK",
        "mixitup"              : 'res/js/mixitup/mixitup.min',
        'jquery'               : 'res/js/jquery/jquery',
        "jquery.lettering.js"  : "res/js/jquery/jquery.lettering",
        "jquery.textillate.js" : "res/js/jquery/jquery.textillate",
        'jquery.countdown'     : 'res/js/jquery/jquery/jquery.countdown.min',
        'lazyload'             : 'res/js/lazyload/lazyload',
        'rx'                   : 'res/js/rxjs/rx.min',
        'dictionary'           : 'mvc/model/dictionary',

        /*<? views */
            'v_view'           : 'mvc/view/view',
            'v_chat'           : 'mvc/view/chat',
            'v_app'            : 'mvc/view/app',
        /*>! views */

         /*<? models */
            'm_view'           : 'mvc/model/view',
            'm_chat'           : 'mvc/model/chat',
            'm_app'            : 'mvc/model/app',
            'm_engine'         : 'mvc/model/engine',
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
        /* >! jquery modules */


        /* <? onesignal modules for push */
            'onesignal': {
                exports: 'OneSignal',
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
require2(['jquery','template7','m_view','dictionary','m_engine'], function($, Template7,m_view,Dictionary,m_engine) {
    $(function() {
        console.log('start!');
        // view1.rend('black');  
        // compile it with Template7
        var template = `
            <script id="template" type="text/template7">
                <p>Hello, my name is {{firstName}} {{lastName}}</p>
            </script>
        `;

        var compiledTemplate = Template7.compile(template);
         
        // Now we may render our compiled template by passing required context
        var context = {
            firstName: 'Zurab',
            lastName: 'Magomadov'
        };
        var html = compiledTemplate(context);
      
        console.log( 'html', html);

            m_engine.openApp('chat','private');
            m_engine.openApp('chat','private2');
        Dictionary.autoChange(function () {
            // m_view.hideLoader();
            // m_view.init();
            m_engine.openApp('chat','private');
        });
        

        console.log('end!');

    });
});

/*
Добавить 
    jquery moduls
        counter
        text litering
    sweet alet
    Yandex metrika + Google analythics
    template7
    OneSignal
    Firibase
    require css
    

    Добрый день!
 
 
    Для Татаев 15*25 мм
    100 000 шт - 65 000 р
    200 000 шт - 99 000 р
     
     
    Для Интерии 15 мм
    5000 шт - 18 100 р
    10 000 шт - 20 700 р

    
    Подгрузка определение пользователя
    Создание основы
    Определение запроса routing
    Запуск

    view -
    `http://etp.kartoteka.ru/trade/view/purchase/general.html?id=100791615

    <noscript><div><img src="https://mc.yandex.ru/watch/44940067" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->

*/