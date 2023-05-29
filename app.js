require('dotenv').config();
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const express = require('express');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/userRouter');
var disabilitiesRouter = require('./routes/disabilitieRouter');



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/disabilitie', disabilitiesRouter);

module.exports = app;





