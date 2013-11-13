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
        renderer                    :   '',
        controls                    :   '',
        className                   :   'canvas-element',

        initialize: function(){

            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 20000 );

            this.camera.position.set( 0, 150, 400 );
            this.camera.lookAt( this.scene.position );

            this.scene.add( this.camera );

            if( Detector.webgl ){

                this.renderer = new THREE.WebGLRenderer({
                    antialias		: true,	                // to get smoother output
                    preserveDrawingBuffer	: true	        // to allow screenshot
                });

                this.renderer.setClearColor( 0x000000, 1 );
                // uncomment if webgl is required
                //}else{
                //	Detector.addGetWebGLMessage();
                //	return true;
            } else {

                this.renderer = new THREE.CanvasRenderer();

            }

            var light = new THREE.AmbientLight( 0x404040 ); // soft white light
            this.scene.add( light );

            this.renderer.setSize( window.innerWidth, window.innerHeight );

            this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );

            this.render();

        },

        render: function(){

            var canvasElement = this.renderer.domElement;

            $( canvasElement).addClass( this.className );

            //this.$el.html( canvasElement );
            $( "body" ).append( canvasElement );
        },

        add: function( object ) {

            if( typeof object == "undefined" ) {

                console.error( '-- CanvasElement:add -- An object add must be given.' );
                return;

            }

            this.scene.add( object );

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

            this.renderer.render( this.scene, this.camera );

        },

        requestAnimationFrame: function() {

            this.renderCanvas();
            this.update();
        },

        getCamera: function() {
            return this.camera;
        }


    });

    return canvasElementClass;

});
