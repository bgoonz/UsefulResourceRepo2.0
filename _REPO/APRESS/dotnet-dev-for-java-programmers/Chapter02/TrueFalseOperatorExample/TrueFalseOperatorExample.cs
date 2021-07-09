using System;

namespace TrueFalseOperatorExample
{
    public class FalseWhenNull
    {
        public static bool operator true ( FalseWhenNull e )
        {
            return  ( e == null ) ? false : e.b;
        }

        public static bool operator false ( FalseWhenNull e )
        {
            return  ( e == null ) ? true : !e.b;
        }

        public bool b;

        public FalseWhenNull( bool b )
        {
            this.b = b;
        }

        public static void Main( string[] args )
        {
            FalseWhenNull truefwn = new FalseWhenNull( true );
            FalseWhenNull falsefwn = new FalseWhenNull( false );
            FalseWhenNull nullfwn = null;

            if ( truefwn )
            {
                System.Console.WriteLine( "true" );
            }
            else
            {
                System.Console.WriteLine( "false" );
            }

            if ( falsefwn )
            {
                System.Console.WriteLine( "true" );
            }
            else
            {
                System.Console.WriteLine( "false" );
            }

            if ( nullfwn )
            {
                System.Console.WriteLine( "true" );
            }
            else
            {
                System.Console.WriteLine( "false" );
            }
        }
    }
}
