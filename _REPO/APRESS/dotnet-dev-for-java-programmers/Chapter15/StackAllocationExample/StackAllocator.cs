using System;
using System.Runtime.InteropServices;

namespace StackAllocationExample
{
	class StackAllocator
	{
		[ DllImport( "kernel32.dll" ) ]
		static extern unsafe bool GetComputerNameW( char* name, ref ulong size );

		[STAThread]
		static unsafe void Main(string[] args)
		{
			ulong size = 256;
			char* name = stackalloc char[ (int)size ];

			bool success = GetComputerNameW( name, ref size );

			for ( uint i = 0; i < size; i++, name++ )
			{
				System.Console.Write( *name );
			}
			System.Console.WriteLine();
		}
	}
}
