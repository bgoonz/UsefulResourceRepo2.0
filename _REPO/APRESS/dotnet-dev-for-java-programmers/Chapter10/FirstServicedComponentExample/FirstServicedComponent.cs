using System;
using System.EnterpriseServices;
using System.Runtime.InteropServices;

namespace FirstServicedComponentExample
{
	[ Transaction ]
	[ ComponentAccessControl]
	[ SecurityRole( "FSCUser" ) ]
	public class FirstServicedComponent : ServicedComponent
	{
		public FirstServicedComponent()
		{
		}

		[ AutoComplete ]
		public void NewAccount( string name )
		{
			using ( Person p = new Person() )
			{
				p.Name = name;
				p.Save();
				using ( Account a = new Account() )
				{
					a.PersonId = p.Id;
					a.Save();
				}
			}
		}
	}
}
