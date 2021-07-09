<?php

// File Location: /site/accounts/prefs.php

require_once("tpl_unsecure.php");
require_once("class.accounts.php");
require_once("handlers.php");

// instantiate account class
$oAccounts = new accounts;

// validate account session
$oAccounts->validateSession() ? $aSess = $oAccounts->getSession() : header("Location: index.php");

// set account id
$iAccountId = (int) $aSess["Account Id"];
$oAccounts->setAccountId($iAccountId);

if ($_POST) { // check for http post vars
    
    // assign post vars
    $iRecipient = $_POST["recipient"];
    $sFormat = $_POST["format"];
    
    // assign array values
    $aArgs["Newsletter Recipient"] = $iRecipient;
    
    // try account preferences update
    $FORMOK = $oAccounts->updatePreferences($aArgs);
    
} else { // post vars not sent
    
    // initialize page vars
    $aPrefs = $oAccounts->getPreferences();
    
    // check for values
    if (is_array($aPrefs)) {
        
        // assign page values
        $iRecipient = $aPrefs["Newsletter Recipient"];
        
    } else {
        
        // assign page values
        $iRecipient = 1;
        $sFormat = "text";
    }
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
        <td><div class="header"><?php print ENTITY ?> Manage My Account Preferences</div></td>
    </tr>
    <tr>
        <td><div class="copy">To update your account preferences, please complete
        the form below.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
    </tr>
</table>

<form action="<?php print SELF ?>" method="post" name="wroxform">
<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="formlabel">Would you like to receive the <?php print ENTITY ?> newsletter?</div></td>
        <td>
            <input type="radio" name="recipient" value="1"<?php $iRecipient ? print " checked" : print ""; ?> /> Yes&nbsp;
            <input type="radio" name="recipient" value="0"<?php !$iRecipient ? print " checked" : print ""; ?> /> No
        </td>
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
