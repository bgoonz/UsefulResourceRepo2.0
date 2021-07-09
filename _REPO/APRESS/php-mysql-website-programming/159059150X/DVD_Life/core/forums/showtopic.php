<?php

/* COPYRIGHT NOTICE
This software is copyright ©2002 Cuban Council™ and licensed for use by distribution from Cuban Council™ only.
This source code may not be redistibuted without written consent from the above mentioned entity. */

if( isset($_POST["topicId"]) ) {
	$iTopicId = $_POST["topicId"];
} else {
	$iTopicId = $_GET["topicId"];
}


require_once("tpl_secure.php");
require_once("class.forumtopic.php");
require_once("class.forumreply.php");

// we will need these objects on this page
$oForumReply = new forumreply;
$oForumTopic = new forumtopic;


if( $_POST["delete"] ) {
	$aDeleteReply = $_POST["deletereply"];
	foreach( $aDeleteReply as $iDeleteId ) {
		$oForumReply->deleteReply($iDeleteId);
	}
}


// we'll want to show the topic on every page so the users
// can see what they're replying to
$aHeaderArgs = $oForumTopic->getTopicFromDb($iTopicId);

// now, get the ids for the replies we're going to show
$aReplyId = $oForumReply->getReplyIds($iCursor,$iTopicId);


setHeader();
openPage();

?>

<table width="608" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td colspan="2"><div class="header"><?php print ENTITY ?> Forums Administration</div></td>
    </tr>
    <tr>
        <td colspan="2"><div class="copy">Select Reply to Delete</div></td>
    </tr>
    <tr>
        <td colspan="2"><div class="error"><?php writeErrors() ?></div></td>
    </tr>
</table>


<form name="deletethread" method="post" action="<?php echo SELF; ?>">
<input type="hidden" name="topicId" value="<?php echo $iTopicId; ?>">
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
    writeReply($aReplyArgs["ScreenName"] , $aReplyArgs["PostDate"] , $aReplyArgs["Reply"], TRUE , $aReplyId[$i]);
}
?>
    <tr>
        <td>
        <!--| paging |-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="left">
				<input type="image" src="../../_img/buttons/btn_remove.gif" width="58" height="15" alt="" border="0" name="delete" value="true">
            </td>
            <td align="right">
			<?php renderPaging($iCursor,$aHeaderArgs["ReplyCount"],"&topicId=".$iTopicId) ?>
             </td>
        </table>
        <!--| paging |-->
        </td>
    </tr>
</table>
</form>

<?php closePage(); ?>
