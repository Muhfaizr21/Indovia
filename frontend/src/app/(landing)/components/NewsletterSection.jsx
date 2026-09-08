import { useState } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section id="newsletter" className="section py-5 bg-light">
      <div className="container">
        <div className="box-subsciber bg-white rounded-4 p-4 p-md-5 text-center shadow-sm border mx-auto" style={{ maxWidth: '850px' }}>
          <div className="text-17-medium text-uppercase text-primary fw-bold mb-2 small letter-spacing-1">
            NEWSLETTER
          </div>
          <h3 className="text-subscribe fw-bold text-dark mb-3 display-6 lh-sm">
            Daftar & Dapatkan Diskon Hingga <span className="text-danger">20%</span> untuk Pembelian Pertama
          </h3>
          <p className="text-muted mb-4 small">
            Dapatkan info produk terbaru, diskon eksklusif, dan penawaran musiman langsung ke kotak masuk Anda.
          </p>

          {subscribed ? (
            <div className="alert alert-success d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill">
              <IconifyIcon icon="solar:check-circle-bold" className="fs-20" />
              <span>Terima kasih telah berlangganan newsletter Larkon Store!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="d-flex flex-column flex-sm-row gap-2 justify-content-center mx-auto" style={{ maxWidth: '520px' }}>
              <input
                className="form-control form-control-lg px-4 py-3 rounded-pill text-dark"
                type="email"
                required
                placeholder="Masukkan alamat email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-dark btn-lg px-4 py-3 rounded-pill fw-semibold text-nowrap"
              >
                Langganan
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
