<?php namespace WSUWP\Plugin\Gutenberg_Accessiblity;

class Table_Columns {

	public static function register_meta() {

		register_post_meta(
			'',
			'wsuwp_accessibility_report',
			array(
				'type'          => 'string',
				'show_in_rest'  => true,
				'single'        => true,
				'auth_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);

	}


	public static function manage_columns( $columns ) {

		$columns['accessibility'] = __( 'Accessibility', 'textdomain' );

		return $columns;

	}


	public static function manage_custom_column( $column, $post_id ) {

		if ( 'accessibility' === $column ) {
			$report_string = get_post_meta( $post_id, 'wsuwp_accessibility_report', true );
			if ( ! empty( $report_string ) ) {
				$report = json_decode( $report_string );

				if ( count( $report->errors ) > 0 ) {
					echo '<span class="wsu-plugin-gutenberg-admin-dot wsu-plugin-gutenberg-admin-dot--red"></span>';
				}

				if ( count( $report->alerts ) > 0 ) {
					echo '<span class="wsu-plugin-gutenberg-admin-dot wsu-plugin-gutenberg-admin-dot--orange"></span>';
				}

				if ( count( $report->warnings ) > 0 ) {
					echo '<span class="wsu-plugin-gutenberg-admin-dot wsu-plugin-gutenberg-admin-dot--yellow"></span>';
				}
			}
		}

	}


	public static function init() {

		add_action( 'init', array( __CLASS__, 'register_meta' ) );
		add_filter( 'manage_post_posts_columns', __CLASS__ . '::manage_columns' );
		add_filter( 'manage_page_posts_columns', __CLASS__ . '::manage_columns' );
		add_action( 'manage_post_posts_custom_column', __CLASS__ . '::manage_custom_column', 10, 2 );
		add_action( 'manage_page_posts_custom_column', __CLASS__ . '::manage_custom_column', 10, 2 );

	}

}

Table_Columns::init();
