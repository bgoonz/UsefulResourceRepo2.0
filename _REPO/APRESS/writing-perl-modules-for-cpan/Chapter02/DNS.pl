use BOA::Network::DNS;

# tie hash to BOA::Network::DNS - provide nameserver as argument to constructor
tie %dns, 'BOA::Network::DNS', nameserver => '10.0.0.1';

# lookup IP address for www.perl.com
print "www.perl.com : ", $dns{'www.perl.com'} || "not found!", "\n";

# do a reverse lookup for the DNS server
print "The name for the DNS server is: ", $dns{'10.0.0.1'} || "not found!", "\n";
