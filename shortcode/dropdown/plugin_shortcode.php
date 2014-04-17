<?php
$oscitas_drop_buttons=array('currnt_id'=>0);
function osc_theme_efs_dropdown($params, $content = null) {
    extract(shortcode_atts(array(
        'class' => ''
    ), $params));
    $content = str_replace("]<br />", ']', $content);
    $content = str_replace("]<br />\n", ']', $content);
    $content = str_replace("<br />\n[", '[', $content);

    $out = '<div class="btn-group ' . $class . '">' . do_shortcode($content) . '</div>';
    return $out;
}

add_shortcode('efsdropdown', 'osc_theme_efs_dropdown');

function osc_theme_dropdown_efs_head($params, $content = null) {
    global $oscitas_drop_buttons;
    extract(shortcode_atts(array(
        'id'=>count($oscitas_drop_buttons),
        'size' => '',
        'style' => '',
        'color_class' => '',
        'split' => ''), $params));
    $out = '';
    $oscitas_drop_buttons[$id] = array();
    $oscitas_drop_buttons['current_id'] = count($oscitas_drop_buttons)-1;
    if ($split == "split") {
        $out = '<button class="button ' . $size . ' ' . $style .' ' . $color_class. ' split" >' . $content . '<span data-dropdown="drop'.$oscitas_drop_buttons['current_id'].'"></span></button>';
    } else {
        $out = '<button class="button ' . $size . ' ' . $style .' ' . $color_class. '" data-dropdown="drop'.$oscitas_drop_buttons['current_id'].'">' . $content . '</button>';
    }

    return $out;
}

add_shortcode('efsdropdownhead', 'osc_theme_dropdown_efs_head');

function osc_theme_dropdown_efs_body($params, $content = null) {
    global $oscitas_drop_buttons;
    $index= $oscitas_drop_buttons['current_id'];
    $content = str_replace("]<br />", ']', $content);
    $content = str_replace("]<br />\n", ']', $content);
    $content = str_replace("<br />\n[", '[', $content);
    $out = '<ul id="drop'.$index.'" class="f-dropdown" data-dropdown-content>' . do_shortcode($content) . '</ul>';
    return $out;
}

add_shortcode('efsdropdownbody', 'osc_theme_dropdown_efs_body');

function osc_theme_dropdown_efs_items($params, $content = null) {
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

add_shortcode('efsdropdownitem', 'osc_theme_dropdown_efs_items');
?>