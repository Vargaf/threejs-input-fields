/**
 *
 * User: Fernando Villar Perez
 * Date: 02/10/13
 * Time: 09:31
 *
 * Master class to get all the shared and minim needed functions for every each input
 *
 */

define([ 'backbone', 'threejs' ], function( Backbone, THREE ) {

    var inputFieldClass = Backbone.View.extend({

        value                           :   '',
        inputType                       :   '',
        spriteInputFieldElement         :   '',
        isDirty                         :   true,
        size                            :   10,
        useScreenCoordinates            :   false,
        canvasContainer                 :   '',
        inputPosition                   :   { x: 0, y: 0, z: 0 },
        inputManager                    :   '',

        initialize: function() {

            this.canvasContainer = this.options.canvas;

        },

        /**
         *
         * Abstract methods
         *
         */

        drawSpriteInputFieldElement: function() {

            console.error ( "-- inputField -- There is an object that doesn't rewrites the 'drawSpriteInputFieldElement' function" );

        },

        addKeyDownValue: function( value ) {

            console.error ( "-- inputField -- There is an object that doesn't rewrites the 'addKeyDownValue' function" );

        },

        hasCursor: function() {

            console.error ( "-- inputField -- There is an object that doesn't rewrites the 'hasCursor' function" );
            return false;
        },

        initializeInputTextCursorPosition: function() {

            console.error ( "-- inputField -- There is an object that doesn't rewrites the 'initializeInputCursorPosition' function" );

        },

        inputBackspace: function() {

            console.error ( "-- inputField -- There is an object that doesn't rewrites the 'inputBackspace' function" );

        },

        inputDel: function() {

            console.error ( "-- inputField -- There is an object that doesn't rewrites the 'inputDel' function" );

        },

        inputCursorStart: function() {

            console.error ( "-- inputField -- There is an object that doesn't rewrites the 'inputCursorStart' function" );

        },

        inputCursorEnd: function() {

            console.error ( "-- inputField -- There is an object that doesn't rewrites the 'inputCursorEnd' function" );

        },

        /**
         *
         * Public methods
         *
         */

        getElement: function() {

            if ( this.isDirty == true ) {
                this.drawSpriteInputFieldElement();
            }

            this.isDirty = false;
            return this.spriteInputFieldElement;

        },

        setValue: function( value ) {

            this.value = value;

            if( this.hasCursor() ) {
                this.initializeInputTextCursorPosition();
            }

            return this;
        },

        getInputType: function() {

            if( this.inputType == '' ) {
                var inputClass = typeof this;
                console.error ( "-- " + inputClass + " -- Doesn't have defined its input type." );
                return false;
            }

            return this.inputType;

        },

        setSize: function( size ) {

            this.isDirty = true;
            this.size = size;

            return this;
        },

        setUseScreenCoordinates: function( value ) {

            this.useScreenCoordinates = value;
            return this;

        },

        getUseScreenCoordinates: function() {

            return this.useScreenCoordinates;

        },

        setInputPosition: function( px, py, pz) {

            this.isDirty = true;
            this.inputPosition = { x: px, y: py, z: pz };
            return this;

        },

        getInputPosition: function() {

            return this.inputPosition;

        },

        setInputManager: function( inputManager ) {

            this.inputManager = inputManager;
            return this;

        },

        getInputManager: function() {

            return this.inputManager;

        }

    });

    return inputFieldClass;

});