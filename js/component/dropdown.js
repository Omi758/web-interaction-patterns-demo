export const initializeDropdown = () => {
  const dropdownButton = document.querySelector(".js-dropdown-button");
  const dropdownNav = document.querySelector(".js-dropdown-nav");

  if (!dropdownButton || !dropdownNav) return;

  let isOpen = false;

  // ドロップダウンopen
  const openDropdown = () => {
    gsap.to(dropdownNav, {
      autoAlpha: 1,
      visibility: "visible",
      ease: "power2.inOut",
      duration: 0.2,
    });
  };

  // ドロップダウンclose
  const closeDropdown = () => {
    gsap.to(dropdownNav, {
      autoAlpha: 0,
      visibility: "hidden",
      ease: "power2.inOut",
      duration: 0.2,
    });
  };

  // ボタンクリックで表示/非表示
  dropdownButton.addEventListener("click", (e) => {
    e.stopPropagation();

    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
    isOpen = !isOpen;
  });

  // 外クリックでclose
  document.addEventListener("click", () => {
    closeDropdown();
    isOpen = false;
  });

  // Escapeキーでclose
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDropdown();
      isOpen = false;
    }
  });
};
