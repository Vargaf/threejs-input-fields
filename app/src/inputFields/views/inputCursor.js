/**
 *
 * User: Fernando Villar Perez
 * Date: 04/10/13
 * Time: 16:00
 *
 * To draw the input cursor
 */

define([ 'backbone', 'threejs' ], function( Backbone, THREE ) {

    var inputCursorClass = Backbone.View.extend({

        cursorSprite                :   '',
        canvas                      :   '',
        isDirty                     :   true,

        blinkingFrequency           :   0.5,
        blinkingLastChange          :   0,
        blinkingClock               :   '',

        positionX                   :   0,
        positionY                   :   0,
        visible                     :   false,

        initialize: function() {

            this.blinkingClock = new THREE.Clock();

        },

        drawCursor: function( inputElement ) {

//            var canvas = document.createElement('canvas');
//            canvas.width = inputElement.getInputFieldSize();
//            canvas.height = inputElement.getInputFieldSize();
//
//            var context = canvas.getContext('2d');
//            context.font = inputElement.getFontSize() + 'px ' + inputElement.getFontFamily();
//            context.textBaseline = "top";
//
//            context.fillStyle = "rgba(" + inputElement.getFontColor().r + ", " + inputElement.getFontColor().g + ", " + inputElement.getFontColor().b + ", " + inputElement.getFontColor().a + ")";
//            context.fillText( "|", 0, 0  );
//
//            var texture = new THREE.Texture(canvas)
//            texture.needsUpdate = true;
//
//            var spriteMaterial = new THREE.SpriteMaterial(
//                { map: texture, transparent: true, useScreenCoordinates: true, alignment: inputElement.getSpriteAlignment() } );
//            this.cursorSprite = new THREE.Sprite( spriteMaterial );
//            this.cursorSprite.scale.set( inputElement.getInputFieldSize(), inputElement.getInputFieldSize(), 0 );
//
//            this.moveCursor( inputElement );
//            inputElement.canvasContainer.add( this.cursorSprite );

            if( this.visible ) {
                var positionX = inputElement.getCursorPosition() - inputElement.inputPosition.x - 2;
                var positionY = inputElement.getInputTextPosition().y - inputElement.getFontSize() * 0.05;
                inputElement.context.fillText( "|", positionX, positionY  );
            }

        },

        blink: function( inputElement ) {

            var lastBlinkGap = this.blinkingLastChange + this.blinkingFrequency;

            if( lastBlinkGap < this.blinkingClock.getElapsedTime() ) {

                this.visible = !this.visible;
                this.blinkingLastChange = this.blinkingClock.getElapsedTime();

                inputElement.isDirty = false;
                inputElement.makeTextSprite( null );
                inputElement.isDirty = false;

            }
        },

        moveCursor: function( inputElement ) {

//            this.getCursorPosition( inputElement );
//            this.cursorSprite.position.set( this.positionX, this.positionY, 1000 );

        },

        getCursorPosition: function( inputElement ) {

            this.positionX = inputElement.getCursorPosition() - 2;
            this.positionY = inputElement.getInputTextPosition().y + inputElement.getInputPosition().y - inputElement.getFontSize() * 0.05;

        }

    });

    return inputCursorClass;

});

