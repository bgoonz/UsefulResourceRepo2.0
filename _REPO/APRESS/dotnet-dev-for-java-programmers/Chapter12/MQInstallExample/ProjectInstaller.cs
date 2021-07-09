using System;
using System.Collections;
using System.ComponentModel;
using System.Configuration.Install;

namespace MQInstallExample
{
	/// <summary>
	/// Summary description for ProjectInstaller.
	/// </summary>
	[RunInstaller(true)]
	public class ProjectInstaller : System.Configuration.Install.Installer
	{
		private System.Messaging.MessageQueueInstaller messageQueueInstaller1;
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
			this.messageQueueInstaller1 = new System.Messaging.MessageQueueInstaller();
			// 
			// messageQueueInstaller1
			// 
			this.messageQueueInstaller1.BasePriority = ((short)(0));
			this.messageQueueInstaller1.MaximumJournalSize = ((long)(4294967295));
			this.messageQueueInstaller1.MaximumQueueSize = ((long)(4294967295));
			this.messageQueueInstaller1.Path = "alien\\Private$\\InstallExample";
			// 
			// ProjectInstaller
			// 
			this.Installers.AddRange(new System.Configuration.Install.Installer[] {
																					  this.messageQueueInstaller1});

		}
		#endregion
	}
}
