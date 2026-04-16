import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import api from '../services/api';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [allFeedback, setAllFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');

  // Fetch all feedback
  const fetchAllFeedback = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/feedback');
      if (response.data.success) {
        setAllFeedback(response.data.data);
      }
    } catch (err) {
      setError('Failed to load feedback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFeedback();
  }, []);

  // Delete feedback
  const handleDeleteFeedback = async (feedbackId) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) {
      return;
    }

    try {
      setError(''); // Clear any previous errors
      const response = await api.delete(`/feedback/${feedbackId}`);
      if (response.data.success) {
        setDeleteMessage('Feedback deleted successfully!');
        setAllFeedback(allFeedback.filter((item) => item._id !== feedbackId));
        setTimeout(() => setDeleteMessage(''), 3000);
      }
    } catch (err) {
      setError('Failed to delete feedback');
    }
  };

  // Get unique subjects and teachers
  const uniqueSubjects = [...new Set(allFeedback.map(item => item.subject))];
  const uniqueTeachers = [...new Set(allFeedback.map(item => item.teacherName))];

  // Filter feedback based on selected filters and sort by subject
  const filteredFeedback = allFeedback
    .filter(item => {
      const subjectMatch = !selectedSubject || item.subject === selectedSubject;
      const teacherMatch = !selectedTeacher || item.teacherName === selectedTeacher;
      return subjectMatch && teacherMatch;
    })
    .sort((a, b) => a.subject.localeCompare(b.subject));

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <h1>Welcome, {user?.name}!</h1>
        <p className="dashboard-subtitle">Teacher Dashboard - Manage Feedback</p>

        {error && <div className="error-message">{error}</div>}
        {deleteMessage && <div className="success-message">{deleteMessage}</div>}

        <div className="dashboard-content">
          <div className="feedback-list-section full-width">
            <h2>All Student Feedback ({allFeedback.length})</h2>

            {loading ? (
              <p>Loading feedback...</p>
            ) : allFeedback.length === 0 ? (
              <p className="no-data">No feedback submitted yet.</p>
            ) : (
              <>
                <div className="filter-section">
                  <div className="filter-group">
                    <label htmlFor="subject-filter">Filter by Subject:</label>
                    <select
                      id="subject-filter"
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="filter-select"
                    >
                      <option value="">All Subjects</option>
                      {uniqueSubjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-group">
                    <label htmlFor="teacher-filter">Filter by Teacher:</label>
                    <select
                      id="teacher-filter"
                      value={selectedTeacher}
                      onChange={(e) => setSelectedTeacher(e.target.value)}
                      className="filter-select"
                    >
                      <option value="">All Teachers</option>
                      {uniqueTeachers.map((teacher) => (
                        <option key={teacher} value={teacher}>
                          {teacher}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                <div className="feedback-list">
                  {filteredFeedback.length === 0 ? (
                    <p className="no-data">No feedback matches the selected filters.</p>
                  ) : (
                    filteredFeedback.map((item) => (
                      <div key={item._id} className="feedback-item teacher-view">
                        <div className="feedback-header">
                          <h3>{item.subject}</h3>
                          <span className="teacher-name">Teacher: {item.teacherName}</span>
                        </div>
                        <p className="feedback-text">{item.feedbackText}</p>
                        <div className="feedback-footer">
                          <p className="feedback-date">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </p>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteFeedback(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
