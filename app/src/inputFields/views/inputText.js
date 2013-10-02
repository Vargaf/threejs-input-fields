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

        },

        drawSpriteInputFieldElement: function() {

            var sprite = this.makeTextSprite( this.value,
                { fontsize: 24, borderColor: {r:255, g:0, b:0, a:1.0}, backgroundColor: {r:255, g:100, b:100, a:0.8} } );

            sprite.position.set( 100, 100, 0 );

            this.spriteInputFieldElement = sprite;

        }

    });

    return inputTextClass;

});

