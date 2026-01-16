/**
 * スムーススクロール
 * 仕様：
 * - リンクをクリックしたらスムーススクロールで遷移
 */

export const initializeSmoothScroll = () => {
  const header = document.querySelector(".js-header");
  const anchorLinks = document.querySelectorAll("a[href^='#']");

  if (!anchorLinks) return;

  anchorLinks.forEach((anchorLink) => {
    anchorLink.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = anchorLink.getAttribute("href");

      // href="#"だけの場合はページトップへ
      if (targetId === "#") {
        gsap.to(window, {
          scrollTo: {
            y: 0,
            autoKill: false,
          },
        });
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // クリック時点のヘッダー高さを取得
        const headerHeight = header.offsetHeight;
        gsap.to(window, {
          scrollTo: {
            y: targetElement,
            autoKill: false,
            offsetY: headerHeight,
          },
          duration: 1,
          ease: "power2.inOut",
        });
      }
    });
  });
};
