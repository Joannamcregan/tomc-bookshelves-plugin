<?php 
/* 
    Plugin Name: TOMC Bookshelves
    Version: 1.0
    Author: Joanna
    Description: Display books on personalized bookshelves
*/

if( ! defined('ABSPATH') ) exit;
require_once plugin_dir_path(__FILE__) . 'inc/tomc-bookshelves-route.php';

class TOMCBookshelvesPlugin {
    function __construct() {
        global $wpdb;
        $this->charset = $wpdb->get_charset_collate();
        $this->bookshelves_table = $wpdb->prefix .  "tomc_member_bookshelves";
        $this->bookshelf_products_table = $wpdb->prefix . "tomc_bookshelf_products";
        $this->users_table = $wpdb->prefix . "users";
        $this->posts_table = $wpdb->prefix . "posts";

        wp_localize_script('tomc-bookshelves-js', 'tomcBookshelvesData', array(
            'root_url' => get_site_url()
        ));

        add_action('activate_tomc-bookshelves/tomc-bookshelves.php', array($this, 'onActivate'));
        add_action('init', array($this, 'registerScripts'));
        add_action('wp_enqueue_scripts', array($this, 'pluginFiles'));
        add_action('admin_post_createshelf', array($this, 'createShelf'));
        add_action('admin_post_nopriv_createshelf', array($this, 'createShelf'));
        add_action('admin_post_renameshelf', array($this, 'renameShelf'));
        add_action('admin_post_nopriv_renameshelf', array($this, 'renameShelf'));
        add_action('admin_post_deleteshelf', array($this, 'deleteShelf'));
        add_action('admin_post_nopriv_deleteshelf', array($this, 'deleteShelf'));
        add_filter('template_include', array($this, 'loadTemplate'), 99);
    }

    function createShelf(){
        if (is_user_logged_in()){
            $newShelf = [];
            $newShelf['userid'] = get_current_user_id();
            $newShelf['createdate'] = date('Y-m-d H:i:s');
            $newShelf['shelfname'] = sanitize_text_field($_POST['newshelfname']);
            global $wpdb;
            $wpdb->insert($this->bookshelves_table, $newShelf);
            wp_safe_redirect(site_url('/my-bookshelves'));
        } else {
            wp_safe_redirect(site_url('/my-account'));
        }
    }

    function renameShelf(){
        if (is_user_logged_in()){
            $newName = sanitize_text_field($_POST['shelfnewname']);
            $shelfId = sanitize_text_field($_POST['shelfid']);
            global $wpdb;
            $wpdb->update($this->bookshelves_table, array('shelfname' => $newName), array('id' => $shelfId));
            wp_safe_redirect(site_url('/my-bookshelves'));
        } else {
            wp_safe_redirect(site_url('/my-account'));
        }
    }

    function deleteShelf(){
        if (is_user_logged_in()){
            $shelfId = sanitize_text_field($_POST['shelfid']);
            global $wpdb;
            $wpdb->delete($this->bookshelf_products_table, array('bookshelfid' => $shelfId));
            $wpdb->delete($this->bookshelves_table, array('id' => $shelfId, 'userid' => get_current_user_id()));
            wp_safe_redirect(site_url('/my-bookshelves'));
        } else {
            wp_safe_redirect(site_url('/my-account'));
        }
    }

    function addMyBookshelvesPage() {
        $my_shelves_page = array(
            'post_title' => 'My Bookshelves',
            'post_content' => '',
            'post_status' => 'publish',
            'post_author' => 0,
            'post_type' => 'page'
        );
        wp_insert_post($my_shelves_page);
    }

    function registerScripts(){
        wp_register_style('tomc_bookshelf_styles', plugins_url('css/tomc-bookshelf-styles.css', __FILE__), false, '1.0', 'all');
    }

    function pluginFiles(){
        wp_enqueue_style('tomc_bookshelf_styles');
        wp_enqueue_script('tomc-bookshelves-js', plugin_dir_url(__FILE__) . '/build/index.js', array('jquery'), '1.0', true);
        wp_localize_script('tomc-bookshelves-js', 'tomcBookshelvesData', array(
            'root_url' => get_site_url()
        ));
    }

    function onActivate() {
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        dbDelta("CREATE TABLE IF NOT EXISTS $this->bookshelves_table (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            userid bigint(20) unsigned NOT NULL,
            shelfname varchar(60) NOT NULL DEFAULT 'Roadtrip Reads',
            createdate datetime NOT NULL
            PRIMARY KEY  (id),
            FOREIGN KEY  (userid) REFERENCES $this->users_table(id)
        ) $this->charset;");

        dbDelta("CREATE TABLE IF NOT EXISTS $this->bookshelf_products_table (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            bookshelfid bigint(20) unsigned NOT NULL,
            productid bigint(20) unsigned NOT NULL,
            PRIMARY KEY  (id),
            FOREIGN KEY  (bookshelfid) REFERENCES $this->bookshelves_table(id),
            FOREIGN KEY  (productid) REFERENCES $this->posts_table(id)
        ) $this->charset;");

        if (post_exists('My Bookshelves', '', '', 'page', 'publish') == 0){
            $this->addMyBookshelvesPage();
        }
    }

    function loadTemplate($template){
        if (is_page('my-bookshelves')){
            return plugin_dir_path(__FILE__) . 'inc/template-my-bookshelves.php';
        }
        return $template;
    }
}

$tomcBookshelves = new TOMCBookshelvesPlugin();
