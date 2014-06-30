var efsbuttons={
    title:"Button Shortcode",
    id :'oscitas-form-efsbuttons',
    pluginName: 'efsbuttons',
    setRowColors:false
};

(function() {
    _efs_create_tinyMCE_options(efsbuttons,800);
})();
function create_oscitas_efsbuttons(pluginObj,dynamic){
    if(jQuery(pluginObj.hashId).length){
        jQuery(pluginObj.hashId).remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form = jQuery('<div id="'+pluginObj.id+'" class="oscitas-container" title="'+pluginObj.title+'"><table id="oscitas-table" class="form-table">\
			<tr>\
				<th><label for="oscitas-button-style">Style:</label></th>\
				<td><select name="type" id="oscitas-button-style">\
					<option value="">Default</option>\
					<option value="radius">Radius</option>\
					<option value="round">Round</option>\
				</select><br />\
				</td>\
			</tr>\
			<tr>\
				<th><label for="oscitas-button-size">Size:</label></th>\
				<td><select name="type" id="oscitas-button-size">\
					<option value="">Default</option>\
					<option value="tiny">Tiny</option>\
					<option value="small">Small</option>\
                    <option value="large">Large</option>\
				</select><br />\
				</td>\
			</tr>\
			<tr>\
				<th><label for="oscitas-button-color-class">Color Class:</label></th>\
				<td><select name="color_class" id="oscitas-button-color-class">\
					<option value="">Default</option>\
					<option value="secondary">Secondary</option>\
					<option value="alert">Alert</option>\
					<option value="success">Success</option>\
				</select><br />\
				</td>\
			</tr>\
            <tr>\
				<th><label for="oscitas-button-type">Type:</label></th>\
				<td><select name="type" id="oscitas-button-type">\
					<option value="link">Link</option>\
					<option value="button">Button</option>\
				</select><br />\
				</td>\
			</tr>\
                        <tr>\
                        <th><label for="oscitas-heading-icon">Select Icon:</label></th>\
				<td><div id="click_icon_list_button" class="oscitas-icon-div"><span id="osc_show_icon"></span><span class="show-drop"></span></div><input type="hidden" id="osc_icon_class_val_button" value="">\
                    <div id="osc_show_iconlist_button" class="oscitas-icon" style="display:none;width:100%"><ul name="oscitas-heading-icon_button" id="oscitas-heading-icon_button" class="oscitas-icon-ul">'+icons+'</ul></div>\
				</td>\
			</tr>\
                        <tr>\
				<th><label for="oscitas-button-iconalign">Icon Alignment:</label></th>\
				<td><select name="type" id="oscitas-button-iconalign">\
					<option value="left">Left</option>\
					<option value="right">Right</option>\
				</select><br />\
				</td>\
			</tr>\
			<tr>\
				<th><label for="oscitas-table-rows">Is disabled</label></th>\
				<td>\
				    <input type="checkbox" id="oscitas-button-block">\
                    <br />\
				</td>\
			</tr>\
			<tr>\
				<th><label for="oscitas-button-title">Title:</label></th>\
				<td><input type="text" name="title" id="oscitas-button-title" value="Button"/><br />\
				</td>\
			</tr>\
			<tr id="tr-button-link">\
				<th><label for="oscitas-button-link">Link</label></th>\
				<td><input type="text" name="link" id="oscitas-button-link" value="#" /><br />\
				</td>\
			</tr>\
			<tr id="tr-button-newwindow">\
				<th><label for="oscitas-table-rows">Open in new window</label></th>\
				<td>\
				    <input type="checkbox" id="oscitas-button-target">\
                    <br />\
				</td>\
			</tr>\
                         <tr>\
				<th><label for="oscitas-button-class">Custom Class:</label></th>\
				<td><input type="text" name="line" id="oscitas-button-class" value=""/><br />\
				</td>\
			</tr>\
		</table>\
		<p class="submit">\
			<input type="button" id="oscitas-button-submit" class="button-primary" value="Insert Button" name="submit" />\
		</p>\
		</div>');
    if(!dynamic){
        form.appendTo('body').hide();
    }else{
        form=jQuery('.mfp-content');
    }

            var table = form.find('table');
            form.find('.fi').css('display','inline');

            table.find('#click_icon_list_button').click(function(){
                if(!jQuery(this).hasClass('osc_icon_showing_button')){
                    jQuery(this).addClass('osc_icon_showing_button')
                    table.find('#osc_show_iconlist_button').show();
                } else{
                    jQuery(this).removeClass('osc_icon_showing_button')
                    table.find('#osc_show_iconlist_button').hide();
                }
            });
            table.find('#oscitas-heading-icon_button li').click(function(){
                var val=jQuery(this).attr('data-value');
                jQuery(this).parent().find('li').removeClass('osc_icon_selected_button');
                jQuery(this).addClass('osc_icon_selected_button');
                table.find('#click_icon_list_button').removeClass('osc_icon_showing_button');
                table.find('#osc_show_iconlist_button').hide();
                table.find('#osc_show_icon').removeClass().addClass('fi').addClass(val);
                table.find('#osc_icon_class_val_button').val(val);
            })

            table.find('#oscitas-button-type').change(function(){
                var abc = jQuery(this).val();
                if('link' == abc){
                    jQuery("#tr-button-link").show();
                    jQuery("#tr-button-newwindow").show();
                }else{
                    jQuery("#tr-button-link").hide();
                    jQuery("#tr-button-newwindow").hide();
                }
                form.find('table tr:visible:even').css('background', '#ffffff');
                form.find('tr:visible:odd').css('background', '#efefef');
            });
            // handles the click event of the submit button
            form.find('#oscitas-button-submit').click(function(){
                // defines the options and their default values
                // again, this is not the most elegant way to do this
                // but well, this gets the job done nonetheless
                var options;
                var type = table.find('#oscitas-button-type').val();
                if(type=='button'){
                    options = {
                        'title'       : 'osCitas'
                    };
                }
                else{
                    options = {
                        'title'       : 'osCitas',
                        'link'        : ''
                    };
                }
                var cusclass='',icon='';
                if(table.find('#oscitas-button-class').val()!=''){
                    cusclass= ' class="'+table.find('#oscitas-button-class').val()+'"';
                }
                if(table.find('#osc_icon_class_val_button').val()!=''){
                    icon= ' icon="'+table.find('#osc_icon_class_val_button').val()+'" ';
                }

                var shortcode = '[efsbutton'+cusclass;

                shortcode += ' style="'+table.find('#oscitas-button-style').val()+'"';
                shortcode += ' size="'+table.find('#oscitas-button-size').val()+'"';
                shortcode += table.find('#oscitas-button-block').prop('checked')? ' disabled="disabled"': '';
                shortcode += ' color_class="'+table.find('#oscitas-button-color-class').val()+'"';
                shortcode += icon;
                shortcode += ' align="'+table.find('#oscitas-button-iconalign').val()+'" ';
                shortcode += ' type="'+type+'" ';
                if(type!='button'){
                    shortcode += ' target="'+(table.find('#oscitas-button-block').prop('checked')? 'true': 'false')+ '" ';
                }
                for( var index in options) {
                    var value = table.find('#oscitas-button-' + index).val();
                    //            var value = table.find('#oscitas-button-' + index).val();
                    shortcode += ' ' + index + '="' + value + '"';
                }

                shortcode += ']';

                // inserts the shortcode into the active editor
                tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);

                // closes fancybox
                efs_close_dialogue(pluginObj.hashId);
            
    });
}

