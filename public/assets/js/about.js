
// حركة الواجهة 
document.addEventListener("DOMContentLoaded", function () {
  const image = document.querySelector(".about-img img");
  const title = document.querySelector(".about-info h2");
  const subtitle = document.querySelector(".about-info h3");
  const border = document.querySelector(".border-left");
  const typingTextElement = document.querySelector(".typing-text");

  // إخفاء النص الأصلي وتخزينه
  const originalText = typingTextElement.textContent;
  typingTextElement.textContent = ""; // إزالة النص الأصلي

  let isSubtitleTransitionEnded = false; // علامة لتحديد ما إذا انتهى انتقال <h3>

  // تأثير الكتابة الحرف بحرف
  let index = 0;
  const writeText = () => {
      if (index < originalText.length) {
          typingTextElement.innerHTML += originalText.charAt(index); // إضافة الحرف الحالي
          index++;
          setTimeout(writeText, 50); // تأخير 50 ملليثانية لكل حرف
      }
  };

  // تعقب انتهاء انتقال <h3>
  subtitle.addEventListener("transitionend", () => {
      isSubtitleTransitionEnded = true; // تحديث الحالة عند انتهاء الانتقال
      if (typingTextElement.classList.contains("visible") && !typingTextElement.textContent) {
          writeText(); // بدء الكتابة إذا كان النص مرئيًا ولم تبدأ الكتابة من قبل
      }
  });

  // تفعيل التأثير عندما يكون العنصر مرئيًا
  const fadeInOnScroll = () => {
      const rect = image.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight - 50) {
          image.classList.add("visible");
          title.classList.add("visible");
          subtitle.classList.add("visible");
          border.classList.add("visible");

          // التحقق مما إذا كان <h3> قد أصبح مرئيًا وأنتهى انتقاله
          if (subtitle.classList.contains("visible")) {
              typingTextElement.classList.add("visible"); // جعل النص مرئيًا
              if (isSubtitleTransitionEnded && !typingTextElement.textContent) {
                  writeText(); // بدء الكتابة إذا انتهى الانتقال ولم تبدأ الكتابة من قبل
              }
          }
      } else {
          image.classList.remove("visible");
          title.classList.remove("visible");
          subtitle.classList.remove("visible");
          border.classList.remove("visible");

          // إعادة تعيين الحالة وإزالة النص
          isSubtitleTransitionEnded = false;
          typingTextElement.textContent = "";
          typingTextElement.classList.remove("visible");
          index = 0; // إعادة المؤشر إلى البداية
      }
  };

  window.addEventListener("scroll", fadeInOnScroll);
  fadeInOnScroll(); // تشغيل التأثير عند التحميل
});

// انميشن العناصر 
document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".fade-slide-up");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, entry.target.dataset.delay || 200);
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((el) => observer.observe(el));
});

// حركة البوردر والنص
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".border-animation");

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const borderElement = entry.target;
              const paragraphs = borderElement.querySelectorAll("p");

              // إضافة الكلاس لتشغيل الأنيميشن عند الظهور
              borderElement.classList.add("animate-border");

              setTimeout(() => {
                  borderElement.style.animation = "none"; // إيقاف الأنيميشن بعد تشغيله
                  borderElement.style.borderColor = "#ff5000"; // تثبيت لون البوردر

                  // إظهار النص سطرًا تلو الآخر
                  paragraphs.forEach((p, index) => {
                      setTimeout(() => {
                          p.style.opacity = 1;
                          p.style.transform = "translateX(0)";
                      }, index * 700);
                  });
              }, 2000); // بعد انتهاء حركة البوردر

              observer.unobserve(borderElement); // إيقاف المراقبة بعد تشغيل الأنيميشن
          }
      });
  }, { threshold: 0.8 }); // يبدأ التفعيل عند ظهور 80% من العنصر

  sections.forEach(section => observer.observe(section));
});


