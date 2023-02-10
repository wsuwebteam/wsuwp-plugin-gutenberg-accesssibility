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

		wp_enqueue_script( 'wsuwp-plugin-gutenberg-accessibility-editor-scripts' );

	}


	public static function admin_enqueue_scripts( $hook ) {

		wp_enqueue_style( 'wsuwp-plugin-gutenberg-accessibility-styles' );

	}


	public static function init() {

		add_action( 'init', array( __CLASS__, 'register_assets' ) );
		add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'enqueue_block_editor_assets' ) );
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'admin_enqueue_scripts' ) );

	}

}

Asset_Loader::init();
