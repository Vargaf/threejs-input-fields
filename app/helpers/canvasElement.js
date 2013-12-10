/**
 * User: Fernando Villar Perez
 * Date: 01/10/13
 * Time: 19:02
 *
 * Draw a canvas on the page
 *
 */

define( [ 'backbone', 'jquery', 'threejs', 'detector', 'orbitControls', 'inputFields/inputManager' ], function( Backbone, $, THREE, Detector, OrbitControls, inputManagerClass ) {

    var canvasElementClass = Backbone.View.extend({

        scene                       :   '',
        camera                      :   '',
        cameraOrtho                 :   '',
        sceneOrtho                  :   '',
        renderer                    :   '',
        controls                    :   '',
        className                   :   'canvas-element',
        inputManager                :   false,
        canvasWidth                 :   0,
        canvasHeight                :   0,

        initialize: function( arguments ){

            canvasElementThis = this;

            this.setCanvasWidth( arguments.canvasWidth );
            this.setCanvasHeight( arguments.canvasHeight );

            this.cameraOrtho = new THREE.OrthographicCamera( 0, this.getCanvasWidth(), this.getCanvasHeight(), 0, - 10, 10 );
            this.sceneOrtho = new THREE.Scene();

            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera( 45, this.getCanvasWidth() / this.getCanvasHeight(), 0.1, 20000 );
            this.camera.name = 'camera';

            this.camera.position.set( 0, 150, 400 );
            this.camera.lookAt( this.scene.position );

            this.scene.add( this.camera );

            if( Detector.webgl ){

                this.renderer = new THREE.WebGLRenderer({
                    antialias		: true,	                // to get smoother output
                    preserveDrawingBuffer	: true	        // to allow screenshot
                });

                this.renderer.setClearColor( 0x000000, 1 );

                this.renderer.autoClear = false; // To allow render overlay on top of 3D space

                // uncomment if webgl is required
                //}else{
                //	Detector.addGetWebGLMessage();
                //	return true;
            } else {

                this.renderer = new THREE.CanvasRenderer();

            }

            var light = new THREE.AmbientLight( 0x404040 ); // soft white light
            light.name = "light";
            this.scene.add( light );

            this.renderer.setSize( this.getCanvasWidth(), this.getCanvasHeight() );

            this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );

            this.render();

        },

        render: function(){

            var canvasElement = this.renderer.domElement;
            var canvasContainer = document.getElementById( 'canvas-content' );
            $( canvasElement).addClass( this.className );
            canvasContainer.appendChild( canvasElement );
        },

        /**
         * Adds the element to the normal scene or orthographic scene
         *
         * @param object
         * @param orthographicElement
         */
        add: function( object, orthographicElement ) {

            if( typeof object == "undefined" ) {

                console.error( '-- CanvasElement:add -- An object add must be given.' );
                return;

            }

            if( orthographicElement ){

                this.sceneOrtho.add( object );

            } else {

                this.scene.add( object );

            }

        },

        refreshElement: function( object, objectId ) {

            var element = this.scene.getObjectById( objectId );

            if( typeof element != undefined ) {

                this.scene.remove( element );

            }

            this.add( object );

        },

        update: function() {

            this.controls.update();
        },

        renderCanvas: function() {

            this.renderer.clear();
            this.renderer.render( this.scene, this.camera );
            this.renderer.render( this.sceneOrtho, this.cameraOrtho );

        },

        requestAnimationFrame: function() {

            this.renderCanvas();
            this.update();
        },

        getCamera: function() {
            return this.camera;
        },

        getCameraOrtho: function() {
            return this.cameraOrtho;
        },

        getSceneOrtho: function() {
            return this.sceneOrtho;
        },


        setCanvasWidth: function( canvasWidth ) {

            if( typeof canvasWidth === 'undefined' ) {
                console.error( 'The canvasWidth is needed' );
            } else {
                this.canvasWidth = canvasWidth;
            }

            return this;
        },

        getCanvasWidth: function() {

            return this.canvasWidth;

        },

        setCanvasHeight: function( canvasHeight ) {

            if( typeof canvasHeight === 'undefined' ) {
                console.error( 'The canvasHeight is needed' );
            } else {
                this.canvasHeight = canvasHeight;
            }

            return this;
        },

        getCanvasHeight: function() {

            return this.canvasHeight;

        },

        setInputManager: function( inputManager ) {

            if( inputManager instanceof inputManagerClass == false) {
                console.error( 'The input manager given must be an inputManagerClass object' );
            } else {
                this.inputManager = inputManager;
            }

            return this;
        },

        getInputManager: function() {
            return this.inputManager;
        },

        onWindowResize: function() {

            var domElement = canvasElementThis.getRenderer().domElement;

            canvasElementThis.camera.aspect = domElement.clientWidth / domElement.clientHeight;
            canvasElementThis.camera.updateProjectionMatrix();

            canvasElementThis.cameraOrtho.right = domElement.clientWidth;
            canvasElementThis.cameraOrtho.top = domElement.clientHeight;
            canvasElementThis.cameraOrtho.updateProjectionMatrix();

            canvasElementThis.inputManager.updateOrthographicInputFieldsPositions();

            canvasElementThis.renderer.setSize( domElement.clientWidth, domElement.clientHeight );

        },

        getRenderer: function() {
            return this.renderer;
        },

        setRenderer: function( renderer ) {
            this.renderer = renderer;
            return this;
        }
    });

    return canvasElementClass;

});
