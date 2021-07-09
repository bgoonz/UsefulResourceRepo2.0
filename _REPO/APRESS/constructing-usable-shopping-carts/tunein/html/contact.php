<?php
  require_once "../includes/top.inc";
?>
<body>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr> <!--Masthead table row-->
      <td bgcolor="#CCCCCC" width="150" class="tunein">
        <h1>Tune<em class="in">In</em>!</h1>
      </td>
      <td bgcolor="#CCCCCC" align="right">
<!-- SEARCH -->
<?php
  require_once "../includes/search.inc";
?>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top" align="left" width="150" bgcolor="#CCCCCC">
<!-- NAVIGATION -->
<?php
  require_once "../includes/navbar.inc";
?>
      </td>
      <td valign="top">
<!-- CONTENT AREA -->
<h2>Contact Us</h2>
<h3>Order Tracking</h3>
<p>If you've placed an order with us and it hasn't arrived yet, click <a href="ordertrack.php">here</a> to
continue. Please have your <b>Order Confirmation Number</b> handy if possible. (This should be
on the email we sent to you confirming your order.)</p>
<h3>Questions or Comments About Our Site</h3>
<p>If you have a question or comment about our site, please click <a href="contactform.php">here</a>
and fill out our <b>COntact Form</b>. Or email our <a href="webmaster@tunein">Webmaster</a>.</p>
<h3>Music or Concert Inquiries</h3>
<p>Looking for a hard-to-find album, or wanting to know when a favourite artist might be touring? If you
can't seem to find it in our <a href="music.php">Music</a> or <a href="events.php">Events</a> Sections,
fill out the <a href="inquiryform.php">Inquiry Form</a> and one of our Service Reps will get back to you
with a response as soon as possible.</p>
      </td>
      <td valign="top" align="right" width="200">
<?php
  require_once "../includes/short_cart.inc";
?>
      </td>
    </tr>
  </table>
</body>
</html>
