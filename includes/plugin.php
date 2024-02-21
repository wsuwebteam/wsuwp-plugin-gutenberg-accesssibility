<?php namespace WSUWP\Plugin\Gutenberg_Accessiblity;

class Plugin {

	private static $version = '2.0.1';

	public static function get( $property ) {

		switch ( $property ) {

			case 'version':
				return self::$version;

			case 'dir':
				return plugin_dir_path( dirname( __FILE__ ) );

			case 'url':
				return plugin_dir_url( dirname( __FILE__ ) );

			case 'template_dir':
				return plugin_dir_path( dirname( __FILE__ ) ) . '/templates';

			case 'supported_post_types':
				return array( 'post', 'page' );
			default:
				return '';

		}

	}

	public static function init() {

		include_once __DIR__ . '/asset-loader.php';
		include_once __DIR__ . '/rest-api.php';
		include_once __DIR__ . '/table-columns.php';

	}


	public static function require_class( $class_name ) {

		include_once self::get( 'dir' ) . '/classes/class-' . $class_name . '.php';

	}
}

Plugin::init();
