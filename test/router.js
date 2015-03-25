var express = require('express'),
    router = express.Router();
    
//error response
router.get('/400', function(req, res) {
  express.wr(res,{
    code : 400,
    data : 'example!',
    message : 'Resource not found'
  });
});
//fail response
router.get('/500', function(req, res) {
  express.wr(res, {
    code : 500,
    data : '',
    message : 'Error!'
  });
});

module.exports = router;


