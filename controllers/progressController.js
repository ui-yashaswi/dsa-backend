import Progress from '../models/Progress.js';
import Subtopic from '../models/Subtopic.js';

export const updateProgress = async (req, res) => {
    try {
        const { subtopicId, status } = req.body;
        const userId = req.user._id;

        const progress = await Progress.findOneAndUpdate(
            { user: userId, subtopic: subtopicId },
            { status },
            { new: true, upsert: true }
        );

        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserProgress = async (req, res) => {
    try {
        const userId = req.user._id;
        const progress = await Progress.find({ user: userId });
        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProgressBoard = async (req, res) => {
    try {
        const userId = req.user._id;

        // 1. Get User's Completed Counts by Difficulty
        const userProgress = await Progress.aggregate([
            { $match: { user: userId, status: 'completed' } },
            {
                $lookup: {
                    from: 'subtopics',
                    localField: 'subtopic',
                    foreignField: '_id',
                    as: 'subtopicDetails'
                }
            },
            { $unwind: '$subtopicDetails' },
            {
                $group: {
                    _id: '$subtopicDetails.difficulty',
                    count: { $sum: 1 }
                }
            }
        ]);

        // 2. Get Total Subtopics Counts by Difficulty
        const totalSubtopics = await Subtopic.aggregate([
            {
                $group: {
                    _id: '$difficulty',
                    count: { $sum: 1 }
                }
            }
        ]);

        // 3. Process results
        const userCounts = { easy: 0, medium: 0, hard: 0, total: 0 };
        const totalCounts = { easy: 0, medium: 0, hard: 0, total: 0 };

        userProgress.forEach(item => {
            if (item._id) {
                userCounts[item._id] = item.count;
                userCounts.total += item.count;
            }
        });

        totalSubtopics.forEach(item => {
             if (item._id) {
                totalCounts[item._id] = item.count;
                totalCounts.total += item.count;
            }
        });

        const stats = {
            easy: totalCounts.easy ? (userCounts.easy / totalCounts.easy) * 100 : 0,
            medium: totalCounts.medium ? (userCounts.medium / totalCounts.medium) * 100 : 0,
            hard: totalCounts.hard ? (userCounts.hard / totalCounts.hard) * 100 : 0,
            totalCompletion: totalCounts.total ? (userCounts.total / totalCounts.total) * 100 : 0
        };

        res.json(stats);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
