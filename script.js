const dialog = document.querySelector("#project-dialog");
const closeDialogButton = document.querySelector(".dialog-close");
const projectRows = document.querySelectorAll(".project-row");

document.querySelector("#current-year").textContent = new Date().getFullYear();

projectRows.forEach((project) => {
  project.addEventListener("click", () => {
    document.querySelector("#dialog-title").textContent = project.dataset.title;
    document.querySelector("#dialog-meta").textContent = project.dataset.meta;
    document.querySelector("#dialog-summary").textContent = project.dataset.summary;
    document.querySelector("#dialog-process").textContent = project.dataset.process;
    document.querySelector("#dialog-result").textContent = project.dataset.result;
    dialog.showModal();
  });
});

closeDialogButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  const motion = gsap.matchMedia();
  motion.add("(prefers-reduced-motion: no-preference)", () => {
    const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
    entrance
      .from(".site-header", { y: -24, opacity: 0, duration: 0.65 })
      .from(".hero-copy > *", { y: 24, opacity: 0, duration: 0.65, stagger: 0.08 }, "-=0.35")
      .from(".avatar-scene", { y: 90, opacity: 0, duration: 0.9 }, "-=0.45");

    gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.8
      }
    })
      .to(".avatar-world", { yPercent: -24, scale: 1.12, ease: "none" }, 0)
      .to(".orbit-one", { rotation: 18, scaleY: 0.68, ease: "none" }, 0)
      .to(".orbit-two", { rotation: 34, scaleX: 0.76, ease: "none" }, 0)
      .to(".hero-copy", { y: -58, opacity: 0.35, ease: "none" }, 0);

    gsap.from(".about-intro > *, .profile-facts > div", {
      scrollTrigger: { trigger: ".about-note", start: "top 76%", once: true },
      y: 32,
      opacity: 0,
      duration: 0.75,
      stagger: 0.08,
      ease: "power3.out"
    });

    gsap.to(".timeline-line span", {
      scrollTrigger: {
        trigger: ".timeline",
        start: "top 72%",
        end: "bottom 70%",
        scrub: true
      },
      scaleY: 1,
      ease: "none"
    });

    gsap.from(".timeline-item", {
      scrollTrigger: { trigger: ".timeline", start: "top 74%", once: true },
      x: 42,
      opacity: 0,
      duration: 0.75,
      stagger: 0.16,
      ease: "power3.out"
    });

    document.querySelectorAll(".project-row").forEach((row, index) => {
      gsap.from(row, {
        scrollTrigger: { trigger: row, start: "top 84%", once: true },
        y: index % 2 === 0 ? 34 : 22,
        rotate: index % 2 === 0 ? -0.7 : 0.7,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out"
      });
    });

    gsap.from(".footer-inner > *", {
      scrollTrigger: { trigger: ".site-footer", start: "top 75%", once: true },
      y: 28,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out"
    });
  });
}
