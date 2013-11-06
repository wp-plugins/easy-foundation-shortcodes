<?php

function osc_theme_efs_notification($atts, $content = null) {
    extract(shortcode_atts(array(
                'type' => '',
                'style' => '',
                'close' => 'false',
                'class' => ''
                    ), $atts));
    $type = ($close == 'true' ? $type . ' alert-dismissable' : $type);


    $result = '<div data-alert class = "alert-box ' . $type . ' ' . $style . ' '. $class . '">';
    $result .= do_shortcode($content);
    if ($close == 'true') {
        $result .= '<a href="#" class="close">&times;</a>';
    }
    $result .= '</div>';

    return $result;
}

add_shortcode('efsnotification', 'osc_theme_efs_notification');





