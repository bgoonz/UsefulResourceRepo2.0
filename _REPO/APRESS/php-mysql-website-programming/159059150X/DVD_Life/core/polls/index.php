<?php

// File Location: /core/polls/index.php

require_once("tpl_secure.php");
require_once("class.polls.php");

// instantiate polls class
$oPolls = new polls;

// get users and user count
$aPolls = $oPolls->getPolls("created_dt desc", $iCursor);
$iCnt = $oPolls->getPollsCount();

// check for users
if (count($aPolls)) {
    
    // build page data array
    $i = 0;
    while ($i < count($aPolls)) {
        $aData[$i]["Id"] = $aPolls[$i]["Poll Id"];
        $aData[$i]["Name"] = $aPolls[$i]["Question"];
        $aData[$i]["Status"] = $aPolls[$i]["Status"];
        $aData[$i]["Created"] =$aPolls[$i]["Created Date"];
        ++$i;
    }
}

// check for id
if ($id) {
    
    // assign News id
    $oPolls->setPollId($id);
    
    // check operation type
    if (!strcmp($op, "del")) {
        
        // try delete poll and redirect
        $oPolls->deletePoll();
        header("Location: ".SELF);
        
    } elseif (!strcmp($op, "act")) {
        
        // try activate poll and redirect
        $oPolls->activatePoll();
        header("Location: ".SELF);
        
    } elseif (!strcmp($op, "deact")) {
        
        // try deactivate poll and redirect
        $oPolls->deactivatePoll();
        header("Location: ".SELF);
    }
}

setHeader();
openPage();

?>

<table width="608" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td colspan="2"><div class="header"><?php print ENTITY ?> Polls Administration</div></td>
    </tr>
    <tr>
        <td colspan="2"><div class="copy">To manage polls, select a poll action from the list below.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
        <td align="right" valign="top"><?php if ($iPerm > 1) { ?><a href="form.php?op=add"><img src="../../_img/buttons/btn_additem.gif" width="58" height="15" alt="" border="0" /></a><?php } ?></td>
    </tr>
</table>

<?php renderList($iCnt, $aData) ?>

<?php closePage(); ?>
