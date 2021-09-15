function ProcessSave(N)
{
    var ProcessDef = ProcessData.length;
    for (var I = 0; I < ProcessData.length; I++)
    {
        ProcessDef += "|" + ProcessData[I][0];
        ProcessDef += "|" + ProcessData[I][1];
        ProcessDef += "|" + ProcessData[I][2];
        ProcessDef += "|" + ProcessData[I][3];
        ProcessDef += "|" + ProcessData[I][4];
    }
    DataSet("OBJ_Process_Slot" + N, ProcessDef);
    for (var I = 0; I < FilterSlotCount; I++)
    {
        FilterSlot[I].FilterSave();
        ProcessDef = DataGet("OBJ_Filter_Slot" + I);
        DataSet("OBJ_Process_Slot" + N + "_Filter" + I, ProcessDef);
    }
}

function ProcessLoad(N)
{
    if (!DataExists("OBJ_Process_Slot" + N))
    {
        return;
    }

    for (var I = 0; I < FilterSlotCount; I++)
    {
        var FilterId = "OBJ_Process_Slot" + N + "_Filter" + I;
        if (DataExists(FilterId))
        {
            ProcessDef = DataGet(FilterId);
            DataSet("OBJ_Filter_Slot" + I, ProcessDef);

            FilterSlot[I] = new FilterSlotObj(I);
            FilterSlot[I].FilterLoad();
            FilterSlot[I].FilterNormalize(SET_Filter_Canvas, SET_Filter_FilterLevMin, SET_Filter_FilterLevMax);
            FilterSlot[I].FilterCalcWindow(SET_Filter_FilterFFT, SET_Filter_FilterLevMin);
        }
    }

    while (ProcessDataL > 0)
    {
        ProcessRem(0);
    }

    var ProcessDef = DataGet("OBJ_Process_Slot" + N).split('|');

    var ProcessDefL = parseInt(ProcessDef[0]);
    for (var I = 0; I < ProcessDefL; I++)
    {
        ProcessAdd2();
        ProcessData[I][0] = parseInt(ProcessDef[I * 5 + 1]);
        ProcessListDispVals0(I);
        ProcessListSelect(I);
        ProcessData[I][1] = parseInt(ProcessDef[I * 5 + 2]);
        ProcessData[I][2] = parseInt(ProcessDef[I * 5 + 3]);
        ProcessData[I][3] = parseInt(ProcessDef[I * 5 + 4]);
        ProcessData[I][4] = parseInt(ProcessDef[I * 5 + 5]);
        ProcessListDispVals(I);
    }

    ProcessListUpdateFilters();

    FilterSetLayout();
}

function ProcessClear(N)
{
    DataDelete("OBJ_Process_Slot" + N);
    for (var I = 0; I < FilterSlotCount; I++)
    {
        var FilterId = "OBJ_Process_Slot" + N + "_Filter" + I;
        DataDelete(FilterId);
    }
}
