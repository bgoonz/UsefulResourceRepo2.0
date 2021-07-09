using System;
using System.Runtime.InteropServices;
using System.Text;

namespace GetComputerNameExample
{
	class Class1
	{

		[ DllImport( "kernel32.dll" ) ]
		static extern bool GetComputerName( StringBuilder name, ref ulong size );

		[STAThread]
		static void Main(string[] args)
		{
			ulong size = 256;
			StringBuilder name = new StringBuilder( (int)size );
			bool success = GetComputerName( name, ref size );
			System.Console.WriteLine( name.ToString() );
		}
	}
}
