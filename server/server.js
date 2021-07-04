const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.get('/', function(req, res){
    res.json({message: 'Hello World'});
})

app.listen(5000, () => console.log('Server started on port 5000'))