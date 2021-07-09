// InflaterInputStream.cs
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
using System.IO;

using NZlib.Compression;

namespace NZlib.Streams {
	
	/// <summary>
	/// This filter stream is used to decompress data compressed baseInputStream the "deflate"
	/// format. The "deflate" format is described baseInputStream RFC 1951.
	///
	/// This stream may form the basis for other decompression filters, such
	/// as the <code>GzipInputStream</code>.
	///
	/// author of the original java version : John Leuner
	/// </summary>
	public class InflaterInputStream : Stream
	{
		//Variables
		
		/// <summary>
		/// Decompressor for this filter
		/// </summary>
		protected Inflater inf;
		
		
		/// <summary>
		/// Byte array used as a buffer
		/// </summary>
		protected byte[] buf;
		
		/// <summary>
		/// Size of buffer
		/// </summary>
		protected int len;
		
		//We just use this if we are decoding one byte at a time with the read() call
		private byte[] onebytebuffer = new byte[1];
		
		/// <summary>
		/// base stream the inflater depends on.
		/// </summary>
		protected Stream baseInputStream;
		
		/// <summary>
		/// I needed to implement the abstract member.
		/// </summary>
		public override bool CanRead {
			get {
				return true;
			}
		}
		
		/// <summary>
		/// I needed to implement the abstract member.
		/// </summary>
		public override bool CanSeek {
			get {
				return false;
			}
		}
		
		/// <summary>
		/// I needed to implement the abstract member.
		/// </summary>
		public override bool CanWrite {
			get {
				return false;
			}
		}
		
		/// <summary>
		/// I needed to implement the abstract member.
		/// </summary>
		public override long Length {
			get {
				return len;
			}
		}
		
		/// <summary>
		/// I needed to implement the abstract member.
		/// </summary>
		public override long Position {
			get {
				return 0;
			}
			set {
				
			}
		}
		
		/// <summary>
		/// Flushes the baseInputStream
		/// </summary>
		public override void Flush()
		{
			baseInputStream.Flush();
		}
		
		/// <summary>
		/// I needed to implement the abstract member.
		/// </summary>
		public override long Seek(long offset, SeekOrigin origin)
		{
			return 0;
		}
		
		/// <summary>
		/// I needed to implement the abstract member.
		/// </summary>
		public override void SetLength(long value)
		{
		}
		
		/// <summary>
		/// I needed to implement the abstract member.
		/// </summary>
		public override void Write(byte[] array, int offset, int count)
		{
		}
		
		/// <summary>
		/// I needed to implement the abstract member.
		/// </summary>
		public override void WriteByte(byte value)
		{
		}
		
		//Constructors
		
		/// <summary>
		/// Create an InflaterInputStream with the default decompresseor
		/// and a default buffer size.
		/// </summary>
		/// <param name = "baseInputStream">
		/// the InputStream to read bytes from
		/// </param>
		public InflaterInputStream(Stream baseInputStream) : this(baseInputStream, new Inflater(), 4096)
		{
			
		}
		
		/// <summary>
		/// Create an InflaterInputStream with the specified decompresseor
		/// and a default buffer size.
		/// </summary>
		/// <param name = "baseInputStream">
		/// the InputStream to read bytes from
		/// </param>
		/// <param name = "inf">
		/// the decompressor used to decompress data read from baseInputStream
		/// </param>
		public InflaterInputStream(Stream baseInputStream, Inflater inf) : this(baseInputStream, inf, 4096)
		{
			
		}
		
		/// <summary>
		/// Create an InflaterInputStream with the specified decompresseor
		/// and a specified buffer size.
		/// </summary>
		/// <param name = "baseInputStream">
		/// the InputStream to read bytes from
		/// </param>
		/// <param name = "inf">
		/// the decompressor used to decompress data read from baseInputStream
		/// </param>
		/// <param name = "size">
		/// size of the buffer to use
		/// </param>
		public InflaterInputStream(Stream baseInputStream, Inflater inf, int size)
		{
			this.baseInputStream = baseInputStream;
			this.inf = inf;
			this.len = 0;
			
			if (size <= 0)
				throw new Exception("size <= 0");
			buf = new byte[size]; //Create the buffer
		}
		
		//Methods
		
		/// <summary>
		/// Returns 0 once the end of the stream (EOF) has been reached.
		/// Otherwise returns 1.
		/// </summary>
		public virtual int Available()
		{
			return inf.Finished() ? 0 : 1;
		}
		
		/// <summary>
		/// Closes the input stream
		/// </summary>
		public override void Close()
		{
			baseInputStream.Close();
		}
		
		/// <summary>
		/// Fills the buffer with more data to decompress.
		/// </summary>
		protected void Fill()
		{
			len = baseInputStream.Read(buf, 0, buf.Length);
			
			if (len < 0)
				throw new Exception("Deflated stream ends early.");
			inf.SetInput(buf, 0, len);
		}
		
		/// <summary>
		/// Reads one byte of decompressed data.
		///
		/// The byte is baseInputStream the lower 8 bits of the int.
		/// </summary>
		public override int ReadByte()
		{
			int nread = Read(onebytebuffer, 0, 1); //read one byte
			if (nread > 0) {
				return onebytebuffer[0] & 0xff;
			}
			return -1;
		}
		
		/// <summary>
		/// Decompresses data into the byte array
		/// </summary>
		/// <param name ="b">
		/// the array to read and decompress data into
		/// </param>
		/// <param name ="off">
		/// the offset indicating where the data should be placed
		/// </param>
		/// <param name ="len">
		/// the number of bytes to decompress
		/// </param>
		public override int Read(byte[] b, int off, int len)
		{
			for (;;) {
				int count;
				try {
					count = inf.Inflate(b, off, len);
				} catch (Exception dfe) {
					throw new Exception(dfe.ToString());
				}
				
				if (count > 0) {
					return count;
				}
				
				if (inf.NeedsDictionary()) {
					throw new Exception("Need a dictionary");
				} else if (inf.Finished()) {
					return -1;
				} else if (inf.NeedsInput()) {
					Fill();
				} else {
					throw new Exception("Don't know what to do");
				}
			}
		}
		/// <summary>
		/// Skip specified number of bytes of uncompressed data
		/// </summary>
		/// <param name ="n">
		/// number of bytes to skip
		/// </param>
		public long Skip(long n)
		{
			if (n < 0) {
				throw new Exception();
			}
			int len = 2048;
			if (n < len) {
				len = (int) n;
			}
			byte[] tmp = new byte[len];
			return (long)baseInputStream.Read(tmp, 0, tmp.Length);
		}
		
	}
}
