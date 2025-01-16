<?php global $wpdb;
$bookshelves_table = $wpdb->prefix .  "tomc_member_bookshelves";
$bookshelf_products_table = $wpdb->prefix . "tomc_bookshelf_products";
$user = wp_get_current_user();
$userid = $user->ID;

get_header();

?><main>
    <div class="banner"><h1 class="centered-text banner-heading-46">Your Shelves</h1></div>
    <?php if (is_user_logged_in()){
        ?><div class="third-screen paragraph-accent">
            <h2 class="centered-text">Add a New Bookshelf</h2>
            <div class="tomc-bookshelves--shelf-name-center">
                <form action="<?php echo esc_url(admin_url('admin-post.php')); ?>" method="POST">
                    <input type="hidden" name="action" value="createshelf">
                    <input class="tomc-bookshelves--new-name centered-text" name="newshelfname" placeholder="your new shelf"><button class="tomc-bookshelves--save-name">save</button>
                </form>
            </div>
        </div>
        <br>

        <?php 
        $bookshelves = $wpdb->get_results("SELECT * from $bookshelves_table WHERE userid = $userid;");
        if ($bookshelves){
            ?><div class="third-screen">
                <h2 class="centered-text">Edit Your Bookshelves</h2>
                <?php foreach($bookshelves as $shelf){
                    ?><div class="page-accent-profile">
                        <div class="tomc-bookshelves--shelf-name-section">
                            <h3 class="left-text sans-text"><?php echo str_replace("\'", "'", $shelf->shelfname); ?></h3>
                            <button class="tomc-bookshelves--rename-shelf">rename shelf</button><button class="tomc-bookshelves--remove-shelf">delete shelf</button>
                        </div>
                        <div class="tomc-bookshelves--shelf-name-center tomc-bookshelves--display-none">
                            <form action="<?php echo esc_url(admin_url('admin-post.php')); ?>" method="POST">
                                <input type="hidden" name="action" value="renameshelf">
                                <input type="hidden" name="shelfid" value="<?php echo $shelf->id; ?>">
                                <input class="tomc-bookshelves--new-name" name="shelfnewname" placeholder="your shelf's new name">
                                <button class="tomc-bookshelves--save-name">save name</button>
                            </form>
                            <button class="tomc-bookshelves--cancel-name tomc-bookshelves--cancel-button">cancel</button>
                        </div>
                        <div class="tomc-bookshelves--delete-shelf-overlay tomc-bookshelves--display-none">
                            <form action="<?php echo esc_url(admin_url('admin-post.php')); ?>" method="POST">
                                <input type="hidden" name="action" value="deleteshelf">
                                <input type="hidden" name="shelfid" value="<?php echo $shelf->id; ?>">
                                <p class="centered-text">Are you sure?</p>
                                <button class="tomc-bookshelves--delete-shelf">delete shelf</button>
                            </form>
                            <button class="tomc-bookshelves--cancel-delete tomc-bookshelves--cancel-button">cancel</button>
                        </div>
                        <?php $shelfproducts = $wpdb->get_results("SELECT productid, id from $bookshelf_products_table WHERE bookshelfid = $shelf->id;"); 
                        if ($shelfproducts){
                            ?><div class="book-sections-container">
                                <div class="gray-box tomc-bookshelves__add-book" data-shelf-id="<?php echo $shelf->id; ?>"><p>add a book</p></div>
                                <?php foreach($shelfproducts as $prod){
                                    ?><div class="book-section--small">
                                        <img class="tomc-bookshelf--book-cover" src="<?php echo get_the_post_thumbnail_url($prod->productid); ?>"/>
                                        <button aria-label="remove book" class="tomc-bookshelves--remove-book" data-product-id="<?php echo $prod->id; ?>">-</button>
                                    </div> 
                                <?php }
                            ?></div>
                        <?php } else {
                            ?><div class="book-sections-container">
                                <div class="gray-box tomc-bookshelves__add-book" data-shelf-id="<?php echo $shelf->id; ?>"><p>add a book</p></div>
                                <?php if (in_array( 'dc_vendor', (array) $user->roles )) {
                                    ?><div class="gray-box tomc-bookshelves--add-all-books" data-shelf-id="<?php echo $shelf->id; ?>"><p>add all books you've published</p></div>
                                <?php }                                
                            ?></div>
                        <?php }
                    ?></div>                 
                <?php }
            ?></div>
        <?php } else {
            ?><div class="third-screen">
                <p class="centered-text">We couldn't find any bookshelves. Create one!</p>
            </div>
        <?php }

        ?><div class="tomc-bookshelves__search-overlay">
            <div class="tomc-bookshelves__search-overlay__top">
                <div class="overlay-main-container"> 
                    <i class="fa fa-window-close tomc-bookshelves__search-overlay__close" aria-hidden = "true"></i>
                    <!-- <span class="fa fa-window-close tomc-bookshelves__search-overlay__close" aria-hidden = "true" aria-label = "close button">X</span> -->
                    <div class="overlay-input-container">
                        <i class="fa fa-search search-overlay__icon" aria-hidden = "true"></i>
                        <!-- <span class="fa fa-search search-overlay__icon" aria-hidden = "true">S</span> -->
                        <input type="text" class="search-term" placeholder = "Search by title" id = "tomc-bookshelves__search-term">
                        <button class="medium-purple-button" id="tomc-bookshelves--roll-results">search</button>
                    </div>
                </div>
            </div>
            <div class="centered-text hidden tomc-book-organization--red-text" id="tomc-bookshelves--no-search-term">
                <p>Enter a search term with at least 3 letters.</p>
            </div>
            <div class="tomc-bookshelves--container">
                <div id="tomc-bookshelves--search-results">
                </div>
            </div>
        </div>

    <?php } else {
        ?><div class="generic-content half-screen">
            <p class="centered-text">To create and view your bookshelves, you must first <a href="<?php echo esc_url(site_url('/my-account'));?>">login</a>.</p>
        </div>
    <?php }
?></main>

<?php get_footer(); ?>