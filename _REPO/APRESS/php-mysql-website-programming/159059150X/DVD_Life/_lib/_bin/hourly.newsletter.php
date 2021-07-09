#!/usr/bin/php
<?php

/* COPYRIGHT NOTICE
This software is copyright ©2002 Code Is Art™ and licensed for use by distribution from Code Is Art™ only.
This source code may not be redistibuted without written consent from the above mentioned entity. */

ini_set("include_path", ini_get("include_path").":/var/www/html/_lib/_base/:/var/www/html/_lib/_classes/:/var/www/html/site/:/var/www/html/core/");

require_once("class.newsletter.php");

$oNewsletter = new newsletter;

// Get the Newsletter Id of a Message that is needing to be sent
$iNewsletterId = $oNewsletter->getNewsletterToSend();

/**
 * Check to make sure that no letter is currently being sent
 * and that there is currently a message to send
 */
if ($iNewsletterId && !$oNewsletter->checkSend()){

    // Set the Newsletter Id and begin to send
    $oNewsletter->setNewsletterId($iNewsletterId);
    $oNewsletter->sendNewsletter();
}

exit;
?>
