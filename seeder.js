import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from './models/Topic.js';
import Subtopic from './models/Subtopic.js';
import User from './models/User.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const seedData = async () => {
    try {
        await Topic.deleteMany();
        await Subtopic.deleteMany();
        await User.deleteMany();

        const topicsWithSubtopics = [
            {
                name: 'Recursion & Backtracking',
                description: 'Master the art of solving problems recursively.',
                subtopics: [
                    {
                        title: 'Introduction to Recursion',
                        youtubeLink: 'https://youtube.com',
                        articleLink: 'https://geeksforgeeks.org',
                        leetcodeLink: 'https://leetcode.com/tag/recursion/',
                        difficulty: 'easy'
                    },
                    {
                        title: 'Subset Sum',
                        youtubeLink: 'https://youtube.com',
                        articleLink: 'https://geeksforgeeks.org',
                        leetcodeLink: 'https://leetcode.com/problems/subset-sum/',
                        difficulty: 'medium'
                    },
                    {
                        title: 'N-Queens',
                        youtubeLink: 'https://youtube.com',
                        articleLink: 'https://geeksforgeeks.org',
                        leetcodeLink: 'https://leetcode.com/problems/n-queens/',
                        difficulty: 'hard'
                    }
                ]
            },
            {
                name: 'Arrays & Strings',
                description: 'Fundamental data structures for every interview.',
                subtopics: [
                    {
                        title: 'Two Sum',
                        youtubeLink: 'https://youtube.com',
                        articleLink: 'https://geeksforgeeks.org',
                        leetcodeLink: 'https://leetcode.com/problems/two-sum/',
                        difficulty: 'easy'
                    },
                    {
                        title: 'Kadanes Algorithm',
                        youtubeLink: 'https://youtube.com',
                        articleLink: 'https://geeksforgeeks.org',
                        leetcodeLink: 'https://leetcode.com/problems/maximum-subarray/',
                        difficulty: 'medium'
                    },
                    {
                        title: 'Trapping Rain Water',
                        youtubeLink: 'https://youtube.com',
                        articleLink: 'https://geeksforgeeks.org',
                        leetcodeLink: 'https://leetcode.com/problems/trapping-rain-water/',
                        difficulty: 'hard'
                    }
                ]
            },
            {
                name: 'Linked Lists',
                description: 'Linear data structures with dynamic memory allocation.',
                subtopics: [
                    {
                        title: 'Reverse Linked List',
                        youtubeLink: 'https://youtube.com',
                        articleLink: 'https://geeksforgeeks.org',
                        leetcodeLink: 'https://leetcode.com/problems/reverse-linked-list/',
                        difficulty: 'easy'
                    },
                    {
                        title: 'Detect Cycle',
                        youtubeLink: 'https://youtube.com',
                        articleLink: 'https://geeksforgeeks.org',
                        leetcodeLink: 'https://leetcode.com/problems/linked-list-cycle/',
                        difficulty: 'easy'
                    },
                    {
                        title: 'Merge K Sorted Lists',
                        youtubeLink: 'https://youtube.com',
                        articleLink: 'https://geeksforgeeks.org',
                        leetcodeLink: 'https://leetcode.com/problems/merge-k-sorted-lists/',
                        difficulty: 'hard'
                    }
                ]
            },
            {
                name: 'Trees & Graphs',
                description: 'Hierarchical and relational data structures.',
                subtopics: [
                    {
                        title: 'Binary Tree Inorder Traversal',
                        youtubeLink: 'https://youtube.com',
                        articleLink: 'https://geeksforgeeks.org',
                        leetcodeLink: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
                        difficulty: 'easy'
                    },
                    {
                        title: 'Lowest Common Ancestor',
                        youtubeLink: 'https://youtube.com',
                        articleLink: 'https://geeksforgeeks.org',
                        leetcodeLink: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
                        difficulty: 'medium'
                    },
                    {
                        title: 'Word Ladder',
                        youtubeLink: 'https://youtube.com',
                        articleLink: 'https://geeksforgeeks.org',
                        leetcodeLink: 'https://leetcode.com/problems/word-ladder/',
                        difficulty: 'hard'
                    }
                ]
            },
            {
                name: 'Dynamic Programming',
                description: 'Optimization technique for complex problems.',
                subtopics: [
                    {
                        title: 'Climbing Stairs',
                        youtubeLink: 'https://youtube.com',
                        articleLink: 'https://geeksforgeeks.org',
                        leetcodeLink: 'https://leetcode.com/problems/climbing-stairs/',
                        difficulty: 'easy'
                    },
                    {
                        title: 'Longest Increasing Subsequence',
                        youtubeLink: 'https://youtube.com',
                        articleLink: 'https://geeksforgeeks.org',
                        leetcodeLink: 'https://leetcode.com/problems/longest-increasing-subsequence/',
                        difficulty: 'medium'
                    },
                    {
                        title: 'Edit Distance',
                        youtubeLink: 'https://youtube.com',
                        articleLink: 'https://geeksforgeeks.org',
                        leetcodeLink: 'https://leetcode.com/problems/edit-distance/',
                        difficulty: 'hard'
                    }
                ]
            }
        ];

        const createdTopics = [];
        const allSubtopics = [];

        for (const topicData of topicsWithSubtopics) {
            const { name, description, subtopics } = topicData;
            const createdTopic = await Topic.create({ name, description });
            createdTopics.push(createdTopic);

            for (const subtopicData of subtopics) {
                allSubtopics.push({
                    ...subtopicData,
                    topic: createdTopic._id
                });
            }
        }

        await Subtopic.insertMany(allSubtopics);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedData();
