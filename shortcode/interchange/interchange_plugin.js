var efsinterchange={
    title:"Data Interchange",
    id :'oscitas-form-efsinterchange',
    pluginName: 'efsinterchange',
    setRowColors:false
};

(function() {
    _efs_create_tinyMCE_options(efsinterchange,800);
})();
function create_oscitas_efsinterchange(pluginObj,dynamic){
    if(jQuery(pluginObj.hashId).length){
        jQuery(pluginObj.hashId).remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form = jQuery('<div id="'+pluginObj.id+'" class="oscitas-container" title="'+pluginObj.title+'"><table id="oscitas-table" class="form-table">\
                        <tr>\
				<th><label for="oscitas-interchange-type">Content Type:</label></th>\
				<td><select name="oscitas_interchange_type" id="oscitas-interchange-type">\
					<option value="image">Image</option>\
					<option value="content">Content/HTML</option>\
				</select><br />\
				</td>\
			</tr>\
			<tr>\
				<th><label for="_btn_small">Small Screen:</label></th>\
				<td>\
                    <div class="content-type-image">\
                        <input id="oscitas-interchange-small-src" type="hidden" name="oscitas-interchange-small-src"  value="" />\
                        <input id="_btn_small" class="upload_image_button" type="button" value="Upload Image" />\
                    </div>\
                    <div style="display: none;" class="content-type-content">\
                    <textarea placeholder="Small Screen Content/HTML" id="oscitas-interchange-small-content" name="oscitas-interchange-small-content"></textarea>\
                    </div>\
				</td>\
			</tr>\
			<tr>\
				<th><label for="_btn_medium">Medium Screen:</label></th>\
				<td>\
                    <div class="content-type-image">\
                        <input id="oscitas-interchange-medium-src" type="hidden" name="oscitas-interchange-medium-src"  value="" />\
                        <input id="_btn_medium" class="upload_image_button" type="button" value="Upload Image" />\
                    </div>\
                    <div style="display: none;" class="content-type-content">\
                        <textarea placeholder="Medium Screen Content/HTML" id="oscitas-interchange-medium-content" name="oscitas-interchange-medium-content"></textarea>\
                    </div>\
				</td>\
			</tr>\
			<tr>\
				<th><label for="_btn_large">Large Screen:</label></th>\
				<td>\
                     <div class="content-type-image">\
                         <input id="oscitas-interchange-large-src" type="hidden" name="oscitas-interchange-large-src"  value="" />\
                         <input id="_btn_large" class="upload_image_button" type="button" value="Upload Image" />\
                     </div>\
                      <div style="display: none;" class="content-type-content">\
                        <textarea placeholder="Large Screen Content/HTML" id="oscitas-interchange-large-content" name="oscitas-interchange-large-content"></textarea>\
                    </div>\
				</td>\
			</tr>\
            <tr>\
				<th><label for="oscitas-interchange-class">Custom Class:</label></th>\
				<td><input type="text" name="line" id="oscitas-interchange-class" value=""/><br />\
				</td>\
			</tr>\
		</table>\
		<p class="submit">\
			<input type="button" id="oscitas-interchange-submit" class="button-primary" value="Insert Shortcode" name="submit" />\
		</p>\
		</div>');
    if(!dynamic){
        form.appendTo('body').hide();
    }else{
        form=jQuery('.mfp-content');
    }
    var table = form.find('table');
    form.find('#oscitas-interchange-type').change(function(){
        var type=jQuery(this).val();
        if(type=='image'){
            form.find('.content-type-content').hide();
            form.find('.content-type-'+type).show();
        }else if(type=='content')
        form.find('.content-type-image').hide();
        form.find('.content-type-'+type).show();
    });

    form.find('.upload_image_button').click(function() {
//        jQuery('.osc-dialog').css('z-index',100049);
//        jQuery('#TB_overlay').css('z-index',10000010);
//        jQuery('#TB_window').css('z-index',10000010);
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
            form.find('#' + formfield).parent('.content-type-image').find('img').remove();
            form.find('#' + formfield).parent('.content-type-image').append('<img src="'+fileurl+'">')
            jQuery('html').removeClass('Image');

        } else {
            window.original_send_to_editor(html);
        }

    };
    // handles the click event of the submit button
    form.find('#oscitas-interchange-submit').click(function(){
        var cusclass,small='',medium='',large='',type='';
        if(table.find('#oscitas-interchange-class').val()!=''){
            cusclass= ' class="'+table.find('#oscitas-interchange-class').val()+'"';
        }
        else{
            cusclass='';
        }
        type=form.find('#oscitas-interchange-type').val();
        var  shortcode='';
        if(type=='image'){
            small=form.find('#oscitas-interchange-small-src').val();
            medium=form.find('#oscitas-interchange-medium-src').val();
            large=form.find('#oscitas-interchange-large-src').val();
            shortcode='[efsinterchange '+cusclass+' type="'+type+'" smallimage="'+small+'" mediumimage="'+medium+'" largeimage="'+large+'"/]';
        }else if(type=='content'){
            small=form.find('#oscitas-interchange-small-content').val();
            medium=form.find('#oscitas-interchange-medium-content').val();
            large=form.find('#oscitas-interchange-large-content').val();
            shortcode='[efsinterchange '+cusclass+' type="'+type+'"]<br/>';shortcode+='[efsinterchangesmall]'+small+'[/efsinterchangesmall]<br/>';
            shortcode+='[efsinterchangemedium]'+medium+'[/efsinterchangemedium]<br/>';
            shortcode+='[efsinterchangelarge]'+large+'[/efsinterchangelarge]<br/>';
            shortcode+='[/efsinterchange]';
        }
        // inserts the shortcode into the active editor
        tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);
        efs_close_dialogue(pluginObj.hashId);
    });
}

