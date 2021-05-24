const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
app.use(cookieParser()) ;

dotenv.config({path: './config.env'});
require('./db/connection');

app.use(express.json());  //**** ii is used to convert json file data into readable formate.....jo data postman api ke through aa rha hai vo json format m hota hai */

// front end se backend m data get kiya

const PORT = process.env.PORT || 5000;

// connection of mongo database from online URL: mongoDb------create new project>collection>database name..and so on in *****connection.js

// linking of router files*********in router/auth.js  All pages
app.use(require('./router/auth'));




// *******************All pages are in auth.js *************************



//console.log('good');
app.listen(PORT, () =>
{
    console.log('this is running at port number '+PORT);
});   // give a post number to url

if(process.env.NODE_ENV === "production")
{
    app.use(express.static("client/build"));
}