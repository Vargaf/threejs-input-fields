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
        var orthographicElement = true;
        var animationController = new AnimationControllerClass();

        mainCanvas = new CanvasElementClass( { el: $( "body" ) } );

        var exampleObjects = new ExampleObjectsClass();
        mainCanvas.add( exampleObjects.getObjects() );

        var inputManager = new InputManagerClass();

        var firstTextInput = inputManager
            .create( 'text', 'first-text', orthographicElement )
            .setValue( 'Hola mundo' )
            .setUseScreenCoordinates( true )
            .setFontSize( 40 )
            .setBorderSize( 2 )
            .setInputPosition( 0, 0, 0, inputManager.POSITION_TOP_LEFT );
        mainCanvas.add( firstTextInput.getElement(), firstTextInput.getOrthographicView() );

        var secondTextInput = inputManager
            .create( 'text', 'second-text', orthographicElement )
            .setUseScreenCoordinates( true )
            .setValue( 'Hola mundo' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputPosition( 0, 0, 0, inputManager.POSITION_BOTTOM_RIGHT );
        mainCanvas.add( secondTextInput.getElement(), secondTextInput.getOrthographicView() );

        var thirdTextInput = inputManager
            .create( 'text', 'third-text' )
            .setValue( 'Hola mundo' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputPosition( 50, 100, 0 );
        mainCanvas.add( thirdTextInput.getElement() );


        var fourthTextInput = inputManager
            .create( 'text', 'fourth-text', orthographicElement )
            .setUseScreenCoordinates( true )
            .setValue( 'Hola mundo' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputPosition( 0, 0, 0, inputManager.POSITION_TOP_RIGHT );
        mainCanvas.add( fourthTextInput.getElement(), fourthTextInput.getOrthographicView() );

        var fifthTextInput = inputManager
            .create( 'text', 'fifth-text', orthographicElement )
            .setUseScreenCoordinates( true )
            .setValue( 'Hola mundo' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputPosition( 0, 0, 0, inputManager.POSITION_BOTTOM_LEFT );
        mainCanvas.add( fifthTextInput.getElement(), fifthTextInput.getOrthographicView() );

        var sixthTextInput = inputManager
            .create( 'text', 'sixth-text', orthographicElement )
            .setUseScreenCoordinates( true )
            .setValue( 'Hola mundo' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputPosition( 0, 0, 0, inputManager.POSITION_CENTER );
        mainCanvas.add( sixthTextInput.getElement(), sixthTextInput.getOrthographicView() );

        var raycaster = new RayCaster( { camera: mainCanvas.getCamera(), inputManager: inputManager } );

        animationController.add( mainCanvas );
        animationController.add( inputManager );
        animationController.add( raycaster );

        animationController.animate();
});