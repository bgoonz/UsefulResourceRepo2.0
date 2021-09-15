var SET_ScopeW = DataGetIDefault("SET_ScopeW", 101);
var SET_ScopeH = DataGetIDefault("SET_ScopeH", 101);
var SET_ScopeScaleW = DataGetIDefault("SET_ScopeScaleW", 2);
var SET_ScopeScaleH = DataGetIDefault("SET_ScopeScaleH", 2);

var SET_ScopeFactor = DataGetIDefault("SET_ScopeFactor", 10);

var SET_ScopeGainX = DataGetIDefault("SET_ScopeGainX", 1000);
var SET_ScopeGainY = DataGetIDefault("SET_ScopeGainY", 1000);
var SET_ScopeGainZ = DataGetIDefault("SET_ScopeGainZ", 1000);

var SET_ScopePlotMidSide = DataGetBDefault("SET_ScopePlotMidSide", true);

var SET_ScopeDimming = DataGetIDefault("SET_ScopeDimming", 4);
var SET_ScopePixelFactor = DataGetIDefault("SET_ScopePixelFactor", 1000);
var SET_ScopeStep = DataGetIDefault("SET_ScopeStep", 0);

var SET_ScopeOrientation = DataGetIDefault("SET_ScopeOrientation", 5);
var SET_ScopeToolbarSize = DataGetIDefault("SET_ScopeToolbarSize", 20);
var SET_ScopeToolbarPosition = DataGetIDefault("SET_ScopeToolbarPosition", 3);

var SET_ScopeBackColorR = DataGetIDefault("SET_ScopeBackColorR", 128);
var SET_ScopeBackColorG = DataGetIDefault("SET_ScopeBackColorG", 128);
var SET_ScopeBackColorB = DataGetIDefault("SET_ScopeBackColorB", 128);

// 0 - None
// 1 - Input
// 2 - Output
var SET_ScopeAudioR = DataGetIDefault("SET_ScopeAudioR", 1);
var SET_ScopeAudioG = DataGetIDefault("SET_ScopeAudioG", 1);
var SET_ScopeAudioB = DataGetIDefault("SET_ScopeAudioB", 1);

var SET_ScopeW_ = 0;
var SET_ScopeH_ = 0;




var ScopeDisplayCanvasObject;
var ScopeDisplayCanvasContext;
var ScopeDisplayCanvasData;

function ScopeInit()
{
    ScopeDisplayCanvasObject = document.getElementById("scopedisplay");
    ScopeDisplayCanvasContext = ScopeDisplayCanvasObject.getContext('2d');

    ScopeSetLayout();
    ScopeBtnLabel();
}

function ScopeSetLayout()
{
    if (!ScopeDisplayCanvasObject)
    {
        ScopeDisplayCanvasObject = document.getElementById("scopedisplay");
        ScopeDisplayCanvasContext = ScopeDisplayCanvasObject.getContext('2d');
    }

    var AppOscilloscopeM = document.getElementById("AppOscilloscopeM");
    AppOscilloscopeM.style["background-color"] = "rgb(" + SET_ScopeBackColorR + "," + SET_ScopeBackColorG + "," + SET_ScopeBackColorB + ")";

    ScopeDisplayCanvasObject.width = SET_ScopeW;
    ScopeDisplayCanvasObject.height = SET_ScopeH;
    ScopeDisplayCanvasData = ScopeDisplayCanvasContext.createImageData(SET_ScopeW, SET_ScopeH);
    DrawClear(ScopeDisplayCanvasData, SET_ScopeW, SET_ScopeH);


    var ToolbarH1 = document.getElementById("AppOscilloscopeToolbarH1");
    var ToolbarV1 = document.getElementById("AppOscilloscopeToolbarV1");
    var ToolbarH2 = document.getElementById("AppOscilloscopeToolbarH2");
    var ToolbarV2 = document.getElementById("AppOscilloscopeToolbarV2");
    ToolbarH1.style["display"] = "none";
    ToolbarV1.style["display"] = "none";
    ToolbarH2.style["display"] = "none";
    ToolbarV2.style["display"] = "none";

    var ToolbarH = (SET_ScopeToolbarPosition < 5) ? ToolbarH1 : ToolbarH2;
    var ToolbarV = (SET_ScopeToolbarPosition < 5) ? ToolbarV1 : ToolbarV2;

    switch (SET_ScopeToolbarPosition)
    {
        case 1: // Top
        case 5:
            AppOscilloscopeM.style["width"] = 100 + "%";
            AppOscilloscopeM.style["height"] = (100 - SET_ScopeToolbarSize) + "%";
            AppOscilloscopeT1.style["height"] = SET_ScopeToolbarSize + "%";
            AppOscilloscopeT1.style["display"] = "block";
            AppOscilloscopeT2.style["display"] = "none";
            AppOscilloscopeT3.style["display"] = "none";
            AppOscilloscopeT4.style["display"] = "none";
            AppOscilloscopeT1.appendChild(ToolbarH);
            ToolbarH.style["display"] = "block";
            break;
        case 2: // Bottom
        case 6:
            AppOscilloscopeM.style["width"] = 100 + "%";
            AppOscilloscopeM.style["height"] = (100 - SET_ScopeToolbarSize) + "%";
            AppOscilloscopeT4.style["height"] = SET_ScopeToolbarSize + "%";
            AppOscilloscopeT1.style["display"] = "none";
            AppOscilloscopeT2.style["display"] = "none";
            AppOscilloscopeT3.style["display"] = "none";
            AppOscilloscopeT4.style["display"] = "block";
            AppOscilloscopeT4.appendChild(ToolbarH);
            ToolbarH.style["display"] = "block";
            break;
        case 3: // Right
        case 7:
            AppOscilloscopeM.style["width"] = (100 - SET_ScopeToolbarSize) + "%";
            AppOscilloscopeM.style["height"] = 100 + "%";
            AppOscilloscopeT3.style["width"] = SET_ScopeToolbarSize + "%";
            AppOscilloscopeT1.style["display"] = "none";
            AppOscilloscopeT2.style["display"] = "none";
            AppOscilloscopeT3.style["display"] = "block";
            AppOscilloscopeT4.style["display"] = "none";
            AppOscilloscopeT3.appendChild(ToolbarV);
            ToolbarV.style["display"] = "block";
            break;
        case 4: // Left
        case 8:
            AppOscilloscopeM.style["width"] = (100 - SET_ScopeToolbarSize) + "%";
            AppOscilloscopeM.style["height"] = 100 + "%";
            AppOscilloscopeT2.style["width"] = SET_ScopeToolbarSize + "%";
            AppOscilloscopeT1.style["display"] = "none";
            AppOscilloscopeT2.style["display"] = "block";
            AppOscilloscopeT3.style["display"] = "none";
            AppOscilloscopeT4.style["display"] = "none";
            AppOscilloscopeT2.appendChild(ToolbarV);
            ToolbarV.style["display"] = "block";
            break;
        default:
            AppOscilloscopeM.style["width"] = 100 + "%";
            AppOscilloscopeM.style["height"] = 100 + "%";
            AppOscilloscopeT1.style["display"] = "none";
            AppOscilloscopeT2.style["display"] = "none";
            AppOscilloscopeT3.style["display"] = "none";
            AppOscilloscopeT4.style["display"] = "none";
            break;
    }

    var ScopeOffsetX = Math.round((AppOscilloscopeM.clientWidth - (SET_ScopeW * SET_ScopeScaleW)) / 2);
    var ScopeOffsetY = Math.round((AppOscilloscopeM.clientHeight - (SET_ScopeH * SET_ScopeScaleH)) / 2);

    ScopeDisplayCanvasObject.style["margin-left"] = ScopeOffsetX + "px";
    ScopeDisplayCanvasObject.style["margin-top"] = ScopeOffsetY + "px";
    ScopeDisplayCanvasObject.style["width"] = Math.floor(SET_ScopeW * SET_ScopeScaleW) + "px";
    ScopeDisplayCanvasObject.style["height"] = Math.floor(SET_ScopeH * SET_ScopeScaleH) + "px";

    ScopeDrawSet();
    ScopeDrawRect(0, 0, SET_ScopeW, SET_ScopeH, 0, 0, 0);
    ScopeDrawRefresh();
}

function ScopeBtnAction(N)
{
    switch (N)
    {
        case 10:
            SET_ScopeGainX = Limit(Math.round(SET_ScopeGainX - StepVal[SET_ScopeStep]), 0, 1000000);
            DataSetI("SET_ScopeGainX", SET_ScopeGainX);
            break;
        case 11:
            SET_ScopeGainX = Limit(Math.round(SET_ScopeGainX + StepVal[SET_ScopeStep]), 0, 1000000);
            DataSetI("SET_ScopeGainX", SET_ScopeGainX);
            break;
        case 12:
            SET_ScopeGainY = Limit(Math.round(SET_ScopeGainY - StepVal[SET_ScopeStep]), 0, 1000000);
            DataSetI("SET_ScopeGainY", SET_ScopeGainY);
            break;
        case 13:
            SET_ScopeGainY = Limit(Math.round(SET_ScopeGainY + StepVal[SET_ScopeStep]), 0, 1000000);
            DataSetI("SET_ScopeGainY", SET_ScopeGainY);
            break;
        case 14:
            SET_ScopeGainZ = Limit(Math.round(SET_ScopeGainZ - StepVal[SET_ScopeStep]), 0, 1000000);
            DataSetI("SET_ScopeGainZ", SET_ScopeGainZ);
            break;
        case 15:
            SET_ScopeGainZ = Limit(Math.round(SET_ScopeGainZ + StepVal[SET_ScopeStep]), 0, 1000000);
            DataSetI("SET_ScopeGainZ", SET_ScopeGainZ);
            break;
        case 16:
            SET_ScopePlotMidSide = !SET_ScopePlotMidSide;
            DataSetB("SET_ScopePlotMidSide", SET_ScopePlotMidSide);
            break;
        case 17:
            SET_ScopeOrientation = DrawOrientationTransform(SET_ScopeOrientation, 2);
            DataSetI("SET_ScopeOrientation", SET_ScopeOrientation);
            ScopeDrawSet();
            break;
        case 18:
            SET_ScopeOrientation = DrawOrientationTransform(SET_ScopeOrientation, 1);
            DataSetI("SET_ScopeOrientation", SET_ScopeOrientation);
            ScopeDrawSet();
            break;
        case 19:
            SET_ScopeOrientation = DrawOrientationTransform(SET_ScopeOrientation, 0);
            DataSetI("SET_ScopeOrientation", SET_ScopeOrientation);
            ScopeDrawSet();
            break;
        case 20:
            SET_ScopeFactor = Limit(Math.round(SET_ScopeFactor - StepVal[SET_ScopeStep]), 0, 1000);
            DataSetI("SET_ScopeFactor", SET_ScopeFactor);
            ScopeDrawSet();
            break;
        case 21:
            SET_ScopeFactor = Limit(Math.round(SET_ScopeFactor + StepVal[SET_ScopeStep]), 0, 1000);
            DataSetI("SET_ScopeFactor", SET_ScopeFactor);
            ScopeDrawSet();
            break;
        case 22:
            SET_ScopePixelFactor = Limit(Math.round(SET_ScopePixelFactor - StepVal[SET_ScopeStep]), 0, 1000);
            DataSetI("SET_ScopePixelFactor", SET_ScopePixelFactor);
            ScopeDrawSet();
            break;
        case 23:
            SET_ScopePixelFactor = Limit(Math.round(SET_ScopePixelFactor + StepVal[SET_ScopeStep]), 0, 1000);
            DataSetI("SET_ScopePixelFactor", SET_ScopePixelFactor);
            ScopeDrawSet();
            break;
        case 30:
            if (SET_ScopeStep > 0) { SET_ScopeStep--; }
            DataSetI("SET_ScopeStep", SET_ScopeStep);
            break;
        case 31:
            if (SET_ScopeStep < (StepVal.length - 1)) { SET_ScopeStep++; }
            DataSetI("SET_ScopeStep", SET_ScopeStep);
            break;
    }
    ScopeBtnLabel();
    SetScope();
}




var ScopeDrawRect_ = function(CanvasD, CanvasW, CanvasH, X, Y, W, H, ColorR, ColorG, ColorB)
{
}

function ScopeDrawRect(X, Y, W, H, ColorR, ColorG, ColorB)
{
    ScopeDrawRect_(ScopeDisplayCanvasData, SET_ScopeW, SET_ScopeH, X, Y, W, H, ColorR, ColorG, ColorB);
}

var ScopeDrawRectX_ = function(CanvasD, CanvasW, CanvasH, X, Y, W, ColorR, ColorG, ColorB)
{
}

function ScopeDrawRectX(X, Y, W, ColorR, ColorG, ColorB)
{
    ScopeDrawRectX_(ScopeDisplayCanvasData, SET_ScopeW, SET_ScopeH, X, Y, W, ColorR, ColorG, ColorB);
}

var ScopeDrawRectY_ = function(CanvasD, CanvasW, CanvasH, X, Y, H, ColorR, ColorG, ColorB)
{
}

function ScopeDrawRectY(X, Y, H, ColorR, ColorG, ColorB)
{
    ScopeDrawRectY_(ScopeDisplayCanvasData, SET_ScopeW, SET_ScopeH, X, Y, H, ColorR, ColorG, ColorB);
}

var ScopeDrawPxl_ = function(CanvasD, CanvasW, CanvasH, X, Y, ColorR, ColorG, ColorB)
{
}

function ScopeDrawPxl(X, Y, ColorR, ColorG, ColorB)
{
    ScopeDrawPxl_(ScopeDisplayCanvasData, SET_ScopeW, SET_ScopeH, X, Y, ColorR, ColorG, ColorB);
}

function ScopeDrawRefresh()
{
    if (ScopeDisplayCanvasContext)
    {
        ScopeDisplayCanvasContext.putImageData(ScopeDisplayCanvasData, 0, 0);
    }
}


function ScopeDrawSet()
{
    switch (SET_ScopeOrientation)
    {
        case 0: ScopeDrawRect_ = DrawRect0; ScopeDrawRectX_ = DrawRectX0; ScopeDrawRectY_ = DrawRectY0; ScopeDrawPxl_ = DrawPxl0; return false;
        case 1: ScopeDrawRect_ = DrawRect1; ScopeDrawRectX_ = DrawRectX1; ScopeDrawRectY_ = DrawRectY1; ScopeDrawPxl_ = DrawPxl1; return true;
        case 2: ScopeDrawRect_ = DrawRect2; ScopeDrawRectX_ = DrawRectX2; ScopeDrawRectY_ = DrawRectY2; ScopeDrawPxl_ = DrawPxl2; return false;
        case 3: ScopeDrawRect_ = DrawRect3; ScopeDrawRectX_ = DrawRectX3; ScopeDrawRectY_ = DrawRectY3; ScopeDrawPxl_ = DrawPxl3; return true;
        case 4: ScopeDrawRect_ = DrawRect4; ScopeDrawRectX_ = DrawRectX4; ScopeDrawRectY_ = DrawRectY4; ScopeDrawPxl_ = DrawPxl4; return true;
        case 5: ScopeDrawRect_ = DrawRect5; ScopeDrawRectX_ = DrawRectX5; ScopeDrawRectY_ = DrawRectY5; ScopeDrawPxl_ = DrawPxl5; return false;
        case 6: ScopeDrawRect_ = DrawRect6; ScopeDrawRectX_ = DrawRectX6; ScopeDrawRectY_ = DrawRectY6; ScopeDrawPxl_ = DrawPxl6; return true;
        case 7: ScopeDrawRect_ = DrawRect7; ScopeDrawRectX_ = DrawRectX7; ScopeDrawRectY_ = DrawRectY7; ScopeDrawPxl_ = DrawPxl7; return false;
    }
}


function ScopeSettingsGet()
{
    document.getElementById("xSET_ScopeW").value = SET_ScopeW;
    document.getElementById("xSET_ScopeH").value = SET_ScopeH;
    document.getElementById("xSET_ScopeScaleW").value = SET_ScopeScaleW;
    document.getElementById("xSET_ScopeScaleH").value = SET_ScopeScaleH;

    document.getElementById("xSET_ScopeFactor").value = SET_ScopeFactor;
    document.getElementById("xSET_ScopeDimming").value = SET_ScopeDimming;
    document.getElementById("xSET_ScopeGainX").value = SET_ScopeGainX;
    document.getElementById("xSET_ScopeGainY").value = SET_ScopeGainY;
    document.getElementById("xSET_ScopeGainZ").value = SET_ScopeGainZ;
    document.getElementById("xSET_ScopePixelFactor").value = SET_ScopePixelFactor;

    document.getElementById("xSET_ScopeToolbarPosition").selectedIndex = SET_ScopeToolbarPosition;
    document.getElementById("xSET_ScopeToolbarSize").value = SET_ScopeToolbarSize;

    document.getElementById("xSET_ScopeBackColor").value = ColorValuesToText(SET_ScopeBackColorR, SET_ScopeBackColorG, SET_ScopeBackColorB);

    document.getElementById("xSET_ScopeAudioR").selectedIndex = SET_ScopeAudioR;
    document.getElementById("xSET_ScopeAudioG").selectedIndex = SET_ScopeAudioG;
    document.getElementById("xSET_ScopeAudioB").selectedIndex = SET_ScopeAudioB;
}

function ScopeSettingsSet(Mode)
{
    var ColorTemp;

    SET_ScopeW = Limit(document.getElementById("xSET_ScopeW").value, 1, 1000000);
    SET_ScopeH = Limit(document.getElementById("xSET_ScopeH").value, 1, 1000000);
    SET_ScopeScaleW = Limit(document.getElementById("xSET_ScopeScaleW").value, 1, 1000000);
    SET_ScopeScaleH = Limit(document.getElementById("xSET_ScopeScaleH").value, 1, 1000000);

    SET_ScopeFactor = Limit(document.getElementById("xSET_ScopeFactor").value, 0, 1000);
    SET_ScopeDimming = Limit(document.getElementById("xSET_ScopeDimming").value, 1, 1000000);
    SET_ScopeGainX = Limit(document.getElementById("xSET_ScopeGainX").value, 0, 1000000);
    SET_ScopeGainY = Limit(document.getElementById("xSET_ScopeGainY").value, 0, 1000000);
    SET_ScopeGainZ = Limit(document.getElementById("xSET_ScopeGainZ").value, 0, 1000000);
    SET_ScopePixelFactor = Limit(document.getElementById("xSET_ScopePixelFactor").value, 0, 1000);

    SET_ScopeToolbarPosition = document.getElementById("xSET_ScopeToolbarPosition").selectedIndex;
    SET_ScopeToolbarSize = Limit(document.getElementById("xSET_ScopeToolbarSize").value, 1, 99);

    ColorTemp = ColorTextToValues(document.getElementById("xSET_ScopeBackColor").value, SET_ScopeBackColorR, SET_ScopeBackColorG, SET_ScopeBackColorB);
    SET_ScopeBackColorR = Limit(ColorTemp[0], 0, 255);
    SET_ScopeBackColorG = Limit(ColorTemp[1], 0, 255);
    SET_ScopeBackColorB = Limit(ColorTemp[2], 0, 255);

    SET_ScopeAudioR = document.getElementById("xSET_ScopeAudioR").selectedIndex;
    SET_ScopeAudioG = document.getElementById("xSET_ScopeAudioG").selectedIndex;
    SET_ScopeAudioB = document.getElementById("xSET_ScopeAudioB").selectedIndex;

    DataSetI("SET_ScopeW", SET_ScopeW);
    DataSetI("SET_ScopeH", SET_ScopeH);
    DataSetI("SET_ScopeScaleW", SET_ScopeScaleW);
    DataSetI("SET_ScopeScaleH", SET_ScopeScaleH);

    DataSetI("SET_ScopeFactor", SET_ScopeFactor);
    DataSetI("SET_ScopeDimming", SET_ScopeDimming);
    DataSetI("SET_ScopeGainX", SET_ScopeGainX);
    DataSetI("SET_ScopeGainY", SET_ScopeGainY);
    DataSetI("SET_ScopeGainZ", SET_ScopeGainZ);
    DataSetI("SET_ScopePixelFactor", SET_ScopePixelFactor);

    DataSetI("SET_ScopeToolbarPosition", SET_ScopeToolbarPosition);
    DataSetI("SET_ScopeToolbarSize", SET_ScopeToolbarSize);

    DataSetI("SET_ScopeBackColorR", SET_ScopeBackColorR);
    DataSetI("SET_ScopeBackColorG", SET_ScopeBackColorG);
    DataSetI("SET_ScopeBackColorB", SET_ScopeBackColorB);

    DataSetI("SET_ScopeAudioR", SET_ScopeAudioR);
    DataSetI("SET_ScopeAudioG", SET_ScopeAudioG);
    DataSetI("SET_ScopeAudioB", SET_ScopeAudioB);

    switch (Mode)
    {
        case 1:
            ScopeSetLayout();
            SetScope();
            ScopeBtnLabel();
            break;
    }
}

function ScopeBtnLabel()
{
    var XYLabel = "";
    var XXLabel = "";
    var YYLabel = "";
    switch (SET_ScopeOrientation)
    {
        case 0: XYLabel = "XY"; XXLabel = "X " + ArrR; YYLabel = "Y " + ArrD; break;
        case 2: XYLabel = "XY"; XXLabel = "X " + ArrL; YYLabel = "Y " + ArrU; break;
        case 5: XYLabel = "XY"; XXLabel = "X " + ArrR; YYLabel = "Y " + ArrU; break;
        case 7: XYLabel = "XY"; XXLabel = "X " + ArrL; YYLabel = "Y " + ArrD; break;

        case 4: XYLabel = "YX"; XXLabel = "X " + ArrD; YYLabel = "Y " + ArrR; break;
        case 3: XYLabel = "YX"; XXLabel = "X " + ArrU; YYLabel = "Y " + ArrR; break;
        case 1: XYLabel = "YX"; XXLabel = "X " + ArrD; YYLabel = "Y " + ArrL; break;
        case 6: XYLabel = "YX"; XXLabel = "X " + ArrU; YYLabel = "Y " + ArrL; break;
    }

    document.getElementById("ScopeBtnH1XU").innerText = "X+\n" + LabelVal(SET_ScopeGainX, 3);
    document.getElementById("ScopeBtnH1XD").innerText = "X-\n" + LabelVal(SET_ScopeGainX, 3);
    document.getElementById("ScopeBtnH1YU").innerText = "Y+\n" + LabelVal(SET_ScopeGainY, 3);
    document.getElementById("ScopeBtnH1YD").innerText = "Y-\n" + LabelVal(SET_ScopeGainY, 3);
    document.getElementById("ScopeBtnH1ZU").innerText = "Z+\n" + LabelVal(SET_ScopeGainZ, 3);
    document.getElementById("ScopeBtnH1ZD").innerText = "Z-\n" + LabelVal(SET_ScopeGainZ, 3);
    document.getElementById("ScopeBtnH1SU").innerText = "Step+\n" + LabelVal(StepVal[SET_ScopeStep], 3);
    document.getElementById("ScopeBtnH1SD").innerText = "Step-\n" + LabelVal(StepVal[SET_ScopeStep], 3);
    document.getElementById("ScopeBtnH1MS").innerText = (SET_ScopePlotMidSide ? "SM" : "LR");
    document.getElementById("ScopeBtnH1XY").innerText = XYLabel;
    document.getElementById("ScopeBtnH1XX").innerText = XXLabel;
    document.getElementById("ScopeBtnH1YY").innerText = YYLabel;
    document.getElementById("ScopeBtnH1DU").innerText = "Dim+\n" + LabelVal(SET_ScopeFactor, 3);
    document.getElementById("ScopeBtnH1DD").innerText = "Dim-\n" + LabelVal(SET_ScopeFactor, 3);
    document.getElementById("ScopeBtnH1PU").innerText = "Pxl+\n" + LabelVal(SET_ScopePixelFactor, 3);
    document.getElementById("ScopeBtnH1PD").innerText = "Pxl-\n" + LabelVal(SET_ScopePixelFactor, 3);

    document.getElementById("ScopeBtnV1XU").innerText = "X+\n" + LabelVal(SET_ScopeGainX, 3);
    document.getElementById("ScopeBtnV1XD").innerText = "X-\n" + LabelVal(SET_ScopeGainX, 3);
    document.getElementById("ScopeBtnV1YU").innerText = "Y+\n" + LabelVal(SET_ScopeGainY, 3);
    document.getElementById("ScopeBtnV1YD").innerText = "Y-\n" + LabelVal(SET_ScopeGainY, 3);
    document.getElementById("ScopeBtnV1ZU").innerText = "Z+\n" + LabelVal(SET_ScopeGainZ, 3);
    document.getElementById("ScopeBtnV1ZD").innerText = "Z-\n" + LabelVal(SET_ScopeGainZ, 3);
    document.getElementById("ScopeBtnV1SU").innerText = "Step+\n" + LabelVal(StepVal[SET_ScopeStep], 3);
    document.getElementById("ScopeBtnV1SD").innerText = "Step-\n" + LabelVal(StepVal[SET_ScopeStep], 3);
    document.getElementById("ScopeBtnV1MS").innerText = (SET_ScopePlotMidSide ? "SM" : "LR");
    document.getElementById("ScopeBtnV1XY").innerText = XYLabel;
    document.getElementById("ScopeBtnV1XX").innerText = XXLabel;
    document.getElementById("ScopeBtnV1YY").innerText = YYLabel;
    document.getElementById("ScopeBtnV1DU").innerText = "Dim+\n" + LabelVal(SET_ScopeFactor, 3);
    document.getElementById("ScopeBtnV1DD").innerText = "Dim-\n" + LabelVal(SET_ScopeFactor, 3);
    document.getElementById("ScopeBtnV1PU").innerText = "Pxl+\n" + LabelVal(SET_ScopePixelFactor, 3);
    document.getElementById("ScopeBtnV1PD").innerText = "Pxl-\n" + LabelVal(SET_ScopePixelFactor, 3);

    document.getElementById("ScopeBtnH2XU").innerText = "X+\n" + LabelVal(SET_ScopeGainX, 3);
    document.getElementById("ScopeBtnH2XD").innerText = "X-\n" + LabelVal(SET_ScopeGainX, 3);
    document.getElementById("ScopeBtnH2YU").innerText = "Y+\n" + LabelVal(SET_ScopeGainY, 3);
    document.getElementById("ScopeBtnH2YD").innerText = "Y-\n" + LabelVal(SET_ScopeGainY, 3);
    document.getElementById("ScopeBtnH2ZU").innerText = "Z+\n" + LabelVal(SET_ScopeGainZ, 3);
    document.getElementById("ScopeBtnH2ZD").innerText = "Z-\n" + LabelVal(SET_ScopeGainZ, 3);
    document.getElementById("ScopeBtnH2SU").innerText = "Step+\n" + LabelVal(StepVal[SET_ScopeStep], 3);
    document.getElementById("ScopeBtnH2SD").innerText = "Step-\n" + LabelVal(StepVal[SET_ScopeStep], 3);
    document.getElementById("ScopeBtnH2MS").innerText = (SET_ScopePlotMidSide ? "SM" : "LR");
    document.getElementById("ScopeBtnH2XY").innerText = XYLabel;
    document.getElementById("ScopeBtnH2XX").innerText = XXLabel;
    document.getElementById("ScopeBtnH2YY").innerText = YYLabel;
    document.getElementById("ScopeBtnH2DU").innerText = "Dim+\n" + LabelVal(SET_ScopeFactor, 3);
    document.getElementById("ScopeBtnH2DD").innerText = "Dim-\n" + LabelVal(SET_ScopeFactor, 3);
    document.getElementById("ScopeBtnH2PU").innerText = "Pxl+\n" + LabelVal(SET_ScopePixelFactor, 3);
    document.getElementById("ScopeBtnH2PD").innerText = "Pxl-\n" + LabelVal(SET_ScopePixelFactor, 3);

    document.getElementById("ScopeBtnV2XU").innerText = "X+\n" + LabelVal(SET_ScopeGainX, 3);
    document.getElementById("ScopeBtnV2XD").innerText = "X-\n" + LabelVal(SET_ScopeGainX, 3);
    document.getElementById("ScopeBtnV2YU").innerText = "Y+\n" + LabelVal(SET_ScopeGainY, 3);
    document.getElementById("ScopeBtnV2YD").innerText = "Y-\n" + LabelVal(SET_ScopeGainY, 3);
    document.getElementById("ScopeBtnV2ZU").innerText = "Z+\n" + LabelVal(SET_ScopeGainZ, 3);
    document.getElementById("ScopeBtnV2ZD").innerText = "Z-\n" + LabelVal(SET_ScopeGainZ, 3);
    document.getElementById("ScopeBtnV2SU").innerText = "Step+\n" + LabelVal(StepVal[SET_ScopeStep], 3);
    document.getElementById("ScopeBtnV2SD").innerText = "Step-\n" + LabelVal(StepVal[SET_ScopeStep], 3);
    document.getElementById("ScopeBtnV2MS").innerText = (SET_ScopePlotMidSide ? "SM" : "LR");
    document.getElementById("ScopeBtnV2XY").innerText = XYLabel;
    document.getElementById("ScopeBtnV2XX").innerText = XXLabel;
    document.getElementById("ScopeBtnV2YY").innerText = YYLabel;
    document.getElementById("ScopeBtnV2DU").innerText = "Dim+\n" + LabelVal(SET_ScopeFactor, 3);
    document.getElementById("ScopeBtnV2DD").innerText = "Dim-\n" + LabelVal(SET_ScopeFactor, 3);
    document.getElementById("ScopeBtnV2PU").innerText = "Pxl+\n" + LabelVal(SET_ScopePixelFactor, 3);
    document.getElementById("ScopeBtnV2PD").innerText = "Pxl-\n" + LabelVal(SET_ScopePixelFactor, 3);
}
