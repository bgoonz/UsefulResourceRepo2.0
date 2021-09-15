function IntToHex4(N)
{
    switch (N)
    {
        case  0: return "0";
        case  1: return "1";
        case  2: return "2";
        case  3: return "3";
        case  4: return "4";
        case  5: return "5";
        case  6: return "6";
        case  7: return "7";
        case  8: return "8";
        case  9: return "9";
        case 10: return "a";
        case 11: return "b";
        case 12: return "c";
        case 13: return "d";
        case 14: return "e";
        case 15: return "f";
    }
    alert("IntToHex4(" + N + ")");
    return "0";
}

function IntToHex8(N)
{
    return(IntToHex4(Math.floor(N / 16)) + IntToHex4(N % 16));
}

function HexToInt4(N)
{
    switch (N[0])
    {
        case "0": return  0;
        case "1": return  1;
        case "2": return  2;
        case "3": return  3;
        case "4": return  4;
        case "5": return  5;
        case "6": return  6;
        case "7": return  7;
        case "8": return  8;
        case "9": return  9;
        case "a": return 10;
        case "A": return 10;
        case "b": return 11;
        case "B": return 11;
        case "c": return 12;
        case "C": return 12;
        case "d": return 13;
        case "D": return 13;
        case "e": return 14;
        case "E": return 14;
        case "f": return 15;
        case "F": return 15;
    }
    alert("HexToInt4(" + N + ")");
    return 0;
}

function HexToInt8(N)
{
    return((HexToInt4(N[0]) * 16) + HexToInt4(N[1]));
}

function ColorTextToValues(V, R, G, B)
{
    if (V.length == 7)
    {
        if (V[0] == "#")
        {
            var Good = true;
            for (var I = 1; I < 7; I++)
            {
                if (((V[I] < '0') || (V[I] > '9')) && ((V[I] < 'A') || (V[I] > 'F')) && ((V[I] < 'a') || (V[I] > 'f')))
                {
                    Good = false;
                }
            }
            if (Good)
            {
                R = HexToInt8(V.substring(1,3));
                G = HexToInt8(V.substring(3,5));
                B = HexToInt8(V.substring(5,7));
            }
        }
    }
    return [R, G, B];
}

function ColorValuesToText(R, G, B)
{
    return "#" + IntToHex8(R) + IntToHex8(G) + IntToHex8(B);
}
