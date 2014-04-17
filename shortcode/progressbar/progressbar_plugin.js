var efsprogressbar={
    title:"Progress Bar Shortcode",
    id :'oscitas-form-efsprogressbar',
    pluginName: 'efsprogressbar',
    setRowColors:false
};

(function() {
    _efs_create_tinyMCE_options(efsprogressbar);
})();
function create_oscitas_efsprogressbar(pluginObj){
    if(jQuery(pluginObj.hashId).length){
        jQuery(pluginObj.hashId).remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form = jQuery('<div id="'+pluginObj.id+'" class="oscitas-container" title="'+pluginObj.title+'"><table id="oscitas-table" class="form-table">\
			<tr>\
				<th><label for="oscitas-progressbar-type">Progress Bar Type:</label></th>\
				<td><select name="type" id="oscitas-progressbar-type">\
					<option value="">Default</option>\
					<option value="success">Success</option>\
					<option value="alert">Alert</option>\
					<option value="secondary">Secondary</option>\
				</select><br />\
				</td>\
			</tr>\
			<tr>\
				<th><label for="oscitas-progressbar-style">Progress Bar Style:</label></th>\
				<td><select name="type" id="oscitas-progressbar-style">\
					<option value="">Default</option>\
					<option value="radius">Radius</option>\
					<option value="round">Round</option>\
    				</select><br />\
				</td>\
			</tr>\
            <tr>\
				<th><label for="oscitas-progressbar-size">Progress Bar Size:</label></th>\
				<td><select name="type" id="oscitas-progressbar-size">\
					<option value="">Default Full Width</option>\
					<option value="large-10">Large</option>\
					<option value="large-5">Medium</option>\
					<option value="large-3">Small</option>\
    				</select><br />\
				</td>\
			</tr>\
            <tr>\
				<th><label for="oscitas-progressbar-progress">Progress Value:</label></th>\
				<td><input type="text" name="title" id="oscitas-progressbar-progress" value="50"/><br />\
                                <small>Enter a numeric value between 0 to 100, Default value is 50</small>\
				</td>\
			</tr>\
            <tr>\
				<th><label for="oscitas-progressbar-class">Custom Class:</label></th>\
				<td><input type="text" name="line" id="oscitas-progressbar-class" value=""/><br />\
				</td>\
			</tr>\
		</table>\
		<p class="submit">\
			<input type="button" id="oscitas-progressbar-submit" class="button-primary" value="Insert Button" name="submit" />\
		</p>\
		</div>');
    form.appendTo('body').hide();
    var table = form.find('table');
    var table = form.find('table');
    jQuery(pluginObj.hashId).find('table tr:visible:even').css('background', '#F0F0F0');
    jQuery(pluginObj.hashId).find('table tr:visible:odd').css('background', '#DADADD');
    table.find('#oscitas-progressbar-stripped').click(function(){
        if(jQuery(this).prop('checked')){
            jQuery('#osc_progress_animate').show();
        } else{
            jQuery('#osc_progress_animate').hide();
        }
        jQuery(pluginObj.hashId).find('table tr:visible:even').css('background', '#F0F0F0');
        jQuery(pluginObj.hashId).find('table tr:visible:odd').css('background', '#DADADD');
    })





    // handles the click event of the submit button
    form.find('#oscitas-progressbar-submit').click(function(){

        var cusclass='',type='',value='',style='',size='';
        if(jQuery('#oscitas-progressbar-stripped').prop('checked')){
            stripped=' barstyle="progress-striped';
            if(jQuery('#oscitas-progressbar-animated').prop('checked')){
                stripped +=' active';
            }
            stripped +='"';
        }
        if(table.find('#oscitas-progressbar-class').val()!=''){
            cusclass= ' class="'+table.find('#oscitas-progressbar-class').val()+'"';
        }
        if(table.find('#oscitas-progressbar-type').val()!=''){
            type= ' bartype="'+table.find('#oscitas-progressbar-type').val()+'"';
        }
        if(table.find('#oscitas-progressbar-style').val()!=''){
            style= ' barstyle="'+table.find('#oscitas-progressbar-style').val()+'"';
        }
        if(table.find('#oscitas-progressbar-size').val()!=''){
            size= ' barsize="'+table.find('#oscitas-progressbar-size').val()+'"';
        }
        if(table.find('#oscitas-progressbar-progress').val()!=''){
            value= ' value="'+table.find('#oscitas-progressbar-progress').val()+'"';
        }
        var shortcode = '[efsprogressbar'+value+cusclass+type+style+size;

        shortcode += ']';

        // inserts the shortcode into the active editor
        tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);

        // closes fancybox
        efs_close_dialogue(pluginObj.hashId);
    });
}

