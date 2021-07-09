// project created on 10.11.2001 at 13:09
using System;
using System.Text;
using System.IO;

using NZlib.Zip;

class MainClass
{
	public static void Main(string[] args)
	{
		ZipInputStream s = new ZipInputStream(File.OpenRead(args[0]));
		
		ZipEntry theEntry;
		while ((theEntry = s.GetNextEntry()) != null) {
			Console.WriteLine(theEntry.Name);
			int size = 2048;
			byte[] data = new byte[2048];
			
			Console.Write("Show Entry (y/n) ?");
			if (Console.ReadLine() == "y") {
				while (true) {
					size = s.Read(data, 0, data.Length);
					if (size > 0) {
							Console.Write(new ASCIIEncoding().GetString(data));
					} else {
						break;
					}
				}
			}
			Console.WriteLine();
		}
		s.Close();
	}
}
