/**
 *
 * User: Fernando Villar Perez
 * Date: 02/10/13
 * Time: 09:30
 *
 * This is the class that manages all the inputs showed
 *
 */


define([ 'backbone', 'inputFields/views/inputText' ], function( Backbone, InputText ) {

    var inputManagerClass = Backbone.Model.extend({

        inputTypesEnabled           :   {
            'text'      :     1
        },

        inputsLoaded                :   {},

        initialize: function() {

        },

        /**
         * Create the input field desired if it exists.
         *
         * Return   TRUE    if everything gone ok
         *          FALSE   if an error occurs
         *
         * @param type      Type of input field
         * @param inputId   Input id
         *
         * @returns {boolean}
         */
        create: function( type, inputId ) {

            if( !this.inputTypesEnabled.hasOwnProperty( type ) ) {

                console.error( "-- inputManager:getInputType -- The input type '" + type + "' doesn't exists!" );
                return false;

            }

            var inputFieldExists = true;

            switch( this.inputTypesEnabled[ type ] )
            {
                case this.inputTypesEnabled.text :

                    this.inputsLoaded[ inputId ] = new InputText( { id: inputId } );
                    break;

                default:
                    console.error( "-- inputManager:getInputType -- The input type '" + type + "' doesn't exists!" );
                    inputFieldExists = false;
            }

            return inputFieldExists;
        },

        getInput: function( inputId ) {

            if( !this.inputsLoaded.hasOwnProperty( inputId ) ) {

                console.error( "-- inputManager:getInput -- The input '" + inputId + "' doesn't exists!" );
                return;

            }

            return this.inputsLoaded[ inputId ];
        }

    });

    return inputManagerClass;

});
