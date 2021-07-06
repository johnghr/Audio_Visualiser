const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

// allows multi-part form data
const multer = require('multer');

// for working with local file system
const fs = require('fs');
// utils for working with file and directory paths
const path = require('path');

// joins the current directory to the upload directory in a path
const directoryPath = path.join(__dirname, 'uploads')



app.get('/', (req, res) => {
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        try {
            let fileNames = [];
            //listing all files using forEach
            files.forEach(file => fileNames.push(file)) 
            console.log(fileNames); 
            res.status(200).send(fileNames);  
        } catch (err) {
            return console.log('Unable to scan directory: ' + err);
        }
    })  
})

// sets the destination for file on storage or sets name and assigns to default location
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.split(' ').join('-'))
    }
})

const upload = multer({storage: fileStorageEngine})

app.post('/upload', upload.single('track'), (req, res) => {

    console.log(req.body)
    console.log(req.file)
    res.json(req.body)
})

app.use('/uploads/', express.static('uploads/'))

app.listen(5000, () => console.log('Server started on port 5000'))