using System;
using System.ComponentModel;
using System.Collections;
using System.Diagnostics;

namespace BareBonesComponentLibrary
{
	/// <summary>
	/// Summary description for VsBareBonesComponent2.
	/// </summary>
	public class VsBareBonesComponent2 : System.ComponentModel.Component
	{
		private BareBonesComponentLibrary.VsBareBonesComponent vsBareBonesComponent1;
		private System.ComponentModel.IContainer components;

		public VsBareBonesComponent2(System.ComponentModel.IContainer container)
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

		public VsBareBonesComponent2()
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
			this.components = new System.ComponentModel.Container();
			this.vsBareBonesComponent1 = new BareBonesComponentLibrary.VsBareBonesComponent(this.components);
			// 
			// vsBareBonesComponent1
			// 
			this.vsBareBonesComponent1.Message = null;

		}
		#endregion
	}
}
