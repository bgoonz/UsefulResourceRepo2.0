using System;
using System.Runtime.Remoting.Messaging;
using System.Runtime.Remoting.Metadata;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
namespace General {

    [Serializable, SoapType(XmlNamespace=@"http://schemas.microsoft.com/clr/nsassem/General/General%2C%20Version%3D1.0.870.16791%2C%20Culture%3Dneutral%2C%20PublicKeyToken%3Dnull", XmlTypeNamespace=@"http://schemas.microsoft.com/clr/nsassem/General/General%2C%20Version%3D1.0.870.16791%2C%20Culture%3Dneutral%2C%20PublicKeyToken%3Dnull")]
    public class Customer
    {
        // Class Fields
        public String FirstName;
        public String LastName;
        public DateTime DateOfBirth;
    }
}
