export const initializeModal = () => {
  const modal = document.querySelector(".js-modal");
  const modalOverlay = document.querySelector(".js-modal-overlay");
  const modalContents = document.querySelector(".js-modal-contents");
  const modalCloseBtn = document.querySelector(".js-modal-close-btn");
  const modalOpenBtn = document.querySelector(".js-modal-open-btn");

  if (!modal || !modalOverlay || !modalCloseBtn || !modalOpenBtn) return;

  // スクロールバーの幅を取得
  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  // モーダルopen
  const openModal = () => {
    modal.showModal();

    // 背景スクロールを固定
    document.body.style.overflow = "hidden";

    gsap.to(modalContents, {
      scale: 1,
      opacity: 1,
      ease: "power2.inOut",
      duration: 0.3,
    });

    gsap.to(modalOverlay, {
      autoAlpha: 1,
      ease: "power2.inOut",
      duration: 0.3,
    });
  };

  // モーダルclose
  const closeModal = () => {
    gsap.to(modalContents, {
      opacity: 0,
      scale: 0.95,
      ease: "power2.inOut",
      duration: 0.3,
      onComplete: () => {
        modal.close();
        // 背景スクロールを解除 + padding解除
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      },
    });

    gsap.to(modalOverlay, {
      autoAlpha: 0,
      ease: "power2.inOut",
      duration: 0.3,
    });
  };

  // ボタンクリックでopen
  modalOpenBtn.addEventListener("click", () => {
    openModal();
  });

  // クローズボタンクリックでclose
  modalCloseBtn.addEventListener("click", () => {
    closeModal();
  });

  // 背景（コンテンツ外）クリックでclose
  modal.addEventListener("click", (event) => {
    // クリックした要素が.js-modal-contentsの外側ならclose
    if (event.target.closest(".js-modal-contents") === null) {
      closeModal();
    }
  });

  // Escapeキーを押すと非表示
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
    }
  });
};
