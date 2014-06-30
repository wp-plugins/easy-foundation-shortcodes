var efssidenav={
    title:"Side Nav Shortcode",
    id :'oscitas-form-sidenav',
    pluginName: 'efssidenav',
    setRowColors:false
};

(function() {
    _efs_create_tinyMCE_options(efssidenav);
})();
function create_oscitas_efssidenav(pluginObj,dynamic){
    if(jQuery(pluginObj.hashId).length){
        jQuery(pluginObj.hashId).remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form = jQuery('<div id="'+pluginObj.id+'" class="oscitas-container" title="'+pluginObj.title+'"><table id="oscitas-table" class="form-table">\
			<tr>\
				<th class="main_dp_th"><label id="main-dp-label" for="oscitas-line">Side Nav Items</label></th>\
				<td><table class="tb_multiple_column">\
                                <thead>\
                                    <tr><th>Link</th><th>Title</th><th>Active</th><th>Option</th></tr>\
                                </thead>\
                                <tbody id="oscitas-append-efssidenavitem">\
                                <tr class="osc_sidenav_list_item" rel="item">\
                                   <td><input type="text" name="sidenav-item-link[]" class="oscitas-sidenavitem-link" value="#"/></td>\
                                    <td><input type="text" name="sidenav-item-title[]" class="oscitas-sidenavitem-title" value="Side Nav Item"/></td>\
                                    <td><input type="radio" name="sidenav-item-active" class="oscitas-sidenavitem-active" value="active"/></td><td></td>\
                                </tr>\
                                </tbody>\
                                <tfoot>\
                                    <tr><td colspan="5"><a id="osc_add_new_sidenavitem" href="javascript:;" style="text-decoration:none;"><i class="fi fi-plus"></i> Add New Item</a> <a id="osc_add_sidenavdivider" href="javascript:;" style="text-decoration:none;margin-left: 10px;"><i class="fi fi-plus"></i> Add Divider</a></td></tr>\
                                </tfoot>\
                                </table>\
                                </td>\
			</tr>\
            <tr>\
				<th><label for="oscitas-sidenav-class">Custom Class:</label></th>\
				<td><input type="text" name="line" id="oscitas-sidenav-class" value=""/><br />\
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
    form.find('#osc_add_new_sidenavitem').click(function(){
        var item='<tr class="osc_sidenav_list_item" rel="item"><td class="osc_hide"><input type="text" name="sidenav-item-link[]" class="oscitas-sidenavitem-link" value="#"/></td><td class="osc_hide"><input type="text" name="sidenav-item-title[]" class="oscitas-sidenavitem-title" value="Side Nav Item"/></td><td class="osc_hide"><input type="radio" name="sidenav-item-active" class="oscitas-sidenavitem-active" value="active"/></td><td><a class="osc_remove_sidenavitem" href="javascript:;" style="text-decoration:none;"><i class="fi fi-x"></i></a></td></tr>';
        form.find('#oscitas-append-efssidenavitem').append(item);
    });

    form.find('#osc_add_sidenavdivider').click(function(){
        var item='<tr class="osc_sidenav_list_item" rel="divider"><td class="osc_hide" colspan="3" style="text-align: center;">Divider</td><td><a class="osc_remove_sidenavdivider" href="javascript:;" style="text-decoration:none;"><i class="fi fi-x"></i></a></td></tr>';
        form.find('#oscitas-append-efssidenavitem').append(item);
    });

    jQuery('.osc_remove_sidenavitem').live('click',function(){
        jQuery(this).parent().parent().remove();
    })
    jQuery('.osc_remove_sidenavdivider').live('click',function(){
        jQuery(this).parent().parent().remove();
    })
    // handles the click event of the submit button
    form.find('#oscitas-submit').click(function(){
        // defines the options and their default values
        // again, this is not the most elegant way to do this
        // but well, this gets the job done nonetheless
        var list=0;
        var cusclass='';
        if(table.find('#oscitas-sidenav-class').val()!=''){
            cusclass= ' class="'+table.find('#oscitas-sidenav-class').val()+'"';
        }
        var shortcode = '[efssidenav '+cusclass+']<br/>';
        form.find('.osc_sidenav_list_item').each(function(i){
            var acitve='',divider='',link='',title='';
            if(jQuery(this).attr('rel')=='item'){
                link=jQuery(this).find('.oscitas-sidenavitem-link').val();
                title=jQuery(this).find('.oscitas-sidenavitem-title').val();
                if(jQuery(this).find('.oscitas-sidenavitem-active').prop('checked')==true){
                    acitve='active';
                }
            }else{
                divider='divider';
            }
            shortcode +='[efssidenavli link="'+link+'" title="'+title+'" active="'+acitve+'" divider="'+divider+'"/]<br/>';
        });
        shortcode +='[/efssidenav]';

        // inserts the shortcode into the active editor
        tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);

        efs_close_dialogue(pluginObj.hashId);
    });

}

