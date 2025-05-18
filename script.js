document.addEventListener('DOMContentLoaded', () => {
    const platformSelect = document.getElementById('platform');
    const postTextarea = document.getElementById('post-text');
    const imageUrlInput = document.getElementById('image-url');
    const scheduleTimeInput = document.getElementById('schedule-time');
    const scheduleButton = document.getElementById('schedule-button');
    const facebookPreview = document.getElementById('facebook-preview');
    const twitterPreview = document.getElementById('twitter-preview');
    const instagramPreview = document.getElementById('instagram-preview');
    const linkedinPreview = document.getElementById('linkedin-preview');
    const scheduledPostsList = document.getElementById('scheduled-posts-list');

    let scheduledPosts = []; // No longer loading from localStorage initially
    renderScheduledPosts(); // Render any posts fetched from the server

    function updatePreview() {
        // ... (same as before) ...
    }

    async function schedulePost() {
        const platform = platformSelect.value;
        const text = postTextarea.value;
        const imageUrl = imageUrlInput.value;
        const scheduleTime = scheduleTimeInput.value;

        if (!text.trim() || !scheduleTime) {
            alert('Please enter post text and select a schedule time.');
            return;
        }

        const newPost = {
            platform,
            text,
            imageUrl,
            scheduleTime
        };

        try {
            const response = await fetch('/api/scheduled-posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPost)
            });

            if (response.ok) {
                const savedPost = await response.json();
                scheduledPosts.push(savedPost);
                renderScheduledPosts();
                clearInputFields();
            } else {
                console.error('Failed to schedule post:', response.status);
                alert('Failed to schedule post. Please try again.');
            }
        } catch (error) {
            console.error('Error scheduling post:', error);
            alert('An error occurred while scheduling. Please try again.');
        }
    }

    async function renderScheduledPosts() {
        scheduledPostsList.innerHTML = '';
        try {
            const response = await fetch('/api/scheduled-posts');
            if (response.ok) {
                scheduledPosts = await response.json();
                scheduledPosts.sort((a, b) => new Date(a.scheduleTime) - new Date(b.scheduleTime));
                scheduledPosts.forEach(post => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <span>${post.platform} - Scheduled for: ${new Date(post.scheduleTime).toLocaleString()}</span>
                        <button class="delete-button" data-id="${post.id}">Delete</button>
                    `;
                    scheduledPostsList.appendChild(listItem);
                });

                document.querySelectorAll('.delete-button').forEach(button => {
                    button.addEventListener('click', deleteScheduledPost);
                });
            } else {
                console.error('Failed to fetch scheduled posts:', response.status);
                alert('Failed to load scheduled posts.');
            }
        } catch (error) {
            console.error('Error fetching scheduled posts:', error);
            alert('An error occurred while loading scheduled posts.');
        }
    }

    async function deleteScheduledPost(event) {
        const postIdToDelete = parseInt(event.target.dataset.id);
        try {
            const response = await fetch(`/api/scheduled-posts/${postIdToDelete}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                scheduledPosts = scheduledPosts.filter(post => post.id !== postIdToDelete);
                renderScheduledPosts();
            } else {
                console.error('Failed to delete post:', response.status);
                alert('Failed to delete post. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('An error occurred while deleting the post.');
        }
    }

    function clearInputFields() {
        postTextarea.value = '';
        imageUrlInput.value = '';
        scheduleTimeInput.value = '';
        updatePreview();
    }

    // No need for save/load from localStorage anymore

    // Event listeners (same as before)
    postTextarea.addEventListener('input', updatePreview);
    imageUrlInput.addEventListener('input', updatePreview);
    platformSelect.addEventListener('change', updatePreview);
    scheduleButton.addEventListener('click', schedulePost);

    // Initial fetch of scheduled posts
    renderScheduledPosts();
    updatePreview();
});