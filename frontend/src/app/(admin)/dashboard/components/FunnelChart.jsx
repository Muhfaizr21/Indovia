import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardTitle, Col, Row, ProgressBar } from 'react-bootstrap';
import { conversionFunnel, paymentMethods } from '../data';
import { useLayoutContext } from '@/context/useLayoutContext';

const FunnelChart = ({ funnelData = null, paymentsData = null }) => {
  const { theme } = useLayoutContext();
  const isDark = theme === 'dark';

  const funnel = funnelData || conversionFunnel;
  const payments = paymentsData || paymentMethods;

  const finalRate = funnel[funnel.length - 1]?.rate || 13.5;

  // CHART 5 [HOW & WHY]: Corong Konversi
  // Signature Stepped Indovia Orange Palette with Emerald Success (zero AI-slop)
  const funnelChartOptions = {
    chart: {
      type: 'bar',
      height: 250,
      background: 'transparent',
      toolbar: { show: false }
    },
    theme: {
      mode: isDark ? 'dark' : 'light'
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        barHeight: '48%',
        distributed: true,
        dataLabels: {
          position: 'bottom'
        }
      }
    },
    // Stepped warm orange to vibrant Indovia orange and emerald success
    colors: ['#c2410c', '#ea580c', '#f97316', '#ff6c2f', '#22c55e'],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#ffffff'],
        fontSize: '11px',
        fontWeight: 600
      },
      formatter: (val, opt) => {
        const item = funnel[opt.dataPointIndex];
        return item ? `${item.stage}: ${item.label} (${item.rate}%)` : '';
      },
      offsetX: 10
    },
    xaxis: {
      categories: funnel.map((f) => f.stage),
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: { show: false }
    },
    grid: { show: false },
    legend: { show: false },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: {
        formatter: (val, opt) => {
          const item = conversionFunnel[opt.dataPointIndex];
          return `${val.toLocaleString('id-ID')} sesi (${item.rate}% dari kunjungan awal)`;
        }
      }
    }
  };

  const paymentTones = ['#ff6c2f', '#ea580c', '#f97316', '#fb923c', '#94a3b8'];

  return (
    <Col xl={6} className="mb-3">
      <Card className="border-0 shadow-sm h-100">
        <CardBody className="p-3">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <CardTitle as="h5" className="fw-bold mb-0 text-body fs-15">
                Corong Konversi & Saluran Pembayaran
              </CardTitle>
              <p className="text-muted fs-11 mb-0">
                Alur Tahapan Checkout Pembeli hingga Transaksi Berhasil Dilunasi
              </p>
            </div>
            <span
              className="px-2 py-0.5 rounded fs-11 fw-semibold"
              style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#16a34a' }}
            >
              Konversi: {finalRate}%
            </span>
          </div>

          <Row className="g-2">
            {/* Funnel Visual */}
            <Col lg={7}>
              <div dir="ltr">
                <ReactApexChart
                  options={funnelChartOptions}
                  series={[{ name: 'Volume Sesi', data: funnel.map((f) => f.count) }]}
                  height={250}
                  type="bar"
                />
              </div>
            </Col>

            {/* Payment Method Breakdown */}
            <Col lg={5}>
              <div className="ps-lg-1">
                <p className="fs-11 fw-bold text-uppercase text-muted mb-1.5">
                  Metode Pembayaran Terpilih:
                </p>
                {payments.map((pm, idx) => (
                  <div
                    key={idx}
                    className="p-1.5 px-2 mb-1.5 rounded-2 bg-light bg-opacity-25 border"
                  >
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fs-11 fw-medium text-body text-truncate">{pm.name}</span>
                      <span
                        className="px-1.5 py-0.5 rounded fs-10 fw-semibold"
                        style={{ backgroundColor: 'rgba(255, 108, 47, 0.1)', color: '#ff6c2f' }}
                      >
                        {pm.share}%
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="progress flex-grow-1 me-2" style={{ height: '4px' }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: `${pm.share}%`,
                            backgroundColor: paymentTones[idx] || '#64748b'
                          }}
                        />
                      </div>
                      <span className="fs-10 text-muted fw-semibold">{pm.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>

          <div
            className="p-2 mt-2 rounded-2 d-flex align-items-center justify-content-between bg-light bg-opacity-25 border"
          >
            <span className="fs-11 text-muted">
              <strong>Analisis:</strong> Drop-off terbesar pada tahap <em>Lihat Produk &rarr; Keranjang</em> (35.4%).
            </span>
            <span
              className="px-2 py-0.5 rounded fs-11 fw-medium"
              style={{ backgroundColor: 'rgba(255, 108, 47, 0.1)', color: '#ff6c2f' }}
            >
              Optimasi UX
            </span>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default FunnelChart;
