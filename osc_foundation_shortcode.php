<?php

/*
  Plugin Name: Easy Foundation Shortcodes
  Plugin URI: http://www.oscitasthemes.com
  Description: Add Zurb Foundation styles to your theme by wordpress editor shortcode buttons.
  Version: 2.4.0
  Author: oscitas
  Author URI: http://www.oscitasthemes.com
  License: Under the GPL v2 or later
 */
function osc_efs_plugin_exists( $prevent ) {
    return 'efs';
}
$checkplugin=apply_filters('osc_efs_pro_plugin_exists',false);
if(isset($checkplugin) && $checkplugin=='efsp'):
    add_action('admin_notices', 'efs_showAdminMessages');

    function efs_showMessage($message, $errormsg = false)
    {
        if ($errormsg) {
            echo '<div id="message" class="error efs_notification">';
        }
        else {
            echo '<div id="message" class="update-nag efs_notification">';
        }
        echo '<p><strong>' . $message . '</strong></p></div>';
    }

    function efs_showAdminMessages()
    {
        efs_showMessage("As you already installed Easy Foundation Shortcode Pro plugin, please deactivate Easy Foundation Shortcode free version", false);
    }
else:
    add_filter( 'osc_efs_plugin_exists', 'osc_efs_plugin_exists' );
    define('EFS_PLUGIN_URL',plugins_url('/',__FILE__));
    define('EFS_JS_CDN','http://cdn.jsdelivr.net/foundation/5.0.2/js/foundation.min.js');

    add_action('admin_enqueue_scripts', 'osc_add_admin_efs_scripts');
    add_action('wp_enqueue_scripts', 'osc_add_frontend_efs_scripts',-100);
    add_action('admin_menu', 'osc_efs_add_admin_menu');
    add_action('admin_head', 'osc_efs_get_icons');
    add_filter('mce_external_plugins', 'efs_osc_editor_enable_mce');
    add_action('wp_enqueue_scripts', 'efs_osc_add_dynamic_css',100);

    register_activation_hook(__FILE__, 'osc_efs_activate_plugin');
    register_deactivation_hook(__FILE__, 'osc_efs_deactivate_plugin');


    function osc_efs_activate_plugin() {

        // EFS_FOUNDATION_JS_LOCATION   '1' - for plugin file, '2' - don't user EFS files but use from other plugin or theme, '3' - to user CDN path
        update_option( 'EFS_FOUNDATION_JS_LOCATION', 1 );
        update_option( 'EFS_FOUNDATION_JS_CDN_PATH', EFS_JS_CDN );

        // EFS_FOUNDATION_CSS_LOCATION   '1' - for plugin file, '2' - don't user EFS files but use from other plugin or theme
        update_option( 'EFS_FOUNDATION_CSS_LOCATION', 1 );
        update_option( 'EFS_EDITOR_OPT','icon');
        if(get_option('EFS_CUSTOM_CSS')==''){
            update_option( 'EFS_CUSTOM_CSS','');
        }

        update_option( 'EFS_THEME',5);

    }
    function osc_efs_settings_link( $links ) {

        $settings_link = '<a href="admin.php?page=efs/efs-settings.php">Settings</a>';
        array_push( $links, $settings_link );

        return $links;
    }

    add_filter( "plugin_action_links_".plugin_basename( __FILE__ ), 'osc_efs_settings_link' );

    function osc_efs_deactivate_plugin() {

        delete_option( 'EFS_FOUNDATION_JS_LOCATION' );
        delete_option( 'EFS_FOUNDATION_JS_CDN_PATH' );
        delete_option( 'EFS_FOUNDATION_CSS_LOCATION');
        delete_option('EFS_EDITOR_OPT');
        delete_option('EFS_THEME');

    }

    function osc_efs_add_admin_menu() {

        add_menu_page('EFS Settings', ' EFS Settings', 'manage_options', 'efs/efs-settings.php', 'osc_efs_setting_page', plugins_url('/images/icon.png', __FILE__));

    }

    function osc_efs_setting_page() {
        if (isset($_POST['efs_submit'])) {
            update_option( 'EFS_FOUNDATION_JS_LOCATION', $_POST['b_js'] );
            update_option( 'EFS_FOUNDATION_JS_CDN_PATH', $_POST['cdn_path'] );
            update_option( 'EFS_FOUNDATION_CSS_LOCATION', $_POST['b_css'] );
            update_option( 'EFS_EDITOR_OPT', isset($_POST['efsp_editor_opt'])?$_POST['efsp_editor_opt']:'icon' );
            update_option( 'EFS_CUSTOM_CSS', isset($_POST['efs_custom_css'])?$_POST['efs_custom_css']:'' );
            update_option( 'EFS_THEME', isset($_POST['efs_theme'])?$_POST['efs_theme']:5);

            if(!session_id())
                @session_start();
            $_SESSION['efs_dynamic_css'] =$_POST['efs_custom_css'];
            $js = $_POST['b_js'];
            $cdn = $_POST['cdn_path'];
            $css = $_POST['b_css'];
            $efsp_editor_opt=isset($_POST['efsp_editor_opt'])?$_POST['efsp_editor_opt']:'icon' ;
            $efs_custom_css=isset($_POST['efs_custom_css'])?$_POST['efs_custom_css']:'' ;
            $efs_theme=isset($_POST['efs_theme'])?$_POST['efs_theme']:5 ;
        } else {
            $js = get_option( 'EFS_FOUNDATION_JS_LOCATION', 1 );
            $cdn = get_option( 'EFS_FOUNDATION_JS_CDN_PATH', EFS_JS_CDN );
            $css = get_option( 'EFS_FOUNDATION_CSS_LOCATION', 1 );
            $efsp_editor_opt=get_option('EFS_EDITOR_OPT','icon');
            $efs_custom_css=get_option('EFS_CUSTOM_CSS','');
            $efs_theme=get_option('EFS_THEME',5);
        }
        include 'efs_settings.php';
    }

// add_submenu_page('optine
    function osc_add_admin_efs_scripts() {
        global $pagenow;
        $screen = get_current_screen();
        if ($screen->id == 'toplevel_page_efs/efs-settings') {
            wp_enqueue_style('efs-setting', plugins_url('/styles/efs-setting.min.css', __FILE__));
        }
        wp_enqueue_script('efs_main', plugins_url('/js/efs_main.js', __FILE__));

    }
    function efs_osc_editor_enable_mce(){
        wp_enqueue_script('jquery');
        wp_enqueue_style('thickbox');
        wp_enqueue_script('media-upload');
        wp_enqueue_script('thickbox');
        wp_enqueue_style("wp-jquery-ui-dialog");
        wp_enqueue_script('jquery-ui-dialog');
        wp_enqueue_style('foundation-icons', plugins_url('/styles/foundation-icons.css', __FILE__));
        wp_enqueue_style('foundation_admin', plugins_url('/styles/foundation_admin.min.css', __FILE__));

    }
    function efs_osc_add_dynamic_css(){
        if(!session_id());
        @session_start();

        $js = get_option( 'EFS_FOUNDATION_JS_LOCATION', 1 );
        $cdn = get_option( 'EFS_FOUNDATION_JS_CDN_PATH', EFS_JS_CDN );
        $efs_theme=get_option('EFS_THEME',5);
        if ($js == 1) {
            wp_enqueue_script('foundation', plugins_url("/js/{$efs_theme}/foundation.min.js", __FILE__),array('jquery'), '', true);
            wp_enqueue_script('foundation-app', plugins_url("/js/script.js", __FILE__),array('foundation'), '', true);
        } elseif ($js == 3) {
            wp_enqueue_script('foundation', $cdn);
        }
        if(isset($_SESSION['efs_dynamic_css']) && trim($_SESSION['efs_dynamic_css'])!=''){

            wp_enqueue_style('efs_dynamic_css', plugins_url('/styles/efs_dynamic_css.php', __FILE__));
        }
    }
    function osc_add_frontend_efs_scripts() {
        wp_enqueue_script('jquery');
        wp_enqueue_style('foundation-icon', plugins_url('/styles/foundation-icons.css', __FILE__));
        $css = get_option( 'EFS_FOUNDATION_CSS_LOCATION', 1 );
        $efs_theme=get_option('EFS_THEME',5);
        if ($css == 1) {
            wp_enqueue_style('foundation-norm', plugins_url("/styles/{$efs_theme}/normalize.css", __FILE__));
            wp_enqueue_style('foundation', plugins_url("/styles/{$efs_theme}/foundation.min.css", __FILE__));
            if($efs_theme==4){
                wp_enqueue_style('foundation-grid-5', plugins_url("/styles/{$efs_theme}/grid-5.css", __FILE__));
            }



        }
        $js = get_option( 'EFS_FOUNDATION_JS_LOCATION', 1 );
        if ($js == 1) {
        wp_enqueue_script('foundation-custom', plugins_url("/js/{$efs_theme}/vendor/custom.modernizr.js", __FILE__));
        }

    }


    function osc_efs_get_icons(){
        $icon='<li data-value="fi-address-book" class="fi fi-address-book osc_icon_selected_button"></li><li data-value="fi-alert" class="fi fi-alert "></li><li data-value="fi-align-center" class="fi fi-align-center "></li><li data-value="fi-align-justify" class="fi fi-align-justify "></li><li data-value="fi-align-left" class="fi fi-align-left "></li><li data-value="fi-align-right" class="fi fi-align-right "></li><li data-value="fi-anchor" class="fi fi-anchor "></li><li data-value="fi-annotate" class="fi fi-annotate "></li><li data-value="fi-archive" class="fi fi-archive "></li><li data-value="fi-arrow-down" class="fi fi-arrow-down "></li><li data-value="fi-arrow-left" class="fi fi-arrow-left "></li><li data-value="fi-arrow-right" class="fi fi-arrow-right "></li><li data-value="fi-arrow-up" class="fi fi-arrow-up "></li><li data-value="fi-arrows-compress" class="fi fi-arrows-compress "></li><li data-value="fi-arrows-expand" class="fi fi-arrows-expand "></li><li data-value="fi-arrows-in" class="fi fi-arrows-in "></li><li data-value="fi-arrows-out" class="fi fi-arrows-out "></li><li data-value="fi-asl" class="fi fi-asl "></li><li data-value="fi-asterisk" class="fi fi-asterisk "></li><li data-value="fi-at-sign" class="fi fi-at-sign "></li><li data-value="fi-background-color" class="fi fi-background-color "></li><li data-value="fi-battery-empty" class="fi fi-battery-empty "></li><li data-value="fi-battery-full" class="fi fi-battery-full "></li><li data-value="fi-battery-half" class="fi fi-battery-half "></li><li data-value="fi-bitcoin-circle" class="fi fi-bitcoin-circle "></li><li data-value="fi-bitcoin" class="fi fi-bitcoin "></li><li data-value="fi-blind" class="fi fi-blind "></li><li data-value="fi-bluetooth" class="fi fi-bluetooth "></li><li data-value="fi-bold" class="fi fi-bold "></li><li data-value="fi-book-bookmark" class="fi fi-book-bookmark "></li><li data-value="fi-book" class="fi fi-book "></li><li data-value="fi-bookmark" class="fi fi-bookmark "></li><li data-value="fi-braille" class="fi fi-braille "></li><li data-value="fi-burst-new" class="fi fi-burst-new "></li><li data-value="fi-burst-sale" class="fi fi-burst-sale "></li><li data-value="fi-burst" class="fi fi-burst "></li><li data-value="fi-calendar" class="fi fi-calendar "></li><li data-value="fi-camera" class="fi fi-camera "></li><li data-value="fi-check" class="fi fi-check "></li><li data-value="fi-checkbox" class="fi fi-checkbox "></li><li data-value="fi-clipboard-notes" class="fi fi-clipboard-notes "></li><li data-value="fi-clipboard-pencil" class="fi fi-clipboard-pencil "></li><li data-value="fi-clipboard" class="fi fi-clipboard "></li><li data-value="fi-clock" class="fi fi-clock "></li><li data-value="fi-closed-caption" class="fi fi-closed-caption "></li><li data-value="fi-cloud" class="fi fi-cloud "></li><li data-value="fi-comment-minus" class="fi fi-comment-minus "></li><li data-value="fi-comment-quotes" class="fi fi-comment-quotes "></li><li data-value="fi-comment-video" class="fi fi-comment-video "></li><li data-value="fi-comment" class="fi fi-comment "></li><li data-value="fi-comments" class="fi fi-comments "></li><li data-value="fi-compass" class="fi fi-compass "></li><li data-value="fi-contrast" class="fi fi-contrast "></li><li data-value="fi-credit-card" class="fi fi-credit-card "></li><li data-value="fi-crop" class="fi fi-crop "></li><li data-value="fi-crown" class="fi fi-crown "></li><li data-value="fi-css3" class="fi fi-css3 "></li><li data-value="fi-database" class="fi fi-database "></li><li data-value="fi-die-five" class="fi fi-die-five "></li><li data-value="fi-die-four" class="fi fi-die-four "></li><li data-value="fi-die-one" class="fi fi-die-one "></li><li data-value="fi-die-six" class="fi fi-die-six "></li><li data-value="fi-die-three" class="fi fi-die-three "></li><li data-value="fi-die-two" class="fi fi-die-two "></li><li data-value="fi-dislike" class="fi fi-dislike "></li><li data-value="fi-dollar-bill" class="fi fi-dollar-bill "></li><li data-value="fi-dollar" class="fi fi-dollar "></li><li data-value="fi-download" class="fi fi-download "></li><li data-value="fi-eject" class="fi fi-eject "></li><li data-value="fi-elevator" class="fi fi-elevator "></li><li data-value="fi-euro" class="fi fi-euro "></li><li data-value="fi-eye" class="fi fi-eye "></li><li data-value="fi-fast-forward" class="fi fi-fast-forward "></li><li data-value="fi-female-symbol" class="fi fi-female-symbol "></li><li data-value="fi-female" class="fi fi-female "></li><li data-value="fi-filter" class="fi fi-filter "></li><li data-value="fi-first-aid" class="fi fi-first-aid "></li><li data-value="fi-flag" class="fi fi-flag "></li><li data-value="fi-folder-add" class="fi fi-folder-add "></li><li data-value="fi-folder-lock" class="fi fi-folder-lock "></li><li data-value="fi-folder" class="fi fi-folder "></li><li data-value="fi-foot" class="fi fi-foot "></li><li data-value="fi-foundation" class="fi fi-foundation "></li><li data-value="fi-graph-bar" class="fi fi-graph-bar "></li><li data-value="fi-graph-horizontal" class="fi fi-graph-horizontal "></li><li data-value="fi-graph-pie" class="fi fi-graph-pie "></li><li data-value="fi-graph-trend" class="fi fi-graph-trend "></li><li data-value="fi-guide-dog" class="fi fi-guide-dog "></li><li data-value="fi-hearing-aid" class="fi fi-hearing-aid "></li><li data-value="fi-heart" class="fi fi-heart "></li><li data-value="fi-home" class="fi fi-home "></li><li data-value="fi-html5" class="fi fi-html5 "></li><li data-value="fi-indent-less" class="fi fi-indent-less "></li><li data-value="fi-indent-more" class="fi fi-indent-more "></li><li data-value="fi-info" class="fi fi-info "></li><li data-value="fi-italic" class="fi fi-italic "></li><li data-value="fi-key" class="fi fi-key "></li><li data-value="fi-laptop" class="fi fi-laptop "></li><li data-value="fi-layout" class="fi fi-layout "></li><li data-value="fi-lightbulb" class="fi fi-lightbulb "></li><li data-value="fi-like" class="fi fi-like "></li><li data-value="fi-link" class="fi fi-link "></li><li data-value="fi-list-bullet" class="fi fi-list-bullet "></li><li data-value="fi-list-number" class="fi fi-list-number "></li><li data-value="fi-list-thumbnails" class="fi fi-list-thumbnails "></li><li data-value="fi-list" class="fi fi-list "></li><li data-value="fi-lock" class="fi fi-lock "></li><li data-value="fi-loop" class="fi fi-loop "></li><li data-value="fi-magnifying-glass" class="fi fi-magnifying-glass "></li><li data-value="fi-mail" class="fi fi-mail "></li><li data-value="fi-male-female" class="fi fi-male-female "></li><li data-value="fi-male-symbol" class="fi fi-male-symbol "></li><li data-value="fi-male" class="fi fi-male "></li><li data-value="fi-map" class="fi fi-map "></li><li data-value="fi-marker" class="fi fi-marker "></li><li data-value="fi-megaphone" class="fi fi-megaphone "></li><li data-value="fi-microphone" class="fi fi-microphone "></li><li data-value="fi-minus-circle" class="fi fi-minus-circle "></li><li data-value="fi-minus" class="fi fi-minus "></li><li data-value="fi-mobile-signal" class="fi fi-mobile-signal "></li><li data-value="fi-mobile" class="fi fi-mobile "></li><li data-value="fi-monitor" class="fi fi-monitor "></li><li data-value="fi-mountains" class="fi fi-mountains "></li><li data-value="fi-music" class="fi fi-music "></li><li data-value="fi-next" class="fi fi-next "></li><li data-value="fi-no-dogs" class="fi fi-no-dogs "></li><li data-value="fi-no-smoking" class="fi fi-no-smoking "></li><li data-value="fi-page-add" class="fi fi-page-add "></li><li data-value="fi-page-copy" class="fi fi-page-copy "></li><li data-value="fi-page-csv" class="fi fi-page-csv "></li><li data-value="fi-page-delete" class="fi fi-page-delete "></li><li data-value="fi-page-doc" class="fi fi-page-doc "></li><li data-value="fi-page-edit" class="fi fi-page-edit "></li><li data-value="fi-page-export-csv" class="fi fi-page-export-csv "></li><li data-value="fi-page-export-doc" class="fi fi-page-export-doc "></li><li data-value="fi-page-export-pdf" class="fi fi-page-export-pdf "></li><li data-value="fi-page-export" class="fi fi-page-export "></li><li data-value="fi-page-filled" class="fi fi-page-filled "></li><li data-value="fi-page-multiple" class="fi fi-page-multiple "></li><li data-value="fi-page-pdf" class="fi fi-page-pdf "></li><li data-value="fi-page-remove" class="fi fi-page-remove "></li><li data-value="fi-page-search" class="fi fi-page-search "></li><li data-value="fi-page" class="fi fi-page "></li><li data-value="fi-paint-bucket" class="fi fi-paint-bucket "></li><li data-value="fi-paperclip" class="fi fi-paperclip "></li><li data-value="fi-pause" class="fi fi-pause "></li><li data-value="fi-paw" class="fi fi-paw "></li><li data-value="fi-paypal" class="fi fi-paypal "></li><li data-value="fi-pencil" class="fi fi-pencil "></li><li data-value="fi-photo" class="fi fi-photo "></li><li data-value="fi-play-circle" class="fi fi-play-circle "></li><li data-value="fi-play-video" class="fi fi-play-video "></li><li data-value="fi-play" class="fi fi-play "></li><li data-value="fi-plus" class="fi fi-plus "></li><li data-value="fi-pound" class="fi fi-pound "></li><li data-value="fi-power" class="fi fi-power "></li><li data-value="fi-previous" class="fi fi-previous "></li><li data-value="fi-price-tag" class="fi fi-price-tag "></li><li data-value="fi-pricetag-multiple" class="fi fi-pricetag-multiple "></li><li data-value="fi-print" class="fi fi-print "></li><li data-value="fi-prohibited" class="fi fi-prohibited "></li><li data-value="fi-projection-screen" class="fi fi-projection-screen "></li><li data-value="fi-puzzle" class="fi fi-puzzle "></li><li data-value="fi-quote" class="fi fi-quote "></li><li data-value="fi-record" class="fi fi-record "></li><li data-value="fi-refresh" class="fi fi-refresh "></li><li data-value="fi-results-demographics" class="fi fi-results-demographics "></li><li data-value="fi-results" class="fi fi-results "></li><li data-value="fi-rewind-ten" class="fi fi-rewind-ten "></li><li data-value="fi-rewind" class="fi fi-rewind "></li><li data-value="fi-rss" class="fi fi-rss "></li><li data-value="fi-safety-cone" class="fi fi-safety-cone "></li><li data-value="fi-save" class="fi fi-save "></li><li data-value="fi-share" class="fi fi-share "></li><li data-value="fi-sheriff-badge" class="fi fi-sheriff-badge "></li><li data-value="fi-shield" class="fi fi-shield "></li><li data-value="fi-shopping-bag" class="fi fi-shopping-bag "></li><li data-value="fi-shopping-cart" class="fi fi-shopping-cart "></li><li data-value="fi-shuffle" class="fi fi-shuffle "></li><li data-value="fi-skull" class="fi fi-skull "></li><li data-value="fi-social-500px" class="fi fi-social-500px "></li><li data-value="fi-social-adobe" class="fi fi-social-adobe "></li><li data-value="fi-social-amazon" class="fi fi-social-amazon "></li><li data-value="fi-social-android" class="fi fi-social-android "></li><li data-value="fi-social-apple" class="fi fi-social-apple "></li><li data-value="fi-social-behance" class="fi fi-social-behance "></li><li data-value="fi-social-bing" class="fi fi-social-bing "></li><li data-value="fi-social-blogger" class="fi fi-social-blogger "></li><li data-value="fi-social-delicious" class="fi fi-social-delicious "></li><li data-value="fi-social-designer-news" class="fi fi-social-designer-news "></li><li data-value="fi-social-deviant-art" class="fi fi-social-deviant-art "></li><li data-value="fi-social-digg" class="fi fi-social-digg "></li><li data-value="fi-social-dribbble" class="fi fi-social-dribbble "></li><li data-value="fi-social-drive" class="fi fi-social-drive "></li><li data-value="fi-social-dropbox" class="fi fi-social-dropbox "></li><li data-value="fi-social-evernote" class="fi fi-social-evernote "></li><li data-value="fi-social-facebook" class="fi fi-social-facebook "></li><li data-value="fi-social-flickr" class="fi fi-social-flickr "></li><li data-value="fi-social-forrst" class="fi fi-social-forrst "></li><li data-value="fi-social-foursquare" class="fi fi-social-foursquare "></li><li data-value="fi-social-game-center" class="fi fi-social-game-center "></li><li data-value="fi-social-github" class="fi fi-social-github "></li><li data-value="fi-social-google-plus" class="fi fi-social-google-plus "></li><li data-value="fi-social-hacker-news" class="fi fi-social-hacker-news "></li><li data-value="fi-social-hi5" class="fi fi-social-hi5 "></li><li data-value="fi-social-instagram" class="fi fi-social-instagram "></li><li data-value="fi-social-joomla" class="fi fi-social-joomla "></li><li data-value="fi-social-lastfm" class="fi fi-social-lastfm "></li><li data-value="fi-social-linkedin" class="fi fi-social-linkedin "></li><li data-value="fi-social-medium" class="fi fi-social-medium "></li><li data-value="fi-social-myspace" class="fi fi-social-myspace "></li><li data-value="fi-social-orkut" class="fi fi-social-orkut "></li><li data-value="fi-social-path" class="fi fi-social-path "></li><li data-value="fi-social-picasa" class="fi fi-social-picasa "></li><li data-value="fi-social-pinterest" class="fi fi-social-pinterest "></li><li data-value="fi-social-rdio" class="fi fi-social-rdio "></li><li data-value="fi-social-reddit" class="fi fi-social-reddit "></li><li data-value="fi-social-skillshare" class="fi fi-social-skillshare "></li><li data-value="fi-social-skype" class="fi fi-social-skype "></li><li data-value="fi-social-smashing-mag" class="fi fi-social-smashing-mag "></li><li data-value="fi-social-snapchat" class="fi fi-social-snapchat "></li><li data-value="fi-social-spotify" class="fi fi-social-spotify "></li><li data-value="fi-social-squidoo" class="fi fi-social-squidoo "></li><li data-value="fi-social-stack-overflow" class="fi fi-social-stack-overflow "></li><li data-value="fi-social-steam" class="fi fi-social-steam "></li><li data-value="fi-social-stumbleupon" class="fi fi-social-stumbleupon "></li><li data-value="fi-social-treehouse" class="fi fi-social-treehouse "></li><li data-value="fi-social-tumblr" class="fi fi-social-tumblr "></li><li data-value="fi-social-twitter" class="fi fi-social-twitter "></li><li data-value="fi-social-vimeo" class="fi fi-social-vimeo "></li><li data-value="fi-social-windows" class="fi fi-social-windows "></li><li data-value="fi-social-xbox" class="fi fi-social-xbox "></li><li data-value="fi-social-yahoo" class="fi fi-social-yahoo "></li><li data-value="fi-social-yelp" class="fi fi-social-yelp "></li><li data-value="fi-social-youtube" class="fi fi-social-youtube "></li><li data-value="fi-social-zerply" class="fi fi-social-zerply "></li><li data-value="fi-social-zurb" class="fi fi-social-zurb "></li><li data-value="fi-sound" class="fi fi-sound "></li><li data-value="fi-star" class="fi fi-star "></li><li data-value="fi-stop" class="fi fi-stop "></li><li data-value="fi-strikethrough" class="fi fi-strikethrough "></li><li data-value="fi-subscript" class="fi fi-subscript "></li><li data-value="fi-superscript" class="fi fi-superscript "></li><li data-value="fi-tablet-landscape" class="fi fi-tablet-landscape "></li><li data-value="fi-tablet-portrait" class="fi fi-tablet-portrait "></li><li data-value="fi-target-two" class="fi fi-target-two "></li><li data-value="fi-target" class="fi fi-target "></li><li data-value="fi-telephone-accessible" class="fi fi-telephone-accessible "></li><li data-value="fi-telephone" class="fi fi-telephone "></li><li data-value="fi-text-color" class="fi fi-text-color "></li><li data-value="fi-thumbnails" class="fi fi-thumbnails "></li><li data-value="fi-ticket" class="fi fi-ticket "></li><li data-value="fi-torso-business" class="fi fi-torso-business "></li><li data-value="fi-torso-female" class="fi fi-torso-female "></li><li data-value="fi-torso" class="fi fi-torso "></li><li data-value="fi-torsos-all-female" class="fi fi-torsos-all-female "></li><li data-value="fi-torsos-all" class="fi fi-torsos-all "></li><li data-value="fi-torsos-female-male" class="fi fi-torsos-female-male "></li><li data-value="fi-torsos-male-female" class="fi fi-torsos-male-female "></li><li data-value="fi-torsos" class="fi fi-torsos "></li><li data-value="fi-trash" class="fi fi-trash "></li><li data-value="fi-trees" class="fi fi-trees "></li><li data-value="fi-trophy" class="fi fi-trophy "></li><li data-value="fi-underline" class="fi fi-underline "></li><li data-value="fi-universal-access" class="fi fi-universal-access "></li><li data-value="fi-unlink" class="fi fi-unlink "></li><li data-value="fi-unlock" class="fi fi-unlock "></li><li data-value="fi-upload-cloud" class="fi fi-upload-cloud "></li><li data-value="fi-upload" class="fi fi-upload "></li><li data-value="fi-usb" class="fi fi-usb "></li><li data-value="fi-video" class="fi fi-video "></li><li data-value="fi-volume-none" class="fi fi-volume-none "></li><li data-value="fi-volume-strike" class="fi fi-volume-strike "></li><li data-value="fi-volume" class="fi fi-volume "></li><li data-value="fi-web" class="fi fi-web "></li><li data-value="fi-wheelchair" class="fi fi-wheelchair "></li><li data-value="fi-widget" class="fi fi-widget "></li><li data-value="fi-wrench" class="fi fi-wrench "></li><li data-value="fi-x-circle" class="fi fi-x-circle "></li><li data-value="fi-x" class="fi fi-x "></li><li data-value="fi-yen" class="fi fi-yen "></li><li data-value="fi-zoom-in" class="fi fi-zoom-in "></li><li data-value="fi-zoom-out" class="fi fi-zoom-out "></li>';
        $efsp_editor_opt=get_option('EFS_EDITOR_OPT','icon');
        ?>
        <script type="text/javascript">
            var icons='<?php echo $icon;  ?>';
            var efs_ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';
            var efs_url='<?php echo EFS_PLUGIN_URL;?>';
            var efs_editor_opt='<?php echo $efsp_editor_opt; ?>'
        </script>
    <?php
    }


// Shortcodes
    include('shortcode/functions.php');
endif;