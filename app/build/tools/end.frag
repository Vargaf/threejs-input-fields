
    //Register in the values from the outer closure for common dependencies
    //as local almond modules
    define('backbone', function () {
        return Backbone;
    });
    define('underscore', function () {
        return _;
    });
    define('threejs', function () {
        return THREE;
    });
    define('mousetrap', function () {
        return mousetrap;
    });
    define('jquery', function () {
        return $;
    });

    //The modules for your project will be inlined above
    //this snippet. Ask almond to synchronously require the
    //module value for 'main' here and return it as the
    //value to use for the public API for the built file.
    return require('threejsInputFields');
}));