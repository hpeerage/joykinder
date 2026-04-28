import React, { useState, useEffect, useRef } from 'react';

const PullToRefresh = ({ children, onRefresh }) => {
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const contentRef = useRef(null);

  const PULL_THRESHOLD = 80; // 새로고침이 작동할 최소 거리 (px)

  useEffect(() => {
    const handleTouchStart = (e) => {
      // 스크롤이 최상단일 때만 작동
      if (window.scrollY === 0) {
        setStartY(e.touches[0].clientY);
        setIsPulling(true);
      }
    };

    const handleTouchMove = (e) => {
      if (!isPulling) return;
      const y = e.touches[0].clientY;
      const pullDistance = y - startY;

      // 아래로 당길 때만 작동
      if (pullDistance > 0 && window.scrollY === 0) {
        // e.preventDefault(); // 안드로이드 등 네이티브 새로고침과 겹치면 주석 해제 (단, 스크롤 버그 유의)
        setCurrentY(pullDistance > PULL_THRESHOLD * 1.5 ? PULL_THRESHOLD * 1.5 : pullDistance);
      }
    };

    const handleTouchEnd = () => {
      if (!isPulling) return;
      
      if (currentY >= PULL_THRESHOLD) {
        setIsRefreshing(true);
        setCurrentY(50); // 새로고침 중 유지될 높이
        
        if (onRefresh) {
          onRefresh().finally(() => {
            setIsRefreshing(false);
            setCurrentY(0);
          });
        } else {
          // onRefresh 함수가 없으면 페이지 강제 새로고침
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } else {
        // 임계값 못 미치면 제자리로 복귀
        setCurrentY(0);
      }
      setIsPulling(false);
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPulling, startY, currentY, onRefresh]);

  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateY(${currentY - 50}px)`,
          transition: isPulling ? 'none' : 'transform 0.3s ease',
          zIndex: 0,
          color: 'var(--primary-color)',
          fontWeight: '500',
          fontSize: '0.9rem'
        }}
      >
        {isRefreshing ? (
          <span>새로고침 중... ⏳</span>
        ) : currentY >= PULL_THRESHOLD ? (
          <span>손을 놓으면 새로고침 🔄</span>
        ) : (
          <span>아래로 당겨서 새로고침 ↓</span>
        )}
      </div>

      <div 
        ref={contentRef}
        style={{
          transform: `translateY(${currentY}px)`,
          transition: isPulling ? 'none' : 'transform 0.3s ease',
          zIndex: 1,
          position: 'relative',
          backgroundColor: 'var(--bg-color)' // 뒤에 인디케이터가 비치지 않게 배경색 지정
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;
