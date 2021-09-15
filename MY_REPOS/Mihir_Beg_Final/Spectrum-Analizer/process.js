
var ProcessTable

var ProcessData = new Array();
var ProcessDataL = 0;

const ProcessLowest = -1000;
const ProcessHighest = 1000;

function ProcessDisplayStep()
{
    document.getElementById("ProcessStepInfo").innerHTML = (StepVal[SET_FilterValueStep] / 10) + " dB";
}

function ProcessInit()
{
    ProcessTable = document.getElementById("ProcessTable");
    ProcessDisplayStep();
}

function ProcessAdd1()
{
    ProcessData.unshift([0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0]);
    ProcessTable.insertRow(1);
    ProcessSetButtons(0);
    ProcessSetTable();
    ProcessListDispVals(0);
    ProcessDataL++;
}

function ProcessAdd2()
{
    ProcessData.push([0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0]);
    ProcessTable.insertRow(ProcessData.length);
    ProcessSetButtons(ProcessData.length - 1);
    ProcessSetTable();
    ProcessListDispVals(ProcessData.length - 1);
    ProcessDataL++;
}

function ProcessRem(N)
{
    ProcessDataL--;
    ProcessData.splice(N, 1);
    ProcessTable.deleteRow(N + 1);
    ProcessSetTable();
}

function ProcessMove(N1, N2)
{
    var Temp = ProcessData[N1];
    ProcessData[N1] = ProcessData[N2];
    ProcessData[N2] = Temp;
    ProcessListDispVals0(N1);
    ProcessListDispVals0(N2);
    ProcessListDispVals(N1);
    ProcessListDispVals(N2);
}

function ProcessMoveU(N)
{
    if (N > 0)
    {
        ProcessMove(N, N - 1);
    }
}

function ProcessMoveD(N)
{
    if (N < (ProcessData.length - 1))
    {
        ProcessMove(N, N + 1);
    }
}

function ProcessListUpdateFilters()
{
    for (var I = 0; I < ProcessData.length; I++)
    {
        if (ProcessData[I][0] == 1)
        {
            if (ProcessData[I][1] > 0)
            {
                ProcessData[I][5].Init(FilterSlot[ProcessData[I][1] - 1].FilterWindow, FilterSlot[ProcessData[I][1] - 1].FilterWindowSize);
            }
            if (ProcessData[I][2] > 0)
            {
                ProcessData[I][6].Init(FilterSlot[ProcessData[I][2] - 1].FilterWindow, FilterSlot[ProcessData[I][2] - 1].FilterWindowSize);
            }
            if (ProcessData[I][3] > 0)
            {
                ProcessData[I][7].Init(FilterSlot[ProcessData[I][3] - 1].FilterWindow, FilterSlot[ProcessData[I][3] - 1].FilterWindowSize);
            }
            if (ProcessData[I][4] > 0)
            {
                ProcessData[I][8].Init(FilterSlot[ProcessData[I][1] - 1].FilterWindow, FilterSlot[ProcessData[I][1] - 1].FilterWindowSize);
            }
        }
    }
}

function ProcessListSelect(N)
{
    ProcessData[N][0] = document.getElementById("ProcessList" + N).selectedIndex;
    ProcessData[N][1] = 0;
    ProcessData[N][2] = 0;
    ProcessData[N][3] = 0;
    ProcessData[N][4] = 0;
    ProcessData[N][5] = 1;
    ProcessData[N][6] = 1;
    ProcessData[N][7] = 1;
    ProcessData[N][8] = 1;


    if (ProcessData[N][0] == 1)
    {
        var XFilterObj1 = new ProcessFilterObj();
        XFilterObj1.Init(FilterSlot[0].FilterWindow, FilterSlot[0].FilterWindowSize);
        var XFilterObj2 = new ProcessFilterObj();
        XFilterObj2.Init(FilterSlot[0].FilterWindow, FilterSlot[0].FilterWindowSize);
        var XFilterObj3 = new ProcessFilterObj();
        XFilterObj3.Init(FilterSlot[0].FilterWindow, FilterSlot[0].FilterWindowSize);
        var XFilterObj4 = new ProcessFilterObj();
        XFilterObj4.Init(FilterSlot[0].FilterWindow, FilterSlot[0].FilterWindowSize);
        ProcessData[N][5] = XFilterObj1;
        ProcessData[N][6] = XFilterObj2;
        ProcessData[N][7] = XFilterObj3;
        ProcessData[N][8] = XFilterObj4;
    }
    else
    {
        ProcessData[N][5] = 1;
        ProcessData[N][6] = 1;
        ProcessData[N][7] = 1;
        ProcessData[N][8] = 1;
    }

    ProcessListDispVals(N);
}

function ProcessListVal(N, P, V)
{
    if ((ProcessData[N][0] == 1) || (ProcessData[N][0] == 2) || (ProcessData[N][0] == 3))
    {
        if (ProcessData[N][0] == 1)
        {
            if (V > 0)
            {
                ProcessData[N][P]++;
                if (ProcessData[N][P] > FilterSlotCount)
                {
                    ProcessData[N][P] = 0;
                }
            }
            if (V < 0)
            {
                ProcessData[N][P]--;
                if (ProcessData[N][P] < 0)
                {
                    ProcessData[N][P] = FilterSlotCount;
                }
            }
        }
        else
        {
            if (V > 0)
            {
                ProcessData[N][P] += StepVal[SET_FilterValueStep];
                if (ProcessData[N][P] > ProcessHighest)
                {
                    ProcessData[N][P] = ProcessHighest;
                }
            }
            if (V < 0)
            {
                ProcessData[N][P] -= StepVal[SET_FilterValueStep];
                if (ProcessData[N][P] < ProcessLowest)
                {
                    ProcessData[N][P] = ProcessLowest;
                }
            }
        }
    }
    else
    {
        ProcessData[N][P] = 0;
    }
    ProcessListDispVals(N);
}

function ProcessListDispVals(N)
{
    if (ProcessData[N][0] == 1)
    {
        if (ProcessData[N][1] > 0) { ProcessData[N][5].Init(FilterSlot[ProcessData[N][1] - 1].FilterWindow, FilterSlot[ProcessData[N][1] - 1].FilterWindowSize); }
        if (ProcessData[N][2] > 0) { ProcessData[N][6].Init(FilterSlot[ProcessData[N][2] - 1].FilterWindow, FilterSlot[ProcessData[N][2] - 1].FilterWindowSize); }
        if (ProcessData[N][3] > 0) { ProcessData[N][7].Init(FilterSlot[ProcessData[N][3] - 1].FilterWindow, FilterSlot[ProcessData[N][3] - 1].FilterWindowSize); }
        if (ProcessData[N][4] > 0) { ProcessData[N][8].Init(FilterSlot[ProcessData[N][4] - 1].FilterWindow, FilterSlot[ProcessData[N][4] - 1].FilterWindowSize); }

        if ((ProcessData[N][1] == 0) && (ProcessData[N][2] == 0)) { ProcessData[N][9] = 0; }
        if ((ProcessData[N][1]  > 0) && (ProcessData[N][2]  > 0)) { ProcessData[N][9] = (ProcessData[N][1] == ProcessData[N][2]) ? 1 : 2; }
        if ((ProcessData[N][1]  > 0) && (ProcessData[N][2] == 0)) { ProcessData[N][9] = 3; }
        if ((ProcessData[N][1] == 0) && (ProcessData[N][2]  > 0)) { ProcessData[N][9] = 4; }

        if ((ProcessData[N][3] == 0) && (ProcessData[N][4] == 0)) { ProcessData[N][10] = 0; }
        if ((ProcessData[N][3]  > 0) && (ProcessData[N][4]  > 0)) { ProcessData[N][10] = (ProcessData[N][3] == ProcessData[N][4]) ? 1 : 2; }
        if ((ProcessData[N][3]  > 0) && (ProcessData[N][4] == 0)) { ProcessData[N][10] = 3; }
        if ((ProcessData[N][3] == 0) && (ProcessData[N][4]  > 0)) { ProcessData[N][10] = 4; }
    }
    else
    {
        ProcessData[N][5] = (ProcessData[N][1] > ProcessLowest) ? Math.pow(10, ProcessData[N][1] / 100) : 0;
        ProcessData[N][6] = (ProcessData[N][2] > ProcessLowest) ? Math.pow(10, ProcessData[N][2] / 100) : 0;
        ProcessData[N][7] = (ProcessData[N][3] > ProcessLowest) ? Math.pow(10, ProcessData[N][3] / 100) : 0;
        ProcessData[N][8] = (ProcessData[N][4] > ProcessLowest) ? Math.pow(10, ProcessData[N][4] / 100) : 0;
    }

    switch (ProcessData[N][0])
    {
        case 1:
            document.getElementById("ProcessVal1" + N).innerHTML = " " + ((ProcessData[N][1] > 0) ? (ProcessData[N][1] - 1) : "~") + " ";
            document.getElementById("ProcessVal2" + N).innerHTML = " " + ((ProcessData[N][2] > 0) ? (ProcessData[N][2] - 1) : "~") + " ";
            document.getElementById("ProcessVal3" + N).innerHTML = " " + ((ProcessData[N][3] > 0) ? (ProcessData[N][3] - 1) : "~") + " ";
            document.getElementById("ProcessVal4" + N).innerHTML = " " + ((ProcessData[N][4] > 0) ? (ProcessData[N][4] - 1) : "~") + " ";
            break;
        case 2:
        case 3:
            document.getElementById("ProcessVal1" + N).innerHTML = " " + FilterValue(ProcessData[N][1] / 10, 1) + " dB ";
            document.getElementById("ProcessVal2" + N).innerHTML = " " + FilterValue(ProcessData[N][2] / 10, 1) + " dB ";
            document.getElementById("ProcessVal3" + N).innerHTML = " " + FilterValue(ProcessData[N][3] / 10, 1) + " dB ";
            document.getElementById("ProcessVal4" + N).innerHTML = " " + FilterValue(ProcessData[N][4] / 10, 1) + " dB ";
            break;
        default:
            document.getElementById("ProcessVal1" + N).innerHTML = " N/A ";
            document.getElementById("ProcessVal2" + N).innerHTML = " N/A ";
            document.getElementById("ProcessVal3" + N).innerHTML = " N/A ";
            document.getElementById("ProcessVal4" + N).innerHTML = " N/A ";
            break;
    }
}
function ProcessListDispVals0(N)
{
    document.getElementById("ProcessList" + N).selectedIndex = ProcessData[N][0];
}

function ProcessTableCellStyle(CellObj)
{
    CellObj.style["overflow"] = "hidden";
    CellObj.style["white-space"] = "nowrap";
    CellObj.style["text-overflow"] = "clip";
}

function ProcessSetTable()
{
    for (var I = 0; I < (ProcessTable.rows.length - 1); I++)
    {
        var R = ProcessTable.rows[I + 1];
        R.cells[0].children[0].setAttribute("onclick", "ProcessRem(" + I + ");");
        R.cells[0].children[1].setAttribute("onclick", "ProcessMoveU(" + I + ");");
        R.cells[0].children[2].setAttribute("onclick", "ProcessMoveD(" + I + ");");

        R.cells[1].children[0].setAttribute("onchange", "ProcessListSelect(" + I + ");");
        R.cells[1].children[0].id = "ProcessList" + I;

        R.cells[2].children[0].setAttribute("onclick", "ProcessListVal(" + I + ", 1, -1);");
        R.cells[2].children[1].setAttribute("onclick", "ProcessListVal(" + I + ", 1,  1);");
        R.cells[2].children[2].id = "ProcessVal1" + I;

        R.cells[3].children[0].setAttribute("onclick", "ProcessListVal(" + I + ", 2, -1);");
        R.cells[3].children[1].setAttribute("onclick", "ProcessListVal(" + I + ", 2,  1);");
        R.cells[3].children[2].id = "ProcessVal2" + I;

        R.cells[4].children[0].setAttribute("onclick", "ProcessListVal(" + I + ", 3, -1);");
        R.cells[4].children[1].setAttribute("onclick", "ProcessListVal(" + I + ", 3,  1);");
        R.cells[4].children[2].id = "ProcessVal3" + I;

        R.cells[5].children[0].setAttribute("onclick", "ProcessListVal(" + I + ", 4, -1);");
        R.cells[5].children[1].setAttribute("onclick", "ProcessListVal(" + I + ", 4,  1);");
        R.cells[5].children[2].id = "ProcessVal4" + I;
    }
}

function ProcessSetButtons(N)
{
    var NRow = ProcessTable.rows[N + 1];
    var C1 = NRow.insertCell(0);
    var Temp = "";
    Temp += "<input type=\"button\" value=\"-\">";
    Temp += "<input type=\"button\" value=\"" + ArrU_ + "\">";
    Temp += "<input type=\"button\" value=\"" + ArrD_ + "\">";
    C1.innerHTML = Temp;
    var C2 = NRow.insertCell(1);
    Temp = ""
    Temp += "<select>";
    Temp += "<option>Null</option>";
    Temp += "<option>Filter</option>";
    Temp += "<option>Volume</option>";
    Temp += "<option>Noise</option>";
    Temp += "<option>Invert L</option>";
    Temp += "<option>Invert R</option>";
    Temp += "<option>Swap stereo</option>";
    Temp += "<option>Stereo - MS (1)</option>";
    Temp += "<option>Stereo - MS (2)</option>";
    Temp += "</select>";
    C2.innerHTML = Temp;

    ProcessTableCellStyle(C1);
    ProcessTableCellStyle(C2);

    ProcessSetButtonsCell(NRow.insertCell(2), "L");
    ProcessSetButtonsCell(NRow.insertCell(3), "R");
    ProcessSetButtonsCell(NRow.insertCell(4), "M");
    ProcessSetButtonsCell(NRow.insertCell(5), "S");
}

function ProcessSetButtonsCell(CellObj, BtnName)
{
    var Temp = "";
    Temp += "<input type=\"button\" value=\"-\">";
    Temp += "<input type=\"button\" value=\"+\">";
    Temp += "<span></span>";
    CellObj.innerHTML = Temp;
    ProcessTableCellStyle(CellObj);
}

function ProcessStepU()
{
    if (SET_FilterValueStep < (StepVal.length - 1))
    {
        SET_FilterValueStep++;
        DataSetI("SET_FilterValueStep", SET_FilterValueStep);
    }
    FilterBtnSetLabel("SD", "Step-\n" + StepVal[SET_FilterValueStep]);
    FilterBtnSetLabel("SU", "Step+\n" + StepVal[SET_FilterValueStep]);
    ProcessDisplayStep();
}

function ProcessStepD()
{
    if (SET_FilterValueStep > 0)
    {
        SET_FilterValueStep--;
        DataSetI("SET_FilterValueStep", SET_FilterValueStep);
    }
    FilterBtnSetLabel("SD", "Step-\n" + StepVal[SET_FilterValueStep]);
    FilterBtnSetLabel("SU", "Step+\n" + StepVal[SET_FilterValueStep]);
    ProcessDisplayStep();
}

function ProcessAudio(BufLen, ChIL, ChIR, ChOL, ChOR)
{
    for (var Pointer = 0; Pointer < BufLen; Pointer++)
    {
        ChOL[Pointer] = ChIL[Pointer];
        ChOR[Pointer] = ChIR[Pointer];
    }
    for (var Idx = 0; Idx < ProcessDataL; Idx++)
    {
        var GainL = ProcessData[Idx][5];
        var GainR = ProcessData[Idx][6];
        var GainM = ProcessData[Idx][7];
        var GainS = ProcessData[Idx][8];
        switch(ProcessData[Idx][0])
        {
            case 0: // Null
                break;
            case 1: // Filter
                {
                    var Filter1_ = ProcessData[Idx][9];
                    var Filter2_ = ProcessData[Idx][10];
                    if (Filter1_ > 0)
                    {
                        var Filter1 = ProcessData[Idx][5];
                        var Filter2 = ProcessData[Idx][6];
                        switch (Filter1_)
                        {
                            case 1:
                                for (var Pointer = 0; Pointer < BufLen; Pointer++)
                                {
                                    Filter1.FilterProcessSmpL = ChOL[Pointer];
                                    Filter1.FilterProcessSmpR = ChOR[Pointer];
                                    Filter1.Process2();
                                    ChOL[Pointer] = Filter1.FilterProcessSmpL;
                                    ChOR[Pointer] = Filter1.FilterProcessSmpR;
                                }
                                break;
                            case 2:
                                for (var Pointer = 0; Pointer < BufLen; Pointer++)
                                {
                                    Filter1.FilterProcessSmp_ = ChOL[Pointer];
                                    Filter1.Process1();
                                    ChOL[Pointer] = Filter1.FilterProcessSmp_;
                                    Filter2.FilterProcessSmp_ = ChOR[Pointer];
                                    Filter2.Process1();
                                    ChOR[Pointer] = Filter2.FilterProcessSmp_;
                                }
                                break;
                            case 3:
                                for (var Pointer = 0; Pointer < BufLen; Pointer++)
                                {
                                    Filter1.FilterProcessSmp_ = ChOL[Pointer];
                                    Filter1.Process1();
                                    ChOL[Pointer] = Filter1.FilterProcessSmp_;
                                }
                                break;
                            case 4:
                                for (var Pointer = 0; Pointer < BufLen; Pointer++)
                                {
                                    Filter2.FilterProcessSmp_ = ChOR[Pointer];
                                    Filter2.Process1();
                                    ChOR[Pointer] = Filter2.FilterProcessSmp_;
                                }
                                break;
                        }
                    }
                    if (Filter2_ > 0)
                    {
                        var Filter1 = ProcessData[Idx][7];
                        var Filter2 = ProcessData[Idx][8];
                        var ValM = 0;
                        var ValS = 0;
                        switch (Filter2_)
                        {
                            case 1:
                                for (var Pointer = 0; Pointer < BufLen; Pointer++)
                                {
                                    ValM = ((ChOL[Pointer] + ChOR[Pointer]) / 2);
                                    ValS = ((ChOL[Pointer] - ChOR[Pointer]) / 2);
                                    Filter1.FilterProcessSmpL = ValM;
                                    Filter1.FilterProcessSmpR = ValS;
                                    Filter1.Process2();
                                    ValM = Filter1.FilterProcessSmpL;
                                    ValS = Filter1.FilterProcessSmpR;
                                    ChOL[Pointer] = ValM + ValS;
                                    ChOR[Pointer] = ValM - ValS;
                                }
                                break;
                            case 2:
                                for (var Pointer = 0; Pointer < BufLen; Pointer++)
                                {
                                    ValM = ((ChOL[Pointer] + ChOR[Pointer]) / 2);
                                    ValS = ((ChOL[Pointer] - ChOR[Pointer]) / 2);
                                    Filter1.FilterProcessSmp_ = ValM;
                                    Filter1.Process1();
                                    ValM = Filter1.FilterProcessSmp_;
                                    Filter2.FilterProcessSmp_ = ValS;
                                    Filter2.Process1();
                                    ValS = Filter2.FilterProcessSmp_;
                                    ChOL[Pointer] = ValM + ValS;
                                    ChOR[Pointer] = ValM - ValS;
                                }
                                break;
                            case 3:
                                for (var Pointer = 0; Pointer < BufLen; Pointer++)
                                {
                                    ValM = ((ChOL[Pointer] + ChOR[Pointer]) / 2);
                                    ValS = ((ChOL[Pointer] - ChOR[Pointer]) / 2);
                                    Filter1.FilterProcessSmp_ = ValM;
                                    Filter1.Process1();
                                    ValM = Filter1.FilterProcessSmp_;
                                    ChOL[Pointer] = ValM + ValS;
                                    ChOR[Pointer] = ValM - ValS;
                                }
                                break;
                            case 4:
                                for (var Pointer = 0; Pointer < BufLen; Pointer++)
                                {
                                    ValM = ((ChOL[Pointer] + ChOR[Pointer]) / 2);
                                    ValS = ((ChOL[Pointer] - ChOR[Pointer]) / 2);
                                    Filter2.FilterProcessSmp_ = ValS;
                                    Filter2.Process1();
                                    ValS = Filter2.FilterProcessSmp_;
                                    ChOL[Pointer] = ValM + ValS;
                                    ChOR[Pointer] = ValM - ValS;
                                }
                                break;
                        }
                    }
                }
                break;
            case 2: // Volume
                for (var Pointer = 0; Pointer < BufLen; Pointer++)
                {
                    ChOL[Pointer] = ChOL[Pointer] * GainL;
                    ChOR[Pointer] = ChOR[Pointer] * GainR;
                    var ValM = ((ChOL[Pointer] + ChOR[Pointer]) / 2) * GainM;
                    var ValS = ((ChOL[Pointer] - ChOR[Pointer]) / 2) * GainS;
                    ChOL[Pointer] = ValM + ValS;
                    ChOR[Pointer] = ValM - ValS;
                }
                break;
            case 3: // Noise
                for (var Pointer = 0; Pointer < BufLen; Pointer++)
                {
                    var ValL = ((Math.random() * (GainL + GainL)) - GainL);
                    var ValR = ((Math.random() * (GainR + GainR)) - GainR);
                    var ValM = ((ValL + ValR) / 2) * GainM;
                    var ValS = ((ValL - ValR) / 2) * GainS;
                    ChOL[Pointer] = ChOL[Pointer] + ValM + ValS;
                    ChOR[Pointer] = ChOR[Pointer] + ValM - ValS;
                }
                break;
            case 4: // Invert L
                for (var Pointer = 0; Pointer < BufLen; Pointer++)
                {
                    ChOL[Pointer] = 0 - ChOL[Pointer];
                }
                break;
            case 5: // Invert R
                for (var Pointer = 0; Pointer < BufLen; Pointer++)
                {
                    ChOR[Pointer] = 0 - ChOR[Pointer];
                }
                break;
            case 6: // Swap stereo
                for (var Pointer = 0; Pointer < BufLen; Pointer++)
                {
                    var Temp = ChOL[Pointer];
                    ChOL[Pointer] = ChOR[Pointer];
                    ChOR[Pointer] = Temp;
                }
                break;
            case 7: // Stereo - MS (2)
                for (var Pointer = 0; Pointer < BufLen; Pointer++)
                {
                    var Val1 = ((ChOL[Pointer] + ChOR[Pointer]));
                    var Val2 = ((ChOL[Pointer] - ChOR[Pointer]));
                    ChOL[Pointer] = Val1;
                    ChOR[Pointer] = Val2;
                }
                break;
            case 8: // Stereo - MS (1)
                for (var Pointer = 0; Pointer < BufLen; Pointer++)
                {
                    var Val1 = ((ChOL[Pointer] + ChOR[Pointer]) / 2);
                    var Val2 = ((ChOL[Pointer] - ChOR[Pointer]) / 2);
                    ChOL[Pointer] = Val1;
                    ChOR[Pointer] = Val2;
                }
                break;
        }
    }
    for (var Pointer = 0; Pointer < BufLen; Pointer++)
    {
        if (ChOL[Pointer] < -1) { ChOL[Pointer] = -1; }
        if (ChOR[Pointer] < -1) { ChOR[Pointer] = -1; }
        if (ChOL[Pointer] >  1) { ChOL[Pointer] =  1; }
        if (ChOR[Pointer] >  1) { ChOR[Pointer] =  1; }
    }
}

