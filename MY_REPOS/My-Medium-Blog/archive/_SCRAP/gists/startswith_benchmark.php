<?php

function substr_startswith($haystack, $needle) {
    return substr($haystack, 0, strlen($needle)) === $needle;
}

function preg_match_startswith($haystack, $needle) {
    return preg_match('~' . preg_quote($needle, '~') . '~A', $haystack) > 0;
}

function substr_compare_startswith($haystack, $needle) {
    return substr_compare($haystack, $needle, 0, strlen($needle)) === 0;
}

function strpos_startswith($haystack, $needle) {
    return strpos($haystack, $needle) === 0;
}

function strncmp_startswith($haystack, $needle) {
    return strncmp($haystack, $needle, strlen($needle)) === 0;
}

function strncmp_startswith2($haystack, $needle) {
    return $haystack[0] === $needle[0]
        ? strncmp($haystack, $needle, strlen($needle)) === 0
        : false;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

echo 'generating tests';
for($i = 0; $i < 100000; ++$i) {
    if($i % 2500 === 0) echo '.';
    $test_cases[] = [
        random_bytes(random_int(1, 7000)),
        random_bytes(random_int(1, 3000)),
    ];
}
echo "done!\n";


$functions = ['substr_startswith', 'preg_match_startswith', 'substr_compare_startswith', 'strpos_startswith', 'strncmp_startswith', 'strncmp_startswith2'];
$results = [];

foreach($functions as $func) {
    $start = microtime(true);
    foreach($test_cases as $tc) {
        $func(...$tc);
    }
    $results[$func] = (microtime(true) - $start) * 1000;
}

asort($results);

foreach($results as $func => $time) {
    echo "$func: " . number_format($time, 1) . " ms\n";
}
