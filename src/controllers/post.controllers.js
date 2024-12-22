import Post from "../models/post.model.js";

const createPost = async (req, res) => {
    try {
        const { title, content, author, privacy } = req.body;

        //* Validate required fields
        if (!title || !content || !author) {
            return res.status(400).json({ message: "Title, content and author are required" });
        }

        //* Create a new Post
        const post = await Post.create({ title, content, author, privacy });
        res.status(201).json({
            message: "Post created successfully",
            post, //* Include created post in the response
        });

    } catch (error) {
        //* Handle unexpected errors
        res.status(500).json({
            message: "Error creating post",
            error: error.message, //* Provide error details for debugging
        });
    }
};

const getPosts = async (req, res) => {
    try {
        //* Fetch all posts and populate author, likes, comments
        const posts = await Post.find({})
            .populate("author")
            .populate("likes")
            .populate("comments.user")
            .populate("reposts")
            .populate("bookmarks")
        //* Check if no posts are found 
        if (posts.length === 0) {
            return res.status(404).json({ message: "No Posts found" });
        }

        res.status(200).json(posts);
    } catch (error) {
        //* Handle unexpected errors
        res.status(500).json({
            message: "Error fetching Posts",
            error: error.message, //* Provide error details for debugging
        });
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, privacy } = req.body;

        const post = await Post.findByIdAndUpdate(
            id,
            { title, content, privacy },
            { new: true }
        );
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({
            message: "Post updated successfully",
            post,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating post",
            error: error.message,
        })
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndUpdate(id);

        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }

        res.status(200).json({
            message: "Post deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleted post",
            error: error.message
        });
    }
};

export { createPost, getPosts, updatePost, deletePost };
