/**
 * 固定CTAボタン
 * 仕様：
 * - スクロールでCTAボタンを表示
 * - SPサイズはボタン非表示(768px以上で表示)
 * - 画面上端がheaderの下端に達したらCTAボタンを表示
 * - 画面下端がSticky CTA Buttonセクションの下端に達したらCTAボタンを非表示
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

  // アニメーションなしで表示状態にする（リロード直後の同期用）
  const setShownState = () => {
    gsap.killTweensOf(fixedCtaElement);
    fixedCtaElement.classList.add(fixedCtaClass);
    gsap.set(fixedCtaElement, { y: 0, opacity: 1 });
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

  // リロード時のスクロール位置復元や画像読み込み後のレイアウト確定に追従して、
  // ScrollTriggerの計算をやり直す（初期表示で状態がズレる対策）
  const refreshScrollTriggers = () => {
    ScrollTrigger.refresh();
    ScrollTrigger.update();
  };

  // 初期化直後（スクロール復元の前後差を吸収）
  requestAnimationFrame(() => {
    refreshScrollTriggers();
    setTimeout(refreshScrollTriggers, 0);
  });
  // 画像等の読み込み完了後
  window.addEventListener("load", refreshScrollTriggers, { once: true });
  // 戻る/進む（bfcache）でも同期
  window.addEventListener("pageshow", refreshScrollTriggers);

  ScrollTrigger.matchMedia({
    "(min-width: 768px)": () => {
      setInitialHiddenState();

      // CTA表示: headerの下端を過ぎたら表示
      // CTA非表示: Sticky CTA Buttonセクションの下端を過ぎたら非表示
      // 1つのTriggerで「表示してよい範囲」を定義して競合を避ける
      const rangeTrigger = ScrollTrigger.create({
        trigger: showTarget,
        start: "bottom+=40 top",
        endTrigger: hideTarget,
        end: "bottom+=-40 bottom",
        onEnter: showCta,
        onEnterBack: showCta,
        onLeave: hideCta,
        onLeaveBack: hideCta,
        onRefresh: (self) => {
          // リロード直後など「跨いでいない」ケースでも現在位置に合わせて確定
          if (self.isActive) {
            setShownState();
          } else {
            setInitialHiddenState();
          }
        },
      });

      return () => {
        rangeTrigger.kill();
        setInitialHiddenState();
      };
    },
    "(max-width: 767px)": () => {
      setInitialHiddenState();
    },
  });
};
