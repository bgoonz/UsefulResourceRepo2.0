<?php
/**
 * @package   Pluralsight_Author_Widget
 * @author    Chris Reynolds <me@chrisreynolds.io>
 * @license   GPL3
 * @link      http://chrisreynolds.io
 * @copyright 2014 Chris Reynolds
 *
 * @wordpress-plugin
 * Plugin Name:       Pluralsight Author Widget
 * Plugin URI:        https://github.com/pluralsight/pluralsight-wordpress-widget
 * Description:       A widget and a shortcode that allow you to display Pluralsight courses by author ID or tag(s).
 * Version:           1.0.1
 * Author:            Pluralsight
 * Author URI:        http://pluralsight.com
 * Text Domain:       pluralsight-wordpress-widget
 * License:           GPL3
 * License URI:       http://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path:       /languages
 * GitHub Plugin URI: https://github.com/<owner>/<repo>
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

require_once( plugin_dir_path( __FILE__ ) . 'public/class-pluralsight-wordpress-widget.php' );
require_once( plugin_dir_path( __FILE__ ) . 'public/views/public.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/widget.php' );
add_action( 'plugins_loaded', array( 'Pluralsight_Author_Widget', 'get_instance' ) );