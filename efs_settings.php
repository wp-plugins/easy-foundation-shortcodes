<div class="efs_page_settings">
    <h1>Easy Foundation Shortcodes Settings for js/css files</h1><form name="efs_setting" id="efs_setting" method="post" action="">
        <div class="efs_details">
            <label class="efs_setting_label">foundation.js file</label>
            <p>
                <input type="radio" name="b_js" id="b_js_plugin" class="check_cdn" value="1" <?php echo ($js == 1) ? 'checked=checked' : '' ?>>
                <label for="b_js_plugin">Use from EFS Plugin</label>
                <input type="radio" name="b_js" id="b_js_theme" class="check_cdn" value="2" <?php echo ($js == 2) ? 'checked=checked' : '' ?>><label for="b_js_theme">Use from theme or any other plugin</label>
                <input type="radio" name="b_js" class="check_cdn" id="b_js_cdn" <?php echo ($js == 3) ? 'checked=checked' : '' ?> value="3"><label for="b_js_cdn">Load from CDN</label>
        </div>
        <div class="efs_details show_cdn" ><label class="efs_setting_label">foundation.js CDN Path</label><input type="text" name="cdn_path" id="cdn_path" value="<?php echo $cdn; ?>">
            </p>
        </div>
        <div class="efs_details">

            <label class="efs_setting_label">foundation.css file</label>
            <p><input type="radio" name="b_css" id="b_css_plugin" value="1" <?php echo ($css == 1) ? 'checked=checked' : '' ?>>
                <label for="b_css_plugin" >Use from EFS Plugin</label>
                <input type="radio" name="b_css" id="b_css_theme" value="2" <?php echo ($css == 2) ? 'checked=checked' : '' ?>><label for="b_css_theme">Use from theme or any other plugin</label>
            </p>
        </div>
        <div class="efs_btn"><input type="submit" name="efs_submit" value="Update Settings"></div>
        <div style="clear: both;"></div>
        <br /><br /><br />
        <b>CDN Links for foundation.js, you can use any of these</b>
        <ul>
            <li>
                //cdn.jsdelivr.net/foundation/4.3.2/js/foundation.min.js
            </li>
            <li>
                //cdn.jsdelivr.net/foundation/4.3.2/js/foundation.min.js
            </li>
        </ul>

    </form>
</div>
<script type="text/javascript">
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
    })
</script>