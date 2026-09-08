import React from 'react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <section className="section banner-homepage1">
      <div className="box-swiper">
        <div className="swiper-container swiper-banner pb-0">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="box-cover-image wow fadeInUp" style={{ backgroundImage: "url('/assets/imgs/page/homepage1/banner.jpg')" }}></div>
              <div className="box-banner-info wow fadeInLeft">
                <p className="overline-t2-medium color-primary-dark mb-10">HOLIDAY 2023</p>
                <h2 className="heading-title-medium color-primary-dark mb-30">End of<br className="d-block" />season sale</h2>
                <p className="fonticon-20 mb-30">New colors, now also available</p>
                <div className="text-center"><Link className="btn btn-black" to="#">View Collection</Link></div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="box-cover-image wow fadeInUp" style={{ backgroundImage: "url('/assets/imgs/page/homepage1/banner2.jpg')" }}></div>
              <div className="box-banner-info wow fadeInLeft">
                <p className="overline-t2-medium color-primary-dark mb-10">HOLIDAY 2023</p>
                <h2 className="heading-title-medium color-primary-dark mb-30">End of<br className="d-block" />season sale</h2>
                <p className="fonticon-20 mb-30">New colors, now also available</p>
                <div className="text-center"><Link className="btn btn-black" to="#">View Collection</Link></div>
              </div>
            </div>
          </div>
          <div className="box-pagination-button">
            <div className="swiper-pagination swiper-pagination-banner"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
