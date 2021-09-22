function safeToString( obj ) {
  try {
    return obj + "";
  } catch ( e ) {
    return "[no string representation]";
  }
}
