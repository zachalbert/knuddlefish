// IIFE
(function ($, window, document, undefined) {
  'use strict';

  /* globals
     config,
     tools,
     store
  */

  tools.svg();
  tools.init();

  // Event handling

  $('.puzzle-panel .puzzle-btn').click( function(e) {
    // Figure out which button was clicked, by getting the id or whatever
    var button = $(this);

    // Trigger the results modal
    tools.showModal();

    // Figure out if the clicked button is a winner or a loser
    function showResults() {
      var outcome = button.data( 'outcome' );

      if( outcome == 'win' ) {
        tools.triggerWin();
      } else {
        tools.triggerLose();
      }

      var hide = setTimeout( tools.changePuzzle( 'next' ), config.showResultsLength );
    }

    // Add a slight delay to build suspense
    var calculating = setTimeout( showResults, config.calcDelay );
  });

  $('.dev-nav-left').click( function() {
    tools.changePuzzle('previous');
  });

  $('.dev-nav-right').click( function() {
    tools.changePuzzle('next');
  });

  $('.overlay').click( function() {
    tools.hideModal();
  });

  $('.btn-restart').click( function() {
    location.reload();
  });

})(jQuery, window, document);
