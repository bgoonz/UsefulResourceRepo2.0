using System;
using System.ComponentModel;

namespace BareBonesComponentLibrary
{
	/// <summary>
	/// Summary description for BareBonesComponent.
	/// </summary>
	public class BareBonesComponent : Component
	{
		public BareBonesComponent()
		{
		}

		private string m_message;

		public string Message
		{
			get
			{
				return m_message;
			}
			set
			{
				m_message = value;
			}
		}
	}
}
