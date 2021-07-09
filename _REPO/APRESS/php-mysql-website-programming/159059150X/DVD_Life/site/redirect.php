<?php

// File Location: /site/redirect.php

require_once("funcs.php");
require_once("class.ads.php");

// instantiate ads class
$oAd = new ads;

// check id get variable
if ($_GET["id"] > 1) {
    
    // get ad
    $id = (int) $_GET["id"];
    $oAd->setId($id);
    
    // redirect
    if ($oAd->redirectAd()) {
        
        // send location header
        header("Location: ".$_GET["url"]);
    }
    
} else { // if the ad was not valid
    
    // then send to the referer instead of hanging on a dead page
    header("Location: ".$_SERVER["HTTP_REFERER"]);
}

?>
