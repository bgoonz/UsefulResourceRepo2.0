using System;
using System.Runtime.InteropServices;

namespace GetMonitorInfoExample
{
	[ StructLayout( LayoutKind.Explicit ) ]
	struct Point
	{
		[ FieldOffset( 0 ) ]
		public int x;
		[ FieldOffset( 4 ) ]
		public int y;
	}

	[ StructLayout( LayoutKind.Sequential ) ]
	struct Rect
	{
		public int left;
		public int top;
		public int right;
		public int bottom;
	}

	[ StructLayout( LayoutKind.Sequential ) ]
	struct MonitorInfo
	{
		public uint size;
		public Rect monitor;
		public Rect work;
		public uint flags;
	}

	class Class1
	{
		[ DllImport( "user32.dll" ) ]
		static extern IntPtr MonitorFromPoint( Point p, uint flags );

		[ DllImport( "user32.dll" ) ]
		static extern bool GetMonitorInfo( IntPtr hmon, ref MonitorInfo mi );

		[STAThread]
		static void Main(string[] args)
		{
			Point p = new Point();
			p.x = 1;
			p.y = 1;
			IntPtr hmon = MonitorFromPoint( p, 1 );

			MonitorInfo mi = new MonitorInfo();
			mi.size = (uint)Marshal.SizeOf( mi );
            bool success = GetMonitorInfo( hmon, ref mi );

			// do something with the information
		}
	}
}
