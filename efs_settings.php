<div class="efs_page_settings">
    <h1>Easy Foundation Shortcodes Settings </h1><form name="efs_setting" id="efs_setting" method="post" action="">
        <div class="efs_details">
            <label class="efs_setting_label">Foundation Theme</label>
            <p>
                <input type="radio" name="efs_theme" id="efs_theme_5" value="5" <?php echo ($efs_theme == 5) ? 'checked=checked' : '' ?>><label for="efs_theme_5">Foundation 5</label>
                <input type="radio" name="efs_theme"  id="efs_theme_4" <?php echo ($efs_theme == 4) ? 'checked=checked' : '' ?> value="4"><label for="efs_theme_4">Foundation 4</label>
        </div>
        <div class="efs_details">
            <label class="efs_setting_label">foundation.js file</label>
            <p>
                <input type="radio" name="b_js" id="b_js_plugin" class="check_cdn" value="1" <?php echo ($js == 1) ? 'checked=checked' : '' ?>>
                <label for="b_js_plugin">Use from EFS Plugin</label>
                <input type="radio" name="b_js" id="b_js_theme" class="check_cdn" value="2" <?php echo ($js == 2) ? 'checked=checked' : '' ?>><label for="b_js_theme">Use from theme or any other plugin</label>
                <input type="radio" name="b_js" class="check_cdn" id="b_js_cdn" <?php echo ($js == 3) ? 'checked=checked' : '' ?> value="3"><label for="b_js_cdn">Load from CDN</label>
        </div>
        <div class="efs_details show_cdn" ><label class="efs_setting_label">foundation.js CDN Path</label><p><input type="text" name="cdn_path" id="cdn_path" value="<?php echo $cdn; ?>">
            </p>
        </div>
        <div class="efs_details">

            <label class="efs_setting_label">foundation.css file</label>
            <p><input type="radio" name="b_css" id="b_css_plugin" value="1" <?php echo ($css == 1) ? 'checked=checked' : '' ?>>
                <label for="b_css_plugin" >Use from EFS Plugin</label>
                <input type="radio" name="b_css" id="b_css_theme" value="2" <?php echo ($css == 2) ? 'checked=checked' : '' ?>><label for="b_css_theme">Use from theme or any other plugin</label>
            </p>
        </div>
        <div class="efs_details">
            <label class="efs_setting_label">Editor Button Style</label>
            <p>
                <label for="efsp_icon" class="efs_editor_label" title="Icons"><input type="radio" name="efsp_editor_opt" id="efsp_icon" value="icon" <?php echo ($efsp_editor_opt == 'icon') ? 'checked=checked' : '' ?> style="display: none" class="efs_editor_style"><img src="<?php echo EFS_PLUGIN_URL.'images/icons.png'?>"></label>

                <label for="efsp_dropdown" class="efs_editor_label" title="Dropdown"><input type="radio" name="efsp_editor_opt" id="efsp_dropdown" value="dropdown" <?php echo ($efsp_editor_opt == 'dropdown') ? 'checked=checked' : '' ?> style="display: none" class="efs_editor_style"><img src="<?php echo EFS_PLUGIN_URL.'images/dropdown.png'?>"></label>

            </p>
        </div>
        <div class="efs_details">
            <label class="efs_setting_label">Custom CSS</label>
            <p>
                <textarea  name="efs_custom_css" id="efs_custom_css"><?php echo trim($efs_custom_css) ?></textarea>
            </p>
        </div>
        <div class="efs_btn"><input type="submit" name="efs_submit" class="button-primary" value="Update Settings"></div>
        <div style="clear: both;"></div>
        <br /><br /><br />
        <b>CDN Links for foundation.js, you can use any of these</b>
        <ul>
            <li>
                <?php echo str_replace('http:','',EFS_JS_CDN)?>
            </li>
        </ul>

    </form>
</div>
<script type="text/javascript">
    function show_editor_style(){
        jQuery('.efs_editor_label').removeClass('val_selected');
        if(jQuery('#efsp_icon').prop('checked')){
            jQuery('#efsp_icon').parent().addClass('val_selected');
        } else  if(jQuery('#efsp_dropdown').prop('checked')){
            jQuery('#efsp_dropdown').parent().addClass('val_selected');
        }
    }
    function show_cdn(){
        if(jQuery('#b_js_cdn').prop('checked')){
            jQuery('.show_cdn').show();
        } else{
            jQuery('.show_cdn').hide();
        }
    }
    jQuery(document).ready(function(){
        show_cdn();
        jQuery('.check_cdn').click(function(){
            show_cdn();
        })

        show_editor_style();
        jQuery('.efs_editor_style').click(function(){
            show_editor_style();
        })
    })
</script>