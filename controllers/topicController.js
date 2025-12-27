import Topic from '../models/Topic.js';
import Subtopic from '../models/Subtopic.js';

export const getTopics = async (req, res) => {
    try {
        const topics = await Topic.find({}).lean();
        
        // Populate subtopics manually or via virtuals (doing manual parallel fetch for simplicity/speed with small dataset)
        const topicsWithSubtopics = await Promise.all(topics.map(async (topic) => {
            const subtopics = await Subtopic.find({ topic: topic._id });
            return { ...topic, subtopics };
        }));

        res.json(topicsWithSubtopics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTopicById = async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id);
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }
        const subtopics = await Subtopic.find({ topic: req.params.id });
        res.json({ ...topic.toObject(), subtopics });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
