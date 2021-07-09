// CLRHostExample.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"

#include "mscoree.h"

#import <mscorlib.tlb> raw_interfaces_only \
	high_property_prefixes("_get","_put","_putref")
using namespace mscorlib;


int _tmain(int argc, _TCHAR* argv[])
{
	ICorRuntimeHost *pCor = NULL;
	IUnknown *pUnk = NULL;
	_AppDomain *pDomain = NULL;
	long retVal;

	HRESULT hr = CorBindToRuntimeEx( L"v1.0.3705", 
									L"wks",
									STARTUP_LOADER_OPTIMIZATION_SINGLE_DOMAIN, 
									CLSID_CorRuntimeHost, 
									IID_ICorRuntimeHost, 
									(PVOID*)&pCor );

	hr = pCor->Start();

	hr = pCor->GetDefaultDomain( &pUnk );

	hr = pUnk->QueryInterface( __uuidof( _AppDomain ), 
									(PVOID*)&pDomain );

	hr = pDomain->ExecuteAssembly_2( _bstr_t( "C:\\Documents and Settings\\Paul\\My Documents\\Book\\RTM Code\\Chapter 1\\HelloWorld\\bin\\Debug\\HelloWorld.exe" ), 
									&retVal );

	pDomain->Release();
	pUnk->Release();

	return 0;
}

