const express = require('express'); 
const router = express.Router();
const Blog = require('../models/Blog');
const BlogController = require('../controllers/blogController');

router.get('', BlogController.index); // show all the blogs on the main page
router.post('/:id', BlogController.show)
router.get('/create', BlogController.create);
router.post('', BlogController.store); // store created blogs
router.post('/:id/delete', BlogController.delete)
module.exports = router;