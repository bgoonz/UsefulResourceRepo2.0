<?php

// File Location: /core/tpl_secure.php

require_once("elements.php");
require_once("class.session.php");

// instantiate session class
$oSess = new session();

// start the session
session_start();

// get and set session info (DO NOT RENAME VARS)
$aSess = explode("|", $_SESSION["sUSER"]);
$iUserId = (int) $aSess[0];
$oSess->setUserId($iUserId);

// get and set permission setting (DO NOT RENAME VARS)
if (!$iPerm = $oSess->getPerms($aSess)) {
    header("Location: ../../site/login/");
}

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

<!--| version <?php print version ?> |-->

<head>
    <meta http-equiv="Refresh" content="<?php print TIMEOUT ?>; url=../../site/login/logout.php" />
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
function openPage($banner = false) {
    
    // reference permission
    global $iPerm, $oSess;
    
    // get menu content
    $aMenu = $oSess->getMenu();
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
            <?php
            // render menu
            if (count($aMenu)) {
                $i = 0;
                while ($i < count($aMenu)) {
            ?>
            <tr>
                <td colspan="2"><img src="../../_img/menu_rules.gif" width="121" height="2" alt="" border="0" /></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/spc.gif" width="1" height="10" alt="" border="0" /></td>
            </tr>
            <tr>
                <td width="15"><img src="../../_img/spc.gif" width="15" height="1" alt="" border="0" /></td>
                <td width="104"><a href="<?php print $aMenu[$i]["App Path"] ?>" class="menu"><?php print $aMenu[$i]["App Name"] ?></a></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/spc.gif" width="1" height="10" alt="" border="0" /></td>
            </tr>
            <?php
                ++$i;
                }
            }
            ?>
            <tr>
                <td colspan="2"><img src="../../_img/menu_rules.gif" width="121" height="2" alt="" border="0" /></td>
            </tr>
            <tr>
                <td colspan="2"><img src="../../_img/spc.gif" width="1" height="10" alt="" border="0" /></td>
            </tr>
            <tr>
                <td width="15"><img src="../../_img/spc.gif" width="15" height="1" alt="" border="0" /></td>
                <td width="104"><a href="../../site/login/logout.php"" onclick="return verify();" class="menu">Logout</a></td>
            </tr>
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

<div class="logo"><?php print ENTITY ?></div>

</body>
</html>
<?php } ?>
