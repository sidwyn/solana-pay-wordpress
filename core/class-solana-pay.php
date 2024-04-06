<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;
if ( ! class_exists( 'Solana_Pay' ) ) :

	/**
	 * Main Solana_Pay Class.
	 *
	 * @package		SOLANAPAY
	 * @subpackage	Classes/Solana_Pay
	 * @since		0.0.1
	 * @author		Sidwyn Koh
	 */
	final class Solana_Pay {

		/**
		 * The real instance
		 *
		 * @access	private
		 * @since	0.0.1
		 * @var		object|Solana_Pay
		 */
		private static $instance;

		/**
		 * SOLANAPAY helpers object.
		 *
		 * @access	public
		 * @since	0.0.1
		 * @var		object|Solana_Pay_Helpers
		 */
		public $helpers;

		/**
		 * SOLANAPAY settings object.
		 *
		 * @access	public
		 * @since	0.0.1
		 * @var		object|Solana_Pay_Settings
		 */
		public $settings;

		/**
		 * Throw error on object clone.
		 *
		 * Cloning instances of the class is forbidden.
		 *
		 * @access	public
		 * @since	0.0.1
		 * @return	void
		 */
		public function __clone() {
			_doing_it_wrong( __FUNCTION__, __( 'You are not allowed to clone this class.', 'solana-pay' ), '0.0.1' );
		}

		/**
		 * Disable unserializing of the class.
		 *
		 * @access	public
		 * @since	0.0.1
		 * @return	void
		 */
		public function __wakeup() {
			_doing_it_wrong( __FUNCTION__, __( 'You are not allowed to unserialize this class.', 'solana-pay' ), '0.0.1' );
		}

		/**
		 * Main Solana_Pay Instance.
		 *
		 * Insures that only one instance of Solana_Pay exists in memory at any one
		 * time. Also prevents needing to define globals all over the place.
		 *
		 * @access		public
		 * @since		0.0.1
		 * @static
		 * @return		object|Solana_Pay	The one true Solana_Pay
		 */
		public static function instance() {
			if ( ! isset( self::$instance ) && ! ( self::$instance instanceof Solana_Pay ) ) {
				self::$instance					= new Solana_Pay;
				self::$instance->base_hooks();
				self::$instance->includes();
				self::$instance->helpers		= new Solana_Pay_Helpers();
				self::$instance->settings		= new Solana_Pay_Settings();

				//Fire the plugin logic
				new Solana_Pay_Run();

				/**
				 * Fire a custom action to allow dependencies
				 * after the successful plugin setup
				 */
				do_action( 'SOLANAPAY/plugin_loaded' );
			}

			return self::$instance;
		}

		/**
		 * Include required files.
		 *
		 * @access  private
		 * @since   0.0.1
		 * @return  void
		 */
		private function includes() {
			require_once SOLANAPAY_PLUGIN_DIR . 'core/includes/classes/class-solana-pay-helpers.php';
			require_once SOLANAPAY_PLUGIN_DIR . 'core/includes/classes/class-solana-pay-settings.php';

			require_once SOLANAPAY_PLUGIN_DIR . 'core/includes/classes/class-solana-pay-run.php';
		}

		/**
		 * Add base hooks for the core functionality
		 *
		 * @access  private
		 * @since   0.0.1
		 * @return  void
		 */
		private function base_hooks() {
			add_action( 'plugins_loaded', array( self::$instance, 'load_textdomain' ) );
		}

		/**
		 * Loads the plugin language files.
		 *
		 * @access  public
		 * @since   0.0.1
		 * @return  void
		 */
		public function load_textdomain() {
			load_plugin_textdomain( 'solana-pay', FALSE, dirname( plugin_basename( SOLANAPAY_PLUGIN_FILE ) ) . '/languages/' );
		}

	}

endif; // End if class_exists check.