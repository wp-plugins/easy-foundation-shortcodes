var efsthumbnail={
    title:"Reaponsive Image Shortcode",
    id :'oscitas-form-efsthumbnail',
    pluginName: 'efsthumbnail',
    setRowColors:false
};

(function() {
    _efs_create_tinyMCE_options(efsthumbnail,600);
})();
function create_oscitas_efsthumbnail(pluginObj){
    if(jQuery(pluginObj.hashId).length){
        jQuery(pluginObj.hashId).remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form = jQuery('<div id="'+pluginObj.id+'" class="oscitas-container" title="'+pluginObj.title+'"><table id="oscitas-table" class="form-table">\
				<th><label for="oscitas-label-content">Upload Image:</label></th>\
				<td id="osc_thumbnail_upload"><input id="oscitas-thumbnail-src" type="hidden" name="oscitas-thumbnail-src"  value="" />\
                                <input id="_btn" class="upload_image_button" type="button" value="Upload Image" />\
				</td>\
			</tr>\
            <tr>\
				<th><label for="oscitas-thumbnail-link">Link:</label></th>\
				<td><input type="text" name="oscitas-thumbnail-link" id="oscitas-thumbnail-link" value=""/><br />\
				</td>\
			</tr>\
            <tr>\
				<th><label for="oscitas-thumbnail-radius">Radius:</label></th>\
				<td><input type="checkbox" name="oscitas-thumbnail-radius" id="oscitas-thumbnail-radius" value="1"/><br />\
				</td>\
			</tr>\
            <tr>\
				<th><label for="oscitas-thumbnail-class">Custom Class:</label></th>\
				<td><input type="text" name="line" id="oscitas-thumbnail-class" value=""/><br />\
				</td>\
			</tr>\
		</table>\
		<p class="submit">\
			<input type="button" id="oscitas-thumbnail-submit" class="button-primary" value="Insert Thumbnail" name="submit" />\
		</p>\
		</div>');
    form.appendTo('body').hide();
    var table = form.find('table');

    form.find('.upload_image_button').click(function() {
//                jQuery(form).dialog({modal:false});
        jQuery('.ui-widget-overlay, .ui-dialog').css('z-index',100);
        jQuery('html').addClass('Image');
        formfield = jQuery(this).prev().attr('id');
        tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');
        return false;
    });

    window.original_send_to_editor = window.send_to_editor;

    window.send_to_editor = function(html) {
        if (formfield) {
            if (jQuery(html).find('img').length) {
                fileurl = jQuery('img', html).attr('src');
            } else if (jQuery(html).attr('src')) {
                fileurl = jQuery(html).attr('src');
            }
            jQuery('#' + formfield).val(fileurl);
            tb_remove();
            form.find('#osc_thumbnail_upload img').remove();
            form.find('#osc_thumbnail_upload').append('<img src="'+fileurl+'">')
            jQuery('html').removeClass('Image');

        } else {
            window.original_send_to_editor(html);
        }

    };


    // handles the click event of the submit button
    form.find('#oscitas-thumbnail-submit').click(function(){
        var shortcode='';
        var cusclass='',link='',radius='';
        if(table.find('#oscitas-thumbnail-class').val()!=''){
            cusclass= ' class="'+table.find('#oscitas-thumbnail-class').val()+'"';
        }
        if(table.find('#oscitas-thumbnail-class').val()!=''){
            link= ' link="'+form.find('#oscitas-thumbnail-link').val()+'"';
        }
        if(table.find('#oscitas-thumbnail-radius').is(':checked')){
            radius= ' radius="radius"';
        }

        if(form.find('#oscitas-thumbnail-src').val()!=''){
            shortcode = '[efsthumbnail'+link+cusclass+radius+' src="'+form.find('#oscitas-thumbnail-src').val()+'"]';
        }
        // inserts the shortcode into the active editor
        tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);

        // closes fancybox
        efs_close_dialogue(pluginObj.hashId);
    });

}

