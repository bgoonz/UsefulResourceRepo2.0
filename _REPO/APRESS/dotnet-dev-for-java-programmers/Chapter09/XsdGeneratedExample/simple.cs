﻿//------------------------------------------------------------------------------
// <autogenerated>
//     This code was generated by a tool.
//     Runtime Version: 1.0.3705.0
//
//     Changes to this file may cause incorrect behavior and will be lost if 
//     the code is regenerated.
// </autogenerated>
//------------------------------------------------------------------------------

// 
// This source code was auto-generated by xsd, Version=1.0.3705.0.
// 
using System.Xml.Serialization;


/// <remarks/>
[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://tempuri.org/simple.xsd")]
[System.Xml.Serialization.XmlRootAttribute("cars", Namespace="http://tempuri.org/simple.xsd", IsNullable=false)]
public class cars {
    
    /// <remarks/>
    [System.Xml.Serialization.XmlElementAttribute("car")]
    public carsCar[] Items;
}

/// <remarks/>
[System.Xml.Serialization.XmlTypeAttribute(Namespace="http://tempuri.org/simple.xsd")]
public class carsCar {
    
    /// <remarks/>
    [System.Xml.Serialization.XmlAttributeAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
    public string make;
    
    /// <remarks/>
    [System.Xml.Serialization.XmlAttributeAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified)]
    public string model;
}
