import React from 'react';
import useStore from '../store/useStore';

const Gallery = () => {
  const { galleryFilter, setGalleryFilter, setSelectedImage, galleryImages, galleryCategories } = useStore();

  const filteredImages = galleryFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === galleryFilter);

  return (
    <section id="environment" className="section">
      <div className="container">
        <div className="section-title">
          <h2>교육 환경</h2>
          <p>Head, Heart, Hand</p>
        </div>

        <div className="filter-buttons">
          <button className={`filter-btn ${galleryFilter === 'all' ? 'active' : ''}`} onClick={() => setGalleryFilter('all')}>전체</button>
          {galleryCategories.map(cat => (
            <button key={cat.id} className={`filter-btn ${galleryFilter === cat.id ? 'active' : ''}`} onClick={() => setGalleryFilter(cat.id)}>
              {cat.name}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredImages.map((img) => (
            <div 
              className="gallery-item fade-in active" 
              key={img.id}
              onClick={() => setSelectedImage(img)}
            >
              <img src={img.src} alt={img.title} loading="lazy" />
              <div className="gallery-info">
                <h4>{img.title}</h4>
                <p>{img.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
