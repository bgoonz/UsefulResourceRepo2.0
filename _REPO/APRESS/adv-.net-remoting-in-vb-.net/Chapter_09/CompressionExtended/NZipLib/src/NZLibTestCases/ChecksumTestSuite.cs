using System;
using TestingEnvironment.Framework;

/// <summary>
/// This class contains test cases for the Adler32 and Crc32 checksums
/// </summary>
public class ChecksumTestSuite : TestCase 
{
	
	/// <summary>
	/// Default Constructor
	/// </summary>
	public ChecksumTestSuite(string name) : base(name)
	{
	}
	
	/// <summary>
	/// Tests Crc32.
	/// </summary>
	public void TestCrc32() 
	{
		IChecksum check = new Crc32();
		
		check.Update(0);
		AssertEquals(check.Value, 0xd202ef8d);
		
		check.Reset();
		check.Update(0xFF);
		AssertEquals(check.Value, 0xff000000);
		
		check.Reset();
		check.Update(0x64);
		AssertEquals(check.Value, 0x98dd4acc);
		
		check.Reset();
		byte[] testarray = new byte[256];
		for (int i = 0; i < testarray.Length; ++i) {
			testarray[i] = (byte)i;
		}
		check.Update(testarray, 0, testarray.Length);
		AssertEquals(check.Value, 0x29058c73);
		
		check.Reset();
		for (int i = 0; i < testarray.Length; ++i) {
			testarray[i] = (byte)(i & 0xF);
		}
		check.Update(testarray, 0, testarray.Length);
		AssertEquals(check.Value, 0xb6135ee0);
		
		check.Reset();
		for (int i = 0; i < testarray.Length; ++i) {
			testarray[i] = (byte)((63 * i) % 31);
		}
		check.Update(testarray, 0, testarray.Length);
		AssertEquals(check.Value, 0xb353964e);
	}
	
	/// <summary>
	/// Tests Adler32.
	/// </summary>
	public void TestAdler32() 
	{
		IChecksum check = new Adler32();
		
		check.Update(0);
		AssertEquals(check.Value, 0x10001);
		
		check.Reset();
		check.Update(0xFF);
		AssertEquals(check.Value, 0x1000100);
		
		check.Reset();
		check.Update(0x64);
		AssertEquals(check.Value, 0x650065);
		
		check.Reset();
		byte[] testarray = new byte[256];
		for (int i = 0; i < testarray.Length; ++i) {
			testarray[i] = (byte)i;
		}
		check.Update(testarray, 0, testarray.Length);
		AssertEquals(check.Value, 0xadf67f81);
		
		check.Reset();
		for (int i = 0; i < testarray.Length; ++i) {
			testarray[i] = (byte)(i & 0xF);
		}
		check.Update(testarray, 0, testarray.Length);
		AssertEquals(check.Value, 0xafad0781);
		
		check.Reset();
		for (int i = 0; i < testarray.Length; ++i) {
			testarray[i] = (byte)((63 * i) % 31);
		}
		check.Update(testarray, 0, testarray.Length);
		AssertEquals(check.Value, 0x39a10ea5);
	}
	
	/// <summary>
	/// Returns the testsuite.
	/// </summary>
	public static ITest Suite {
		get {
			TestSuite suite = new TestSuite("ChecksumTestSuite");
			suite.AddTest(new ChecksumTestSuite("TestCrc32"));
			suite.AddTest(new ChecksumTestSuite("TestAdler32"));
			return suite;
		}
	}
}
