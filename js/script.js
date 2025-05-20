const contents = document.querySelectorAll(".panel-content");
let current = 0;
let progress = 0; // 0 = 0%, 1 = 20%, ..., 5 = 100%

function updateContents() {
  contents.forEach((content, idx) => {
    // Entferne alle Klassen für Karussell-Effekt
    content.classList.remove("active", "left", "right");

    let offset = idx - current;
    if (offset < -1) offset += contents.length;
    if (offset > 1) offset -= contents.length;

    // Setze Klassen für Karussell-Effekt
    if (offset === 0) {
      content.classList.add("active");
      content.style.transform = `translateX(-${progress * 20}vw)`;
      content.style.opacity = 1;
      content.style.zIndex = 2;
    } else if (offset === 1 || (current === contents.length - 1 && idx === 0)) {
      content.classList.add("right");
      content.style.transform = `translateX(${100 - progress * 20}vw)`;
      content.style.opacity = 1;
      content.style.zIndex = 1;
    } else if (offset === -1 || (current === 0 && idx === contents.length - 1)) {
      content.classList.add("left");
      content.style.transform = `translateX(-100vw)`;
      content.style.opacity = 0;
      content.style.zIndex = 1;
    } else {
      content.style.transform = `translateX(100vw)`;
      content.style.opacity = 0;
      content.style.zIndex = 0;
    }
  });
}

window.addEventListener("wheel", (e) => {
  if (e.deltaY > 0 && progress < 5) {
    progress++;
    if (progress === 5) {
      current = (current + 1) % contents.length;
      progress = 0;
    }
    updateContents();
  } else if (e.deltaY < 0) {
    if (progress > 0) {
      progress--;
    } else {
      current = (current - 1 + contents.length) % contents.length;
      progress = 5;
    }
    updateContents();
  }
});

updateContents();
