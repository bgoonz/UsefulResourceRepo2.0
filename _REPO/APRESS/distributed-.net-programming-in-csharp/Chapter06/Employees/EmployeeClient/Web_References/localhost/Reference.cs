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
// This source code was auto-generated by Microsoft.VSDesigner, Version 1.0.3705.0.
// 
namespace EmployeeClient.localhost {
    using System.Diagnostics;
    using System.Xml.Serialization;
    using System;
    using System.Web.Services.Protocols;
    using System.ComponentModel;
    using System.Web.Services;
    
    
    /// <remarks/>
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Web.Services.WebServiceBindingAttribute(Name="EmployeeServiceSoap", Namespace="http://tempuri.org/")]
    [System.Xml.Serialization.XmlIncludeAttribute(typeof(object[]))]
    public class EmployeeService : System.Web.Services.Protocols.SoapHttpClientProtocol {
        
        /// <remarks/>
        public EmployeeService() {
            this.Url = "http://localhost/mathservice/employeeservice.asmx";
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/GetEmployee", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public EmployeeData GetEmployee(int Id) {
            object[] results = this.Invoke("GetEmployee", new object[] {
                        Id});
            return ((EmployeeData)(results[0]));
        }
        
        /// <remarks/>
        public System.IAsyncResult BeginGetEmployee(int Id, System.AsyncCallback callback, object asyncState) {
            return this.BeginInvoke("GetEmployee", new object[] {
                        Id}, callback, asyncState);
        }
        
        /// <remarks/>
        public EmployeeData EndGetEmployee(System.IAsyncResult asyncResult) {
            object[] results = this.EndInvoke(asyncResult);
            return ((EmployeeData)(results[0]));
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/ComputeEmployeePay", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public System.Double ComputeEmployeePay(EmployeeData emp) {
            object[] results = this.Invoke("ComputeEmployeePay", new object[] {
                        emp});
            return ((System.Double)(results[0]));
        }
        
        /// <remarks/>
        public System.IAsyncResult BeginComputeEmployeePay(EmployeeData emp, System.AsyncCallback callback, object asyncState) {
            return this.BeginInvoke("ComputeEmployeePay", new object[] {
                        emp}, callback, asyncState);
        }
        
        /// <remarks/>
        public System.Double EndComputeEmployeePay(System.IAsyncResult asyncResult) {
            object[] results = this.EndInvoke(asyncResult);
            return ((System.Double)(results[0]));
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/GetAllEmployees", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public object[] GetAllEmployees() {
            object[] results = this.Invoke("GetAllEmployees", new object[0]);
            return ((object[])(results[0]));
        }
        
        /// <remarks/>
        public System.IAsyncResult BeginGetAllEmployees(System.AsyncCallback callback, object asyncState) {
            return this.BeginInvoke("GetAllEmployees", new object[0], callback, asyncState);
        }
        
        /// <remarks/>
        public object[] EndGetAllEmployees(System.IAsyncResult asyncResult) {
            object[] results = this.EndInvoke(asyncResult);
            return ((object[])(results[0]));
        }
    }
    
    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://tempuri.org/")]
    [System.Xml.Serialization.XmlIncludeAttribute(typeof(Boss))]
    [System.Xml.Serialization.XmlIncludeAttribute(typeof(WageEmployee))]
    public abstract class EmployeeData {
        
        /// <remarks/>
        public string Name;
        
        /// <remarks/>
        public string SSN;
        
        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public int Id;
        
        /// <remarks/>
        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool IdSpecified;
    }
    
    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://tempuri.org/")]
    public class Boss : EmployeeData {
        
        /// <remarks/>
        public System.Double Salary;
    }
    
    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://tempuri.org/")]
    public class WageEmployee : EmployeeData {
        
        /// <remarks/>
        public System.Double Wage;
        
        /// <remarks/>
        public System.Double Hours;
    }
}
