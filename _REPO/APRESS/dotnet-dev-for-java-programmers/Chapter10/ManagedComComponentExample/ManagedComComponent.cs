using System;
using System.ComponentModel;
using System.Collections;
using System.Diagnostics;

namespace ManagedComComponentExample
{
	/// <summary>
	/// Summary description for ManagedComComponent.
	/// </summary>
	public class ManagedComComponent : System.ComponentModel.Component
	{
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.Container components = null;

		public ManagedComComponent(System.ComponentModel.IContainer container)
		{
			/// <summary>
			/// Required for Windows.Forms Class Composition Designer support
			/// </summary>
			container.Add(this);
			InitializeComponent();

			//
			// TODO: Add any constructor code after InitializeComponent call
			//
		}

		public ManagedComComponent()
		{
			/// <summary>
			/// Required for Windows.Forms Class Composition Designer support
			/// </summary>
			InitializeComponent();

			//
			// TODO: Add any constructor code after InitializeComponent call
			//
		}

		#region Component Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
			components = new System.ComponentModel.Container();
		}
		#endregion

		private string m_message;

		public string Message
		{
			get
			{
				return m_message;
			}
			set
			{
				m_message = value;
			}
		}
	}
}
