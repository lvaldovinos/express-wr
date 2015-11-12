'use strict';

var _util = {
  isObject : function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj && !(this.isArray(obj)) ;
  },
  isArray : function(obj) {
    return toString.call(obj) === '[object Array]';
  },
  isDate : function(obj) {
    return toString.call(obj) === '[object Date]';
  },
	isSpecObj : function(obj) {
		return (this.isObject(obj) && ('code' in obj) && ('data' in obj));
	}
};

var extendOwn = function extend(source, dest) {
  for(var prop in source) {
    if (source.hasOwnProperty(prop)) {
      dest[prop] = source[prop];
    }
  }
  return dest;
}

module.exports = function(express) {
  var res;
  if (express && express.Router) {
    if (!express.wr) {
      express.wr = function(res, spec, meta) {
        var result = {},
          spec = spec || '',
          code = spec.code || 200,
          data = !(_util.isObject(spec)) ? (_util.isDate(spec) ? spec.toString() : spec) : (_util.isSpecObj(spec) ? spec.data : spec),
          message = spec.message || '',
          status = (code >= 500 && code < 600) ? 'fail' : (code >= 400 && code < 500) ? 'error' : 'success';
        if (!(res && res.send)) throw {
          name : 'Illegal argument',
          message : '@res MUST be a express.Response object'
        };
        result = {
          code : code,
          status : status,
          data : data,
          message : message
        };
        if (meta) {
          if (!_util.isObject(meta)) throw {
            name : 'Illegal argument',
            message : '@meta MUST be an object'
          };
          result = extendOwn(meta, result);
        }
        return res.status(code).json(result);
      };
    }
  } else {
    throw {
      name : 'Illegal argument',
      message : '@app argument MUST be express'
    };
  }
};
