const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function(collection) {

    const router = express.Router();
    
    router.get('/', function(req, res){
        res.json({message: 'Hello World'});
    })
    
    router.post('/upload', upload.single('track'), (req, res) => {

        console.log(req.body)
        console.log(req.file)
        res.json(req.body)
    })


    return router;
}

module.exports = createRouter;