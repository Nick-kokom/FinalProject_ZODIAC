import * as THREE from 'three';
import { zodiacData } from './zodiacData.js';
import { createConstellation } from './constellation.js';
import { setupInteraction } from './interaction.js';
import { createStarfield } from './starfield.js';
import { startQuiz } from './src/quiz.js';
import { setupMythSection } from './src/myth/mythManager.js';
import { setupIntroStory } from './src/intro/introManager.js';

let currentScene, camera, renderer;
let currentConstellation = null;
let starfield = null;


document.addEventListener('DOMContentLoaded', setupIntroStory);

// Initialize Three.js scene
function initThree() {
    if (!currentScene) {
        currentScene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('canvas-container').appendChild(renderer.domElement);
        
        camera.position.z = 5;

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        currentScene.add(ambientLight);

        // Add directional lightnp
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 5, 5);
        currentScene.add(directionalLight);

        // Add starfield
        starfield = createStarfield();
        currentScene.add(starfield);

        animate();
    }
    return { scene: currentScene, camera, renderer };
}


// Update the displayZodiacInfo function
function displayZodiacInfo(sign) {
    const data = zodiacData[sign];
    
    document.getElementById('info-panel').classList.remove('hidden');
    
    document.getElementById('zodiac-name').textContent = data.name;
    document.getElementById('zodiac-name').style.color = data.color;
    document.getElementById('characteristics').textContent = data.characteristics;
    document.getElementById('lucky-color').textContent = `Lucky Color: ${data.luckyColor}`;
    document.getElementById('lucky-number').textContent = `Lucky Number: ${data.luckyNumber}`;
    document.getElementById('population').textContent = `Global Population: ${data.population}`;
    document.getElementById('blessings').textContent = data.blessings;
    document.getElementById('date-range').textContent = data.dateRange;

    // Add myth section using the myth manager
    const infoPanel = document.getElementById('info-panel');
    setupMythSection(infoPanel, data.myth);
}


function animate() {
    requestAnimationFrame(animate);
    if (currentConstellation) {
        currentConstellation.rotation.y += 0.001;
    }
    if (starfield) {
        starfield.rotation.y += 0.0001;
    }
    renderer.render(currentScene, camera);
}

// Event Listeners
document.getElementById('begin-journey').addEventListener('click', () => {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('user-input-screen').classList.remove('hidden');
});

document.getElementById('start-exploration').addEventListener('click', () => {
    const name = document.getElementById('user-name').value;
    const sign = document.getElementById('zodiac-sign').value;
    
    if (name && sign) {
        document.getElementById('user-input-screen').classList.add('hidden');
        document.getElementById('constellation-screen').classList.remove('hidden');
        document.getElementById('info-panel').classList.add('hidden');
        const { scene } = initThree();
        displayConstellation(sign, scene);
    }
});

document.getElementById('change-zodiac').addEventListener('click', () => {
    document.getElementById('constellation-screen').classList.add('hidden');
    document.getElementById('user-input-screen').classList.remove('hidden');
    document.getElementById('info-panel').classList.add('hidden');
    if (currentConstellation && currentScene) {
        currentScene.remove(currentConstellation);
        currentConstellation = null;
    }
});

// Quiz button event listeners
document.getElementById('welcome-quiz-button').addEventListener('click', () => {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    startQuiz();
});

document.getElementById('info-quiz-button').addEventListener('click', () => {
    document.getElementById('quiz-screen').classList.remove('hidden');
    startQuiz();
});

function displayConstellation(sign, scene) {
    const data = zodiacData[sign];
    
    if (currentConstellation) {
        scene.remove(currentConstellation);
    }
    
    currentConstellation = createConstellation(data.constellation);
    scene.add(currentConstellation);
    
    setupInteraction(currentConstellation, renderer.domElement, camera, () => {
        displayZodiacInfo(sign);
    });
}

