import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [feedbackList, setFeedbackList] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 150,
    activePlayers: 45,
    totalGames: 200,
    feedback: 0
  });

  const statusOptions = ["New", "In progress", "Completed"];

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await fetch('/data/feedback-data.json');
      const data = await response.json();
      setFeedbackList(data.reverse());
      setStats(prev => ({ ...prev, feedback: data.length }));
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const handleStatusChange = async (feedbackId, newStatus) => {
    try {
      // Update local state first for immediate UI feedback
      setFeedbackList(prevList =>
        prevList.map(feedback =>
          feedback.id === feedbackId
            ? { ...feedback, status: newStatus }
            : feedback
        )
      );

      // In a real application, you would make an API call here to update the status
      const response = await fetch('/data/feedback-data.json');
      const allFeedback = await response.json();
      const updatedFeedback = allFeedback.map(feedback =>
        feedback.id === feedbackId
          ? { ...feedback, status: newStatus }
          : feedback
      );

      // Save the updated feedback data
      await fetch('/api/feedback/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedbackId, status: newStatus }),
      });
    } catch (error) {
      console.error('Error updating feedback status:', error);
      // Revert the local state if the API call fails
      fetchFeedback();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return '#3498db';
      case 'In progress':
        return '#f39c12';
      case 'Completed':
        return '#2ecc71';
      default:
        return '#95a5a6';
    }
  };

  const renderFeedbackList = () => {
    return (
      <div className="feedback-list">
        {feedbackList.map((feedback) => (
          <div key={feedback.id} className="feedback-item">
            <div className="feedback-header">
              <h3>{feedback.name}</h3>
              <div className="status-dropdown">
                <select
                  value={feedback.status}
                  onChange={(e) => handleStatusChange(feedback.id, e.target.value)}
                  style={{ backgroundColor: getStatusColor(feedback.status) }}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <span className="feedback-email">{feedback.email}</span>
            <p className="feedback-message">{feedback.message}</p>
            <span className="feedback-date">
              {new Date(feedback.timestamp).toLocaleString()}
            </span>
          </div>
        ))}
        {feedbackList.length === 0 && (
          <p className="no-feedback">No feedback submissions yet.</p>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p>{stats.totalUsers}</p>
            </div>
            <div className="stat-card">
              <h3>Active Players</h3>
              <p>{stats.activePlayers}</p>
            </div>
            <div className="stat-card">
              <h3>Total Games</h3>
              <p>{stats.totalGames}</p>
            </div>
            <div className="stat-card">
              <h3>Feedback Count</h3>
              <p>{stats.feedback}</p>
            </div>
          </div>
        );
      case 'users':
        return <div>Users Management (Coming Soon)</div>;
      case 'games':
        return <div>Games Management (Coming Soon)</div>;
      case 'feedback':
        return renderFeedbackList();
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <button
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={activeTab === 'games' ? 'active' : ''}
            onClick={() => setActiveTab('games')}
          >
            Games
          </button>
          <button
            className={activeTab === 'feedback' ? 'active' : ''}
            onClick={() => setActiveTab('feedback')}
          >
            Feedback
          </button>
        </nav>
      </div>
      <div className="dashboard-content">
        <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
