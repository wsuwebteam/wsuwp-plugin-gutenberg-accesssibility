<?php namespace WSUWP\Plugin\Gutenberg_Accessiblity;

class Table_Columns {

	public static function register_meta() {

		register_post_meta(
			'',
			'_wsuwp_accessibility_report',
			array(
				'type'          => 'object',
				'default'       => null,
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
			$report_data = get_post_meta( $post_id, '_wsuwp_accessibility_report', true ) ?: get_post_meta( $post_id, 'wsuwp_accessibility_report', true ); // fallback to old field

			if ( ! empty( $report_data ) ) {
				$report = gettype( $report_data ) === 'string' ? json_decode( $report_data ) : $report_data;

				if ( count( $report->errors ) === 0 && count( $report->alerts ) === 0 && count( $report->warnings ) === 0 ) {
					echo '<span class="wsu-plugin-gutenberg-admin-dot wsu-plugin-gutenberg-admin-dot--green" title="Clear of Errors">C</span>';
				} else {
					if ( count( $report->errors ) > 0 ) {
						echo '<span class="wsu-plugin-gutenberg-admin-dot wsu-plugin-gutenberg-admin-dot--red" title="Error">E</span>';
					}

					if ( count( $report->alerts ) > 0 ) {
						echo '<span class="wsu-plugin-gutenberg-admin-dot wsu-plugin-gutenberg-admin-dot--orange" title="Alert">A</span>';
					}

					if ( count( $report->warnings ) > 0 ) {
						echo '<span class="wsu-plugin-gutenberg-admin-dot wsu-plugin-gutenberg-admin-dot--yellow" title="Warning">W</span>';
					}
				}
			} else {
				echo '<span>No Data</span>';
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
