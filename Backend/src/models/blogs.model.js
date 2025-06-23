import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        minlength: [20, 'Content should be at least 20 characters long']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required']
    },
    tags: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
