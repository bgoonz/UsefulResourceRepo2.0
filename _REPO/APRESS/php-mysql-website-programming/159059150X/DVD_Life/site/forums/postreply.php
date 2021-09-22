<?php

/* COPYRIGHT NOTICE
This software is copyright ©2002 Cuban Council™ and licensed for use by distribution from Cuban Council™ only.
This source code may not be redistibuted without written consent from the above mentioned entity. */

// we should always have a $_GET["topicId"] or $_POST["topicID"] set
// on this page. redirect them if we don't
if( isset($_POST["topicId"]) ) {
    $iTopicId = $_POST["topicId"];
} elseif ( isset($_GET["topicId"]) ) {
    $iTopicId = $_GET["topicId"];
} else {
    header("Location: index.php");
}

require_once("tpl_unsecure.php");
require_once("class.accounts.php");
require_once("class.forumtopic.php");

// if they're trying to come here not logged in, send them to login page
$oAccounts = new accounts;
$oAccounts->validateSession() ? $aSess = $oAccounts->getSession() : header("Location: /site/accounts/index.php");

// we'll want to print out the topic so the user can see what
// they are replying to
$oForumTopic = new forumtopic;
$aHeaderArgs = $oForumTopic->getTopicFromDb($iTopicId);


// see if they posted anything
if ($_POST) {

	// first remove leading and trailing whitespace, then
	// strip any unwanted slashes.
    $sReplyText = stripslashes(trim($_POST["replytext"]));

    // make sure they put something in for the entry
    if( !strcmp($sReplyText,'') ) {
        catchErr("Topic needs an entry.");
    }

    // if there are no errors, create the topic
    if( !count($ERRORS) ) {

        // we can include this now since we know we'll need it
        require_once("class.forumreply.php");
        $oForumReply = new forumreply($aSess["Account Id"] , $iTopicId);

        // set the creator id, topic name, and topic text
        $oForumReply->setReply($sReplyText);


        // now create the reply in the db
        if( $oForumReply->createReply() ) {
			// put them back looking at the same topic and comments
            header("Location: /site/forums/showtopic.php?topicId=$iTopicId");
        }
    }
}

setHeader();
openPage(true);

?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY; ?> Forums</div></td>
    </tr>
    <tr>
        <td>
            Reply to Topic
        </td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors(); ?></div></td>
    </tr>
</table>

<form name="topicreply" method="post" action="<?php print SELF; ?>">
<input type="hidden" name="topicId" value="<?php print $iTopicId; ?>">
<table width="608" border="0" cellpadding="0" cellspacing="0">
<?php
// print out the forum header
writeTopic($aHeaderArgs["ScreenName"],$aHeaderArgs["CreatedDate"],
           $aHeaderArgs["ReplyCount"],$aHeaderArgs["TopicName"],
           $aHeaderArgs["TopicText"]);
?>
    <tr>
        <td><div class="section">Your Reply</div></td>
    </tr>
    <tr>
        <td><textarea cols="60" rows="12" wrap="virtual" name="replytext" class="textarea"><?php print $sReplyText; ?></textarea></td>
    </tr>
    <tr>
        <td class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>

    <tr>
        <td>
        <a href="index.php"><img src="../../_img/buttons/btn_cancel.gif" width="58" height="15" alt="" border="0" /></a>
        <input type="image" src="../../_img/buttons/btn_submit.gif" width="58" height="15" alt="" border="0" name="submit" />
        </td>
     </tr>
</table>
</form>

<?php closePage(); ?>
