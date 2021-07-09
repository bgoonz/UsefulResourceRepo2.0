==========================================================
        Programming the Web with Visual Basic.NET
 by Lynn Torkelson, Constance Petersen, and Zac Torkelson
----------------------------------------------------------

INSTALLATION NOTES.

All of the sample code for each chapter is in its own folder. Download the Setup.ini and the <projectname>.msi file for each installation and copy three additional files to the installation folder: InstMsiA.exe, InstMsiW.exe, and Setup.Exe. To save download time, these three files reside in the Common Installation Executables folder; download them once and you'll have them.

Once the installation folder contains all five files, run Setup.exe to install the Web application or Web service. This will create the virtual directory that you need and will add all of its source code files and any sub-folders needed.

Some of the chapter folders contain sub-folders. To obtain all of the code for those chapters, you need to perform separate installations for each sub-folder, as well as the installation for the main folder (if any).

DATABASE SETUP.

Some chapters require one or more databases for the code to run successfully. You can set up the databases yourself as explained in our book, or you can run the scripts provided in the appropriate sub-folders to create the databases. In either case, you will have to modify the code to provide the correct connection strings for your databases.

For two of the databases, Code (Chapter 13-14) and VbCode (Chapter 15), we have provided some data that you can import directly into the respective databases, table by table. The import files are XLS (MS Excel 8.0) files. These tables contain some foreign-language text to demonstrate the localization features of the code samples.

DEFAULT.ASPX.

The Web applications for the earlier chapters all contain a default.aspx Web page (not shown in our book) set to be the Start Page. The default.aspx page shows the code samples in the order that we discuss them in the book. You can use the Back button (perhaps repeatedly) to return to the default.aspx page to look at another example. 