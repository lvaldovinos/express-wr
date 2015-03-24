'use strict';

module.exports = function(app) {
  if (app && app.use) {
    if (!app.wr) {
      app.wr = function(spec) {
        console.log(this);
      };
    }
  } else {
    throw {
      name : 'Illegal argument',
      message : '@app argument MUST be an express instance'
    };
  }
};