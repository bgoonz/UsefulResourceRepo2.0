Imports System
Imports System.IO
Imports System.Security.Cryptography

Module KeyGen

    Sub Main()
        Dim args As String() = System.Environment.GetCommandLineArgs()

        If args.Length <> 2 And args.Length <> 4 Then
            Console.WriteLine("Usage:")
            Console.WriteLine("KeyGenerator <Algorithm> [<KeySize> <Outputfile>]")
            Console.WriteLine("Algorithm can be: DES, TripleDES, RC2 or Rijndael")
            Console.WriteLine()
            Console.WriteLine("When only <Algorithm> is specified, the program")
            Console.WriteLine("will print a list of valid key sizes.")
            Return
        End If

        Dim algorithmname As String = args(1)

        Dim alg As SymmetricAlgorithm = SymmetricAlgorithm.Create(algorithmname)

        If alg Is Nothing Then
            Console.WriteLine("Invalid algorithm specified.")
            Return
        End If

        If args.Length = 2 Then
            ' just list the possible key sizes
            Console.WriteLine("Legal key sizes for algorithm {0}:", _ 
                algorithmname)
            Dim size As KeySizes
            For Each size In alg.LegalKeySizes
                If size.SkipSize <> 0 Then
                    Dim i As Integer
                    For i = size.MinSize To size.MaxSize Step size.SkipSize
                        Console.WriteLine("{0} bit", i)
                    Next i
                Else
                    If size.MinSize <> size.MaxSize Then
                        Console.WriteLine("{0} bit", size.MinSize)
                        Console.WriteLine("{0} bit", size.MaxSize)
                    Else
                        Console.WriteLine("{0} bit", size.MinSize)
                    End If
                End If
            Next size
            Return
        End If

        ' user wants to generate a key
        Dim keylen As Integer = Convert.ToInt32(args(2))
        Dim outfile As String = args(3)
        Try
            alg.KeySize = keylen
            alg.GenerateKey()
            Dim fs As New FileStream(outfile, FileMode.CreateNew)
            fs.Write(alg.Key, 0, alg.Key.Length)
            fs.Close()
            Console.WriteLine("{0} bit key written to {1}.", alg.Key.Length * 8, _
                outfile)
        Catch e As Exception
            Console.WriteLine("Exception: {0}", e.Message)
            Return
        End Try
    End Sub

End Module
