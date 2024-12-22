import mongoose from "mongoose";


const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        like: [

            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [

            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                text: String,
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        reposts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        ],
        bookmarks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        ],
        privacy:
        {
            type: String,
            default: "public"
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Post", postSchema);