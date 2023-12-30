<?php global $wpdb;
$bookshelves_table = $wpdb->prefix .  "tomc_member_bookshelves";
$bookshelf_products_table = $wpdb->prefix . "tomc_bookshelf_products";
$userid = get_current_user_id();

get_header();

?><main>
    <div class="banner"><h1 class="centered-text">Your Bookshelves</h1></div>
    <?php if (is_user_logged_in()){
        ?><div class="third-screen">
            <h2 class="centered-text">Create a New Bookshelf</h2>
            <div class="page-accent-profile">
                <h3 class="left-text sans-text">Roadtrip Reads</h3>
                <button class="tomc-bookshelves--rename-shelf">rename shelf</button>
                <div class="book-sections-container">
                    <div class="gray-box"><p>add book</p></div>
                </div>
                <button class="tomc-bookshelves--save-shelf">save shelf</button>
            </div>
        </div>

        <?php $bookshelves = $wpdb->get_results("SELECT * from $bookshelves_table WHERE userid = $userid and isdeleted = 0;");
        if ($bookshelves){
            ?><div class="third-screen">
                <h2 class="centered-text">Edit Your Bookshelves</h2>
                <?php foreach($bookshelves as $shelf){
                    ?><div class="page-accent-profile">
                        <h3 class="left-text sans-text"><?php echo $shelf->shelfname; ?></h3>
                        <button class="tomc-bookshelves--rename-shelf">rename shelf</button><button class="tomc-bookshelves--remove-shelf">remove shelf</button>
                        <?php $shelfproducts = $wpdb->get_results("SELECT productid from $bookshelf_products_table WHERE bookshelfid = $shelf->id;"); 
                        if ($shelfproducts){
                            ?><div class="book-sections-container">
                                <div class="gray-box"><p>add book</p></div>
                                <?php foreach($shelfproducts as $prod){
                                    ?><div class="book-section--small">
                                        <img class="book-cover--small" src="<?php echo get_the_post_thumbnail_url($prod->productid); ?>"/>
                                        <button aria-label="remove book" class="tomc-bookshelves--remove-book">-</button>
                                    </div> 
                                <?php }
                            ?></div>
                        <?php }   
                        ?><button class="tomc-bookshelves--save-shelf">save changes</button>
                    </div>                 
                <?php }
            ?></div>
        <?php }

        $removedShelves = $wpdb->get_results("SELECT * from $bookshelves_table WHERE userid = $userid and isdeleted = 1;");
        if ($removedShelves){
            ?><div class="third-screen">
                <h2 class="centered-text">Removed Bookshelves</h2>
                <?php foreach($removedShelves as $shelf){
                    ?><div class="page-accent-profile">
                        <h3 class="left-text sans-text"><?php echo $shelf->shelfname; ?></h3>
                        <button class="tomc-bookshelves--rename-shelf">rename shelf</button><button class="tomc-bookshelves--remove-shelf">remove shelf</button>
                        <?php $shelfproducts = $wpdb->get_results("SELECT productid from $bookshelf_products_table WHERE bookshelfid = $shelf->id;"); 
                        if ($shelfproducts){
                            ?><div class="book-sections-container">
                                <?php foreach($shelfproducts as $prod){
                                    ?><div class="book-section--small">
                                        <img class="book-cover--small" src="<?php echo get_the_post_thumbnail_url($prod->productid); ?>"/>
                                    </div> 
                                <?php }
                            ?></div>
                        <?php }   
                        ?><button class="tomc-bookshelves--restore-shelf">restore shelf</button><button class="tomc-bookshelves--delete-shelf">delete permanently</button>
                    </div>                 
                <?php }
            ?></div>
        <?php }

    } else {
        ?><div class="generic-content half-screen">
            <p class="centered-text">To create bookshelves, you must first <a href="<?php echo esc_url(site_url('/my-account'));?>">login</a>.</p>
        </div>
    <?php }
?></main>

<?php get_footer(); ?>