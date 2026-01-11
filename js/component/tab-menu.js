export const initializeTabMenu = () => {
  const tabs = document.querySelectorAll("[data-button]");
  const contents = document.querySelectorAll("[data-content]");

  if (!tabs || !contents) return;

  const tabClick = (e) => {
    // クリックしたタブの値を取得
    const targetValue = e.currentTarget.dataset.button;

    // クリックされたbuttonに対応するcontentを表示
    const targetContents = document.querySelector(
      '[data-content="' + targetValue + '"]'
    );

    // すべてのis-activeクラスを削除
    [tabs, contents].forEach((array) =>
      array.forEach((element) => element.classList.remove("is-active"))
    );

    // GSAPが設定したインラインスタイルをリセット
    gsap.set(contents, { clearProps: "all" });

    // クリックされたbuttonに対応するcontentにis-activeクラスを追加
    targetContents.classList.add("is-active");

    // クリックされたtabにis-activeクラスを追加
    e.currentTarget.classList.add("is-active");

    // contentsのアニメーション
    gsap.fromTo(
      targetContents,
      {
        autoAlpha: 0,
        y: 10,
      },
      {
        autoAlpha: 1,
        y: 0,
        ease: "power2.inOut",
        duration: 0.6,
      }
    );
  };

  // tabクリックで発火
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      tabClick(e);
    });
  });
};
