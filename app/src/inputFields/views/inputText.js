/**
 *
 * User: Fernando Villar Perez
 * Date: 02/10/13
 * Time: 09:57
 *
 * Input text type field
 *
 */

define([ '../inputField' ], function( InputFieldClass ) {

    var inputTextClass = InputFieldClass.extend({

        fontSize                        :   18,
        fontFamily                      :   'Arial',
        fontColor                       :   { r:0, g:0, b:0, a:1.0 },
        spriteAlignment                 :   '', //THREE.SpriteAlignment.topLeft,
        borderSize                      :   1,
        borderColor                     :   { r:0, g:0, b:0, a:1.0 },
        backgroundColor                 :   { r:255, g:255, b:255, a:1.0 },
        borderRadius                    :   6,

        borderColorReadOnly             :   { r:153, g:153, b:153, a:1.0 },
        fontColorReadOnly               :   { r:102, g:102, b:102, a:1.0 },

        textIndex                       :   0,
        currentMessageWidth             :   0,

        cursorPosition                  :   0,
        cursorTextPosition              :   0,

        // To know where the text is as an offset of the input field position
        inputTextPosition               :   { x: 0, y: 0, z: 0 },

        inputTextBorderOffset           :   2,
        inputTextBorderOffsetFactor     :   2,

        context                         :   '',
        canvas                          :   '',

        inputCanvasId                   :   '',
        inside3DSpaceCollisionDetector  :   '',
        readOnly                        :   false,

        initialize: function() {

            InputFieldClass.prototype.initialize.apply( this, arguments );

            this.inputType = 'text';

            this.getInputCursor().setCursorPosition( 0 );
            this.setInputTextPosition( 0, 0, 0 );

            var canvas = document.createElement('canvas');

            var context = canvas.getContext('2d');
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

        setCursorPosition: function( cursorPosition ) {

            this.cursorPosition = cursorPosition;
            return this;

        },

        setCursorTextPosition: function( cursorTextPosition ) {

            this.cursorTextPosition = cursorTextPosition;
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

        getCursorPosition: function() {

            return this.cursorPosition;

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

            inputTextPosition.x = this.inputTextPosition.x + this.getBorderOffset();
            inputTextPosition.y = this.inputTextPosition.y + this.getBorderOffset();
            inputTextPosition.z = this.inputTextPosition.z;

            return inputTextPosition;

        },

        getInputValue: function() {
            return this.value;
        },

        setValue: function( value ) {

            this.isDirty = true;
            this.value = value;
            this.cursorTextPosition = value.length;
            this.initializeInputTextCursorPosition();

            return this;
        },

        getInputCursor: function() {

            return this.getInputManager().getInputCursor();

        },

        setReadOnly: function( readOnly ) {

            this.readOnly = readOnly;
            return this;

        },

        getReadOnly: function() {

            return this.readOnly;

        },

        /**
         *
         * Abstract methods
         *
         */

        drawInputElement: function() {

            var inputElement = this.makeTextSprite( this.value );

            if( inputElement !== false ) {
                inputElement.id = this.id;

                this.inputElement = inputElement;

            }

            this.isDirty = false;

        },

        addKeyDownValue: function( value ) {

            if( !this.getReadOnly() ) {

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
            }

            return this;

        },

        hasCursor: function() {
            return true;
        },

        initializeInputTextCursorPosition: function() {

            this.getInputCursorPositionXCoordinate( this.cursorTextPosition, this.value );

        },

        inputBackspace: function() {

            if( !this.getReadOnly() ) {
                var value = this.getInputValue();
                var message = value.substring( 0, this.getCursorTextPosition() - 1 );
                message += value.substring( this.getCursorTextPosition(), this.getCursorTextPosition().length );
                this.value = message;
                this.cursorTextPosition--;
                this.isDirty = true;
                this.makeTextSprite();
                this.isDirty = false;
            }

        },

        inputDel: function() {

            if( !this.getReadOnly() ) {
                var value = this.getInputValue();
                var message = value.substring( 0, this.getCursorTextPosition() );
                message += value.substring( this.getCursorTextPosition() + 1, this.getCursorTextPosition().length );
                this.value = message;
                this.isDirty = true;
                this.makeTextSprite();
                this.isDirty = false;
            }

        },

        inputCursorStart: function() {

            this.cursorTextPosition = 0;
            this.isDirty = true;
            this.makeTextSprite();
            this.isDirty = false;

        },

        inputCursorEnd: function() {

            this.cursorTextPosition = this.getInputValue().length;
            this.isDirty = true;
            this.makeTextSprite();
            this.isDirty = false;

        },

        /**
         *
         * Object methods
         *
         */
        incCursorTextPosition: function( incVal ) {

            if( typeof incVal === 'undefined') {

                this.cursorTextPosition++;

            } else {

                this.cursorTextPosition += incVal;

            }
        },

        decCursorTextPosition: function( decVal ) {

            if( typeof decVal === 'undefined') {

                this.cursorTextPosition--;

            } else {

                this.cursorTextPosition -= decVal;

            }
        },

        makeTextSprite: function( message ) {

            if( null == message ) {

                message = this.getInputValue();

            }

            this.resetBorderOffset();
            var borderThickness = this.getBorderSize();

            var context = this.context;
            var canvas = this.canvas;

            var realInputHeight = this.getFontSize() + this.getBorderOffset() * 2 + borderThickness;

            canvas.width = this.getInputFieldSize();
            canvas.height = realInputHeight;

            context.font = this.getFontSize() + 'px ' + this.getFontFamily();
            context.textBaseline = "top";

            if( this.isDirty ) {
                this.displaceInputValue();

                if( this.getHasFocus() ) {
                    this.getInputCursor().setCursorTextPosition( this.getCursorTextPosition() );
                }
            }

            this.roundRect( context, borderThickness / 2, borderThickness / 2, this.getInputFieldSize() - borderThickness, realInputHeight - borderThickness, this.getBorderRadius() );
            this.setInputTextValue( context, message );

            var texture = new THREE.Texture(canvas)
            texture.needsUpdate = true;

            var inputElement = false;

            if( this.inputCanvasId === '' ) {

                if( this.getOrthographicView() ) {

                    var inputElementMaterial = new THREE.SpriteMaterial(
                        { map: texture, transparent: true } );

                    inputElement = new THREE.Sprite( inputElementMaterial );

                    var random = Math.round( Math.random() * 100000000 );
                    this.inputCanvasId = 'inputText-' + ( random );
                    inputElement.name = this.inputCanvasId;
                    inputElement.scale.set( this.getInputFieldSize(), realInputHeight, 0 );
                    inputElement.position.set( this.getInputPosition().x, this.getInputPosition().y, this.getInputPosition().z );

                } else {

                    var random = Math.round( Math.random() * 100000000 );
                    this.inputCanvasId = 'inputText-' + ( random );
                    inputElement = new THREE.Mesh(

                        new THREE.PlaneGeometry( this.getInputFieldSize(), realInputHeight ),
                        new THREE.MeshBasicMaterial({
                            map: texture,
                            side: THREE.DoubleSide,
                            transparent: true
                        }));

                    inputElement.position.set( this.getInputPosition().x + this.getInputFieldSize() / 2, this.getInputPosition().y - realInputHeight / 2, this.getInputPosition().z );
                }


            } else {

                    this.inputElement.material.map = texture;

            }

            return inputElement;
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

            if( !this.getReadOnly() ) {
                ctx.strokeStyle = "rgba(" + this.borderColor.r + "," + this.borderColor.g + ","
                    + this.borderColor.b + "," + this.borderColor.a + ")";
            } else {
                ctx.strokeStyle = "rgba(" + this.borderColorReadOnly.r + "," + this.borderColorReadOnly.g + ","
                    + this.borderColorReadOnly.b + "," + this.borderColorReadOnly.a + ")";
            }

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
            if( !this.getReadOnly() ) {
                context.fillStyle = "rgba(" + this.fontColor.r + ", " + this.fontColor.g + ", " + this.fontColor.b + ", " + this.fontColor.a + ")";
            } else {
                context.fillStyle = "rgba(" + this.fontColorReadOnly.r + ", " + this.fontColorReadOnly.g + ", " + this.fontColorReadOnly.b + ", " + this.fontColorReadOnly.a + ")";
            }
            context.fillText( message, this.getInputTextPosition().x, this.getInputTextPosition().y );

            if( this.getHasFocus() ) {

                this.getInputCursor().drawCursor( this );

            }
        },

        displaceInputValue: function() {

            var message = this.getInputValue();
            var tmpMessage = message.substring( 0, this.getCursorTextPosition() );
            var textWidth = this.context.measureText( tmpMessage ).width + this.getBorderOffset() * 3;
            var textMovedWith = textWidth + this.inputTextPosition.x;

            if( textMovedWith >= this.getInputFieldSize() ) { // Displace the text to the left

                this.setInputTextPositionX( this.getInputFieldSize() - textWidth );

            } else if( textMovedWith < ( this.getBorderOffset() * 2 ) ) { // Displace the text to the right

                this.setInputTextPositionX( this.inputTextPosition.x + Math.abs( textMovedWith ) + this.getBorderOffset() * 3 );

            } else if( textMovedWith > ( this.getBorderOffset() * 2 ) ) { // Set the max right displacement position of text to the start of the input field

                this.setInputTextPositionX( 0 );

            }

        }

    });

    return inputTextClass;

});

