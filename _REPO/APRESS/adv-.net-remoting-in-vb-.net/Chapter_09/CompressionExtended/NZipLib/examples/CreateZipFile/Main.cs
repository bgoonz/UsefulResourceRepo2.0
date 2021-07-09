// project created on 10.11.2001 at 13:09
using System;
using System.IO;

using NZlib.Zip;

class MainClass
{
	public static void Main(string[] args)
	{
		string[] filenames = Directory.GetFiles(args[0]);
		
		ZipOutputStream s = new ZipOutputStream(File.Create(args[1]));
		
		s.SetLevel(5); // 0 - store only to 9 - means best compression
		
		foreach (string file in filenames) {
			FileStream fs = File.OpenRead(file);
			
			byte[] buffer = new byte[fs.Length];
			fs.Read(buffer, 0, buffer.Length);
			
			ZipEntry entry = new ZipEntry(file);
			
			s.PutNextEntry(entry);
			
			s.Write(buffer, 0, buffer.Length);
			
		}
		
		s.Finish();
		s.Close();
	}
}
