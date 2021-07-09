void free_it_now (SV *sv) {
   while(SvREFCNT(sv)) SvREFCNT_dec(sv);
}
