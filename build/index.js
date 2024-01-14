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
    this.addBookButtons = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".tomc-bookshelves__add-book");
    this.searchOverlay = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".tomc-bookshelves__search-overlay");
    this.searchField = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#tomc-bookshelves__search-term");
    this.resultsDiv = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#tomc-bookshelves--search-results");
    this.closeOverlay = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".tomc-bookshelves__search-overlay__close");
    this.renameCancelButtons = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".tomc-bookshelves--cancel-name");
    this.deleteCancelButtons = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".tomc-bookshelves--cancel-delete");
    this.events();
    this.isSearchOverlayOpen = false;
    this.isSpinnerVisible = false;
    this.previousValue;
    this.typingTimer;
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
    this.addBookButtons.on("click", this.openSearchOverlay.bind(this));
    this.closeOverlay.on("click", this.closeSearchOverlay.bind(this));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on("keydown", this.keyPressDispatcher.bind(this));
    this.searchField.on("keyup", this.typingLogic.bind(this));
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
  openSearchOverlay(e) {
    this.searchOverlay.addClass("tomc-bookshelves__box--active");
    this.searchOverlay.data('id', jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).data('shelf-id'));
    // console.log(this.searchOverlay.data('id'));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").addClass("body-no-scroll");
    this.searchField.val('');
    setTimeout(() => this.searchField.focus(), 301);
    this.isSearchOverlayOpen = true;
    return false;
  }
  closeSearchOverlay() {
    this.searchOverlay.removeClass("tomc-bookshelves__box--active");
    this.resultsDiv.html('');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").removeClass("body-no-scroll");
    this.isSearchOverlayOpen = false;
  }
  keyPressDispatcher(e) {
    if (e.keyCode == 83 && !this.isOverlayOpen && !jquery__WEBPACK_IMPORTED_MODULE_0___default()("input, textarea").is(':focus')) {
      this.openSearchOverlay();
    }
    if (e.keyCode == 27 && this.isOverlayOpen) {
      this.closeSearchOverlay();
    }
  }
  addShelfProduct(e) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
      },
      url: tomcBookshelvesData.root_url + '/wp-json/tomcBookshelves/v1/manageProducts',
      type: 'POST',
      data: {
        'product': jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).data('product-id'),
        'shelf': this.searchOverlay.data('id')
      },
      success: $productId => {
        location.reload(true);
      },
      error: response => {
        console.log(response);
      }
    });
  }
  getResults() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default().getJSON(tomcBookshelvesData.root_url + "/wp-json/tomcBookshelves/v1/search?term=" + this.searchField.val(), results => {
      this.resultsDiv.html(`
            <div class="search-result">
            ${results.length ? '' : "<p>Sorry! We weren't able to find anything that matches that search.</p>"}
                ${results.map(item => `
                    <li>
                        ${item.thumbnail ? `<img src="${item.thumbnail}" />` : ''} 
                        ${item.title}
                        ${item.excerpt ? '<br><br>' + item.excerpt : ''}
                        ${item.id ? '<button class="tomc-bookshelves--add-to-shelf" data-product-id = "' + item.id + '">Add to Shelf</button>' : ''}
                    </li>`).join("")}
            ${results.length ? "</li></div>" : '</div>'}
            `);
      this.addToShelfButtons = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".tomc-bookshelves--add-to-shelf");
      this.addToShelfButtons.on("click", this.addShelfProduct.bind(this));
      this.isSpinnerVisible = false;
    });
  }
  typingLogic() {
    if (this.searchField.val() != this.previousValue) {
      clearTimeout(this.typingTimer);
      if (this.searchField.val()) {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.html('<div class="generic-content"><div class="spinner-loader"></div></div>');
          this.isSpinnerVisible = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 800);
      } else {
        this.resultsDiv.html('');
        this.isSpinnerVisible = false;
      }
    }
    this.previousValue = this.searchField.val();
  }
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