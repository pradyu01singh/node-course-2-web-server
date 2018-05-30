const express = require('express');
const hbs = require('hbs');
const fs  = require('fs');
const app = express();
hbs.registerPartials(__dirname +'/views/partials');
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear() -1;
});
hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
})
app.set('view engine','hbs');
//app.use --gets called in order
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  fs.appendFile('server.log',`${now}: ${req.method}`,(err) => {
    console.log('unable to append file');
  })
  next();
});
// app.use((req,res,next) => {
//   res.render('maintainence.hbs'); //this will be used to direct all url to maintence page
// });
app.get('/',(req,res) => {
  res.render('home.hbs', {
    pageTitle: 'home page',
    pageHeader: 'Welcome to the home page',
    pageTitle: 'home page'
  })
});
app.get('/about',(req,res) => {
res.render('about.hbs', {
  pageHeader: 'Welcome to about page',
  pageTitle: 'About page'
});
});
app.get('/bad',(req,res) => {
  res.send({
    errorMessage: "could not find the page"
  });
});
app.listen(3000,() => {
  console.log('listening to port 3000');
});
