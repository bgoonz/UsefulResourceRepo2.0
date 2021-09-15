var SET_Layout_Order = DataGetDefault("SET_Layout_Order", "01234");

var SET_Layout_SpectrogramSizeV = DataGetIDefault("SET_Layout_SpectrogramSizeV", 50);
var SET_Layout_SpectrogramSizeU = DataGetIDefault("SET_Layout_SpectrogramSizeU", 1);

var SET_Layout_OscilloscopeSizeV = DataGetIDefault("SET_Layout_OscilloscopeSizeV", 50);
var SET_Layout_OscilloscopeSizeU = DataGetIDefault("SET_Layout_OscilloscopeSizeU", 1);

var SET_Layout_FilterSizeV = DataGetIDefault("SET_Layout_FilterSizeV", 50);
var SET_Layout_FilterSizeU = DataGetIDefault("SET_Layout_FilterSizeU", 1);

var SET_Layout_ProcessSizeV = DataGetIDefault("SET_Layout_ProcessSizeV", 50);
var SET_Layout_ProcessSizeU = DataGetIDefault("SET_Layout_ProcessSizeU", 1);

var SET_Layout_PlaylistSizeV = DataGetIDefault("SET_Layout_PlaylistSizeV", 50);
var SET_Layout_PlaylistSizeU = DataGetIDefault("SET_Layout_PlaylistSizeU", 1);

function SetLayoutSize(O, V, U)
{
    if (V > 0)
    {
        document.getElementById(O).style["display"] = "block";
    }
    else
    {
        document.getElementById(O).style["display"] = "none";
    }
    if (U == 0)
    {
        document.getElementById(O).style["height"] = V + "px";
    }
    if (U == 1)
    {
        document.getElementById(O).style["height"] = V + "vh";
    }
}

function LayoutSwap(node1_, node2_)
{
    var node1 = document.getElementById(node1_);
    var node2 = document.getElementById(node2_);
    const afterNode2 = node2.nextElementSibling;
    const parent = node2.parentNode;
    node1.replaceWith(node2);
    parent.insertBefore(node1, afterNode2);
}

function LayoutOrder(node1_, node2_)
{
    var node1 = document.getElementById(node1_);
    var node2 = document.getElementById(node2_);
//    node2.before(node1);
    node1.after(node2);
}

function SetLayout()
{
    var LayoutNum = 5;
    LayoutOrder_ = "";
    for (var I = 0; I < SET_Layout_Order.length; I++)
    {
        if (parseInt(SET_Layout_Order[I]) < LayoutNum)
        {
            if (LayoutOrder_.indexOf(SET_Layout_Order[I]) < 0)
            {
                LayoutOrder_ = LayoutOrder_ + SET_Layout_Order[I];
            }
        }
    }

    var LayoutOrder__ = LayoutOrder_;

    for (var I = 0; I < LayoutNum; I++)
    {
        if (LayoutOrder_.indexOf(I.toString()[0]) < 0)
        {
            LayoutOrder_ = LayoutOrder_ + I.toString()[0];
        }
    }

    LayoutName = ["AppSpectrogram", "AppOscilloscope", "AppFilter", "AppProcess", "AppPlaylist"];

    for (var I = 0; I < (LayoutOrder_.length - 1); I++)
    {
        var N1 = LayoutName[parseInt(LayoutOrder_[I])];
        var N2 = LayoutName[parseInt(LayoutOrder_[I + 1])];
        LayoutOrder(N1, N2);
    }

    WORK_Spectrum = ((SET_Layout_SpectrogramSizeV > 0) ? true : false);
    WORK_Scope = ((SET_Layout_OscilloscopeSizeV > 0) ? true : false);

    if (LayoutOrder__.indexOf("0") >= 0)
    {
        SetLayoutSize("AppSpectrogram", SET_Layout_SpectrogramSizeV, SET_Layout_SpectrogramSizeU);
    }
    else
    {
        SetLayoutSize("AppSpectrogram", 0, 0);
    }
    if (LayoutOrder__.indexOf("1") >= 0)
    {
        SetLayoutSize("AppOscilloscope", SET_Layout_OscilloscopeSizeV, SET_Layout_OscilloscopeSizeU);
    }
    else
    {
        SetLayoutSize("AppOscilloscope", 0, 0);
    }
    if (LayoutOrder__.indexOf("2") >= 0)
    {
        SetLayoutSize("AppFilter", SET_Layout_FilterSizeV, SET_Layout_FilterSizeU);
    }
    else
    {
        SetLayoutSize("AppFilter", 0, 0);
    }
    if (LayoutOrder__.indexOf("3") >= 0)
    {
        SetLayoutSize("AppProcess", SET_Layout_ProcessSizeV, SET_Layout_ProcessSizeU);
    }
    else
    {
        SetLayoutSize("AppProcess", 0, 0);
    }
    if (LayoutOrder__.indexOf("4") >= 0)
    {
        SetLayoutSize("AppPlaylist", SET_Layout_PlaylistSizeV, SET_Layout_PlaylistSizeU);
    }
    else
    {
        SetLayoutSize("AppPlaylist", 0, 0);
    }

    SpectrogramSetLayout();
    ScopeSetLayout();
    FilterSetLayout();
}

function LayoutSettingsGet()
{
    document.getElementById("xSET_Layout_Order").value = SET_Layout_Order;
    document.getElementById("xSET_Layout_SpectrogramSizeV").value = SET_Layout_SpectrogramSizeV;
    document.getElementById("xSET_Layout_SpectrogramSizeU").selectedIndex = SET_Layout_SpectrogramSizeU;
    document.getElementById("xSET_Layout_OscilloscopeSizeV").value = SET_Layout_OscilloscopeSizeV;
    document.getElementById("xSET_Layout_OscilloscopeSizeU").selectedIndex = SET_Layout_OscilloscopeSizeU;
    document.getElementById("xSET_Layout_FilterSizeV").value = SET_Layout_FilterSizeV;
    document.getElementById("xSET_Layout_FilterSizeU").selectedIndex = SET_Layout_FilterSizeU;
    document.getElementById("xSET_Layout_ProcessSizeV").value = SET_Layout_ProcessSizeV;
    document.getElementById("xSET_Layout_ProcessSizeU").selectedIndex = SET_Layout_ProcessSizeU;
    document.getElementById("xSET_Layout_PlaylistSizeV").value = SET_Layout_PlaylistSizeV;
    document.getElementById("xSET_Layout_PlaylistSizeU").selectedIndex = SET_Layout_PlaylistSizeU;
}

function LayoutSettingsSet()
{
    SET_Layout_Order = document.getElementById("xSET_Layout_Order").value;
    SET_Layout_SpectrogramSizeV = Limit(document.getElementById("xSET_Layout_SpectrogramSizeV").value, 0, 1000000);
    SET_Layout_SpectrogramSizeU = document.getElementById("xSET_Layout_SpectrogramSizeU").selectedIndex;
    SET_Layout_OscilloscopeSizeV = Limit(document.getElementById("xSET_Layout_OscilloscopeSizeV").value, 0, 1000000);
    SET_Layout_OscilloscopeSizeU = document.getElementById("xSET_Layout_OscilloscopeSizeU").selectedIndex;
    SET_Layout_FilterSizeV = Limit(document.getElementById("xSET_Layout_FilterSizeV").value, 0, 1000000);
    SET_Layout_FilterSizeU = document.getElementById("xSET_Layout_FilterSizeU").selectedIndex;
    SET_Layout_ProcessSizeV = Limit(document.getElementById("xSET_Layout_ProcessSizeV").value, 0, 1000000);
    SET_Layout_ProcessSizeU = document.getElementById("xSET_Layout_ProcessSizeU").selectedIndex;
    SET_Layout_PlaylistSizeV = Limit(document.getElementById("xSET_Layout_PlaylistSizeV").value, 0, 1000000);
    SET_Layout_PlaylistSizeU = document.getElementById("xSET_Layout_PlaylistSizeU").selectedIndex;

    DataSetI("SET_Layout_Order", SET_Layout_Order);
    DataSetI("SET_Layout_SpectrogramSizeV", SET_Layout_SpectrogramSizeV);
    DataSetI("SET_Layout_SpectrogramSizeU", SET_Layout_SpectrogramSizeU);
    DataSetI("SET_Layout_OscilloscopeSizeV", SET_Layout_OscilloscopeSizeV);
    DataSetI("SET_Layout_OscilloscopeSizeU", SET_Layout_OscilloscopeSizeU);
    DataSetI("SET_Layout_FilterSizeV", SET_Layout_FilterSizeV);
    DataSetI("SET_Layout_FilterSizeU", SET_Layout_FilterSizeU);
    DataSetI("SET_Layout_ProcessSizeV", SET_Layout_ProcessSizeV);
    DataSetI("SET_Layout_ProcessSizeU", SET_Layout_ProcessSizeU);
    DataSetI("SET_Layout_PlaylistSizeV", SET_Layout_PlaylistSizeV);
    DataSetI("SET_Layout_PlaylistSizeU", SET_Layout_PlaylistSizeU);

    SetLayout();
}
