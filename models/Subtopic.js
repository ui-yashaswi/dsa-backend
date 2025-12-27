import mongoose from 'mongoose';

const subtopicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    youtubeLink: {
        type: String,
        required: true
    },
    articleLink: {
        type: String,
        required: true
    },
    leetcodeLink: {
        type: String,
        required: true,
        default: 'https://leetcode.com/problemset/all/'
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Subtopic', subtopicSchema);
