<?php

// File Location: /core/users/index.php

require_once("tpl_secure.php");

// the session class is instantiated in the tpl_secure.php file

// get users and user count
$aUsers = $oSess->getUsers("created_dt desc", $iCursor);
$iCnt = $oSess->getUsersCount();

// check for users
if (count($aUsers)) {
    
    // build page data array
    $i = 0;
    while ($i < count($aUsers)) {
        $aData[$i]["Id"] = $aUsers[$i]["User Id"];
        $aData[$i]["Name"] = $aUsers[$i]["User Name"];
        $aData[$i]["Status"] = $aUsers[$i]["Status"];
        $aData[$i]["Created"] =$aUsers[$i]["Created Date"];
        ++$i;
    }
}

// check for id
if ($id) {
    
    // assign user id
    $oSess->setUserId($id);
    
    // check operation type
    if (!strcmp($op, "del")) {
        
        // try delete user and redirect
        $oSess->deleteUser();
        header("Location: ".SELF);
        
    } elseif (!strcmp($op, "act")) {
        
        // try activate user and redirect
        $oSess->activateUser();
        header("Location: ".SELF);
        
    } elseif (!strcmp($op, "deact")) {
        
        // try deactivate user and redirect
        $oSess->deactivateUser();
        header("Location: ".SELF);
    }
}

setHeader();
openPage();

?>

<table width="608" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td colspan="2"><div class="header"><?php print ENTITY ?> User Administration</div></td>
    </tr>
    <tr>
        <td colspan="2"><div class="copy">To manage users, select a user action from the list below.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
        <td align="right" valign="top"><?php if ($iPerm > 1) { ?><a href="form.php?op=add"><img src="../../_img/buttons/btn_additem.gif" width="58" height="15" alt="" border="0" /></a><?php } ?></td>
    </tr>
</table>

<?php renderList($iCnt, $aData) ?>

<?php closePage(); ?>
