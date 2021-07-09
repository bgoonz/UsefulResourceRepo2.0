// ZipEntry.cs
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

namespace NZlib.Zip {
	
	/// <summary>
	/// This class represents a member of a zip archive.  ZipFile and
	/// ZipInputStream will give you instances of this class as information
	/// about the members in an archive.  On the other hand ZipOutputStream
	/// needs an instance of this class to create a new member.
	///
	/// author of the original java version : Jochen Hoenicke
	/// </summary>
	public class ZipEntry : ICloneable
	{
		private static int KNOWN_SIZE   = 1;
		private static int KNOWN_CSIZE  = 2;
		private static int KNOWN_CRC    = 4;
		private static int KNOWN_TIME   = 8;
		
		private static DateTime cal = DateTime.Now;
		
		private string name;
		private int size;
		private int compressedSize;
		private int crc;
		private int time;
		private ushort known = 0;
		private short method = -1;
		private byte[] extra = null;
		private string comment = null;
		
		public int zipFileIndex = -1;  /* used by ZipFile */
		public int flags;              /* used by ZipOutputStream */
		public int offset;             /* used by ZipFile and ZipOutputStream */
		
		/// <summary>
		/// Compression method.  This method doesn't compress at all.
		/// </summary>
		public const int STORED      =  0;
		
		/// <summary>
		/// Compression method.  This method uses the Deflater.
		/// </summary>
		public const int DEFLATED    =  8;
		
		/// <summary>
		/// Creates a zip entry with the given name.
		/// </summary>
		/// <param name="name">
		/// the name. May include directory components separated by '/'.
		/// </param>
		public ZipEntry(string name)
		{
			if (name == null) {
				throw new System.ArgumentNullException("name");
			}
			this.name = name;
		}
		
		/// <summary>
		/// Creates a copy of the given zip entry.
		/// </summary>
		/// <param name="e">
		/// the entry to copy.
		/// </param>
		public ZipEntry(ZipEntry e)
		{
			name = e.name;
			known = e.known;
			size = e.size;
			compressedSize = e.compressedSize;
			crc = e.crc;
			time = e.time;
			method = e.method;
			extra = e.extra;
			comment = e.comment;
		}
		
		public int DosTime {
			get {
				if ((known & KNOWN_TIME) == 0) {
					return 0;
				}
				lock(this) {
					cal = new DateTime(time*1000L);
					return (cal.Year - 1980 & 0x7f) << 25 |
					(cal.Month + 1) << 21 |
					(cal.Day ) << 16 |
					(cal.Hour) << 11 |
					(cal.Minute) << 5 |
					(cal.Second) >> 1;
				}
			}
			set {
				int sec = 2 * (value & 0x1f);
				int min = (value >> 5) & 0x3f;
				int hrs = (value >> 11) & 0x1f;
				int day = (value >> 16) & 0x1f;
				int mon = ((value >> 21) & 0xf) - 1;
				int year = ((value >> 25) & 0x7f) + 1980; /* since 1900 */
				
				// Guard against invalid or missing date causing
				// IndexOutOfBoundsException.
				try {
					lock(this) {
						cal = new DateTime(year, mon, day, hrs, min, sec);
						time = (int) (cal.Millisecond / 1000L);
					}
					known |= (ushort)KNOWN_TIME;
				}
				catch (Exception)
				{
					/* Ignore illegal time stamp */
					known &= (ushort)~KNOWN_TIME;
				}
			}
		}
		
		/// <summary>
		/// Returns the entry name.  The path components in the entry are
		/// always separated by slashes ('/').
		/// </summary>
		public string Name {
			get {
				return name;
			}
		}
		
		/// <summary>
		/// Gets/Sets the time of last modification of the entry.
		/// </summary>
		/// <returns>
		/// the time of last modification of the entry, or -1 if unknown.
		/// </returns>
		public long Time {
			get {
				return (known & KNOWN_TIME) != 0 ? time * 1000L : -1;
			}
			set {
				this.time = (int) (value / 1000L);
				this.known |= (ushort)KNOWN_TIME;
			}
		}
		
		/// <summary>
		/// Gets/Sets the size of the uncompressed data.
		/// </summary>
		/// <exception cref="System.ArgumentOutOfRangeException">
		/// if size is not in 0..0xffffffffL
		/// </exception>
		/// <returns>
		/// the size or -1 if unknown.
		/// </returns>
		public long Size {
			get {
				return (known & KNOWN_SIZE) != 0 ? size & 0xffffffffL : -1L;
			}
			set {
				if (((ulong)value & 0xffffffff00000000L) != 0) {
					throw new ArgumentOutOfRangeException("size");
				}
				this.size = (int)value;
				this.known |= (ushort)KNOWN_SIZE;
				
			}
		}
		
		/// <summary>
		/// Gets/Sets the size of the compressed data.
		/// </summary>
		/// <exception cref="System.ArgumentOutOfRangeException">
		/// if csize is not in 0..0xffffffffL
		/// </exception>
		/// <returns>
		/// the size or -1 if unknown.
		/// </returns>
		public long CompressedSize {
			get {
				return (known & KNOWN_CSIZE) != 0 ? compressedSize & 0xffffffffL : -1L;
			}
			set {
				if (((ulong)value & 0xffffffff00000000L) != 0) {
					throw new ArgumentOutOfRangeException();
				}
				this.compressedSize = (int) value;
				this.known |= (ushort)KNOWN_CSIZE;
			}
		}
		
		/// <summary>
		/// Gets/Sets the crc of the uncompressed data.
		/// </summary>
		/// <exception cref="System.ArgumentOutOfRangeException">
		/// if crc is not in 0..0xffffffffL
		/// </exception>
		/// <returns>
		/// the crc or -1 if unknown.
		/// </returns>
		public long Crc {
			get {
				return (known & KNOWN_CRC) != 0 ? crc & 0xffffffffL : -1L;
			}
			set {
				if (((ulong)crc & 0xffffffff00000000L) != 0) {
					throw new Exception();
				}
				this.crc = (int)value;
				this.known |= (ushort)KNOWN_CRC;
			}
		}
		
		/// <summary>
		/// Gets/Sets the compression method. Only DEFLATED and STORED are supported.
		/// </summary>
		/// <exception cref="System.ArgumentOutOfRangeException">
		/// if method is not supported.
		/// </exception>
		/// <returns>
		/// the compression method or -1 if unknown.
		/// </returns>
		/// <see cref="ZipOutputStream.DEFLATED"/>
		/// <see cref="ZipOutputStream.STORED"/>
		public int Method {
			get {
				return method;
			}
			set {
				if (value != ZipOutputStream.STORED &&
				    value != ZipOutputStream.DEFLATED) {
				    	throw new System.ArgumentOutOfRangeException();
				    }
				    this.method = (short)value;
				
			}
		}
		
		/// <summary>
		/// Gets/Sets the extra data.
		/// </summary>
		/// <exception cref="System.ArgumentOutOfRangeException">
		/// if extra is longer than 0xffff bytes.
		/// </exception>
		/// <returns>
		/// the extra data or null if not set.
		/// </returns>
		public byte[] ExtraData {
			get {
				return extra;
			}
			set {
				if (value == null) {
					this.extra = null;
					return;
				}
				
				if (value.Length > 0xffff) {
					throw new System.ArgumentOutOfRangeException();
				}
				this.extra = value;
				try {
					int pos = 0;
					while (pos < extra.Length) {
						int sig = (extra[pos++] & 0xff) | (extra[pos++] & 0xff) << 8;
						int len = (extra[pos++] & 0xff) | (extra[pos++] & 0xff) << 8;
						if (sig == 0x5455) {
							/* extended time stamp */
							int flags = extra[pos];
							if ((flags & 1) != 0) {
								time = ((extra[pos+1] & 0xff)       |
								        (extra[pos+2] & 0xff) << 8  |
								        (extra[pos+3] & 0xff) << 16 |
								        (extra[pos+4] & 0xff) << 24);
								known |= (ushort)KNOWN_TIME;
							}
						}
						pos += len;
					}
				} catch (Exception) {
					/* be lenient */
					return;
				}
			}
		}
		
		/// <summary>
		/// Gets/Sets the entry comment.
		/// </summary>
		/// <exception cref="System.ArgumentOutOfRangeException">
		/// if comment is longer than 0xffff.
		/// </exception>
		/// <returns>
		/// the comment or null if not set.
		/// </returns>
		public string Comment {
			get {
				return comment;
			}
			set {
				if (value.Length > 0xffff) {
					throw new ArgumentOutOfRangeException();
				}
				this.comment = value;
			}
		}
		
		/// <summary>
		/// Gets true, if the entry is a directory.  This is solely
		/// determined by the name, a trailing slash '/' marks a directory.
		/// </summary>
		public bool IsDirectory {
			get {
				int nlen = name.Length;
				return nlen > 0 && name[nlen - 1] == '/';
			}
		}
		
		/// <summary>
		/// Creates a copy of this zip entry.
		/// </summary>
		public object Clone()
		{
			return this.MemberwiseClone();
		}
		
		/// <summary>
		/// Gets the string representation of this ZipEntry.  This is just
		/// the name as returned by getName().
		/// </summary>
		public override string ToString()
		{
			return name;
		}
	}
}
