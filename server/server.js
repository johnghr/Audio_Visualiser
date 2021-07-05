// initialise express
const express = require('express');
const app = express();
// require fileSystem
const fs = require('fs');
const cors = require('cors');
app.use(cors());
// allows multi-part form data
const multer = require('multer');

app.get('/', function(req, res){
    res.json({message: 'Hello World'});
})

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    }
})
 const upload = multer({storage: fileStorageEngine})

app.post('/upload', upload.single('track'), (req, res) => {

    console.log(req.body)
    console.log(req.file)
    res.json(req.body)
})

app.use(express.static('uploads'))


app.listen(5000, () => console.log('Server started on port 5000'))