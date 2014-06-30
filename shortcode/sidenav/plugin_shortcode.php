<?php

function osc_theme_efs_sidenav($params, $content = null) {
    extract(shortcode_atts(array(
                'class' => ''
                    ), $params));
    $content = str_replace("]<br />", ']', $content);
    $content = str_replace("]<br />\n", ']', $content);
    $content = str_replace("<br />\n[", '[', $content);
    return '<ul class="side-nav ' . $class . '">' . do_shortcode($content) . '</ul>';
}

add_shortcode('efssidenav', 'osc_theme_efs_sidenav');

function osc_theme_efs_sidenavli($params, $content = null) {
    extract(shortcode_atts(array(
                'divider' => '',
                'active' => '',
                'title' => '',
                'link' => ''
                    ), $params));

    return '<li class="'.$active.' '.$divider.'"><a href="'.($link?$link:'#').'">' .$title . '</a></li>';
}
add_shortcode('efssidenavli', 'osc_theme_efs_sidenavli');