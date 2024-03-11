document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable');
    const container = document.getElementById('container');
    const storyContent = document.getElementById('storyContent');
    let activeDraggable = null;
    let offsetX, offsetY;

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            activeDraggable = draggable;
            offsetX = e.offsetX;
            offsetY = e.offsetY;
        });
    });

    container.addEventListener('dragover', (e) => {
        e.preventDefault(); // Prevent default to allow drop
    });

    container.addEventListener('drop', (e) => {
        e.preventDefault(); // Necessary to prevent default behavior
        if (activeDraggable) {
            const rect = container.getBoundingClientRect();
            activeDraggable.style.position = 'absolute';
            activeDraggable.style.left = `${e.clientX - rect.left - offsetX}px`;
            activeDraggable.style.top = `${e.clientY - rect.top - offsetY}px`;
            container.appendChild(activeDraggable); // Append to container to maintain document flow
        }
    });

    const submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', () => {
        let prompt = "Following the sequence of events, write a short story in 150 words: ";
        document.querySelectorAll('.dropzone .draggable').forEach((el, index) => {
            prompt += `${index + 1}. ${el.textContent.trim()}, `;
        });
        prompt = prompt.slice(0, -2) + "."; // Finalize the prompt

        // Send the prompt to your server endpoint which interacts with the GPT API
        fetch('http://localhost:8000/api/generate-story/', { // Update to your actual endpoint URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }),
        })
        .then(response => response.json())
        .then(data => {
            storyContent.textContent = data.story; // Assuming 'story' is the key in your response containing the GPT-generated story
        })
        .catch(error => console.error('Error:', error));
    });

    const resetBtn = document.getElementById('resetBtn');
    const originalPositions = {};

    // Save the original positions of draggable elements
    document.querySelectorAll('.draggable').forEach(el => {
        originalPositions[el.id] = { left: el.style.left, top: el.style.top };
    });
    resetBtn.addEventListener('click', () => {
        document.querySelectorAll('.draggable').forEach(el => {
            const originalPosition = originalPositions[el.id];
            el.style.left = originalPosition.left;
            el.style.top = originalPosition.top;
        });
    });
});