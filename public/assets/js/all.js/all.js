
// header
// زر القائمة العلوية لاظهار الشريط
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('nav ul');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
});

// Dark Light Mode
let darkModeButton = document.getElementById('darkModeButton');
const body = document.body;
const enableDarkMode = () => {
  
    body.classList.add('dark-mode');

}
const disableDarkMode = () => {
    body.classList.remove('dark-mode');
}
darkModeButton.addEventListener('change', () => {
    if(darkModeButton.checked){
        disableDarkMode();

    } else{
        enableDarkMode();
    }
});

// scroll
let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById('progress-value');
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100)/ calcHeight);
    if(pos > 100){
      scrollProgress.style.display = "grid";
  
    }
    else{
      scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
      document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = `conic-gradient(#ff5000 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
  
  
  };
  window.onscroll = calcScrollValue;
  window.onload = calcScrollValue
  //   button top in footer
  document.addEventListener("DOMContentLoaded", () => {
    const circles = document.querySelectorAll(".progress-circle");
  
    circles.forEach(circle => {
        const percentage = parseInt(circle.getAttribute("data-percentage"), 10);
        let color = "red";
  
        if (percentage > 50 && percentage <= 80) {
            color = "orange";
        } else if (percentage > 80) {
            color = "green";
        }
  
        circle.style.setProperty("--color", color);
  
        let currentProgress = 0;
        const targetProgress = percentage * 3.6;
        const speed = 20;
  
        const percentageText = circle.querySelector(".percentage-text");
  
        const interval = setInterval(() => {
            if (currentProgress >= targetProgress) {
                clearInterval(interval);
            } else {
                currentProgress += 3;
                let currentPercentage = Math.min(Math.round(currentProgress / 3.6), percentage);
  
                circle.style.background = `conic-gradient(${color} ${currentProgress}deg, gray ${currentProgress}deg)`;
  
                // تحديث النص وجعله فوق الخلفية
                percentageText.textContent = `${currentPercentage}%`;
                percentageText.style.zIndex = "2";
            }
        }, speed);
    });
  });