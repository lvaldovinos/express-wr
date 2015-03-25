'use strict';

module.exports = function(express) {
  var res;
  if (express && express.Router) {
    if (!express.wr) {
      express.wr = function(res, spec) {
        var code = spec.code || 200,
            data = (typeof spec === 'string') ? spec : spec.data || '',
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