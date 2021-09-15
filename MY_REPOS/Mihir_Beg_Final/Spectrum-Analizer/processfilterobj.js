var ProcessFilterObj = function()
{
    this.FilterProcessSmp_ = 0;
    this.FilterProcessSmpL = 0;
    this.FilterProcessSmpR = 0;
    this.FilterWindowPointer = 0;
    this.FilterWindowSize = 1;
    this.FilterWindowWorkSize = 1;
    this.FilterWindowWork_ = [0];
    this.FilterWindowWorkL = [0];
    this.FilterWindowWorkR = [0];
    this.FilterWindow = [1];

    this.Init = function(FilterWindow_, FilterWindowSize_)
    {
        var FilterWindowWorkSize__ = this.FilterWindowWorkSize;
        var FilterWindowWorkSize_ = FilterWindowSize_ * 2 + 2;

        if (this.FilterWindowSize > FilterWindowSize_)
        {
            this.FilterWindowSize = FilterWindowSize_;
            this.FilterWindowWorkSize = this.FilterWindowSize * 2 + 2;
        }
        this.FilterWindow = FilterWindow_;

        while (FilterWindowWorkSize__ < FilterWindowWorkSize_)
        {
            this.FilterWindowWork_.push(0);
            this.FilterWindowWorkL.push(0);
            this.FilterWindowWorkR.push(0);
            FilterWindowWorkSize__++;
        }
        while (FilterWindowWorkSize__ > FilterWindowWorkSize_)
        {
            this.FilterWindowWork_.pop();
            this.FilterWindowWorkL.pop();
            this.FilterWindowWorkR.pop();
            FilterWindowWorkSize__--;
        }

        if (this.FilterWindowSize < FilterWindowSize_)
        {
            this.FilterWindowSize = FilterWindowSize_;
            this.FilterWindowWorkSize = this.FilterWindowSize * 2 + 2;
        }
    }

    this.Process1 = function()
    {
        this.FilterWindowWork_[this.FilterWindowPointer] = this.FilterProcessSmp_;
        var FilterWindowPointer1 = this.FilterWindowPointer - this.FilterWindowSize - 0;
        if (FilterWindowPointer1 < 0) { FilterWindowPointer1 += this.FilterWindowWorkSize; }
        var FilterWindowPointer2 = FilterWindowPointer1;

        var TempFil_ = this.FilterWindowWork_[FilterWindowPointer1];
        var XXXFil_ = (TempFil_ * this.FilterWindow[0]);

        FilterWindowPointer1++;
        if (FilterWindowPointer1 == this.FilterWindowWorkSize) { FilterWindowPointer1 = 0; }
        if (FilterWindowPointer2 == 0) { FilterWindowPointer2 = this.FilterWindowWorkSize; }
        FilterWindowPointer2--;

        for (var II = 1; II < this.FilterWindowSize; II++)
        {
            TempFil_ = this.FilterWindowWork_[FilterWindowPointer1];
            XXXFil_ = XXXFil_ + (TempFil_ * this.FilterWindow[II]);
            TempFil_ = this.FilterWindowWork_[FilterWindowPointer2];
            XXXFil_ = XXXFil_ + (TempFil_ * this.FilterWindow[II]);

            FilterWindowPointer1++;
            if (FilterWindowPointer1 == this.FilterWindowWorkSize) { FilterWindowPointer1 = 0; }
            if (FilterWindowPointer2 == 0) { FilterWindowPointer2 = this.FilterWindowWorkSize; }
            FilterWindowPointer2--;
        }

        this.FilterProcessSmp_ = XXXFil_;
        this.FilterWindowPointer++;
        if (this.FilterWindowPointer >= this.FilterWindowWorkSize) { this.FilterWindowPointer = 0; }
    }

    this.Process2 = function()
    {
        this.FilterWindowWorkL[this.FilterWindowPointer] = this.FilterProcessSmpL;
        this.FilterWindowWorkR[this.FilterWindowPointer] = this.FilterProcessSmpR;
        var FilterWindowPointer1 = this.FilterWindowPointer - this.FilterWindowSize - 0;
        if (FilterWindowPointer1 < 0) { FilterWindowPointer1 += this.FilterWindowWorkSize; }
        var FilterWindowPointer2 = FilterWindowPointer1;

        var TempFilL = this.FilterWindowWorkL[FilterWindowPointer1];
        var TempFilR = this.FilterWindowWorkR[FilterWindowPointer1];
        var XXXFilL = (TempFilL * this.FilterWindow[0]);
        var XXXFilR = (TempFilR * this.FilterWindow[0]);

        FilterWindowPointer1++;
        if (FilterWindowPointer1 == this.FilterWindowWorkSize) { FilterWindowPointer1 = 0; }
        if (FilterWindowPointer2 == 0) { FilterWindowPointer2 = this.FilterWindowWorkSize; }
        FilterWindowPointer2--;

        for (var II = 1; II < this.FilterWindowSize; II++)
        {
            TempFilL = this.FilterWindowWorkL[FilterWindowPointer1];
            TempFilR = this.FilterWindowWorkR[FilterWindowPointer1];
            XXXFilL = XXXFilL + (TempFilL * this.FilterWindow[II]);
            XXXFilR = XXXFilR + (TempFilR * this.FilterWindow[II]);
            TempFilL = this.FilterWindowWorkL[FilterWindowPointer2];
            TempFilR = this.FilterWindowWorkR[FilterWindowPointer2];
            XXXFilL = XXXFilL + (TempFilL * this.FilterWindow[II]);
            XXXFilR = XXXFilR + (TempFilR * this.FilterWindow[II]);

            FilterWindowPointer1++;
            if (FilterWindowPointer1 == this.FilterWindowWorkSize) { FilterWindowPointer1 = 0; }
            if (FilterWindowPointer2 == 0) { FilterWindowPointer2 = this.FilterWindowWorkSize; }
            FilterWindowPointer2--;
        }

        this.FilterProcessSmpL = XXXFilL;
        this.FilterProcessSmpR = XXXFilR;
        this.FilterWindowPointer++;
        if (this.FilterWindowPointer >= this.FilterWindowWorkSize) { this.FilterWindowPointer = 0; }
    }
}
