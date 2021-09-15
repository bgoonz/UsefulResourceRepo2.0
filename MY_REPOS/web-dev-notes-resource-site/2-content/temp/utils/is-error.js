function isError( obj ) {
  return obj instanceof Error ||
    ( obj !== null &&
      typeof obj === "object" &&
      typeof obj.message === "string" &&
      typeof obj.name === "string" );
}
