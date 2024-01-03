<?php global $wpdb;
$bookshelves_table = $wpdb->prefix .  "tomc_member_bookshelves";
$bookshelf_products_table = $wpdb->prefix . "tomc_bookshelf_products";
$userid = get_current_user_id();

get_header();

?><main>
    <div class="banner"><h1 class="centered-text">Your Bookshelves</h1></div>
    <?php if (is_user_logged_in()){
        ?><a href="#"><div class="paragraph-accent">
            <p class="centered-text">create a new bookshelf</p>
        </div></a>

        <?php 
        $bookshelves = $wpdb->get_results("SELECT * from $bookshelves_table WHERE userid = $userid and isdeleted = 0;");
        if ($bookshelves){
            ?><div class="third-screen">
                <h2 class="centered-text">Edit Your Bookshelves</h2>
                <?php foreach($bookshelves as $shelf){
                    ?><div class="page-accent-profile" data-shelf-id="<?php echo $shelf->id; ?>">
                        <h3 class="left-text sans-text"><?php echo $shelf->shelfname; ?></h3>
                        <button class="tomc-bookshelves--rename-shelf">rename shelf</button><button class="tomc-bookshelves--remove-shelf">remove shelf</button>
                        <?php $shelfproducts = $wpdb->get_results("SELECT productid from $bookshelf_products_table WHERE bookshelfid = $shelf->id;"); 
                        if ($shelfproducts){
                            ?><div class="book-sections-container">
                                <div class="gray-box"><p>add book</p></div>
                                <?php foreach($shelfproducts as $prod){
                                    ?><div class="book-section--small" data-product-id="<?php echo $prod->productid; ?>">
                                        <img class="book-cover--small" src="<?php echo get_the_post_thumbnail_url($prod->productid); ?>"/>
                                        <button aria-label="remove book" class="tomc-bookshelves--remove-book">-</button>
                                    </div> 
                                <?php }
                            ?></div>
                        <?php }   
                    ?></div>                 
                <?php }
            ?></div>
        <?php }

        ?><div class="tomc-bookshelves__rename-box">
            <!-- <i class="fa fa-window-close tomc-bookshelves-overlay__close" aria-hidden = "true"></i> -->
            <span class="tomc-bookshelves-overlay__close">x</span>
            <p>Name your shelf</p>
            <input/>
            <button>cancel</button><button>set name</button>
        </div>

        <div class="tomc-bookshelves__search-overlay">
            <div class="tomc-bookshelves__search-overlay__top">
                <div class="overlay-main-container"> 
                <i class="fa fa-window-close search-overlay__close" aria-hidden = "true"></i>
                <div class="overlay-input-container">
                    <i class="fa fa-search search-overlay__icon" aria-hidden = "true"></i>
                    <input type="text" class="search-term" placeholder = "What are you looking for?" id = "search-term">
                </div>
                </div>
            </div>
        </div>

            <div class="container">
                <div id="search-overlay__results">
                </div>
            </div>
        </div>

    <?php } else {
        ?><div class="generic-content half-screen">
            <p class="centered-text">To view and edit your bookshelves, you must first <a href="<?php echo esc_url(site_url('/my-account'));?>">login</a>.</p>
        </div>
    <?php }
?></main>

<?php get_footer(); ?>