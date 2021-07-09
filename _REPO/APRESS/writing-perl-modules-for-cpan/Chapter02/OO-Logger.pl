use BOA::Logger;
my $logger = BOA::Logger->new('logs/boa.log');
$logger->level(10);
$logger->write(10, "Hello world!");
