import { instagramImages } from '../data/storeData';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const InstagramSection = () => {
  return (
    <section className="section py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h6 className="text-18-medium instagram-title fw-bold text-dark d-flex align-items-center justify-content-center gap-2">
            <IconifyIcon icon="solar:camera-bold" className="text-danger fs-20" />
            <span>Follow Us on Instagram #IndoviaStyle</span>
          </h6>
        </div>
      </div>
      <div className="container-fluid px-2">
        <div className="row g-2 justify-content-center">
          {instagramImages.map((src, idx) => (
            <div key={idx} className="col-6 col-md-4 col-lg-2">
              <div className="gallery-item overflow-hidden rounded-3 position-relative group shadow-sm">
                <img
                  src={src}
                  alt={`Instagram ${idx + 1}`}
                  className="w-100 h-100 object-fit-cover transition-transform"
                  style={{ minHeight: '200px', maxHeight: '220px', transition: 'transform 0.4s ease' }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
