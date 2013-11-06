<?php

/* * *********************************************************
 * jQuery UI Accordion (toggles)
 * ********************************************************* */

$_oscitas_accordion = array('current_id'=>0);

function osc_theme_efs_toggles($params, $content = null) {
    global $_oscitas_accordion;
    extract(shortcode_atts(array(
                'id' => count($_oscitas_accordion),
                'class' => ''
                    ), $params));
    $_oscitas_accordion[$id] = array();
    $_oscitas_accordion['current_id'] = count($_oscitas_accordion)-1;
    $scontent = do_shortcode($content);

    $output = '';
    $scontent = '<div class="section-container accordion" data-section="accordion" id="oscitas-efs-toggle-' . $id .'">';
    if(isset($_oscitas_accordion[$id]['tabs']) && is_array($_oscitas_accordion[$id]['tabs']) && isset($_oscitas_accordion[$id]['panes']) && is_array($_oscitas_accordion[$id]['panes'])){
        foreach($_oscitas_accordion[$id]['tabs'] as $key=>$tab){
            $scontent .=$tab.$_oscitas_accordion[$id]['panes'][$key];
        }
    }
    $scontent.='</div>';

    if (trim($scontent) != "") {
        $output = '<div class="' . $class . '">' . $scontent;
        $output .= '</div>';
        $_oscitas_accordion['current_id'] =$_oscitas_accordion['current_id']-1;
        return $output;
    } else {
        return "";
    }

}

add_shortcode('efstoggles', 'osc_theme_efs_toggles');

function osc_theme_efs_toggle($params, $content = null) {
    global $_oscitas_accordion;
    extract(shortcode_atts(array(
                'title' => 'title',
                'active' => '',
                    ), $params));
    //$con = do_shortcode($content);
    $index = $_oscitas_accordion['current_id'];
    if (!isset($_oscitas_accordion[$index]['tabs'])) {
        $_oscitas_accordion[$index]['tabs'] = array();
    }
    $pane_id =  $index . '-' .  count($_oscitas_accordion[$index]['tabs']);
    $_oscitas_accordion[$index]['tabs'][] = '<section class="' . $active . '"><p class="title" data-section-title><a href="#section' . $pane_id . '">' . $title
        . '</a></p>';
    $_oscitas_accordion[$index]['panes'][] = '<div class="content" data-slug="section'.$pane_id.'" id="'
        . $pane_id . '" data-section-content><p>'
        . do_shortcode(trim($content)) . '</p></div></section>';
}

add_shortcode('efstoggle', 'osc_theme_efs_toggle');