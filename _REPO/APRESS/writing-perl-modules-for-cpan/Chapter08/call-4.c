dSP;                                    // declare SP
int num;                                // declare an int for the return count
int i;                                  // declare a loop counter

ENTER; SAVETMPS;                        // start a new scope

PUSHMARK(SP) ;                          // prepare to push args
XPUSHs(sv_2mortal(newRV_inc((SV*)av1))); // push three arrays onto the stack
XPUSHs(sv_2mortal(newRV_inc((SV*)av2))); // by reference
XPUSHs(sv_2mortal(newRV_inc((SV*)av3)));
PUTBACK;                                // done pushing arguments

num = call_pv("Data::Counter::count", G_ARRAY); // make the call

SPAGAIN;                                // refresh SP - it might have changed

// print out the returned counts, in reverse order
for(i = num; i > 0; i++) {
  printf("count %d: %d\n", i, SvIV(POPs));
}

FREETMPS; LEAVE;                        // end the scope - freeing mortal 
                                        // variables
