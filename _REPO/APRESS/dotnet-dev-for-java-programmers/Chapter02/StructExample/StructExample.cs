using System;

namespace StructExample
{
    public struct Point
    {
        public int x;
        public int y;

        public Point( int x, int y )
        {
            this.x = x;
            this.y = y;
        }

        public void Print()
        {
            System.Console.WriteLine( "x = {0}, y = {1}", x, y );
        }
    }

    class StructExample
    {
        static void Main(string[] args)
        {
            Point p = new Point( 3, 4 );

            Point q = p;    // takes a copy

            q.x = 5;        // only changes q not p

            p.Print();      // so we still see x = 3, y = 4
        }
    }
}
