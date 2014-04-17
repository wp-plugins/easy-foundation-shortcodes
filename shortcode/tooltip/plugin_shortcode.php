<?php

/* * *********************************************************
 * Tooltip
 * ********************************************************* */

function osc_theme_efs_tooltip($params, $content = 'Tooltip') {
    extract(shortcode_atts(array(
                'type' => '',
                'link' => '',
                'tooltip' => '',
                'style' => '',
                'class' => ''
                    ), $params));
    $out = '';
    if ($type == 'link') {
        $out = '<a data-tooltip href="' . $link . '" title="' . $tooltip . '"  class="has-tip ' . $class . ' '.$style.'">' . do_shortcode($content) . '</a>';
    } elseif ($type == 'button') {
        $out = '<button type="button" data-tooltip title="' . $tooltip . '" class="button has-tip ' . $class. ' '.$style.'">' . do_shortcode($content) . '</button>';
    }

    return $out;
}

add_shortcode('efstooltip', 'osc_theme_efs_tooltip');

