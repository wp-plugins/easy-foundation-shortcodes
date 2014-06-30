var efsvisibility={
    title:"Visibility Shortcode",
    id :'oscitas-form-efsvisibility',
    pluginName: 'efsvisibility',
    setRowColors:false
};

(function() {
    _efs_create_tinyMCE_options(efsvisibility);
})();
function create_oscitas_efsvisibility(pluginObj,dynamic){
    if(jQuery(pluginObj.hashId).length){
        jQuery(pluginObj.hashId).remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form = jQuery('<div id="'+pluginObj.id+'" class="oscitas-container" title="'+pluginObj.title+'"><table id="oscitas-table" class="form-table">\
			<tr>\
				<th><label for="oscitas-visibility-showhideon">Select Screen To Show/Hide On:</label></th>\
				<td>\
                    <select name="showhideon" id="oscitas-visibility-showhideon">\
                        <optgroup label="Select To Show On">\
                            <option value="show-for-small-only">Show For Small Only</option>\
                            <option value="show-for-medium-up">Show For Medium And Up</option>\
                            <option value="show-for-medium-only">Show For Medium Only</option>\
                            <option value="show-for-large-up">Show For Large And Up</option>\
                            <option value="show-for-large-only">Show For Large Only</option>\
                            <option value="show-for-xlarge-up">Show For XLarge And Up</option>\
                            <option value="show-for-xlarge-only">Show For XLarge Only</option>\
                            <option value="show-for-xxlarge-up">Show For XXLarge And Up</option>\
                        </optgroup>\
                        <optgroup label="Select To Show On">\
                            <option value="hide-for-small-only">Hide For Small Only</option>\
                            <option value="hide-for-medium-up">Hide For Medium And Up</option>\
                            <option value="hide-for-medium-only">Hide For Medium Only</option>\
                            <option value="hide-for-large-up">Hide For Large And Up</option>\
                            <option value="hide-for-large-only">Hide For Large Only</option>\
                            <option value="hide-for-xlarge-up">Hide For XLarge And Up</option>\
                            <option value="hide-for-xlarge-only">Hide For XLarge Only</option>\
                            <option value="hide-for-xxlarge-up">Hide For XXLarge And Up</option>\
                        </optgroup>\
                    </select><br />\
				</td>\
			</tr>\
            <tr>\
				<th><label for="oscitas-visibility-content">visibility Content:</label></th>\
				<td><textarea name="visibility-content" id="oscitas-visibility-content" placeholder="Content/HTML"></textarea><br /></td>\
			</tr>\
            <tr>\
				<th><label for="oscitas-visibility-class">Custom Class:</label></th>\
				<td><input type="text" name="line" id="oscitas-visibility-class" value=""/><br /></td>\
			</tr>\
</table>\
		<p class="submit">\
			<input type="button" id="oscitas-visibility-submit" class="button-primary" value="Insert visibility" name="submit" />\
		</p>\
		</div>');
    if(!dynamic){
        form.appendTo('body').hide();
    }else{
        form=jQuery('.mfp-content');
    }
    var table = form.find('table');

    // handles the click event of the submit button
    form.find('#oscitas-visibility-submit').click(function() {
        // defines the options and their default values
        // again, this is not the most elegant way to do this
        // but well, this gets the job done nonetheless
        var cusclass='',showhideon='';
        if(table.find('#oscitas-visibility-class').val()!=''){
            cusclass= ' class="'+table.find('#oscitas-visibility-class').val()+'"';
        }
        showhideon=table.find('#oscitas-visibility-showhideon').val();
        var shortcode = '[efsvisibility '+cusclass+' showhideon="'+showhideon+'"]';
        shortcode+= table.find('#oscitas-visibility-content').val();
        shortcode+='[/efsvisibility]';

        // inserts the shortcode into the active editor
        tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);

        // closes fancybox
        efs_close_dialogue(pluginObj.hashId);
    });
}

