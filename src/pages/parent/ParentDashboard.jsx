import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import useStore from '../../store/useStore';
import SnsFeed from '../../components/SnsFeed';
import ChildCard from '../../components/ChildCard';

const ParentDashboard = () => {
  const { user, logout } = useAuthStore();
  const { students, updateStudent, addStudent } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('main');
  const [selectedChildId, setSelectedChildId] = useState(null);

  // 다중 자녀 필터링 (현재 로그인한 부모의 아이디와 일치하는 학생들)
  const myChildren = students.filter(s => s.parentId === user?.id);

  // 자녀 추가 폼 상태
  const [newChildData, setNewChildData] = useState({ name: '', classId: 'unassigned', allergies: '', notes: '' });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // 이미지 리사이징 및 업로드 핸들러
  const handleImageUpload = (e, childId) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/webp', 0.8);
        updateStudent(childId, { photo: dataUrl });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleAddChild = (e) => {
    e.preventDefault();
    if (!newChildData.name) return;
    addStudent({ ...newChildData, parentId: user?.id, photo: null });
    setNewChildData({ name: '', classId: 'unassigned', allergies: '', notes: '' });
    alert('새로운 자녀가 등록되었습니다.');
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
          <button className={activeTab === 'children' ? 'active' : ''} onClick={() => setActiveTab('children')} title="우리 아이 관리">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span>아이 관리</span>
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

        {activeTab === 'children' && (
          <div className="tab-pane">
            <h3 style={{ marginBottom: '15px' }}>등록된 자녀 목록 ({myChildren.length}명)</h3>
            <div className="children-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
              {myChildren.length === 0 ? (
                <p style={{ color: '#666' }}>등록된 자녀가 없습니다.</p>
              ) : (
                myChildren.map(child => (
                  <div key={child.id} className="parent-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div className="child-avatar" style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#e2e8f0', flexShrink: 0 }}>
                        {child.photo ? (
                          <img src={child.photo} alt={child.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>사진 없음</div>
                        )}
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 5px 0' }}>{child.name}</h4>
                        <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>반: {child.classId === 'unassigned' ? '미배정' : child.classId}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label className="btn-small" style={{ cursor: 'pointer', margin: 0, backgroundColor: '#f1f5f9', color: '#475569' }}>
                        사진 변경
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, child.id)} style={{ display: 'none' }} />
                      </label>
                      <button className="btn-small" onClick={() => setSelectedChildId(child.id)}>카드 보기</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="parent-card" style={{ padding: '20px' }}>
              <h4 style={{ marginBottom: '15px' }}>새로운 자녀 등록</h4>
              <form onSubmit={handleAddChild} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" placeholder="자녀 이름 (필수)" value={newChildData.name} onChange={e => setNewChildData({...newChildData, name: e.target.value})} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <input type="text" placeholder="알레르기 정보 (선택)" value={newChildData.allergies} onChange={e => setNewChildData({...newChildData, allergies: e.target.value})} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <input type="text" placeholder="특이사항 (선택)" value={newChildData.notes} onChange={e => setNewChildData({...newChildData, notes: e.target.value})} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <button type="submit" className="btn-small" style={{ alignSelf: 'flex-start', marginTop: '10px' }}>등록하기</button>
              </form>
            </div>
          </div>
        )}

      </div>

      {selectedChildId && (
        <ChildCard student={students.find(s => s.id === selectedChildId)} onClose={() => setSelectedChildId(null)} />
      )}
    </div>
  );
};

export default ParentDashboard;
