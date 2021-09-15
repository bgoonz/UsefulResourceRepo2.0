var SET_FilterEnabled = DataGetIDefault("SET_FilterEnabled", 0);
var SET_FilterToolbarPosition = DataGetIDefault("SET_FilterToolbarPosition", 3);
var SET_FilterToolbarSize = DataGetIDefault("SET_FilterToolbarSize", 20);

var SET_Filter_FilterLevMin = DataGetIDefault("SET_Filter_FilterLevMin", -80);
var SET_Filter_FilterLevMax = DataGetIDefault("SET_Filter_FilterLevMax", 20);
var SET_Filter_FilterFFT = DataGetIDefault("SET_Filter_FilterFFT", 1024);
var SET_Filter_Canvas = DataGetIDefault("SET_Filter_Canvas", 512);
var SET_FilterOrientation = DataGetIDefault("SET_FilterOrientation", 0);

var SET_FilterValueStep = DataGetIDefault("SET_FilterValueStep", 0);

var SET_FilterColorBackR = DataGetIDefault("SET_FilterColorBackR", 0);
var SET_FilterColorBackG = DataGetIDefault("SET_FilterColorBackG", 0);
var SET_FilterColorBackB = DataGetIDefault("SET_FilterColorBackB", 0);

var SET_FilterColorZeroR = DataGetIDefault("SET_FilterColorZeroR", 64);
var SET_FilterColorZeroG = DataGetIDefault("SET_FilterColorZeroG", 64);
var SET_FilterColorZeroB = DataGetIDefault("SET_FilterColorZeroB", 64);

var SET_FilterColorSpecR = DataGetIDefault("SET_FilterColorSpecR", 96);
var SET_FilterColorSpecG = DataGetIDefault("SET_FilterColorSpecG", 96);
var SET_FilterColorSpecB = DataGetIDefault("SET_FilterColorSpecB", 96);

var SET_FilterColorLineR = DataGetIDefault("SET_FilterColorLineR", 255);
var SET_FilterColorLineG = DataGetIDefault("SET_FilterColorLineG", 255);
var SET_FilterColorLineB = DataGetIDefault("SET_FilterColorLineB", 255);

var SET_FilterSlotCurrent = DataGetIDefault("SET_FilterSlotCurrent", 0);

var FilterSlotCount = 4;

var FilterSlot = new Array(FilterSlotCount);

var FilterDrawZoom = 1;
var FilterDrawOffset = 0;

function FilterSettingsGet()
{
    document.getElementById("xSET_AudioPlayerEnabled").selectedIndex = SET_AudioPlayerEnabled;
    document.getElementById("xSET_AudioPlayerTimeStartMin").value = SET_AudioPlayerTimeStartMin;
    document.getElementById("xSET_AudioPlayerTimeStartMax").value = SET_AudioPlayerTimeStartMax;
    document.getElementById("xSET_AudioPlayerBufTimeCorrectBound").value = SET_AudioPlayerBufTimeCorrectBound;
    document.getElementById("xSET_AudioPlayerBufTimeCorrectCount").value = SET_AudioPlayerBufTimeCorrectCount;

    document.getElementById("xSET_AudioPlayerDrawBuf").selectedIndex = SET_AudioPlayerDrawBuf;
    document.getElementById("xSET_AudioPlayerDiagBack").value = SET_AudioPlayerDiagBack;
    document.getElementById("xSET_AudioPlayerDiagFore").value = SET_AudioPlayerDiagFore;

    document.getElementById("xSET_AudioPlayerMute").selectedIndex = SET_AudioPlayerMute;

    document.getElementById("xSET_FilterEnabled").selectedIndex = SET_FilterEnabled;

    document.getElementById("xSET_FilterToolbarPosition").selectedIndex = SET_FilterToolbarPosition;
    document.getElementById("xSET_FilterToolbarSize").value = SET_FilterToolbarSize;

    document.getElementById("xSET_Filter_FilterLevMin").value = SET_Filter_FilterLevMin;
    document.getElementById("xSET_Filter_FilterLevMax").value = SET_Filter_FilterLevMax;
    document.getElementById("xSET_Filter_FilterFFT").selectedIndex = Log2(SET_Filter_FilterFFT) - 4;
    document.getElementById("xSET_Filter_Canvas").selectedIndex = Log2(SET_Filter_Canvas) - 4;
    document.getElementById("xSET_FilterOrientation").selectedIndex = SET_FilterOrientation;

    document.getElementById("xSET_FilterColorBack").value = ColorValuesToText(SET_FilterColorBackR, SET_FilterColorBackG, SET_FilterColorBackB);
    document.getElementById("xSET_FilterColorZero").value = ColorValuesToText(SET_FilterColorZeroR, SET_FilterColorZeroG, SET_FilterColorZeroB);
    document.getElementById("xSET_FilterColorSpec").value = ColorValuesToText(SET_FilterColorSpecR, SET_FilterColorSpecG, SET_FilterColorSpecB);
    document.getElementById("xSET_FilterColorLine").value = ColorValuesToText(SET_FilterColorLineR, SET_FilterColorLineG, SET_FilterColorLineB);
}

function FilterSettingsSet(Mode)
{
    var ColorTemp;

    SET_AudioPlayerEnabled = document.getElementById("xSET_AudioPlayerEnabled").selectedIndex;
    SET_AudioPlayerTimeStartMin = Limit(document.getElementById("xSET_AudioPlayerTimeStartMin").value, 0, 1000000);
    SET_AudioPlayerTimeStartMax = Limit(document.getElementById("xSET_AudioPlayerTimeStartMax").value, 0, 1000000);
    SET_AudioPlayerBufTimeCorrectBound = Limit(document.getElementById("xSET_AudioPlayerBufTimeCorrectBound").value, 0, 1000000);
    SET_AudioPlayerBufTimeCorrectCount = Limit(document.getElementById("xSET_AudioPlayerBufTimeCorrectCount").value, 0, 1000000);

    SET_AudioPlayerDrawBuf = document.getElementById("xSET_AudioPlayerDrawBuf").selectedIndex;
    SET_AudioPlayerDiagBack = Limit(document.getElementById("xSET_AudioPlayerDiagBack").value, 0, 255);
    SET_AudioPlayerDiagFore = Limit(document.getElementById("xSET_AudioPlayerDiagFore").value, 0, 255);

    SET_AudioPlayerMute = document.getElementById("xSET_AudioPlayerMute").selectedIndex;

    SET_FilterEnabled = document.getElementById("xSET_FilterEnabled").selectedIndex;

    SET_FilterToolbarPosition = document.getElementById("xSET_FilterToolbarPosition").selectedIndex;
    SET_FilterToolbarSize = Limit(document.getElementById("xSET_FilterToolbarSize").value, 1, 99);

    SET_Filter_FilterLevMin = Limit(document.getElementById("xSET_Filter_FilterLevMin").value, -200, 0);
    SET_Filter_FilterLevMax = Limit(document.getElementById("xSET_Filter_FilterLevMax").value, 0, 200);
    SET_Filter_FilterFFT = Pow2(document.getElementById("xSET_Filter_FilterFFT").selectedIndex + 4);
    SET_Filter_Canvas = Pow2(document.getElementById("xSET_Filter_Canvas").selectedIndex + 4);
    SET_FilterOrientation = document.getElementById("xSET_FilterOrientation").selectedIndex;

    ColorTemp = ColorTextToValues(document.getElementById("xSET_FilterColorBack").value, SET_FilterColorBackR, SET_FilterColorBackG, SET_FilterColorBackB)
    SET_FilterColorBackR = Limit(ColorTemp[0], 0, 255);
    SET_FilterColorBackG = Limit(ColorTemp[1], 0, 255);
    SET_FilterColorBackB = Limit(ColorTemp[2], 0, 255);
    ColorTemp = ColorTextToValues(document.getElementById("xSET_FilterColorZero").value, SET_FilterColorZeroR, SET_FilterColorZeroG, SET_FilterColorZeroB);
    SET_FilterColorZeroR = Limit(ColorTemp[0], 0, 255);
    SET_FilterColorZeroG = Limit(ColorTemp[1], 0, 255);
    SET_FilterColorZeroB = Limit(ColorTemp[2], 0, 255);
    ColorTemp = ColorTextToValues(document.getElementById("xSET_FilterColorSpec").value, SET_FilterColorSpecR, SET_FilterColorSpecG, SET_FilterColorSpecB);
    SET_FilterColorSpecR = Limit(ColorTemp[0], 0, 255);
    SET_FilterColorSpecG = Limit(ColorTemp[1], 0, 255);
    SET_FilterColorSpecB = Limit(ColorTemp[2], 0, 255);
    ColorTemp = ColorTextToValues(document.getElementById("xSET_FilterColorLine").value, SET_FilterColorLineR, SET_FilterColorLineG, SET_FilterColorLineB);
    SET_FilterColorLineR = Limit(ColorTemp[0], 0, 255);
    SET_FilterColorLineG = Limit(ColorTemp[1], 0, 255);
    SET_FilterColorLineB = Limit(ColorTemp[2], 0, 255);

    DataSetI("SET_AudioPlayerEnabled", SET_AudioPlayerEnabled);
    DataSetI("SET_AudioPlayerTimeStartMin", SET_AudioPlayerTimeStartMin);
    DataSetI("SET_AudioPlayerTimeStartMax", SET_AudioPlayerTimeStartMax);
    DataSetI("SET_AudioPlayerBufTimeCorrectBound", SET_AudioPlayerBufTimeCorrectBound);
    DataSetI("SET_AudioPlayerBufTimeCorrectCount", SET_AudioPlayerBufTimeCorrectCount);
    DataSetI("SET_AudioPlayerDrawBuf", SET_AudioPlayerDrawBuf);
    DataSetI("SET_AudioPlayerDiagBack", SET_AudioPlayerDiagBack);
    DataSetI("SET_AudioPlayerDiagFore", SET_AudioPlayerDiagFore);
    DataSetI("SET_AudioPlayerMute", SET_AudioPlayerMute);

    DataSetI("SET_FilterEnabled", SET_FilterEnabled);

    DataSetI("SET_FilterToolbarPosition", SET_FilterToolbarPosition);
    DataSetI("SET_FilterToolbarSize", SET_FilterToolbarSize);

    DataSetI("SET_Filter_FilterLevMin", SET_Filter_FilterLevMin);
    DataSetI("SET_Filter_FilterLevMax", SET_Filter_FilterLevMax);
    DataSetI("SET_Filter_FilterFFT", SET_Filter_FilterFFT);
    DataSetI("SET_Filter_Canvas", SET_Filter_Canvas);

    DataSetI("SET_FilterColorBackR", SET_FilterColorBackR);
    DataSetI("SET_FilterColorBackG", SET_FilterColorBackG);
    DataSetI("SET_FilterColorBackB", SET_FilterColorBackB);
    DataSetI("SET_FilterColorZeroR", SET_FilterColorZeroR);
    DataSetI("SET_FilterColorZeroG", SET_FilterColorZeroG);
    DataSetI("SET_FilterColorZeroB", SET_FilterColorZeroB);
    DataSetI("SET_FilterColorSpecR", SET_FilterColorSpecR);
    DataSetI("SET_FilterColorSpecG", SET_FilterColorSpecG);
    DataSetI("SET_FilterColorSpecB", SET_FilterColorSpecB);
    DataSetI("SET_FilterColorLineR", SET_FilterColorLineR);
    DataSetI("SET_FilterColorLineG", SET_FilterColorLineG);
    DataSetI("SET_FilterColorLineB", SET_FilterColorLineB);
    DataSetI("SET_FilterOrientation", SET_FilterOrientation);

    AudioPlayerMuteSet();

    switch (Mode)
    {
        case 1:
            FilterSetLayout();
            break;
        case 2:
            for (var I = 0; I < FilterSlotCount; I++)
            {
                FilterSlot[I].FilterNormalize(SET_Filter_Canvas, SET_Filter_FilterLevMin, SET_Filter_FilterLevMax);
                FilterSlot[I].FilterCalcWindow(SET_Filter_FilterFFT, SET_Filter_FilterLevMin);
            }
            FilterSetLayout();
            break;
    }
}

var FilterDisplayCanvasObject;
var FilterDisplayCanvasContext;
var FilterDisplayCanvasData;
var FilterCanvasW;
var FilterCanvasH;
var FilterCanvasW_;
var FilterCanvasH_;

function FilterInit()
{
    for (var I = 0; I < FilterSlotCount; I++)
    {
        FilterSlot[I] = new FilterSlotObj(I);
        FilterSlot[I].FilterLoad();
        FilterSlot[I].FilterNormalize(SET_Filter_Canvas, SET_Filter_FilterLevMin, SET_Filter_FilterLevMax);
        FilterSlot[I].FilterCalcWindow(SET_Filter_FilterFFT, SET_Filter_FilterLevMin);
    }
    FilterDisplayCanvasObject = document.getElementById("filterdisplay");
    FilterDisplayCanvasContext = FilterDisplayCanvasObject.getContext('2d');
    FilterSetLayout();
}



var FilterDrawRect_ = function(CanvasD, CanvasW, CanvasH, X, Y, W, H, ColorR, ColorG, ColorB)
{
}

function FilterDrawRect(X, Y, W, H, ColorR, ColorG, ColorB)
{
    FilterDrawRect_(FilterDisplayCanvasData, FilterCanvasW_, FilterCanvasH_, X, Y, W, H, ColorR, ColorG, ColorB);
}

var FilterDrawRectX_ = function(CanvasD, CanvasW, CanvasH, X, Y, W, ColorR, ColorG, ColorB)
{
}

function FilterDrawRectX(X, Y, W, ColorR, ColorG, ColorB)
{
    FilterDrawRectX_(FilterDisplayCanvasData, FilterCanvasW_, FilterCanvasH_, X, Y, W, ColorR, ColorG, ColorB);
}

var FilterDrawRectY_ = function(CanvasD, CanvasW, CanvasH, X, Y, H, ColorR, ColorG, ColorB)
{
}

function FilterDrawRectY(X, Y, H, ColorR, ColorG, ColorB)
{
    FilterDrawRectY_(FilterDisplayCanvasData, FilterCanvasW_, FilterCanvasH_, X, Y, H, ColorR, ColorG, ColorB);
}

var FilterDrawPxl_ = function(CanvasD, CanvasW, CanvasH, X, Y, ColorR, ColorG, ColorB)
{
}

function FilterDrawPxl(X, Y, ColorR, ColorG, ColorB)
{
    FilterDrawPxl_(FilterDisplayCanvasData, FilterCanvasW_, FilterCanvasH_, X, Y, ColorR, ColorG, ColorB);
}

function FilterDrawRefresh()
{
    FilterDisplayCanvasContext.putImageData(FilterDisplayCanvasData, 0, 0);
}


function FilterSetLayout()
{
    var AppFilterM = document.getElementById("AppFilterM");

    if (!FilterDisplayCanvasObject)
    {
        FilterDisplayCanvasObject = document.getElementById("filterdisplay");
        FilterDisplayCanvasContext = FilterDisplayCanvasObject.getContext('2d');
    }

    var FilterRot;

    switch (SET_FilterOrientation)
    {
        case 0: FilterDrawRect_ = DrawRect0; FilterDrawRectX_ = DrawRectX0; FilterDrawRectY_ = DrawRectY0; FilterDrawPxl_ = DrawPxl0; FilterRot = false; break;
        case 1: FilterDrawRect_ = DrawRect1; FilterDrawRectX_ = DrawRectX1; FilterDrawRectY_ = DrawRectY1; FilterDrawPxl_ = DrawPxl1; FilterRot = true;  break;
        case 2: FilterDrawRect_ = DrawRect2; FilterDrawRectX_ = DrawRectX2; FilterDrawRectY_ = DrawRectY2; FilterDrawPxl_ = DrawPxl2; FilterRot = false; break;
        case 3: FilterDrawRect_ = DrawRect3; FilterDrawRectX_ = DrawRectX3; FilterDrawRectY_ = DrawRectY3; FilterDrawPxl_ = DrawPxl3; FilterRot = true;  break;
        case 4: FilterDrawRect_ = DrawRect4; FilterDrawRectX_ = DrawRectX4; FilterDrawRectY_ = DrawRectY4; FilterDrawPxl_ = DrawPxl4; FilterRot = true;  break;
        case 5: FilterDrawRect_ = DrawRect5; FilterDrawRectX_ = DrawRectX5; FilterDrawRectY_ = DrawRectY5; FilterDrawPxl_ = DrawPxl5; FilterRot = false; break;
        case 6: FilterDrawRect_ = DrawRect6; FilterDrawRectX_ = DrawRectX6; FilterDrawRectY_ = DrawRectY6; FilterDrawPxl_ = DrawPxl6; FilterRot = true;  break;
        case 7: FilterDrawRect_ = DrawRect7; FilterDrawRectX_ = DrawRectX7; FilterDrawRectY_ = DrawRectY7; FilterDrawPxl_ = DrawPxl7; FilterRot = false; break;
    }


    var ToolbarH1 = document.getElementById("AppFilterToolbarH1");
    var ToolbarV1 = document.getElementById("AppFilterToolbarV1");
    var ToolbarH2 = document.getElementById("AppFilterToolbarH2");
    var ToolbarV2 = document.getElementById("AppFilterToolbarV2");
    ToolbarH1.style["display"] = "none";
    ToolbarV1.style["display"] = "none";
    ToolbarH2.style["display"] = "none";
    ToolbarV2.style["display"] = "none";

    var ToolbarH = (SET_FilterToolbarPosition < 5) ? ToolbarH1 : ToolbarH2;
    var ToolbarV = (SET_FilterToolbarPosition < 5) ? ToolbarV1 : ToolbarV2;

    switch (SET_FilterToolbarPosition)
    {
        case 1: // Top
        case 5:
            AppFilterM.style["width"] = 100 + "%";
            AppFilterM.style["height"] = (100 - SET_FilterToolbarSize) + "%";
            AppFilterT1.style["height"] = SET_FilterToolbarSize + "%";
            AppFilterT1.style["display"] = "block";
            AppFilterT2.style["display"] = "none";
            AppFilterT3.style["display"] = "none";
            AppFilterT4.style["display"] = "none";
            AppFilterT1.appendChild(ToolbarH);
            ToolbarH.style["display"] = "block";
            break;
        case 2: // Bottom
        case 6:
            AppFilterM.style["width"] = 100 + "%";
            AppFilterM.style["height"] = (100 - SET_FilterToolbarSize) + "%";
            AppFilterT4.style["height"] = SET_FilterToolbarSize + "%";
            AppFilterT1.style["display"] = "none";
            AppFilterT2.style["display"] = "none";
            AppFilterT3.style["display"] = "none";
            AppFilterT4.style["display"] = "block";
            AppFilterT4.appendChild(ToolbarH);
            ToolbarH.style["display"] = "block";
            break;
        case 3: // Right
        case 7:
            AppFilterM.style["width"] = (100 - SET_FilterToolbarSize) + "%";
            AppFilterM.style["height"] = 100 + "%";
            AppFilterT3.style["width"] = SET_FilterToolbarSize + "%";
            AppFilterT1.style["display"] = "none";
            AppFilterT2.style["display"] = "none";
            AppFilterT3.style["display"] = "block";
            AppFilterT4.style["display"] = "none";
            AppFilterT3.appendChild(ToolbarV);
            ToolbarV.style["display"] = "block";
            break;
        case 4: // Left
        case 8:
            AppFilterM.style["width"] = (100 - SET_FilterToolbarSize) + "%";
            AppFilterM.style["height"] = 100 + "%";
            AppFilterT2.style["width"] = SET_FilterToolbarSize + "%";
            AppFilterT1.style["display"] = "none";
            AppFilterT2.style["display"] = "block";
            AppFilterT3.style["display"] = "none";
            AppFilterT4.style["display"] = "none";
            AppFilterT2.appendChild(ToolbarV);
            ToolbarV.style["display"] = "block";
            break;
        default:
            AppFilterM.style["width"] = 100 + "%";
            AppFilterM.style["height"] = 100 + "%";
            AppFilterT1.style["display"] = "none";
            AppFilterT2.style["display"] = "none";
            AppFilterT3.style["display"] = "none";
            AppFilterT4.style["display"] = "none";
            break;
    }

    var AppFilterM_clientWidth = AppFilterM.clientWidth;
    var AppFilterM_clientHeight = AppFilterM.clientHeight;
    if ((AppFilterM.clientWidth <= 0) || (AppFilterM.clientHeight <= 0))
    {
        AppFilterM_clientWidth = 1;
        AppFilterM_clientHeight = 1;
    }

    if (FilterRot)
    {
        FilterCanvasW = AppFilterM_clientHeight;
        FilterCanvasH = AppFilterM_clientWidth;
        FilterCanvasW_ = FilterCanvasH;
        FilterCanvasH_ = FilterCanvasW;
    }
    else
    {
        FilterCanvasW = AppFilterM_clientWidth;
        FilterCanvasH = AppFilterM_clientHeight;
        FilterCanvasW_ = FilterCanvasW;
        FilterCanvasH_ = FilterCanvasH;
    }

    FilterDisplayCanvasObject.width = FilterCanvasW_;
    FilterDisplayCanvasObject.height = FilterCanvasH_;
    FilterDisplayCanvasData = FilterDisplayCanvasContext.createImageData(FilterCanvasW_, FilterCanvasH_);
    DrawClear(FilterDisplayCanvasData, FilterCanvasW_, FilterCanvasH_);


    FilterDisplayCanvasObject.style["width"] = AppFilterM_clientWidth + "px";
    FilterDisplayCanvasObject.style["height"] = AppFilterM_clientHeight + "px";
    FilterDraw();
}

function FilterBtnAction(N)
{
    var FSC = FilterSlot[SET_FilterSlotCurrent];
    switch (N)
    {
        case 10: // Slot 0
        case 11: // Slot 1
        case 12: // Slot 2
        case 13: // Slot 3
            SET_FilterSlotCurrent = N - 10;
            DataSetI("SET_FilterSlotCurrent", SET_FilterSlotCurrent);
            FSC = FilterSlot[SET_FilterSlotCurrent];
            break;
        case 14: // Step-
            if (SET_FilterValueStep > 0)
            {
                SET_FilterValueStep--;
                DataSetI("SET_FilterValueStep", SET_FilterValueStep);
                ProcessDisplayStep();
            }
            break;
        case 15: // Step+
            if (SET_FilterValueStep < (StepVal.length - 1))
            {
                SET_FilterValueStep++;
                DataSetI("SET_FilterValueStep", SET_FilterValueStep);
                ProcessDisplayStep();
            }
            break;
        case 16: // <<
        case 17: // >>
            if (N == 16) { FSC.FilterArraySelected--; }
            if (N == 17) { FSC.FilterArraySelected++; }
            if (FSC.FilterArraySelected >= (FSC.FilterArrayPoint.length - 1))
            {
                FSC.FilterArraySelected = -1;
            }
            if (FSC.FilterArraySelected < (-1))
            {
                FSC.FilterArraySelected = (FSC.FilterArrayPoint.length - 2);
            }
            if (FSC.FilterArraySelected < 0)
            {
                if (N == 16)
                {
                    if (FSC.PosHz)
                    {
                        FSC.PosHz = 5;
                    }
                    else
                    {
                        FSC.PosHz = 4;
                    }
                }
                if (N == 17)
                {
                    if (FSC.PosHz)
                    {
                        FSC.PosHz = 3;
                    }
                    else
                    {
                        FSC.PosHz = 2;
                    }
                }
            }
            else
            {
                if (N == 16)
                {
                    switch (FSC.PosHz) 
                    {
                        case 2: FSC.PosHz = 0; break;
                        case 3: FSC.PosHz = 1; break;
                        case 4: FSC.PosHz = 1; break;
                        case 5: FSC.PosHz = 0; break;
                    }
                }
                if (N == 17)
                {
                    switch (FSC.PosHz) 
                    {
                        case 2: FSC.PosHz = 1; break;
                        case 3: FSC.PosHz = 0; break;
                        case 4: FSC.PosHz = 0; break;
                        case 5: FSC.PosHz = 1; break;
                    }
                }
            }
            break;
        case 18: // Add
            FSC.FilterAdd();
            break;
        case 19: // Rem
            FSC.FilterRem();
            break;
        case 20: // Val-
            FSC.FilterVal(0 - StepVal[SET_FilterValueStep], SET_Filter_FilterLevMin, SET_Filter_FilterLevMax);
            break;
        case 21: // Val+
            FSC.FilterVal(0 + StepVal[SET_FilterValueStep], SET_Filter_FilterLevMin, SET_Filter_FilterLevMax);
            break;
        case 22: // |<
            if (FSC.FilterArraySelected < 0)
            {
                FilterSetZoom(1);
            }
            else
            {
                FSC.FilterPos(0, 0 - StepVal[SET_FilterValueStep]);
            }
            break;
        case 23: // |>
            if (FSC.FilterArraySelected < 0)
            {
                FilterSetZoom(2);
            }
            else
            {
                FSC.FilterPos(0, 0 + StepVal[SET_FilterValueStep]);
            }
            break;
        case 24: // <|
            if (FSC.FilterArraySelected < 0)
            {
                FilterSetZoom(3);
            }
            else
            {
                FSC.FilterPos(1, 0 - StepVal[SET_FilterValueStep]);
            }
            break;
        case 25: // >|
            if (FSC.FilterArraySelected < 0)
            {
                FilterSetZoom(4);
            }
            else
            {
                FSC.FilterPos(1, 0 + StepVal[SET_FilterValueStep]);
            }
            break;
    }
    FSC.FilterCalcWindow(SET_Filter_FilterFFT, SET_Filter_FilterLevMin);
    FilterDraw();
}


function FilterPoint(FObj, V)
{
    if (FObj.PosHz)
    {
        if (CurrentSamplerate > 0)
        {
            var T = V / FObj.FilterArrayPoint[FObj.FilterArrayPoint.length - 1];
            T = T * CurrentSamplerate;
            T = T / 2;
            return LabelVal(T * 100, 2) + " Hz";
        }
        else
        {
            return "0 Hz";
        }
    }
    else
    {
        return V + "/" + FObj.FilterArrayPoint[FObj.FilterArrayPoint.length - 1];
    }
}

function FilterOffsetCount()
{
    return FilterDrawZoom + FilterDrawZoom - 1;
}

function FilterSetZoom(Mode)
{
//var FilterDrawZoom = 1;
//var FilterDrawOffset = 0;

    switch(Mode)
    {
        case 1:
            if (FilterDrawZoom < 64)
            {
                FilterDrawZoom = Math.round(FilterDrawZoom * 2);
                FilterDrawOffset = Math.round(FilterDrawOffset * 2 + 1);
            }
            break;
        case 2:
            if (FilterDrawZoom > 1)
            {
                FilterDrawZoom = Math.round(FilterDrawZoom / 2);
                if (FilterDrawOffset > ((FilterDrawZoom * 2) - 1))
                {
                    FilterDrawOffset = Math.floor((FilterDrawOffset - 1) / 2);
                }
                else
                {
                    FilterDrawOffset = Math.ceil((FilterDrawOffset - 1) / 2);
                }
                if (FilterDrawOffset < 0)
                {
                    FilterDrawOffset = 0;
                }
                if (FilterDrawOffset > (FilterDrawZoom + FilterDrawZoom - 2))
                {
                    FilterDrawOffset = (FilterDrawZoom + FilterDrawZoom - 2);
                }
            }
            break;
        case 3:
            if (FilterDrawOffset > 0)
            {
                FilterDrawOffset--;
            }
            break;
        case 4:
            if (FilterDrawOffset < (FilterOffsetCount() - 1))
            {
                FilterDrawOffset++;
            }
            break;
    }
    FilterDraw();
}

function FilterDraw()
{
    var FilterDrawOffset_ = Math.round(FilterDrawOffset * 0.5 * FilterCanvasW);
    var FSC = FilterSlot[SET_FilterSlotCurrent];
    if (!FSC)
    {
        return;
    }
    //if (!FSC.FilterWindowFFT)
    {
        FFT_FourierBase = SET_Filter_FilterFFT;
        FFT_Init();
        FSC.FilterNormalize(SET_Filter_Canvas, SET_Filter_FilterLevMin, SET_Filter_FilterLevMax);
        FSC.FilterWindowFFT = FFT_FFT(FSC.FilterWindow);
    }

    var FilterDrawZero = FilterCanvasH * (SET_Filter_FilterLevMin / (SET_Filter_FilterLevMin - SET_Filter_FilterLevMax));
    var FilterDrawFact = FilterCanvasH / (SET_Filter_FilterLevMax - SET_Filter_FilterLevMin);

    FilterDrawRect(0, 0, FilterCanvasW, FilterCanvasH, SET_FilterColorBackR, SET_FilterColorBackG, SET_FilterColorBackB);
    FilterDrawRectX(0, Math.round(FilterCanvasH - 1 - FilterDrawZero), FilterCanvasW, SET_FilterColorZeroR, SET_FilterColorZeroG, SET_FilterColorZeroB);

    var LineSize = 1;
    var LineFactor = 2 * FilterCanvasW / FFT_FourierBase;

    if (LineFactor > 1)
    {
        LineSize = LineFactor;
    }
    LineSize = LineSize * FilterDrawZoom;

    for (var I = 0; I < (FFT_FourierBase / 2); I++)
    {
        var L1 = FSC.FilterWindowFFT[I] > 0 ? (10 * Math.log10(FSC.FilterWindowFFT[I])) : FSC.FilterConfInf;
        var L2 = FSC.FilterWindowFFT[I + 1] > 0 ? (10 * Math.log10(FSC.FilterWindowFFT[I + 1])) : FSC.FilterConfInf;

        L1 = Math.round(FilterCanvasH - 1 - FilterDrawZero - (L1 * FilterDrawFact));
        L2 = Math.round(FilterCanvasH - 1 - FilterDrawZero - (L2 * FilterDrawFact));

        var XX = Math.round(I * LineFactor * FilterDrawZoom) - FilterDrawOffset_;

        if (L1 > L2)
        {
            FilterDrawRect(XX, L2, LineSize, L1 - L2 + 1, SET_FilterColorSpecR, SET_FilterColorSpecG, SET_FilterColorSpecB);
        }
        if (L2 > L1)
        {
            FilterDrawRect(XX, L1, LineSize, L2 - L1 + 1, SET_FilterColorSpecR, SET_FilterColorSpecG, SET_FilterColorSpecB);
        }
        FilterDrawRectX(XX, L1, LineSize, SET_FilterColorSpecR, SET_FilterColorSpecG, SET_FilterColorSpecB);
    }


    var L = FSC.FilterArrayPoint.length - 1;
    var T = FilterDrawZoom * FilterCanvasW / FSC.FilterConfSize;
    for (var I = 0; I < L; I++)
    {
        var Lev = Math.round(FilterCanvasH - 1 - FilterDrawZero - (FSC.FilterArrayLevel[I] * FilterDrawFact));
        var IIMin = Math.round(FSC.FilterArrayPoint[I] * T) - FilterDrawOffset_;
        var IIMax = Math.round(FSC.FilterArrayPoint[I + 1] * T) - FilterDrawOffset_;
        if (I == FSC.FilterArraySelected)
        {
            FilterDrawRect(IIMin, Lev - 2, IIMax - IIMin, 5, SET_FilterColorLineR, SET_FilterColorLineG, SET_FilterColorLineB);
        }
        else
        {
            FilterDrawRectX(IIMin, Lev, IIMax - IIMin, SET_FilterColorLineR, SET_FilterColorLineG, SET_FilterColorLineB);
        }
    }

    for (var I = 0; I < MarkerCountF; I++)
    {
        for (var II = MarkerF_1; II <= MarkerF_2; II++)
        {
            FilterDrawRectY(II - FilterDrawOffset_ + Math.round(FilterDrawZoom * FilterCanvasW * MarkerFreqF[I]), 0, FilterCanvasH, MarkerColorRF[I], MarkerColorGF[I], MarkerColorBF[I]);
        }
    }

    FilterDrawRefresh();


    FilterBtnSetLabel("S0", (SET_FilterSlotCurrent == 0) ? "[Slot 0]" : "Slot 0");
    FilterBtnSetLabel("S1", (SET_FilterSlotCurrent == 1) ? "[Slot 1]" : "Slot 1");
    FilterBtnSetLabel("S2", (SET_FilterSlotCurrent == 2) ? "[Slot 2]" : "Slot 2");
    FilterBtnSetLabel("S3", (SET_FilterSlotCurrent == 3) ? "[Slot 3]" : "Slot 3");

    FilterBtnSetLabel("SD", "Step-\n" + StepVal[SET_FilterValueStep]);
    FilterBtnSetLabel("SU", "Step+\n" + StepVal[SET_FilterValueStep]);

    FilterBtnSetLabel("SL", "<<");
    FilterBtnSetLabel("SR", ">>");

    if (FSC.FilterArraySelected >= 0)
    {
        FilterBtnSetLabel("Ad", "Add");
        FilterBtnSetLabel("Re", "Rem");

        FilterBtnSetLabel("VD", "Level-\n" + FilterValue(FSC.FilterArrayLevel[FSC.FilterArraySelected], 1));
        FilterBtnSetLabel("VU", "Level+\n" + FilterValue(FSC.FilterArrayLevel[FSC.FilterArraySelected], 1));

        FilterBtnSetLabel("LL", "|<\n" + FilterPoint(FSC, FSC.FilterArrayPoint[FSC.FilterArraySelected]));
        FilterBtnSetLabel("LR", "|>\n" + FilterPoint(FSC, FSC.FilterArrayPoint[FSC.FilterArraySelected]));

        FilterBtnSetLabel("RL", "<|\n" + FilterPoint(FSC, FSC.FilterArrayPoint[FSC.FilterArraySelected + 1] - 1));
        FilterBtnSetLabel("RR", ">|\n" + FilterPoint(FSC, FSC.FilterArrayPoint[FSC.FilterArraySelected + 1] - 1));
    }
    else
    {
        if (FSC.FilterConfShape == 0)
        {
            FilterBtnSetLabel("Ad", "None");
            FilterBtnSetLabel("Re", "None");
        }
        if (FSC.FilterConfShape == 1)
        {
            FilterBtnSetLabel("Ad", "Black");
            FilterBtnSetLabel("Re", "man");
        }
        if (FSC.FilterConfShape == 2)
        {
            FilterBtnSetLabel("Ad", "Ham");
            FilterBtnSetLabel("Re", "ming");
        }

        FilterBtnSetLabel("VD", "Win-\n" + FSC.FilterWindowSize);
        FilterBtnSetLabel("VU", "Win+\n" + FSC.FilterWindowSize);

        FilterBtnSetLabel("LL", "[+]\n" + FilterDrawZoom);
        FilterBtnSetLabel("LR", "[-]\n" + FilterDrawZoom);

        FilterBtnSetLabel("RL", "[<<]\n" + (FilterDrawOffset + 1) + "/" + FilterOffsetCount());
        FilterBtnSetLabel("RR", "[>>]\n" + (FilterDrawOffset + 1) + "/" + FilterOffsetCount());
    }

    ProcessListUpdateFilters();
}

function FilterBtnSetLabel(BtnId, BtnLabel)
{
    document.getElementById("FilterBtnH1" + BtnId).innerText = BtnLabel;
    document.getElementById("FilterBtnV1" + BtnId).innerText = BtnLabel;
    document.getElementById("FilterBtnH2" + BtnId).innerText = BtnLabel;
    document.getElementById("FilterBtnV2" + BtnId).innerText = BtnLabel;
}

function FilterValue(X, S)
{
    if (X > 0)
    {
        return "+" + X.toFixed(S);
    }
    else
    {
        return "" + X.toFixed(S);
    }
}
