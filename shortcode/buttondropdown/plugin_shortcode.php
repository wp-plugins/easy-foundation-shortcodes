<?php
$oscitas_buttonsdropdown=array('currnt_id'=>0);
function osc_theme_efs_buttondropdown($params, $content = null) {
    extract(shortcode_atts(array(
        'class' => ''
    ), $params));
    $content = str_replace("]<br />", ']', $content);
    $content = str_replace("]<br />\n", ']', $content);
    $content = str_replace("<br />\n[", '[', $content);

    $out = '<div class="btn-group ' . $class . '">' . do_shortcode($content) . '</div>';
    return $out;
}

add_shortcode('efsbuttondropdown', 'osc_theme_efs_buttondropdown');

function osc_theme_buttondropdown_efs_head($params, $content = null) {
    global $oscitas_buttonsdropdown;
    extract(shortcode_atts(array(
        'id'=>count($oscitas_buttonsdropdown),
        'size' => '',
        'style' => '',
        'color_class' => '',
        'split' => ''), $params));
    $out = '';
    $oscitas_buttonsdropdown[$id] = array();
    $oscitas_buttonsdropdown['current_id'] = count($oscitas_buttonsdropdown)-1;
    if ($split == "split") {
        $out = '<button class="button ' . $size . ' ' . $style .' ' . $color_class. ' split" >' . $content . '<span data-dropdown="drop'.$oscitas_buttonsdropdown['current_id'].'"></span></button>';
    } else {
        $out = '<button class="button ' . $size . ' ' . $style .' ' . $color_class. '" data-dropdown="drop'.$oscitas_buttonsdropdown['current_id'].'">' . $content . '</button>';
    }

    return $out;
}

add_shortcode('efsbuttondropdownhead', 'osc_theme_buttondropdown_efs_head');

function osc_theme_buttondropdown_efs_body($params, $content = null) {
    global $oscitas_buttonsdropdown;
    $index= $oscitas_buttonsdropdown['current_id'];
    $content = str_replace("]<br />", ']', $content);
    $content = str_replace("]<br />\n", ']', $content);
    $content = str_replace("<br />\n[", '[', $content);
    $out = '<ul id="drop'.$index.'" class="f-dropdown" data-dropdown-content>' . do_shortcode($content) . '</ul>';
    return $out;
}

add_shortcode('efsbuttondropdownbody', 'osc_theme_buttondropdown_efs_body');

function osc_theme_buttondropdown_efs_items($params, $content = null) {
    extract(shortcode_atts(array(
        'link' => '',
        'disabled' => ''), $params));
    $out = '';
    if ($disabled == 'disabled') {
        $out = '<li class="disabled"><a href="javascript:;">' . do_shortcode($content) . '</a></li>';
    } else {
        $out = '<li><a href="' . $link . '">' . do_shortcode($content) . '</a></li>';
    }
    return $out;
}

add_shortcode('efsbuttondropdownitem', 'osc_theme_buttondropdown_efs_items');
?>