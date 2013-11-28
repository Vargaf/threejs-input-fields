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
        "jquery"                : "../../vendors/jquery/jquery",
        "backbone"              : "../../vendors/backbone-amd/backbone",
        "underscore"            : "../../vendors/underscore-amd/underscore",
        "threejs"               : "../../vendors/threejs/build/three",

        // Threejs helpers
        "detector"              : "../../vendors/threejs/examples/js/Detector",
        "orbitControls"         : "../../vendors/threejs/examples/js/controls/OrbitControls",

        // Helpers
        "mousetrap"             : "../../vendors/mousetrap/mousetrap.min"
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
        '../helpers/canvasElement',
        '../helpers/exampleObjects',
        '../helpers/animationController',
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
        var orthographicElement = true;
        var animationController = new AnimationControllerClass();

        mainCanvas = new CanvasElementClass( { el: $( "body" ) } );

        var exampleObjects = new ExampleObjectsClass();
        mainCanvas.add( exampleObjects.getObjects() );

        var inputManager = new InputManagerClass( { camera: mainCanvas.getCamera() } );
        mainCanvas.setInputManager( inputManager );

        var firstTextInput = inputManager
            .create( 'text', 'first-text', orthographicElement )
            .setValue( 'First text' )
            .setFontSize( 40 )
            .setBorderSize( 2 )
            .setInputPosition( 0, 0, 0, inputManager.POSITION_TOP_LEFT );
        mainCanvas.add( firstTextInput.getElement(), firstTextInput.getOrthographicView() );

        var secondTextInput = inputManager
            .create( 'text', 'second-text', orthographicElement )
            .setValue( 'Second text' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputPosition( 0, 0, 0, inputManager.POSITION_BOTTOM_RIGHT );
        mainCanvas.add( secondTextInput.getElement(), secondTextInput.getOrthographicView() );

        var thirdTextInput = inputManager
            .create( 'text', 'third-text' )
            .setValue( 'Third text' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputPosition( 50, 100, 0 );
        mainCanvas.add( thirdTextInput.getElement() );


        var fourthTextInput = inputManager
            .create( 'text', 'fourth-text', orthographicElement )
            .setValue( 'Fourth text' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputPosition( 0, 0, 0, inputManager.POSITION_TOP_RIGHT );
        mainCanvas.add( fourthTextInput.getElement(), fourthTextInput.getOrthographicView() );

        var fifthTextInput = inputManager
            .create( 'text', 'fifth-text', orthographicElement )
            .setValue( 'Fifth text' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputPosition( 0, 0, 0, inputManager.POSITION_BOTTOM_LEFT );
        mainCanvas.add( fifthTextInput.getElement(), fifthTextInput.getOrthographicView() );

        var sixthTextInput = inputManager
            .create( 'text', 'sixth-text', orthographicElement )
            .setValue( 'Sixth text' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputPosition( 0, 0, 0, inputManager.POSITION_CENTER );
        mainCanvas.add( sixthTextInput.getElement(), sixthTextInput.getOrthographicView() );

        //var raycaster = new RayCaster( { camera: mainCanvas.getCamera(), inputManager: inputManager } );

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'click', onDocumentMouseClick, false );

        function onDocumentMouseMove( event ) {
            inputManager.onDocumentMouseMove( event );
        }

        function onDocumentMouseClick( event ) {
            inputManager.onDocumentMouseClick( event );
        }

        animationController.add( mainCanvas );
        animationController.add( inputManager );
        //animationController.add( raycaster );

        animationController.animate();
    });