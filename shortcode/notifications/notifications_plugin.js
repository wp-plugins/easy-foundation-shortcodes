(function() {
    tinymce.create('tinymce.plugins.oscitasEFSNotifications', {
        init : function(ed, url) {
            ed.addButton('oscitasefsnotifications', {
                title : 'Notifications Shortcode',
                image : url+'/icon.png',
                onclick : function() {
                    create_oscitas_efs_notification();
                }
            });
        },
        createControl : function(n, cm) {
            return null;
        },
        getInfo : function() {
            return {
                longname : "Notifications Shortcode",
                author : 'Oscitas Themes',
                authorurl : 'http://www.oscitasthemes.com/',
                infourl : 'http://www.oscitasthemes.com/',
                version : "2.0.0"
            };
        }
    });
    tinymce.PluginManager.add('oscitasefsnotifications', tinymce.plugins.oscitasEFSNotifications);
})();

function create_oscitas_efs_notification(){
    if(jQuery('#oscitas-form-notifications').length){
        jQuery('#oscitas-form-notifications').remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form ='<div id="oscitas-form-notifications"><table id="oscitas-table" class="form-table">\
			<tr>\
				<th><label for="oscitas-type">Select Type</label></th>\
				<td><select name="type" id="oscitas-type">\
					<option value="">Default</option>\
					<option value="alert">Alert</option>\
					<option value="success">Success</option>\
					<option value="secondary">Secondary</option>\
				</select><br />\
				</td>\
			</tr>\
			<tr>\
				<th><label for="oscitas-style">Select Style</label></th>\
				<td><select name="style" id="oscitas-style">\
					<option value="">Default</option>\
					<option value="radius">Radius</option>\
					<option value="round">Round</option>\
				</select><br />\
				</td>\
			</tr>\
			<tr>\
				<th><label for="oscitas-line">Close link</label></th>\
				<td><input type="checkbox" id="oscitas-close"/><br />\
				</td>\
			</tr>\
                        <tr>\
				<th><label for="oscitas-note-class">Custom Class:</label></th>\
				<td><input type="text" name="line" id="oscitas-note-class" value=""/><br />\
				</td>\
			</tr>\
		</table>\
		<p class="submit">\
			<input type="button" id="oscitas-submit" class="button-primary" value="Insert Notification" name="submit" />\
		</p>\
		</div>';
    jQuery(form).dialog({
        dialogClass : 'wp-dialog osc-dialog',
        model:true,
        height:'auto',
        width:500,
        title : 'Notifications Shortcode',
        open:function(){
            var content=jQuery(this);
            var table = content.find('table');
            // handles the click event of the submit button
            content.find('#oscitas-submit').click(function(){
                // defines the options and their default values
                // again, this is not the most elegant way to do this
                // but well, this gets the job done nonetheless
                var options = {
                    'type'       : '',
                    'style'       : ''
                };
                var cusclass='';
                if(table.find('#oscitas-note-class').val()!=''){
                    cusclass= ' class="'+table.find('#oscitas-note-class').val()+'"';
                }
                var shortcode = '[efsnotification';

                for( var index in options) {
                    var value = table.find('#oscitas-' + index).val();

                    // attaches the attribute to the shortcode only if it's different from the default value
                    //if ( value !== options[index] )
                    shortcode += ' ' + index + '="' + value + '"';
                }
                shortcode += ' close="'+(table.find('#oscitas-close').prop('checked')? 'true': 'false')+ '" ';

                shortcode += cusclass+']Title: Lorem ipsum dolor sit amet...[/efsnotification]';

                // inserts the shortcode into the active editor
                tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);

                content.dialog( "destroy" );
            });
        }
    });
}

