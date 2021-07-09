using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.ServiceProcess;
using System.Threading;

namespace PerfCounterExample
{
	public class Service1 : System.ServiceProcess.ServiceBase
	{
		/// <summary> 
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.Container components = null;

		public Service1()
		{
			// This call is required by the Windows.Forms Component Designer.
			InitializeComponent();

			// TODO: Add any initialization after the InitComponent call
		}

		// The main entry point for the process
		static void Main()
		{
			System.ServiceProcess.ServiceBase[] ServicesToRun;
	
			// More than one user Service may run within the same process. To add
			// another service to this process, change the following line to
			// create a second service object. For example,
			//
			//   ServicesToRun = New System.ServiceProcess.ServiceBase[] {new Service1(), new MySecondUserService()};
			//
			ServicesToRun = new System.ServiceProcess.ServiceBase[] { new Service1() };

			System.ServiceProcess.ServiceBase.Run(ServicesToRun);
		}

		/// <summary> 
		/// Required method for Designer support - do not modify 
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
			this.performanceCounter1 = new System.Diagnostics.PerformanceCounter();
			this.performanceCounter2 = new System.Diagnostics.PerformanceCounter();
			((System.ComponentModel.ISupportInitialize)(this.performanceCounter1)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.performanceCounter2)).BeginInit();
			// 
			// performanceCounter1
			// 
			this.performanceCounter1.CategoryName = "MyPerfCounters";
			this.performanceCounter1.CounterName = "Absolute";
			this.performanceCounter1.ReadOnly = false;
			// 
			// performanceCounter2
			// 
			this.performanceCounter2.CategoryName = "MyPerfCounters";
			this.performanceCounter2.CounterName = "ServiceRate";
			this.performanceCounter2.ReadOnly = false;
			// 
			// Service1
			// 
			this.ServiceName = "PerfCounterExampleService";
			((System.ComponentModel.ISupportInitialize)(this.performanceCounter1)).EndInit();
			((System.ComponentModel.ISupportInitialize)(this.performanceCounter2)).EndInit();

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

		private System.Diagnostics.PerformanceCounter performanceCounter1;
		private System.Diagnostics.PerformanceCounter performanceCounter2;

		protected Thread m_worker = null;
		protected int m_timeToStop = 0;
		protected Random m_rand = new Random();

		/// <summary>
		/// Set things in motion so your service can do its work.
		/// </summary>
		protected override void OnStart(string[] args)
		{
			m_worker = new Thread( new ThreadStart( this.DoWork ) );
			m_worker.Start();
		}
 
		/// <summary>
		/// Stop this service.
		/// </summary>
		protected override void OnStop()
		{
			Interlocked.Increment( ref m_timeToStop );
			m_worker.Join();
		}

		protected void DoWork()
		{
			while ( m_timeToStop == 0 )
			{
				int sleepTime = (int)(m_rand.NextDouble() * 100.0);
				Thread.Sleep( sleepTime );
				performanceCounter1.Increment();
				performanceCounter2.Increment();
			}
		}
	}
}
