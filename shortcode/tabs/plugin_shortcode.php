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
    $scontent = '<div class="section-container tabs" data-section="tabs" id="oscitas-efs-tabs-' . $id .'">';
    if(isset($_oscitas_tabs[$id]['tabs']) && is_array($_oscitas_tabs[$id]['tabs']) && isset($_oscitas_tabs[$id]['panes']) && is_array($_oscitas_tabs[$id]['panes'])){
        foreach($_oscitas_tabs[$id]['tabs'] as $key=>$tab){
            $scontent .=$tab.$_oscitas_tabs[$id]['panes'][$key];
        }
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
    $_oscitas_tabs[$index]['tabs'][] = '<section class="' . $active . '"><p class="title" data-section-title><a href="#section' . $pane_id . '">' . $title
        . '</a></p>';
    $_oscitas_tabs[$index]['panes'][] = '<div class="content" data-slug="section'.$pane_id.'" id="'
        . $pane_id . '" data-section-content><p>'
        . do_shortcode(trim($content)) . '</p></div></section>';
}
add_shortcode('efstab', 'osc_theme_efs_tab');
