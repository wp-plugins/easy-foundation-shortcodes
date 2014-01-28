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
    $efsp_editor_opt=get_option('EFS_EDITOR_OPT','icon');
    if (!current_user_can('edit_posts') && !current_user_can('edit_pages'))
        return;

    if (get_user_option('rich_editing') == 'true') {
        add_filter("mce_external_plugins", "osc_add_efs_plugin");
        if($efsp_editor_opt=='icon'){
        add_filter('mce_buttons_3', 'osc_register_efs_button');
        } else{
            add_filter('mce_buttons', 'osc_register_efs_dropdown');
        }
    }
}
function osc_register_efs_dropdown($buttons){
    $buttons[] = 'oscitas_efs_main_dropdown_button';
    return $buttons;
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
    $plugin_array['oscitas_efs_main_dropdown']=EFS_PLUGIN_URL.'js/oscitas_main_dropdown.js';
    return $plugin_array;
}