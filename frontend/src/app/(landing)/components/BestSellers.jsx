import React from 'react';
import { Link } from 'react-router-dom';

const BestSellers = () => {
  return (
      <section className="section block-shop-1"> 
        <div className="container"> 
          <div className="text-center">
            <h3 className="neutral-dark wow fadeInLeft">Best sellers</h3>
            <div className="box-tabs wow fadeInUp"> 
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="mens-tab" data-bs-toggle="tab" data-bs-target="#mens" type="button" role="tab" aria-controls="mens" aria-selected="true">Mens</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="womens-tab" data-bs-toggle="tab" data-bs-target="#womens" type="button" role="tab" aria-controls="womens" aria-selected="false">Womens</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="kids-tab" data-bs-toggle="tab" data-bs-target="#kids" type="button" role="tab" aria-controls="kids" aria-selected="false">Kids</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="tab-content">
            <div className="tab-pane fade show active" id="mens" role="tabpanel" aria-labelledby="mens-tab">
              <div className="row"> 
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product1.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product1-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product2.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product2-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product3.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product1-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product4.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product2-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product5.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product1-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product6.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product2-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product7.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product1-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product8.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product2-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center"><Link className="btn btn-border" to="#">Explorer More</Link></div>
            </div>
            <div className="tab-pane fade" id="womens" role="tabpanel" aria-labelledby="womens-tab"> 
              <div className="row"> 
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product8.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product1-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product7.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product2-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product6.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product1-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product5.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product2-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product4.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product1-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product3.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product2-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product2.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product1-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product1.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product2-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center"><Link className="btn btn-border" to="#">Explorer More</Link></div>
            </div>
            <div className="tab-pane fade" id="kids" role="tabpanel" aria-labelledby="kids-tab"> 
              <div className="row"> 
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product5.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product1-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product2.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product2-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product6.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product1-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product4.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product2-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product8.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product1-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product3.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product2-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product7.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product1-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6"> 
                  <div className="cardProduct wow fadeInUp">
                    <div className="cardImage"><Link to="#"><img className="imageMain" src="/assets/imgs/page/homepage1/product1.png" alt="guza" /><img className="imageHover" src="/assets/imgs/page/homepage1/product2-hover.png" alt="guza" /></Link>
                      <div className="button-select"><Link to="#">Select Options</Link></div>
                      <div className="box-quick-button"><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_116_452)">
                              <path d="M14.001 6.52898C16.35 4.41998 19.98 4.48998 22.243 6.75698C24.505 9.02498 24.583 12.637 22.479 14.993L13.999 23.485L5.52101 14.993C3.41701 12.637 3.49601 9.01898 5.75701 6.75698C8.02201 4.49298 11.645 4.41698 14.001 6.52898ZM20.827 8.16998C19.327 6.66798 16.907 6.60698 15.337 8.01698L14.002 9.21498L12.666 8.01798C11.091 6.60598 8.67601 6.66798 7.17201 8.17198C5.68201 9.66198 5.60701 12.047 6.98001 13.623L14 20.654L21.02 13.624C22.394 12.047 22.319 9.66498 20.827 8.16998Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_116_452">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_200_1102)">
                              <path d="M15.375 12.0416L19.5 16.1666L15.375 20.2916L14.1967 19.1133L16.31 16.9991L5.33333 17V15.3333H16.31L14.1967 13.22L15.375 12.0416ZM8.625 3.70831L9.80333 4.88665L7.69 6.99998H18.6667V8.66665H7.69L9.80333 10.78L8.625 11.9583L4.5 7.83331L8.625 3.70831Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_200_1102">
                                <rect width="20" height="20" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link><Link className="btn preview-product" to="#">
                          <svg className="d-inline-flex align-items-center justify-content-center" width="28" height="28" viewBox="0 0 28 28" fill="" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_91_73)">
                              <path d="M20.031 18.617L24.314 22.899L22.899 24.314L18.617 20.031C17.0237 21.3082 15.042 22.0029 13 22C8.032 22 4 17.968 4 13C4 8.032 8.032 4 13 4C17.968 4 22 8.032 22 13C22.0029 15.042 21.3082 17.0237 20.031 18.617ZM18.025 17.875C19.2941 16.5699 20.0029 14.8204 20 13C20 9.132 16.867 6 13 6C9.132 6 6 9.132 6 13C6 16.867 9.132 20 13 20C14.8204 20.0029 16.5699 19.2941 17.875 18.025L18.025 17.875Z" fill=""></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_91_73">
                                <rect width="24" height="24" fill="white" transform="translate(2 2)"></rect>
                              </clipPath>
                            </defs>
                          </svg></Link></div>
                    </div>
                    <div className="cardInfo"><Link to="#">
                        <h6 className="text-16-medium cardTitle">Lace Shirt Cut II</h6></Link>
                      <p className="body-p2 cardDesc">$16.00</p>
                      <div className="box-colors">
                        <div className="item-color color-1"></div>
                        <div className="item-color color-2"></div>
                        <div className="item-color color-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center"><Link className="btn btn-border" to="#">Explorer More</Link></div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default BestSellers;
