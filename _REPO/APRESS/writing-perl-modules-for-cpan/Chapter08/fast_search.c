int fast_search (SV *source, SV *search) {
  char *found; // pointer to hold result of search

  // compile search string using Boyer-Moore algorithm
  fbm_compile(search, 0);

  // conduct the search for the search string inside source
  found = fbm_instr(SvPVX(source), SvEND(source), search, 0);

  // if the search failed, return -1
  if (found == Nullch) return -1;

  // return the offset of search within source
  return found - SvPVX(source);
}
