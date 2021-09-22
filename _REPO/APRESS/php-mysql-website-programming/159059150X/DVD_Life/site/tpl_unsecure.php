<?php

// File Location: /site/tpl_unsecure.php

require_once("elements.php");
require_once("class.ads.php");

// get and set action variables
$op = $_GET["op"];
$id = (int) $_GET["id"];
$_GET["cursor"] ? $iCursor = $_GET["cursor"] : $iCursor = 0;

header("Expires: Sun, 15 Dec 2002 00:00:00 GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Pragma: no-cache");

// render page header
function setHeader() {
?>
<?php print "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\r\n" ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<!--| version <?php print VERSION ?> |-->

<head>
    <? if (!empty($_COOKIE["cACCOUNT"])) { ?>
    <meta http-equiv="Refresh" content="<?php print TIMEOUT / 2 ?>; url=index.php" />
    <? } ?>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <title><?php print TITLE ?></title>
    <link href="<?php print SITE_DIR ?>_lib/wrox.mt.css" rel="stylesheet" media="screen" />
    <script language="javascript" src="<?php print SITE_DIR ?>_lib/wrox.mt.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript"><!--
    <?php print writeExceptions() ?>
    
    // verify action
    function verify() {
        if (confirm("Are you certain that you want to do that?")) {
            return true;
        } else {
            return false;
        }
    }
    
    // --></script>
</head>
<?php

} // end setHeader()

// render page opening
function openPage($bBanner = false) {
?>

<body>

<!--| framework |-->
<table width="740" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td width="121" bgcolor="#E2E2E2" valign="top">
        <!--| menu |-->
        
        <table width="121" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td colspan="2"><img src="../../_img/spc.gif" width="1" height="54" alt="" border="0" /></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/menu_rules.gif" width="121" height="2" alt="" border="0" /></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/spc.gif" width="1" height="10" alt="" border="0" /></td>
            </tr>
            <tr>
                <td width="15"><img src="../../_img/spc.gif" width="15" height="1" alt="" border="0" /></td>
                <td width="104"><a href="../news/" class="menu">Newsfeed</a></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/spc.gif" width="1" height="10" alt="" border="0" /></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/menu_rules.gif" width="121" height="2" alt="" border="0" /></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/spc.gif" width="1" height="10" alt="" border="0" /></td>
            </tr>
            <tr>
                <td width="15"><img src="../../_img/spc.gif" width="15" height="1" alt="" border="0" /></td>
                <td width="104"><a href="../forums/" class="menu">Forums</a></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/spc.gif" width="1" height="10" alt="" border="0" /></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/menu_rules.gif" width="121" height="2" alt="" border="0" /></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/spc.gif" width="1" height="10" alt="" border="0" /></td>
            </tr>
            <tr>
                <td width="15"><img src="../../_img/spc.gif" width="15" height="1" alt="" border="0" /></td>
                <td width="104"><a href="../polls/" class="menu">Polls</a></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/spc.gif" width="1" height="10" alt="" border="0" /></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/menu_rules.gif" width="121" height="2" alt="" border="0" /></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/spc.gif" width="1" height="10" alt="" border="0" /></td>
            </tr>
            <tr>
                <td width="15"><img src="../../_img/spc.gif" width="15" height="1" alt="" border="0" /></td>
                <td width="104"><a href="../products/" class="menu">Products</a></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/spc.gif" width="1" height="10" alt="" border="0" /></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/menu_rules.gif" width="121" height="2" alt="" border="0" /></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/spc.gif" width="1" height="10" alt="" border="0" /></td>
            </tr>
            <tr>
                <td width="15"><img src="../../_img/spc.gif" width="15" height="1" alt="" border="0" /></td>
                <td width="104"><a href="../shopping_cart/" class="menu">Shopping Cart</a></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/spc.gif" width="1" height="10" alt="" border="0" /></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/menu_rules.gif" width="121" height="2" alt="" border="0" /></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/spc.gif" width="1" height="10" alt="" border="0" /></td>
            </tr>
            <? if (empty($_COOKIE["cACCOUNT"])) { ?>
            <tr>
                <td width="15"><img src="../../_img/spc.gif" width="15" height="1" alt="" border="0" /></td>
                <td width="104"><a href="../accounts/" class="menu">Account Login</a></td>
            </tr>
            <? } else { ?>
            <tr>
                <td width="15"><img src="../../_img/spc.gif" width="15" height="1" alt="" border="0" /></td>
                <td width="104"><a href="../accounts/manage.php" class="menu">My Account</a></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/spc.gif" width="1" height="10" alt="" border="0" /></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/menu_rules.gif" width="121" height="2" alt="" border="0" /></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/spc.gif" width="1" height="10" alt="" border="0" /></td>
            </tr>
            <tr>
                <td width="15"><img src="../../_img/spc.gif" width="15" height="1" alt="" border="0" /></td>
                <td width="104"><a href="../accounts/logout.php" onclick="return verify();" class="menu">Logout</a></td>
            </tr>
            <? } ?>
            <tr>
                <td colspan="2"><img src="../../_img/spc.gif" width="1" height="10" alt="" border="0" /></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/menu_rules.gif" width="121" height="2" alt="" border="0" /></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/spc.gif" width="1" height="20" alt="" border="0" /></td>
            </tr>
        </table>
        
        <!--| menu |-->
        </td>
        <td width="1" bgcolor="#D4D3D3" rowspan="2"><img src="../../_img/spc.gif" width="1" height="1" alt="" border="0" /></td>
        <td width="15" rowspan="2"><img src="../../_img/spc.gif" width="15" height="1" alt="" border="0" /></td>
        <td width="603" valign="top">
        <!--| content |-->
        
        <table width="603" border="0" cellpadding="0" cellspacing="0">
            <?php
            if ($bBanner) {
                
                $oAds = new ads;
                $aAd = $oAds->getRandomAd();
            ?>
            <tr>
                <td align="center"><div class="banner"><a href="../redirect.php?id=<?php print $aAd["Ad Id"] ?>&url=<?php print $aAd["URL"] ?>" target="_blank"><img src="<?php print $aAd["Path"] ?>" width="468" height="60" alt="" border="0" /></a></div></td>
            </tr>
            <?php } ?>
            <tr>
                <td>
                <!--| section |-->
                
                <br />
<?php
} // end openPage()

// render page closing
function closePage() {
?>
                <!--| section |-->
                </td>
            </tr>
        </table>
        
        <!--| content |-->
        </td>
    </tr>
    <tr>
        <td width="121" height="1" bgcolor="#CBCACA"><img src="../../_img/spc.gif" width="1" height="1" alt="" border="0" /></td>
        <td width="603" height="1"><img src="../../_img/spc.gif" width="1" height="1" alt="" border="0" /></td>
    </tr>
</table>
<!--| framework |-->

<div class="logo"><?php print ENTITY; ?></div>

</body>
</html>
<?php } ?>
