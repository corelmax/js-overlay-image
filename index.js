#!/usr/bin/env node
var express = require('express'),
    app = express(),
    path = require('path');

app.use(express.static(path.join(__dirname)));

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
