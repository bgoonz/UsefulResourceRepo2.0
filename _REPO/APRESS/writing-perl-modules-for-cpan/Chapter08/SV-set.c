sv_setiv(sv, -10);   // sv contains the signed integer (IV) -10
sv_setuv(sv, 10);    // sv contains the unsigned integer (UV) 10
sv_setnv(sv, 10.5);  // sv contains the unsigned integer (UV) -10
sv_setpv(sv, "10");  // sv contains the string value (PV) "10"
sv_setpvf(sv, "ten: %d", 10);  // sv contains the string value (PV) "ten: 10"
