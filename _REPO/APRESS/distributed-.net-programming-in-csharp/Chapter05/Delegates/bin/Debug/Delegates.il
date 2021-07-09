
//  Microsoft (R) .NET Framework IL Disassembler.  Version 1.0.3705.0
//  Copyright (C) Microsoft Corporation 1998-2001. All rights reserved.

.assembly extern mscorlib
{
  .publickeytoken = (B7 7A 5C 56 19 34 E0 89 )                         // .z\V.4..
  .ver 1:0:3300:0
}
.assembly Delegates
{
  .custom instance void [mscorlib]System.Reflection.AssemblyKeyNameAttribute::.ctor(string) = ( 01 00 00 00 00 ) 
  .custom instance void [mscorlib]System.Reflection.AssemblyKeyFileAttribute::.ctor(string) = ( 01 00 00 00 00 ) 
  .custom instance void [mscorlib]System.Reflection.AssemblyDelaySignAttribute::.ctor(bool) = ( 01 00 00 00 00 ) 
  .custom instance void [mscorlib]System.Reflection.AssemblyTrademarkAttribute::.ctor(string) = ( 01 00 00 00 00 ) 
  .custom instance void [mscorlib]System.Reflection.AssemblyCopyrightAttribute::.ctor(string) = ( 01 00 00 00 00 ) 
  .custom instance void [mscorlib]System.Reflection.AssemblyProductAttribute::.ctor(string) = ( 01 00 00 00 00 ) 
  .custom instance void [mscorlib]System.Reflection.AssemblyCompanyAttribute::.ctor(string) = ( 01 00 00 00 00 ) 
  .custom instance void [mscorlib]System.Reflection.AssemblyConfigurationAttribute::.ctor(string) = ( 01 00 00 00 00 ) 
  .custom instance void [mscorlib]System.Reflection.AssemblyDescriptionAttribute::.ctor(string) = ( 01 00 00 00 00 ) 
  .custom instance void [mscorlib]System.Reflection.AssemblyTitleAttribute::.ctor(string) = ( 01 00 00 00 00 ) 
  // --- The following custom attribute is added automatically, do not uncomment -------
  //  .custom instance void [mscorlib]System.Diagnostics.DebuggableAttribute::.ctor(bool,
  //                                                                                bool) = ( 01 00 01 01 00 00 ) 
  .hash algorithm 0x00008004
  .ver 1:0:818:14848
}
.module Delegates.exe
// MVID: {81A03D55-BFFA-423D-93E9-2EBB3CC9E8DA}
.imagebase 0x00400000
.subsystem 0x00000003
.file alignment 512
.corflags 0x00000001
// Image base: 0x02e40000
//
// ============== CLASS STRUCTURE DECLARATION ==================
//
.namespace Delegates
{
  .class private auto ansi beforefieldinit DelegateMain
         extends [mscorlib]System.Object
  {
    .class auto ansi sealed nested private FooBar
           extends [mscorlib]System.MulticastDelegate
    {
    } // end of class FooBar

    .class auto ansi sealed nested private AnotherDelegate
           extends [mscorlib]System.MulticastDelegate
    {
    } // end of class AnotherDelegate

  } // end of class DelegateMain

} // end of namespace Delegates


// =============================================================


// =============== GLOBAL FIELDS AND METHODS ===================


// =============================================================


// =============== CLASS MEMBERS DECLARATION ===================
//   note that class flags, 'extends' and 'implements' clauses
//          are provided here for information only

.namespace Delegates
{
  .class private auto ansi beforefieldinit DelegateMain
         extends [mscorlib]System.Object
  {
    .class auto ansi sealed nested private FooBar
           extends [mscorlib]System.MulticastDelegate
    {
      .method public hidebysig specialname rtspecialname 
              instance void  .ctor(object 'object',
                                   native int 'method') runtime managed
      {
      } // end of method FooBar::.ctor

      .method public hidebysig virtual instance int32 
              Invoke(int32 i) runtime managed
      {
      } // end of method FooBar::Invoke

      .method public hidebysig newslot virtual 
              instance class [mscorlib]System.IAsyncResult 
              BeginInvoke(int32 i,
                          class [mscorlib]System.AsyncCallback callback,
                          object 'object') runtime managed
      {
      } // end of method FooBar::BeginInvoke

      .method public hidebysig newslot virtual 
              instance int32  EndInvoke(class [mscorlib]System.IAsyncResult result) runtime managed
      {
      } // end of method FooBar::EndInvoke

    } // end of class FooBar

    .class auto ansi sealed nested private AnotherDelegate
           extends [mscorlib]System.MulticastDelegate
    {
      .method public hidebysig specialname rtspecialname 
              instance void  .ctor(object 'object',
                                   native int 'method') runtime managed
      {
      } // end of method AnotherDelegate::.ctor

      .method public hidebysig virtual instance string 
              Invoke(string msg,
                     [out] int32& i) runtime managed
      {
      } // end of method AnotherDelegate::Invoke

      .method public hidebysig newslot virtual 
              instance class [mscorlib]System.IAsyncResult 
              BeginInvoke(string msg,
                          [out] int32& i,
                          class [mscorlib]System.AsyncCallback callback,
                          object 'object') runtime managed
      {
      } // end of method AnotherDelegate::BeginInvoke

      .method public hidebysig newslot virtual 
              instance string  EndInvoke([out] int32& i,
                                         class [mscorlib]System.IAsyncResult result) runtime managed
      {
      } // end of method AnotherDelegate::EndInvoke

    } // end of class AnotherDelegate

    .method private hidebysig static int32 
            Foo(int32 i) cil managed
    {
      // Code size       6 (0x6)
      .maxstack  1
      .locals init ([0] int32 CS$00000003$00000000)
      .language '{3F5162F8-07C6-11D3-9053-00C04FA302A1}', '{994B45C4-E6E9-11D2-903F-00C04FA302A1}', '{5A869D0B-6611-11D3-BD2A-0000F80849BD}'
// Source File 'd:\apress\distributednet\c5\scratchcode\delegates\delegatemain.cs' 
//000013:       static int Foo(int i) {return (int)i;}
      IL_0000:  ldarg.0
      IL_0001:  stloc.0
      IL_0002:  br.s       IL_0004

      IL_0004:  ldloc.0
      IL_0005:  ret
    } // end of method DelegateMain::Foo

    .method private hidebysig static int32 
            Bar(int32 i,
                int32 j) cil managed
    {
      // Code size       8 (0x8)
      .maxstack  2
      .locals init ([0] int32 CS$00000003$00000000)
//000014: 
//000015:       // Bar adds two ints
//000016:       static int Bar(int i, int j) {return i + j;}
      IL_0000:  ldarg.0
      IL_0001:  ldarg.1
      IL_0002:  add
      IL_0003:  stloc.0
      IL_0004:  br.s       IL_0006

      IL_0006:  ldloc.0
      IL_0007:  ret
    } // end of method DelegateMain::Bar

    .method private hidebysig static int32 
            DoIt(class Delegates.DelegateMain/FooBar f,
                 int32 'value') cil managed
    {
      // Code size       12 (0xc)
      .maxstack  2
      .locals init ([0] int32 CS$00000003$00000000)
//000017: 
//000018:       // This is our function that requires a delegate to any
//000019:       // function matching the FooBar signature
//000020:       static int DoIt(FooBar f, int value)
//000021:       {
//000022:          return f(value);
      IL_0000:  ldarg.0
      IL_0001:  ldarg.1
      IL_0002:  callvirt   instance int32 Delegates.DelegateMain/FooBar::Invoke(int32)
      IL_0007:  stloc.0
      IL_0008:  br.s       IL_000a

//000023:       }
      IL_000a:  ldloc.0
      IL_000b:  ret
    } // end of method DelegateMain::DoIt

    .method private hidebysig static void 
            Main(string[] args) cil managed
    {
      .entrypoint
      // Code size       30 (0x1e)
      .maxstack  3
//000024: 
//000025:       static void Main(string[] args)
//000026:       {
//000027:          Console.WriteLine(DoIt(new FooBar(Foo), 6));
      IL_0000:  ldnull
      IL_0001:  ldftn      int32 Delegates.DelegateMain::Foo(int32)
      IL_0007:  newobj     instance void Delegates.DelegateMain/FooBar::.ctor(object,
                                                                              native int)
      IL_000c:  ldc.i4.6
      IL_000d:  call       int32 Delegates.DelegateMain::DoIt(class Delegates.DelegateMain/FooBar,
                                                              int32)
      IL_0012:  call       void [mscorlib]System.Console::WriteLine(int32)
//000028: 
//000029:          // No way to "trick" this to compile!!
//000030:          // Console.WriteLine(DoIt(new FooBar(Bar), 6));
//000031: 
//000032:          Console.ReadLine();
      IL_0017:  call       string [mscorlib]System.Console::ReadLine()
      IL_001c:  pop
//000033:       }
      IL_001d:  ret
    } // end of method DelegateMain::Main

    .method public hidebysig specialname rtspecialname 
            instance void  .ctor() cil managed
    {
      // Code size       7 (0x7)
      .maxstack  1
      IL_0000:  ldarg.0
      IL_0001:  call       instance void [mscorlib]System.Object::.ctor()
      IL_0006:  ret
    } // end of method DelegateMain::.ctor

  } // end of class DelegateMain


// =============================================================

} // end of namespace Delegates

//*********** DISASSEMBLY COMPLETE ***********************
// WARNING: Created Win32 resource file D:\APress\DistributedNet\c5\ScratchCode\Delegates\bin\Debug\Delegates.res
