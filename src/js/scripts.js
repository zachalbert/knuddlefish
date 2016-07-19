// IIFE
(function ($, window, document, undefined) {
  'use strict';

  /* globals
     config,
     tools,
     store
  */

  tools.init();

  // Event handling

  $('.puzzle-panel .puzzle-btn').click( function() {
    // Figure out which button was clicked, by getting the id or whatever
    var button = $(this);
    var panelWidth = button.parent().width();

    // Trigger the results modal
    tools.showModal();

    // Move to the next puzzle
    function advancePuzzle() {
      tools.hideModal();

      var parentId = button.parent().attr( 'id' );
      var parentExplode = parentId.split('-');
      var nextPuzzle = parseInt( parentExplode[1] ) + 1;
      var newPos = nextPuzzle * panelWidth;

      $('.puzzle').velocity({
        left: -newPos
      }, {
        delay: 400
      });
    }

    // Figure out if the clicked button is a winner or a loser
    function showResults() {
      var outcome = button.data('outcome');

      if( outcome == 'win' ) {
        tools.triggerWin();
      } else {
        tools.triggerLose();
      }

      var hide = setTimeout( advancePuzzle, config.showResultsLength );
    }

    // Add a slight delay to build suspense
    var calculating = setTimeout( showResults, config.calcDelay );
  });

  $('.overlay').click( function() {
    tools.hideModal();
  });

  $('.btn-restart').click( function() {
    location.reload();
  });

})(jQuery, window, document);
