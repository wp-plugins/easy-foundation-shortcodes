<?php

/* * *********************************************************
 * BUTTONS
 * ********************************************************* */

function osc_theme_efs_interchange($params, $content = null) {
    extract(shortcode_atts(array(
                'type' => '',
                'class' => '',
                'smallimage' => '',
                'mediumimage' => '',
                'largeimage' => '',
                    ), $params));
    $content = str_replace("]<br />", ']', $content);
    $content = str_replace("<br />\n[", '[', $content);
    do_shortcode($content);
    if($type=="image"){
         $out = '<img class="'. $class . '" data-interchange="['.$smallimage.', (small)], ['.$mediumimage.', (medium)], ['.$largeimage.', (large)]" />';
    }elseif($type=="content"){
        $smallfile=plugins_url('small.html',__FILE__);
        $mediumfile=plugins_url('medium.html',__FILE__);
        $largefile=plugins_url('large.html',__FILE__);
        $out = '<div class="'. $class . '" data-interchange="['.$smallfile.', (small)], ['.$mediumfile.', (medium)], ['.$largefile.', (large)]"></div>';
    }else{
        $out = '<div class="'. $class . '">Data Interchange Div</div>';
    }
    return $out;
}

add_shortcode('efsinterchange', 'osc_theme_efs_interchange');

function osc_theme_efs_interchangesmall($params, $content = null) {
    $content = do_shortcode($content);
    $smallfile=plugin_dir_path(__FILE__).'small.html';
    file_put_contents( $smallfile , $content );
}
add_shortcode('efsinterchangesmall', 'osc_theme_efs_interchangesmall');

function osc_theme_efs_interchangemedium($params, $content = null) {
    $content = do_shortcode($content);
    $mediumfile=plugin_dir_path(__FILE__).'medium.html';
    file_put_contents( $mediumfile , $content );
}
add_shortcode('efsinterchangemedium', 'osc_theme_efs_interchangemedium');

function osc_theme_efs_interchangelarge($params, $content = null) {
    $content = do_shortcode($content);
    $largefile=plugin_dir_path(__FILE__).'large.html';
    file_put_contents( $largefile , $content );
}
add_shortcode('efsinterchangelarge', 'osc_theme_efs_interchangelarge');