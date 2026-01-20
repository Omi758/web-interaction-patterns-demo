/**
 * auto-slider
 * ------------------------------
 * 自動スライドカード
 * 仕様：
 * - スライドカードをclickするとカードが反転する
 * - スライドは常に動き続ける（一時停止なし）
 * - 一定時間後(50秒)にカードが自動でリセット（表に戻る）
 * - クローンと元スライドの状態を同期
 */

export const initializeAutoSlider = () => {
  const autoSlider = document.querySelector(".js-auto-slider");

  if (!autoSlider) return;

  // ----------------------------------
  // 設定値
  // ----------------------------------
  // カードが自動でリセットされるまでの時間（ミリ秒）
  // 1周の時間 - 画面に表示されている時間を引いて少し短めに設定
  const RESET_DELAY = 50000; // 50秒

  // ----------------------------------
  // Splide初期化
  // ----------------------------------
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

  // ----------------------------------
  // 関数定義
  // ----------------------------------

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
   * カードをリセット（表に戻す）
   * @param {NodeList} cards - リセット対象のカード群
   */
  const resetCards = (cards) => {
    cards.forEach((card) => {
      card.classList.remove("is-flipped");
    });
  };

  // ----------------------------------
  // イベント処理
  // ----------------------------------

  /**
   * カードクリック制御
   * - クリックで反転（トグル）
   * - クローンと元スライドの状態を同期
   * - 反転した場合、一定時間後に自動リセット
   */
  autoSlider.addEventListener("click", (e) => {
    const card = e.target.closest(".slider-card");
    if (!card) return;

    // 現在の状態を取得
    const isCurrentlyFlipped = card.classList.contains("is-flipped");

    // 同じカード（クローン含む）を全て取得
    const sameCards = getSameCards(card);

    // 状態を同期して反転
    sameCards.forEach((sameCard) => {
      if (isCurrentlyFlipped) {
        // 裏 → 表に戻す
        sameCard.classList.remove("is-flipped");
      } else {
        // 表 → 裏にする
        sameCard.classList.add("is-flipped");
      }
    });

    // ----------------------------------
    // 自動リセット処理
    // ----------------------------------
    // 表 → 裏に反転した場合のみ、一定時間後に自動でリセット
    if (!isCurrentlyFlipped) {
      setTimeout(() => {
        // RESET_DELAY ミリ秒後に実行される
        resetCards(sameCards);
      }, RESET_DELAY);
    }
  });
};
