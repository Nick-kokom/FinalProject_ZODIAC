import { createMythElements, toggleMythVisibility, toggleReadMore } from './mythUI.js';

export function setupMythSection(infoPanel, mythText) {
    // Clean up existing elements
    cleanupExistingMythElements();
    
    // Create new elements
    const { mythButton, mythContent, readMoreBtn, mythPreview, mythFullText } = createMythElements(mythText);
    
    // Add click handlers
    mythButton.addEventListener('click', () => {
        toggleMythVisibility(mythContent, mythButton);
    });

    readMoreBtn.addEventListener('click', () => {
        toggleReadMore(readMoreBtn, mythPreview, mythFullText);
    });
    
    // Add to panel
    infoPanel.appendChild(mythButton);
    infoPanel.appendChild(mythContent);
}

function cleanupExistingMythElements() {
    const existingMythButton = document.getElementById('myth-button');
    const existingMythContent = document.getElementById('myth-content');
    if (existingMythButton) existingMythButton.remove();
    if (existingMythContent) existingMythContent.remove();
}