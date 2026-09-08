import { saleEventData } from '../data/storeData';

const SaleEventSection = () => {
  return (
    <section id="sale" className="section block-sale-event py-5">
      <div className="container">
        <div className="box-sale-event bg-body-tertiary rounded-4 overflow-hidden p-4 p-lg-5 shadow-sm border">
          <div className="row align-items-center g-4">
            <div className="col-lg-6 text-center">
              <div className="image-sale-event">
                <img
                  src={saleEventData.bannerImage}
                  alt="Sale Event"
                  className="img-fluid rounded-3"
                  style={{ maxHeight: '380px' }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-padding">
                <span className="text-17-medium neutral-dark text-uppercase text-primary fw-bold letter-spacing-1 small d-block mb-2">
                  {saleEventData.tag}
                </span>
                <h3 className="neutral-dark mb-3 fw-bold display-6 lh-sm">
                  {saleEventData.title}
                </h3>
                <p className="body-p2 text-muted mb-4 lead">
                  {saleEventData.description}
                </p>
                <div className="d-flex flex-wrap align-items-center gap-3">
                  <a className="btn btn-dark btn-lg px-4 py-3 fw-semibold" href={saleEventData.link}>
                    Belanja Sekarang
                  </a>
                  <div className="px-3 py-2 rounded-3 bg-white border border-dashed text-center">
                    <span className="small text-muted d-block">Kode Promo:</span>
                    <strong className="text-dark letter-spacing-2">{saleEventData.promoCode}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleEventSection;
