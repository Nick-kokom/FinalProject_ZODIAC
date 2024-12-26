import * as THREE from 'three';

export function createConstellation(points) {
    const group = new THREE.Group();
    const starGeometry = new THREE.SphereGeometry(0.12, 32, 32); // Increased size further
    const starMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.9
    });
    
    // Create stars with larger hit areas for better interaction
    points.forEach(point => {
        const star = new THREE.Mesh(starGeometry, starMaterial);
        star.position.set(point.x * 2, point.y * 2, point.z); // Scale up constellation more
        
        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(0.18, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x4444ff,
            transparent: true,
            opacity: 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        star.add(glow);
        
        // Add invisible larger sphere for better click detection
        const hitGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const hitMaterial = new THREE.MeshBasicMaterial({ 
            visible: false 
        });
        const hitArea = new THREE.Mesh(hitGeometry, hitMaterial);
        star.add(hitArea);
        
        group.add(star);
    });

    // Create lines between stars
    const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x4444ff, 
        opacity: 0.5, 
        transparent: true 
    });
    
    for (let i = 0; i < points.length - 1; i++) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(points[i].x * 2, points[i].y * 2, points[i].z),
            new THREE.Vector3(points[i + 1].x * 2, points[i + 1].y * 2, points[i + 1].z)
        ]);
        const line = new THREE.Line(geometry, lineMaterial);
        group.add(line);
    }

    return group;
}