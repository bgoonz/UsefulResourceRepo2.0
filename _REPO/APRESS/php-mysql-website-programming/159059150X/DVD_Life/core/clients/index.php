<?php

// File Location: /core/clients/index.php

require_once("tpl_secure.php");
require_once("class.ads.php");

// instantiate ads class
$oAds = new ads;

// get users and user count
$aClients = $oAds->getClients("created_dt desc", $iCursor);
$iCnt = $oAds->getClientsCount();

// check for users
if (count($aClients)) {
    
    // build page data array
    $i = 0;
    while ($i < count($aClients)) {
        $aData[$i]["Id"] = $aClients[$i]["Client Id"];
        $aData[$i]["Name"] = $aClients[$i]["Client"];
        $aData[$i]["Status"] = $aClients[$i]["Status"];
        $aData[$i]["Created"] =$aClients[$i]["Created Date"];
        ++$i;
    }
}

// check for id
if ($id) {
    
    // assign unique id
    $oAds->setId($id);
    
    // check operation type
    if (!strcmp($op, "del")) {
        
        // try delete client and redirect
        $oAds->deleteClient();
        header("Location: ".SELF);
        
    } elseif (!strcmp($op, "act")) {
        
        // try activate client and redirect
        $oAds->activateClient();
        header("Location: ".SELF);
        
    } elseif (!strcmp($op, "deact")) {
        
        // try deactivate client and redirect
        $oAds->deactivateClient();
        header("Location: ".SELF);
    }
}

setHeader();
openPage();

?>

<table width="608" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td colspan="2"><div class="header"><?php print ENTITY ?> Clients Administration</div></td>
    </tr>
    <tr>
        <td colspan="2"><div class="copy">To manage clients, select a client action from the list below.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
        <td align="right" valign="top"><?php if ($iPerm > 1) { ?><a href="form.php?op=add"><img src="../../_img/buttons/btn_additem.gif" width="58" height="15" alt="" border="0" /></a><?php } ?></td>
    </tr>
</table>

<?php renderList($iCnt, $aData) ?>

<?php closePage(); ?>
