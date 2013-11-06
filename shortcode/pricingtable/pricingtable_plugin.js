/**
 * Created with JetBrains PhpStorm.
 * User: oscitas
 * Date: 25/10/13
 * Time: 1:35 PM
 * To change this template use File | Settings | File Templates.
 */
(function() {
    tinymce.create('tinymce.plugins.oscitasEFSPricingtable', {
        init: function(ed, url) {
            ed.addButton('oscitasefspricingtable', {
                title: 'Pricing Table Shortcode',
                image: url + '/icon.png',
                onclick: function() {
                    create_oscitas_efs_pricingtable();
                }
            });
        },
        createControl: function(n, cm) {
            return null;
        },
        getInfo: function() {
            return {
                longname: "Pricing Table Shortcode",
                author : 'Oscitas Themes',
                authorurl : 'http://www.oscitasthemes.com/',
                infourl : 'http://www.oscitasthemes.com/',
                version : "2.0.0"
            };
        }
    });
    tinymce.PluginManager.add('oscitasefspricingtable', tinymce.plugins.oscitasEFSPricingtable);
})();
function create_oscitas_efs_pricingtable(){
    if(jQuery('#oscitas-form-pricingtable').length){
        jQuery('#oscitas-form-pricingtable').remove();
    }
    var form='<div id="oscitas-form-pricingtable">\
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
            </div>';
    jQuery(form).dialog({
        dialogClass : 'wp-dialog osc-dialog',
        model:true,
        height:'auto',
        width:600,
        title:'Pricing Table Shortcode',
        open:function(){
            var content=jQuery(this);
            content.find('#oscitas-form-pricingtable-button-type').change(function(){
                if(jQuery(this).val()=='button'){
                    content.find('#oscitas-form-pricingtable-show-link').hide();
                }else{
                    content.find('#oscitas-form-pricingtable-show-link').show();
                }
            });
            content.find('#oscitas-pricingtable-submit').click(function(){
                var bullets,no_of_bullets=3,type,link,cusclass,shortcode='';
                if(content.find('#oscitas-form-pricingtable-bullets').val()!=''){
                    no_of_bullets=content.find('#oscitas-form-pricingtable-bullets').val();
                }
                type=' type="'+content.find('#oscitas-form-pricingtable-button-type').val()+'"';
                if(content.find('#oscitas-form-pricingtable-button-type').val()=='link'){
                    link=' link="'+content.find('#oscitas-form-pricingtable-link').val()+'"';
                }else{
                    link='';
                }
                if(content.find('#oscitas-pricingtable-class').val()!=''){
                    cusclass= ' class="'+content.find('#oscitas-pricingtable-class').val()+'"';
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
                content.dialog( "destroy" );
            });
        }
    });
}