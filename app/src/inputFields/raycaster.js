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
        inner3DSpaceMouseX      :   '',
        inner3DSpaceMouseY      :   '',
        isDirty                 :   false,
        projector               :   '',
        raycaster               :   '',
        intersectedElement      :   false,


        initialize: function() {

            raycasterClassTHIS = this;

            this.setCamera( this.attributes.camera );
            this.setInputManager( this.attributes.inputManager );

            // initialize object to perform world/screen calculations
            this.projector = new THREE.Projector();
            this.raycaster = new THREE.Raycaster();

        },

        setCamera: function( camera ) {

            if( typeof camera === 'undefined' ) {
                console.error( 'The camera is needed' );
            } else {
                this.camera = camera;
            }

            return this;
        },

        getCamera: function() {

            return this.camera;

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

        getCanvasWidth: function() {

            return this.getInputManager().getCanvasWidth();

        },

        getCanvasHeight: function() {

            return this.getInputManager().getCanvasHeight();

        },

        onDocumentMouseMove: function( event ) {

            // update the mouse variable
            raycasterClassTHIS.inner3DSpaceMouseX = ( event.clientX / this.getCanvasWidth() ) * 2 - 1;
            raycasterClassTHIS.inner3DSpaceMouseY = - ( event.clientY / this.getCanvasHeight() ) * 2 + 1;

            raycasterClassTHIS.mouseX = event.clientX;
            raycasterClassTHIS.mouseY = event.clientY;

            raycasterClassTHIS.isDirty = true;
        },

        onDocumentMouseClick:function( event ) {

            raycasterClassTHIS.checkIfElementHasBeenClicked();

            if( false != raycasterClassTHIS.intersectedElement ) {

                raycasterClassTHIS.getInputManager().setFocusedElement( raycasterClassTHIS.intersectedElement );

            }

        },

        requestAnimationFrame: function() {

            this.checkIfElementHasBeenClicked();

        },

        checkIfElementHasBeenClicked: function() {

            if( this.isDirty ) {

                this.intersectedElement = this.getIntersectedInputField();

                this.isDirty = false;
            }

        },

        getIntersectedInputField: function() {

            var inputElement = false;
            var intersectedElement = false;

            intersectedElement = this.getIntersectedInputFieldOutside3DSpace();
            if( intersectedElement != false ) {
                inputElement = intersectedElement;
            }

            if( false == inputElement ) {

                intersectedElement = this.getIntersectedInputFieldInside3DSpace();
                if( intersectedElement != false ) {
                    inputElement = intersectedElement;
                }
            }

            return inputElement;

        },

        getIntersectedInputFieldOutside3DSpace: function() {

            var outside3DEnviromentInputs = this.getInputManager().getOutside3DEnviromentInputs();
            var inputField = false;
            var inputFieldPosition = false;
            var inputFieldElement = false;
            var intersectedElement = false;

            var xIni = 0;
            var xEnd = 0;
            var yIni = 0;
            var yEnd = 0;

            for( var index in outside3DEnviromentInputs ) {

                inputField = outside3DEnviromentInputs[ index ];
                inputFieldPosition = inputField.getInputPosition();
                inputFieldElement = inputField.getInputElement();

                xIni = inputFieldPosition.x - inputFieldElement.scale.x / 2;
                xEnd = ( inputFieldPosition.x + inputFieldElement.scale.x / 2);
                yIni = this.getCanvasHeight() - ( inputFieldPosition.y + inputFieldElement.scale.y / 2 );
                yEnd = this.getCanvasHeight() - ( inputFieldPosition.y - inputFieldElement.scale.y / 2 );

                if(
                    ( xIni <= this.mouseX && this.mouseX <= xEnd ) &&
                    ( yIni <= this.mouseY && this.mouseY <= yEnd )
                ) {
                    intersectedElement = inputFieldElement ;
                    break;
                }

            }

            return intersectedElement;


        },

        getIntersectedInputFieldInside3DSpace: function(){

            var intersectedElement = false;

            var vector = new THREE.Vector3( this.inner3DSpaceMouseX, this.inner3DSpaceMouseY, 1 );
            this.projector.unprojectVector( vector, this.camera );

            var inside3DEnviromentInputs = this.getInputManager().getInside3DEnviromentInputs();

            this.raycaster.set( this.camera.position, vector.sub( this.camera.position ).normalize() );

            var intersects = this.raycaster.intersectObjects( inside3DEnviromentInputs );

            // INTERSECTED = the object in the scene currently closest to the camera
            //		and intersected by the Ray projected from the mouse position

            // if there is one (or more) intersections
            if ( intersects.length > 0 )
            {
                intersectedElement = intersects[ 0 ];
            }

            return intersectedElement;

        }

    });

    return raycasterClass;

});