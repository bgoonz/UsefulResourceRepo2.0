<?php

/* COPYRIGHT NOTICE
This software is copyright ©2002 Cuban Council™ and licensed for use by distribution from Cuban Council™ only.
This source code may not be redistibuted without written consent from the above mentioned entity. */

require_once("tpl_unsecure.php");
require_once("class.accounts.php");

// if they're trying to come here not logged in, send them to login page
$oAccounts = new accounts;
$oAccounts->validateSession() ? $aSess = $oAccounts->getSession() : header("Location: /site/accounts/index.php");


// see if they posted anything
if ($_POST) {

	// first remove leading and trailing whitespace, then
	// strip unwanted slashes
    $sTopicTitle = stripslashes(trim($_POST["topictitle"]));
    $sTopicText = stripslashes(trim($_POST["topictext"]));

    // make sure they put something in for the title

    if( !strcmp($sTopicTitle,'') ) {
        catchErr("Topic needs a title.");
    }

    // make sure they put something in for the entry
    if( !strcmp($sTopicText,'') ) {
        catchErr("Topic needs an entry.");
    }

    // if there are no errors, create the topic
    if( !count($ERRORS) ) {

        // we can include this now since we know we'll need it
        require_once("class.forumtopic.php");
        $oForumTopic = new forumtopic();

        // set the account id, topic name, and topic text
        $oForumTopic->setAccountId($aSess["Account Id"]);
        $oForumTopic->setTopicName($sTopicTitle);
        $oForumTopic->setTopicText($sTopicText);

        // now create the topic in the db
        if( $oForumTopic->createTopic() ) {
            header("Location: index.php");
        }
    }
}

setHeader();
openPage(true);

?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY ?> Forums</div></td>
    </tr>
    <tr>
        <td>
           Start a new Topic
        </td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors(); ?></div></td>
    </tr>
</table>

<form name="starttopic" method="post" action="<?php print SELF; ?>">
<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="section">Topic Title</div></td>
    </tr>
    <tr>
        <td><input type="text" size="71" name="topictitle" value="<?php print $sTopicTitle; ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="section">Topic Entry</div></td>
    </tr>
    <tr>
        <td><textarea cols="60" rows="12" wrap="virtual" name="topictext"  class="textarea"><?php print $sTopicText; ?></textarea></td>
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
