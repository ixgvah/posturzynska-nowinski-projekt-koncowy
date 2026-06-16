(function () {
  const page = document.querySelector("[data-auth-panel]");
  if (!page || typeof gsap === "undefined") return;

  const orbs = page.querySelectorAll(".auth-visual__orb");
  const lines = page.querySelectorAll("[data-auth-line]");
  const fields = page.querySelectorAll("[data-auth-field]");
  const submit = page.querySelector(".auth-form__submit");
  const submitInner = submit?.querySelector(".auth-form__submit-inner");
  const submitRing = submit?.querySelector(".auth-form__submit-ring");
  const submitIcon = submit?.querySelector(".auth-form__submit-icon");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setupSubmitMotion = () => {
    if (!submit || !submitInner) return;

    if (submitRing) {
      gsap.fromTo(
        submitRing,
        { scale: 1, opacity: 0.5 },
        { scale: 1.4, opacity: 0, duration: 2.2, repeat: -1, ease: "power2.out" }
      );
    }

    const xTo = gsap.quickTo(submitInner, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(submitInner, "y", { duration: 0.4, ease: "power3.out" });

    submit.addEventListener("mouseenter", () => {
      gsap.to(submitInner, { scale: 1.04, duration: 0.3, ease: "power3.out" });
      if (submitIcon) gsap.to(submitIcon, { x: 4, duration: 0.35, ease: "power3.out" });
    });

    submit.addEventListener("mouseleave", () => {
      gsap.to(submitInner, { scale: 1, x: 0, y: 0, duration: 0.4, ease: "power3.out" });
      if (submitIcon) gsap.to(submitIcon, { x: 0, duration: 0.35, ease: "power3.out" });
    });

    submit.addEventListener("mousemove", (event) => {
      const rect = submit.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      xTo((event.clientX - cx) * 0.16);
      yTo((event.clientY - cy) * 0.16);
    });
  };

  if (reduceMotion) {
    gsap.set([orbs, lines, fields], { clearProps: "all", autoAlpha: 1, x: 0, y: 0, scale: 1 });
    return;
  }

  gsap.set(orbs, { autoAlpha: 0, scale: 0.5 });
  gsap.set(lines, { autoAlpha: 0, y: 36 });
  gsap.set(fields, { autoAlpha: 0, y: 22 });

  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  tl.to(orbs, {
    autoAlpha: 1,
    scale: 1,
    duration: 1.3,
    stagger: 0.15,
  })
    .to(
      lines,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.1,
      },
      "-=0.85"
    )
    .to(
      fields,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.07,
      },
      "-=0.45"
    )
    .call(setupSubmitMotion);

  orbs.forEach((orb, index) => {
    gsap.to(orb, {
      y: `+=${18 + index * 12}`,
      x: `+=${8 + index * 6}`,
      duration: 2.8 + index * 0.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });
})();
