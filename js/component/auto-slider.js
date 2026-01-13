/**
 * auto-slider
 * ------------------------------
 * 自動スライドカード
 * 仕様：
 * -スライドカードをclickするとカードが反転する
 * -スライドは常に動き続ける（一時停止なし）
 * -スライドカードが画面外に出たらカードが反転をリセット
 */

export const initializeAutoSlider = () => {
  const autoSlider = document.querySelector(".js-auto-slider");

  if (!autoSlider) return;

  const splide = new Splide(autoSlider, {
    type: "loop",
    fixedWidth: "360px",
    gap: "32px",
    arrows: false,
    pagination: false,
    drag: false,
    pauseOnHover: false,
    pauseOnFocus: false,

    autoScroll: {
      speed: 1,
      pauseOnHover: false,
      pauseOnFocus: false,
    },

    breakpoints: {
      1079: {
        fixedWidth: "360px",
        gap: "32px",
      },

      767: {
        fixedWidth: "280px",
        gap: "32px",
      },
      499: {
        gap: "24px",
        fixedWidth: "280px",
      },
    },
  });

  // AutoScroll Extensionを有効化
  splide.mount(window.splide.Extensions);

  // 画面外に完全に出たカードのみリセット
  const resetOffscreenCards = () => {
    const sliderRect = autoSlider.getBoundingClientRect();

    autoSlider.querySelectorAll(".slider-card.is-flipped").forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      // カードが完全に画面外（スライダー領域外）に出た場合のみリセット
      const isCompletelyOffscreen =
        cardRect.right < sliderRect.left || cardRect.left > sliderRect.right;

      if (isCompletelyOffscreen) {
        card.classList.remove("is-flipped");
      }
    });
  };

  // 定期的に画面外チェック（auto-scrollは連続移動なのでintervalで監視）
  setInterval(resetOffscreenCards, 500);

  // カードクリック制御（反転のみ、停止なし）
  autoSlider.addEventListener("click", (e) => {
    const card = e.target.closest(".slider-card");
    if (!card) return;

    // カード反転
    card.classList.toggle("is-flipped");
  });
};
