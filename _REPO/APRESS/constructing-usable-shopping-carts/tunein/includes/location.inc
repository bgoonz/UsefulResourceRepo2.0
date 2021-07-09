<?php
  $pages = array('Home','Music','Shows','News','Contact','Help','','');
  $links = array('index','music','events','news','contact','help','cart','checkout');
  $titles = array('Home Page','Album/Artist Info','Concert Info',
    'Music News','Contact Us','Get Help','View or Update Your Shopping Cart','Checkout');

  $navbar = "";
  $title = "";

  for($i=0; $i<8; $i++)
  {
    if( strpos($PHP_SELF,$links[$i]) === FALSE )
    {
      $bgcolor = "#CCCCCC";
      $link = "<a class=\"nav\" href=\"$links[$i].php\" title=\"$titles[$i]\">$pages[$i]</a>";
    }
    else
    {
      $bgcolor = "#FFFFFF";
      $link = "<a class=\"nav2\" href=\"$links[$i].php\" title=\"[You Are Here]\">$pages[$i]</a>";
      $title = $titles[$i];
    }
    if( $i < count($pages)-2 )
      $navbar .= "<tr><td bgcolor=\"$bgcolor\">$link</td></tr>\n";
  }
?>