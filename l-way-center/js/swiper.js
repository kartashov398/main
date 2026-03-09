document.addEventListener('DOMContentLoaded', function() {
    // Функция инициализации слайдера
    function initSlider(sliderSelector) {
        const swiperWrapper = sliderSelector.querySelector('.swiper__wrapper');
        const swiperSlides = sliderSelector.querySelectorAll('.swiper__slide');
        const swiperBullets = sliderSelector.querySelectorAll('.swiper__bullet');
        let currentIndex = 0;
        let startX = 0;
        let isDragging = false;
        let slideWidth = swiperSlides[0].offsetWidth;
        let autoScrollInterval;

        // Функция для сброса таймера автоматической прокрутки
        function resetAutoScroll() {
            clearInterval(autoScrollInterval);
            autoScrollInterval = setInterval(nextSlide, 3000);
        }

        // Устанавливаем ширину обертки слайдов
        function setWrapperWidth() {
            slideWidth = swiperSlides[0].offsetWidth;
            swiperWrapper.style.width = slideWidth * swiperSlides.length + 'px';
        }

        // Обновляем активный буллет
        function updateBullets() {
            swiperBullets.forEach((bullet, index) => {
                bullet.classList.toggle('swiper__bullet__active', index === currentIndex);
            });
        }

        // Переключение на следующий слайд
        function nextSlide() {
            if (currentIndex < swiperSlides.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        }

        // Переключение на предыдущий слайд
        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = swiperSlides.length - 1;
            }
            updateSlider();
        }

        // Обновляем позицию слайдера
        function updateSlider() {
            swiperWrapper.style.transition = 'transform 0.3s ease';
            swiperWrapper.style.transform = `translate3d(-${currentIndex * slideWidth}px, 0, 0)`;
            updateBullets();
            resetAutoScroll();
        }

        // Обработчики событий для свайпа
        swiperWrapper.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            swiperWrapper.style.transition = 'none';
            clearInterval(autoScrollInterval);
        });

        swiperWrapper.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const x = e.clientX;
            const diff = startX - x;
            swiperWrapper.style.transform = `translate3d(calc(-${currentIndex * slideWidth}px - ${diff}px), 0, 0)`;
        });

        swiperWrapper.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            const x = e.clientX;
            const diff = startX - x;
            swiperWrapper.style.transition = 'transform 0.3s ease';

            if (diff > 50) {
                nextSlide();
            } else if (diff < -50) {
                prevSlide();
            } else {
                updateSlider();
            }
        });

        swiperWrapper.addEventListener('mouseleave', () => {
            if (!isDragging) return;
            isDragging = false;
            swiperWrapper.style.transition = 'transform 0.3s ease';
            updateSlider();
        });

        // Обработчики событий для буллетов
        swiperBullets.forEach((bullet, index) => {
            bullet.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });

        // Обработчики событий для сенсорных устройств
        swiperWrapper.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            swiperWrapper.style.transition = 'none';
            clearInterval(autoScrollInterval);
        });

        swiperWrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].clientX;
            const diff = startX - x;
            swiperWrapper.style.transform = `translate3d(calc(-${currentIndex * slideWidth}px - ${diff}px), 0, 0)`;
        });

        swiperWrapper.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            const x = e.changedTouches[0].clientX;
            const diff = startX - x;
            swiperWrapper.style.transition = 'transform 0.3s ease';

            if (diff > 50) {
                nextSlide();
            } else if (diff < -50) {
                prevSlide();
            } else {
                updateSlider();
            }
        });

        // Автоматическая прокрутка
        autoScrollInterval = setInterval(nextSlide, 3000);

        swiperWrapper.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });

        swiperWrapper.addEventListener('mouseleave', () => {
            resetAutoScroll();
        });

        // Инициализация слайдера
        setWrapperWidth();
        updateBullets();

        // Обновляем слайдер при изменении размера окна
        window.addEventListener('resize', () => {
            setWrapperWidth();
            updateSlider();
        });
    }

    // Инициализация слайдеров
    const serviceSlider = document.querySelector('.swiper:not(.reviews .swiper)');
    const reviewSlider = document.querySelector('.reviews .swiper');

    if (serviceSlider) {
        initSlider(serviceSlider);
    }

    if (reviewSlider) {
        initSlider(reviewSlider);
    }
});
