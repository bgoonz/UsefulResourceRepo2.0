/**
 * Autogenerated by Thrift Compiler (0.12.0)
 *
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
 *  @generated
 */
package com.facebook.buck.frontend.thrift;

@SuppressWarnings({"cast", "rawtypes", "serial", "unchecked", "unused"})
@javax.annotation.Generated(value = "Autogenerated by Thrift Compiler (0.12.0)")
public class FrontendRequest implements org.apache.thrift.TBase<FrontendRequest, FrontendRequest._Fields>, java.io.Serializable, Cloneable, Comparable<FrontendRequest> {
  private static final org.apache.thrift.protocol.TStruct STRUCT_DESC = new org.apache.thrift.protocol.TStruct("FrontendRequest");

  private static final org.apache.thrift.protocol.TField TYPE_FIELD_DESC = new org.apache.thrift.protocol.TField("type", org.apache.thrift.protocol.TType.I32, (short)1);
  private static final org.apache.thrift.protocol.TField LOG_REQUEST_FIELD_DESC = new org.apache.thrift.protocol.TField("logRequest", org.apache.thrift.protocol.TType.STRUCT, (short)6);
  private static final org.apache.thrift.protocol.TField ANNOUNCEMENT_REQUEST_FIELD_DESC = new org.apache.thrift.protocol.TField("announcementRequest", org.apache.thrift.protocol.TType.STRUCT, (short)14);
  private static final org.apache.thrift.protocol.TField FETCH_RULE_KEY_LOGS_REQUEST_FIELD_DESC = new org.apache.thrift.protocol.TField("fetchRuleKeyLogsRequest", org.apache.thrift.protocol.TType.STRUCT, (short)22);

  private static final org.apache.thrift.scheme.SchemeFactory STANDARD_SCHEME_FACTORY = new FrontendRequestStandardSchemeFactory();
  private static final org.apache.thrift.scheme.SchemeFactory TUPLE_SCHEME_FACTORY = new FrontendRequestTupleSchemeFactory();

  /**
   * 
   * @see FrontendRequestType
   */
  public @org.apache.thrift.annotation.Nullable FrontendRequestType type; // optional
  public @org.apache.thrift.annotation.Nullable LogRequest logRequest; // optional
  public @org.apache.thrift.annotation.Nullable AnnouncementRequest announcementRequest; // optional
  public @org.apache.thrift.annotation.Nullable FetchRuleKeyLogsRequest fetchRuleKeyLogsRequest; // optional

  /** The set of fields this struct contains, along with convenience methods for finding and manipulating them. */
  public enum _Fields implements org.apache.thrift.TFieldIdEnum {
    /**
     * 
     * @see FrontendRequestType
     */
    TYPE((short)1, "type"),
    LOG_REQUEST((short)6, "logRequest"),
    ANNOUNCEMENT_REQUEST((short)14, "announcementRequest"),
    FETCH_RULE_KEY_LOGS_REQUEST((short)22, "fetchRuleKeyLogsRequest");

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
        case 1: // TYPE
          return TYPE;
        case 6: // LOG_REQUEST
          return LOG_REQUEST;
        case 14: // ANNOUNCEMENT_REQUEST
          return ANNOUNCEMENT_REQUEST;
        case 22: // FETCH_RULE_KEY_LOGS_REQUEST
          return FETCH_RULE_KEY_LOGS_REQUEST;
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
  private static final _Fields optionals[] = {_Fields.TYPE,_Fields.LOG_REQUEST,_Fields.ANNOUNCEMENT_REQUEST,_Fields.FETCH_RULE_KEY_LOGS_REQUEST};
  public static final java.util.Map<_Fields, org.apache.thrift.meta_data.FieldMetaData> metaDataMap;
  static {
    java.util.Map<_Fields, org.apache.thrift.meta_data.FieldMetaData> tmpMap = new java.util.EnumMap<_Fields, org.apache.thrift.meta_data.FieldMetaData>(_Fields.class);
    tmpMap.put(_Fields.TYPE, new org.apache.thrift.meta_data.FieldMetaData("type", org.apache.thrift.TFieldRequirementType.OPTIONAL, 
        new org.apache.thrift.meta_data.EnumMetaData(org.apache.thrift.protocol.TType.ENUM, FrontendRequestType.class)));
    tmpMap.put(_Fields.LOG_REQUEST, new org.apache.thrift.meta_data.FieldMetaData("logRequest", org.apache.thrift.TFieldRequirementType.OPTIONAL, 
        new org.apache.thrift.meta_data.StructMetaData(org.apache.thrift.protocol.TType.STRUCT, LogRequest.class)));
    tmpMap.put(_Fields.ANNOUNCEMENT_REQUEST, new org.apache.thrift.meta_data.FieldMetaData("announcementRequest", org.apache.thrift.TFieldRequirementType.OPTIONAL, 
        new org.apache.thrift.meta_data.StructMetaData(org.apache.thrift.protocol.TType.STRUCT, AnnouncementRequest.class)));
    tmpMap.put(_Fields.FETCH_RULE_KEY_LOGS_REQUEST, new org.apache.thrift.meta_data.FieldMetaData("fetchRuleKeyLogsRequest", org.apache.thrift.TFieldRequirementType.OPTIONAL, 
        new org.apache.thrift.meta_data.StructMetaData(org.apache.thrift.protocol.TType.STRUCT, FetchRuleKeyLogsRequest.class)));
    metaDataMap = java.util.Collections.unmodifiableMap(tmpMap);
    org.apache.thrift.meta_data.FieldMetaData.addStructMetaDataMap(FrontendRequest.class, metaDataMap);
  }

  public FrontendRequest() {
    this.type = com.facebook.buck.frontend.thrift.FrontendRequestType.UNKNOWN;

  }

  /**
   * Performs a deep copy on <i>other</i>.
   */
  public FrontendRequest(FrontendRequest other) {
    if (other.isSetType()) {
      this.type = other.type;
    }
    if (other.isSetLogRequest()) {
      this.logRequest = new LogRequest(other.logRequest);
    }
    if (other.isSetAnnouncementRequest()) {
      this.announcementRequest = new AnnouncementRequest(other.announcementRequest);
    }
    if (other.isSetFetchRuleKeyLogsRequest()) {
      this.fetchRuleKeyLogsRequest = new FetchRuleKeyLogsRequest(other.fetchRuleKeyLogsRequest);
    }
  }

  public FrontendRequest deepCopy() {
    return new FrontendRequest(this);
  }

  @Override
  public void clear() {
    this.type = com.facebook.buck.frontend.thrift.FrontendRequestType.UNKNOWN;

    this.logRequest = null;
    this.announcementRequest = null;
    this.fetchRuleKeyLogsRequest = null;
  }

  /**
   * 
   * @see FrontendRequestType
   */
  @org.apache.thrift.annotation.Nullable
  public FrontendRequestType getType() {
    return this.type;
  }

  /**
   * 
   * @see FrontendRequestType
   */
  public FrontendRequest setType(@org.apache.thrift.annotation.Nullable FrontendRequestType type) {
    this.type = type;
    return this;
  }

  public void unsetType() {
    this.type = null;
  }

  /** Returns true if field type is set (has been assigned a value) and false otherwise */
  public boolean isSetType() {
    return this.type != null;
  }

  public void setTypeIsSet(boolean value) {
    if (!value) {
      this.type = null;
    }
  }

  @org.apache.thrift.annotation.Nullable
  public LogRequest getLogRequest() {
    return this.logRequest;
  }

  public FrontendRequest setLogRequest(@org.apache.thrift.annotation.Nullable LogRequest logRequest) {
    this.logRequest = logRequest;
    return this;
  }

  public void unsetLogRequest() {
    this.logRequest = null;
  }

  /** Returns true if field logRequest is set (has been assigned a value) and false otherwise */
  public boolean isSetLogRequest() {
    return this.logRequest != null;
  }

  public void setLogRequestIsSet(boolean value) {
    if (!value) {
      this.logRequest = null;
    }
  }

  @org.apache.thrift.annotation.Nullable
  public AnnouncementRequest getAnnouncementRequest() {
    return this.announcementRequest;
  }

  public FrontendRequest setAnnouncementRequest(@org.apache.thrift.annotation.Nullable AnnouncementRequest announcementRequest) {
    this.announcementRequest = announcementRequest;
    return this;
  }

  public void unsetAnnouncementRequest() {
    this.announcementRequest = null;
  }

  /** Returns true if field announcementRequest is set (has been assigned a value) and false otherwise */
  public boolean isSetAnnouncementRequest() {
    return this.announcementRequest != null;
  }

  public void setAnnouncementRequestIsSet(boolean value) {
    if (!value) {
      this.announcementRequest = null;
    }
  }

  @org.apache.thrift.annotation.Nullable
  public FetchRuleKeyLogsRequest getFetchRuleKeyLogsRequest() {
    return this.fetchRuleKeyLogsRequest;
  }

  public FrontendRequest setFetchRuleKeyLogsRequest(@org.apache.thrift.annotation.Nullable FetchRuleKeyLogsRequest fetchRuleKeyLogsRequest) {
    this.fetchRuleKeyLogsRequest = fetchRuleKeyLogsRequest;
    return this;
  }

  public void unsetFetchRuleKeyLogsRequest() {
    this.fetchRuleKeyLogsRequest = null;
  }

  /** Returns true if field fetchRuleKeyLogsRequest is set (has been assigned a value) and false otherwise */
  public boolean isSetFetchRuleKeyLogsRequest() {
    return this.fetchRuleKeyLogsRequest != null;
  }

  public void setFetchRuleKeyLogsRequestIsSet(boolean value) {
    if (!value) {
      this.fetchRuleKeyLogsRequest = null;
    }
  }

  public void setFieldValue(_Fields field, @org.apache.thrift.annotation.Nullable java.lang.Object value) {
    switch (field) {
    case TYPE:
      if (value == null) {
        unsetType();
      } else {
        setType((FrontendRequestType)value);
      }
      break;

    case LOG_REQUEST:
      if (value == null) {
        unsetLogRequest();
      } else {
        setLogRequest((LogRequest)value);
      }
      break;

    case ANNOUNCEMENT_REQUEST:
      if (value == null) {
        unsetAnnouncementRequest();
      } else {
        setAnnouncementRequest((AnnouncementRequest)value);
      }
      break;

    case FETCH_RULE_KEY_LOGS_REQUEST:
      if (value == null) {
        unsetFetchRuleKeyLogsRequest();
      } else {
        setFetchRuleKeyLogsRequest((FetchRuleKeyLogsRequest)value);
      }
      break;

    }
  }

  @org.apache.thrift.annotation.Nullable
  public java.lang.Object getFieldValue(_Fields field) {
    switch (field) {
    case TYPE:
      return getType();

    case LOG_REQUEST:
      return getLogRequest();

    case ANNOUNCEMENT_REQUEST:
      return getAnnouncementRequest();

    case FETCH_RULE_KEY_LOGS_REQUEST:
      return getFetchRuleKeyLogsRequest();

    }
    throw new java.lang.IllegalStateException();
  }

  /** Returns true if field corresponding to fieldID is set (has been assigned a value) and false otherwise */
  public boolean isSet(_Fields field) {
    if (field == null) {
      throw new java.lang.IllegalArgumentException();
    }

    switch (field) {
    case TYPE:
      return isSetType();
    case LOG_REQUEST:
      return isSetLogRequest();
    case ANNOUNCEMENT_REQUEST:
      return isSetAnnouncementRequest();
    case FETCH_RULE_KEY_LOGS_REQUEST:
      return isSetFetchRuleKeyLogsRequest();
    }
    throw new java.lang.IllegalStateException();
  }

  @Override
  public boolean equals(java.lang.Object that) {
    if (that == null)
      return false;
    if (that instanceof FrontendRequest)
      return this.equals((FrontendRequest)that);
    return false;
  }

  public boolean equals(FrontendRequest that) {
    if (that == null)
      return false;
    if (this == that)
      return true;

    boolean this_present_type = true && this.isSetType();
    boolean that_present_type = true && that.isSetType();
    if (this_present_type || that_present_type) {
      if (!(this_present_type && that_present_type))
        return false;
      if (!this.type.equals(that.type))
        return false;
    }

    boolean this_present_logRequest = true && this.isSetLogRequest();
    boolean that_present_logRequest = true && that.isSetLogRequest();
    if (this_present_logRequest || that_present_logRequest) {
      if (!(this_present_logRequest && that_present_logRequest))
        return false;
      if (!this.logRequest.equals(that.logRequest))
        return false;
    }

    boolean this_present_announcementRequest = true && this.isSetAnnouncementRequest();
    boolean that_present_announcementRequest = true && that.isSetAnnouncementRequest();
    if (this_present_announcementRequest || that_present_announcementRequest) {
      if (!(this_present_announcementRequest && that_present_announcementRequest))
        return false;
      if (!this.announcementRequest.equals(that.announcementRequest))
        return false;
    }

    boolean this_present_fetchRuleKeyLogsRequest = true && this.isSetFetchRuleKeyLogsRequest();
    boolean that_present_fetchRuleKeyLogsRequest = true && that.isSetFetchRuleKeyLogsRequest();
    if (this_present_fetchRuleKeyLogsRequest || that_present_fetchRuleKeyLogsRequest) {
      if (!(this_present_fetchRuleKeyLogsRequest && that_present_fetchRuleKeyLogsRequest))
        return false;
      if (!this.fetchRuleKeyLogsRequest.equals(that.fetchRuleKeyLogsRequest))
        return false;
    }

    return true;
  }

  @Override
  public int hashCode() {
    int hashCode = 1;

    hashCode = hashCode * 8191 + ((isSetType()) ? 131071 : 524287);
    if (isSetType())
      hashCode = hashCode * 8191 + type.getValue();

    hashCode = hashCode * 8191 + ((isSetLogRequest()) ? 131071 : 524287);
    if (isSetLogRequest())
      hashCode = hashCode * 8191 + logRequest.hashCode();

    hashCode = hashCode * 8191 + ((isSetAnnouncementRequest()) ? 131071 : 524287);
    if (isSetAnnouncementRequest())
      hashCode = hashCode * 8191 + announcementRequest.hashCode();

    hashCode = hashCode * 8191 + ((isSetFetchRuleKeyLogsRequest()) ? 131071 : 524287);
    if (isSetFetchRuleKeyLogsRequest())
      hashCode = hashCode * 8191 + fetchRuleKeyLogsRequest.hashCode();

    return hashCode;
  }

  @Override
  public int compareTo(FrontendRequest other) {
    if (!getClass().equals(other.getClass())) {
      return getClass().getName().compareTo(other.getClass().getName());
    }

    int lastComparison = 0;

    lastComparison = java.lang.Boolean.valueOf(isSetType()).compareTo(other.isSetType());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetType()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.type, other.type);
      if (lastComparison != 0) {
        return lastComparison;
      }
    }
    lastComparison = java.lang.Boolean.valueOf(isSetLogRequest()).compareTo(other.isSetLogRequest());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetLogRequest()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.logRequest, other.logRequest);
      if (lastComparison != 0) {
        return lastComparison;
      }
    }
    lastComparison = java.lang.Boolean.valueOf(isSetAnnouncementRequest()).compareTo(other.isSetAnnouncementRequest());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetAnnouncementRequest()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.announcementRequest, other.announcementRequest);
      if (lastComparison != 0) {
        return lastComparison;
      }
    }
    lastComparison = java.lang.Boolean.valueOf(isSetFetchRuleKeyLogsRequest()).compareTo(other.isSetFetchRuleKeyLogsRequest());
    if (lastComparison != 0) {
      return lastComparison;
    }
    if (isSetFetchRuleKeyLogsRequest()) {
      lastComparison = org.apache.thrift.TBaseHelper.compareTo(this.fetchRuleKeyLogsRequest, other.fetchRuleKeyLogsRequest);
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
    java.lang.StringBuilder sb = new java.lang.StringBuilder("FrontendRequest(");
    boolean first = true;

    if (isSetType()) {
      sb.append("type:");
      if (this.type == null) {
        sb.append("null");
      } else {
        sb.append(this.type);
      }
      first = false;
    }
    if (isSetLogRequest()) {
      if (!first) sb.append(", ");
      sb.append("logRequest:");
      if (this.logRequest == null) {
        sb.append("null");
      } else {
        sb.append(this.logRequest);
      }
      first = false;
    }
    if (isSetAnnouncementRequest()) {
      if (!first) sb.append(", ");
      sb.append("announcementRequest:");
      if (this.announcementRequest == null) {
        sb.append("null");
      } else {
        sb.append(this.announcementRequest);
      }
      first = false;
    }
    if (isSetFetchRuleKeyLogsRequest()) {
      if (!first) sb.append(", ");
      sb.append("fetchRuleKeyLogsRequest:");
      if (this.fetchRuleKeyLogsRequest == null) {
        sb.append("null");
      } else {
        sb.append(this.fetchRuleKeyLogsRequest);
      }
      first = false;
    }
    sb.append(")");
    return sb.toString();
  }

  public void validate() throws org.apache.thrift.TException {
    // check for required fields
    // check for sub-struct validity
    if (logRequest != null) {
      logRequest.validate();
    }
    if (announcementRequest != null) {
      announcementRequest.validate();
    }
    if (fetchRuleKeyLogsRequest != null) {
      fetchRuleKeyLogsRequest.validate();
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

  private static class FrontendRequestStandardSchemeFactory implements org.apache.thrift.scheme.SchemeFactory {
    public FrontendRequestStandardScheme getScheme() {
      return new FrontendRequestStandardScheme();
    }
  }

  private static class FrontendRequestStandardScheme extends org.apache.thrift.scheme.StandardScheme<FrontendRequest> {

    public void read(org.apache.thrift.protocol.TProtocol iprot, FrontendRequest struct) throws org.apache.thrift.TException {
      org.apache.thrift.protocol.TField schemeField;
      iprot.readStructBegin();
      while (true)
      {
        schemeField = iprot.readFieldBegin();
        if (schemeField.type == org.apache.thrift.protocol.TType.STOP) { 
          break;
        }
        switch (schemeField.id) {
          case 1: // TYPE
            if (schemeField.type == org.apache.thrift.protocol.TType.I32) {
              struct.type = com.facebook.buck.frontend.thrift.FrontendRequestType.findByValue(iprot.readI32());
              struct.setTypeIsSet(true);
            } else { 
              org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
            }
            break;
          case 6: // LOG_REQUEST
            if (schemeField.type == org.apache.thrift.protocol.TType.STRUCT) {
              struct.logRequest = new LogRequest();
              struct.logRequest.read(iprot);
              struct.setLogRequestIsSet(true);
            } else { 
              org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
            }
            break;
          case 14: // ANNOUNCEMENT_REQUEST
            if (schemeField.type == org.apache.thrift.protocol.TType.STRUCT) {
              struct.announcementRequest = new AnnouncementRequest();
              struct.announcementRequest.read(iprot);
              struct.setAnnouncementRequestIsSet(true);
            } else { 
              org.apache.thrift.protocol.TProtocolUtil.skip(iprot, schemeField.type);
            }
            break;
          case 22: // FETCH_RULE_KEY_LOGS_REQUEST
            if (schemeField.type == org.apache.thrift.protocol.TType.STRUCT) {
              struct.fetchRuleKeyLogsRequest = new FetchRuleKeyLogsRequest();
              struct.fetchRuleKeyLogsRequest.read(iprot);
              struct.setFetchRuleKeyLogsRequestIsSet(true);
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

    public void write(org.apache.thrift.protocol.TProtocol oprot, FrontendRequest struct) throws org.apache.thrift.TException {
      struct.validate();

      oprot.writeStructBegin(STRUCT_DESC);
      if (struct.type != null) {
        if (struct.isSetType()) {
          oprot.writeFieldBegin(TYPE_FIELD_DESC);
          oprot.writeI32(struct.type.getValue());
          oprot.writeFieldEnd();
        }
      }
      if (struct.logRequest != null) {
        if (struct.isSetLogRequest()) {
          oprot.writeFieldBegin(LOG_REQUEST_FIELD_DESC);
          struct.logRequest.write(oprot);
          oprot.writeFieldEnd();
        }
      }
      if (struct.announcementRequest != null) {
        if (struct.isSetAnnouncementRequest()) {
          oprot.writeFieldBegin(ANNOUNCEMENT_REQUEST_FIELD_DESC);
          struct.announcementRequest.write(oprot);
          oprot.writeFieldEnd();
        }
      }
      if (struct.fetchRuleKeyLogsRequest != null) {
        if (struct.isSetFetchRuleKeyLogsRequest()) {
          oprot.writeFieldBegin(FETCH_RULE_KEY_LOGS_REQUEST_FIELD_DESC);
          struct.fetchRuleKeyLogsRequest.write(oprot);
          oprot.writeFieldEnd();
        }
      }
      oprot.writeFieldStop();
      oprot.writeStructEnd();
    }

  }

  private static class FrontendRequestTupleSchemeFactory implements org.apache.thrift.scheme.SchemeFactory {
    public FrontendRequestTupleScheme getScheme() {
      return new FrontendRequestTupleScheme();
    }
  }

  private static class FrontendRequestTupleScheme extends org.apache.thrift.scheme.TupleScheme<FrontendRequest> {

    @Override
    public void write(org.apache.thrift.protocol.TProtocol prot, FrontendRequest struct) throws org.apache.thrift.TException {
      org.apache.thrift.protocol.TTupleProtocol oprot = (org.apache.thrift.protocol.TTupleProtocol) prot;
      java.util.BitSet optionals = new java.util.BitSet();
      if (struct.isSetType()) {
        optionals.set(0);
      }
      if (struct.isSetLogRequest()) {
        optionals.set(1);
      }
      if (struct.isSetAnnouncementRequest()) {
        optionals.set(2);
      }
      if (struct.isSetFetchRuleKeyLogsRequest()) {
        optionals.set(3);
      }
      oprot.writeBitSet(optionals, 4);
      if (struct.isSetType()) {
        oprot.writeI32(struct.type.getValue());
      }
      if (struct.isSetLogRequest()) {
        struct.logRequest.write(oprot);
      }
      if (struct.isSetAnnouncementRequest()) {
        struct.announcementRequest.write(oprot);
      }
      if (struct.isSetFetchRuleKeyLogsRequest()) {
        struct.fetchRuleKeyLogsRequest.write(oprot);
      }
    }

    @Override
    public void read(org.apache.thrift.protocol.TProtocol prot, FrontendRequest struct) throws org.apache.thrift.TException {
      org.apache.thrift.protocol.TTupleProtocol iprot = (org.apache.thrift.protocol.TTupleProtocol) prot;
      java.util.BitSet incoming = iprot.readBitSet(4);
      if (incoming.get(0)) {
        struct.type = com.facebook.buck.frontend.thrift.FrontendRequestType.findByValue(iprot.readI32());
        struct.setTypeIsSet(true);
      }
      if (incoming.get(1)) {
        struct.logRequest = new LogRequest();
        struct.logRequest.read(iprot);
        struct.setLogRequestIsSet(true);
      }
      if (incoming.get(2)) {
        struct.announcementRequest = new AnnouncementRequest();
        struct.announcementRequest.read(iprot);
        struct.setAnnouncementRequestIsSet(true);
      }
      if (incoming.get(3)) {
        struct.fetchRuleKeyLogsRequest = new FetchRuleKeyLogsRequest();
        struct.fetchRuleKeyLogsRequest.read(iprot);
        struct.setFetchRuleKeyLogsRequestIsSet(true);
      }
    }
  }

  private static <S extends org.apache.thrift.scheme.IScheme> S scheme(org.apache.thrift.protocol.TProtocol proto) {
    return (org.apache.thrift.scheme.StandardScheme.class.equals(proto.getScheme()) ? STANDARD_SCHEME_FACTORY : TUPLE_SCHEME_FACTORY).getScheme();
  }
}

