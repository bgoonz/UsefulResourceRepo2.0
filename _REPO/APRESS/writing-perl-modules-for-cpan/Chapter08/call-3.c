dSP;                                    // declare SP
SV *return                              // declare an SV for the return value

ENTER; SAVETMPS;                        // start a new scope

PUSHMARK(SP) ;                          // prepare to push args
XPUSHs(sv_2mortal(newSVpv("one",0)));   // push three parameters onto the stack
XPUSHs(sv_2mortal(newSVpv("two",0)));
XPUSHs(sv_2mortal(newSVpv("three",0)));
PUTBACK;                                // done pushing arguments

call_pv("Data::Counter::count", G_SCALAR); // make the call

SPAGAIN;                                // refresh SP - it might have changed

return = POPs;                          // get return value off the stack
printf("count: %d\n", SvIV(return));    // print out the return as an integer

FREETMPS; LEAVE;                        // end the scope - freeing mortal 
                                        // variables
