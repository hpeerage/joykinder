import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Philosophy from '../components/Philosophy';
import WaldorfArticle from '../components/WaldorfArticle';
import Rhythm from '../components/Rhythm';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import useStore from '../store/useStore';

const Home = () => {
  const { selectedImage, setSelectedImage } = useStore();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <WaldorfArticle />
        <Rhythm />
        <Gallery />
        <Contact />
      </main>
      <Footer />

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedImage(null)}>&times;</button>
            <img src={selectedImage.src} alt={selectedImage.title} />
            <div className="lightbox-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
