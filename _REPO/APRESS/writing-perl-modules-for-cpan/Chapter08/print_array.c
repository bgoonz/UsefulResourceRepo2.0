void print_array (AV *av) {
   SV    *sv;     // SV pointer to hold return from array
   char  *string; // string pointer to hold SV string value
   STRLEN len;    // unused length value for SvPV()
   I32 i = 0;     // loop counter

   // loop over all valid indexes
   for (i = 0; i <= av_len(av); i++) {
      sv = *(av_fetch(av, i, 0));   // get the SV for this index
      string = SvPV(sv, len);       // get a stringified form of the SV
      printf("%s\n", string);       // print it out, one value per line
    }
}
