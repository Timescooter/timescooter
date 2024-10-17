let currentIndex = 0;

function createVideoCarousel() {
    const carousel = document.getElementById('videoCarousel');
    carousel.innerHTML = '';

    videoData.forEach((video, index) => {
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
        carousel.appendChild(videoBlock);
    });

    setupVideoListeners();
    setupCarouselControls();
}

function setupCarouselControls() {
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const carousel = document.getElementById('videoCarousel');

    prevButton.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, videoData.length - 3);
        updateCarousel();
    });

    function updateCarousel() {
        const slideWidth = carousel.clientWidth / 3;
        carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
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
                this.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
                
                const iframe = this.querySelector('iframe');
                iframe.style.width = '100%';
                iframe.style.height = '100%';
            } else {
                popupVideoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen allow="autoplay; fullscreen"></iframe>`;
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

document.addEventListener('DOMContentLoaded', createVideoCarousel);
