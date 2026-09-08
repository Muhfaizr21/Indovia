import { collectionsData } from '../data/storeData';

const CollectionSection = () => {
  return (
    <section id="collections" className="section block-shop-1 py-5">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h3 className="neutral-dark fw-bold mb-0">Shop by Collection</h3>
          <span className="text-muted small">Pilihan kategori terpopuler minggu ini</span>
        </div>

        <div className="row g-4">
          {collectionsData.map((item) => (
            <div key={item.id} className="col-6 col-md-3">
              <div className="cardCollectionStyle1 text-center">
                <div className="cardImage overflow-hidden rounded-3 mb-2 shadow-sm position-relative">
                  <a href={item.link}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid w-100 transition-transform"
                      style={{ transition: 'transform 0.4s ease' }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </a>
                </div>
                <div className="cardInfo">
                  <a href={item.link} className="text-dark text-decoration-none">
                    <h6 className="fw-semibold mb-0">{item.title} ({item.count})</h6>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
