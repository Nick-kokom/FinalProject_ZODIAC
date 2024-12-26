import * as THREE from 'three';

export function createStarfield() {
    const group = new THREE.Group();
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.02,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });

    // Create 2000 random stars
    const vertices = [];
    for (let i = 0; i < 2000; i++) {
        vertices.push(
            (Math.random() - 0.5) * 20, // x
            (Math.random() - 0.5) * 20, // y
            (Math.random() - 0.5) * 20  // z
        );
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    group.add(stars);

    return group;
}