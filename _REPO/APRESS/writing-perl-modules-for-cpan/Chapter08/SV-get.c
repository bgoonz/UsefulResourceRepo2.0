IV iv = SvIV(sv);          // get an IV from sv
UV uv = SvUV(sv);          // get a UV from sv
NV nv = SvNV(sv);          // get an NV from sv
STRLEN len;
char  *pv = SvPV(sv, len); // get a PV from sv, setting len to the 
                           // length of the string
