<?php

// File Location: /site/news/index.php

require_once("tpl_unsecure.php");
require_once("class.news.php");

// instantiate news class
$oNews = new news;

// get news types
$aTypes = $oNews->getNewsTypes();

// get and set news type
$iType = $_GET["type"];
$iType ? $iType = $iType : $iType = $aTypes[0]["News Type Id"];

// get users and user count
$aNews = $oNews->getActiveNewsItems($iCursor, $iType);
$iCnt = $oNews->getNewsCount(true, $iType);

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
    <tr>
        <td><div class="copy">To view news articles, select a news type from the list below.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors(); ?></div></td>
    </tr>
</table>

<form action="<?php print SELF ?>?cursor=<?php print $iCursor ?>" method="get" name="wroxform">
<table width="608" border="0" cellpadding="0" cellspacing="0">
    <?php if (count($aTypes)) { ?>
    <tr>
        <td colspan="3"><select name="type" class="textfield" onchange="document.forms[0].submit();">
        <option value="">Select a news type</option>
        <?php
        
        // loop through news types and build select list
        $i = 0;
        while ($i < count($aTypes)) {
            
            // write form options for news types
            !strcmp($aTypes[$i]["News Type Id"], $iType) ? $sSelected = " selected" : $sSelected = "";
            print "<option value=\"".$aTypes[$i]["News Type Id"]."\"".$sSelected.">".clean($aTypes[$i]["News Type"])."</option>\n";
            ++$i;
        }
        ?>
        </select></td>
    </tr>
    <tr>
        <td colspan="3" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php } // end type count check ?>
    <?php
    
    // loop through news items and display information
    if (count($aNews)) {
        
        $i = 0;
        while ($i < count($aNews)) {
        
    ?>
    <tr>
        <td><div class="section"><a href="detail.php?id=<?php print $aNews[$i]["News Id"] ?>"><?php print format($aNews[$i]["Title"]) ?></a></div></td>
        <td valign="top"><div class="copy"><?php print format($aNews[$i]["Comment Count"]) ?> comments</div></td>
        <td align="right"><div class="copy"><i><?php print format(date("l F j, Y", $aNews[$i]["Release Date"])) ?></i></div></td>
    </tr>
    <tr>
        <td colspan="3" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php
            ++$i;
        }
    ?>
    <tr>
        <td colspan="3"><?php renderPaging($iCursor, $iCnt, "&type=".$iType) ?></td>
    </tr>
    <?php
    } else {
    ?>
    <tr>
        <td><div class="copy">I am sorry, there are no articles available in this section.</div></td>
    </tr>
    <?php } ?>
</table>
</form>

<?php

// print out footer information
closePage();

?>
