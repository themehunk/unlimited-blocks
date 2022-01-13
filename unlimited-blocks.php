<?php
/**
 * Plugin Name: Unlimited Blocks
 * Plugin URI: https://themehunk.com/unlimited-blocks/
 * Description: Extra Unlimited blocks Library for building aesthetic websites in the WordPress block editor.
 * Version: 1.0.0
 * Author: Themehunk
 * Author URI: https://themehunk.com/
 * License: GPLv2 or later
 * Text Domain: unlimited-blocks
 */
if (!defined('ABSPATH')) exit;
define('UNLIMITED_BLOCKS', plugins_url('unlimited-blocks') . '/');
define('UNLIMITED_BLOCKS_PATH', plugin_dir_path(__FILE__));
include "inc/inc.php";
include "inc/fn.php";
// unlimited_blocks 
if (!function_exists('unlimited_blocks_register_block')) {
	function unlimited_blocks_register_block()
	{
		// Register JavasScript File build/index.js
		wp_register_script(
			'unlimited-blocks-editor-secript',
			UNLIMITED_BLOCKS . 'dist/editor.js',
			array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data', 'wp-html-entities', "wp-i18n"),
			1
		);
		// Register JavasScript File src/script.js
		wp_register_script(
			'unlimited-blocks-script',
			UNLIMITED_BLOCKS . 'dist/script.js',
		);
		// Register editor style src/editor.css
		wp_register_style(
			'unlimited-blocks-editor-style',
			UNLIMITED_BLOCKS . 'dist/editor.css',
			array('wp-edit-blocks'),
			1
		);
		if (!is_admin()) {
			wp_register_style(
				'frontend-style',
				UNLIMITED_BLOCKS . 'dist/script.css',
			);
		}
		wp_localize_script(
			'unlimited-blocks-editor-secript',
			'plugin_url',
			array(
				'url' => UNLIMITED_BLOCKS
			)
		);
		include "inc/blocks.php";

		// $cuuuDataa = wp_get_current_user();
		// print_r($cuuuDataa);

	}
	add_action('init', 'unlimited_blocks_register_block');
}
if (!function_exists('unlimited_blocks_script')) {
	// enque css icon file
	function unlimited_blocks_script()
	{
		wp_enqueue_style('fontawesom-css', UNLIMITED_BLOCKS . 'assets/fontawesome/css/all.min.css', false);
		wp_enqueue_style('google-font', UNLIMITED_BLOCKS_FONT_FAMILY_LINK, false);
		wp_enqueue_style('google-font', 'https://fonts.googleapis.com/css2?family=Catamaran:wght@400;600;700&display=swap', false);
		wp_enqueue_script('custom-query', UNLIMITED_BLOCKS . 'src/custom-query.js', array('jquery'), 2);
		wp_localize_script('custom-query', 'unlimited_blocks_ajax_url', array('admin_ajax' => admin_url('admin-ajax.php')));
	}
	add_action('admin_enqueue_scripts', 'unlimited_blocks_script');
	add_action('wp_enqueue_scripts', 'unlimited_blocks_script', 15);
}
if (!function_exists('unlimited_blocks_mytheme_setup')) {
	function unlimited_blocks_mytheme_setup()
	{
		add_theme_support('align-wide');
	}
	add_action('after_setup_theme', 'unlimited_blocks_mytheme_setup');
}
/*
 * 
 * 
 */
// load file important all file called here
if (!function_exists('unlimited_blocks_loaded')) {
	add_action('plugins_loaded', 'unlimited_blocks_loaded');
	function unlimited_blocks_loaded()
	{
		include_once(UNLIMITED_BLOCKS_PATH . 'inc/ajax-fn/ajax.php');
	}
}