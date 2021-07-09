<?php

// File Location: /_lib/_base/elements.php

/** 
 * reuseable page elements
 *
 * @author Mike Buzzard <src@cubancouncil.com>
 * @version 1.0
 * @since 1.0
 * @access private
 * @copyright Cuban Council
 *
 */

require_once("funcs.php");

// write user errors (usage: must be called inside html body)
function writeErrors() {
  
    global $ERRORS;
    
    if (count($ERRORS)) {
        print "<strong>Error_</strong><br />";
        while(list($key, $value) = each($ERRORS)) {
            print($value)."<br />";
        }
    }
}

// write system errors (usage: must be called in javascript tags inside html head)
function writeExceptions() {
    
    global $EXCEPTS;
    
    $sReturn .= "// exception reporting
    function trace() {
        var msg = \"\";";
        
        if (count($EXCEPTS)) {
            $sMsg = "";
            while(list($key, $value) = each($EXCEPTS)) {
                $sMsg .= "msg = msg + \"".str_replace("\n", "", addslashes($value))."\\n\";\n";
            }
            $sReturn .= $sMsg;
        }
        
    $sReturn .= "\t
        if (msg != \"\") {
            alert(msg);
        }
    }
    document.onload = trace();\n";

	 return $sReturn;
}

// write a pre-formatted array contents
function dump($aArgs) {
    print "<pre>";
    print_r($aArgs);
    print "</pre>";
}

// renders a paginated list for the site admin
function renderList($iCnt=0, $aData='') {
    
    global $iCursor, $iPerm;
?>
<br />
<?php if (is_array($aData)) { ?>
<table width="608" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td width="348" colspan="2"><div class="listrow"><strong>Item Name</strong></div></td>
        <td width="170"><div class="listrow"><strong>Created</strong></div></td>
        <td width="90"><div class="listrow"><?php if ($iPerm > 2) { ?><strong>Actions</strong><?php } ?></div></td>
    </tr>
    <tr>
        <td class="dotrule" colspan="4"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php
    // loop through data and conditionally display functionality and content
    $i = 0;
    while ($i < count($aData)) {
        !strcmp("FFFFFF", $bg) ? $bg = "F6F6F6" : $bg = "FFFFFF";
        $aState = array("act", "deact");
    ?>
    <tr>
        <td width="16" bgcolor="#<?php print $bg ?>"><div class="listrow<?php print $aData[$i]["Status"] ?>"><?php if ($iPerm > 2) { ?><a href="index.php?op=<?php print $aState[$aData[$i]["Status"]] ?>&id=<?php print $aData[$i]["Id"] ?>" onclick="return verify();"><?php } ?><img src="../../_img/icon_status_<?php print $aData[$i]["Status"] ?>.gif" width="16" height="10" alt="" border="0" /><?php if ($iPerm > 2) { ?></a><?php } ?></div></td>
        <td width="332" bgcolor="#<?php print $bg ?>"><div class="listrow<?php print $aData[$i]["Status"] ?>"><?php print format($aData[$i]["Name"]) ?></div></td>
        <td width="170" bgcolor="#<?php print $bg ?>"><div class="listrow<?php print $aData[$i]["Status"] ?>"><?php print date("Y-m-d H:i:s", $aData[$i]["Created"]) ?></div></td>
        <td width="90" bgcolor="#<?php print $bg ?>"><?php if ($iPerm > 1) { ?><a href="form.php?op=edit&id=<?php print $aData[$i]["Id"] ?>">EDIT</a>&nbsp;|&nbsp;<a href="index.php?op=del&id=<?php print $aData[$i]["Id"] ?>" onclick="return verify();">DELETE</a><?php } ?></td>
    </tr>
    <tr>
        <td class="dotrule" colspan="4"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php
        ++$i;
    } // end loop
    ?>
</table>
<?php renderPaging($iCursor, $iCnt) ?>
<?php } else { ?>
<table width="608" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td>There is currently no data avaialbe for this section.</td>
    </tr>
</table>
<?php } // end condition ?>
<?php } // end function ?>
<?php

// sets a generic pagination element
function renderPaging($iCursor=0, $iCnt=0, $sVar='') {

?>
    <?php if ($iCnt > ROWCOUNT) { ?>
<table width="100%" border="0" cellpadding="0" cellspacing="0">    
    <tr>
        <td align="right"><div class="paging">
        <!--| paging |-->
        
        
        <table border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td width="15"><?php if ($iCursor > 0) { ?><a href="<?php print SELF ?>?cursor=<?php print $iCursor - ROWCOUNT ?><?php print $sVar ?>"><img src="../../_img/buttons/btn_prev.gif" width="15" height="15" alt="" border="0" /><?php } else { ?><img src="../../_img/buttons/btn_prev_null.gif" width="15" height="15" alt="" border="0" /><?php } ?></a></td>
                <td width="5"><img src="../../_img/spc.gif" width="5" height="1" alt="" border="0" /></td>
                <td width="15"><?php if ($iCursor + ROWCOUNT < $iCnt) { ?><a href="<?php print SELF ?>?cursor=<?php print $iCursor + ROWCOUNT ?><?php print $sVar ?>"><img src="../../_img/buttons/btn_next.gif" width="15" height="15" alt="" border="0" /><?php } else { ?><img src="../../_img/buttons/btn_next_null.gif" width="15" height="15" alt="" border="0" /><?php } ?></a></td>
            </tr>
        </table>
        
        <!--| paging |-->
        </div></td>
    </tr>
</table>
<br />
    <?php } // end condition ?>
<?php

} // end function

///////////////////////////////////////////////////////////////////////////
// forums functions
///////////////////////////////////////////////////////////////////////////

// write an element of the topic list
function writeTopicLink($topicId,$topicTitle,$replyCount) {
	global $aSess;

?>
    <tr>
        <td>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td align="left">
                    <div class="section">
<?php if( count($aSess) ) { ?>
                    <input type="checkbox" name="favorite[]" value="<?php print $topicId; ?>" />
                    <img src="../../_img/spc.gif" width="10" height="1" alt="" border="0" />
<?php } ?>
                    <a href="showtopic.php?topicId=<?php print $topicId; ?>"><?php print format($topicTitle); ?></a>
                    </td>
                    <td align="right">
             [ <?php print $replyCount; ?> replies ]</div>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>

<?php

}

// write a topic element
function writeTopic($sPoster,$sDate,$iReplies,$sTitle,$sText) {
?>
    <tr>
        <td><div class="forumhead">
        [ posted by <?php print $sPoster; ?> on <?php print $sDate; ?> ] [ <?php print $iReplies; ?> replies ]<br />
        <br />
        <b><?php print format($sTitle); ?></b><br />
        <br />
        <?php print format($sText); ?>     
        </div></td>
    </tr>
    <tr>
        <td class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
<?php
}

// write a reply element
function writeReply($sPoster,$sDate,$sReply,$bDelete = FALSE, $iReplyId = -1) {
?>
    <tr>
        <td><div class="forumreplyhead">
        [ posted by <?php print $sPoster; ?> on <?php print $sDate; ?> ]
        </div>
        <div class="copy">
        <?php print format($sReply); ?>     
        </div>

<?php if( $bDelete ) { ?>
		<br>
		<div class="error">Delete:: <input type="checkbox" name="deletereply[]" value="<?php print $iReplyId; ?>"></div>
<?php } ?>

        </td>
    </tr>
    <tr>
        <td class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
<?php
}


///////////////////////////////////////////////////////////////////////////
// end of forums functions
///////////////////////////////////////////////////////////////////////////


?>
