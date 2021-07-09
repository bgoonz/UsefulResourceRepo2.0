<?php

// File Location: /core/users/form.php

require_once("tpl_secure.php");
require_once("handlers.php");
require_once("class.users.php");

// instantiate news class
$oUsers = new users;

// check for id
if ($id) {
    
    // assign user id
    $oUsers->setUserId($id);
}

if ($_POST) { // check for http post vars
    
    // assign post vars
    $sUser = $_POST["user"];
    $sEmail = $_POST["email"];
    $iReset = $_POST["reset"];
    $aPerms = $_POST["perms"];
    
    // validate user name
    if (!validUser($sUser)) {
        
        catchErr("Enter a valid user name");
        $FORMOK = false;
    }
    
    // validate user email
    if (!validEmail($sEmail)) {
        
        catchErr("Enter a valid email address");
        $FORMOK = false;
    }
    
    // validate permissions array
    if (!array_sum($aPerms)) {
        
        catchErr("Select at least one permission");
        $FORMOK = false;
    }
    
    // if forms variables validated
    if ($FORMOK) {
        
        // assign array values
        $aArgs["User Name"] = $sUser;
        $aArgs["Email"] = $sEmail;
        $aArgs["Reset"] = $iReset;
        $aArgs["Perms"] = $aPerms;
        
        // check operation type
        if (!strcmp("edit", $op)) {
            
            // try edit user
            $FORMOK = $oUsers->editUser($aArgs);
            
        } elseif (!strcmp("add", $op)) {
            
            // try add user
            $FORMOK = $oUsers->addUser($aArgs);
        }
        
        // redirect if successful
        if ($FORMOK) {
            
            header("Location: index.php");
        }
    }
    
} else { // post vars not sent
    
    // initialize page vars
    $sUser = null;
    $sEmail = null;
    $iReset = 0;
    
    if (!strcmp("edit", $op)) {
        
        $aUser = $oUsers->getUser();
        $aPerms = $aUser["Perms"];
        $sUser = $aUser["User Name"];
        $sEmail = $aUser["Email"];
    }
   
}

$aApps = $oSess->getApps();

setHeader();
openPage();

?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY ?> User Administration</div></td>
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
        <td><div class="formlabel">User Name:</div></td>
        <td><input type="text" name="user" value="<?php print clean($sUser) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Email:</div></td>
        <td><input type="text" name="email" value="<?php print clean($sEmail) ?>" class="textfield" /></td>
    </tr>
    <?php if (!strcmp("edit", $op)) { ?>
    <tr>
        <td><div class="formlabel">Reset Password:</div></td>
        <td><input type="checkbox" name="reset" value="1" <?php $iReset ? print " checked" : print ""; ?>/></td>
    </tr>
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Created:</div></td>
        <td><?php print date("Y-m-d H:i:s", $aUser["Created Date"]) ?></td>
    </tr>
    <tr>
        <td><div class="formlabel">Modified:</div></td>
        <td><?php print date("Y-m-d H:i:s", $aUser["Modified Date"]) ?></td>
    </tr>
    <tr>
        <td><div class="formlabel">Last Login:</div></td>
        <td><?php print date("Y-m-d H:i:s", $aUser["Login Date"]) ?></td>
    </tr>
    <tr>
        <td><div class="formlabel">Last IP:</div></td>
        <td><?php print clean($aUser["Login Address"]) ?></td>
    </tr>
    <tr>
        <td><div class="formlabel">Last Host:</div></td>
        <td><?php print clean($aUser["Login Host"]) ?></td>
    </tr>
    <?php } ?>
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php
    if (count($aApps)) {
        $i = 0;
        while ($i < count($aApps)) {
            $iAppId = $aApps[$i]["App Id"];
    ?>
    <tr>
        <td><div class="formlabel"><?php print clean($aApps[$i]["App Name"]) ?>:</div></td>
        <td>
        
        <table border="0" cellpadding="3" cellspacing="0">
            <tr>
                <td><input type="radio" name="perms[<?php print $iAppId ?>]<?php print $iAppId ?>" value="3"<?php !strcmp(3, $aPerms[$iAppId]) ? print "checked" : print ""; ?>>Manage&nbsp;</td>
                <td><input type="radio" name="perms[<?php print $iAppId ?>]<?php print $iAppId ?>" value="2"<?php !strcmp(2, $aPerms[$iAppId]) ? print "checked" : print ""; ?>>Create&nbsp;</td>
                <td><input type="radio" name="perms[<?php print $iAppId ?>]<?php print $iAppId ?>" value="1"<?php !strcmp(1, $aPerms[$iAppId]) ? print "checked" : print ""; ?>>View&nbsp;</td>
                <td><input type="radio" name="perms[<?php print $iAppId ?>]<?php print $iAppId ?>" value="0"<?php !$aPerms[$iAppId] ? print "checked" : print ""; ?>>No Access&nbsp;</td>
            </tr>
        </table>
        
        </td>
    </tr>
    <?php
            ++$i;
        }
    }
    ?>
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td align="right" colspan="2"><input type="image" src="../../_img/buttons/btn_submit.gif" width="58" height="15" alt="" border="0" onfocus="this.blur();" /></td>
    </tr>
</table>
</form>

<?php closePage(); ?>
