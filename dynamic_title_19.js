// dynamic titles on second parameter ofeach render method, also has to put a JS method in head.ejs file
const express = require('express');
const app = express();

app.set('views', './docs'); // setting up the view file's path
app.set('view engine', 'ejs'); // setting up the view engine, type of view engine which is 'ejs'

app.get('/', (req, res) => {
    let fantasy_movies = [
        {title: 'Harry Potter', author: 'J.K. Rowling'},
        {title: 'Fantastic Beast', author: 'J.K. Rowling'},
        {title: 'Lord of Rings', author: 'John Ronald Reuel Tolkien'}
    ]

    res.render('home', {
        name: 'Myat',
        age: 21,
        // blogs: blogs, // blogs(variable): blogs(array),
        fantasy_movies, // shorter than the above one, equal result
        title: 'Home'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About' // dynamic title on second parameter of render method
    });
});
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