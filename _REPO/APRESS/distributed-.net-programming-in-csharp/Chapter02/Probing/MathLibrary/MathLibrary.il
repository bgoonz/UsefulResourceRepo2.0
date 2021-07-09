
//  Microsoft (R) .NET Framework IL Disassembler.  Version 1.0.2914.16
//  Copyright (C) Microsoft Corp. 1998-2001. All rights reserved.

// PE Header:
// Subsystem:                      00000003
// Native entry point address:     0000253e
// Image base:                     11000000
// Section alignment:              00002000
// File alignment:                 00000200
// Stack reserve size:             00100000
// Stack commit size:              00001000
// Directories:                    00000010
// 0        [0       ] address [size] of Export Directory:          
// 24e4     [57      ] address [size] of Import Directory:          
// 4000     [340     ] address [size] of Resource Directory:        
// 0        [0       ] address [size] of Exception Directory:       
// 0        [0       ] address [size] of Security Directory:        
// 6000     [c       ] address [size] of Base Relocation Table:     
// 2100     [1c      ] address [size] of Debug Directory:           
// 0        [0       ] address [size] of Architecture Specific:     
// 0        [0       ] address [size] of Global Pointer:            
// 0        [0       ] address [size] of TLS Directory:             
// 0        [0       ] address [size] of Load Config Directory:     
// 0        [0       ] address [size] of Bound Import Directory:    
// 2000     [8       ] address [size] of Import Address Table:      
// 0        [0       ] address [size] of Delay Load IAT:            
// 2008     [48      ] address [size] of CLR Header:               

// Import Address Table
//     mscoree.dll
//              00002000 Import Address Table
//              0000252e Import Name Table
//              0        time date stamp
//              0        Index of first forwarder reference
//
//                    0  _CorDllMain

// Delay Load Import Address Table
// No data.
// CLR Header:
// 72       Header Size
// 2        Major Runtime Version
// 0        Minor Runtime Version
// 9        Flags
// 0        Entrypoint Token
// 218c     [358     ] address [size] of Metadata Directory:        
// 2100     [0       ] address [size] of Resources Directory:       
// 2050     [80      ] address [size] of Strong Name Signature:     
// 0        [0       ] address [size] of CodeManager Table:         
// 0        [0       ] address [size] of VTableFixups Directory:    
// 0        [0       ] address [size] of Export Address Table:      
// 0        [0       ] address [size] of Precompile Header:         
// Code Manager Table:
//  default
// VTableFixup Directory:
// No data.
// Export Address Table Jumps:
// No data.

.assembly extern mscorlib
{
  .publickeytoken = (B7 7A 5C 56 19 34 E0 89 )                         // .z\V.4..
  .ver 1:0:2411:0
}
.assembly MathLibrary
{
  .custom instance void [mscorlib]System.Reflection.AssemblyKeyFileAttribute::.ctor(string) = ( 01 00 0C 44 3A 5C 4D 79 4B 65 79 2E 73 6E 6B 00   // ...D:\MyKey.snk.
                                                                                                00 ) 
  // --- The following custom attribute is added automatically, do not uncomment -------
  //  .custom instance void [mscorlib]System.Diagnostics.DebuggableAttribute::.ctor(bool,
  //                                                                                bool) = ( 01 00 01 01 00 00 ) 
  .publickey = (00 24 00 00 04 80 00 00 94 00 00 00 06 02 00 00   // .$..............
                00 24 00 00 52 53 41 31 00 04 00 00 01 00 01 00   // .$..RSA1........
                FB 5F 4B CF 3D 3E 55 E5 E8 FD 7F AB 1A C2 88 C3   // ._K.=>U.........
                20 AC 38 89 67 03 AA 46 06 45 BE 95 A3 05 E7 7E   //  .8.g..F.E.....~
                DC 32 63 F9 C9 20 9F E7 85 44 92 EF 2A 5B CB 7F   // .2c.. ...D..*[..
                4B 54 E0 DA 87 62 8C 8F B0 8A 54 8C 31 FA CF 11   // KT...b....T.1...
                A1 19 58 99 64 E0 FE 64 C7 1C 2F 2D C7 45 97 38   // ..X.d..d../-.E.8
                FE 4D 79 97 93 33 A1 D3 24 CF 9D C0 0C 42 C1 21   // .My..3..$....B.!
                1C 31 33 12 B1 EF E1 26 BA C3 6C 80 67 99 92 B7   // .13....&..l.g...
                24 E2 28 0D 98 C2 AE BC 45 BF 9E E6 22 AA 03 F5 ) // $.(.....E..."...
  .hash algorithm 0x00008004
  .ver 0:0:0:0
}
.module MathLibrary.dll
// MVID: {52E91FB7-EDA8-48D0-A249-F6355F892F8E}
.imagebase 0x11000000
.subsystem 0x00000003
.file alignment 512
.corflags 0x00000009
// Image base: 0x03080000
.namespace MathLibrary
{
  .class public auto ansi beforefieldinit SimpleMath
         extends [mscorlib]System.Object
  {
    .method public hidebysig static int32 
            Add(int32 n1,
                int32 n2) cil managed
    {
      // Code size       8 (0x8)
      .maxstack  2
      .locals ([0] int32 CS$00000003$00000000)
      IL_0000:  ldarg.0
      IL_0001:  ldarg.1
      IL_0002:  add
      IL_0003:  stloc.0
      IL_0004:  br.s       IL_0006

      IL_0006:  ldloc.0
      IL_0007:  ret
    } // end of method SimpleMath::Add

    .method public hidebysig static int32 
            Subtract(int32 n1,
                     int32 n2) cil managed
    {
      // Code size       8 (0x8)
      .maxstack  2
      .locals ([0] int32 CS$00000003$00000000)
      IL_0000:  ldarg.0
      IL_0001:  ldarg.1
      IL_0002:  sub
      IL_0003:  stloc.0
      IL_0004:  br.s       IL_0006

      IL_0006:  ldloc.0
      IL_0007:  ret
    } // end of method SimpleMath::Subtract

    .method public hidebysig specialname rtspecialname 
            instance void  .ctor() cil managed
    {
      // Code size       7 (0x7)
      .maxstack  8
      IL_0000:  ldarg.0
      IL_0001:  call       instance void [mscorlib]System.Object::.ctor()
      IL_0006:  ret
    } // end of method SimpleMath::.ctor

  } // end of class SimpleMath

} // end of namespace MathLibrary

//*********** DISASSEMBLY COMPLETE ***********************
// WARNING: Created Win32 resource file D:\My Documents\A-Press\DistributedNet\Code\c1\MathLibrary\MathLibrary.res
