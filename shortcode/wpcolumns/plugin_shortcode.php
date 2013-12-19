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
        'md' => '',
        'lg' => '',
        'centeredlarge' => '',
        'centeredmedium' => '',
        'centeredsmall' => '',
        'smoff' => '',
        'mdoff' => '',
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
    if ($centeredmedium == 'yes') {
        $centeredmedium = 'medium-centered';
    } else {
        $centeredmedium = '';
    }

    $arr = array('sm');
    $classes = array();
    foreach ($arr as $aa) {
        if (${$aa} == 12 || ${$aa} == '') {
            $classes[] = 'small-12';
        } else {
            $classes[] = 'small-' . ${$aa};
        }
    }
    $arr2 = array('smoff','mdoff', 'lgoff');
    foreach ($arr2 as $aa) {
        $nn = str_replace('off', '', $aa);
        if (${$aa} == '') {
            //$classes[] = '';
        } else {
            $classes[] = ($nn=='sm'?'small':($nn=='md'?'medium':'large')) . '-offset-' . ${$aa};
        }
    }
//    if ($off != '') {
//        $classes[] = 'col-lg-offset-'.$off;
//    }
    $result = '<div class="columns medium-'.$md.' large-' . $lg . ' ' . implode(' ', $classes) . ' '.$centeredsmall. ' '.$centeredlarge.' '.$centeredmedium.'">';
    $result .= do_shortcode($content);
    $result .= '</div>';

    return force_balance_tags($result);
}

add_shortcode('efscolumn', 'osc_theme_efs_column_shortcode');
