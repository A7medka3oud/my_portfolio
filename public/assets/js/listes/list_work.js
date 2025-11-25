
// عرض العناصر في الصفحة
document.addEventListener('DOMContentLoaded', () => {
  const itemsContainer = document.querySelector('.portfolio-boxes');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const pageIndicators = document.getElementById('page-indicators');

  const itemsPerPage = 6; // عدد العناصر في كل صفحة
  let currentPage = 1;

  // الحصول على جميع العناصر
  const allItems = Array.from(itemsContainer.querySelectorAll('.portfolio-box'));

  // دالة لعرض العناصر بناءً على الصفحة الحالية
  function displayItems(page) {
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
              }, index * 100); // تأخير لكل عنصر
          });
      }, 100);

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

  // عرض العناصر في الصفحة الأولى عند التحميل
  displayItems(currentPage);
});
