import { testimonialsData } from '../data/storeData';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section block-testimonials-type-1 py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h3 className="neutral-dark fw-bold mb-2">Customer Reviews</h3>
          <p className="text-muted small">Apa kata pembeli terverifikasi tentang kualitas dan kenyamanan produk kami</p>
        </div>

        <div className="row g-4 justify-content-center">
          {testimonialsData.map((item) => (
            <div key={item.id} className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex text-warning mb-3 gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <IconifyIcon key={idx} icon="solar:star-bold" className="fs-18" />
                    ))}
                  </div>
                  <p className="text-dark fst-italic mb-4 lh-base">
                    "{item.quote}"
                  </p>
                </div>
                <div className="d-flex align-items-center gap-3 pt-3 border-top">
                  <div className="avatar-sm rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: 40, height: 40 }}>
                    {item.author.charAt(0)}
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold text-dark">{item.author}</h6>
                    <small className="text-muted">{item.role}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
