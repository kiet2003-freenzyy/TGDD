document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.prev-arrow');
    const nextButton = document.querySelector('.next-arrow');
    const productList = document.querySelector('.slick-track');
    const itemsToShow = 6;
    let currentIndex = 0;
    const itemWidth = 194; 
    const totalItems = document.querySelectorAll('.slick-track .slick-slide').length;
    productList.style.transition = 'transform 0.7s ease-in-out';
    
    const updateButtons = () => {
        prevButton.style.display = currentIndex > 0 ? 'block' : 'none';
        nextButton.style.display = currentIndex < totalItems - itemsToShow ? 'block' : 'none';
    };

    const scrollToIndex = (index) => {
        productList.style.transform = `translate3d(-${index * itemWidth}px, 0, 0)`;
    };

    const nextSlide = () => {
        if (currentIndex < totalItems - itemsToShow) {
            currentIndex += itemsToShow;
        } else {
            currentIndex = 0;  // Quay lại đầu khi next hết
        }
        scrollToIndex(currentIndex);
        updateButtons();
    };

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= itemsToShow;
            if (currentIndex < 0) currentIndex = 0;
            scrollToIndex(currentIndex);
            updateButtons();
        }
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
    });

    // Initial button state
    updateButtons();

    // Tự động next slide mỗi 5 giây (5000 ms)
    setInterval(() => {
        nextSlide();
    }, 2000);
});

// Hàm đếm ngược thời gian
function countdownTimer(endTime) {
    // Lấy các phần tử để hiển thị thời gian
    const hourElement = document.getElementById("hour");
    const minuteElement = document.getElementById("minute");
    const secondElement = document.getElementById("second");
    
    // Thiết lập đếm ngược
    const interval = setInterval(function () {
        // Lấy thời gian hiện tại và tính thời gian còn lại
        const now = new Date().getTime();
        const distance = new Date(endTime).getTime() - now;
        
        // Tính giờ, phút và giây
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Cập nhật giao diện
        hourElement.innerHTML = hours < 10 ? '0' + hours : hours;
        minuteElement.innerHTML = minutes < 10 ? '0' + minutes : minutes;
        secondElement.innerHTML = seconds < 10 ? '0' + seconds : seconds;
        
        // Nếu thời gian kết thúc, dừng đếm ngược
        if (distance < 0) {
            clearInterval(interval);
            hourElement.innerHTML = '00';
            minuteElement.innerHTML = '00';
            secondElement.innerHTML = '00';
        }
    }, 1000);
}

// Gọi hàm đếm ngược với thời gian kết thúc
countdownTimer('2024-10-17T20:59:00');


