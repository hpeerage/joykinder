import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import useAuthStore from '../../store/useAuthStore';

const DailyReport = () => {
  const { dailyReports, addComment } = useStore();
  const { user } = useAuthStore();
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (reportId) => {
    if (!newComment.trim()) return;
    addComment(reportId, {
      author: user?.name,
      content: newComment
    });
    setNewComment('');
  };

  return (
    <div className="parent-dashboard">
      <nav className="admin-nav">
        <div className="container">
          <h2>우리 아이 알림장</h2>
          <Link to="/parent" className="back-home">뒤로가기</Link>
        </div>
      </nav>

      <div className="container admin-content">
        <div className="report-list">
          {dailyReports.map(report => (
            <div key={report.id} className="report-card">
              <div className="report-header">
                <h3>{report.title}</h3>
                <span className="date">{report.date} | {report.author}</span>
              </div>
              <div className="report-body">
                <p>{report.content}</p>
              </div>
              <div className="report-footer">
                <h4>댓글 ({report.comments.length})</h4>
                <div className="comments-list">
                  {report.comments.map(cmt => (
                    <div key={cmt.id} className="comment-item">
                      <span className="cmt-author">{cmt.author}</span>
                      <p className="cmt-content">{cmt.content}</p>
                      <span className="cmt-date">{cmt.date}</span>
                    </div>
                  ))}
                </div>
                <div className="comment-input-group">
                  <input 
                    type="text" 
                    placeholder="선생님께 드릴 말씀이 있나요?" 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button onClick={() => handleAddComment(report.id)}>등록</button>
                </div>
              </div>
            </div>
          ))}
          {dailyReports.length === 0 && (
            <p className="empty-msg">작성된 알림장이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyReport;
