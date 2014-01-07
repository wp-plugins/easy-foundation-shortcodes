<?php

/* * *********************************************************
 * jQuery UI Tabs
 * ********************************************************* */
$_oscitas_tabs = array('current_id'=>0);

function osc_theme_efs_tabs($params, $content = null) {
    global $_oscitas_tabs;

    extract(shortcode_atts(array(
        'id' => count($_oscitas_tabs),
        'class' => ''
    ), $params));
    $_oscitas_tabs[$id] = array();
    $_oscitas_tabs['current_id'] = count($_oscitas_tabs)-1;
    do_shortcode($content);
    $scontent = '<div id="oscitas-efs-tabs-' . $id .'">';
    if(isset($_oscitas_tabs[$id]['tabs']) && is_array($_oscitas_tabs[$id]['tabs']) && isset($_oscitas_tabs[$id]['panes']) && is_array($_oscitas_tabs[$id]['panes'])){
        $scontent .='<dl class="tabs" data-tab>';
        foreach($_oscitas_tabs[$id]['tabs'] as $key=>$tab){
            $scontent .=$tab;
        }
        $scontent .='</dl>';
        $scontent .='<div class="tabs-content">';
        foreach($_oscitas_tabs[$id]['panes'] as $key=>$pane){
            $scontent .=$pane;
        }
        $scontent .='</div>';
    }
    $scontent.='</div>';

    if (trim($scontent) != "") {
        $output = '<div class="' . $class . '">' . $scontent;
        $output .= '</div>';
        $_oscitas_tabs['current_id'] = $_oscitas_tabs['current_id']-1;

        return $output;
    } else {
        return "";
    }
}
add_shortcode('efstabs', 'osc_theme_efs_tabs');

function osc_theme_efs_tab($params, $content = null) {
    global $_oscitas_tabs;
    extract(shortcode_atts(array(
        'title' => 'title',
        'active' => '',
    ), $params));

    $index = $_oscitas_tabs['current_id'];
    if (!isset($_oscitas_tabs[$index]['tabs'])) {
        $_oscitas_tabs[$index]['tabs'] = array();
    }
    $pane_id =  $index . '-' .  count($_oscitas_tabs[$index]['tabs']);
    $_oscitas_tabs[$index]['tabs'][] = '<dd class="' . $active . '"><a href="#tab-panel' . $pane_id . '">' . $title
        . '</a></dd>';
    $_oscitas_tabs[$index]['panes'][] = '<div class="content ' . $active . '" id="tab-panel'.$pane_id.'"><p>'. do_shortcode(trim($content)) . '</p></div>';
}
add_shortcode('efstab', 'osc_theme_efs_tab');
