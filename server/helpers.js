const audioFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(mp3|mp3|wav|WAV|mp4|MP4)$/)) {
        req.fileValidationError = "Only audio files are allowed.";
        return cb(new Error('Only audio files are allowed.'), false);
    }
    cb(null, true);
};
exports.audioFilter = audioFilter;