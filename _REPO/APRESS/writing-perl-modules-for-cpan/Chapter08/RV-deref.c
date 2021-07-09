AV *av;
if (SvTYPE(SvRV(sv_rv)) == SVt_PVAV) {
   av = (AV *) SvRV(sv_rv); // safely cast dereferenced value to an AV
} else {
   croak("sv_rv isn't a reference to an array!");
}
