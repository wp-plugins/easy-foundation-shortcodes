<?php

/* * *********************************************************
 * TABLES
 * ********************************************************* */

function osc_theme_os_efs_table($params, $content = null) {
    extract(shortcode_atts(array(
                'width' => '100%',
//                'style' => '',
//                'responsive' => 'false',
                'class' => ''
                    ), $params));
    $content = str_replace("]<br />", ']', $content);
    $out = '<table width="' . $width . '" class="table '.$class.'">' . do_shortcode($content) . '</table>';
//    $out = strtolower($responsive) == 'true' ? '<div class="table-responsive">' . $out . '</div>' : $out;
    return $out;
}

add_shortcode('efstable', 'osc_theme_os_efs_table');

function osc_theme_os_efs_table_head($params, $content = null) {
    $out = '<thead><tr>' . do_shortcode($content) . '</tr></thead>';
    return $out;
}

add_shortcode('efstable_head', 'osc_theme_os_efs_table_head');

function osc_theme_os_efs_table_body($params, $content = null) {
    $out = '<tbody>' . do_shortcode($content) . '</tbody>';
    return $out;
}

add_shortcode('efstable_body', 'osc_theme_os_efs_table_body');

function osc_theme_os_efs_table_row($params, $content = null) {
    $out = '<tr>';
    $out .= do_shortcode($content);
    $out .= '</tr>';
    return $out;
}

add_shortcode('efstable_row', 'osc_theme_os_efs_table_row');

function osc_theme_os_efs_row_column($params, $content = null) {
    $out = '<td>';
    $out .= do_shortcode($content);
    $out .= '</td>';
    return $out;
}

add_shortcode('efsrow_column', 'osc_theme_os_efs_row_column');

function osc_theme_os_efs_th_column($params, $content = null) {
    $out = '<th>';
    $out .= do_shortcode($content);
    $out .= '</th>';
    return $out;
}

add_shortcode('efsth_column', 'osc_theme_os_efs_th_column');
