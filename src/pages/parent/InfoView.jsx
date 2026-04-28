import React from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../store/useStore';

const InfoView = ({ type }) => {
  const { shuttleInfo, mealMenu } = useStore();

  return (
    <div className="parent-dashboard">
      <nav className="admin-nav">
        <div className="container">
          <h2>{type === 'shuttle' ? '셔틀버스 정보' : '오늘의 식단'}</h2>
          <Link to="/parent" className="back-home">뒤로가기</Link>
        </div>
      </nav>

      <div className="container admin-content">
        {type === 'shuttle' ? (
          <div className="admin-card-grid single">
            <div className="admin-list-card">
              <h4>운행 노선 및 시간표</h4>
              <div className="shuttle-list">
                {shuttleInfo.routes.map(route => (
                  <div key={route.id} className="shuttle-item">
                    <div className="shuttle-header">
                      <span className="route-name">{route.name}</span>
                      <span className="route-time">{route.time} 출발</span>
                    </div>
                    <p className="route-stops">{route.stops}</p>
                  </div>
                ))}
              </div>
              <div className="info-box">
                <p>⚠️ 교통 상황에 따라 5~10분 정도 차이가 발생할 수 있습니다.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="admin-card-grid single">
            <div className="admin-list-card meal-view">
              <div className="meal-icon">🍱</div>
              <h4>오늘의 유기농 식단</h4>
              <div className="meal-content">
                <p className="menu-text">{mealMenu.today}</p>
              </div>
              <div className="origin-info">
                <h5>원산지 정보</h5>
                <p>{mealMenu.origin}</p>
              </div>
              <div className="organic-badge">
                <span>🌿 100% 유기농 및 무농약 재료 사용</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoView;
