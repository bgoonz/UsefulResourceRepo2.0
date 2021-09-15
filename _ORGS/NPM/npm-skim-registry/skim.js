var
    assert     = require('assert'),
    async      = require('async'),
    crypto     = require('crypto'),
    events     = require('events'),
    follow     = require('follow'),
    fs         = require('fs'),
    multifs    = require('multi-fs'),
    path       = require('path'),
    readmeTrim = require('npm-registry-readme-trim'),
    Request    = require('request'),
    Sequence   = require('seq-file'),
    stream     = require('stream'),
    url        = require('url'),
    util       = require('util')
    ;

var MultiSkimmer = module.exports = function MultiSkimmer(opts)
{
    if (!(this instanceof MultiSkimmer))
        return new MultiSkimmer(opts);

    assert(opts && (typeof opts === 'object'), 'you must pass an options object');
    assert(opts.source && url.parse(opts.source).protocol, 'you must pass a couch url in the `source` option');
    assert(opts.sequenceFile && (typeof opts.sequenceFile === 'string'), 'you must pass a path in the `sequenceFile` option');
    assert(opts.client && opts.client.constructor.name === 'MultiFS', 'you must pass a multi-fs client in the `client` option');
    if (opts.seq)
        assert(typeof opts.seq === 'number', 'the `seq` option must be a number');
    if (opts.inactivity_ms)
        assert(typeof opts.inactivity_ms === 'number', 'the `inactivity_ms` option must be a number');
    if (opts.skimdb)
        assert(url.parse(opts.skimdb).protocol, 'you must pass a couch url in the `skimdb` option');
    if (opts.registry)
        assert(url.parse(opts.registry).protocol, 'you must pass a valid url in the `registry` option');

    events.EventEmitter.call(this);

    this.opts          = opts;
    this.client        = opts.client;
    this.sequenceFile  = new Sequence(path.resolve(opts.sequenceFile));
    this.inactivity_ms = opts.inactivity_ms;
    this.delete        = !!opts.delete;

    if (opts.seq)
        this.sequence = parseInt(opts.seq, 10);

    opts.source   = opts.source.replace(/\/+$/, '');
    var parsed    = url.parse(opts.source);
    this.protocol = (parsed === 'https:') ? require('https') : require('http');
    this.source   = parsed.href;

    if (!opts.skimdb)
        this.skimdb = this.source;
    else
        this.skimdb = url.parse(opts.skimdb).href.replace(/\/+$/, '');

    if (opts.registry)
        this.registry  = url.parse(opts.registry).href.replace(/\/+$/, '');
};
util.inherits(MultiSkimmer, events.EventEmitter);

MultiSkimmer.prototype.opts         = null;  // store the options for logging
MultiSkimmer.prototype.source       = null;  // couchdb we're watching for changes
MultiSkimmer.prototype.skimdb       = null;  // couchdb where the skimmed documents are put
MultiSkimmer.prototype.registry     = null;  // the registry we're publishing to
MultiSkimmer.prototype.delete       = false; // if couch deletions should turn into data deletions
MultiSkimmer.prototype.sequenceFile = null;  // path to the file where we're storing sequence ids
MultiSkimmer.prototype.following    = false; // true if we're in motion & following a db

MultiSkimmer.prototype.start = function start()
{
    if (this.following)
        throw new Error('start() called twice');

    this.sequenceFile.read(this.onSequenceFileRead.bind(this));
};

MultiSkimmer.prototype.stop =
MultiSkimmer.prototype.close =
MultiSkimmer.prototype.destroy = function stop()
{
    if (this.client) this.client.close();
    if (this.follow) this.follow.stop();
};

MultiSkimmer.prototype.onSequenceFileRead = function onSequenceFileRead(err, data)
{
    if (err && err.code === 'ENOENT')
        data = 0;
    else if (err)
        return this.emit('error', err);

    if (data === undefined)
        data = 0;

    data = +data;

    if (typeof data !== 'number')
        return this.emit('error', new Error('invalid data in sequence file'));

    // seq option takes precedence over the sequence file, if provided.
    if ((typeof this.sequence) !== 'number')
       this.sequence = data;
    this.emit('log', 'following with sequence number ' + data);

    this.follow = follow(
    {
        db:            this.source,
        since:         this.sequence,
        inactivity_ms: this.inactivity_ms
    }, this.onChange.bind(this));

    this.following = true;
    this.emit('log', 'now following ' + this.source);
};

MultiSkimmer.prototype.saveSequence = function saveSequence()
{
    this.sequenceFile.save(this.sequence);
};

MultiSkimmer.prototype.pause = function pause()
{
    // this.emit('log', 'pausing');
    this.follow.pause();
};

MultiSkimmer.prototype.resume = function resume()
{
    // this.emit('log', 'resuming');
    this.saveSequence();
    this.follow.resume();
};

MultiSkimmer.prototype.onChange = function onChange(err, change)
{
    if (err) return this.emit('error', err);
    this.sequence = change.seq;
    if (!change.id) return;

    if (change.deleted && this.delete)
        this.handleDeletion(change);
    else
        this.handlePut(change);
};

// ----- deletion

MultiSkimmer.prototype.handleDeletion = function handleDeletion(change)
{
    this.emit('rm', change);
    this.pause();
    var packagepath = createDestinationPath(change.id, '');
    this.client.rmr(packagepath, this.cleanUpDeletions.bind(this, change));
};

MultiSkimmer.prototype.cleanUpDeletions = function cleanUpDeletions(change, err)
{
    // If the db is the same as the skim, then presumably it's already
    // gone, and if the user was just deleting a conflict or something, we
    // don't want to completely delete the entire thing.
    if (err || !change.id || this.source === this.skimdb)
        return this.deletionComplete(change, err);

    // Delete from the other db before moving on. Remove all conflicts by
    // deleting until 404.
    var headcheck =
    {
        uri: this.skimdb + '/' + change.id,
        method: 'HEAD',
    };
    Request(headcheck, function(err, res, body)
    {
        if (res.statusCode === 404)
            return this.deletionComplete(change);

        var rev = res.headers.etag.replace(/^"|"$/g, '');
        var delopts =
        {
            uri: headcheck.uri + '?rev=' + rev,
            method: 'DELETE',
        };
        Request(delopts, function(err, res, body)
        {
            // emit the error and move on
            if (err) return this.deletionComplete(change, err);
            // else recurse
            this.cleanUpDeletions(change);
        }.bind(this));
    }.bind(this));
};

MultiSkimmer.prototype.deletionComplete = function deletionComplete(change, err)
{
    if (err) return this.emit('error', err);

    this.emit('delete', change);
    this.resume();
};

// ----- puts & other changes

MultiSkimmer.prototype.handlePut = function handlePut(change)
{
    if (change.id.match(/^_design\//) && this.source !== this.skimdb)
        return this.putDesign(change);

    // this.emit('log', 'handling put: ' + change.id);
    this.pause();
    var url = this.source + '/' + encodeURIComponent(change.id) + '?att_encoding_info=true&revs=true';
    Request.get(url, { json: true }, function(err, res, body)
    {
        if (err) return this.emit('error', err);
        // If we see a 404, move on. The deletion will appear later in the changes feed.
        if (res.statusCode === 404) return this.resume();

        if (!body._attachments) body._attachments = {};
        change.doc = body;
        change.rev = body._rev;

        this.multiball(change);

    }.bind(this));
};

MultiSkimmer.prototype.multiball = function MULTIBALL(change)
{
    // We have a document with all its attachments. Our job now is
    // to copy all those attachments to their final homes using the
    // multi-fs client, but ONLY if they don't already exist.
    this.emit('log', 'MULTIBALL! ' + change.id);

    var doc = change.doc;
    var files = Object.keys(doc._attachments || {})
    .reduce(function(s, k)
    {
        var attach = doc._attachments[k];
        // Isaac says all gzip-encoded attachments are Cretans.
        if (attach.encoding === 'gzip')
        {
            delete attach.digest;
            delete attach.length;
        }

        if (attach.digest)
            attach.digest = attach.digest.replace(/^md5\-/, '');

        s['_attachments/' + k] = attach;
        return s;
    }, {});

    var json = new Buffer(JSON.stringify(doc, null, 2) + '\n', 'utf8');
    files['doc.json'] =
    {
        type:   'application/json',
        name:   'doc.json',
        length: json.length,
        digest: md5sum(json),
    };

    var changeInfo = { doc: doc, json: json, change: change };

    var iterator = function(fname, cb)
    {
        this.checkFileAndCopy(changeInfo, fname, files[fname], cb);
    }.bind(this);

    var completed = function(err)
    {
        if (err) return this.emit('error', err);
        this.multiballComplete(change);
    }.bind(this);
    async.each(Object.keys(files), iterator, completed);
};

function md5sum(str)
{
    return crypto.createHash('md5').update(str).digest('hex');
}

MultiSkimmer.prototype.checkFileAndCopy = function checkFileAndCopy(changeInfo, filename, metadata, callback)
{
    this.emit('log', 'skimming ' + filename + ' from ' + changeInfo.doc.name);
    if (filename === 'doc.json')
        return this.copyJSON(changeInfo, filename, metadata, callback);

    var fpath = path.join(changeInfo.doc.name, filename);

    var destfile = createDestinationPath(changeInfo.change.id, filename);
    this.client.stat(destfile, function(err, type, stat)
    {
        // ENOENT means we don't have a file there! push it up
        if (err && (err.code === 'ENOENT' || err.message.match(/No such file/)))
            return this.copyFile(changeInfo, filename, callback);
        callback(err);
    }.bind(this));
};

function createDestinationPath(packagename, filename)
{
    var initial = packagename.charAt(0);
    var destfile = path.join(initial, packagename, filename);

    return destfile;
}

MultiSkimmer.prototype.copyFile = function copyFile(changeInfo, filename, callback)
{
    var destfile = createDestinationPath(changeInfo.change.id, filename);
    var destdir = path.dirname(destfile);
    this.emit('log', 'exploding file ' + destfile);

    this.fetchAttachment(changeInfo.change, filename, function(err, data)
    {
        if (err) return callback(err);

        this.client.mkdirp(destdir, function(err)
        {
            if (err) return callback(err);
            this.client.writeFile(destfile, data, function(err)
            {
                if (err) return callback(err);
                this.emit('send', changeInfo.change, destfile);
                callback();

            }.bind(this));
        }.bind(this));
    }.bind(this));
};

MultiSkimmer.prototype.copyJSON = function copyJSON(changeInfo, filename, metadata, callback)
{
    var passthru = new stream.PassThrough();
    passthru.end(changeInfo.json);

    var destfile = createDestinationPath(changeInfo.change.id, filename);
    var destdir = path.dirname(destfile);
    this.emit('log', 'exploding docfile for ' + changeInfo.change.id);

    this.client.mkdirp(destdir, function(err)
    {
        if (err) return callback(err);

        this.client.writeFile(destfile, passthru, function(err)
        {
            if (err) return callback(err);
            this.emit('send', changeInfo.change, destfile);
            callback();
        }.bind(this));
    }.bind(this));
};

MultiSkimmer.prototype.fetchAttachment = function fetchAttachment(change, file, callback)
{
    var passthru = new stream.PassThrough();
    this.emit('attachment', change, path.join(change.id, file));
    var opts =
    {
        uri: this.source +
            '/' +
            change.id +
            '/' +
            encodeURIComponent(path.basename(file)),
        method: 'GET'
    };
    Request(opts).pipe(passthru);
    callback(null, passthru);
};


MultiSkimmer.prototype.putDesign = function putDesign(change)
{
    this.emit('log', 'putting design doc ' + change.id);
    this.pause();
    var docuri = this.source + '/' + change.id + '?revs=true';
    Request.get(docuri, { json: true }, function(err, res, data)
    {
        if (err) return this.emit('error', err);
        // If we get a 404, assume it's been deleted and continue on.
        if (res.statusCode === 404) return this.resume();

        change.doc = data;
        this.putBack(change);
    }.bind(this));
};

MultiSkimmer.prototype.cleanupDoc = function onPut(change)
{
    this.emit('log', 'entering cleanupDoc');

    var doc = change.doc
    // remove any attachments that don't belong, and
    // put any previously-vacuumed tgz's with a {skip:true}
    var attachments = doc._attachments || {};
    var versions = Object.keys(doc.versions || {});

    // Mark for keeping any that are the tarball for a version.
    var keep = versions.reduce(function(set, v)
    {
        var p = url.parse(doc.versions[v].dist.tarball).pathname;
        var f = path.basename(p);
        set[f] = true;
        return set;
    }, {});

    // Delete any attachments that are not keepers.
    Object.keys(attachments).forEach(function(f)
    {
        if (!keep[f]) delete attachments[f];
    });

    // Don't delete any keepers that were already put into manta
    Object.keys(keep).forEach(function(f)
    {
        if (!attachments[f])
            attachments[f] = { skip: true }
    });

    doc._attachments = attachments;

    // If we have a registry config, make sure that all dist.tarball
    // urls are pointing at the registry url, and not some weird place.
    if (this.registry)
    {
        versions.forEach(function(v)
        {
            var version = doc.versions[v];
            var r = url.parse(version.dist.tarball);
            var p = '/' + doc.name + '/-/' + path.basename(r.pathname);
            r = url.parse(this.registry + p);
            version.dist.tarball = r.href
        }, this);
    }

    // Also, remove per-version readmes, and just have a single max-2mb
    // readme at the top-level.
    readmeTrim(doc);
};

MultiSkimmer.prototype.multiballComplete = function multiballComplete(change, results)
{
    this.cleanupDoc(change);
    this.emit('put', change);
    this.emit('log', 'multiball ended ' + change.id);
    var doc = change.doc;
    var attachments = doc._attachments || {};

    var relevant = Object.keys(attachments).filter(function(a)
    {
        // Don't do putbacks for {skip:true} attachments.
        return !attachments[a].skip;
    });

    var extraReadmes = Object.keys(doc.versions ||{}).filter(function(v)
    {
        return doc.versions[v].readme;
    });

    if (!relevant.length && !extraReadmes.length && (this.source === this.skimdb))
    {
        // We have nothing to skim off.
        return this.completeAndResume(change, results);
    }

    // It's easier if we always have an _attachments, even if empty
    doc._attachments = {};
    this.putBack(change, results);
};

MultiSkimmer.prototype.putBack = function(change, results)
{
    this.emit('log', 'entering putBack');

    var doc = change.doc;
    var putUrl = this.skimdb + '/' + encodeURIComponent(change.id);

    // If this isn't a putBACK, then treat it like a replication job
    // If someone wrote something else, go ahead and be in conflict.
    // If we're putting back to the same db, then there's no need to
    // specify the _revisions, since we're letting Couch manage the
    // revision chain as a new edit on top of the existing one.
    if (this.source !== this.skimdb)
        putUrl += '?new_edits=false';
    else
        delete doc._revisions;

    // Slimmer, less fatty document goes into skimdb now.
    var opts =
    {
        uri:    putUrl,
        method: 'PUT',
        json:   doc,
    };
    Request(opts, function(err, res, body)
    {
        if (err) return this.emit('error', err);

        // We might get a 409 here if skimdb & source are the same, but
        // this will get handled naturally later. Other failures need to be
        // barked about.

        if (res.statusCode >= 400 && !(res.statusCode === 409 && this.skimdb === this.source))
        {
            this.emit('error', new Error(res.statusCode + ' on putback'));
        }

        this.completeAndResume(change, results);
    }.bind(this));
};

MultiSkimmer.prototype.completeAndResume = function completeAndResume(change, results)
{
    this.emit('log', 'completing put & resuming');
    this.emit('complete', change, results);
    this.resume();
};
