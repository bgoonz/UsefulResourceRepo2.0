using System;
using System.Windows.Forms;
using System.Drawing;
using System.Drawing.Printing;
using System.ComponentModel;

namespace PrintEvents_c
{
	public class MyPrintController : StandardPrintController
	{
    private Label lblEvents;
		public MyPrintController(ref Label lbl): base()
		{
      lblEvents = lbl;
    }

    public override void OnStartPrint(PrintDocument doc, PrintEventArgs e)
    {
      lblEvents.Text += "      PrintController: OnStartPrint\n";
      base.OnStartPrint(doc, e);
    }
    public override Graphics OnStartPage(PrintDocument doc, PrintPageEventArgs e)
    {
      lblEvents.Text += "      PrintController: OnStartPage\n";
      return( base.OnStartPage(doc, e) );
    }
    public override void OnEndPage(PrintDocument doc, PrintPageEventArgs e)
    {
      lblEvents.Text += "      PrintController: OnEndPage\n";
      base.OnEndPage(doc, e);
    }
    public override void OnEndPrint(PrintDocument doc, PrintEventArgs e)
    {
      lblEvents.Text += "      PrintController: OnEndPrint\n";
      base.OnEndPrint(doc, e);
    }
  }
}
