<?php

add_action('rest_api_init', 'tomcBookshelvesRegisterRoute');

function tomcBookshelvesRegisterRoute() {
    register_rest_route('tomcBookshelves/v1', 'bookSearch', array(
        'methods' => 'GET',
        'callback' => 'tomcBookshelvesSearchResults'
    ));

    register_rest_route('tomcBookshelves/v1', 'manageProducts', array(
        'methods' => 'DELETE',
        'callback' => 'deleteShelfProduct'
    ));

    register_rest_route('tomcBookshelves/v1', 'addProductToShelf', array(
        'methods' => 'POST',
        'callback' => 'addBook'
    ));

    register_rest_route('tomcBookshelves/v1', 'manageShelves', array(
        'methods' => 'POST',
        'callback' => 'addAllBooks'
    ));
}

function deleteShelfProduct($data){
    $shelfProductId = sanitize_text_field($data['product']);
    global $wpdb;
    $bookshelf_products_table = $wpdb->prefix . "tomc_bookshelf_products";
    if (is_user_logged_in()){
        $wpdb->delete($bookshelf_products_table, array('id' => $shelfProductId));
        return 'success';
    } else {
        wp_safe_redirect(site_url('/my-account'));
        return 'fail';
    }
}

function addAllBooks($data){
    $shelfId = sanitize_text_field($data['shelf']);
    $userId = get_current_user_id();
    global $wpdb;
    $bookshelf_products_table = $wpdb->prefix . "tomc_bookshelf_products";
    $term_taxonomy_table = $wpdb->prefix . "term_taxonomy";
    $terms_table = $wpdb->prefix . "terms";
    $term_relationships_table = $wpdb->prefix . "term_relationships";
    $posts_table = $wpdb->prefix . "posts";
    if (is_user_logged_in()){
        $wpdb->query($wpdb->prepare("insert into %i (bookshelfid, productid)
        select %d, p.id from %i tt
        join %i t on tt.term_id = t.term_id
        join %i tr on tr.term_taxonomy_id = tt.term_taxonomy_id
        join %i p on p.id = tr.object_id
        where t.name = 'ebooks'
        and p.post_author = %d", array(
            $bookshelf_products_table, 
            $shelfId, $term_taxonomy_table, 
            $terms_table, 
            $term_relationships_table, 
            $posts_table,
            $userId
        )));
        return 'success';
    } else {
        wp_safe_redirect(site_url('/my-account'));
        return 'fail';
    }
}

function addBook($data){
    $shelfId = sanitize_text_field($data['shelf']);
    $productId = sanitize_text_field($data['product']);
    global $wpdb;
    $bookshelf_products_table = $wpdb->prefix . "tomc_bookshelf_products";
    if (is_user_logged_in()){
        $newShelfProduct = [];
        $newShelfProduct['bookshelfid'] = $shelfId;
        $newShelfProduct['productid'] = $productId;
        global $wpdb;
        $wpdb->insert($bookshelf_products_table, $newShelfProduct);
        return 'logged in';
    } else {
        wp_safe_redirect(site_url('/my-account'));
        return 'fail';
    }
}

function tomcBookshelvesSearchResults($data) {
    $resultsArr = [];
    $searchTerm = sanitize_text_field($data['searchterm']);
    $user = wp_get_current_user();
    global $wpdb;
    $books_table = $wpdb->prefix . "tomc_books";
    $book_products_table = $wpdb->prefix . "tomc_book_products";
    $posts_table = $wpdb->prefix . "posts";
    $product_types_table = $wpdb->prefix . "tomc_product_types";
    $pen_names_table = $wpdb->prefix . "tomc_pen_names_books";
    if (is_user_logged_in()){
        if (str_contains(strtoupper($searchTerm), 'BY')){
            $query = 'select distinct b.id, b.title, b.product_image_id, c.productid, f.post_title as pen_name, b.book_description, d.type_name, g.id as product_url
            from %i b
            join %i c on b.id = c.bookid
            join %i d on c.typeid = d.id
            join %i e on b.id = e.bookid
            join %i f on e.pennameid = f.id
            join %i g on c.productid = g.id
            where concat(b.title, " by ", f.post_title) like %s
            and b.islive = 1
            order by b.createdate desc
            limit 20';
            $booksResults = $wpdb->get_results($wpdb->prepare($query, $books_table, $book_products_table, $product_types_table, $pen_names_table, $posts_table, $posts_table, '%' . $wpdb->esc_like($searchTerm) . '%'), ARRAY_A);
            for($index = 0; $index < count($booksResults); $index++){
                $booksResults[$index]['product_url'] = get_permalink($booksResults[$index]['product_url']);
                $booksResults[$index]['product_image_id'] = get_the_post_thumbnail_url($booksResults[$index]['product_image_id']);
            }
            array_push($resultsArr, ...$booksResults);
        }
        $query = 'select distinct b.id, b.title, b.product_image_id, c.productid, f.post_title as pen_name, b.book_description, b.createdate, d.type_name, g.id as product_url, "book" as "resulttype"
        from %i b
        join %i c on b.id = c.bookid
        join %i d on c.typeid = d.id
        join %i e on b.id = e.bookid
        join %i f on e.pennameid = f.id
        join %i g on c.productid = g.id
        where b.title = %s
        and b.islive = 1
        order by b.createdate desc
        limit 20';
        $booksResults = $wpdb->get_results($wpdb->prepare($query, $books_table, $book_products_table, $product_types_table, $pen_names_table, $posts_table, $posts_table, $searchTerm), ARRAY_A);
        for($index = 0; $index < count($booksResults); $index++){
            $booksResults[$index]['product_url'] = get_permalink($booksResults[$index]['product_url']);
            $booksResults[$index]['product_image_id'] = get_the_post_thumbnail_url($booksResults[$index]['product_image_id']);
        }
        array_push($resultsArr, ...$booksResults);
        $query = 'select distinct b.id, b.title, b.product_image_id, c.productid, f.post_title as pen_name, b.book_description, b.createdate, d.type_name, g.id as product_url, "book" as "resulttype"
        from %i b
        join %i c on b.id = c.bookid
        join %i d on c.typeid = d.id
        join %i e on b.id = e.bookid
        join %i f on e.pennameid = f.id
        join %i g on c.productid = g.id
        where b.title like %s
        and b.islive = 1
        order by b.createdate desc
        limit 100';
        $booksResults = $wpdb->get_results($wpdb->prepare($query, $books_table, $book_products_table, $product_types_table, $pen_names_table, $posts_table, $posts_table, '%' . $wpdb->esc_like($searchTerm) . '%'), ARRAY_A);
        for($index = 0; $index < count($booksResults); $index++){
            $booksResults[$index]['product_url'] = get_permalink($booksResults[$index]['product_url']);
            $booksResults[$index]['product_image_id'] = get_the_post_thumbnail_url($booksResults[$index]['product_image_id']);
        }
        array_push($resultsArr, ...$booksResults);
        return $resultsArr;
    } else {
        wp_safe_redirect(site_url('/my-account'));
        return 'fail';
    }
}