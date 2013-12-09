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
        "mousetrap"             : "../../vendors/mousetrap/mousetrap.min",

        // Threejs helpers
        "detector"              : "../../vendors/threejs/examples/js/Detector",
        "orbitControls"         : "../../vendors/threejs/examples/js/controls/OrbitControls"
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
        var canvasContent = document.getElementById( 'canvas-content' );
        var canvasWidth = canvasContent.clientWidth;
        var canvasHeight = canvasContent.clientHeight;

        var orthographicElement = true;
        var animationController = new AnimationControllerClass();

        mainCanvas = new CanvasElementClass( { el: canvasContent, 'canvasWidth': canvasWidth, 'canvasHeight': canvasHeight } );

        var exampleObjects = new ExampleObjectsClass();
        mainCanvas.add( exampleObjects.getObjects() );

        inputManager = new InputManagerClass( { camera: mainCanvas.getCamera(), 'canvasWidth': canvasWidth, 'canvasHeight': canvasHeight } );
        mainCanvas.setInputManager( inputManager );

        var firstTextInput = inputManager
            .create( 'text', 'first-text', orthographicElement )
            .setValue( 'Top Left' )
            .setFontSize( 40 )
            .setBorderSize( 2 )
            .onBlur( setValueToOutput, '' )
            .setInputPosition( 0, 0, 0, inputManager.POSITION_TOP_LEFT );
        mainCanvas.add( firstTextInput.getElement(), firstTextInput.getOrthographicView() );

        var secondTextInput = inputManager
            .create( 'text', 'second-text', orthographicElement )
            .setValue( 'Bottom right' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputFieldSize( 100 )
            .setInputPosition( 0, 0, 0, inputManager.POSITION_BOTTOM_RIGHT );
        mainCanvas.add( secondTextInput.getElement(), secondTextInput.getOrthographicView() );

        var thirdTextInput = inputManager
            .create( 'text', 'third-text' )
            .setValue( 'Inner 3D' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputPosition( 50, 100, 0 );
        mainCanvas.add( thirdTextInput.getElement() );


        var fourthTextInput = inputManager
            .create( 'text', 'fourth-text', orthographicElement )
            .setValue( 'Top right' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputFieldSize( 50 )
            .setInputPosition( 0, 0, 0, inputManager.POSITION_TOP_RIGHT );
        mainCanvas.add( fourthTextInput.getElement(), fourthTextInput.getOrthographicView() );

        var fifthTextInput = inputManager
            .create( 'text', 'fifth-text', orthographicElement )
            .setValue( 'Bottom left' )
            .setFontSize( 15 )
            .setBorderSize( 2 )
            .setInputFieldSize( 250 )
            .setInputPosition( 0, 0, 0, inputManager.POSITION_BOTTOM_LEFT );
        mainCanvas.add( fifthTextInput.getElement(), fifthTextInput.getOrthographicView() );

        var sixthTextInput = inputManager
            .create( 'text', 'sixth-text', orthographicElement )
            .setValue( 'Center' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputFieldSize( 150 )
            .setInputPosition( 0, 0, 0, inputManager.POSITION_CENTER );
        mainCanvas.add( sixthTextInput.getElement(), sixthTextInput.getOrthographicView() );

        var seventhTextInput = inputManager
            .create( 'text', 'seventh-text', orthographicElement )
            .setValue( 'Top center' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputFieldSize( 125 )
            .setInputPosition( 0, 0, 0, inputManager.POSITION_TOP_CENTER );
        mainCanvas.add( seventhTextInput.getElement(), seventhTextInput.getOrthographicView() );

        var eighthTextInput = inputManager
            .create( 'text', 'eightth-text', orthographicElement )
            .setValue( 'Right center' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputFieldSize( 100 )
            .setInputPosition( 0, 0, 0, inputManager.POSITION_RIGHT_CENTER );
        mainCanvas.add( eighthTextInput.getElement(), eighthTextInput.getOrthographicView() );

        var ninthTextInput = inputManager
            .create( 'text', 'ninth-text', orthographicElement )
            .setValue( 'Bottom center' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .setInputFieldSize( 100 )
            .setInputPosition( 0, 0, 0, inputManager.POSITION_BOTTOM_CENTER );
        mainCanvas.add( ninthTextInput.getElement(), ninthTextInput.getOrthographicView() );

        var tenthTextInput = inputManager
            .create( 'text', 'tenth-text', orthographicElement )
            .setValue( 'Left center' )
            .setFontSize( 20 )
            .setBorderSize( 2 )
            .onFocus( concatenateValueToOutput, '' )
            .setInputPosition( 0, 0, 0, inputManager.POSITION_LEFT_CENTER );
        mainCanvas.add( tenthTextInput.getElement(), tenthTextInput.getOrthographicView() );

        var outputField = inputManager
            .create( 'text', 'output-field', orthographicElement )
            .setValue( 'Output field' )
            .setFontSize( 10 )
            .setBorderSize( 2 )
            .setReadOnly( true )
            .setInputPosition( 0, 100, 0, inputManager.POSITION_TOP_CENTER );
        mainCanvas.add( outputField.getElement(), outputField.getOrthographicView() );


        // To set the input value to the "output-field" when an input lost its focus
        function setValueToOutput( event ) {

            outputField.setValue( event.object.getInputValue() );

        }

        function concatenateValueToOutput( event ) {

            outputField.setValue( outputField.getInputValue() + ' -- ' + event.object.getInputValue() );

        }

        // http://www.html5rocks.com/en/tutorials/pointerlock/intro/

        var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

        if ( havePointerLock ) {

            var element = mainCanvas.getRenderer().domElement;

            var pointerlockchange = function ( event ) {

                if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

                    //controls.enabled = true;

                } else {

                    //controls.enabled = false;

                }

            }

            var pointerlockerror = function ( event ) {

            }

            // Hook pointer lock state change events
            document.addEventListener( 'pointerlockchange', pointerlockchange, false );
            document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
            document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

            document.addEventListener( 'pointerlockerror', pointerlockerror, false );
            document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
            document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

            mainCanvas.getRenderer().domElement.addEventListener( 'click', function ( event ) {

                // Ask the browser to lock the pointer
                element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

                if ( /Firefox/i.test( navigator.userAgent ) ) {

                    var fullscreenchange = function ( event ) {

                        if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {

                            document.removeEventListener( 'fullscreenchange', fullscreenchange );
                            document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

                            element.requestPointerLock();
                        }

                    }

                    document.addEventListener( 'fullscreenchange', fullscreenchange, false );
                    document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

                    element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

                    element.requestFullscreen();

                } else {

                    element.requestPointerLock();

                }

            }, false );

        } else {

            mainCanvas.getRenderer().domElement.removeEventListener( 'click' );

        }


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
        animationController.animate();
    });