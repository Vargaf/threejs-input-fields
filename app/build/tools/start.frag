(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //Allow using this built library as an AMD module
        //in another project. That other project will only
        //see this AMD call, not the internal modules in
        //the closure below.
        console.log('amd');

        define(factory);
        define( [ 'underscore', 'backbone', 'threejs', 'mousetrap', 'jquery' ], factory );

    } else {
        //Browser globals case. Just assign the
        //result to a property on the global.
        root.threejsInputFields = factory( root._, root.Backbone, THREE, root.Mousetrap, root.jQuery );
    }
}(this, function ( _, Backbone, THREE, mousetrap, $ ) {
    //almond, and your modules will be inlined here