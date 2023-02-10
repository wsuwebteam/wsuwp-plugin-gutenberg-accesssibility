<?php namespace WSUWP\Plugin\Gutenberg_Accessiblity;

class Rest_API {

	public static function init() {

		add_action( 'rest_api_init', array( __CLASS__, 'register_routes' ) );

	}


	public static function register_routes() {

		register_rest_route(
			'wsu-gutenberg-accessibility/v1',
			'parse-gutenberg-content',
			array(
				'methods'             => 'POST',
				'callback'            => array( __CLASS__, 'parse_gutenberg_content' ),
				'permission_callback' => '__return_true',
			)
		);

	}


	public static function parse_gutenberg_content( \WP_REST_Request $request ) {

		$params            = $request->get_body_params();
		$post_id           = $params['postId'];
		$gutenberg_content = $params['content'];
		$content           = '';
		// $blocks_content    = array();

		$args = array(
			'post__in'       => array( $post_id ),
			'posts_per_page' => 1,
			'post_type'      => 'any',
			'post_status'    => 'any',
		);

		$query = new \WP_Query( $args );

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();

				// $blocks = parse_blocks( $gutenberg_content );
				// foreach ( $blocks as $block ) {
				// $content         .= render_block( $block );
				// $blocks_content[] = str_replace( "\n", '', render_block( $block ) );
				// }

				$content = apply_filters( 'the_content', $gutenberg_content );
			}

			$content = str_replace( "\n", '', $content );
		} else {
			return new \WP_Error( 'Error', 'Could not get post content.', array( 'status' => 500 ) );
		}

		return new \WP_REST_Response(
			array(
				'html' => $content,
			),
			200
		);

	}

}

Rest_API::init();
