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
    return $(selector).filter(function() {
      return $(this).is(':appeared');
    });
  }

  function process() {
    check_lock = false;
    for ( var index = 0, selectorsLength = selectors.length; index < selectorsLength; index++ ) {
      var $appeared = appeared(selectors[index]);

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
    if ( !$element.is(':visible') ) {
      return false;
    }

    

    if($(element).attr('connect-appear-scroll-parent')) {
      $window = $(element).closest( $(element).attr('connect-appear-scroll-parent') );
      haveParentWithPostionRelative = true;
    }
 

    var window_left = $window.scrollLeft();
    var window_top  = $window.scrollTop();

    if (!haveParentWithPostionRelative) {
      var offset = $element.offset();
    } else {
      var offset = $element.position();
    }
    var left = offset.left;
    var top = offset.top;
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
    appearByEach : function (iNfunction,iNoptions) {
        var selector = this.selector || this;
        $(selector).each(function() {
          $(this).appear_once(iNfunction,iNoptions);
        });
    },
    appear_once: function (iNfunction,iNoptions) {
      var selector = this.selector || this;
      var filterPathToThisClass = $window;//$('body');
      var blockForScroll = false;

      
      if($(selector).attr('connect-appear-my-parent')) {
        filterPathToThisClass = $(selector).closest( $(selector).attr('connect-appear-my-parent') );
      }
      if(filterPathToThisClass.length > 0 ) {
        //get scroll parent from  filter patch 
        $window =  $(selector).closest(filterPathToThisClass) .attr('connect-appear-scroll-parent')
      }

      if( $(selector).attr('connect-appear-scroll-parent') ) {
        //get scroll parent from  this element patch 
        $window = $(selector).closest( $(selector).attr('connect-appear-scroll-parent') );
        haveParentWithPostionRelative = true;
      }

      if ( typeof iNoptions == 'object') {

        if ( typeof iNoptions['scroll-parent'] == 'string' ) {
          $window = $(selector).closest( iNoptions['scroll-parent'] );
          filterPathToThisClass = $window;
        }
        else if ( typeof iNoptions['scroll-window'] == 'string' ) {
          $window = $( iNoptions['scroll-window'] );
          filterPathToThisClass = $window;
        }



        

        if ( typeof iNoptions['my-filter-parent'] == 'string')
          filterPathToThisClass = $(selector).closest( iNoptions['my-filter-parent'] );
        else if ( typeof iNoptions['my-filter-window'] == 'string')
          filterPathToThisClass = $( iNoptions['my-filter-window'] );
      }
      
      if( !$(filterPathToThisClass).is(":visible") || !$($window ).is(":visible") ) {
        return false;
      }

      if ( $(selector).is(':appeared') ) {
          iNfunction(selector);

        if ( typeof iNoptions['checkForRemoveClass'] != 'function' || iNoptions['checkForRemoveClass'](selector) ) {
          $(selector).removeClass('connect-appear');
        }
        return $(selector);
      } else {
        if ( typeof iNoptions['checkForAddClass'] != 'function'   || iNoptions['checkForAddClass'](selector) ) {
          $(selector).addClass('connect-appear');
        }
      }

      var on_check = function () {
        var $fullPathToChild = $(filterPathToThisClass).children('.connect-appear') ;
        var allLengh = $fullPathToChild.length - 1;
        if( allLengh < 0 || blockForScroll) return false;
        blockForScroll = true;
        $fullPathToChild.each ( 
          function (index) {
            if( $(this).is(':appeared') ) {
              if ( typeof iNoptions['checkForRemoveClass'] != 'function' || iNoptions['checkForRemoveClass'](selector) ) {
              $(selector).removeClass('connect-appear');
              }
              iNfunction(this);
            }
            if(allLengh==index){
              // if it is last element
              blockForScroll = false;
            }
          }
        );
      }
      $($window).unbind('scroll').off('resize').scroll( on_check ).resize( on_check );//unbind('scroll').off('resize').

      return $(selector);
    },
    appear: function(options) {
      

      var opts      = $.extend({}, defaults, options || {});
      var selector  = this.selector || this;


      if( $(selector).attr('connect-appear-scroll-parent') ) {
          $window = $(selector).closest( $(selector).attr('connect-appear-scroll-parent') );
      }

      

      if (!check_binded) {
        var on_check = function() {
          if (check_lock) {
            return;
          }
          check_lock = true;
          setTimeout(process, opts.interval);
        };

        $($window).scroll(on_check).resize(on_check);
        check_binded = true;
      }

      if (opts.force_process) {

        setTimeout(process, opts.interval);
      }
      add_selector(selector);
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