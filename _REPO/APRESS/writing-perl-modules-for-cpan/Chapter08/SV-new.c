SV *sv_iv, *sv_uv, *sv_nv, *sv_pv;
sv_iv = newSViv(-10);       // sv_iv contains the signed integer value -10
sv_uv = newSVuv(10);        // sv_uv contains the unsigned integer value 10
sv_nv = newSVnv(10.5);      // sv_nv contains the floating-point value 10.5
sv_pv = newSVpv("ten", 0);  // sv_pv contains the string "ten", the second
                            // parameter tells Perl to compute the length with
                            // strlen()
sv_pv = newSVpvn("ten", 3);  // second parameter gives the length of "10"
sv_pv = newSVpvf("%d", 10);  // sv_pv contains the string "10"
