const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

app.use(express.static(path.join(__dirname, 'public')));

const logger = require('morgan');

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

////main index page for team picker app
app.get(('/'), (request,response)=>{
    const ONE_DAY = 1000*60*60*24;
    response.render('main_index');
})




const ADDRESS = 'localhost'; 
const PORT = 4545;
app.listen(PORT, ADDRESS, () => {
  console.log(`Server is listening on ${ADDRESS}:${PORT}`);
});