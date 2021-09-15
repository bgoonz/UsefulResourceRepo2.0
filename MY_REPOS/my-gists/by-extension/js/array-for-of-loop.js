let data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
  sum = 0;
for ( let element of data ) {
  sum += element;
}
let text = "Na na na na na na na na";
let wordSet = new Set( text.split( " " ) );
let unique = [];
for ( let word of wordSet ) {
  unique.push( word );
}
