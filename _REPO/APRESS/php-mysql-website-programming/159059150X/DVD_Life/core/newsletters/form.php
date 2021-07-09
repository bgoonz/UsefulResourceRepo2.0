<?php

// File Location: /core/newsletters/form.php

/* Include Required Libraries */

// Template framework file for pages inside of the CMS application
require_once "tpl_secure.php";

// Form handlers used for error reporting and data manipulation
require_once "handlers.php";

// Data object for all newswletter functionality
require_once "class.newsletter.php";

// Instanciate the newsletter object
$oNewsletter = new newsletter;

// Check for in incoming newsletter id
if ($id) {
    
    // Set the current newsletter id member variable
    settype($id, "integer");
    $oNewsletter->setNewsletterId($id);
}

// Check for posted data
if ($_POST) {
    
    // If an item is being updated, get the origional item to check the current
    // send status of the item.  If the newsletter has been sent, then we need 
    // to make sure that it is locked for editing.
    $aCheckNewsletter = $oNewsletter->getNewsletter();
    
    // Set page variables from posted values
    $sSubject = $_POST["subject"];
    $sBodyText = $_POST["body_text"];
    $sBodyHTML = $_POST["body_html"];
    $sSend = strtotime($_POST["send"]);
    
    // Error Reporting - Check for valid subject
    if (!strcmp("",$sSubject)) {
        catchErr("Enter a Subject");
        $FORMOK = false;
    }
    
    // Error Reporting - Check for valid body
    if (!strcmp("",$sBodyText)) {
        catchErr("Enter Body Text");
        $FORMOK = false;
    }
    
    // If there are no errors, then continue with the process
    if ($FORMOK) {
        
        // Fill the argument array that will be passed to the object method
        $aArgs["User Id"] = $iUserId;
        $aArgs["Subject"] = $sSubject;
        $aArgs["Body Text"] = $sBodyText;
        $aArgs["Body HTML"] = $sBodyHTML;
        $aArgs["Send"] = $sSend;
        
        // If we are updating a record than use the updateNewsletter method
        if (!strcmp("edit", $op)) {

            if($aCheckNewsletter["Send Status Int"]==0) {
 
                $FORMOK = $oNewsletter->updateNewsletter($aArgs);
            } else {

                $FORMOK = true;
            }
        
        // If we are adding a record than use the addNewsletter method
        } elseif (!strcmp("add", $op)) {
            
            $FORMOK = $oNewsletter->addNewsletter($aArgs);
        }
        
        // If the page has still come across no errors then finish up the 
        // page logic
        if ($FORMOK) {
            
            // If the "Send Test" checkbox has been checked, then email a copy
            // of the message to the webmaster admin user.
            if(!strcmp("1",$_POST["send_test"])) {
                $aUser = $oSess->getUser($iUserId);
                $oNewsletter->sendTest($aUser["Email"]);
            }
            
            // Forward the user to the newsletter list page
            header("Location: index.php");
        }
    }
    
// Do the following if no posted data is detected
} else {
    
    // Set the send date to now
    $sSend = time();
    
    // If no posted data is found and we are trying to edit a newsletter, then
    // fetch the newsletter that we are trying to edit and fill the page vars
    if (!strcmp("edit", $op)) {
        
        $aNewsletter = $oNewsletter->getNewsletter();
        $sSubject = $aNewsletter["Subject"];
        $sBodyText = $aNewsletter["Body Text"];
        $sBodyHTML = $aNewsletter["Body HTML"];
        $sSend = $aNewsletter["Send"];
    }
    
}

// Get all apps that the user has access to (CMS menu system)
$aApps = $oSess->getApps();

setHeader();
openPage();


// The HTML of our page will display a form that will be populated by the page
// variables that we have defined throughout the application.
?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY ?> Newsletter Administration</div></td>
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
        <td><div class="formlabel">Subject:</div></td>
        <td><input type="text" name="subject" value="<?php print clean($sSubject) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td valign="top"><div class="formlabel">Body Text:</div></td>
        <td><textarea name="body_text" rows="18" cols="39" wrap="virtual" class="textarea"><?php print($sBodyText); ?></textarea></td>
    </tr>
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td valign="top"><div class="formlabel">Body HTML:</div></td>
        <td><textarea name="body_html" rows="18" cols="39" wrap="virtual" class="textarea"><?php print($sBodyHTML); ?></textarea></td>
    </tr>
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Send Date:</div></td>
        <td><input type="text" name="send" value="<?php print date("Y-m-d H:i:s", $sSend) ?>" class="textfield" /></td>
    </tr>
    <?php if (strcmp($aNewsletter["Send Status"], "")) { ?>
    <tr>
        <td><div class="formlabel">Send Status:</div></td>
        <td><?php print clean($aNewsletter["Send Status"]) ?></td>
    </tr>
    <?php } ?>
    <?php if (strcmp($aNewsletter["Sent"], "")) { ?>
    <tr>
        <td><div class="formlabel">Sent Date:</div></td>
        <td><?php print clean(date("Y-m-d H:i:s",$aNewsletter["Sent"])) ?></td>
    </tr>
    <?php } ?>
    <?php if (strcmp($aNewsletter["Completed"], "")) { ?>
    <tr>
        <td><div class="formlabel">Completed Date:</div></td>
        <td><?php print clean(date("Y-m-d H:i:s",$aNewsletter["Completed"])) ?></td>
    </tr>
    <?php } ?>
    <?php if (strcmp($aNewsletter["Recipients"], "")) { ?>
    <tr>
        <td><div class="formlabel">Recipients:</div></td>
        <td><?php print clean($aNewsletter["Recipients"]) ?></td>
    </tr>
    <?php } ?>
    <tr>
        <td><div class="formlabel">Send Test:</div></td>
        <td><input type="checkbox" name="send_test" value="1" /></td>
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
