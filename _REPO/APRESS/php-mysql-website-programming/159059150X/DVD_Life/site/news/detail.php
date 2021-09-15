<?php

// File Location: /site/news/detail.php

require_once("tpl_unsecure.php");
require_once("class.news.php");
require_once("class.accounts.php");
require_once("handlers.php");

$oNews = new news;
$oAccounts = new accounts;

// validate session get account info
if (isset($_COOKIE["cACCOUNT"]) && $oAccounts->validateSession()) {
    
    $aSess = $oAccounts->getSession();
}

// set news id
$oNews->setNewsId($id);

// get users and user count
$aNews = $oNews->getNewsItem();
$aComm = $oNews->getNewsComments();

if ($_POST) {
    
    $sComment = $_POST["comment"];
    
    if (!strcmp("", $sComment)) {
        
        catchErr("Enter a valid comment<br />");
        $FORMOK = false;
    }
    
    if ($FORMOK) {
        
        $aArgs["Account Id"] = $aSess["Account Id"];
        $aArgs["Comment"] = $sComment;
        
        if ($FORMOK = $oNews->addComment($aArgs)) {
            
            header("Location: ".SELF."?id=".$id);
        }
    }
    
} else {
    
    $sComment = "";
}

// generate the header info
setHeader();

// start a new page with a banner ad
openPage(true);

?>
<!-- main content -->
<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php echo ENTITY; ?> Newsfeed</div></td>
    </tr>
</table>

<form action="<?php print SELF ?>?id=<?php print $id ?>" method="post" name="wroxform">
<table width="608" border="0" cellpadding="0" cellspacing="0">
    <?php if (is_array($aNews)) { ?>
    <tr>
        <td><div class="section"><?php print format($aNews["Title"]) ?></div></td>
        <td align="right"><div class="copy"><i><?php print format(date("l F j, Y", $aNews["Release Date"])) ?></i></div></td>
    </tr>
    <tr>
        <td colspan="2"><div class="copy"><?php print format($aNews["Article"]) ?></div></td>
    </tr>
    <tr>
        <td colspan="2" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php if (isset($aSess) && is_array($aSess)) { ?>
    <tr>
        <td colspan="2"><div class="error"><?php writeErrors(); ?></div></td>
    </tr>
    <tr>
        <td colspan="2"><div class="section">Add a comment?</div></td>
    </tr>
    <tr>
        <td colspan="2">
        
        <table border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td><textarea name="comment" rows="3" cols="39" wrap="virtual" class="textarea"><?php print $sComment ?></textarea></td>
            </tr>
            <tr>
                <td><img src="../../_img/spc.gif" width="1" height="5" alt="" border="0" /></td>
            </tr>
            <tr>
                <td align="right"><input type="image" src="../../_img/buttons/btn_submit.gif" width="58" height="15" alt="" border="0" onfocus="this.blur();" /></td>
            </tr>
        </table>
        
        </td>
    </tr>
    <tr>
        <td colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php } ?>
    <?php
    if (count($aComm)) {
        
        $i = 0;
        while ($i < count($aComm)) {
    ?>
    <tr>
        <td colspan="2"><div class="copy"><i>Posted <?php print format(date("l F j, Y", $aComm[$i]["Comment Date"])) ?>
        by <?php print format($aComm[$i]["Screen Name"]) ?></i></div></td>
    </tr>
    <tr>
        <td colspan="2"><div class="copy"><?php print format($aComm[$i]["Comment"]) ?></div></td>
    </tr>
    <tr>
        <td colspan="2" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php
            ++$i;
        }
    }
    ?>
    <?php
    } else {
    ?>
    <tr>
        <td><div class="copy">I am sorry, the article you have requested cannot be found.</div></td>
    </tr>
    <?php } ?>
</table>
</form>

<?php

// print out footer information
closePage();

?>
