<?php

// File Location: /core/ads/form.php

require_once("tpl_secure.php");
require_once("handlers.php");
require_once("class.ads.php");

// instantiate ads class
$oAds = new ads;

// check for id
if ($id) {
    
    // assign unique id
    $oAds->setId($id);
}

if ($_POST) { // if form was posted
    
    // assign page variables
    $iClientId = $_POST["clientid"];
    $sTitle = $_POST["title"];
    $sUrl = $_POST["url"];
    $sPath = "";
    $sClient = $_POST["client"];
    $sContact = $_POST["contact"];
    $sEmail = $_POST["email"];
    $sPhone = $_POST["phone"];
    
    // validate ad title
    if (!validInput($sTitle, 1, 200)) {
        
        catchErr("Enter a valid advertisement title");
        $FORMOK = false;
    }
    
    // validate ad url
    if (!validUrl($sUrl)) {
        
        catchErr("Enter a advertisement URL");
        $FORMOK = false;
    }
    
    // check for uploaded file
    if (is_uploaded_file($_FILES["banner"]["tmp_name"])) {
        
        // get file extension
        if (!$sExt = validFile("banner")) {
            
            $FORMOK = false;
            
        } else {
            
            // generate random unique file name
            $iRand = rand(100001, 999999);
            $sImgName = md5(strtotime(date("Y-m-d H:i:s")).$iRand).".".$sExt;
            $sPath = SITE_URL."/_img/_banners/".$sImgName;
        }
        
    } else { // file noy uploaded
        
        // if the operation is add catch an error
        if (!strcmp("add", $op)) {
            
            catchErr("Upload a banner image file");
            $FORMOK = false;
        }
    }
    
    // validate client id
    if ($iClientId < 1 && !strcmp("add", $op)) {
        
        // validate client name
        if (!validInput($_POST["client"], 1, 100)) {
            
            catchErr("Enter a client name");
            $FORMOK = false;
        }
        
        // validate client contact
        if (!validInput($sContact, 1, 100)) {
            
            catchErr("Enter a client contact name");
            $FORMOK = false;
        }
        
        // validate client contact email
        if (!validEmail($sEmail)) {
            
            catchErr("Enter a client contact email address");
            $FORMOK = false;
        }
        
        // validate client contact phone
        if (!validInput($sPhone, 1, 20)) {
            
            catchErr("Enter a client contact phone number");
            $FORMOK = false;
        }
        
    } elseif ($iClientId < 1 && !strcmp("edit", $op)) {
        
        catchErr("Select a client");
        $FORMOK = false;
    }
    
    if ($FORMOK) { // form vlaidated ok
        
        // assign item values
        $aArgs["Client Id"] = $iClientId;
        $aArgs["Title"] = $sTitle;
        $aArgs["URL"] = $sUrl;
        $aArgs["Path"] = $sPath;
        $aArgs["Client"]["Name"] = $sClient;
        $aArgs["Client"]["Contact"] = $sContact;
        $aArgs["Client"]["Email"] = $sEmail;
        $aArgs["Client"]["Phone"] = $sPhone;
        
        // check operation type
        if (!strcmp("edit", $op)) {
            
            // try edit ad
            $FORMOK = $oAds->editAd($aArgs);
            
        } elseif (!strcmp("add", $op)) {
            
            // try add ad
            $FORMOK = $oAds->addAd($aArgs);
        }
        
        // redirect if successful
        if ($FORMOK) {
            
            // copy file
            copy($_FILES["banner"]["tmp_name"], "../../_img/_banners/".$sImgName);
            
            // redirect if successful
            header("Location: index.php");
        }
    }
    
} else {
    
    // initialize page vars
    if (!strcmp("edit", $op)) {
        
        // get ad
        $aAd = $oAds->getAd();
        
        // initialize page variables
        $iClientId = $aAd["Client Id"];
        $sTitle = $aAd["Title"];
        $sUrl = $aAd["URL"];
        $sClient = $aAd["Client"]["Name"];
        $sContact = $aAd["Client"]["Contact"];
        $sEmail = $aAd["Client"]["Email"];
        $sPhone = $aAd["Client"]["Phone"];
    }
}

setHeader();
openPage();

?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY ?> Advertisements Administration</div></td>
    </tr>
    <tr>
        <td><div class="copy">To <?php print $op ?> this item in the system, please complete the form below.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
    </tr>
</table>

<form action="<?php print SELF ?>?op=<?php print $op ?>&id=<?php print $id ?>" method="post" name="wroxform" enctype="multipart/form-data">
<table border="0" cellpadding="0" cellspacing="0">
    <?php
    $aClients = $oAds->getClientsList();
    if (count($aClients)) {
    ?>
    <tr>
        <td><div class="formlabel">Client:</div></td>
        <td><select name="clientid" class="textfield" />
        <option value="">Choose a client</option>
        <?php
        $i = 0;
        while ($i < count($aClients)) {
            if (!strcmp($aClients[$i]["Client Id"] , $iClientId)) {
        ?>
        <option value="<?php print $aClients[$i]["Client Id"] ?>" selected><?php print clean($aClients[$i]["Client"]) ?></option>
        <?php } else { ?>
        <option value="<?php print $aClients[$i]["Client Id"] ?>"><?php print clean($aClients[$i]["Client"]) ?></option>
        <?php } ?>
        <?php
            ++$i;
        }
        ?>
        </select></td>
    </tr>
    <?php } ?>
    <tr>
        <td><div class="formlabel">Banner Title:</div></td>
        <td><input type="text" name="title" value="<?php print clean($sTitle) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Banner URL:</div></td>
        <td><input type="text" name="url" value="<?php print clean($sUrl) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Banner File:</div></td>
        <td><input type="file" name="banner" class="textfield" /></td>
    </tr>
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php if (!strcmp("add", $op)) { ?>
    <tr>
        <td><div class="formlabel">Client Name:</div></td>
        <td><input type="text" name="client" value="<?php print clean($sClient) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Client Contact:</div></td>
        <td><input type="text" name="contact" value="<?php print clean($sContact) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Contact Email:</div></td>
        <td><input type="text" name="email" value="<?php print clean($sEmail) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Contact Phone:</div></td>
        <td><input type="text" name="phone" value="<?php print clean($sPhone) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php } else { ?>
    <tr>
        <td><div class="formlabel">Client Name:</div></td>
        <td><?php print format($sClient) ?></td>
    </tr>
    <tr>
        <td><div class="formlabel">Client Contact:</div></td>
        <td><?php print format($sContact) ?></td>
    </tr>
    <tr>
        <td><div class="formlabel">Contact Email:</div></td>
        <td><?php print format($sEmail) ?></td>
    </tr>
    <tr>
        <td><div class="formlabel">Contact Phone:</div></td>
        <td><?php print format($sPhone) ?></td>
    </tr>
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php } ?>
    <tr>
        <td align="right" colspan="2"><input type="image" src="../../_img/buttons/btn_submit.gif" width="58" height="15" alt="" border="0" onfocus="this.blur();" /></td>
    </tr>
</table>
</form>

<?php closePage(); ?>
