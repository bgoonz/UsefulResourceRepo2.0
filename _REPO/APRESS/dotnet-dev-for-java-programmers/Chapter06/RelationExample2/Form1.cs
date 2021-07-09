using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace RelationExample2
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		private System.Windows.Forms.Panel panel1;
		private System.Windows.Forms.TabControl tabControl1;
		private System.Windows.Forms.Splitter splitter1;
		private System.Windows.Forms.TextBox listTextBox;
		private System.Windows.Forms.Button loadDataButton;
		private System.Windows.Forms.TabPage languageTabPage;
		private System.Windows.Forms.TabPage developerTabPage;
		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.ComboBox comboBox1;
		private System.Windows.Forms.Button button1;
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.Container components = null;

		public Form1()
		{
			//
			// Required for Windows Form Designer support
			//
			InitializeComponent();

			//
			// TODO: Add any constructor code after InitializeComponent call
			//
		}

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
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
			this.panel1 = new System.Windows.Forms.Panel();
			this.tabControl1 = new System.Windows.Forms.TabControl();
			this.splitter1 = new System.Windows.Forms.Splitter();
			this.listTextBox = new System.Windows.Forms.TextBox();
			this.loadDataButton = new System.Windows.Forms.Button();
			this.languageTabPage = new System.Windows.Forms.TabPage();
			this.developerTabPage = new System.Windows.Forms.TabPage();
			this.label1 = new System.Windows.Forms.Label();
			this.comboBox1 = new System.Windows.Forms.ComboBox();
			this.button1 = new System.Windows.Forms.Button();
			this.panel1.SuspendLayout();
			this.tabControl1.SuspendLayout();
			this.languageTabPage.SuspendLayout();
			this.SuspendLayout();
			// 
			// panel1
			// 
			this.panel1.Controls.AddRange(new System.Windows.Forms.Control[] {
																				 this.loadDataButton});
			this.panel1.Dock = System.Windows.Forms.DockStyle.Bottom;
			this.panel1.Location = new System.Drawing.Point(0, 226);
			this.panel1.Name = "panel1";
			this.panel1.Size = new System.Drawing.Size(492, 40);
			this.panel1.TabIndex = 0;
			// 
			// tabControl1
			// 
			this.tabControl1.Controls.AddRange(new System.Windows.Forms.Control[] {
																					  this.languageTabPage,
																					  this.developerTabPage});
			this.tabControl1.Dock = System.Windows.Forms.DockStyle.Left;
			this.tabControl1.Name = "tabControl1";
			this.tabControl1.SelectedIndex = 0;
			this.tabControl1.Size = new System.Drawing.Size(200, 226);
			this.tabControl1.TabIndex = 1;
			// 
			// splitter1
			// 
			this.splitter1.Location = new System.Drawing.Point(200, 0);
			this.splitter1.Name = "splitter1";
			this.splitter1.Size = new System.Drawing.Size(3, 226);
			this.splitter1.TabIndex = 2;
			this.splitter1.TabStop = false;
			// 
			// listTextBox
			// 
			this.listTextBox.Dock = System.Windows.Forms.DockStyle.Fill;
			this.listTextBox.Location = new System.Drawing.Point(203, 0);
			this.listTextBox.Multiline = true;
			this.listTextBox.Name = "listTextBox";
			this.listTextBox.Size = new System.Drawing.Size(289, 226);
			this.listTextBox.TabIndex = 3;
			this.listTextBox.Text = "";
			// 
			// loadDataButton
			// 
			this.loadDataButton.Dock = System.Windows.Forms.DockStyle.Fill;
			this.loadDataButton.Name = "loadDataButton";
			this.loadDataButton.Size = new System.Drawing.Size(492, 40);
			this.loadDataButton.TabIndex = 0;
			this.loadDataButton.Text = "Load Data";
			// 
			// languageTabPage
			// 
			this.languageTabPage.Controls.AddRange(new System.Windows.Forms.Control[] {
																						  this.button1,
																						  this.comboBox1,
																						  this.label1});
			this.languageTabPage.Location = new System.Drawing.Point(4, 22);
			this.languageTabPage.Name = "languageTabPage";
			this.languageTabPage.Size = new System.Drawing.Size(192, 200);
			this.languageTabPage.TabIndex = 0;
			this.languageTabPage.Text = "language";
			// 
			// developerTabPage
			// 
			this.developerTabPage.Location = new System.Drawing.Point(4, 22);
			this.developerTabPage.Name = "developerTabPage";
			this.developerTabPage.Size = new System.Drawing.Size(192, 200);
			this.developerTabPage.TabIndex = 1;
			this.developerTabPage.Text = "developer";
			// 
			// label1
			// 
			this.label1.Location = new System.Drawing.Point(8, 8);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(144, 23);
			this.label1.TabIndex = 0;
			this.label1.Text = "Choose a language";
			// 
			// comboBox1
			// 
			this.comboBox1.Location = new System.Drawing.Point(8, 48);
			this.comboBox1.Name = "comboBox1";
			this.comboBox1.Size = new System.Drawing.Size(168, 21);
			this.comboBox1.TabIndex = 1;
			// 
			// button1
			// 
			this.button1.Dock = System.Windows.Forms.DockStyle.Bottom;
			this.button1.Location = new System.Drawing.Point(0, 150);
			this.button1.Name = "button1";
			this.button1.Size = new System.Drawing.Size(192, 50);
			this.button1.TabIndex = 2;
			this.button1.Text = "Which developers know this language?";
			// 
			// Form1
			// 
			this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
			this.ClientSize = new System.Drawing.Size(492, 266);
			this.Controls.AddRange(new System.Windows.Forms.Control[] {
																		  this.listTextBox,
																		  this.splitter1,
																		  this.tabControl1,
																		  this.panel1});
			this.Name = "Form1";
			this.Text = "Form1";
			this.panel1.ResumeLayout(false);
			this.tabControl1.ResumeLayout(false);
			this.languageTabPage.ResumeLayout(false);
			this.ResumeLayout(false);

		}
		#endregion

		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main() 
		{
			Application.Run(new Form1());
		}
	}
}
