import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import FeedbackForm from '../components/FeedbackForm';
import api from '../services/api';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [myFeedback, setMyFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Fetch student's own feedback
  const fetchMyFeedback = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/feedback/my-feedback');
      if (response.data.success) {
        setMyFeedback(response.data.data);
      }
    } catch (err) {
      setError('Failed to load your feedback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyFeedback();
  }, []);

  const handleFeedbackSubmitted = () => {
    setFeedbackSubmitted(true);
    setError(''); // Clear any previous errors
    fetchMyFeedback();
    setTimeout(() => setFeedbackSubmitted(false), 3000);
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <h1>Welcome, {user?.name}!</h1>
        <p className="dashboard-subtitle">Student Dashboard</p>

        {feedbackSubmitted && <div className="success-message">Feedback submitted successfully!</div>}

        <div className="dashboard-content">
          <div className="feedback-form-section">
            <h2>Submit Feedback</h2>
            <FeedbackForm onSubmitSuccess={handleFeedbackSubmitted} />
          </div>

          <div className="feedback-list-section">
            <h2>Your Feedback</h2>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
              <p>Loading your feedback...</p>
            ) : myFeedback.length === 0 ? (
              <p className="no-data">You haven't submitted any feedback yet.</p>
            ) : (
              <div className="feedback-list">
                {myFeedback.map((item) => (
                  <div key={item._id} className="feedback-item">
                    <div className="feedback-header">
                      <h3>{item.subject}</h3>
                      <span className="teacher-name">Teacher: {item.teacherName}</span>
                    </div>
                    <p className="feedback-text">{item.feedbackText}</p>
                    <p className="feedback-date">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
