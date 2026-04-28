import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import useAuthStore from '../../store/useAuthStore';
import ChildCard from '../../components/ChildCard';
import SnsFeed from '../../components/SnsFeed';

const TeacherDashboard = () => {
  const { students, dailyReports, addDailyReport, medicationRequests, updateMedicationStatus } = useStore();
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('class');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newReport, setNewReport] = useState({ title: '', content: '' });

  // Filter students for this teacher's class
  const classStudents = students.filter(s => s.classId === user?.classId);
  
  // Filter medication requests for this class
  const classMedications = medicationRequests.filter(req => 
    classStudents.some(s => s.id === req.studentId || s.name === req.studentName)
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!newReport.title || !newReport.content) return;

    addDailyReport({ 
      ...newReport, 
      classId: user.classId,
      author: user.name 
    });
    setNewReport({ title: '', content: '' });
    alert('알림장이 발송되었습니다.');
  };

  return (
    <div className="admin-dashboard teacher-dashboard">
      <nav className="admin-nav">
        <div className="container">
          <h2>교무실 ({user?.name})</h2>
          <div className="nav-btns icon-nav-btns">
            <Link to="/" className="back-home" title="홈으로">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              <span>홈으로</span>
            </Link>
            <button onClick={handleLogout} className="logout-btn" title="로그아웃">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              <span>로그아웃</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="container admin-content">
        <div className="admin-tabs icon-tabs">
          <button className={activeTab === 'class' ? 'active' : ''} onClick={() => setActiveTab('class')} title="우리반 아이들">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span>우리반 아이들</span>
          </button>
          <button className={activeTab === 'sns' ? 'active' : ''} onClick={() => setActiveTab('sns')} title="SNS 커뮤니티">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            <span>SNS 커뮤니티</span>
          </button>
          <button className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')} title="학급 알림장">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            <span>학급 알림장</span>
          </button>
          <button className={activeTab === 'medication' ? 'active' : ''} onClick={() => setActiveTab('medication')} title="투약/특이사항">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 20.5 19 12a4.95 4.95 0 1 0-7-7L3.5 13.5a4.95 4.95 0 1 0 7 7Z"></path><path d="m8.5 8.5 7 7"></path></svg>
            <span>투약/특이사항</span>
          </button>
        </div>

        {activeTab === 'class' && (
          <div className="tab-pane">
            <div className="admin-header">
              <h3>우리반 원아 관리 ({classStudents.length}명)</h3>
            </div>
            <div className="student-grid">
              {classStudents.map(student => (
                <div key={student.id} className="student-mini-card" onClick={() => setSelectedStudent(student)}>
                  <img src={student.photo} alt={student.name} />
                  <div className="info">
                    <h4>{student.name}</h4>
                    {student.allergies !== '없음' && <span className="warning-badge">알러지 주의</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sns' && (
          <div className="tab-pane">
            <div className="admin-header">
              <h3>학부모 SNS 커뮤니티</h3>
            </div>
            <SnsFeed />
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="tab-pane">
            <div className="admin-header">
              <h3>학급 알림장 관리</h3>
            </div>
            <div className="admin-card-grid">
              <div className="admin-form-card">
                <h4>새 알림장 작성</h4>
                <form onSubmit={handleReportSubmit}>
                  <input type="text" placeholder="제목" value={newReport.title} onChange={(e) => setNewReport({...newReport, title: e.target.value})} required />
                  <textarea placeholder="오늘 우리 반 아이들은 어떤 하루를 보냈나요?" value={newReport.content} onChange={(e) => setNewReport({...newReport, content: e.target.value})} rows="6" required></textarea>
                  <button type="submit" className="btn btn-primary">발송하기</button>
                </form>
              </div>
              <div className="admin-list-card">
                <h4>최근 발송 내역</h4>
                <div className="admin-report-list">
                  {dailyReports.filter(r => r.classId === user.classId).map(rep => (
                    <div key={rep.id} className="admin-report-item">
                      <h5>{rep.title}</h5>
                      <span className="date">{rep.date}</span>
                      <p className="excerpt">{rep.content.substring(0, 50)}...</p>
                      <span className="comment-count">댓글 {rep.comments?.length || 0}개</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'medication' && (
          <div className="tab-pane">
            <div className="admin-header">
              <h3>투약 의뢰 접수 내역</h3>
            </div>
            <div className="inquiry-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>아이 이름</th>
                    <th>약 종류/용량</th>
                    <th>투약 시간</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {classMedications.map(req => (
                    <tr key={req.id} className={req.status}>
                      <td>{req.date}</td>
                      <td><strong>{req.studentName}</strong></td>
                      <td>{req.medicineType} ({req.dosage})</td>
                      <td>{req.time}</td>
                      <td>
                        <select 
                          value={req.status} 
                          onChange={(e) => updateMedicationStatus(req.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="pending">대기중</option>
                          <option value="completed">투약완료</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {classMedications.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>접수된 내역이 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Child Card Modal rendering */}
      {selectedStudent && (
        <ChildCard student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}
    </div>
  );
};

export default TeacherDashboard;
