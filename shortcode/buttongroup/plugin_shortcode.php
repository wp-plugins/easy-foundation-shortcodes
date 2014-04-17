<?php
/**
 * Created by JetBrains PhpStorm.
 * User: oscitas
 * Date: 28/10/13
 * Time: 10:05 AM
 * To change this template use File | Settings | File Templates.
 */
function osc_theme_efs_buttongroup($params, $content = null) {
    extract(shortcode_atts(array(
        'style' => '',
        'class' => ''
    ), $params));
    $out = '';
    $content = str_replace("<br />", '', $content);
    $content = str_replace("<br />\n", '', $content);
    $content = str_replace("<b>", '', $content);
    $content = str_replace("</b>\n", '', $content);
    $out = '<ul class="button-group ' . $style . ' ' . $class .'">'.do_shortcode($content).'</ul>';
    return $out;
}

add_shortcode('efsbuttongroup', 'osc_theme_efs_buttongroup');

function osc_theme_efs_buttongroupbutton($params, $content = null) {
    extract(shortcode_atts(array(
        'type' => '',
        'link' => '',
        'btnstyle' => '',
    ), $params));
    $out = '';
    $content = str_replace("<br />", '', $content);
    $content = str_replace("<br />\n", '', $content);
    $content = str_replace("<b>", '', $content);
    $content = str_replace("</b>\n", '', $content);
    if($type=='link'){
        $out = '<li><a href="'.$link.'" class="button '.$btnstyle.'">'.do_shortcode($content).'</a></li>';

    }else{
        $out = '<li><button class="button '.$btnstyle.'">'.do_shortcode($content).'</button></li>';
    }
    return $out;
}

add_shortcode('efsbuttongroupbutton', 'osc_theme_efs_buttongroupbutton');