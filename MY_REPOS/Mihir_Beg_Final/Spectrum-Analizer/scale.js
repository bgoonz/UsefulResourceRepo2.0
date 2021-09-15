var SET_DrawLog = DataGetBDefault("SET_DrawLog", false);
var SET_DrawLogBase = DataGetIDefault("SET_DrawLogBase", 10000);
var SET_DrawLogFactor = DataGetIDefault("SET_DrawLogFactor", 500);
var SET_DrawLogOffset = DataGetIDefault("SET_DrawLogOffset", 1000);
var SET_ScaleSetLogMode = DataGetIDefault("SET_ScaleSetLogMode", 0);
var SET_ScaleSetLog = DataGetBDefault("SET_ScaleSetLog", false);
var SET_ScaleSetLogBase = DataGetIDefault("SET_ScaleSetLogBase", 2000);
var SET_ScaleSetLogFactor = DataGetIDefault("SET_ScaleSetLogFactor", 100);
var SET_ScaleSetLogOffset = DataGetIDefault("SET_ScaleSetLogOffset", 1000);
var SET_ScaleSetLogStep = DataGetIDefault("SET_ScaleSetLogStep", 6);
var SET_ScaleSetLogQuality = DataGetIDefault("SET_ScaleSetLogQuality", 2);
var SET_ToolbarLog = DataGetBDefault("SET_ToolbarLog", true);



var ScaleData = [];
var ScaleDataL = [];
var ScaleDataF = [];
var ScaleLinesLast = 0;
var ScaleSampleRate = 0;

var ScaleSetLogStepVal = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000];

var ScaleStripColor = [];

var ScaleStripLastL = 0;
var ScaleStripLastH = 0;
var ScaleStripLastO = 0;


var ScaleStripConfig = [];

function ScaleSetToolbar()
{
    if (SET_ToolbarLog)
    {
        document.getElementById("ToolbarSpecH101").style["height"] = "34%";
        document.getElementById("ToolbarSpecH102").style["height"] = "34%";
        document.getElementById("ToolbarSpecH103").style["height"] = "32%";

        document.getElementById("ToolbarSpecV101").style["width"] = "34%";
        document.getElementById("ToolbarSpecV102").style["width"] = "34%";
        document.getElementById("ToolbarSpecV103").style["width"] = "34%";
        document.getElementById("ToolbarSpecV104").style["width"] = "34%";
        document.getElementById("ToolbarSpecV105").style["width"] = "34%";
        document.getElementById("ToolbarSpecV106").style["width"] = "34%";
        document.getElementById("ToolbarSpecV107").style["width"] = "34%";
        document.getElementById("ToolbarSpecV108").style["width"] = "34%";
        document.getElementById("ToolbarSpecV109").style["width"] = "34%";
        document.getElementById("ToolbarSpecV110").style["width"] = "34%";
        document.getElementById("ToolbarSpecV111").style["width"] = "34%";
        document.getElementById("ToolbarSpecV112").style["width"] = "34%";
        document.getElementById("ToolbarSpecV113").style["width"] = "34%";
        document.getElementById("ToolbarSpecV114").style["width"] = "34%";
        document.getElementById("ToolbarSpecV115").style["width"] = "34%";
        document.getElementById("ToolbarSpecV116").style["width"] = "34%";
        document.getElementById("ToolbarSpecV117").style["width"] = "34%";
        document.getElementById("ToolbarSpecV118").style["width"] = "34%";
        document.getElementById("ToolbarSpecV119").style["width"] = "34%";
        document.getElementById("ToolbarSpecV120").style["width"] = "34%";

        document.getElementById("ToolbarSpecV121").style["width"] = "32%";
        document.getElementById("ToolbarSpecV122").style["width"] = "32%";
        document.getElementById("ToolbarSpecV123").style["width"] = "32%";
        document.getElementById("ToolbarSpecV124").style["width"] = "32%";
        document.getElementById("ToolbarSpecV125").style["width"] = "32%";
        document.getElementById("ToolbarSpecV126").style["width"] = "32%";
        document.getElementById("ToolbarSpecV127").style["width"] = "32%";
        document.getElementById("ToolbarSpecV128").style["width"] = "32%";
        document.getElementById("ToolbarSpecV129").style["width"] = "32%";
        document.getElementById("ToolbarSpecV130").style["width"] = "32%";

        document.getElementById("ToolbarSpecH201").style["height"] = "17%";
        document.getElementById("ToolbarSpecH202").style["height"] = "17%";
        document.getElementById("ToolbarSpecH203").style["height"] = "17%";
        document.getElementById("ToolbarSpecH204").style["height"] = "17%";
        document.getElementById("ToolbarSpecH205").style["height"] = "16%";
        document.getElementById("ToolbarSpecH206").style["height"] = "16%";

        document.getElementById("ToolbarSpecV201").style["width"] = "17%";
        document.getElementById("ToolbarSpecV202").style["width"] = "17%";
        document.getElementById("ToolbarSpecV203").style["width"] = "17%";
        document.getElementById("ToolbarSpecV204").style["width"] = "17%";
        document.getElementById("ToolbarSpecV205").style["width"] = "17%";
        document.getElementById("ToolbarSpecV206").style["width"] = "17%";
        document.getElementById("ToolbarSpecV207").style["width"] = "17%";
        document.getElementById("ToolbarSpecV208").style["width"] = "17%";
        document.getElementById("ToolbarSpecV209").style["width"] = "17%";
        document.getElementById("ToolbarSpecV210").style["width"] = "17%";
        document.getElementById("ToolbarSpecV211").style["width"] = "17%";
        document.getElementById("ToolbarSpecV212").style["width"] = "17%";
        document.getElementById("ToolbarSpecV213").style["width"] = "17%";
        document.getElementById("ToolbarSpecV214").style["width"] = "17%";
        document.getElementById("ToolbarSpecV215").style["width"] = "17%";
        document.getElementById("ToolbarSpecV216").style["width"] = "17%";
        document.getElementById("ToolbarSpecV217").style["width"] = "17%";
        document.getElementById("ToolbarSpecV218").style["width"] = "17%";
        document.getElementById("ToolbarSpecV219").style["width"] = "17%";
        document.getElementById("ToolbarSpecV220").style["width"] = "17%";

        document.getElementById("ToolbarSpecV221").style["width"] = "16%";
        document.getElementById("ToolbarSpecV222").style["width"] = "16%";
        document.getElementById("ToolbarSpecV223").style["width"] = "16%";
        document.getElementById("ToolbarSpecV224").style["width"] = "16%";
        document.getElementById("ToolbarSpecV225").style["width"] = "16%";
        document.getElementById("ToolbarSpecV226").style["width"] = "16%";
        document.getElementById("ToolbarSpecV227").style["width"] = "16%";
        document.getElementById("ToolbarSpecV228").style["width"] = "16%";
        document.getElementById("ToolbarSpecV229").style["width"] = "16%";
        document.getElementById("ToolbarSpecV230").style["width"] = "16%";

        document.getElementById("ToolbarSpecH103").style["display"] = "";

        document.getElementById("ToolbarSpecV121").style["display"] = "";
        document.getElementById("ToolbarSpecV122").style["display"] = "";
        document.getElementById("ToolbarSpecV123").style["display"] = "";
        document.getElementById("ToolbarSpecV124").style["display"] = "";
        document.getElementById("ToolbarSpecV125").style["display"] = "";
        document.getElementById("ToolbarSpecV126").style["display"] = "";
        document.getElementById("ToolbarSpecV127").style["display"] = "";
        document.getElementById("ToolbarSpecV128").style["display"] = "";
        document.getElementById("ToolbarSpecV129").style["display"] = "";
        document.getElementById("ToolbarSpecV130").style["display"] = "";

        document.getElementById("ToolbarSpecH205").style["display"] = "";
        document.getElementById("ToolbarSpecH206").style["display"] = "";

        document.getElementById("ToolbarSpecV221").style["display"] = "";
        document.getElementById("ToolbarSpecV222").style["display"] = "";
        document.getElementById("ToolbarSpecV223").style["display"] = "";
        document.getElementById("ToolbarSpecV224").style["display"] = "";
        document.getElementById("ToolbarSpecV225").style["display"] = "";
        document.getElementById("ToolbarSpecV226").style["display"] = "";
        document.getElementById("ToolbarSpecV227").style["display"] = "";
        document.getElementById("ToolbarSpecV228").style["display"] = "";
        document.getElementById("ToolbarSpecV229").style["display"] = "";
        document.getElementById("ToolbarSpecV230").style["display"] = "";
    }
    else
    {
        document.getElementById("ToolbarSpecH101").style["height"] = "50%";
        document.getElementById("ToolbarSpecH102").style["height"] = "50%";

        document.getElementById("ToolbarSpecV101").style["width"] = "50%";
        document.getElementById("ToolbarSpecV102").style["width"] = "50%";
        document.getElementById("ToolbarSpecV103").style["width"] = "50%";
        document.getElementById("ToolbarSpecV104").style["width"] = "50%";
        document.getElementById("ToolbarSpecV105").style["width"] = "50%";
        document.getElementById("ToolbarSpecV106").style["width"] = "50%";
        document.getElementById("ToolbarSpecV107").style["width"] = "50%";
        document.getElementById("ToolbarSpecV108").style["width"] = "50%";
        document.getElementById("ToolbarSpecV109").style["width"] = "50%";
        document.getElementById("ToolbarSpecV110").style["width"] = "50%";
        document.getElementById("ToolbarSpecV111").style["width"] = "50%";
        document.getElementById("ToolbarSpecV112").style["width"] = "50%";
        document.getElementById("ToolbarSpecV113").style["width"] = "50%";
        document.getElementById("ToolbarSpecV114").style["width"] = "50%";
        document.getElementById("ToolbarSpecV115").style["width"] = "50%";
        document.getElementById("ToolbarSpecV116").style["width"] = "50%";
        document.getElementById("ToolbarSpecV117").style["width"] = "50%";
        document.getElementById("ToolbarSpecV118").style["width"] = "50%";
        document.getElementById("ToolbarSpecV119").style["width"] = "50%";
        document.getElementById("ToolbarSpecV120").style["width"] = "50%";

        document.getElementById("ToolbarSpecH201").style["height"] = "25%";
        document.getElementById("ToolbarSpecH202").style["height"] = "25%";
        document.getElementById("ToolbarSpecH203").style["height"] = "25%";
        document.getElementById("ToolbarSpecH204").style["height"] = "25%";

        document.getElementById("ToolbarSpecV201").style["width"] = "25%";
        document.getElementById("ToolbarSpecV202").style["width"] = "25%";
        document.getElementById("ToolbarSpecV203").style["width"] = "25%";
        document.getElementById("ToolbarSpecV204").style["width"] = "25%";
        document.getElementById("ToolbarSpecV205").style["width"] = "25%";
        document.getElementById("ToolbarSpecV206").style["width"] = "25%";
        document.getElementById("ToolbarSpecV207").style["width"] = "25%";
        document.getElementById("ToolbarSpecV208").style["width"] = "25%";
        document.getElementById("ToolbarSpecV209").style["width"] = "25%";
        document.getElementById("ToolbarSpecV210").style["width"] = "25%";
        document.getElementById("ToolbarSpecV211").style["width"] = "25%";
        document.getElementById("ToolbarSpecV212").style["width"] = "25%";
        document.getElementById("ToolbarSpecV213").style["width"] = "25%";
        document.getElementById("ToolbarSpecV214").style["width"] = "25%";
        document.getElementById("ToolbarSpecV215").style["width"] = "25%";
        document.getElementById("ToolbarSpecV216").style["width"] = "25%";
        document.getElementById("ToolbarSpecV217").style["width"] = "25%";
        document.getElementById("ToolbarSpecV218").style["width"] = "25%";
        document.getElementById("ToolbarSpecV219").style["width"] = "25%";
        document.getElementById("ToolbarSpecV220").style["width"] = "25%";

        document.getElementById("ToolbarSpecH103").style["display"] = "none";

        document.getElementById("ToolbarSpecV121").style["display"] = "none";
        document.getElementById("ToolbarSpecV122").style["display"] = "none";
        document.getElementById("ToolbarSpecV123").style["display"] = "none";
        document.getElementById("ToolbarSpecV124").style["display"] = "none";
        document.getElementById("ToolbarSpecV125").style["display"] = "none";
        document.getElementById("ToolbarSpecV126").style["display"] = "none";
        document.getElementById("ToolbarSpecV127").style["display"] = "none";
        document.getElementById("ToolbarSpecV128").style["display"] = "none";
        document.getElementById("ToolbarSpecV129").style["display"] = "none";
        document.getElementById("ToolbarSpecV130").style["display"] = "none";

        document.getElementById("ToolbarSpecH205").style["display"] = "none";
        document.getElementById("ToolbarSpecH206").style["display"] = "none";

        document.getElementById("ToolbarSpecV221").style["display"] = "none";
        document.getElementById("ToolbarSpecV222").style["display"] = "none";
        document.getElementById("ToolbarSpecV223").style["display"] = "none";
        document.getElementById("ToolbarSpecV224").style["display"] = "none";
        document.getElementById("ToolbarSpecV225").style["display"] = "none";
        document.getElementById("ToolbarSpecV226").style["display"] = "none";
        document.getElementById("ToolbarSpecV227").style["display"] = "none";
        document.getElementById("ToolbarSpecV228").style["display"] = "none";
        document.getElementById("ToolbarSpecV229").style["display"] = "none";
        document.getElementById("ToolbarSpecV230").style["display"] = "none";
    }
    
    ScaleSetLabels();
}

function ScaleSetLabels()
{
    var L0 = "";
    var L1 = "";
    var L2 = "";
    var L3 = "";
    var L4 = "";
    var L5 = "";
    var L6 = "";
    var L7 = "";
    var L8 = "S-\n" + LabelVal(ScaleSetLogStepVal[SET_ScaleSetLogStep], 3);
    var L9 = "S+\n" + LabelVal(ScaleSetLogStepVal[SET_ScaleSetLogStep], 3);
    
    if (SET_ScaleSetLogMode == 0)
    {
        L0 = "Mode\nFreq";
        L1 = "Scale\n" + (SET_ScaleSetLog ? "Log" : "Line");
        L2 = "B-\n" + LabelVal(SET_ScaleSetLogBase, 3);
        L3 = "B+\n" + LabelVal(SET_ScaleSetLogBase, 3);
        L4 = "F-\n" + LabelVal(SET_ScaleSetLogFactor, 3);
        L5 = "F+\n" + LabelVal(SET_ScaleSetLogFactor, 3);
        L6 = "O-\n" + LabelVal(SET_ScaleSetLogOffset, 3);
        L7 = "O+\n" + LabelVal(SET_ScaleSetLogOffset, 3);
    }
    if (SET_ScaleSetLogMode == 1)
    {
        L0 = "Mode\nAmpl";
        L1 = "Scale\n" + (SET_DrawLog ? "Log" : "Line");
        L2 = "B-\n" + LabelVal(SET_DrawLogBase, 3);
        L3 = "B+\n" + LabelVal(SET_DrawLogBase, 3);
        L4 = "F-\n" + LabelVal(SET_DrawLogFactor, 3);
        L5 = "F+\n" + LabelVal(SET_DrawLogFactor, 3);
        L6 = "O-\n" + LabelVal(SET_DrawLogOffset, 3);
        L7 = "O+\n" + LabelVal(SET_DrawLogOffset, 3);
    }

    document.getElementById("BtnH1LogMod").innerText = L0;
    document.getElementById("BtnH1LogTrn").innerText = L1;
    document.getElementById("BtnH1LogBsD").innerText = L2;
    document.getElementById("BtnH1LogBsU").innerText = L3;
    document.getElementById("BtnH1LogFaD").innerText = L4;
    document.getElementById("BtnH1LogFaU").innerText = L5;
    document.getElementById("BtnH1LogOfD").innerText = L6;
    document.getElementById("BtnH1LogOfU").innerText = L7;
    document.getElementById("BtnH1LogStD").innerText = L8;
    document.getElementById("BtnH1LogStU").innerText = L9;

    document.getElementById("BtnV1LogMod").innerText = L0;
    document.getElementById("BtnV1LogTrn").innerText = L1;
    document.getElementById("BtnV1LogBsD").innerText = L2;
    document.getElementById("BtnV1LogBsU").innerText = L3;
    document.getElementById("BtnV1LogFaD").innerText = L4;
    document.getElementById("BtnV1LogFaU").innerText = L5;
    document.getElementById("BtnV1LogOfD").innerText = L6;
    document.getElementById("BtnV1LogOfU").innerText = L7;
    document.getElementById("BtnV1LogStD").innerText = L8;
    document.getElementById("BtnV1LogStU").innerText = L9;

    document.getElementById("BtnH2LogMod").innerText = L0;
    document.getElementById("BtnH2LogTrn").innerText = L1;
    document.getElementById("BtnH2LogBsD").innerText = L2;
    document.getElementById("BtnH2LogBsU").innerText = L3;
    document.getElementById("BtnH2LogFaD").innerText = L4;
    document.getElementById("BtnH2LogFaU").innerText = L5;
    document.getElementById("BtnH2LogOfD").innerText = L6;
    document.getElementById("BtnH2LogOfU").innerText = L7;
    document.getElementById("BtnH2LogStD").innerText = L8;
    document.getElementById("BtnH2LogStU").innerText = L9;

    document.getElementById("BtnV2LogMod").innerText = L0;
    document.getElementById("BtnV2LogTrn").innerText = L1;
    document.getElementById("BtnV2LogBsD").innerText = L2;
    document.getElementById("BtnV2LogBsU").innerText = L3;
    document.getElementById("BtnV2LogFaD").innerText = L4;
    document.getElementById("BtnV2LogFaU").innerText = L5;
    document.getElementById("BtnV2LogOfD").innerText = L6;
    document.getElementById("BtnV2LogOfU").innerText = L7;
    document.getElementById("BtnV2LogStD").innerText = L8;
    document.getElementById("BtnV2LogStU").innerText = L9;
}

function ScaleBtnAction(Btn)
{
    switch(Btn)
    {
        case 30:
            {
                SET_ScaleSetLogMode++;
                if (SET_ScaleSetLogMode == 2)
                {
                    SET_ScaleSetLogMode = 0;
                }
                DataSetI("SET_ScaleSetLogMode", SET_ScaleSetLogMode);
                ScaleSetLabels();
            }
            break;
        case 31:
            if (SET_ScaleSetLogMode == 0)
            {
                SET_ScaleSetLog = !SET_ScaleSetLog;
                DataSetB("SET_ScaleSetLog", SET_ScaleSetLog);
                ScaleCalcReset();
            }
            if (SET_ScaleSetLogMode == 1)
            {
                SET_DrawLog = !SET_DrawLog;
                DataSetB("SET_DrawLog", SET_DrawLog);
            }
            SetFFT();
            break;
        case 32:
            if (SET_ScaleSetLogMode == 0)
            {
                SET_ScaleSetLogBase -= ScaleSetLogStepVal[SET_ScaleSetLogStep];
                if (SET_ScaleSetLogBase < 1000)
                {
                    SET_ScaleSetLogBase = 1000;
                }
                DataSetI("SET_ScaleSetLogBase", SET_ScaleSetLogBase);
                ScaleCalcReset();
            }
            if (SET_ScaleSetLogMode == 1)
            {
                SET_DrawLogBase -= ScaleSetLogStepVal[SET_ScaleSetLogStep];
                if (SET_DrawLogBase < 1000)
                {
                    SET_DrawLogBase = 1000;
                }
                DataSet("SET_DrawLogBase", SET_DrawLogBase);
            }
            SetFFT();
            break;
        case 33:
            if (SET_ScaleSetLogMode == 0)
            {
                SET_ScaleSetLogBase += ScaleSetLogStepVal[SET_ScaleSetLogStep];
                DataSetI("SET_ScaleSetLogBase", SET_ScaleSetLogBase);
                ScaleCalcReset();
            }
            if (SET_ScaleSetLogMode == 1)
            {
                SET_DrawLogBase += ScaleSetLogStepVal[SET_ScaleSetLogStep];
                DataSet("SET_DrawLogBase", SET_DrawLogBase);
            }
            SetFFT();
            break;
        case 34:
            if (SET_ScaleSetLogMode == 0)
            {
                SET_ScaleSetLogFactor -= ScaleSetLogStepVal[SET_ScaleSetLogStep];
                if (SET_ScaleSetLogFactor < 0)
                {
                    SET_ScaleSetLogFactor = 0;
                }
                DataSetI("SET_ScaleSetLogFactor", SET_ScaleSetLogFactor);
                ScaleCalcReset();
            }
            if (SET_ScaleSetLogMode == 1)
            {
                SET_DrawLogFactor -= ScaleSetLogStepVal[SET_ScaleSetLogStep];
                if (SET_DrawLogFactor < 0)
                {
                    SET_DrawLogFactor = 0;
                }
                DataSet("SET_DrawLogFactor", SET_DrawLogFactor);
            }
            SetFFT();
            break;
        case 35:
            if (SET_ScaleSetLogMode == 0)
            {
                SET_ScaleSetLogFactor += ScaleSetLogStepVal[SET_ScaleSetLogStep];
                DataSetI("SET_ScaleSetLogFactor", SET_ScaleSetLogFactor);
                ScaleCalcReset();
            }
            if (SET_ScaleSetLogMode == 1)
            {
                SET_DrawLogFactor += ScaleSetLogStepVal[SET_ScaleSetLogStep];
                DataSet("SET_DrawLogFactor", SET_DrawLogFactor);
            }
            SetFFT();
            break;
        case 36:
            if (SET_ScaleSetLogMode == 0)
            {
                SET_ScaleSetLogOffset -= ScaleSetLogStepVal[SET_ScaleSetLogStep];
                if (SET_ScaleSetLogOffset < 0)
                {
                    SET_ScaleSetLogOffset = 0;
                }
                DataSetI("SET_ScaleSetLogOffset", SET_ScaleSetLogOffset);
                ScaleCalcReset();
            }
            if (SET_ScaleSetLogMode == 1)
            {
                SET_DrawLogOffset -= ScaleSetLogStepVal[SET_ScaleSetLogStep];
                if (SET_DrawLogOffset < 0)
                {
                    SET_DrawLogOffset = 0;
                }
                DataSet("SET_DrawLogOffset", SET_DrawLogOffset);
            }
            SetFFT();
            break;
        case 37:
            if (SET_ScaleSetLogMode == 0)
            {
                SET_ScaleSetLogOffset += ScaleSetLogStepVal[SET_ScaleSetLogStep];
                DataSetI("SET_ScaleSetLogOffset", SET_ScaleSetLogOffset);
                ScaleCalcReset();
            }
            if (SET_ScaleSetLogMode == 1)
            {
                SET_DrawLogOffset += ScaleSetLogStepVal[SET_ScaleSetLogStep];
                DataSet("SET_DrawLogOffset", SET_DrawLogOffset);
            }
            SetFFT();
            break;
        case 38:
            if (SET_ScaleSetLogStep > 0)
            {
                SET_ScaleSetLogStep--;
                DataSetI("SET_ScaleSetLogStep", SET_ScaleSetLogStep);
            }
            break;
        case 39:
            if (SET_ScaleSetLogStep < (ScaleSetLogStepVal.length - 1))
            {
                SET_ScaleSetLogStep++;
                DataSetI("SET_ScaleSetLogStep", SET_ScaleSetLogStep);
            }
            break;
    }
    ScaleSetLabels();
}

function ScaleCalcIsNumber(Txt, Dec)
{
    if (Txt.length < 1)
    {
        return false;
    }
    var Allowed = "-0123456789";
    if (Dec)
    {
        Allowed = Allowed + ".";
    }
    for (var I = 0; I < Txt.length; I++)
    {
        if (!Allowed.includes(Txt[I]))
        {
            return false;
        }
    }
    return true;
}

function ScaleCalcPrepareStrip(Txt)
{
    ScaleStripConfig = [];

    Txt = Txt.split('\n');    
    
    var AllowedChars = "+-*/0123456789. ";
    var AllowedOp = "+-*/";
    
    for (var I = 0; I < Txt.length; I++)
    {
        //Filtering allowed characters
        var Txt0 = "";
        for (var II = 0; II < Txt[I].length; II++)
        {
            if (AllowedChars.includes(Txt[I][II]))
            {
                Txt0 = Txt0 + Txt[I][II];
            }
            else
            {
                if (Txt[I][II] == ",") { Txt0 = Txt0 + "."; }
                if (Txt[I][II] == "\t") { Txt0 = Txt0 + " "; }
            }
        }
        
        // Removing leading ant trailing spaces
        Txt0 = Txt0.trim();
        
        // Converting multiply spaces to single space
        var DblSp = Txt0.indexOf("  ");
        while (DblSp >= 0)
        {
            Txt0 = Txt0.substr(0, DblSp) + Txt0.substr(DblSp + 1);
            DblSp = Txt0.indexOf("  ");
        }
        
        // Separating to values
        Txt0 = Txt0.split(" ");

        // Recognizing and setting parameters
        if (Txt0.length == 5)
        {
            if ((Txt0[1].length == 1) && ((Txt0[1] == "+") || (Txt0[1] == "*")))
            {
                if (ScaleCalcIsNumber(Txt0[0], true))
                {
                    if (ScaleCalcIsNumber(Txt0[2], true))
                    {
                        if (ScaleCalcIsNumber(Txt0[3], false))
                        {
                            if (ScaleCalcIsNumber(Txt0[4], false))
                            {
                                Txt0[0] = parseFloat(Txt0[0]);
                                Txt0[2] = parseFloat(Txt0[2]);
                                Txt0[3] = parseInt(Txt0[3]);
                                Txt0[4] = parseInt(Txt0[4]);
                                ScaleStripConfig.push([1, Txt0[0], Txt0[1], Txt0[2], Txt0[3], Txt0[4]]);
                            }
                        }
                    }
                }
            }
        }
        if (Txt0.length == 7)
        {
            if ((Txt0[0].length == 1) && (AllowedOp.includes(Txt0[0])))
            {
                if ((Txt0[2].length == 1) && (AllowedOp.includes(Txt0[2])))
                {
                    if (ScaleCalcIsNumber(Txt0[1], true))
                    {
                        if (ScaleCalcIsNumber(Txt0[3], true))
                        {
                            if (ScaleCalcIsNumber(Txt0[4], false))
                            {
                                if (ScaleCalcIsNumber(Txt0[5], false))
                                {
                                    if (ScaleCalcIsNumber(Txt0[6], false))
                                    {
                                        Txt0[1] = parseFloat(Txt0[1]);
                                        Txt0[3] = parseFloat(Txt0[3]);
                                        Txt0[4] = parseInt(Txt0[4]);
                                        Txt0[5] = parseInt(Txt0[5]);
                                        Txt0[6] = parseInt(Txt0[6]);
                                        if ((Txt0[4] >= 0) && (Txt0[4] < 255))
                                        {
                                            if ((Txt0[5] >= 0) && (Txt0[5] < 255))
                                            {
                                                if ((Txt0[6] >= 0) && (Txt0[6] < 255))
                                                {
                                                    ScaleStripConfig.push([2, Txt0[0], Txt0[1], Txt0[2], Txt0[3], Txt0[4], Txt0[5], Txt0[6]]);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function ScaleTextInit()
{
    document.getElementById("ScaleStripColors").value = DataGetDefault("SET_ScaleText_", "");
    ScaleTextApply();
}

function ScaleTextNone()
{
    document.getElementById("ScaleStripColors").value = "";
}

function ScaleTextApply()
{
    var Txt = document.getElementById("ScaleStripColors").value;
    DataSet("SET_ScaleText_", Txt);
    ScaleCalcPrepareStrip(Txt);
    ScaleCalcStripReset();
}

function ScaleTextClear()
{
    DataDelete("SET_ScaleText_");
    DataDelete("SET_ScaleText0");
    DataDelete("SET_ScaleText1");
    DataDelete("SET_ScaleText2");
    DataDelete("SET_ScaleText3");
    DataDelete("SET_ScaleText4");
    DataDelete("SET_ScaleText5");
    DataDelete("SET_ScaleText6");
    DataDelete("SET_ScaleText7");
    DataDelete("SET_ScaleText8");
    DataDelete("SET_ScaleText9");
}

function ScaleTextLoad(N)
{
    if (DataExists("SET_ScaleText" + N))
    {
        document.getElementById("ScaleStripColors").value = DataGetDefault("SET_ScaleText" + N, "");
    }
}


function ScaleTextSave(N)
{
    DataSet("SET_ScaleText" + N, document.getElementById("ScaleStripColors").value);
}




function ScaleCalcStripReset()
{
    ScaleStripLastL = 0;
    ScaleStripLastH = 0;
    ScaleStripLastO = 0;
}

function ScaleCalcStrip(L__, H__, O__)
{
    if ((ScaleStripLastL == L__) && (ScaleStripLastH == H__) && (ScaleStripLastO == O__))
    {
        return;
    }
    ScaleStripLastL = L__;
    ScaleStripLastH = H__;
    ScaleStripLastO = O__;

    // Creating frequency table
    ScaleSampleRate = (CurrentSamplerate / SET_SampleDecimation);
    ScaleDataF = [];
    if (SET_ScaleSetLog && (DISP_VU__ == 0))
    {
        var ScaleSetLogFactor_ = (SET_ScaleSetLogFactor * L__) / 1000;
        var ScaleSetLogOffset_ = (SET_ScaleSetLogOffset * L__) / 1000;
        var ScaleSetLogBase_ = SET_ScaleSetLogBase / 1000;
        
        for (var I = 0; I < L__; I++)
        {
            if ((ScaleSetLogFactor_ > 0) && (ScaleSetLogBase_ > 1))
            {
                var Val = (Math.pow(ScaleSetLogBase_, (I - ScaleSetLogOffset_) / ScaleSetLogFactor_)) * L__;
                Val = Val * (ScaleSampleRate / 2) / L__;
                ScaleDataF.push(Val);
            }
            else
            {
                ScaleDataF.push(0);
            }
        }
    }
    else
    {
        for (var I = 0; I < L__; I++)
        {
            var Val = I * (ScaleSampleRate / 2) / L__;
            ScaleDataF.push(Val);
        }
    }


    // Creating color table against settings
    ScaleStripColor = [];
    ScaleStripColor.push([0, L__, SET_DrawStripColorR, SET_DrawStripColorG, SET_DrawStripColorB]);
    if (DISP_VU__ == 0)
    {
        var BaseFreqs = [];
        for (var II = 0; II < ScaleStripConfig.length; II++)
        {
            var ScaleStripConfig_ = ScaleStripConfig[II];
            
            // Base frequency
            if (ScaleStripConfig_[0] == 1)
            {
                BaseFreqs = [];
                for (var III = ScaleStripConfig_[4]; III <= ScaleStripConfig_[5]; III++)
                {
                    if (ScaleStripConfig_[2] == "+")
                    {
                        BaseFreqs.push(ScaleStripConfig_[1] + (ScaleStripConfig_[3] * III));
                    }
                    if (ScaleStripConfig_[2] == "*")
                    {
                        BaseFreqs.push(ScaleStripConfig_[1] * Math.pow(ScaleStripConfig_[3], III));
                    }
                }
            }
            
            // One frequency band
            if (ScaleStripConfig_[0] == 2)
            {
                for (var III = 0; III < BaseFreqs.length; III++)
                {
                    var Freq1 = Number.NaN;
                    var Freq2 = Number.NaN;
                    if (ScaleStripConfig_[1] == "+") { Freq1 = BaseFreqs[III] + ScaleStripConfig_[2]; }
                    if (ScaleStripConfig_[1] == "-") { Freq1 = BaseFreqs[III] - ScaleStripConfig_[2]; }
                    if (ScaleStripConfig_[1] == "*") { Freq1 = BaseFreqs[III] * ScaleStripConfig_[2]; }
                    if (ScaleStripConfig_[1] == "/") { Freq1 = BaseFreqs[III] / ScaleStripConfig_[2]; }
                    if (ScaleStripConfig_[3] == "+") { Freq2 = BaseFreqs[III] + ScaleStripConfig_[4]; }
                    if (ScaleStripConfig_[3] == "-") { Freq2 = BaseFreqs[III] - ScaleStripConfig_[4]; }
                    if (ScaleStripConfig_[3] == "*") { Freq2 = BaseFreqs[III] * ScaleStripConfig_[4]; }
                    if (ScaleStripConfig_[3] == "/") { Freq2 = BaseFreqs[III] / ScaleStripConfig_[4]; }
                    
                    if ((!isNaN(Freq1)) && (!isNaN(Freq2)))
                    {
                        var Freq1_ = 0;
                        var Freq2_ = L__ - 1;
                        while ((Freq1 >= 0) && (ScaleDataF[Freq1_] < Freq1))
                        {
                            Freq1_++;
                            if (Freq1_ >= L__)
                            {
                                Freq1 = Number.NaN;
                            }
                        }
                        while ((Freq2 >= 0) && (ScaleDataF[Freq2_] > Freq2))
                        {
                            Freq2_--;
                            if (Freq2_ < 0)
                            {
                                Freq2 = Number.NaN;
                            }
                        }
                        if ((!isNaN(Freq1)) && (!isNaN(Freq2)))
                        {
                            var Freq_R = ScaleStripConfig_[5];
                            var Freq_G = ScaleStripConfig_[6];
                            var Freq_B = ScaleStripConfig_[7];
                            if (Freq1_ <= Freq2_)
                            {
                                if (SET_FlipBand)
                                {
                                    ScaleStripColor.push([Freq1_ - O__, Freq2_ - Freq1_ + 1, Freq_R, Freq_G, Freq_B]);
                                }
                                else
                                {
                                    ScaleStripColor.push([L__ - O__ - Freq2_ - 1, Freq2_ - Freq1_ + 1, Freq_R, Freq_G, Freq_B]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // Bounding inside visible area
    for (var I = 0; I < ScaleStripColor.length; I++)
    {
        if ((ScaleStripColor[I][0]) < 0)
        {
            ScaleStripColor[I][1] = ScaleStripColor[I][1] - (0 - ScaleStripColor[I][0]);
            ScaleStripColor[I][0] = 0;
        }
    
        if ((ScaleStripColor[I][0] + ScaleStripColor[I][1]) > H__)
        {
            ScaleStripColor[I][1] = H__ - ScaleStripColor[I][0];
        }
        
        if (ScaleStripColor[I][1] < 1)
        {
            ScaleStripColor.splice(I, 1);
            I--;
        }
    }
}


// Greatest common divisor
function GCD(Num1, Num2)
{
    while (Num2 != 0)
    {
        var Num3 = Num1 % Num2;
        Num1 = Num2;
        Num2 = Num3;
    }
    return Num1;
}

// Least common multiple
function LCM(Num1, Num2)
{
    return (Num1 * Num2) / GCD(Num1, Num2);
}



function ScaleCalcReset()
{
    ScaleLinesLast = 0;
}

// Calculate the ScaleData array of arrays
function ScaleCalc(ScaleLines)
{
    if ((ScaleLinesLast == ScaleLines) && (ScaleSampleRate == (CurrentSamplerate / SET_SampleDecimation)))
    {
        return;
    }
    if ((CurrentSamplerate == 0) || (SET_SampleDecimation == 0))
    {
        ScaleLinesLast = 0;
        return;
    }
    ScaleLinesLast = ScaleLines;
    ScaleSampleRate = (CurrentSamplerate / SET_SampleDecimation);

    ScaleData = [];
    ScaleDataL = [];
    for (var I = 0; I < ScaleLines; I++)
    {
        ScaleData[I] = [];
    }
    
    if (SET_ScaleSetLog && (DISP_VU__ == 0))
    {
        // Creating logarithmic scale
        var LogB = Math.log(SET_ScaleSetLogBase / 1000);
        var ScaleSetLogFactor_ = (SET_ScaleSetLogFactor * ScaleLines) / 1000;
        var ScaleSetLogOffset_ = (SET_ScaleSetLogOffset * ScaleLines) / 1000;
        
        if (LogB > 0)
        {
            for (var I = 1; I < ScaleLines; I++)
            {
                var Val = ((Math.log(I / ScaleLines) / LogB) * ScaleSetLogFactor_) + ScaleSetLogOffset_;
                Val = Math.round(Val);
                if (Val < 0)
                {
                    Val = 0;
                }
                if (Val >= ScaleLines)
                {
                    Val = ScaleLines - 1;
                }
                ScaleData[Val].push(I);
            }
        }

        // Eliminating unnecessary values at the ends
        if (ScaleData[0].length > 1)
        {
            var Temp = ScaleData[0][ScaleData[0].length - 1];
            ScaleData[0] = [Temp];
        }
        if (ScaleData[ScaleLines - 1].length > 1)
        {
            var Temp = ScaleData[ScaleLines - 1][0];
            ScaleData[ScaleLines - 1] = [Temp];
        }

        // Searching bounds
        var BoundMin = 0;
        while ((ScaleData[BoundMin].length == 0) && (BoundMin < (ScaleLines - 1)))
        {
            BoundMin++;
        }

        var BoundMax = ScaleLines - 1;
        while ((ScaleData[BoundMax].length == 0) && (BoundMax > 0))
        {
            BoundMax--;
        }

        // Eliminating unnecessary values for low quality 
        if (SET_ScaleSetLogQuality == 0)
        {
            for (var I = (BoundMin + 1); I < (BoundMax); I++)
            {
                if (ScaleData[I].length > 1)
                {
                    if ((ScaleData[I].length % 2) == 0)
                    {
                        var T = (ScaleData[I].length) / 2;
                        ScaleData[I].splice(T + 1, T - 1);
                        ScaleData[I].splice(0, T - 1);
                    }
                    else
                    {
                        var T = (ScaleData[I].length - 1) / 2;
                        ScaleData[I].splice(T + 1, T);
                        ScaleData[I].splice(0, T);
                    }
                }
            }
        }

        // Filling gaps
        for (var I = (BoundMin + 1); I < (BoundMax); I++)
        {
            if (ScaleData[I].length == 0)
            {
                var BoundMin_ = I - 1;
                var BoundMax_ = I + 1;
                while (ScaleData[BoundMax_].length == 0)
                {
                    BoundMax_++;
                }
                var Val1 = ScaleData[BoundMin_][ScaleData[BoundMin_].length - 1];
                var Val2 = ScaleData[BoundMax_][0];
                var ValDist = BoundMax_ - BoundMin_;
                for (var II = (BoundMin_ + 1); II < BoundMax_; II++)
                {
                    if (SET_ScaleSetLogQuality == 2)
                    {
                        var Val1_Count = BoundMax_ - II;
                        var Val2_Count = II - BoundMin_;
                        var Val__ = GCD(Val1_Count, Val2_Count);
                        Val1_Count = Val1_Count / Val__;
                        Val2_Count = Val2_Count / Val__;
                        for (var III = 0; III < Val1_Count; III++)
                        {
                            ScaleData[II].push(Val1);
                        }
                        for (var III = 0; III < Val2_Count; III++)
                        {
                            ScaleData[II].push(Val2);
                        }
                    }
                    else
                    {
                        if ((II - BoundMin_) <= (BoundMax_ - II))
                        {
                            ScaleData[II].push(Val1);
                        }
                        if ((II - BoundMin_) >= (BoundMax_ - II))
                        {
                            ScaleData[II].push(Val2);
                        }
                    }
                }
            }
        }
    }
    else
    {
        for (var I = 0; I < ScaleLines; I++)
        {
            ScaleData[I].push(I);
        }
    }

    for (var I = 0; I < ScaleLines; I++)
    {
        ScaleDataL[I] = ScaleData[I].length;
    }
    
    ScaleCalcStripReset();
}
