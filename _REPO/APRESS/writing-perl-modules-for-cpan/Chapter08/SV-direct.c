SvIVX(sv_iv) = -100;          // directly set the IV inside sv_iv to -100
SvUVX(sv_uv) = 100;           // directly set the UV inside sv_uv to 100
SvNVX(sv_nv) = 100.10;        // directly set the NV inside sv_nv to 100.5
warn("PV: %s", SvPVX(sv_pv)); // directly access the string inside sv_pv
