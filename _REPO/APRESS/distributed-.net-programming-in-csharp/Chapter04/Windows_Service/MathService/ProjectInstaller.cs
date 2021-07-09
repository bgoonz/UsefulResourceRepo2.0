using System;
using System.Collections;
using System.ComponentModel;
using System.Configuration.Install;

namespace MathService
{
	/// <summary>
	/// Summary description for ProjectInstaller.
	/// </summary>
	[RunInstaller(true)]
	public class ProjectInstaller : System.Configuration.Install.Installer
	{
      private System.ServiceProcess.ServiceInstaller MathServiceInstaller;
      private System.ServiceProcess.ServiceProcessInstaller mathServiceProcessInstaller;
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.Container components = null;

		public ProjectInstaller()
		{
			// This call is required by the Designer.
			InitializeComponent();

			// TODO: Add any initialization after the InitComponent call
		}

		#region Component Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
         this.mathServiceProcessInstaller = new System.ServiceProcess.ServiceProcessInstaller();
         this.MathServiceInstaller = new System.ServiceProcess.ServiceInstaller();
         // 
         // mathServiceProcessInstaller
         // 
         this.mathServiceProcessInstaller.Account = System.ServiceProcess.ServiceAccount.LocalSystem;
         this.mathServiceProcessInstaller.Password = null;
         this.mathServiceProcessInstaller.Username = null;
         // 
         // MathServiceInstaller
         // 
         this.MathServiceInstaller.ServiceName = "MathService";
         // 
         // ProjectInstaller
         // 
         this.Installers.AddRange(new System.Configuration.Install.Installer[] {
                                                                                  this.mathServiceProcessInstaller,
                                                                                  this.MathServiceInstaller});

      }
		#endregion
	}
}
