<?php
function fncMonthSelection() {

$today = getdate();
//  $thismonth = $today["mon"];
$thismonth = 1;
$nameofselectbox = "month";

print "<select name = \"$nameofselectbox\">\n";

	for ($x=$thismonth;$x<13;$x++){
	print "<option value='" . date("m", mktime(0,0,0,$x,1,0)) . "'>" . date ("F",mktime(0,0,0,$x,1,0)) . "</option>\n";
	}

print "</select>\n";
return;
}
?>
<html>
<head>
<title>Example Listbox</title>
<meta http-equiv="Content-Type" content="text/html;
charset=iso-8859-1">
</head>
<body bgcolor="#FFFFFF">
<form name="form1">

<?php
fncMonthSelection();
?>

</form>
</body>
</html>