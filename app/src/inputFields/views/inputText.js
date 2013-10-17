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

        fontSize                        :   18,
        fontFamily                      :   'Arial',
        fontcolor                       :   { r:0, g:0, b:0, a:1.0 },
        spriteAlignment                 :   THREE.SpriteAlignment.topLeft,
        borderSize                      :   1,
        borderColor                     :   { r:0, g:0, b:0, a:1.0 },
        backgroundColor                 :   { r:255, g:255, b:255, a:1.0 },
        borderRadius                    :   6,

        textIndex                       :   0,
        currentMessageWidth             :   0,
        inputFieldSize                  :   200,
        textOffsetX                     :   0,
        textOffsetY                     :   0,
        textPositionX                   :   0,

        cursorPosition                  :   0,
        cursorTextPosition              :   0,

        initialize: function() {

            InputFieldClass.prototype.initialize.apply(this, arguments);

            this.inputType = 'text';

            this.setCursorPosition( 0 );
        },

        /**
         *
         * Getters and Setters
         *
         */

        setFontSize: function( size ) {

            if( isNaN( size ) ) {
                console.error ( "-- inputField:setFontSize -- The size must be a number" );
                return false;
            }

            this.fontSize = size;

            return this;
        },

        getFontSize: function() {
            return this.fontSize
        },

        setFontFamily: function( value ) {

            this.fontFamily = value;
            return this;
        },

        getFontFamily: function() {
            return this.fontFamily;
        },

        setSpriteAlignment: function( alignemt ) {
            this.spriteAlignment = alignemt;
            return this;
        },

        setFontColor: function( red, green, blue, alpha ) {
            this.fontcolor = { r: red, g: green, b: blue, a: alpha };
            return this;
        },

        getFontColor: function() {
            return this.fontcolor;
        },

        getSpriteAlignment: function() {
            return this.spriteAlignment;
        },

        setBorderSize: function( size ) {
            if( isNaN( size ) ) {
                console.error ( "-- inputField:setBorderSize -- The size must be a number" );
                return false;
            }

            this.borderSize = size;
            return this;
        },

        getBorderSize: function() {
            return this.borderSize;
        },

        setBackgroundColor: function( red, green, blue, alpha ) {
            this.backgroundColor = { r: red, g: green, b: blue, a: alpha };
            return this;
        },

        getBackgroundColor: function() {
            return this.backgroundColor;
        },

        setBorderRadius: function( radius ) {
            this.borderRadius = radius;
            return this;
        },

        getBorderRadius: function() {
            return this.borderRadius;
        },

        setInputFieldSize: function( size ) {
            this.inputFieldSize = size;
            return this;
        },

        getInputFieldSize: function() {
            return this.inputFieldSize;
        },

        setTextOffsetX: function( offset ) {

            this.textOffsetX = offset + this.getBorderSize() * 2;

            return this;
        },

        getTextOffsetX: function() {

            if( this.textOffsetX == 0 ) {
                this.textOffsetX = this.getBorderSize() * 2;
            }

            return this.textOffsetX;
        },

        setTextOffsetY: function( offset ) {

            this.textOffsetY = offset + this.getBorderSize() * 2;

            return this;
        },

        getTextOffsetY: function() {

            if( this.textOffsetY == 0 ) {
                this.textOffsetY = this.getBorderSize() * 2;
            }

            return this.textOffsetY;
        },

        setCursorPosition: function( position ) {

            if( position > this.getInputPosition().x + this.getInputFieldSize() - this.getBorderSize() * 3 ) {

                position = this.getInputPosition().x + this.getInputFieldSize() - this.getBorderSize() * 3;

            } else if( position < this.getInputPosition().x + this.getBorderSize() * 2 ) {

                position = this.getInputPosition().x + this.getBorderSize() * 2;

            }

            this.cursorPosition = position;

            return this;

        },

        getCursorPosition: function() {

            return this.cursorPosition;

        },

        setCursorTextPosition: function( position ) {

            this.cursorTextPosition = position;

            return this;

        },

        getCursorTextPosition: function() {

            return this.cursorTextPosition;

        },

        setTextPositionX: function( position_x ) {
            this.textPositionX = position_x;

            return this;
        },

        getTextPositionX: function() {

            if( this.textPositionX == 0 ) {
                return this.getTextOffsetX();
            }

            return this.textPositionX;
        },

        /**
         *
         * Abstract methods
         *
         */

        drawSpriteInputFieldElement: function() {

            var sprite = this.makeTextSprite( this.value );

            sprite.position.set( this.getInputPosition().x, this.getInputPosition().y, this.getInputPosition().z );
            sprite.id = this.id;

            this.spriteInputFieldElement = sprite;

        },

        addKeyDownValue: function( value ) {

            this.value += value;
            this.cursorTextPosition++;
            this.isDirty = true;
            return this;

        },

        hasCursor: function() {
            return true;
        },

        initializeInputTextCursorPosition: function() {

            this.cursorTextPosition = this.value.length;

        },

        calculateInputCursorPosition: function( context, message ) {

            var tmpMessage = message.substring( 0, this.getCursorTextPosition() );
            var position_x = context.measureText( tmpMessage ).width + this.getTextOffsetX() + this.getInputPosition().x;
            this.setCursorPosition( position_x );

        },

        /**
         *
         * Object methods
         *
         */
        makeTextSprite: function( message ) {

            // Remove the old sprite value if there was any
            delete( this.spriteInputFieldElement );

            var borderThickness = this.getBorderSize();

            var canvas = document.createElement('canvas');
            canvas.width = this.getInputFieldSize();
            canvas.height = this.getInputFieldSize();

            var context = canvas.getContext('2d');
            context.font = this.getFontSize() + 'px ' + this.getFontFamily();
            context.textBaseline = "top";

            this.roundRect( context, borderThickness / 2, borderThickness, this.getInputFieldSize() - borderThickness / 2 - 1, this.getFontSize() + borderThickness * 2, this.getBorderRadius() );
            this.setInputTextValue( context, message );

            var texture = new THREE.Texture(canvas)
            texture.needsUpdate = true;

            var spriteMaterial = new THREE.SpriteMaterial(
                { map: texture, transparent: true, useScreenCoordinates: true, alignment: this.getSpriteAlignment() } );
            var sprite = new THREE.Sprite( spriteMaterial );
            sprite.scale.set( this.getInputFieldSize(), this.getInputFieldSize(), 0 );
            return sprite;
        },

        /**
         * function for drawing rounded rectangles
         *
         * @param ctx   Context
         * @param x     x start position
         * @param y     y start position
         * @param w     width
         * @param h     height
         * @param r     radius
         */
        roundRect: function( ctx, x, y, w, h, r ) {

            // background color
            ctx.fillStyle   = "rgba(" + this.backgroundColor.r + "," + this.backgroundColor.g + ","
                + this.backgroundColor.b + "," + this.backgroundColor.a + ")";
            // border color
            ctx.strokeStyle = "rgba(" + this.borderColor.r + "," + this.borderColor.g + ","
                + this.borderColor.b + "," + this.borderColor.a + ")";
            ctx.lineWidth = this.getBorderSize();

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
        },

        setInputTextValue: function( context, message ) {

            this.displaceInputValue( context, message );
            this.calculateInputCursorPosition( context, message );

            context.fillStyle = "rgba(" + this.fontcolor.r + ", " + this.fontcolor.g + ", " + this.fontcolor.b + ", " + this.fontcolor.a + ")";
            context.fillText( message, this.getTextPositionX(), this.getTextOffsetY() );
        },

        displaceInputValue: function( context, message ) {

            var textWidth = context.measureText( message ).width + this.getBorderSize() * 2;

            if( textWidth > this.getInputFieldSize() ) {
                this.setTextPositionX( this.getInputFieldSize() - textWidth );
            }

        }


    });

    return inputTextClass;

});

