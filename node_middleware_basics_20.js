// middlewares are functions that are operating between requests and responses, they are executed in chronological order
const express = require('express');
const app = express();

app.set('views', './docs');
app.set('view engine', 'ejs');

app.use((req, res, next) => { // this is the first middleware
    console.log("The first middleware is running.") // the first middleware is executed first
    next(); // without 'next' method, the browser will keep reloading because of the lack of responses
})
app.use((req, res, next) => { // this is the second middleware
    console.log("The second middleware is running.") // the second middleware is executed after the first middleware
    next();
})
app.get('/', (req, res) => {
    let fantasy_movies = [
        {title: 'Harry Potter', author: 'J.K. Rowling'},
        {title: 'Fantastic Beast', author: 'J.K. Rowling'},
        {title: 'Lord of Rings', author: 'John Ronald Reuel Tolkien'}
    ]

    res.render('home', {
        name: 'Myat',
        age: 21,
        fantasy_movies,
        title: 'Home'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});
// remember, the third middleware will not be executed since the middlewares is executed in chronological order
app.use((req, res, next) => { // this is the thrid middleware
    console.log("The third middleware is running.") // the third middleware is executed only if the below middleware which is 'contact' is requested
    next();
})
app.get('/contact', (req, res) => {
    res.render('contact', {
        title: "Conact"
    });
});
app.get('about-us', (req, res) => {
    res.redirect('/about', {
        title: 'About'
    });
})
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Error'
    });
})

app.listen(3000,() => {
    console.log('App is running on port 3000')
});