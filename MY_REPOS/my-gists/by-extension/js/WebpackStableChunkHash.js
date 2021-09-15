// @flow
const crypto = require('crypto');

module.exports = WebpackStableChunkHash;

function WebpackStableChunkHash() {}

WebpackStableChunkHash.prototype.apply = function(compiler) {
  //
  // For a while, webpack has had issues with [chunkhash] being unstable and not reflecting the actual
  // md5 of the module.
  //
  // While stable, deterministic builds are one issue, the biggest issue with [chunkhash] is that it runs too
  // early, before optimization. This means that a change to your optimizer output will *not* be reflected in the
  // chunkhash, which may break CDNs or other long-term caching strategies.
  //
  // This plugin runs as the absolute last plugin in 'after-optimize-chunk-assets' to ensure that it is getting
  // the source that will be written to disk. It then hashes that. All options that work with normal `[chunkhash]`
  // apply here.
  //
  compiler.plugin('compilation', function(compilation) {
    const outputOptions = compilation.outputOptions;
    const hashFunction = outputOptions.hashFunction;
    const hashDigest = outputOptions.hashDigest;
    const hashDigestLength = outputOptions.hashDigestLength;

    // Storage for chunk filenames. This is important as `chunk.files` is usually a 1-element array,
    // but not always.
    const chunkRecords = {};
    compilation.plugin('chunk-asset', function(chunk, fileName) {
      chunkRecords[chunk.id] = fileName;
    });

    compilation.plugin('after-optimize-chunk-assets', function(chunks) {
      // process.nextTick() is a horrible hack to ensure this runs after source map.
      process.nextTick(function() {
        const fullHash = crypto.createHash(hashFunction);
        let usedChunkHash = false;

        // File sources are in compilations.assets[file].
        for(let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i];
          const usesChunkHash = !chunk.hasRuntime() ||
            (compilation.mainTemplate.useChunkHash && compilation.mainTemplate.useChunkHash(chunk));

          // If we're not using `[chunkhash]`, no need for this processing.
          if (!usesChunkHash) continue;
          usedChunkHash = true;

          const oldHash = chunk.hash;
          const file = chunkRecords[chunk.id];
          // This is a Source object, like RawSource, SourceMapSource, or ConcatSource
          const source = compilation.assets[file];

          // Intentionally *not* using source.updateHash(hash) here, as it's only the hash of the output
          // that counts. We don't want to change chunkhash just because a source file changed in a way
          // that was not reflected in the actual output.
          chunk.hash = crypto.createHash(hashFunction).update(source.source()).digest(hashDigest);
          chunk.renderedHash = chunk.hash.substr(0, hashDigestLength);

          // Prevents an error when createChunkAssets() is run again.
          delete compilation.assets[file];

          // Let's update the chunk cache so we don't have to do any other work.
          delete compilation.cache[oldHash]; // Delete old entry
          const cacheName = "c" + chunk.id;
          compilation.cache[cacheName] = {
            hash: chunk.hash,
            source: source
          };
        }

        // Easy out - we don't need to modify anything.
        if (!usedChunkHash) return;

        // Update the entire compilation's hash to reflect what has changed.
        compilation.fullHash = fullHash.digest(hashDigest);
        compilation.hash = compilation.fullHash.substr(0, hashDigestLength);

        // Okay, we've updated some hashes, so we have to call `createChunkAssets` again.
        compilation.createChunkAssets();
      });
    });
  });
};
