/*
 * jQuery appear plugin
 *
 * Copyright (c) 2012 Andrey Sidorov
 * licensed under MIT license.
 *
 * https://github.com/morr/jquery.appear/
 *
 * Version: 0.3.6
 */
(function($) {
  var selectors = [];
  var prefixForId = 'connectPluginAppearJs';
  var check_binded = false;
  var check_lock = false;
  var defaults = {
    interval: 250,
    force_process: false
  };
  var $window = $('body');

  var $prior_appeared = [];

  function appeared(selector) {
    // console.log('appearJs appeared start');
    // console.log('appearJs appeared selector',selector);
    return $(selector).filter(function() {
      return $(this).is(':appeared');
    });
  }

  function process() {
    // console.log('appearJs process start');
    // console.log('appearJs process selectors.length',selectors.length);
    check_lock = false;
    for ( var index = 0, selectorsLength = selectors.length; index < selectorsLength; index++ ) {
      var $appeared = appeared(selectors[index]);
      // console.log('appearJs $appeared #' + index, $appeared);

      $appeared.trigger('appear', [$appeared]);

      if ($prior_appeared[index]) {
        var $disappeared = $prior_appeared[index].not($appeared);
        $disappeared.trigger('disappear', [$disappeared]);
      }
      $prior_appeared[index] = $appeared;
    }
  }

  function add_selector(selector) {
    selectors.push(selector);
    $prior_appeared.push();
  }

  // "appeared" custom filter
  $.expr[':'].appeared = function(element) {
    var $element = $(element);
    var haveParentWithPostionRelative = false;
    // console.log ( "appearPlugin appeared start", element );
    // console.log ( "appearPlugin appeared is(':visible')", $element.is(':visible') );
    if ( !$element.is(':visible') ) {
      return false;
    }

    // console.log("appearPlugin appeared element",element);
    if($(element).attr('appear-parent')) {
      $window = $(element).closest( $(element).attr('appear-parent') );
      haveParentWithPostionRelative = true;

    }
    // console.log("appearPlugin appeared window", $window);
    var window_left = $window.scrollLeft();
    var window_top  = $window.scrollTop();

    if (!haveParentWithPostionRelative) {
      var offset = $element.offset();
      // console.log('appeared offset',offset);
    } else {
      var offset = $element.position();
      // console.log('appeared position',offset);
    }
    var left = offset.left;
    var top = offset.top;
    // console.log('appearPlugin top', top );
    // console.log('appearPlugin $element.height()',$element.height());
    // console.log('appearPlugin top + $element.height()',top + $element.height());
    // console.log('appearPlugin $window.height()',$window.height());
    // console.log('appearPlugin window_top',window_top);
    // console.log('appearPlugin $window.width()',$window.width());
    // console.log('appearPlugin window_left', window_left );

    // console.log('#1 appearPlugin top + $element.height() >= window_top',top + $element.height() >= window_top);
    // console.log('#1N appearPlugin (top + $element.height() <= $window.height() &&   top + $element.height() >0)', (top + $element.height() <= $window.height() &&   top + $element.height() >0));
    // console.log('#2 appearPlugin top - ($element.data(appear-top-offset) || 0) <= window_top + $window.height()', top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() );
    // console.log('#3 appearPlugin left + $element.width() >= window_left', left + $element.width() >= window_left );
    // console.log('#4 appearPlugin left - ($element.data(appear-left-offset) || 0) <= window_left + $window.width()',left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width());

    if (
        // top + $element.height() >= window_top                                          &&
        (top + $element.height() <= $window.height() &&   top + $element.height() >0)     &&

        top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height()  &&
        left + $element.width() >= window_left                                            &&
        left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()
    ) {
      return true;
    } else {
      return false;
    }
  };

  $.fn.extend({
    // watching for element's appearance in browser viewport
    appear: function(options) {
      console.log('appearJs start');
      

      var opts = $.extend({}, defaults, options || {});
      if( typeof opts['timeOutId'] != 'string') 
          opts['timeOutId'] = prefixForId + 'Default';
      else
          opts['timeOutId'] = prefixForId + opts['timeOutId'];
      var selector = this.selector || this;

      // console.log('extend appeared selector',selector);
      // console.log('extend appeared $(selector)',$(selector) );
      // console.log('extend appeared $(selector) attr appear-parent', $(selector).attr('appear-parent') );
      if( $(selector).attr('appear-parent') ) {
          $window = $(selector).closest( $(selector).attr('appear-parent') );
          // console.log('extend appeared appear-parent',$window);
      }
      // console.log('extend appeared window',$window);
      //     console.log('appearJs check_binded',check_binded);
      //     console.log('appearJs check_lock',check_lock);

      

      console.log('appearJs check_binded',check_binded);
      if (!check_binded) {
        var on_check = function() {
          console.log('appearJs check_lock',check_lock);
          if (check_lock) {
            return;
          }
          // console.log('appearJs, setTimeout(process) start invoking');
          check_lock = true;
          // console.log('appearJs, setTimeout(process) opts.interval',opts.interval);
          // clearTimeout( window[opts['timeOutId']] );
          window[opts['timeOutId']] = setTimeout(process, opts.interval);
        };

        // console.log('appearJs, $($window).scroll(on_check).resize(on_check)',$($window).scroll(on_check).resize(on_check));
        $($window).scroll(on_check).resize(on_check);
        check_binded = true;
      }

      if (opts.force_process) {

        window[opts['timeOutId']] = setTimeout(process, opts.interval);
      }
      add_selector(selector);
      console.log('appearJs $(selector)',$(selector));
      return $(selector);
    }
  });

  $.extend({
    // force elements's appearance check
    force_appear: function() {
      if (check_binded) {
        process();
        return true;
      }
      return false;
    }
  });
})(
  function() {
    // if (typeof module !== 'undefined') {
    //   // Node
    //   return require('jquery');
    // } else {
      return jQuery;
    // }
  }()
);
