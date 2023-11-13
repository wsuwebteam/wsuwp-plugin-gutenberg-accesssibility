<?php namespace WSUWP\Plugin\Gutenberg_Accessiblity;

class Asset_Loader {

	public static function register_assets() {

		$editor_asset = include Plugin::get( 'dir' ) . 'assets/dist/index.asset.php';

		wp_register_script(
			'wsuwp-plugin-gutenberg-accessibility-editor-scripts',
			Plugin::get( 'url' ) . 'assets/dist/index.js',
			$editor_asset['dependencies'],
			$editor_asset['version'],
			true
		);

		wp_register_style(
			'wsuwp-plugin-gutenberg-accessibility-styles',
			Plugin::get( 'url' ) . 'assets/dist/index.css',
			array(),
			$editor_asset['version']
		);

	}


	public static function enqueue_block_editor_assets() {

		if ( ! self::is_supported_post_type() ) {
			return;
		}

		wp_enqueue_script( 'wsuwp-plugin-gutenberg-accessibility-editor-scripts' );

	}


	public static function admin_enqueue_scripts( $hook ) {

		if ( ! self::is_supported_post_type() ) {
			return;
		}

		wp_enqueue_style( 'wsuwp-plugin-gutenberg-accessibility-styles' );

		if ( 'post.php' === $hook || 'post-new.php' === $hook ) {
			$script  = 'const WSUWP_ACCESSIBILITY_PLUGIN_DATA = {';
			$script .= 'siteUrl: "' . site_url() . '",';
			$script .= 'wpVersion: "' . get_bloginfo( 'version' ) . '",';
			$script .= '};';

			wp_add_inline_script( 'wsuwp-plugin-gutenberg-accessibility-editor-scripts', $script, 'before' );
		}

	}


	private static function is_supported_post_type() {

		$supported_post_types = apply_filters( 'wsu_accessibility_panel_supported_post_types', Plugin::get( 'supported_post_types' ) );
		if ( in_array( get_current_screen()->post_type, $supported_post_types, true ) ) {
			return true;
		}

		return false;

	}


	public static function init() {

		add_action( 'init', array( __CLASS__, 'register_assets' ) );
		add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'enqueue_block_editor_assets' ) );
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'admin_enqueue_scripts' ) );

	}

}

Asset_Loader::init();
