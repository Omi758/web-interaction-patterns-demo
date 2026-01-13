/**
 * auto-slider
 * ------------------------------
 * 自動スライドカード
 * 仕様：
 * - スライドカードをclickするとカードが反転する
 * - スライドは常に動き続ける（一時停止なし）
 * - スライドカードが画面外に出たらカードが反転をリセット
 * - クローンと元スライドの状態を同期
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

  /**
   * 同じ画像を持つカード（クローン含む）を全て取得
   * @param {HTMLElement} card - 基準となるカード要素
   * @returns {NodeList} - 同じ画像srcを持つ全てのカード
   */
  const getSameCards = (card) => {
    const img = card.querySelector("img");
    if (!img) return [];

    const imgSrc = img.getAttribute("src");
    return autoSlider.querySelectorAll(
      `.slider-card:has(img[src="${imgSrc}"])`
    );
  };

  /**
   * 画面外に完全に出たカードのみリセット
   */
  const resetOffscreenCards = () => {
    const sliderRect = autoSlider.getBoundingClientRect();

    autoSlider.querySelectorAll(".slider-card.is-flipped").forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      // カードが完全に画面外（スライダー領域外）に出た場合のみリセット
      const isCompletelyOffscreen =
        cardRect.right < sliderRect.left || cardRect.left > sliderRect.right;

      if (isCompletelyOffscreen) {
        // 同じカード（クローン含む）を全てリセット
        const sameCards = getSameCards(card);
        sameCards.forEach((sameCard) => {
          sameCard.classList.remove("is-flipped");
        });
      }
    });
  };

  /**
   * カードクリック制御（反転のみ、停止なし）
   * クローンと元スライドの状態を同期
   */
  autoSlider.addEventListener("click", (e) => {
    const card = e.target.closest(".slider-card");
    if (!card) return;

    // 現在の状態を取得
    const isCurrentlyFlipped = card.classList.contains("is-flipped");

    // 同じカード（クローン含む）を全て取得して状態を同期
    const sameCards = getSameCards(card);
    sameCards.forEach((sameCard) => {
      if (isCurrentlyFlipped) {
        sameCard.classList.remove("is-flipped");
      } else {
        sameCard.classList.add("is-flipped");
      }
    });
  });
};
