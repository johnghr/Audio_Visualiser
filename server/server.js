// const express = require('express');
// const app = express();
// const multer = require('multer');
// // require file system to save files
// const fs = require('fs');

// const cors = require('cors');
// app.use(cors());

// // app.get('/', function(req, res){
// //     res.json({message: 'Hello World'});
// // })

// app.post('/upload', upload.single('soundBlob'), function (req, res, next){
//     console.log(req.file)
//     // where to save the file
//     let uploadLocation = __dirname + '/public/uploads/' + req.file.originalname;
//     // write the blob to the server as a file
//     fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)));
//     // status ok
//     res.sendStatus(200)
// })

// // serve out any static files in public HTML folder?
// app.use(express.static('public'))

// app.listen(5000, () => console.log('Server started on port 5000'))