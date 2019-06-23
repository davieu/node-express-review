const express = require('express');
const path = require('path');
const app = express();

// const members = require('./data/Members')
const logger = require('./middleware/middleware.js')

// INIT MIDDLEWARE
app.use(logger);

// Body Parser Middleware
app.use(express.json());
// For Form Submissions - Handle urlencoded data
app.use(express.urlencoded({ extended: false }))

/* 
//GRABS THE JSON DATA THAT I MADE. NOT BEING USED THOUGH
fs.readFile(path.join(path.join('C:/Users/davis/code/node-practice/express-review/', '/data', 'members.json')), 'utf8', (err, data) => {
  if (err) throw err
  membersJSON = JSON.parse(data)
});
*/

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// Members API routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

// send the file or page on '/'
// app.get('/', (req, res) => {
//   res.sendfile(path.join(__dirname, 'public', 'index.html'));
// });