export const initializeHamburgerMenu = () => {
  const menu = document.querySelector(".js-header-menu");
  const menuOpenBtn = document.querySelector(".js-header-menu-open-btn");
  const menuCloseBtn = document.querySelector(".js-header-menu-close-btn");

  if (!menu || !menuOpenBtn || !menuCloseBtn) return;

  // モーダルopen
  const openMenu = () => {
    menu.showModal();
    document.body.style.overflow = "hidden"; // 背景スクロールを防止
    gsap.to(menu, {
      autoAlpha: 1,
      ease: "power2.inOut",
      duration: 0.3,
    });
  };

  // モーダルclose
  const closeMenu = () => {
    gsap.to(menu, {
      autoAlpha: 0,
      ease: "power2.inOut",
      duration: 0.3,
      onComplete: () => {
        menu.close();
        document.body.style.overflow = ""; // スクロールを元に戻す
      },
    });
  };

  // ボタンクリックでopen
  menuOpenBtn.addEventListener("click", () => {
    openMenu();
  });

  // クローズボタンクリックでclose
  menuCloseBtn.addEventListener("click", () => {
    closeMenu();
  });

  // Escapeキーを押すと非表示
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
    }
  });

  // ナビゲーションリンクをクリックするとメニューを閉じる
  const menuLinks = menu.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
};
