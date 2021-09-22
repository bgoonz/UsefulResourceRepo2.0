<?php

/* COPYRIGHT NOTICE
This software is copyright ©2002 Cuban Council™ and licensed for use by distribution from Cuban Council™ only.
This source code may not be redistibuted without written consent from the above mentioned entity. */

require_once("tpl_secure.php");
require_once("handlers.php");

if ($POSTED) {
    
    
    
    if ($FORMOK) {
        
        
    }
    
} else {
    
    
}

setHeader();
openPage();

?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY ?> Forums Administration</div></td>
    </tr>
    <tr>
        <td><div class="copy">To <?php print $op ?> this item in the system, please complete the form below.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
    </tr>
</table>

<form action="<?php print SELF ?>?op=<?php print $op ?>&id=<?php print $id ?>" method="post" name="wroxform">
<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="formlabel">Label:</div></td>
        <td><input type="text" name="element" value="<?php print $sVal ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td align="right" colspan="2"><input type="image" src="../../_img/buttons/btn_submit.gif" width="58" height="15" alt="" border="0" onfocus="this.blur();" /></td>
    </tr>
</table>
</form>

<?php closePage(); ?>
