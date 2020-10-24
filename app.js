
// password: 12345678Az
// Connection string: mongodb+srv://saleh:<password>@cluster0.pespt.mongodb.net/<dbname>?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://saleh:12345678Az@cluster0.pespt.mongodb.net/<dbname>?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to MongoDb Atlas!')
    })
    .catch((error) => {
        console.log('Unable to connect with MongoDb Atlas!'); 
        console.error(error); // allows us to know where the error occured, like wrong IP address
    });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

//imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/EOS_650D.jpg/439px-EOS_650D.jpg',

module.exports = app;