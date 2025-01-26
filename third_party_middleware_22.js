// there are three ways to use logging method (traditional one, the one that is stored in a variable and calling that function, and the one that can put parameter in that logging function)
const express = require('express');
const app = express();

app.set('views', './docs');
app.set('view engine', 'ejs');

// this is the logging method using third-party middleware
// app.use((req, res, next) => {
//    console.log(`${req.method} ${req.originalUrl} --`);
//    next();
// })
// or
// let logging_method = (req, res, next) => {
//     console.log(`${req.method} ${req.originalUrl} --`);
//     next();
// }
// app.use(logging_method);
// or
let logging_method = (env) => {
    return (req, res, next) => {
        if (env === 'dev') {
            console.log(`${req.method} ${req.originalUrl} --`);
        }
        next();
    }
}
app.use(logging_method('dev'));

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