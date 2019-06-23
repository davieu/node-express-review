const express = require('express');
const path = require('path');
const logger = require('./middleware/middleware.js')
const exphbs = require('express-handlebars')
const members = require('./Members')

const app = express();

// INIT MIDDLEWARE
app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
// For Form Submissions - Handle urlencoded data
app.use(express.urlencoded({ extended: false }));

//which ever static or handlebar route is on top will take precedence and will be run
// Homepage route from handlebars -
app.get('/', (req, res) => res.render('index', {
  title: 'Member App',
  members
}));

// SET STATIC FOLDER !!!!!!! If you want to use the static routes then move it above the handlebars route
app.use(express.static(path.join(__dirname, 'public')));

/* 
//GRABS THE JSON DATA THAT I MADE. NOT BEING USED THOUGH
fs.readFile(path.join(path.join('C:/Users/davis/code/node-practice/express-review/', '/data', 'members.json')), 'utf8', (err, data) => {
  if (err) throw err
  membersJSON = JSON.parse(data)
});
*/

// Members API routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

// send the file or page on '/'
// app.get('/', (req, res) => {
//   res.sendfile(path.join(__dirname, 'public', 'index.html'));
// });