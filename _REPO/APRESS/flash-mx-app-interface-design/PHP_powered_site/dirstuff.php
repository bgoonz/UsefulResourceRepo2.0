<?php

$sitebase = "site/";

if (!isset($matchDir)) $matchDir = "./";
if (!isset($matchExt)) $matchExt = "*";

if ($matchDir == "") $matchDir = "./";

$matchDir = $sitebase . $matchDir;

chdir ($matchDir);
$handle=opendir("./");

$n = 0;

/* This is the correct way to loop over the directory. */
while (false !== ($file = readdir($handle))) 
{ 

	$sz = filesize($file);

	$ext = strtolower(strstr($file, '.'));
	if ($file == "..") $ext = "";
	
	if ($ext == "" && (($sz % 512) != 0)) $ext = "dummyextension";
	
//	echo($ext);
	if ($matchExt != "*")
	{
		if ($ext == $matchExt)
		{
			echo "&file$n=$file&fsize$n=$sz";
			$n++;
		}
	}
	else
	{
		echo "&file$n=$file&fsize$n=$sz";
		$n++;
	}

}

echo("&\n");

closedir($handle); 

?>