// Utilities like random number generators
var tools = ( function($, window, document, undefined) {
  'use strict';

  /* globals
     store
  */

  return {

    svg: function() {
      /*
       * Replace all SVG images with inline SVG
       */
      jQuery('img.svg').each(function(){
          var $img = jQuery(this);
          var imgID = $img.attr('id');
          var imgClass = $img.attr('class');
          var imgURL = $img.attr('src');

          jQuery.get(imgURL, function(data) {
              // Get the SVG tag, ignore the rest
              var $svg = jQuery(data).find('svg');

              // Add replaced image's ID to the new SVG
              if(typeof imgID !== 'undefined') {
                  $svg = $svg.attr('id', imgID);
              }
              // Add replaced image's classes to the new SVG
              if(typeof imgClass !== 'undefined') {
                  $svg = $svg.attr('class', imgClass+' replaced-svg');
              }

              // Remove any invalid XML tags as per http://validator.w3.org
              $svg = $svg.removeAttr('xmlns:a');

              // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
              if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                  $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
              }

              // Replace image with new SVG
              $img.replaceWith($svg);

          }, 'xml');

      });
    },

    // Set game up
    init: function() {
      // Start scoring from 0
      var starsInit = 0;
      store.insert( 'stars', starsInit );
      tools.updateStars();

      // Boolean to track modal visibility, begin false
      store.insert( 'modal', false );

      store.insert( 'currentPuzzle', 0 );
    },
    modalIsVisible: function() {
      return localStorage.getItem( 'modal' );
    },
    showModal: function() {
      store.insert( 'modal', true );

      $('.overlay').addClass('overlay--visible');
      $('.modal__spinner').show();
      $('#results').velocity({
        top: 0
      }, 800, 'easeInOutQuart' );
    },
    hideModal: function() {
      store.insert( 'modal', false );

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
    },
    changePuzzle: function( direction ) {
      var currentPuzzle = parseInt( localStorage.getItem( 'currentPuzzle' ) );
      var prevPuzzle    = currentPuzzle - 1;
      var nextPuzzle    = currentPuzzle + 1;

      var panelWidth = $('.puzzle-panel').width();

      // var button = $(choice);
      // var panelWidth = button.parent().width();

      if( tools.modalIsVisible ) {
        tools.hideModal();
      }

      // var parentId = button.parent().attr( 'id' );
      // var parentExplode = parentId.split('-');

      // var prevPuzzle  = parseInt( parentExplode[1] ) - 1;
      // var nextPuzzle  = parseInt( parentExplode[1] ) + 1;
      var prevPos     = prevPuzzle * panelWidth;
      var nextPos     = nextPuzzle * panelWidth;

      if( direction == 'previous' ) {
        store.insert( 'currentPuzzle', prevPuzzle );

        $('.puzzle').velocity({
          left: -prevPos
        }, {
          delay: 400
        });
      } else if( direction == 'next' ) {
        store.insert( 'currentPuzzle', nextPuzzle );

        $('.puzzle').velocity({
          left: -nextPos
        }, {
          delay: 400
        });
      }
    }

  };
})(jQuery, window, document);
