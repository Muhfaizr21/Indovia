import { Helmet } from 'react-helmet';

const Faq = () => (
  <>
    <Helmet>
      <title>Faq | Indovia Store</title>
    </Helmet>
    <div className="landing-page-faq">
      <header className="header sticky-bar">
            <div className="container">
              <div className="main-header">
                <div className="header-logo"> <a className="d-flex" href="/"><img alt="Indovia" src="/assets/imgs/template/logo.svg" /></a></div>
                <div className="header-menu"> 
                  <div className="header-nav">
                    <nav className="nav-main-menu d-none d-xl-block">
                      <ul className="main-menu">
                        <li className="has-mega-menu"><a className="active" href="#">Home</a>
                          <div className="sub-menu">
                            <div className="menu-inner">
                              <div className="col-menu">
                                <h6 className="text-16-semibold mb-10 text-uppercase">Home Demo I</h6><a href="/">Fashion Store 01</a><a href="/index-2">Fashion Store 02</a><a href="/index-3">Fashion Store 03</a><a href="/index-4">Fashion Store 04</a><a href="/index-5">Fashion Store 05</a><a href="/index-6">Fashion Store 06</a><a href="/index-25">Fashion Store 07</a><a href="/index-18">Fashion Store 08</a><a href="/index-22">Fashion Store 09</a>
                              </div>
                              <div className="col-menu">
                                <h6 className="text-16-semibold mb-10 text-uppercase">Home Demo II</h6><a href="/index-26">Shoes</a><a href="/index-15">Natural Skins</a><a href="/index-27">Phonecases</a><a href="/index-28">Yoga Clothing</a><a href="/index-29">Jewelry Store</a><a href="/index-30">Socks Store</a><a href="/index-7">Underwear Store</a><a href="/index-10">Home Living</a>
                              </div>
                              <div className="col-menu">
                                <h6 className="text-16-semibold mb-10 text-uppercase">Home Demo III</h6><a href="/index-11">Pets Store</a><a href="/index-16">Electronic</a><a href="/index-17">Food Store</a><a href="/index-31">Watch Store</a><a href="/index-32">Book Store</a><a href="/index-33">Glasses Shop</a><a href="/index-34">Jeans Fashion</a><a href="/index-8">Furniture Store 01</a><a href="/index-9">Furniture Store 02</a>
                              </div>
                              <div className="col-menu">
                                <h6 className="text-16-semibold mb-10 text-uppercase">Home Demo IV</h6><a href="/index-12">Oganic Store</a><a href="/index-13">Toys Store</a><a href="/index-14">Skateboard Store</a><a href="/index-19">Plants Store</a><a href="/index-20">Bikes Store</a><a href="/index-21">Baby Clothing</a><a href="/index-23">Travel gear</a><a href="/index-24">Coffee Shop</a>
                              </div>
                              <div className="col-menu"><img src="/assets/imgs/template/banner-menu.webp" alt="Indovia" /></div>
                            </div>
                          </div>
                        </li>
                        <li className="has-children"><a href="#">Shop</a>
                          <ul className="sub-menu">
                            <li><a href="/shop-left-filter">Shop - Left Filter</a></li>
                            <li><a href="/shop-top-filter">Shop - Top Filter</a></li>
                            <li><a href="/shop-top-filter-showing">Shop - Top Filter 2</a></li>
                            <li><a href="/shop-canvas-filter">Shop - Canvas Filter</a></li>
                            <li><a href="/shop-show-category">Shop - Category 1</a></li>
                            <li><a href="/shop-show-category-2">Shop - Category 2</a></li>
                            <li><a href="/shop-custom-banner">Shop - Custom Banner</a></li>
                            <li><a href="/shop-load-more">Shop - Load More</a></li>
                            <li><a href="/shop-infinity-scrolling">Shop - Infinity</a></li>
                          </ul>
                        </li>
                        <li className="has-mega-menu"><a href="#">Products</a>
                          <div className="sub-menu">
                            <div className="menu-inner">
                              <div className="col-menu"><a href="/product-single">Product Single 1</a><a href="/product-single-2">Product Single 2</a><a href="/product-single-3">Product Single 3</a><a href="/product-single-4">Product Single 4</a><a href="/product-single-5">Product Single 5</a><a href="/product-single-6">Product Single 6</a></div>
                              <div className="col-menu"><a href="/product-single-7">Product Single 7</a><a href="/product-single-8">Product Single 8</a><a href="/product-single-9">Product Single 9</a><a href="/product-single-10">Product Single 10</a><a href="/product-single-11">Product Single 11</a><a href="/product-single-12">Product Single 12</a></div>
                              <div className="col-menu"><a href="/product-single-13">Product Single 13</a><a href="/product-single-14">Product Single 14</a><a href="/product-single-15">Product Single 15</a><a href="/product-single-16">Product Single 16</a><a href="/product-single-17">Product Single 17</a><a href="/product-single-18">Product Single 18</a></div>
                              <div className="col-menu"><a href="/product-single-21">Product Single 21</a><a href="/product-single-20">Product Single 20</a><a href="/product-single-21">Product Single 21</a><a href="/product-single-22">Product Single 22</a><a href="/product-single-23">Product Single 23</a><a href="/product-single-24">Product Single 24</a></div>
                              <div className="col-menu"><img src="/assets/imgs/template/banner-menu-2.png" alt="Indovia" /></div>
                            </div>
                          </div>
                        </li>
                        <li className="has-children"><a href="#">Pages</a>
                          <ul className="sub-menu">
                            <li><a href="/cart">Your Cart</a></li>
                            <li><a href="/checkout">Checkout</a></li>
                            <li><a href="/store-location">Store Location</a></li>
                            <li><a href="/about-us-1">About Us</a></li>
                            <li><a href="/about-us-2">About Us 2</a></li>
                            <li><a href="/lookbook">Lookbook 1</a></li>
                            <li><a href="/lookbook-2">Lookbook 2</a></li>
                            <li><a href="/lookbook-3">Lookbook 3</a></li>
                            <li><a href="/faq">FAQs page</a></li>
                            <li><a href="/store-location">Store Locations</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                            <li><a href="/carrers">Job and Carrers</a></li>
                            <li><a href="/custome-service">Custome Services</a></li>
                            <li><a href="/maintenance">Maintenance</a></li>
                            <li><a href="/comming-soon">Comming soon</a></li>
                          </ul>
                        </li>
                        <li className="has-children"><a href="#">Blog</a>
                          <ul className="sub-menu">
                            <li><a href="/blog-grid">Blog Grid 1</a></li>
                            <li><a href="/blog-masonry">Blog Grid 2</a></li>
                            <li><a href="/blog-list">Blog List</a></li>
                            <li><a href="/blog-single">Single Post</a></li>
                          </ul>
                        </li>
                        <li><a href="/contact">Contact</a></li>
                      </ul>
                    </nav>
                    <div className="burger-icon burger-icon-white"><span className="burger-icon-top"></span><span className="burger-icon-mid"></span><span className="burger-icon-bottom"></span></div>
                  </div>
                </div>
                <div className="header-account"><a className="account-icon search" href="#">
                    <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_91_73)">
                        <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_91_73">
                          <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                        </clipPath>
                      </defs>
                    </svg></a><a className="account-icon account" href="#">
                    <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_116_451)">
                        <path d="M6 24C6 21.8783 6.84285 19.8434 8.34315 18.3431C9.84344 16.8429 11.8783 16 14 16C16.1217 16 18.1566 16.8429 19.6569 18.3431C21.1571 19.8434 22 21.8783 22 24H20C20 22.4087 19.3679 20.8826 18.2426 19.7574C17.1174 18.6321 15.5913 18 14 18C12.4087 18 10.8826 18.6321 9.75736 19.7574C8.63214 20.8826 8 22.4087 8 24H6ZM14 15C10.685 15 8 12.315 8 9C8 5.685 10.685 3 14 3C17.315 3 20 5.685 20 9C20 12.315 17.315 15 14 15ZM14 13C16.21 13 18 11.21 18 9C18 6.79 16.21 5 14 5C11.79 5 10 6.79 10 9C10 11.21 11.79 13 14 13Z"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_116_451">
                          <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                        </clipPath>
                      </defs>
                    </svg></a><a className="account-icon wishlist" href="#"><span className="number-tag">3</span>
                    <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_116_452)">
                        <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_116_452">
                          <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                        </clipPath>
                      </defs>
                    </svg></a><a className="account-icon cart" href="#"><span className="number-tag">1</span>
                    <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_116_450)">
                        <path d="M9 10V8C9 6.67392 9.52678 5.40215 10.4645 4.46447C11.4021 3.52678 12.6739 3 14 3C15.3261 3 16.5979 3.52678 17.5355 4.46447C18.4732 5.40215 19 6.67392 19 8V10H22C22.2652 10 22.5196 10.1054 22.7071 10.2929C22.8946 10.4804 23 10.7348 23 11V23C23 23.2652 22.8946 23.5196 22.7071 23.7071C22.5196 23.8946 22.2652 24 22 24H6C5.73478 24 5.48043 23.8946 5.29289 23.7071C5.10536 23.5196 5 23.2652 5 23V11C5 10.7348 5.10536 10.4804 5.29289 10.2929C5.48043 10.1054 5.73478 10 6 10H9ZM9 12H7V22H21V12H19V14H17V12H11V14H9V12ZM11 10H17V8C17 7.20435 16.6839 6.44129 16.1213 5.87868C15.5587 5.31607 14.7956 5 14 5C13.2044 5 12.4413 5.31607 11.8787 5.87868C11.3161 6.44129 11 7.20435 11 8V10Z"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_116_450">
                          <rect width="24" height="24" transform="translate(2 2)"></rect>
                        </clipPath>
                      </defs>
                    </svg></a></div>
              </div>
            </div>
          </header>
          <div className="mobile-header-active mobile-header-wrapper-style perfect-scrollbar">
            <div className="mobile-header-wrapper-inner">
              <div className="mobile-header-content-area">
                <div className="mobile-menu-head">
                  <div className="box-head-1"><a className="link-underline mr-20 account-icon account" href="#">Login</a><a className="link-underline account-icon account" href="#">Sign Up</a><a className="close-mobile" href="#"><img src="/assets/imgs/template/icons/close.svg" alt="Indovia" /></a></div>
                  <div className="box-head-2"><a className="back-mobile" href="#"><img src="/assets/imgs/template/icons/back.svg" alt="Indovia" /></a></div>
                </div>
                <div className="perfect-scroll">
                  <div className="mobile-menu-wrap mobile-header-border">
                    <nav>
                      <ul className="mobile-menu font-heading">
                        <li className="has-children"><a className="active" href="#">Home</a>
                          <ul className="sub-menu">
                            <li><a href="/">Homepage - 1</a></li>
                            <li><a href="/index-2">Homepage - 2</a></li>
                            <li><a href="/index-3">Homepage - 3</a></li>
                            <li><a href="/index-4">Homepage - 4</a></li>
                            <li><a href="/index-5">Homepage - 5</a></li>
                            <li><a href="/index-6">Homepage - 6</a></li>
                            <li><a href="/index-7">Homepage - 7</a></li>
                            <li><a href="/index-8">Homepage - 8</a></li>
                            <li><a href="/index-9">Homepage - 9</a></li>
                            <li><a href="/index-10">Homepage - 10</a></li>
                            <li><a href="/index-11">Homepage - 11</a></li>
                            <li><a href="/index-12">Homepage - 12</a></li>
                            <li><a href="/index-13">Homepage - 13</a></li>
                            <li><a href="/index-14">Homepage - 14</a></li>
                            <li><a href="/index-15">Natural Skins</a></li>
                            <li><a href="/index-16">Electronic</a></li>
                            <li><a href="/index-17">Food Store</a></li>
                            <li><a href="/index-18">Home Fashion 08</a></li>
                            <li><a href="/index-19">Plants</a></li>
                            <li><a href="/index-20">Bikes</a></li>
                            <li><a href="/index-21">Baby Clothing</a></li>
                            <li><a href="/index-22">Home Fashion 09</a></li>
                            <li><a href="/index-23">Travel gear</a></li>
                            <li><a href="/index-24">Coffee</a></li>
                            <li><a href="/index-25">Home Fashion 07</a></li>
                            <li><a href="/index-26">Shoes</a></li>
                            <li><a href="/index-27">Phonecases</a></li>
                            <li><a href="/index-28">Yoga Clothing</a></li>
                            <li><a href="/index-29">Jewelry</a></li>
                            <li><a href="/index-30">Socks</a></li>
                            <li><a href="/index-31">Watch</a></li>
                            <li><a href="/index-32">Book Store</a></li>
                            <li><a href="/index-33">Glasses</a></li>
                            <li><a href="/index-34">Jeans</a></li>
                          </ul>
                        </li>
                        <li className="has-children"><a href="#">Shop</a>
                          <ul className="sub-menu">
                            <li><a href="/shop-left-filter">Shop - Left Filter</a></li>
                            <li><a href="/shop-top-filter">Shop - Top Filter</a></li>
                            <li><a href="/shop-canvas-filter">Shop - Canvas Filter</a></li>
                            <li><a href="/shop-top-filter-showing">Shop - Top Filter Showing</a></li>
                            <li><a href="/shop-show-category">Shop - Show Category Type1</a></li>
                            <li><a href="/shop-show-category-2">Shop - Show Category Type 2</a></li>
                            <li><a href="/shop-custom-banner">Shop - Custom Banner</a></li>
                            <li><a href="/shop-load-more">Shop - Load More</a></li>
                            <li><a href="/shop-infinity-scrolling">Shop - Infinity Scrolling</a></li>
                          </ul>
                        </li>
                        <li className="has-children"><a href="#">Products</a>
                          <ul className="sub-menu">
                            <li><a href="/product-single">Product Single 1</a></li>
                            <li><a href="/product-single-2">Product Single 2</a></li>
                            <li><a href="/product-single-3">Product Single 3</a></li>
                            <li><a href="/product-single-4">Product Single 4</a></li>
                            <li><a href="/product-single-5">Product Single 5</a></li>
                            <li><a href="/product-single-6">Product Single 6</a></li>
                            <li><a href="/product-single-7">Product Single 7</a></li>
                            <li><a href="/product-single-8">Product Single 8</a></li>
                            <li><a href="/product-single-9">Product Single 9</a></li>
                            <li><a href="/product-single-10">Product Single 10</a></li>
                            <li><a href="/product-single-11">Product Single 11</a></li>
                            <li><a href="/product-single-12">Product Single 12</a></li>
                            <li><a href="/product-single-13">Product Single 13</a></li>
                            <li><a href="/product-single-14">Product Single 14</a></li>
                            <li><a href="/product-single-15">Product Single 15</a></li>
                            <li><a href="/product-single-16">Product Single 16</a></li>
                            <li><a href="/product-single-17">Product Single 17</a></li>
                            <li><a href="/product-single-18">Product Single 18</a></li>
                            <li><a href="/product-single-19">Product Single 19</a></li>
                            <li><a href="/product-single-20">Product Single 20</a></li>
                            <li><a href="/product-single-21">Product Single 21</a></li>
                            <li><a href="/product-single-22">Product Single 22</a></li>
                            <li><a href="/product-single-23">Product Single 23</a></li>
                            <li><a href="/product-single-24">Product Single 24</a></li>
                          </ul>
                        </li>
                        <li className="has-children"><a href="/service-grid">Pages</a>
                          <ul className="sub-menu">
                            <li><a href="/cart">Your Cart</a></li>
                            <li><a href="/checkout">Checkout</a></li>
                            <li><a href="/store-location">Store Location</a></li>
                            <li><a href="/about-us-1">About Us</a></li>
                            <li><a href="/about-us-2">About Us 2</a></li>
                            <li><a href="/lookbook">Lookbook 1</a></li>
                            <li><a href="/lookbook-2">Lookbook 2</a></li>
                            <li><a href="/lookbook-3">Lookbook 3</a></li>
                            <li><a href="/faq">FAQs page</a></li>
                            <li><a href="/store-location">Store Locations</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                            <li><a href="/carrers">Job and Carrers</a></li>
                            <li><a href="/custome-service">Custome Services</a></li>
                            <li><a href="/maintenance">Maintenance</a></li>
                            <li><a href="/comming-soon">Comming soon</a></li>
                          </ul>
                        </li>
                        <li className="has-children"><a href="/blog">Blog</a>
                          <ul className="sub-menu">
                            <li><a href="/blog-grid">Blog Grid</a></li>
                            <li><a href="/blog-masonry">Blog Grid 2</a></li>
                            <li><a href="/blog-list">Blog List</a></li>
                            <li><a href="/blog-single">Blog Details</a></li>
                          </ul>
                        </li>
                        <li><a href="/contact">Elements</a></li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <main className="main">
            <section className="section banner-500">
              <div className="box-cover-image wow fadeInUp"></div>
              <div className="box-banner-info wow fadeInUp"> 
                <p className="overline-t2-medium text-uppercase primary-navy mb-10">FAQ’S</p>
                <h2 className="color-primary-dark mb-30">Any questions?<br className="d-none d-lg-block" />We’re here to help</h2>
              </div>
            </section>
            <section className="section block-content-faq"> 
              <div className="container">
                <div className="container-faq"> 
                  <h4 className="mb-20">Delivery Information</h4>
                  <div className="accordion wow fadeInUp mb-60" id="accordionFAQ">
                    <div className="accordion-item">
                      <h5 className="accordion-header" id="headingOne">
                        <button className="accordion-button text-heading-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Shipping destinations</button>
                      </h5>
                      <div className="accordion-collapse collapse show" id="collapseOne" aria-labelledby="headingOne" data-bs-parent="#accordionFAQ">
                        <div className="accordion-body">For now we ship to the following countries: Austria, Belgium, Czech Republic, Lithuania, Luxembourg, Latvia, Slovakia, Hungary, Bulgaria, Romania, Slovenia, Finland, Denmark, Estonia, Netherlands, Germany, France, Great Britain, Croatia, Ireland, Sweden, Italy, Greece, Spain, Portugal and Poland.</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h5 className="accordion-header" id="headingTwo">
                        <button className="accordion-button text-heading-5 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Shipping times</button>
                      </h5>
                      <div className="accordion-collapse collapse" id="collapseTwo" aria-labelledby="headingTwo" data-bs-parent="#accordionFAQ">
                        <div className="accordion-body">Sad ipscing elitrsed diamnonu myeir mod, sadipscing elitrsed dia morem ipsum dolor situamet consetetur loutrytru hury. Lorem ipsum dolor sitametco nsetetur sa cingelitrse diamonu eirmoid, sad ipscing elitrstrud diamtre ute riyutroui tout.</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h5 className="accordion-header" id="headingThree">
                        <button className="accordion-button text-heading-5 collapsed text-heading-5 type=" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">Tracking your parcel</button>
                      </h5>
                      <div className="accordion-collapse collapse" id="collapseThree" aria-labelledby="headingThree" data-bs-parent="#accordionFAQ">
                        <div className="accordion-body">Sad ipscing elitrsed diamnonu myeir mod, sadipscing elitrsed dia morem ipsum dolor situamet consetetur loutrytru hury. Lorem ipsum dolor sitametco nsetetur sa cingelitrse diamonu eirmoid, sad ipscing elitrstrud diamtre ute riyutroui tout.</div>
                      </div>
                    </div>
                  </div>
                  <h4 className="mb-20">Returns & Refunds</h4>
                  <div className="accordion wow fadeInUp mb-60" id="accordionFAQ2">
                    <div className="accordion-item">
                      <h5 className="accordion-header" id="headingOne2">
                        <button className="accordion-button text-heading-5 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne2" aria-expanded="true" aria-controls="collapseOne2">How can I return my purchase?</button>
                      </h5>
                      <div className="accordion-collapse collapse" id="collapseOne2" aria-labelledby="headingOne2" data-bs-parent="#accordionFAQ2">
                        <div className="accordion-body">For now we ship to the following countries: Austria, Belgium, Czech Republic, Lithuania, Luxembourg, Latvia, Slovakia, Hungary, Bulgaria, Romania, Slovenia, Finland, Denmark, Estonia, Netherlands, Germany, France, Great Britain, Croatia, Ireland, Sweden, Italy, Greece, Spain, Portugal and Poland.</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h5 className="accordion-header" id="headingTwo2">
                        <button className="accordion-button text-heading-5 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo2" aria-expanded="false" aria-controls="collapseTwo2">Can I cancel my order?</button>
                      </h5>
                      <div className="accordion-collapse collapse" id="collapseTwo2" aria-labelledby="headingTwo2" data-bs-parent="#accordionFAQ2">
                        <div className="accordion-body">Sad ipscing elitrsed diamnonu myeir mod, sadipscing elitrsed dia morem ipsum dolor situamet consetetur loutrytru hury. Lorem ipsum dolor sitametco nsetetur sa cingelitrse diamonu eirmoid, sad ipscing elitrstrud diamtre ute riyutroui tout.</div>
                      </div>
                    </div>
                  </div>
                  <h4 className="mb-20">How to choose an urn</h4>
                  <div className="accordion wow fadeInUp mb-60" id="accordionFAQ3">
                    <div className="accordion-item">
                      <h5 className="accordion-header" id="headingOne3">
                        <button className="accordion-button text-heading-5 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne3" aria-expanded="true" aria-controls="collapseOne3">How can I return my purchase?</button>
                      </h5>
                      <div className="accordion-collapse collapse" id="collapseOne3" aria-labelledby="headingOne3" data-bs-parent="#accordionFAQ3">
                        <div className="accordion-body">For now we ship to the following countries: Austria, Belgium, Czech Republic, Lithuania, Luxembourg, Latvia, Slovakia, Hungary, Bulgaria, Romania, Slovenia, Finland, Denmark, Estonia, Netherlands, Germany, France, Great Britain, Croatia, Ireland, Sweden, Italy, Greece, Spain, Portugal and Poland.</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h5 className="accordion-header" id="headingTwo3">
                        <button className="accordion-button text-heading-5 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo3" aria-expanded="false" aria-controls="collapseTwo3">Can I cancel my order?</button>
                      </h5>
                      <div className="accordion-collapse collapse" id="collapseTwo3" aria-labelledby="headingTwo3" data-bs-parent="#accordionFAQ3">
                        <div className="accordion-body">Sad ipscing elitrsed diamnonu myeir mod, sadipscing elitrsed dia morem ipsum dolor situamet consetetur loutrytru hury. Lorem ipsum dolor sitametco nsetetur sa cingelitrse diamonu eirmoid, sad ipscing elitrstrud diamtre ute riyutroui tout.</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 text-center"> 
                    <p className="text-17-medium mb-25 neutral-medium-dark">Have a question not covered in the FAQ?</p><a className="btn btn-black" href="#">Contact Us</a>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <footer className="footer">
            <div className="footer-1">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 mb-30">
                    <h5 className="color-white mb-20">Receive an exclusive<span className="tone-red">20%</span><br className="d-none d-md-block" />discount code when you<br className="d-none d-md-block" />signup.</h5>
                    <div className="box-form-subscribe box-form-subscribe-white">
                      <form className="form-sub" action="#" method="POST">
                        <input className="form-control" type="text" placeholder="Enter your email" />
                        <input className="btn btn-subscribe" type="submit" value="Subscribe" />
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-8 mb-30">
                    <div className="row">
                      <div className="col-lg-3 mb-30 footerBorder">
                        <h6 className="color-white mb-20">Company</h6>
                        <ul className="menu-footer">
                          <li><a href="/about-us-1">About us</a></li>
                          <li><a href="/carrers">Careers</a></li>
                          <li><a href="/store-location">Store Locator</a></li>
                          <li><a href="/contact">Contact Us</a></li>
                        </ul>
                      </div>
                      <div className="col-lg-3 mb-30 footerBorder">
                        <h6 className="color-white mb-20">Customer Care</h6>
                        <ul className="menu-footer">
                          <li><a href="/about-us-1">Size Guide</a></li>
                          <li><a href="/team">Help & FAQs</a></li>
                          <li><a href="/career">Return My Order</a></li>
                          <li><a href="#">Refer a Friend</a></li>
                        </ul>
                      </div>
                      <div className="col-lg-3 mb-30 footerBorder">
                        <h6 className="color-white mb-20">Terms & Policies</h6>
                        <ul className="menu-footer">
                          <li><a href="#">Duties & Taxes</a></li>
                          <li><a href="#">Shipping Info</a></li>
                          <li><a href="#">Privacy Policy</a></li>
                          <li><a href="#">Terms Conditions</a></li>
                        </ul>
                      </div>
                      <div className="col-lg-3 mb-30 footerBorder">
                        <h6 className="color-white mb-20">Follow Us</h6>
                        <ul className="menu-footer">
                          <li><a href="#">Instagram</a></li>
                          <li><a href="#">Facebook</a></li>
                          <li><a href="#">Pinterest</a></li>
                          <li><a href="#">Tiktok</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-2">
              <div className="container">
                <div className="footer-bottom">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12 text-center text-lg-start mb-20"><img className="mr-25 d-inline-block align-middle logo-footer-img" src="/assets/imgs/template/logo-light.svg" alt="Indovia" /><span className="body-p1 color-white d-inline-block align-middle">© 2023 Indovia.Co. All rights reserved</span></div>
                    <div className="col-lg-6 col-md-12 text-center text-lg-end mb-20">
                      <div className="d-flex justify-content-center justify-content-lg-end align-items-center box-all-payments">
                        <div className="d-inline-block box-payments mr-20"><img src="/assets/imgs/template/icons/visa.svg" alt="Indovia" /><img src="/assets/imgs/template/icons/master.svg" alt="Indovia" /><img src="/assets/imgs/template/icons/stripe.svg" alt="Indovia" /><img src="/assets/imgs/template/icons/paypal.svg" alt="Indovia" /></div>
                        <div className="dropdown mr-20">
                          <button className="btn btn-line-bottom dropdown-toggle" id="dropdownLang" type="button" data-bs-toggle="dropdown" aria-expanded="false">EN</button>
                          <ul className="dropdown-menu" aria-labelledby="dropdownLang">
                            <li><a className="dropdown-item" href="#">EN</a></li>
                            <li><a className="dropdown-item" href="#">JP</a></li>
                            <li><a className="dropdown-item" href="#">KR</a></li>
                          </ul>
                        </div>
                        <div className="dropdown">
                          <button className="btn btn-line-bottom dropdown-toggle" id="dropdownCurrency" type="button" data-bs-toggle="dropdown" aria-expanded="false">USD</button>
                          <ul className="dropdown-menu" aria-labelledby="dropdownCurrency">
                            <li><a className="dropdown-item" href="#">USD</a></li>
                            <li><a className="dropdown-item" href="#">EURO</a></li>
                            <li><a className="dropdown-item" href="#">AUD</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          <div className="box-popup-preview"><a className="btn-close-popup" href="#"><img src="/assets/imgs/template/icons/close-popup.svg" alt="kidify" /></a>
            <div className="box-popup-content">
              <div className="preview-product-image">
                <div className="detail-gallery detail-gallery-2">
                  <div className="box-main-gallery"><a className="zoom-image glightbox" href="/assets/imgs/page/product/img.png"></a>
                    <div className="product-image-slider product-image-slider-preview">
                      <figure className="border-radius-10"><a className="glightbox" href="/assets/imgs/page/product/img.png"><img src="/assets/imgs/page/product/img.png" alt="kidify" /></a></figure>
                      <figure className="border-radius-10"><a className="glightbox" href="/assets/imgs/page/product/img.png"><img src="/assets/imgs/page/product/img.png" alt="kidify" /></a></figure>
                      <figure className="border-radius-10"><a className="glightbox" href="/assets/imgs/page/product/img.png"><img src="/assets/imgs/page/product/img.png" alt="kidify" /></a></figure>
                      <figure className="border-radius-10"><a className="glightbox" href="/assets/imgs/page/product/img.png"><img src="/assets/imgs/page/product/img.png" alt="kidify" /></a></figure>
                      <figure className="border-radius-10"><a className="glightbox" href="/assets/imgs/page/product/img.png"><img src="/assets/imgs/page/product/img.png" alt="kidify" /></a></figure>
                      <figure className="border-radius-10"><a className="glightbox" href="/assets/imgs/page/product/img.png"><img src="/assets/imgs/page/product/img.png" alt="kidify" /></a></figure>
                      <figure className="border-radius-10"><a className="glightbox" href="/assets/imgs/page/product/img.png"><img src="/assets/imgs/page/product/img.png" alt="kidify" /></a></figure>
                    </div>
                  </div>
                </div>
              </div>
              <div className="preview-product-info">
                <div className="box-product-info">
                  <h3 className="mb-5">Summer Stripes Shorts</h3>
                  <div className="block-rating"><img src="/assets/imgs/template/icons/star-fill.svg" alt="Indovia" /><img src="/assets/imgs/template/icons/star-fill.svg" alt="Indovia" /><img src="/assets/imgs/template/icons/star-fill.svg" alt="Indovia" /><img src="/assets/imgs/template/icons/star-fill.svg" alt="Indovia" /><img src="/assets/imgs/template/icons/star-none.svg" alt="Indovia" /><span className="text-17 neutral-medium-dark">(5)</span></div>
                  <div className="block-price"><span className="price-main">$15.00</span><span className="price-line">$25.00</span></div>
                  <p className="body-p2 viewed-guest viewed-guest-black mb-25"><span className="text-17-medium">24 guests are viewing this product</span></p>
                  <div className="block-description">
                    <p className="body-p2 neutral-medium-dark">The shorts are made from soft organic cotton. They have an elasticated waistband with an internal drawstring and side pockets.</p>
                  </div>
                  <div className="block-quantity">
                    <div className="text-17 neutral-medium-dark mb-10">Quantity</div>
                    <div className="box-form-cart">
                      <div className="form-cart detail-qty"><span className="minus"></span>
                        <input className="qty-val form-control" type="text" name="quantity" value="1" min="1" /><span className="plus"></span>
                      </div><a className="btn btn-black" href="#">Add to Cart</a><a className="btn btn-navy" href="#">Buy Now</a>
                    </div>
                  </div>
                  <div className="block-tags-product">
                    <p className="body-p2"><span className="neutral-medium-dark">SKU:</span><span className="neutral-dark">C66R8B47MP</span></p>
                    <p className="body-p2"><span className="neutral-medium-dark">Categories:</span><a className="neutral-dark" href="#">Dress,</a><a className="neutral-dark" href="#">Pants</a></p>
                    <p className="body-p2"><span className="neutral-medium-dark">Tags:</span><a className="neutral-dark" href="#">fashion,</a><a className="neutral-dark" href="#">shoes,</a><a className="neutral-dark" href="#">women</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box-popup-search ele-popup-search">
            <div className="box-search-overlay"></div>
            <div className="box-search-wrapper"><a className="btn-close-popup" href="#">
                <svg className="icon-16 d-inline-flex align-items-center justify-content-center" fill="#111111" stroke="#111111" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg></a>
              <h5 className="mb-15">Search products</h5>
              <form action="#">
                <div className="form-group">
                  <select className="form-control arrow-select">
                    <option>All Categories</option>
                    <option>Animals & Pet Supplies</option>
                    <option>Baby & Toddler</option>
                  </select>
                </div>
                <div className="form-group">
                  <input className="form-control search-icon" type="text" />
                </div>
              </form>
              <div className="box-quick-search"><span className="text-17 neutral-medium-dark">Quick search:</span><a className="text-17" href="#">T-Shirt</a><a className="text-17" href="#">Jeans</a><a className="text-17" href="#">Mens</a></div>
              <div className="box-products-search">
                <h6 className="text-18-medium mb-10">You May Also Like</h6>
                <div className="box-list-product-search">
                  <div className="item-product-search">
                    <div className="cardProductStyle3 cardProductType03 cardProductType02 wow fadeInUp">
                      <div className="cardImage"><a href="#"><img className="imageMain" src="/assets/imgs/page/popup/product-1.png" alt="Indovia" /><img className="imageHover" src="/assets/imgs/page/popup/product-5.png" alt="Indovia" /></a>
                        <div className="button-select"><a href="#">Select Options</a></div>
                        <div className="box-quick-button"><a className="btn" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_116_452)">
                                <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_116_452">
                                  <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a><a className="btn" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_200_1102)">
                                <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_200_1102">
                                  <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a><a className="btn preview-product" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_91_73)">
                                <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_91_73">
                                  <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a></div>
                      </div>
                      <div className="cardInfo">
                        <h6 className="text-16-medium">illow Covers Luxury</h6>
                        <p className="body-p2 cardDesc">$24.00</p>
                      </div>
                    </div>
                  </div>
                  <div className="item-product-search">
                    <div className="cardProductStyle3 cardProductType03 cardProductType02 wow fadeInUp">
                      <div className="cardImage"><a href="#"><img className="imageMain" src="/assets/imgs/page/popup/product-2.png" alt="Indovia" /><img className="imageHover" src="/assets/imgs/page/popup/product-6.png" alt="Indovia" /></a>
                        <div className="button-select"><a href="#">Select Options</a></div>
                        <div className="box-quick-button"><a className="btn" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_116_452)">
                                <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_116_452">
                                  <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a><a className="btn" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_200_1102)">
                                <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_200_1102">
                                  <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a><a className="btn preview-product" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_91_73)">
                                <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_91_73">
                                  <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a></div>
                      </div>
                      <div className="cardInfo">
                        <h6 className="text-16-medium">Pillow Covers Linen</h6>
                        <p className="body-p2 cardDesc">$36.00</p>
                      </div>
                    </div>
                  </div>
                  <div className="item-product-search">
                    <div className="cardProductStyle3 cardProductType03 cardProductType02 wow fadeInUp">
                      <div className="cardImage"><a href="#"><img className="imageMain" src="/assets/imgs/page/popup/product-3.png" alt="Indovia" /><img className="imageHover" src="/assets/imgs/page/popup/product-7.png" alt="Indovia" /></a>
                        <div className="button-select"><a href="#">Select Options</a></div>
                        <div className="box-quick-button"><a className="btn" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_116_452)">
                                <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_116_452">
                                  <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a><a className="btn" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_200_1102)">
                                <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_200_1102">
                                  <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a><a className="btn preview-product" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_91_73)">
                                <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_91_73">
                                  <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a></div>
                      </div>
                      <div className="cardInfo">
                        <h6 className="text-16-medium">Pillow Cushion</h6>
                        <p className="body-p2 cardDesc">$27.00</p>
                      </div>
                    </div>
                  </div>
                  <div className="item-product-search">
                    <div className="cardProductStyle3 cardProductType03 cardProductType02 wow fadeInUp">
                      <div className="cardImage"><a href="#"><img className="imageMain" src="/assets/imgs/page/popup/product-4.png" alt="Indovia" /><img className="imageHover" src="/assets/imgs/page/popup/product-8.png" alt="Indovia" /></a>
                        <div className="button-select"><a href="#">Select Options</a></div>
                        <div className="box-quick-button"><a className="btn" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_116_452)">
                                <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_116_452">
                                  <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a><a className="btn" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_200_1102)">
                                <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_200_1102">
                                  <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a><a className="btn preview-product" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_91_73)">
                                <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_91_73">
                                  <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a></div>
                      </div>
                      <div className="cardInfo">
                        <h6 className="text-16-medium">Pillow Covers Linen</h6>
                        <p className="body-p2 cardDesc">$98.00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box-popup-account">
            <div className="box-account-overlay"></div>
            <div className="box-account-wrapper"><a className="btn-close-popup btn-close-popup-account" href="#">
                <svg className="icon-16 d-inline-flex align-items-center justify-content-center" fill="#111111" stroke="#111111" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg></a>
              <div className="form-account-info"><a className="button-tab btn-for-login active" href="#">Login</a><a className="button-tab btn-for-signup" href="#">Sign up</a>
                <div className="form-login">
                  <div className="form-group">
                    <input className="form-control" type="text" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <input className="form-control" type="password" placeholder="Password" />
                  </div>
                  <div className="form-group"><a className="link-under buttun-forgotpass" href="#">Forgot your password?</a></div>
                  <div className="form-group">
                    <button className="btn btn-black d-block">Login</button>
                  </div>
                </div>
                <div className="form-register">
                  <div className="form-group">
                    <input className="form-control" type="text" placeholder="First Name" />
                  </div>
                  <div className="form-group">
                    <input className="form-control" type="text" placeholder="Last Name" />
                  </div>
                  <div className="form-group">
                    <input className="form-control" type="text" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <input className="form-control" type="password" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <label className="d-flex align-items-start">
                      <input className="cb-agree" type="checkbox" /><span className="text-agree body-p2">Join for Free and start earning points today. Benefits include 15% off your first purchase,</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-black d-block">Create my account</button>
                  </div>
                  <div className="text-center">
                    <p className="body-p2 neutral-medium-dark">Already have an account?<a className="neutral-dark login-now" href="#">Login Now</a></p>
                  </div>
                </div>
              </div>
              <div className="form-password-info">
                <h5>Recover password</h5>
                <div className="form-login">
                  <div className="form-group">
                    <input className="form-control" type="text" placeholder="Enter your email" />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-black d-block">Recover</button>
                  </div>
                  <div className="text-center">
                    <p className="body-p2 neutral-medium-dark">Already have an account?<a className="neutral-dark login-now" href="#">Login Now</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box-popup-cart">
            <div className="box-cart-overlay"></div>
            <div className="box-cart-wrapper"><a className="btn-close-popup" href="#">
                <svg className="icon-16 d-inline-flex align-items-center justify-content-center" fill="#111111" stroke="#111111" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg></a>
              <h5 className="mb-15">Your Cart (2)</h5>
              <p className="body-p2"><span className="text-17-medium">Free Shipping</span>on orders over<span className="text-17-medium">$200.00</span></p>
              <div className="box-progress-bar-block">
                <div className="progress">
                  <div className="progress-bar" style={{width: "35%"}}></div>
                </div>
              </div>
              <div className="box-products-cart">
                <div className="box-empty-cart d-none">
                  <div className="icon-empty-cart"><img src="/assets/imgs/template/icons/empty-cart.svg" alt="Indovia" /></div>
                  <div className="info-empty-cart">
                    <p className="text-17 neutral-medium-dark">Your cart is empty</p><a className="link-underline" href="#">Add from Wishlist</a>
                  </div>
                </div>
                <div className="list-items-cart">
                  <div className="item-cart">
                    <div className="item-cart-image"><img src="/assets/imgs/page/cart/sp.png" alt="Indovia" /></div>
                    <div className="item-cart-info">
                      <div className="item-cart-info-1"><a className="text-16-medium" href="#">Ball Crew Shirt</a>
                        <div className="box-info-size-color-product">
                          <p className="box-color"><span className="body-p2 neutral-medium-dark">Color:</span><span className="body-p2 neutral-dark">Navy</span></p>
                          <p className="box-size"><span className="body-p2 neutral-medium-dark">Size:</span><span className="body-p2 neutral-dark">S</span></p>
                        </div>
                        <p className="body-p2 d-block d-sm-none mb-8">$24.00</p>
                        <div className="box-form-cart">
                          <div className="form-cart detail-qty"><span className="minus"></span>
                            <input className="qty-val form-control" type="text" name="quantity" value="1" min="1" /><span className="plus"></span>
                          </div>
                        </div>
                      </div>
                      <div className="item-cart-info-2">
                        <p className="body-p2 d-none d-sm-block">$24.00</p><a className="btn-remove-cart" href="#"></a>
                      </div>
                    </div>
                  </div>
                  <div className="item-cart">
                    <div className="item-cart-image"><img src="/assets/imgs/page/cart/sp2.png" alt="Indovia" /></div>
                    <div className="item-cart-info">
                      <div className="item-cart-info-1"><a className="text-16-medium" href="#">Ball Crew Shirt</a>
                        <div className="box-info-size-color-product">
                          <p className="box-color"><span className="body-p2 neutral-medium-dark">Color:</span><span className="body-p2 neutral-dark">Navy</span></p>
                          <p className="box-size"><span className="body-p2 neutral-medium-dark">Size:</span><span className="body-p2 neutral-dark">S</span></p>
                        </div>
                        <p className="body-p2 d-block d-sm-none mb-8">$24.00</p>
                        <div className="box-form-cart">
                          <div className="form-cart detail-qty"><span className="minus"></span>
                            <input className="qty-val form-control" type="text" name="quantity" value="1" min="1" /><span className="plus"></span>
                          </div>
                        </div>
                      </div>
                      <div className="item-cart-info-2">
                        <p className="body-p2 d-none d-sm-block">$24.00</p><a className="btn-remove-cart" href="#"></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-products-search">
                <h6 className="text-18-medium mb-20">You May Also Like</h6>
                <div className="box-list-product-search">
                  <div className="item-product-search">
                    <div className="cardProductStyle3 cardProductType03 cardProductType02 wow fadeInUp">
                      <div className="cardImage"><a href="#"><img className="imageMain" src="/assets/imgs/page/shop1/sp.png" alt="Indovia" /><img className="imageHover" src="/assets/imgs/page/shop1/sp.png" alt="Indovia" /></a>
                        <div className="button-select"><a href="#">Select Options</a></div>
                        <div className="box-quick-button"><a className="btn" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_116_452)">
                                <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_116_452">
                                  <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a><a className="btn" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_200_1102)">
                                <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_200_1102">
                                  <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a><a className="btn preview-product" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_91_73)">
                                <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_91_73">
                                  <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a></div>
                      </div>
                      <div className="cardInfo">
                        <h6 className="text-16-medium">Ball Crew Shirt</h6>
                        <p className="body-p2 cardDesc">$35.00</p>
                      </div>
                    </div>
                  </div>
                  <div className="item-product-search">
                    <div className="cardProductStyle3 cardProductType03 cardProductType02 wow fadeInUp">
                      <div className="cardImage"><a href="#"><img className="imageMain" src="/assets/imgs/page/shop1/sp2.png" alt="Indovia" /><img className="imageHover" src="/assets/imgs/page/shop1/sp2.png" alt="Indovia" /></a>
                        <div className="button-select"><a href="#">Select Options</a></div>
                        <div className="box-quick-button"><a className="btn" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_116_452)">
                                <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_116_452">
                                  <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a><a className="btn" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_200_1102)">
                                <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_200_1102">
                                  <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a><a className="btn preview-product" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_91_73)">
                                <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_91_73">
                                  <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a></div>
                      </div>
                      <div className="cardInfo">
                        <h6 className="text-16-medium">Ball Crew Shirt</h6>
                        <p className="body-p2 cardDesc">$35.00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-fire">
                <div className="icon-fire body-p2">Checkout now 09:14 before they’re<span className="text-17-medium">GONE!</span></div>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-25 mb-15">
                <h6 className="neutral-medium-dark">Subtotal</h6>
                <h6 className="neutral-dark">$59.00</h6>
              </div>
              <div className="box-button-popup-cart d-flex align-items-center justify-content-between"><a className="btn btn-border w-100 mr-5" href="/cart">View Cart</a><a className="btn btn-black w-100 ml-5" href="/checkout">Check Out</a></div>
            </div>
          </div>
          <div className="box-popup-wishlist">
            <div className="box-wishlist-overlay"></div>
            <div className="box-wishlist-wrapper"><a className="btn-close-popup" href="#">
                <svg className="icon-16 d-inline-flex align-items-center justify-content-center" fill="#111111" stroke="#111111" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg></a>
              <h5 className="mb-15">Your Wishlist</h5>
              <div className="box-products-cart">
                <div className="box-empty-cart d-none">
                  <div className="icon-empty-cart"><img src="/assets/imgs/template/icons/empty-cart.svg" alt="Indovia" /></div>
                  <div className="info-empty-cart">
                    <p className="text-17 neutral-medium-dark">Your cart is empty</p><a className="link-underline" href="#">Add from Wishlist</a>
                  </div>
                </div>
                <div className="list-items-cart">
                  <div className="item-cart">
                    <div className="item-cart-image"><img src="/assets/imgs/page/cart/sp.png" alt="Indovia" /></div>
                    <div className="item-cart-info">
                      <div className="item-cart-info-1"><a className="text-16-medium" href="#">Ball Crew Shirt</a>
                        <div className="box-info-size-color-product">
                          <p className="box-color"><span className="body-p2 neutral-medium-dark">Color:</span><span className="body-p2 neutral-dark">Navy</span></p>
                          <p className="box-size"><span className="body-p2 neutral-medium-dark">Size:</span><span className="body-p2 neutral-dark">S</span></p>
                        </div>
                        <p className="body-p2 d-block d-sm-none mb-8">$24.00</p>
                        <div className="box-form-cart">
                          <div className="btn btn-black">Add to cart</div>
                        </div>
                      </div>
                      <div className="item-cart-info-2">
                        <p className="body-p2 d-none d-sm-block">$24.00</p><a className="btn-remove-cart" href="#"></a>
                      </div>
                    </div>
                  </div>
                  <div className="item-cart">
                    <div className="item-cart-image"><img src="/assets/imgs/page/cart/sp2.png" alt="Indovia" /></div>
                    <div className="item-cart-info">
                      <div className="item-cart-info-1"><a className="text-16-medium" href="#">Ball Crew Shirt</a>
                        <div className="box-info-size-color-product">
                          <p className="box-color"><span className="body-p2 neutral-medium-dark">Color:</span><span className="body-p2 neutral-dark">Navy</span></p>
                          <p className="box-size"><span className="body-p2 neutral-medium-dark">Size:</span><span className="body-p2 neutral-dark">S</span></p>
                        </div>
                        <p className="body-p2 d-block d-sm-none mb-8">$24.00</p>
                        <div className="box-form-cart">
                          <div className="btn btn-black">Add to cart</div>
                        </div>
                      </div>
                      <div className="item-cart-info-2">
                        <p className="body-p2 d-none d-sm-block">$24.00</p><a className="btn-remove-cart" href="#"></a>
                      </div>
                    </div>
                  </div>
                  <div className="item-cart">
                    <div className="item-cart-image"><img src="/assets/imgs/page/cart/sp3.png" alt="Indovia" /></div>
                    <div className="item-cart-info">
                      <div className="item-cart-info-1"><a className="text-16-medium" href="#">Ball Crew Shirt</a>
                        <div className="box-info-size-color-product">
                          <p className="box-color"><span className="body-p2 neutral-medium-dark">Color:</span><span className="body-p2 neutral-dark">Navy</span></p>
                          <p className="box-size"><span className="body-p2 neutral-medium-dark">Size:</span><span className="body-p2 neutral-dark">S</span></p>
                        </div>
                        <p className="body-p2 d-block d-sm-none mb-8">$24.00</p>
                        <div className="box-form-cart">
                          <div className="btn btn-black">Add to cart</div>
                        </div>
                      </div>
                      <div className="item-cart-info-2">
                        <p className="body-p2 d-none d-sm-block">$24.00</p><a className="btn-remove-cart" href="#"></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-products-search">
                <h6 className="text-18-medium mb-10">You May Also Like</h6>
                <div className="box-list-product-search">
                  <div className="item-product-search">
                    <div className="cardProductStyle3 cardProductType03 cardProductType02 wow fadeInUp">
                      <div className="cardImage"><a href="#"><img className="imageMain" src="/assets/imgs/page/popup/product-1.png" alt="Indovia" /><img className="imageHover" src="/assets/imgs/page/popup/product-5.png" alt="Indovia" /></a>
                        <div className="button-select"><a href="#">Select Options</a></div>
                        <div className="box-quick-button"><a className="btn" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_116_452)">
                                <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_116_452">
                                  <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a><a className="btn" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_200_1102)">
                                <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_200_1102">
                                  <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a><a className="btn preview-product" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_91_73)">
                                <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_91_73">
                                  <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a></div>
                      </div>
                      <div className="cardInfo">
                        <h6 className="text-16-medium">illow Covers Luxury</h6>
                        <p className="body-p2 cardDesc">$24.00</p>
                      </div>
                    </div>
                  </div>
                  <div className="item-product-search">
                    <div className="cardProductStyle3 cardProductType03 cardProductType02 wow fadeInUp">
                      <div className="cardImage"><a href="#"><img className="imageMain" src="/assets/imgs/page/popup/product-2.png" alt="Indovia" /><img className="imageHover" src="/assets/imgs/page/popup/product-6.png" alt="Indovia" /></a>
                        <div className="button-select"><a href="#">Select Options</a></div>
                        <div className="box-quick-button"><a className="btn" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_116_452)">
                                <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_116_452">
                                  <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a><a className="btn" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_200_1102)">
                                <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_200_1102">
                                  <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a><a className="btn preview-product" href="#">
                            <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_91_73)">
                                <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_91_73">
                                  <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                                </clipPath>
                              </defs>
                            </svg></a></div>
                      </div>
                      <div className="cardInfo">
                        <h6 className="text-16-medium">Pillow Covers Linen</h6>
                        <p className="body-p2 cardDesc">$36.00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  </>
);

export default Faq;
