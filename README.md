# Audio Visualiser
---
This web app allows a user to use their microphone or upload a track to visualise the audio using Waveform and Frequency graphs. 
The app consists of a front-end made using React 
state hooks, Web Audio API and Canvas. The back-end consists of a lightweight server made using Node and Express, and Multer is 
used to store files locally.

### To run this application in macOS:
---
1. Fork this repository and enter git clone + the forked repositories url in your terminal
1. Navigate to the Client folder and enter npm install
1. Enter npm start to run the application interface in your browser **(I strongly advise using this application in Firefox as certian Web Audio Api features break in other browsers)**
1. Navigate to the Server folder and enter:
  * npm init -y
  * npm install express
  * npm install -D nodemon
  * npm install -D cor
5. Enter npm run server:dev to start the server

### To run this applicatioin in windows:
---
1. Fork this repository and enter git clone + the forked repositories url in your terminal
1. Navigate to the Client folder and enter npm install react-scripts -g 
2. Enter npm start to run the application interface in your browser **(I strongly advise using this application in Firefox as certian Web Audio Api features break in other browsers)**
3. Navigate to the Server folder and enter:
  * npm install react-scripts -g
  * npm install express -g 
  * npm isntall -D nodemon -g
