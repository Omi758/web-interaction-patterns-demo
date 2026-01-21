/**
 * loading-animation
 * ------------------------------
 * ローディングアニメーション
 * 仕様：
 * - 読み込み時の発火対策初期設定としてcss側でbody {opacity: 0;}を設定で非表示
 * - JS読み込み時にbodyにopacity: 1を設定
 * - リロード対策：セッションストレージにaccess: 0を設定
 * - アニメーションはgsap.timeline()で作成
 * - 一部アニメーションにgsap.matchMedia()でレスポンシブ対応
 */

export const initializeLoadingAnimation = () => {
  // JS読み込み時にbodyにopacity: 1を設定（読み込み時の一瞬発火防止策）
  gsap.set("body", {
    opacity: 1,
  });

  var webStorage = function () {
    if (sessionStorage.getItem("access")) {
      // リロード対策
      gsap.set(".loading", {
        display: "none",
      });
    } else {
      sessionStorage.setItem("access", 0);
      // opening timelineを作成
      const opening = gsap.timeline();
      // 上からiconが降ってくる
      opening.fromTo(
        ".js-loading-icon-img",
        {
          y: "-100vh",
        },
        {
          y: 0,
          duration: 1.2,
          ease: "bounce.out",
        }
      );

      /* iconが右へ移動
       * gsap.matchMedia()でレスポンシブ対応 */
      const mm = gsap.matchMedia();

      // PC版(768px以上)
      mm.add("(min-width: 768px)", () => {
        opening.to(".js-loading-icon-img", {
          x: 112,
          duration: 1,
          ease: "power4.inOut",
        });
      });
      // SP版(767px以下)
      mm.add("(max-width: 767px)", () => {
        opening.to(".js-loading-icon-img", {
          x: 80,
          duration: 1,
          ease: "power4.inOut",
        });
      });

      // テキストが上下交互に表示（stagger使用）
      opening.fromTo(
        ".loading-text-item",
        {
          y: (i) => (i % 2 === 0 ? -32 : 32), // 偶数番目(0,2,4...)は上から、奇数番目(1,3,5...)は下から
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.6,
        }
      );

      // テキストが逆順で上下交互に消える（0.6秒待ってから開始）
      opening.to(
        ".loading-text-item",
        {
          y: (i) => (i % 2 === 0 ? -32 : 32), // 偶数番目は上へ、奇数番目は下へ
          opacity: 0,
          duration: 0.5,
          stagger: {
            each: 0.1, // 各要素間の遅延_0.1秒ずつずらす（durationより小さいので重なる）
            from: "start", // 最後の要素(p)から逆順に消える
          },
        },
        "+=0.6"
      ); // 前のアニメーション終了から0.6秒後に開始

      // js-iconを非表示
      opening.to(
        ".js-loading-icon-img",
        {
          y: 32,
          autoAlpha: 0,
          duration: 0.5,
        },
        "-=0.4"
      );

      // ローディング背景フェードアウト
      opening.fromTo(
        ".loading",
        {
          autoAlpha: 1,
        },
        {
          autoAlpha: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.4"
      );
      // loading画面を削除
      opening.to(
        ".loading",
        {
          display: "none",
        },
        "-=0.8"
      );

      // kvタイトルが下から上に表示
      opening.fromTo(
        ".top-kv-copy-title span",
        {
          yPercent: 100,
          autoAlpha: 0,
        },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power2.inOut",
          stagger: 0.2,
        },
        "-=0.5"
      );

      //headerがフェードイン
      opening.fromTo(
        ".header",
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.5"
      );

      // kv-copy-textがフェードイン
      opening.fromTo(
        ".top-kv-copy-text",
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.5"
      );

      // kv-text-jaがフェードイン
      opening.fromTo(
        ".top-kv-text-ja",
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.5"
      );
    }
  };

  webStorage();
};
