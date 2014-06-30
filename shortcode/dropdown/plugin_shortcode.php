<?php
$oscitas_drop_buttons=array('currnt_id'=>0);
function osc_theme_efs_dropdown($params, $content = null) {
    global $oscitas_drop_buttons;
    extract(shortcode_atts(array(
        'id'=>count($oscitas_drop_buttons),
        'class' => '',
        'title' => '',
        'style' => '',
        'color_class' => '',
        'type' => '',
        'position' => '',
        'onhover' => '',
    ), $params));
    if($onhover){
        $flaghover='is_hover: true';
    }else{
        $flaghover='is_hover: false';
    }
    $content = str_replace("]<br />", ']', $content);
    $content = str_replace("]<br />\n", ']', $content);
    $content = str_replace("<br />\n[", '[', $content);
    $oscitas_drop_buttons[$id] = array();
    $oscitas_drop_buttons['current_id'] = count($oscitas_drop_buttons)-1;
    $out = '<a data-options="align: '.$position.';'.$flaghover.'"  href="#" data-dropdown="drop-'.$oscitas_drop_buttons['current_id'].'" class="button ' . $class . ' '.$style.' '.$color_class.'">' . $title . '</a>';
    $out.=do_shortcode($content);
    return $out;
}

add_shortcode('efsdropdown', 'osc_theme_efs_dropdown');

function osc_theme_dropdown_efs_content($params, $content = null) {
    global $oscitas_drop_buttons;
    $index= $oscitas_drop_buttons['current_id'];
    $out = '<div data-dropdown-content class="f-dropdown content" id="drop-'.$index.'">' . do_shortcode($content) . '</div>';

    return $out;
}

add_shortcode('efsdropdowncontent', 'osc_theme_dropdown_efs_content');

function osc_theme_dropdown_efs_body($params, $content = null) {
    global $oscitas_drop_buttons;
    $index= $oscitas_drop_buttons['current_id'];
    $content = str_replace("]<br />", ']', $content);
    $content = str_replace("]<br />\n", ']', $content);
    $content = str_replace("<br />\n[", '[', $content);
    $out = '<ul id="drop-'.$index.'" class="f-dropdown" data-dropdown-content>' . do_shortcode($content) . '</ul>';
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