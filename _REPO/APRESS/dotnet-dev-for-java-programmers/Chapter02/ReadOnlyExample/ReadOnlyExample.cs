using System;

namespace ReadOnlyExample
{
    public abstract class LogEntry
    {
        // the unique instance identifier that nobody can mess with

        protected readonly Guid id = Guid.NewGuid();

        protected string message;

        public LogEntry( string m )
        {
            message = m;
        }
    }

    public class ConcreteLogEntry : LogEntry
    {
        public ConcreteLogEntry( string m ) : base( m )
        {
            // the following causes a compile error
            // id = Guid.Empty;
        }

        public string Record()
        {
            return id.ToString() + " " + message;
        }

        static void Main(string[] args)
        {
            ConcreteLogEntry le = new ConcreteLogEntry( "something happened" );

            System.Console.WriteLine( le.Record() );
        }
    }
}
