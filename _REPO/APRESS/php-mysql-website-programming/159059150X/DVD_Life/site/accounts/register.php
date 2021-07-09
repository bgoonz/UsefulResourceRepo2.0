<?php

// File Location: /site/accounts/register.php

require_once("tpl_unsecure.php");
require_once("class.accounts.php");
require_once("handlers.php");

if ($_POST) { // check for http post vars
    
    // assign post vars
    $sScreenName = $_POST["screenname"];
    $sEmail = $_POST["email"];
    $sPass = $_POST["pass"];
    $sConfirm = $_POST["confirm"];
    
    // validate user name
    if (!validUser($sScreenName)) {
        
        catchErr("Enter a valid screen name");
        $FORMOK = false;
    }
    
    // validate email address
    if (!validEmail($sEmail)) {
        
        catchErr("Enter a valid email address");
        $FORMOK = false;
    }
    
    // validate user password
    if (!validPass($sPass)) {
        
        catchErr("Enter a valid password");
        $FORMOK = false;
        
    } else {
        
        if (strcmp($sPass, $sConfirm)) {
            
            catchErr("Your password and password confirmation do not match");
            $FORMOK = false;
        }
    }
    
    // if forms variables validated
    if ($FORMOK) {
        
        // assign array values
        $aArgs["Screen Name"] = $sScreenName;
        $aArgs["Email"] = $sEmail;
        $aArgs["Password"] = $sPass;
        
        $oAccounts = new accounts;
        
        // try account add and redirect
        if ($FORMOK = $oAccounts->addAccount($aArgs)) {
            
            header("Location: manage.php");
        }
    }
    
} else { // post vars not sent
    
    // initialize page vars
    $sScreenName = null;
    $sEmail = null;
}

setHeader();
openPage(true);

?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY ?> Account Registration</div></td>
    </tr>
    <tr>
        <td><div class="copy">To register for a <?php print ENTITY ?> account, 
        please complete the form below.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
    </tr>
</table>

<form action="<?php print SELF ?>" method="post" name="wroxform">
<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="formlabel">Screen Name:</div></td>
        <td><input type="text" name="screenname" value="<?php print clean($sScreenName) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Email Address:</div></td>
        <td><input type="text" name="email" value="<?php print clean($sEmail) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Password:</div></td>
        <td><input type="password" name="pass" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Confirm:</div></td>
        <td><input type="password" name="confirm" class="textfield" /></td>
    </tr>
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td align="right" colspan="2"><input type="image" src="../../_img/buttons/btn_submit.gif" width="58" height="15" alt="" border="0" onfocus="this.blur();" /></td>
    </tr>
    <tr>
        <td colspan="2"><a href="index.php">Return to login?</a></td>
    </tr>
</table>
</form>

<?php closePage(); ?>
