import React from 'react';
import { Link } from 'react-router-dom';

const SaleEvent = () => {
  return (
      <section className="section block-sale-event"> 
        <div className="container"> 
          <div className="box-sale-event">
            <div className="row align-items-center"> 
              <div className="col-lg-6">
                <div className="image-sale-event wow fadeInLeft"> <img src="/assets/imgs/page/homepage1/img-banner.png" alt="Indovia" /></div>
              </div>
              <div className="col-lg-6">
                <div className="box-padding wow fadeInRight"><span className="text-17-medium neutral-dark text-uppercase">Sale Event</span>
                  <h3 className="neutral-dark mb-5 mt-10">Summer Shirt <br className="d-none d-lg-block" />Limited Offer – $20</h3>
                  <p className="body-p2 neutral-dark mb-30">Until 12/27/21. Use code FESTIVE at checkout</p><Link className="btn btn-black" to="#">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default SaleEvent;
