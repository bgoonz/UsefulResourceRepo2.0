<?php

// File Location: /core/settings/index.php

require_once("tpl_secure.php");
require_once("handlers.php");

// the session class is instantiated in the tpl_secure.php file

if ($_POST) { // check for http post vars
    
    // assign post vars
    $sEmail = $_POST["email"];
    $sPass = $_POST["pass"];
    $sConfirm = $_POST["confirm"];
    
    // validate user email
    if (!validEmail($sEmail)) {
        
        catchErr("Enter a valid email address");
        $FORMOK = false;
    }
    
    // validate user password
    if (strcmp("", $sPass)) {
        
        if (strcmp($sPass, $sConfirm)) {
            
            catchErr("Your password and confirmation do not match");
            $FORMOK = false;
            
        } else {
            
            if (!validPass($sPass)) {
                
                catchErr("Enter a valid password");
                $FORMOK = false;
            }
        }
    }
    
    // if forms variables validated
    if ($FORMOK) {
        
        // assign array values
        $aArgs["User Name"] = $aSess[1];
        $aArgs["Password"] = $sPass;
        $aArgs["Email"] = $sEmail;
        
        // try update settings and redirect
        $oSess->updateSettings($aArgs);
        header("Location: ".SELF);
    }
    
} else { // post vars not sent
    
    // initialize page vars
    $aUser = $oSess->getUser();
    $sEmail = $aUser["Email"];
}

setHeader();
openPage();

?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY ?> Settings Administration</div></td>
    </tr>
    <tr>
        <td><div class="copy">To change your account settings, please complete the form below.<br>
        If you change your password you will be required to log in again.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
    </tr>
</table>

<form action="<?php print SELF ?>" method="post" name="wroxform">
<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="formlabel">User Name:</div></td>
        <td><?php print $aSess[1] ?></td>
    </tr>
    <tr>
        <td><div class="formlabel">Email:</div></td>
        <td><input type="text" name="email" value="<?php print $sEmail ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">New Password:</div></td>
        <td><input type="password" name="pass" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Confirm Password:</div></td>
        <td><input type="password" name="confirm" class="textfield" /></td>
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
