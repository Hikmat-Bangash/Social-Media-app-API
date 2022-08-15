import express from 'express';
import { CreatePost, DeletePost, GetPost, Like_Dislike_Post, UpdatePost } from '../Controller/PostsController.js';

const router = express.Router();

router.post('/',CreatePost);
router.get('/:id',GetPost);
router.put('/:id', UpdatePost);
router.delete('/:id', DeletePost);
router.put('/:id/like', Like_Dislike_Post); // like and dislike post router

export default router;