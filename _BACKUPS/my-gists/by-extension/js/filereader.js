// var blob = new Blob();
//Blobs are immutable objects that represent raw data. File is a derivation of Blob that represents data from the file system. Use FileReader to read data from a Blob or File. Blobs allow you to construct file like objects on the client that you can pass to apis that expect urls instead of requiring the server provides the file.
// console.log(blob.size);
// console.log(blob.type);
var blob = new Blob(["foo", "bar"]);

console.log("size=" + blob.size);
console.log("type=" + blob.type);
//Creates a new Blob. The elements of blobParts must be of the types ArrayBuffer, ArrayBufferView, Blob, or String. If ending is set to 'native', the line endings in the blob will be converted to the system line endings, such as '\r\n' for Windows or '\n' for Mac.

/*
new Blob(blobParts : Array, [blobPropertyBag : Object]) : Blob
blobPropertyBag : {
type	String	A valid mime type such as 'text/plain'
endings	String	Must be either 'transparent' or 'native'
}
*/
var testEndings = function (string, endings) {
  var blob = new Blob([string], { type: "plain/text", endings: endings });
  var reader = new FileReader();
  reader.onload = function (event) {
    console.log(
      endings +
        " of " +
        JSON.stringify(string) +
        " => " +
        JSON.stringify(reader.result)
    );
  };
  reader.readAsText(blob);
};

testEndings("foo\nbar", "native");
testEndings("foo\r\nbar", "native");
testEndings("foo\nbar", "transparent");
testEndings("foo\r\nbar", "transparent");

var blob2 = new Blob(["foo", "bar"], { type: "plain/text", endings: "native" });

console.log(blob2.size);
var blob3 = new Blob(["foo", "bar"], { type: "plain/text", endings: "native" });

console.log(blob3.type);
const blob4 = new Blob(["foo"]);
const arrayBuffer = blob.arrayBuffer();
console.log(arrayBuffer.byteLength);

const chars = new Uint8Array(arrayBuffer);
console.log(chars);

// The bytes of the ArrayBuffer match the char codes of the string
console.log([..."foo"].map((c) => c.charCodeAt(0)));
//--------------------------------------------
/*
slice([start = 0 : Number, [end : Number, [contentType = '' : String]]]) : Blob
Returns a new blob that contains the bytes start to end - 1 from this. If start or end is negative, the value is added to this.size before performing the slice. If end is not specified, this.size is used. The returned blob's type will be contentType if specified, otherwise it will be ''.

*/
var blob6 = new Blob(["foo", "bar"], { type: "plain/text", endings: "native" });
console.log("blob size:", blob.size);
console.log("blob type:", blob.type);

var copy = blob.slice();
console.log("copy size:", copy.size);
console.log("copy type:", copy.type);

var slice = blob.slice(1, 4, "foo-type");
console.log("slice size:", slice.size);
console.log("slice type:", slice.type);

//--------------------------------------------------

/*

stream() : ReadableStream
Returns a stream of the data in this.The values of the stream will be Uint8Arrays.
*/
// const blob5 = new Blob(["foo"]);
// const stream = blob.stream();
// const reader = stream.getReader();
//
// let result;
// while (!(result = await reader.read()).done) {
//   console.log(result.value);
// }
//---------------------------------------------------

//--------------------------------------------------

/*


*/

//---------------------------------------------------

//--------------------------------------------------

/*


*/

//---------------------------------------------------

//--------------------------------------------------

/*


*/

//---------------------------------------------------

//--------------------------------------------------

/*


*/

//---------------------------------------------------

//--------------------------------------------------

/*


*/

//---------------------------------------------------
