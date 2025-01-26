// creating layouts folder and default file for default navigation bar form the blog and create a blogs folder and create blog
// making constant navigation layout
const express = require('express');
const app = express();
const express_layouts = require('express-ejs-layouts'); // calling express-ejs-layouts
const mongoose = require('mongoose');
const Blog = require('./models/Blog');
//connecting to db url
let mongoUrl = "mongodb+srv://Steve:14112002@cluster0.ccmfqqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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
app.use(express_layouts); //and use it only under view engine

app.set('layout', 'layouts/default'); // applying layout file and layout file location

app.get('/add-blog', async(req, res) => {
    let blog = new Blog({
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        review: 'Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.'
    });
    await blog.save();
    res.send('blog saved');
})
// searching blog by ID

app.get('/single-blog', async(req, res) => {
    let blog = await Blog.findById('66711e90d4dabd97428db2ce')
    res.json(blog);
})

let logging_method = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} --`);
    next();
}
app.use(logging_method);

app.use(express.static('public'))

app.get('/', async(req, res) => { // putting blogs on the home page of localhost:3000
    let fantasy_movies = await Blog.find().sort({sortedAt: -1});
    console.log(fantasy_movies);

    res.render('home', {
        name: 'Myat',
        age: 21,
        fantasy_movies,
        title: 'Home'
    });
})
// making a new route '/blogs'
app.get('/blogs', async(req, res) => {
    console.log('hit api post capture');
});
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

//creating a route
app.get('/blogs/create', (req,res) => { // making a new route 'blog create' 
    res.render('blogs/create', {
        title: 'Blog create'
    });
})

app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Error'
    });
})