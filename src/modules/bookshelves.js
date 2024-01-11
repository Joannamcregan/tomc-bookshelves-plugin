import $ from 'jquery';

class Bookshelves {
// 1. describe and create/initiate object
    constructor() {
        this.removeShelfButtons = $(".tomc-bookshelves--remove-shelf");
        this.renameButtons = $(".tomc-bookshelves--rename-shelf");
        this.removeProductButtons = $(".tomc-bookshelves--remove-book");
        this.addAllBooksButtons = $(".tomc-bookshelves--add-all-books");
        this.addBook = $(".tomc-bookshelves__add-book");
        this.searchOverlay = $(".tomc-bookshelves__search-overlay");
        this.renameCancelButtons = $(".tomc-bookshelves--cancel-name");
        this.deleteCancelButtons = $(".tomc-bookshelves--cancel-delete");
        this.events();
        this.isSearchOverlayOpen = false;
    }
// // 2. events
    events(){
        this.removeShelfButtons.on("click", function(){
            $(this).parent("div").parent("div").children("div.tomc-bookshelves--delete-shelf-overlay").removeClass("tomc-bookshelves--display-none");
            $("body").addClass("body-no-scroll");
        });
        this.deleteCancelButtons.on("click", function(){
            $(this).parent("div").addClass("tomc-bookshelves--display-none");
            $("body").removeClass("body-no-scroll");
        });
        this.renameButtons.on("click", function(){
            $(this).parent("div.tomc-bookshelves--shelf-name-section").addClass("tomc-bookshelves--display-none");
            $(this).parent("div").parent("div").children("div.tomc-bookshelves--shelf-name-center").removeClass("tomc-bookshelves--display-none");
        });
        this.renameCancelButtons.on("click", function(){
            $(this).parent("div").parent("div.page-accent-profile").children("div.tomc-bookshelves--shelf-name-section").removeClass("tomc-bookshelves--display-none");
            $(this).parent("div").addClass("tomc-bookshelves--display-none");
        });
        this.removeProductButtons.on("click", this.deleteShelfProduct.bind(this));
        this.addAllBooksButtons.on("click", this.addAllBooks.bind(this));
    }

// // 3. methods (functions, actions...)
    deleteShelfProduct(e){
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
            },
            url: tomcBookshelvesData.root_url + '/wp-json/tomcBookshelves/v1/manageProducts',
            type: 'DELETE',
            data: {'product' : $(e.target).data('product-id')},
            success: (response) => {
                $(e.target).parent("div.book-section--small").slideUp();
            },
            error: (response) => {
                console.log(response);
            }
        })
    }
    addAllBooks(e){
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
            },
            url: tomcBookshelvesData.root_url + '/wp-json/tomcBookshelves/v1/manageShelves',
            type: 'POST',
            data: {'shelf' : $(e.target).data('shelf-id')},
            success: (response) => {
                location.reload(true);
            },
            error: (response) => {
                console.log(response);
            }
        })
    }
    openSearchOverlay(){
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
    closeSearchOverlay(){
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

export default Bookshelves;