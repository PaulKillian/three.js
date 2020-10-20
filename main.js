function init () {
	const scene = new THREE.Scene();

	const box = getBox(1, 1, 1);
	const plane = getPlane(4);

	scene.add(box);
	scene.add(plane);
	box.position.y = box.geometry.parameters.height/2;
	plane.rotation.x = Math.PI/2 ;

	const camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);
	camera.position.z = 5;
	camera.position.x = 1;
	camera.position.y = 2;

	camera.lookAt(new THREE.Vector3(0, 0, 0));

	const renderer = new THREE.WebGL1Renderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('webgl').appendChild(renderer.domElement);
	update(renderer, scene, camera);

	return scene
}

var scene = init();

function getBox(w, h, d) {
	const geometry = new THREE.BoxGeometry(w, h, d);
	const material = new THREE.MeshBasicMaterial({
		color: 0x00ff00
	});
	const mesh = new THREE.Mesh(
		geometry,
		material
	);
	return mesh;
}

function getPlane(size) {
	const geometry = new THREE.PlaneGeometry(size, size);
	const material = new THREE.MeshBasicMaterial({
		color: 0xff0000,
		side: THREE.DoubleSide
	});
	const mesh = new THREE.Mesh(
		geometry,
		material
	);
	return mesh;
}

function update(renderer, scene, camera) {
	renderer.render(
		scene,
		camera
	)
	requestAnimationFrame(function() {
		update(renderer, scene, camera);
	})
}
