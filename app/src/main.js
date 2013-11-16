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
        "mousetrap"             : "../vendors/mousetrap/mousetrap.min",

        "raycaster"            : "../vendors/RayCaster/raycaster"
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
        'jquery',
        'raycaster'
    ],
    function(
        CanvasElementClass,
        ExampleObjectsClass,
        AnimationControllerClass,
        InputManagerClass,
        $,
        RayCaster )
    {
        var animationController = new AnimationControllerClass();

        mainCanvas = new CanvasElementClass( { el: $( "body" ) } );

        var exampleObjects = new ExampleObjectsClass();
        mainCanvas.add( exampleObjects.getObjects() );

        var inputManager = new InputManagerClass( { camera: mainCanvas.getCamera() } );

        var firstTextInput = inputManager
            .create( 'text', 'first-text', mainCanvas )
            .setValue( 'Hola mundo' )
            .setUseScreenCoordinates( true )
            .setFontSize( 40 )
            .setBorderSize( 2 )
            .setInputPosition( 10, 10, 0 );
        mainCanvas.add( firstTextInput.getElement() );

        var secondTextInput = inputManager
            .create( 'text', 'second-text', mainCanvas )
            .setUseScreenCoordinates( true )
            .setValue( 'Hola mundo' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputPosition( 220, 10, 0 );
        mainCanvas.add( secondTextInput.getElement() );

        var thirdTextInput = inputManager
            .create( 'text', 'third-text', mainCanvas )
            .setValue( 'Hola mundo' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputPosition( 50, 100, 0 );
        mainCanvas.add( thirdTextInput.getElement() );



        var raycaster = new RayCaster( { camera: mainCanvas.getCamera(), inputManager: inputManager } );

        animationController.add( mainCanvas );
        animationController.add( inputManager );
        animationController.add( raycaster );

        animationController.animate();
});