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
    this.searchButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-bookshelves--roll-results');
    this.events();
    this.isSearchOverlayOpen = false;
    this.previousValue;
    this.typingTimer;
  }
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
    this.searchButton.on("click", this.getResults.bind(this));
  }
  deleteShelfProduct(e) {
    console.log(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).closest('.book-sections-container').find('.tomc-bookshelves__add-book').data('shelf-id'));
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
      },
      url: tomcBookshelvesData.root_url + '/wp-json/tomcBookshelves/v1/deleteShelfProduct',
      type: 'POST',
      data: {
        'product': jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).data('product-id'),
        'shelf': jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).closest('.book-sections-container').find('.tomc-bookshelves__add-book').data('shelf-id')
      },
      success: response => {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parent("div.book-section--small").slideUp();
        console.log(response);
      },
      error: response => {
        console.log(response);
      }
    });
  }
  addAllBooks() {
    this.addAllBooksButtons.addClass('contracting');
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
      },
      url: tomcBookshelvesData.root_url + '/wp-json/tomcBookshelves/v1/addAllBooks',
      type: 'POST',
      data: {
        'shelf': this.addAllBooksButtons.data('shelf-id')
      },
      success: response => {
        this.addAllBooksButtons.removeClass('contracting');
        location.reload(true);
      },
      error: response => {
        // console.log(response);
      }
    });
  }
  openSearchOverlay(e) {
    this.addBookButtons.addClass('contracting');
    this.searchOverlay.addClass("tomc-bookshelves__box--active");
    this.searchOverlay.data('id', jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).data('shelf-id'));
    console.log(this.searchOverlay.data('id'));
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").addClass("body-no-scroll");
    this.searchField.val('');
    setTimeout(() => this.searchField.focus(), 301);
    setTimeout(() => this.addBookButtons.removeClass('contracting'), 1000);
    this.isSearchOverlayOpen = true;
    return false;
  }
  closeSearchOverlay() {
    this.searchOverlay.removeClass("tomc-bookshelves__box--active");
    this.resultsDiv.html('');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").removeClass("body-no-scroll");
    this.isSearchOverlayOpen = false;
  }
  addShelfProduct(e) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).addClass('contracting');
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
      },
      url: tomcBookshelvesData.root_url + '/wp-json/tomcBookshelves/v1/addProductToShelf',
      type: 'POST',
      data: {
        'product': jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).data('product-id'),
        'shelf': this.searchOverlay.data('id')
      },
      success: response => {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).removeClass('contracting');
        location.reload(true);
      },
      error: response => {
        // console.log(response);
      }
    });
  }
  getResults() {
    if (this.searchField.val().length > 2) {
      let routeData = {
        'searchterm': this.searchField.val().substring(0, 300)
      };
      this.searchButton.addClass('contracting');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-search--no-search-term').addClass('hidden');
      jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        beforeSend: xhr => {
          xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
        },
        url: tomcBookorgData.root_url + '/wp-json/tomcBookshelves/v1/bookSearch',
        type: 'GET',
        data: routeData,
        success: response => {
          this.searchButton.removeClass('contracting');
          if (response.length < 1) {
            this.resultsDiv.html("<p class='centered-text'>Sorry! We couldn't find any matching results.</p>");
          } else {
            this.resultsDiv.html("");
            for (let i = 0; i < response.length; i++) {
              let newDiv = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div />').addClass('tomc-search-result').attr('id', 'tomc-browse-genres--results--book-' + response[i]['id']);
              let newTitle = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<h1 />').addClass('centered-text, small-heading').html(response[i]['title']);
              newDiv.append(newTitle);
              let format = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p />');
              let em = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<em />').html(response[i]['type_name'].slice(0, -1));
              format.append(em);
              newDiv.append(format);
              let newAuthor = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p />').html(response[i]['pen_name'].length > 0 ? 'by ' + response[i]['pen_name'] : 'by unknown or anonymous author');
              newDiv.append(newAuthor);
              let newCoverDescription = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div />').addClass('tomc-search-result-cover-description');
              let newImage = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<img />').attr('src', response[i]['product_image_id']).attr('alt', 'the cover for ' + response[i]['title']);
              newCoverDescription.append(newImage);
              let newDescription = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<p />').addClass('bottomSection-description').html(response[i]['book_description'].substring(0, 500) + '...');
              newCoverDescription.append(newDescription);
              newDiv.append(newCoverDescription);
              let newButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<button />').addClass('tomc-bookshelves--add-to-shelf').attr('data-product-id', response[i]['productid']).html('Add to Shelf').on("click", this.addShelfProduct.bind(this));
              newDiv.append(newButton);
              this.resultsDiv.append(newDiv);
              newDiv.fadeIn();
            }
          }
        },
        error: response => {
          // console.log('fail');
        }
      });
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tomc-bookshelves--no-search-term').removeClass('hidden');
    }
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