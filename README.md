### Welcome to Input fields for Threejs.

The aim for this library is to enable de use of input form fields on Threejs environment.

This library is being developed using:

* [Backbone.js](http://backbonejs.org "Bakbone's Homepage"), to get a structured code with a MVC development
* [Require.js](http://requirejs.org "Require's Homepage"), a javaScript file and module loader
* [Bower](http://bower.io "Bowers's Homepage"), to get an manage all the needed libraries to develop this one

### How to install

You can [download](https://github.com/Vargaf/threejsInputFields "threejsInputFileds Homepage") it from Github or fork it.

You can also get it by bower:

```
$bower install threejsinputfields
```

### Live example

<div id="live-example" >
	<iframe src="http://vargaf.github.io/threejs-input-fields/examples/basic.html" id="iframe-live-demo" allowfullscreen webkitallowfullscreen mozallowfullscreen width="660" height="495"></iframe>
</div>

<a href="javascript::return false;" onclick="document.getElementById('iframe-live-demo').contentWindow.fullscreenTrigger()">Full screen</a>

### Usage

Due to the  used libraries to develop this one first we need to add all the needed javascript files:

```javascript
<script type="text/javascript" src="../js/jquery.min.js"></script>
<script type="text/javascript" src="../js/underscore.js"></script>
<script type="text/javascript" src="../js/backbone.js"></script>
<script type="text/javascript" src="../js/OrbitControls.js"></script>
<script type="text/javascript" src="../js/mousetrap.js"></script>
<script type="text/javascript" src="../js/threejsInputFields.js"></script>
```

You may think that this is a huge dependences list for a library, but is the best way to be more modular.

Lets work, we begin creating the input manager to handle the input fields behaviours:

```javascript
 var inputManager = new threejsInputFields( {
    'camera': camera,                           // Threejs camera
    'canvasWidth': canvasWidth,                 // Scene witdth
    'canvasHeight': canvasHeight } );           // Scene hight
}
```

Add first input element ( at the moment only input text type are available ) and this one goes on and orthographic scene:

```javascript
var firstTextInput = inputManager
    // Input type, id, flag to know if the input is on an orthographic scene
    .create( 'text', 'first-input', true )
    .setValue( 'First text' )
    .setFontSize( 40 )
    .setBorderSize( 2 )
    .setInputPosition( 0, 0, 0, inputManager.POSITION_TOP_LEFT );

// Add the input into the ortographic scene
sceneOrtho.add( firstTextInput.getElement() );
```

Second input element, but this time inside the 3D space:

```javascript
var secondTextInput = inputManager
    // Input type, id, this input goes on a normal scene ( value = false )
    .create( 'text', 'second-input' )
    .setValue( 'Third text' )
    .setFontSize( 20 )
    .setBorderSize( 2 )
    .setInputPosition( 50, 100, 0 );

// This input goes inside a normal scene
scene.add( secondTextInput.getElement() );
```

Finally, to update the inputs we have to refresh them on every each requestAnimationFrame call

```javascript
inputManager.requestAnimationFrame();
```
