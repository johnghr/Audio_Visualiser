const helpers = require('./helpers')
const express = require('express');
const bodyParser = require('body-parser');
// helper for uploading files
const multer = require('multer');
// Create express app
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const cors = require('cors')
app.use(cors());
app.use(express.static('static'))

app.get('/', function (req, res) {
    res.json({message:'Hello-World'})
})

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './static/tracks.js');
//     },
//     filename: function (req, file, cb) {
//         cb(null, this.filename.fieldname + '-' + Date.now())
//     }
// })

// app.post('/upload-track', (req, res) => {
//     let upload = multer({ storage: storage, fileFilter: helpers.audioFilter}).single('audio_track');

//     upload(req, res, function(err){
//         if(req.fileValidationError){
//             return res.send(req.fileValidationError)
//         } else if (!req.file) {
//             return res.send('Please select a track to upload')
//         } else if (err instanceof multer.MulterError) {
//             return res.send(err);
//         }else if (err) {
//             return res.send(err);
//         }

//         res.send('Track has been uploaded')
//     })
// })


app.listen(5000, () => console.log('Server started on port 5000'))