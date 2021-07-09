<?php
/**
 * Pluralsight Widget
 *
 * @package   Pluralsight_Author_Widget
 * @author    Chris Reynolds <me@chrisreynolds.io>
 * @license   GPL3
 * @link      http://chrisreynolds.io
 * @copyright 2014 Chris Reynolds
 */

/**
 * @package Pluralsight_Widget
 * @author  Chris Reynolds <me@chrisreynolds.io>
 */
class Pluralsight_Widget extends WP_Widget {
	public function __construct() {
		parent::__construct(
			'pluralsight_widget', // base id
			__( 'Pluralsight Widget', 'pluralsight-wordpress-widget' ), // widget name
			array( 'description' => __( 'Displays a list of Pluralsight courses by author or tag(s).', 'pluralsight-wordpress-widget' ) ) // arguments
		);
	}

	public function widget( $args, $instance ) {
		$title = apply_filters( 'widget_title', $instance['title'] );
		if ( !empty( $instance['author'] ) ) {
			$author = $instance['author'];
		} else {
			$author = null;
		}
		if ( !empty( $instance['fields'] ) ) {
			$fields = $instance['fields'];
		} else {
			$fields = '';
		}
		if ( !empty( $instance['limit'] ) ) {
			$limit = $instance['limit'];
		} else {
			$limit = null;
		}
		if ( !empty( $instance['logo_position'] ) ) {
			$logo_position = $instance['logo_position'];
		} else {
			$logo_position = 'above';
		}

		// future functionality
		$tags = ''; // tags are being passed as an empty value until that functionality is built it later
		$style = ''; // light is being passed as an empty value until that is built in later

		echo $args['before_widget'];
		if ( !empty( $title ) )
			echo $args['before_title'] . $title . $args['after_title'];

		// do widget stuff here
		ps_basic_widget( $author, $tags, $fields, $limit, $logo_position, $style );

		echo $args['after_widget'];

	}

	public function form( $instance ) {
		if ( isset( $instance['title'] ) ) {
			$title = $instance['title'];
		} else {
			$title = __( 'Courses', 'pluralsight-wordpress-widget' );
		}

		if ( isset( $instance['author'] ) ) {
			$author = $instance['author'];
		} else {
			$author = null;
		}
		if ( !empty( $instance['fields'] ) ) {
			$fields = $instance['fields'];
		} else {
			$fields = '';
		}
		if ( !empty( $instance['limit'] ) ) {
			$limit = $instance['limit'];
		} else {
			$limit = null;
		}

		if ( !empty( $instance['logo_position'] ) ) {
			$logo_position = $instance['logo_position'];
		} else {
			$logo_position = 'above';
		}


		// form is here
		?>
		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label>
			<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>">
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'author' ); ?>"><?php _e( 'Author ID:', 'pluralsight-wordpress-widget' ); ?></label>
			<input class="widefat" id="<?php echo $this->get_field_id( 'author' ); ?>" name="<?php echo $this->get_field_name( 'author' ); ?>" type="text" value="<?php echo esc_attr( $author ); ?>"><br />
			<small><?php _e( 'Must match author ID on Pluralsight.com, e.g. <tt>\'chris-reynolds\'</tt>.', 'pluralsight-wordpress-widget' ); ?></small>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'fields' ); ?>"><?php _e( 'Fields:', 'pluralsight-wordpress-widget' ); ?></label>
			<input class="widefat" id="<?php echo $this->get_field_id( 'fields' ); ?>" name="<?php echo $this->get_field_name( 'fields' ); ?>" type="text" value="<?php echo esc_attr( $fields ); ?>"><br />
			<small><?php _e( 'Accepted parameters are <tt>FirstName</tt>, <tt>LastName</tt>, and <tt>ReleaseDate</tt>. Values must be comma-separated with no spaces. Leave blank to just display course titles.', 'pluralsight-wordpress-widget' ); ?></small>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'limit' ); ?>"><?php _e( 'Limit:', 'pluralsight-wordpress-widget' ); ?></label>
			<input id="<?php echo $this->get_field_id( 'limit' ); ?>" name="<?php echo $this->get_field_name( 'limit' ); ?>" type="text" value="<?php echo esc_attr( $limit ); ?>"><br />
			<small><?php _e( 'How many courses you want to display. Most recent courses display first.', 'pluralsight-wordpress-widget' ); ?></small>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'logo_position' ); ?>"><?php _e( 'Logo Position:', 'pluralsight-wordpress-widget' ); ?></label>

            <select id="<?php echo $this->get_field_id( 'logo_position' ); ?>" name="<?php echo $this->get_field_name( 'logo_position' ); ?>" class="widefat">
            <option <?php if ( 'above' == $logo_position ) echo 'selected="selected"'; ?> value="above"><?php _e( 'Above courses', 'pluralsight-wordpress-widget' ); ?></option>
			<option <?php if ( 'below' == $logo_position ) echo 'selected="selected"'; ?> value="below"><?php _e( 'Below courses', 'pluralsight-wordpress-widget' ); ?></option>
            </select>

		</p>
		<?php

	}

	public function update( $new_instance, $old_instance ) {

		$instance = array();
		$instance['title'] = ( !empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';
		$instance['author'] = ( !empty( $new_instance['author'] ) ) ? sanitize_title( $new_instance['author'] ) : '';
		$instance['fields'] = ( !empty( $new_instance['fields'] ) ) ? strip_tags( $new_instance['fields'] ) : '';
		$instance['limit'] = ( !empty( $new_instance['limit'] ) && is_numeric( $new_instance['limit'] ) ) ? strip_tags( $new_instance['limit'] ) : '';
		$instance['logo_position'] =  $new_instance['logo_position'];

		return $instance;

	}
}