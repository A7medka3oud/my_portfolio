

// الكتابة المتحركة في الواجهة الرئيسية
const texts = ["Programmer", "Graphic Designer", "Marketer", "Video Editor", "Content Creator", "YouTuber", ];
let currentTextIndex = 0;
let currentCharIndex = 0;
const multiple = document.getElementById("multiple");
function type() {
  const currentText = texts[currentTextIndex];
  if (currentCharIndex < currentText.length) {
    multiple.textContent += currentText[currentCharIndex];
    currentCharIndex++;
    setTimeout(type, 100); // تعديل سرعة الكتابة
  } else {
    setTimeout(deleteText, 1500); // انتظار قبل الحذف
  }
}
function deleteText() {
  if (currentCharIndex > 0) {
    multiple.textContent = multiple.textContent.slice(0, -1);
    currentCharIndex--;
    setTimeout(deleteText, 100); // تعديل سرعة الحذف
  } else {
    multiple.textContent = ""; // مسح النص بالكامل
    currentTextIndex = (currentTextIndex + 1) % texts.length; // الانتقال للنص التالي
    setTimeout(type, 500);
  }
}
// بدء الكتابة بعد 3.3 ثوانٍ
setTimeout(type, 3000);

  // JavaScript لتطبيق الحركة عند الوصول للعنصر
  document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".about-img img, .about-info h2, .about-info h3, .about-info p, .about-info #btn");
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running"; // تشغيل الحركة
        } else {
          entry.target.style.animationPlayState = "paused"; // إيقاف الحركة مؤقتًا عند الخروج من العرض
        }
      });
    }, { threshold: 0.2 });
  
    elements.forEach(element => {
      element.style.animationPlayState = "paused"; // إيقاف الحركة في البداية
      observer.observe(element);
    });
  });

// // //سلايدر
document.addEventListener('DOMContentLoaded', function() {
    // تحديد جميع السلايدرات باستخدام class مشترك
    const sliders = document.querySelectorAll('.swiper-container');

    // تطبيق نفس الإعدادات على كل سلايدر
    sliders.forEach(slider => {
        new Swiper(slider, {
            loop: true,
            spaceBetween: 30,
            grabCursor: true,
            pagination: {
                el: slider.querySelector('.swiper-pagination'),
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: slider.querySelector('.swiper-button-next'),
                prevEl: slider.querySelector('.swiper-button-prev'),
            },
            breakpoints: {
                600: {
                    slidesPerView: 2,
                },
                968: {
                    slidesPerView: 3,
                },
            },
        });
    });
});

// // my skills
//     // العداد
document.addEventListener("DOMContentLoaded", function () {
  const nums = document.querySelectorAll('.num');
  const skillsSection = document.querySelector('.skills');

  const startCounting = (element) => {
    const target = +element.getAttribute('data-val');
    const duration = 2000; // مدة العد
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentNumber = Math.floor(progress * target);

      element.textContent = currentNumber;

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = target;
        const yearsElement = element.nextElementSibling;
        if (yearsElement && yearsElement.classList.contains('years')) {
          yearsElement.style.display = 'inline';
        }
      }
    };

    requestAnimationFrame(updateNumber);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        nums.forEach(num => startCounting(num));
        observer.disconnect(); // إيقاف المراقبة بعد التنفيذ
      }
    });
  }, { threshold: 0.5 }); // بدء العد عند ظهور 50% من القسم

  observer.observe(skillsSection);
});

  //Programs And Tools
document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".progress-circle");

  const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const circle = entry.target;

              // تأكد من أنه لم يتم تشغيل التأثير مسبقًا
              if (circle.dataset.animated === "true") return;

              // ضبط العنصر ليبدأ من الصفر
              circle.style.background = `conic-gradient(gray 0deg, gray 360deg)`;
              const percentageText = circle.querySelector(".percentage-text");
              percentageText.textContent = "0%";

              circle.dataset.animated = "true"; // وضع علامة بأنه تم تشغيله

              setTimeout(() => {
                  const percentage = parseInt(circle.getAttribute("data-percentage"), 10);
                  let color = "red";

                  if (percentage > 50 && percentage <= 80) {
                      color = "orange";
                  } else if (percentage > 80) {
                      color = "green";
                  }

                  let currentProgress = 0;
                  const targetProgress = percentage * 3.6;
                  const speed = 20;

                  const interval = setInterval(() => {
                      if (currentProgress >= targetProgress) {
                          clearInterval(interval);
                          observer.unobserve(circle); // إيقاف المراقبة بعد انتهاء الحركة
                      } else {
                          currentProgress += 3;
                          let currentPercentage = Math.min(Math.round(currentProgress / 3.6), percentage);

                          circle.style.background = `conic-gradient(${color} ${currentProgress}deg, gray ${currentProgress}deg)`;
                          percentageText.textContent = `${currentPercentage}%`;
                      }
                  }, speed);
              }, 500);
          }
      });
  }, observerOptions);

  // تعيين الخلفية والنص لكل عنصر عند تحميل الصفحة
  circles.forEach(circle => {
      circle.style.background = `conic-gradient(gray 0deg, gray 360deg)`;
      const percentageText = circle.querySelector(".percentage-text");
      percentageText.textContent = "0%";
      observer.observe(circle);
  });
});

// clients الشريط المتحرك
document.querySelectorAll(".logos").forEach(logos => {
  const clone = logos.cloneNode(true); // نسخ المحتوى لجعله لا نهائيًا
  logos.parentElement.appendChild(clone);
});






// // ارسال الرسائل للباك اند
// document.getElementById('contactForm').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const formData = new FormData(e.target);
//   const response = await fetch('/send-email', {
//       method: 'POST',
//       body: formData
//   });
//   const result = await response.json();
//   alert(result.message);
// });


