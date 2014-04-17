<?php

/* * *********************************************************
 * jQuery UI Accordion (toggles)
 * ********************************************************* */
$efs_theme=get_option('EFS_THEME',5);
$_efs_oscitas_accordion = array('current_id'=>0);


function osc_theme_efs_toggles($params, $content = null) {
    global $_efs_oscitas_accordion,$efs_theme;
    extract(shortcode_atts(array(
        'id' => count($_efs_oscitas_accordion),
        'class' => ''
    ), $params));
    $_efs_oscitas_accordion[$id] = array();
    $_efs_oscitas_accordion['current_id'] = count($_efs_oscitas_accordion)-1;
    do_shortcode($content);
    if($efs_theme==4){
        $scontent = '<div class="section-container accordion '.$class.'" data-section="accordion" id="oscitas-efs-toggle-' . $id .'">';
        if(isset($_efs_oscitas_accordion[$id]['tabs']) && is_array($_efs_oscitas_accordion[$id]['tabs'])){
           $scontent.=implode('', $_efs_oscitas_accordion[$id]['tabs']);
        }
        $scontent.='</div>';


    } else{
        $scontent = '<dl class="accordion '.$class.'" data-accordion id="oscitas-efs-toggle-' . $id .'">';
        if(isset($_efs_oscitas_accordion[$id]['tabs']) && is_array($_efs_oscitas_accordion[$id]['tabs'])){
            $scontent.=implode('', $_efs_oscitas_accordion[$id]['tabs']);
        }
        $scontent.='</dl>';


    }
    if (trim($scontent) != "") {

        $_efs_oscitas_accordion['current_id'] =$_efs_oscitas_accordion['current_id']-1;
        return $scontent;
    } else {
        return "";
    }

}
function osc_theme_efs_toggle($params, $content = null) {
    global $_efs_oscitas_accordion,$efs_theme;
    extract(shortcode_atts(array(
        'title' => 'title',
        'active' => '',
    ), $params));
    //$con = do_shortcode($content);
    $index = $_efs_oscitas_accordion['current_id'];
    if (!isset($_efs_oscitas_accordion[$index]['tabs'])) {
        $_efs_oscitas_accordion[$index]['tabs'] = array();
    }
    $pane_id =  'efs-tooglepane-' .$index . '-' .  count($_efs_oscitas_accordion[$index]['tabs']);
    if($efs_theme==4){

        $_efs_oscitas_accordion[$index]['tabs'][] ='<section class="' . $active . '">
    <p class="title" data-section-title><a href="#' . $pane_id . '">' . $title. '</a></p>
    <div class="content" data-section-content>
      <p>'. do_shortcode($content) .'</p>
    </div>
  </section>';
            '<section class="' . $active . '"><p class="title" data-section-title><a href="#' . $pane_id . '">' . $title. '</a></p><div class="content" data-section-content><p>'
            . do_shortcode($content) . '</p></div></section>';
    } else{

        $_efs_oscitas_accordion[$index]['tabs'][] = '<dd><a href="#' . $pane_id . '">' . $title
            . '</a><div class="content '. $active .'" id="'.$pane_id.'">'
            . do_shortcode(trim($content)) . '</div></dd>';
    }
}


add_shortcode('efstoggles', 'osc_theme_efs_toggles');
add_shortcode('efstoggle', 'osc_theme_efs_toggle');