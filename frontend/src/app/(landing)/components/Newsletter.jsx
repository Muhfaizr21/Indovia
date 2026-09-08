import React from 'react';
import { Link } from 'react-router-dom';

const Newsletter = () => {
  return (
      <section className="section"> 
        <div className="container"> 
          <div className="box-subsciber"> 
            <div className="text-17-medium wow fadeInLeft">NEWSLETTER</div>
            <h3 className="text-subscribe wow fadeInUp">Sign up and get up to <span className="tone-red">20% </span>off your first purchase</h3>
            <div className="box-form-subscribe wow fadeInRight"> 
              <form className="form-sub" action="#" method="POST">
                <input className="form-control" type="text" placeholder="Enter your email" />
                <input className="btn btn-subscribe" type="submit" value="Subscribe" />
              </form>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Newsletter;
