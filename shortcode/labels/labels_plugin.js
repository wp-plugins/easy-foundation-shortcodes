var efslabels={
    title:"Label Shortcode",
    id :'oscitas-form-efslabels',
    pluginName: 'efslabels',
    setRowColors:false
};

(function() {
    _efs_create_tinyMCE_options(efslabels);
})();
function create_oscitas_efslabels(pluginObj){
    if(jQuery(pluginObj.hashId).length){
        jQuery(pluginObj.hashId).remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form = jQuery('<div id="'+pluginObj.id+'" class="oscitas-container" title="'+pluginObj.title+'"><table id="oscitas-table" class="form-table">\
			<tr>\
				<th><label for="oscitas-label-type">Label Type:</label></th>\
				<td><select name="type" id="oscitas-label-type">\
					<option value="">Default</option>\
					<option value="secondary">Secondary</option>\
					<option value="success">Success</option>\
					<option value="alert">Alert</option>\
				</select><br />\
				</td>\
			</tr>\
			<tr>\
				<th><label for="oscitas-label-style">Label Style:</label></th>\
				<td><select name="style" id="oscitas-label-style">\
					<option value="">Default</option>\
					<option value="radius">Radius</option>\
					<option value="round">Round</option>\
				</select><br />\
				</td>\
			</tr>\
			<tr>\
				<th><label for="oscitas-label-content">Label Content:</label></th>\
				<td><input type="text" name="label" id="oscitas-label-content" value="Label"/><br />\
				</td>\
			</tr>\
                        <tr>\
				<th><label for="oscitas-label-class">Custom Class:</label></th>\
				<td><input type="text" name="line" id="oscitas-label-class" value=""/><br />\
				</td>\
			</tr>\
		</table>\
		<p class="submit">\
			<input type="button" id="oscitas-label-submit" class="button-primary" value="Insert Label" name="submit" />\
		</p>\
		</div>');
    form.appendTo('body').hide();
    var table = form.find('table');
    // handles the click event of the submit button
    form.find('#oscitas-label-submit').click(function(){
        var cusclass='';
        if(table.find('#oscitas-label-class').val()!=''){
            cusclass= ' class="'+table.find('#oscitas-label-class').val()+'"';
        }
        var shortcode = '[efslabel style="'+jQuery('#oscitas-label-style').val()+'" type="'+jQuery('#oscitas-label-type').val()+'"'+cusclass+']<br/>';
        shortcode += jQuery('#oscitas-label-content').val()+'<br/>';
        shortcode += '[/efslabel]';

        // inserts the shortcode into the active editor
        tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);

        // closes fancybox
        efs_close_dialogue(pluginObj.hashId);
    });
}

