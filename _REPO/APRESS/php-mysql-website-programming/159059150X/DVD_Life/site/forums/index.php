<?php

/* COPYRIGHT NOTICE
This software is copyright ©2002 Cuban Council™ and licensed for use by distribution from Cuban Council™ only.
This source code may not be redistibuted without written consent from the above mentioned entity. */

require_once("tpl_unsecure.php");
require_once("class.accounts.php");
require_once("class.forumtopic.php");

// we'll need a forumtopic object on this page
$oForumTopic = new forumtopic;



///////////////////////////////////////////////////////////////////////////
// get session if the user is logged in
///////////////////////////////////////////////////////////////////////////

$oAccounts = new accounts;

if( isset($_COOKIE["cACCOUNT"]) && $oAccounts->validateSession() ) {
	$aSess = $oAccounts->getSession();

    ///////////////////////////////////////////////////////////////////////
    // handle viewing of recent vs. favorites
    ///////////////////////////////////////////////////////////////////////

    if( $_GET["view"] ) {
    	$sView = $_GET["view"];
    	setcookie("cFORUMVIEW", $_GET["view"], time()+(TIMEOUT / 2), "/", "", "");
    } elseif ( isset($_COOKIE["cFORUMVIEW"]) ) {
    	$sView = $_COOKIE["cFORUMVIEW"];
    } else {
    	$sView = "recent";
    }

} else {
	$sView = "recent";
}

///////////////////////////////////////////////////////////////////////////
// add or remove from favorites if posted
///////////////////////////////////////////////////////////////////////////

$sAddFavorites = "btn_addfavs.gif";
$sDelFavorites = "btn_remfavs.gif";

if( !strcmp($_POST["submitFavorites"],$sAddFavorites) && count($_POST["favorite"]) ) {
	$oForumTopic->addFavorites($_POST["favorite"] , $aSess["Account Id"]);
}

if( !strcmp($_POST["submitFavorites"],$sDelFavorites) && count($_POST["favorite"]) ) {
	$oForumTopic->delFavorites($_POST["favorite"] , $aSess["Account Id"]);
}

//
// now, let's grab the topic IDs and titles for the
// topics we'll be displaying
$aTopic = $oForumTopic->getTopicDisplay($iCursor,$sView,$aSess["Account Id"]);

// we'll need this for paging
$iTotalTopics = $oForumTopic->getTotalTopics($sView,$aSess["Account Id"]);


setHeader();
openPage(true);

?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY; ?> Forums</div></td>
    </tr>
    <tr>
        <td>
            <table cellpadding="6" cellspacing="0" border="0">
<?php if( count($aSess) ) { ?>
                <tr>
                    <td><a href="<?php print SELF; ?>?view=recent">Recent Topics</a></td>
                    <td><a href="<?php print SELF; ?>?view=favorites">Favorites</a></td>
                    <td><a href="starttopic.php">Start a Topic</a></td>
                </tr>
<?php } else { ?>
                <tr>
                    <td colspan="3"><a href="/site/accounts/">Login</a> to create or reply to the forums!</td>
                </tr>
<?php } ?>
            </table>
        </td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors(); ?></div></td>
    </tr>
</table>

<form name="favorites" method="post" action="<?php print SELF; ?>">
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
<?php if( count($aSess) ) { ?>
				<input type="image" src="../../_img/buttons/<?php !strcmp($sView,"recent") ? print $sAddFavorites : print $sDelFavorites; ?>" width="100" height="15" alt="" border="0" name="submitFavorites" value="<?php !strcmp($sView,"recent") ? print $sAddFavorites : print $sDelFavorites; ?>">
<?php } ?>
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
