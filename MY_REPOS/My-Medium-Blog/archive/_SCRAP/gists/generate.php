#!/usr/bin/env php
<?php

$charsets = mb_list_encodings();

echo "naughty  becomes       charsets\n";
for($i=0x00; $i<=0xFF; ++$i) {
    $ch = chr($i);
    $naughty = [];
    foreach($charsets as $charset) {
        if (mb_strlen("$ch\x5c", $charset) === 1) {
            $naughty[] = $charset.' ['.mb_convert_encoding($ch."\x5c",'utf8',$charset).']';
        }
    }
    if($naughty) {
        $h = sprintf("%02X",$i);
        echo "0x{$h}27   0x{$h}5C 0x27   ".implode(' ',$naughty)."\n";
    }
}