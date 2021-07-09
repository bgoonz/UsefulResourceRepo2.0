if (SvIOK_notUV(sv)) warn("sv contains an IV.");
if (SvIOK_UV(sv))    warn("sv contains a UV.");
if (SvNOK(sv))       warn("sv contains an NV.");
if (SvPOK(sv))       warn("sv contains a PV.");
if (SvNIOK(sv))      warn("sv contains a number of some type (IV, UV or NV)");
if (SvIOK(sv))       warn("sv contains an integer of some type (IV or UV)");
