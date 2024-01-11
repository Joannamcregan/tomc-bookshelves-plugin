/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/bookshelves.js":
/*!************************************!*\
  !*** ./src/modules/bookshelves.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class Bookshelves {
  // 1. describe and create/initiate object
  constructor() {
    this.removeShelfButtons = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".tomc-bookshelves--remove-shelf");
    this.renameButtons = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".tomc-bookshelves--rename-shelf");
    this.removeProductButtons = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".tomc-bookshelves--remove-book");
    this.addAllBooksButtons = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".tomc-bookshelves--add-all-books");
    this.addBook = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".tomc-bookshelves__add-book");
    this.searchOverlay = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".tomc-bookshelves__search-overlay");
    this.renameCancelButtons = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".tomc-bookshelves--cancel-name");
    this.deleteCancelButtons = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".tomc-bookshelves--cancel-delete");
    this.events();
    this.isSearchOverlayOpen = false;
  }
  // // 2. events
  events() {
    this.removeShelfButtons.on("click", function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent("div").parent("div").children("div.tomc-bookshelves--delete-shelf-overlay").removeClass("tomc-bookshelves--display-none");
      jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").addClass("body-no-scroll");
    });
    this.deleteCancelButtons.on("click", function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent("div").addClass("tomc-bookshelves--display-none");
      jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").removeClass("body-no-scroll");
    });
    this.renameButtons.on("click", function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent("div.tomc-bookshelves--shelf-name-section").addClass("tomc-bookshelves--display-none");
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent("div").parent("div").children("div.tomc-bookshelves--shelf-name-center").removeClass("tomc-bookshelves--display-none");
    });
    this.renameCancelButtons.on("click", function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent("div").parent("div.page-accent-profile").children("div.tomc-bookshelves--shelf-name-section").removeClass("tomc-bookshelves--display-none");
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent("div").addClass("tomc-bookshelves--display-none");
    });
    this.removeProductButtons.on("click", this.deleteShelfProduct.bind(this));
    this.addAllBooksButtons.on("click", this.addAllBooks.bind(this));
  }

  // // 3. methods (functions, actions...)
  deleteShelfProduct(e) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
      },
      url: tomcBookshelvesData.root_url + '/wp-json/tomcBookshelves/v1/manageProducts',
      type: 'DELETE',
      data: {
        'product': jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).data('product-id')
      },
      success: response => {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parent("div.book-section--small").slideUp();
      },
      error: response => {
        console.log(response);
      }
    });
  }
  addAllBooks(e) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
      },
      url: tomcBookshelvesData.root_url + '/wp-json/tomcBookshelves/v1/manageShelves',
      type: 'POST',
      data: {
        'shelf': jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).data('shelf-id')
      },
      success: response => {
        location.reload(true);
      },
      error: response => {
        console.log(response);
      }
    });
  }
  openSearchOverlay() {
    console.log("opening the search box");
    // this.searchOverlay.addClass("tomc-bookshelves__box--active");
  }
  //     openOverlay(){
  //         this.searchOverlay.addClass("search-overlay--active");
  //         $("body").addClass("body-no-scroll");
  //         this.searchField.val('');
  //         setTimeout(() => this.searchField.focus(), 301);
  //         this.isOverlayOpen = true;
  //         return false;
  //     }
  closeSearchOverlay() {
    console.log("closing time");
    // this.renameBox.removeClass("tomc-bookshelves__box--active");
    // $("body").removeClass("body-no-scroll");
    // this.isSearchOverlayOpen = false;
  }
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bookshelves);

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
/* harmony import */ var _modules_bookshelves__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/bookshelves */ "./src/modules/bookshelves.js");

const tomcBookshelvesSearch = new _modules_bookshelves__WEBPACK_IMPORTED_MODULE_0__["default"]();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map