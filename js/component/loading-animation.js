export const initializeLoadingAnimation = () => {
  // opening timelineを作成
  const opening = gsap.timeline();
  // 上からiconが降ってくる
  opening.fromTo(".js-loading-icon-img", {
    y: "-100vh",
  }, {
    y: 0,
    duration: 1.2,
    ease: "bounce.out",
  });

// iconが右へ移動
opening.to(".js-loading-icon-img", {
  x: 112,
  duration: 1,
  ease: "power4.inOut",
});

// テキストが上下交互に表示（stagger使用）
opening.fromTo(".loading-text-item", {
  y: (i) => (i % 2 === 0 ? -32 : 32), // 偶数番目(0,2,4...)は上から、奇数番目(1,3,5...)は下から
  opacity: 0,
}, {
  y: 0,
  opacity: 1,
  duration: 0.6,
  stagger: 0.6, // durationより大きくすると時間の重なりが消える
});

// テキストが逆順で上下交互に消える（1秒待ってから開始）
opening.to(".loading-text-item", {
  y: (i) => (i % 2 === 0 ? -32 : 32), // 偶数番目は上へ、奇数番目は下へ
  opacity: 0,
  duration: 0.5,
  stagger: {
    each: 0.1,    // 各要素間の遅延_0.1秒ずつずらす（durationより小さいので重なる）
    from: "start",  // 最後の要素(p)から逆順に消える
  },
}, "+=0.6"); // 前のアニメーション終了から1秒後に開始

// js-iconを非表示
opening.to(".js-loading-icon-img", {
  y: 32,
  opacity: 0,
  duration: 0.5,
},"-=0.4");

// ローディング背景フェードアウト
}
