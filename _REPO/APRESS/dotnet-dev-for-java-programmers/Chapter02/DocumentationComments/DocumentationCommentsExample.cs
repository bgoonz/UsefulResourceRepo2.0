using System;

namespace DocumentationCommentsExample
{
    /// <summary>
    /// A documentation sample - the short description goes here
    /// </summary>
    /// <remarks>Where a longer description would go</remarks>
    class ClassExample
    {
        /// <summary>
        /// A member variable
        /// </summary>
        private string m_str;

        /// <summary>
        /// A property example
        /// </summary>
        /// <remarks>
        /// You would put a more in depth description inside remarks tags
        /// </remarks>
        public string PropertyExample
        {
            get
            {
                return m_str;
            }
        }

        /// <summary>
        /// A method example
        /// </summary>
        /// <param name="val">a new value to be saved</param>
        /// <returns>the length of the string</returns>
        public int MethodExample( string val )
        {
            m_str = val;
            return val.Length;
        }

        /// <summary>
        /// The main method for the program
        /// </summary>
        /// <param name="args">command line arguments</param>
        static void Main(string[] args)
        {
        }
    }
}
