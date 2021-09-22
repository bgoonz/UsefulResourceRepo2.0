if (SvTYPE(SvRV(sv_rv)) == SVt_PVAV) printf("sv_rv is a ref to an AV.\n");
if (SvTYPE(SvRV(sv_rv)) == SVt_PVHV) printf("sv_rv is a ref to an HV.\n");
if (SvTYPE(SvRV(sv_rv)) == SVt_IV ||
    SvTYPE(SvRV(sv_rv)) == SVt_NV ||
    SvTYPE(SvRV(sv_rv)) == SVt_PV)   printf("sv_rv is a ref to an SV.\n");
