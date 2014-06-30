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
    'buttondropdown',
    'labels',
    'thumbnail',
    'icon',
    'progressbar',
    'pricingtable',
    'flexvideo',
    'buttongroup',
    'interchange',
    'sidenav',
    'subnav',
    'visibility',
);
function efs_groups($grps=array()){
    $grps=array('basic'=>array(
        'name'=>'Basic Elements',
        'icon'=>'elements.png'
    ),'interactive'=>array('name'=>'Interactive', 'icon'=>'interaction.png'),'content'=>array('name'=>'Content', 'icon'=>'content.png'),
        'miscellaneous'=>array('name'=>'Miscellaneous', 'icon'=>'misc.png'),'columns'=>array('name'=>'Columns', 'icon'=>'column.png')
    );
    return $grps;
}
function efs_shortcodes($shortcodes=array()){
    $shortcodes=array(
        'buttons'=>array('group'=>'basic',
            'name'=>'Button',
            'width'=>800,
            'height'=>''
        ),
        'buttongroup'=>array('group'=>'basic',
            'name'=>'Button Group',
            'width'=>1000,
            'height'=>''
        ),
        'buttondropdown'=>array('group'=>'basic',
            'name'=>'Button Dropdown',
            'width'=>'',
            'height'=>''
        ),
        'notifications'=>array('group'=>'basic',
            'name'=>'Notifications',
            'width'=>'',
            'height'=>''
        ),
        'tooltip'=>array('group'=>'basic',
            'name'=>'Tooltip',
            'width'=>'',
            'height'=>''
        ),
        'dropdown'=>array('group'=>'basic',
            'name'=>'Dropdown',
            'width'=>'',
            'height'=>''
        ),
        'progressbar'=>array('group'=>'basic',
            'name'=>'Progress Bar',
            'width'=>800,
            'height'=>''
        ),
        'toggles'=>array('group'=>'interactive',
            'name'=>'Accordion',
            'width'=>980,
            'height'=>''
        ),

        'tabs'=>array('group'=>'interactive',
            'name'=>'Tabs',
            'width'=>1000,
            'height'=>''
        ),
        'tables'=>array('group'=>'interactive',
            'name'=>'Tables',
            'width'=>'',
            'height'=>''
        ),
        'panel'=>array('group'=>'interactive',
            'name'=>'Panel',
            'width'=>'',
            'height'=>''
        ),
        'lists'=>array('group'=>'content',
            'name'=>'List',
            'width'=>800,
            'height'=>''
        ),
        'iconhead'=>array('group'=>'content',
            'name'=>'Icon Heading',
            'width'=>800,
            'height'=>''
        ),
        'labels'=>array('group'=>'content',
            'name'=>'Label',
            'width'=>'',
            'height'=>''
        ),
        'pricingtable'=>array('group'=>'content',
            'name'=>'Pricing Table',
            'width'=>'',
            'height'=>''
        ),
        'sidenav'=>array('group'=>'content',
            'name'=>'Side Nav',
            'width'=>'',
            'height'=>''
        ),
        'subnav'=>array('group'=>'content',
            'name'=>'Sub Nav',
            'width'=>'',
            'height'=>''
        ),
        'thumbnail'=>array('group'=>'miscellaneous',
            'name'=>'Responsive Image',
            'width'=>800,
            'height'=>''
        ),
        'icon'=>array('group'=>'miscellaneous',
            'name'=>'Icon',
            'width'=>800,
            'height'=>''
        ),
        'interchange'=>array('group'=>'miscellaneous',
            'name'=>'Data Interchange',
            'width'=>800,
            'height'=>''
        ),
        'visibility'=>array('group'=>'miscellaneous',
            'name'=>'Content Visibility',
            'width'=>800,
            'height'=>''
        ),
        'wpcolumns'=>array('group'=>'columns',
            'name'=>'Columns',
            'width'=>1000,
            'height'=>''
        )

    );


    return $shortcodes;
}

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
    $version=floatval(get_bloginfo('version'));
    if($version<3.9){
        $plugin_array['oscitas_efs_main_dropdown']=EFS_PLUGIN_URL.'js/oscitas_main_dropdown.js';
    } else{
        $plugin_array['oscitas_efs_main_dropdown']=EFS_PLUGIN_URL.'js/oscitas_dropdown_3_9.js';
    }
    //$plugin_array['oscitas_efs_main_dropdown']=EFS_PLUGIN_URL.'js/oscitas_main_dropdown.js';
    return $plugin_array;
}