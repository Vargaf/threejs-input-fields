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

        "threejs"               : "../vendors/threejs/build/three.min",
        "detector"              : "../vendors/threejs/examples/js/Detector",
        "orbitControls"          : "../vendors/threejs/examples/js/controls/OrbitControls"
    },

    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        "threejs": {
            exports: "THREE"  //attaches "THREE" to the window object
        },
        "detector": {
            exports: "Detector"  //attaches "THREE" to the window object
        },
        "orbitControls": {
            exports: "OrbitControls"  //attaches "THREE" to the window object
        }
    } // end Shim Configuration
});

require(
    [
        'views/canvasElement',
        'views/exampleObjects',
        'modules/animationController',
        'jquery'
    ],
    function(
        CanvasElementClass,
        ExampleObjectsClass,
        AnimationControllerClass,
        $ )
    {

    var animationController = new AnimationControllerClass();

    var mainCanvas = new CanvasElementClass( { el: $( "body" ) } );

    var exampleObjects = new ExampleObjectsClass();

    mainCanvas.add( exampleObjects.getObjects() );

    animationController.add( mainCanvas );

    animationController.animate();
});