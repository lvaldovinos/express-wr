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

module.exports = function(express) {
  var res;
  if (express && express.Router) {
    if (!express.wr) {
      express.wr = function(res, spec) {
        var spec = spec || '';
        var code = spec.code || 200,
            data = !(_util.isObject(spec)) ? (_util.isDate(spec) ? spec.toString() : spec) : (_util.isSpecObj(spec) ? spec.data : spec),
            message = spec.message || '',
            status = (code >= 500 && code < 600) ? 'fail'
                     : (code >= 400 && code < 500) ? 'error' : 'success' ;
        if (!(res && res.send)) throw {
          name : 'Illegal argument',
          message : '@res MUST be a express.Response object'
        };
        return res.status(code).json({
          code : code,
          status : status,
          data : data,
          message : message
        });
      };
    }
  } else {
    throw {
      name : 'Illegal argument',
      message : '@app argument MUST be express'
    };
  }
};
