<?php

// File Location: /core/clients/form.php

require_once("tpl_secure.php");
require_once("handlers.php");
require_once("class.ads.php");

// instantiate ads class
$oAds = new ads;

// check for id
if ($id) {
    
    // assign unique id
    $oAds->setId($id);
}

if ($_POST) { // if form was posted
    
    // assign page variables
    $sClient = $_POST["client"];
    $sContact = $_POST["contact"];
    $sEmail = $_POST["email"];
    $sPhone = $_POST["phone"];
        
    // validate client name
    if (!validInput($_POST["client"], 1, 100)) {
        
        catchErr("Enter a client name");
        $FORMOK = false;
    }
    
    // validate client contact
    if (!validInput($sContact, 1, 100)) {
        
        catchErr("Enter a client contact name");
        $FORMOK = false;
    }
    
    // validate client contact email
    if (!validEmail($sEmail)) {
        
        catchErr("Enter a client contact email address");
        $FORMOK = false;
    }
    
    // validate client contact phone
    if (!validInput($sPhone, 1, 20)) {
        
        catchErr("Enter a client contact phone number");
        $FORMOK = false;
    }
    
    if ($FORMOK) { // form vlaidated ok
        
        // assign item values
        $aArgs["Client"]["Name"] = $sClient;
        $aArgs["Client"]["Contact"] = $sContact;
        $aArgs["Client"]["Email"] = $sEmail;
        $aArgs["Client"]["Phone"] = $sPhone;
        
        // check operation type
        if (!strcmp("edit", $op)) {
            
            // try edit ad
            $FORMOK = $oAds->editClient($aArgs);
            
        } elseif (!strcmp("add", $op)) {
            
            // try add ad
            $FORMOK = $oAds->addClient($aArgs);
        }
        
        // redirect if successful
        if ($FORMOK) {
            
            // redirect if successful
            header("Location: index.php");
        }
    }
    
} else {
    
    // initialize page vars
    if (!strcmp("edit", $op)) {
        
        // get ad
        $aClient = $oAds->getClient();
        
        // initialize page variables
        $sClient = $aClient["Name"];
        $sContact = $aClient["Contact"];
        $sEmail = $aClient["Email"];
        $sPhone = $aClient["Phone"];
    }
}

setHeader();
openPage();

?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY ?> Clients Administration</div></td>
    </tr>
    <tr>
        <td><div class="copy">To <?php print $op ?> this item in the system, please complete the form below.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
    </tr>
</table>

<form action="<?php print SELF ?>?op=<?php print $op ?>&id=<?php print $id ?>" method="post" name="wroxform" enctype="multipart/form-data">
<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="formlabel">Client Name:</div></td>
        <td><input type="text" name="client" value="<?php print clean($sClient) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Client Contact:</div></td>
        <td><input type="text" name="contact" value="<?php print clean($sContact) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Contact Email:</div></td>
        <td><input type="text" name="email" value="<?php print clean($sEmail) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Contact Phone:</div></td>
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
