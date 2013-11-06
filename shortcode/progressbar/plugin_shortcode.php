<?php

/* * *********************************************************
 * BUTTONS
 * ********************************************************* */

function osc_theme_efs_progressbar($params, $content = null) {
    extract(shortcode_atts(array(
                'value' => '50',
                'barstyle' => '',
                'bartype' => '',
                'barsize' => '',
                'class' => ''
                    ), $params));
    $out = '<div class="progress ' . $barstyle . ' ' . $class .' ' . $bartype.' ' . $barsize.' oscitas-efs-progressbar">
    <span class="meter" style="width: ' . $value . '%"></span></div>';

    return $out;
}

add_shortcode('efsprogressbar', 'osc_theme_efs_progressbar');

