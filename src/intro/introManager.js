import { storyContent } from './introStory.js';
import { animateStory } from './introAnimation.js';

export function setupIntroStory() {
    // Create welcome screen if it doesn't exist
    let welcomeScreen = document.getElementById('welcome-screen');
    if (!welcomeScreen) {
        welcomeScreen = document.createElement('div');
        welcomeScreen.id = 'welcome-screen';
        welcomeScreen.className = 'hidden';
        document.body.appendChild(welcomeScreen);
    }

    const introScreen = document.createElement('div');
    introScreen.id = 'intro-screen';
    introScreen.className = 'intro-screen';

    // Create stars background
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-background';
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starsContainer.appendChild(star);
    }

    // Create story container
    const storyContainer = document.createElement('div');
    storyContainer.id = 'story-container';
    storyContainer.className = 'story-container';

    // Add story paragraphs
    storyContent.forEach(text => {
        const paragraph = document.createElement('p');
        paragraph.className = 'story-paragraph';
        paragraph.textContent = text;
        storyContainer.appendChild(paragraph);
    });

    // Add skip button
    const skipButton = document.createElement('button');
    skipButton.className = 'skip-button';
    skipButton.textContent = 'Skip Story';
    skipButton.onclick = () => {
        if (introScreen.parentNode) {
            introScreen.parentNode.removeChild(introScreen);
        }
        welcomeScreen.classList.remove('hidden');
    };

    // For audio but not final....
    const audioComment = document.createComment(
        'Add background music here: \n' +
        '<audio id="background-music" loop>\n' +
        '    <source src="path/to/your/music.mp3" type="audio/mpeg">\n' +
        '</audio>'
    );

    introScreen.appendChild(audioComment);
    introScreen.appendChild(starsContainer);
    introScreen.appendChild(storyContainer);
    introScreen.appendChild(skipButton);
    document.body.appendChild(introScreen);

    // animation
    animateStory(() => {
        setTimeout(() => {
            if (introScreen.parentNode) {
                introScreen.parentNode.removeChild(introScreen);
            }
            welcomeScreen.classList.remove('hidden');
        }, 2000);
    });
}