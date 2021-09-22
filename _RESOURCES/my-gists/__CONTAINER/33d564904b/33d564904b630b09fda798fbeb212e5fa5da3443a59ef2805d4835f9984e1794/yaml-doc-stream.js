import { Transform } from 'stream'
import { StringDecoder } from 'string_decoder'
import { Composer, Parser } from 'yaml'

/**
 * A Transform stream that accepts either strings or Buffers as input, and
 * emits YAML Documents.
 *
 * Calling the stream's `end()` method may be required to emit the last
 * document.
 *
 * ```js
 * import { createReadStream } from 'fs'
 * const source = createReadStream('input.yaml')
 * const docStream = new DocStream()
 * docStream.on('data', doc => console.log(doc.toJS()))
 * source.pipe(docStream)
 * ```
 */
export class DocStream extends Transform {
  constructor(options = {}) {
    super({
      ...options,
      decodeStrings: false,
      emitClose: true,
      objectMode: true
    })
    this.composer = new Composer(doc => this.push(doc))
    this.decoder = new StringDecoder(options.defaultEncoding || 'utf8')
    this.parser = new Parser(this.composer.next)
  }

  _flush(done) {
    this.parser.parse('', false)
    this.composer.end()
    done()
  }

  _transform(chunk, _, done) {
    try {
      const src = Buffer.isBuffer(chunk) ? this.decoder.write(chunk) : chunk
      this.parser.parse(src, true)
      done()
    } catch (error) {
      done(error) // should never happen
    }
  }
}
