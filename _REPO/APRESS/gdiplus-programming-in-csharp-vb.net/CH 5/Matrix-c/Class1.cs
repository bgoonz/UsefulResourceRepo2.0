using System;
using System.Drawing;
using System.Drawing.Drawing2D;

namespace Matrix_c
{
	class Class1
	{
		[STAThread]
		static void Main(string[] args)
		{
      Matrix m = new Matrix();
      m.Rotate(90, MatrixOrder.Append);
      m.Translate(7, 12, MatrixOrder.Append);
      Point[] p = {new Point(20, 45)};
      Console.WriteLine(p.GetValue(0).ToString());
      m.TransformPoints(p);
      Console.WriteLine(p.GetValue(0).ToString());

      Console.ReadLine();
    }
	}
}
