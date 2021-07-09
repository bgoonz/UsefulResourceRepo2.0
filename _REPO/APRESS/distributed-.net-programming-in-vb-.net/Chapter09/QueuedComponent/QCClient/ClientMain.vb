Imports QCLogging
Imports System.Runtime.InteropServices

Module ClientMain

   Sub Main()
      'Interfaces are key with QC
      Dim logger As IQueuableLogger

      'Grab a reference to the QC's interface. This returns a recorder
      'object which implements the IQueueableLogger interface.
      logger = CType(Marshal.BindToMoniker("queue:/new:QCLogging.Logger"), _
         IQueuableLogger)

      'Use the queued component. The recorder is simply saving these
      'method calls. The methods do not execute (yet).
      logger.Write("Log message one")
      logger.Write("Log message two")

      'Release the recorder, which packages the method calls into
      'an MSMQ message.
      Marshal.ReleaseComObject(logger)
   End Sub

End Module
