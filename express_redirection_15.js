const express = require('express');
const app = express();
// get and sendFile are useful methods of express
app.get('/', (req, res) => {
    // res.send('<h1> "Hello World" </h1>'); // can write directly
    res.sendFile('./docs/home.html', {root: __dirname}); // also can direct to a file
})
app.get('/about', (req, res) => {
    res.sendFile('./docs/about.html', {root: __dirname});
});
app.get('/contact', (req, res) => {
    res.sendFile('./docs/contact.html', {root: __dirname});
});
app.get('about-us', (req, res) => {
    res.redirect('/about');
})

app.use((req, res) => {
    res.status(404);
    res.sendFile('./docs/404.html', {root: __dirname});
})

app.listen(3000,() => {
    console.log('App is running on port 3000')
});