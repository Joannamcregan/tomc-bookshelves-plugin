import $ from 'jquery';

class Bookshelves {
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
        this.deleteShelfCancel = $(".tomc-bookshelves--cancel-delete");
        this.bookDeletionOverlay = $('.tomc-bookshelves--delete-book-overlay');
        this.deleteBookButton = $('.tomc-bookshelves--delete-book');
        this.deleteBookCancel = $(".tomc-bookshelves--cancel-delete-book");
        this.searchButton = $('#tomc-bookshelves--roll-results');
        this.saveNewShelfButton = $('.tomc-bookshelves--save-name');
        this.events();
        this.isSearchOverlayOpen = false;
        this.previousValue;
        this.typingTimer;
    }
    events(){
        this.removeShelfButtons.on("click", function(){
            $(this).parent("div").parent("div").children("div.tomc-bookshelves--delete-shelf-overlay").removeClass("hidden");
            $("body").addClass("body-no-scroll");
        });
        this.deleteShelfCancel.on("click", function(){
            $(this).parent("div").addClass("hidden");
            $("body").removeClass("body-no-scroll");
        });
        this.renameButtons.on("click", function(){
            $(this).parent("div.tomc-bookshelves--shelf-name-section").addClass("hidden");
            $(this).parent("div").parent("div").children("div.tomc-bookshelves--shelf-name-center").removeClass("hidden");
        });
        this.renameCancelButtons.on("click", function(){
            $(this).parent("div").parent("div.page-accent-profile").children("div.tomc-bookshelves--shelf-name-section").removeClass("hidden");
            $(this).parent("div").addClass("hidden");
        });
        this.deleteBookCancel.on('click', this.cancelBookDeletion.bind(this));
        this.removeProductButtons.on('click', this.openDeleteBookOverlay.bind(this));
        this.deleteBookButton.on("click", this.deleteShelfProduct.bind(this));
        this.addAllBooksButtons.on("click", this.addAllBooks.bind(this));
        this.addBookButtons.on("click", this.openSearchOverlay.bind(this));
        this.closeOverlay.on("click", this.closeSearchOverlay.bind(this));
        this.searchButton.on("click", this.getResults.bind(this));
        this.saveNewShelfButton.on('click', this.contractButton.bind(this));
    }
    cancelBookDeletion(){
        this.bookDeletionOverlay.addClass('hidden');
    }
    contractButton(e){
        $(e.target).addClass('contracting');
    }
    openDeleteBookOverlay(e){
        let product = $(e.target).data('product-id');
        let shelf = $(e.target).closest('.book-sections-container').find('.tomc-bookshelves__add-book').data('shelf-id');
        this.bookDeletionOverlay.attr('data-product-id', product);
        this.bookDeletionOverlay.attr('data-shelf-id', shelf);
        this.bookDeletionOverlay.removeClass("hidden");
        $("body").addClass("body-no-scroll");
    }
    deleteShelfProduct(e){
        $(e.target).addClass('contracting');
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
            },
            url: tomcBookshelvesData.root_url + '/wp-json/tomcBookshelves/v1/deleteShelfProduct',
            type: 'POST',
            data: {
                'product' : this.bookDeletionOverlay.data('product-id'),
                'shelf' : this.bookDeletionOverlay.data('shelf-id')
            },
            success: (response) => {
                // $(e.target).find(".book-section--small").removeClass('book-section--small').fadeOut();
                // console.log(response);
                $(e.target).removeClass('contracting');
                location.reload(true);
            },
            error: (response) => {
                // console.log(response);
            }
        })
    }
    addAllBooks(){
        this.addAllBooksButtons.addClass('contracting')
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
            },
            url: tomcBookshelvesData.root_url + '/wp-json/tomcBookshelves/v1/addAllBooks',
            type: 'POST',
            data: {'shelf' : this.addAllBooksButtons.data('shelf-id')},
            success: (response) => {
                this.addAllBooksButtons.removeClass('contracting')
                location.reload(true);
            },
            error: (response) => {
                // console.log(response);
            }
        })
    }
    openSearchOverlay(e){
        this.addBookButtons.addClass('contracting');
        this.searchOverlay.addClass("tomc-bookshelves__box--active");
        this.searchOverlay.data('id', $(e.target).data('shelf-id'));
        $("body").addClass("body-no-scroll");
        this.searchField.val('');
        setTimeout(() => this.searchField.focus(), 301);
        setTimeout(() => this.addBookButtons.removeClass('contracting'), 1000);
        this.isSearchOverlayOpen = true;
        return false;
    }
    closeSearchOverlay(){
        this.searchOverlay.removeClass("tomc-bookshelves__box--active");
        this.resultsDiv.html('');
        $("body").removeClass("body-no-scroll");
        this.isSearchOverlayOpen = false;
    }
    addShelfProduct(e){
        $(e.target).addClass('contracting');
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
            },
            url: tomcBookshelvesData.root_url + '/wp-json/tomcBookshelves/v1/addProductToShelf',
            type: 'POST',
            data: {
                'product' : $(e.target).data('product-id'),
                'shelf' : this.searchOverlay.data('id')
                },
            success: (response) => {
                $(e.target).removeClass('contracting');
                location.reload(true);
            },
            error: (response) => {
                // console.log(response);
            }
        })
    }
    getResults() {
        if (this.searchField.val().length > 2){
            let routeData = {
                'searchterm' : this.searchField.val().substring(0, 300)
            }
            this.searchButton.addClass('contracting');
            $('#tomc-search--no-search-term').addClass('hidden');
            $.ajax({
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
                },
                url: tomcBookorgData.root_url + '/wp-json/tomcBookshelves/v1/bookSearch',
                type: 'GET',
                data: routeData,
                success: (response) => {
                    this.searchButton.removeClass('contracting');
                    if(response.length < 1){
                        this.resultsDiv.html("<p class='centered-text'>Sorry! We couldn't find any matching results.</p>");
                    } else {
                        response = Array.from(new Set(response));
                        this.resultsDiv.html("");
                        for(let i = 0; i < response.length; i++){
                            let newDiv = $('<div />').addClass('tomc-search-result').attr('id', 'tomc-browse-genres--results--book-' + response[i]['id']);
                            let newTitle = $('<h1 />').addClass('centered-text, small-heading').html(response[i]['title']);
                            newDiv.append(newTitle);
                            let format = $('<p />');
                            let em = $('<em />').html(response[i]['type_name'].slice(0, -1));
                            format.append(em);
                            newDiv.append(format);
                            let newAuthor = $('<p />').html(response[i]['pen_name'].length > 0 ? 'by ' + response[i]['pen_name'] : 'by unknown or anonymous author');
                            newDiv.append(newAuthor);
                            let newCoverDescription = $('<div />').addClass('tomc-search-result-cover-description');
                            let newImage = $('<img />').attr('src', response[i]['product_image_id']).attr('alt', 'the cover for ' + response[i]['title']);
                            newCoverDescription.append(newImage);
                            let newDescription = $('<p />').addClass('bottomSection-description').html(response[i]['book_description'].substring(0, 500) + '...');
                            newCoverDescription.append(newDescription);
                            newDiv.append(newCoverDescription);
                            let newButton = $('<button />').addClass('tomc-bookshelves--add-to-shelf').attr('data-product-id', response[i]['productid']).html('Add to Shelf').on("click", this.addShelfProduct.bind(this));
                            newDiv.append(newButton);
                            this.resultsDiv.append(newDiv);
                            newDiv.fadeIn();
                        }
                    }
                },
                error: (response) => {
                    // console.log('fail');
                }
            });
        } else {
            $('#tomc-bookshelves--no-search-term').removeClass('hidden');
        }
    }
}

export default Bookshelves;