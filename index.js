const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const moment = require('moment')

const members = require('./data/Members')
const logger = require('./middleware/middleware.js')


let membersJSON = []

// INIT MIDDLEWARE
// app.use(logger);

fs.readFile(path.join(__dirname, '/data', 'members.json'), 'utf8', (err, data) => {
  if (err) throw err
  membersJSON = JSON.parse(data)
});

// GETS ALL MEMBERS FROM JSON
app.get('/api/members', (req, res) => {
  res.json(membersJSON);
})

// GET ALL MEMBER FROM JS OBJECT
app.get('/api/membersjs', (req, res) => {
  res.json(members);
})

// GET SINGLE MEMBER
app.get('/api/member/:id', (req, res) => {
  // res.json(membersJSON[req.params.id])
  res.json(membersJSON.filter(member => member.id === parseInt(req.params.id)))
})

// GET ALL ACTIVE MEMBERS
app.get('/api/members-active', (req, res) => {
  res.json(membersJSON.filter(member => member.status == 'active'))
}) 

//GET ALL INACTIVE MEMBERS
app.get('/api/members-inactive', (req, res) => {
  res.json(membersJSON.filter(member => member.status == 'inactive'))
})

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

// send the file or page on '/'
// app.get('/', (req, res) => {
//   res.sendfile(path.join(__dirname, 'public', 'index.html'));
// });