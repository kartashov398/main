document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.reviews__grid');
    const prevButton = document.querySelector('.carousel__button--prev');
    const nextButton = document.querySelector('.carousel__button--next');
    const reviews = document.querySelectorAll('.review__item');
    let currentIndex = 0;

    // Проверяем ширину экрана
    function isMobile() {
        return window.innerWidth <= 1200;
    }

    // Функция для обновления позиции карусели
    function updateCarousel() {
        if (isMobile()) {
            const offset = -currentIndex * 100;
            carousel.style.transform = `translateX(${offset}%)`;
        }
    }

    // Обработчики событий для кнопок
    function setupCarousel() {
        if (isMobile()) {
            prevButton.style.display = 'block';
            nextButton.style.display = 'block';

            prevButton.addEventListener('click', function() {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : reviews.length - 1;
                updateCarousel();
            });

            nextButton.addEventListener('click', function() {
                currentIndex = (currentIndex < reviews.length - 1) ? currentIndex + 1 : 0;
                updateCarousel();
            });

            // Автоскроллинг (опционально)
            let carouselInterval = setInterval(function() {
                if (isMobile()) {
                    currentIndex = (currentIndex < reviews.length - 1) ? currentIndex + 1 : 0;
                    updateCarousel();
                }
            }, 10000);

            // Очищаем интервал при изменении размера окна
            window.addEventListener('resize', function() {
                if (!isMobile()) {
                    clearInterval(carouselInterval);
                    prevButton.style.display = 'none';
                    nextButton.style.display = 'none';
                    carousel.style.transform = 'translateX(0)';
                }
            });
        } else {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
            carousel.style.transform = 'translateX(0)';
        }
    }

    // Инициализация карусели
    setupCarousel();

    // Обновляем карусель при изменении размера окна
    window.addEventListener('resize', setupCarousel);
});