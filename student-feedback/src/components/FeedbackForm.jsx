import { useState, useEffect } from 'react';
import api from '../services/api';

const FeedbackForm = ({ onSubmitSuccess }) => {
  const [subject, setSubject] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);

  // Fetch subjects and teachers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsRes, teachersRes] = await Promise.all([
          api.get('/feedback/subjects'),
          api.get('/feedback/teachers'),
        ]);
        setSubjects(subjectsRes.data.data);
        setTeachers(teachersRes.data.data);
        setError(''); // Clear error on successful load
      } catch (err) {
        setError('Failed to load subjects and teachers');
      }
    };

    fetchData();
  }, []);

  const handleFeedbackChange = (e) => {
    setFeedbackText(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/feedback', {
        subject,
        teacherName,
        feedbackText,
      });

      if (response.data.success) {
        // Reset form
        setSubject('');
        setTeacherName('');
        setFeedbackText('');
        setCharCount(0);
        onSubmitSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="subject">Subject:</label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        >
          <option value="">-- Select Subject --</option>
          {subjects.map((subj) => (
            <option key={subj} value={subj}>
              {subj}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="teacher">Teacher:</label>
        <select
          id="teacher"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          required
        >
          <option value="">-- Select Teacher --</option>
          {teachers.map((teacher) => (
            <option key={teacher} value={teacher}>
              {teacher}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="feedback">Feedback:</label>
        <textarea
          id="feedback"
          value={feedbackText}
          onChange={handleFeedbackChange}
          required
          placeholder="Enter your feedback here... (minimum 10 characters)"
          minLength="10"
          rows="6"
        />
        <p className="char-count">
          {charCount} / 500 characters {charCount < 10 && '(minimum 10 required)'}
        </p>
      </div>

      <button
        type="submit"
        disabled={loading || charCount < 10}
        className="submit-btn"
      >
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
};

export default FeedbackForm;
