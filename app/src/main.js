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

        "threejs"               : "../vendors/threejs/build/three",
        "detector"              : "../vendors/threejs/examples/js/Detector",
        "orbitControls"         : "../vendors/threejs/examples/js/controls/OrbitControls",
        "mousetrap"             : "../vendors/mousetrap/mousetrap.min"
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
            deps: [ "threejs" ],
            exports: "OrbitControls"  //attaches "THREE" to the window object
        }
    } // end Shim Configuration
});

require(
    [
        'views/canvasElement',
        'views/exampleObjects',
        'modules/animationController',
        'inputFields/inputManager',
        'jquery'
    ],
    function(
        CanvasElementClass,
        ExampleObjectsClass,
        AnimationControllerClass,
        InputManagerClass,
        $ )
    {
        var animationController = new AnimationControllerClass();

        var mainCanvas = new CanvasElementClass( { el: $( "body" ) } );

        var exampleObjects = new ExampleObjectsClass();
        mainCanvas.add( exampleObjects.getObjects() );

        var inputManager = new InputManagerClass();
        inputManager.create( 'text', 'first-text', mainCanvas );

        var firstTextInput = inputManager.getInput( 'first-text')
            .setValue( 'Hola mundo' )
            .setUseScreenCoordinates( true )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputPosition( 100, 100, 0 );
        mainCanvas.add( firstTextInput.getElement() );

        animationController.add( mainCanvas );
        animationController.add( inputManager );

        animationController.animate();
});