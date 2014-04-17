<?php

/* * *********************************************************
 * Row
 * ********************************************************* */

function osc_theme_efs_row($params, $content = null) {
    extract(shortcode_atts(array(
        'class' => ''
    ), $params));
    $result = '<div class="row ' . $class . '">';
    //echo '<textarea>'.$content.'</textarea>';
    $content = str_replace("]<br />", ']', $content);
    $content = str_replace("<br />\n[", '[', $content);
    $result .= do_shortcode($content);
    $result .= '</div>';

    return force_balance_tags($result);
}

add_shortcode('efsrow', 'osc_theme_efs_row');
/* * *********************************************************
 * TWO
 * ********************************************************* */

function osc_theme_efs_column_shortcode($params, $content = null) {
    extract(shortcode_atts(array(
        'sm' => '',
        'lg' => '',
        'centeredlarge' => '',
        'centeredsmall' => '',
        'md'=>'',
        'smoff' => '',
        'lgoff' => '',
        'off'=>''
    ), $params));

    if ($centeredlarge == 'yes') {
        $centeredlarge = 'large-centered';
    } else {
        $centeredlarge = '';
    }
    if ($centeredsmall == 'yes') {
        $centeredsmall = 'small-centered';
    } else {
        $centeredsmall = '';
    }

    $arr = array('small'=>'sm','medium'=>'md');
    $classes = array();
    foreach ($arr as $k => $aa) {
        if (${$aa} == 12 || ${$aa} == '') {
            $classes[] = $k.'-12';
        } else {
            $classes[] = $k.'-' . ${$aa};
        }
    }
    $arr2 = array('smoff', 'lgoff');
    foreach ($arr2 as $aa) {
        $nn = str_replace('off', '', $aa);
        if (${$aa} == 0 || ${$aa} == '') {
            //$classes[] = '';
        } else {
            $classes[] = ($nn=='sm'?'small':'large') . '-offset-' . ${$aa};
        }
    }
//    if ($off != '') {
//        $classes[] = 'col-lg-offset-'.$off;
//    }
    $result = '<div class="columns large-' . $lg . ' ' . implode(' ', $classes) . ' '.$centeredsmall. ' '.$centeredlarge.' ">';
    $result .= do_shortcode($content);
    $result .= '</div>';

    return force_balance_tags($result);
}

add_shortcode('efscolumn', 'osc_theme_efs_column_shortcode');
