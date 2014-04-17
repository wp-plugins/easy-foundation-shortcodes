var efsiconhead={
    title:"Icon Heading Shortcode",
    id :'oscitas-form-efsiconhead',
    pluginName: 'efsiconhead',
    setRowColors:false
};

(function() {
    _efs_create_tinyMCE_options(efsiconhead,800);
})();
function create_oscitas_efsiconhead(pluginObj){
    if(jQuery(pluginObj.hashId).length){
        jQuery(pluginObj.hashId).remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form = jQuery('<div id="'+pluginObj.id+'" class="oscitas-container" title="'+pluginObj.title+'"><table id="oscitas-table" class="form-table"><tr><th><label for="oscitas-heading-icon">Select Icon:</label></th><td><div id="click_icon_list" class="oscitas-icon-div"><span id="osc_show_icon"></span><span class="show-drop"></span></div><input type="hidden" id="osc_icon_class_val" value=""><div id="osc_show_iconlist" class="oscitas-icon" style="display:none;width:100%"><ul name="oscitas-heading-icon" id="oscitas-heading-icon" class="oscitas-icon-ul">'+icons+'</ul></div></td></tr><tr><th><label for="oscitas-iconhead-headingtype">Heading Type:</label></th><td><select name="oscitas-iconhead-headingtype" id="oscitas-iconhead-headingtype"><option value="h1">H1</option><option value="h2">H2</option><option value="h3">H3</option><option value="h4">H4</option><option value="h5">H5</option><option value="h6">H6</option><select><br /></td></tr><tr><th><label for="oscitas-iconhead-heading">Heading:</label></th><td><input type="text" name="oscitas-iconhead-heading" id="oscitas-iconhead-heading" value="Heading"/><br /></td></tr><tr><th><label for="oscitas-iconhead-class">Custom Class:</label></th><td><input type="text" name="line" id="oscitas-iconhead-class" value=""/><br /></td></tr></table><p class="submit"><input type="button" id="oscitas-iconhead-submit" class="button-primary" value="Insert Icon Heading" name="submit" /></p></div>');
   // console.log(html);
    form.appendTo('body').hide();
    var table = form.find('table');

            form.find('.fi').css('display','inline');
            table.find('#click_icon_list').click(function(){
                if(!jQuery(this).hasClass('osc_icon_showing')){
                    jQuery(this).addClass('osc_icon_showing')
                    jQuery('#osc_show_iconlist').show();
                } else{
                    jQuery(this).removeClass('osc_icon_showing')
                    jQuery('#osc_show_iconlist').hide();
                }
            });
            table.find('#oscitas-heading-icon li').click(function(){
                var val=jQuery(this).attr('data-value');
                jQuery(this).parent().find('li').removeClass('osc_icon_selected_button');
                jQuery(this).addClass('osc_icon_selected_button');
                table.find('#click_icon_list').removeClass('osc_icon_showing');
                form.find('#osc_show_iconlist').hide();
                form.find('#osc_show_icon').removeClass().addClass('fi').addClass(val);
                form.find('#osc_icon_class_val').val(val);
            })
            //    // handles the click event of the submit button
            form.find('#oscitas-iconhead-submit').click(function() {
                // defines the options and their default values
                // again, this is not the most elegant way to do this
                // but well, this gets the job done nonetheless
                var type=jQuery('#oscitas-iconhead-headingtype').val();
                var cusclass='',style='';
                if(table.find('#osc_icon_class_val').val()!=''){
                    style=' style="' + table.find('#osc_icon_class_val').val()+'"' ;
                }
                if(table.find('#oscitas-iconhead-class').val()!=''){
                    cusclass= ' class="'+table.find('#oscitas-iconhead-class').val()+'"';
                }
                var shortcode = '[efsiconheading type="'+type+'"';

                shortcode += style+cusclass ;

                shortcode += ']'+table.find('#oscitas-iconhead-heading').val()+'[/efsiconheading]' ;

                // inserts the shortcode into the active editor
                tinyMCE.activeEditor.execCommand('mceInsertContent',0 , shortcode);
                efs_close_dialogue(pluginObj.hashId);
});
}

