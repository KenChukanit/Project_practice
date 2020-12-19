const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

app.use(express.static(path.join(__dirname, 'public')));

const logger = require('morgan');
const { response } = require('express');
const { request } = require('http');

app.set('view engine', 'ejs'); 

app.use(express.urlencoded({ extended: false}));

app.use(methodOverride((request,response)=>{
    if(request.body && request.body._method){
        const method = request.body._method;
        return method;
    }
}));

app.use(cookieParser());

app.use(logger('dev')); 