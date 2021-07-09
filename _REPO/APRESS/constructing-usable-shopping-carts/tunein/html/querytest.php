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

<?php
  $query = "SELECT product_group_title
            FROM product_groups
            WHERE product_group_title LIKE 's%'
            ORDER BY product_group_id DESC";

  $result = mysql_query($query);

  $rows = mysql_numrows($result);

  for($i=0; $i<$rows; $i++)
    echo "<p>" . mysql_result($result,$i) . "</p>";


echo "<p>Here's some text...<br />
         And here's some more text....<br />
         And here's yet some more text.</p>";

$some_text = "<p>Yadda yadda yadda<br />\n
                 Blah blah blah blah blah</p>\n";

for($i=0;$i<10;$i++)
{
  $j = $i +1;
  echo "$some_text<p>($j)</p>";
}


?>
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
