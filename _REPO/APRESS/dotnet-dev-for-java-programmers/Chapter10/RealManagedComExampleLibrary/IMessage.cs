using System;
using System.Runtime.InteropServices;

namespace RealManagedComExampleLibrary
{
	[ Guid ( "248B4080-D2AF-4af2-A541-F64A3949DED5" ) ]
	public interface IMessage
	{
		string Message
		{
			get;
			set;
		}
	}
}
