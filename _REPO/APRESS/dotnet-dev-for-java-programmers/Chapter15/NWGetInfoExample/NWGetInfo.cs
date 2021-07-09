using System;
using System.Runtime.InteropServices;
using System.Text;

namespace NWGetInfoExample
{
	class NWGetInfo
	{
		[ StructLayout( LayoutKind.Sequential ) ]
		struct WkstaInfo102
		{
			public uint platform_id;
			public IntPtr computername;
			public IntPtr langroup;
			public uint ver_major;
			public uint ver_minor;
			public IntPtr lanroot;
			public uint logged_on_users;
		}

		[ DllImport( "Netapi32.dll" ) ]
		static extern unsafe int NetWkstaGetInfo( IntPtr servername, 
			int level,        
			byte** bufptr );

		[ DllImport( "Netapi32.dll" ) ]
		static extern unsafe int NetApiBufferFree( byte* bufptr );

		[STAThread]
		static unsafe void Main(string[] args)
		{
			byte* bp = null;
			int rc = NetWkstaGetInfo( IntPtr.Zero, 102, &bp );

			WkstaInfo102* wip = (WkstaInfo102*)bp;
			System.Console.WriteLine( "System {0} has {1} users logged on",
				Marshal.PtrToStringAuto( wip->computername ),
				wip->logged_on_users );

			rc = NetApiBufferFree( bp );
		}
	}
}
