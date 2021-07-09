using System;
using System.Runtime.Remoting.Messaging;
using System.Runtime.Remoting.Metadata;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
namespace Server {

    [SoapType(XmlNamespace=@"http://schemas.microsoft.com/clr/nsassem/Server/Server%2C%20Version%3D1.0.870.18439%2C%20Culture%3Dneutral%2C%20PublicKeyToken%3Dnull", XmlTypeNamespace=@"http://schemas.microsoft.com/clr/nsassem/Server/Server%2C%20Version%3D1.0.870.18439%2C%20Culture%3Dneutral%2C%20PublicKeyToken%3Dnull")]
    public class CustomerManager : System.Runtime.Remoting.Services.RemotingClientProxy
    {
        // Constructor
        public CustomerManager()
        {
            base.ConfigureProxy(this.GetType(), @"http://localhost:80/MyServer/CustomerManager.soap");
            System.Runtime.Remoting.SoapServices.PreLoad(typeof(General.Customer));
        }

        public Object RemotingReference
        {
            get{return(_tp);}
        }

        [SoapMethod(SoapAction=@"http://schemas.microsoft.com/clr/nsassem/Server.CustomerManager/Server#getCustomer")]
        public General.Customer getCustomer(Int32 id)
        {
            return ((CustomerManager) _tp).getCustomer(id);
        }

    }
}
