const express = require('express');
const app = express();

//connecting to db url
let mongoUrl = "mongodb+srv://Steve:14112002@cluster0.ccmfqqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoUrl).then(() => {
    console.log('connected to mongo database');
    app.listen(3000,() => {
        console.log('App is running on port 3000')
    });
}).catch(err => {
    console.log(err)
});

app.set('views', './docs');
app.set('view engine', 'ejs');

let logging_method = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} --`);
    next();
}
app.use(logging_method);

app.use(express.static('public'))

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