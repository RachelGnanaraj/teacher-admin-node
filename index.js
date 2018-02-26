'use strict';

var fs = require('fs'),
  path = require('path'),
  http = require('http'),
  express = require('express');

const app = express()
var appConnect = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = process.env.PORT || 3000;

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  appConnect.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  appConnect.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  appConnect.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  appConnect.use(middleware.swaggerUi());

  // Start the server
  http.createServer(appConnect).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});

