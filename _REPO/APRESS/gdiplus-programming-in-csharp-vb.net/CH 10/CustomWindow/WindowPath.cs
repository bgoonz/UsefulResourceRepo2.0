using System;
using System.Collections;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;

namespace CustomWindow
{
	public sealed class WindowPath
	{
    private static GraphicsPath mP;
    private static string[] mFileNames;
    private static string mIOerror;

    /// <summary>
    /// Gets GraphicsPath stored in file
    /// </summary>
    /// <param name="fname"></param>
    /// <returns GraphicsPath></returns>
    public static GraphicsPath GetPath(string fname)
    {
      Point BeginP = Point.Empty;
      Point EndP   = Point.Empty;
      Point P      = Point.Empty;
      string s;
      string[] x;
      mP = new  GraphicsPath();

      StreamReader sr = new StreamReader(fname);
      sr.BaseStream.Seek(0, SeekOrigin.Begin);
      while (sr.Peek() > -1)
      {
        s = sr.ReadLine();
        x = s.Split(new Char[] {','});
        P.X = Convert.ToInt32(x[0]);
        P.Y = Convert.ToInt32(x[1]);

        if (BeginP == Point.Empty)
        {
          BeginP = P;
          continue;
        }

        EndP = P;
        mP.AddLine( BeginP, EndP);
        BeginP = EndP;
      }
      mP.CloseFigure();

      return mP;
    }

    public static void SavePath(string fname, GraphicsPath P)
    {
      FileStream fs = new FileStream(fname, FileMode.Create);
      StreamWriter sw = new StreamWriter(fs);
      foreach (PointF p in P.PathPoints)
      {
        sw.Write(p.X.ToString() + "," + p.Y.ToString() + "\n");
      }
      sw.Close();
      GetFileNames();
    }

    public static string[] GraphicsPathFileNames
    {
      get 
      { 
        GetFileNames();
        return mFileNames; 
      }
    }

    public static string LastError
    {
      get {return mIOerror;}
    }

    private static void GetFileNames() 
    {
      ArrayList a = new  ArrayList();
      mIOerror = "";
      try 
      {
        mFileNames = Directory.GetFiles(Directory.GetCurrentDirectory()); 

        //We are only interested in the graphics path filenames which end in .pth
        for (int k=0; k<mFileNames.Length; k++)
        {
          if ( Path.GetExtension(mFileNames[k].ToLower()) == ".pth" )
            a.Add(Path.GetFileName(mFileNames[k]));
        }

        //Convert the explicit array to implicit array so I can return string[]
        a.TrimToSize();
        mFileNames = new string[a.Count];
        for (int k=0; k<a.Count; k++)
          mFileNames[k] = (string)a[k];

      }
      catch (ArgumentNullException) 
      {
        mIOerror = "Path is a null reference.";
      }
      catch (System.Security.SecurityException) 
      {
        mIOerror = "The caller does not have the " +
          "required permission.";
      }
      catch (ArgumentException) 
      {
        mIOerror = "Path is an empty string, " +
          "contains only white spaces, " + 
          "or contains invalid characters.";
      }
      catch (System.IO.DirectoryNotFoundException) 
      {
        mIOerror = "The path encapsulated in the " + 
          "Directory object does not exist.";
      }
    }
	}
}
