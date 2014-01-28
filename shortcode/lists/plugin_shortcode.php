<?php

function osc_theme_efs_list($params, $content = null) {
    extract(shortcode_atts(array(
                'class' => ''
                    ), $params));
    $content = str_replace("]<br />", ']', $content);
    $content = str_replace("]<br />\n", ']', $content);
    $content = str_replace("<br />\n[", '[', $content);
    return '<ul class="inline-list ' . $class . '">' . do_shortcode($content) . '</ul>';
}

add_shortcode('efslist', 'osc_theme_efs_list');

function osc_theme_efs_li($params, $content = null) {
    extract(shortcode_atts(array(
                'type' => ''
                    ), $params));

    return '<li>' .do_shortcode($content) . '</li>';
}
add_shortcode('efsli', 'osc_theme_efs_li');