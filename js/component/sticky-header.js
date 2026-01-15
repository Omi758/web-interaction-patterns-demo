/**
 * ヘッダー固定表示
 * 仕様：
 * - スクロールでKVよりも下に到達したらヘッダーを固定表示
 */

export const initializeStickyHeader = () => {
  const header = document.querySelector(".js-header");
  const kvElement = document.querySelector(".js-kv");

  if (!header || !kvElement) return;

  // ヘッダーを固定表示
  const showStickyHeader = () => {
    gsap.set(header, {
      position: "fixed",
      transform: "translateY(-100%)",
      backgroundColor: "var(--color-bg-header-fixed)",
    });
    gsap.to(header, {
      transform: "translateY(0%)",
      duration: 0.3,
      ease: "power2.Out",
    });
  };

  // ヘッダーの固定表示を解除
  const hideStickyHeader = () => {
    gsap.to(header, {
      transform: "translateY(-100%)",
      duration: 0.3,
      ease: "power2.Out",
      onComplete: () => {
        gsap.set(header, {
          position: "absolute",
          transform: "translateY(0%)",
          backgroundColor: "transparent",
        });
      },
    });
  };

  // KVセクションが画面から消えたらヘッダーを固定表示
  ScrollTrigger.create({
    trigger: kvElement,
    start: "bottom top",
    // ここは「関数を実行」ではなく「関数を渡す」
    onEnter: showStickyHeader,
    onLeaveBack: hideStickyHeader,
    // markers: true, // マーカーを表示
  });
};
