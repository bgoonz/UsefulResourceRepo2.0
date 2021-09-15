const ArrU = String.fromCharCode(708);
const ArrD = String.fromCharCode(709);
const ArrR = String.fromCharCode(707);
const ArrL = String.fromCharCode(706);
const ArrU_ = "&#708;";
const ArrD_ = "&#709;";
const ArrR_ = "&#707;";
const ArrL_ = "&#706;";


/*
Base	X	Y	XY	Flip	90clk	90anti	180
0	7	5	4	6	1	3	2
1	6	4	5	7	2	0	3
2	5	7	6	4	3	1	0
3	4	6	7	5	0	2	1
4	3	1	0	2	7	5	6
5	2	0	1	3	4	6	7
6	1	3	2	0	5	7	4
7	0	2	3	1	6	4	5
*/

var DrawOrientationTransform_ = new Array(8)
DrawOrientationTransform_[0] = [7, 5, 4, 6, 1, 3, 2];
DrawOrientationTransform_[1] = [6, 4, 5, 7, 2, 0, 3];
DrawOrientationTransform_[2] = [5, 7, 6, 4, 3, 1, 0];
DrawOrientationTransform_[3] = [4, 6, 7, 5, 0, 2, 1];
DrawOrientationTransform_[4] = [3, 1, 0, 2, 7, 5, 6];
DrawOrientationTransform_[5] = [2, 0, 1, 3, 4, 6, 7];
DrawOrientationTransform_[6] = [1, 3, 2, 0, 5, 7, 4];
DrawOrientationTransform_[7] = [0, 2, 3, 1, 6, 4, 5];

function DrawOrientationRot(N)
{
    if ((N == 1) || (N == 3) || (N == 4) || (N == 6))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function DrawOrientationTransform(N, Id)
{
    return DrawOrientationTransform_[N][Id];
}

var DrawRect = function(CanvasD, CanvasW, CanvasH, X, Y, W, H, ColorR, ColorG, ColorB)
{
}

function DrawRect0(CanvasD, CanvasW, CanvasH, X, Y, W, H, ColorR, ColorG, ColorB)
{
    if (X < 0) { W = W + X; X = 0; }
    if (Y < 0) { H = H + Y; Y = 0; }
    if (X + W > CanvasW) { W = CanvasW - X; }
    if (Y + H > CanvasH) { H = CanvasH - Y; }
    for (var YY = 0; YY < H; YY++)
    {
        for (var XX = 0; XX < W; XX++)
        {
            var Offset = ((Y + YY) * CanvasW + (X + XX)) << 2;
            CanvasD.data[Offset + 0] = ColorR;
            CanvasD.data[Offset + 1] = ColorG;
            CanvasD.data[Offset + 2] = ColorB;
        }
    }
}

function DrawRect1(CanvasD, CanvasW, CanvasH, X, Y, W, H, ColorR, ColorG, ColorB)
{
    if (X < 0) { W = W + X; X = 0; }
    if (Y < 0) { H = H + Y; Y = 0; }
    if (X + W > CanvasH) { W = CanvasH - X; }
    if (Y + H > CanvasW) { H = CanvasW - Y; }
    for (var YY = 0; YY < W; YY++)
    {
        for (var XX = 0; XX < H; XX++)
        {
            var Offset = ((X + YY) * CanvasW + (CanvasW - H - Y + XX)) << 2;
            CanvasD.data[Offset + 0] = ColorR;
            CanvasD.data[Offset + 1] = ColorG;
            CanvasD.data[Offset + 2] = ColorB;
        }
    }
}

function DrawRect2(CanvasD, CanvasW, CanvasH, X, Y, W, H, ColorR, ColorG, ColorB)
{
    if (X < 0) { W = W + X; X = 0; }
    if (Y < 0) { H = H + Y; Y = 0; }
    if (X + W > CanvasW) { W = CanvasW - X; }
    if (Y + H > CanvasH) { H = CanvasH - Y; }
    for (var YY = 0; YY < H; YY++)
    {
        for (var XX = 0; XX < W; XX++)
        {
            var Offset = ((CanvasH - H - Y + YY) * CanvasW + (CanvasW - W - X + XX)) << 2;
            CanvasD.data[Offset + 0] = ColorR;
            CanvasD.data[Offset + 1] = ColorG;
            CanvasD.data[Offset + 2] = ColorB;
        }
    }
}

function DrawRect3(CanvasD, CanvasW, CanvasH, X, Y, W, H, ColorR, ColorG, ColorB)
{
    if (X < 0) { W = W + X; X = 0; }
    if (Y < 0) { H = H + Y; Y = 0; }
    if (X + W > CanvasH) { W = CanvasH - X; }
    if (Y + H > CanvasW) { H = CanvasW - Y; }
    for (var YY = 0; YY < W; YY++)
    {
        for (var XX = 0; XX < H; XX++)
        {
            var Offset = ((CanvasH - W - X + YY) * CanvasW + (Y + XX)) << 2;
            CanvasD.data[Offset + 0] = ColorR;
            CanvasD.data[Offset + 1] = ColorG;
            CanvasD.data[Offset + 2] = ColorB;
        }
    }
}

function DrawRect4(CanvasD, CanvasW, CanvasH, X, Y, W, H, ColorR, ColorG, ColorB)
{
    if (X < 0) { W = W + X; X = 0; }
    if (Y < 0) { H = H + Y; Y = 0; }
    if (X + W > CanvasH) { W = CanvasH - X; }
    if (Y + H > CanvasW) { H = CanvasW - Y; }
    for (var YY = 0; YY < H; YY++)
    {
        for (var XX = 0; XX < W; XX++)
        {
            var Offset = ((X + XX) * CanvasW + (Y + YY)) << 2;
            CanvasD.data[Offset + 0] = ColorR;
            CanvasD.data[Offset + 1] = ColorG;
            CanvasD.data[Offset + 2] = ColorB;
        }
    }
}

function DrawRect5(CanvasD, CanvasW, CanvasH, X, Y, W, H, ColorR, ColorG, ColorB)
{
    if (X < 0) { W = W + X; X = 0; }
    if (Y < 0) { H = H + Y; Y = 0; }
    if (X + W > CanvasW) { W = CanvasW - X; }
    if (Y + H > CanvasH) { H = CanvasH - Y; }
    for (var YY = 0; YY < W; YY++)
    {
        for (var XX = 0; XX < H; XX++)
        {
            var Offset = ((CanvasH - H - Y + XX) * CanvasW + (X + YY)) << 2;
            CanvasD.data[Offset + 0] = ColorR;
            CanvasD.data[Offset + 1] = ColorG;
            CanvasD.data[Offset + 2] = ColorB;
        }
    }
}

function DrawRect6(CanvasD, CanvasW, CanvasH, X, Y, W, H, ColorR, ColorG, ColorB)
{
    if (X < 0) { W = W + X; X = 0; }
    if (Y < 0) { H = H + Y; Y = 0; }
    if (X + W > CanvasH) { W = CanvasH - X; }
    if (Y + H > CanvasW) { H = CanvasW - Y; }
    for (var YY = 0; YY < H; YY++)
    {
        for (var XX = 0; XX < W; XX++)
        {
            var Offset = ((CanvasH - W - X + XX) * CanvasW + (CanvasW - H - Y + YY)) << 2;
            CanvasD.data[Offset + 0] = ColorR;
            CanvasD.data[Offset + 1] = ColorG;
            CanvasD.data[Offset + 2] = ColorB;
        }
    }
}

function DrawRect7(CanvasD, CanvasW, CanvasH, X, Y, W, H, ColorR, ColorG, ColorB)
{
    if (X < 0) { W = W + X; X = 0; }
    if (Y < 0) { H = H + Y; Y = 0; }
    if (X + W > CanvasW) { W = CanvasW - X; }
    if (Y + H > CanvasH) { H = CanvasH - Y; }
    for (var YY = 0; YY < W; YY++)
    {
        for (var XX = 0; XX < H; XX++)
        {
            var Offset = ((Y + XX) * CanvasW + (CanvasW - W - X + YY)) << 2;
            CanvasD.data[Offset + 0] = ColorR;
            CanvasD.data[Offset + 1] = ColorG;
            CanvasD.data[Offset + 2] = ColorB;
        }
    }
}


var DrawRectX = function(CanvasD, CanvasW, CanvasH, X, Y, W, ColorR, ColorG, ColorB)
{
}

function DrawRectX0(CanvasD, CanvasW, CanvasH, X, Y, W, ColorR, ColorG, ColorB)
{
    if (Y < 0) { return; }
    if (Y + 1 > CanvasH) { return; }
    if (X < 0) { W = W + X; X = 0; }
    if (X + W > CanvasW) { W = CanvasW - X; }
    for (var XX = 0; XX < W; XX++)
    {
        var Offset = ((Y) * CanvasW + (X + XX)) << 2;
        CanvasD.data[Offset + 0] = ColorR;
        CanvasD.data[Offset + 1] = ColorG;
        CanvasD.data[Offset + 2] = ColorB;
    }
}

function DrawRectX1(CanvasD, CanvasW, CanvasH, X, Y, W, ColorR, ColorG, ColorB)
{
    if (Y < 0) { return; }
    if (Y + 1 > CanvasW) { return; }
    if (X < 0) { W = W + X; X = 0; }
    if (X + W > CanvasH) { W = CanvasH - X; }
    for (var YY = 0; YY < W; YY++)
    {
        var Offset = ((X + YY) * CanvasW + (CanvasW - 1 - Y)) << 2;
        CanvasD.data[Offset + 0] = ColorR;
        CanvasD.data[Offset + 1] = ColorG;
        CanvasD.data[Offset + 2] = ColorB;
    }
}

function DrawRectX2(CanvasD, CanvasW, CanvasH, X, Y, W, ColorR, ColorG, ColorB)
{
    if (Y < 0) { return; }
    if (Y + 1 > CanvasH) { return; }
    if (X < 0) { W = W + X; X = 0; }
    if (X + W > CanvasW) { W = CanvasW - X; }
    for (var XX = 0; XX < W; XX++)
    {
        var Offset = ((CanvasH - 1 - Y) * CanvasW + (CanvasW - W - X + XX)) << 2;
        CanvasD.data[Offset + 0] = ColorR;
        CanvasD.data[Offset + 1] = ColorG;
        CanvasD.data[Offset + 2] = ColorB;
    }
}

function DrawRectX3(CanvasD, CanvasW, CanvasH, X, Y, W, ColorR, ColorG, ColorB)
{
    if (Y < 0) { return; }
    if (Y + 1 > CanvasW) { return; }
    if (X < 0) { W = W + X; X = 0; }
    if (X + W > CanvasH) { W = CanvasH - X; }
    for (var YY = 0; YY < W; YY++)
    {
        var Offset = ((CanvasH - W - X + YY) * CanvasW + (Y)) << 2;
        CanvasD.data[Offset + 0] = ColorR;
        CanvasD.data[Offset + 1] = ColorG;
        CanvasD.data[Offset + 2] = ColorB;
    }
}

function DrawRectX4(CanvasD, CanvasW, CanvasH, X, Y, W, ColorR, ColorG, ColorB)
{
    if (Y < 0) { return; }
    if (Y + 1 > CanvasW) { return; }
    if (X < 0) { W = W + X; X = 0; }
    if (X + W > CanvasH) { W = CanvasH - X; }
    for (var XX = 0; XX < W; XX++)
    {
        var Offset = ((X + XX) * CanvasW + (Y)) << 2;
        CanvasD.data[Offset + 0] = ColorR;
        CanvasD.data[Offset + 1] = ColorG;
        CanvasD.data[Offset + 2] = ColorB;
    }
}

function DrawRectX5(CanvasD, CanvasW, CanvasH, X, Y, W, ColorR, ColorG, ColorB)
{
    if (Y < 0) { return; }
    if (Y + 1 > CanvasH) { return; }
    if (X < 0) { W = W + X; X = 0; }
    if (X + W > CanvasW) { W = CanvasW - X; }
    for (var YY = 0; YY < W; YY++)
    {
        var Offset = ((CanvasH - 1 - Y) * CanvasW + (X + YY)) << 2;
        CanvasD.data[Offset + 0] = ColorR;
        CanvasD.data[Offset + 1] = ColorG;
        CanvasD.data[Offset + 2] = ColorB;
    }
}

function DrawRectX6(CanvasD, CanvasW, CanvasH, X, Y, W, ColorR, ColorG, ColorB)
{
    if (Y < 0) { return; }
    if (Y + 1 > CanvasW) { return; }
    if (X < 0) { W = W + X; X = 0; }
    if (X + W > CanvasH) { W = CanvasH - X; }
    for (var XX = 0; XX < W; XX++)
    {
        var Offset = ((CanvasH - W - X + XX) * CanvasW + (CanvasW - 1 - Y)) << 2;
        CanvasD.data[Offset + 0] = ColorR;
        CanvasD.data[Offset + 1] = ColorG;
        CanvasD.data[Offset + 2] = ColorB;
    }
}

function DrawRectX7(CanvasD, CanvasW, CanvasH, X, Y, W, ColorR, ColorG, ColorB)
{
    if (Y < 0) { return; }
    if (Y + 1 > CanvasH) { return; }
    if (X < 0) { W = W + X; X = 0; }
    if (X + W > CanvasW) { W = CanvasW - X; }
    for (var YY = 0; YY < W; YY++)
    {
        var Offset = ((Y) * CanvasW + (CanvasW - W - X + YY)) << 2;
        CanvasD.data[Offset + 0] = ColorR;
        CanvasD.data[Offset + 1] = ColorG;
        CanvasD.data[Offset + 2] = ColorB;
    }
}

var DrawRectY = function(CanvasD, CanvasW, CanvasH, X, Y, H, ColorR, ColorG, ColorB)
{
}

function DrawRectY0(CanvasD, CanvasW, CanvasH, X, Y, H, ColorR, ColorG, ColorB)
{
    if (X < 0) { return; }
    if (X + 1 > CanvasW) { return; }
    if (Y < 0) { H = H + Y; Y = 0; }
    if (Y + H > CanvasH) { H = CanvasH - Y; }
    for (var YY = 0; YY < H; YY++)
    {
        var Offset = ((Y + YY) * CanvasW + (X)) << 2;
        CanvasD.data[Offset + 0] = ColorR;
        CanvasD.data[Offset + 1] = ColorG;
        CanvasD.data[Offset + 2] = ColorB;
    }
}

function DrawRectY1(CanvasD, CanvasW, CanvasH, X, Y, H, ColorR, ColorG, ColorB)
{
    if (X < 0) { return; }
    if (X + 1 > CanvasH) { return; }
    if (Y < 0) { H = H + Y; Y = 0; }
    if (Y + H > CanvasW) { H = CanvasW - Y; }
    for (var XX = 0; XX < H; XX++)
    {
        var Offset = ((X) * CanvasW + (CanvasW - H - Y + XX)) << 2;
        CanvasD.data[Offset + 0] = ColorR;
        CanvasD.data[Offset + 1] = ColorG;
        CanvasD.data[Offset + 2] = ColorB;
    }
}

function DrawRectY2(CanvasD, CanvasW, CanvasH, X, Y, H, ColorR, ColorG, ColorB)
{
    if (X < 0) { return; }
    if (X + 1 > CanvasW) { return; }
    if (Y < 0) { H = H + Y; Y = 0; }
    if (Y + H > CanvasH) { H = CanvasH - Y; }
    for (var YY = 0; YY < H; YY++)
    {
        var Offset = ((CanvasH - H - Y + YY) * CanvasW + (CanvasW - 1 - X)) << 2;
        CanvasD.data[Offset + 0] = ColorR;
        CanvasD.data[Offset + 1] = ColorG;
        CanvasD.data[Offset + 2] = ColorB;
    }
}

function DrawRectY3(CanvasD, CanvasW, CanvasH, X, Y, H, ColorR, ColorG, ColorB)
{
    if (X < 0) { return; }
    if (X + 1 > CanvasH) { return; }
    if (Y < 0) { H = H + Y; Y = 0; }
    if (Y + H > CanvasW) { H = CanvasW - Y; }
    for (var XX = 0; XX < H; XX++)
    {
        var Offset = ((CanvasH - 1 - X) * CanvasW + (Y + XX)) << 2;
        CanvasD.data[Offset + 0] = ColorR;
        CanvasD.data[Offset + 1] = ColorG;
        CanvasD.data[Offset + 2] = ColorB;
    }
}

function DrawRectY4(CanvasD, CanvasW, CanvasH, X, Y, H, ColorR, ColorG, ColorB)
{
    if (X < 0) { return; }
    if (X + 1 > CanvasH) { return; }
    if (Y < 0) { H = H + Y; Y = 0; }
    if (Y + H > CanvasW) { H = CanvasW - Y; }
    for (var YY = 0; YY < H; YY++)
    {
        var Offset = ((X) * CanvasW + (Y + YY)) << 2;
        CanvasD.data[Offset + 0] = ColorR;
        CanvasD.data[Offset + 1] = ColorG;
        CanvasD.data[Offset + 2] = ColorB;
    }
}

function DrawRectY5(CanvasD, CanvasW, CanvasH, X, Y, H, ColorR, ColorG, ColorB)
{
    if (X < 0) { return; }
    if (X + 1 > CanvasW) { return; }
    if (Y < 0) { H = H + Y; Y = 0; }
    if (Y + H > CanvasH) { H = CanvasH - Y; }
    for (var XX = 0; XX < H; XX++)
    {
        var Offset = ((CanvasH - H - Y + XX) * CanvasW + (X)) << 2;
        CanvasD.data[Offset + 0] = ColorR;
        CanvasD.data[Offset + 1] = ColorG;
        CanvasD.data[Offset + 2] = ColorB;
    }
}

function DrawRectY6(CanvasD, CanvasW, CanvasH, X, Y, H, ColorR, ColorG, ColorB)
{
    if (X < 0) { return; }
    if (X + 1 > CanvasH) { return; }
    if (Y < 0) { H = H + Y; Y = 0; }
    if (Y + H > CanvasW) { H = CanvasW - Y; }
    for (var YY = 0; YY < H; YY++)
    {
        var Offset = ((CanvasH - 1 - X) * CanvasW + (CanvasW - H - Y + YY)) << 2;
        CanvasD.data[Offset + 0] = ColorR;
        CanvasD.data[Offset + 1] = ColorG;
        CanvasD.data[Offset + 2] = ColorB;
    }
}

function DrawRectY7(CanvasD, CanvasW, CanvasH, X, Y, H, ColorR, ColorG, ColorB)
{
    if (X < 0) { return; }
    if (X + 1 > CanvasW) { return; }
    if (Y < 0) { H = H + Y; Y = 0; }
    if (Y + H > CanvasH) { H = CanvasH - Y; }
    for (var XX = 0; XX < H; XX++)
    {
        var Offset = ((Y + XX) * CanvasW + (CanvasW - 1 - X)) << 2;
        CanvasD.data[Offset + 0] = ColorR;
        CanvasD.data[Offset + 1] = ColorG;
        CanvasD.data[Offset + 2] = ColorB;
    }
}

var DrawPxl = function(CanvasD, CanvasW, CanvasH, X, Y, ColorR, ColorG, ColorB)
{
}

function DrawPxl0(CanvasD, CanvasW, CanvasH, X, Y, ColorR, ColorG, ColorB)
{
    if (X < 0) { return; }
    if (Y < 0) { return; }
    if (X + 1 > CanvasW) { return; }
    if (Y + 1 > CanvasH) { return; }
    var Offset = ((Y) * CanvasW + (X)) << 2;
    CanvasD.data[Offset + 0] = ColorR;
    CanvasD.data[Offset + 1] = ColorG;
    CanvasD.data[Offset + 2] = ColorB;
}

function DrawPxl1(CanvasD, CanvasW, CanvasH, X, Y, ColorR, ColorG, ColorB)
{
    if (X < 0) { return; }
    if (Y < 0) { return; }
    if (X + 1 > CanvasH) { return; }
    if (Y + 1 > CanvasW) { return; }
    var Offset = ((X) * CanvasW + (CanvasW - 1 - Y)) << 2;
    CanvasD.data[Offset + 0] = ColorR;
    CanvasD.data[Offset + 1] = ColorG;
    CanvasD.data[Offset + 2] = ColorB;
}

function DrawPxl2(CanvasD, CanvasW, CanvasH, X, Y, ColorR, ColorG, ColorB)
{
    if (X < 0) { return; }
    if (Y < 0) { return; }
    if (X + 1 > CanvasW) { return; }
    if (Y + 1 > CanvasH) { return; }
    var Offset = ((CanvasH - 1 - Y) * CanvasW + (CanvasW - 1 - X)) << 2;
    CanvasD.data[Offset + 0] = ColorR;
    CanvasD.data[Offset + 1] = ColorG;
    CanvasD.data[Offset + 2] = ColorB;
}

function DrawPxl3(CanvasD, CanvasW, CanvasH, X, Y, ColorR, ColorG, ColorB)
{
    if (X < 0) { return; }
    if (Y < 0) { return; }
    if (X + 1 > CanvasH) { return; }
    if (Y + 1 > CanvasW) { return; }
    var Offset = ((CanvasH - 1 - X) * CanvasW + (Y)) << 2;
    CanvasD.data[Offset + 0] = ColorR;
    CanvasD.data[Offset + 1] = ColorG;
    CanvasD.data[Offset + 2] = ColorB;
}

function DrawPxl4(CanvasD, CanvasW, CanvasH, X, Y, ColorR, ColorG, ColorB)
{
    if (X < 0) { return; }
    if (Y < 0) { return; }
    if (X + 1 > CanvasH) { return; }
    if (Y + 1 > CanvasW) { return; }
    var Offset = ((X) * CanvasW + (Y)) << 2;
    CanvasD.data[Offset + 0] = ColorR;
    CanvasD.data[Offset + 1] = ColorG;
    CanvasD.data[Offset + 2] = ColorB;
}

function DrawPxl5(CanvasD, CanvasW, CanvasH, X, Y, ColorR, ColorG, ColorB)
{
    if (X < 0) { return; }
    if (Y < 0) { return; }
    if (X + 1 > CanvasW) { return; }
    if (Y + 1 > CanvasH) { return; }
    var Offset = ((CanvasH - 1 - Y) * CanvasW + (X)) << 2;
    CanvasD.data[Offset + 0] = ColorR;
    CanvasD.data[Offset + 1] = ColorG;
    CanvasD.data[Offset + 2] = ColorB;
}

function DrawPxl6(CanvasD, CanvasW, CanvasH, X, Y, ColorR, ColorG, ColorB)
{
    if (X < 0) { return; }
    if (Y < 0) { return; }
    if (X + 1 > CanvasH) { return; }
    if (Y + 1 > CanvasW) { return; }
    var Offset = ((CanvasH - 1 - X) * CanvasW + (CanvasW - 1 - Y)) << 2;
    CanvasD.data[Offset + 0] = ColorR;
    CanvasD.data[Offset + 1] = ColorG;
    CanvasD.data[Offset + 2] = ColorB;
}

function DrawPxl7(CanvasD, CanvasW, CanvasH, X, Y, ColorR, ColorG, ColorB)
{
    if (X < 0) { return; }
    if (Y < 0) { return; }
    if (X + 1 > CanvasW) { return; }
    if (Y + 1 > CanvasH) { return; }
    var Offset = ((Y) * CanvasW + (CanvasW - 1 - X)) << 2;
    CanvasD.data[Offset + 0] = ColorR;
    CanvasD.data[Offset + 1] = ColorG;
    CanvasD.data[Offset + 2] = ColorB;
}

var DrawCopy = function(CanvasD, CanvasW, CanvasH, X1, Y1, X2, Y2, W, H)
{
}

function DrawCopy0(CanvasD, CanvasW, CanvasH, X1, Y1, X2, Y2, W, H)
{
    if (X1 < 0) { W = W + X1; X1 = 0; }
    if (Y1 < 0) { H = H + Y1; Y1 = 0; }
    if (X2 < 0) { W = W + X2; X2 = 0; }
    if (Y2 < 0) { H = H + Y2; Y2 = 0; }
    if (X1 + W > CanvasW) { W = CanvasW - X1; }
    if (Y1 + H > CanvasH) { H = CanvasH - Y1; }
    if (X2 + W > CanvasW) { W = CanvasW - X2; }
    if (Y2 + H > CanvasH) { H = CanvasH - Y2; }
    for (var YY = 0; YY < H; YY++)
    {
        for (var XX = 0; XX < W; XX++)
        {
            var Offset1 = ((Y1 + YY) * CanvasW + (X1 + XX)) << 2;
            var Offset2 = ((Y2 + YY) * CanvasW + (X2 + XX)) << 2;
            CanvasD.data[Offset2 + 0] = CanvasD.data[Offset1 + 0];
            CanvasD.data[Offset2 + 1] = CanvasD.data[Offset1 + 1];
            CanvasD.data[Offset2 + 2] = CanvasD.data[Offset1 + 2];
        }
    }
}

function DrawCopy1(CanvasD, CanvasW, CanvasH, X1, Y1, X2, Y2, W, H)
{
    if (X1 < 0) { W = W + X1; X1 = 0; }
    if (Y1 < 0) { H = H + Y1; Y1 = 0; }
    if (X2 < 0) { W = W + X2; X2 = 0; }
    if (Y2 < 0) { H = H + Y2; Y2 = 0; }
    if (X1 + W > CanvasH) { W = CanvasH - X1; }
    if (Y1 + H > CanvasW) { H = CanvasW - Y1; }
    if (X2 + W > CanvasH) { W = CanvasH - X2; }
    if (Y2 + H > CanvasW) { H = CanvasW - Y2; }
    for (var YY = 0; YY < W; YY++)
    {
        for (var XX = 0; XX < H; XX++)
        {
            var Offset1 = ((X1 + YY) * CanvasW + (CanvasW - H - Y1 + XX)) << 2;
            var Offset2 = ((X2 + YY) * CanvasW + (CanvasW - H - Y2 + XX)) << 2;
            CanvasD.data[Offset2 + 0] = CanvasD.data[Offset1 + 0];
            CanvasD.data[Offset2 + 1] = CanvasD.data[Offset1 + 1];
            CanvasD.data[Offset2 + 2] = CanvasD.data[Offset1 + 2];
        }
    }
}

function DrawCopy2(CanvasD, CanvasW, CanvasH, X1, Y1, X2, Y2, W, H)
{
    if (X1 < 0) { W = W + X1; X1 = 0; }
    if (Y1 < 0) { H = H + Y1; Y1 = 0; }
    if (X2 < 0) { W = W + X2; X2 = 0; }
    if (Y2 < 0) { H = H + Y2; Y2 = 0; }
    if (X1 + W > CanvasW) { W = CanvasW - X1; }
    if (Y1 + H > CanvasH) { H = CanvasH - Y1; }
    if (X2 + W > CanvasW) { W = CanvasW - X2; }
    if (Y2 + H > CanvasH) { H = CanvasH - Y2; }
    for (var YY = 0; YY < H; YY++)
    {
        for (var XX = (W - 1); XX >= 0; XX--)
        {
            var Offset1 = ((CanvasH - H - Y1 + YY) * CanvasW + (CanvasW - W - X1 + XX)) << 2;
            var Offset2 = ((CanvasH - H - Y2 + YY) * CanvasW + (CanvasW - W - X2 + XX)) << 2;
            CanvasD.data[Offset2 + 0] = CanvasD.data[Offset1 + 0];
            CanvasD.data[Offset2 + 1] = CanvasD.data[Offset1 + 1];
            CanvasD.data[Offset2 + 2] = CanvasD.data[Offset1 + 2];
        }
    }
}

function DrawCopy3(CanvasD, CanvasW, CanvasH, X1, Y1, X2, Y2, W, H)
{
    if (X1 < 0) { W = W + X1; X1 = 0; }
    if (Y1 < 0) { H = H + Y1; Y1 = 0; }
    if (X2 < 0) { W = W + X2; X2 = 0; }
    if (Y2 < 0) { H = H + Y2; Y2 = 0; }
    if (X1 + W > CanvasH) { W = CanvasH - X1; }
    if (Y1 + H > CanvasW) { H = CanvasW - Y1; }
    if (X2 + W > CanvasH) { W = CanvasH - X2; }
    if (Y2 + H > CanvasW) { H = CanvasW - Y2; }
    for (var YY = (W - 1); YY >= 0; YY--)
    {
        for (var XX = 0; XX < H; XX++)
        {
            var Offset1 = ((CanvasH - W - X1 + YY) * CanvasW + (Y1 + XX)) << 2;
            var Offset2 = ((CanvasH - W - X2 + YY) * CanvasW + (Y2 + XX)) << 2;
            CanvasD.data[Offset2 + 0] = CanvasD.data[Offset1 + 0];
            CanvasD.data[Offset2 + 1] = CanvasD.data[Offset1 + 1];
            CanvasD.data[Offset2 + 2] = CanvasD.data[Offset1 + 2];
        }
    }
}

function DrawCopy4(CanvasD, CanvasW, CanvasH, X1, Y1, X2, Y2, W, H)
{
    if (X1 < 0) { W = W + X1; X1 = 0; }
    if (Y1 < 0) { H = H + Y1; Y1 = 0; }
    if (X2 < 0) { W = W + X2; X2 = 0; }
    if (Y2 < 0) { H = H + Y2; Y2 = 0; }
    if (X1 + W > CanvasH) { W = CanvasH - X1; }
    if (Y1 + H > CanvasW) { H = CanvasW - Y1; }
    if (X2 + W > CanvasH) { W = CanvasH - X2; }
    if (Y2 + H > CanvasW) { H = CanvasW - Y2; }
    for (var YY = 0; YY < H; YY++)
    {
        for (var XX = 0; XX < W; XX++)
        {
            var Offset1 = ((X1 + XX) * CanvasW + (Y1 + YY)) << 2;
            var Offset2 = ((X2 + XX) * CanvasW + (Y2 + YY)) << 2;
            CanvasD.data[Offset2 + 0] = CanvasD.data[Offset1 + 0];
            CanvasD.data[Offset2 + 1] = CanvasD.data[Offset1 + 1];
            CanvasD.data[Offset2 + 2] = CanvasD.data[Offset1 + 2];
        }
    }
}

function DrawCopy5(CanvasD, CanvasW, CanvasH, X1, Y1, X2, Y2, W, H)
{
    if (X1 < 0) { W = W + X1; X1 = 0; }
    if (Y1 < 0) { H = H + Y1; Y1 = 0; }
    if (X2 < 0) { W = W + X2; X2 = 0; }
    if (Y2 < 0) { H = H + Y2; Y2 = 0; }
    if (X1 + W > CanvasW) { W = CanvasW - X1; }
    if (Y1 + H > CanvasH) { H = CanvasH - Y1; }
    if (X2 + W > CanvasW) { W = CanvasW - X2; }
    if (Y2 + H > CanvasH) { H = CanvasH - Y2; }
    for (var YY = 0; YY < W; YY++)
    {
        for (var XX = 0; XX < H; XX++)
        {
            var Offset1 = ((CanvasH - H - Y1 + XX) * CanvasW + (X1 + YY)) << 2;
            var Offset2 = ((CanvasH - H - Y2 + XX) * CanvasW + (X2 + YY)) << 2;
            CanvasD.data[Offset2 + 0] = CanvasD.data[Offset1 + 0];
            CanvasD.data[Offset2 + 1] = CanvasD.data[Offset1 + 1];
            CanvasD.data[Offset2 + 2] = CanvasD.data[Offset1 + 2];
        }
    }
}

function DrawCopy6(CanvasD, CanvasW, CanvasH, X1, Y1, X2, Y2, W, H)
{
    if (X1 < 0) { W = W + X1; X1 = 0; }
    if (Y1 < 0) { H = H + Y1; Y1 = 0; }
    if (X2 < 0) { W = W + X2; X2 = 0; }
    if (Y2 < 0) { H = H + Y2; Y2 = 0; }
    if (X1 + W > CanvasH) { W = CanvasH - X1; }
    if (Y1 + H > CanvasW) { H = CanvasW - Y1; }
    if (X2 + W > CanvasH) { W = CanvasH - X2; }
    if (Y2 + H > CanvasW) { H = CanvasW - Y2; }
    for (var YY = 0; YY < H; YY++)
    {
        for (var XX = (W - 1); XX >= 0; XX--)
        {
            var Offset1 = ((CanvasH - W - X1 + XX) * CanvasW + (CanvasW - H - Y1 + YY)) << 2;
            var Offset2 = ((CanvasH - W - X2 + XX) * CanvasW + (CanvasW - H - Y2 + YY)) << 2;
            CanvasD.data[Offset2 + 0] = CanvasD.data[Offset1 + 0];
            CanvasD.data[Offset2 + 1] = CanvasD.data[Offset1 + 1];
            CanvasD.data[Offset2 + 2] = CanvasD.data[Offset1 + 2];
        }
    }
}

function DrawCopy7(CanvasD, CanvasW, CanvasH, X1, Y1, X2, Y2, W, H)
{
    if (X1 < 0) { W = W + X1; X1 = 0; }
    if (Y1 < 0) { H = H + Y1; Y1 = 0; }
    if (X2 < 0) { W = W + X2; X2 = 0; }
    if (Y2 < 0) { H = H + Y2; Y2 = 0; }
    if (X1 + W > CanvasW) { W = CanvasW - X1; }
    if (Y1 + H > CanvasH) { H = CanvasH - Y1; }
    if (X2 + W > CanvasW) { W = CanvasW - X2; }
    if (Y2 + H > CanvasH) { H = CanvasH - Y2; }
    for (var YY = (W - 1); YY >= 0; YY--)
    {
        for (var XX = 0; XX < H; XX++)
        {
            var Offset1 = ((Y1 + XX) * CanvasW + (CanvasW - W - X1 + YY)) << 2;
            var Offset2 = ((Y2 + XX) * CanvasW + (CanvasW - W - X2 + YY)) << 2;
            CanvasD.data[Offset2 + 0] = CanvasD.data[Offset1 + 0];
            CanvasD.data[Offset2 + 1] = CanvasD.data[Offset1 + 1];
            CanvasD.data[Offset2 + 2] = CanvasD.data[Offset1 + 2];
        }
    }
}

function DrawClear(CanvasD, CanvasW, CanvasH)
{
    var P = 0;
    for (var YY = 0; YY < CanvasH; YY++)
    {
        for (var XX = 0; XX < CanvasW; XX++)
        {
            CanvasD.data[P + 0] = 0;
            CanvasD.data[P + 1] = 0;
            CanvasD.data[P + 2] = 0;
            CanvasD.data[P + 3] = 255;
            P += 4;
        }
    }
}

function DrawRefresh(CanvasC, CanvasD)
{
    CanvasC.putImageData(CanvasD, 0, 0);
}

function DrawSet(N)
{
    switch (N)
    {
        case 0: DrawRect = DrawRect0; DrawRectX = DrawRectX0; DrawRectY = DrawRectY0; DrawPxl = DrawPxl0; DrawCopy = DrawCopy0; return false;
        case 1: DrawRect = DrawRect1; DrawRectX = DrawRectX1; DrawRectY = DrawRectY1; DrawPxl = DrawPxl1; DrawCopy = DrawCopy1; return true;
        case 2: DrawRect = DrawRect2; DrawRectX = DrawRectX2; DrawRectY = DrawRectY2; DrawPxl = DrawPxl2; DrawCopy = DrawCopy2; return false;
        case 3: DrawRect = DrawRect3; DrawRectX = DrawRectX3; DrawRectY = DrawRectY3; DrawPxl = DrawPxl3; DrawCopy = DrawCopy3; return true;
        case 4: DrawRect = DrawRect4; DrawRectX = DrawRectX4; DrawRectY = DrawRectY4; DrawPxl = DrawPxl4; DrawCopy = DrawCopy4; return true;
        case 5: DrawRect = DrawRect5; DrawRectX = DrawRectX5; DrawRectY = DrawRectY5; DrawPxl = DrawPxl5; DrawCopy = DrawCopy5; return false;
        case 6: DrawRect = DrawRect6; DrawRectX = DrawRectX6; DrawRectY = DrawRectY6; DrawPxl = DrawPxl6; DrawCopy = DrawCopy6; return true;
        case 7: DrawRect = DrawRect7; DrawRectX = DrawRectX7; DrawRectY = DrawRectY7; DrawPxl = DrawPxl7; DrawCopy = DrawCopy7; return false;
    }
}
