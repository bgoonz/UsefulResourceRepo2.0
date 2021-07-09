SV *sv = newSVpv("foo",0); // $sv = "foo";
SV *rv = newRV_inc(sv);    // $rv = \$sv;

HV *hash_of_arrays_hv = newHV();
AV *foo_av            = newAV();
AV *bar_av            = newAV();

// fill in arrays
push_av(foo_av, newSViv(1));
push_av(foo_av, newSViv(2));
push_av(foo_av, newSViv(3));
push_av(bar_av, newSViv(4));
push_av(bar_av, newSViv(5));
push_av(bar_av, newSViv(6));

// create references and assign to hash
hv_store(hash_of_arrays_hv, "foo", 3, newRV_inc((SV*)foo_av), 0);
hv_store(hash_of_arrays_hv, "bar", 3, newRV_inc((SV*)bar_av), 0);

SV *sv_rv = NEWSV(0,0);
sv_setref_iv(sv_rv, Nullch, -10);  // sv_rv now a ref to an SV containing -10
sv_setref_uv(sv_rv, Nullch, 10);   // sv_rv now a ref to an SV containing 10
sv_setref_nv(sv_rv, Nullch, 10.5); // sv_rv now a ref to an SV containing 10.5
sv_setref_pvn(sv_rv, Nullch, "foo", 3); // sv_rv now a ref to an SV 
                                        // containing "foo"
sv_setref_iv(sv_rv, "Math::BigInt", -10); // sv_rv is now a reference blessed 
                                          // into the Math::BigInt class.
