import { Container, Row, Col, Card } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { statsData } from '../data';

const Stats = () => {
  return (
    <section id="stats" className="py-5 bg-body-tertiary">
      <Container>
        <Row className="g-4">
          {statsData.map((stat, idx) => (
            <Col key={idx} sm={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm text-center p-3 rounded-4">
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <div
                    className={`rounded-circle p-3 mb-3 bg-${stat.variant}-subtle text-${stat.variant} d-flex align-items-center justify-content-center`}
                    style={{ width: 64, height: 64 }}
                  >
                    <IconifyIcon icon={stat.icon} className="fs-32" />
                  </div>
                  <h2 className="display-6 fw-bold mb-1 text-body">{stat.number}</h2>
                  <h6 className="fw-semibold text-body mb-2">{stat.label}</h6>
                  <p className="text-muted small mb-0">{stat.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Stats;
