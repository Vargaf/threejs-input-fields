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
        inputManager                :   false,

        initialize: function() {

            this.blinkingClock = new THREE.Clock();

        },

        setInputManager: function( inputManager ) {

            this.inputManager = inputManager;
            return this;

        },

        getVisible: function() {
            return this.visible;
        },

        setVisible: function( visible ) {
            this.visible = visible;
            return this;
        },

        drawCursor: function( inputElement ) {

            if( this.visible ) {
                var positionX = inputElement.getCursorPosition() - inputElement.inputRealPosition.x - 2;
                var positionY = inputElement.getInputTextPosition().y; // - inputElement.getFontSize() / 2;
                inputElement.context.fillText( "|", positionX, positionY  );
            }

        },

        blink: function( inputElement ) {

            var lastBlinkGap = this.blinkingLastChange + this.blinkingFrequency;

            if( lastBlinkGap < this.blinkingClock.getElapsedTime() ) {

                this.visible = !this.visible;
                this.blinkingLastChange = this.blinkingClock.getElapsedTime();

                inputElement.isDirty = true;
                inputElement.makeTextSprite( null );
                inputElement.isDirty = false;

            }
        },

        getCursorPosition: function( inputElement ) {

            this.positionX = inputElement.getCursorPosition() - 2;
            this.positionY = inputElement.getInputTextPosition().y + inputElement.getInputPosition().y - inputElement.getFontSize() * 0.05;

        },

        getInputManager: function() {

            if( this.inputManager === false ) {
                console.error( 'The input manager has not been set correctly into inputCursor object' );
            } else {
                return this.inputManager;
            }

        },

        setCursorPosition: function( position ) {

            var inputField = this.getInputManager().getFocusedElement();

            if( typeof inputField !== 'undefined' && inputField !== false ) {

                if( position > inputField.getInputPosition().x + inputField.getInputFieldSize() - inputField.getBorderSize() * 3 ) {

                    position = inputField.getInputPosition().x + inputField.getInputFieldSize() - inputField.getBorderSize() * 3;

                } else if( position < inputField.getInputPosition().x + inputField.getBorderSize() * 2 ) {

                    position = inputField.getInputPosition().x + inputField.getBorderSize() * 2;

                }

                inputField.setCursorPosition( position );

            }

            return this;

        },

        /**
         * Set the cursor position on the correct x-coordinate
         *
         * @param position
         * @returns {inputTextClass}
         */
        setCursorTextPosition: function( position ) {

            var inputField = this.getInputManager().getFocusedElement();

            if( typeof inputField !== 'undefined' && inputField !== false ) {
                if( position < 0 ) {
                    position = 0;
                } else if( position > inputField.getInputValue().length ) {
                    position = inputField.getInputValue().length;
                }

                var oldPosition = inputField.getCursorTextPosition();
                var offsetedPosition = position;


                // Displace the position to assure at least one character of visibility
                if( oldPosition < position ) {
                    if( ( position + 2 ) <= inputField.getInputValue().length ) {
                        inputField.incCursorTextPosition( 3 );
                        offsetedPosition += 2;
                    } else if( ( position + 1 ) <= inputField.getInputValue().length ) {
                        inputField.incCursorTextPosition( 2 );
                        offsetedPosition++;
                    }
                } else if( oldPosition > position ){
                    if( ( position - 2 ) >= 0 ) {
                        inputField.decCursorTextPosition( 3 );
                        offsetedPosition -= 2;
                    } else if( ( position - 1 ) >= 0 ) {
                        inputField.decCursorTextPosition( 2 );
                        offsetedPosition--;
                    }
                }

                var needsToBeCleaned = !inputField.isDirty;

                var xCoordinatePosition = inputField.getInputCursorPositionXCoordinate( offsetedPosition, inputField.getInputValue() );
                var max = inputField.getInputPosition().x + inputField.getInputFieldSize() - inputField.getBorderSize() * 3;
                var min = inputField.getInputPosition().x + inputField.getBorderSize() * 2;

                if( xCoordinatePosition >= max ) {

                    // Displace the text to show the next two or one characters
//                    if( ( position + 2 ) <= inputField.getInputValue().length ) {
//                        inputField.incCursorTextPosition( 2 );
//                    } else if( ( position + 1 ) <= inputField.getInputValue().length ) {
//                        inputField.incCursorTextPosition();
//                    }

                    inputField.displaceInputValue();

                    xCoordinatePosition = inputField.getInputCursorPositionXCoordinate( position, inputField.getInputValue() );

                } else if( xCoordinatePosition <= min ) {

                    // Displace the text to show the preview two or one characters
//                    if( ( position - 2 ) >= 0 ) {
//                        inputField.decCursorTextPosition( 2 );
//                    } else if( ( position - 1 ) >= 0 ) {
//                        inputField.decCursorTextPosition();
//                    }

                    inputField.displaceInputValue();

                    xCoordinatePosition = inputField.getInputCursorPositionXCoordinate( position, inputField.getInputValue() );
                }

                // Since we may have displaced the cursor to show more characters is convenient to save the real cursor position again
                inputField.setCursorTextPosition( position );
                inputField.setCursorPosition( xCoordinatePosition );

                if( needsToBeCleaned ) {
                    inputField.setIsDirty( true );
                    inputField.makeTextSprite( inputField.getInputValue() );
                    inputField.setIsDirty( false );
                }
            }

            return this;
        }

    });

    return inputCursorClass;

});

