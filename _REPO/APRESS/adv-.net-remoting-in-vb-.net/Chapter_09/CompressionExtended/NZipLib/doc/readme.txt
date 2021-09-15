NZipLib version 0.1
===================

I've ported the zip library over to C#, because I needed
gzip/zip compression and I didn't want to use the libzip.dll
or something like this. I want all in pure C# :)

btw. I tried to follow the sharpdevelop coding style guide to do the
port, if you want read this guide download sharpdevelop and you find
it in the doc/developer directory of SD.

License
=======
The library is released under the GPL (see COPYING.txt) with following
exception :
  
  As a special exception, if you link this library with other files to
  produce an executable, this library does not by itself cause the
  resulting executable to be covered by the GNU General Public License.
  This exception does not however invalidate any other reasons why the
  executable file might be covered by the GNU General Public License.

Credits
=======
NZlib has been developed by Mike Krueger (mike@icsharpcode.net) but I 
just translated a java version of the zlib which was originally created
by the free software foundation. So all credits should go to the FSF
and the authors who have worked on this piece of code.

Btw. without the zlib authors the java zlib wouldn't be possible :
 Jean-loup Gailly(jloup@gzip.org)
 Mark Adler(madler@alumni.caltech.edu)
 and contributors of zlib.

Special thanx fly out to Christoph Wille for beta testing, suggestions and
the setup of the website.