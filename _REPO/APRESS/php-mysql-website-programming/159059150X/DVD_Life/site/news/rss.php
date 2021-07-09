<?
require_once("class.news.php");
require_once("class.rssfeed.php");
require_once("funcs.php");

header("Content-type: text/xml");

// string variable we will need here
$sServer = "http://" . $_ENV["HOSTNAME"];

// instantiate news and rss objects
$oNews = new news;
$oRssFeed = new rssfeed;

// get news types
$aTypes = $oNews->getNewsTypes();

// set the $iType and $iCursor variables that we will need
// for the getActiveNewsItems() method
$_GET["type"] ? $iType = $_GET["type"] : $iType = $aTypes[0]["News Type Id"];
$_GET["cursor"] ? $iCursor = $_GET["cursor"] : $iCursor = 0;

// get a associative array with the active news items
$aNews = $oNews->getActiveNewsItems($iCursor,$iType);

// base infomation for this RSS channel
$oRssFeed->setChannelTitle("DVD Life News");
$oRssFeed->setChannelLink($sServer);
$oRssFeed->setChannelDescription("News for DVD Enthusiasts!");
$oRssFeed->setChannelAbout($sServer);

// loop through news items and add info to the rss feed
for( $i=0 ; $i < count($aNews) ; ++$i ) {

	// just show the first 80 characters of any given article
	if( strlen($aNews[$i]["Article"]) > 80 ) {
		$sArticle = format(substr($aNews[$i]["Article"] , 0 , 77) . "...");
	} else {
		$sArticle = format($aNews[$i]["Article"]);
	}

	// start a new item
	$oRssFeed->startItem();

	// set item title
	$oRssFeed->setItemTitle(format($aNews[$i]["Title"]));

	// set item link
	$oRssFeed->setItemLink($sServer . dirname(SELF) . "/detail.php?id=" . $aNews[$i]["News Id"]);

	// set item description
	$oRssFeed->setItemDescription($sArticle);

	// end the item
	$oRssFeed->endItem();
}

// print out the rss feed
print $oRssFeed->getRssFeed();

?>