<?php

add_action('rest_api_init', 'tomcBookshelvesRegisterRoute');

function tomcBookshelvesRegisterRoute() {
    register_rest_route('tomcBookshelves/v1', 'search', array(
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'tomcBookshelvesSearchResults'
    ));

    register_rest_route('tomcBookshelves/v1', 'manageShelf', array(
        'methods' => 'DELETE',
        'callback' => 'deleteShelf'
    ));

    register_rest_route('tomcBookshelves/v1', 'manageShelfProducts', array(
        'methods' => 'DELETE',
        'callback' => 'deleteShelfProduct'
    ));
}

function deleteShelfProduct(){
    return 'Thanks for trying to delete a shelf product!';
}

// function renameShelf($data){
//     $newname = sanitize_text_field($data['newname']);
//     $shelfId = $data['shelfId'];
//     if (is_user_logged_in()){
//         // global $wpdb;
//         // $wpdb->update($this->bookshelves_table, ['shelfname' => $newname], ['shelfid' => $shelfId]);
//         wp_safe_redirect(site_url('/my-bookshelves'));
//     } else {
//         wp_safe_redirect(site_url('/my-account'));
//     }
// }

function deleteShelf(){
    return 'Thanks for trying to delete a shelf!';
}

function tomcBookshelvesSearchResults($data) {
    $bookQuery = new WP_Query(array(
        'post_type' => 'product',
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
                'permalink' => get_the_permalink($queryItem),
                'thumbnail' => get_the_post_thumbnail_url($queryItem),
                'productauthor' => $authors,
                'excerpt' => get_the_excerpt($postId)
            ));
        }
    }

    return $results;
}