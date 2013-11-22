/**
 * User: Fernando Villar Perez
 * Date: 01/10/13
 * Time: 19:02
 *
 * Draw a canvas on the page
 *
 */

define( [ 'backbone', 'jquery', 'threejs', 'detector', 'orbitControls' ], function( Backbone, $, THREE, Detector, OrbitControls ) {

    var canvasElementClass = Backbone.View.extend({

        scene                       :   '',
        camera                      :   '',
        cameraOrtho                 :   '',
        sceneOrtho                  :   '',
        renderer                    :   '',
        controls                    :   '',
        className                   :   'canvas-element',
        inputManager                :   false,

        initialize: function(){

            canvasElementThis = this;

            this.cameraOrtho = new THREE.OrthographicCamera( 0, window.innerWidth, window.innerHeight, 0, - 10, 10 );
            this.sceneOrtho = new THREE.Scene();

            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 20000 );
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

                this.renderer.autoClear = false; // To allow render overlay on top of sprited sphere

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

            this.renderer.setSize( window.innerWidth, window.innerHeight );

            this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );

            this.render();

            window.addEventListener( 'resize', this.onWindowResize, false );

        },

        render: function(){

            var canvasElement = this.renderer.domElement;

            $( canvasElement).addClass( this.className );

            //this.$el.html( canvasElement );
            $( "body" ).append( canvasElement );
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

        animate: function( objectItself ) {

            window.requestAnimationFrame( this.animate, objectItself );
            objectItself.render();
            objectItself.update();

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

            canvasElementThis.camera.aspect = window.innerWidth / window.innerHeight;
            canvasElementThis.camera.updateProjectionMatrix();

            canvasElementThis.cameraOrtho.right = window.innerWidth;
            canvasElementThis.cameraOrtho.top = window.innerHeight;
            canvasElementThis.cameraOrtho.updateProjectionMatrix();

            canvasElementThis.inputManager.updateOrthographicInputFieldsPositions();

            canvasElementThis.renderer.setSize( window.innerWidth, window.innerHeight );

        }
    });

    return canvasElementClass;

});
