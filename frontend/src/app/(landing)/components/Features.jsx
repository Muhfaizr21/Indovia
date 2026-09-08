import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { featuresData } from '../data';

const Features = () => {
  return (
    <section id="features" className="py-5 py-lg-6">
      <Container>
        <div className="text-center mb-5">
          <Badge bg="primary-subtle" text="primary" pill className="px-3 py-2 mb-2 fw-semibold">
            Fitur Unggulan
          </Badge>
          <h2 className="display-6 fw-bold text-body mb-3">
            Segala Kebutuhan Manajemen Bisnis dalam Satu Tempat
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '650px' }}>
            Dirancang secara khusus dengan standar clean code dan arsitektur modular untuk memberikan performa maksimal tanpa kompromi.
          </p>
        </div>

        <Row className="g-4">
          {featuresData.map((item, idx) => (
            <Col key={idx} md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm rounded-4 p-3 hover-shadow transition-all">
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className={`p-3 rounded-3 bg-${item.badgeVariant}-subtle text-${item.badgeVariant} d-inline-flex align-items-center justify-content-center`}
                    >
                      <IconifyIcon icon={item.icon} className="fs-28" />
                    </div>
                    <Badge bg={`${item.badgeVariant}-subtle`} text={item.badgeVariant} pill className="px-2 py-1">
                      {item.badge}
                    </Badge>
                  </div>
                  <h5 className="fw-bold mb-2 text-body">{item.title}</h5>
                  <p className="text-muted mb-0 lh-base">{item.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
