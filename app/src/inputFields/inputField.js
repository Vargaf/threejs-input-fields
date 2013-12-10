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
        isDirty                         :   true,
        size                            :   10,
        canvasContainer                 :   '',
        inputPosition                   :   { x: 0, y: 0, z: 0 },
        inputRealPosition               :   '',
        inputManager                    :   '',
        inputElement                    :   '',
        hasFocus                        :   false,
        position                        :   'tl',
        orthographicView                :   false,
        inputFieldSize                  :   200,

        onBlurParameters                :   { owner: '', callback: '', parameters: '' },
        onFocusParameters               :   { owner: '', callback: '', parameters: '' },

        initialize: function( arguments ) {

            this.setInputManager( arguments.inputManager );
            this.setOrthographicView( arguments.orthographicView );

        },

        /**
         *
         * Abstract methods
         *
         */

        drawInputElement: function() {

            console.error ( "-- inputField -- There is an object that doesn't rewrites the 'drawInputElement' function" );

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

        inputBackspace: function() {

            console.error ( "-- inputField -- There is an object that doesn't rewrites the 'inputBackspace' function" );

        },

        inputDel: function() {

            console.error ( "-- inputField -- There is an object that doesn't rewrites the 'inputDel' function" );

        },

        inputCursorStart: function() {

            console.error ( "-- inputField -- There is an object that doesn't rewrites the 'inputCursorStart' function" );

        },

        inputCursorEnd: function() {

            console.error ( "-- inputField -- There is an object that doesn't rewrites the 'inputCursorEnd' function" );

        },

        setInputFieldSize: function( size ) {

            console.error ( "-- inputField -- There is an object that doesn't rewrites the 'setInputFieldSize' function" );

        },

        getInputFieldSize: function() {

            console.error ( "-- inputField -- There is an object that doesn't rewrites the 'getInputFieldSize' function" );

        },

        /**
         *
         * Public methods
         *
         */

        getElement: function() {

            if ( this.isDirty == true ) {
                this.drawInputElement();
            }

            this.isDirty = false;
            return this.inputElement;

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

        setInputPosition: function( px, py, pz, position ) {

            this.isDirty = true;
            this.inputPosition = { x: px, y: py, z: pz };

            this.setPosition( position );
            this.inputRealPosition = false;

            return this;

        },

        getInputPosition: function() {

            if( this.inputRealPosition == false ) {
                this.inputRealPosition = this.calculateOfsetCoordinatesByPosition();
            }

            return this.inputRealPosition;

        },

        setCanvasContainer: function( canvas ) {

            if( typeof canvas === 'undefined' ) {
                console.error( 'The canvas is needed' );
            } else {
                this.canvasContainer = canvas;
            }

            return this;
        },

        getCanvasContainer: function() {

            return this.canvasContainer;

        },

        setInputManager: function( inputManager ) {

            if( typeof inputManager === 'undefined' ) {
                console.error( 'The inputManager is needed' );
            } else {
                this.inputManager = inputManager;
            }
            return this;

        },

        getInputManager: function() {

            return this.inputManager;

        },

        setOrthographicView: function( orthographicView ) {

            if( typeof orthographicView === 'undefined' ) {
                this.orthographicView = false;
            } else {
                this.orthographicView = orthographicView;
            }
            return this;

        },

        getOrthographicView: function() {

            return this.orthographicView;

        },

        getIsDirty: function() {

            return this.isDirty;

        },

        setIsDirty: function( isDirty ) {

            this.isDirty = isDirty;
            return this;

        },

        setInputElement: function( inputElement ) {

            this.inputElement = inputElement;
            return this;

        },

        getInputElement: function() {

            return this.inputElement;

        },

        setHasFocus: function( value ) {

            this.isDirty = true;

            if( value == true && this.hasCursor() ) {
                this.getInputCursor().setVisible( true );
            }

            if( this.hasFocus == true && value == false ) {
                this.triggerEvent( 'blur' );
            } else if( this.hasFocus == false && value == true ) {
                this.triggerEvent( 'focus' );
            }

            this.hasFocus = value;
            this.drawInputElement();
            this.isDirty = false;

            return this;

        },

        getHasFocus: function() {

            return this.hasFocus;

        },

        setPosition: function( position ) {

            if( this.orthographicView ) {

                var inputManager = this.getInputManager();

                var positionExists = position == inputManager.POSITION_TOP_LEFT;
                positionExists = positionExists || position == inputManager.POSITION_TOP_RIGHT;
                positionExists = positionExists || position == inputManager.POSITION_BOTTOM_LEFT;
                positionExists = positionExists || position == inputManager.POSITION_BOTTOM_RIGHT;
                positionExists = positionExists || position == inputManager.POSITION_CENTER;
                positionExists = positionExists || position == inputManager.POSITION_TOP_CENTER;
                positionExists = positionExists || position == inputManager.POSITION_RIGHT_CENTER;
                positionExists = positionExists || position == inputManager.POSITION_BOTTOM_CENTER;
                positionExists = positionExists || position == inputManager.POSITION_LEFT_CENTER;


                if( !positionExists ) {

                    console.error( 'The given position for the input field does not exists.' );

                } else {

                    this.position = position;

                }

            }

            return this;

        },

        getPosition: function() {

            return this.position;

        },

        getCanvasWidth: function() {

            return this.getInputManager().getCanvasWidth();

        },

        getCanvasHeight: function() {

            return this.getInputManager().getCanvasHeight();

        },

        /**
         * Calculate the input displacement to set it on the correct position desired by the corners and center position
         *
         * @returns { x, y, z }
         */
        calculateOfsetCoordinatesByPosition: function() {

            var offset = { x: this.inputPosition.x, y: this.inputPosition.y, z: this.inputPosition.z };

            if( this.orthographicView ) {

                var inputManager = this.getInputManager();

                var offsetXDirection = 1;
                var offsetYDirection = 1;

                if( this.position == inputManager.POSITION_BOTTOM_RIGHT ||
                    this.position == inputManager.POSITION_TOP_RIGHT ||
                    this.position == inputManager.POSITION_RIGHT_CENTER ) {
                    offsetXDirection = -1;
                }
                if( this.position == inputManager.POSITION_BOTTOM_LEFT ||
                    this.position == inputManager.POSITION_BOTTOM_RIGHT ||
                    this.position == inputManager.POSITION_BOTTOM_CENTER ) {
                    offsetYDirection = -1;
                }

                if( this.position == inputManager.POSITION_TOP_LEFT ||
                    this.position == inputManager.POSITION_TOP_RIGHT ||
                    this.position == inputManager.POSITION_TOP_CENTER ) {
                    // Invert the position on the Y coordinates to draw the input on a consistent way
                    offset.y = offset.y * -1;
                    offset.y = ( offsetYDirection * offset.y ) + ( this.getCanvasHeight() - this.canvas.height / 2 );
                }

                if( this.position == inputManager.POSITION_BOTTOM_LEFT ||
                    this.position == inputManager.POSITION_BOTTOM_RIGHT ||
                    this.position == inputManager.POSITION_BOTTOM_CENTER ) {
                    offset.y = ( offsetYDirection * offset.y ) + this.canvas.height / 2;
                }

                if( this.position == inputManager.POSITION_TOP_LEFT ||
                    this.position == inputManager.POSITION_BOTTOM_LEFT ||
                    this.position == inputManager.POSITION_LEFT_CENTER ) {
                    offset.x = ( offsetXDirection * offset.x ) + this.canvas.width / 2;
                }

                if( this.position == inputManager.POSITION_TOP_RIGHT ||
                    this.position == inputManager.POSITION_BOTTOM_RIGHT ||
                    this.position == inputManager.POSITION_RIGHT_CENTER ) {
                    // Invert the position on the X coordinates to draw the input on a consistent way
                    offset.x = offset.x * -1;
                    offset.x = ( offsetXDirection * offset.x ) + ( this.getCanvasWidth() - this.canvas.width / 2 );
                }

                if( this.position == inputManager.POSITION_CENTER ) {
                    offset.x +=  this.getCanvasWidth() * 0.5;
                    offset.y +=  this.getCanvasHeight() * 0.5;
                }

                if( this.position == inputManager.POSITION_TOP_CENTER ||
                    this.position == inputManager.POSITION_BOTTOM_CENTER ) {
                    offset.x +=  this.getCanvasWidth() * 0.5;
                }
                if( this.position == inputManager.POSITION_RIGHT_CENTER ||
                    this.position == inputManager.POSITION_LEFT_CENTER ) {
                    offset.y +=  this.getCanvasHeight() * 0.5;
                }

            }

            return offset;
        },

        onWindowResizeUpdatePosition: function() {

            this.inputRealPosition = false
            var position = this.getInputPosition();
            var element = this.getElement();

            element.position.set( position.x, position.y, position.z );

        },

        onBlur: function( callback, parameters ) {

            if( typeof callback !== 'function' || typeof parameters === 'undefined' ) {
                console.error( 'The onBlur parameters must be declared' );
            } else {

                var parameters = { owner: this, callback: callback, parameters: parameters };

                this.onBlurParameters = parameters;
            }

            return this;
        },

        onFocus: function( callback, parameters ) {

            if( typeof callback !== 'function' || typeof parameters === 'undefined' ) {
                console.error( 'The onFocus parameters must be declared' );
            } else {

                var parameters = { owner: this, callback: callback, parameters: parameters };

                this.onFocusParameters = parameters;
            }

            return this;

        },

        triggerEvent: function( event ) {

            switch( event.toLowerCase() )
            {
                case 'blur':
                    if( typeof this.onBlurParameters.callback == 'function')
                        this.onBlurParameters.callback( { object: this.onBlurParameters.owner, parameters: this.onBlurParameters.parameters } );
                    break;

                case 'focus':
                    if( typeof this.onFocusParameters.callback == 'function')
                        this.onFocusParameters.callback( { object: this.onFocusParameters.owner, parameters: this.onFocusParameters.parameters } );
                    break;

                default:

                    console.error( 'The event:"' + event + '" does not exists.' );
                    break;
            }

        }

    });

    return inputFieldClass;

});