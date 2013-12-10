/**
 *
 * User: Fernando Villar Perez
 * Date: 02/10/13
 * Time: 09:30
 *
 * This is the class that manages all the inputs showed
 *
 */


define(
    [
        'backbone',
        'threejs',
        '../inputFields/views/inputText',
        '../inputFields/views/inputCursor',
        'mousetrap',
        'jquery',
        '../inputFields/raycaster'
    ],
    function(
        Backbone,
        THREE,
        InputText,
        InputCursor,
        Mousetrap,
        $,
        RayCaster
        ) {

    var inputManagerClass = Backbone.Model.extend({

        POSITION_TOP_LEFT               :   'tl',
        POSITION_TOP_RIGHT              :   'tr',
        POSITION_BOTTOM_LEFT            :   'bl',
        POSITION_BOTTOM_RIGHT           :   'br',
        POSITION_TOP_CENTER             :   'tc',
        POSITION_LEFT_CENTER            :   'lc',
        POSITION_RIGHT_CENTER           :   'rc',
        POSITION_BOTTOM_CENTER          :   'bc',
        POSITION_CENTER                 :   'c',


        inputTypesEnabled               :   {
            'text'      :     1
        },

        inputsLoaded                :   {},
        focusedElement              :   '',
        isShiftPress                :   false,
        isCapsLocked                :   false,
        ignoreKey                   :   false,
        cursorElement               :   false,
        lastCameraPosition          :   { x: 0, y: 0, z: 0 },
        raycaster                   :   false,
        camera                      :   '',
        canvasWidth                 :   0,
        canvasHeight                :   0,

        initialize: function() {

            inputManagerClassTHIS = this;

            this.setCamera( this.attributes.camera );
            this.setCanvasWidth( this.attributes.canvasWidth );
            this.setCanvasHeight( this.attributes.canvasHeight );

            this.raycaster = new RayCaster( { camera: this.getCamera(), inputManager: this } );

            $( document ).keypress(function( event ) {

                if( !inputManagerClassTHIS.ignoreKey ) {
                    var char = String.fromCharCode( event.which );

                    if( inputManagerClassTHIS.isShifted( event ) ) {
                        char = char.toLocaleUpperCase();
                    } else {
                        char = char.toLocaleLowerCase();
                    }

                    inputManagerClassTHIS.addKeyDownValue( char );
                }

                inputManagerClassTHIS.ignoreKey = false;

                return false;
            });

            /**
             * Disable backspace and delete key
             */
            $( document ).keydown(function( event ) {
                if( event.which == 8 || event.which == 46 ) {
                    return false;
                }
            });

            Mousetrap.bind( 'shift',        inputManagerClassTHIS.shiftPress, 'keypress' );
            Mousetrap.bind( 'shift',        inputManagerClassTHIS.shiftRelease, 'keyup' );

            Mousetrap.bind( 'left',         inputManagerClassTHIS.cursorDisplace );
            Mousetrap.bind( 'right',        inputManagerClassTHIS.cursorDisplace );
            Mousetrap.bind( 'backspace',    inputManagerClassTHIS.inputBackspace );
            Mousetrap.bind( 'del',          inputManagerClassTHIS.inputDel );
            Mousetrap.bind( 'end',          inputManagerClassTHIS.inputCursorEnd );
            Mousetrap.bind( 'home',          inputManagerClassTHIS.inputCursorStart );

        },

        shiftRelease: function() {
            inputManagerClassTHIS.isShiftPress = false;
        },

        shiftPress: function() {
            inputManagerClassTHIS.isShiftPress = true;
        },

        isShifted: function( event ) {

            if( event ) {
                // get key pressed
                var which = -1;
                if (event.which) {
                    which = event.which;
                } else if (event.keyCode) {
                    which = event.keyCode;
                }
                // get shift status
                var shift_status = false;
                if (event.shiftKey) {
                    shift_status = event.shiftKey;
                } else if (event.modifiers) {
                    shift_status = !!(event.modifiers & 4);
                }
                if (((which >= 65 && which <=  90) && !shift_status) ||
                    ((which >= 97 && which <= 122) && shift_status)) {
                    // uppercase, no shift key
                    inputManagerClassTHIS.isCapsLocked = true;
                } else {
                    inputManagerClassTHIS.isCapsLocked = false;
                }
            }

            return inputManagerClassTHIS.isCapsLocked || inputManagerClassTHIS.isShiftPress || false;
        },

        cursorDisplace: function( event ) {

            inputManagerClassTHIS.ignoreKey = true;
            var focusedElement = inputManagerClassTHIS.getFocusedElement();

            if( focusedElement ) {

                var inputCursor = inputManagerClassTHIS.getInputCursor();

                if( event.keyCode == 39 ) {             // LEFT
                    inputCursor.setCursorTextPosition( focusedElement.getCursorTextPosition() + 1 );
                } else if( event.keyCode == 37 ) {      // RIGHT
                    inputCursor.setCursorTextPosition( focusedElement.getCursorTextPosition() - 1 );
                }
            }
        },

        inputBackspace: function( event ) {

            var focusedElement = inputManagerClassTHIS.getFocusedElement();

            if( focusedElement ) {

                focusedElement.inputBackspace();

            }

        },

        inputDel: function( event ) {

            var focusedElement = inputManagerClassTHIS.getFocusedElement();

            if( focusedElement ) {

                focusedElement.inputDel();

            }

        },

        inputCursorEnd: function( event ) {

            inputManagerClassTHIS.ignoreKey = true;
            var focusedElement = inputManagerClassTHIS.getFocusedElement();

            if( focusedElement ) {

                focusedElement.inputCursorEnd();

            }
        },

        inputCursorStart: function( event ) {

            inputManagerClassTHIS.ignoreKey = true;
            var focusedElement = inputManagerClassTHIS.getFocusedElement();

            if( focusedElement ) {

                focusedElement.inputCursorStart();

            }
        },

        /**
         * Create the input field desired if it exists.
         *
         * Return   TRUE    if everything gone ok
         *          FALSE   if an error occurs
         *
         * @param type                  Type of input field
         * @param inputId               Input id
         *
         * @returns {boolean}
         */
        create: function( type, inputId, orthographicView ) {

            if( !this.inputTypesEnabled.hasOwnProperty( type ) ) {

                console.error( "-- inputManager:getInputType -- The input type '" + type + "' doesn't exists!" );
                return false;

            }

            var inputFieldExists = true;

            switch( this.inputTypesEnabled[ type ] )
            {
                case this.inputTypesEnabled.text :

                    this.inputsLoaded[ inputId ] = new InputText( { 'id': inputId, 'inputManager': this, 'orthographicView': orthographicView } );
                    break;

                default:
                    console.error( "-- inputManager:getInputType -- The input type '" + type + "' doesn't exists!" );
                    inputFieldExists = false;
            }

            if( inputFieldExists ) {

                this.inputsLoaded[ inputId ].setInputManager( this );

            }


            return this.inputsLoaded[ inputId ];
        },

        getInput: function( inputId ) {

            if( !this.inputsLoaded.hasOwnProperty( inputId ) ) {

                console.error( "-- inputManager:getInput -- The input '" + inputId + "' doesn't exists!" );
                return;

            }

            return this.inputsLoaded[ inputId ];
        },

        addKeyDownValue: function( value ) {

            var focusedElement = this.getFocusedElement();

            if( false != focusedElement ) {
                focusedElement.addKeyDownValue( value );
            }

        },

        thereIsAFocusedElement: function() {

            if( this.focusedElement != '' ){
                return true;
            } else {
                return false;
            }

        },

        /**
         * Check the focused input field and look if its dirty, in that case the input needs to be re-draw
         */
        requestAnimationFrame: function() {

            var focusedInput = this.getFocusedElement();
            if( false != focusedInput && focusedInput.isDirty ) {

                focusedInput.drawInputElement();

            }

            // Show the text cursor if it is needed
            if( false != focusedInput && focusedInput.inputType == 'text' ) {

                if( focusedInput.hasCursor() && focusedInput.getHasFocus() ) {

                    this.cursorElement.blink( focusedInput );

                }

            }

            this.updateDirtyInputFields();

        },

        getInputCursor: function() {

            if( this.cursorElement === false ) {
                this.cursorElement = new InputCursor();
                this.cursorElement.setInputManager( this );
            }

            return this.cursorElement;

        },

        getFocusedElement: function() {
            var focusedElement = false;

            if( inputManagerClassTHIS.thereIsAFocusedElement() ) {
                focusedElement = inputManagerClassTHIS.inputsLoaded[ inputManagerClassTHIS.focusedElement ];

                focusedElement = typeof focusedElement == 'undefined' ? false : focusedElement
            }

            return focusedElement;

        },

        getInside3DEnviromentInputs: function() {

            var inputs = [];
            var inputLoaded = '';

            for( index in this.inputsLoaded ) {

                inputLoaded = this.inputsLoaded[ index ];
                if( inputLoaded.getOrthographicView() == false ) {
                    inputs.push( inputLoaded.getInputElement() );
                }

            }

            return inputs;

        },

        getOutside3DEnviromentInputs: function() {

            var inputs = [];
            var inputLoaded = '';

            for( index in this.inputsLoaded ) {

                inputLoaded = this.inputsLoaded[ index ];
                if( inputLoaded.getOrthographicView() == true ) {
                    inputs.push( inputLoaded );
                }

            }

            return inputs;

        },

        setFocusedElement: function( newFocusedElement ) {

            var focusedElement = this.getFocusedElement();

            if( false != focusedElement ) {

                focusedElement.setHasFocus( false );
                focusedElement.makeTextSprite();

            }

            // Setting the focused element for the vey first time

            if( typeof newFocusedElement.object == 'undefined' ) {

                // For sprite inputFields "outside" the scene
                newFocusedElement = this.inputsLoaded[ newFocusedElement.id ];
                this.focusedElement = newFocusedElement.id;
                newFocusedElement.setHasFocus( true );
                newFocusedElement.makeTextSprite();

            } else {

                newFocusedElement = this.inputsLoaded[ newFocusedElement.object.id ];
                this.focusedElement = newFocusedElement.id;
                newFocusedElement.setHasFocus( true );
                newFocusedElement.makeTextSprite();

            }

            return this;

        },

        updateOrthographicInputFieldsPositions: function() {

            var inputFields = this.getOutside3DEnviromentInputs();

            for( index in inputFields ) {

                inputFields[ index ].onWindowResizeUpdatePosition();

            }

        },

        onDocumentMouseMove: function( event ) {

            this.raycaster.onDocumentMouseMove( event );
            return this;

        },

        onDocumentMouseClick: function( event ) {

            this.raycaster.onDocumentMouseClick( event );
            return this;

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

        updateDirtyInputFields: function() {

            for( var index in this.inputsLoaded ) {

                var inputElement = this.inputsLoaded[ index ];

                if( inputElement.getIsDirty() ) {
                    inputElement.drawInputElement();
                }

            }

        }

    });

    return inputManagerClass;

});
