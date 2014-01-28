<?php

function osc_theme_efs_iconhead($params, $content = null) {
    extract(shortcode_atts(array(
                'class' => '',
                'style' => '',
                'type' => 'h1'
                    ), $params));
    $out = '';
    if ($style != '') {
        $style = ' <span class="fi ' . $style . '"></span> ';
    }
    if ($class != '') {
        $class = ' class="' . $class . '"';
    }
    $out = '<' . $type . $class . '>' . $style . do_shortcode($content) . '</' . $type . '>';

    return $out;
}

add_shortcode('efsiconheading', 'osc_theme_efs_iconhead');

