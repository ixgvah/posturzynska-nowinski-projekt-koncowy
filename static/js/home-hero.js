(function () {
  const hero = document.querySelector("[data-hero]");
  if (!hero || typeof gsap === "undefined") return;

  const video = hero.querySelector(".hero__video-wrapper");
  const title = hero.querySelector(".hero__title");
  const description = hero.querySelector(".hero__description");
  const cta = hero.querySelector(".hero__cta");
  const ctaInner = cta?.querySelector(".hero__cta-inner");
  const ctaRing = cta?.querySelector(".hero__cta-ring");
  const ctaIcon = cta?.querySelector(".hero__cta-icon");
  const island = document.querySelector(".island");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const unlockScroll = () => {
    document.documentElement.classList.remove("hero-intro-lock");
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("hero:intro-done"));
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  };

  const lockScroll = () => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    document.documentElement.classList.add("hero-intro-lock");
    window.scrollTo(0, 0);
  };

  const setupCtaMotion = () => {
    if (!cta || !ctaInner) return;

    if (ctaRing) {
      gsap.fromTo(
        ctaRing,
        { scale: 1, opacity: 0.55 },
        { scale: 1.45, opacity: 0, duration: 2.4, repeat: -1, ease: "power2.out" }
      );
    }

    const xTo = gsap.quickTo(ctaInner, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(ctaInner, "y", { duration: 0.45, ease: "power3.out" });

    cta.addEventListener("mouseenter", () => {
      gsap.to(ctaInner, { scale: 1.05, duration: 0.35, ease: "power3.out" });
      if (ctaIcon) {
        gsap.to(ctaIcon, { x: 4, duration: 0.4, ease: "power3.out" });
      }
    });

    cta.addEventListener("mouseleave", () => {
      gsap.to(ctaInner, { scale: 1, x: 0, y: 0, duration: 0.45, ease: "power3.out" });
      if (ctaIcon) {
        gsap.to(ctaIcon, { x: 0, duration: 0.4, ease: "power3.out" });
      }
    });

    cta.addEventListener("mousemove", (event) => {
      const rect = cta.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      xTo((event.clientX - cx) * 0.2);
      yTo((event.clientY - cy) * 0.2);
    });
  };

  if (reduceMotion) {
    gsap.set([video, title, description, cta, island], {
      clearProps: "all",
      autoAlpha: 1,
      scale: 1,
      y: 0,
      rotation: 0,
      xPercent: island ? -50 : 0,
    });
    unlockScroll();
    return;
  }

  lockScroll();
  requestAnimationFrame(() => window.scrollTo(0, 0));

  gsap.set(video, { autoAlpha: 0, scale: 0.4, transformOrigin: "center center" });
  gsap.set([title, description], { autoAlpha: 0, y: 28 });
  gsap.set(cta, { autoAlpha: 0, y: 40, scale: 0.35, rotation: -10 });
  if (island) {
    gsap.set(island, { autoAlpha: 0, y: -72, xPercent: -50 });
  }

  const tl = gsap.timeline({
    defaults: { ease: "power4.out" },
    onComplete: unlockScroll,
  });

  tl.to(video, {
    autoAlpha: 1,
    scale: 1,
    duration: 2.5,
    ease: "power4.out",
  })
    .to(
      title,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
      },
      "-=0.55"
    )
    .to(
      description,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
      },
      "-=0.55"
    )
    .to(
      cta,
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.95,
        ease: "back.out(2.2)",
      },
      "-=0.35"
    );

  if (island) {
    tl.fromTo(
      island,
      { autoAlpha: 0, y: -72, xPercent: -50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.95,
        ease: "back.out(1.8)",
      },
      "-=0.45"
    );
  }

  tl.call(setupCtaMotion);
})();
