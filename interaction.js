import * as THREE from 'three';

export function setupInteraction(constellation, domElement, camera, onClick) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function handleInteraction(event) {
        event.preventDefault();
        
        // Get correct coordinates for both mouse and touch
        const x = event.clientX || (event.touches && event.touches[0].clientX);
        const y = event.clientY || (event.touches && event.touches[0].clientY);
        
        mouse.x = (x / window.innerWidth) * 2 - 1;
        mouse.y = -(y / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(constellation.children, true);

        if (intersects.length > 0) {
            onClick();
        }
    }

    // Add both mouse and touch event listeners
    domElement.addEventListener('click', handleInteraction);
    domElement.addEventListener('touchstart', handleInteraction);
    
    // Prevent default touch behavior
    domElement.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
}
