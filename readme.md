# 🧩 Web Interaction Patterns – Web Coding Demo（デモサイト）

![web interaction patterns demo-site](img/common/web-interaction-patterns-kv-img.webp "web interaction patterns demo-site")

## 🔗 Demo

（Demo Site URL）
[https://web-interaction-patterns.omiportfolio.com/](https://web-interaction-patterns.omiportfolio.com/)

&nbsp;

## 📝 Overview（概要）

製作期間：約 2 週間 (2026 年 1 月)

**Web制作で頻出するインタラクションの実装を、理解と検証を目的としてまとめたデモサイト**です。
**JavaScriptをメインに使用**し、HamburgerMenu・TabMenu・AccordionなどWeb制作では欠かせない機能をセクションに分けて実装しています。
また**GSAPやSplideの定番のライブラリも活用**し、心地よいアニメーションを導入することで操作性の向上を図るよう努めています。

【各セクションの内容】

- Modal
- Dropdown Menu
- Tab Menu
- Accordion
- Hamburger Menu
- Sticky Header
- Sticky CTA
- Infinity Slider

各セクションに関する詳細な仕様は**実際のデモサイトをご覧ください。**

&nbsp;

## 🛠️ Tech Stack（使用技術）

<p align="left">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="40" alt="HTML5" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40" alt="CSS3" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" width="40" alt="SCSS" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40" alt="JavaScript" />
<img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black" width="50" alt="GSAP" />
<img src="https://img.shields.io/badge/Splide-005BBB?style=for-the-badge" width="50" alt="Splide" />
</p>

&nbsp;

## ✨ Features（制作ポイント）

### 1. 実際のサイト構築に欠かせない定番のUIを実装

- どのUIもWeb制作でよく実装されるものですが、定番だからこそ非常に重要なパーツです。**GSAP等のライブラリを用いる事でリッチかつユーザーにとって心地よいアニメーションを実現**しています。

### 2. ローディングアニメーションを導入

- シンプルなサイト構成に見合う様に控え目なアニメーションですが、タイポグラフィを活用し遊び心も取り入れました。


### 3. サイト構成＆オリジナルデザイン

- 今回、サイトの構成からデザイン・実装まで担当しています。


### 4. JSライブラリ**SplideのAutoScrollを使用**したスライダーの設置

- Infinity Sliderを実装しました。クリックするとスライドが反転します。実際の現場ではあまり見られない実装かもしれませんが、実験・検証を目的としたサイトとして挑戦しています。
  

  &nbsp;

## 📂 Directory（主な構成）

```text
.
├── index.html
├── css
│   ├── style.css
│   └── vendor
│       └── splide-core.min.css
├── img
├── js
│   ├── component
│   │   ├── accordion.js
│   │   ├── auto-slider.js
│   │   ├── dropdown.js
│   │   ├── hamburger-menu.js
│   │   ├── header-background-toggle.js
│   │   ├── loading-animation.js
│   │   ├── modal.js
│   │   ├── smooth-scroll.js
│   │   ├── sticky-cta.js
│   │   ├── sticky-header.js
│   │   ├── switch-viewport.js
│   │   └── tab-menu.js
│   ├── main.js
│   └── vendor
│       ├── gsap.min.js
│       ├── ScrollToPlugin.min.js
│       ├── ScrollTrigger.min.js
│       ├── splide-extension-auto-scroll.min.js
│       └── splide.min.js
└── scss
    ├── component
    │   ├── _button.scss
    │   ├── _card.scss
    │   ├── _index.scss
    │   └── _title.scss
    ├── foundation
    │   ├── _base.scss
    │   ├── _index.scss
    │   └── _reset.scss
    ├── global
    │   ├── _breakpoints.scss
    │   ├── _color.scss
    │   ├── _content-width.scss
    │   ├── _font.scss
    │   ├── _index.scss
    │   └── _z-index.scss
    ├── layout
    │   ├── _container.scss
    │   ├── _footer.scss
    │   ├── _header.scss
    │   ├── _hover.scss
    │   └── _index.scss
    ├── page
    │   ├── _index.scss
    │   └── top
    │       ├── _accordion.scss
    │       ├── _auto-slider.scss
    │       ├── _dropdown.scss
    │       ├── _github-link.scss
    │       ├── _kv.scss
    │       ├── _loading.scss
    │       ├── _modal.scss
    │       ├── _sticky-header.scss
    │       ├── _tab.scss
    │       └── _top-common.scss
    ├── style.scss
    └── utility
        ├── _index.scss
        └── _utility.scss
```

## 💻 Development Environment（開発環境）

- Cursor
- SCSS / Live Sass Compiler
- Live Server

&nbsp;

## ⚠️ Notes（注意事項）

- 本サイトは学習目的で制作したデモサイトです。

&nbsp;
