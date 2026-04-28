import React from 'react';
import useStore from '../store/useStore';

const WaldorfArticle = () => {
  const articleData = useStore(state => state.content.waldorfArticle);

  if (!articleData) return null;

  return (
    <section id="waldorf-article" className="section bg-cream article-section">
      <div className="container article-container">
        
        <div className="article-header">
          <span className="article-category">{articleData.category}</span>
          <h2 dangerouslySetInnerHTML={{ __html: articleData.title }}></h2>
          <p className="article-subtitle">{articleData.subtitle}</p>
        </div>

        <div className="article-content">
          <div className="article-intro">
            <h3>디지털 시대, 우리 아이들의 영혼은 안녕한가요?</h3>
            {articleData.intro.map((p, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: p }}></p>
            ))}
          </div>

          {articleData.takeaways.map((item, index) => {
            const isRightImage = index === 3; // Takeaway 04 has an image on the right
            const hasQuote = index === 0; // Takeaway 01 has a quote
            
            return (
              <div key={index} className={`article-takeaway ${isRightImage ? 'image-right' : ''}`}>
                <div className="takeaway-text">
                  <span className="takeaway-num">{item.num}</span>
                  <h3>{item.title}</h3>
                  {item.desc.map((p, idx) => (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: p }}></p>
                  ))}
                  {hasQuote && item.quote && (
                    <blockquote className="article-quote">
                      "{item.quote}"
                    </blockquote>
                  )}
                </div>
                
                {/* Fixed images for specific takeaways */}
                {index === 0 && (
                  <figure className="article-image full-width" style={{ marginTop: '40px', width: '100%' }}>
                     <img src="/src/assets/images/gallery_1.png" alt="아이들의 숲 속 활동" />
                     <figcaption>숲은 아이들이 자신의 의지를 키워가는 가장 완벽한 교실입니다.</figcaption>
                  </figure>
                )}
                
                {isRightImage && (
                  <figure className="article-image side-image">
                     <img src="/src/assets/images/gallery_2.png" alt="발도르프 수채화" />
                  </figure>
                )}
              </div>
            );
          })}

          <div className="article-comparison">
            <h3>발도르프 vs 타 교육 모델 비교</h3>
            <div className="table-responsive">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>교육 모델</th>
                    <th>주요 특징</th>
                    <th>자연의 역할</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>발도르프</strong></td>
                    <td>리듬, 모방, 상상력, 인지학적 발달 단계 중시</td>
                    <td>영적인 공간, 생명력의 원천, 감각 자극의 장</td>
                  </tr>
                  <tr>
                    <td><strong>몬테소리</strong></td>
                    <td>독립성, 구조화된 교구, 자기 주도적 작업</td>
                    <td>실제적 생활 기술 실습 및 신체 단련 장소</td>
                  </tr>
                  <tr>
                    <td><strong>레지오 에밀리아</strong></td>
                    <td>프로젝트 중심, 관계와 소통, 기록화</td>
                    <td>예술적 표현과 탐구의 재료 창고</td>
                  </tr>
                  <tr>
                    <td><strong>일반 숲학교</strong></td>
                    <td>위험 감수, 아동 주도 탐색, 생태적 소양</td>
                    <td>최고의 놀이터이자 배움의 실체</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="article-conclusion">
            <h3>{articleData.conclusion.title}</h3>
            {articleData.conclusion.desc.map((p, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: p }}></p>
            ))}
            <p className="final-question">
              {articleData.conclusion.finalQuestion}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WaldorfArticle;
