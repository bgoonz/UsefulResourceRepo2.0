using System;

namespace UserDefinedConversionExample
{
    class AccountBalance
    {
        int m_balance;

        public AccountBalance( int b )
        {
            m_balance = b;
        }

        public static implicit operator int( AccountBalance a )
        {
            return a.m_balance;
        }

        public static explicit operator string( AccountBalance a )
        {
            return "$" + a.m_balance;
        }

        static void Main(string[] args)
        {
            AccountBalance bal = new AccountBalance( 777 );

            // since int conversion is implicit we can write

            int i = bal;

            // string conveersion must be explicitly requested

            string str = (string)bal;

            // this causes a compilation error
            // str = bal;

            System.Console.WriteLine( "i = {0} \nstr = {1}", i, str );
        }
    }
}
