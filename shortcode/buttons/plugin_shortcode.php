<?php

/* * *********************************************************
 * BUTTONS
 * ********************************************************* */

function osc_theme_efs_button($params, $content = null) {
    extract(shortcode_atts(array(
                'title' => 'osCitas',
                'link' => '',
                'type' => 'link',
                'style' => '',
                'size' => '',
                'align' => '',
                'target' => '',
                'icon' => '',
                'class' => '',
                'disabled'=>'',
                'color_class'=>''
                    ), $params));
    $out = '';
    if($icon!=''){
        if($align=='right'){
            $value=$title.' <i class="glyphicon '.$icon.'"></i>';
        } else{
            $value='<i class="glyphicon '.$icon.'"></i> '.$title;
        }
    }else{
        $value=$title;
    }
    $target = ' target="'.($target != 'false' ? '_blank':'_self').'"';
    if ($type == 'link') {
        $out = '<a class="button ' . $style . ' ' . $class . ' ' .$disabled.' '.$color_class.' '.$size.'" href="' . $link . '" ' . ($target) . '>' . $value . '</a>';
    } elseif ($type == 'button') {
        $out = '<button class="button ' . $style . ' ' . $class . ' ' .$disabled.' '.$color_class.' '.$size.'" >' . $value . '</button>';
    }
    return $out;
}

add_shortcode('efsbutton', 'osc_theme_efs_button');

