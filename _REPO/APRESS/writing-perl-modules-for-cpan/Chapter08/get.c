SV *sv = get_sv("Data::Dumper::Purity", 0); // access $Data::Dumper::Purity
AV *av = get_av("main::DATA", 1);           // create/access the global @DATA
HV *av = get_hv("main::VALUES", 1);         // create/access the global %VALUES
