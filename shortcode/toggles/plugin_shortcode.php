<?php

/* * *********************************************************
 * jQuery UI Accordion (toggles)
 * ********************************************************* */

$_efs_oscitas_accordion = array('current_id'=>0);

function osc_theme_efs_toggles($params, $content = null) {
    global $_efs_oscitas_accordion;
    extract(shortcode_atts(array(
        'id' => count($_efs_oscitas_accordion),
        'class' => ''
    ), $params));
    $_efs_oscitas_accordion[$id] = array();
    $_efs_oscitas_accordion['current_id'] = count($_efs_oscitas_accordion)-1;
    $scontent = do_shortcode($content);

    $output = '';
    $scontent = '<dl class="accordion" data-accordion id="oscitas-efs-toggle-' . $id .'">';
    if(isset($_efs_oscitas_accordion[$id]['tabs']) && is_array($_efs_oscitas_accordion[$id]['tabs']) && isset($_efs_oscitas_accordion[$id]['panes']) && is_array($_efs_oscitas_accordion[$id]['panes'])){
        foreach($_efs_oscitas_accordion[$id]['tabs'] as $key=>$tab){
            $scontent .=$tab.$_efs_oscitas_accordion[$id]['panes'][$key];
        }
    }
    $scontent.='</dl>';

    if (trim($scontent) != "") {
        $output = '<div class="' . $class . '">' . $scontent;
        $output .= '</div>';
        $_efs_oscitas_accordion['current_id'] =$_efs_oscitas_accordion['current_id']-1;
        return $output;
    } else {
        return "";
    }

}

add_shortcode('efstoggles', 'osc_theme_efs_toggles');

function osc_theme_efs_toggle($params, $content = null) {
    global $_efs_oscitas_accordion;
    extract(shortcode_atts(array(
        'title' => 'title',
        'active' => '',
    ), $params));
    //$con = do_shortcode($content);
    $index = $_efs_oscitas_accordion['current_id'];
    if (!isset($_efs_oscitas_accordion[$index]['tabs'])) {
        $_efs_oscitas_accordion[$index]['tabs'] = array();
    }
    $pane_id =  $index . '-' .  count($_efs_oscitas_accordion[$index]['tabs']);
    $_efs_oscitas_accordion[$index]['tabs'][] = '<dd><a href="#panel' . $pane_id . '">' . $title
        . '</a>';
    $_efs_oscitas_accordion[$index]['panes'][] = '<div class="content '. $active .'" id="panel'.$pane_id.'">'
        . do_shortcode(trim($content)) . '</div></dd>';
}

add_shortcode('efstoggle', 'osc_theme_efs_toggle');