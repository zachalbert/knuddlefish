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
      $('.overlay').addClass('overlay--visible');
      $('.modal__spinner').show();
      $('#results').velocity({
        top: 0
      }, 800, 'easeInOutQuart' );
    },
    hideModal: function() {
      $('.overlay').removeClass('overlay--visible');
      $('#results').velocity({
        top: '-100vh'
      }, 400);
      tools.resetModal();
    },
    triggerWin: function() {
      $('.modal__spinner').hide();
      $('.modal--win').show();
      var currentStars = parseInt( localStorage.getItem( 'stars' ) );
      store.insert( 'stars', currentStars + 1 );
      tools.updateStars();
    },
    triggerLose: function() {
      $('.modal__spinner').hide();
      $('.modal--lose').show();
    },
    resetModal: function() {
      $('.modal--lose').hide();
      $('.modal--win').hide();
    },
    updateStars: function() {
      var label = $('.star .num');
      var currentStars = localStorage.getItem( 'stars' );

      label.text( currentStars );
    }

  };
})(jQuery, window, document);
