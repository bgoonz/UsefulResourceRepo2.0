function SetColorPicker(Field)
{
    var Obj = document.getElementById(Field);
    if (!SET_ColorPicker)
    {
        Obj.type = "text";
        Obj.size = "5";
    }
}
SetColorPicker("xSET_DrawStripColor");
SetColorPicker("xSET_DrawOverdriveColor");
SetColorPicker("xSET_ScopeBackColor");
SetColorPicker("xSET_FilterColorBack");
SetColorPicker("xSET_FilterColorZero");
SetColorPicker("xSET_FilterColorSpec");
SetColorPicker("xSET_FilterColorLine");
SetColorPicker("xSET_Marker0Color");
SetColorPicker("xSET_Marker1Color");
SetColorPicker("xSET_Marker2Color");
SetColorPicker("xSET_Marker3Color");
SetColorPicker("xSET_Marker4Color");
SetColorPicker("xSET_Marker5Color");
SetColorPicker("xSET_Marker6Color");
SetColorPicker("xSET_Marker7Color");
SetColorPicker("xSET_Marker8Color");
SetColorPicker("xSET_Marker9Color");

PlaylistTable = document.getElementById("Playlist");
PlaylistInfo = document.getElementById("PlaylistInfo");
MarkerInit();
ScopeInit();
FilterInit();
SetLayout();
SetLabels();
ProcessInit();

ScaleSetToolbar();

var AppStartFunc_ = true;
if ((SET_AutoStart == 2) || (SET_AutoFullscreen == 2))
{
    document.getElementById("AppBlock").style.display = "block";
}
else
{
    document.getElementById("AppBlock").style.display = "none";
}
function AppStartFunc()
{
    if (AppStartFunc_)
    {
        AppStartFunc_ = false;
        document.getElementById("AppBlock").style.display = "none";
        if (SET_AutoStart == 2)
        {
            ToggleRecording();
        }
        if (SET_AutoFullscreen == 2)
        {
            ToggleFullScreen();
        }
    }
}

if (SET_AutoStart == 1)
{
    ToggleRecording();
}
if (SET_AutoFullscreen == 1)
{
    ToggleFullScreen();
}

ScaleTextInit();

function KeyPress(e)
{
    //console.log("KeyPress: " + e.keyCode);
}

document.addEventListener("keydown", KeyPress, false);
window.addEventListener("resize", SetLayout, false);
