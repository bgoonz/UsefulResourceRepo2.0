using System;

namespace ApplicationDomains
{
	class AppMain
	{
		static void Main(string[] args)
		{
         // Grab a reference to the current domain
         AppDomain myDomain = AppDomain.CurrentDomain;

         // Show some info about our current app domain
         Console.WriteLine("Info about our current app domain ...");
         Console.WriteLine("  Hash Code = {0}", myDomain.GetHashCode());
         Console.WriteLine("  Friendly Name = {0}", myDomain.FriendlyName);
         Console.WriteLine("  App Base = {0}", myDomain.BaseDirectory);
         
         // Create a new domain and assign the name "MathClient"
         AppDomain mathDomain = AppDomain.CreateDomain("MathClient");

         // Tell the domain to execute the MathClient assembly. This assumes
         // the assembly is in the same folder as the current applicaiton.			
         mathDomain.ExecuteAssembly("MathClient.exe");
		}
	}
}
