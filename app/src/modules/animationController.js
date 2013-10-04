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

            animationControllerClassTHIS = this;

        },

        add: function( object ) {

            if( typeof object == "undefined" ) {

                console.error( '-- AnimationController:add -- An object add must be given.' );
                return;

            }

            this.attributes.elementsToRender.push( object );

        },

        animate: function() {

            requestAnimationFrame( animationControllerClassTHIS.animate );

            var element;
            for( var index in animationControllerClassTHIS.attributes.elementsToRender ) {

                element = animationControllerClassTHIS.attributes.elementsToRender[ index ];
                element.requestAnimationFrame();

            }
        }

    });

    return animationControllerClass;

});
