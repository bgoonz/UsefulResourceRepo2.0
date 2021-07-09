<?php

// File Location: /core/news/form.php

require_once("tpl_secure.php");
require_once("handlers.php");
require_once("class.news.php");

// instantiate news class
$oNews = new news;

// check for id
if ($id) {
    
    // assign user id
    $oNews->setNewsId($id);
}

if ($_POST) { // check for http post vars
    
    // assign post vars
    $iType = $_POST["type"];
    $sReleaseDt = $_POST["reldate"];
    $sExpireDt = $_POST["expdate"];
    $sTitle = $_POST["title"];
    $sArticle = $_POST["article"];
    
    // check news type
    if (!validInput($iType, 1, 2)) {
        
        catchErr("Select a news type");
        $FORMOK = false;
    }
    
    // check release date
    if (!validDate($sReleaseDt)) {
        
        catchErr("Invalid release date");
        $FORMOK = false;
    }
    
    // check expiration date
    if (!validDate($sExpireDt)) {
        
        catchErr("Invalid expiration date");
        $FORMOK = false;
        
    }
    
    // compare dates
    if (strtotime($sExpireDt) <= strtotime($sReleaseDt)) {
        
        catchErr("Article cannot expire before or during release");
        $FORMOK = false;
    }
    
    // check title
    if (!validInput($sTitle, 1, 255)) {
        
        catchErr("Enter a news title");
        $FORMOK = false;
    }
    
    // check article
    if (!strcmp("", $sArticle)) {
        
        catchErr("Enter a news article");
        $FORMOK = false;
    }
    
    // if forms variables validated
    if ($FORMOK) {
        
        $aArgs["Type Id"] = $iType;
        $aArgs["Title"] = $sTitle;
        $aArgs["Article"] = $sArticle;
        $aArgs["Release Date"] = strtotime($sReleaseDt);
        $aArgs["Expire Date"] = strtotime($sExpireDt);
        
        // check operation type
        if (!strcmp("edit", $op)) {
            
            // try edit news
            $FORMOK = $oNews->editNews($aArgs);
            
        } elseif (!strcmp("add", $op)) {
            
            // try add news
            $FORMOK = $oNews->addNews($aArgs);
        }
        
        // redirect if successful
        if ($FORMOK) {
            
            // redirect if successful
            header("Location: index.php");
        }
    }
    
} else { // post vars not sent
    
    // initialize page vars
    if (!strcmp("edit", $op)) {
        
        $aNews = $oNews->getNewsItem();
        $iType = $aNews["News Type Id"];
        $sTitle = $aNews["Title"];
        $sArticle = $aNews["Article"];
        $sReleaseDt = date("m/d/Y", $aNews["Release Date"]);
        $sExpireDt = date("m/d/Y", $aNews["Expire Date"]);
        
    } elseif (!strcmp("add", $op)) {
        
        $iType = 0;
        $sReleaseDt = date("m/d/Y");
        $sExpireDt = date("m/d/Y", strtotime("+3 month"));
    }
}

setHeader();
openPage();

// get news types
$aTypes = $oNews->getNewsTypes();

?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY ?> Newsfeed Administration</div></td>
    </tr>
    <tr>
        <td><div class="copy">To <?php print $op ?> this item in the system, please complete the form below.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
    </tr>
</table>

<form action="<?php print SELF ?>?op=<?php print $op ?>&id=<?php print $id ?>" method="post" name="wroxform">
<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="formlabel">News Type:</div></td>
        <td><select name="type" class="textfield">
        <option value="">Select a news type</option>
        <?php
        if (count($aTypes)) {
            
            $i = 0;
            while ($i < count($aTypes)) {
                
                // write form options for news types
                !strcmp($aTypes[$i]["News Type Id"], $iType) ? $sSelected = " selected" : $sSelected = "";
                print "<option value=\"".$aTypes[$i]["News Type Id"]."\"".$sSelected.">".clean($aTypes[$i]["News Type"])."</option>\n";
                ++$i;
            }
        }
        ?>
        </select></td>
    </tr>
    <tr>
        <td><div class="formlabel">Release Date:</div></td>
        <td><input type="text" name="reldate" value="<?php print $sReleaseDt ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Expire Date:</div></td>
        <td><input type="text" name="expdate" value="<?php print $sExpireDt ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Title:</div></td>
        <td><input type="text" name="title" value="<?php print clean($sTitle) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td valign="top"><div class="formlabel">Article:</div></td>
        <td><textarea name="article" rows="18" cols="39" wrap="virtual" class="textarea"><?php print clean($sArticle) ?></textarea></td>
    </tr>
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td align="right" colspan="2"><input type="image" src="../../_img/buttons/btn_submit.gif" width="58" height="15" alt="" border="0" onfocus="this.blur();" /></td>
    </tr>
</table>
</form>

<?php closePage(); ?>
