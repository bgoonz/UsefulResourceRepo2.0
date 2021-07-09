<?php
  echo "<p>\$PHP_SELF = " . $PHP_SELF . "</p>";
  echo "<p>\$REQUEST_URI = " . $REQUEST_URI . "</p>";
  echo "<p>\$HTTP_SERVER_VARS[\"REQUEST_URI\"] = " . $HTTP_SERVER_VARS["REQUEST_URI"] . "</p>";
  echo "<p>\$QUERY_STRING = " . $QUERY_STRING . "</p>";
  echo "<p>\$HTTP_SERVER_VARS[\"QUERY_STRING\"] = " . $HTTP_SERVER_VARS["QUERY_STRING"] . "</p>";
?>