<?php
/**
 * Plugin Name: WSUWP Gutenberg Accessibility
 * Plugin URI: https://github.com/wsuwebteam/wsuwp-plugin-gutenberg-accessibility
 * Description: Adds an accessibility checker panel to the Gutenberg editor.
 * Version: 1.2.2
 * Requires PHP: 7.3
 * Author: Washington State University, Dan White
 * Author URI: https://web.wsu.edu/
 * Text Domain: wsuwp-plugin-gutenberg-accessibility
 */


// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

add_action( 'after_setup_theme', 'wsuwp_plugin_gutenberg_accessibility_init' );

function wsuwp_plugin_gutenberg_accessibility_init() {

	// Initiate plugin
	include_once __DIR__ . '/includes/plugin.php';

}
