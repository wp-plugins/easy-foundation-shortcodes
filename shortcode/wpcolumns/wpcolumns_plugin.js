(function() {
    tinymce.create('tinymce.plugins.oscitasEFSWpcolumns', {
        init : function(ed, url) {
            ed.addButton('oscitasefswpcolumns', {
                title : 'Columns Shortcodes',
                image : url+'/icon.png',
                onclick : function() {
                    create_oscitas_efs_wpcolumns();
                }
            });
        },
        createControl : function(n, cm) {
            return null;
        },
        getInfo : function() {
            return {
                longname : "Columns Shortcode",
                author : 'Oscitas Themes',
                authorurl : 'http://www.oscitasthemes.com/',
                infourl : 'http://www.oscitasthemes.com/',
                version : "2.0.0"
            };
        }
    });
    tinymce.PluginManager.add('oscitasefswpcolumns', tinymce.plugins.oscitasEFSWpcolumns);
})();

function create_oscitas_efs_wpcolumns(){
    if(jQuery('#oscitas-form-wpcolumns').length){
        jQuery('#oscitas-form-wpcolumns').remove();
    }
    // creates a form to be displayed everytime the button is clicked
    // you should achieve this using AJAX instead of direct html code like this
    var form ='<div id="oscitas-form-wpcolumns">\
                <table id="oscitas-table" class="form-table">\
			<tr>\
				<th><label for="oscitas-no-of-wpcolumns">Number of columns</label></th>\
				<td><select name="type" id="oscitas-no-of-wpcolumns">\
					<option value="1" selected="selected">One column</option>\
					<option value="2">Two columns</option>\
					<option value="3">Three columns</option>\
                    <option value="4">Four columns</option>\
				</select><br />\
				</td>\
			</tr>\
                        	<tr id="wptwo" style="display:none;">\
				<th><label for="oscitas-two-columns">2 column division</label></th>\
				<td><select name="type" id="oscitas-two-columns" class="osc-change-col">\
					<option value="6$6">1/2-1/2</option>\
					<option value="4$8">1/3-2/3</option>\
                                        <option value="8$3">2/3-1/3</option>\
                                        <option value="3$9">1/4-3/4</option>\
                                        <option value="9$3">3/4-1/4</option>\
				</select> For Large Screen<br />\
				</td>\
			</tr>\
			<tr id="wpthree" style="display:none;">\
				<th><label for="oscitas-three-columns">3 column division</label></th>\
				<td><select name="type" id="oscitas-three-columns" class="osc-change-col">\
                                        <option value="4$4$4">1/3-1/3-1/3</option>\
					<option value="3$6$3">1/4-2/4-1/4</option>\
					<option value="3$3$6">1/4-1/4-2/4</option>\
                                        <option value="6$3$3">2/4-1/4-1/4</option>\
				</select> For Large Screen<br />\
			</tr>\
                        <tr id="">\
                        <th><label for="append_column_table">Column Specification</label></th>\
                        <td id="append_column_table"></td>\
                        </tr>\
                        <tr>\
				<th><label for="oscitas-column-class">Custom Class:</label></th>\
				<td><input type="text" name="line" id="oscitas-column-class" value=""/>\
				</td>\
			</tr>\
		</table>\
		<p class="submit">\
			<input type="button" id="oscitas-submit-wp_column" class="button-primary" value="Insert Columns" name="submit" />\
		</p>\
		</div>';
    jQuery(form).dialog({
        dialogClass : 'wp-dialog osc-dialog',
        model:true,
        height:'auto',
        width:1094,
        title:'Columns Shortcode',
        open:function(){
            var content=jQuery(this);
            var table = content.find('table');

            function show_table(){

                var ele='',e=0,sm,smoff,md,mdoff,lg,lgoff,xs,xsoff,sel,val=0,selcol,hidecol,elextra='',centered,width ='200';
                var col= content.find('#oscitas-no-of-wpcolumns').val();
                ele = '<i>You can select different column style for different screens such as large, small(e.g < 992px)</i><br/>';

                var option={
                    'lg':'Large Screen',
                    'sm': 'Small Screen'
                }
                ele+= '<table id="appended" class="tb_multiple_column"><thead><tr><th>Screen</th>';

                for(i=1;i<=col;i++){
                    if(col==1){
                        elextra='<div class="head_division" style="width: 33%;">Centered</div>';
                    }else{
                        elextra='';
                    }
                    ele+='<th><div class="head_division" style="width: 33%;">Column</div><div class="head_division" style="width: 33%;">Offset</div>'+elextra+'</th>';
                }
                ele+= '</tr></thead><tbody class="column_tbody">';
                jQuery.each(option,function(index,val){
                    ele+='<tr><th class="column_td_first">'+val+'</th>';
                    for(var i=1;i<=col;i++){
                        sm='<select name="'+index+'['+i+']" id="'+index+i+'">';
                        for( e=1;e<=12;e++){
                            if(index=='lg'){

                                selcol=12/col;
                                if(e==selcol){
                                    sel='selected=selected'
                                }
                                else{
                                    sel='';
                                }
                            } else{
                                if(e==12){
                                    sel='selected=selected'
                                }
                                else{
                                    sel='';
                                }
                            }
                            sm+='<option value="'+e+'" '+sel+'>'+e+'</option>';
                        }
                        sm+='</select>';
                        smoff='<select name="'+index+'off['+i+']" id="'+index+'off'+i+'">';
                        for( e=0;e<12;e++){

                            smoff+='<option value="'+e+'">'+e+'</option>';
                        }
                        smoff+='</select>';
                        if(col==1){
                            //width='250';
                            centered='<div class="head_division" style="width: 33%;"><input type="checkbox"  name="'+index+'centeredsmall['+i+']" id="'+index+'centeredsmall'+i+'" value="yes"></div>';
                        }else{
                            centered='';
                        }

                        ele+='<td width="'+width+'px"><div class="head_division" style="width: 33%;">'+sm+'</div><div class="head_division" style="width: 33%;">'+smoff+'</div>'+centered+'</td>';
                    }
                    ele+='</tr>';
                });
                ele +='</tbody></table>';
                table.find('#append_column_table').html(ele);
                jQuery('#oscitas-form-wpcolumns table>tr:visible:even').css('background', '#F0F0F0');
                jQuery('#oscitas-form-wpcolumns table>tr:visible:odd').css('background', '#DADADD');

            }
            function chnage_col_value(){

                var col= content.find('#oscitas-no-of-wpcolumns').val(),str,arr=[],i=0;
                if(col==2 || col==3){
                    if(col==2){
                        str=content.find('#oscitas-two-columns').val();
                    } else if(col==3){
                        str=content.find('#oscitas-three-columns').val();
                    }
                    arr=str.split('$');
                    jQuery.each(arr,function(index,val){
                        i=parseInt(index)+1;
                        jQuery('#lg'+i).val(val);
                    })

                }
                jQuery('#oscitas-form-wpcolumns table tr:visible:even').css('background', '#F0F0F0');
                jQuery('#oscitas-form-wpcolumns table tr:visible:odd').css('background', '#DADADD');
            }

            show_table();

            jQuery('#oscitas-no-of-wpcolumns').change(function(){
                var noOfColumns = jQuery(this).val();
                if(2 == noOfColumns){

                    jQuery("#wpthree").hide();
                    jQuery("#wptwo").show();
                }
                else if(3 == noOfColumns){
                    jQuery("#wptwo").hide();
                    jQuery("#wpthree").show();
                }
                else{
                    jQuery("#wptwo").  wp_enqueue_style('thickbox');
        wp_enqueue_script('media-upload');
        wp_enqueue_script('thickbox');hide();
                    jQuery("#wpthree").hide();

                }
                show_table();
                chnage_col_value();


            });
            content.find('.osc-change-col').change(function(){
                chnage_col_value();
            })
            var arr={
                1:'lg',
                2:'sm'
            };


            var value1 =0,valueoff=0,lastSel,previous;
            jQuery.each(arr,function(i,valuenum){
                jQuery.each(arr,function(tt,index){

                    jQuery('#'+index+i).live('focus',function(){
                        previous = this.value;
                    }).live('change',function(){
                            value1= parseInt(jQuery(this).val());
                            valueoff =parseInt(jQuery('#'+index+'off'+i).val());
                            value1=value1+valueoff;
                            if(value1<=12){
                                previous = this.value;
                            }
                            else{
                                jQuery('#'+index+i).val(previous);
                                alert('Can\'t Change, exceeds the limit');
                            }
                        });

                    jQuery('#'+index+'off'+i).live('focus',function(){
                        previous = this.value;
                    }).live('change',function(){
                            value1= parseInt(jQuery(this).val());
                            valueoff = parseInt(jQuery('#'+index+i).val());
                            value1=value1+valueoff;
                            if(value1<=12){
                                previous = this.value;
                            }
                            else{
                                jQuery('#'+index+'off'+i).val(previous);
                                alert('Can\'t Change, exceeds the limit');
                            }
                        })
                })
            });

            // handles the click event of the submit button
            content.find('#oscitas-submit-wp_column').click(function(){
                // defines the options and their default values
                // again, this is not the most elegant way to do this
                // but well, this gets the job done nonetheless
                var a_md=[],a_sm=[],a_xs=[],a_lg=[],j=0,a_md_off=[],a_sm_off=[],a_xs_off=[],a_lg_off=[],a_md_hide=[],a_sm_hide=[],a_xs_hide=[],a_lg_hide=[],c_lg=[],c_sm=[],sm='',md='',xs='',smoff='',mdoff='',xsoff='',lgoff='',smhide='',mdhide='',xshide='',lghide='';

                var noOfColumns = jQuery('#oscitas-no-of-wpcolumns').val();
                var shortcode = '';
                var cusclass='';
                if(table.find('#oscitas-column-class').val()!=''){
                    cusclass= ' class="'+table.find('#oscitas-column-class').val()+'"';
                }
                shortcode ='[efsrow'+cusclass+']';
                for(var i=1;i<=parseInt(noOfColumns);i++){

                    a_sm[i] = jQuery('#sm'+i).val();
                    a_lg[i] = jQuery('#lg'+i).val();
                    a_sm_off[i] = jQuery('#smoff'+i).val();
                    a_lg_off[i] = jQuery('#lgoff'+i).val();
                    c_lg[i] = jQuery('#lgcenteredsmall'+i).val();
                    c_sm[i] = jQuery('#smcenteredsmall'+i).val();

                    if(a_sm[i]!=12){
                        sm=' sm="'+a_sm[i]+'"';
                    } else{
                        sm='';
                    }

                    if(a_sm_off[i]!=0){
                        smoff=' smoff="'+a_sm_off[i]+'"';
                    }
                    else{
                        smoff='';
                    }

                    if(a_lg_off[i]!=0){
                        lgoff=' lgoff="'+a_lg_off[i]+'"';
                    }
                    else{
                        lgoff='';
                    }

                    if(noOfColumns==1){
                        shortcode += '<br/>[efscolumn lg="'+a_lg[i]+'"'+sm+smoff+lgoff+' centeredsmall="'+c_sm[i]+'"  centeredlarge="'+c_lg[i]+'"]<br/>text<br/>[/efscolumn]';
                    }else{
                        shortcode += '<br/>[efscolumn lg="'+a_lg[i]+'"'+sm+smoff+lgoff+' ]<br/>text<br/>[/efscolumn]';
                    }
                }

                shortcode += '<br/>[/efsrow]';
                // inserts the shortcode into the active editor
                tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);
                // closes Thickbox
                content.dialog( "destroy" );
            });
        }
    });
}

