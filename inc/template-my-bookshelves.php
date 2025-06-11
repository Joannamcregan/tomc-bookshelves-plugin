<?php global $wpdb;
$bookshelves_table = $wpdb->prefix .  "tomc_member_bookshelves";
$bookshelf_products_table = $wpdb->prefix . "tomc_bookshelf_products";
$book_products_table = $wpdb->prefix . "tomc_book_products";
$books_table = $wpdb->prefix . "tomc_books";
$pennames_table = $wpdb->prefix. "tomc_pen_names_books";
$posts_table = $wpdb->prefix. "posts";
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
        $shelfQuery = 'select *
        from %i
        where userid = %d';
        $bookshelves = $wpdb->get_results($wpdb->prepare($shelfQuery, $bookshelves_table, $userid), ARRAY_A);
        // $bookshelves = $wpdb->get_results("SELECT * from $bookshelves_table WHERE userid = $userid;");
        if ($bookshelves){
            ?><div class="third-screen">
                <h2 class="centered-text">Edit Your Bookshelves</h2>
                <?php for($i = 0; $i < count($bookshelves); $i++){
                    ?><div class="page-accent-profile">
                        <div class="tomc-bookshelves--shelf-name-section">
                            <h3 class="left-text sans-text"><?php echo str_replace("\'", "'", $bookshelves[$i]['shelfname']); ?></h3>
                            <button class="tomc-bookshelves--rename-shelf">rename shelf</button><button class="tomc-bookshelves--remove-shelf">delete shelf</button>
                        </div>
                        <div class="tomc-bookshelves--shelf-name-center hidden">
                            <form action="<?php echo esc_url(admin_url('admin-post.php')); ?>" method="POST">
                                <input type="hidden" name="action" value="renameshelf">
                                <input type="hidden" name="shelfid" value="<?php echo $bookshelves[$i]['id']; ?>">
                                <input class="tomc-bookshelves--new-name" name="shelfnewname" placeholder="your shelf's new name">
                                <button class="tomc-bookshelves--save-name">save name</button>
                            </form>
                            <button class="tomc-bookshelves--cancel-name tomc-bookshelves--cancel-button">cancel</button>
                        </div>
                        <div class="tomc-bookshelves--delete-shelf-overlay hidden">
                            <form action="<?php echo esc_url(admin_url('admin-post.php')); ?>" method="POST">
                                <input type="hidden" name="action" value="deleteshelf">
                                <input type="hidden" name="shelfid" value="<?php echo $bookshelves[$i]['id']; ?>">
                                <p class="centered-text">Are you sure?</p>
                                <button class="tomc-bookshelves--delete-shelf">delete shelf</button>
                            </form>
                            <button class="tomc-bookshelves--cancel-delete tomc-bookshelves--cancel-button">cancel</button>
                        </div>
                        <div class="tomc-bookshelves--delete-book-overlay hidden">
                            <p class="centered-text">Are you sure?</p>
                            <button class="tomc-bookshelves--delete-book">delete book</button>
                            <button class="tomc-bookshelves--cancel-delete-book tomc-bookshelves--cancel-button">cancel</button>
                        </div>
                        <?php $prodQuery = 'select bookshelfproducts.productid, books.title, posts.post_title as penname
                        from %i bookshelfproducts
                        join %i bookproducts on bookshelfproducts.productid = bookproducts.productid
                        join %i books on bookproducts.bookid = books.id
                        join %i pennames on pennames.bookid = books.id
                        join %i posts on pennames.pennameid = posts.id
                        where bookshelfproducts.bookshelfid = %d';
                        $bookshelfid = $bookshelves[$i]['id'];
                        $shelfproducts = $wpdb->get_results($wpdb->prepare($prodQuery, $bookshelf_products_table, $book_products_table, $books_table, $pennames_table, $posts_table, $bookshelfid), ARRAY_A);
                        // $shelfproducts = $wpdb->get_results("SELECT productid from $bookshelf_products_table WHERE bookshelfid = $shelf->id;"); 
                        if ($shelfproducts){
                            ?><div class="book-sections-container">
                                <div class="tomc-bookshelves__add-container">
                                    <p class="tomc-bookshelves__add-book" data-shelf-id="<?php echo $bookshelves[$i]['id']; ?>">add a book</p>
                                </div>
                                <?php for($j = 0; $j < count($shelfproducts); $j++){
                                    ?><div class="book-section--small">
                                        <?php if (get_the_post_thumbnail_url($shelfproducts[$j]['productid'])){
                                            ?><img class="tomc-bookshelf--book-cover" src="<?php echo get_the_post_thumbnail_url($shelfproducts[$j]['productid']); ?>" alt="<?php echo 'cover for ' . $shelfproducts[$j]['title']; ?>"/>
                                        <?php } else {
                                            ?><div class="tomc-bookshelf-placeholder-book">
                                                <img src="<?php echo get_theme_file_uri('/images/cover_placeholder.jpg'); ?>" aria-hidden="true"/>
                                                <div>
                                                    <p><?php echo $shelfproducts[$j]['title']; ?></p>
                                                    <p><?php echo 'by ' . $shelfproducts[$j]['penname']; ?></p>
                                                </div>
                                            </div>
                                        <?php }
                                        
                                        ?><button aria-label="remove book" class="tomc-bookshelves--remove-book" data-product-id="<?php echo $shelfproducts[$i]['productid']; ?>">-</button>
                                    </div> 
                                <?php }
                            ?></div>
                        <?php } else {
                            ?><div class="book-sections-container">
                                <div class="tomc-bookshelves__add-container">
                                    <p class="tomc-bookshelves__add-book" data-shelf-id="<?php echo $bookshelves[$i]['id']; ?>">add a book</p>
                                    <?php if (in_array( 'dc_vendor', (array) $user->roles )) {
                                        ?><p class="tomc-bookshelves--add-all-books" data-shelf-id="<?php echo $bookshelves[$i]['id']; ?>">add all books you've published</p>
                                    <?php } 
                                ?></div>                               
                            </div>
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
                    <!-- <i class="fa fa-window-close tomc-bookshelves__search-overlay__close" aria-hidden = "true"></i> -->
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 30 30" class="tomc-book-organization__overlay__close" >
                        <image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABWVJREFUWEfNmHtQ1FUUx7+/H08BRRTDMTABETXGhMxEBZTl5UiLzqRhY2EN5pj5ABSyIRBtGmiC1IqaMCUtGZRpUBoNZbd4+MhHUKZoiPkg0RRBVAwEbnN+Kz9h2XV/v90d2/PPzu7ee87nnnPvuedcDhYuXG++zKCwSJ5nC1k3AsGBf7LsjFiO8YzfuaaybE+PbREwK0SRB4b4Jwul11phSoUqlv4VAD8KDo1g4EotBE7A4Dj2anK5ukAAzAoK2w6OvWZJgIyxk+9WqidpAIMVfwLw0QVoY28Hryn+aL1+E4215822BjtHB3hPfR6NtXVobrimS29LSoXKRQMYojgPBm9do0KXxcE7MACMMRzc+DUunTxlMiQtWpm+CkM8RqCzowO713yIu03NffRyQGtyhcrZIOCs5KVwnzBWmEzKSjZsxs2/rhgNyfE8Ile/BY8J4zQ6GEPR2iw0NzQaB+g4dDDmZCTBYfAgQUFbSyuK07Nxr6nFKMhpi+ZhfNh0ce7xXT+gZu/Bfroke5Bmuo5yR3TqClBoSG5dvoq96zfiwb/tsiD9omYgcOFccc5Z9WFUbi3UqUMWIGnwmDgekYmLQSEiuVJzBqU5eWDd3ZIgRwb4ISIhHhynSb2Xa07jQM4WvfNlA5LScYppmP7GfBHo9MFKHP6myCDg0FHuUL6/EtZ2tsJY2sMlH2xGZ3uH3rlGAZK2ybFKPBetEBUf2fE9/igt12vI0cUZMeuTQJ8kd27cwp51Obh/+85jF2Y0IDgOinfi4PWiv+YQdnfjwCdbcLn6dD+D5DHyHHmQpP1um7B3W65eN+h14wEBWNnYYPZ7y+Dm4ykYosNSsmETmi79LRqmvRaeEI9nAvyE37oedGJf5ue4du6CQTgaYBIgKbB3coRyXQKchw8TDN671YLi9By0Nd8WvtNppVOrcTOD6rN8XPilRhKcWQBJySA3V8SsS4T9QEfB8M2LDYInxwRNBuW7Hjn6XTFO7f9JMpzZAEkRhZnCTWEnuVF/Ca6eHmI6ogNEB0mumBzi3gY9J09E2PJFVCP14bh44neUbdoq3ONyxayAZHxq3Mt4NjxI5KArsTBxPTo7HshlE8abFdDFfTiUaatg6zCgD8yxwhL8VlL2/wJSERGTkQinoS7iiRVDzRjUuTtQf+SkbEizeJCKh5dSV4iJmHJdafZXCJgbieG+mvKSftuflYvGs/WyIE0G5K14RCT1revUudtRf+RX2Dk5IEbIkU8JUO332rA3Q9oN0rMKkwGD4mMxdkag6BXt/aadI6XewWYB9I+JwKR5s0W4WvUhVG3d1S+EbmO8MHst5Uhr4T8pVYzJgKOnTcLMpY8aQEN1IfUzoW+/LuZIQ3WgSYAjxvuAehTe2krjkYdX2+PqOho3URmOF+ZHP/K46hCqtvX3eO8QyN6D2rmOurA9VBy0tEo6ncGLF8A3ZIrePautRBagdq7raLsv1HV6+lmdwLyVFaLWLMHTfr5ivnxcjpQMqJ3ruru6sD/rC1w9UyfJc70H0U1DNw5Fw1COlAwYtXqJ0DD1yM9ffou6quOy4XomOLkOwZyMRAxwHijmyOK0bOHlQvYepDShTFspzjtRtA/Vxaa/MQ3zGono1OWwttU0UefKj6Iir0A+IIXklY9TYT/ICVI7OKmupTaUehuCPJS/G2fKqvQDZgYr6jnAS5dyKkSdXF1wu/EfqbYlj6OF29jZCp2eoVNcAAbhwdCCpDqlQhXw8PltphLgxWdXi4Dk2Jsp5eptj56Ag8J2gmMLLAKO4ceUStUsYtF6RFfE8hwSGdhogHvCj+iCa+o5xj5NrlTn9ziqb5djEe7rC/EfEN2XR0giN+8AAAAASUVORK5CYII=" x="0" y="0" width="30" height="30" alt="X close icon" />
                    </svg>
                    <div class="overlay-input-container">
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