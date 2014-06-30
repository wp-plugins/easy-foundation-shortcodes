<?php

/* * *********************************************************
 * Tooltip
 * ********************************************************* */

function osc_theme_efs_visibility($params, $content = null) {
    extract(shortcode_atts(array(
        'class' => '',
        'showhideon' => '',
    ), $params));
    $out = '';
    $out.='<p class="panel '.$class.' '.$showhideon.'">'.do_shortcode($content).'</p>';
    return $out;
}

add_shortcode('efsvisibility', 'osc_theme_efs_visibility');

