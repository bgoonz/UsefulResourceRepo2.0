dSP;                                    // declare SP
ENTER; SAVETMPS;                        // start a new scope

PUSHMARK(SP) ;                          // prepare to push args
XPUSHs(sv_2mortal(newSVpv("Human",0))); // push a single parameter onto the
                                        // argument stack
PUTBACK;                                // done pushing arguments

call_pv("Hello::say_hello", G_DISCARD); // make the call

FREETMPS; LEAVE;                        // end the scope - freeing mortal 
                                        // variables
