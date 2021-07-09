AV *av1 = newAV();

AV *av;
SV *sv_array[3];
sv_array[0] = newSVpv("foo",0);
sv_array[1] = newSVpv("bar",0);
sv_array[2] = newSVpv("baz",0);
av = av_make(3, sv_array);     // create an array from the three SVs
