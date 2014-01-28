var efsbuttongroup={
    title:"Button Group Shortcode",
    id :'oscitas-form-efsbuttongroup',
    pluginName: 'efsbuttongroup',
    setRowColors:false
};

(function() {
    _efs_create_tinyMCE_options(efsbuttongroup);
})();
function create_oscitas_efsbuttongroup(pluginObj){
    if(jQuery(pluginObj.hashId).length){
        jQuery(pluginObj.hashId).remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form = jQuery('<div id="'+pluginObj.id+'" class="oscitas-container" title="'+pluginObj.title+'">\
                <table id="oscitas-table" class="form-table">\
                    <tr>\
                        <th><label for="oscitas-buttons-group-style">style</label></th>\
                       <td><select name="button_group_style" id="oscitas-buttons-group-style">\
                                <option value="" selected="selected">Default</option>\
                                <option value="radius">Radius</option>\
                                <option value="round">Round</option>\
                            </select><br />\
                       </td>\
                    </tr>\
                    <tr>\
                        <th><label for="oscitas-no-of-buttons">Number of Buttons</label></th>\
                        <td><select name="no_of_buttons" id="oscitas-no-of-buttons">\
                            <option value="2" selected="selected">2</option>\
                            <option value="3">3</option>\
                            <option value="4">4</option>\
                            <option value="5">5</option>\
                            <option value="6">6</option>\
                            <option value="7">7</option>\
                            <option value="8">8</option>\
                            <option value="9">9</option>\
                            <option value="10">10</option>\
                        </select><br />\
                        </td>\
                    </tr>\
                    <tr id="set-buttons-rows">\
                   <th>Button Setting</th> \
                   <td>\
                        <table id="table_inner" class="form-table">\
                              <thead><tr id="append-after-this"><th>Button type</th><th>Button Link</th><th>Button Style</th></tr></thead>\
                             <tbody><tr>\
                                  <td>\
                                      <select name="button_type[1]" id="button-type-1">\
                                        <option value="link" selected="selected">Link</option>\
                                        <option value="button">Button</option>\
                                      </select><br />\
                                 </td>\
                                 <td>\
                                    <input type="text" class="" id="button-link-1" name="button_link[1]" value="#" />\
                                 </td>\
                                 <td>\
                                     <select name="button_style[1]" id="button-style-1">\
                                        <option value="" selected="selected">Default</option>\
                                        <option value="alert">Alert</option>\
                                        <option value="secondary">Secondary</option>\
                                        <option value="success">Success</option>\
                                    </select><br/>\
                                 </td>\
                              </tr>\
                              <tr>\
                                  <td>\
                                      <select name="button_type[2]" id="button-type-2">\
                                        <option value="link" selected="selected">Link</option>\
                                        <option value="button">Button</option>\
                                      </select><br/>\
                                 </td>\
                                 <td>\
                                    <input type="text" class="" id="button-link-2" name="button_link[2]" value="#" />\
                                 </td>\
                                 <td>\
                                     <select name="button_style[2]" id="button-style-2">\
                                        <option value="" selected="selected">Default</option>\
                                        <option value="alert">Alert</option>\
                                        <option value="secondary">Secondary</option>\
                                        <option value="success">Success</option>\
                                    </select><br/>\
                                 </td>\
                              </tr></tbody>\
                        </table></td>\
                    </tr>\
                    <tr>\
                        <th><label for="oscitas-buttongroup-class">Custom Class:</label></th>\
                        <td><input type="text" name="oscitas_buttongroup_class" id="oscitas-buttongroup-class" value=""/><br />\
                        </td>\
			        </tr>\
			    </table>\
			    <p class="submit">\
			        <input type="button" id="oscitas-submit-button-group" class="button-primary" value="Insert Button Group" name="submit" />\
		        </p>\
			  </div>');
    form.appendTo('body').hide();
            var table = form.find('#oscitas-table');
            form.find('#oscitas-no-of-buttons').change(function(){
                var value=jQuery(this).val(),html='';
                if(value!=''){
                    for(var i=1;i<=value;i++){
                        html+='<tr>\
                                  <td>\
                                      <select name="button_type['+i+']" id="button-type-'+i+'">\
                                        <option value="link" selected="selected">Link</option>\
                                        <option value="button">Button</option>\
                                      </select><br/>\
                                 </td>\
                                 <td>\
                                    <input type="text" class="" id="button-link-'+i+'" name="button-link['+i+']" value="#" />\
                                 </td>\
                                 <td>\
                                     <select name="button_style['+i+']" id="button-style-'+i+'">\
                                        <option value="" selected="selected">Default</option>\
                                        <option value="alert">Alert</option>\
                                        <option value="secondary">Secondary</option>\
                                        <option value="success">Success</option>\
                                    </select><br/>\
                                 </td>\
                              </tr>';
                    }
                    table.find('#table_inner tbody tr').remove();
                    jQuery(html).appendTo(table.find('#table_inner tbody'));
                }
            });

            form.find('#oscitas-submit-button-group').click(function(){
                var shortcode='',style,no_of_btn,customclass='';
                no_of_btn=form.find('#oscitas-no-of-buttons').val();
                style=' style="'+form.find('#oscitas-buttons-group-style').val()+'"';
                customclass=' class="'+form.find('#oscitas-buttongroup-class').val()+'"';
                shortcode+='[efsbuttongroup '+style+customclass+']<br/>';
                if(no_of_btn>=2){
                    for(var i=1; i<=no_of_btn;i++){
                       shortcode+='[efsbuttongroupbutton type="'+table.find('#table_inner').find('#button-type-'+i+'').val()+'" link="'+table.find('#table_inner').find('#button-link-'+i+'').val()+'" btnstyle="'+table.find('#table_inner').find('#button-style-'+i+'').val()+'"]<b>Button-'+i+'</b>[/efsbuttongroupbutton]<br/>';
                    }
                }
                shortcode+='[/efsbuttongroup]';
                // inserts the shortcode into the active editor
                tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);
                // closes Thickbox
                efs_close_dialogue(pluginObj.hashId);

    });
}