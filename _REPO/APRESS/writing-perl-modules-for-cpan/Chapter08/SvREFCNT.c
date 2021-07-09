SV *sv = newSV();
SV *rv;
printf("%d\n", SvREFCNT(sv)); // prints 1
rv = newRV_inc(sv);           // create a reference to sv
printf("%d\n", SvREFCNT(sv)); // prints 2

SV *hv = newHV();
SV *rv;
printf("%d\n", SvREFCNT((SV *) hv)); // prints 1
rv = newRV_inc(hv);                  // create a reference to hv
printf("%d\n", SvREFCNT((SV *) hv)); // prints 2
