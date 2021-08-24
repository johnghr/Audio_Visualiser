const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const multer = require('multer');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '\\uploads')
console.log("directory name",__dirname)

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.replace(/\s+/g, ''))
    }
})

const upload = multer({storage: fileStorageEngine})

app.get('/', (req, res) => {
    fs.readdir(directoryPath, function (err, files) {
        try {
            let fileNames = [];
            files.forEach(file => fileNames.push(file)) 
            console.log(fileNames); 
            res.status(200).send(fileNames);  
        } catch (err) {
            return console.log('Unable to scan directory: ' + err);
        }
    })  
})

app.delete('/:id', (req, res) => {
    console.log("request parameters",req.params)
    fs.unlink(`${directoryPath}\\${req.params.id}`, (err) => {
        if (err) throw err;
        console.log(`${directoryPath} was deleted`)
    })
})


app.post('/upload', upload.single('track'), (req, res) => {
    console.log("incoming file", req.file)
    res.json(req.file.filename)
})

app.use('/uploads', express.static('uploads'))

app.listen(5000, () => console.log('Server started on port 5000'))