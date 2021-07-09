<?php

// File Location: /_lib/_base/config.php

/** 
 * Assign configuration variables
 *
 * @author Mike Buzzard <src@cubancouncil.com>
 * @version 1.0
 * @since 1.0
 * @access public
 * @copyright Cuban Council
 *
 */

/* set version number */
define("VERSION", "1.0");                              // apps version

/* assign php configuration variables */
ini_set("track_errors", "1");                          // error tracking

/* assign base system constants */
define("SITE_URL", "http://wrox.mediatemple.net");     // base site url
define("SITE_DIR", "/");                               // base site directory
define("BASE_DIR", $_SERVER["DOCUMENT_ROOT"]);         // base file directory
define("SELF", $_SERVER["PHP_SELF"]);                  // self file directive
define("FILEMAX", 1500000);                             // file size max

/* assign base database constants */
define("PREFIX", "wrox");                              // database table prefix
define("TIMEOUT", 3600);                               // timeout (seconds)
define("ROWCOUNT", 10);                                // rows to show per page
define("DSN", "mysql://admin:l3tm3in@localhost/wrox"); // DSN for PEAR usage

/* assign base mail constants */
define("SMTP_HOST", "localhost");                      // SMTP hostname
define("SMTP_PORT","25");                              // SMTP port default=25
define("FROM_NAME","DVD Life");                        // newsletter from name
define("FROM_EMAIL","info@wrox.mediatemple.net");      // newsletter from email

/* assign base entity constants */
define("TITLE", "DVDLife.com");                        // base page title
define("ENTITY", "DVD Life");                          // entity name
define("EMAIL", "support@objectiv.com");               // admin email

/* assign instance variables */
$EXCEPTS = array();                                    // exceptions array
$ERRORS = array();                                     // errors array
$FILES = array("jpg", "gif", "png");                   // file types array
$FORMOK = true;                                       // form status

set_magic_quotes_runtime(1);                           // magic quotes on

?>
