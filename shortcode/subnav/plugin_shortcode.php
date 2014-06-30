<?php

function osc_theme_efs_subnav($params, $content = null) {
    extract(shortcode_atts(array(
                'class' => ''
                    ), $params));
    $content = str_replace("]<br />", ']', $content);
    $content = str_replace("]<br />\n", ']', $content);
    $content = str_replace("<br />\n[", '[', $content);
    return '<dl class="sub-nav ' . $class . '">' . do_shortcode($content) . '</dl>';
}

add_shortcode('efssubnav', 'osc_theme_efs_subnav');

function osc_theme_efs_subnavlabel($params, $content = null) {
    extract(shortcode_atts(array(
        'value' => '',
    ), $params));

    return '<dt>'.$value.':</dt>';
}
add_shortcode('efssubnavlabel', 'osc_theme_efs_subnavlabel');

function osc_theme_efs_subnavli($params, $content = null) {
    extract(shortcode_atts(array(
                'active' => '',
                'title' => '',
                'link' => ''
                    ), $params));

    return '<dd class="'.$active.'"><a href="'.($link?$link:'#').'">' .$title . '</a></dd>';
}
add_shortcode('efssubnavli', 'osc_theme_efs_subnavli');