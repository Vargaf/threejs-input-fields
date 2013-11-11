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
        fontColor                       :   { r:0, g:0, b:0, a:1.0 },
        spriteAlignment                 :   THREE.SpriteAlignment.topLeft,
        borderSize                      :   1,
        borderColor                     :   { r:0, g:0, b:0, a:1.0 },
        backgroundColor                 :   { r:255, g:255, b:255, a:1.0 },
        borderRadius                    :   6,

        textIndex                       :   0,
        currentMessageWidth             :   0,
        inputFieldSize                  :   200,

        cursorPosition                  :   0,
        cursorTextPosition              :   0,

        // To know where the text is as an offset of the input field position
        inputTextPosition               :   { x: 0, y: 0, z: 0 },

        inputTextBorderOffset           :   2,
        inputTextBorderOffsetFactor     :   2,

        context                         :   '',
        canvas                          :   '',

        inputCanvasId                   :   '',

        initialize: function() {

            InputFieldClass.prototype.initialize.apply(this, arguments);

            this.inputType = 'text';

            this.setCursorPosition( 0 );

            var canvas = document.createElement('canvas');
            canvas.width = this.getInputFieldSize();
            canvas.height = this.getInputFieldSize();

            var context = canvas.getContext('2d');
            context.font = this.getFontSize() + 'px ' + this.getFontFamily();
            context.textBaseline = "top";

            this.context = context;
            this.canvas = canvas;
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
            this.fontColor = { r: red, g: green, b: blue, a: alpha };
            return this;
        },

        getFontColor: function() {
            return this.fontColor;
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
            this.resetBorderOffset();
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

        setInputTextBorderOffsetFactor: function( factor ) {

            this.inputTextBorderOffsetFactor = factor;

            return this;
        },

        getInputTextBorderOffsetFactor: function() {

            return this.inputTextBorderOffsetFactor;
        },

        resetBorderOffset: function() {

            this.inputTextBorderOffset = this.getBorderSize() * this.getInputTextBorderOffsetFactor();

            return this;
        },

        getBorderOffset: function() {

            return this.inputTextBorderOffset;

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

        /**
         * Set the cursor position on the correct x-coordinate
         *
         * @param position
         * @returns {inputTextClass}
         */
        setCursorTextPosition: function( position ) {

            if( position < 0 ) {
                position = 0;
            } else if( position > this.getInputValue().length ) {
                position = this.getInputValue().length;
            }

            this.cursorTextPosition = position;

            var needsToBeCleaned = !this.isDirty;

            var xCoordinatePosition = this.getInputCursorPositionXCoordinate( position, this.getInputValue() );
            var max = this.getInputPosition().x + this.getInputFieldSize() - this.getBorderSize() * 3;
            var min = this.getInputPosition().x + this.getBorderSize() * 2;

            if( xCoordinatePosition >= max ) {

                // Displace the text to show the next two or one characters
                if( ( position + 2 ) <= this.getInputValue().length ) {
                    this.cursorTextPosition += 2;
                } else if( ( position + 1 ) <= this.getInputValue().length ) {
                    this.cursorTextPosition += 1;
                }

                this.displaceInputValue();

                xCoordinatePosition = this.getInputCursorPositionXCoordinate( position, this.getInputValue() );

            } else if( xCoordinatePosition <= min ) {

                // Displace the text to show the preview two or one characters
                if( ( position - 2 ) >= 0 ) {
                    this.cursorTextPosition -= 2;
                } else if( ( position - 1 ) >= 0 ) {
                    this.cursorTextPosition -= 1;
                }

                this.displaceInputValue();

                xCoordinatePosition = this.getInputCursorPositionXCoordinate( position, this.getInputValue() );
            }

            // Since we may have displaced the cursor to show more characters is convenient to save the real cursor position again
            this.cursorTextPosition = position;
            this.cursorPosition = xCoordinatePosition;

            if( needsToBeCleaned ) {
                this.isDirty = true;
                this.makeTextSprite( this.getInputValue() );
                this.isDirty = false;
            }

            return this;

        },

        getInputCursorPositionXCoordinate: function( position, message ) {

            var tmpMessage = message.substring( 0, position );
            var position_x = this.context.measureText( tmpMessage ).width + this.getInputTextPosition().x + this.getInputPosition().x;

            return position_x;

        },

        getCursorTextPosition: function() {

            return this.cursorTextPosition;

        },

        setInputTextPosition: function( xp, yp, zp ) {

            this.inputTextPosition = { x: xp, y: yp, z: zp };

            return this;
        },

        setInputTextPositionX: function( xp ) {

            this.inputTextPosition.x = xp;

            return this;
        },

        setInputTextPositionY: function( yp ) {

            this.inputTextPosition.y = yp;

            return this;
        },

        setInputTextPositionZ: function( zp ) {

            this.inputTextPosition.z = zp;

            return this;
        },

        getInputTextPosition: function() {

            var inputTextPosition = { x: 0, y: 0, z: 0 };

            inputTextPosition.x = this.inputTextPosition.x + this.getBorderSize() * 2;
            inputTextPosition.y = this.inputTextPosition.y + this.getBorderSize() * 2;
            inputTextPosition.z = this.inputTextPosition.z;

            return inputTextPosition;

        },

        getInputValue: function() {
            return this.value;
        },

        setValue: function( value ) {

            this.value = value;
            this.cursorTextPosition = value.length;

            return this;
        },

        /**
         *
         * Abstract methods
         *
         */

        drawSpriteInputFieldElement: function() {

            var sprite = this.makeTextSprite( this.value );

            if( sprite !== false ) {
                sprite.position.set( this.getInputPosition().x, this.getInputPosition().y, this.getInputPosition().z );
                sprite.id = this.id;

                this.spriteInputFieldElement = sprite;
            }

            this.isDirty = false;

        },

        addKeyDownValue: function( value ) {

            this.isDirty = true;

            if( this.getCursorTextPosition() != this.getInputValue().length ) {
                this.value =
                    this.value.substring( 0, this.getCursorTextPosition() ) +
                    value +
                    this.value.substring( this.getCursorTextPosition(), this.getInputValue().length );
            } else {
                this.value += value;
            }

            this.incCursorTextPosition();

            return this;

        },

        hasCursor: function() {
            return true;
        },

        initializeInputTextCursorPosition: function() {

            this.getInputCursorPositionXCoordinate( this.cursorTextPosition, this.value );

        },

        inputBackspace: function() {

            var value = this.getInputValue();
            var message = value.substring( 0, this.getCursorTextPosition() - 1 );
            message += value.substring( this.getCursorTextPosition(), this.getCursorTextPosition().length );
            this.value = message;
            this.cursorTextPosition--;
            this.isDirty = true;
            this.makeTextSprite();
            this.isDirty = false;

        },

        inputDel: function() {

            var value = this.getInputValue();
            var message = value.substring( 0, this.getCursorTextPosition() );
            message += value.substring( this.getCursorTextPosition() + 1, this.getCursorTextPosition().length );
            this.value = message;
            this.isDirty = true;
            this.makeTextSprite();
            this.isDirty = false;

        },

        /**
         *
         * Object methods
         *
         */
        incCursorTextPosition: function() {
            this.cursorTextPosition++;
        },

        makeTextSprite: function( message ) {

            if( null == message ) {

                message = this.getInputValue();

            }

            if( this.isDirty ) {
                this.displaceInputValue();
                this.setCursorTextPosition( this.getCursorTextPosition() );
            }

            var borderThickness = this.getBorderSize();

            var context = this.context;
            var canvas = this.canvas;

            this.roundRect( context, borderThickness / 2, borderThickness, this.getInputFieldSize() - borderThickness / 2 - 1, this.getFontSize() + borderThickness * 2, this.getBorderRadius() );
            this.setInputTextValue( context, message );

            var texture = new THREE.Texture(canvas)
            texture.needsUpdate = true;

            var sprite = false;

            if( this.inputCanvasId === '' ) {

                var spriteMaterial = new THREE.SpriteMaterial(
                    { map: texture, transparent: true, useScreenCoordinates: this.getUseScreenCoordinates(), alignment: this.getSpriteAlignment() } );

                sprite = new THREE.Sprite( spriteMaterial );

                this.inputCanvasId = 'inputText-' + ( Math.round( Math.random() * 100000000 ) );
                sprite.name = this.inputCanvasId;
                sprite.scale.set( this.getInputFieldSize(), this.getInputFieldSize(), 0 );

            } else {

                this.spriteInputFieldElement.material.map = texture;

            }

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
            context.fillStyle = "rgba(" + this.fontColor.r + ", " + this.fontColor.g + ", " + this.fontColor.b + ", " + this.fontColor.a + ")";
            context.fillText( message, this.getInputTextPosition().x, this.getInputTextPosition().y );
            this.getInputManager().getInputCursor().drawCursor( this );
        },

        displaceInputValue: function() {

            var message = this.getInputValue();
            var tmpMessage = message.substring( 0, this.getCursorTextPosition() );
            var textWidth = this.context.measureText( tmpMessage ).width + this.getBorderOffset() * 2;
            var textMovedWith = textWidth + this.inputTextPosition.x;

            if( textMovedWith > this.getInputFieldSize() ) {

                this.setInputTextPositionX( this.getInputFieldSize() - textWidth );

            } else if(textMovedWith < ( this.getBorderOffset() * 2 ) ) {

                this.setInputTextPositionX( this.inputTextPosition.x + Math.abs( textMovedWith ) + this.getBorderOffset() * 2);

            }

        }

    });

    return inputTextClass;

});

