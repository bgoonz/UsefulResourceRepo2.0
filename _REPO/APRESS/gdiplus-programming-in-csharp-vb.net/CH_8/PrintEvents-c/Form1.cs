using System;
using System.IO;
using System.Drawing;
using System.Drawing.Printing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace PrintEvents_c
{
	public class Form1 : System.Windows.Forms.Form
	{
    private Font PrintFont;
    private StreamReader PrintStream;

    private System.Windows.Forms.Button cmdPrint;
    private System.Windows.Forms.Label lblEvents;

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
        PrintFont.Dispose();
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
      this.cmdPrint = new System.Windows.Forms.Button();
      this.lblEvents = new System.Windows.Forms.Label();
      this.SuspendLayout();
      // 
      // cmdPrint
      // 
      this.cmdPrint.Location = new System.Drawing.Point(104, 280);
      this.cmdPrint.Name = "cmdPrint";
      this.cmdPrint.Size = new System.Drawing.Size(80, 24);
      this.cmdPrint.TabIndex = 0;
      this.cmdPrint.Text = "Print";
      this.cmdPrint.Click += new System.EventHandler(this.cmdPrint_Click);
      // 
      // lblEvents
      // 
      this.lblEvents.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
      this.lblEvents.Location = new System.Drawing.Point(24, 16);
      this.lblEvents.Name = "lblEvents";
      this.lblEvents.Size = new System.Drawing.Size(248, 248);
      this.lblEvents.TabIndex = 1;
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(292, 323);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.lblEvents,
                                                                  this.cmdPrint});
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
    }

    // Print the file.
    public void Print_It()
    {
      try 
      {
        //Get the file to print
        PrintStream = new StreamReader ("Test.txt");
        try 
        {
          PrintFont = new Font("Arial", 10);
          PrintDocument pd = new PrintDocument(); 

          //Assign my overloaded version of the standard print controller
          //Send it a reference to the label so it can tell us what is 
          //going on.
          pd.PrintController = new MyPrintController(ref lblEvents);

          //Install event handlers
          pd.BeginPrint += new PrintEventHandler(this.pd_StartPrint);
          pd.PrintPage  += new PrintPageEventHandler(this.pd_PrintPage);
          pd.EndPrint   += new PrintEventHandler(this.pd_EndPrint);

          // Print the document.
          pd.Print();
        } 
        finally 
        {
          PrintStream.Close();
        }
      } 
      catch(Exception ex) 
      { 
        MessageBox.Show(ex.Message);
      }
    }


    private void pd_StartPrint(object sender, PrintEventArgs ev)
    {
      lblEvents.Text += "PrintDocument: BeginPrint\n";
    }

    private void pd_EndPrint(object sender, PrintEventArgs ev)
    {
      lblEvents.Text += "PrintDocument: EndPrinting\n";
    }

    // The PrintPage event is raised for each page to be printed.
    private void pd_PrintPage(object sender, PrintPageEventArgs ev) 
    {
      float linesPerPage = 0;
      float yPos =  0;
      int   count = 0;
      float leftMargin = ev.MarginBounds.Left;
      float topMargin = ev.MarginBounds.Top;
      String line=null;
            
      lblEvents.Text += "PrintDocument:  PagePrint\n";

      // Calculate the number of lines per page.
      linesPerPage = ev.MarginBounds.Height / PrintFont.GetHeight(ev.Graphics);

      // Iterate over the file, printing each line. Use a basic StringFormat
      while (count++ < linesPerPage && ((line=PrintStream.ReadLine()) != null)) 
      {
        //Calculate vertical position of the line.
        yPos = topMargin + (count * PrintFont.GetHeight(ev.Graphics));
        //This is the graphics object obtained by the PrintController
        //OnStartPage method.  We are drawing to the printer!!
        ev.Graphics.DrawString (line, PrintFont, Brushes.Black, 
                                leftMargin, yPos, new StringFormat());
      }

      // If more lines exist, print another page.
      if (line != null) 
        ev.HasMorePages = true;
      else 
        ev.HasMorePages = false;
    }

    private void cmdPrint_Click(object sender, System.EventArgs e)
    {
      Print_It();
    }
	}
}
