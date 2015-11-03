/**
 * Paypal classic API with NVP formatting
 * @ndaidong
 * Refer: https://developer.paypal.com/docs/classic/api/
 **/

var bella = require('bellajs');
var request = require('request');
var Promise = require('bluebird');

var version = 124;
var liveAPIBase = 'https://api-3t.paypal.com/nvp';
var sandboxAPIBase = 'https://api-3t.sandbox.paypal.com/nvp';

var stringify = (data) => {
  var s = '';
  if(bella.isString(data)){
    s = data;
  }
  else if(bella.isArray(data) || bella.isObject(data)){
    var ar = [];
    for(var k in data){
      var val = data[k];
      if(bella.isString(val)){
        val = bella.encode(val);
      }
      else if(bella.isArray(val) || bella.isObject(val)){
        val = JSON.stringify(val);
      }
      ar.push(bella.encode(k) + '=' + val);
    }
    if(ar.length > 0){
      s = ar.join('&');
    }
  }
  return s;
}

var parse = (s) => {
  if(!bella.isString(s)){
    return s;
  }

  var d = {};
  var ss = bella.decode(s);
  var a = ss.split('&');
  if(a.length > 0){
    a.forEach(function(item){
      var b = item.split('=');
      if(b.length === 2){
        d[b[0]] = b[1];
      }
    });
  }
  return d;
}

function Paypal(opts){
  var mode = opts.mode || 'sandbox';
  var username = opts.username || '';
  var password = opts.password || '';
  var signature = opts.signature || '';

  var baseURL = mode === 'live' ? liveAPIBase : sandboxAPIBase;

  var payload = {
    USER: username,
    PWD: password,
    SIGNATURE: signature,
    VERSION: version
  }

  var sendRequest = function(method, params){
    var o = bella.copies(payload, params);
    o.METHOD = method;
    return new Promise(function(resolve, reject){
      return request.post({
        url: baseURL,
        headers: {
          'X-PAYPAL-SECURITY-USERID': o.USER,
          'X-PAYPAL-SECURITY-PASSWORD': o.PWD,
          'X-PAYPAL-SECURITY-SIGNATURE': o.SIGNATURE,
          'X-PAYPAL-RESPONSE-DATA-FORMAT': 'JSON'
        },
        body: stringify(params)
      }, function(err, response, body){
        if(err){
          console.trace(err);
          return reject(err);
        }
        var r = parse(body);
        return resolve(r);
      });
    });
  }
  return {
    request: sendRequest
  }
}


module.exports = Paypal;
