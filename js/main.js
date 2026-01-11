import { initializeHamburgerMenu } from "./component/hamburger-menu.js";
import { initializeHeaderBackgroundToggle } from "./component/header-background-toggle.js";
import { switchViewport } from "./component/switch-viewport.js"; // ビューポートの設定を切り替え
import { initializeModal } from "./component/modal.js";
import { initializeDropdown } from "./component/dropdown.js";
import { initializeTabMenu } from "./component/tab-menu.js";
import { initializeAccordion } from "./component/accordion.js";
// 全ての初期化を実行
initializeHamburgerMenu();
initializeHeaderBackgroundToggle();
switchViewport();
initializeModal();
initializeDropdown();
initializeTabMenu();
initializeAccordion();
