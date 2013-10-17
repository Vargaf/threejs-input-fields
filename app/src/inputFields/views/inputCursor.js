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

        initialize: function() {

            this.blinkingClock = new THREE.Clock();

        },

        drawCursor: function( inputElement ) {

            var canvas = document.createElement('canvas');
            canvas.width = inputElement.getInputFieldSize();
            canvas.height = inputElement.getInputFieldSize();

            var context = canvas.getContext('2d');
            context.font = inputElement.getFontSize() + 'px ' + inputElement.getFontFamily();
            context.textBaseline = "top";

            context.fillStyle = "rgba(" + inputElement.getFontColor().r + ", " + inputElement.getFontColor().g + ", " + inputElement.getFontColor().b + ", " + inputElement.getFontColor().a + ")";
            context.fillText( "|", 0, 0  );

            var texture = new THREE.Texture(canvas)
            texture.needsUpdate = true;

            var spriteMaterial = new THREE.SpriteMaterial(
                { map: texture, transparent: true, useScreenCoordinates: true, alignment: inputElement.getSpriteAlignment() } );
            this.cursorSprite = new THREE.Sprite( spriteMaterial );
            this.cursorSprite.scale.set( inputElement.getInputFieldSize(), inputElement.getInputFieldSize(), 0 );

            this.moveCursor( inputElement );
            inputElement.canvasContainer.add( this.cursorSprite );

        },

        blink: function( inputElement ) {

            if( this.isDirty ) {
                this.drawCursor( inputElement );
                this.isDirty = false;
            }

            var lastBlinkGap = this.blinkingLastChange + this.blinkingFrequency;

            if( lastBlinkGap < this.blinkingClock.getElapsedTime() ) {

                this.cursorSprite.visible = !this.cursorSprite.visible;
                this.blinkingLastChange = this.blinkingClock.getElapsedTime();

            }

        },

        moveCursor: function( inputElement ) {

            this.getCursorPosition( inputElement );
            this.cursorSprite.position.set( this.positionX, this.positionY, 1000 );

        },

        getCursorPosition: function( inputElement ) {

            //this.positionX = inputElement.getTextOffsetX() + inputElement.getInputPositionX();
            this.positionX = inputElement.getCursorPosition();
            this.positionY = inputElement.getTextOffsetY() + inputElement.getInputPosition().y - inputElement.getFontSize() * 0.05;

        }

    });

    return inputCursorClass;

});

