<?php
/**
 * Created by JetBrains PhpStorm.
 * User: oscitas
 * Date: 25/10/13
 * Time: 1:35 PM
 * To change this template use File | Settings | File Templates.
 */
$linktype='';
$linkvalue='#';
function osc_theme_efs_pricingtable($params, $content =null) {
    global $linktype,$linkvalue;
    extract(shortcode_atts(array(
        'type' => '',
        'link' => '',
        'class' => ''
    ), $params));
    $linktype=$type;
    $linkvalue=$link;
    $out = '';
    $content = str_replace("<br />", '', $content);
    $content = str_replace("<br />\n", '', $content);
    $content = str_replace("<b>", '', $content);
    $content = str_replace("</b>\n", '', $content);
    $out = '<ul class="pricing-table ' .$class .'">' . do_shortcode($content) . '</ul>';
    return $out;
}

add_shortcode('efspricingtable', 'osc_theme_efs_pricingtable');

function osc_theme_efs_title($params, $content = null) {
    $out='';
    $content = str_replace("<br />", '', $content);
    $content = str_replace("<br />\n", '', $content);
    $content = str_replace("<b>", '', $content);
    $content = str_replace("</b>\n", '', $content);
    $out = '<li class="title">' . do_shortcode($content) . '</li>';
    return $out;
}

add_shortcode('efstitle', 'osc_theme_efs_title');

function osc_theme_efs_price($params, $content = null) {
    $out='';
    $content = str_replace("<br />", '', $content);
    $content = str_replace("<br />\n", '', $content);
    $content = str_replace("<b>", '', $content);
    $content = str_replace("</b>\n", '', $content);
    $out = '<li class="price">' . do_shortcode($content) . '</li>';
    return $out;
}

add_shortcode('efsprice', 'osc_theme_efs_price');

function osc_theme_efs_description($params, $content = null) {
    $out='';
    $content = str_replace("<br />", '', $content);
    $content = str_replace("<br />\n", '', $content);
    $content = str_replace("<b>", '', $content);
    $content = str_replace("</b>\n", '', $content);
    $out = '<li class="description">' . do_shortcode($content) . '</li>';
    return $out;
}

add_shortcode('efsdescription', 'osc_theme_efs_description');

function osc_theme_efs_bulletitem($params, $content = null) {
    $out='';
    $content = str_replace("<br />", '', $content);
    $content = str_replace("<br />\n", '', $content);
    $content = str_replace("<b>", '', $content);
    $content = str_replace("</b>\n", '', $content);
    $out = '<li class="bullet-item">' . do_shortcode($content) . '</li>';
    return $out;
}

add_shortcode('efsbulletitem', 'osc_theme_efs_bulletitem');

function osc_theme_efs_pricebutton($params, $content = null) {
    global $linktype,$linkvalue;
    $out='';
    $content = str_replace("<br />", '', $content);
    $content = str_replace("<br />\n", '', $content);
    $content = str_replace("<b>", '', $content);
    $content = str_replace("</b>\n", '', $content);
    if($linktype=='link'){
        $out = '<li class="cta-button"><a class="button" href="'.$linkvalue.'">' . do_shortcode($content) .'</a></li>';
    }else{
        $out = '<li class="cta-button"><button class="button">' . do_shortcode($content) .'</button></li>';
    }
    return $out;
}

add_shortcode('efspricebutton', 'osc_theme_efs_pricebutton');