<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Class Solana_Pay_Run
 *
 * Thats where we bring the plugin to life
 *
 * @package		SOLANAPAY
 * @subpackage	Classes/Solana_Pay_Run
 * @author		Sidwyn Koh
 * @since		0.0.1
 */
class Solana_Pay_Run{

	/**
	 * Our Solana_Pay_Run constructor 
	 * to run the plugin logic.
	 *
	 * @since 0.0.1
	 */
	function __construct(){
		$this->add_hooks();
	}

	/**
	 * ######################
	 * ###
	 * #### WORDPRESS HOOKS
	 * ###
	 * ######################
	 */

	/**
	 * Registers all WordPress and plugin related hooks
	 *
	 * @access	private
	 * @since	0.0.1
	 * @return	void
	 */
	private function add_hooks(){
		add_action( 'admin_enqueue_scripts', array($this, 'enqueue_backend_scripts_and_styles'), 20 );
	
        // Check if WooCommerce is active, then add the hello world button
        if (in_array( 'woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
            add_action( 'woocommerce_after_single_product_summary', array($this, 'add_hello_world_button'));
        }
	}

	/**
	 * ######################
	 * ###
	 * #### WORDPRESS HOOK CALLBACKS
	 * ###
	 * ######################
	 */

	/**
	 * Enqueue the backend related scripts and styles for this plugin.
	 * All of the added scripts andstyles will be available on every page within the backend.
	 *
	 * @access	public
	 * @since	0.0.1
	 *
	 * @return	void
	 */
	public function enqueue_backend_scripts_and_styles() {
		wp_enqueue_style( 'solanapay-backend-styles', SOLANAPAY_PLUGIN_URL . 'core/includes/assets/css/backend-styles.css', array(), SOLANAPAY_VERSION, 'all' );
		wp_enqueue_script( 'solanapay-backend-scripts', SOLANAPAY_PLUGIN_URL . 'core/includes/assets/js/backend-scripts.js', array(), SOLANAPAY_VERSION, false );
		wp_localize_script( 'solanapay-backend-scripts', 'solanapay', array(
			'plugin_name'   	=> __( SOLANAPAY_NAME, 'solana-pay' ),
		));
	}


    public function add_hello_world_button() {
        ?>
        <button id="hello-world-button">Hello World!</button>
    
        <script>
            document.getElementById('hello-world-button').addEventListener('click', function() {
            console.log('Hello World');
            });
        </script>
        <?php
    }
}
