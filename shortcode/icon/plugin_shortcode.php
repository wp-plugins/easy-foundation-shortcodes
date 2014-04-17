<?php

/* * *********************************************************
 * BUTTONS
 * ********************************************************* */

function osc_theme_efs_icon($params, $content = null) {
    extract(shortcode_atts(array(
                'type' => '',
                'class' => '',
                    ), $params));
    $out = '<i class="fi ' . $type . ' ' . $class . '"></i>';
    return $out;
}

add_shortcode('efsicon', 'osc_theme_efs_icon');

