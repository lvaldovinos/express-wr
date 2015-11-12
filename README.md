# express-wr
Wrapped Response for express framework

<h2>Installation</h2>

  <code>
    npm install express-wr
  </code>

<h2>Example code</h2>

<p>Module that sends a wrapped response on Express framework based on <a href="http://www.restapitutorial.com/media/RESTful_Best_Practices-v1_1.pdf">REST Best practices (page 21)</a> </p>

```javascript
var express = require('express'),
    http = require('http'),
    wr = require('./../')(express),
    router = require('./router'),
    app = express(),
    server;

//success response    
app.get('/200', function(req, res) {
  express.wr(res, {
    code : 200,
    data : 'example!',
    message : ''
  });
});
```

<h2>API</h2>

<h4>#wr(res, spec)</h4>

<p>
  Method that sends a wrapped response to client.
</p>

<strong>Arguments</strong>

<p><code>res</code> This is an instance of express.Response</p>
<p><code>spec *optinal</code>This is an optional object that will be sent as the body of the response</p>

```json
  { "code" : 200,
    "data" : "http://www.example.com/resource/id",
    "message" : ""
  }
```
<h2>Sending different types of variables</h2>
<p>You can also wrap different types of variables, for instace:</p>

```javascript
var express = require('express'),
    http = require('http'),
    wr = require('./../')(express),
    router = require('./router'),
    app = express(),
    server;

app.get('/string', function(req, res) {
  express.wr(res, 'sending a string!');
});

app.get('/number', function(req, res) {
  express.wr(res, 150.49);
});

app.get('/boolean', function(req, res) {
  express.wr(res, true);
});

app.get('/null', function(req, res) {
  express.wr(res, null);
});

app.get('/undefined', function(req, res) {
  express.wr(res, undefined);
});

app.get('/date', function(req, res) {
  express.wr(res, new Date());
});

app.get('/array', function(req, res) {
  express.wr(res, ['1',2,3]);
});

app.get('/empty', function(req, res) {
  express.wr(res);
});
```

<h2>Example response on client</h2>
<p>If you do:</p>

```javascript
app.get('/array', function(req, res) {
  express.wr(res, ['1',2,3]);
});
```
<p>You will get a 200 response with a body like this:</p>
```json
  { "code" : 200,
    "status" : "success",
    "data" : ["1", 2, 3],
    "message" : ""
  }
```
<p>If you do:</p>

```javascript
app.get('/array', function(req, res) {
  express.wr(res, {
    code : 500,
    data : 'Unable to process request',
    message : 'Invalid arguments'
  });
});
```
<p>You will get a 500 response with a body like this:</p>
```json
  { "code" : 500,
    "status" : "fail",
    "data" : "Unable to process request",
    "message" : "Invalid arguments"
  }
```

<h2>Sending custom properties in wrapped response</h2>
<p>You can also send different custom properties in a wrapped response, for instace:</p>

```javascript
app.get('/custom', function(req, res) {
  express.wr(res, {
    code: 200,
    data: {},
    message: ''
  }, {
    error: 'this is an example',
    num: 123,
    obj: {}
  });
});
```
<p>You will get a 200 response with a body like this:</p>
```json
  { "code" : 200,
    "status" : "success",
    "data" : {},
    "message" : "",
    "error": "this is an example",
    "num": 123,
    "obj": {}
  }
```

<h2>Test</h2>

<code>npm test</code>

<h2>License</h2>

The MIT License (MIT)

Copyright (c) 2015 Luis Alonso Valdovinos Valencia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
