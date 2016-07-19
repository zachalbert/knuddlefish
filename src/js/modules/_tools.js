// Utilities like random number generators
var tools = ( function($, window, document, undefined) {
  'use strict';

  /* globals
     store
  */

  return {

    init: function() {
      var starsInit = 0;
      store.insert( 'stars', starsInit );
      tools.updateStars();
    },
    showModal: function() {
      $('.overlay').addClass('overlay__visible');
      $('#results').velocity({
        top: 0
      }, 800, 'easeInOutQuart' );
    },
    hideModal: function() {
      $('.overlay').removeClass('overlay__visible');
      $('#results').velocity({
        top: '-100vh'
      }, 400);
      tools.resetModal();
    },
    triggerWin: function() {
      $('.modal--spinner').hide();
      $('.modal__win').show();
      var currentStars = parseInt( localStorage.getItem( 'stars' ) );
      store.insert( 'stars', currentStars + 1 );
      tools.updateStars();
    },
    triggerLose: function() {
      $('.modal--spinner').hide();
      $('.modal__lose').show();
    },
    resetModal: function() {
      $('.modal--spinner').show();
      $('.modal__lose').hide();
      $('.modal__win').hide();
    },
    updateStars: function() {
      var label = $('.star .num');
      var currentStars = localStorage.getItem( 'stars' );

      label.text( currentStars );
    }

  };
})(jQuery, window, document);
