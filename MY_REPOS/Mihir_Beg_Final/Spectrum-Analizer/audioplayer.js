var SET_AudioPlayerBufTimeCorrectCount = DataGetIDefault("SET_AudioPlayerBufTimeCorrectCount", 128);
var SET_AudioPlayerBufTimeCorrectBound = DataGetIDefault("SET_AudioPlayerBufTimeCorrectBound", 20);

var SET_AudioPlayerTimeStartMin = DataGetIDefault("SET_AudioPlayerTimeStartMin", 50);
var SET_AudioPlayerTimeStartMax = DataGetIDefault("SET_AudioPlayerTimeStartMax", 150);
var SET_AudioPlayerEnabled = DataGetIDefault("SET_AudioPlayerEnabled", 0);
var SET_AudioPlayerDrawBuf = DataGetIDefault("SET_AudioPlayerDrawBuf", 0);
var SET_AudioPlayerMute = DataGetIDefault("SET_AudioPlayerMute", 0);

var SET_AudioPlayerDiagBack = DataGetIDefault("SET_AudioPlayerDiagBack", 128);
var SET_AudioPlayerDiagFore = DataGetIDefault("SET_AudioPlayerDiagFore", 255);


var AudioPlayerBufSize = 0;
var AudioPlayerBufSizeMax = 0;
var AudioPlayerBufSize_ = [];
var AudioPlayerContext = null;
var AudioPlayerSampleRate = 0;
var AudioPlayerBuf;
var AudioPlayerBufTime = [];
var AudioPlayerBufTime_ = 1;
var AudioPlayerBufTimeCorrectSamples = 0;
var AudioPlayerBufTimeCorrectCount = 0;
var AudioPlayerL;
var AudioPlayerR;

var AudioPlayerTimePointer = 0;

var AudioPlayerTimeStartMinHard;
var AudioPlayerTimeStartMaxHard;
var AudioPlayerTimeStartMinSoft;
var AudioPlayerTimeStartMaxSoft;
var AudioPlayerTimeStartMiddle;
var AudioPlayerTimeStartT = 0;
var AudioPlayerMute = false;

function AudioPlayerMuteSet()
{
    switch (SET_AudioPlayerMute)
    {
        case 0: AudioPlayerMute = false; break;
        case 1:
            if (PlaylistEnabled)
            {
                AudioPlayerMute = false;
            }
            else
            {
                AudioPlayerMute = true;
            }
            break;
        case 2:
            if (PlaylistEnabled)
            {
                AudioPlayerMute = true;
            }
            else
            {
                AudioPlayerMute = false;
            }
            break;
        case 3: AudioPlayerMute = true; break;
    }
}

function AudioPlayerInit()
{
    AudioPlayerMuteSet();
    if (!AudioPlayerContext)
    {
        AudioPlayerContext = new (window.AudioContext || window.webkitAudioContext)();
        AudioPlayerSampleRate = AudioPlayerContext.sampleRate;
    }
    AudioPlayerBufSize = 1 << SET_AudioBufferLength;
    //AudioPlayerBufSize = 44100;


    AudioPlayerBufTimeCorrectCount = SET_AudioPlayerBufTimeCorrectCount;


    if ((AudioPlayerBufTimeCorrectCount > 0) && (SET_AudioPlayerBufTimeCorrectBound > 0))
    {
        AudioPlayerBufTimeCorrectSamples = Math.floor(AudioPlayerBufSize / AudioPlayerBufTimeCorrectCount);
    }
    else
    {
        AudioPlayerBufTimeCorrectCount = 0;
        AudioPlayerBufTimeCorrectSamples = 0;
    }

    AudioPlayerBufSizeMax = AudioPlayerBufSize + AudioPlayerBufTimeCorrectSamples;
    AudioPlayerBufTime_ = 1;

    AudioPlayerBufSize_[0] = AudioPlayerBufSize - AudioPlayerBufTimeCorrectSamples;
    AudioPlayerBufSize_[1] = AudioPlayerBufSize;
    AudioPlayerBufSize_[2] = AudioPlayerBufSize + AudioPlayerBufTimeCorrectSamples;

    AudioPlayerBufTime[0] = AudioPlayerBufSize_[0] / AudioPlayerSampleRate;
    AudioPlayerBufTime[1] = AudioPlayerBufSize_[1] / AudioPlayerSampleRate;
    AudioPlayerBufTime[2] = AudioPlayerBufSize_[2] / AudioPlayerSampleRate;

    AudioPlayerTimeStartMinHard = Math.round(SET_AudioPlayerTimeStartMin * AudioPlayerSampleRate / 1000);
    AudioPlayerTimeStartMaxHard = Math.round(SET_AudioPlayerTimeStartMax * AudioPlayerSampleRate / 1000);
    AudioPlayerTimeStartMinSoft = AudioPlayerTimeStartMinHard + Math.round(SET_AudioPlayerBufTimeCorrectBound * AudioPlayerSampleRate / 1000);
    AudioPlayerTimeStartMaxSoft = AudioPlayerTimeStartMaxHard - Math.round(SET_AudioPlayerBufTimeCorrectBound * AudioPlayerSampleRate / 1000);
    AudioPlayerTimeStartMiddle = Math.round((AudioPlayerTimeStartMaxHard + AudioPlayerTimeStartMinHard) / 2);
    if (AudioPlayerTimeStartMinHard > AudioPlayerTimeStartMiddle)
    {
        AudioPlayerTimeStartMinHard = AudioPlayerTimeStartMiddle;
    }
    if (AudioPlayerTimeStartMaxHard < AudioPlayerTimeStartMiddle)
    {
        AudioPlayerTimeStartMaxHard = AudioPlayerTimeStartMiddle;
    }
    if (AudioPlayerTimeStartMinSoft > AudioPlayerTimeStartMiddle)
    {
        AudioPlayerTimeStartMinSoft = AudioPlayerTimeStartMiddle;
    }
    if (AudioPlayerTimeStartMaxSoft < AudioPlayerTimeStartMiddle)
    {
        AudioPlayerTimeStartMaxSoft = AudioPlayerTimeStartMiddle;
    }

    AudioPlayerTimePointer = 0;
    AudioPlayerMuteSet();
}

function AudioPlayerPlay(AudioPlayerBufLen, BufL, BufR)
{
    if ((AudioPlayerBufSize < AudioPlayerBufLen) || (AudioPlayerBufLen < 1))
    {
        return;
    }

    AudioPlayerBuf = AudioPlayerContext.createBuffer(2, AudioPlayerBufSizeMax, AudioPlayerSampleRate);
    AudioPlayerL = AudioPlayerBuf.getChannelData(0);
    AudioPlayerR = AudioPlayerBuf.getChannelData(1);

    var T = Math.round(AudioPlayerContext.currentTime * AudioPlayerSampleRate);
    if ((AudioPlayerTimePointer < (T + AudioPlayerTimeStartMinHard)) || (AudioPlayerTimePointer > (T + AudioPlayerTimeStartMaxHard)))
    {
        AudioPlayerTimePointer = T + AudioPlayerTimeStartMiddle;
        AudioPlayerBufTime_ = 1;
    }
    else
    {
        if ((AudioPlayerBufTime_ < 1) && (AudioPlayerTimePointer < (T + AudioPlayerTimeStartMiddle)))
        {
            AudioPlayerBufTime_ = 1;
        }
        if ((AudioPlayerBufTime_ > 1) && (AudioPlayerTimePointer > (T + AudioPlayerTimeStartMiddle)))
        {
            AudioPlayerBufTime_ = 1;
        }
        if (AudioPlayerTimePointer < (T + AudioPlayerTimeStartMinSoft))
        {
            AudioPlayerBufTime_ = 2;
        }
        if (AudioPlayerTimePointer > (T + AudioPlayerTimeStartMaxSoft))
        {
            AudioPlayerBufTime_ = 0;
        }
    }



    if (AudioPlayerMute)
    {
        for (var I = 0; I < AudioPlayerBufSizeMax; I++)
        {
            AudioPlayerL[I] = 0;
            AudioPlayerR[I] = 0;
        }
    }
    else
    {
        if (AudioPlayerBufTime_ == 1)
        {
            for (var I = 0; I < AudioPlayerBufLen; I++)
            {
                AudioPlayerL[I] = BufL[I];
                AudioPlayerR[I] = BufR[I];
            }
        }
        else
        {
            var I_ = 0;
            var I__ = 0;
            if (AudioPlayerBufTime_ < 1)
            {
                for (var I = 0; I < AudioPlayerBufLen; I++)
                {
                    AudioPlayerL[I_] = BufL[I];
                    AudioPlayerR[I_] = BufR[I];
                    I_++;
                    I__++;
                    if (I__ >= AudioPlayerBufTimeCorrectCount)
                    {
                        I__ = 0;
                        I_--;
                    }
                }
            }
            else
            {
                for (var I = 0; I < AudioPlayerBufLen; I++)
                {
                    AudioPlayerL[I_] = BufL[I];
                    AudioPlayerR[I_] = BufR[I];
                    I_++;
                    I__++;
                    if (I__ >= AudioPlayerBufTimeCorrectCount)
                    {
                        AudioPlayerL[I_] = BufL[I];
                        AudioPlayerR[I_] = BufR[I];
                        I__ = 0;
                        I_++;
                    }
                }
            }
        }
    }
    var AudioPlayerSource = AudioPlayerContext.createBufferSource();

    AudioPlayerSource.buffer = AudioPlayerBuf;
    AudioPlayerSource.connect(AudioPlayerContext.destination);



    AudioPlayerTimeStartT = AudioPlayerTimePointer - T;
    var Ptr = AudioPlayerTimePointer / AudioPlayerSampleRate;
    AudioPlayerSource.start(Ptr, 0, AudioPlayerBufTime[AudioPlayerBufTime_]);
    AudioPlayerTimePointer = AudioPlayerTimePointer + AudioPlayerBufSize_[AudioPlayerBufTime_];
}

function AudioPlayerDrawBuffer(X, Y1, Y2, W)
{
    if ((SET_AudioPlayerEnabled) && (AudioPlayerTimeStartMaxHard > AudioPlayerTimeStartMinHard) && (Y2 < Y1))
    {
        var Pos;
        Pos = (AudioPlayerTimeStartMinSoft - AudioPlayerTimeStartMinHard) / (AudioPlayerTimeStartMaxHard - AudioPlayerTimeStartMinHard);
        DrawRectX(WaveDisplayCanvasData, WaveDisplayCanvasW_, WaveDisplayCanvasH_, X, Math.round(Y1 + (Y2 - Y1) * Pos), W, SET_AudioPlayerDiagBack, SET_AudioPlayerDiagBack, SET_AudioPlayerDiagBack);
        Pos = (AudioPlayerTimeStartMaxSoft - AudioPlayerTimeStartMinHard) / (AudioPlayerTimeStartMaxHard - AudioPlayerTimeStartMinHard);
        DrawRectX(WaveDisplayCanvasData, WaveDisplayCanvasW_, WaveDisplayCanvasH_, X, Math.round(Y1 + (Y2 - Y1) * Pos), W, SET_AudioPlayerDiagBack, SET_AudioPlayerDiagBack, SET_AudioPlayerDiagBack);

        DrawRectX(WaveDisplayCanvasData, WaveDisplayCanvasW_, WaveDisplayCanvasH_, X, Math.round(Y1 + (Y2 - Y1) * 0), W, SET_AudioPlayerDiagFore, SET_AudioPlayerDiagFore, SET_AudioPlayerDiagFore);
        DrawRectX(WaveDisplayCanvasData, WaveDisplayCanvasW_, WaveDisplayCanvasH_, X, Math.round(Y1 + (Y2 - Y1) * 1), W, SET_AudioPlayerDiagFore, SET_AudioPlayerDiagFore, SET_AudioPlayerDiagFore);
        DrawRectX(WaveDisplayCanvasData, WaveDisplayCanvasW_, WaveDisplayCanvasH_, X, Math.round(Y1 + (Y2 - Y1) * 0.5), W, SET_AudioPlayerDiagBack, SET_AudioPlayerDiagBack, SET_AudioPlayerDiagBack);

        Pos = (AudioPlayerTimeStartT - AudioPlayerTimeStartMinHard) / (AudioPlayerTimeStartMaxHard - AudioPlayerTimeStartMinHard);
        if (Pos < 0) { Pos = 0; }
        if (Pos > 1) { Pos = 1; }
        DrawRectX(WaveDisplayCanvasData, WaveDisplayCanvasW_, WaveDisplayCanvasH_, X, Math.round(Y1 + (Y2 - Y1) * Pos), W, SET_AudioPlayerDiagFore, SET_AudioPlayerDiagFore, SET_AudioPlayerDiagFore);
    }
}
