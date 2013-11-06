<?php

// Add Shortcode buttons in TinyMCE
$efselements = array(
    'toggles',
    'tabs',
    'lists',
    'buttons',
    'notifications',
    'wpcolumns',
    'tables',
    'tooltip',
    'iconhead',
    'panel',
    'dropdown',
    'labels',
    'thumbnail',
    'icon',
    'progressbar',
    'pricingtable',
    'flexvideo',
    'buttongroup',
);

foreach ($efselements as $element) {
    include( $element . '/plugin_shortcode.php');
}

add_action('init', 'osc_add_efs_buttons_to_tinymce');

function osc_add_efs_buttons_to_tinymce() {
    if (!current_user_can('edit_posts') && !current_user_can('edit_pages'))
        return;

    if (get_user_option('rich_editing') == 'true') {
        add_filter("mce_external_plugins", "osc_add_efs_plugin");
        add_filter('mce_buttons_4', 'osc_register_efs_button');
    }
}

function osc_register_efs_button($buttons) {
    global $efselements;
    foreach ($efselements as $element) {
        $buttons[] = 'oscitasefs' . $element;
    }
    return $buttons;
}

function osc_add_efs_plugin($plugin_array) {
    global $efselements;
    foreach ($efselements as $element) {
        $plugin_array['oscitasefs' . $element] = plugins_url('', __FILE__) . '/' . $element . '/' . $element . '_plugin.js';
    }
    return $plugin_array;
}