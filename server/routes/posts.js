import express from 'express'
import * as dotenv from 'dotenv'
import auth from '../middleware/auth.js'

import Post from '../mongoDB/models/post.js'
import { upload } from '../middleware/multerConfig.js';
import { uploadCloudinary } from '../utils/cloudinary.js';

dotenv.config();

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const username = req.query.username;
        const name = req.query.name?.toLowerCase();
        const allPosts = await Post.find(username && { username } || name && { name });
        return res.status(201).json(allPosts)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Something went wrong' })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId)
        return res.status(201).json(post)
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
});

router.post("/add", upload.fields([{ name: 'img', maxCount: 1 }]), async (req, res) => {
    try {
        const {
            name,
            username
        } = req.body;
        // console.log(req.body);
        // console.log(req.files?.img[0]?.path);
        const img = req.files?.img[0]?.path;

        const resImage = await uploadCloudinary(img);

        if (!resImage) return null;

        // console.log(body, bodyWithUrl)
        const newPost = await Post.create({
            name: name.toLowerCase(),
            img: resImage.url,
            username,
        })

        // const bodyWithUrl = {
        //     name,
        //     img: resImage.url,
        //     username
        // }

        return res.status(201).json(newPost);
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ error: 'Error in creating the post' })
    }
})

router.put('/update/:id', upload.fields([{ name: 'img', maxCount: 1 }]), async (req, res) => {
    try {
        const id = req.params.id;
        const {
            name,
        } = req.body;

        const foundPost = await Post.findById(id);

        if (!foundPost) {
            return res.status(404).json({ error: 'No such Post with this id' })
        }
        const img = req.files?.img[0]?.path;

        const resImage = await uploadCloudinary(img);

        if (!resImage) return res.status(500).json({ error: 'No Image Selected' });

        foundPost.name = name;
        foundPost.img = resImage.url;

        await foundPost.save();

        return res.status(201).json(foundPost)
    } catch (error) {
        // console.log(error)
        res.status(500).json({ error: 'Unable to update' });
    }
})

router.delete('/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        await Post.findByIdAndDelete(id);
        res.status(201).json({ message: 'Successfully deleted the post' })
    } catch (error) {
        res.status(500).json({ error: 'Error in deleting the post' })
    }
});

export default router;