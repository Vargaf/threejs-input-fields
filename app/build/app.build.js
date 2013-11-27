({
	baseUrl: "../../",
    paths: {
        "jquery"                : "vendors/jquery/jquery",
        "backbone"              : "vendors/backbone-amd/backbone",
        "underscore"            : "vendors/underscore-amd/underscore",
        "threejs"               : "vendors/threejs/build/three",
        "mousetrap"             : "vendors/mousetrap/mousetrap.min",
        "threejsInputFields"    : "app/src/threejsInputFields",
        "almond"                : "vendors/almond/almond"
    },
	include: [
        'threejsInputFields'
    ],
    exclude: [
        "jquery",
        "backbone",
        "underscore",
        "threejs",
        "mousetrap"
    ],
    out: "../../dist/threejsInputFields.js",
    name: "vendors/almond/almond.js",

    wrap: {
        startFile: 'tools/start.frag',
        endFile: 'tools/end.frag'
    }
})