(function() {
    tinymce.create('tinymce.plugins.oscitasEFSTabs', {
        init : function(ed, url) {
            ed.addButton('oscitasefstabs', {
                title : 'Tabs Shortcode',
                image : url+'/icon.png',
                onclick : function() {
                    ed.selection.setContent('[efstabs class="yourcustomclass"]<br/>[efstab title="Tab number 1" active="active"]Tab 1 content goes here.[/efstab]<br/>[efstab title="Tab number 2"]Tab 2 content goes here.[/efstab]<br/>[efstab title="Tab number 3"]Tab 3 content goes here.[/efstab]<br/>[efstab title="Tab number 4"]Tab 4 content goes here.[/efstab]<br/>[/efstabs]');
                }
            });
        },
        createControl : function(n, cm) {
            return null;
        },
        getInfo : function() {
            return {
                longname : "Tabs Shortcode",
                author : 'Oscitas Themes',
                authorurl : 'http://www.oscitasthemes.com/',
                infourl : 'http://www.oscitasthemes.com/',
                version : "2.0.0"
            };
        }
    });
    tinymce.PluginManager.add('oscitasefstabs', tinymce.plugins.oscitasEFSTabs);
})();
