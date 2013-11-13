/**
 * User: Fernando Villar Perez
 * Date: 13/11/13.
 */

define( [ 'backbone', 'threejs' ], function( Backbone, THREE ) {

    raycasterClass = Backbone.Model.extend({

        inputManager            :   '',
        camera                  :   '',
        mouseX                  :   '',
        mouseY                  :   '',
        isDirty                 :   false,
        projector               :   '',


        initialize: function() {

            raycasterClassTHIS = this;

            this.setCanvasContainer( this.attributes.canvas );
            this.setInputManager( this.attributes.inputManager );

            // initialize object to perform world/screen calculations
            this.projector = new THREE.Projector();

            document.addEventListener( 'mousemove', raycasterClassTHIS.onDocumentMouseMove, false );

        },

        setCanvasContainer: function( canvas ) {

            if( typeof canvas === 'undefined' ) {
                console.log( 'The canvas is needed' );
            } else {
                this.canvasContainer = canvas;
            }

            return this;
        },

        getCanvasContainer: function() {

            return this.canvasContainer;

        },

        setInputManager: function( inputManager ) {

            if( typeof inputManager === 'undefined' ) {
                console.error( 'The inputManager is needed' );
            } else {
                this.inputManager = inputManager;
            }
            return this;

        },

        getInputManager: function() {

            return this.inputManager;

        },

        onDocumentMouseMove: function( event ) {

            // the following line would stop any other event handler from firing
            // (such as the mouse's TrackballControls)
            // event.preventDefault();

            // update the mouse variable
            raycasterClassTHIS.mouseX = ( event.clientX / window.innerWidth ) * 2 - 1;
            raycasterClassTHIS.mouseY = - ( event.clientY / window.innerHeight ) * 2 + 1;

            raycasterClassTHIS.isDirty = true;

        },

        requestAnimationFrame: function() {

            if( this.isDirty ) {

                var vector = new THREE.Vector3( this.mouseX, this.mouseY, 1 );
                this.projector.unprojectVector( vector, this.camera );
                var ray = new THREE.Raycaster( this.camera.position, vector.sub( this.camera.position ).normalize() );

                var inside3DEnviromentInputs = this.getInputManager().getInside3DEnviromentInputs();
                var intersects = ray.intersectObjects( scene.children );

                // INTERSECTED = the object in the scene currently closest to the camera
                //		and intersected by the Ray projected from the mouse position

                // if there is one (or more) intersections
                if ( intersects.length > 0 )
                {
                    console.log( 'Intersection' );
                }


                this.isDirty = false;
            }

        }

    });

    return raycasterClass;

});