<?php

add_action('rest_api_init', 'tomcBookshelvesRegisterRoute');

function tomcBookshelvesRegisterRoute() {
    register_rest_route('tomcBookshelves/v1', 'search', array(
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'tomcBookshelvesSearchResults'
    ));

    register_rest_route('tomcBookshelves/v1', 'manageProducts', array(
        'methods' => 'DELETE',
        'callback' => 'deleteShelfProduct'
    ));

    register_rest_route('tomcBookshelves/v1', 'manageProducts', array(
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
        return 'success';
    } else {
        wp_safe_redirect(site_url('/my-account'));
        return 'fail';
    }
}

function tomcBookshelvesSearchResults($data) {
    $bookQuery = new WP_Query(array(
        'post_type' => 'product',
        'product_cat' => 'ebooks',
        's' => sanitize_text_field($data['term'])
    ));

    $results = array();

    if ($bookQuery->posts) {
        foreach($bookQuery->posts as $key => $queryItem) {
            $authors = '';
            $postId = url_to_postid( get_the_permalink($queryItem));
            $authorsField = get_field('book_author', $postId);
            if ($authorsField) {
                $fieldCounter = 0;
                while ($fieldCounter <= count($authorsField)) {
                    $authors .= $authorsField[$fieldCounter]->post_title;
                    if (count($authorsField) > 1 && $fieldCounter < count($authorsField) -1) {
                        $authors .= ', ';
                    }
                    $fieldCounter = $fieldCounter + 1;
                }
            } else {
                $authors = 'Unknown or Anonymous Author';
            }
            
            array_push($results, array(
                'posttype' => 'product',
                'title' => get_the_title($queryItem),
                'thumbnail' => get_the_post_thumbnail_url($queryItem),
                'productauthor' => $authors,
                'excerpt' => get_the_excerpt($postId),
                'id' => $postId
            ));
        }
    }

    return $results;
}