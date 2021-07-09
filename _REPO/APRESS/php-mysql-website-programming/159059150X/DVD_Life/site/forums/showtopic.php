<?php

/* COPYRIGHT NOTICE
This software is copyright ©2002 Cuban Council™ and licensed for use by distribution from Cuban Council™ only.
This source code may not be redistibuted without written consent from the above mentioned entity. */

// we should always have a $_GET["topicId"] set
// on this page. redirect them if we don't
if( !isset($_GET["topicId"]) ) {
    header("Location: index.php");
} else {
    $iTopicId = $_GET["topicId"];
}

require_once("tpl_unsecure.php");
require_once("class.accounts.php");
require_once("class.forumreply.php");
require_once("class.forumtopic.php");

// we will need these objects on this page
$oForumReply = new forumreply;
$oForumTopic = new forumtopic;


// if they're logged in, get the session information
// in the $aSess array
$oAccounts = new accounts;
if( isset($_COOKIE["cACCOUNT"]) && $oAccounts->validateSession() ) {
    $aSess = $oAccounts->getSession();
}

// we'll want to show the topic on every page so the users
// can see what they're replying to
$aHeaderArgs = $oForumTopic->getTopicFromDb($iTopicId);

// now, get the ids for the replies we're going to show
$aReplyId = $oForumReply->getReplyIds($iCursor,$iTopicId);

setHeader();
openPage(true);

?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY; ?> Forums</div></td>
    </tr>
    <tr>
        <td>
<?php if( count($aSess) ) { ?>
            <a href="postreply.php?topicId=<?php print $iTopicId; ?>">Post a reply</a>
<?php } else { ?>
            <a href="/site/accounts">Login</a> to post replies.
<?php } ?>
        </td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
    </tr>
</table>

<table width="608" border="0" cellpadding="0" cellspacing="0">
<?php
// print out the forum header
writeTopic($aHeaderArgs["ScreenName"],$aHeaderArgs["CreatedDate"],
           $aHeaderArgs["ReplyCount"],$aHeaderArgs["TopicName"],
           $aHeaderArgs["TopicText"]);
?>
<?php
// now print out our replies
for( $i=0 ; $i < count($aReplyId) ; ++$i ) {
    $aReplyArgs = $oForumReply->getReplyFromDb($aReplyId[$i]);
    writeReply($aReplyArgs["ScreenName"] , $aReplyArgs["PostDate"] , $aReplyArgs["Reply"]);
}
?>
    <tr>
        <td>
        <!--| paging |-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="left">
<?php if( count($aSess) ) { ?>
                <a href="postreply.php?topicId=<?php print $iTopicId; ?>">Post a Reply</a>
<?php } ?>
            </td>
            <td align="right">
			<?php renderPaging($iCursor,$aHeaderArgs["ReplyCount"],"&topicId=".$iTopicId); ?>
             </td>
        </table>
        <!--| paging |-->
        </td>
    </tr>
</table>

<?php closePage(); ?>
