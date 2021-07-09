using System;
using MathLibrary;
using System.Reflection;

namespace MathClient
{  
	public class MathClient
	{
		static void Main(string[] args)
		{
         Console.WriteLine(" 5 + 3 = {0}", 
            SimpleMath.Add(5,3));

         Console.WriteLine(" 5 - 3 = {0}", 
            SimpleMath.Subtract(5,3));

         Console.ReadLine();
		}
	}
}
