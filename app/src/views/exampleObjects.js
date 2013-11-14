/**
 *
 * User: Fernando Villar Perez
 * Date: 01/10/13
 * Time: 19:37
 *
 * Draw some example objects to the scene
 */

define( [ 'backbone', 'threejs' ], function( Backbone, THREE ) {

    var exampleObjectsClass = Backbone.View.extend({

        canvasElement       :   '',

        initialize: function(){

        },

        getObjects: function() {

            var group = new THREE.Object3D();

            // FLOOR
            var floorTexture = new THREE.ImageUtils.loadTexture( 'img/checkerboard.jpg' );
            floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
            floorTexture.repeat.set( 10, 10 );
            var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
            var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
            var floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.position.y = -0.5;
            floor.rotation.x = Math.PI / 2;
            floor.name = "Checkerboard Floor";
            floor.id = "CheckerboardFloor";
            group.add(floor);

            // SKYBOX/FOG
            var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
            var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
            var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
            group.add(skyBox);

            // CUBE
            var cubeGeometry = new THREE.CubeGeometry( 100, 100, 100 );
            var cubeMaterial = new THREE.MeshNormalMaterial();
            cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
            cube.position.set(0,50,0);
            cube.name = "Cube";
            cube.id = "Cube";
            group.add(cube);

            return group;
        }

    });

    return exampleObjectsClass;

});

