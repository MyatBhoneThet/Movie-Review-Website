// search blog dynamically by id
const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true }))

const express_layouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const Blog = require('./models/Blog');
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
app.use(express_layouts);

app.set('layout', 'layouts/default');

app.get('/add-blog', async(req, res) => {
    let blog = new Blog({
        title: 'Games of Thrones',
        author: 'George R. R. Martin',
        review: 'Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.'
    });
    await blog.save();
    res.send('blog saved');
})

app.get('/blogs/:id', async(req, res) => {
    let id = req.params.id;
    let blog = await Blog.findById(id);
    res.render('blogs/show', {
        blog,
        title: "blog detail"
    });
})

let logging_method = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} --`);
    next();
}
app.use(logging_method);

app.use(express.static('public'))

app.get('/', async(req, res) => {
    let fantasy_movies = await Blog.find().sort({sortedAt: -1});
    console.log(fantasy_movies);

    res.render('home', {
        name: 'Myat',
        age: 21,
        fantasy_movies,
        title: 'Home'
    });
})

app.post('/blogs', async(req, res) => {
    let {title, author, review} = req;
    let blog = new Blog({
        title: title,
        author: author,
        review: review
    });
    await blog.save();
    res.redirect('/');
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
app.get('/blogs/create', (req,res) => {
    res.render('blogs/create', {
        title: 'Blog create'
    });
})
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