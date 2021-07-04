const express = require('express');
const bodyParser = require('body-parser');
// helper for uploading files
const multer = require('multer')
// Create express app
const app = express();
app.use(bodyParser.urlencoded({extended: true}));



// Routes here
app.get('/', function(req, res){
    res.json({ message: 'Welcome'})
})

app.listen(5000, () => console.log('Server started on port 5000'))