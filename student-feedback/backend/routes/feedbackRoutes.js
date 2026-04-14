import express from 'express';
import Feedback from '../models/Feedback.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { SUBJECTS, TEACHERS } from '../utils/constants.js';

const router = express.Router();

// Get all predefined subjects (public)
router.get('/subjects', (req, res) => {
  res.status(200).json({
    success: true,
    data: SUBJECTS,
  });
});

// Get all predefined teachers (public)
router.get('/teachers', (req, res) => {
  res.status(200).json({
    success: true,
    data: TEACHERS,
  });
});

// Get all feedback (teacher only)
router.get('/', authMiddleware, roleMiddleware('teacher'), async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Feedback retrieved successfully',
      count: feedback.length,
      data: feedback,
    });
  } catch (error) {
    console.error('Get Feedback Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving feedback',
      error: error.message,
    });
  }
});

// Get own feedback (student only)
router.get('/my-feedback', authMiddleware, roleMiddleware('student'), async (req, res) => {
  try {
    const feedback = await Feedback.find({ studentId: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: 'Your feedback retrieved successfully',
      count: feedback.length,
      data: feedback,
    });
  } catch (error) {
    console.error('Get Own Feedback Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving your feedback',
      error: error.message,
    });
  }
});

// Create feedback (student only)
router.post('/', authMiddleware, roleMiddleware('student'), async (req, res) => {
  try {
    const { subject, teacherName, feedbackText } = req.body;

    // Validation
    if (!subject || !teacherName || !feedbackText) {
      return res.status(400).json({
        success: false,
        message: 'Subject, teacher name, and feedback text are required',
      });
    }

    // Validate subject exists in predefined list
    if (!SUBJECTS.includes(subject)) {
      return res.status(400).json({
        success: false,
        message: `Invalid subject. Allowed subjects: ${SUBJECTS.join(', ')}`,
      });
    }

    // Validate teacher exists in predefined list
    if (!TEACHERS.includes(teacherName)) {
      return res.status(400).json({
        success: false,
        message: `Invalid teacher. Allowed teachers: ${TEACHERS.join(', ')}`,
      });
    }

    // Validate feedback text length
    if (feedbackText.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Feedback must be at least 10 characters long',
      });
    }

    // Create new feedback
    const newFeedback = new Feedback({
      studentName: req.user.name,
      subject,
      teacherName,
      feedbackText: feedbackText.trim(),
      studentId: req.user.id,
    });

    await newFeedback.save();

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: newFeedback,
    });
  } catch (error) {
    console.error('Create Feedback Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating feedback',
      error: error.message,
    });
  }
});

// Delete feedback (teacher only)
router.delete('/:id', authMiddleware, roleMiddleware('teacher'), async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete feedback
    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Feedback deleted successfully',
      data: feedback,
    });
  } catch (error) {
    console.error('Delete Feedback Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting feedback',
      error: error.message,
    });
  }
});

export default router;
