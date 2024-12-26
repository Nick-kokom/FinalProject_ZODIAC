import * as THREE from 'three';

export function setupInteraction(constellation, domElement, camera, onClick) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event) {
        // Calculate mouse position in normalized device coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(constellation.children, true);

        if (intersects.length > 0) {
            onClick();
        }
    }

    domElement.addEventListener('click', onMouseClick);
}