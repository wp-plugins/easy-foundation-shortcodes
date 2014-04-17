<?php

/* * *********************************************************
 * jQuery UI Tabs
 * ********************************************************* */
$efs_theme=get_option('EFS_THEME',5);
$_efs_oscitas_tabs = array('current_id'=>0);

function osc_theme_efs_tabs($params, $content = null) {
    global $_efs_oscitas_tabs,$efs_theme;
    extract(shortcode_atts(array(
        'id' => count($_efs_oscitas_tabs),
        'class' => ''
    ), $params));
    $_efs_oscitas_tabs[$id] = array();
    $_efs_oscitas_tabs['current_id'] = count($_efs_oscitas_tabs)-1;
   do_shortcode($content);
    if($efs_theme==4){
        $scontent = '<div class="section-container tabs '.$class.'" data-section="tabs" id="oscitas-efs-tabs-' . $id .'">';
        if(isset($_efs_oscitas_tabs[$id]['tabs']) && is_array($_efs_oscitas_tabs[$id]['tabs'])){
            $scontent.=  implode('', $_efs_oscitas_tabs[$id]['tabs']);
        }
        $scontent.='</div>';
    } else{

        $scontent = '<div id="oscitas-efs-tabs-' . $id .'" class="'.$class.'">';
        if(isset($_efs_oscitas_tabs[$id]['tabs']) && is_array($_efs_oscitas_tabs[$id]['tabs']) && isset($_efs_oscitas_tabs[$id]['panes']) && is_array($_efs_oscitas_tabs[$id]['panes'])){
            $scontent .='<dl class="tabs" data-tab>';
            $scontent.=  implode('', $_efs_oscitas_tabs[$id]['tabs']);
            $scontent .='</dl>';
            $scontent .='<div class="tabs-content">';
            $scontent.=  implode('', $_efs_oscitas_tabs[$id]['panes']);
            $scontent .='</div>';
        }
        $scontent.='</div>';

    }

    if (trim($scontent) != "") {
        $_efs_oscitas_tabs['current_id'] = $_efs_oscitas_tabs['current_id']-1;
        //echo ($scontent);
        return $scontent;
    } else {
        return "";
    }
}
add_shortcode('efstabs', 'osc_theme_efs_tabs');

function osc_theme_efs_tab($params, $content = null) {
    extract(shortcode_atts(array(
        'title' => 'title',
        'active' => '',
    ), $params));
    global $_efs_oscitas_tabs,$efs_theme;
    $index = $_efs_oscitas_tabs['current_id'];
    if (!isset($_efs_oscitas_tabs[$index]['tabs'])) {
        $_efs_oscitas_tabs[$index]['tabs'] = array();
    }
    $pane_id =  'efs-tabpane-' .$index . '-' .  count($_efs_oscitas_tabs[$index]['tabs']);
    if($efs_theme==4){
        $_efs_oscitas_tabs[$index]['tabs'][] = '<section class="' . $active . '"><p class="title" data-section-title><a href="#' . $pane_id . '">' . $title. '</a></p><div class="content" id="' . $pane_id . '" data-section-content><p>'. do_shortcode(trim($content)) . '</p></div></section>';
    } else{
        $_efs_oscitas_tabs[$index]['tabs'][] = '<dd class="' . $active . '"><a href="#' . $pane_id . '">' . $title
            . '</a></dd>';
        $_efs_oscitas_tabs[$index]['panes'][] = '<div class="content ' . $active . '" id="'.$pane_id.'"><p>'. do_shortcode(trim($content)) . '</p></div>';
    }
}
add_shortcode('efstab', 'osc_theme_efs_tab');


