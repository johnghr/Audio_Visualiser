const express = require("express");
const app = express();
const { getAudioDurationInSeconds } = require("get-audio-duration");
app.use(express.json());

const cors = require("cors");
app.use(cors());

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "/uploads");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(/\s+/g, ""));
  },
});

const upload = multer({ storage: fileStorageEngine });

app.get("/", (req, res) => {
  fs.readdir(directoryPath, function (err, files) {
    try {
      const promises = files.map((file) =>
        getAudioDurationInSeconds(`${directoryPath}/${file}`).then(
          (duration) => {
            const minutes = Math.floor(duration / 60);
            const seconds = Math.round(duration - minutes * 60);
            return { title: file, duration: `${minutes}:${seconds}` };
          }
        )
      );
      Promise.all(promises).then((tracks) => res.status(200).send(tracks));
    } catch (err) {
      return console.log("Unable to scan directory: " + err);
    }
  });
});

app.put("/:id", (req, res) => {
  fs.rename(
    `${directoryPath}/${req.params.id}`,
    `${directoryPath}/${req.body.title}`,
    () => {
      console.log(
        `${directoryPath}/${req.params.id} has been renamed ${directoryPath}\\${req.body.title}`
      );
    }
  );
});

app.delete("/:id", (req, res) => {
  console.log("request parameters", req.params);
  fs.unlink(`${directoryPath}/${req.params.id}`, (err) => {
    if (err) throw err;
    console.log(`${directoryPath} was deleted`);
  });
});

app.post("/upload", upload.single("track"), (req, res) => {
  res.json(req.file.filename);
});

app.use("/uploads", express.static("uploads"));

app.listen(5000, () => console.log("Server started on port 5000"));
