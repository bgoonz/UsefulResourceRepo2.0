var chunkedUrl = "https://jigsaw.w3.org/HTTP/ChunkedScript";
fetch(chunkedUrl)
  .then(processChunkedResponse)
  .then(onChunkedResponseComplete)
  .catch(onChunkedResponseError);

function onChunkedResponseComplete(result) {
  console.log("all done!", result);
}

function onChunkedResponseError(err) {
  console.error(err);
}

function processChunkedResponse(response) {
  var text = "";
  var reader = response.body.getReader();
  var decoder = new TextDecoder();

  return readChunk();

  function readChunk() {
    return reader.read().then(appendChunks);
  }

  function appendChunks(result) {
    var chunk = decoder.decode(result.value || new Uint8Array(), {
      stream: !result.done,
    });
    console.log("got chunk of", chunk.length, "bytes");
    text += chunk;
    console.log("text so far is", text.length, "bytes\n");
    if (result.done) {
      console.log("returning");
      return text;
    } else {
      console.log("recursing");
      return readChunk();
    }
  }
}
