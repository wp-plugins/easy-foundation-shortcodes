var efslists={
    title:"List Shortcode",
    id :'oscitas-form-efslists',
    pluginName: 'efslists',
    setRowColors:false
};

(function() {
    _efs_create_tinyMCE_options(efslists);
})();
function create_oscitas_efslists(pluginObj){
    if(jQuery(pluginObj.hashId).length){
        jQuery(pluginObj.hashId).remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form = jQuery('<div id="'+pluginObj.id+'" class="oscitas-container" title="'+pluginObj.title+'"><table id="oscitas-table" class="form-table">\
			<tr>\
				<th><label for="oscitas-line">No of List Item</label></th>\
				<td><input type="text" name="line" id="oscitas-list-item" value="3"/><br /><small>Enter a numeric value</small>\
				</td>\
			</tr>\
            <tr>\
				<th><label for="oscitas-list-class">Custom Class:</label></th>\
				<td><input type="text" name="line" id="oscitas-list-class" value=""/><br />\
				</td>\
			</tr>\
		</table>\
		<p class="submit">\
			<input type="button" id="oscitas-submit" class="button-primary" value="Insert List" name="submit" />\
		</p>\
		</div>');
    form.appendTo('body').hide();
    var table = form.find('table');
            // handles the click event of the submit button
            form.find('#oscitas-submit').click(function(){
                // defines the options and their default values
                // again, this is not the most elegant way to do this
                // but well, this gets the job done nonetheless
                var list=0;
                var cusclass='';
                if(table.find('#oscitas-list-class').val()!=''){
                    cusclass= ' class="'+table.find('#oscitas-list-class').val()+'"';
                }
                var shortcode = '[efslist'+cusclass;
                var list_item=jQuery('#oscitas-list-item').val();
                if(isNaN(list_item)==false){
                    list=list_item;
                } else{
                    list=3;
                }
                shortcode += ']<br/>';

                for(var i=1;i<=list;i++){
                    shortcode +='[efsli]your list content[/efsli]<br/>'
                }
                shortcode +='[/efslist]';

                // inserts the shortcode into the active editor
                tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);

                efs_close_dialogue(pluginObj.hashId);
            });
       
}

