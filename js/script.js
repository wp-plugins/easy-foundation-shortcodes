
/**
 * Created with JetBrains PhpStorm.
 * User: oscitas
 * Date: 23/10/13
 * Time: 9:34 AM
 * To change this template use File | Settings | File Templates.
 */
jQuery(window).load(function() {
    if (typeof osCitasGlobalVar != 'undefined' && osCitasGlobalVar){
        jQuery(document).foundation();
    }
});