package BOA::Probe;
use Class::Struct;

# create accessors and constructor
struct(id       => '$',
       model    => '$',
       contents => '$',
       heading  => '$',
       status   => '$');
1;
