var efspricingtable={
    title:"Pricing Table Shortcode",
    id :'oscitas-form-efspricingtable',
    pluginName: 'efspricingtable',
    setRowColors:false
};

(function() {
    _efs_create_tinyMCE_options(efspricingtable);
})();
function create_oscitas_efspricingtable(pluginObj){
    if(jQuery(pluginObj.hashId).length){
        jQuery(pluginObj.hashId).remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form = jQuery('<div id="'+pluginObj.id+'" class="oscitas-container" title="'+pluginObj.title+'">\
            <table id="oscitas-table" class="form-table">\
                <tr>\
                <th>No. Of Bullet Items:</th>\
                <td><input type="text" name="oscitas_form_pricingtable_bullets" id="oscitas-form-pricingtable-bullets" value="3" /> </td>\
                </tr>\
                <tr>\
                <th>Button/Link</th>\
                <td><select name="oscitas_form_pricingtable_button_type" id="oscitas-form-pricingtable-button-type">\
                <option value="link">Link</option>\
                <option value="button">Button</option>\
                </select> </td>\
                </tr>\
                <tr id="oscitas-form-pricingtable-show-link">\
                <th>Link</th>\
                <td><input type="text" name="oscitas_form_pricingtable_link" id="oscitas-form-pricingtable-link" value="#" /></td>\
                </tr>\
                <tr>\
				<th><label for="oscitas-pricingtable-class">Custom Class:</label></th>\
				<td><input type="text" name="oscitas_pricingtable_class" id="oscitas-pricingtable-class" value=""/><br />\
				</td>\
			</tr>\
            </table>\
            <p class="submit">\
			<input type="button" id="oscitas-pricingtable-submit" class="button-primary" value="Insert Pricing Table" name="submit" />\
		    </p>\
            </div>');

    form.appendTo('body').hide();
    var table = form.find('table');
           form.find('#oscitas-form-pricingtable-button-type').change(function(){
                if(jQuery(this).val()=='button'){
                   form.find('#oscitas-form-pricingtable-show-link').hide();
                }else{
                   form.find('#oscitas-form-pricingtable-show-link').show();
                }
            });
           form.find('#oscitas-pricingtable-submit').click(function(){
                var bullets,no_of_bullets=3,type,link,cusclass,shortcode='';
                if(form.find('#oscitas-form-pricingtable-bullets').val()!=''){
                    no_of_bullets=form.find('#oscitas-form-pricingtable-bullets').val();
                }
                type=' type="'+form.find('#oscitas-form-pricingtable-button-type').val()+'"';
                if(form.find('#oscitas-form-pricingtable-button-type').val()=='link'){
                    link=' link="'+form.find('#oscitas-form-pricingtable-link').val()+'"';
                }else{
                    link='';
                }
                if(form.find('#oscitas-pricingtable-class').val()!=''){
                    cusclass= ' class="'+form.find('#oscitas-pricingtable-class').val()+'"';
                }
                else{
                    cusclass='';
                }
                no_of_bullets= parseInt(no_of_bullets);
                shortcode='[efspricingtable '+type+cusclass+link+']'+'<br/>'
                shortcode+='[efstitle]<b>Title</b>[/efstitle]'+'<br/>';
                shortcode+='[efsprice]<b>$ 0.00</b>[/efsprice]'+'<br/>';
                shortcode+='[efsdescription]<b>Description</b>[/efsdescription]'+'<br/>';
                for(var i=1;i<=no_of_bullets;i++){
                    shortcode+='[efsbulletitem]<b>Bullet Item-'+i+'</b>[/efsbulletitem]'+'<br/>';
                }
                shortcode+='[efspricebutton]<b>Buy Now</b>[/efspricebutton]'+'<br/>';
                shortcode+='[/efspricingtable]'+'<br/>';

                // inserts the shortcode into the active editor
                tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);
                efs_close_dialogue(pluginObj.hashId);
            });
       
}