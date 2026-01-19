export const initializeLoadingAnimation = () => {
  // GSAP timelineを作成
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

// テキストが上下交互に表示

// テキストとiconが上下交互に消える

// ローディング背景フェードアウト
}
