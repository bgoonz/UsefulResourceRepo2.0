using System;

namespace OperatorOverloadingExample
{
    public class Point
    {
        protected int m_x;
        protected int m_y;

        public Point( int x, int y )
        {
            m_x = x;
            m_y = y;
        }

        public int X
        {
            get
            {
                return m_x;
            }
        }

        public int Y
        {
            get
            {
                return m_y;
            }
        }

        public static Point operator + ( Point a, Point b )
        {
            return new Point( a.X + b.X, a.Y + b.Y );
        }

        public static Point operator - ( Point a )
        {
            return new Point( - a.X , - a.Y );
        }

        static void Main(string[] args)
        {
            Point p = new Point( 3, 4 );
            Point q = new Point( 36, -5 );

            Point r = p + ( - q );

            System.Console.WriteLine( "Result: x = {0}, y = {1}", r.X, r.Y );
        }
    }
}
