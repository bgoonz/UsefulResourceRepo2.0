char *string = SvPV(sv, len); // extract string from an SV
if (sv_true(sv)) warn("sv is true!");
if (sv_eq(sv1, sv2))       warn("The SVs are equal");
if (sv_cmp(sv1, sv2) == 0) warn("The SVs are equal");
if (strEQ(string, "foo"))      warn("SV contains foo");
if (strNE(string, "foo"))      warn("SV does not contain foo");
if (strGT(string, "foo"))      warn("SV is greater than foo");
if (strGE(string, "foo"))      warn("SV is greater than or equal to foo");
if (strLT(string, "foo"))      warn("SV is less than foo");
if (strLE(string, "foo"))      warn("SV is less than or equal to foo");
if (strnEQ(string, "foo", 3))  warn("SV starts with foo");
if (sv == &PL_sv_undef) warn("sv is undefined!");
