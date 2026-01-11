export const initializeAccordion = () => {
  const accordionDetails = document.querySelectorAll(".js-accordion-details");

  // animation中に付与するカスタムデータ属性
  const isRunning = "running";

  // open時に付与するクラス
  const isOpen = "is-open";

  if (!accordionDetails) return;
  accordionDetails.forEach((detail) => {
    const summary = detail.querySelector(".js-accordion-summary");
    const content = detail.querySelector(".js-accordion-contents");

    summary.addEventListener("click", (event) => {
      event.preventDefault();

      // summaryとcontentがない場合は処理を中断
      if (!summary || !content) return;

      // animation中のクリックイベントを無効化(連打防止)
      if (detail.dataset.animStatus === isRunning) return;

      // detailのopen属性を判定
      if (detail.open) {
        detail.classList.remove(isOpen);

        // アニメーション完了後の処理
        const onfinish = () => {
          detail.removeAttribute("open");
          detail.dataset.animStatus = "";
          content.style = "";
        };

        // アニメーションを実行
        gsap.to(content, {
          height: 0,
          opacity: 0,
          ease: "power2.out",
          duration: 0.4,
          onComplete: onfinish,
        });

        // アニメーション実行中用の値を付与
        detail.dataset.animStatus = isRunning;
      } else {
        detail.setAttribute("open", "true");
        detail.classList.add(isOpen);

        // アイコン操作用クラスを切り換える(クラス付与)
        content.style.visibility = "hidden";
        content.style.height = "auto";
        let contentHeight = content.offsetHeight; // コンテンツの高さを取得
        content.style.height = "0";
        content.style.visibility = "";

        // アニメーション完了後にアニメーション実行中用の値を削除
        const onfinish = () => {
          detail.dataset.animStatus = "";
          content.style.height = "auto"; // アニメーション完了後にheightをautoに戻す(コンテンツの見切れ対策)
        };

        // アニメーションを実行
        gsap.to(content, {
          height: contentHeight + "px",
          opacity: 1,
          ease: "power2.out",
          duration: 0.4,
          onComplete: onfinish,
        });

        // アニメーション実行中用の値を入れる
        detail.dataset.animStatus = isRunning;
      }
    });
  });
};
