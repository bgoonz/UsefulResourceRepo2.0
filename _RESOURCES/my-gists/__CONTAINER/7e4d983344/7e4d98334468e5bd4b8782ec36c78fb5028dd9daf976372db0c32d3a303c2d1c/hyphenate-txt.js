const hyphenateText = ( text, breakpoint ) => {
  if ( text.length > breakpoint ) {
    const words = text.split( ' ' );
    return words.map( ( word ) => {
      if ( word.length > breakpoint ) {
        const head = word.substr( 0, breakpoint );
        const tail = word.substr( breakpoint );
        return `${head} -${tail}`;
      }
      return word;
    } ).join( ' ' );
  }

  return text;
}
