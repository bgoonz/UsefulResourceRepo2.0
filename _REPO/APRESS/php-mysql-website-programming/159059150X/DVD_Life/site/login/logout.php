<?php

// File Location: /site/login/logout.php

require_once("tpl_unsecure.php");
require_once("class.session.php");

// clear login cookie
$_SESSION["sUSER"] = null;
unset($_SESSION["sUSER"]);

setHeader();
openPage();

?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY ?> Administrator Logout</div></td>
    </tr>
    <tr>
        <td><div class="copy">You have successfully logged out of the system.<br><br>
        Would you like to <a href="index.php">Login</a> again?</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
    </tr>
</table>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="copy"></div></td>
    </tr>
</table>

<?php closePage(); ?>
