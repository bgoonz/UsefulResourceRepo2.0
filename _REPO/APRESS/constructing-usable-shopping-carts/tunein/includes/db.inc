<?php
  $hostname="localhost";
  $user="jon";
  $password="fr0gm4n";
  $database="tunein";

  $connection = mysql_connect($hostname, $user, $password)
    or die("Error: could not connect to host $hostname as user $user.");

  mysql_select_db($database, $connection)
    or die("Error: could not select database $database on host $hostname.");
?>
