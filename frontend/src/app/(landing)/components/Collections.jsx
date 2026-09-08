import React from 'react';
import { Link } from 'react-router-dom';

const Collections = () => {
  return (
    <section className="section block-shop-1"> 
      <div className="container"> 
        <h3 className="neutral-dark mb-50 wow fadeInLeft">Shop by Collection</h3>
        <div className="box-swiper wow fadeInUp"> 
          <div className="box-page-swiper">
            <div className="swiper-button-prev swiper-button-prev-collection btn-prev-style-1"></div>
            <div className="swiper-button-next swiper-button-next-collection btn-next-style-1"></div>
          </div>
          <div className="swiper-container swiper-4-items pb-0">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="cardCollectionStyle1 wow fadeInUp">
                  <div className="cardImage"><Link to="#"><img src="/assets/imgs/page/homepage1/collection1.png" alt="guza" /></Link></div>
                  <div className="cardInfo"><Link to="#">
                      <h6>Kid’s (8)</h6></Link></div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="cardCollectionStyle1 wow fadeInUp">
                  <div className="cardImage"><Link to="#"><img src="/assets/imgs/page/homepage1/collection2.png" alt="guza" /></Link></div>
                  <div className="cardInfo"><Link to="#">
                      <h6>Skirts (5)</h6></Link></div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="cardCollectionStyle1 wow fadeInUp">
                  <div className="cardImage"><Link to="#"><img src="/assets/imgs/page/homepage1/collection3.png" alt="guza" /></Link></div>
                  <div className="cardInfo"><Link to="#">
                      <h6>Men’s (12)</h6></Link></div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="cardCollectionStyle1 wow fadeInUp">
                  <div className="cardImage"><Link to="#"><img src="/assets/imgs/page/homepage1/collection4.png" alt="guza" /></Link></div>
                  <div className="cardInfo"><Link to="#">
                      <h6>Shirts (3)</h6></Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collections;
