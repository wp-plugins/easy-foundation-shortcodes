var efssubnav={
    title:"Sub Nav Shortcode",
    id :'oscitas-form-subnav',
    pluginName: 'efssubnav',
    setRowColors:false
};

(function() {
    _efs_create_tinyMCE_options(efssubnav);
})();
function create_oscitas_efssubnav(pluginObj,dynamic){
    if(jQuery(pluginObj.hashId).length){
        jQuery(pluginObj.hashId).remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form = jQuery('<div id="'+pluginObj.id+'" class="oscitas-container" title="'+pluginObj.title+'"><table id="oscitas-table" class="form-table">\
			<tr>\
			<th class="main_dp_th"><label id="main-dp-label" for="oscitas-subnav-label">Sub Nav Label</label></th>\
			<td><input type="text" name="oscitas-subnav-label" id="oscitas-subnav-label" value="Subnav"/></td>\
			</tr>\
			<tr>\
				<th class="main_dp_th"><label id="main-dp-label" for="oscitas-line">Sub Nav Items</label></th>\
				<td><table class="tb_multiple_column">\
                                <thead>\
                                    <tr><th>Link</th><th>Title</th><th>Active</th><th>Option</th></tr>\
                                </thead>\
                                <tbody id="oscitas-append-efssubnavitem">\
                                <tr class="osc_subnav_list_item" rel="item">\
                                   <td><input type="text" name="subnav-item-link[]" class="oscitas-subnavitem-link" value="#"/></td>\
                                    <td><input type="text" name="subnav-item-title[]" class="oscitas-subnavitem-title" value="Nav"/></td>\
                                    <td><input type="radio" name="subnav-item-active" class="oscitas-subnavitem-active" value="active"/></td><td></td>\
                                </tr>\
                                </tbody>\
                                <tfoot>\
                                    <tr><td colspan="5"><a id="osc_add_new_subnavitem" href="javascript:;" style="text-decoration:none;"><i class="fi fi-plus"></i> Add New Item</a></td></tr>\
                                </tfoot>\
                                </table>\
                                </td>\
			</tr>\
            <tr>\
				<th><label for="oscitas-subnav-class">Custom Class:</label></th>\
				<td><input type="text" name="line" id="oscitas-subnav-class" value=""/><br />\
				</td>\
			</tr>\
		</table>\
		<p class="submit">\
			<input type="button" id="oscitas-submit" class="button-primary" value="Insert List" name="submit" />\
		</p>\
		</div>');
    if(!dynamic){
        form.appendTo('body').hide();
    }else{
        form=jQuery('.mfp-content');
    }
    var table = form.find('table');
    form.find('#osc_add_new_subnavitem').click(function(){
        var item='<tr class="osc_subnav_list_item" rel="item"><td class="osc_hide"><input type="text" name="subnav-item-link[]" class="oscitas-subnavitem-link" value="#"/></td><td class="osc_hide"><input type="text" name="subnav-item-title[]" class="oscitas-subnavitem-title" value="Nav"/></td><td class="osc_hide"><input type="radio" name="subnav-item-active" class="oscitas-subnavitem-active" value="active"/></td><td><a class="osc_remove_subnavitem" href="javascript:;" style="text-decoration:none;"><i class="fi fi-x"></i></a></td></tr>';
        form.find('#oscitas-append-efssubnavitem').append(item);
    });

    jQuery('.osc_remove_subnavitem').live('click',function(){
        jQuery(this).parent().parent().remove();
    })

    // handles the click event of the submit button
    form.find('#oscitas-submit').click(function(){
        // defines the options and their default values
        // again, this is not the most elegant way to do this
        // but well, this gets the job done nonetheless
        var label;
        var cusclass='';
        if(table.find('#oscitas-subnav-class').val()!=''){
            cusclass= ' class="'+table.find('#oscitas-subnav-class').val()+'"';
        }
        label=form.find('#oscitas-subnav-label').val();
        var shortcode = '[efssubnav '+cusclass+']<br/>';
        shortcode +='[efssubnavlabel value="'+label+'" /]<br/>';
        form.find('.osc_subnav_list_item').each(function(i){
            var acitve='',link='',title='';
                link=jQuery(this).find('.oscitas-subnavitem-link').val();
                title=jQuery(this).find('.oscitas-subnavitem-title').val();
                if(jQuery(this).find('.oscitas-subnavitem-active').prop('checked')==true){
                    acitve='active';
                }
            shortcode +='[efssubnavli link="'+link+'" title="'+title+'" active="'+acitve+'"/]<br/>';
        });
        shortcode +='[/efssubnav]';

        // inserts the shortcode into the active editor
        tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);

        efs_close_dialogue(pluginObj.hashId);
    });

}

