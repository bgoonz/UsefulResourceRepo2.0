var FilterSlotObj = function(FilterNo_)
{
    this.FilterNo = "" + FilterNo_ + "";

    this.FilterWindowSize = 500;

    this.FilterConfSize = 2048;
    
    this.PosHz = 0;

    // 0 ==> None
    // 1 ==> Blackman window
    // 2 ==> Hamming window
    this.FilterConfShape = 1;

    this.FilterArraySelected = -1;
    this.FilterArrayPoint = new Array();
    this.FilterArrayLevel = new Array();

    this.FilterWindow = new Array();
    this.FilterWindowFFT = new Array();

    this.FilterCalcWindow = function(_FFTBase, FilterConfZero)
    {
        this.FilterWindow = new Array();
        var FilterWindowSizeX = this.FilterWindowSize;
        if (FilterWindowSizeX < _FFTBase)
        {
            FilterWindowSizeX = _FFTBase;
        }

        for (var I = 0; I < FilterWindowSizeX; I++)
        {
            this.FilterWindow[I] = 0
        }


        var L = this.FilterArrayPoint.length - 1;
        for (var II = 0; II < L; II++)
        {
            var FilterLf = this.FilterArrayPoint[II] / this.FilterConfSize;
            var FilterHf = this.FilterArrayPoint[II + 1] / this.FilterConfSize;
            var FilterAmp = this.FilterArrayLevel[II] > FilterConfZero ? Math.pow(10, this.FilterArrayLevel[II] / 10) : 0;

            var FilterLf_PI = FilterLf * Math.PI;
            var FilterHf_PI = FilterHf * Math.PI;

            if (FilterAmp > 0)
            {
                if ((FilterLf == 0) && (FilterHf == 1.0))
                {
                    this.FilterWindow[0] = this.FilterWindow[0] + FilterAmp;
                }
                else
                {
                    if (FilterLf == 0)
                    {
                        this.FilterWindow[0] = this.FilterWindow[0] + (FilterHf * FilterAmp);
                        for (var I = 1; I < this.FilterWindowSize; I++)
                        {
                            this.FilterWindow[I] = this.FilterWindow[I] + ((FilterHf * (Math.sin(FilterHf_PI * I) / (FilterHf_PI * I))) * FilterAmp);
                        }
                    }
                    if (FilterHf == 1.0)
                    {
                        this.FilterWindow[0] = this.FilterWindow[0] + ((1.0 - FilterLf) * FilterAmp);
                        for (var I = 1; I < this.FilterWindowSize; I++)
                        {
                            this.FilterWindow[I] = this.FilterWindow[I] + ((0.0 - (FilterLf * (Math.sin(FilterLf_PI * I) / (FilterLf_PI * I)))) * FilterAmp);
                        }
                    }
                    if ((FilterLf > 0) && (FilterHf < 1.0))
                    {
                        this.FilterWindow[0] = this.FilterWindow[0] + ((FilterHf - FilterLf) * FilterAmp);
                        for (var I = 1; I < this.FilterWindowSize; I++)
                        {
                            this.FilterWindow[I] = this.FilterWindow[I] + (((FilterHf * (Math.sin(FilterHf_PI * I) / (FilterHf_PI * I))) - (FilterLf * (Math.sin(FilterLf_PI * I) / (FilterLf_PI * I)))) * FilterAmp);
                        }
                    }
                }
            }
        }

        for (var I = 0; I < this.FilterWindowSize; I++)
        {
            var T1 = ((this.FilterWindowSize - 1) - I);
            var T2 = (this.FilterWindowSize * 2 - 2);

            // Blackman window
            if (this.FilterConfShape == 1)
            {
                this.FilterWindow[I] = this.FilterWindow[I] * ((0.42 - 0.5 * Math.cos(2.0 * Math.PI * (T1 / T2))) + (0.08 * Math.cos(4.0 * Math.PI * (T1 / T2))));
            }

            // Hamming window
            if (this.FilterConfShape == 2)
            {
                this.FilterWindow[I] = this.FilterWindow[I] * (0.54 - 0.46 * Math.cos(2.0 * Math.PI * (T1 / T2)));
            }
        }

        this.FilterWindowFFT = null;
    }

    this.FilterNormalize = function(FilterConfSize_, ValMin, ValMax)
    {
        if (this.FilterConfSize > FilterConfSize_)
        {
            var F = this.FilterConfSize / FilterConfSize_;
            for (var I = 0; I < this.FilterArrayPoint.length; I++)
            {
                this.FilterArrayPoint[I] = Math.round(this.FilterArrayPoint[I] / F);
            }
        }
        if (this.FilterConfSize < FilterConfSize_)
        {
            var F = Math.round(FilterConfSize_ / this.FilterConfSize);
            for (var I = 0; I < this.FilterArrayPoint.length; I++)
            {
                this.FilterArrayPoint[I] = Math.round(this.FilterArrayPoint[I] * F);
            }
        }
        this.FilterConfSize = FilterConfSize_;
        for (var I = 0; I < this.FilterArrayLevel.length; I++)
        {
            if (this.FilterArrayLevel[I] < ValMin) { this.FilterArrayLevel[I] = ValMin; }
            if (this.FilterArrayLevel[I] > ValMax) { this.FilterArrayLevel[I] = ValMax; }
        }
        this.FilterSave();
    }

    this.FilterAdd = function()
    {
        if (this.FilterArraySelected >= 0)
        {
            var I = this.FilterArrayPoint[this.FilterArraySelected + 1] - this.FilterArrayPoint[this.FilterArraySelected];
            if (I < (2 * 1))
            {
                return;
            }
            this.FilterArrayPoint.push(0);
            this.FilterArrayLevel.push(0);
            for (I = (this.FilterArrayPoint.length - 1); I > this.FilterArraySelected; I--)
            {
                this.FilterArrayPoint[I] = this.FilterArrayPoint[I - 1];
                this.FilterArrayLevel[I] = this.FilterArrayLevel[I - 1];
            }
            I = (this.FilterArrayPoint[this.FilterArraySelected] + this.FilterArrayPoint[this.FilterArraySelected + 2]) / 2;
            this.FilterArrayPoint[this.FilterArraySelected + 1] = Math.round(I);
        }
        else
        {
            this.FilterConfShapeSet(-1);
        }
    }

    this.FilterRem = function()
    {
        if (this.FilterArraySelected >= 0)
        {
            if ((this.FilterArrayPoint.length > 2) && (this.FilterArraySelected < (this.FilterArrayPoint.length - 2)))
            {
                var I;
                var V = this.FilterArrayLevel[this.FilterArraySelected + 1];
                for (I = (this.FilterArraySelected + 1); I < (this.FilterArrayPoint.length - 1); I++)
                {
                    this.FilterArrayPoint[I] = this.FilterArrayPoint[I + 1];
                    this.FilterArrayLevel[I] = this.FilterArrayLevel[I + 1];
                }
                this.FilterArrayLevel[this.FilterArraySelected] = V;
                this.FilterArrayPoint.pop();
                this.FilterArrayLevel.pop();
            }
        }
        else
        {
            this.FilterConfShapeSet(1);
        }
    }

    this.FilterConfShapeSet = function(N)
    {
        this.FilterConfShape += N;
        if (this.FilterConfShape > 2)
        {
            this.FilterConfShape = 0;
        }
        if (this.FilterConfShape < 0)
        {
            this.FilterConfShape = 2;
        }
    }


    this.FilterVal = function(N, ValMin, ValMax)
    {
        if (this.FilterArraySelected >= 0)
        {
            this.FilterArrayLevel[this.FilterArraySelected] = this.FilterArrayLevel[this.FilterArraySelected] * 10;
            this.FilterArrayLevel[this.FilterArraySelected] += N;
            this.FilterArrayLevel[this.FilterArraySelected] = Math.round(this.FilterArrayLevel[this.FilterArraySelected]);
            this.FilterArrayLevel[this.FilterArraySelected] = this.FilterArrayLevel[this.FilterArraySelected] / 10;
            if (this.FilterArrayLevel[this.FilterArraySelected] < ValMin)
            {
                this.FilterArrayLevel[this.FilterArraySelected] = ValMin;
            }
            if (this.FilterArrayLevel[this.FilterArraySelected] > ValMax)
            {
                this.FilterArrayLevel[this.FilterArraySelected] = ValMax;
            }
        }
        else
        {
            this.FilterWindowSize += N;
            if (this.FilterWindowSize < 1)
            {
                this.FilterWindowSize = 1;
            }
        }
    }

    this.FilterPos = function(T, N)
    {
        if (this.FilterArraySelected >= 0)
        {
            if ((T == 0) && (this.FilterArraySelected == 0))
            {
                return;
            }
            if ((T == 1) && (this.FilterArraySelected == (this.FilterArrayPoint.length - 2)))
            {
                return;
            }
            this.FilterArrayPoint[this.FilterArraySelected + T] += N;
            if (this.FilterArrayPoint[this.FilterArraySelected + T] <= this.FilterArrayPoint[this.FilterArraySelected + T - 1])
            {
                this.FilterArrayPoint[this.FilterArraySelected + T] = this.FilterArrayPoint[this.FilterArraySelected + T - 1] + 1;
            }
            if (this.FilterArrayPoint[this.FilterArraySelected + T] >= this.FilterArrayPoint[this.FilterArraySelected + T + 1])
            {
                this.FilterArrayPoint[this.FilterArraySelected + T] = this.FilterArrayPoint[this.FilterArraySelected + T + 1] - 1;
            }
        }
    }

    this.FilterLoad = function()
    {
        this.FilterArrayPoint = new Array();
        this.FilterArrayLevel = new Array();

        if (DataExists("OBJ_Filter_Slot" + this.FilterNo))
        {
            var FilterDef = DataGet("OBJ_Filter_Slot" + this.FilterNo).split('|');
            this.FilterWindowSize = parseInt(FilterDef[0]);
            this.FilterConfShape = parseInt(FilterDef[1]);
            this.FilterArraySelected = parseInt(FilterDef[2]);
            this.FilterConfSize = parseInt(FilterDef[3]);
            var L = parseInt(FilterDef[4]);
            for (var I = 0; I < L; I++)
            {
                this.FilterArrayPoint.push(parseInt(FilterDef[(I * 2) + 5]));
                this.FilterArrayLevel.push(parseInt(FilterDef[(I * 2) + 6]) / 10);
            }
        }
        else
        {
            this.FilterArrayPoint.push(0);
            this.FilterArrayLevel.push(0);

            this.FilterArrayPoint.push(this.FilterConfSize);
            this.FilterArrayLevel.push(0);
        }
    }

    this.FilterSave = function()
    {

        var FilterDef = "" + this.FilterWindowSize + "|" + this.FilterConfShape + "|" + this.FilterArraySelected + "|" + this.FilterConfSize + "|";
        var L = this.FilterArrayPoint.length;

        var FilterDef = FilterDef + L;
        for (var I = 0; I < L; I++)
        {
            FilterDef = FilterDef + "|" + this.FilterArrayPoint[I];
            FilterDef = FilterDef + "|" + Math.round(this.FilterArrayLevel[I] * 10);
        }

        DataSet("OBJ_Filter_Slot" + this.FilterNo, FilterDef)
    }
}
