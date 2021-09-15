var SET_MarkerVis = [];
var SET_MarkerColorR = [];
var SET_MarkerColorG = [];
var SET_MarkerColorB = [];
var SET_MarkerFreq = [];
var SET_MarkerUnit = [];

var MarkerFormEvent = false;
var MarkerChanged = false;
var MarkerCountF = 0;
var MarkerCountS = 0;


var MarkerColorRF = [];
var MarkerColorGF = [];
var MarkerColorBF = [];
var MarkerFreqF = [];

var MarkerColorRS = [];
var MarkerColorGS = [];
var MarkerColorBS = [];
var MarkerFreqS = [];

var SET_MarkerFThickness = DataGetIDefault("SET_MarkerFThickness", 1);
var SET_MarkerSThickness = DataGetIDefault("SET_MarkerSThickness", 1);

var MarkerF_1 = 0;
var MarkerF_2 = 0;
var MarkerS_1 = 0;
var MarkerS_2 = 0;


function MarkerSettingsGet()
{
    document.getElementById("xSET_MarkerFThickness").value = SET_MarkerFThickness;
    document.getElementById("xSET_MarkerSThickness").value = SET_MarkerSThickness;
}


function MarkerSettingsSet()
{
    SET_MarkerFThickness = Limit(document.getElementById("xSET_MarkerFThickness").value, 1, 1000);
    SET_MarkerSThickness = Limit(document.getElementById("xSET_MarkerSThickness").value, 1, 1000);
    DataSetI("SET_MarkerFThickness", SET_MarkerFThickness);
    DataSetI("SET_MarkerSThickness", SET_MarkerSThickness);
    MarkerChanged = true;
    MarkerCalc();
}

function MarkerForm(N)
{
    if (MarkerFormEvent)
    {
        SET_MarkerVis[N] = (document.getElementById("xSET_Marker" + N + "Vis").checked) ? 1 : 0;
        var T = ColorTextToValues(document.getElementById("xSET_Marker" + N + "Color").value, SET_MarkerColorR[N], SET_MarkerColorG[N], SET_MarkerColorB[N]);
        SET_MarkerColorR[N] = T[0];
        SET_MarkerColorG[N] = T[1];
        SET_MarkerColorB[N] = T[2];
        SET_MarkerFreq[N] = Limit(document.getElementById("xSET_Marker" + N + "Freq").value, 0, 1000000);
        SET_MarkerUnit[N] = document.getElementById("xSET_Marker" + N + "Unit").selectedIndex;
        DataSetI("SET_Marker" + N + "Vis", SET_MarkerVis[N]);
        DataSetI("SET_Marker" + N + "ColorR", SET_MarkerColorR[N]);
        DataSetI("SET_Marker" + N + "ColorG", SET_MarkerColorG[N]);
        DataSetI("SET_Marker" + N + "ColorB", SET_MarkerColorB[N]);
        DataSetI("SET_Marker" + N + "Freq", SET_MarkerFreq[N]);
        DataSetI("SET_Marker" + N + "Unit", SET_MarkerUnit[N]);


        MarkerChanged = true;
        MarkerCalc();
    }
}

function MarkerCalc()
{
    MarkerCountF = 0;
    MarkerCountS = 0;
    var Zoom_ = Math.pow(2, DISP_Zoom + 9);
    var Reso_ = Math.pow(2, DISP_Reso + 5);


    MarkerF_1 = 0;
    MarkerF_2 = 0;
    if ((SET_MarkerFThickness % 2) == 0)
    {
        MarkerF_1 = 0 - ((SET_MarkerFThickness - 2) / 2);
        MarkerF_2 = 0 - MarkerF_1 + 1;
    }
    else
    {
        MarkerF_1 = 0 - ((SET_MarkerFThickness - 1) / 2);
        MarkerF_2 = 0 - MarkerF_1;
    }


    var SET_MarkerSThickness_ = (Reso_ < Zoom_) ? Math.round(SET_MarkerSThickness * Reso_ / Zoom_) : Math.round(SET_MarkerSThickness);
    if (SET_MarkerSThickness_ < 1)
    {
        SET_MarkerSThickness_ = 1;
    }
    var MarkerSThickFactor = (Reso_ > Zoom_) ? Math.round(Reso_ / Zoom_) : 1;
    
    MarkerS_1 = 0;
    MarkerS_2 = 0;
    if ((SET_MarkerSThickness_ % 2) == 0)
    {
        MarkerS_1 = 0 - ((SET_MarkerSThickness_ - 2) / 2);
        MarkerS_2 = 0 - MarkerS_1 + 1;
    }
    else
    {
        MarkerS_1 = 0 - ((SET_MarkerSThickness_ - 1) / 2);
        MarkerS_2 = 0 - MarkerS_1;
    }
    
    for (var I = 0; I < 10; I++)
    {
        if (CurrentSamplerate > 0)
        {
            if (SET_MarkerVis[I])
            {
                var ValF = 0;
                var ValS = 0;
                if (SET_MarkerUnit[I] == 0)
                {
                    ValF = SET_MarkerFreq[I] / (CurrentSamplerate / 2);
                }
                if (SET_MarkerUnit[I] == 1)
                {
                    ValF = SET_MarkerFreq[I] / 10000;
                }
                if (SET_MarkerUnit[I] == 2)
                {
                    ValF = SET_MarkerFreq[I] / 8192;
                }
                if (SET_ScaleSetLog)
                {
                    var LogB = Math.log(SET_ScaleSetLogBase / 1000);
                    var ScaleSetLogFactor_ = (SET_ScaleSetLogFactor * Zoom_) / 1000;
                    var ScaleSetLogOffset_ = (SET_ScaleSetLogOffset * Zoom_) / 1000;
                    if ((LogB == 0) || (ValF <= 0))
                    {
                        ValF = Number.NaN;
                    }
                    else
                    {
                        var Val = ((Math.log(ValF * SET_SampleDecimation) / LogB) * ScaleSetLogFactor_) + ScaleSetLogOffset_;
                        ValF = Val / (Zoom_ * SET_SampleDecimation);
                    }
                }
                if ((ValF < 0) || (ValF > 1))
                {
                    ValF = Number.NaN;
                }
                if (!isNaN(ValF))
                {
                    ValS = ValF * (Reso_ * SET_SampleDecimation);
                
                    if (Reso_ > Zoom_)
                    {
                        ValS = Math.round(ValS / (Reso_ / Zoom_));
                        ValS = ValS * (Reso_ / Zoom_);
                    }
                    else
                    {
                        ValS = Math.round(ValS);
                    }
                    

                    MarkerFreqF[MarkerCountF] = ValF;
                    MarkerColorRF[MarkerCountF] = SET_MarkerColorR[I];
                    MarkerColorGF[MarkerCountF] = SET_MarkerColorG[I];
                    MarkerColorBF[MarkerCountF] = SET_MarkerColorB[I];
                    MarkerCountF++;
                    
                    for (var II = MarkerS_1; II <= MarkerS_2; II++)
                    {
                        var Idx = MarkerCountS;
                        var IdxMaxI = -1;
                        var IdxMaxV = -1;
                        var Freq_ = ValS + (II * MarkerSThickFactor);
                        for (var III = 0; III < MarkerCountS; III++)
                        {
                            if (MarkerFreqS[III] == Freq_)
                            {
                                Idx = III;
                                break;
                            }
                            if ((IdxMaxV < MarkerFreqS[III]) && (MarkerFreqS[III] < Freq_))
                            {
                                IdxMaxV = MarkerFreqS[III];
                                IdxMaxI = III;
                            }
                        }
                        
                        if (Idx == MarkerCountS)
                        {
                            if (IdxMaxI >= 0)
                            {
                                Idx = IdxMaxI + 1;
                            }
                            else
                            {
                                if (MarkerCountS > 0)
                                {
                                    if (MarkerFreqS[0] > Freq_)
                                    {
                                        Idx = 0;
                                    }
                                }
                            }
                            
                            for (var III = (MarkerCountS - 1); III >= Idx; III--)
                            {
                                MarkerFreqS[III + 1] = MarkerFreqS[III];
                                MarkerColorRS[III + 1] = MarkerColorRS[III];
                                MarkerColorGS[III + 1] = MarkerColorGS[III];
                                MarkerColorBS[III + 1] = MarkerColorBS[III];
                            }
                            MarkerFreqS[Idx] = Freq_;
                            MarkerColorRS[Idx] = SET_MarkerColorR[I];
                            MarkerColorGS[Idx] = SET_MarkerColorG[I];
                            MarkerColorBS[Idx] = SET_MarkerColorB[I];
                            MarkerCountS++;
                        }
                        else
                        {
                            MarkerColorRS[Idx] = SET_MarkerColorR[I];
                            MarkerColorGS[Idx] = SET_MarkerColorG[I];
                            MarkerColorBS[Idx] = SET_MarkerColorB[I];
                        }
                    }
                }
            }
        }
    }
    
    if (MarkerChanged)
    {
        if (CurrentSamplerate > 0)
        {
            FilterDraw();
            MarkerChanged = false;
        }
    }
}

function MarkerInit()
{
    for (var I = 0; I < 10; I++)
    {
        SET_MarkerVis[I] = DataGetIDefault("SET_Marker" + I + "Vis", 0);
        SET_MarkerColorR[I] = DataGetIDefault("SET_Marker" + I + "ColorR", 255);
        SET_MarkerColorG[I] = DataGetIDefault("SET_Marker" + I + "ColorG", 255);
        SET_MarkerColorB[I] = DataGetIDefault("SET_Marker" + I + "ColorB", 255);
        SET_MarkerFreq[I] = DataGetIDefault("SET_Marker" + I + "Freq", (I + 1) * 100);
        SET_MarkerUnit[I] = DataGetIDefault("SET_Marker" + I + "Unit", 0);
    
        document.getElementById("xSET_Marker" + I + "Vis").checked = SET_MarkerVis[I];
        document.getElementById("xSET_Marker" + I + "Color").value = ColorValuesToText(SET_MarkerColorR[I], SET_MarkerColorG[I], SET_MarkerColorB[I]);
        document.getElementById("xSET_Marker" + I + "Freq").value = SET_MarkerFreq[I];
        document.getElementById("xSET_Marker" + I + "Unit").selectedIndex = SET_MarkerUnit[I];
    }
    MarkerFormEvent = true;
    MarkerChanged = true;
}

