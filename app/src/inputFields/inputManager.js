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
        'inputFields/views/inputText',
        'inputFields/views/inputCursor',
        'mousetrap'
    ],
    function(
        Backbone,
        THREE,
        InputText,
        InputCursor,
        Mousetrap
        ) {

    inputManagerClass = Backbone.Model.extend({

        inputTypesEnabled           :   {
            'text'      :     1
        },

        inputsLoaded                :   {},
        focusedElement              :   '',
        isShiftPress                :   false,
        isCapsLocked                :   false,
        ignoreKey                   :   false,
        cursorElement               :   false,

        initialize: function() {

            inputManagerClassTHIS = this;

            $( document ).keypress(function( event ) {

                if( !inputManagerClassTHIS.ignoreKey ) {
                    var char = String.fromCharCode( event.which );

                    if( inputManagerClassTHIS.isShifted( event ) ) {
                        char = char.toLocaleUpperCase();
                    } else {
                        char = char.toLocaleLowerCase();
                    }

                    inputManagerClassTHIS.addKeyDownValue( char );
                } else {
                    inputManagerClassTHIS.ignoreKey = false;
                }

            });

            Mousetrap.bind( 'shift',      inputManagerClassTHIS.shiftPress, 'keypress' );
            Mousetrap.bind( 'shift',      inputManagerClassTHIS.shiftRelease, 'keyup' );



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

        /**
         * Create the input field desired if it exists.
         *
         * Return   TRUE    if everything gone ok
         *          FALSE   if an error occurs
         *
         * @param type                  Type of input field
         * @param inputId               Input id
         * @param canvasContainer       Canvas on where teh input is drawn
         *
         * @returns {boolean}
         */
        create: function( type, inputId, canvasContainer ) {

            if( !this.inputTypesEnabled.hasOwnProperty( type ) ) {

                console.error( "-- inputManager:getInputType -- The input type '" + type + "' doesn't exists!" );
                return false;

            }

            var inputFieldExists = true;

            switch( this.inputTypesEnabled[ type ] )
            {
                case this.inputTypesEnabled.text :

                    this.inputsLoaded[ inputId ] = new InputText( { id: inputId, canvas: canvasContainer } );
                    break;

                default:
                    console.error( "-- inputManager:getInputType -- The input type '" + type + "' doesn't exists!" );
                    inputFieldExists = false;
            }

            this.focusedElement = inputId;

            console.log( this.inputsLoaded[ inputId ] );

            return inputFieldExists;
        },

        getInput: function( inputId ) {

            if( !this.inputsLoaded.hasOwnProperty( inputId ) ) {

                console.error( "-- inputManager:getInput -- The input '" + inputId + "' doesn't exists!" );
                return;

            }

            return this.inputsLoaded[ inputId ];
        },

        addKeyDownValue: function( value ) {

            this.inputsLoaded[ this.focusedElement ].addKeyDownValue( value );

        },

        /**
         * Check the focused input field and look if its dirty, in that case the input needs to be re-draw
         */
        requestAnimationFrame: function() {

            var focusedInput = this.inputsLoaded[ this.focusedElement ];
            if( focusedInput.isDirty ) {

                focusedInput.canvasContainer.refreshElement( focusedInput.getElement(), focusedInput.id );

                if( focusedInput.hasCursor() ) {

                    this.cursorElement.moveCursor( focusedInput );

                }
            }

            // Show the text cursor if it is needed
            focusedInput = this.inputsLoaded[ this.focusedElement ];
            if( focusedInput.inputType == 'text' ) {

                if( focusedInput.hasCursor() ) {

                    if( this.cursorElement === false ) {
                        this.cursorElement = new InputCursor();
                    }

                    this.cursorElement.blink( focusedInput );

                }

            }

        }

    });

    return inputManagerClass;

});
