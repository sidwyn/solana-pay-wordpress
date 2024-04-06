<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Class Solana_Pay_Settings
 *
 * This class contains all of the plugin settings.
 * Here you can configure the whole plugin data.
 *
 * @package		SOLANAPAY
 * @subpackage	Classes/Solana_Pay_Settings
 * @author		Sidwyn Koh
 * @since		0.0.1
 */
class Solana_Pay_Settings{

	/**
	 * The plugin name
	 *
	 * @var		string
	 * @since   0.0.1
	 */
	private $plugin_name;

	/**
	 * Our Solana_Pay_Settings constructor 
	 * to run the plugin logic.
	 *
	 * @since 0.0.1
	 */
	function __construct(){

		$this->plugin_name = SOLANAPAY_NAME;
	}

	/**
	 * ######################
	 * ###
	 * #### CALLABLE FUNCTIONS
	 * ###
	 * ######################
	 */

	/**
	 * Return the plugin name
	 *
	 * @access	public
	 * @since	0.0.1
	 * @return	string The plugin name
	 */
	public function get_plugin_name(){
		return apply_filters( 'SOLANAPAY/settings/get_plugin_name', $this->plugin_name );
	}
}
