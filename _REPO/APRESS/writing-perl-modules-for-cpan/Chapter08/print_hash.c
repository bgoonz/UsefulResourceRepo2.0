void print_hash (HV *hv) {
   SV *sv;
   I32 i, count;
   char *key_string;
   STRLEN len;

   // initialize the iteration
   count = hv_iterinit(hv);

   // loop over key/value pairs
   for (i = 1; i <= count; i++) {
      sv = hv_iternextsv(hv, &key_string, (I32*) &len);
      printf("%s : %s\n", key_string, SvPV(sv, len));
    }
}
