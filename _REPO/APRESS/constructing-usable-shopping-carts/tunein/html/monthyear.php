<?php
  $thismonth = date("n");
  $thisyear = date("Y");

  echo "<p>Month: $thismonth; Year: $thisyear.</p>";

  echo ("1" > $thismonth?"TRUE":"FALSE") . "<br />";
  echo ("1" < $thismonth?"TRUE":"FALSE") . "<br />";
?>