var PlaylistEnabled = false;

var PlaylistSampleCount = 1;
var PlaylistSampleI = 1;
var PlaylistIndex = -1;
var PlaylistCount = 0;

var PlaylistAudioL = [];
var PlaylistAudioR = [];

var PlaylistLength = [];
var PlaylistPointer = 0;
var PlaylistName = [];
var PlaylistChannels = [];
var PlaylistSamplerate = [];

var PlaylistTable = null;
var PlaylistInfo = null;
var PlaylistTempo = 0;
var PlaylistDecimateC = 1;
var PlaylistDecimateI = 0;

function PlaylistGetSamples(Len, ChL, ChR)
{
    if (PlaylistIndex >= 0)
    {
        if (PlaylistSampleI >= PlaylistSampleCount)
        {
            var PlaylistLength_ = PlaylistLength[PlaylistIndex];
            if (PlaylistLength_ > 0)
            {
                PlaylistInfo.innerHTML = (PlaylistIndex + 1) + "/" + PlaylistCount + ": " + PlaylistPointer + "/" + PlaylistLength_ + " (" + Math.round(PlaylistPointer * 100 / PlaylistLength_) + "%)";
            }
            else
            {
                PlaylistInfo.innerHTML = (PlaylistIndex + 1) + "/" + PlaylistCount + ": " + PlaylistPointer + "/" + PlaylistLength_;
            }
            PlaylistSampleI = 0;
        }
        PlaylistSampleI += Len;
        for (var I = 0; I < Len; I++)
        {
            ChL[I] = PlaylistAudioL[PlaylistIndex][PlaylistPointer];
            ChR[I] = PlaylistAudioR[PlaylistIndex][PlaylistPointer];
            PlaylistDecimateI++;
            if (PlaylistDecimateI >= PlaylistDecimateC)
            {
                PlaylistDecimateI = 0;
                PlaylistPointer += PlaylistTempo;
            }
            if (PlaylistTempo > 0)
            {
                if (PlaylistPointer >= PlaylistLength[PlaylistIndex])
                {
                    PlaylistIndex++;
                    if (PlaylistIndex > (PlaylistCount - 1))
                    {
                        PlaylistIndex = 0;
                    }
                    PlaylistPointer = 0;
                }
            }
            if (PlaylistTempo < 0)
            {
                if (PlaylistPointer < 0)
                {
                    PlaylistIndex--;
                    if (PlaylistIndex <= 0)
                    {
                        PlaylistIndex = (PlaylistCount - 1);
                    }
                    PlaylistPointer = PlaylistLength[PlaylistIndex] - 1;
                }
            }
        }
    }
    else
    {
        PlaylistInfo.innerHTML = "";
        for (var I = 0; I < Len; I++)
        {
            ChL[I] = 0;
            ChR[I] = 0;
        }
    }
}

function PlaylistRefreshTable()
{
    while (PlaylistTable.rows.length > 1)
    {
        PlaylistTable.deleteRow(1);
    }
    for (var N = 0; N < PlaylistCount; N++)
    {
        var PlaylistTableRow = PlaylistTable.insertRow(N + 1);

        var PlaylistTableRowC = PlaylistTableRow.insertCell(0);
        ProcessTableCellStyle(PlaylistTableRowC);
        var Temp = "";
        Temp += "<input type=\"button\" value=\"-\" onclick=\"PlaylistRemove(" + N + ")\">";
        Temp += "<input type=\"button\" value=\"" + ArrU_ + "\" onclick=\"PlaylistMoveU(" + N + ")\">";
        Temp += "<input type=\"button\" value=\"" + ArrD_ + "\" onclick=\"PlaylistMoveD(" + N + ")\">";
        PlaylistTableRowC.innerHTML = Temp;

        PlaylistTableRowC = PlaylistTableRow.insertCell(1);
        ProcessTableCellStyle(PlaylistTableRowC);
        PlaylistTableRowC.innerHTML = N + 1;

        var PlaylistTableRowC = PlaylistTableRow.insertCell(2);
        ProcessTableCellStyle(PlaylistTableRowC);
        PlaylistTableRowC.innerHTML = PlaylistName[N];

        var PlaylistTableRowC = PlaylistTableRow.insertCell(3);
        ProcessTableCellStyle(PlaylistTableRowC);
        PlaylistTableRowC.innerHTML = PlaylistSamplerate[N];

        var PlaylistTableRowC = PlaylistTableRow.insertCell(4);
        ProcessTableCellStyle(PlaylistTableRowC);
        PlaylistTableRowC.innerHTML = ""
        if (PlaylistChannels[N] == 1) { PlaylistTableRowC.innerHTML = "mono"; }
        if (PlaylistChannels[N] == 2) { PlaylistTableRowC.innerHTML = "stereo"; }

        var PlaylistTableRowC = PlaylistTableRow.insertCell(5);
        ProcessTableCellStyle(PlaylistTableRowC);
        PlaylistTableRowC.innerHTML = PlaylistLength[N];
    }
}

function PlaylistRemove(N)
{
    var IndexChange = false;
    if (PlaylistCount > 1)
    {
        if ((PlaylistIndex + 1) == PlaylistCount)
        {
            PlaylistIndex--;
        }
        else
        {
            if ((PlaylistIndex) >= N)
            {
                if (PlaylistIndex > 0)
                {
                    PlaylistIndex--;
                }
                else
                {
                    if (PlaylistTempo < 0)
                    {
                        PlaylistIndex = PlaylistCount - 2;
                    }
                    IndexChange = true;
                }
            }
        }
    }
    else
    {
        PlaylistIndex = -1;
        PlaylistPointer = 0;
    }


    PlaylistCount--;
    PlaylistAudioL.splice(N, 1);
    PlaylistAudioR.splice(N, 1);
    PlaylistLength.splice(N, 1);
    PlaylistName.splice(N, 1);
    PlaylistChannels.splice(N, 1);
    PlaylistSamplerate.splice(N, 1);
    PlaylistRefreshTable();

    if (IndexChange)
    {
        if (PlaylistTempo < 0)
        {
            PlaylistPointer = PlaylistLength[PlaylistIndex];
        }
        else
        {
            PlaylistPointer = 0;
        }
    }
}

function PlaylistMove(N1, N2)
{
    var Temp1 = PlaylistAudioL[N1];
    var Temp2 = PlaylistAudioL[N2];
    PlaylistAudioL[N1] = Temp2;
    PlaylistAudioL[N2] = Temp1;

    Temp1 = PlaylistAudioR[N1];
    Temp2 = PlaylistAudioR[N2];
    PlaylistAudioR[N1] = Temp2;
    PlaylistAudioR[N2] = Temp1;

    Temp1 = PlaylistLength[N1];
    Temp2 = PlaylistLength[N2];
    PlaylistLength[N1] = Temp2;
    PlaylistLength[N2] = Temp1;

    Temp1 = PlaylistName[N1];
    Temp2 = PlaylistName[N2];
    PlaylistName[N1] = Temp2;
    PlaylistName[N2] = Temp1;

    Temp1 = PlaylistChannels[N1];
    Temp2 = PlaylistChannels[N2];
    PlaylistChannels[N1] = Temp2;
    PlaylistChannels[N2] = Temp1;

    Temp1 = PlaylistSamplerate[N1];
    Temp2 = PlaylistSamplerate[N2];
    PlaylistSamplerate[N1] = Temp2;
    PlaylistSamplerate[N2] = Temp1;

    PlaylistRefreshTable();
}

function PlaylistMoveU(N)
{
    if (N > 0)
    {
        if (PlaylistIndex == N)
        {
            PlaylistIndex--;
        }
        else
        {
            if (PlaylistIndex == (N - 1))
            {
                PlaylistIndex++;
            }
        }
        PlaylistMove(N, N - 1);
    }
}

function PlaylistMoveD(N)
{
    if (N < (PlaylistCount - 1))
    {
        if (PlaylistIndex == N)
        {
            PlaylistIndex++;
        }
        else
        {
            if (PlaylistIndex == (N + 1))
            {
                PlaylistIndex--;
            }
        }
        PlaylistMove(N, N + 1);
    }
}

function PlaylistLoadFileReset()
{
    var F = document.getElementById("AudioRecordFile");
    F.value = "";
    F.type = "text";
    F.value = "";
    F.type = "file";
}

function PlaylistLoadFile_(B, N)
{
    var AudioFileContext = new AudioContext();
    PlaylistSampleCount = Math.round(AudioFileContext.sampleRate / 4);
    AudioFileContext.decodeAudioData(B, function(buffer)
    {
        if (buffer.numberOfChannels == 1)
        {
            PlaylistAudioL.push(buffer.getChannelData(0));
            PlaylistAudioR.push(buffer.getChannelData(0));
            PlaylistLength.push(buffer.length);
            PlaylistName.push(N);
            PlaylistChannels.push(1);
            PlaylistSamplerate.push(buffer.sampleRate);
            PlaylistCount++;
            if (PlaylistIndex < 0)
            {
                PlaylistIndex = 0;
            }
            PlaylistRefreshTable();
            PlaylistLoadFileReset();
        }
        if (buffer.numberOfChannels == 2)
        {
            PlaylistAudioL.push(buffer.getChannelData(0));
            PlaylistAudioR.push(buffer.getChannelData(1));
            PlaylistLength.push(buffer.length);
            PlaylistName.push(N);
            PlaylistChannels.push(2);
            PlaylistSamplerate.push(buffer.sampleRate);
            PlaylistCount++;
            if (PlaylistIndex < 0)
            {
                PlaylistIndex = 0;
            }
            PlaylistRefreshTable();
            PlaylistLoadFileReset();
        }
    },
    function(e){ console.log("Error with decoding audio data"); PlaylistLoadFileReset(); });
}

function PlaylistLoadFile()
{
    var F = document.getElementById("AudioRecordFile");
    for (var FileI = 0; FileI < F.files.length; FileI++)
    {
        var reader = new FileReader();
        reader.X = F.files[FileI].name;
        reader.onload = function(e)
        {
            PlaylistLoadFile_(e.target.result, e.target.X);
        };
        reader.readAsArrayBuffer(F.files[FileI]);
    }
}


function PlaylistSpeedU()
{
    if (PlaylistDecimateC > 1)
    {
        PlaylistDecimateC = Math.round(PlaylistDecimateC / 2);
    }
    else
    {
        PlaylistTempo = Math.round(PlaylistTempo * 2);
    }
}

function PlaylistSpeedD()
{
    if ((PlaylistTempo > 1) || (PlaylistTempo < -1))
    {
        PlaylistTempo = Math.round(PlaylistTempo / 2);
    }
    else
    {
        PlaylistDecimateC = Math.round(PlaylistDecimateC * 2);
    }
}

function PlaylistFunc(F)
{
    switch (F)
    {
        case -3:
            PlaylistIndex--;
            if (PlaylistIndex < 0)
            {
                PlaylistIndex = (PlaylistCount - 1);
            }
            if (PlaylistTempo < 0)
            {
                PlaylistPointer = PlaylistLength[PlaylistIndex];
            }
            else
            {
                PlaylistPointer = 0;
            }
            break;
        case -2:
            if (PlaylistTempo < 0)
            {
                PlaylistSpeedU();
            }
            else
            {
                PlaylistSpeedD();
            }
            break;
        case -1:
            if (PlaylistTempo > 0)
            {
                PlaylistTempo = 0 - PlaylistTempo;
            }
            else
            {
                PlaylistTempo = -1;
                PlaylistDecimateC = 1;
            }
            break;
        case 0:
            PlaylistTempo = 0;
            break;
        case 1:
            if (PlaylistTempo < 0)
            {
                PlaylistTempo = 0 - PlaylistTempo;
            }
            else
            {
                PlaylistTempo = 1;
                PlaylistDecimateC = 1;
            }
            break;
        case 2:
            if (PlaylistTempo > 0)
            {
                PlaylistSpeedU();
            }
            else
            {
                PlaylistSpeedD();
            }
            break;
        case 3:
            PlaylistIndex++;
            if (PlaylistIndex > (PlaylistCount - 1))
            {
                PlaylistIndex = 0;
            }
            if (PlaylistTempo < 0)
            {
                PlaylistPointer = PlaylistLength[PlaylistIndex];
            }
            else
            {
                PlaylistPointer = 0;
            }
            break;
    }
}

function PlaylistSetMode()
{
    if (document.getElementById("PlaylistMode").selectedIndex == 1)
    {
        PlaylistEnabled = true;
    }
    else
    {
        PlaylistEnabled = false;
    }
    AudioPlayerMuteSet();
}
