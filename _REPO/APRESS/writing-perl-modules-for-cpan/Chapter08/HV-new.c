HV *hv = newHV();

SV **svp;
// fetch $hv{foo} (last arg indicates lvalue status)
svp = hv_fetch(hv, "foo", strlen("foo"), 0); 
if (!svp) croak("fetch failed: hv does not contain value for key foo");

SV *sv;
// check that $hv{foo} exists
if (hv_exists(hv, "foo", strlen("foo"))) {
   // safely trust hv_fetch to return non-NULL
   sv = *(hv_fetch(hv, "foo", strlen("foo"), 0)); 
} else {
   croak("fetch failed: hv does not contain value for key foo");
}
