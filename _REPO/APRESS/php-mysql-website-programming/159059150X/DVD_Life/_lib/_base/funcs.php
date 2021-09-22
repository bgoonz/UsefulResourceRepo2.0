<?php

// File Location: /_lib/_base/funcs.php

/** 
 * Common utility functions
 *
 * @author Mike Buzzard <src@cubancouncil.com>
 * @version 1.0
 * @since 1.0
 * @access public
 * @copyright Cuban Council
 *
 */

require_once("config.php");

// catch system exception
function catchExc($sMsg) {
    
    global $EXCEPTS;
    array_push($EXCEPTS, $sMsg);
}

// catch page error
function catchErr($sMsg) {
    
    global $ERRORS;
    array_push($ERRORS, $sMsg);
}

// cleans a string
function clean($sStr) {
    
    $return = stripslashes($sStr);
    $return = htmlentities($return);
    return $return;
}

// add links to a string
function addLinks($sStr) {
    
    $return = preg_replace("/((http(s?):\/\/)|(www\.))([\w\.]+)([\w|\/]+)/i", "<a href=\"http$3://$4$5$6\" target=\"_blank\">$4$5$6</a>", $sStr);
    $return = preg_replace("/([\w|\.|\-|_]+)(@)([\w\.]+)([\w]+)/i", "<a href=\"mailto:$0\">$0</a>", $return);
    return $return;
}

// formats a string
function format($sStr) {
    
    $return = clean($sStr);
    $return = nl2br($return);
    $return = addLinks($return);
    return $return;
}

// get image properties
function getImage($sFile) {
    
    $aParts = getimagesize($sFile);
    $return["x"] = $aParts[0];
    $return["y"] = $aParts[1];
    $return["type"] = $aParts[2];
    $return["properties"] = $aParts[3];
    return $return;
}

?>
