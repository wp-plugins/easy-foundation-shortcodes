var efsflexvideo={
    title:"Flex Video Shortcode",
    id :'oscitas-form-efsflexvideo',
    pluginName: 'efsflexvideo',
    setRowColors:false
};

(function() {
    _efs_create_tinyMCE_options(efsflexvideo);
})();
function create_oscitas_efsflexvideo(pluginObj){
    if(jQuery(pluginObj.hashId).length){
        jQuery(pluginObj.hashId).remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form = jQuery('<div id="'+pluginObj.id+'" class="oscitas-container" title="'+pluginObj.title+'">\
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
                <th>Widescreen:</th>\
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
            </div>');
    form.appendTo('body').hide();
    var table = form.find('table');
//            form.find('#oscitas-form-flexvideo-type').change(function(){
//                if(jQuery(this).val()=='button'){
//                    form.find('#oscitas-form-pricingtable-show-link').hide();
//                }else{
//                    form.find('#oscitas-form-pricingtable-show-link').show();
//                }
//            });
            form.find('#oscitas-flexvideo-submit').click(function(){
                var allowfullscreen,widescreen,type,url,cusclass,width,height,shortcode='';

                type=' type="'+form.find('#oscitas-form-flexvideo-type').val()+'"';
                url=' url="'+form.find('#oscitas-form-flexvideo-url').val()+'"';
                width=' width="'+form.find('#oscitas-form-flexvideo-width').val()+'"';
                height=' height="'+form.find('#oscitas-form-flexvideo-height').val()+'"';

                if(form.find('#oscitas-form-flexvideo-widescreen').val()=='yes'){
                    widescreen=' widescreen="'+form.find('#oscitas-form-flexvideo-widescreen').val()+'"';
                }
                if(form.find('#oscitas-form-flexvideo-fullscreen').val()=='yes'){
                    allowfullscreen=' allowfullscreen="'+form.find('#oscitas-form-flexvideo-fullscreen').val()+'"';
                }
                if(form.find('#oscitas-flexvideo-class').val()!=''){
                    cusclass= ' class="'+form.find('#oscitas-flexvideo-class').val()+'"';
                }
                else{
                    cusclass='';
                }
                shortcode='[efsflexvideo '+type+cusclass+url+allowfullscreen+widescreen+width+height+'/]'+'<br/>'

                // inserts the shortcode into the active editor
                tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);
                efs_close_dialogue(pluginObj.hashId);
            });
}