if(efs_editor_opt=='dropdown'){
    (function(){
        tinymce.create('tinymce.plugins.oscitas_efs_main_dropdown', {
            init: function(ed, url){},
            createControl: function(button, e){


                if(button == "oscitas_efs_main_dropdown_button"){
                    var current_object = this;
                    var button = e.createSplitButton('osc_efsp_d_button', {
                        title: "Easy Foundation Shortcode",
                        image: efs_url+'images/icon_dropdown.png',
                        icons: true,
                        role: 'presentation',
                        "class": "osc_efsp_dropdown",
                        onclick:function(){
                        }
                    });
                    button.onRenderMenu.add(function(c, b){
                        var prefix='oscitas';
                        var efsprefix='efs';
                        //Design Elements

                        c = b.addMenu({title:"Basic Elements", icon_src: efs_url+'images/elements.png'});
                        current_object.osc_element_call(c, "Button", prefix+efsprefix+"buttons",800);
                        current_object.osc_element_call(c, "Button Group", prefix+efsprefix+"buttongroup");

                        current_object.osc_element_call(c, "Notifications", prefix+efsprefix+"notifications");
                        current_object.osc_element_call(c, "Tooltip", prefix+efsprefix+"tooltip");
                        current_object.osc_element_call(c, "Button Dropdown", prefix+efsprefix+"dropdown");
                        current_object.osc_element_call(c, "Progress Bar", prefix+efsprefix+"progressbar",800);
                        //Advanced
                        c = b.addMenu({title:"Interactive", icon_src: efs_url+'images/interaction.png'});
                        current_object.osc_element_call(c, "Accordion", prefix+efsprefix+"toggles");
                        current_object.osc_element_call(c, "Tabs", prefix+efsprefix+"tabs");
                        current_object.osc_element_call(c, "Tables", prefix+efsprefix+"tables");
                        current_object.osc_element_call(c, "Panel", prefix+efsprefix+"panel");
                        current_object.osc_element_call(c, "Video", prefix+efsprefix+"flexvideo");
                        current_object.osc_element_call(c, "Pricing Table", prefix+efsprefix+"pricingtable");
                        //Content
                        c = b.addMenu({title:"Content", icon_src: efs_url+'images/content.png'});
                        current_object.osc_element_call(c, "List", prefix+efsprefix+"lists");
                        current_object.osc_element_call(c, "Icon Heading", prefix+efsprefix+"iconhead",800);
                        current_object.osc_element_call(c, "Label", prefix+efsprefix+"labels");
                        c = b.addMenu({title:" Miscellaneous", icon_src: efs_url+'images/misc.png'});
                        current_object.osc_element_call(c, "Responsive Image", prefix+efsprefix+"thumbnail",600);
                        current_object.osc_element_call(c, "Icon", prefix+efsprefix+"icon",800);
                        current_object.osc_element_call(b, "Columns", prefix+efsprefix+"wpcolumns",1094);

                    });
                    return button;
                }
                return null;
            },
            osc_element_call: function(ed, title, value,width,height){
               var classt = 'osc_efsp_dropdown_item';
                if(typeof(width)==='undefined') width = 'auto';
                if(typeof(height)==='undefined') height = 'auto';
                var prefix='oscitas';
                var efsprefix='efs';
                var func = value.replace(prefix, '');
                var fun1=func.replace(efsprefix, '');
                ed.add({
                    title: title,
                    class:classt,
                    icons: true,
                    icon_src: efs_url+'shortcode/'+fun1+'/icon.png',
                    role: 'presentation',
                    onclick: function (){

                        //Retrieve selected content
                        var selected_content = tinyMCE.activeEditor.selection.getContent();
                        if(!selected_content)
                            var selected_content = 'Your Content';
                        //Design Elements

                        if(value == prefix+efsprefix+"toggles"){
                            tinyMCE.activeEditor.selection.setContent('[efstoggles class="yourcustomclass"]<br/>[efstoggle active="active" title="Accordion number 1"]Toggle 1 content goes here.[/efstoggle]<br/>[efstoggle title="Accordion number 2"]Toggle 2 content goes here.[/efstoggle]<br/>[efstoggle title="Accordion number 3"]Toggle 3 content goes here.[/efstoggle]<br/>[efstoggle title="Accordion number 4"]Toggle 4 content goes here.[/efstoggle]<br/>[/efstoggles]');
                        }
                        else if(value == prefix+efsprefix+"tabs"){
                            tinyMCE.activeEditor.selection.setContent('[efstabs class="yourcustomclass"]<br/>[efstab title="Tab number 1" active="active"]Tab 1 content goes here.[/efstab]<br/>[efstab title="Tab number 2"]Tab 2 content goes here.[/efstab]<br/>[efstab title="Tab number 3"]Tab 3 content goes here.[/efstab]<br/>[efstab title="Tab number 4"]Tab 4 content goes here.[/efstab]<br/>[/efstabs]');
                        }

                        else{

                            eval('_efs_create_tinyMCE_dropdown('+func+',"'+width+'","'+height+'")');
                        }
                        return false;
                    }
                })
            }

        });
        tinymce.PluginManager.add("oscitas_efs_main_dropdown", tinymce.plugins.oscitas_efs_main_dropdown);
    })();
}

//var func = value.replace(prefix, '');
//eval('create_oscitas_'+func+'(); open_dialogue(g'+func+');');
