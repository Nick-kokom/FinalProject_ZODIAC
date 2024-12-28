// Handles UI creation and updates for myth content
export function createMythElements(mythText) {
    const mythContainer = document.createElement('div');
    mythContainer.className = 'myth-container';

    const mythButton = document.createElement('button');
    mythButton.id = 'myth-button';
    mythButton.className = 'myth-button';
    mythButton.textContent = 'Read Mythology';

    const mythContent = document.createElement('div');
    mythContent.id = 'myth-content';
    mythContent.className = 'myth-content';
    
    // Create preview and full text elements
    const previewText = mythText.substring(0, 150) + '...';
    const mythPreview = document.createElement('p');
    mythPreview.className = 'myth-preview';
    mythPreview.textContent = previewText;

    const mythFullText = document.createElement('p');
    mythFullText.className = 'myth-full-text';
    mythFullText.textContent = mythText;
    mythFullText.style.display = 'none';

    const readMoreBtn = document.createElement('button');
    readMoreBtn.className = 'read-more-btn';
    readMoreBtn.textContent = 'Read More';

    // Append elements
    mythContent.appendChild(mythPreview);
    mythContent.appendChild(mythFullText);
    mythContent.appendChild(readMoreBtn);

    return { mythButton, mythContent, readMoreBtn, mythPreview, mythFullText };
}

export function toggleMythVisibility(mythContent, mythButton) {
    mythContent.classList.toggle('visible');
    mythButton.textContent = mythContent.classList.contains('visible') 
        ? 'Hide Mythology' 
        : 'Read Mythology';
}

export function toggleReadMore(readMoreBtn, preview, fullText) {
    const isExpanded = fullText.style.display === 'block';
    preview.style.display = isExpanded ? 'block' : 'none';
    fullText.style.display = isExpanded ? 'none' : 'block';
    readMoreBtn.textContent = isExpanded ? 'Read More' : 'Read Less';
}