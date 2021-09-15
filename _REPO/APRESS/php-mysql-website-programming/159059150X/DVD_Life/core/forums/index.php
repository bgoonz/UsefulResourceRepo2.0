<?php

/* COPYRIGHT NOTICE
This software is copyright ©2002 Cuban Council™ and licensed for use by distribution from Cuban Council™ only.
This source code may not be redistibuted without written consent from the above mentioned entity. */

require_once("tpl_secure.php");
require_once("class.forumtopic.php");

// we'll need a forumtopic object on this page
$oForumTopic = new forumtopic;

// we always want to see all the topics in the admin
$sView = "recent";

// delete any topics if that was the requested action
if( $_POST["delete"] ) {
	$aDeleteTopic = $_POST["favorite"];
	foreach($aDeleteTopic as $iTopicId) {
		$oForumTopic->deleteTopic($iTopicId);
	}
}

// need the total number of topics for paging
$iTotalTopics = $oForumTopic->getTotalTopics($sView,$aSess["Account Id"]);

//
// now, let's grab the topic IDs and titles for the
// topics we'll be displaying
$aTopic = $oForumTopic->getTopicDisplay($iCursor,$sView,$aSess["Account Id"]);


setHeader();
openPage();

?>

<table width="608" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td colspan="2"><div class="header"><?php print ENTITY ?> Forums Administration</div></td>
    </tr>
    <tr>
        <td colspan="2"><div class="copy">Select Topic to Delete</div></td>
    </tr>
    <tr>
        <td colspan="2"><div class="error"><?php writeErrors() ?></div></td>
    </tr>
</table>



<form name="deletethread" method="post" action="<?php echo SELF; ?>">
<table width="608" border="0" cellpadding="0" cellspacing="0">
<?php
for( $i=0 ; $i < count($aTopic) ; ++$i ) {
	writeTopicLink($aTopic[$i]["Id"],$aTopic[$i]["Name"],$aTopic[$i]["ReplyCount"]);
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
			<?php renderPaging($iCursor,$iTotalTopics); ?>
             </td>
        </table>
        <!--| paging |-->
        </td>
    </tr>
</table>
</form>


<?php closePage(); ?>
