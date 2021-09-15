function AudioWorker()
{
    var WORK_Spectrum = true;
    var WORK_ScopeI = false;
    var WORK_ScopeO = false;

    var SET_ScopeW = 0;
    var SET_ScopeH = 0;
    var SET_ScopeFactor = 0;
    var SET_ScopeGainX = 0;
    var SET_ScopeGainY = 0;
    var SET_ScopeGainZ = 0;
    var SET_ScopePlotMidSide = false;
    var SET_ScopeDimming = 1;
    var SET_ScopePixelFactor = 0;

    var ScopeFactor = 0;
    var ScopeGainX = 0;
    var ScopeGainY = 0;
    var ScopeGainZ = 0;

    var ScopeArrayI = new Array();
    var ScopeArrayO = new Array();
    var ScopeArrayDummy = new Array();

    var ScopeDistArray = new Array();
    var ScopeDistMax = 0;
    var ScopeX_I = 0;
    var ScopeY_I = 0;
    var ScopeX_O = 0;
    var ScopeY_O = 0;
    var ScopeDimmingC = 0;

    var ScopePixelFactor = 0;

    var ScopeX0;
    var ScopeY0;
    var ScopeX0G;
    var ScopeY0G;
    var ScopeMaxX;
    var ScopeMaxY;

    function ScopeSetParams()
    {
        if (WORK_ScopeI || WORK_ScopeO)
        {
            ScopeDimmingC = 0;
            if (SET_ScopeFactor > 0)
            {
                ScopeFactor = Math.pow(SET_ScopeFactor / 1000, SET_ScopeDimming);
            }
            else
            {
                ScopeFactor = 0;
            }
            ScopeGainX = SET_ScopeGainX / 1000;
            ScopeGainY = SET_ScopeGainY / 1000;
            ScopeGainZ = (SET_ScopeGainZ * 65536) / 1000000;

            ScopeX0 = Math.floor(SET_ScopeW / 2);
            ScopeY0 = Math.floor(SET_ScopeH / 2);
            var ScopeMaxX_ = ScopeX0 + ScopeX0;
            var ScopeMaxY_ = ScopeY0 + ScopeY0;

            if ((ScopeMaxX != ScopeMaxX_) || (ScopeMaxY != ScopeMaxY_))
            {
                ScopeMaxX = ScopeMaxX_;
                ScopeMaxY = ScopeMaxY_;

                ScopeArrayI = new Array();
                ScopeArrayO = new Array();
                for (var X = 0; X <= ScopeMaxX; X++)
                {
                    ScopeArrayI[X] = new Array(ScopeMaxY);
                    ScopeArrayO[X] = new Array(ScopeMaxY);
                    for (var Y = 0; Y <= ScopeMaxY; Y++)
                    {
                        ScopeArrayI[X][Y] = 0;
                        ScopeArrayO[X][Y] = 0;
                    }
                }

                ScopeDistMax = 2 * ((ScopeMaxX * ScopeMaxX) + (ScopeMaxY + ScopeMaxY));

                ScopeX_I = ScopeX0;
                ScopeY_I = ScopeY0;
                ScopeX_O = ScopeX0;
                ScopeY_O = ScopeY0;
            }

            ScopeDistArray = new Array(ScopeDistMax);
            ScopeDistArray[0] = 0;
            ScopePixelFactor = SET_ScopePixelFactor / 1000;
            var ScopePixelFactor0 = 1 - ScopePixelFactor;
            for (var I = 1; I <= ScopeDistMax; I++)
            {
                var Dist = Math.sqrt(I);
                ScopeDistArray[I] = (1 / Dist) * ScopePixelFactor0;
            }

            ScopeX0G = ScopeX0 * ScopeGainX;
            ScopeY0G = ScopeY0 * ScopeGainY;
        }
    }



    function ScopePlotLine(ScopeArray, X0, Y0, X1, Y1)
    {
        var DX = X1 - X0;
        var DY = Y1 - Y0;
        var IncX = (DX > 0 ? 1 : -1);
        var IncY = (DY > 0 ? 1 : -1);
        var D = 0;
        var DeltaA = 0;
        var DeltaB = 0;
        var X = 0;
        var Y = 0;
        var I;
        var X_;
        var Y_;

        if (DX < 0) { DX = 0 - DX; }
        if (DY < 0) { DY = 0 - DY; }

        var Dist = ((DX * DX) + (DY * DY));
        var Val;

        if (Dist > 0)
        {
            if (Dist > ScopeDistMax)
            {
                Val = ScopeDistArray[ScopeDistMax];
            }
            else
            {
                Val = ScopeDistArray[Dist];
            }

            if ((X0 >= 0) && (Y0 >= 0) && (X0 <= ScopeMaxX) && (Y0 <= ScopeMaxY))
            {
                ScopeArray[X0][Y0] = ScopeArray[X0][Y0] + ScopePixelFactor;
            }

            if (DX > DY)
            {
                D = 2 * DY - DX;
                DeltaA = 2 * DY;
                DeltaB = 2 * DY - 2 * DX;
                X = 0;
                Y = 0;
                for (I = 1; I <= DX; I++)
                {
                    X_ = X0 + X;
                    Y_ = Y0 + Y;
                    if ((X_ >= 0) && (Y_ >= 0) && (X_ <= ScopeMaxX) && (Y_ <= ScopeMaxY))
                    {
                        ScopeArray[X_][Y_] = ScopeArray[X_][Y_] + Val;
                    }
                    if (D > 0)
                    {
                        D = D + DeltaB;
                        X = X + IncX;
                        Y = Y + IncY;
                    }
                    else
                    {
                        D = D + DeltaA;
                        X = X + IncX;
                    }
                }
            }
            else
            {
                D = 2 * DX - DY;
                DeltaA = 2 * DX;
                DeltaB = 2 * DX - 2 * DY;
                X = 0;
                Y = 0;
                for (I = 1; I <= DY; I++)
                {
                    X_ = X0 + X;
                    Y_ = Y0 + Y;
                    if ((X_ >= 0) && (Y_ >= 0) && (X_ <= ScopeMaxX) && (Y_ <= ScopeMaxY))
                    {
                        ScopeArray[X_][Y_] = ScopeArray[X_][Y_] + Val;
                    }
                    if (D > 0)
                    {
                        D = D + DeltaB;
                        X = X + IncX;
                        Y = Y + IncY;
                    }
                    else
                    {
                        D = D + DeltaA;
                        Y = Y + IncY;
                    }
                }
            }
        }
        else
        {
            if ((X0 >= 0) && (Y0 >= 0) && (X0 <= ScopeMaxX) && (Y0 <= ScopeMaxY))
            {
                ScopeArray[X0][Y0] = ScopeArray[X0][Y0] + 1;
            }
        }
    }

    var FFT_cos_table;
    var FFT_sin_table;
    var FFT_FourierWindowVals;

    var FFT_FourierMinThreshold = 0.001;
    var FFT_FourierResolutionV = 256.0;
    var FFT_FourierResolutionB = 8;

    var FFT_FourierBase = 1024;
    var FFT_FourierWindow = 3;
    var FFT_WinFactor = 1024;
    var FFT_Decimation = 1;


    var IsPaused = false;

    var AudioModeLI = false;
    var AudioModeRI = false;
    var AudioModeMI = false;
    var AudioModeSI = false;
    var AudioModeLO = false;
    var AudioModeRO = false;
    var AudioModeMO = false;
    var AudioModeSO = false;

    var SampleRate;
    var SampleDecimation = 1;
    var SampleDecimationBufIL = 0;
    var SampleDecimationBufIR = 0;
    var SampleDecimationBufOL = 0;
    var SampleDecimationBufOR = 0;
    var SampleDecimationCounter = 0;

    var SpectrumStep = 32;
    var SpectrumStepCounter = 0;
    var SpectrumGain = 1;
    var SpectrumBase = 0;
    var SpectrumMinMax = 0;
    var SpectrumMinMaxX = 0;
    var SpectrumLog = false;    
    var SpectrumLogBase = 0;
    var SpectrumLogFactor = 0;
    var SpectrumLogOffset = 0;


    var BufDataLI = [];
    var BufDataRI = [];
    var BufDataMI = [];
    var BufDataSI = [];
    var BufDataLO = [];
    var BufDataRO = [];
    var BufDataMO = [];
    var BufDataSO = [];

    var BufPointer = 0;
    var BufLength = 10000000;


    var BufPointer0 = 0;
    var BufDisp = 200;
    var BufDisp0 = 200;
    var BufIgnited = false;
    var BufCounter = 0;
    var BufPerTick = 50;
    var BufOffset = 0;
    var BufPerTick0 = 0;

    var WaveformBack = 32;
    var WaveformFore = 256;


    this.onmessage = function(e)
    {
        switch(e.data.command)
        {
            case 'init':
                init(e.data.config);
                break;
            case 'record':
                record(e.data.buffer);
                break;
            case 'clear':
                clear();
                break;
            case 'pause':
                IsPaused = e.data.Pause;
                break;
            case 'free':
                SpectrumBufFreeX(e.data.N);
                break;
            case 'scope':
                WORK_ScopeI = e.data.WORK_ScopeI;
                WORK_ScopeO = e.data.WORK_ScopeO;
                SET_ScopeW = e.data.SET_ScopeW;
                SET_ScopeH = e.data.SET_ScopeH;
                SET_ScopeFactor = e.data.SET_ScopeFactor;
                SET_ScopeGainX = e.data.SET_ScopeGainX;
                SET_ScopeGainY = e.data.SET_ScopeGainY;
                SET_ScopeGainZ = e.data.SET_ScopeGainZ;
                SET_ScopePlotMidSide = e.data.SET_ScopePlotMidSide;
                SET_ScopeDimming = e.data.SET_ScopeDimming;
                SET_ScopePixelFactor = e.data.SET_ScopePixelFactor;
                ScopeSetParams();
                break;
            case 'fft':
                WORK_Spectrum = e.data.WORK_Spectrum;
                SampleDecimation = e.data.Decimation;
                AudioModeLI = false;
                AudioModeRI = false;
                AudioModeMI = false;
                AudioModeSI = false;
                AudioModeLO = false;
                AudioModeRO = false;
                AudioModeMO = false;
                AudioModeSO = false;
                var AudioModeTemp = e.data.AudioMode;
                if (AudioModeTemp >= 128) { AudioModeRO = WORK_Spectrum; AudioModeTemp = AudioModeTemp - 128; }
                if (AudioModeTemp >=  64) { AudioModeLO = WORK_Spectrum; AudioModeTemp = AudioModeTemp -  64; }
                if (AudioModeTemp >=  32) { AudioModeSO = WORK_Spectrum; AudioModeTemp = AudioModeTemp -  32; }
                if (AudioModeTemp >=  16) { AudioModeMO = WORK_Spectrum; AudioModeTemp = AudioModeTemp -  16; }
                if (AudioModeTemp >=   8) { AudioModeRI = WORK_Spectrum; AudioModeTemp = AudioModeTemp -   8; }
                if (AudioModeTemp >=   4) { AudioModeLI = WORK_Spectrum; AudioModeTemp = AudioModeTemp -   4; }
                if (AudioModeTemp >=   2) { AudioModeSI = WORK_Spectrum; AudioModeTemp = AudioModeTemp -   2; }
                if (AudioModeTemp >=   1) { AudioModeMI = WORK_Spectrum; AudioModeTemp = AudioModeTemp -   1; }
                if ((FFT_FourierBase != e.data.FFT) || (FFT_WinFactor != e.data.Win) || (FFT_FourierWindow != e.data.FFTWin))
                {
                    FFT_FourierBase = e.data.FFT;
                    FFT_WinFactor = e.data.Win;
                    FFT_FourierWindow = e.data.FFTWin;
                    FFT_Init();
                }
                FFT_Decimation = e.data.FFTDecimation;
                WaveformBack = e.data.WFBack / 65536.0;
                WaveformFore = e.data.WFFore / 65536.0;
                FFT_FFT_Mode = e.data.DispMode;
                SpectrumStep = e.data.Step;
                SpectrumGain = e.data.Gain;
                SpectrumBase = e.data.Base / 64.0;

                SpectrumLog = e.data.Log;
                SpectrumLogBase = e.data.LogBase;
                SpectrumLogFactor = e.data.LogFactor;
                SpectrumLogOffset = e.data.LogOffset;
                SpectrumMinMax = e.data.MinMax;
                if (SpectrumMinMax >= 0)
                {
                    SpectrumMinMaxX = SpectrumMinMax;
                }
                else
                {
                    SpectrumMinMaxX = 0 - SpectrumMinMax;
                }
                BufDisp = e.data.DispSize;
                BufPerTick = e.data.BufTick;
                BufIgnited = true;
                break;
        }
    };


    function clear()
    {
        BufPointer = 0;
        for (var I = 0; I < BufLength; I++)
        {
            BufDataLI[I] = 0;
            BufDataRI[I] = 0;
            BufDataMI[I] = 0;
            BufDataSI[I] = 0;
            BufDataLO[I] = 0;
            BufDataRO[I] = 0;
            BufDataMO[I] = 0;
            BufDataSO[I] = 0;
        }
    }

    var FFT_Fourier_levels = 0;
    var M_PI = Math.PI;

    var SpectrumBufMemData = new Array();
    var SpectrumBufMemFree = new Array();
    var SpectrumBufMemCnt = 0;

    function SpectrumBufClear()
    {
        SpectrumBufMemData = new Array();
        SpectrumBufMemFree = new Array();
        SpectrumBufMemCnt = 0;
    }

    function SpectrumBufAlloc()
    {
        var II = -1;
        for (var I = 0; I < SpectrumBufMemCnt; I++)
        {
            if (SpectrumBufMemFree[I])
            {
                II = I;
                I = SpectrumBufMemCnt;
            }
        }
        if (II >= 0)
        {
            SpectrumBufMemFree[II] = false;
        }
        else
        {
            II = SpectrumBufMemCnt;
            var RawItem = new Float32Array(FFT_FourierBase + 1);
            RawItem[FFT_FourierBase] = II;
            SpectrumBufMemData.push(RawItem);
            SpectrumBufMemFree.push(false);
            SpectrumBufMemCnt++;
        }
        return(SpectrumBufMemData[II]);
    }

    function SpectrumBufFreeX(N)
    {
        var L = N[0];
        for (var I = 1; I < L; I++)
        {
            SpectrumBufMemFree[N[I]] = true;
        }
    }

    function SpectrumBufFree(II)
    {
        if ((II >= 0) && (II < SpectrumBufMemCnt))
        {
            SpectrumBufMemFree[II] = true;
        }
    }

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

    function FFT_FFT(raw, rawoffset, SampleValue, PerformOp)
    {
        if (PerformOp)
        {
            switch(FFT_FFT_Mode)
            {
                case 0: return FFT_FFT0(raw, rawoffset, SampleValue);
                case 1: return FFT_FFT1(raw, rawoffset, SampleValue);
                case 2: return FFT_FFT1(raw, rawoffset, SampleValue);
            }
        }
        else
        {
            return FFT_Dummy;
        }
    }

    function FFT_FFT1(raw, rawoffset, SampleValue)
    {
        var SerieSize = SpectrumMinMaxX * SpectrumStep;
        if (SerieSize <= 0)
        {
            SerieSize = SpectrumStep;
        }
        rawoffset = rawoffset + FFT_FourierBase - 1;
        if (rawoffset >= BufLength)
        {
            rawoffset = rawoffset - BufLength;
        }
        var T = (FFT_FFT_Mode == 1) ? (raw[rawoffset] + 1) : (Math.abs(raw[rawoffset]) * 2);
        var ValMin = (FFT_FFT_Mode == 1) ? T : 0;
        var ValMax = T;
        for (I = 0; I < SerieSize; I++)
        {
            T = raw[rawoffset];
            if (SampleValue[0] < T)
            {
                SampleValue[0] = T;
            }
            if (SampleValue[1] > T)
            {
                SampleValue[1] = T;
            }
            T = (FFT_FFT_Mode == 1) ? (T + 1) : (Math.abs(T) * 2);
            if (ValMin > T) { ValMin = T; }
            if (ValMax < T) { ValMax = T; }
            rawoffset--;
            if (rawoffset < 0)
            {
                rawoffset = rawoffset + BufLength;
            }
        }

        var raw0 = SpectrumBufAlloc();

        ValMin = (ValMin * FFT_FourierBase) / (4.0);
        ValMax = (ValMax * FFT_FourierBase) / (4.0);
        for (I = 0; I < FFT_FourierBase; I++)
        {
            if ((I >= ValMin) && (I <= ValMax))
            {
                T = WaveformFore;
            }
            else
            {
                T = WaveformBack;
            }

            T = T * SpectrumGain
            T = T + SpectrumBase;
            if (T > 1)
            {
                T = 1;
            }
            else
            {
                if (T < 0)
                {
                    T = 0;
                }
            }
            raw0[I] = T;
        }
        return raw0;
    }

    function FFT_FFT0(raw, rawoffset, SampleValue)
    {
        var raw0 = SpectrumBufAlloc();

        var I;
        var T;
        for (I = 0; I < FFT_FourierBase; I++)
        {
            T = raw[I + rawoffset];
            if (SampleValue[0] < T)
            {
                SampleValue[0] = T;
            }
            if (SampleValue[1] > T)
            {
                SampleValue[1] = T;
            }
            FFT_CalcReal[I] = (T * FFT_FourierWindowVals[I]);
            FFT_CalcImag[I] = 0;
        }
        FFT_transform_radix2(FFT_CalcReal, FFT_CalcImag, FFT_FourierBase);

        if (SpectrumLog)
        {
            var LogTemp = Math.log(SpectrumLogBase);
            for (I = 0; I < FFT_FourierBase; I++)
            {
                FFT_CalcReal[I] = FFT_CalcReal[I] / FFT_FourierBase;
                FFT_CalcImag[I] = FFT_CalcImag[I] / FFT_FourierBase;
                T = Math.sqrt((FFT_CalcReal[I] * FFT_CalcReal[I]) + (FFT_CalcImag[I] * FFT_CalcImag[I])) * SpectrumGain;
                T = T + SpectrumBase;
                if (T > 0)
                {
                    if (LogTemp > 0)
                    {
                        T = ((Math.log(T) / LogTemp) * SpectrumLogFactor) + SpectrumLogOffset;
                    }
                    else
                    {
                        T = 0;
                    }
                }

                if (T > 1)
                {
                    T = 1;
                }
                else
                {
                    if (T < 0)
                    {
                        T = 0;
                    }
                }
                raw0[I] = T;
            }
        }
        else
        {
            for (I = 0; I < FFT_FourierBase; I++)
            {
                FFT_CalcReal[I] = FFT_CalcReal[I] / FFT_FourierBase;
                FFT_CalcImag[I] = FFT_CalcImag[I] / FFT_FourierBase;
                T = Math.sqrt((FFT_CalcReal[I] * FFT_CalcReal[I]) + (FFT_CalcImag[I] * FFT_CalcImag[I])) * SpectrumGain;
                T = T + SpectrumBase;
                if (T > 1)
                {
                    T = 1;
                }
                else
                {
                    if (T < 0)
                    {
                        T = 0;
                    }
                }
                raw0[I] = T;
            }
        }

        if (SpectrumMinMax != 0)
        {
            var rawX = FFT_RawX;
            var S = (FFT_FourierBase >> 1) - 1;

            var I_, I0, II_, II0;
            if (SpectrumMinMax > 0)
            {
                I0 = S - SpectrumMinMaxX + 1;
                for (I_ = (SpectrumMinMaxX - 1); I_ >= 0; I_--)
                {
                    rawX[I_] = 0;
                    rawX[I0] = 0;
                    II0 = S;
                    for (II_ = (I_ + SpectrumMinMaxX); II_ >= 0; II_--)
                    {
                        if (rawX[I_] < raw0[II_]) { rawX[I_] = raw0[II_]; }
                        if (rawX[I0] < raw0[II0]) { rawX[I0] = raw0[II0]; }
                        II0--;
                    }
                    I0++;
                }
                for (I_ = (S - SpectrumMinMaxX); I_ >= SpectrumMinMaxX; I_--)
                {
                    rawX[I_] = 0;
                    for (II_ = (I_ - SpectrumMinMaxX); II_ <= (I_ + SpectrumMinMaxX); II_++)
                    {
                        if (rawX[I_] < raw0[II_]) { rawX[I_] = raw0[II_]; }
                    }
                }
            }
            else
            {
                I0 = S - SpectrumMinMaxX + 1;
                for (I_ = (SpectrumMinMaxX - 1); I_ >= 0; I_--)
                {
                    rawX[I_] = 1;
                    rawX[I0] = 1;
                    II0 = S;
                    for (II_ = (I_ + SpectrumMinMaxX); II_ >= 0; II_--)
                    {
                        if (rawX[I_] > raw0[II_]) { rawX[I_] = raw0[II_]; }
                        if (rawX[I0] > raw0[II0]) { rawX[I0] = raw0[II0]; }
                        II0--;
                    }
                    I0++;
                }
                for (I_ = (S - SpectrumMinMaxX); I_ >= SpectrumMinMaxX; I_--)
                {
                    rawX[I_] = 1;
                    for (II_ = (I_ - SpectrumMinMaxX); II_ <= (I_ + SpectrumMinMaxX); II_++)
                    {
                        if (rawX[I_] > raw0[II_]) { rawX[I_] = raw0[II_]; }
                    }
                }
            }
            for (I_ = S; I_ > 0; I_--)
            {
                raw0[I_] = rawX[I_];
            }
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
        SpectrumBufClear();
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
        var WinT = Math.round((FourierBaseX * (1024.0 - FFT_WinFactor)) / 1024.0);
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


    function init(config)
    {
        SampleRate = config.sampleRate;
        BufLength = config.bufLen;

        FFT_cos_table = new Float32Array(4000000);
        FFT_sin_table = new Float32Array(4000000);
        FFT_FourierWindowVals = new Float32Array(8000000);

        FFT_Init();

        BufDataLI = new Float32Array(BufLength + BufLength);
        BufDataRI = new Float32Array(BufLength + BufLength);
        BufDataMI = new Float32Array(BufLength + BufLength);
        BufDataSI = new Float32Array(BufLength + BufLength);
        BufDataLO = new Float32Array(BufLength + BufLength);
        BufDataRO = new Float32Array(BufLength + BufLength);
        BufDataMO = new Float32Array(BufLength + BufLength);
        BufDataSO = new Float32Array(BufLength + BufLength);
        BufPointer = 0;
    }

    var SpecTemp = [];
    var FFTOffsetBuf;

    function record(inputBuffer)
    {
        var buffers = [];
        var FFTSize = FFT_FourierBase;
        buffers.push(FFTSize);
        buffers.push(0);
        buffers.push(0);

        var BufL = inputBuffer[0].length;
        var BufEntries = 0;
        var FFTOffset;
        var SampleValueI = [0, 0];
        var SampleValueO = [0, 0];

        if (BufIgnited)
        {
            BufCounter = 1;
            BufIgnited = false;
            BufPointer0 = BufPointer;
            BufOffset = 0;
            BufDisp0 = BufDisp;
            BufPerTick0 = BufPerTick;
            FFTOffsetBuf = BufPointer - FFTSize - (SpectrumStepCounter % SpectrumStep);
            if (FFTOffsetBuf < 0)
            {
                FFTOffsetBuf = FFTOffsetBuf + BufLength;
            }
        }

        if (BufCounter > 0)
        {
            FFTOffset = FFTOffsetBuf;
            if (FFTOffset < 0)
            {
                FFTOffset = FFTOffset + BufLength;
            }
            else
            {
                if (FFTOffset >= BufLength)
                {
                    FFTOffset = FFTOffset - BufLength;
                }
            }

            if (BufPerTick0 > BufDisp0)
            {
                BufPerTick0 = BufDisp0;
            }
            for (var ii = 0; ii < BufPerTick0; ii++)
            {
                BufEntries++;
                SampleValueI[0] = 0;
                SampleValueI[1] = 0;
                SampleValueO[0] = 0;
                SampleValueO[1] = 0;
                buffers.push(FFT_FFT(BufDataMI, FFTOffset, SampleValueI, AudioModeMI));
                buffers.push(FFT_FFT(BufDataSI, FFTOffset, SampleValueI, AudioModeSI));
                buffers.push(FFT_FFT(BufDataLI, FFTOffset, SampleValueI, AudioModeLI));
                buffers.push(FFT_FFT(BufDataRI, FFTOffset, SampleValueI, AudioModeRI));
                buffers.push(FFT_FFT(BufDataMO, FFTOffset, SampleValueO, AudioModeMO));
                buffers.push(FFT_FFT(BufDataSO, FFTOffset, SampleValueO, AudioModeSO));
                buffers.push(FFT_FFT(BufDataLO, FFTOffset, SampleValueO, AudioModeLO));
                buffers.push(FFT_FFT(BufDataRO, FFTOffset, SampleValueO, AudioModeRO));
                buffers.push(FFT_Dummy);
                buffers.push([Math.max(SampleValueI[0], 0 - SampleValueI[1]), Math.max(SampleValueO[0], 0 - SampleValueO[1])]);
                buffers.push(BufCounter + BufOffset);
                BufCounter++;
                if ((FFTOffset <= BufPointer) || ((FFTOffset - SpectrumStep) > BufPointer))
                {
                    FFTOffset -= SpectrumStep;
                    if (FFTOffset < 0)
                    {
                        FFTOffset = FFTOffset + BufLength;
                    }
                }
                else
                {
                    ii = BufPerTick0;
                    BufCounter = 0;
                }
            }
            BufDisp0 -= BufPerTick0;
            FFTOffsetBuf -= (BufPerTick0 * SpectrumStep);
            while (FFTOffsetBuf < 0)
            {
                FFTOffsetBuf = FFTOffsetBuf + BufLength;
            }
            if (BufDisp0 <= 0)
            {
                BufCounter = 0;
            }
        }

        var BufEntriesX = BufEntries;

        if (!IsPaused)
        {
            for (var i = 0; i < BufL; i++)
            {
                SampleDecimationBufIL += inputBuffer[0][i];
                SampleDecimationBufIR += inputBuffer[1][i];
                SampleDecimationBufOL += inputBuffer[2][i];
                SampleDecimationBufOR += inputBuffer[3][i];

                SampleDecimationCounter++;
                if (SampleDecimationCounter >= SampleDecimation)
                {
                    SampleDecimationCounter = 0;
                    BufDataLI[BufPointer] = SampleDecimationBufIL / SampleDecimation;
                    BufDataRI[BufPointer] = SampleDecimationBufIR / SampleDecimation;
                    BufDataLO[BufPointer] = SampleDecimationBufOL / SampleDecimation;
                    BufDataRO[BufPointer] = SampleDecimationBufOR / SampleDecimation;
                    SampleDecimationBufIL = 0;
                    SampleDecimationBufIR = 0;
                    SampleDecimationBufOL = 0;
                    SampleDecimationBufOR = 0;

                    BufDataMI[BufPointer] = (BufDataRI[BufPointer] + BufDataLI[BufPointer]) / 2.0;
                    BufDataSI[BufPointer] = (BufDataRI[BufPointer] - BufDataLI[BufPointer]) / 2.0;
                    BufDataMO[BufPointer] = (BufDataRO[BufPointer] + BufDataLO[BufPointer]) / 2.0;
                    BufDataSO[BufPointer] = (BufDataRO[BufPointer] - BufDataLO[BufPointer]) / 2.0;


                    if (WORK_ScopeI)
                    {
                        var X;
                        var Y;
                        if (SET_ScopePlotMidSide)
                        {
                            X = Math.round((BufDataSI[BufPointer]) * ScopeX0G) + ScopeX0;
                            Y = Math.round((BufDataMI[BufPointer]) * ScopeY0G) + ScopeY0;
                        }
                        else
                        {
                            X = Math.round((BufDataLI[BufPointer]) * ScopeX0G) + ScopeX0;
                            Y = Math.round((BufDataRI[BufPointer]) * ScopeY0G) + ScopeY0;
                        }
                        ScopePlotLine(ScopeArrayI, X, Y, ScopeX_I, ScopeY_I);
                        ScopeX_I = X;
                        ScopeY_I = Y;
                    }
                    if (WORK_ScopeO)
                    {
                        var X;
                        var Y;
                        if (SET_ScopePlotMidSide)
                        {
                            X = Math.round((BufDataSO[BufPointer]) * ScopeX0G) + ScopeX0;
                            Y = Math.round((BufDataMO[BufPointer]) * ScopeY0G) + ScopeY0;
                        }
                        else
                        {
                            X = Math.round((BufDataLO[BufPointer]) * ScopeX0G) + ScopeX0;
                            Y = Math.round((BufDataRO[BufPointer]) * ScopeY0G) + ScopeY0;
                        }
                        ScopePlotLine(ScopeArrayO, X, Y, ScopeX_O, ScopeY_O);
                        ScopeX_O = X;
                        ScopeY_O = Y;
                    }

                    BufDataLI[BufPointer + BufLength] = BufDataLI[BufPointer];
                    BufDataRI[BufPointer + BufLength] = BufDataRI[BufPointer];
                    BufDataMI[BufPointer + BufLength] = BufDataMI[BufPointer];
                    BufDataSI[BufPointer + BufLength] = BufDataSI[BufPointer];
                    BufDataLO[BufPointer + BufLength] = BufDataLO[BufPointer];
                    BufDataRO[BufPointer + BufLength] = BufDataRO[BufPointer];
                    BufDataMO[BufPointer + BufLength] = BufDataMO[BufPointer];
                    BufDataSO[BufPointer + BufLength] = BufDataSO[BufPointer];
                    BufPointer++;
                    if (BufPointer >= BufLength)
                    {
                        BufPointer = 0;
                    }
                    SpectrumStepCounter++;
                    if (SpectrumStepCounter >= SpectrumStep)
                    {
                        SpectrumStepCounter = 0;
                        BufEntries = BufEntries + 1;
                        FFTOffset = BufPointer - FFTSize;
                        if (FFTOffset < 0)
                        {
                            FFTOffset = FFTOffset + BufLength;
                        }
                        SampleValueI[0] = 0;
                        SampleValueI[1] = 0;
                        SampleValueO[0] = 0;
                        SampleValueO[1] = 0;
                        buffers.push(FFT_FFT(BufDataMI, FFTOffset, SampleValueI, AudioModeMI));
                        buffers.push(FFT_FFT(BufDataSI, FFTOffset, SampleValueI, AudioModeSI));
                        buffers.push(FFT_FFT(BufDataLI, FFTOffset, SampleValueI, AudioModeLI));
                        buffers.push(FFT_FFT(BufDataRI, FFTOffset, SampleValueI, AudioModeRI));
                        buffers.push(FFT_FFT(BufDataMO, FFTOffset, SampleValueO, AudioModeMO));
                        buffers.push(FFT_FFT(BufDataSO, FFTOffset, SampleValueO, AudioModeSO));
                        buffers.push(FFT_FFT(BufDataLO, FFTOffset, SampleValueO, AudioModeLO));
                        buffers.push(FFT_FFT(BufDataRO, FFTOffset, SampleValueO, AudioModeRO));
                        buffers.push(FFT_Dummy);
                        buffers.push([Math.max(SampleValueI[0], 0 - SampleValueI[1]), Math.max(SampleValueO[0], 0 - SampleValueO[1])]);
                        buffers.push(0);
                    }
                }
            }
        }



        if (WORK_ScopeI || WORK_ScopeO)
        {
            if (ScopeDimmingC >= SET_ScopeDimming)
            {
                ScopeDimmingC = 0;
                if ((WORK_ScopeI) && (!WORK_ScopeO))
                {
                    var ScopeArray_ = new Array(ScopeMaxX);
                    for (var X = 0; X <= ScopeMaxX; X++)
                    {
                        ScopeArray_[X] = new Array(ScopeMaxY)
                        for (var Y = 0; Y <= ScopeMaxY; Y++)
                        {
                            var V = Math.round(ScopeArrayI[X][Y] * ScopeGainZ);
                            if (V < 65536)
                            {
                                ScopeArray_[X][Y] = V;
                            }
                            else
                            {
                                ScopeArray_[X][Y] = 65536;
                            }
                            if ((ScopeFactor > 0) && (ScopeArrayI[X][Y] > 0.001))
                            {
                                ScopeArrayI[X][Y] = (ScopeArrayI[X][Y] * ScopeFactor);
                            }
                            else
                            {
                                ScopeArrayI[X][Y] = 0;
                            }
                        }
                    }
                    buffers.push([SET_ScopeW, SET_ScopeH]);
                    buffers.push(ScopeArray_);
                    buffers.push(ScopeArray_);
                }
                if ((!WORK_ScopeI) && (WORK_ScopeO))
                {
                    var ScopeArray_ = new Array(ScopeMaxX);
                    for (var X = 0; X <= ScopeMaxX; X++)
                    {
                        ScopeArray_[X] = new Array(ScopeMaxY)
                        for (var Y = 0; Y <= ScopeMaxY; Y++)
                        {
                            var V = Math.round(ScopeArrayO[X][Y] * ScopeGainZ);
                            if (V < 65536)
                            {
                                ScopeArray_[X][Y] = V;
                            }
                            else
                            {
                                ScopeArray_[X][Y] = 65536;
                            }
                            if (ScopeArrayO[X][Y] > 0.001)
                            {
                                ScopeArrayO[X][Y] = (ScopeArrayO[X][Y] * ScopeFactor);
                            }
                            else
                            {
                                ScopeArrayO[X][Y] = 0;
                            }
                        }
                    }
                    buffers.push([SET_ScopeW, SET_ScopeH]);
                    buffers.push(ScopeArray_);
                    buffers.push(ScopeArray_);
                }
                if ((WORK_ScopeI) && (WORK_ScopeO))
                {
                    var ScopeArray_I = new Array(ScopeMaxX);
                    var ScopeArray_O = new Array(ScopeMaxX);
                    for (var X = 0; X <= ScopeMaxX; X++)
                    {
                        ScopeArray_I[X] = new Array(ScopeMaxY)
                        ScopeArray_O[X] = new Array(ScopeMaxY)
                        for (var Y = 0; Y <= ScopeMaxY; Y++)
                        {
                            var V = Math.round(ScopeArrayI[X][Y] * ScopeGainZ);
                            if (V < 65536)
                            {
                                ScopeArray_I[X][Y] = V;
                            }
                            else
                            {
                                ScopeArray_I[X][Y] = 65536;
                            }
                            if (ScopeArrayI[X][Y] > 0.001)
                            {
                                ScopeArrayI[X][Y] = (ScopeArrayI[X][Y] * ScopeFactor);
                            }
                            else
                            {
                                ScopeArrayI[X][Y] = 0;
                            }
                            V = Math.round(ScopeArrayO[X][Y] * ScopeGainZ);
                            if (V < 65536)
                            {
                                ScopeArray_O[X][Y] = V;
                            }
                            else
                            {
                                ScopeArray_O[X][Y] = 65536;
                            }
                            if (ScopeArrayO[X][Y] > 0.001)
                            {
                                ScopeArrayO[X][Y] = (ScopeArrayO[X][Y] * ScopeFactor);
                            }
                            else
                            {
                                ScopeArrayO[X][Y] = 0;
                            }
                        }
                    }
                    buffers.push([SET_ScopeW, SET_ScopeH]);
                    buffers.push(ScopeArray_I);
                    buffers.push(ScopeArray_O);
                }
            }
            else
            {
                ScopeDimmingC++;
                buffers.push([0, 0]);
                buffers.push(ScopeArrayDummy);
                buffers.push(ScopeArrayDummy);
            }
        }
        else
        {
            buffers.push([0, 0]);
            buffers.push(ScopeArrayDummy);
            buffers.push(ScopeArrayDummy);
        }

        if (BufEntries > 0)
        {
            BufOffset += (BufEntries - BufEntriesX);
            if (BufDisp0 > 0)
            {
                BufDisp0 -= (BufEntries - BufEntriesX);
            }
            buffers[1] = BufEntries;
            buffers[2] = performance.now();
            this.postMessage(buffers);
        }
        else
        {
            buffers[0] = 0;
            buffers[1] = 0;
            buffers[2] = 0;
            buffers[3] = ([0, 0]);
            this.postMessage(buffers);
        }
    }
}
