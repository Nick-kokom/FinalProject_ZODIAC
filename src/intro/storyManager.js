import { typewriterEffect } from './typewriterEffect.js';
import { fadeIn, fadeOut } from './fadeEffects.js';
import { storyContent } from './introStory.js';

export async function playStory(onComplete) {
    const container = document.getElementById('story-container');
    const paragraph = document.createElement('p');
    paragraph.className = 'story-paragraph';
    container.appendChild(paragraph);

    for (let i = 0; i < storyContent.length; i++) {
        // Fade in paragraph
        await fadeIn(paragraph);
        
        // Type out text
        await typewriterEffect(paragraph, storyContent[i]);
        
        // Pause between paragraphs
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Fade out if not last paragraph
        if (i < storyContent.length - 1) {
            await fadeOut(paragraph);
            paragraph.textContent = '';
        }
    }

    // Final fade out
    await fadeOut(paragraph);
    onComplete();
}