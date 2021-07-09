SV *sv = newSVpv("foo", 0);
av_store(av, 9, sv);       // $av[9] = "foo"

av_fill(av, 9); // set av's length to 9

SV *sv = newSVpv("foo", 0);
av_push(av, sv);           // push(@av,"foo");

SV *sv = newSVpv("foo", 0);
av_unshift(av, 1);         // unshift(@av, undef);
av_store(av, 0, sv);       // $av[0] = "foo";

