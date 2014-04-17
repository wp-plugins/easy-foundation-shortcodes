(function() {
    tinymce.create('tinymce.plugins.oscitasEFSToggles', {
        init : function(ed, url) {
            ed.addButton('oscitasefstoggles', {
                title : 'Toggle Shortcode',
                image : url+'/icon.png',
                onclick : function() {
                    ed.selection.setContent('[efstoggles class="yourcustomclass"]<br/>[efstoggle active="active" title="Accordion number 1"]Toggle 1 content goes here.[/efstoggle]<br/>[efstoggle title="Accordion number 2"]Toggle 2 content goes here.[/efstoggle]<br/>[efstoggle title="Accordion number 3"]Toggle 3 content goes here.[/efstoggle]<br/>[efstoggle title="Accordion number 4"]Toggle 4 content goes here.[/efstoggle]<br/>[/efstoggles]');
                }
            });
        },
        createControl : function(n, cm) {
            return null;
        },
        getInfo : function() {
            return {
                longname : "Toggle Shortcode",
                author : 'Oscitas Themes',
                authorurl : 'http://www.oscitasthemes.com/',
                infourl : 'http://www.oscitasthemes.com/',
                version : "2.0.0"
            };
        }
    });
    tinymce.PluginManager.add('oscitasefstoggles', tinymce.plugins.oscitasEFSToggles);
})();
