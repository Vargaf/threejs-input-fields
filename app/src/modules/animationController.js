/**
 *
 * User: Fernando Villar Perez
 * Date: 01/10/13
 * Time: 22:36
 *
 * Class to control and make easier the request animation rendering
 *
 */

define([ 'backbone' ], function( Backbone ) {

    var animationControllerClass = Backbone.Model.extend({

        elementsToRender        :   '',

        initialize: function() {

            this.attributes.elementsToRender = [];

            animationControllerClassThat = this;

        },

        add: function( object ) {

            if( typeof object == "undefined" ) {

                console.error( '-- AnimationController:add -- An object add must be given.' );
                return;

            }

            this.attributes.elementsToRender.push( object );

        },

        animate: function() {

            requestAnimationFrame( animationControllerClassThat.animate );

            var element;
            for( var index in animationControllerClassThat.attributes.elementsToRender ) {

                element = animationControllerClassThat.attributes.elementsToRender[ index ];
                element.renderCanvas();
                element.update();

            }
        }

    });

    return animationControllerClass;

});
