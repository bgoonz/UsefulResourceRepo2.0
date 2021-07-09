// ZipInputStream.cs
// Copyright (C) 2001 Mike Krueger
//
// This file was translated from java, it was part of the GNU Classpath
// Copyright (C) 2001 Free Software Foundation, Inc.
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
//
// As a special exception, if you link this library with other files to
// produce an executable, this library does not by itself cause the
// resulting executable to be covered by the GNU General Public License.
// This exception does not however invalidate any other reasons why the
// executable file might be covered by the GNU General Public License.

using System;
using System.Text;
using System.IO;

using NZlib.Checksums;
using NZlib.Compression;
using NZlib.Streams;

namespace NZlib.Zip {
	
	/// <summary>
	/// This is a FilterInputStream that reads the files baseInputStream an zip archive
	/// one after another.  It has a special method to get the zip entry of
	/// the next file.  The zip entry contains information about the file name
	/// size, compressed size, CRC, etc.
	/// It includes support for STORED and DEFLATED entries.
	/// 
	/// author of the original java version : Jochen Hoenicke
	/// </summary>
	/// <example> This sample shows how to read a zip file
	/// <code>
	/// using System;
	/// using System.Text;
	/// using System.IO;
	/// 
	/// using NZlib.Zip;
	/// 
	/// class MainClass
	/// {
	/// 	public static void Main(string[] args)
	/// 	{
	/// 		ZipInputStream s = new ZipInputStream(File.OpenRead(args[0]));
	/// 		
	/// 		ZipEntry theEntry;
	/// 		while ((theEntry = s.GetNextEntry()) != null) {
	/// 			Console.WriteLine("File " + theEntry.Name);
	/// 			int size = 2048;
	/// 			byte[] data = new byte[2048];
	/// 			
	/// 			Console.Write("Show contents (y/n) ?");
	/// 			if (Console.ReadLine() == "y") {
	/// 				while (true) {
	/// 					size = s.Read(data, 0, data.Length);
	/// 					if (size > 0) {
	/// 						Console.Write(new ASCIIEncoding().GetString(data));
	/// 					} else {
	/// 						break;
	/// 					}
	/// 				}
	/// 			}
	/// 			Console.WriteLine();
	/// 		}
	/// 		s.Close();
	/// 	}
	/// }	
	/// </code>
	/// </example>
	public class ZipInputStream : InflaterInputStream
	{
		private Crc32 crc = new Crc32();
		private ZipEntry entry = null;
		
		private int csize;
		private int size;
		private int method;
		private int flags;
		private int avail;
		
		/// <summary>
		/// Creates a new Zip input stream, reading a zip archive.
		/// </summary>
		public ZipInputStream(Stream baseInputStream) : base(baseInputStream, new Inflater(true))
		{
			
		}
		
		private void FillBuf()
		{
			avail = len = baseInputStream.Read(buf, 0, buf.Length);
		}
		
		private int ReadBuf(byte[] outBuf, int offset, int length)
		{
			if (avail <= 0) {
				FillBuf();
				if (avail <= 0) {
					return -1;
				}
			}
			if (length > avail) {
				length = avail;
			}
			System.Array.Copy(buf, len - avail, outBuf, offset, length);
			avail -= length;
			return length;
		}
		
		private void ReadFully(byte[] outBuf)
		{
			int off = 0;
			int len = outBuf.Length;
			while (len > 0) {
				int count = ReadBuf(outBuf, off, len);
				if (count == -1) {
					throw new Exception(); 
				}
				off += count;
				len -= count;
			}
		}
		
		private int ReadLeByte()
		{
			if (avail <= 0) {
				FillBuf();
				if (avail <= 0) {
					throw new Exception("EOF baseInputStream header");
				}
			}
			return buf[len - avail--] & 0xff;
		}
		
		/// <summary>
		/// Read an unsigned short baseInputStream little endian byte order.
		/// </summary>
		private int ReadLeShort()
		{
			return ReadLeByte() | (ReadLeByte() << 8);
		}
		
		/// <summary>
		/// Read an int baseInputStream little endian byte order.
		/// </summary>
		private int ReadLeInt()
		{
			return ReadLeShort() | (ReadLeShort() << 16);
		}
		
		/// <summary>
		/// Open the next entry from the zip archive, and return its description.
		/// If the previous entry wasn't closed, this method will close it.
		/// </summary>
		public ZipEntry GetNextEntry()
		{
			if (crc == null) {
				throw new Exception("Closed.");
			}
			if (entry != null) {
				CloseEntry();
			}
			
			int header = ReadLeInt();
			if (header == ZipConstants.CENSIG) {
				/* Central Header reached. */
				Close();
				return null;
			}
			if (header != ZipConstants.LOCSIG) {
				throw new Exception("Wrong Local header signature" + header);
			}
			/* skip version */
			ReadLeShort();
			flags = ReadLeShort();
			method = ReadLeShort();
			int dostime = ReadLeInt();
			int crc2 = ReadLeInt();
			csize = ReadLeInt();
			size = ReadLeInt();
			int nameLen = ReadLeShort();
			int extraLen = ReadLeShort();
			
			if (method == ZipOutputStream.STORED && csize != size) {
				throw new Exception("Stored, but compressed != uncompressed");
			}
			
			byte[] buffer = new byte[nameLen];
			ReadFully(buffer);
			
			string name = new UTF8Encoding().GetString(buffer);
			
			entry = new ZipEntry(name);
			entry.Method = method;
			if ((flags & 8) == 0) {
				entry.Crc  = crc2 & 0xffffffffL;
				entry.Size = size & 0xffffffffL;
				entry.CompressedSize = csize & 0xffffffffL;
			}
			entry.DosTime = dostime;
			if (extraLen > 0) {
				byte[] extra = new byte[extraLen];
				ReadFully(extra);
				entry.ExtraData = extra;
			}
			
			if (method == ZipOutputStream.DEFLATED && avail > 0) {
				System.Array.Copy(buf, len - avail, buf, 0, avail);
				len = avail;
				avail = 0;
				inf.SetInput(buf, 0, len);
			}
			return entry;
		}
		
		private void ReadDataDescr()
		{
			if (ReadLeInt() != ZipConstants.EXTSIG) {
				throw new Exception("Data descriptor signature not found");
			}
			entry.Crc = ReadLeInt() & 0xffffffffL;
			csize = ReadLeInt();
			size = ReadLeInt();
			entry.Size = size & 0xffffffffL;
			entry.CompressedSize = csize & 0xffffffffL;
		}
		
		/// <summary>
		/// Closes the current zip entry and moves to the next one.
		/// </summary>
		public void CloseEntry()
		{
			if (crc == null) {
				throw new Exception("Closed.");
			}
			if (entry == null) {
				return;
			}
			
			if (method == ZipOutputStream.DEFLATED) {
				if ((flags & 8) != 0) {
					/* We don't know how much we must skip, read until end. */
					byte[] tmp = new byte[2048];
					while (Read(tmp, 0, tmp.Length) > 0)
						;
					/* read will close this entry */
					return;
				}
				csize -= inf.GetTotalIn();
				avail = inf.GetRemaining();
			}
			if (avail > csize && csize >= 0) {
				avail -= csize;
			} else {
				csize -= avail;
				avail = 0;
				while (csize != 0) {
					int skipped = (int)base.Skip(csize & 0xffffffffL);
					if (skipped <= 0) {
						throw new Exception("zip archive ends early.");
					}
					
					csize -= skipped;
				}
			}
			
			size = 0;
			crc.Reset();
			if (method == ZipOutputStream.DEFLATED) {
				inf.Reset();
			}
			entry = null;
		}
		
		public override int Available()
		{
			return entry != null ? 1 : 0;
		}
		
		/// <summary>
		/// Reads a byte from the current zip entry.
		/// </summary>
		/// <returns>
		/// the byte or -1 on EOF.
		/// </returns>
		/// <exception name="Exception">
		/// IOException if a i/o error occured.
		/// ZipException if the deflated stream is corrupted.
		/// </exception>
		public override int ReadByte()
		{
			byte[] b = new byte[1];
			if (Read(b, 0, 1) <= 0) {
				return -1;
			}
			return b[0] & 0xff;
		}
		
		/// <summary>
		/// Reads a block of bytes from the current zip entry.
		/// </summary>
		/// <returns>
		/// the number of bytes read (may be smaller, even before EOF), or -1 on EOF.
		/// </returns>
		/// <exception name="Exception">
		/// IOException if a i/o error occured.
		/// ZipException if the deflated stream is corrupted.
		/// </exception>
		public override int Read(byte[] b, int off, int len)
		{
			if (crc == null) {
				throw new Exception("Closed.");
			}
			if (entry == null) {
				return -1;
			}
			bool finished = false;
			
			switch (method) {
				case ZipOutputStream.DEFLATED:
					len = base.Read(b, off, len);
					if (len < 0) {
						if (!inf.Finished()) {
							throw new Exception("Inflater not finished!?");
						}
						avail = inf.GetRemaining();
						if ((flags & 8) != 0) {
							ReadDataDescr();
						}
						
						if (inf.GetTotalIn() != csize || inf.GetTotalOut() != size) {
							throw new Exception("size mismatch: "+csize+";"+size+" <-> "+inf.GetTotalIn()+";"+inf.GetTotalOut());
						}
						inf.Reset();
						finished = true;
					}
					break;
				
				case ZipOutputStream.STORED:
					
					if (len > csize && csize >= 0) {
						len = csize;
					}
					len = ReadBuf(b, off, len);
					if (len > 0) {
						csize -= len;
						size -= len;
					}
					
					if (csize == 0) {
						finished = true;
					} else {
						if (len < 0) {
							throw new Exception("EOF baseInputStream stored block");
						}
					}
					break;
			}
			
			if (len > 0) {
				crc.Update(b, off, len);
			}
			
			if (finished) {
				if ((crc.Value & 0xffffffffL) != entry.Crc) {
					throw new Exception("CRC mismatch");
				}
				crc.Reset();
				entry = null;
			}
			return len;
		}
		
		/// <summary>
		/// Closes the zip file.
		/// </summary>
		/// <exception name="Exception">
		/// if a i/o error occured.
		/// </exception>
		public override void Close()
		{
			base.Close();
			crc = null;
			entry = null;
		}
	}
}
