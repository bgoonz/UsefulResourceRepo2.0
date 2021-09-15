var fs = require('fs')
  , path = require('path')
  , request = require('request')
  , qs = require('querystring')
  , exec = require('child_process').exec
  , crypto = require('crypto')

var twitter_config = JSON.parse( fs.readFileSync( path.resolve(__dirname, 'twitter-config.json'), 'utf-8' ) )

function uuid(){

  var s = [], itoh = '0123456789ABCDEF';

  // Make array of random hex digits. The UUID only has 32 digits in it, but we
  // allocate an extra items to make room for the '-'s we'll be inserting.
  for (var i = 0; i <36; i++) s[i] = Math.floor(Math.random()*0x10);

  // Conform to RFC-4122, section 4.4
  s[14] = 4;  // Set 4 high bits of time_high field to version
  s[19] = (s[19] & 0x3) | 0x8;  // Specify 2 high bits of clock sequence

  // Convert to hex chars
  for (var i = 0; i <36; i++) s[i] = itoh[s[i]];

  // Insert '-'s
  s[8] = s[13] = s[18] = s[23] = '-';

  return s.join('');

  
}

function sha1 (key, body) {
  return crypto.createHmac('sha1', key).update(body).digest('base64')
}

function rfc3986 (str) {
  return encodeURIComponent(str)
    .replace(/!/g,'%21')
    .replace(/\*/g,'%2A')
    .replace(/\(/g,'%28')
    .replace(/\)/g,'%29')
    .replace(/'/g,'%27')
    ;
}

function hmacsign (httpMethod, base_uri, params, consumer_secret, token_secret, body) {
  // adapted from https://dev.twitter.com/docs/auth/oauth
  var base = 
    (httpMethod || 'GET') + "&" +
    encodeURIComponent(  base_uri ) + "&" +
    Object.keys(params).sort().map(function (i) {
      // big WTF here with the escape + encoding but it's what twitter wants
      return escape(rfc3986(i)) + "%3D" + escape(rfc3986(params[i]))
    }).join("%26")
  var key = encodeURIComponent(consumer_secret) + '&'
  if (token_secret) key += encodeURIComponent(token_secret)
  return sha1(key, base)
}

function createAuthHeaders(_oauth, uri, method){

  var form = {}
  var oa = {}
  for (var i in form) oa[i] = form[i]
  for (var i in _oauth) oa['oauth_'+i] = _oauth[i]
  if (!oa.oauth_version) oa.oauth_version = '1.0'
  if (!oa.oauth_timestamp) oa.oauth_timestamp = Math.floor( (new Date()).getTime() / 1000 ).toString()
  if (!oa.oauth_nonce) oa.oauth_nonce = uuid().replace(/-/g, '')
  
  oa.oauth_signature_method = 'HMAC-SHA1'
  
  var consumer_secret = oa.oauth_consumer_secret
  delete oa.oauth_consumer_secret
  var token_secret = oa.oauth_token_secret
  delete oa.oauth_token_secret
  
  var baseurl = uri.protocol + '//' + uri.host + uri.pathname
  var signature = hmacsign(method, baseurl, oa, consumer_secret, token_secret)
  
  // oa.oauth_signature = signature
  // Not used?
  for (var i in form) {
    console.log('i in form '+ i)
    if ( i.slice(0, 'oauth_') in _oauth) {
      // skip 
      console.log('skipping')
    } else {
      delete oa['oauth_'+i]
    }
  }

  // NOTE: I added a space after the commma in the join() to explicitly match the way Twitter is doing it
  var authorization = 
    'Authorization: OAuth '+Object.keys(oa).sort().map(function (i) {return i+'="'+rfc3986(oa[i])+'"'}).join(', ')

  authorization += ', oauth_signature="'+rfc3986(signature)+'"'
  
  return authorization

  
}