if ($] > 5.00405) {
    require File::Spec;
    $path = File::Spec->catfile($foo, $bar, $baz);
} else {
    $path = join('/', $foo, $bar, $baz);
}
