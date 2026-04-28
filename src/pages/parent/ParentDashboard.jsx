import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import useStore from '../../store/useStore';
import SnsFeed from '../../components/SnsFeed';
import ChildCard from '../../components/ChildCard';

const ParentDashboard = () => {
  const { user, logout } = useAuthStore();
  const { students } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('main');
  const [showChildCard, setShowChildCard] = useState(false);

  // Find the parent's child
  const myChild = students.find(s => s.id === user?.studentId);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="parent-dashboard">
      <nav className="admin-nav">
        <div className="container">
          <h2>우리 아이 알림장</h2>
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

      <div className="container parent-content">
        <div className="welcome-section">
          <h3>안녕하세요, {user?.name}님! 👋</h3>
          <p>오늘의 조이킨더 소식을 확인해 보세요.</p>
        </div>

        <div className="admin-tabs icon-tabs parent-tabs" style={{ marginBottom: '20px' }}>
          <button className={activeTab === 'main' ? 'active' : ''} onClick={() => setActiveTab('main')} title="기본 메뉴">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <span>기본 메뉴</span>
          </button>
          <button className={activeTab === 'sns' ? 'active' : ''} onClick={() => setActiveTab('sns')} title="SNS 커뮤니티">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            <span>SNS 커뮤니티</span>
          </button>
          <button onClick={() => setShowChildCard(true)} title="우리 아이 카드">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>우리 아이 카드</span>
          </button>
        </div>

        {activeTab === 'main' && (
          <div className="parent-grid tab-pane">
            <div className="parent-card">
              <div className="icon">📝</div>
              <h4>알림장</h4>
              <p>선생님이 보내신 오늘 하루 일과를 확인하세요.</p>
              <button className="btn-small" onClick={() => navigate('/parent/reports')}>열기</button>
            </div>
            <div className="parent-card">
              <div className="icon">💊</div>
              <h4>투약의뢰서</h4>
              <p>아이의 약 복용이 필요한 경우 신청해 주세요.</p>
              <button className="btn-small" onClick={() => navigate('/parent/medication')}>신청하기</button>
            </div>
            <div className="parent-card">
              <div className="icon">🚌</div>
              <h4>셔틀 정보</h4>
              <p>셔틀버스 운행 시간 및 노선을 확인합니다.</p>
              <button className="btn-small" onClick={() => navigate('/parent/shuttle')}>보기</button>
            </div>
            <div className="parent-card">
              <div className="icon">🍱</div>
              <h4>오늘의 식단</h4>
              <p>정성껏 준비한 아이들의 식단을 확인하세요.</p>
              <button className="btn-small" onClick={() => navigate('/parent/menu')}>보기</button>
            </div>
          </div>
        )}

        {activeTab === 'sns' && (
          <div className="tab-pane">
            <SnsFeed />
          </div>
        )}

      </div>

      {showChildCard && myChild && (
        <ChildCard student={myChild} onClose={() => setShowChildCard(false)} />
      )}
    </div>
  );
};

export default ParentDashboard;
