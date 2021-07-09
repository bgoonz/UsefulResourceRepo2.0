SV **svp;
svp = av_fetch(av, 10, 0); // fetch $av[10] (the 0 indicates this isn't an
                           // lvalue)
if (!svp) croak("fetch failed: av doesn't have a tenth element!");

SV *sv;
if (av_exists(av, 9)) {         // check that the 10th element exists
   sv = *(av_fetch(av, 9, 0));  // safely trust av_fetch to return non-NULL
} else {
   croak("av doesn't have a tenth element!");
}

SV *sv;
if (av_len(av) >= 9) {          // check that $#av >= 9
   sv = *(av_fetch(av, 9, 0));  // safely trust av_fetch to return non-NULL
} else {
   croak("av doesn't have a tenth element!");
}
