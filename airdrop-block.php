<?php
/**
 * Plugin Name:       Airdrop Block
 * Description:       Block for airdrop.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            Tensanq
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       airdrop-block
 *
 * @package AirdropBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * Registers the block using metadata from the block.json file.
 * Automatically registers all assets for block editor.
 */
function render_json_block( $attributes ) {
    // Pastikan atribut di-encode menjadi JSON
    $json_data = json_encode( $attributes );

    if ( empty( $json_data ) ) {
        return '<div class="json-block">Invalid data</div>';
    }

    // Kembalikan elemen <script> berisi JSON
    return '<div class="json-block">' .
           '<script type="application/json">' . esc_html( $json_data ) . '</script>' .
           '</div>';
}

// Daftarkan blok menggunakan fungsi render
function create_block_airdrop_block_init() {
    register_block_type( __DIR__ . '/build', array(
        'render_callback' => 'render_json_block',
    ));
}
add_action( 'init', 'create_block_airdrop_block_init' );

