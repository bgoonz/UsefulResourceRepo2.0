(function (
  a, // Decimal number

  m, // Reverse replacement rules
     //             0   1    2     3      4     5    6     7      8       9
     //   default: ["", "0", "00", "000", "10", "1", "01", "001", "0001", "20"]
     // 
     //   example: 
     //     0              -> ''
     //     1              -> I    0 - I
     //     7              -> VII  1 - V, 0 - I
     //     9              -> IX   2 - X, 0 - I
     //     11(1 + 1 * 10) -> XI

  l, // Language 
     //   default:  "IVXLCDM" (1,5,10,50,100,500,1000)
     //   extended: "IVXLCDMↁↂ" (..., 5000, 10000)
i,j,r,z) {
    for (
          a=(a+'').split('').reverse(), // reverse decimal number and make it iterable
          i=-1, // decimal number digit pointer
          r=''  // result
        ;
          a[++i] // while digits do...
        ;)
          for (
                j=-1           // reset replacement pointer
              ;
                z=m[a[i]][++j] // get next replacement by current digit and replacement 
                               // z = replacement_rules_by_decimal[decimal_number][replacement_index]
              ;)
                r = l[+z+i*2] + r; // replace: language[current_replcement + decimal_digit_index * 2] and save

    return r;
})