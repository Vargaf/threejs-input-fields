/**
 * User: Fernando Villar Perez
 * Date: 30/09/13
 * Time: 16:50
 *
 * Main entrance to the project
 *
 */


require.config({

    paths: {
        "jquery"                : "../vendors/jquery/jquery",
        "backbone"              : "../vendors/backbone-amd/backbone",
        "underscore"            : "../vendors/underscore-amd/underscore",
    },

    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        "threejs": {
            exports: "THREE"  //attaches "THREE" to the window object
        }
    } // end Shim Configuration
});

require( [ 'backbone' ], function( backbone ) {

    console.log( "hola" );

});