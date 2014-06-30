(function() {
    var objNew=jQuery.parseJSON(efs_dropdown_obj);
    var basic=[],interactive=[],content=[],miscellaneous=[],columns=[];
    jQuery.each(objNew,function(ind,val){
        if(typeof val=='object'){
            if(typeof(val['width'])==='undefined' || val['width']=='') val['width'] = 'auto';
            if(typeof(val['height'])==='undefined' || val['height']=='') val['height'] = 'auto';
            var n={text:val['name'],image:efs_url+'/shortcode/'+ind+'/icon.png',icon:'osc_icon '+ind, onclick : function() {
                var selected_content = tinyMCE.activeEditor.selection.getContent();
                if(!selected_content)
                    var selected_content = 'Your Content';
                //Design Elements

                if(ind == "toggles"){
                    tinyMCE.activeEditor.selection.setContent('[efstoggles class="yourcustomclass"]<br/>[efstoggle active="active" title="Accordion number 1"]Toggle 1 content goes here.[/efstoggle]<br/>[efstoggle title="Accordion number 2"]Toggle 2 content goes here.[/efstoggle]<br/>[efstoggle title="Accordion number 3"]Toggle 3 content goes here.[/efstoggle]<br/>[efstoggle title="Accordion number 4"]Toggle 4 content goes here.[/efstoggle]<br/>[/efstoggles]');
                }else if(ind == "tabs"){
                    tinyMCE.activeEditor.selection.setContent('[[efstabs class="yourcustomclass"]<br/>[efstab title="Tab number 1" active="active"]Tab 1 content goes here.[/efstab]<br/>[efstab title="Tab number 2"]Tab 2 content goes here.[/efstab]<br/>[efstab title="Tab number 3"]Tab 3 content goes here.[/efstab]<br/>[efstab title="Tab number 4"]Tab 4 content goes here.[/efstab]<br/>[/efstabs]');
                }
                else{
                    eval('_create_tinyMCE_dropdown(efs'+ind+',"'+val['width']+'","'+val['height']+'")');
                }
            }
            }
            var grp=val['group'];
            eval(grp).push(n);


        }
    });

    var objGrp=jQuery.parseJSON(efs_dropdown_grp),grps_obj=[];
    jQuery.each(objGrp,function(ind,val){
        if(typeof val=='object'){
            var n=  {text:val['name'], image: efs_url+'images/'+val['icon'],menu:eval(ind),icon:'osc_group '}
        }
        grps_obj.push(n);
    });
    tinymce.create('tinymce.plugins.oscitas_efs_main_dropdown', {

        init : function(ed, url) {

            ed.addButton( 'oscitas_efs_main_dropdown_button', {
                type: 'splitbutton',
                title: "EFS Shortcode",
                icon:'osc_icon_drop efs_dropdown_icon',
                image: efs_url+'images/icon_dropdown.png',
                class: "osc_efs_dropdown",
                onclick: function(e) {
                },
                menu:grps_obj

            });

        }


    });

    tinymce.PluginManager.add('oscitas_efs_main_dropdown', tinymce.plugins.oscitas_efs_main_dropdown);
})();

jQuery(window).load(function(){
    jQuery('.mce-ico.mce-i-osc_icon_drop.efs_dropdown_icon').parents('div').addClass('efs_dropdown_cs_class');
});