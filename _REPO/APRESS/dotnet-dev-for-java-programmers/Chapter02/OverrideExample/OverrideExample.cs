namespace OverrideExample
{
    class Class1
    {
        public virtual void Hello()
        {
            System.Console.Write( "Hello from Class1" );
        }
    }

    class Class2 : Class1
    {
        public override void Hello()
        {
            base.Hello();
            System.Console.Write( " and hello from Class2 too" );
        }

        public static void Main( string[] args )
        {
            Class2 c2 = new Class2();
            c2.Hello();
        }
    }
}
