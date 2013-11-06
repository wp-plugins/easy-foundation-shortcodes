
/**
 * Created with JetBrains PhpStorm.
 * User: oscitas
 * Date: 23/10/13
 * Time: 9:34 AM
 * To change this template use File | Settings | File Templates.
 */

if (typeof(osCitasGlobalVar) != 'udefined' && osCitasGlobalVar) jQuery(document).foundation();

function open_dialogue(content,width,height){
    if(typeof(width)==='undefined') width = 'auto';
    if(typeof(height)==='undefined') height = 'auto';
    jQuery( content ).dialog({
        dialogClass : 'wp-dialog',
        autoOpen: true,
        height: height,
        width: width,
        modal: true
    });

}