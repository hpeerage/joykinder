import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import useAuthStore from '../../store/useAuthStore';

const AdminDashboard = () => {
  const { 
    inquiries, toggleInquiryStatus, 
    galleryImages, addGalleryImage, deleteGalleryImage,
    galleryCategories, addGalleryCategory, deleteGalleryCategory,
    content, updateContent
  } = useStore();
  const { logout, user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('inquiries');
  const [activeContentTab, setActiveContentTab] = useState('basic');

  // Form states
  const [newImage, setNewImage] = useState({ title: '', category: galleryCategories[0]?.id || 'forest', desc: '', src: '' });
  const [newCategoryName, setNewCategoryName] = useState('');
  const [cmsContent, setCmsContent] = useState(content);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    addGalleryCategory({ name: newCategoryName.trim() });
    setNewCategoryName('');
    alert('카테고리가 추가되었습니다.');
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    addGalleryImage(newImage);
    setNewImage({ title: '', category: 'forest', desc: '', src: '' });
    alert('갤러리에 이미지가 추가되었습니다.');
  };

  const handleCmsUpdate = (e) => {
    e.preventDefault();
    updateContent(cmsContent);
    alert('사이트 콘텐츠가 업데이트되었습니다.');
  };

  return (
    <div className="admin-dashboard">
      <nav className="admin-nav">
        <div className="container">
          <h2>조이킨더 관리자 ({user?.name})</h2>
          <div className="nav-btns icon-nav-btns">
            <Link to="/" className="back-home" title="홈으로">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              <span>홈으로</span>
            </Link>
            <button onClick={logout} className="logout-btn" title="로그아웃">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              <span>로그아웃</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="container admin-content">
        <div className="admin-tabs icon-tabs">
          <button className={activeTab === 'inquiries' ? 'active' : ''} onClick={() => setActiveTab('inquiries')} title="상담 내역">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            <span>상담 내역</span>
          </button>
          <button className={activeTab === 'gallery' ? 'active' : ''} onClick={() => setActiveTab('gallery')} title="갤러리 관리">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>갤러리 관리</span>
          </button>
          <button className={activeTab === 'content' ? 'active' : ''} onClick={() => setActiveTab('content')} title="콘텐츠 수정">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            <span>콘텐츠 수정</span>
          </button>
        </div>

        {activeTab === 'inquiries' && (
          <div className="tab-pane">
            <div className="admin-header">
              <h3>상담 신청 내역 ({inquiries.length})</h3>
            </div>
            <div className="inquiry-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>이름</th>
                    <th>연락처</th>
                    <th>문의 내용</th>
                    <th>상태</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map(iq => (
                    <tr key={iq.id} className={iq.status}>
                      <td>{iq.date}</td>
                      <td>{iq.name}</td>
                      <td>{iq.phone}</td>
                      <td className="content-cell">{iq.content}</td>
                      <td><span className={`status-badge ${iq.status}`}>{iq.status === 'new' ? '미확인' : '완료'}</span></td>
                      <td>
                        <button className="admin-btn" onClick={() => toggleInquiryStatus(iq.id)}>
                          {iq.status === 'new' ? '확인' : '취소'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="tab-pane">
            <div className="admin-header">
              <h3>갤러리 관리</h3>
            </div>
            <div className="admin-card-grid">
              <div className="admin-form-card">
                <h4>카테고리 관리</h4>
                <div style={{ marginBottom: '20px' }}>
                  <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                    <input 
                      type="text" 
                      placeholder="새 카테고리 이름" 
                      value={newCategoryName} 
                      onChange={(e) => setNewCategoryName(e.target.value)} 
                      required 
                      style={{ flex: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                    />
                    <button type="submit" className="btn btn-primary btn-small">추가</button>
                  </form>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {galleryCategories.map(cat => (
                      <span key={cat.id} style={{ display: 'inline-flex', alignItems: 'center', background: '#f1f3f5', padding: '5px 10px', borderRadius: '15px', fontSize: '0.85rem' }}>
                        {cat.name}
                        <button onClick={() => deleteGalleryCategory(cat.id)} style={{ background: 'none', border: 'none', marginLeft: '5px', cursor: 'pointer', color: '#888' }}>&times;</button>
                      </span>
                    ))}
                  </div>
                </div>

                <h4>새 이미지 추가</h4>
                <form onSubmit={handleImageUpload}>
                  <input type="text" placeholder="이미지 제목" value={newImage.title} onChange={(e) => setNewImage({...newImage, title: e.target.value})} required />
                  <select value={newImage.category} onChange={(e) => setNewImage({...newImage, category: e.target.value})}>
                    {galleryCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  <input type="text" placeholder="이미지 URL (임시)" value={newImage.src} onChange={(e) => setNewImage({...newImage, src: e.target.value})} required />
                  <textarea placeholder="설명" value={newImage.desc} onChange={(e) => setNewImage({...newImage, desc: e.target.value})}></textarea>
                  <button type="submit" className="btn btn-primary">추가하기</button>
                </form>
              </div>
              <div className="admin-list-card">
                <h4>현재 갤러리 리스트</h4>
                <div className="admin-image-list">
                  {galleryImages.map(img => {
                    const catName = galleryCategories.find(c => c.id === img.category)?.name || img.category;
                    return (
                      <div key={img.id} className="admin-image-item">
                        <img src={img.src} alt={img.title} />
                        <div className="info">
                          <h5>{img.title}</h5>
                          <span>{catName}</span>
                        </div>
                        <button onClick={() => deleteGalleryImage(img.id)} className="delete-btn">&times;</button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="tab-pane">
            <div className="admin-header">
              <h3>사이트 콘텐츠 수정</h3>
            </div>
            
            <div className="content-subtabs">
              <button className={activeContentTab === 'basic' ? 'active' : ''} onClick={() => setActiveContentTab('basic')}>기본 정보</button>
              <button className={activeContentTab === 'philosophy' ? 'active' : ''} onClick={() => setActiveContentTab('philosophy')}>교육 철학</button>
              <button className={activeContentTab === 'rhythm' ? 'active' : ''} onClick={() => setActiveContentTab('rhythm')}>하루 일과</button>
              <button className={activeContentTab === 'article' ? 'active' : ''} onClick={() => setActiveContentTab('article')}>매거진 칼럼</button>
            </div>

            <div className="admin-form-card wide">
              <form onSubmit={handleCmsUpdate}>
                {activeContentTab === 'basic' && (
                  <>
                    <div className="form-group">
                      <label>메인 히어로 제목</label>
                      <textarea 
                        value={cmsContent.heroTitle} 
                        onChange={(e) => setCmsContent({...cmsContent, heroTitle: e.target.value})}
                        rows="2"
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label>메인 히어로 부제목</label>
                      <textarea 
                        value={cmsContent.heroSubtitle} 
                        onChange={(e) => setCmsContent({...cmsContent, heroSubtitle: e.target.value})}
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>대표 주소</label>
                        <input 
                          type="text" 
                          value={cmsContent.address} 
                          onChange={(e) => setCmsContent({...cmsContent, address: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>대표 연락처</label>
                        <input 
                          type="text" 
                          value={cmsContent.phone} 
                          onChange={(e) => setCmsContent({...cmsContent, phone: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>대표 이메일</label>
                        <input 
                          type="email" 
                          value={cmsContent.email} 
                          onChange={(e) => setCmsContent({...cmsContent, email: e.target.value})}
                        />
                      </div>
                    </div>
                  </>
                )}

                {activeContentTab === 'philosophy' && cmsContent.philosophy && (
                  <div className="dynamic-list">
                    <h4>교육 철학 카드 (총 {cmsContent.philosophy.length}개)</h4>
                    {cmsContent.philosophy.map((item, index) => (
                      <div key={index} className="list-item-edit">
                        <div className="form-row">
                          <div className="form-group" style={{ flex: '0 0 80px' }}>
                            <label>아이콘</label>
                            <input 
                              type="text" 
                              value={item.icon} 
                              onChange={(e) => {
                                const newArr = [...cmsContent.philosophy];
                                newArr[index].icon = e.target.value;
                                setCmsContent({...cmsContent, philosophy: newArr});
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>제목</label>
                            <input 
                              type="text" 
                              value={item.title} 
                              onChange={(e) => {
                                const newArr = [...cmsContent.philosophy];
                                newArr[index].title = e.target.value;
                                setCmsContent({...cmsContent, philosophy: newArr});
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>내용</label>
                          <textarea 
                            value={item.desc} 
                            onChange={(e) => {
                              const newArr = [...cmsContent.philosophy];
                              newArr[index].desc = e.target.value;
                              setCmsContent({...cmsContent, philosophy: newArr});
                            }}
                            rows="2"
                          ></textarea>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeContentTab === 'rhythm' && cmsContent.rhythm && (
                  <div className="dynamic-list">
                    <h4>하루 일과 시간표 (총 {cmsContent.rhythm.length}개)</h4>
                    {cmsContent.rhythm.map((item, index) => (
                      <div key={index} className="list-item-edit">
                        <div className="form-row">
                          <div className="form-group" style={{ flex: '0 0 150px' }}>
                            <label>시간</label>
                            <input 
                              type="text" 
                              value={item.time} 
                              onChange={(e) => {
                                const newArr = [...cmsContent.rhythm];
                                newArr[index].time = e.target.value;
                                setCmsContent({...cmsContent, rhythm: newArr});
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>일과 명칭</label>
                            <input 
                              type="text" 
                              value={item.title} 
                              onChange={(e) => {
                                const newArr = [...cmsContent.rhythm];
                                newArr[index].title = e.target.value;
                                setCmsContent({...cmsContent, rhythm: newArr});
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>설명</label>
                          <textarea 
                            value={item.desc} 
                            onChange={(e) => {
                              const newArr = [...cmsContent.rhythm];
                              newArr[index].desc = e.target.value;
                              setCmsContent({...cmsContent, rhythm: newArr});
                            }}
                            rows="2"
                          ></textarea>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeContentTab === 'article' && cmsContent.waldorfArticle && (
                  <div className="dynamic-list article-edit">
                    <h4>매거진 칼럼 설정</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>카테고리명</label>
                        <input 
                          type="text" 
                          value={cmsContent.waldorfArticle.category} 
                          onChange={(e) => setCmsContent({...cmsContent, waldorfArticle: {...cmsContent.waldorfArticle, category: e.target.value}})}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>메인 제목 (br 태그 허용)</label>
                      <input 
                        type="text" 
                        value={cmsContent.waldorfArticle.title} 
                        onChange={(e) => setCmsContent({...cmsContent, waldorfArticle: {...cmsContent.waldorfArticle, title: e.target.value}})}
                      />
                    </div>
                    <div className="form-group">
                      <label>부제목</label>
                      <input 
                        type="text" 
                        value={cmsContent.waldorfArticle.subtitle} 
                        onChange={(e) => setCmsContent({...cmsContent, waldorfArticle: {...cmsContent.waldorfArticle, subtitle: e.target.value}})}
                      />
                    </div>
                    
                    <h5 style={{marginTop: '20px', marginBottom: '10px'}}>인트로 문단 (총 {cmsContent.waldorfArticle.intro.length}개)</h5>
                    {cmsContent.waldorfArticle.intro.map((p, index) => (
                      <div className="form-group" key={`intro-${index}`}>
                        <textarea 
                          value={p} 
                          onChange={(e) => {
                            const newIntro = [...cmsContent.waldorfArticle.intro];
                            newIntro[index] = e.target.value;
                            setCmsContent({...cmsContent, waldorfArticle: {...cmsContent.waldorfArticle, intro: newIntro}});
                          }}
                          rows="3"
                        ></textarea>
                      </div>
                    ))}
                    
                    <h5 style={{marginTop: '20px', marginBottom: '10px'}}>결론 영역</h5>
                    <div className="form-group">
                      <label>결론 제목</label>
                      <input 
                        type="text" 
                        value={cmsContent.waldorfArticle.conclusion.title} 
                        onChange={(e) => setCmsContent({...cmsContent, waldorfArticle: {...cmsContent.waldorfArticle, conclusion: {...cmsContent.waldorfArticle.conclusion, title: e.target.value}}})}
                      />
                    </div>
                    <div className="form-group">
                      <label>마지막 질문 (강조)</label>
                      <input 
                        type="text" 
                        value={cmsContent.waldorfArticle.conclusion.finalQuestion} 
                        onChange={(e) => setCmsContent({...cmsContent, waldorfArticle: {...cmsContent.waldorfArticle, conclusion: {...cmsContent.waldorfArticle.conclusion, finalQuestion: e.target.value}}})}
                      />
                    </div>
                    
                    <p className="admin-hint" style={{marginTop: '10px', fontSize: '0.9rem', color: '#666'}}>* Takeaway 상세 본문은 구조가 복잡하여 데모 버전에서는 요약 정보만 표시됩니다.</p>
                  </div>
                )}

                <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>변경사항 전체 저장하기</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
