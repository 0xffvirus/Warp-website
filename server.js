const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Ensure data directory exists
const dataDir = path.join(__dirname, 'public', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const feedbackFilePath = path.join(dataDir, 'feedback-data.json');

// Initialize JSON file if it doesn't exist
if (!fs.existsSync(feedbackFilePath)) {
    fs.writeFileSync(feedbackFilePath, JSON.stringify([], null, 2));
}

// Submit feedback endpoint
app.post('/api/feedback', (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide name, email, and message' 
            });
        }

        // Create new feedback object
        const newFeedback = {
            id: Date.now().toString(),
            name,
            email,
            message,
            timestamp: new Date().toISOString()
        };

        // Read existing feedbacks
        let feedbacks = [];
        try {
            const fileContent = fs.readFileSync(feedbackFilePath, 'utf8');
            feedbacks = JSON.parse(fileContent);
        } catch (error) {
            console.error('Error reading feedback file:', error);
            feedbacks = [];
        }

        // Add new feedback
        feedbacks.push(newFeedback);

        // Write back to file
        fs.writeFileSync(feedbackFilePath, JSON.stringify(feedbacks, null, 2));

        res.json({ success: true, message: 'Feedback saved successfully' });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ success: false, message: 'Error saving feedback' });
    }
});

// Get all feedback endpoint
app.get('/api/feedback', (req, res) => {
    try {
        const fileContent = fs.readFileSync(feedbackFilePath, 'utf8');
        const feedbacks = JSON.parse(fileContent);
        res.json(feedbacks);
    } catch (error) {
        console.error('Error reading feedback:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error reading feedback data' 
        });
    }
});

// Update feedback status endpoint
app.post('/api/feedback/update-status', (req, res) => {
    try {
        const { feedbackId, status } = req.body;

        // Validate input
        if (!feedbackId || !status) {
            return res.status(400).json({
                success: false,
                message: 'Please provide feedbackId and status'
            });
        }

        // Read existing feedbacks
        const fileContent = fs.readFileSync(feedbackFilePath, 'utf8');
        const feedbacks = JSON.parse(fileContent);

        // Find and update the feedback status
        const updatedFeedbacks = feedbacks.map(feedback =>
            feedback.id === feedbackId
                ? { ...feedback, status }
                : feedback
        );

        // Save the updated feedbacks
        fs.writeFileSync(feedbackFilePath, JSON.stringify(updatedFeedbacks, null, 2));

        res.json({ success: true });
    } catch (error) {
        console.error('Error updating feedback status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating feedback status'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
