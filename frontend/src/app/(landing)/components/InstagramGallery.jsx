import React from 'react';
import { Link } from 'react-router-dom';

const InstagramGallery = () => {
  return (
      <section className="section"> 
        <div className="container"> 
          <div className="text-center">
            <h6 className="text-18-medium instagram-title wow fadeInDown">Instagram with #July</h6>
          </div>
        </div>
        <div className="box-gallery-instagram"> 
          <div className="gallery-item wow fadeInLeft"><img src="/assets/imgs/page/homepage1/instagram.jpg" alt="Guza" /></div>
          <div className="gallery-item wow fadeInUp"><img src="/assets/imgs/page/homepage1/instagram2.jpg" alt="Guza" /></div>
          <div className="gallery-item wow fadeInUp"><img src="/assets/imgs/page/homepage1/instagram3.jpg" alt="Guza" /></div>
          <div className="gallery-item wow fadeInUp"><img src="/assets/imgs/page/homepage1/instagram4.jpg" alt="Guza" /></div>
          <div className="gallery-item wow fadeInRight"><img src="/assets/imgs/page/homepage1/instagram5.jpg" alt="Guza" /></div>
        </div>
      </section>
  );
};

export default InstagramGallery;
