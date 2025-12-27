import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subtopic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subtopic',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'completed' 
    }
}, { timestamps: true });


progressSchema.index({ user: 1, subtopic: 1 }, { unique: true });

export default mongoose.model('Progress', progressSchema);
