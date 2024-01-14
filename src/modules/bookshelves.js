import $ from 'jquery';

class Bookshelves {
// 1. describe and create/initiate object
    constructor() {
        this.removeShelfButtons = $(".tomc-bookshelves--remove-shelf");
        this.renameButtons = $(".tomc-bookshelves--rename-shelf");
        this.removeProductButtons = $(".tomc-bookshelves--remove-book");
        this.addAllBooksButtons = $(".tomc-bookshelves--add-all-books");
        this.addBookButtons = $(".tomc-bookshelves__add-book");
        this.searchOverlay = $(".tomc-bookshelves__search-overlay");
        this.searchField = $("#tomc-bookshelves__search-term");
        this.resultsDiv = $("#tomc-bookshelves--search-results");
        this.closeOverlay = $(".tomc-bookshelves__search-overlay__close");
        this.renameCancelButtons = $(".tomc-bookshelves--cancel-name");
        this.deleteCancelButtons = $(".tomc-bookshelves--cancel-delete");
        this.events();
        this.isSearchOverlayOpen = false;
        this.isSpinnerVisible = false;
        this.previousValue;
        this.typingTimer;
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
        this.addBookButtons.on("click", this.openSearchOverlay.bind(this));
        this.closeOverlay.on("click", this.closeSearchOverlay.bind(this));
        $(document).on("keydown", this.keyPressDispatcher.bind(this));
        this.searchField.on("keyup", this.typingLogic.bind(this));
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
    openSearchOverlay(e){
        this.searchOverlay.addClass("tomc-bookshelves__box--active");
        this.searchOverlay.data('id', $(e.target).data('shelf-id'));
        // console.log(this.searchOverlay.data('id'));
        $("body").addClass("body-no-scroll");
        this.searchField.val('');
        setTimeout(() => this.searchField.focus(), 301);
        this.isSearchOverlayOpen = true;
        return false;
    }
    closeSearchOverlay(){
        this.searchOverlay.removeClass("tomc-bookshelves__box--active");
        this.resultsDiv.html('');
        $("body").removeClass("body-no-scroll");
        this.isSearchOverlayOpen = false;
    }
    keyPressDispatcher(e) {
        if(e.keyCode == 83 && !this.isOverlayOpen && !$("input, textarea").is(':focus')) {
            this.openSearchOverlay()
        }
        if(e.keyCode == 27 && this.isOverlayOpen) {
            this.closeSearchOverlay()
        }
    }
    addShelfProduct(e){
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
            },
            url: tomcBookshelvesData.root_url + '/wp-json/tomcBookshelves/v1/manageProducts',
            type: 'POST',
            data: {
                'product' : $(e.target).data('product-id'),
                'shelf' : this.searchOverlay.data('id')
                },
            success: ($productId) => {
                location.reload(true);
            },
            error: (response) => {
                console.log(response);
            }
        })
    }
    getResults() {
        $.getJSON(tomcBookshelvesData.root_url + "/wp-json/tomcBookshelves/v1/search?term=" + this.searchField.val(), (results) => {
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
            this.addToShelfButtons = $(".tomc-bookshelves--add-to-shelf");
            this.addToShelfButtons.on("click", this.addShelfProduct.bind(this));
            this.isSpinnerVisible = false;
        });
    }
    typingLogic() {
        if (this.searchField.val() != this.previousValue) {
            clearTimeout(this.typingTimer);
            if (this.searchField .val()) {
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

export default Bookshelves;