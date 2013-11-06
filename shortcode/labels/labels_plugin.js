(function() {
    tinymce.create('tinymce.plugins.oscitasEFSLabels', {
        init : function(ed, url) {
            ed.addButton('oscitasefslabels', {
                title : 'Label Shortcode',
                image : url+'/icon.png',
                onclick : function() {
                    create_oscitas_efs_label();
                }
            });
        },
        createControl : function(n, cm) {
            return null;
        },
        getInfo : function() {
            return {
                longname : "Label Shortcode",
                author : 'Oscitas Themes',
                authorurl : 'http://www.oscitasthemes.com/',
                infourl : 'http://www.oscitasthemes.com/',
                version : "2.0.0"
            };
        }
    });
    tinymce.PluginManager.add('oscitasefslabels', tinymce.plugins.oscitasEFSLabels);
})();

function create_oscitas_efs_label(){
    if(jQuery('#oscitas-form-label').length){
        jQuery('#oscitas-form-label').remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form ='<div id="oscitas-form-label"><table id="oscitas-table" class="form-table">\
			<tr>\
				<th><label for="oscitas-label-type">Label Type:</label></th>\
				<td><select name="type" id="oscitas-label-type">\
					<option value="">Default</option>\
					<option value="secondary">Secondary</option>\
					<option value="success">Success</option>\
					<option value="alert">Alert</option>\
				</select><br />\
				</td>\
			</tr>\
			<tr>\
				<th><label for="oscitas-label-style">Label Style:</label></th>\
				<td><select name="style" id="oscitas-label-style">\
					<option value="">Default</option>\
					<option value="radius">Radius</option>\
					<option value="round">Round</option>\
				</select><br />\
				</td>\
			</tr>\
			<tr>\
				<th><label for="oscitas-label-content">Label Content:</label></th>\
				<td><input type="text" name="label" id="oscitas-label-content" value="Label"/><br />\
				</td>\
			</tr>\
                        <tr>\
				<th><label for="oscitas-label-class">Custom Class:</label></th>\
				<td><input type="text" name="line" id="oscitas-label-class" value=""/><br />\
				</td>\
			</tr>\
		</table>\
		<p class="submit">\
			<input type="button" id="oscitas-label-submit" class="button-primary" value="Insert Label" name="submit" />\
		</p>\
		</div>';
    jQuery(form).dialog({
        dialogClass : 'wp-dialog osc-dialog',
        model:true,
        height:'auto',
        width:600,
        title:'Label Shortcode',
        open:function(){
            var content=jQuery(this);
            var table = content.find('table');
            // handles the click event of the submit button
            content.find('#oscitas-label-submit').click(function(){
                var cusclass='';
                if(table.find('#oscitas-label-class').val()!=''){
                    cusclass= ' class="'+table.find('#oscitas-label-class').val()+'"';
                }
                var shortcode = '[efslabel style="'+jQuery('#oscitas-label-style').val()+'" type="'+jQuery('#oscitas-label-type').val()+'"'+cusclass+']<br/>';
                shortcode += jQuery('#oscitas-label-content').val()+'<br/>';
                shortcode += '[/efslabel]';

                // inserts the shortcode into the active editor
                tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);

                // closes fancybox
                content.dialog( "destroy" );
            });
        }
    });
}

