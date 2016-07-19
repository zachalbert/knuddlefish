// IIFE
(function ($, window, document, undefined) {
  'use strict';

  /* globals
     config,
     tools
  */

  tools.start( config.yay );

  // Event handling

  $('.puzzle-panel .btn').click( function() {
    $(this).toggleClass( 'active' );
  });

})(jQuery, window, document);
