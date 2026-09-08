import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header sticky-bar">
      <div className="container">
        <div className="main-header">
          <div className="header-logo"> 
            <Link className="d-flex" to="/"><img alt="luxride" src="/assets/imgs/template/logo.svg" /></Link>
          </div>
          <div className="header-menu"> 
            <div className="header-nav">
              <nav className="nav-main-menu d-none d-xl-block">
                <ul className="main-menu">
                  <li className="has-mega-menu"><a className="active" href="#">Home</a>
                    <div className="sub-menu">
                      <div className="menu-inner">
                        <div className="col-menu">
                          <h6 className="text-16-semibold mb-10 text-uppercase">Home Demo I</h6><a href="index.html">Fashion Store 01</a><a href="index-2.html">Fashion Store 02</a><a href="index-3.html">Fashion Store 03</a><a href="index-4.html">Fashion Store 04</a><a href="index-5.html">Fashion Store 05</a><a href="index-6.html">Fashion Store 06</a><a href="index-25.html">Fashion Store 07</a><a href="index-18.html">Fashion Store 08</a><a href="index-22.html">Fashion Store 09</a>
                        </div>
                        <div className="col-menu">
                          <h6 className="text-16-semibold mb-10 text-uppercase">Home Demo II</h6><a href="index-26.html">Shoes</a><a href="index-15.html">Natural Skins</a><a href="index-27.html">Phonecases</a><a href="index-28.html">Yoga Clothing</a><a href="index-29.html">Jewelry Store</a><a href="index-30.html">Socks Store</a><a href="index-7.html">Underwear Store</a><a href="index-10.html">Home Living</a>
                        </div>
                        <div className="col-menu">
                          <h6 className="text-16-semibold mb-10 text-uppercase">Home Demo III</h6><a href="index-11.html">Pets Store</a><a href="index-16.html">Electronic</a><a href="index-17.html">Food Store</a><a href="index-31.html">Watch Store</a><a href="index-32.html">Book Store</a><a href="index-33.html">Glasses Shop</a><a href="index-34.html">Jeans Fashion</a><a href="index-8.html">Furniture Store 01</a><a href="index-9.html">Furniture Store 02</a>
                        </div>
                        <div className="col-menu">
                          <h6 className="text-16-semibold mb-10 text-uppercase">Home Demo IV</h6><a href="index-12.html">Oganic Store</a><a href="index-13.html">Toys Store</a><a href="index-14.html">Skateboard Store</a><a href="index-19.html">Plants Store</a><a href="index-20.html">Bikes Store</a><a href="index-21.html">Baby Clothing</a><a href="index-23.html">Travel gear</a><a href="index-24.html">Coffee Shop</a>
                        </div>
                        <div className="col-menu"><img src="/assets/imgs/template/banner-menu.webp" alt="Indovia" /></div>
                      </div>
                    </div>
                  </li>
                  <li className="has-children"><a href="#">Shop</a>
                    <ul className="sub-menu">
                      <li><a href="shop-left-filter.html">Shop - Left Filter</a></li>
                      <li><a href="shop-top-filter.html">Shop - Top Filter</a></li>
                      <li><a href="shop-top-filter-showing.html">Shop - Top Filter 2</a></li>
                      <li><a href="shop-canvas-filter.html">Shop - Canvas Filter</a></li>
                      <li><a href="shop-show-category.html">Shop - Category 1</a></li>
                      <li><a href="shop-show-category-2.html">Shop - Category 2</a></li>
                      <li><a href="shop-custom-banner.html">Shop - Custom Banner</a></li>
                      <li><a href="shop-load-more.html">Shop - Load More</a></li>
                      <li><a href="shop-infinity-scrolling.html">Shop - Infinity</a></li>
                    </ul>
                  </li>
                  <li className="has-mega-menu"><a href="#">Products</a>
                    <div className="sub-menu">
                      <div className="menu-inner">
                        <div className="col-menu"><a href="product-single.html">Product Single 1</a><a href="product-single-2.html">Product Single 2</a><a href="product-single-3.html">Product Single 3</a><a href="product-single-4.html">Product Single 4</a><a href="product-single-5.html">Product Single 5</a><a href="product-single-6.html">Product Single 6</a></div>
                        <div className="col-menu"><a href="product-single-7.html">Product Single 7</a><a href="product-single-8.html">Product Single 8</a><a href="product-single-9.html">Product Single 9</a><a href="product-single-10.html">Product Single 10</a><a href="product-single-11.html">Product Single 11</a><a href="product-single-12.html">Product Single 12</a></div>
                        <div className="col-menu"><a href="product-single-13.html">Product Single 13</a><a href="product-single-14.html">Product Single 14</a><a href="product-single-15.html">Product Single 15</a><a href="product-single-16.html">Product Single 16</a><a href="product-single-17.html">Product Single 17</a><a href="product-single-18.html">Product Single 18</a></div>
                        <div className="col-menu"><a href="product-single-21.html">Product Single 21</a><a href="product-single-20.html">Product Single 20</a><a href="product-single-21.html">Product Single 21</a><a href="product-single-22.html">Product Single 22</a><a href="product-single-23.html">Product Single 23</a><a href="product-single-24.html">Product Single 24</a></div>
                        <div className="col-menu"><img src="/assets/imgs/template/banner-menu-2.png" alt="Indovia" /></div>
                      </div>
                    </div>
                  </li>
                  <li className="has-children"><a href="#">Pages</a>
                    <ul className="sub-menu">
                      <li><a href="cart.html">Your Cart</a></li>
                      <li><a href="checkout.html">Checkout</a></li>
                      <li><a href="store-location.html">Store Location</a></li>
                      <li><a href="about-us-1.html">About Us</a></li>
                      <li><a href="about-us-2.html">About Us 2</a></li>
                      <li><a href="lookbook.html">Lookbook 1</a></li>
                      <li><a href="lookbook-2.html">Lookbook 2</a></li>
                      <li><a href="lookbook-3.html">Lookbook 3</a></li>
                      <li><a href="faq.html">FAQs page</a></li>
                      <li><a href="store-location.html">Store Locations</a></li>
                      <li><a href="contact.html">Contact Us</a></li>
                      <li><a href="carrers.html">Job and Carrers</a></li>
                      <li><a href="custome-service.html">Custome Services</a></li>
                      <li><a href="maintenance.html">Maintenance</a></li>
                      <li><a href="comming-soon.html">Comming soon</a></li>
                    </ul>
                  </li>
                  <li className="has-children"><a href="#">Blog</a>
                    <ul className="sub-menu">
                      <li><a href="blog-grid.html">Blog Grid 1</a></li>
                      <li><a href="blog-masonry.html">Blog Grid 2</a></li>
                      <li><a href="blog-list.html">Blog List</a></li>
                      <li><a href="blog-single.html">Single Post</a></li>
                    </ul>
                  </li>
                  <li><a href="contact.html">Contact</a></li>
                </ul>
              </nav>
              <div className="burger-icon burger-icon-white"><span className="burger-icon-top"></span><span className="burger-icon-mid"></span><span className="burger-icon-bottom"></span></div>
            </div>
          </div>
          <div className="header-account">
            <a className="account-icon search" href="#">
              <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_91_73)">
                  <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z"></path>
                </g>
                <defs>
                  <clipPath id="clip0_91_73">
                    <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a className="account-icon account" href="#">
              <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_116_451)">
                  <path d="M6 24C6 21.8783 6.84285 19.8434 8.34315 18.3431C9.84344 16.8429 11.8783 16 14 16C16.1217 16 18.1566 16.8429 19.6569 18.3431C21.1571 19.8434 22 21.8783 22 24H20C20 22.4087 19.3679 20.8826 18.2426 19.7574C17.1174 18.6321 15.5913 18 14 18C12.4087 18 10.8826 18.6321 9.75736 19.7574C8.63214 20.8826 8 22.4087 8 24H6ZM14 15C10.685 15 8 12.315 8 9C8 5.685 10.685 3 14 3C17.315 3 20 5.685 20 9C20 12.315 17.315 15 14 15ZM14 13C16.21 13 18 11.21 18 9C18 6.79 16.21 5 14 5C11.79 5 10 6.79 10 9C10 11.21 11.79 13 14 13Z"></path>
                </g>
                <defs>
                  <clipPath id="clip0_116_451">
                    <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a className="account-icon wishlist" href="#">
              <span className="number-tag">3</span>
              <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_116_452)">
                  <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z"></path>
                </g>
                <defs>
                  <clipPath id="clip0_116_452">
                    <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a className="account-icon cart" href="#">
              <span className="number-tag">1</span>
              <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_116_450)">
                  <path d="M9 10V8C9 6.67392 9.52678 5.40215 10.4645 4.46447C11.4021 3.52678 12.6739 3 14 3C15.3261 3 16.5979 3.52678 17.5355 4.46447C18.4732 5.40215 19 6.67392 19 8V10H22C22.2652 10 22.5196 10.1054 22.7071 10.2929C22.8946 10.4804 23 10.7348 23 11V23C23 23.2652 22.8946 23.5196 22.7071 23.7071C22.5196 23.8946 22.2652 24 22 24H6C5.73478 24 5.48043 23.8946 5.29289 23.7071C5.10536 23.5196 5 23.2652 5 23V11C5 10.7348 5.10536 10.4804 5.29289 10.2929C5.48043 10.1054 5.73478 10 6 10H9ZM9 12H7V22H21V12H19V14H17V12H11V14H9V12ZM11 10H17V8C17 7.20435 16.6839 6.44129 16.1213 5.87868C15.5587 5.31607 14.7956 5 14 5C13.2044 5 12.4413 5.31607 11.8787 5.87868C11.3161 6.44129 11 7.20435 11 8V10Z"></path>
                </g>
                <defs>
                  <clipPath id="clip0_116_450">
                    <rect width="24" height="24" transform="translate(2 2)"></rect>
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
