function efs_open_dialogue(pluginObj,dialogueid,width,height){
    if(typeof(width)==='undefined') width = 'auto';
    if(typeof(height)==='undefined') height = 'auto';
    jQuery('body').addClass('efsp-mf-shown');
    jQuery( dialogueid).find('.submit').append('<button title="Close" onclick="efs_close_dialogue();" class="close-dialog">Cancel</button>');
    jQuery.magnificPopup.open({

        items: {
            src: '<div id="efs-popup" class="white-popup" style="'+(width=='auto'?'max-width:800px;':'max-width:'+width+'px;')+'"><h2>'+pluginObj.title+'</h2>'+jQuery(dialogueid).html()+'</div>',
            type: 'inline'
        },
       // closeBtnInside: false,
//        modal: true,
        mainClass:'osc-dialog oscitas-easy-foundation-shortcode',
        callbacks: {
            open: function () {
                eval('create_oscitas_'+pluginObj.pluginName+'(pluginObj,true);')
            }
        }
    });
}
function efs_close_dialogue(dialogueid){
    jQuery.magnificPopup.close();
    jQuery('body').removeClass('efsp-mf-shown');
}

var plugininfo={
    longname : 'shortcodename',
    author : 'Oscitas Themes',
    authorurl : 'http://www.oscitasthemes.com/',
    infourl : 'http://www.oscitasthemes.com/',
    version : "1.0.0"
}
function _efs_create_tinyMCE_options(pluginObj, width,height) {
    if(typeof(width)==='undefined') width = 'auto';
    if(typeof(height)==='undefined') height = 'auto';
    var pluginName = 'oscitas'+pluginObj.pluginName.substr(0, 1).toUpperCase() + pluginObj.pluginName.substr(1);
    pluginObj.hashId = '#'+pluginObj.id;
    var options = {
        init : function(ed, url) {
            ed.addButton('oscitas'+pluginObj.pluginName, {
                title : pluginObj.title,
                image : url+'/icon.png',
                onclick : function() {

                    eval('create_oscitas_'+pluginObj.pluginName+'(pluginObj);');
                    efs_open_dialogue(pluginObj,pluginObj.hashId,width,height);
                    if (pluginObj.setRowColors) {
                        jQuery(pluginObj.hashId+' table tr:visible:even').css('background', '#ffffff');
                        jQuery(pluginObj.hashId+' table tr:visible:odd').css('background', '#efefef');
                    }
                }
            });
        },
        createControl : function(n, cm) {
            return null;
        },
        getInfo : function() {
            plugininfo.longname=pluginObj.title;
            return plugininfo;
        }
    };
    tinymce.create('tinymce.plugins.'+pluginName, options);
    options = eval('tinymce.plugins.'+pluginName);
    //return options;
    tinymce.PluginManager.add('oscitas'+pluginObj.pluginName, tinymce.plugins[pluginName]);
}
//function _efs_create_tinyMCE_dropdown(pluginObj,width,height) {
//    if(typeof(width)==='undefined') width = 'auto';
//    if(typeof(height)==='undefined') height = 'auto';
//    pluginObj.hashId = '#'+pluginObj.id;
//                    eval('create_oscitas_'+pluginObj.pluginName+'(pluginObj);efs_open_dialogue("'+pluginObj.hashId+'","'+width+'","'+height+'")');
//                    if (pluginObj.setRowColors) {
//                        jQuery(pluginObj.hashId+' table tr:visible:even').css('background', '#F0F0F0');
//                        jQuery(pluginObj.hashId+' table tr:visible:odd').css('background', '#DADADD');
//                    }
//}
function _create_tinyMCE_dropdown(pluginObj,width,height) {
    if(typeof(width)==='undefined') width = 'auto';
    if(typeof(height)==='undefined') height = 'auto';
    pluginObj.hashId = '#'+pluginObj.id;
    eval('create_oscitas_'+pluginObj.pluginName+'(pluginObj,false);');
    //efs_open_dialogue("'+pluginObj+'","'+pluginObj.hashId+'","'+width+'","'+height+'");
    efs_open_dialogue(pluginObj,pluginObj.hashId,width,height);
    if (pluginObj.setRowColors) {
        jQuery(pluginObj.hashId+' table tr:visible:even').css('background', '#ffffff');
        jQuery(pluginObj.hashId+' table tr:visible:odd').css('background', '#efefef');
    }
}
