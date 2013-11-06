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

    $out = ' <div class="th ' . $radius.' '.$class . '">';

    if ($link != '') {
        $out .='<a href="' . $link . '" >';
    }
    $out .= '<img src="' . $src . '">';
    if ($link != '') {
        $out .='</a>';
    }

    $out .= '</div>';
    return $out;
}

add_shortcode('efsthumbnail', 'osc_theme_oscitas_efs_thumbnail');

