/**
 *
 * User: Fernando Villar Perez
 * Date: 02/10/13
 * Time: 09:57
 *
 * Input text type field
 *
 */

define([ 'inputFields/inputField' ], function( InputFieldClass ) {

    var inputTextClass = InputFieldClass.extend({

        initialize: function() {

            InputFieldClass.prototype.initialize.apply(this, arguments);

            this.inputType = 'text';

        },

        drawSpriteInputFieldElement: function() {

            var sprite = this.makeTextSprite( this.value,
                { fontsize: 24, borderColor: {r:255, g:0, b:0, a:1.0}, backgroundColor: {r:255, g:100, b:100, a:0.8} } );

            sprite.position.set( 100, 100, 0 );
            sprite.id = this.id;

            this.spriteInputFieldElement = sprite;

        },

        addKeyDownValue: function( value ) {

            this.value += value;
            this.isDirty = true;
            return this;

        }

    });

    return inputTextClass;

});

