var FFT_cos_table;
var FFT_sin_table;
var FFT_FourierWindowVals;

var FFT_FourierMinThreshold = 0.001;
var FFT_FourierResolutionV = 256.0;
var FFT_FourierResolutionB = 8;

////var FFT_FourierBase = DataExists("SET_Filter_FilterFFT") ? DataGetI("SET_Filter_FilterFFT") : 2048;
var FFT_FourierBase = 2048;
var FFT_FourierWindow = 0;
//var FFT_FourierWindow = 3;
var FFT_Decimation = 1;


var FFT_Fourier_levels = 0;


function FFT_transform_radix2_init(n)
{
    var i;

    // Compute levels = Math.floor(Math.log2(n))
    {
        var temp = n;
        FFT_Fourier_levels = 0;
        while (temp > 1)
        {
            FFT_Fourier_levels++;
            //temp >>= 1;
            temp = temp / 2;
        }
    }

    // Trignometric tables
    for (i = 0; i < n / 2; i++)
    {
        FFT_cos_table[i] = Math.cos(2 * M_PI * i / n);
        FFT_sin_table[i] = Math.sin(2 * M_PI * i / n);
    }
}



function FFT_transform_radix2(real, imag, n)
{
    var size;
    var i;
    var x;

    // Bit-reversed addressing permutation
    for (i = 0; i < n; i++)
    {
        var k;
        var j = 0;
        x = i;
        for (k = 0; k < FFT_Fourier_levels; k++, x >>= 1)
        {
            j = (j << 1) | (x & 1);
        }

        if (j > i)
        {
            var temp = real[i];
            real[i] = real[j];
            real[j] = temp;
            temp = imag[i];
            imag[i] = imag[j];
            imag[j] = temp;
        }
    }

    // Cooley-Tukey decimation-in-time radix-2 FFT
    for (size = 2; size <= n; size *= 2)
    {
        var halfsize = size / 2;
        var tablestep = n / size;
        for (i = 0; i < n; i += size)
        {
            var j;
            var k;
            for (j = i, k = 0; j < i + halfsize; j++, k += tablestep)
            {
                var tpre =  real[j+halfsize] * FFT_cos_table[k] + imag[j+halfsize] * FFT_sin_table[k];
                var tpim = -real[j+halfsize] * FFT_sin_table[k] + imag[j+halfsize] * FFT_cos_table[k];
                real[j + halfsize] = real[j] - tpre;
                imag[j + halfsize] = imag[j] - tpim;
                real[j] += tpre;
                imag[j] += tpim;
            }
        }
        if (size == n)  // Prevent overflow in 'size *= 2'
        {
            break;
        }
    }
}

var FFT_FFT_Mode = 0;

var FFT_Dummy;
var FFT_CalcReal;
var FFT_CalcImag;
var FFT_Raw0;
var FFT_RawX;

function FFT_FFT(raw)
{
    var raw0 = new Float32Array(FFT_FourierBase + 1);

    var I;
    var T;
    var FFT_FourierBase2 = FFT_FourierBase / 2;
    for (I = 0; I < FFT_FourierBase; I++)
    {
        FFT_CalcReal[I] = 0;
        FFT_CalcImag[I] = 0;
    }

    for (I = 0; I < (FFT_FourierBase2 - 2); I++)
    {
        T = raw[I];
        FFT_CalcReal[FFT_FourierBase2 + I] = T;
        FFT_CalcReal[FFT_FourierBase2 - I] = T;
        //FFT_CalcReal[FFT_FourierBase2 + I] = (T * FFT_FourierWindowVals[I]);
        //FFT_CalcReal[FFT_FourierBase2 - I] = (T * FFT_FourierWindowVals[I]);
    }


    FFT_transform_radix2(FFT_CalcReal, FFT_CalcImag, FFT_FourierBase);
    for (I = 0; I < FFT_FourierBase; I++)
    {
        FFT_CalcReal[I] = FFT_CalcReal[I] / FFT_FourierBase;
        FFT_CalcImag[I] = FFT_CalcImag[I] / FFT_FourierBase;
        raw0[I] = Math.sqrt((FFT_CalcReal[I] * FFT_CalcReal[I]) + (FFT_CalcImag[I] * FFT_CalcImag[I])) * FFT_FourierBase;
    }

    if (FFT_Decimation > 1)
    {
        var I_, T;
        I_ = FFT_Decimation;
        T = 0;
        for (I = (FFT_FourierBase - 1); I >= 0; I--)
        {
            T = T + raw0[I];
            I_--;
            if (I_ == 0)
            {
                I_ = FFT_Decimation;
                raw0[I] = T / FFT_Decimation;
                T = 0;
            }
        }
    }
    return raw0;
}


function FFT_Init()
{
    FFT_Dummy = new Float32Array(FFT_FourierBase + 1);
    FFT_CalcReal = new Float32Array(FFT_FourierBase);
    FFT_CalcImag = new Float32Array(FFT_FourierBase);
    FFT_Raw0 = new Float32Array(FFT_FourierBase);
    FFT_RawX = new Float32Array(FFT_FourierBase);

    for (I = 0; I < FFT_FourierBase; I++)
    {
        FFT_Dummy[I] = 0;
    }
    FFT_Dummy[FFT_FourierBase] = -1;

    FFT_transform_radix2_init(FFT_FourierBase);
    var FourierBaseX = FFT_FourierBase / 2;
    var WinT = 0; //Math.round((FourierBaseX * (1024.0 - FFT_WinFactor)) / 1024.0);
    var I;
    for (I = 0; I < FFT_FourierBase; I++)
    {
        FFT_FourierWindowVals[I] = 0;
    }
    if (FFT_FourierWindow == 0)
    {
        // Rectangle
        for (I = WinT; I < (FFT_FourierBase - WinT); I++)
        {
            FFT_FourierWindowVals[I] = 1;
        }
    }
    if (FFT_FourierWindow == 1)
    {
        // Triangle
        for (I = WinT; I < (FFT_FourierBase - WinT); I++)
        {
            var T1 = (I - WinT) * 2;
            var T2 = FFT_FourierBase - WinT - WinT;
            var T3 = (T1 - T2) / T2;
            if (T3 >= 0)
            {
                FFT_FourierWindowVals[I] = 1.0 - T3;
            }
            else
            {
                FFT_FourierWindowVals[I] = 1.0 + T3;
            }
        }
    }
    if (FFT_FourierWindow == 2)
    {
        // Hanning
        for (I = WinT; I < (FFT_FourierBase - WinT); I++)
        {
            var T1 = I - WinT;
            var T2 = FFT_FourierBase - WinT - WinT - 1;
            FFT_FourierWindowVals[I] = (0.5 - 0.5 * Math.cos(2 * M_PI * (T1 / T2)));
        }
    }
    if (FFT_FourierWindow == 3)
    {
        // Blackman
        for (I = WinT; I < (FFT_FourierBase - WinT); I++)
        {
            var T1 = I - WinT;
            var T2 = FFT_FourierBase - WinT - WinT - 1;
            FFT_FourierWindowVals[I] = ((0.42 - 0.5 * Math.cos(2 * M_PI * (T1 / T2))) + (0.08 * Math.cos(4 * M_PI * (T1 / T2))));
        }
    }
    if (FFT_FourierWindow == 4)
    {
        // Hamming
        for (I = WinT; I < (FFT_FourierBase - WinT); I++)
        {
            var T1 = I - WinT;
            var T2 = FFT_FourierBase - WinT - WinT - 1;
            FFT_FourierWindowVals[I] = (0.54 - 0.46 * Math.cos(2 * M_PI * (T1 / T2)));
        }
    }
}




FFT_cos_table = new Float32Array(4000000);
FFT_sin_table = new Float32Array(4000000);
FFT_FourierWindowVals = new Float32Array(8000000);

FFT_Init();
