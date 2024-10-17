document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.navigation-prev');
    const nextButton = document.querySelector('.navigation-next');
    const productList = document.querySelector('.list-viewed-products');
    let currentIndex = 0;
    const itemsToShow = 4; 
    const itemWidth = 288.5; 
    const items = document.querySelectorAll('.list-viewed-products .owl-item');
    const totalItems = items.length;
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
            currentIndex = Math.max(currentIndex, 0);
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

// Hàm để xóa sản phẩm đã xem
function RemoveViewedHistoryCus(element) {
    const productContainer = document.querySelector(".list-viewed-products .owl-stage");
    const product = element.closest(".owl-item");
    
    // Xóa sản phẩm
    productContainer.removeChild(product);

    // Lấy lại danh sách các sản phẩm sau khi xóa
    const remainingProducts = document.querySelectorAll(".list-viewed-products .owl-item");

    // Cập nhật lại vị trí các sản phẩm
    remainingProducts.forEach((item, index) => {
        item.style.order = index; // Điều chỉnh thứ tự các sản phẩm còn lại
    });
}

// Gán sự kiện cho tất cả nút xóa (dấu x)
document.querySelectorAll('.close-itemv3').forEach(button => {
    button.addEventListener('click', function() {
        RemoveViewedProduct(this);
    });
});
function RemoveViewedHistory(element) {
    let section = element.closest('.home-viewed-products');
    
    if (section) {
        section.remove(); // Xóa toàn bộ section 'Sản phẩm đã xem'
    }
}

// Đảm bảo onclick của nút "Xóa lịch sử" gọi hàm với tham số "all"
document.querySelector('.btn-clear-history').addEventListener('click', function () {
    RemoveViewedHistory(this, 'all');
});
function removeBigBanner() {
    var banner = document.querySelector('.big-banner');
    if (banner) {
        banner.remove();
    }
}
