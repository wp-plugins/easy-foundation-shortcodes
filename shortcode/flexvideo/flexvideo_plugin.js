/**
 * Created with JetBrains PhpStorm.
 * User: oscitas
 * Date: 25/10/13
 * Time: 5:27 PM
 * To change this template use File | Settings | File Templates.
 */
(function() {
    tinymce.create('tinymce.plugins.oscitasEFSflexvideo', {
        init : function(ed, url) {
            ed.addButton('oscitasefsflexvideo', {
                title : 'Flex Video',
                image : url+'/icon.png',
                onclick : function() {
                    create_oscitas_efs_flexvideo();
                }
            });
        },
        createControl : function(n, cm) {
            return null;
        },
        getInfo : function() {
            return {
                longname : "Flex Video",
                author : 'Oscitas Themes',
                authorurl : 'http://www.oscitasthemes.com/',
                infourl : 'http://www.oscitasthemes.com/',
                version : "2.0.0"
            };
        }
    });
    tinymce.PluginManager.add('oscitasefsflexvideo', tinymce.plugins.oscitasEFSflexvideo);
})();

function create_oscitas_efs_flexvideo(){
    if(jQuery('#oscitas-form-flexvideo').length){
        jQuery('#oscitas-form-flexvideo').remove();
    }
    var form='<div id="oscitas-form-flexvideo">\
            <table id="oscitas-table" class="form-table">\
            <tr>\
                <th>Video Type</th>\
                <td><select name="oscitas_form_flexvideo_type" id="oscitas-form-flexvideo-type">\
                <option value="youtube">Youtube</option>\
                <option value="vimeo">Vimeo</option>\
                <option value="other">Other</option>\
                </select> </td>\
                </tr>\
                <tr>\
                <th>Video Embed Url:</th>\
                <td><input type="text" name="oscitas_form_flexvideo_url" id="oscitas-form-flexvideo-url" value="" /> </td>\
                </tr>\
                 <tr>\
                <th>Width:</th>\
                <td><input type="text" name="oscitas_form_flexvideo_width" id="oscitas-form-flexvideo-width" value="420" /> </td>\
                </tr>\
                 <tr>\
                <th>Height:</th>\
                <td><input type="text" name="oscitas_form_flexvideo_height" id="oscitas-form-flexvideo-height" value="315" /> </td>\
                </tr>\
                <tr>\
                <th>Widescrren:</th>\
                <td><input type="checkbox" name="oscitas_form_flexvideo_widescreen" id="oscitas-form-flexvideo-widescreen" value="yes" /><br/><span style="font-size: 10px;">(Will give the player a widescreen aspect ratio.)</span></td>\
                </tr>\
                <tr>\
                <th>Allow Full Screen:</th>\
                <td><input type="checkbox" name="oscitas_form_flexvideo_fullscreen" id="oscitas-form-flexvideo-fullscreen" value="yes" /></td>\
                </tr>\
                <tr>\
				<th><label for="oscitas-flexvideo-class">Custom Class:</label></th>\
				<td><input type="text" name="oscitas_flexvideo_class" id="oscitas-flexvideo-class" value=""/><br />\
				</td>\
			</tr>\
            </table>\
            <p class="submit">\
			<input type="button" id="oscitas-flexvideo-submit" class="button-primary" value="Insert Flex Video" name="submit" />\
		    </p>\
            </div>';
    jQuery(form).dialog({
        dialogClass : 'wp-dialog osc-dialog',
        model:true,
        height:'auto',
        width:500,
        title:'Flex Video Shortcode',
        open:function(){
            var content=jQuery(this);
//            content.find('#oscitas-form-flexvideo-type').change(function(){
//                if(jQuery(this).val()=='button'){
//                    content.find('#oscitas-form-pricingtable-show-link').hide();
//                }else{
//                    content.find('#oscitas-form-pricingtable-show-link').show();
//                }
//            });
            content.find('#oscitas-flexvideo-submit').click(function(){
                var allowfullscreen,widescreen,type,url,cusclass,width,height,shortcode='';

                type=' type="'+content.find('#oscitas-form-flexvideo-type').val()+'"';
                url=' url="'+content.find('#oscitas-form-flexvideo-url').val()+'"';
                width=' width="'+content.find('#oscitas-form-flexvideo-width').val()+'"';
                height=' height="'+content.find('#oscitas-form-flexvideo-height').val()+'"';

                if(content.find('#oscitas-form-flexvideo-widescreen').val()=='yes'){
                    widescreen=' widescreen="'+content.find('#oscitas-form-flexvideo-widescreen').val()+'"';
                }
                if(content.find('#oscitas-form-flexvideo-fullscreen').val()=='yes'){
                    allowfullscreen=' allowfullscreen="'+content.find('#oscitas-form-flexvideo-fullscreen').val()+'"';
                }
                if(content.find('#oscitas-flexvideo-class').val()!=''){
                    cusclass= ' class="'+content.find('#oscitas-flexvideo-class').val()+'"';
                }
                else{
                    cusclass='';
                }
                shortcode='[efsflexvideo '+type+cusclass+url+allowfullscreen+widescreen+width+height+'/]'+'<br/>'

                // inserts the shortcode into the active editor
                tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);
                content.dialog( "destroy" );
            });
        }
    });
}