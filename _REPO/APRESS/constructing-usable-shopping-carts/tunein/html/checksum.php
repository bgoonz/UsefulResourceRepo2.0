<?php
  $cc_number = "5334700549210400";
  echo "$cc_number<br />";
  $copy = strrev($cc_number);
  echo "$copy<br />";
  $length = strlen($cc_number);
  echo "$length<br />";
  $sum = 0;
  echo "$sum<br />";
  for($c = 0; $c < $length; $c++)
  {
    $digit = substr($copy,$c,1);
  echo "***digit #$c is $digit<br />";
    if($c % 2 == 1)
    {
      $digit *= 2;
      echo "doubled is $digit<br />";
      if($digit > 9)
      {
        echo "sum of digits in $digit ";
        $first_digit = substr($digit,0,1);
        $second_digit = substr($digit,1,1);
        $sum_of_digits = $first_digit + $second_digit;
        echo "is $first_digit + $second_digit = $sum_of_digits<br />";
        $digit = $sum_of_digits;
      }
    }
    $sum += $digit;
    echo "***sum after $c is $sum<br />";
  }
?>