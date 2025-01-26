// putting functions in a blogController object
const Blog = require('../models/Blog');

const blogController = {
    index: async (req,res) => { // putting as a key(a must) of the object, can be any word
        let blogs = await Blog.find().sort({createdAt : -1});
        res.render('home',{
            blogs,
            title : "Home"
        })
    },
    show: async(req,res,next) => {
        try{
            let id = req.params.id;
            let blog = await Blog.findById(id);
            res.render('blogs/show', {
                blog,
                title: "Blog detail"
            })
        } catch(e){
            console.log(e);
            next();
        }
    },
    create: (req,res) => {
        res.render('blogs/create', {
            title : 'Blog Create'
        });
    },
    store: async (req,res) => {
        let {title,author,review} = req.body;
    
        let blog = new Blog({
            title,
            author,
            review
        });
    
        await blog.save();
    
        res.redirect('/');
    },
    delete: async(req,res,next) => { // blog delete route
        try{
            let id = req.params.id;
            await Blog.findByIdAndDelete(id);
            res.redirect('/');
        } catch(e){
            console.log(e);
            next();
        }
    }
}

module.exports = blogController; // extracting that object