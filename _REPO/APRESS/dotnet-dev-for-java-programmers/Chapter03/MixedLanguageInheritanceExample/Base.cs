using System;

namespace MixedLanguageInheritanceExample
{
	/// <summary>
	/// Summary description for Base.
	/// </summary>
	public abstract class Base
	{
		protected abstract string GetFrom();

		public void SayIt()
		{
			System.Console.WriteLine( "Hello from " + GetFrom() );
		}
	}
}
