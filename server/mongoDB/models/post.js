import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    });

export default mongoose.models.Post || mongoose.model("Post", postSchema);
