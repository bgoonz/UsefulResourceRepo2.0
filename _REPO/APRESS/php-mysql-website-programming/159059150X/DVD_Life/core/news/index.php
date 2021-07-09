<?php

// File Location: /core/news/index.php

require_once("tpl_secure.php");
require_once("class.news.php");

// instantiate news class
$oNews = new news;

// get users and user count
$aNews = $oNews->getNewsItems("created_dt desc", $iCursor);
$iCnt = $oNews->getNewsCount();

// check for users
if (count($aNews)) {
    
    // build page data array
    $i = 0;
    while ($i < count($aNews)) {
        $aData[$i]["Id"] = $aNews[$i]["News Id"];
        $aData[$i]["Name"] = $aNews[$i]["Title"];
        $aData[$i]["Status"] = $aNews[$i]["Status"];
        $aData[$i]["Created"] =$aNews[$i]["Created Date"];
        ++$i;
    }
}

// check for id
if ($id) {
    
    // assign News id
    $oNews->setNewsId($id);
    
    // check operation type
    if (!strcmp($op, "del")) {
        
        // try delete news and redirect
        $oNews->deleteNews();
        header("Location: ".SELF);
        
    } elseif (!strcmp($op, "act")) {
        
        // try activate news and redirect
        $oNews->activateNews();
        header("Location: ".SELF);
        
    } elseif (!strcmp($op, "deact")) {
        
        // try deactivate news and redirect
        $oNews->deactivateNews();
        header("Location: ".SELF);
    }
}

setHeader();
openPage();

?>

<table width="608" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td colspan="2"><div class="header"><?php print ENTITY ?> Newsfeed Administration</div></td>
    </tr>
    <tr>
        <td colspan="2"><div class="copy">To manage news, select a news action from the list below.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
        <td align="right" valign="top"><?php if ($iPerm > 1) { ?><a href="form.php?op=add"><img src="../../_img/buttons/btn_additem.gif" width="58" height="15" alt="" border="0" /></a><?php } ?></td>
    </tr>
</table>

<?php renderList($iCnt, $aData) ?>

<?php closePage(); ?>
