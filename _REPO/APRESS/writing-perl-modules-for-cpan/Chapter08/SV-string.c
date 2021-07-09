sv_catpv(sv, "foo");          // adds "foo" to the end of sv
sv_catpvn(sv, "foo", 3);      // adds "foo" to the end of sv, with a length arg
sv_catpvf(sv, "ten: %d", 10); // adds "ten: 10" to the end of sv
sv_catsv(sv_to, sv_from);     // adds the contents of sv_from to the 
                              // end of sv_to

STRLEN len = sv_len(sv);

char *new_ptr = sv_grow(sv, 1024); // grows sv to 1k and returns a pointer to 
                                   // the new character buffer

SvCUR_set(sv, 10);                 // the SV is now 10 bytes long

sv_insert(sv, offset, length, "string to insert", strlen("string to insert"));

SV *sv = newSVpv("Just another Perl hacker.", 0);
sv_chop(sv, SvPVX(sv) + 13);  // sv contains "Perl hacker" after this
