import { useState } from 'react';
import { productsData } from '../data/storeData';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const ProductTabsSection = () => {
  const [activeTab, setActiveTab] = useState('mens');
  const [likedIds, setLikedIds] = useState([]);

  const toggleLike = (id) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentProducts = productsData[activeTab] || [];

  return (
    <section id="products" className="section block-shop-1 py-5 bg-light bg-opacity-50">
      <div className="container">
        <div className="text-center mb-4">
          <h3 className="neutral-dark fw-bold mb-3">Best Sellers</h3>
          <p className="text-muted small mb-4">Produk terlaris dengan ulasan terbaik dari pelanggan kami</p>

          {/* Tab Navigation */}
          <div className="d-inline-flex p-1 bg-white rounded-pill border shadow-sm mb-4">
            <button
              type="button"
              className={`btn btn-sm rounded-pill px-4 py-2 fw-semibold border-0 ${
                activeTab === 'mens' ? 'btn-dark text-white' : 'btn-light text-muted'
              }`}
              onClick={() => setActiveTab('mens')}
            >
              Men's
            </button>
            <button
              type="button"
              className={`btn btn-sm rounded-pill px-4 py-2 fw-semibold border-0 ${
                activeTab === 'womens' ? 'btn-dark text-white' : 'btn-light text-muted'
              }`}
              onClick={() => setActiveTab('womens')}
            >
              Women's
            </button>
            <button
              type="button"
              className={`btn btn-sm rounded-pill px-4 py-2 fw-semibold border-0 ${
                activeTab === 'kids' ? 'btn-dark text-white' : 'btn-light text-muted'
              }`}
              onClick={() => setActiveTab('kids')}
            >
              Kid's
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="row g-4">
          {currentProducts.map((product) => {
            const isLiked = likedIds.includes(product.id);

            return (
              <div key={product.id} className="col-6 col-md-4 col-lg-3">
                <div className="cardProduct bg-white p-3 rounded-4 shadow-sm h-100 d-flex flex-column justify-content-between">
                  <div className="cardImage position-relative overflow-hidden rounded-3 mb-3 bg-light text-center">
                    <a href="#products" className="d-block position-relative" style={{ minHeight: '260px' }}>
                      <img
                        className="imageMain w-100 h-100 object-fit-cover"
                        src={product.imageMain}
                        alt={product.title}
                        style={{ maxHeight: '280px' }}
                      />
                    </a>

                    {/* Quick action buttons */}
                    <div className="position-absolute top-0 end-0 p-2 d-flex flex-column gap-1">
                      <button
                        type="button"
                        className="btn btn-sm btn-white bg-white rounded-circle shadow-sm p-1 d-flex align-items-center justify-content-center"
                        style={{ width: 34, height: 34 }}
                        onClick={() => toggleLike(product.id)}
                        title="Tambah ke Wishlist"
                      >
                        <IconifyIcon
                          icon={isLiked ? 'solar:heart-bold' : 'solar:heart-linear'}
                          className={`fs-18 ${isLiked ? 'text-danger' : 'text-muted'}`}
                        />
                      </button>
                    </div>

                    {/* Button Select options on card hover */}
                    <div className="button-select position-absolute bottom-0 start-0 w-100 p-2">
                      <a
                        href="#products"
                        className="btn btn-sm btn-dark w-100 py-2 fw-semibold text-white text-decoration-none shadow-sm"
                      >
                        Pilih Opsi
                      </a>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="cardInfo">
                    <h6 className="text-16-medium cardTitle mb-1 fw-semibold text-dark text-truncate">
                      {product.title}
                    </h6>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="body-p2 cardDesc fw-bold text-dark">{product.price}</span>
                      {product.oldPrice && (
                        <span className="text-muted text-decoration-line-through small">
                          {product.oldPrice}
                        </span>
                      )}
                    </div>

                    {/* Color swatches */}
                    {product.colors && (
                      <div className="box-colors d-flex gap-1">
                        {product.colors.map((color, cIdx) => (
                          <span
                            key={cIdx}
                            className="rounded-circle d-inline-block border"
                            style={{
                              backgroundColor: color,
                              width: 14,
                              height: 14
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductTabsSection;
