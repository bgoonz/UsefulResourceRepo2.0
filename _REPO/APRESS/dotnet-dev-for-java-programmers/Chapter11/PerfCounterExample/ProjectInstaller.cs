using System;
using System.Collections;
using System.ComponentModel;
using System.Configuration.Install;

namespace PerfCounterExample
{
	/// <summary>
	/// Summary description for ProjectInstaller.
	/// </summary>
	[RunInstaller(true)]
	public class ProjectInstaller : System.Configuration.Install.Installer
	{
		private System.Diagnostics.PerformanceCounterInstaller performanceCounterInstaller1;
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
			this.performanceCounterInstaller1 = new System.Diagnostics.PerformanceCounterInstaller();
			// 
			// performanceCounterInstaller1
			// 
			this.performanceCounterInstaller1.CategoryHelp = "None";
			this.performanceCounterInstaller1.CategoryName = "PerfCounterExample";
			this.performanceCounterInstaller1.Counters.AddRange(new System.Diagnostics.CounterCreationData[] {
																												 new System.Diagnostics.CounterCreationData("ExampleCounter", "None", System.Diagnostics.PerformanceCounterType.NumberOfItems32)});
			// 
			// ProjectInstaller
			// 
			this.Installers.AddRange(new System.Configuration.Install.Installer[] {
																					  this.performanceCounterInstaller1});

		}
		#endregion
	}
}
