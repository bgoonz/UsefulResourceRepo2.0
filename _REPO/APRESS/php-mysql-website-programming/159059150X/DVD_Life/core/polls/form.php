<?php

// File Location: /core/polls/form.php

require_once("tpl_secure.php");
require_once("handlers.php");
require_once("class.polls.php");

// instantiate polls class
$oPolls = new polls;

// check for id
if ($id) {
    
    // assign poll id
    $oPolls->setPollId($id);
}

if ($_POST) { // check for http post vars
    
    // assign post vars
    $sQuestion = $_POST["question"];
    $aAnswer = $_POST["answer"];
    
    // check question value
    if (!strcmp("", $sQuestion)) {
        
        catchErr("Enter a poll question");
        $FORMOK = false;
    }
    
    // check answers
    $i = 0;
    while (list($key, $val) = each($aAnswer)) {
        
        $aAnswers[$i]["Answer Id"] = $key;
        $aAnswers[$i]["Answer"] = $val;
        
        if (!strcmp("", $val) && $i < 2) {
            catchErr("Enter a value for answer ".($i + 1));
            $FORMOK = false;
        }
        ++$i;
    }
    
    // if forms variables validated
    if ($FORMOK) {
        
        $aArgs["Question"] = $sQuestion;
        $aArgs["Answers"] = $aAnswer;
        
        // check operation type
        if (!strcmp("edit", $op)) {
            
            // try edit poll
            $FORMOK = $oPolls->editPoll($aArgs);
            
        } elseif (!strcmp("add", $op)) {
            
            // try add poll
            $FORMOK = $oPolls->addPoll($aArgs);
        }
        
        // redirect if successful
        if ($FORMOK) {
            
            // redirect if successful
            header("Location: index.php");
        }
    }
    
} else {
    
    // assign page variables
    if (!strcmp("edit", $op)) {
        
        $aPoll = $oPolls->getPoll();
        $sQuestion = $aPoll["Question"];
        $aAnswers = $aPoll["Answers"];
        
        $i = 0;
        while ($i < count($aAnswers)) {
            
            $aAnswer[$i] = $aAnswers[$i]["Answer"];
            ++$i;
        }
    }
}

setHeader();
openPage();

?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY ?> Polls Administration</div></td>
    </tr>
    <tr>
        <td><div class="copy">To <?php print $op ?> this item in the system, please complete the form below.
        <?php if (!strcmp("edit", $op)) { ?>Note: If editing a poll, all previous answer scores will be reset to
        zero. This ensures that votes are not altered by changing the context of the poll.<?php } ?></div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
    </tr>
</table>

<form action="<?php print SELF ?>?op=<?php print $op ?>&id=<?php print $id ?>" method="post" name="wroxform">
<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="formlabel">Question:</div></td>
        <td><input type="text" name="question" value="<?php print clean($sQuestion) ?>" class="textfield" /></td>
    </tr>
    <?php
    if (!strcmp("add", $op)) {
    for ($i = 0; $i < 6; ++$i) {
    ?>
    <tr>
        <td><div class="formlabel">Answer <?php print $i + 1 ?>:</div></td>
        <td><input type="text" name="answer[<?php print $aAnswers[$i]["Answer Id"] ?>]" value="<?php print clean($aAnswers[$i]["Answer"]) ?>" class="textfield" /></td>
    </tr>
    <?php } ?>
    <?php
    } elseif (!strcmp("edit", $op)) {
    $i = 0;
    while ($i < count($aAnswers)) {
    ?>
    <tr>
        <td><div class="formlabel">Answer <?php print $i + 1 ?>:</div></td>
        <td><input type="text" name="answer[<?php print $aAnswers[$i]["Answer Id"] ?>]" value="<?php print clean($aAnswers[$i]["Answer"]) ?>" class="textfield" /></td>
    </tr>
    <?php
        ++$i;
    }
    ?>
    <?php } ?>
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td align="right" colspan="2"><input type="image" src="../../_img/buttons/btn_submit.gif" width="58" height="15" alt="" border="0" onfocus="this.blur();" /></td>
    </tr>
</table>
</form>

<?php closePage(); ?>
