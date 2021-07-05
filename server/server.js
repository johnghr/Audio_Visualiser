// initialise express
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors');
app.use(cors());
// allows multi-part form data
// const multer = require('multer');

app.post('/upload', (req, res) => {
    if(req.files.file === null){
        return res.status(400).json({msg: 'No file uploaded'})
    }

    const file = req.files.file;
    console.log("file at backend:", file)
    file.mv(`${__dirname}/uploads/${file.name}`, err => {
        if(err) {
            console.log(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}`})
    })
})

// cb is abreviation for call back
// const fileStorageEngine = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "--" + file.originalname)
//     }
// })

// const upload = multer({storage: fileStorageEngine})

// app.post('/upload', upload.single('track'),(req, res) => {
//     console.log("file hit server",req.file)
//     res.send("Single file upload success")
// })


app.get('/', function(req, res){
    res.json({message: 'Hello World'});
})


// app.post('/upload', upload.single('track'), function (req, res){
//     console.log("req file",req.file)
//     // where to save the file
//     let uploadLocation = './static/' + req.file.originalname;
//     // write the blob to the server as a file
//     fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)));
//     // status ok
//     res.sendStatus(200)
// })

// // serve out any static files in public HTML folder?
// app.use(express.static('./upload'))

app.listen(5000, () => console.log('Server started on port 5000'))