<?php

// File Location: /site/accounts/manage.php

require_once("tpl_unsecure.php");
require_once("class.accounts.php");
require_once("handlers.php");

// instantiate accounts class
$oAccounts = new accounts;

// validate account session
$oAccounts->validateSession() ? $aSess = $oAccounts->getSession() : header("Location: index.php");

if ($_POST) { // check for http post vars
    
    // assign post vars
    $sEmail = $_POST["email"];
    $sPass = $_POST["pass"];
    $sConfirm = $_POST["confirm"];
    
    // validate email address
    if (!validEmail($sEmail)) {
        
        catchErr("Enter a valid email address");
        $FORMOK = false;
    }
    
    // validate user password
    if (strcmp("", $sPass)) {
        
        // validate password
        if (!validPass($sPass)) {
            
            catchErr("Enter a valid password");
            $FORMOK = false;
            
        } elseif (strcmp($sPass, $sConfirm)) {
            
            catchErr("Your password and confirmation do not match");
            $FORMOK = false;
        }
    }
    
    // if forms variables validated
    if ($FORMOK) {
        
        // assign array values
        $aArgs["Email"] = $sEmail;
        $aArgs["Password"] = $sPass;
        
        // try account update and redirect
        if ($FORMOK = $oAccounts->updateAccount($aArgs)) {
            
            header("Location: ".SELF);
        }
    }
    
} else { // post vars not sent
    
    // initialize page vars
    $sScreenName = $aSess["Screen Name"];
    $sEmail = $aSess["Email"];
}

setHeader();
openPage(true);

?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td>
            <a href="manage.php">My Settings</a> |
            <a href="prefs.php">My Preferences</a> |
            <a href="shipping.php">My Shipping Info</a> |
            <a href="orders.php">My Orders</a>
        </td>
    </tr>
    <tr>
        <td class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
</table>

<br />

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY ?> Manage My Account Settings</div></td>
    </tr>
    <tr>
        <td><div class="copy">To update your account settings, please comlete
        the form below. For security reasons, any changes that you make will 
        require you to log in again with a new user account session.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
    </tr>
</table>

<form action="<?php print SELF ?>" method="post" name="wroxform">
<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="formlabel">Screen Name:</div></td>
        <td><?php print format($sScreenName) ?></td>
    </tr>
    <tr>
        <td><div class="formlabel">Email Address:</div></td>
        <td><input type="text" name="email" value="<?php print clean($sEmail) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">New Password:</div></td>
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
</table>
</form>

<?php closePage(); ?>
