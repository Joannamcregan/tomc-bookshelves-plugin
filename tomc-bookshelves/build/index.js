/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/searchBooks.js":
/*!************************************!*\
  !*** ./src/modules/searchBooks.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class SearchBooks {
  // 1. describe and create/initiate object
  constructor() {
    this.addRenameBoxHTML();
    this.renameBox = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".tomc-bookshelves__rename-box");
    this.renameButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".tomc-bookshelves--rename-shelf");
    //         this.addSearchHTML();
    //         this.resultsDiv = $("#search-overlay__results");
    //         this.openButton = $(".js-search-trigger");
    //         this.closeButton = $(".search-overlay__close");
    //         this.searchOverlay = $(".search-overlay");
    //         this.searchField = $("#search-term");
    this.events();
    //         this.isOverlayOpen = false;
    //         this.isSpinnerVisible = false;
    //         this.previousValue;
    //         this.typingTimer;
  }
  // // 2. events
  events() {
    this.renameButton.on("click", this.openRenameBox.bind(this));
    // this.openButton.on("click", this.openOverlay.bind(this));
    // this.closeButton.on("click", this.closeOverlay.bind(this));
    // $(document).on("keydown", this.keyPressDispatcher.bind(this));
    // this.searchField.on("keyup", this.typingLogic.bind(this));
  }

  // // 3. methods (functions, actions...)
  openRenameBox() {
    this.renameBox.addClass("tomc-bookshelves__rename-box--active");
  }
  //     openOverlay(){
  //         this.searchOverlay.addClass("search-overlay--active");
  //         $("body").addClass("body-no-scroll");
  //         this.searchField.val('');
  //         setTimeout(() => this.searchField.focus(), 301);
  //         this.isOverlayOpen = true;
  //         return false;
  //     }
  //     closeOverlay(){
  //         this.searchOverlay.removeClass("search-overlay--active");
  //         this.resultsDiv.html('');
  //         $("body").removeClass("body-no-scroll");
  //         this.isOverlayOpen = false;
  //     }
  //     typingLogic() {
  //         if (this.searchField.val() != this.previousValue) {
  //             clearTimeout(this.typingTimer);
  //             if (this.searchField .val()) {
  //                 if (!this.isSpinnerVisible) {
  //                     this.resultsDiv.html('<div class="generic-content"><div class="spinner-loader"></div></div>');
  //                     this.isSpinnerVisible = true;
  //                 }
  //                 this.typingTimer = setTimeout(this.getResults.bind(this), 800);
  //             } else {
  //                 this.resultsDiv.html('');
  //                 this.isSpinnerVisible = false;
  //             }            
  //         }
  //         this.previousValue = this.searchField.val();
  //     }
  //     getResults() {
  //         $.getJSON(marketplaceData.root_url + "/wp-json/ebookMarketplace/v1/search?term=" + this.searchField.val(), (results) => {
  //             this.resultsDiv.html(`
  //             <div class="search-result">
  //             ${results.length ? '' : "<p>Sorry! We weren't able to find anything that matches that search.</p>"}
  //                 ${results.map(item => `
  //                     <li>
  //                     ${item.posttype == "author-profile" ? "See books by author " : ''}
  //                     ${item.posttype == "curations" ? "Check out the curated bookshelf " : ""} 
  //                         <a href="${item.permalink}">
  //                             ${item.thumbnail ? `<img src="${item.thumbnail}" />` : ''} 
  //                             ${item.title}
  //                         </a>
  //                         ${item.posttype == "product" && item.title != "Gift Card" ? `<br> by ${item.productauthor}` : ""} 
  //                         ${item.posttype == "short" ? `<br> by ${item.shortauthor}` : ""}
  //                         ${item.excerpt ? '<br><br>' + item.excerpt : ''}
  //                     </li>`).join("")}
  //             ${results.length ? "</li></div>" : '</div>'}
  //             `);
  //             this.isSpinnerVisible = false;
  //         });
  //     }
  //     keyPressDispatcher(e) {
  //         if(e.keyCode == 83 && !this.isOverlayOpen && !$("input, textarea").is(':focus')) {
  //             this.openOverlay()
  //         }
  //         if(e.keyCode == 27 && this.isOverlayOpen) {
  //             this.closeOverlay()
  //         }
  //     }
  addRenameBoxHTML() {
    console.log("addRenameBoxHTML called");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').append(`
            <div class="tomc-bookshelves__rename-box">test addRenameBoxHTML</div>
        `);
  }
  //     addSearchHTML() {
  //         $('body').append(`
  //             <div class="search-overlay">
  //                 <div class="search-overlay__top">
  //                     <div class="overlay-main-container"> 
  //                     <i class="fa fa-window-close search-overlay__close" aria-hidden = "true"></i>
  //                     <div class="overlay-input-container">
  //                         <i class="fa fa-search search-overlay__icon" aria-hidden = "true"></i>
  //                         <input type="text" class="search-term" placeholder = "What are you looking for?" id = "search-term">
  //                     </div>
  //                     </div>
  //                 </div>

  //                 <div class="container">
  //                     <div id="search-overlay__results">
  //                     </div>
  //                 </div>
  //             </div>
  //         `);
  // }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchBooks);

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["jQuery"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_searchBooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/searchBooks */ "./src/modules/searchBooks.js");

const tomcBookshelvesSearch = new _modules_searchBooks__WEBPACK_IMPORTED_MODULE_0__["default"]();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map