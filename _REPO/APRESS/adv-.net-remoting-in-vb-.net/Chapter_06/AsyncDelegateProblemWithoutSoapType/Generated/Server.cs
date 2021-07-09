using System;
using System.Runtime.Remoting.Messaging;
using System.Runtime.Remoting.Metadata;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
namespace Server {

    [Serializable]
    public class SomeSAO : System.MarshalByRefObject
    {
        [SoapMethod(SoapAction=@"http://schemas.microsoft.com/clr/nsassem/Server.SomeSAO/Server#DoSomething")]
        public void DoSomething()
        {
            return;
        }

    }
}
