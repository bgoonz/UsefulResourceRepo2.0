<?php

// Page Location: /site/polls/index.php

require_once("tpl_unsecure.php");
require_once("class.polls.php");

// instantiate polls class
$oPolls = new polls;

// get poll data
$aPoll = $oPolls->getActivePolls($iCursor);
$iCnt = $oPolls->getPollsCount(true);

if ($_POST) {
    
    // assign poll member variables and add vote
    $iPollId = (int) $_POST["pollid"];
    $oPolls->setPollId($iPollId);
    $iVote = (int) $_POST["vote"];
    $oPolls->setAnswerId($iVote);
    $oPolls->addVote();
    header("Location: ".SELF);
}

setHeader();
openPage(true);

?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY ?> Survey</div></td>
    </tr>
    <tr>
        <td><div class="copy">Cast your vote.</div></td>
    </tr>
</table>

<form action="<?php print SELF ?>?cursor=<?php print $iCursor ?>" method="post" name="wroxform">
<input type="hidden" name="pollid" value="<?php print $aPoll["Poll Id"] ?>">
<table width="608" border="0" cellpadding="0" cellspacing="0">
    <?php if ($iCnt) { // check poll count value ?>
    <tr>
        <td><div class="section"><?php print format($aPoll["Question"]) ?></div></td>
    </tr>
    <tr>
        <td class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td>
        
        <table width="608" border="0" cellpadding="0" cellspacing="0">
        <?php
        $i = 0;
        $sChecked = " checked";
        strcmp($_COOKIE["cPOLL"], $aPoll["Poll Id"]) ? $iVoted = false : $iVoted = true;
        
        while ($i < count($aPoll["Answers"])) { // loop poll answers
        ?>
        <?php if (!$iVoted && $iCursor < 1) { // poll vote check ?>
        <tr>
            <td width="25"><div class="copy"><input type="radio" name="vote" value="<?php print $aPoll["Answers"][$i]["Answer Id"] ?>"<?php print $sChecked ?>></div></td>
            <td width="583"><div class="copy"><?php print format($aPoll["Answers"][$i]["Answer"]) ?></div></td>
        </tr>
        <tr>
            <td colspan="2" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
        </tr>
        <?php
        
        } else { // display results
            
            // assign calculation defaults
            $iPerc = 0;
            $iWidth = 0;
            
            // if the poll total vote count is greater than 0
            if ($aPoll["Vote Count"]) {
                
                // find the percentage
                $iPerc = round($aPoll["Answers"][$i]["Answer Count"] / $aPoll["Vote Count"] * 100, 0);
            }
            
            // multiply the percentage by 5.9 to get a scaled image length
            $iWidth = round(($iPerc * 5.9) - 1, 0);
            
        ?>
        <tr>
            <td><div class="copy"><?php print format($aPoll["Answers"][$i]["Answer"])." ".$iPerc ?>%</div></td>
        </tr>
        <tr>
            <td><img src="../../_img/meter_left.gif" width="5" height="10" alt="" border="0"><img src="../../_img/meter.gif" width="<?php print $iWidth ?>" height="10" alt="" border="0"><img src="../../_img/meter_right.gif" width="5" height="10" alt="" border="0"></td>
        </tr>
        <tr>
            <td class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
        </tr>
        <?php } // end answers  display check ?>
        <?php
            // check default state for radio buttons
            if (!strcmp(" checked", $sChecked)) {
                
                $sChecked = "";
            }
            
            ++$i;
        } // end poll answers loop
        ?>
        </table>
        
        </td>
    </tr>
    <?php if (!$iVoted && $iCursor < 1) { // poll vote check ?>
    <tr>
        <td align="right"><input type="image" src="../../_img/buttons/btn_submit.gif" width="58" height="15" alt="" border="0" onfocus="this.blur();" /></td>
    </tr>
    <tr>
        <td><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <? } else { // poll vote has been recorded, render totals ?>
    <tr>
        <td><div class="section">Total Votes: <?php print $aPoll["Vote Count"] ?></div></td>
    </tr>
    <tr>
        <td><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php  } // end poll vote check ?>
    <tr>
        <td>
        <?php if ($iCnt > 1 && ($iVoted || $iCursor > 0)) { // verify pagination display ?>
        <table width="100%" border="0" cellpadding="0" cellspacing="0">    
            <tr>
                <td align="right"><div class="paging">
                <!--| paging |-->
                
                
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="15"><?php if ($iCursor > 0) { ?><a href="<?php print SELF ?>?cursor=<?php print $iCursor - 1 ?><?php print $sVar ?>"><img src="../../_img/buttons/btn_prev.gif" width="15" height="15" alt="" border="0" /><?php } else { ?><img src="../../_img/buttons/btn_prev_null.gif" width="15" height="15" alt="" border="0" /><?php } ?></a></td>
                        <td width="5"><img src="../../_img/spc.gif" width="5" height="1" alt="" border="0" /></td>
                        <td width="15"><?php if ($iCursor + 1 < $iCnt) { ?><a href="<?php print SELF ?>?cursor=<?php print $iCursor + 1 ?><?php print $sVar ?>"><img src="../../_img/buttons/btn_next.gif" width="15" height="15" alt="" border="0" /><?php } else { ?><img src="../../_img/buttons/btn_next_null.gif" width="15" height="15" alt="" border="0" /><?php } ?></a></td>
                    </tr>
                </table>
                
                <!--| paging |-->
                </div></td>
            </tr>
        </table>
        <br />
        <?php } // end pagination display verification ?>
        </td>
    </tr>
    <?php } else { // there are no polls ?>
    <tr>
        <td><div class="copy">I am sorry, there are no polls available at this time.</div></td>
    </tr>
    <?php } // end poll count value check ?>
</table>
</form>

<?php closePage(); ?>
