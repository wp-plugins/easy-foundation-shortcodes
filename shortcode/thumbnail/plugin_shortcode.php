<?php

/* * *********************************************************
 * BUTTONS
 * ********************************************************* */

function osc_theme_oscitas_efs_thumbnail($params, $content = 'Label') {
    extract(shortcode_atts(array(
        'src' => '',
        'class' => '',
        'link' => '',
        'radius'=>'',
    ), $params));
    $out = '';
    $out .='<a  class="' . $radius.' '.$class . '" href="' .($link?$link:'#') . '" >';
    $out .= '<img class="th" src="' . $src . '" />';
    $out .='</a>';
    return $out;
}

add_shortcode('efsthumbnail', 'osc_theme_oscitas_efs_thumbnail');

