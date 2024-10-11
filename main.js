function createVideoBlocks() {
    const container = document.getElementById('videoContainer');
    videoData.forEach(video => {
        const videoBlock = document.createElement('div');
        videoBlock.className = 'video-block';
        videoBlock.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${video.id}" frameborder="0" allowfullscreen></iframe>
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <p class="video-description">${video.description}</p>
            </div>
        `;
        container.appendChild(videoBlock);
    });
}

document.addEventListener('DOMContentLoaded', createVideoBlocks);