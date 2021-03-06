Tcl/Tk 8.0 for Windows, Binary Distribution

@(#) README.binary 1.9 97/08/13 18:52:04

1. Introduction
--------------- 

This directory contains the binary distribution of Tcl/Tk 8.0 for
Windows.  It was compiled with Borland C++ 4.52 using Win32 API, so
that it will run under Windows NT, Windows 95, and Windows 3.1 (with
Win32s).  The information here corresponds to release 8.0.  Tcl 8.0 is
a major new release that replaces the core of the interpreter with an
on-the-fly bytecode compiler to improve execution speed.  It also
includes several other new features such as namespaces and binary I/O,
plus many bug fixes.  The compiler introduces several
incompatibilities that may affect existing Tcl scripts; the
incompatibilities are relatively obscure but may require modifications
to some old scripts before they can run with this version. The
compiler introduces many new C-level APIs, but the old APIs are still
supported.  See below for more details.

This release also corresponds to Tk 8.0.  This is a major release with
significant new features such as native look and feel on Macintoshes
and PCs, a new font mechanism, application embedding, and proper
support for Safe-Tcl.  See below for details.  There should be no
backward incompatibilities in Tk 8.0 that affect scripts.

Note: with this release the Tk version number skips from 4.2 to 8.0.
The jump was made in order to synchronize the Tcl and Tk version
numbers.

2. Documentation
----------------

The best way to get started with Tcl is to read one of the introductory
books on Tcl:

    Tcl and the Tk Toolkit, by John Ousterhout,
    Addison-Wesley, 1994, ISBN 0-201-63337-X

    Practical Programming in Tcl and Tk, by Brent Welch,
    Prentice-Hall, 1995, ISBN 0-13-182007-9

    Exploring Expect, by Don Libes,
    O'Reilly and Associates, 1995, ISBN 1-56592-090-2

The "doc" subdirectory in this release contains a complete set of
reference manual entries in Windows help format. 

The "lib/tk8.0/demos" directory contains a number of pre-canned
scripts that demonstrate various features of Tk.  The file
"lib/tk8.0/demos/widget.tcl" is a script that you can use to invoke
many individual demonstrations of Tk's facilities.

Additional information is available in the source release or from the
Tcl/Tk home page on the Web:

	http://sunscript.sun.com

These Web pages include release updates, reports on bug fixes and porting
issues, HTML versions of the manual pages, and pointers to many other
Tcl/Tk Web pages at other sites.  Check them out!

3. Installation
---------------

The binary release is distributed as a self-extracting archive called
tcl80.exe.  The setup program which will prompt you for an
installation directory.  It will create the installation heirarchy
under the specified directory, and install a wish application icon
under the program manager group of your choice.

In order to run Tcl/Tk under Windows 3.1, you will need to install the
latest release of Win32s first.  The Win32s distribution can be found
in the same location as the Tcl/Tk binary and source distributions.
The 1.30 release of Win32s is available along with the binary and
source distributions.  Look for a file called w32s130.exe. Win32s is
not needed to run under Windows '95 or Windows NT.

4. Summary of changes in Tcl 8.0
--------------------------------

Here are the most significant changes in Tcl 8.0.  In addition to these
changes, there are several smaller changes and bug fixes.  See the file
"changes" for a complete list of all changes.

    1. Bytecode compiler.  The core of the Tcl interpreter has been
    replaced with an on-the-fly compiler that translates Tcl scripts to
    byte codes; a new interpreter then executes the byte codes. In
    earlier versions of Tcl, strings were used as a universal
    representation;  in Tcl 8.0 strings are replaced with Tcl_Obj
    structures ("objects") that can hold both a string value and an
    internal form such as a binary integer or compiled bytecodes.  The
    new objects make it possible to store information in efficient
    internal forms and avoid the constant translations to and from
    strings that occurred with the old interpreter.  We have not yet
    converted all of Tcl to take full advantage of the compiler and
    objects and have not converted any of Tk yet, but even so you
    should see speedups of 2-3x on many programs and you may see
    speedups as much as 10-20x in some cases (such as code that
    manipulates long lists).  Future releases should achieve even
    greater speedups.  The compiler introduces only a few minor changes
    at the level of Tcl scripts, but it introduces many new C APIs for
    managing objects.  See, for example, the manual entries doc/*Obj*.3.

    2. Namespaces.  There is a new namespace mechanism based on the
    namespace implementation by Michael McLennan of Lucent Technologies.
    This includes new "namespace" and "variable" commands.  There are
    many new C APIs associated with namespaces, but they will not be
    exported until Tcl 8.1.  Note: the syntax of the namespace command
    has been changed slightly since the b1 release.  See the changes
    file for details.

    3. Binary I/O.  The new object system in Tcl 8.0 supports binary
    strings (internally, strings are counted in addition to being null
    terminated).  There is a new "binary" command for inserting and
    extracting data to/from binary strings.  Commands such as "puts",
    "gets", and "read" commands now operate correctly on binary data. 
    There is a new variable tcl_platform(byteOrder) to identify the
    native byte order for the current host.

    4. Random numbers.  The "expr" command now contains a random number
    generator, which can be accessed via the "rand()" and "srand()" math
    functions.

    5. Safe-Tcl enhancements.  There is a new "hidden command"
    mechanism, implemented with the Tcl commands "interp hide", "interp
    expose", "interp invokehidden", and "interp hidden" and the C APIs
    Tcl_HideCommand and Tcl_ExposeCommand.  There is now support for
    loadable security policies, including new library procedures such as
    tcl_safeCreateInterp.

    6. There is a new package "registry" available under Windows for
    accessing the Windows registry.

    7. There is a new command "file attributes" for getting and setting
    things like permissions and owner.  There is also a new command
    "file nativename" for getting back the platform-specific name for a
    particular file.

    8. There is a new "fcopy" command to copy data between channels. 
    This replaces and improves upon the not-so-secret unsupported old
    command "unsupported0".

    9. There is a new package "http" for doing GET, POST, and HEAD
    requests via the HTTP/1.0 protocol.  See the manual entry http.n
    for details.

    10. There are new library procedures for finding word breaks in
    strings.  See the manual entry library.n for details.

    11. There are new C APIs Tcl_Finalize (for cleaning up before
    unloading the Tcl DLL) and Tcl_Ungets for pushing bytes back into a
    channel's input buffer.

    12. Tcl now supports serial I/O devices on Windows and Unix, with a
    new fconfigure -mode option.  The Windows driver does not yet
    support event-driven I/O.

    13. The lsort command has new options -dictionary and -index.  The
    -index option allows for very rapid sorting based on an element
    of a list.

    14. The event notifier has been completely rewritten (again).  It
    should now allow Tcl to use an external event loop (like Motif's)
    when it is embedded in other applications.  No script-level
    interfaces have changed, but many of the C APIs have.

Tcl 8.0 introduces the following incompatibilities that may affect Tcl
scripts that worked under Tcl 7.6 and earlier releases:

    1. Variable and command names may not include the character sequence
    "::" anymore: this sequence is now used as a namespace separator.

    2. The semantics of some Tcl commands have been changed slightly to
    maximize performance under the compiler.  These incompatibilities
    are documented on the Web so that we can keep the list up-to-date.
    See the URL http://www.sunlabs.com/research/tcl/compiler.html.

    3. 2-digit years are now parsed differently by the "clock" command
    to handle year 2000 issues better (years 00-38 are treated as
    2000-2038 instead of 1900-1938).

    4. The old Macintosh commands "cp", "mkdir", "mv", "rm", and "rmdir"
    are no longer supported; all of these features are now available on
    all platforms via the "file" command.

    5. The variable tcl_precision is now shared between interpreters
    and defaults to 12 digits instead of 6; safe interpreters cannot
    modify tcl_precision.  The new object system in Tcl 8.0 causes
    floating-to-string conversions (and the associated rounding) to
    occur much less often than in Tcl 7.6, which can sometimes cause
    behavioral changes.

    6. The C APIs associated with the notifier have changed substantially.

    7. The procedures Tcl_CreateModalTimeout and Tcl_DeleteModalTimeout
    have been removed.

    8. Tcl_CreateFileHandler and Tcl_DeleteFileHandler now take Unix
    fd's and are only supported on the Unix platform.  Please use the
    Tcl_CreateChannelHandler interface instead.

    9. The C APIs for creating channel drivers have changed as part of
    the new notifier implementation.  The Tcl_File interfaces have been
    removed.  Tcl_GetChannelFile has been replaced with
    Tcl_GetChannelHandle.  Tcl_MakeFileChannel now takes a platform-
    specific file handle.  Tcl_DriverGetOptionProc procedures now take
    an additional interp argument.

5. Summary of changes in Tk 8.0
-------------------------------

Here is a list of the most important new features in Tk 8.0.  The
release also includes several smaller feature changes and bug fixes. 
See the "changes" file for a complete list of all changes.

    1. Native look and feel.  The widgets have been rewritten to provide
    (nearly?) native look and feel on the Macintosh and PC.  Many
    widgets, including scrollbars, menus, and the button family, are
    implemented with native platform widgets.  Others, such as entries
    and texts, have been modified to emulate native look and feel. 
    These changes are backwards compatible except that (a) some
    configuration options are now ignored on some platforms and (b) you
    must use the new menu mechanism described below to native look and
    feel for menus.

    2. There is a new interface for creating menus, where a menubar is
    implemented as a menu widget instead of a frame containing menubuttons.
    The -menu option for a toplevel is used to specify the name of the
    menubar; the menu will be displayed *outside* the toplevel using
    different mechanisms on each platform (e.g. on the Macintosh the menu
    will appear at the top of the screen).  See the menu demos in the
    widget demo for examples.  The old style of menu still works, but
    does not provide native look and feel.  Menus have several new
    features:
        - New "-columnbreak" and "-hideMargin" options make it possible
	  to create multi-column menus.
	- It is now possible to manipulate the Apple and Help menus on
	  the Macintosh, and the system menu on Windows.  It is also
	  possible to have a right justified Help menu on Unix.
	- Menus now issue the virtual event <<MenuSelect>> whenever the
	  current item changes.  Applications can use this to generate
	  help messages.
        - There is a new "-direction" option for menubuttons, which
	  controls where the menu pops up revenues to the button.

    3. The font mechanism in Tk has been completely reworked:
	- Font names need not be nasty X LFDs: more intuitive names
	  like {Times 12 Bold} can also be used.  See the manual entry
	  font.n for details.
	- Font requests always succeed now.  If the requested font is
	  not available, Tk finds the closest available font and uses
	  that one.
	- Tk now supports named fonts whose precise attributes can be
	  changed dynamically.  If a named font is changed, any widget
	  using that font updates itself to reflect the change.
	- There is a new command "font" for creating named fonts and
	  querying various information about fonts.
	- There are now officially supported C APIs for measuring and
	  displaying text.  If you use these APIs now, your code will
	  automatically handle international text when internationalization
	  is added to Tk in a future release.  See the manual entries
	  MeasureChar.3, TextLayout.3, and FontId.3.
	- The old C procedures Tk_GetFontStruct, Tk_NameOfFontStruct,
	  and Tk_FreeFontStruct have been replaced with more portable
	  procedures Tk_GetFont, Tk_NameOfFont, and Tk_FreeFont.

    4. Application embedding.  It is now possible to embedded one Tcl/Tk
    application inside another, using the -container option on frame
    widgets and the -use option for toplevel widgets or on the command
    line for wish.  Embedding should be fully functional under Unix,
    but the implementation is incomplete on the Macintosh and PC.

    5. Tk now works correctly with Safe-Tcl: it can be loaded into
    safe interpreters.

    6. Text widgets now allow images to be embedded directly in the
    text without using embedded windows.  This is more efficient and
    provides smoother scrolling.

    7. Buttons have a new -default option for drawing default rings in
    a platform-specific manner.

    8. There is a new "gray75" bitmap, and the "gray25" bitmap is now
    really 25% on (due to an ancient mistake, it had been only 12% on).
    The Macintosh now supports native bitmaps, including new builtin
    bitmaps "stop", "caution", and "note", plus the ability to use
    bitmaps in the application's resource fork.

    9. The "destroy" command now ignores windows that don't exist
    instead of generating an error.

Tk 8.0 introduces the following incompatibilities that may affect Tcl/Tk
scripts that worked under Tk 4.2 and earlier releases:

    1. Font specifications such as "Times 12" now interpret the size
    as points, whereas it used to be pixels (this was actually a bug,
    since the behavior was documented as points).  To get pixels now,
    use a negative size such as "Times -12".

    2. The -transient option for menus is no longer supported.  You can
    achieve the same effect with the -type field.

    3. In the canvas "coords" command, polygons now return only the
    points that were explicitly specified when the polygon was created
    (they used to return an extra point if the polygon wasn't originally
    closed).  Internally, polygons are still closed automatically for
    purposes of display and hit detection; the extra point just isn't
    returned by the "coords" command.

    4. The photo image mechanism now uses Tcl_Channels instead of FILEs,
   in order to make it portable.  FILEs are no longer used anywhere
   in Tk.

    5. The procedures Tk_GetFontStruct, Tk_NameOfFontStruct,
    and Tk_FreeFontStruct have been removed.

Note: the new compiler in Tcl 8.0 may also affect Tcl/Tk scripts; check
the Tcl documentation for information on incompatibilities introduced by
Tcl 8.0.

6. Known Bugs/Missing Features
------------------------------

- Solstice NFS interacts badly with Tcl, files linger after close
- Sockets have been known to hang during high load.  There are still
  some unresolved problems in the socket code where close events may
  get lost.
- Blocking "after" commands (e.g. "after 3000") don't work on Win32s.
- Clock command fails to handle daylight savings time boundaries for
  things like "last week".
- Background processes aren't properly detached on NT.
- File events only work on sockets.
- Pipes/files/console/serial ports don't support nonblocking I/O.
- The library cannot be used by two processes at the same time under
  Win32s.
- There is no support for custom cursors/application icons.  The core
  set of X cursors is supported, although you cannot change their color.
- Stippling of arcs isn't implemented yet.
- Some "wm" functions don't map to Windows and aren't implemented;
  others should map, but just aren't implemented.  The worst offenders
  are the icon manipulation routines.
- Under Win32s, you can only start one instance of Wish at a time.
- Color management on some displays doesn't work properly resulting in
  Tk switching to monochrome mode.
- Tk seems to fail to draw anything on some Matrox Millenium cards.
- Send and winfo interps are not currently supported
- Printing does not work for images (e.g. GIF) on a canvas.
- Tk_dialog appears in the upper left corner.  This is a symptom of a
  larger problem with "wm geometry" when applied to unmapped or
  iconified windows.
- Some keys don't work on international keyboards.
- Grabs do not affect native menus or the title bar.
- PPM images are using the wrong translation mode for writing to
  files, resulting in CR/LF terminated PPM files.
- Tk crashes if the display depth changes while it is running.  Tk
  also doesn't consistently track changes in the system colors.

There may be more that we don't know about, so be sure to submit bug
reports when you run into problems.  If you have comments or bug
reports for the Windows version of Tcl, please direct them to:

Scott Stanton
scott.stanton@eng.sun.com

or post them to the newsgroup comp.lang.tcl.

7. Tcl newsgroup
-----------------

There is a network news group "comp.lang.tcl" intended for the exchange
of information about Tcl, Tk, and related applications.  Feel free to use
the newsgroup both for general information questions and for bug reports.
We read the newsgroup and will attempt to fix bugs and problems reported
to it.

When using comp.lang.tcl, please be sure that your e-mail return address
is correctly set in your postings.  This allows people to respond directly
to you, rather than the entire newsgroup, for answers that are not of
general interest.  A bad e-mail return address may prevent you from
getting answers to your questions.  You may have to reconfigure your news
reading software to ensure that it is supplying valid e-mail addresses.

8. Tcl contributed archive
--------------------------

Many people have created exciting packages and applications based on Tcl
and/or Tk and made them freely available to the Tcl community.  An archive
of these contributions is kept on the machine ftp.neosoft.com.  You
can access the archive using anonymous FTP;  the Tcl contributed archive is
in the directory "/pub/tcl".  The archive also contains several FAQ
("frequently asked questions") documents that provide solutions to problems
that are commonly encountered by TCL newcomers.

9. Mailing lists
----------------

A couple of  Mailing List have been set up to discuss Macintosh or
Windows related Tcl issues.  In order to use these Mailing Lists you
must have access to the internet.  If you have access to the WWW the
home pages for these mailing lists are located at the following URLs:

	http://www.sunlabs.com/research/tcl/lists/mactcl-list.html

		-and-

	http://www.sunlabs.com/research/tcl/lists/wintcl-list.html

The home pages contain information about the lists and an HTML archive
of all the past messages on the list.  To subscribe send a message to:
	
	listserv@sunlabs.sun.com
	
In the body of the message (the subject will be ignored) put:
	
	subscribe mactcl Joe Blow
	
Replacing Joe Blow with your real name, of course.  (Use wintcl
instead of mactcl if your interested in the Windows list.)  If you
would just like to receive more information about the list without
subscribing put the line:

	information mactcl
	
in the body instead (or wintcl).

10. Support and bug fixes
------------------------

We're very interested in receiving bug reports and suggestions for
improvements.  We prefer that you send this information to the
comp.lang.tcl newsgroup rather than to any of us at Sun.  We'll see
anything on comp.lang.tcl, and in addition someone else who reads 
comp.lang.tcl may be able to offer a solution.  The normal turn-around
time for bugs is 2-4 weeks.  Enhancements may take longer and may not
happen at all unless there is widespread support for them (we're
trying to slow the rate at which Tcl turns into a kitchen sink).  It's
very difficult to make incompatible changes to Tcl at this point, due
to the size of the installed base.

When reporting bugs, please provide a short tclsh script that we can
use to reproduce the bug.  Make sure that the script runs with a
bare-bones tclsh and doesn't depend on any extensions or other
programs, particularly those that exist only at your site.  Also,
please include three additional pieces of information with the
script:
    (a) how do we use the script to make the problem happen (e.g.
	what things do we click on, in what order)?
    (b) what happens when you do these things (presumably this is
        undesirable)?
    (c) what did you expect to happen instead?

The Tcl community is too large for us to provide much individual
support for users.  If you need help we suggest that you post questions
to comp.lang.tcl.  We read the newsgroup and will attempt to answer
esoteric questions for which no-one else is likely to know the answer.
In addition, Tcl support and training are available commercially from
NeoSoft (info@neosoft.com), Computerized Processes Unlimited
(gwl@cpu.com), and Data Kinetics (education@dkl.com).

11. Tcl version numbers
----------------------

Each Tcl release is identified by two numbers separated by a dot, e.g.
6.7 or 7.0.  If a new release contains changes that are likely to break
existing C code or Tcl scripts then the major release number increments
and the minor number resets to zero: 6.0, 7.0, etc.  If a new release
contains only bug fixes and compatible changes, then the minor number
increments without changing the major number, e.g. 7.1, 7.2, etc.  If
you have C code or Tcl scripts that work with release X.Y, then they
should also work with any release X.Z as long as Z > Y.

Alpha and beta releases have an additional suffix of the form b1 or b1.
For example, Tcl 7.0b1 is the first beta release of Tcl version 7.0,
Tcl 7.0b2 is the second beta release, and so on.  A beta release is an
initial version of a new release, used to fix bugs and bad features before
declaring the release stable.  An alpha release is like a beta release,
except it's likely to need even more work before it's "ready for prime
time".  New releases are normally preceded by one or more alpha and beta
releases.  We hope that lots of people will try out the alpha and beta
releases and report problems.  We'll make new alpha/beta releases to fix
the problems, until eventually there is a beta release that appears to
be stable.  Once this occurs we'll make the final release.

We can't promise to maintain compatibility among alpha and beta releases.
For example, release 7.1b2 may not be backward compatible with 7.1b1, even
though the final 7.1 release will be backward compatible with 7.0.  This
allows us to change new features as we find problems during beta testing.
We'll try to minimize incompatibilities between beta releases, but if
a major problem turns up then we'll fix it even if it introduces an
incompatibility.  Once the official release is made then there won't
be any more incompatibilities until the next release with a new major
version number.

Patch releases have a suffix such as p1 or p2.  These releases contain
bug fixes only.  A patch release (e.g Tcl 7.6p2) should be completely
compatible with the base release from which it is derived (e.g. Tcl
7.6), and you should normally use the highest available patch release.

12. Linking against the binary release
--------------------------------------

In order to link your applications against the .dll files shipped with
this release, you will need to use the appropriate .lib file for your
compiler.  In the lib directory of the installation directory, there
are library files for Borland and Microsoft Visual C++ compilers:

    For Borland, use:
	tcl80.lib
	tk80.lib

    For MSVC, use:
	tcl80vc.lib
	tk80vc.lib

13. Building dynamically loadable extensions
--------------------------------------------

Please refer to the example dynamically loadable extension provided on
our ftp site:

	ftp://ftp.sunlabs.com/pub/tcl/example.zip

This archive contains a template that you can use for building
extensions that will be loadable on Unix, Windows, and Macintosh
systems.
