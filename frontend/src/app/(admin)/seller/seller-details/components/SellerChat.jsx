import IconifyIcon from '@/components/wrappers/IconifyIcon';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, Col, ProgressBar, Row } from 'react-bootstrap';
import { companyReviewsData } from '../data';
import { formatRupiah } from '../../data';

const CompanyReviews = () => {
  return (
    <>
      {companyReviewsData.map((item, idx) => (
        <div className="d-flex align-items-center gap-3 my-2.5" key={idx}>
          <span className="mb-0 flex-shrink-0 fs-12 fw-medium text-muted" style={{ width: 45 }}>
            {item.star}&nbsp;bintang:
          </span>
          <ProgressBar
            variant={item.star >= 4 ? 'warning' : 'secondary'}
            className="flex-grow-1 rounded-pill"
            style={{ height: 6 }}
            now={item.progress}
          />
          <span className="fs-11 text-muted" style={{ width: 30 }}>
            {item.progress}%
          </span>
        </div>
      ))}
    </>
  );
};

const SellerChat = ({ merchant }) => {
  const gmv = merchant?.monthly_gmv || 85400000;
  const rating = merchant?.rating || 4.9;
  const reviewCount = merchant?.review_count || 128;

  // Indonesian Rupiah Chart Scale
  const baseValue = gmv / 1000000; // in Juta Rupiah
  const incomeSeries = [
    Math.round(baseValue * 0.65),
    Math.round(baseValue * 0.7),
    Math.round(baseValue * 0.72),
    Math.round(baseValue * 0.8),
    Math.round(baseValue * 0.85),
    Math.round(baseValue * 0.78),
    Math.round(baseValue * 0.92),
    Math.round(baseValue * 0.88),
    Math.round(baseValue * 0.95),
    Math.round(baseValue * 0.9),
    Math.round(baseValue * 0.98),
    Math.round(baseValue)
  ];

  const chartOptions = {
    chart: {
      height: 328,
      type: 'area',
      dropShadow: {
        enabled: true,
        opacity: 0.15,
        blur: 8,
        left: -4,
        top: 10
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#ff6c2f', '#10b981'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      curve: 'smooth',
      width: 2.5,
      lineCap: 'round'
    },
    series: [
      {
        name: 'Omset Toko (Juta Rp)',
        data: incomeSeries
      },
      {
        name: 'Target Bulanan (Juta Rp)',
        data: incomeSeries.map((v) => Math.round(v * 0.85))
      }
    ],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        show: true
      },
      labels: {
        offsetX: 0,
        offsetY: 5,
        style: {
          fontSize: '11px',
          fontFamily: 'Inter, sans-serif'
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return 'Rp ' + value + ' Jt';
        },
        offsetX: -10,
        offsetY: 0,
        style: {
          fontSize: '11px',
          fontFamily: 'Inter, sans-serif'
        }
      }
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      },
      padding: {
        top: -20,
        right: 0,
        bottom: 0,
        left: 10
      }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '12px'
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.25,
        opacityTo: 0.02,
        stops: [0, 100]
      }
    }
  };

  return (
    <Row className="g-3 mb-3">
      {/* KOLOM KIRI: GRAFIK TREN PENJUALAN */}
      <Col lg={9}>
        <Card className="border-0 shadow-sm h-100">
          <CardBody className="p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <span className="text-muted fs-12 fw-medium">Tren Omset &amp; Volume Penjualan Toko</span>
                <h3 className="d-flex align-items-center gap-2 mb-0 fw-bold text-body fs-20 mt-1">
                  {formatRupiah(gmv)}{' '}
                  <span className="badge text-success bg-success-subtle px-2 py-0.5 fs-11 fw-semibold">
                    <IconifyIcon icon="bx:up-arrow-alt" className="me-0.5" />
                    +14.8% vs Bulan Lalu
                  </span>
                </h3>
                <p className="mb-0 text-muted fs-11 mt-1">
                  Pertumbuhan akumulasi omset dihitung berdasarkan pesanan berstatus sukses bayar.
                </p>
              </div>
              <div
                className="avatar-md rounded-circle d-flex align-items-center justify-content-center"
                style={{ backgroundColor: 'rgba(255, 108, 47, 0.1)', color: '#ff6c2f' }}
              >
                <IconifyIcon icon="solar:chart-2-bold-duotone" className="fs-28" />
              </div>
            </div>
            <ReactApexChart
              options={chartOptions}
              series={chartOptions.series}
              height={310}
              type="area"
              className="apex-charts"
            />
          </CardBody>
        </Card>
      </Col>

      {/* KOLOM KANAN: ULASAN TOKO & KEPUASAN */}
      <Col lg={3}>
        <Card className="border-0 shadow-sm text-center h-100">
          <CardBody className="p-4 d-flex flex-column justify-content-between">
            <div>
              <h5 className="mb-0 text-body fw-bold fs-15">Reputasi &amp; Rating Toko</h5>
              <p className="text-muted fs-11 mb-2">Evaluasi kepuasan pembeli</p>

              <div className="p-3 d-flex flex-column align-items-center justify-content-center bg-light rounded-3 my-2">
                <ul className="d-flex text-warning m-0 fs-20 list-unstyled gap-0.5 mb-1">
                  <li>
                    <IconifyIcon icon="bxs:star" />
                  </li>
                  <li>
                    <IconifyIcon icon="bxs:star" />
                  </li>
                  <li>
                    <IconifyIcon icon="bxs:star" />
                  </li>
                  <li>
                    <IconifyIcon icon="bxs:star" />
                  </li>
                  <li>
                    <IconifyIcon icon="bxs:star-half" />
                  </li>
                </ul>
                <h4 className="mb-0 text-dark fw-bold fs-18">{rating} / 5.0</h4>
                <span className="text-muted fs-11">Berdasarkan {reviewCount} Ulasan Pembeli</span>
              </div>

              <div className="my-3 text-start">
                <CompanyReviews />
              </div>
            </div>

            <div className="pt-2 border-top">
              <span className="badge bg-success-subtle text-success fs-11 w-100 py-1.5">
                <IconifyIcon icon="solar:shield-check-bold" className="me-1 fs-12" />
                Indeks Kepercayaan: 99.4%
              </span>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default SellerChat;