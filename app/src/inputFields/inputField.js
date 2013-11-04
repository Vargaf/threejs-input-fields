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

        setInputPosition: function( px, py, pz) {

            this.inputPosition = { x: px, y: py, z: pz };
            return this;

        },

        getInputPosition: function() {

            return this.inputPosition;

        }

    });

    return inputFieldClass;

});