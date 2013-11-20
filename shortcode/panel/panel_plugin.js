(function() {
    tinymce.create('tinymce.plugins.oscitasEFSPanel', {
        init : function(ed, url) {
            ed.addButton('oscitasefspanel', {
                title : 'Panel Shortcode',
                image : url+'/icon.png',
                onclick : function() {
                    create_oscitas_efs_panel();
                }
            });
        },
        createControl : function(n, cm) {
            return null;
        },
        getInfo : function() {
            return {
                longname : "Panel Shortcode",
                author : 'Oscitas Themes',
                authorurl : 'http://www.oscitasthemes.com/',
                infourl : 'http://www.oscitasthemes.com/',
                version : "2.0.0"
            };
        }
    });
    tinymce.PluginManager.add('oscitasefspanel', tinymce.plugins.oscitasEFSPanel);
})();

function create_oscitas_efs_panel(){
    if(jQuery('#oscitas-form-panel').length){
        jQuery('#oscitas-form-panel').remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form ='<div id="oscitas-form-panel"><table id="oscitas-table" class="form-table">\
			<tr>\
				<th><label for="oscitas-type">Style</label></th>\
				<td><select name="type" id="oscitas-panel-type">\
					<option value="">Default</option>\
					<option value="callout">Default Blue</option>\
				</select><br />\
				</td>\
			</tr>\
			<tr>\
				<th><label for="oscitas-panel-radius">Radius</label></th>\
				<td><input type="checkbox" id="oscitas-panel-radius"/><br />\
				</td>\
			</tr>\
                        <tr>\
				<th><label for="oscitas-panel-class">Custom Class:</label></th>\
				<td><input type="text" name="line" id="oscitas-panel-class" value=""/><br />\
				</td>\
			</tr>\
		</table>\
		<p class="submit">\
			<input type="button" id="oscitas-submit" class="button-primary" value="Insert Panel" name="submit" />\
		</p>\
		</div>';
    jQuery(form).dialog({
        dialogClass : 'wp-dialog osc-dialog',
        model:true,
        height:'auto',
        width:500,
        title:'Panel Shortcode',
        open:function(){
            var content=jQuery(this);
            var table = content.find('table');

            // handles the click event of the submit button
            content.find('#oscitas-submit').click(function(){
                // defines the options and their default values
                // again, this is not the most elegant way to do this
                // but well, this gets the job done nonetheless
                var cusclass='',type='';
                if(table.find('#oscitas-panel-class').val()!=''){
                    cusclass= ' class="'+table.find('#oscitas-panel-class').val()+'"';
                }
                if(table.find('#oscitas-panel-radius').prop('checked')==true){
                    type='radius';
                }
                var shortcode = '[efspanel style="'+table.find('#oscitas-panel-type').val()+ '" type="'+type+ '"'+cusclass+']';

                shortcode += '<br/>[efspanel-header]<br/>Heading goes here<br/>[/efspanel-header]';

                shortcode += '<br/>[efspanel-content]<br/>Content goes here<br/>[/efspanel-content]';

                shortcode += '<br/>[/efspanel]';

                // inserts the shortcode into the active editor
                tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);

                content.dialog( "destroy" );
            });
        }
    });
}

