/*
Test on how are JS's switch-cases are working.
I was in an argument w/ someone saying they turn into jumptables,
so I coded this up quickly to check.
With a few calls (so JIT won't kick in) it is clear that this executes
every case every time we enter the switch, so it is clear that jump tables
are not used in general, but they still might be used as an optional optimization,
but only when possible.
*/

function test(x) {
    switch (x) {
        case (_=>{console.log("TEST 1"); return 1;})():
            return;
        case (_=>{console.log("TEST 2"); return 2;})():
            return;
        case (_=>{console.log("TEST 3"); return 3;})():
            return;
        case (_=>{console.log("TEST 4"); return 4;})():
            return;
        case (_=>{console.log("TEST 5"); return 5;})():
            return;
        case (_=>{console.log("TEST 6"); return 6;})():
            return;
        default:
            return "Nope";
    }
}