<?php

// File Location: /core/ads/index.php

require_once("tpl_secure.php");
require_once("class.ads.php");

// instantiate ads class
$oAds = new ads;

// get users and user count
$aAds = $oAds->getAds("created_dt desc", $iCursor);
$iCnt = $oAds->getAdsCount();

// check for users
if (count($aAds)) {
    
    // build page data array
    $i = 0;
    while ($i < count($aAds)) {
        $aData[$i]["Id"] = $aAds[$i]["Ad Id"];
        $aData[$i]["Name"] = $aAds[$i]["Title"];
        $aData[$i]["Status"] = $aAds[$i]["Status"];
        $aData[$i]["Created"] =$aAds[$i]["Created Date"];
        ++$i;
    }
}

// check for id
if ($id) {
    
    // assign unique id
    $oAds->setId($id);
    
    // check operation type
    if (!strcmp($op, "del")) {
        
        // try delete ad and redirect
        $oAds->deleteAd();
        header("Location: ".SELF);
        
    } elseif (!strcmp($op, "act")) {
        
        // try activate ad and redirect
        $oAds->activateAd();
        header("Location: ".SELF);
        
    } elseif (!strcmp($op, "deact")) {
        
        // try deactivate ad and redirect
        $oAds->deactivateAd();
        header("Location: ".SELF);
    }
}

setHeader();
openPage();

?>

<table width="608" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td colspan="2"><div class="header"><?php print ENTITY ?> Advertisements Administration</div></td>
    </tr>
    <tr>
        <td colspan="2"><div class="copy">To manage advertisements, select an advertisement action from the list below.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
        <td align="right" valign="top"><?php if ($iPerm > 1) { ?><a href="form.php?op=add"><img src="../../_img/buttons/btn_additem.gif" width="58" height="15" alt="" border="0" /></a><?php } ?></td>
    </tr>
</table>

<?php renderList($iCnt, $aData) ?>

<?php closePage(); ?>
