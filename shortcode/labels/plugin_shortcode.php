<?php

/* * *********************************************************
 * BUTTONS
 * ********************************************************* */

function osc_theme_efs_labels($params, $content = 'Label') {
    extract(shortcode_atts(array(
                'type' => '',
                'style' => '',
                'class' => ''
                    ), $params));
    $out = '';
    $content = str_replace("<br />", '', $content);
    $content = str_replace("<br />\n", '', $content);
    $out = '<span class="label ' . $type . ' ' . $class . ' '.$style.'">' . do_shortcode($content) . '</span>';
    return $out;
}

add_shortcode('efslabel', 'osc_theme_efs_labels');

