(function () {
  const container = document.getElementById("footerBubbles");
  if (!container) return;

  for (let i = 0; i < 128; i++) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.setProperty("--size", `${2 + Math.random() * 4}rem`);
    bubble.style.setProperty("--distance", `${10 + Math.random() * 14}rem`);
    bubble.style.setProperty("--position", `${-5 + Math.random() * 110}%`);
    bubble.style.setProperty("--time", `${2 + Math.random() * 2}s`);
    bubble.style.setProperty("--delay", `${-(2 + Math.random() * 2)}s`);
    container.appendChild(bubble);
  }
})();
