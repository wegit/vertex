<?php

function theme_enqueue_styles() {
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css', [] );
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles', 20 );

function avada_lang_setup() {
	$lang = get_stylesheet_directory() . '/languages';
	load_child_theme_textdomain( 'Avada', $lang );
}
add_action( 'after_setup_theme', 'avada_lang_setup' );

/**
 * Check if running locally.
 * 
 * @author Werremeyer Creative
 */
function we_is_local() {

    $current_host = $_SERVER['HTTP_HOST'];
    return (strpos($current_host, '.local') !== false);
}

/**
 * Load requied css and javascript files.
 * 
 * @author Werremeyer Creative
 */
function we_enqueue_scripts() {

    if( we_is_local() ){
        wp_enqueue_style( 'we-styles', get_stylesheet_directory_uri() . '/assets/css/site.css', array(), filemtime( get_stylesheet_directory() . '/assets/css/site.css' ) );
        wp_enqueue_script( 'we-scripts', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('jquery'), filemtime( get_stylesheet_directory() .'/assets/js/scripts.js' ), true );
    }
    else{
        wp_enqueue_style( 'we-styles', get_stylesheet_directory_uri() . '/assets/css/site.min.css', array(), filemtime( get_stylesheet_directory() . '/assets/css/site.min.css' ) );
        wp_enqueue_script( 'we-scripts', get_stylesheet_directory_uri() . '/assets/js/scripts.min.js', array('jquery'), filemtime( get_stylesheet_directory() .'/assets/js/scripts.min.js' ), true );
    }

    wp_enqueue_script( 'we-jquery', get_stylesheet_directory_uri() . '/assets/js/vendor/jquery-3.6.4.min.js', false, true );

}
add_action( 'wp_enqueue_scripts', 'we_enqueue_scripts', 11 );

/**
 * Get the current year.
 * 
 * @author Werremeyer Creative
 */
function we_year_shortcode () {
    $year = date_i18n ('Y');
    return $year;
}
add_shortcode ('year', 'we_year_shortcode');

