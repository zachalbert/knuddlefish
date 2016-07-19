// Utilities like random number generators
var store = ( function() {
  'use strict';
  return {

    insert: function( key, val ) {
      if( typeof(Storage) !== "undefined" ) {
        // Code for localStorage/sessionStorage.
        localStorage.setItem( key, val );
      } else {
        // Sorry! No Web Storage support..
        console.error( 'No web storage support' );
      }
    }

  };
}());
