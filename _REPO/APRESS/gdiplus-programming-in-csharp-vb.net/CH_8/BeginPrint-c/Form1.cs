using System;
using System.Drawing;
using System.IO;
using System.Drawing.Printing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace BeginPrint_c
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
    #region Class Local Storage
    PrintDocument Pd;
    Font Pf;
    TextReader file;
    int Pages = 0;
    #endregion

    private System.Windows.Forms.ComboBox cmbPrinters;
    private System.Windows.Forms.Label label1;
    private System.Windows.Forms.Button cmdStartPrint;
    private System.Windows.Forms.ListBox lstPaper;
    private System.Windows.Forms.Label label2;
    private System.Windows.Forms.Label label3;
    private System.Windows.Forms.ListBox lstRes;

    private System.ComponentModel.Container components = null;

		public Form1()
		{
			InitializeComponent();

		}

		protected override void Dispose( bool disposing )
		{
			if( disposing )
			{
				if (components != null) 
				{
					components.Dispose();
				}
			}
			base.Dispose( disposing );
		}

		#region Windows Form Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
      this.cmbPrinters = new System.Windows.Forms.ComboBox();
      this.label1 = new System.Windows.Forms.Label();
      this.cmdStartPrint = new System.Windows.Forms.Button();
      this.lstPaper = new System.Windows.Forms.ListBox();
      this.label2 = new System.Windows.Forms.Label();
      this.label3 = new System.Windows.Forms.Label();
      this.lstRes = new System.Windows.Forms.ListBox();
      this.SuspendLayout();
      // 
      // cmbPrinters
      // 
      this.cmbPrinters.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
      this.cmbPrinters.Location = new System.Drawing.Point(16, 192);
      this.cmbPrinters.Name = "cmbPrinters";
      this.cmbPrinters.Size = new System.Drawing.Size(256, 21);
      this.cmbPrinters.TabIndex = 0;
      // 
      // label1
      // 
      this.label1.Location = new System.Drawing.Point(16, 176);
      this.label1.Name = "label1";
      this.label1.Size = new System.Drawing.Size(256, 16);
      this.label1.TabIndex = 1;
      this.label1.Text = "Installed Printers";
      // 
      // cmdStartPrint
      // 
      this.cmdStartPrint.Location = new System.Drawing.Point(88, 224);
      this.cmdStartPrint.Name = "cmdStartPrint";
      this.cmdStartPrint.Size = new System.Drawing.Size(88, 32);
      this.cmdStartPrint.TabIndex = 2;
      this.cmdStartPrint.Text = "Start Print";
      this.cmdStartPrint.Click += new System.EventHandler(this.cmdStartPrint_Click);
      // 
      // lstPaper
      // 
      this.lstPaper.Location = new System.Drawing.Point(16, 24);
      this.lstPaper.Name = "lstPaper";
      this.lstPaper.Size = new System.Drawing.Size(256, 56);
      this.lstPaper.TabIndex = 3;
      // 
      // label2
      // 
      this.label2.Location = new System.Drawing.Point(18, 8);
      this.label2.Name = "label2";
      this.label2.Size = new System.Drawing.Size(256, 16);
      this.label2.TabIndex = 4;
      this.label2.Text = "Paper Size";
      // 
      // label3
      // 
      this.label3.Location = new System.Drawing.Point(16, 88);
      this.label3.Name = "label3";
      this.label3.Size = new System.Drawing.Size(256, 16);
      this.label3.TabIndex = 6;
      this.label3.Text = "Printer Resolution";
      // 
      // lstRes
      // 
      this.lstRes.Location = new System.Drawing.Point(16, 104);
      this.lstRes.Name = "lstRes";
      this.lstRes.Size = new System.Drawing.Size(256, 56);
      this.lstRes.TabIndex = 5;
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(292, 273);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.label3,
                                                                  this.lstRes,
                                                                  this.label2,
                                                                  this.lstPaper,
                                                                  this.cmdStartPrint,
                                                                  this.label1,
                                                                  this.cmbPrinters});
      this.MaximizeBox = false;
      this.MinimizeBox = false;
      this.Name = "Form1";
      this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
      this.Text = "Form1";
      this.Load += new System.EventHandler(this.Form1_Load);
      this.ResumeLayout(false);

    }
		#endregion

		[STAThread]
		static void Main() 
		{
			Application.Run(new Form1());
		}

    private void Form1_Load(object sender, System.EventArgs e)
    {
      Init();
    }

    private void Init()
    {
      foreach(String p in PrinterSettings.InstalledPrinters) 
        cmbPrinters.Items.Add(p);

      if ( cmbPrinters.Items.Count > 0 )
        cmbPrinters.SelectedIndex = 0;

      //Add a few paper sizes to the list box
      lstPaper.Items.Add(PaperKind.A4.ToString());
      lstPaper.Items.Add(PaperKind.Letter.ToString());
      lstPaper.Items.Add(PaperKind.CSheet.ToString());

      //Add all the printer resolutions to the list box
      lstRes.Items.Add(PrinterResolutionKind.Custom.ToString());
      lstRes.Items.Add(PrinterResolutionKind.Draft.ToString());
      lstRes.Items.Add(PrinterResolutionKind.High.ToString());
      lstRes.Items.Add(PrinterResolutionKind.Low.ToString());
      lstRes.Items.Add(PrinterResolutionKind.Medium.ToString());
    }

    private void cmdStartPrint_Click(object sender, System.EventArgs e)
    {
      try
      {
        file = new StreamReader("Test.txt");
        try
        {
          //Create the document and give it a somewhat unique name
          Pd = new PrintDocument();
          Pd.DocumentName = DateTime.Now.Millisecond.ToString();

          //Install event handlers
          Pd.BeginPrint += new PrintEventHandler(this.BeginPrint);
          Pd.PrintPage  += new PrintPageEventHandler(this.PagePrint);
          Pd.EndPrint   += new PrintEventHandler(this.EndPrint);

          // Print the document.
          Pd.Print();
        }
        finally
        {
          file.Close();
          if (Pd != null)
            Pd.Dispose();
          if (Pf != null)
            Pf.Dispose();
        }
      }
      catch(Exception ex) 
      { 
        MessageBox.Show(ex.Message);
      }
    }

    private void BeginPrint(object sender, PrintEventArgs ev)
    {
      PageSettings Psettings = Pd.DefaultPageSettings;

      //Initialize the font
      Pf = new Font("Times New Roman", 10);

      Pd.PrinterSettings.PrinterName = cmbPrinters.SelectedItem.ToString();

      foreach (PaperSize ps in Pd.PrinterSettings.PaperSizes)
      {
        if (ps.PaperName == lstPaper.SelectedItem.ToString())
        {
          Psettings.PaperSize = ps;
          break;
        }
      }

      foreach (PrinterResolution pr in Pd.PrinterSettings.PrinterResolutions)
      {
        if (pr.Kind.ToString() == lstRes.SelectedItem.ToString())
        {
          Psettings.PrinterResolution = pr;
          break;
        }
      }

      //Make 1/4 inch margins all around
      Psettings.Margins = new Margins(25, 25, 25, 25);
      Pd.DefaultPageSettings = Psettings;
      //Reset the pages 
      Pages = 0;
    }

    private void EndPrint(object sender, PrintEventArgs ev)
    {
      Pf.Dispose();
    }

    // The PrintPage event is raised for each page to be printed.
    private void PagePrint(object sender, PrintPageEventArgs ev) 
    {
      float linesPerPage = 0;
      float yPos =  0;
      int   count = 0;
      float leftMargin = ev.MarginBounds.Left;
      float topMargin = ev.MarginBounds.Top;
      String line = null;
            
      //Keep track of pages as they are printed
      if (++Pages == 2)
      {
        try
        {
          ev.PageSettings.Landscape = true;
        }
        catch (Exception ex)
        {
          ev.PageSettings.Landscape = false;
        }
      }
      else
        ev.PageSettings.Landscape = false;

      // Calculate the number of lines per page.
      linesPerPage = ev.MarginBounds.Height / Pf.GetHeight(ev.Graphics);

      // Iterate over the file, printing each line. Use a basic StringFormat
      while (count++ < linesPerPage && ((line=file.ReadLine()) != null)) 
      {
        yPos = topMargin + (count * Pf.GetHeight(ev.Graphics));
        ev.Graphics.DrawString (line, Pf, Brushes.Black, 
                                leftMargin, yPos, new StringFormat());
      }

      // If more lines exist, print another page.
      if (line != null) 
        ev.HasMorePages = true;
      else 
        ev.HasMorePages = false;
    }
	}
}
