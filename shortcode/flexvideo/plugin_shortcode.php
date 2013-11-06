<?php
/**
 * Created by JetBrains PhpStorm.
 * User: oscitas
 * Date: 25/10/13
 * Time: 5:26 PM
 * To change this template use File | Settings | File Templates.
 */
function osc_theme_efs_flexvideo($params, $content = null) {
    extract(shortcode_atts(array(
        'type' => '',
        'url' => '',
        'width' => '',
        'height' => '',
        'allowfullscreen' => '',
        'widescreen' => '',
        'class' => ''
    ), $params));
    $out = '';
    $content = str_replace("<br />", '', $content);
    $content = str_replace("<br />\n", '', $content);
    if($type=='vimeo'){
        $type='vimeo';
    }else{
        $type='';
    }
    if($allowfullscreen=='yes'){
        $allowfullscreen='true';
    }else{
        $allowfullscreen='';
    }
    if($widescreen=='yes'){
        $widescreen='widescreen';
    }else{
        $widescreen='';
    }
    $out = '<div class="flex-video ' . $type . ' ' . $class . ' '.$widescreen.'"><iframe width="'.$width.'" height="'.$height.'" src="'.$url.'" allowfullscreen="'.$allowfullscreen.'"></iframe></div>';
    return $out;
}

add_shortcode('efsflexvideo', 'osc_theme_efs_flexvideo');