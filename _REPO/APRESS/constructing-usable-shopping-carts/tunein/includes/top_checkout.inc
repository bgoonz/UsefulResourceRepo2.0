<?php
  session_start();
  $s_id = session_id();

  require_once "../includes/db.inc";
  require_once "../includes/location.inc";
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <title>TuneIn - <?php echo $title; ?></title>
    <link rel="stylesheet" href="../styles/tunein.css" type="text/css" />
  </head>
</html>
