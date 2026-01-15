/**
 * 固定CTAボタン
 * 仕様：
 * - スクロールでCTAボタンを表示
 * - SPサイズはボタン非表示(768px以上で表示)
 * - 画面上端がheaderの下端に達したらCTAボタンを表示
 * - 画面上端がSticky CTA Buttonセクションの上端に達したらCTAボタンを非表示
 */

export const initializeStickyCta = () => {
  const fixedCtaElement = document.querySelector(".js-cta-button");
  const hideTarget = document.querySelector(".js-sticky-cta");
  const showTarget = document.querySelector(".js-header");
  const fixedCtaClass = "is-fixed";

  // 必要な要素が存在しない場合は処理中断
  if (!fixedCtaElement || !showTarget || !hideTarget) return;
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  // 初期設定
  const setInitialHiddenState = () => {
    gsap.killTweensOf(fixedCtaElement);
    gsap.set(fixedCtaElement, { y: 20, opacity: 0 });
    fixedCtaElement.classList.remove(fixedCtaClass);
  };

  // CTAボタンを表示
  const showCta = () => {
    gsap.killTweensOf(fixedCtaElement);
    fixedCtaElement.classList.add(fixedCtaClass);
    gsap.to(fixedCtaElement, {
      y: 0,
      opacity: 1,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  // CTAボタンを非表示
  const hideCta = () => {
    gsap.killTweensOf(fixedCtaElement);
    gsap.to(fixedCtaElement, {
      y: 20,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      overwrite: "auto",
      onComplete: () => {
        fixedCtaElement.classList.remove(fixedCtaClass);
      },
    });
  };

  setInitialHiddenState();

  ScrollTrigger.matchMedia({
    "(min-width: 768px)": () => {
      setInitialHiddenState();

      // CTA表示: headerの下端が画面上端に達したら
      const showTrigger = ScrollTrigger.create({
        trigger: showTarget,
        start: "bottom+=40 top",
        onEnter: showCta,
        onLeaveBack: hideCta,
        // markers: true, // マーカーを表示
      });

      // CTA非表示: Sticky CTA Buttonセクションの下端が画面下端に達したら
      const hideTrigger = ScrollTrigger.create({
        trigger: hideTarget,
        start: "bottom bottom",
        onEnter: hideCta,
        onLeaveBack: showCta,
        // markers: true, // マーカーを表示
      });

      return () => {
        showTrigger.kill();
        hideTrigger.kill();
        setInitialHiddenState();
      };
    },
    "(max-width: 767px)": () => {
      setInitialHiddenState();
    },
  });
};
