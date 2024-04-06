<?php
/**
 * Solana Pay
 *
 * @package       SOLANAPAY
 * @author        Sidwyn Koh
 * @license       gplv2
 * @version       0.0.1
 *
 * @wordpress-plugin
 * Plugin Name:   Solana Pay
 * Plugin URI:    soltest.store
 * Description:   Solana Pay on Wordpress
 * Version:       0.0.1
 * Author:        Sidwyn Koh
 * Author URI:    https://your-author-domain.com
 * Text Domain:   solana-pay
 * Domain Path:   /languages
 * License:       GPLv2
 * License URI:   https://www.gnu.org/licenses/gpl-2.0.html
 *
 * You should have received a copy of the GNU General Public License
 * along with Solana Pay. If not, see <https://www.gnu.org/licenses/gpl-2.0.html/>.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;
// Plugin name
define( 'SOLANAPAY_NAME',			'Solana Pay' );

// Plugin version
define( 'SOLANAPAY_VERSION',		'0.0.1' );

// Plugin Root File
define( 'SOLANAPAY_PLUGIN_FILE',	__FILE__ );

// Plugin base
define( 'SOLANAPAY_PLUGIN_BASE',	plugin_basename( SOLANAPAY_PLUGIN_FILE ) );

// Plugin Folder Path
define( 'SOLANAPAY_PLUGIN_DIR',	plugin_dir_path( SOLANAPAY_PLUGIN_FILE ) );

// Plugin Folder URL
define( 'SOLANAPAY_PLUGIN_URL',	plugin_dir_url( SOLANAPAY_PLUGIN_FILE ) );

/**
 * Load the main class for the core functionality
 */
require_once SOLANAPAY_PLUGIN_DIR . 'core/class-solana-pay.php';

/**
 * The main function to load the only instance
 * of our master class.
 *
 * @author  Sidwyn Koh
 * @since   0.0.1
 * @return  object|Solana_Pay
 */
function SOLANAPAY() {
	return Solana_Pay::instance();
}

SOLANAPAY();
