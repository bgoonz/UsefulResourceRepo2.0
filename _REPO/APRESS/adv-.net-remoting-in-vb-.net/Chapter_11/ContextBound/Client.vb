Option Explicit On 
Option Strict On

Module Client

    Sub Main()
        Dim org As New Organization()
        Try
            Console.WriteLine("Will set the name")
            org.Name = "Happy Hackers"
            Console.WriteLine("Will donate")
            org.Donate(99)
            Console.WriteLine("Will donate more")
            org.Donate(102)
        Catch e As Exception
            Console.WriteLine("Exception: {0}", e.Message)
        End Try

        Console.WriteLine("Finished, press <return> to quit.")
        Console.ReadLine()
    End Sub
End Module
