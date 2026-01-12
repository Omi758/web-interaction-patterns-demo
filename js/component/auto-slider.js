/**
 * auto-slider
 * ------------------------------
 * 自動スライドカード
 * 仕様：
 * -スライドカードをclickするとカードが反転する
 * -click時にautoScrollを一時停止
 * -一定時間後にautoScrollを再開
 * -スライドカードが画面外に出たらカードが反転をリセット
 */

export const initializeAutoSlider = () => {
  const autoSlider = document.querySelector(".js-auto-slider");

  if (!autoSlider) return;

  const splide = new Splide(autoSlider, {
    type: "loop",
    perPage: 4,
    gap: "24px",
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
      768: {
        perPage: 1,
        gap: "16px",
      },
    },
  });

  // AutoScroll Extensionを有効化
  splide.mount(window.splide.Extensions);

  let autoScrollTimer = null;

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

  // カードクリック制御(反転 + 停止→再開)
  autoSlider.addEventListener("click", (e) => {
    const card = e.target.closest(".slider-card");
    if (!card) return;

    // カード反転
    card.classList.toggle("is-flipped");

    // 一時停止
    splide.Components?.AutoScroll?.pause();

    // 既存タイマーをクリア_連打時の多重予約を防止
    if (autoScrollTimer) clearTimeout(autoScrollTimer);

    // 一定時間後(2秒後)に再開
    autoScrollTimer = setTimeout(() => {
      resetOffscreenCards();
      splide.Components.AutoScroll.play();
    }, 2000);
  });
};
