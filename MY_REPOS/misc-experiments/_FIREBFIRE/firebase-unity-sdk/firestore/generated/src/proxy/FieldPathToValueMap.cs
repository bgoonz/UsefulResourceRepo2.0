/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG (http://www.swig.org).
 * Version 3.0.2
 *
 * Do not make changes to this file unless you know what you are doing--modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

namespace Firebase.Firestore {

internal class FieldPathToValueMap : global::System.IDisposable {
  private global::System.Runtime.InteropServices.HandleRef swigCPtr;
  protected bool swigCMemOwn;

  internal FieldPathToValueMap(global::System.IntPtr cPtr, bool cMemoryOwn) {
    swigCMemOwn = cMemoryOwn;
    swigCPtr = new global::System.Runtime.InteropServices.HandleRef(this, cPtr);
  }

  internal static global::System.Runtime.InteropServices.HandleRef getCPtr(FieldPathToValueMap obj) {
    return (obj == null) ? new global::System.Runtime.InteropServices.HandleRef(null, global::System.IntPtr.Zero) : obj.swigCPtr;
  }

  ~FieldPathToValueMap() {
    Dispose();
  }

  public virtual void Dispose() {

    lock (FirebaseApp.disposeLock) {
      if (swigCPtr.Handle != global::System.IntPtr.Zero) {
        if (swigCMemOwn) {
          swigCMemOwn = false;
          FirestoreCppPINVOKE.delete_FieldPathToValueMap(swigCPtr);
        }
        swigCPtr = new global::System.Runtime.InteropServices.HandleRef(
            null, global::System.IntPtr.Zero);
      }
      global::System.GC.SuppressFinalize(this);
    }
  }

  public FieldPathToValueMap() : this(FirestoreCppPINVOKE.new_FieldPathToValueMap(), true) {
    if (FirestoreCppPINVOKE.SWIGPendingException.Pending) throw FirestoreCppPINVOKE.SWIGPendingException.Retrieve();
  }

  public uint Size() {
    uint ret = FirestoreCppPINVOKE.FieldPathToValueMap_Size(swigCPtr);
    if (FirestoreCppPINVOKE.SWIGPendingException.Pending) throw FirestoreCppPINVOKE.SWIGPendingException.Retrieve();
    return ret;
  }

  public FieldValueProxy GetUnsafeView(FieldPathProxy key) {
    FieldValueProxy ret = new FieldValueProxy(FirestoreCppPINVOKE.FieldPathToValueMap_GetUnsafeView(swigCPtr, FieldPathProxy.getCPtr(key)), false);
    if (FirestoreCppPINVOKE.SWIGPendingException.Pending) throw FirestoreCppPINVOKE.SWIGPendingException.Retrieve();
    return ret;
  }

  public FieldValueProxy GetCopy(FieldPathProxy key) {
    FieldValueProxy ret = new FieldValueProxy(FirestoreCppPINVOKE.FieldPathToValueMap_GetCopy(swigCPtr, FieldPathProxy.getCPtr(key)), true);
    if (FirestoreCppPINVOKE.SWIGPendingException.Pending) throw FirestoreCppPINVOKE.SWIGPendingException.Retrieve();
    return ret;
  }

  public void Insert(FieldPathProxy key, FieldValueProxy value) {
    FirestoreCppPINVOKE.FieldPathToValueMap_Insert(swigCPtr, FieldPathProxy.getCPtr(key), FieldValueProxy.getCPtr(value));
    if (FirestoreCppPINVOKE.SWIGPendingException.Pending) throw FirestoreCppPINVOKE.SWIGPendingException.Retrieve();
  }

  public FieldPathToValueMapIterator Iterator() {
    FieldPathToValueMapIterator ret = new FieldPathToValueMapIterator(FirestoreCppPINVOKE.FieldPathToValueMap_Iterator(swigCPtr), true);
    if (FirestoreCppPINVOKE.SWIGPendingException.Pending) throw FirestoreCppPINVOKE.SWIGPendingException.Retrieve();
    return ret;
  }

}

}