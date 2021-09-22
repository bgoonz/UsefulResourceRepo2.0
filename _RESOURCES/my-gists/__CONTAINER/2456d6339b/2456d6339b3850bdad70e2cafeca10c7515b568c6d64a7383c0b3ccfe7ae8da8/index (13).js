const fs = require('fs');
const { ReadableStream, TransformStream, WritableStream} = require('web-streams-polyfill/ponyfill/es2018');

function createReadStream(file, opts) {
  return new ReadableStream({
    start(controller) {
      const stream = fs.createReadStream(file, opts);
      stream.on('readable', () => {
        const data = stream.read();
        controller.enqueue(data);
      });

      stream.on('end', () => {
        controller.close();
      });
    }
  });
}

function split() {
  let leftover = '';

  return new TransformStream({
    transform(chunk, controller) {
      chunk = leftover + chunk;
      let last = 0;

      for (let i = 0; i < chunk.length; i += 1) {
        if (chunk[i] === '\n') {
          controller.enqueue(chunk.slice(last, i));
          last = i + 1;
        }
      }

      leftover = chunk.slice(last);
    }
  })
}

function transform(fn) {
  let i = 0;

  return new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(fn(chunk, i++));
    }
  });
}

function createWriteStream(file) {
  const stream = fs.createWriteStream(file);

  return new WritableStream({
    write(chunk) {
      if (!stream.write(chunk)) {
        return new Promise(fulfil => {
          stream.once('drain', () => {
            stream.write(chunk);
            fulfil();
          });
        });
      }
    }
  });
}

const stream = createReadStream(INPUT, 'utf-8')
  .pipeThrough(split())
  .pipeThrough(transform((line, i) => {
    return REDACTED(line);
  }))
  .pipeTo(createWriteStream(OUTPUT));