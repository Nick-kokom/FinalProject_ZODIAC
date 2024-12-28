export function animateStory(onComplete) {
    const storyContainer = document.getElementById('story-container');
    const paragraphs = document.querySelectorAll('.story-paragraph');
    let currentParagraph = 0;

    function showNextParagraph() {
        if (currentParagraph < paragraphs.length) {
            paragraphs[currentParagraph].classList.add('visible');
            currentParagraph++;
            setTimeout(showNextParagraph, 5000); // Show next paragraph after 5 seconds
        } else {
            setTimeout(onComplete, 2000); // Call completion callback after last paragraph
        }
    }

    showNextParagraph();
}