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
        this.deleteCancelButtons = $(".tomc-bookshelves--cancel-delete");
        this.searchButton = $('#tomc-bookshelves--roll-results');
        this.events();
        this.isSearchOverlayOpen = false;
        this.previousValue;
        this.typingTimer;
    }
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
        this.searchButton.on("click", this.getResults.bind(this));
    }
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
    getResults(e) {
        if (this.searchField.val().length > 2){
            let routeData = {
                'searchterm' : this.searchField.val().substring(0, 300)
            }
            $(e.target).addClass('contracting');
            $('#tomc-search--no-search-term').addClass('hidden');
            $.ajax({
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('X-WP-Nonce', marketplaceData.nonce);
                },
                url: tomcBookorgData.root_url + '/wp-json/tomcBookshelves/v1/bookSearch',
                type: 'GET',
                data: routeData,
                success: (response) => {
                    console.log(response);
                    $(e.target).removeClass('contracting');
                    let alreadyAddedBookIds = [];
                    let alreadyAddedProductIds = [];
                    if(response.length < 1){
                        this.resultsDiv.html("<p class='centered-text'>Sorry! We couldn't find any matching results.</p>");
                    } else {
                        this.resultsDiv.html("");
                        for(let i = 0; i < response.length; i++){
                            let newDiv = $('<div />').addClass('tomc-search-result').attr('id', 'tomc-browse-genres--results--book-' + response[i]['id']);
                            let newTitle = $('<h1 />').addClass('centered-text, small-heading').html(response[i]['title']);
                            newDiv.append(newTitle);
                            let newAuthor = $('<p />').html(response[i]['pen_name'].length > 0 ? 'by ' + response[i]['pen_name'] : 'by unknown or anonymous author');
                            newDiv.append(newAuthor);
                            let newBottomSection = $('<div />').addClass('tomc-browse--search-result-bottom-section');
                            let newCoverDescription = $('<div />').addClass('tomc-search-result-cover-description');
                            let newImage = $('<img />').attr('src', response[i]['product_image_id']).attr('alt', 'the cover for ' + response[i]['title']);
                            newCoverDescription.append(newImage);
                            let newDescription = $('<p />').addClass('bottomSection-description').html(response[i]['book_description'].substring(0, 500) + '...');
                            newCoverDescription.append(newDescription);
                            newBottomSection.append(newCoverDescription);
                            newBottomSection.append('<h4 class="centered-text">available in</h4>');
                            let newLink = $('<a />').addClass('centered-text').attr('href', response[i]['product_url']);
                            let newFormat = $('<p />').html(response[i]['type_name'].slice(0, -1));
                            newLink.append(newFormat);
                            newBottomSection.append(newLink);
                            newDiv.append(newBottomSection);
                            this.resultsDiv.append(newDiv);
                            newDiv.fadeIn();
                            alreadyAddedBookIds.push(response[i]['id']);
                            alreadyAddedProductIds.push(response[i]['productid']);
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
        //need to change search results to display products separately

        // $.getJSON(tomcBookshelvesData.root_url + "/wp-json/tomcBookshelves/v1/search?term=" + this.searchField.val(), (results) => {
        //     this.resultsDiv.html(`
        //     <div class="search-result">
        //     ${results.length ? '' : "<p>Sorry! We weren't able to find anything that matches that search.</p>"}
        //         ${results.map(item => `
        //             <li>
        //                 ${item.thumbnail ? `<img src="${item.thumbnail}" />` : ''} 
        //                 ${item.title ? '<br><p>' + item.title + '</p>' : ''}
        //                 ${item.excerpt ? '<br><br>' + item.excerpt : ''}
        //                 ${item.id ? '<button class="tomc-bookshelves--add-to-shelf" data-product-id = "' + item.id + '">Add to Shelf</button>' : ''}
        //             </li>`).join("")}
        //     ${results.length ? "</li></div>" : '</div>'}
        //     `);
        //     this.addToShelfButtons = $(".tomc-bookshelves--add-to-shelf");
        //     this.addToShelfButtons.on("click", this.addShelfProduct.bind(this));
        // });
    }
}

export default Bookshelves;