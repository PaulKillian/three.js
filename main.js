function init () {
	const scene = new THREE.Scene();

	const enableFog = false;
	if (enableFog) {
		scene.fog = new THREE.FogExp2(0xffffff, 0.2);
	}

	const box = getBox(1, 1, 1);
	const plane = getPlane(20);
	const pointLight = getPointLight(1);

	plane.name = 'plane-1';

	box.position.y = box.geometry.parameters.height/2;
	plane.rotation.x = Math.PI / 2;
	pointLight.position.y = 3

	scene.add(box);
	scene.add(plane);
	scene.add(pointLight);

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
	renderer.setClearColor('rgb(120, 120, 120)');
	document.getElementById('webgl').appendChild(renderer.domElement);
	update(renderer, scene, camera);

	return scene
}
var scene = init();



function getBox(w, h, d) {
	const geometry = new THREE.BoxGeometry(w, h, d);
	const material = new THREE.MeshPhongMaterial({
		color: 'rgb(120, 120, 120)'
	});
	const mesh = new THREE.Mesh(
		geometry,
		material
	);
	return mesh;
}

function getPointLight(intensity) {
	const light = new THREE.PointLight(0xffffff, intensity);

	return light
}


function getPlane(size) {
	const geometry = new THREE.PlaneGeometry(size, size);
	const material = new THREE.MeshPhongMaterial({
		color: 'rgb(120, 120, 120)',
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
