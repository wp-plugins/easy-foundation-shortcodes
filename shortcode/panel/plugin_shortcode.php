<?php

function osc_theme_efs_panel($atts, $content = null) {
    extract(shortcode_atts(array(
                'style' => '',
                'type' => '',
                'class' => ''
                    ), $atts));
    $content = str_replace("]<br />", ']', $content);

    $content = str_replace("<br />\n[", '[', $content);
//    if($type && $type=='on'){
//        $type='radius';
//    };
    $result = '<div class="panel ' . $style . ' ' . $type . ' ' .$class . '">';
    $result .= do_shortcode($content);
    $result .= '</div>';

    return $result;
}

add_shortcode('efspanel', 'osc_theme_efs_panel');


function osc_theme_panel_efs_heading($atts, $content = null) {
    $result = '<h5>';
    $result .= do_shortcode($content);
    $result .= '</h5>';
    return $result;
}

add_shortcode('efspanel-header', 'osc_theme_panel_efs_heading');

function osc_theme_panel_efs_content($atts, $content = null) {
    $result = '<p>';
    $result .= do_shortcode($content);
    $result .= '</p>';
    return $result;
}

add_shortcode('efspanel-content', 'osc_theme_panel_efs_content');