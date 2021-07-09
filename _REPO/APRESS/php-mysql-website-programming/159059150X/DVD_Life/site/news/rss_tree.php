<?
require_once("class.news.php");
require_once("funcs.php");
require_once("XML/Tree.php");


header("Content-type: text/xml");

// string variable we will need here
$sServer = "http://" . $_ENV["HOSTNAME"];

// instantiate news and tree objects
$oNews = new news;
$oTree = new XML_Tree;

// get news types
$aTypes = $oNews->getNewsTypes();

// set the $iType and $iCursor variables that we will need
// for the getActiveNewsItems() method
$_GET["type"] ? $iType = $_GET["type"] : $iType = $aTypes[0]["News Type Id"];
$_GET["cursor"] ? $iCursor = $_GET["cursor"] : $iCursor = 0;

// get a associative array with the active news items
$aNews = $oNews->getActiveNewsItems($iCursor,$iType);

// set namespace values for RDF framework in array
$aRdfNamespace["xmlns:rdf"] = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
$aRdfNamespace["xmlns"] = "http://purl.org/rss/1.0/";

// create the root node
$oRoot =& $oTree->addRoot("rdf:RDF" , "" , $aRdfNamespace);

// create base nodes for the channel
$oChannel =& $oRoot->addChild("channel" , "" , array("rdf:about" => $sServer) );
$oChannel->addChild("title" , "DVD Life News");
$oChannel->addChild("link" , $sServer);
$oChannel->addChild("description" , "News for DVD Enthusiasts!");

// now add the items element under "channel"
// and the item elements under the root node
$oItems =& $oChannel->addChild("items");
$oSeq =& $oItems->addChild("rdf:Seq");

for( $i=0 ; $i < count($aNews) ; ++$i) {
	$sLink = $sServer . dirname(SELF) . "/detail.php?id=" . $aNews[$i]["News Id"];

	// just show the first 80 characters of any given article
	if( strlen($aNews[$i]["Article"]) > 80 ) {
		$sArticle = format(substr($aNews[$i]["Article"] , 0 , 77) . "...");
	} else {
		$sArticle = format($aNews[$i]["Article"]);
	}

	// ad the li resource for the items element
	$oSeq->addChild("rdf:li" , "" , array("resource" => $sLink) );

	// add a new item element under the root node
	$oItem =& $oRoot->addChild("item" , "" , array("rdf:about" => $sLink) );
	$oItem->addChild("title" , format($aNews[$i]["Title"]));
	$oItem->addChild("link" , $sLink);
	$oItem->addChild("description" , $sArticle);
}

// print out the rss feed
print $oTree->dump();

?>