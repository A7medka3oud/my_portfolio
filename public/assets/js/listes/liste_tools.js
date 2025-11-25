// تحريك الدائرة
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