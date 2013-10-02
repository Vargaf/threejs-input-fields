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

        spriteInputFieldElement         :   '',
        isDirty                         :   true,
        size                            :   10,
        textIndex                       :   0,
        useScreenCoordinates            :   false,

        /**
         *
         * Abstract methods
         *
         */

        drawSpriteInputFieldElement: function() {

            console.error ( "There is an object that doesn't rewrites the 'drawSpriteInputFieldElement' function" );

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

            return this.spriteInputFieldElement;

        },

        setValue: function( value ) {

            this.value = value;
            return this;
        },

        /**
         *
         * Helper methods
         *
         */

        makeTextSprite: function( message, parameters ) {

            if ( parameters === undefined ) parameters = {};

            var fontface = parameters.hasOwnProperty("fontface") ?
                parameters["fontface"] : "Arial";

            var fontsize = parameters.hasOwnProperty("fontsize") ?
                parameters["fontsize"] : 18;

            var borderThickness = parameters.hasOwnProperty("borderThickness") ?
                parameters["borderThickness"] : 4;

            var borderColor = parameters.hasOwnProperty("borderColor") ?
                parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };

            var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
                parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

            var spriteAlignment = parameters.hasOwnProperty( "spriteAlignment" ) ?
                parameters[ "spriteAlignment" ] : THREE.SpriteAlignment.topLeft;

            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            context.font = "Bold " + fontsize + "px " + fontface;

            // Cut the message to fit the size
            if( ( message.length - this.textIndex ) > this.size ) {

                message = message.substring( this.textIndex, this.size );

            }

            // get size data (height depends only on font size)
            var metrics = context.measureText( message );
            var textWidth = metrics.width;

            // background color
            context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                + backgroundColor.b + "," + backgroundColor.a + ")";
            // border color
            context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
                + borderColor.b + "," + borderColor.a + ")";

            context.lineWidth = borderThickness;

            this.roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
            // 1.4 is extra height factor for text below baseline: g,j,p,q.

            // text color
            context.fillStyle = "rgba(0, 0, 0, 1.0)";

            context.fillText( message, borderThickness, fontsize + borderThickness);

            // canvas contents will be used for a texture
            var texture = new THREE.Texture(canvas)
            texture.needsUpdate = true;

            var spriteMaterial = new THREE.SpriteMaterial(
                { map: texture, useScreenCoordinates: this.useScreenCoordinates, alignment: spriteAlignment } );
            var sprite = new THREE.Sprite( spriteMaterial );
            sprite.scale.set( textWidth + ( borderThickness * 2 ), fontsize * 1.4 + borderThickness + ( borderThickness * 2 ));
            return sprite;
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

        // function for drawing rounded rectangles
        roundRect: function( ctx, x, y, w, h, r ) {
            ctx.beginPath();
            ctx.moveTo(x+r, y);
            ctx.lineTo(x+w-r, y);
            ctx.quadraticCurveTo(x+w, y, x+w, y+r);
            ctx.lineTo(x+w, y+h-r);
            ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
            ctx.lineTo(x+r, y+h);
            ctx.quadraticCurveTo(x, y+h, x, y+h-r);
            ctx.lineTo(x, y+r);
            ctx.quadraticCurveTo(x, y, x+r, y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

    });

    return inputFieldClass;

});