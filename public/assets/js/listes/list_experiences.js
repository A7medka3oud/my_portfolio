
// كود عرض العناصر في صفحة خدماتي
document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.querySelector('.services-box');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageIndicators = document.getElementById('page-indicators');

    let itemsPerPage = 6; // تعريف المتغير افتراضيًا لمنع الأخطاء
    let currentPage = 1;

    // الحصول على جميع العناصر
    const allItems = Array.from(itemsContainer.querySelectorAll('.box'));

    // دالة لحساب عدد العناصر بناءً على حجم الشاشة
    function getItemsPerPage() {
        if (window.innerWidth >= 1200) {
            return 9; // شاشات كبيرة
        } else if (window.innerWidth >= 768) {
            return 6; // شاشات متوسطة
        } else {
            return 4; // شاشات الموبايل
        }
    }

    // تحديث عدد العناصر عند بداية التشغيل
    itemsPerPage = getItemsPerPage();

    // دالة لعرض العناصر بناءً على الصفحة الحالية
    function displayItems(page) {
        itemsPerPage = getItemsPerPage(); // تحديث العدد عند عرض العناصر

        // إخفاء جميع العناصر
        allItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.display = 'none';
        });

        // حساب بداية ونهاية العناصر للصفحة الحالية
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const itemsToShow = allItems.slice(start, end);

        // عرض العناصر الخاصة بالصفحة الحالية مع تأثير
        setTimeout(() => {
            itemsToShow.forEach((item, index) => {
                item.style.display = 'flex';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 300);

        // تحديث مؤشر الصفحة
        updatePageIndicator(page);
    }

    // دالة لتحديث مؤشر الصفحة
    function updatePageIndicator(page) {
        const totalPages = Math.ceil(allItems.length / itemsPerPage);
        pageIndicators.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageNumber = document.createElement('span');
            pageNumber.textContent = i;
            pageNumber.classList.add('page-number');
            if (i === page) {
                pageNumber.classList.add('active');
            }
            pageNumber.addEventListener('click', () => {
                currentPage = i;
                displayItems(currentPage);
            });
            pageIndicators.appendChild(pageNumber);
        }
    }

    // حدث للزر "السابق"
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayItems(currentPage);
        }
    });

    // حدث للزر "التالي"
    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(allItems.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayItems(currentPage);
        }
    });

    // تحديث عدد العناصر عند تغيير حجم الشاشة
    window.addEventListener('resize', () => {
        itemsPerPage = getItemsPerPage();
        displayItems(currentPage);
    });

    // عرض العناصر في الصفحة الأولى عند التحميل
    displayItems(currentPage);
});














