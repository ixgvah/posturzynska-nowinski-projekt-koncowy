console.clear();
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

let flipCtx;

const createTween = () => {
  const galleryElement = document.querySelector("#gallery-8");
  if (!galleryElement) return;
  const galleryItems = galleryElement.querySelectorAll(".gallery__item");

  flipCtx && flipCtx.revert();
  galleryElement.classList.remove("gallery--final");

  flipCtx = gsap.context(() => {
    galleryElement.classList.add("gallery--final");
    const flipState = Flip.getState(galleryItems);
    galleryElement.classList.remove("gallery--final");

    const flip = Flip.to(flipState, {
      simple: true,
      ease: "expo.inOut",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: galleryElement,
        start: "center center",
        end: "+=100%",
        scrub: true,
        pin: galleryElement.parentNode,
      },
    });
    tl.add(flip);
    return () => gsap.set(galleryItems, { clearProps: "all" });
  });

  window.scrollTo(0, 0);
};

const initGallery = () => {
  createTween();
  window.addEventListener("resize", createTween);
};

if (document.querySelector("[data-hero]")) {
  window.addEventListener("hero:intro-done", initGallery, { once: true });
} else {
  initGallery();
}
