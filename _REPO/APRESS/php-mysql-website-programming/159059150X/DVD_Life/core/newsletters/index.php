<?php

// File Location: /core/newsletters/index.php

// Template framework file for pages inside of the CMS application
require_once "tpl_secure.php";

// Data object for all newswletter functionality
require_once "class.newsletter.php";

// Instanciate the newsletter object
$oNewsletter = new newsletter;

// Get a limited array of newsletters (Limited for pagination)
$aNewsletters = $oNewsletter->getNewsletters("newsletter_send_status, created_dt DESC", $iCursor);

// Get a total count of all active newsletters used for pagination
$iCnt = $oNewsletter->getNewsletterCount();

// Check for returned records
if (count($aNewsletters)>0) {
    
    // Push newsletter data into the CMS display array
    $i = 0;
    while ($i < count($aNewsletters)) {
        $aData[$i]["Id"] = $aNewsletters[$i]["Newsletter Id"];
        $aData[$i]["Name"] = $aNewsletters[$i]["Subject"];
        $aData[$i]["Status"] = $aNewsletters[$i]["Status"];
        $aData[$i]["Created"] =$aNewsletters[$i]["Created Date"];
        ++$i;
    }
}

// Check for an incoming "id" variable
if ($id) {
    
    // Set the $_iNewsletterId member variable to the current $id
    settype($id, "integer");
    $oNewsletter->setNewsletterId($id);
    
    // If the incoming "op" variable is set to "del" then delete the selected 
    // newsletter.
    if (!strcmp($op, "del")) {
        
        $oNewsletter->deleteNewsletter();
        header("Location: ".SELF);
        
    // If the incoming "op" variable is set to "act" then mark the current
    // newsletter to be sent by the send daemon.
    } elseif (!strcmp($op, "act")) {
        
        $oNewsletter->markToBeSent();
        header("Location: ".SELF);
    
    // If the incoming "op" variable is set to "deact" then mark the current
    // newsletter to not be sent by the send daemon.
    } elseif (!strcmp($op, "deact")) {
        
        $oNewsletter->draftNewsletter();
        header("Location: ".SELF);
    }
}

setHeader();
openPage();

?>

<table width="608" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td colspan="2"><div class="header"><?php print ENTITY ?> Newsletter Administration</div></td>
    </tr>
    <tr>
        <td colspan="2"><div class="copy">To manage newsletters, select a user action from the list below.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
        <td align="right" valign="top"><?php if ($iPerm > 1) { ?><a href="form.php?op=add"><img src="../../_img/buttons/btn_additem.gif" width="58" height="15" alt="" border="0" /></a><?php } ?></td>
    </tr>
</table>

<?php renderList($iCnt, $aData) ?>

<?php closePage(); ?>
