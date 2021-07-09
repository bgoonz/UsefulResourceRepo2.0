<?php

// File Location: /site/accounts/shipping.php

require_once("tpl_unsecure.php");
require_once("class.accounts.php");
require_once("handlers.php");

// instantiate accounts class
$oAccounts = new accounts;

// validate accounts session
$oAccounts->validateSession() ? $aSess = $oAccounts->getSession() : header("Location: index.php");

// set account id
$iAccountId = (int) $aSess["Account Id"];
$oAccounts->setAccountId($iAccountId);

if ($_POST) { // check for http post vars
    
    // assign post vars
    $op = $_POST["op"];
    $sName = $_POST["name"];
    $sCompany = $_POST["company"];
    $sStreet = $_POST["street"];
    $sExt = $_POST["ext"];
    $sCity = $_POST["city"];
    $sState = $_POST["state"];
    $sCountry = $_POST["country"];
    $sPostal = $_POST["postal"];
    $sPhone = $_POST["phone"];
    
    // validate name
    if (!validInput($sName, 1, 100)) {
        
        catchErr("Enter a valid name");
        $FORMOK = false;
    }
    
    // validate street
    if (!validInput($sStreet, 1, 100)) {
        
        catchErr("Enter a valid street address");
        $FORMOK = false;
    }
    
    // validate city
    if (!validInput($sCity, 1, 100)) {
        
        catchErr("Enter a valid city");
        $FORMOK = false;
    }
    
    // validate state
    if (!validInput($sState, 1, 100)) {
        
        catchErr("Enter a valid state");
        $FORMOK = false;
    }
    
    // validate country
    if (!validInput($sCountry, 1, 100)) {
        
        catchErr("Enter a valid country");
        $FORMOK = false;
    }
    
    // validate postal
    if (!validInput($sPostal, 1, 15)) {
        
        catchErr("Enter a valid postal code");
        $FORMOK = false;
    }
    
    // validate phone
    if (!validInput($sPhone, 1, 20)) {
        
        catchErr("Enter a valid phone number");
        $FORMOK = false;
    }
    
    if ($FORMOK) {
        
        // assign array values
        $aArgs["Operation"] = $op;
        $aArgs["Name"] = $sName;
        $aArgs["Company"] = $sCompany;
        $aArgs["Street"] = $sStreet;
        $aArgs["Street Ext"] = $sExt;
        $aArgs["City"] = $sCity;
        $aArgs["State"] = $sState;
        $aArgs["Country"] = $sCountry;
        $aArgs["Postal"] = $sPostal;
        $aArgs["Phone"] = $sPhone;
        
        // try account address update
        $FORMOK = $oAccounts->updateAccountAddress($aArgs);
    }
    
} else { // post vars not sent
    
    // initialize page vars
    $aAddress = $oAccounts->getAccountAddress();
    
    if (is_array($aAddress)) {
        
        $op = "edit";
        $sName = $aAddress["Address Name"];
        $sCompany = $aAddress["Address Company"];
        $sStreet = $aAddress["Address Street"];
        $sExt = $aAddress["Address Street Ext"];
        $sCity = $aAddress["Address City"];
        $sState = $aAddress["Address State"];
        $sCountry = $aAddress["Address Country"];
        $sPostal = $aAddress["Address Postal"];
        $sPhone = $aAddress["Address Phone"];
        
    } else {
        
        $op = "add";
        $sName = null;
        $sCompany = null;
        $sStreet = null;
        $sExt = null;
        $sCity = null;
        $sState = null;
        $sCountry = null;
        $sPostal = null;
        $sPhone = null;
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
        <td><div class="header"><?php print ENTITY ?> Manage My Account Shipping Information</div></td>
    </tr>
    <tr>
        <td><div class="copy">To update your account shipping information, 
        please complete the form below.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
    </tr>
</table>

<form action="<?php print SELF ?>" method="post" name="wroxform">
<input type="hidden" name="op" value="<?php print $op ?>">
<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="formlabel">Name:</div></td>
        <td><input type="text" name="name" value="<?php print clean($sName) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Company:</div></td>
        <td><input type="text" name="company" value="<?php print clean($sCompany) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Street:</div></td>
        <td><input type="text" name="street" value="<?php print clean($sStreet) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Suite/Apt:</div></td>
        <td><input type="text" name="ext" value="<?php print clean($sExt) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">City:</div></td>
        <td><input type="text" name="city" value="<?php print clean($sCity) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">State:</div></td>
        <td><input type="text" name="state" value="<?php print clean($sState) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Country:</div></td>
        <td><input type="text" name="country" value="<?php print clean($sCountry) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Postal Code:</div></td>
        <td><input type="text" name="postal" value="<?php print clean($sPostal) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Phone:</div></td>
        <td><input type="text" name="phone" value="<?php print clean($sPhone) ?>" class="textfield" /></td>
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
