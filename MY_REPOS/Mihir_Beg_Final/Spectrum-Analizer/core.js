var WORK_Spectrum = true;
var WORK_Scope = true;


const StepVal = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000];


var SET_CanvasScaleH = DataGetIDefault("SET_CanvasScaleH", 1);
var SET_CanvasScaleV = DataGetIDefault("SET_CanvasScaleV", 1);
var SET_MinimumStep = DataGetIDefault("SET_MinimumStep", 6);
var SET_MaximumResolution = DataGetIDefault("SET_MaximumResolution", 9);
var SET_MinimumStepScroll = DataGetIDefault("SET_MinimumStepScroll", 8);
var SET_FFTWindow = DataGetIDefault("SET_FFTWindow", 3);
var SET_DrawGamma = DataGetIDefault("SET_DrawGamma", 2200);
var SET_ToolbarSize = DataGetIDefault("SET_ToolbarSize", 20);
var SET_ToolbarPosition = DataGetIDefault("SET_ToolbarPosition", 3);
var SET_DrawStripSize = DataGetIDefault("SET_DrawStripSize", 8);

var SET_DrawStripColorR = DataGetIDefault("SET_DrawStripColorR", 255);
var SET_DrawStripColorG = DataGetIDefault("SET_DrawStripColorG", 255);
var SET_DrawStripColorB = DataGetIDefault("SET_DrawStripColorB", 255);

var SET_DrawOverdriveThresholdI = DataGetIDefault("SET_DrawOverdriveThresholdI", 950);
var SET_DrawOverdriveThresholdO = DataGetIDefault("SET_DrawOverdriveThresholdO", 950);
var SET_DrawOverdriveColorA = DataGetIDefault("SET_DrawOverdriveColorA", 128);
var SET_DrawOverdriveColorR = DataGetIDefault("SET_DrawOverdriveColorR", 255);
var SET_DrawOverdriveColorG = DataGetIDefault("SET_DrawOverdriveColorG", 255);
var SET_DrawOverdriveColorB = DataGetIDefault("SET_DrawOverdriveColorB", 255);

var SET_SampleDecimation = DataGetIDefault("SET_SampleDecimation", 4);
var SET_ButtonFontSize = DataGetIDefault("SET_ButtonFontSize", 8);
var SET_DrawOrientation = DataGetIDefault("SET_DrawOrientation", 0);
var SET_FlipBand = DataGetBDefault("SET_FlipBand", false);

var SET_AudioModeR = DataGetIDefault("SET_AudioModeR", 0);
var SET_AudioGainR = DataGetIDefault("SET_AudioGainR", 1000);
var SET_AudioModeG = DataGetIDefault("SET_AudioModeG", 0);
var SET_AudioGainG = DataGetIDefault("SET_AudioGainG", 1000);
var SET_AudioModeB = DataGetIDefault("SET_AudioModeB", 0);
var SET_AudioGainB = DataGetIDefault("SET_AudioGainB", 1000);

var SET_AudioBufferLength = DataGetIDefault("SET_AudioBufferLength", 12);
var SET_BufLength = DataGetIDefault("SET_BufLength", 10000000);
var SET_BufTick = DataGetIDefault("SET_BufTick", 50);

var SET_WaveformBack = DataGetIDefault("SET_WaveformBack", 32);
var SET_WaveformFore = DataGetIDefault("SET_WaveformFore", 256);

var SET_AudioEchoCancellation = DataGetBDefault("SET_AudioEchoCancellation", false);
var SET_AudioNoiseSuppression = DataGetBDefault("SET_AudioNoiseSuppression", false);
var SET_AudioAutoGainControl_ = DataGetBDefault("SET_AudioAutoGainControl_", false);

var SET_AutoStart = DataGetIDefault("SET_AutoStart", 0);
var SET_AutoFullscreen = DataGetIDefault("SET_AutoFullscreen", 0);
var SET_ColorPicker = DataGetIDefault("SET_ColorPicker", 1);


var AudioGainR;
var AudioGainG;
var AudioGainB;


var SET_DrawOverdriveColorX = 255 - SET_DrawOverdriveColorA;


var WaveDisplayCanvasObject;
var WaveDisplayCanvasContext;
var WaveDisplayCanvasData;
var WaveDisplayCanvasDataR;
var WaveDisplayCanvasDataG;
var WaveDisplayCanvasDataB;
var WaveDisplayCanvasW = 1;
var WaveDisplayCanvasH = 1;
var WaveDisplayCanvasW_ = 1;
var WaveDisplayCanvasH_ = 1;
var WaveDisplayCanvasWX = 1;
var CanvasLine = 1;
var CanvasLineNum = 0;
var CurrentSamplerate = 0;
var CallbackLag = 0;

var Working = true;

var MemFreeIndex = new Array();



var MonoAudio = false;

var ThrAudioWork = false;


(function(window)
{
    var Recorder = function(source, cfg)
    {
        var bufferLen = 1 << SET_AudioBufferLength;
        this.context = source.context;
        var AudioCh = MonoAudio ? 1 : 2;
        if(!this.context.createScriptProcessor)
        {
            this.node = this.context.createJavaScriptNode(bufferLen, AudioCh, AudioCh);
        }
        else
        {
            this.node = this.context.createScriptProcessor(bufferLen, AudioCh, AudioCh);
        }

        var worker = new Worker(URL.createObjectURL(new Blob(["("+AudioWorker.toString()+")()"], {type: 'text/javascript'})));
        // var worker = new Worker("worker.js");

        worker.postMessage({
            command: 'init',
            config: {
                sampleRate: this.context.sampleRate,
                bufLen: SET_BufLength
            }
        });
        var recording = false;
        var currCallback;

        this.node.onaudioprocess = function(e)
        {
            if (!recording) return;
            while (ThrAudioWork)
            {
            }
            ThrAudioWork = true;
            var BufLen = e.inputBuffer.getChannelData(0).length;
            var BufIChL = null;
            var BufIChR = null;
            if (PlaylistEnabled)
            {
                BufIChL = new Array(BufLen);
                BufIChR = new Array(BufLen);
                PlaylistGetSamples(BufLen, BufIChL, BufIChR);
            }
            else
            {
                BufIChL = e.inputBuffer.getChannelData(0);
                BufIChR = e.inputBuffer.getChannelData(MonoAudio ? 0 : 1);
            }
            var BufOChL;
            var BufOChR;
            if (SET_FilterEnabled)
            {
                BufOChL = new Array(BufLen);
                BufOChR = new Array(BufLen);
                ProcessAudio(BufLen, BufIChL, BufIChR, BufOChL, BufOChR);
            }
            else
            {
                BufOChL = BufIChL;
                BufOChR = BufIChR;
            }
            if (SET_AudioPlayerEnabled)
            {
                AudioPlayerPlay(BufLen, BufOChL, BufOChR);
            }
            worker.postMessage({
                command: 'record',
                buffer: [
                    BufIChL,
                    BufIChR,
                    BufOChL,
                    BufOChR
                ]
            });
            ThrAudioWork = false;
        }

        this.configure = function(cfg)
        {
            for (var prop in cfg)
            {
                if (cfg.hasOwnProperty(prop))
                {
                    config[prop] = cfg[prop];
                }
            }
        }

        this.record = function()
        {
            recording = true;
        }

        this.stop = function()
        {
            recording = false;
        }

        this.pause = function(Pause_)
        {
            worker.postMessage({ command: 'pause', Pause: Pause_ });
        }

        this.datafree = function()
        {
            worker.postMessage({ command: 'free', N: MemFreeIndex });
        }

        this.clear = function()
        {
            worker.postMessage({ command: 'clear' });
        }

        this.SetCallback = function(cb)
        {
            currCallback = cb;
        }

        this.Msg = function(X)
        {
            worker.postMessage(X);
        }

        this.setstep = function(Step_)
        {
            worker.postMessage({ command: 'step', Step: Step_ });
        }

        worker.onmessage = function(e)
        {
            var blob = e.data;
            try
            {
                currCallback(blob);
            }
            catch (err)
            {
            }
        }

        source.connect(this.node);
        this.node.connect(this.context.destination);   // if the script node is not connected to an output the "onaudioprocess" event is not triggered in chrome.
    };

    Recorder.setupDownload = function(blob, filename)
    {
        var url = (window.URL || window.webkitURL).createObjectURL(blob);
        var link = document.getElementById("save");
        link.href = url;
        link.download = filename || 'output.wav';
    }

    window.Recorder = Recorder;

})(window);



window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = null;
var audioInput = null;
var inputPoint = null;
var audioRecorder = null;
var rafID = null;
var canvasWidth, canvasHeight;
var recIndex = 0;


var DrawPointer = 0;

var DrawPaletteR = [];
var DrawPaletteG = [];
var DrawPaletteB = [];



var CanvasDrawStep = 1;
var CanvasDrawStepX = 0;




function InitPalette()
{
    DrawPaletteR = [];
    DrawPaletteG = [];
    DrawPaletteB = [];
    var I;
    var Gamma = SET_DrawGamma / 1000.0;
    Gamma = 1.0 / Gamma;
    for (I = 0; I <= 70000; I++)
    {
        var R = I / 65536.0;
        var G = I / 65536.0;
        var B = I / 65536.0;
        R = Math.pow(R, Gamma);
        G = Math.pow(G, Gamma);
        B = Math.pow(B, Gamma);
        R = R * 255.0;
        G = G * 255.0;
        B = B * 255.0;
        if (R < 0) { R = 0; }
        if (G < 0) { G = 0; }
        if (B < 0) { B = 0; }
        if (R > 255) { R = 255; }
        if (G > 255) { G = 255; }
        if (B > 255) { B = 255; }
        DrawPaletteR.push(Math.round(R));
        DrawPaletteG.push(Math.round(G));
        DrawPaletteB.push(Math.round(B));
    }
}






function AudioCallbackDummy()
{
    var buffers = [];
    buffers.push(0);
    buffers.push(0);
    buffers.push(0);
    buffers.push([0, 0]);
    buffers.push([]);
    buffers.push([]);
    buffers.push(0);
    buffers.push([]);
    buffers.push([]);
    AudioCallback(buffers);
}

function AudioCallback(raw)
{
    /*if (performance.now() - raw[2] > SET_MaxCallbackLag)
    {
        return;
    }*/

    const OneIndex = 11;

    if (WORK_Spectrum && (WaveDisplayCanvasWX > 0) && (WaveDisplayCanvasH > 0))
    {
        var DISP_Mode_ = (DISP_Mode < 2) ? DISP_Mode : 0;
    
        var datacount = raw[1];
        var CanvasLineY = CanvasLine * CanvasLineNum * (DISP_Mode_ + 1);
        var DrawPointerX = 0;

        var CanvasHalf = Math.floor(WaveDisplayCanvasWX / 2);
        var CanvasHalfY = 0;

        var Zoom_ = Math.pow(2, DISP_Zoom + 9)
        var OverdriveI;
        var OverdriveO;
        var Position = 0;
        var DrawPointer0;
        var CanvasLineY0;
        var DISP_ModeX = DISP_Mode_ + 1;

        var DataR;
        var DataG;
        var DataB;
        var Len;
        var Len_;
        var LenO;
        var Zoom1;
        var Zoom2;
        var I_;
        var I_M;
        var I_M_Start;
        var IsOverdrive_;
        var IsOverdrive;
        var DatumR;
        var DatumG;
        var DatumB;

        var MemFreeIdx = 1;
        var ScaleDataI;
        var ScaleDataT;
        var ScaleDataL_;

        for (var ii = 0; ii < datacount; ii++)
        {
            OverdriveI = raw[ii * OneIndex + 12][0] * 1000;
            OverdriveO = raw[ii * OneIndex + 12][1] * 1000;

            Position = raw[ii * OneIndex + 13];
            DrawPointer0 = DrawPointer - Position;

            CanvasLineY0 = CanvasLineY;
            if (Position > 0)
            {
                if (DISP_Mode < 2)
                {
                    while (DrawPointer0 < 0)
                    {
                        DrawPointer0 += WaveDisplayCanvasWX + 1;
                        CanvasLineY0 -= CanvasLine * DISP_ModeX;
                        if (CanvasLineY0 < 0)
                        {
                            CanvasLineY0 += CanvasLine * DISP_Line * DISP_ModeX;
                        }
                    }
                }
                else
                {
                    while (DrawPointer0 < 0)
                    {
                        DrawPointer0 += WaveDisplayCanvasWX - 1;
                        CanvasLineY0 -= CanvasLine * DISP_ModeX;
                    }
                }
            }

            if (DISP_Mode == 1)
            {
                DrawPointerX = DrawPointer0 - CanvasHalf;
                CanvasHalfY = CanvasLine;
                if (DrawPointerX < 0)
                {
                    DrawPointerX = DrawPointerX + WaveDisplayCanvasWX + 1;
                    if (((CanvasLineY0 + CanvasHalfY) >= 0) && (CanvasLineY0 > 0))
                    {
                        CanvasHalfY = 0 - CanvasLine;
                    }
                    else
                    {
                        CanvasHalfY = ((DISP_Line * 2) - 1) * CanvasLine;
                    }
                }
            }

            DataR = raw[ii * OneIndex + 3 + SET_AudioModeR];
            DataG = raw[ii * OneIndex + 3 + SET_AudioModeG];
            DataB = raw[ii * OneIndex + 3 + SET_AudioModeB];
            Len_ = DataR.length - 1;
            Len = Math.floor(Len_ / 2);
            ScaleCalc(Len);

            Zoom1 = Math.floor(Zoom_ / Len);
            Zoom2 = Math.floor(Len / Zoom_);
            IsOverdrive_ = ((OverdriveI > SET_DrawOverdriveThresholdI) || (OverdriveO > SET_DrawOverdriveThresholdO));
            if (Zoom1 < 1)
            {
                Zoom1 = 1;
            }
            if (Zoom2 < 1)
            {
                Zoom2 = 1;
            }

            LenO = DISP_Offs * Len / 64;
            if (SET_FlipBand)
            {
                I_M_Start = MarkerCountS - 1;
            }
            else
            {
                I_M_Start = 0;
            }

            if (CanvasLineY0 >= 0)
            {
                for (var i = 0; i < CanvasLine; i++)
                {
                    if (SET_FlipBand)
                    {
                        I_ = Math.floor((((CanvasLine - i - 1) * Zoom2) / Zoom1) + LenO);
                    }
                    else
                    {
                        I_ = Math.floor(((i * Zoom2) / Zoom1) + LenO);
                    }
                    DatumR = 0;
                    DatumG = 0;
                    DatumB = 0;
                    if ((I_ >= 0) && (I_ < Len))
                    {
                        if (ScaleDataL[I_] > 0)
                        {
                            ScaleDataL_ = ScaleDataL[I_];
                            ScaleDataT = ScaleData[I_];
                            for (ScaleDataI = ScaleDataL_ - 1; ScaleDataI >= 0; ScaleDataI--)
                            {
                                DatumR += (DataR[ScaleDataT[ScaleDataI]] * AudioGainR);
                                DatumG += (DataG[ScaleDataT[ScaleDataI]] * AudioGainG);
                                DatumB += (DataB[ScaleDataT[ScaleDataI]] * AudioGainB);
                            }
                            DatumR = Math.round(DatumR / ScaleDataL_);
                            DatumG = Math.round(DatumG / ScaleDataL_);
                            DatumB = Math.round(DatumB / ScaleDataL_);
                        }
                        IsOverdrive = IsOverdrive_;
                    }
                    else
                    {
                        IsOverdrive = false;
                    }

                    if (IsOverdrive)
                    {
                        WaveDisplayCanvasDataR = ((SET_DrawOverdriveColorR * SET_DrawOverdriveColorA) + (DrawPaletteR[DatumR] * SET_DrawOverdriveColorX)) / 255;
                        WaveDisplayCanvasDataG = ((SET_DrawOverdriveColorG * SET_DrawOverdriveColorA) + (DrawPaletteG[DatumG] * SET_DrawOverdriveColorX)) / 255;
                        WaveDisplayCanvasDataB = ((SET_DrawOverdriveColorB * SET_DrawOverdriveColorA) + (DrawPaletteB[DatumB] * SET_DrawOverdriveColorX)) / 255;
                    }
                    else
                    {
                        WaveDisplayCanvasDataR = DrawPaletteR[DatumR];
                        WaveDisplayCanvasDataG = DrawPaletteG[DatumG];
                        WaveDisplayCanvasDataB = DrawPaletteB[DatumB];
                    }
                    if (DISP_VU__ == 0)
                    {
                        if (SET_FlipBand)
                        {
                            for (I_M = I_M_Start; I_M >= 0; I_M--)
                            {
                                if (I_ == MarkerFreqS[I_M])
                                {
                                    WaveDisplayCanvasDataR = MarkerColorRS[I_M];
                                    WaveDisplayCanvasDataG = MarkerColorGS[I_M];
                                    WaveDisplayCanvasDataB = MarkerColorBS[I_M];
                                    I_M_Start = I_M;
                                    break;
                                }
                            }
                        }
                        else
                        {
                            for (I_M = I_M_Start; I_M < MarkerCountS; I_M++)
                            {
                                if (I_ == MarkerFreqS[I_M])
                                {
                                    WaveDisplayCanvasDataR = MarkerColorRS[I_M];
                                    WaveDisplayCanvasDataG = MarkerColorGS[I_M];
                                    WaveDisplayCanvasDataB = MarkerColorBS[I_M];
                                    I_M_Start = I_M;
                                    break;
                                }
                            }
                        }
                    }

                    DrawRectX(WaveDisplayCanvasData, WaveDisplayCanvasW_, WaveDisplayCanvasH_, DrawPointer0 << CanvasDrawStepX, CanvasLineY0 + CanvasLine - i - 1, CanvasDrawStep, WaveDisplayCanvasDataR, WaveDisplayCanvasDataG, WaveDisplayCanvasDataB);
                    if (DISP_Mode == 1)
                    {
                        DrawRectX(WaveDisplayCanvasData, WaveDisplayCanvasW_, WaveDisplayCanvasH_, DrawPointerX << CanvasDrawStepX, CanvasLineY0 + CanvasLine + CanvasHalfY - i - 1, CanvasDrawStep, WaveDisplayCanvasDataR, WaveDisplayCanvasDataG, WaveDisplayCanvasDataB);
                    }
                }
            }
            if (SET_AudioPlayerDrawBuf)
            {
                if (Position == 0)
                {
                    AudioPlayerDrawBuffer(DrawPointer0 << CanvasDrawStepX, CanvasLineY0 + CanvasLine - 1, CanvasLineY0, CanvasDrawStep);
                    if (DISP_Mode == 1)
                    {
                        AudioPlayerDrawBuffer(DrawPointerX << CanvasDrawStepX, CanvasLineY0 + CanvasHalfY + CanvasLine - 1, CanvasLineY0 + CanvasHalfY, CanvasDrawStep);
                    }
                }
            }


            DatumR = DataR[Len_];
            DatumG = DataG[Len_];
            DatumB = DataB[Len_];
            if (DatumR >= 0)
            {
                MemFreeIndex[MemFreeIdx] = DatumR;
                MemFreeIdx++
            }
            if ((DatumG >= 0) && (DatumR != DatumG))
            {
                MemFreeIndex[MemFreeIdx] = DatumG;
                MemFreeIdx++
            }
            if ((DatumB >= 0) && ((DatumR != DatumB) || (DatumG != DatumB)))
            {
                MemFreeIndex[MemFreeIdx] = DatumB;
                MemFreeIdx++
            }


            if (DISP_Mode == 2)
            {
                CanvasLineNum = DISP_Line - 1;
                var CanW = (WaveDisplayCanvasW >> CanvasDrawStepX);
                
                if (Position == 0)
                {
                    DrawPointer = (WaveDisplayCanvasW - SET_DrawStripSize);
                    DrawPointer = (DrawPointer >> CanvasDrawStepX) - 1;

                    
                    DrawCopy(WaveDisplayCanvasData, WaveDisplayCanvasW_, WaveDisplayCanvasH_, CanvasDrawStep, 0, 0, 0, WaveDisplayCanvasW - CanvasDrawStep, WaveDisplayCanvasH);
                    if (CanvasDrawStep > 1)
                    {
                        DrawRect(WaveDisplayCanvasData, WaveDisplayCanvasW_, WaveDisplayCanvasH_, CanW << CanvasDrawStepX, 0, CanvasDrawStep, WaveDisplayCanvasH, 0, 0, 0);
                    }

                }

                if ((Position == 0) || (DrawPointer0 < DISP_Line))
                {
                    if (CanvasLineNum > 0)
                    {
                        var DrawPos = (WaveDisplayCanvasW >> CanvasDrawStepX) - 1;
                        DrawCopy(WaveDisplayCanvasData, WaveDisplayCanvasW_, WaveDisplayCanvasH_, 0, CanvasLine, DrawPos << CanvasDrawStepX, 0, CanvasDrawStep, CanvasLine * CanvasLineNum);
                    }
                }
                


                CanvasLineY = CanvasLine * CanvasLineNum;
            }

            if (Position == 0)
            {
                if (DISP_Mode < 2)
                {
                    DrawPointer++;
                    if (DrawPointer > (WaveDisplayCanvasWX))
                    {
                        DrawPointer = 0;
                        CanvasLineNum++;
                        if (CanvasLineNum >= DISP_Line)
                        {
                            CanvasLineNum = 0;
                        }
                        CanvasLineY = CanvasLine * CanvasLineNum * (DISP_Mode_ + 1);
                    }
                }

                if (DISP_Mode == 1)
                {
                    DrawPointerX = DrawPointer - CanvasHalf;
                    CanvasHalfY = CanvasLine;
                    if (DrawPointerX < 0)
                    {
                        DrawPointerX = DrawPointerX + WaveDisplayCanvasWX + 1;
                        if (CanvasLineNum > 0)
                        {
                            CanvasHalfY = 0 - CanvasLine;
                        }
                        else
                        {
                            CanvasHalfY = ((DISP_Line * 2) - 1) * CanvasLine;
                        }
                    }
                }
            }
        }

        if (datacount > 0)
        {
            MemFreeIndex[0] = MemFreeIdx;
            audioRecorder.datafree();
        }
        else
        {
            if (DISP_Mode == 1)
            {
                DrawPointerX = DrawPointer - CanvasHalf;
                CanvasHalfY = CanvasLine;
                if (DrawPointerX < 0)
                {
                    DrawPointerX = DrawPointerX + WaveDisplayCanvasWX + 1;
                    if (CanvasLineNum > 0)
                    {
                        CanvasHalfY = 0 - CanvasLine;
                    }
                    else
                    {
                        CanvasHalfY = ((DISP_Line * 2) - 1) * CanvasLine;
                    }
                }
            }
        }

        if ((Position == 0) && (SET_DrawStripSize > 0))
        {
            var CanvasLineY0 = CanvasLineY;
            var CanvasLineH0 = CanvasLine;
            var CanvasLineOffset = 0;
            WaveDisplayCanvasDataR = DrawPaletteR[0];
            WaveDisplayCanvasDataG = DrawPaletteG[0];
            WaveDisplayCanvasDataB = DrawPaletteB[0];
            
            var DrawPointerOffset = 0;
            
            if (DISP_Mode == 2)
            {
                DrawPointerOffset = 1;
            }
            DrawPointer += DrawPointerOffset;
            
            DrawRect(WaveDisplayCanvasData, WaveDisplayCanvasW_, WaveDisplayCanvasH_, DrawPointer << CanvasDrawStepX, CanvasLineY0, SET_DrawStripSize, CanvasLineH0, WaveDisplayCanvasDataR, WaveDisplayCanvasDataG, WaveDisplayCanvasDataB);
            if (DISP_Mode == 1)
            {
                DrawRect(WaveDisplayCanvasData, WaveDisplayCanvasW_, WaveDisplayCanvasH_, DrawPointerX << CanvasDrawStepX, CanvasLineY0 + CanvasHalfY, SET_DrawStripSize, CanvasLineH0, WaveDisplayCanvasDataR, WaveDisplayCanvasDataG, WaveDisplayCanvasDataB);
            }
            var OffsetX;

            if (SET_FlipBand)
            {
                OffsetX = CanvasLine + (Zoom_ * DISP_Offs / 64);
            }
            else
            {
                OffsetX = Zoom_ - (Zoom_ * DISP_Offs / 64);
            }


            if (CanvasLine > OffsetX)
            {
                if (Zoom_ > OffsetX)
                {
                    CanvasLineH0 = OffsetX;
                }
                else
                {
                    CanvasLineH0 = Zoom_;
                }
                CanvasLineY0 = CanvasLineY + CanvasLine - OffsetX;
            }
            else
            {
                CanvasLineOffset = OffsetX - CanvasLine;
                if (SET_FlipBand)
                {
                    if (OffsetX > Zoom_)
                    {
                        CanvasLineH0 = CanvasLine - (OffsetX - Zoom_);
                    }
                }
                else
                {
                    if (DISP_Offs < 0)
                    {
                        CanvasLineH0 = CanvasLine - (OffsetX - Zoom_);
                    }
                }
            }
            
            ScaleCalcStrip(Zoom_, CanvasLineH0, CanvasLineOffset);
            for (var i = 0; i < ScaleStripColor.length; i++)
            {
                var Y__ = CanvasLineY0 + ScaleStripColor[i][0];
                var H__ = ScaleStripColor[i][1];

                DrawRect(WaveDisplayCanvasData, WaveDisplayCanvasW_, WaveDisplayCanvasH_, DrawPointer << CanvasDrawStepX, Y__, SET_DrawStripSize, H__, ScaleStripColor[i][2], ScaleStripColor[i][3], ScaleStripColor[i][4]);
                if (DISP_Mode == 1)
                {
                    DrawRect(WaveDisplayCanvasData, WaveDisplayCanvasW_, WaveDisplayCanvasH_, DrawPointerX << CanvasDrawStepX, Y__ + CanvasHalfY, SET_DrawStripSize, H__, ScaleStripColor[i][2], ScaleStripColor[i][3], ScaleStripColor[i][4]);
                }

            }
            
            DrawPointer -= DrawPointerOffset;
        }

        DrawRefresh(WaveDisplayCanvasContext, WaveDisplayCanvasData);
    }

    if (WORK_Scope)
    {
        var ScopeArrayWH = raw[raw[1] * OneIndex + 3];
        if ((ScopeArrayWH[0] == SET_ScopeW_) && (ScopeArrayWH[1] == SET_ScopeH_))
        {
            var ScopeArrayI = raw[raw[1] * OneIndex + 4];
            var ScopeArrayO = raw[raw[1] * OneIndex + 5];
            for (var X = 0; X < SET_ScopeW_; X++)
            {
                for (var Y = 0; Y < SET_ScopeH_; Y++)
                {
                    var V = [0, ScopeArrayI[X][Y], ScopeArrayO[X][Y]];
                    ScopeDrawPxl(X, Y, DrawPaletteR[V[SET_ScopeAudioR]], DrawPaletteG[V[SET_ScopeAudioG]], DrawPaletteB[V[SET_ScopeAudioB]]);
                }
            }
            ScopeDrawRefresh();
        }
    }
}

var IsRecording = false;
var IsPaused = false;

function Pause()
{
    if (IsRecording)
    {
        if (IsPaused)
        {
            IsPaused = false;
        }
        else
        {
            IsPaused = true;
        }
        audioRecorder.pause(IsPaused);
    }
    else
    {
        ToggleRecording();
    }
}

function ToggleRecording()
{
    if (IsRecording)
    {
        IsRecording = false;
        audioRecorder.stop();
        audioInput.disconnect(inputPoint);
        Stream_.getTracks().forEach(track => track.stop());
    }
    else
    {
        if (!audioContext)
        {
            audioContext = new AudioContext();
        }
        IsPaused = false;
        AudioStarted = false;
        //if (!navigator.getUserMedia)
        //{
        //    navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        //}
        //if (!navigator.cancelAnimationFrame)
        //{
        //    navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        //}
        //if (!navigator.requestAnimationFrame)
        //{
        //    navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;
        //}

        document.getElementById("AppBlock").style.display = "block";
        navigator.mediaDevices.getUserMedia(
        {
            "audio": {
                "echoCancellation": SET_AudioEchoCancellation,
                "noiseSuppression": SET_AudioNoiseSuppression,
                "autoGainControl": SET_AudioAutoGainControl_,
                "channelCount": 2
            },
            "video": false
        }).then(gotStream).catch(function(e) {
            alert("Error getting audio");
            document.getElementById("AppBlock").style.display = "none";
            console.log(e);
        });
    }
}

var Stream_;

function gotStream(stream)
{
    Stream_ = stream;

    inputPoint = audioContext.createGain();
    // Create an AudioNode from the stream.
    audioInput = audioContext.createMediaStreamSource(stream);
    audioInput.connect(inputPoint);

    audioRecorder = new Recorder(inputPoint);
    audioRecorder.SetCallback(AudioCallback);
    CurrentSamplerate = audioContext.sampleRate;
    MarkerCalc();
    InitPalette();
    SetFFT();
    SetScope();

    IsRecording = true;
    Working = true;
    audioRecorder.clear();
    audioRecorder.record();

    AudioPlayerInit();
    document.getElementById("AppBlock").style.display = "none";
}



function ToggleFullScreen()
{
    var VideoElement = document.getElementById("app");
    if (!document.mozFullScreen && !document.webkitIsFullScreen && !document.fullscreen)
    {
        if (VideoElement.mozRequestFullScreen)
        {
            VideoElement.mozRequestFullScreen();
        }
        else
        {
            if (VideoElement.webkitRequestFullScreen)
            {
                VideoElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
            else
            {
                if (VideoElement.requestFullscreen)
                {
                    VideoElement.requestFullscreen();
                }
            }
        }
    }
    else
    {
        if (document.mozCancelFullScreen)
        {
            document.mozCancelFullScreen();
        }
        else
        {
            if (document.webkitCancelFullScreen)
            {
                document.webkitCancelFullScreen();
            }
            else
            {
                if (document.exitFullscreen)
                {
                    document.exitFullscreen();
                }
            }
        }
    }
}

function SpectrogramSetLayout()
{
    var Tools = document.getElementsByClassName('tool');
    for(var i=0; i<Tools.length; i++)
    {
        Tools[i].style["font-size"] = SET_ButtonFontSize + "pt";
    }

    ScaleSetToolbar();

    var ToolbarH1 = document.getElementById("AppSpectrogramToolbarH1");
    var ToolbarV1 = document.getElementById("AppSpectrogramToolbarV1");
    var ToolbarH2 = document.getElementById("AppSpectrogramToolbarH2");
    var ToolbarV2 = document.getElementById("AppSpectrogramToolbarV2");
    ToolbarH1.style["display"] = "none";
    ToolbarV1.style["display"] = "none";
    ToolbarH2.style["display"] = "none";
    ToolbarV2.style["display"] = "none";

    var ToolbarH;
    var ToolbarV;
    var SET_ToolbarPositionX = 0;
    if ((SET_ToolbarPosition >= 1) && (SET_ToolbarPosition <= 4))
    {
        SET_ToolbarPositionX = SET_ToolbarPosition;
        ToolbarH = ToolbarH1;
        ToolbarV = ToolbarV1;
    }
    if ((SET_ToolbarPosition >= 5) && (SET_ToolbarPosition <= 8))
    {
        SET_ToolbarPositionX = SET_ToolbarPosition - 4;
        ToolbarH = ToolbarH2;
        ToolbarV = ToolbarV2;
    }

    switch (SET_ToolbarPositionX)
    {
        case 1: // Top
            AppSpectrogramM.style["width"] = 100 + "%";
            AppSpectrogramM.style["height"] = (100 - SET_ToolbarSize) + "%";
            AppSpectrogramT1.style["height"] = SET_ToolbarSize + "%";
            AppSpectrogramT1.style["display"] = "block";
            AppSpectrogramT2.style["display"] = "none";
            AppSpectrogramT3.style["display"] = "none";
            AppSpectrogramT4.style["display"] = "none";
            AppSpectrogramT1.appendChild(ToolbarH);
            ToolbarH.style["display"] = "block";
            break;
        case 2: // Bottom
            AppSpectrogramM.style["width"] = 100 + "%";
            AppSpectrogramM.style["height"] = (100 - SET_ToolbarSize) + "%";
            AppSpectrogramT4.style["height"] = SET_ToolbarSize + "%";
            AppSpectrogramT1.style["display"] = "none";
            AppSpectrogramT2.style["display"] = "none";
            AppSpectrogramT3.style["display"] = "none";
            AppSpectrogramT4.style["display"] = "block";
            AppSpectrogramT4.appendChild(ToolbarH);
            ToolbarH.style["display"] = "block";
            break;
        case 3: // Right
            AppSpectrogramM.style["width"] = (100 - SET_ToolbarSize) + "%";
            AppSpectrogramM.style["height"] = 100 + "%";
            AppSpectrogramT3.style["width"] = SET_ToolbarSize + "%";
            AppSpectrogramT1.style["display"] = "none";
            AppSpectrogramT2.style["display"] = "none";
            AppSpectrogramT3.style["display"] = "block";
            AppSpectrogramT4.style["display"] = "none";
            AppSpectrogramT3.appendChild(ToolbarV);
            ToolbarV.style["display"] = "block";
            break;
        case 4: // Left
            AppSpectrogramM.style["width"] = (100 - SET_ToolbarSize) + "%";
            AppSpectrogramM.style["height"] = 100 + "%";
            AppSpectrogramT2.style["width"] = SET_ToolbarSize + "%";
            AppSpectrogramT1.style["display"] = "none";
            AppSpectrogramT2.style["display"] = "block";
            AppSpectrogramT3.style["display"] = "none";
            AppSpectrogramT4.style["display"] = "none";
            AppSpectrogramT2.appendChild(ToolbarV);
            ToolbarV.style["display"] = "block";
            break;
        default:
            AppSpectrogramM.style["width"] = 100 + "%";
            AppSpectrogramM.style["height"] = 100 + "%";
            AppSpectrogramT1.style["display"] = "none";
            AppSpectrogramT2.style["display"] = "none";
            AppSpectrogramT3.style["display"] = "none";
            AppSpectrogramT4.style["display"] = "none";
            break;
    }




    WaveDisplayCanvasObject = document.getElementById("wavedisplay");
    WaveDisplayCanvasContext = WaveDisplayCanvasObject.getContext('2d');

    WaveDisplayCanvasW = Math.floor(document.getElementById("AppSpectrogramM").clientWidth / SET_CanvasScaleH);
    WaveDisplayCanvasH = Math.floor(document.getElementById("AppSpectrogramM").clientHeight / SET_CanvasScaleV);

    //if ((WaveDisplayCanvasW % 2) != 0) { WaveDisplayCanvasW--; }
    //if ((WaveDisplayCanvasH % 2) != 0) { WaveDisplayCanvasH--; }

    if (WaveDisplayCanvasW < 1) { WaveDisplayCanvasW = 1; }
    if (WaveDisplayCanvasH < 1) { WaveDisplayCanvasH = 1; }
    WaveDisplayCanvasObject.width = WaveDisplayCanvasW;
    WaveDisplayCanvasObject.height = WaveDisplayCanvasH;

    WaveDisplayCanvasObject.style["width"] = Math.floor(WaveDisplayCanvasW * SET_CanvasScaleH) + "px";
    WaveDisplayCanvasObject.style["height"] = Math.floor(WaveDisplayCanvasH * SET_CanvasScaleV) + "px";
    WaveDisplayCanvasData = WaveDisplayCanvasContext.createImageData(WaveDisplayCanvasW, WaveDisplayCanvasH);
    DrawClear(WaveDisplayCanvasData, WaveDisplayCanvasW, WaveDisplayCanvasH);

    WaveDisplayCanvasW_ = WaveDisplayCanvasW;
    WaveDisplayCanvasH_ = WaveDisplayCanvasH;

    if (DrawSet(SET_DrawOrientation))
    {
        CanvasLine = WaveDisplayCanvasW;
        WaveDisplayCanvasW = WaveDisplayCanvasH;
        WaveDisplayCanvasH = CanvasLine;
    }

    if ((DISP_Mode == 0) || (DISP_Mode == 2))
    {
        CanvasLine = Math.floor(WaveDisplayCanvasH / DISP_Line);
    }
    if (DISP_Mode == 1)
    {
        CanvasLine = Math.floor(WaveDisplayCanvasH / (DISP_Line * 2));
    }

    if (audioRecorder)
    {
        SetFFT();
        SetScope();
    }

    DispLayout();
    SetLabels();

    if ((WaveDisplayCanvasW <= 0) || (WaveDisplayCanvasH <= 0))
    {
        SettingsShow();
    }
}


function Limit(Val, ValMin, ValMax)
{
    if (isNaN(Val))
    {
        Val = 0;
    }
    if (Val < ValMin) { return ValMin; }
    if (Val > ValMax) { return ValMax; }
    return Math.floor(Val);
}

var DISP_Gain = 7;
var DISP_Reso = 4;
var DISP_Wind = 40;
var DISP_Zoom = 0;
var DISP_Offs = 0;
var DISP_Step = 6;
var DISP_Base = 0;
var DISP_MiMa = 0;
var DISP_Line = 1;
var DISP_Mode = 0;
var DISP_VU__ = 0;

if (DataExists("DISP_Gain")) { DISP_Gain = parseInt(DataGet("DISP_Gain")); }
if (DataExists("DISP_Reso")) { DISP_Reso = parseInt(DataGet("DISP_Reso")); }
if (DataExists("DISP_Wind")) { DISP_Wind = parseInt(DataGet("DISP_Wind")); }
if (DataExists("DISP_Zoom")) { DISP_Zoom = parseInt(DataGet("DISP_Zoom")); }
if (DataExists("DISP_Offs")) { DISP_Offs = parseInt(DataGet("DISP_Offs")); }
if (DataExists("DISP_Step")) { DISP_Step = parseInt(DataGet("DISP_Step")); }
if (DataExists("DISP_Base")) { DISP_Base = parseInt(DataGet("DISP_Base")); }
if (DataExists("DISP_MiMa")) { DISP_MiMa = parseInt(DataGet("DISP_MiMa")); }
if (DataExists("DISP_Line")) { DISP_Line = parseInt(DataGet("DISP_Line")); }
if (DataExists("DISP_Mode")) { DISP_Mode = parseInt(DataGet("DISP_Mode")); }
if (DataExists("DISP_VU__")) { DISP_VU__ = parseInt(DataGet("DISP_VU__")); }

function SetLabels()
{
    var DISP_Gain_ = Math.pow(2, DISP_Gain);
    var DISP_Reso_ = Math.pow(2, DISP_Reso + 5);
    var DISP_Wind_ = "";
    switch (DISP_Wind)
    {
        case 16: DISP_Wind_ = "1/64.00"; break;
        case 17: DISP_Wind_ = "1/53.82"; break;
        case 18: DISP_Wind_ = "1/45.25"; break;
        case 19: DISP_Wind_ = "1/38.05"; break;
        case 20: DISP_Wind_ = "1/32.00"; break;
        case 21: DISP_Wind_ = "1/26.91"; break;
        case 22: DISP_Wind_ = "1/22.63"; break;
        case 23: DISP_Wind_ = "1/19.03"; break;
        case 24: DISP_Wind_ = "1/16.00"; break;
        case 25: DISP_Wind_ = "1/13.45"; break;
        case 26: DISP_Wind_ = "1/11.31"; break;
        case 27: DISP_Wind_ = "1/9.51"; break;
        case 28: DISP_Wind_ = "1/8.00"; break;
        case 29: DISP_Wind_ = "1/6.73"; break;
        case 30: DISP_Wind_ = "1/5.66"; break;
        case 31: DISP_Wind_ = "1/4.76"; break;
        case 32: DISP_Wind_ = "1/4.00"; break;
        case 33: DISP_Wind_ = "1/3.36"; break;
        case 34: DISP_Wind_ = "1/2.83"; break;
        case 35: DISP_Wind_ = "1/2.38"; break;
        case 36: DISP_Wind_ = "1/2.00"; break;
        case 37: DISP_Wind_ = "1/1.68"; break;
        case 38: DISP_Wind_ = "1/1.41"; break;
        case 39: DISP_Wind_ = "1/1.19"; break;
        case 40: DISP_Wind_ = "1/1.00"; break;
    }
    var DISP_Zoom_ = Math.pow(2, DISP_Zoom + 9);
    var DISP_Offs_ = DISP_Offs + "/64";
    var DISP_Step_ = Math.pow(2, DISP_Step);
    var DISP_Base_ = DISP_Base + "/64";
    var DISP_MiMa_ = DISP_MiMa;
    var DISP_Line_ = DISP_Line;
    
    var LabelDisp = "Disp\n";
    if (DISP_Mode == 0) { LabelDisp += "Normal\n"; }
    if (DISP_Mode == 1) { LabelDisp += "Half\n"; }
    if (DISP_Mode == 2) { LabelDisp += "Scroll\n"; }
    if (DISP_VU__ == 0) { LabelDisp += "Spec"; }
    if (DISP_VU__ == 1) { LabelDisp += "Wave"; }
    if (DISP_VU__ == 2) { LabelDisp += "Vol"; }
    
    var LabelPause = (IsPaused ? "Resume" : "Pause");

    document.getElementById("BtnH1GainUp").innerText = "G+\n" + DISP_Gain_;
    document.getElementById("BtnV1GainUp").innerText = "G+\n" + DISP_Gain_;
    document.getElementById("BtnH2GainUp").innerText = "G+\n" + DISP_Gain_;
    document.getElementById("BtnV2GainUp").innerText = "G+\n" + DISP_Gain_;

    document.getElementById("BtnH1GainDn").innerText = "G-\n" + DISP_Gain_;
    document.getElementById("BtnV1GainDn").innerText = "G-\n" + DISP_Gain_;
    document.getElementById("BtnH2GainDn").innerText = "G-\n" + DISP_Gain_;
    document.getElementById("BtnV2GainDn").innerText = "G-\n" + DISP_Gain_;

    document.getElementById("BtnH1ResoUp").innerText = "R+\n" + DISP_Reso_;
    document.getElementById("BtnV1ResoUp").innerText = "R+\n" + DISP_Reso_;
    document.getElementById("BtnH2ResoUp").innerText = "R+\n" + DISP_Reso_;
    document.getElementById("BtnV2ResoUp").innerText = "R+\n" + DISP_Reso_;

    document.getElementById("BtnH1ResoDn").innerText = "R-\n" + DISP_Reso_;
    document.getElementById("BtnV1ResoDn").innerText = "R-\n" + DISP_Reso_;
    document.getElementById("BtnH2ResoDn").innerText = "R-\n" + DISP_Reso_;
    document.getElementById("BtnV2ResoDn").innerText = "R-\n" + DISP_Reso_;

    document.getElementById("BtnH1WindUp").innerText = "W+\n" + DISP_Wind_;
    document.getElementById("BtnV1WindUp").innerText = "W+\n" + DISP_Wind_;
    document.getElementById("BtnH2WindUp").innerText = "W+\n" + DISP_Wind_;
    document.getElementById("BtnV2WindUp").innerText = "W+\n" + DISP_Wind_;

    document.getElementById("BtnH1WindDn").innerText = "W-\n" + DISP_Wind_;
    document.getElementById("BtnV1WindDn").innerText = "W-\n" + DISP_Wind_;
    document.getElementById("BtnH2WindDn").innerText = "W-\n" + DISP_Wind_;
    document.getElementById("BtnV2WindDn").innerText = "W-\n" + DISP_Wind_;

    document.getElementById("BtnH1ZoomUp").innerText = "Z+\n" + DISP_Zoom_;
    document.getElementById("BtnV1ZoomUp").innerText = "Z+\n" + DISP_Zoom_;
    document.getElementById("BtnH2ZoomUp").innerText = "Z+\n" + DISP_Zoom_;
    document.getElementById("BtnV2ZoomUp").innerText = "Z+\n" + DISP_Zoom_;

    document.getElementById("BtnH1ZoomDn").innerText = "Z-\n" + DISP_Zoom_;
    document.getElementById("BtnV1ZoomDn").innerText = "Z-\n" + DISP_Zoom_;
    document.getElementById("BtnH2ZoomDn").innerText = "Z-\n" + DISP_Zoom_;
    document.getElementById("BtnV2ZoomDn").innerText = "Z-\n" + DISP_Zoom_;

    document.getElementById("BtnH1OffsUp").innerText = "O+\n" + DISP_Offs_;
    document.getElementById("BtnV1OffsUp").innerText = "O+\n" + DISP_Offs_;
    document.getElementById("BtnH2OffsUp").innerText = "O+\n" + DISP_Offs_;
    document.getElementById("BtnV2OffsUp").innerText = "O+\n" + DISP_Offs_;

    document.getElementById("BtnH1OffsDn").innerText = "O-\n" + DISP_Offs_;
    document.getElementById("BtnV1OffsDn").innerText = "O-\n" + DISP_Offs_;
    document.getElementById("BtnH2OffsDn").innerText = "O-\n" + DISP_Offs_;
    document.getElementById("BtnV2OffsDn").innerText = "O-\n" + DISP_Offs_;

    document.getElementById("BtnH1StepUp").innerText = "S+\n" + DISP_Step_;
    document.getElementById("BtnV1StepUp").innerText = "S+\n" + DISP_Step_;
    document.getElementById("BtnH2StepUp").innerText = "S+\n" + DISP_Step_;
    document.getElementById("BtnV2StepUp").innerText = "S+\n" + DISP_Step_;

    document.getElementById("BtnH1StepDn").innerText = "S-\n" + DISP_Step_;
    document.getElementById("BtnV1StepDn").innerText = "S-\n" + DISP_Step_;
    document.getElementById("BtnH2StepDn").innerText = "S-\n" + DISP_Step_;
    document.getElementById("BtnV2StepDn").innerText = "S-\n" + DISP_Step_;

    document.getElementById("BtnH1BaseUp").innerText = "B+\n" + DISP_Base_;
    document.getElementById("BtnV1BaseUp").innerText = "B+\n" + DISP_Base_;
    document.getElementById("BtnH2BaseUp").innerText = "B+\n" + DISP_Base_;
    document.getElementById("BtnV2BaseUp").innerText = "B+\n" + DISP_Base_;

    document.getElementById("BtnH1BaseDn").innerText = "B-\n" + DISP_Base_;
    document.getElementById("BtnV1BaseDn").innerText = "B-\n" + DISP_Base_;
    document.getElementById("BtnH2BaseDn").innerText = "B-\n" + DISP_Base_;
    document.getElementById("BtnV2BaseDn").innerText = "B-\n" + DISP_Base_;

    document.getElementById("BtnH1MiMaUp").innerText = "M+\n" + DISP_MiMa_;
    document.getElementById("BtnV1MiMaUp").innerText = "M+\n" + DISP_MiMa_;
    document.getElementById("BtnH2MiMaUp").innerText = "M+\n" + DISP_MiMa_;
    document.getElementById("BtnV2MiMaUp").innerText = "M+\n" + DISP_MiMa_;

    document.getElementById("BtnH1MiMaDn").innerText = "M-\n" + DISP_MiMa_;
    document.getElementById("BtnV1MiMaDn").innerText = "M-\n" + DISP_MiMa_;
    document.getElementById("BtnH2MiMaDn").innerText = "M-\n" + DISP_MiMa_;
    document.getElementById("BtnV2MiMaDn").innerText = "M-\n" + DISP_MiMa_;

    document.getElementById("BtnH1LineUp").innerText = "L+\n" + DISP_Line_;
    document.getElementById("BtnV1LineUp").innerText = "L+\n" + DISP_Line_;
    document.getElementById("BtnH2LineUp").innerText = "L+\n" + DISP_Line_;
    document.getElementById("BtnV2LineUp").innerText = "L+\n" + DISP_Line_;

    document.getElementById("BtnH1LineDn").innerText = "L-\n" + DISP_Line_;
    document.getElementById("BtnV1LineDn").innerText = "L-\n" + DISP_Line_;
    document.getElementById("BtnH2LineDn").innerText = "L-\n" + DISP_Line_;
    document.getElementById("BtnV2LineDn").innerText = "L-\n" + DISP_Line_;

    document.getElementById("BtnH1Mode__").innerText = LabelDisp;
    document.getElementById("BtnV1Mode__").innerText = LabelDisp;
    document.getElementById("BtnH2Mode__").innerText = LabelDisp;
    document.getElementById("BtnV2Mode__").innerText = LabelDisp;

    document.getElementById("BtnH1Paus__").innerText = LabelPause;
    document.getElementById("BtnV1Paus__").innerText = LabelPause;
    document.getElementById("BtnH2Paus__").innerText = LabelPause;
    document.getElementById("BtnV2Paus__").innerText = LabelPause;
}

function FFTWindow(X)
{
    switch (X)
    {
        case 16: return 16;
        case 17: return 19;
        case 18: return 23;
        case 19: return 27;
        case 20: return 32;
        case 21: return 38;
        case 22: return 45;
        case 23: return 54;
        case 24: return 64;
        case 25: return 76;
        case 26: return 91;
        case 27: return 108;
        case 28: return 128;
        case 29: return 152;
        case 30: return 181;
        case 31: return 215;
        case 32: return 256;
        case 33: return 304;
        case 34: return 362;
        case 35: return 431;
        case 36: return 512;
        case 37: return 609;
        case 38: return 724;
        case 39: return 861;
        case 40: return 1024;
        default: return 1024;
    }
}

function SetFFT()
{
    AudioGainR = (SET_AudioGainR * 65536.0) / 1000.0;
    AudioGainG = (SET_AudioGainG * 65536.0) / 1000.0;
    AudioGainB = (SET_AudioGainB * 65536.0) / 1000.0;

    var Gain_ = Math.pow(2, DISP_Gain);
    var MinMax_ = DISP_MiMa;
    var FFT_ = Math.pow(2, DISP_Reso + 6);
    var Win_ = FFTWindow(DISP_Wind);

    var RealMinimumStep = Math.max(3, SET_MinimumStep - SET_MaximumResolution + DISP_Reso + 5);
    if (DISP_Mode == 2)
    {
        if (RealMinimumStep < SET_MinimumStepScroll)
        {
            RealMinimumStep = SET_MinimumStepScroll;
        }
    }

    var Step_ = Math.pow(2, Math.max(DISP_Step, RealMinimumStep));
    var Base_ = DISP_Base;
    var CanvasDrawStepX_ = CanvasDrawStepX;

    var AudioModeVal = 0;
    if ((SET_AudioModeR == 0) || (SET_AudioModeG == 0) || (SET_AudioModeB == 0)) { AudioModeVal = AudioModeVal +   1; }
    if ((SET_AudioModeR == 1) || (SET_AudioModeG == 1) || (SET_AudioModeB == 1)) { AudioModeVal = AudioModeVal +   2; }
    if ((SET_AudioModeR == 2) || (SET_AudioModeG == 2) || (SET_AudioModeB == 2)) { AudioModeVal = AudioModeVal +   4; }
    if ((SET_AudioModeR == 3) || (SET_AudioModeG == 3) || (SET_AudioModeB == 3)) { AudioModeVal = AudioModeVal +   8; }
    if ((SET_AudioModeR == 4) || (SET_AudioModeG == 4) || (SET_AudioModeB == 4)) { AudioModeVal = AudioModeVal +  16; }
    if ((SET_AudioModeR == 5) || (SET_AudioModeG == 5) || (SET_AudioModeB == 5)) { AudioModeVal = AudioModeVal +  32; }
    if ((SET_AudioModeR == 6) || (SET_AudioModeG == 6) || (SET_AudioModeB == 6)) { AudioModeVal = AudioModeVal +  64; }
    if ((SET_AudioModeR == 7) || (SET_AudioModeG == 7) || (SET_AudioModeB == 7)) { AudioModeVal = AudioModeVal + 128; }

    if (DISP_Step >= RealMinimumStep)
    {
        CanvasDrawStep = 1;
        CanvasDrawStepX = 0;
    }
    else
    {
        CanvasDrawStep = Math.pow(2, RealMinimumStep - DISP_Step);
        CanvasDrawStepX = RealMinimumStep - DISP_Step;
    }
    
    if (CanvasDrawStepX_ < CanvasDrawStepX)
    {
        DrawPointer = Math.floor(DrawPointer >> (CanvasDrawStepX - CanvasDrawStepX_));
    }
    if (CanvasDrawStepX_ > CanvasDrawStepX)
    {
        DrawPointer = Math.floor(DrawPointer << (CanvasDrawStepX_ - CanvasDrawStepX));
    }

    WaveDisplayCanvasWX = Math.ceil((WaveDisplayCanvasW >> CanvasDrawStepX));

    if (IsPaused)
    {
        AudioCallbackDummy();
    }
    var FFTDecimation = 1;
    var FFTDecimationX = DISP_Reso - DISP_Zoom - 4;
    if (FFTDecimationX > 0)
    {
        FFTDecimation = 1 << FFTDecimationX;
    }
    MarkerCalc();

    audioRecorder.Msg({ command: 'fft', WORK_Spectrum: WORK_Spectrum, DispMode: DISP_VU__, FFT: FFT_, Win: Win_, FFTWin: SET_FFTWindow, FFTDecimation: FFTDecimation, MinMax: MinMax_, Gain: Gain_, Step: Step_, Base: Base_, Decimation: SET_SampleDecimation, AudioMode: AudioModeVal, DispSize: (DISP_Line * WaveDisplayCanvasWX) - Math.ceil(SET_DrawStripSize / CanvasDrawStep) + 1, BufTick: Math.ceil(SET_BufTick / CanvasDrawStep), Log: SET_DrawLog, LogBase: SET_DrawLogBase / 1000, LogFactor: SET_DrawLogFactor / 1000, LogOffset: SET_DrawLogOffset / 1000, WFBack: SET_WaveformBack, WFFore: SET_WaveformFore });
}

function SetScope()
{

    if (DrawOrientationRot(SET_ScopeOrientation))
    {
        SET_ScopeW_ = SET_ScopeH;
        SET_ScopeH_ = SET_ScopeW;
    }
    else
    {
        SET_ScopeW_ = SET_ScopeW;
        SET_ScopeH_ = SET_ScopeH;
    }

    var _ScopeI = false;
    var _ScopeO = false;
    if (WORK_Scope)
    {
        if ((SET_ScopeAudioR == 1) || (SET_ScopeAudioG == 1) || (SET_ScopeAudioB == 1))
        {
            _ScopeI = true;
        }
        if ((SET_ScopeAudioR == 2) || (SET_ScopeAudioG == 2) || (SET_ScopeAudioB == 2))
        {
            _ScopeO = true;
        }
    }

    if (audioRecorder)
    {
        audioRecorder.Msg({ command: 'scope', WORK_ScopeI: _ScopeI, WORK_ScopeO: _ScopeO, SET_ScopeW: SET_ScopeW_, SET_ScopeH: SET_ScopeH_, SET_ScopeFactor: SET_ScopeFactor, SET_ScopeGainX: SET_ScopeGainX, SET_ScopeGainY: SET_ScopeGainY, SET_ScopeGainZ: SET_ScopeGainZ, SET_ScopePlotMidSide: SET_ScopePlotMidSide, SET_ScopeDimming: SET_ScopeDimming, SET_ScopePixelFactor: SET_ScopePixelFactor });
    }
}

function BtnAction(Btn)
{
    var Temp;
    switch (Btn)
    {
        case 0:
            SettingsShow();
            break;
        case 10:
            DISP_Gain = Limit(DISP_Gain - 1, 0, 20);
            SetFFT();
            break;
        case 11:
            DISP_Gain = Limit(DISP_Gain + 1, 0, 20);
            SetFFT();
            break;
        case 12:
            DISP_Reso = Limit(DISP_Reso - 1, 0, 8);
            SetFFT();
            break;
        case 13:
            DISP_Reso = Limit(DISP_Reso + 1, 0, 8);
            SetFFT();
            break;
        case 14:
            DISP_Wind = Limit(DISP_Wind - 1, 16, 40);
            SetFFT();
            break;
        case 15:
            DISP_Wind = Limit(DISP_Wind + 1, 16, 40);
            SetFFT();
            break;
        case 16:
            DISP_Zoom = Limit(DISP_Zoom - 1, -4, 4);
            SetFFT();
            break;
        case 17:
            DISP_Zoom = Limit(DISP_Zoom + 1, -4, 4);
            SetFFT();
            break;
        case 18:
            DISP_Offs = Limit(DISP_Offs - 1, -128, 64);
            SetFFT();
            break;
        case 19:
            DISP_Offs = Limit(DISP_Offs + 1, -128, 64);
            SetFFT();
            break;
        case 20:
            DISP_Step = Limit(DISP_Step - 1, 3, 12);
            SetFFT();
            break;
        case 21:
            DISP_Step = Limit(DISP_Step + 1, 3, 12);
            SetFFT();
            break;
        case 22:
            DISP_Base = Limit(DISP_Base - 1, -128, 64);
            SetFFT();
            break;
        case 23:
            DISP_Base = Limit(DISP_Base + 1, -128, 64);
            SetFFT();
            break;
        case 24:
            DISP_MiMa = Limit(DISP_MiMa - 1, -32, 32);
            SetFFT();
            break;
        case 25:
            DISP_MiMa = Limit(DISP_MiMa + 1, -32, 32);
            SetFFT();
            break;
        case 26:
            DISP_Line = Limit(DISP_Line - 1, 1, 32);
            if (DISP_Mode < 2)
            {
                CanvasLineNum = 0;
            }
            else
            {
                CanvasLineNum = DISP_Line - 1;
            }
            SetLayout();
            break;
        case 27:
            DISP_Line = Limit(DISP_Line + 1, 1, 32);
            if (DISP_Mode < 2)
            {
                CanvasLineNum = 0;
            }
            else
            {
                CanvasLineNum = DISP_Line - 1;
            }
            SetLayout();
            break;
        case 28:
            Temp = false;
            if (DISP_Mode < 2)
            {
                DISP_Mode++;
            }
            else
            {
                DISP_Mode = 0;
                Temp = true;
            }
            if (DISP_Mode == 2)
            {
                CanvasLineNum = DISP_Line - 1;
            }
            else
            {
                CanvasLineNum = 0;
            }
            if (Temp)
            {
                DISP_VU__++;
                if (DISP_VU__ == 3)
                {
                    DISP_VU__ = 0;
                }
                ScaleCalcReset();
                ScaleCalcStripReset();
            }
            SetFFT();
            SetLayout();
            break;
        case 29:
            Pause();
            break;
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
            ScaleBtnAction(Btn);
            break;
    }
    DataSet("DISP_Gain", DISP_Gain);
    DataSet("DISP_Reso", DISP_Reso);
    DataSet("DISP_Wind", DISP_Wind);
    DataSet("DISP_Zoom", DISP_Zoom);
    DataSet("DISP_Offs", DISP_Offs);
    DataSet("DISP_Step", DISP_Step);
    DataSet("DISP_Base", DISP_Base);
    DataSet("DISP_MiMa", DISP_MiMa);
    DataSet("DISP_Line", DISP_Line);
    DataSet("DISP_Mode", DISP_Mode);
    DataSet("DISP_VU__", DISP_VU__);
    SetLabels();
}

SET_DrawOverdriveColorX = 255 - SET_DrawOverdriveColorA;

function DispLayout()
{
    document.getElementById("xScreenSize").innerHTML = window.innerWidth + "x" + window.innerHeight;
    document.getElementById("xCanvasSize").innerHTML = WaveDisplayCanvasW + "x" + WaveDisplayCanvasH;
    document.getElementById("xFilterCanvasSize").innerHTML = FilterCanvasW + "x" + FilterCanvasH;

    AudioCallbackDummy();
}

function SettingsShow()
{
    DispLayout();

    document.getElementById("xSET_SampleDecimation").value = SET_SampleDecimation;

    document.getElementById("xSET_DrawOrientation").selectedIndex = SET_DrawOrientation;
    document.getElementById("xSET_FlipBand").selectedIndex = SET_FlipBand ? 1 : 0;
    document.getElementById("xSET_ScaleSetLogQuality").selectedIndex = SET_ScaleSetLogQuality;
    document.getElementById("xSET_ToolbarPosition").selectedIndex = SET_ToolbarPosition;
    document.getElementById("xSET_ToolbarLog").selectedIndex = SET_ToolbarLog ? 1 : 0;
    document.getElementById("xSET_ToolbarSize").value = SET_ToolbarSize;
    document.getElementById("xSET_MinimumStep").selectedIndex = SET_MinimumStep - 3;
    document.getElementById("xSET_MaximumResolution").selectedIndex = SET_MaximumResolution - 5;
    document.getElementById("xSET_MinimumStepScroll").selectedIndex = SET_MinimumStepScroll - 3;
    document.getElementById("xSET_FFTWindow").selectedIndex = SET_FFTWindow;
    document.getElementById("xSET_CanvasScaleH").value = SET_CanvasScaleH;
    document.getElementById("xSET_CanvasScaleV").value = SET_CanvasScaleV;
    document.getElementById("xSET_DrawGamma").value = SET_DrawGamma;

    document.getElementById("xSET_BufLength").value = SET_BufLength;
    document.getElementById("xSET_BufTick").value = SET_BufTick;

    document.getElementById("xSET_DrawStripSize").value = SET_DrawStripSize;
    document.getElementById("xSET_DrawStripColor").value = ColorValuesToText(SET_DrawStripColorR, SET_DrawStripColorG, SET_DrawStripColorB);

    document.getElementById("xSET_DrawOverdriveThresholdI").value = SET_DrawOverdriveThresholdI;
    document.getElementById("xSET_DrawOverdriveThresholdO").value = SET_DrawOverdriveThresholdO;
    document.getElementById("xSET_DrawOverdriveColor").value = ColorValuesToText(SET_DrawOverdriveColorR, SET_DrawOverdriveColorG, SET_DrawOverdriveColorB);
    document.getElementById("xSET_DrawOverdriveColorA").value = SET_DrawOverdriveColorA;

    document.getElementById("xSET_WaveformBack").value = SET_WaveformBack;
    document.getElementById("xSET_WaveformFore").value = SET_WaveformFore;
    document.getElementById("xSET_ButtonFontSize").value = SET_ButtonFontSize;
    document.getElementById("xSET_AudioEchoCancellation").selectedIndex = SET_AudioEchoCancellation ? 1 : 0;
    document.getElementById("xSET_AudioNoiseSuppression").selectedIndex = SET_AudioNoiseSuppression ? 1 : 0;
    document.getElementById("xSET_AudioAutoGainControl_").selectedIndex = SET_AudioAutoGainControl_ ? 1 : 0;
    document.getElementById("xSET_AutoStart").selectedIndex = SET_AutoStart;
    document.getElementById("xSET_AutoFullscreen").selectedIndex = SET_AutoFullscreen;
    document.getElementById("xSET_ColorPicker").selectedIndex = SET_ColorPicker;

    document.getElementById("xCurrentSamplerate").innerHTML = CurrentSamplerate;
    document.getElementById("xCurrentSamplerateO").innerHTML = AudioPlayerSampleRate;
    document.getElementById("xCurrentSamplerateX").innerHTML = CurrentSamplerate / SET_SampleDecimation;

    document.getElementById("xSET_AudioBufferLength").selectedIndex = SET_AudioBufferLength - 8;
    document.getElementById("xSET_AudioModeR").selectedIndex = SET_AudioModeR;
    document.getElementById("xSET_AudioGainR").value = SET_AudioGainR;
    document.getElementById("xSET_AudioModeG").selectedIndex = SET_AudioModeG;
    document.getElementById("xSET_AudioGainG").value = SET_AudioGainG;
    document.getElementById("xSET_AudioModeB").selectedIndex = SET_AudioModeB;
    document.getElementById("xSET_AudioGainB").value = SET_AudioGainB;

    ScopeSettingsGet();
    LayoutSettingsGet();
    FilterSettingsGet();
    MarkerSettingsGet();

    document.getElementById("Settings").style.display = "block";
}

function SettingBtn(Cmd)
{
    var ColorTemp;
    switch(Cmd)
    {
        case 0:
            document.getElementById("Settings").style.display = "none";
            break;
        case 1:
            ToggleRecording();
            break;
        case 2:
            ToggleFullScreen();
            break;
        case 3:
            SET_DrawOrientation = document.getElementById("xSET_DrawOrientation").selectedIndex;
            SET_FlipBand = (document.getElementById("xSET_FlipBand").selectedIndex == 1);
            SET_ScaleSetLogQuality = document.getElementById("xSET_ScaleSetLogQuality").selectedIndex;
            SET_ToolbarPosition = document.getElementById("xSET_ToolbarPosition").selectedIndex;
            SET_ToolbarLog = (document.getElementById("xSET_ToolbarLog").selectedIndex == 1);
            SET_ToolbarSize = Limit(document.getElementById("xSET_ToolbarSize").value, 1, 1000);
            SET_CanvasScaleH = Limit(document.getElementById("xSET_CanvasScaleH").value, 1, 100);
            SET_CanvasScaleV = Limit(document.getElementById("xSET_CanvasScaleV").value, 1, 100);
            SET_ButtonFontSize = Limit(document.getElementById("xSET_ButtonFontSize").value, 1, 100);
            ScaleCalcReset();

            DataSet("SET_DrawOrientation", SET_DrawOrientation);
            DataSetB("SET_FlipBand", SET_FlipBand);
            DataSet("SET_ScaleSetLogQuality", SET_ScaleSetLogQuality);
            DataSet("SET_ToolbarPosition", SET_ToolbarPosition);
            DataSetB("SET_ToolbarLog", SET_ToolbarLog);
            DataSet("SET_ToolbarSize", SET_ToolbarSize);
            DataSet("SET_CanvasScaleH", SET_CanvasScaleH);
            DataSet("SET_CanvasScaleV", SET_CanvasScaleV);
            DataSet("SET_ButtonFontSize", SET_ButtonFontSize);

            document.getElementById("xSET_ToolbarSize").value = SET_ToolbarSize;
            document.getElementById("xSET_CanvasScaleH").value = SET_CanvasScaleH;
            document.getElementById("xSET_CanvasScaleV").value = SET_CanvasScaleV;
            document.getElementById("xSET_ButtonFontSize").value = SET_ButtonFontSize;

            SetLayout();
            break;
        case 4:
            SET_SampleDecimation = Limit(document.getElementById("xSET_SampleDecimation").value, 1, 1000);
            MarkerCalc();
            SET_MinimumStep = document.getElementById("xSET_MinimumStep").selectedIndex + 3;
            SET_MaximumResolution = document.getElementById("xSET_MaximumResolution").selectedIndex + 5;
            SET_MinimumStepScroll = document.getElementById("xSET_MinimumStepScroll").selectedIndex + 3;
            SET_FFTWindow = document.getElementById("xSET_FFTWindow").selectedIndex;
            SET_AudioModeR = document.getElementById("xSET_AudioModeR").selectedIndex;
            SET_AudioGainR = Limit(document.getElementById("xSET_AudioGainR").value, 0, 1000);
            SET_AudioModeG = document.getElementById("xSET_AudioModeG").selectedIndex;
            SET_AudioGainG = Limit(document.getElementById("xSET_AudioGainG").value, 0, 1000);
            SET_AudioModeB = document.getElementById("xSET_AudioModeB").selectedIndex;
            SET_AudioGainB = Limit(document.getElementById("xSET_AudioGainB").value, 0, 1000);
            SET_BufLength = Limit(document.getElementById("xSET_BufLength").value, 0, 1000000000);
            SET_BufTick = Limit(document.getElementById("xSET_BufTick").value, 0, 1000);
            SET_WaveformBack = Limit(document.getElementById("xSET_WaveformBack").value, 0, 65536);
            SET_WaveformFore = Limit(document.getElementById("xSET_WaveformFore").value, 0, 65536);

            DataSet("SET_SampleDecimation", SET_SampleDecimation);
            DataSet("SET_MinimumStep", SET_MinimumStep);
            DataSet("SET_MaximumResolution", SET_MaximumResolution);
            DataSet("SET_MinimumStepScroll", SET_MinimumStepScroll);
            DataSet("SET_FFTWindow", SET_FFTWindow);
            DataSet("SET_AudioModeR", SET_AudioModeR);
            DataSet("SET_AudioGainR", SET_AudioGainR);
            DataSet("SET_AudioModeG", SET_AudioModeG);
            DataSet("SET_AudioGainG", SET_AudioGainG);
            DataSet("SET_AudioModeB", SET_AudioModeB);
            DataSet("SET_AudioGainB", SET_AudioGainB);
            DataSet("SET_BufLength", SET_BufLength);
            DataSet("SET_BufTick", SET_BufTick);
            DataSet("SET_WaveformBack", SET_WaveformBack);
            DataSet("SET_WaveformFore", SET_WaveformFore);

            document.getElementById("xSET_SampleDecimation").value = SET_SampleDecimation;
            document.getElementById("xSET_BufLength").value = SET_BufLength;
            document.getElementById("xSET_BufTick").value = SET_BufTick;
            document.getElementById("xSET_WaveformBack").value = SET_WaveformBack;
            document.getElementById("xSET_WaveformFore").value = SET_WaveformFore;

            document.getElementById("xCurrentSamplerate").innerHTML = CurrentSamplerate;
            document.getElementById("xCurrentSamplerateX").innerHTML = CurrentSamplerate / SET_SampleDecimation;

            document.getElementById("xSET_AudioGainR").value = SET_AudioGainR;
            document.getElementById("xSET_AudioGainG").value = SET_AudioGainG;
            document.getElementById("xSET_AudioGainB").value = SET_AudioGainB;

            SetFFT();
            SetScope();
            break;
        case 5:
            break;
        case 6:
            SET_DrawGamma = Limit(document.getElementById("xSET_DrawGamma").value, 0, 1000000000);
            DataSet("SET_DrawGamma", SET_DrawGamma);
            document.getElementById("xSET_DrawGamma").value = SET_DrawGamma;
            InitPalette();
            break;
        case 7:
            SET_AudioBufferLength = document.getElementById("xSET_AudioBufferLength").selectedIndex + 8;
            SET_DrawStripSize = Limit(document.getElementById("xSET_DrawStripSize").value, 0, 1000000000);
            ColorTemp = ColorTextToValues(document.getElementById("xSET_DrawStripColor").value, SET_DrawStripColorR, SET_DrawStripColorG, SET_DrawStripColorB);
            SET_DrawStripColorR = Limit(ColorTemp[0], 0, 255);
            SET_DrawStripColorG = Limit(ColorTemp[1], 0, 255);
            SET_DrawStripColorB = Limit(ColorTemp[2], 0, 255);
            SET_DrawOverdriveThresholdI = Limit(document.getElementById("xSET_DrawOverdriveThresholdI").value, 0, 1000000000);
            SET_DrawOverdriveThresholdO = Limit(document.getElementById("xSET_DrawOverdriveThresholdO").value, 0, 1000000000);
            ColorTemp = ColorTextToValues(document.getElementById("xSET_DrawOverdriveColor").value, SET_DrawOverdriveColorR, SET_DrawOverdriveColorG, SET_DrawOverdriveColorB);
            SET_DrawOverdriveColorR = Limit(ColorTemp[0], 0, 255);
            SET_DrawOverdriveColorG = Limit(ColorTemp[1], 0, 255);
            SET_DrawOverdriveColorB = Limit(ColorTemp[2], 0, 255);
            SET_DrawOverdriveColorA = Limit(document.getElementById("xSET_DrawOverdriveColorA").value, 0, 255);
            SET_DrawOverdriveColorX = 255 - SET_DrawOverdriveColorA;
            SET_AudioEchoCancellation = (document.getElementById("xSET_AudioEchoCancellation").selectedIndex == 1);
            SET_AudioNoiseSuppression = (document.getElementById("xSET_AudioNoiseSuppression").selectedIndex == 1);
            SET_AudioAutoGainControl_ = (document.getElementById("xSET_AudioAutoGainControl_").selectedIndex == 1);
            SET_AutoStart = document.getElementById("xSET_AutoStart").selectedIndex;
            SET_AutoFullscreen = document.getElementById("xSET_AutoFullscreen").selectedIndex;
            SET_ColorPicker = document.getElementById("xSET_ColorPicker").selectedIndex;

            DataSet("SET_AudioBufferLength", SET_AudioBufferLength);
            DataSet("SET_DrawStripSize", SET_DrawStripSize);
            DataSet("SET_DrawStripColorR", SET_DrawStripColorR);
            DataSet("SET_DrawStripColorG", SET_DrawStripColorG);
            DataSet("SET_DrawStripColorB", SET_DrawStripColorB);
            DataSet("SET_DrawOverdriveThresholdI", SET_DrawOverdriveThresholdI);
            DataSet("SET_DrawOverdriveThresholdO", SET_DrawOverdriveThresholdO);
            DataSet("SET_DrawOverdriveColorR", SET_DrawOverdriveColorR);
            DataSet("SET_DrawOverdriveColorG", SET_DrawOverdriveColorG);
            DataSet("SET_DrawOverdriveColorB", SET_DrawOverdriveColorB);
            DataSet("SET_DrawOverdriveColorA", SET_DrawOverdriveColorA);
            DataSetB("SET_AudioEchoCancellation", SET_AudioEchoCancellation);
            DataSetB("SET_AudioNoiseSuppression", SET_AudioNoiseSuppression);
            DataSetB("SET_AudioAutoGainControl_", SET_AudioAutoGainControl_);
            DataSet("SET_AutoStart", SET_AutoStart);
            DataSet("SET_AutoFullscreen", SET_AutoFullscreen);
            DataSet("SET_ColorPicker", SET_ColorPicker);

            document.getElementById("xSET_DrawStripSize").value = SET_DrawStripSize;
            document.getElementById("xSET_DrawStripColor").value = ColorValuesToText(SET_DrawStripColorR, SET_DrawStripColorG, SET_DrawStripColorB);
            document.getElementById("xSET_DrawOverdriveThresholdI").value = SET_DrawOverdriveThresholdI;
            document.getElementById("xSET_DrawOverdriveThresholdO").value = SET_DrawOverdriveThresholdO;
            document.getElementById("xSET_DrawOverdriveColor").value = ColorValuesToText(SET_DrawOverdriveColorR, SET_DrawOverdriveColorG, SET_DrawOverdriveColorB);
            document.getElementById("xSET_DrawOverdriveColorA").value = SET_DrawOverdriveColorA;

            break;
    }
}


function Pow2(X)
{
    switch (X)
    {
        case 0: return 1;
        case 1: return 2;
        case 2: return 4;
        case 3: return 8;
        case 4: return 16;
        case 5: return 32;
        case 6: return 64;
        case 7: return 128;
        case 8: return 256;
        case 9: return 512;
        case 10: return 1024;
        case 11: return 2048;
        case 12: return 4096;
        case 13: return 8192;
        case 14: return 16384;
        case 15: return 32768;
        case 16: return 65536;
    }
    alert("Pow2(" + X + ")");
    return 0;
}

function Log2(X)
{
    switch (X)
    {
        case 1: return 0;
        case 2: return 1;
        case 4: return 2;
        case 8: return 3;
        case 16: return 4;
        case 32: return 5;
        case 64: return 6;
        case 128: return 7;
        case 256: return 8;
        case 512: return 9;
        case 1024: return 10;
        case 2048: return 11;
        case 4096: return 12;
        case 8192: return 13;
        case 16384: return 14;
        case 32768: return 15;
        case 65536: return 16;
    }
    alert("Log2(" + X + ")");
    return 0;
}

var M_PI = Math.PI;

function LabelVal(Val, F)
{
    if (F == 0) { return (Val/1).toFixed(0); }
    if (F == 1) { return (Val/10).toFixed(1); }
    if (F == 2) { return (Val/100).toFixed(2); }
    if (F == 3) { return (Val/1000).toFixed(3); }
    if (F == 4) { return (Val/10000).toFixed(4); }
    if (F == 5) { return (Val/100000).toFixed(5); }
    if (F == 6) { return (Val/1000000).toFixed(6); }
    if (F == 7) { return (Val/10000000).toFixed(7); }
    if (F == 8) { return (Val/100000000).toFixed(8); }
    if (F == 9) { return (Val/1000000000).toFixed(9); }
    alert("FractLabel " + F);
    return "?";
}

function SettingsReset(M)
{
    // Reset layout
    if (M == 1)
    {
        // layout.js
        DataDelete("SET_Layout_Order");
        DataDelete("SET_Layout_SpectrogramSizeV");
        DataDelete("SET_Layout_SpectrogramSizeU");
        DataDelete("SET_Layout_OscilloscopeSizeV");
        DataDelete("SET_Layout_OscilloscopeSizeU");
        DataDelete("SET_Layout_FilterSizeV");
        DataDelete("SET_Layout_FilterSizeU");
        DataDelete("SET_Layout_ProcessSizeV");
        DataDelete("SET_Layout_ProcessSizeU");
        DataDelete("SET_Layout_PlaylistSizeV");
        DataDelete("SET_Layout_PlaylistSizeU");
    }

    // Reset general settings
    if (M == 2)
    {
        // core.js
        DataDelete("SET_DrawGamma");
        DataDelete("SET_AudioBufferLength");
        DataDelete("SET_AudioEchoCancellation");
        DataDelete("SET_AudioNoiseSuppression");
        DataDelete("SET_AudioAutoGainControl_");
        DataDelete("SET_AutoStart");
        DataDelete("SET_AutoFullscreen");
        DataDelete("SET_ButtonFontSize");
        DataDelete("SET_ColorPicker");
    }

    // Reset playback settings
    if (M == 3)
    {
        // filter.js
        DataDelete("SET_AudioPlayerEnabled");
        DataDelete("SET_AudioPlayerTimeStartMin");
        DataDelete("SET_AudioPlayerTimeStartMax");
        DataDelete("SET_AudioPlayerBufTimeCorrectBound");
        DataDelete("SET_AudioPlayerBufTimeCorrectCount");
        DataDelete("SET_AudioPlayerDrawBuf");
        DataDelete("SET_AudioPlayerDiagBack");
        DataDelete("SET_AudioPlayerDiagFore");
        DataDelete("SET_AudioPlayerMute");
    }

    // Reset spectrogram
    if (M == 4)
    {
        // core.js
        DataDelete("SET_SampleDecimation");
        DataDelete("SET_FFTWindow");
        DataDelete("SET_DrawOrientation");
        DataDelete("SET_FlipBand");
        DataDelete("SET_ToolbarPosition");
        DataDelete("SET_ToolbarSize");
        DataDelete("SET_MinimumStep");
        DataDelete("SET_MaximumResolution");
        DataDelete("SET_MinimumStepScroll");
        DataDelete("SET_CanvasScaleH");
        DataDelete("SET_CanvasScaleV");
        DataDelete("SET_DrawStripSize");
        DataDelete("SET_DrawStripColorR");
        DataDelete("SET_DrawStripColorG");
        DataDelete("SET_DrawStripColorB");
        DataDelete("SET_DrawOverdriveThresholdI");
        DataDelete("SET_DrawOverdriveThresholdO");
        DataDelete("SET_DrawOverdriveColorR");
        DataDelete("SET_DrawOverdriveColorG");
        DataDelete("SET_DrawOverdriveColorB");
        DataDelete("SET_DrawOverdriveColorA");
        DataDelete("SET_WaveformBack");
        DataDelete("SET_WaveformFore");
        DataDelete("SET_BufLength");
        DataDelete("SET_BufTick");
        DataDelete("SET_AudioModeR");
        DataDelete("SET_AudioModeG");
        DataDelete("SET_AudioModeB");
        DataDelete("SET_AudioGainR");
        DataDelete("SET_AudioGainG");
        DataDelete("SET_AudioGainB");

        DataDelete("DISP_Gain");
        DataDelete("DISP_Reso");
        DataDelete("DISP_Wind");
        DataDelete("DISP_Zoom");
        DataDelete("DISP_Offs");
        DataDelete("DISP_Step");
        DataDelete("DISP_Base");
        DataDelete("DISP_MiMa");
        DataDelete("DISP_Line");
        DataDelete("DISP_Mode");
        DataDelete("DISP_VU__");

        DataDelete("SET_MarkerSThickness");
        
        // scale.js
        DataDelete("SET_DrawLog");
        DataDelete("SET_DrawLogBase");
        DataDelete("SET_DrawLogFactor");
        DataDelete("SET_DrawLogOffset");
        DataDelete("SET_ScaleSetLogMode");
        DataDelete("SET_ScaleSetLog");
        DataDelete("SET_ScaleSetLogBase");
        DataDelete("SET_ScaleSetLogFactor");
        DataDelete("SET_ScaleSetLogOffset");
        DataDelete("SET_ScaleSetLogStep");
        DataDelete("SET_ScaleSetLogHiQuality");
    }

    // Reset stereo scope
    if (M == 5)
    {
        // scope.js
        DataDelete("SET_ScopeW");
        DataDelete("SET_ScopeH");
        DataDelete("SET_ScopeScaleW");
        DataDelete("SET_ScopeScaleH");
        DataDelete("SET_ScopeFactor");
        DataDelete("SET_ScopeDimming");
        DataDelete("SET_ScopeGainX");
        DataDelete("SET_ScopeGainY");
        DataDelete("SET_ScopeGainZ");
        DataDelete("SET_ScopePixelFactor");
        DataDelete("SET_ScopeToolbarPosition");
        DataDelete("SET_ScopeToolbarSize");
        DataDelete("SET_ScopeBackColorR");
        DataDelete("SET_ScopeBackColorG");
        DataDelete("SET_ScopeBackColorB");
        DataDelete("SET_ScopeAudioR");
        DataDelete("SET_ScopeAudioG");
        DataDelete("SET_ScopeAudioB");

        DataDelete("SET_ScopePlotMidSide");
        DataDelete("SET_ScopeOrientation");
        DataDelete("SET_ScopeStep");
    }

    // Reset filter settings
    if (M == 6)
    {
        // filter.js
        DataDelete("SET_FilterEnabled");
        DataDelete("SET_FilterToolbarPosition");
        DataDelete("SET_FilterToolbarSize");
        DataDelete("SET_Filter_FilterLevMin");
        DataDelete("SET_Filter_FilterLevMax");
        DataDelete("SET_Filter_FilterFFT");
        DataDelete("SET_Filter_Canvas");
        DataDelete("SET_FilterOrientation");
        DataDelete("SET_FilterColorBackR");
        DataDelete("SET_FilterColorBackG");
        DataDelete("SET_FilterColorBackB");
        DataDelete("SET_FilterColorZeroR");
        DataDelete("SET_FilterColorZeroG");
        DataDelete("SET_FilterColorZeroB");
        DataDelete("SET_FilterColorSpecR");
        DataDelete("SET_FilterColorSpecG");
        DataDelete("SET_FilterColorSpecB");
        DataDelete("SET_FilterColorLineR");
        DataDelete("SET_FilterColorLineG");
        DataDelete("SET_FilterColorLineB");

        DataDelete("SET_FilterSlotCurrent");
        DataDelete("SET_FilterValueStep");

        DataDelete("SET_MarkerFThickness");
    }

    // Clear filter slots
    if (M == 7)
    {
        // filterobj.js
        DataDelete("OBJ_Filter_Slot0");
        DataDelete("OBJ_Filter_Slot1");
        DataDelete("OBJ_Filter_Slot2");
        DataDelete("OBJ_Filter_Slot3");
    }

    // Clear process slots
    if (M == 8)
    {
        // processstorage.js
        DataDelete("OBJ_Process_Slot0");
        DataDelete("OBJ_Process_Slot0_Filter");
        DataDelete("OBJ_Process_Slot1");
        DataDelete("OBJ_Process_Slot1_Filter");
        DataDelete("OBJ_Process_Slot2");
        DataDelete("OBJ_Process_Slot2_Filter");
        DataDelete("OBJ_Process_Slot3");
        DataDelete("OBJ_Process_Slot3_Filter");
        DataDelete("OBJ_Process_Slot4");
        DataDelete("OBJ_Process_Slot4_Filter");
        DataDelete("OBJ_Process_Slot5");
        DataDelete("OBJ_Process_Slot5_Filter");
        DataDelete("OBJ_Process_Slot6");
        DataDelete("OBJ_Process_Slot6_Filter");
        DataDelete("OBJ_Process_Slot7");
        DataDelete("OBJ_Process_Slot7_Filter");
        DataDelete("OBJ_Process_Slot8");
        DataDelete("OBJ_Process_Slot8_Filter");
        DataDelete("OBJ_Process_Slot9");
        DataDelete("OBJ_Process_Slot9_Filter");
    }

    // Clear frequency markers
    if (M == 9)
    {
        // marker.js
        for (var I = 0; I < 10; I++)
        {
            DataDelete("SET_Marker" + I + "Vis");
            DataDelete("SET_Marker" + I + "ColorR");
            DataDelete("SET_Marker" + I + "ColorG");
            DataDelete("SET_Marker" + I + "ColorB");
            DataDelete("SET_Marker" + I + "Freq");
            DataDelete("SET_Marker" + I + "Unit");
        }
    }
    
    // Clear strip coloring
    if (M == 10)
    {
        ScaleTextClear();
    }
}
