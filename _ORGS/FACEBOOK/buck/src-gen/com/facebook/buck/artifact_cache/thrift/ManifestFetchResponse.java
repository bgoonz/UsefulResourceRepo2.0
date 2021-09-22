/**
 * Autogenerated by Thrift Compiler (0.12.0)
 *
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
 *  @generated
 */
package com.facebook.buck.artifact_cache.thrift;

@SuppressWarnings({"cast", "rawtypes", "serial", "unchecked", "unused"})
@javax.annotation.Generated(value = "Autogenerated by Thrift Compiler (0.12.0)")
public class ManifestFetchResponse implements org.apache.thrift.TBase<ManifestFetchResponse, ManifestFetchResponse._Fields>, java.io.Serializable, Cloneable, Comparable<ManifestFetchResponse> {
  private static final org.apache.thrift.protocol.TStruct STRUCT_DESC = new org.apache.thrift.protocol.TStruct("ManifestFetchResponse");

  private static final org.apache.thrift.protocol.TField MANIFEST_FIELD_DESC = new org.apache.thrift.protocol.TField("manifest", org.apache.thrift.protocol.TType.STRUCT, (short)1);

  private static final org.apache.thrift.scheme.SchemeFactory STANDARD_SCHEME_FACTORY = new ManifestFetchResponseStandardSchemeFactory();
  private static final org.apache.thrift.scheme.SchemeFactory TUPLE_SCHEME_FACTORY = new ManifestFetchResponseTupleSchemeFactory();

  public @org.apache.thrift.annotation.Nullable Manifest manifest; // optional

  /** The set of fields this struct contains, along with convenience methods for finding and manipulating them. */
  public enum _Fields implements org.apache.thrift.TFieldIdEnum {
    MANIFEST((short)1, "manifest");

    private static final java.util.Map<java.lang.String, _Fields> byName = new java.util.HashMap<java.lang.String, _Fields>();

    static {
      for (_Fields field : java.util.EnumSet.allOf(_Fields.class)) {
        byName.put(field.getFieldName(), field);
      }
    }

    /**
     * Find the _Fields constant that matches fieldId, or null if its not found.
     */
    @org.apache.thrift.annotation.Nullable
    public static _Fields findByThriftId(int fieldId) {
      switch(fieldId) {
        case 1: // MANIFEST
          return MANIFEST;
        default:
          return null;
      }
    }

    /**
     * Find the _Fields constant that matches fieldId, throwing an exception
     * if it is not found.
     */
    public static _Fields findByThriftIdOrThrow(int fieldId) {
      _Fields fields = findByThriftId(fieldId);
      if (fields == null) throw new java.lang.IllegalArgumentException("Field " + fieldId + " doesn't exist!");
      return fields;
    }

    /**
     * Find the _Fields constant that matches name, or null if its not found.
     */
    @org.apache.thrift.annotation.Nullable
    public static _Fields findByName(java.lang.String name) {
      return byName.get(name);
    }

    private final short _thriftId;
    private final java.lang.String _fieldName;

    _Fields(short thriftId, java.lang.String fieldName) {
      _thriftId = thriftId;
      _fieldName = fieldName;
    }

    public short getThriftFieldId() {
      return _thriftId;
    }

    public java.lang.String getFieldName() {
      return _fieldName;
    }
  }

  // isset id assignments
  private static final _Fields optionals[] = {_Fields.MANIFEST};
  public static final java.util.Map<_Fields, org.apache.thrift.meta_data.FieldMetaData> metaDataMap;
  static {
    java.util.Map<_Fields, org.apache.thrift.meta_data.FieldMetaData> tmpMap = new java.util.EnumMap<_Fields, org.apache.thrift.meta_data.FieldMetaData>(_Fields.class);
    tmpMap.put(_Fields.MANIFEST, new org.apache.thrift.meta_data.FieldMetaData("manifest", org.apache.thrift.TFieldRequirementType.OPTIONAL, 
        new org.apache.thrift.meta_data.StructMetaData(org.apache.thrift.protocol.TType.STRUCT, Manifest.class)));
    metaDataMap = java.util.Collections.unmodifiableMap(tmpMap);
    org.apache.thrift.meta_data.FieldMetaData.addStructMetaDataMap(ManifestFetchResponse.class, metaDataMap);
  }

  public ManifestFetchResponse() {
  }

  /**
   * Performs a deep copy on <i>other</i>.
   */
  public ManifestFetchResponse(ManifestFetchResponse other) {
    if (other.isSetManifest()) {
      this.manifest = new Manifest(other.manifest);
    }
  }

  public ManifestFetchResponse deepCopy() {
    return new ManifestFetchResponse(this);
  }

  @Override
  public void clear() {
    this.manifest = null;
  }

  @org.apache.thrift.annotation.Nullable
  public Manifest getManifest() {
    return this.manifest;
  }

  public ManifestFetchResponse setManifest(@org.apache.thrift.annotation.Nullable Manifest manifest) {
    this.manifest = manifest;
    return this;
  }

  public void unsetManifest() {
    this.manifest = null;
  }

  /** Returns true if field manifest is set (has been assigned a value) and false otherwise */
  public boolean isSetManifest() {
    return this.manifest != null;
  }

  public void setManifestIsSet(boolean value) {
    if (!value) {
      this.manifest = null;
    }
  }

  public void setFieldValue(_Fields field, @org.apache.thrift.annotation.Nullable java.lang.Object value) {
    switch (field) {
    case MANIFEST:
      if (value == null) {
        unsetManifest();
      } else {
        setManifest((Manifest)value);
      }
      break;

    }
  }

  @org.apache.thrift.annotation.Nullable
  public java.lang.Object getFieldValue(_Fields field) {
    switch (field) {
    case MANIFEST:
      return getManifest();

    }
    throw new java.lang.IllegalStateException();
  }

  /** Returns true if field corresponding to fieldID is set (has been assigned a value) and false otherwise */
  public boolean isSet(_Fields field) {
    if (field == null) {
      throw new java.lang.IllegalArgumentException();
    }

    switch (field) {
    case MANIFEST:
      return isSetManifest();
    }
    throw new java.lang.IllegalStateException();
  }

  @Override
  public boolean equals(java.lang.Object that) {
    if (that == null)
      return false;
    if (that instanceof ManifestFetchResponse)
      return this.equals((ManifestFetchResponse)that);
    return false;
  }

  public boolean equals(ManifestFetchResponse that) {
    if (that == null)
      return false;
    if (this == that)
      return true;

    boolean this_present_manifest = true && this.isSetManifest();
    boolean that_present_manifest = true && that.isSetManifest();
    if (this_present_manifest || that_present_manifest) {
      if (!(this_present_manifest && that_present_manifest))
        return false;
      if (!this.manifest.equals(that.manifest))
        return false;
    }

    return true;
  }

  @Override
  public int hashCode() {
    int hashCode = 1;

    hashCode = hashCode * 8191 + ((isSetManifest()) ? 131071 : 524287);
    if (isSetManifest())
      hashCode = hashCode * 8191 + manifest.hashCode();

    return hashCode;
  }

  @Override
  public int compareTo(ManifestFetchResponse other) {
    if (!getClass().equals(other.getClass())) {
      return getClass().getName().compareTo(other.getClass().getName());
    }

    int lastComparison = 0;

    lastComparison = java.lang.Boolean.valueOf(isSetManifest()).compareTo(other.isSetManifest());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetManifest()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.manifest, other.manifest);
      if (lastComparison != 0) {
        return lastComparison;
      }
    }
    return 0;
  }

  @org.apache.thrift.annotation.Nullable
  public _Fields fieldForId(int fieldId) {
    return _Fields.findByThriftId(fieldId);
  }

  public void read(org.apache.thrift.protocol.TProtocol iprot) throws org.apache.thrift.TException {
    scheme(iprot).read(iprot, this);
  }

  public void write(org.apache.thrift.protocol.TProtocol oprot) throws org.apache.thrift.TException {
    scheme(oprot).write(oprot, this);
  }

  @Override
  public java.lang.String toString() {
    java.lang.StringBuilder sb = new java.lang.StringBuilder("ManifestFetchResponse(");
    boolean first = true;

    if (isSetManifest()) {
      sb.append("manifest:");
      if (this.manifest == null) {
        sb.append("null");
      } else {
        sb.append(this.manifest);
      }
      first = false;
    }
    sb.append(")");
    return sb.toString();
  }

  public void validate() throws org.apache.thrift.TException {
    // check for required fields
    // check for sub-struct validity
    if (manifest != null) {
      manifest.validate();
    }
  }

  private void writeObject(java.io.ObjectOutputStream out) throws java.io.IOException {
    try {
      write(new org.apache.thrift.protocol.TCompactProtocol(new org.apache.thrift.transport.TIOStreamTransport(out)));
    } catch (org.apache.thrift.TException te) {
      throw new java.io.IOException(te);
    }
  }

  private void readObject(java.io.ObjectInputStream in) throws java.io.IOException, java.lang.ClassNotFoundException {
    try {
      read(new org.apache.thrift.protocol.TCompactProtocol(new org.apache.thrift.transport.TIOStreamTransport(in)));
    } catch (org.apache.thrift.TException te) {
      throw new java.io.IOException(te);
    }
  }

  private static class ManifestFetchResponseStandardSchemeFactory implements org.apache.thrift.scheme.SchemeFactory {
    public ManifestFetchResponseStandardScheme getScheme() {
      return new ManifestFetchResponseStandardScheme();
    }
  }

  private static class ManifestFetchResponseStandardScheme extends org.apache.thrift.scheme.StandardScheme<ManifestFetchResponse> {

    public void read(org.apache.thrift.protocol.TProtocol iprot, ManifestFetchResponse struct) throws org.apache.thrift.TException {
      org.apache.thrift.protocol.TField schemeField;
      iprot.readStructBegin();
      while (true)
      {
        schemeField = iprot.readFieldBegin();
        if (schemeField.type == org.apache.thrift.protocol.TType.STOP) { 
          break;
        }
        switch (schemeField.id) {
          case 1: // MANIFEST
            if (schemeField.type == org.apache.thrift.protocol.TType.STRUCT) {
              struct.manifest = new Manifest();
              struct.manifest.read(iprot);
              struct.setManifestIsSet(true);
            } else { 
              org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
            }
            break;
          default:
            org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
        }
        iprot.readFieldEnd();
      }
      iprot.readStructEnd();

      // check for required fields of primitive type, which can't be checked in the validate method
      struct.validate();
    }

    public void write(org.apache.thrift.protocol.TProtocol oprot, ManifestFetchResponse struct) throws org.apache.thrift.TException {
      struct.validate();

      oprot.writeStructBegin(STRUCT_DESC);
      if (struct.manifest != null) {
        if (struct.isSetManifest()) {
          oprot.writeFieldBegin(MANIFEST_FIELD_DESC);
          struct.manifest.write(oprot);
          oprot.writeFieldEnd();
        }
      }
      oprot.writeFieldStop();
      oprot.writeStructEnd();
    }

  }

  private static class ManifestFetchResponseTupleSchemeFactory implements org.apache.thrift.scheme.SchemeFactory {
    public ManifestFetchResponseTupleScheme getScheme() {
      return new ManifestFetchResponseTupleScheme();
    }
  }

  private static class ManifestFetchResponseTupleScheme extends org.apache.thrift.scheme.TupleScheme<ManifestFetchResponse> {

    @Override
    public void write(org.apache.thrift.protocol.TProtocol prot, ManifestFetchResponse struct) throws org.apache.thrift.TException {
      org.apache.thrift.protocol.TTupleProtocol oprot = (org.apache.thrift.protocol.TTupleProtocol) prot;
      java.util.BitSet optionals = new java.util.BitSet();
      if (struct.isSetManifest()) {
        optionals.set(0);
      }
      oprot.writeBitSet(optionals, 1);
      if (struct.isSetManifest()) {
        struct.manifest.write(oprot);
      }
    }

    @Override
    public void read(org.apache.thrift.protocol.TProtocol prot, ManifestFetchResponse struct) throws org.apache.thrift.TException {
      org.apache.thrift.protocol.TTupleProtocol iprot = (org.apache.thrift.protocol.TTupleProtocol) prot;
      java.util.BitSet incoming = iprot.readBitSet(1);
      if (incoming.get(0)) {
        struct.manifest = new Manifest();
        struct.manifest.read(iprot);
        struct.setManifestIsSet(true);
      }
    }
  }

  private static <S extends org.apache.thrift.scheme.IScheme> S scheme(org.apache.thrift.protocol.TProtocol proto) {
    return (org.apache.thrift.scheme.StandardScheme.class.equals(proto.getScheme()) ? STANDARD_SCHEME_FACTORY : TUPLE_SCHEME_FACTORY).getScheme();
  }
}

