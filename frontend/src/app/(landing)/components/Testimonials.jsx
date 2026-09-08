import React from 'react';
import { Link } from 'react-router-dom';

const Testimonials = () => {
  return (
      <section className="section block-testimonials-type-1"> 
        <div className="container"> 
          <div className="text-center">
            <h3 className="neutral-dark mb-40 wow fadeInLeft">Customers Reviews</h3>
          </div>
          <div className="box-slide-customers wow fadeInUp">
            <div className="box-swiper"> 
              <div className="swiper-container swiper-banner">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <p className="text-italic-28 mb-30">“ As women who value our health, we’re here to do what we do best - roll up our sleeves to get it done right.”</p>
                    <p className="text-16-medium">Randy Workman</p>
                  </div>
                  <div className="swiper-slide">
                    <p className="text-italic-28 mb-30">“ As women who value our health, we’re here to do what we do best - roll up our sleeves to get it done right.”</p>
                    <p className="text-16-medium">Randy Workman</p>
                  </div>
                  <div className="swiper-slide">
                    <p className="text-italic-28 mb-30">“ As women who value our health, we’re here to do what we do best - roll up our sleeves to get it done right.”</p>
                    <p className="text-16-medium">Randy Workman</p>
                  </div>
                </div>
                <div className="box-pagination-button">
                  <div className="swiper-pagination swiper-pagination-banner"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Testimonials;
