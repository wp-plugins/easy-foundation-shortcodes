var efsicon={
    title:"Icon Shortcode",
    id :'oscitas-form-efsicon',
    pluginName: 'efsicon',
    setRowColors:false
};

(function() {
    _efs_create_tinyMCE_options(efsicon,800);
})();
function create_oscitas_efsicon(pluginObj){
    if(jQuery(pluginObj.hashId).length){
        jQuery(pluginObj.hashId).remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form = jQuery('<div id="'+pluginObj.id+'" class="oscitas-container" title="'+pluginObj.title+'"><table id="oscitas-table" class="form-table">\
                        <tr>\
                        <th><label for="oscitas-heading-icon">Select Icon:</label></th>\
				<td><div id="click_icon_list_icon" class="oscitas-icon-div"><span id="osc_show_icon"></span><span class="show-drop"></span></div><input type="hidden" id="osc_icon_class_val_icon" value="fi-address-book">\
                    <div id="osc_show_iconlist_icon" class="oscitas-icon" style="display:none;width:100%"><ul name="oscitas-heading-icon_icon" id="oscitas-heading-icon_icon" class="oscitas-icon-ul">'+icons+'</ul>\
                    </div>\
				</td>\
			</tr>\
                         <tr>\
				<th><label for="oscitas-icon-class">Custom Class:</label></th>\
				<td><input type="text" name="line" id="oscitas-icon-class" value=""/><br />\
				</td>\
			</tr>\
		</table>\
		<p class="submit">\
			<input type="button" id="oscitas-icon-submit" class="button-primary" value="Insert icon" name="submit" />\
		</p>\
		</div>');
    form.appendTo('body').hide();
    var table = form.find('table');

            form.find('.fi').css('display','inline');
            var t= table.find('#osc_icon_class_val_icon').val();
            table.find('#osc_show_icon').removeClass().addClass('fi').addClass(t);

            table.find('#click_icon_list_icon').click(function(){
                if(!jQuery(this).hasClass('osc_icon_showing_icon')){
                    jQuery(this).addClass('osc_icon_showing_icon')
                    table.find('#osc_show_iconlist_icon').show();
                } else{
                    jQuery(this).removeClass('osc_icon_showing_icon')
                    table.find('#osc_show_iconlist_icon').hide();
                }
            });
            table.find('#oscitas-heading-icon_icon li').click(function(){
                var val=jQuery(this).attr('data-value');
                jQuery(this).parent().find('li').removeClass('osc_icon_selected_button');
                jQuery(this).addClass('osc_icon_selected_button');
                table.find('#click_icon_list_icon').removeClass('osc_icon_showing_icon');
                table.find('#osc_show_iconlist_icon').hide();
                table.find('#osc_show_icon').removeClass().addClass('fi').addClass(val);
                table.find('#osc_icon_class_val_icon').val(val);
            })
            // handles the click event of the submit button
            form.find('#oscitas-icon-submit').click(function(){
                var cusclass;
                if(table.find('#oscitas-icon-class').val()!=''){
                    cusclass= ' class="'+table.find('#oscitas-icon-class').val()+'"';
                }
                else{
                    cusclass='';
                }
                var icon = table.find('#osc_icon_class_val_icon').val();
                var  shortcode='';
                shortcode='[efsicon type="'+icon+'"'+cusclass+']'

                // inserts the shortcode into the active editor
                tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);
                efs_close_dialogue(pluginObj.hashId);

});

}

