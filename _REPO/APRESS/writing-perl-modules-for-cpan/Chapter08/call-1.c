dSP;                                             // declare SP
PUSHMARK(SP);                                    // setup for call
call_pv("Hello::say_hello", G_NOARGS|G_DISCARD); // call say_hello with no args
                                                 // and no return value
