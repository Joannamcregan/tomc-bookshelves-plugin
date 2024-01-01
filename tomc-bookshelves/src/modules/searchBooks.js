import $ from 'jquery';

class SearchBooks {
// 1. describe and create/initiate object
    constructor() {
        this.addRenameBoxHTML();
        this.renameBox = $(".tomc-bookshelves__rename-box");
        this.renameButton = $(".tomc-bookshelves--rename-shelf");
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
    events(){
        this.renameButton.on("click", this.openRenameBox.bind(this));
        // this.openButton.on("click", this.openOverlay.bind(this));
        // this.closeButton.on("click", this.closeOverlay.bind(this));
        // $(document).on("keydown", this.keyPressDispatcher.bind(this));
        // this.searchField.on("keyup", this.typingLogic.bind(this));
    }

// // 3. methods (functions, actions...)
    openRenameBox(){
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
    addRenameBoxHTML(){
        console.log("addRenameBoxHTML called");
        $('body').append(`
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

export default SearchBooks;