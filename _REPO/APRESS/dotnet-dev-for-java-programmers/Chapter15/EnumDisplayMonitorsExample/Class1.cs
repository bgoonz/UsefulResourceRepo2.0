using System;
using System.Runtime.InteropServices;

namespace EnumDisplayMonitorsExample
{
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
		delegate bool MonitorEnumDelegate( IntPtr hMonitor,
			IntPtr hdcMonitor,
			ref Rect lprcMonitor, 
			IntPtr dwData );

		[ DllImport( "user32.dll" ) ]
		static extern bool EnumDisplayMonitors( IntPtr hdc, 
			IntPtr lprcClip,
			MonitorEnumDelegate lpfnEnum,
			IntPtr dwData );

		[ DllImport( "user32.dll" ) ]
		static extern bool GetMonitorInfo( IntPtr hmon, 
			ref MonitorInfo mi );

		
		static bool MonitorEnum( IntPtr hMonitor, 
			IntPtr hdcMonitor,
			ref Rect lprcMonitor, 
			IntPtr dwData )
		{
			MonitorInfo mi = new MonitorInfo();
			mi.size = (uint)Marshal.SizeOf( mi );
			bool success = GetMonitorInfo( hMonitor, ref mi );

			// do something with the information

			return true;
		}

		[STAThread]
		static void Main(string[] args)
		{
			MonitorEnumDelegate med = new MonitorEnumDelegate( MonitorEnum );
			EnumDisplayMonitors( IntPtr.Zero, IntPtr.Zero, med, IntPtr.Zero );
		}
	}
}
