// IIFE
(function ($, window, document, undefined) {
  'use strict';

  /*global
    modules/config
    modules/tools
  */

  tools.start( config.yay );

  // Event handling

  $('.puzzle-panel .btn').click( function() {
    $(this).toggleClass( 'active' );
  });

})(jQuery, window, document);
