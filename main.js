function createVideoBlocks() {
    const container = document.getElementById('videoContainer');
    container.innerHTML = '';

    for (let i = 0; i < videoData.length; i++) {
        if (i % 3 === 0) {
            var row = document.createElement('div');
            row.className = 'video-row';
            container.appendChild(row);
        }

        const video = videoData[i];
        const videoBlock = document.createElement('div');
        videoBlock.className = 'video-block';
        videoBlock.innerHTML = `
            <div class="video-thumbnail" data-video-id="${video.id}">
                <img src="https://img.youtube.com/vi/${video.id}/0.jpg" alt="${video.title}">
                <div class="play-button"></div>
            </div>
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <p class="video-description">${video.description}</p>
            </div>
        `;
        container.lastChild.appendChild(videoBlock);
    }

    setupVideoListeners();
}

function setupVideoListeners() {
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    const popup = document.getElementById('videoPopup');
    const closePopup = document.querySelector('.close-popup');
    const popupVideoContainer = document.getElementById('popupVideoContainer');
    const popupVideoTitle = document.getElementById('popupVideoTitle');
    const popupVideoDescription = document.getElementById('popupVideoDescription');

    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function(event) {
            event.preventDefault();
            const videoId = this.getAttribute('data-video-id');
            const videoTitle = this.parentNode.querySelector('.video-title').textContent;
            const videoDescription = this.parentNode.querySelector('.video-description').textContent;

            if (window.innerWidth <= 768) {
                // Sur mobile, remplacer la miniature par l'iframe directement
                if (!this.querySelector('iframe')) {
                    this.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen allow="autoplay"></iframe>`;
                }
            } else {
                // Sur desktop, utiliser la pop-in
                popupVideoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen allow="autoplay"></iframe>`;
                popupVideoTitle.textContent = videoTitle;
                popupVideoDescription.textContent = videoDescription;

                popup.style.display = 'block';
                setTimeout(() => {
                    popup.classList.add('active');
                }, 10);
            }
        });
    });

    if (closePopup) {
        closePopup.addEventListener('click', closeVideoPopup);
    }

    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                closeVideoPopup();
            }
        });
    }
}

function closeVideoPopup() {
    const popup = document.getElementById('videoPopup');
    const popupVideoContainer = document.getElementById('popupVideoContainer');

    popup.classList.remove('active');
    setTimeout(() => {
        popup.style.display = 'none';
        popupVideoContainer.innerHTML = '';
    }, 300);
}

document.addEventListener('DOMContentLoaded', createVideoBlocks);
