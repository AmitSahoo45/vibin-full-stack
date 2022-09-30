const express = require('express');
const { getPosts,
    getPost,
    getPostsBySearch,
    createPost,
    updatePost,
    deletePost,
    likePost
} = require('../controllers/posts')
const router = express.Router();


router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.get('/:id', getPost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);


module.exports = router;